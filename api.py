from flask import Flask, request, jsonify
from flask_cors import CORS
from main import main
import traceback

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok"})

@app.route('/api/generate-plan', methods=['POST'])
def generate_plan():
    """
    Generate a plan based on user goal and time window
    Expected JSON payload:
    {
        "goal": "User's goal description",
        "timeWindow": "6 months"
    }
    """
    try:
        print("Received request to generate plan")
        data = request.get_json()
        print(f"Request data: {data}")
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        goal = data.get('goal', '').strip()
        time_window = data.get('timeWindow', '').strip()
        
        if not goal:
            return jsonify({"error": "Goal is required"}), 400
        
        if not time_window:
            return jsonify({"error": "Time window is required"}), 400
        
        # Construct the query with time window
        query = f"{goal}\n\nTime window: {time_window}"
        print(f"Generating plan for query: {query[:100]}...")
        
        # Generate the plan
        plan = main(query)
        print(f"Plan generated successfully, length: {len(plan)} characters")
        
        return jsonify({
            "success": True,
            "plan": plan
        }), 200
        
    except Exception as e:
        error_msg = f"Error generating plan: {str(e)}"
        print(error_msg)
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": error_msg
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
