# 🎯 DeepAgent Planner

An AI-powered planning assistant that transforms your goals into comprehensive, actionable plans. Using advanced AI research capabilities, DeepAgent creates personalized roadmaps tailored to your timeline and objectives.

## ✨ Features

- **Intelligent Planning**: Leverages AI to create detailed, step-by-step action plans
- **Web Research Integration**: Automatically researches best practices and current trends
- **Time-Aware Planning**: Adapts plans based on your available timeline (days to years)
- **Beautiful UI**: Modern, minimalistic React interface with smooth animations
- **Markdown Reports**: Get well-structured plans with clear milestones and action items
- **Downloadable Plans**: Export your plans in Markdown format

## 🚀 Getting Started

### Prerequisites

- Python 3.12 or higher
- Node.js 18 or higher
- OpenAI API key
- Tavily API key (for web search)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Alee7hub/deepagents-basic.git
cd deepagent
```

2. Install Python dependencies:
```bash
pip install -e .
# or with uv
uv sync
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Set up environment variables:
Create a `.env` file in the project root:
```bash
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

### Running the Application

#### Web UI (Recommended)

You need to run both the backend API and the frontend React app:

**Terminal 1 - Start the Flask API:**
```bash
python api.py
```

The API will run on `http://localhost:5001`

**Terminal 2 - Start the React frontend:**
```bash
cd frontend
npm run dev
```

The app will open in your browser at `http://localhost:3000`

#### Command Line

You can also use the application programmatically:
```python
from main import main

result = main("Your goal here\n\nTime window: 6 months")
print(result)
```

## 📖 How to Use

1. **Enter Your Goal**: Describe what you want to achieve in detail
2. **Select Timeline**: Choose your available time window (1 week to 2 years, or custom)
3. **Generate Plan**: Click the "Generate My Plan" button
4. **Review & Download**: Review your personalized plan and download it as a Markdown file

## 🏗️ Project Structure

```
deepagent/
├── api.py              # Flask REST API backend
├── main.py             # Core agent logic
├── prompts.py          # System prompts for agents
├── pyproject.toml      # Python dependencies
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── GoalInput.jsx
│   │   │   └── PlanDisplay.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   └── memories/       # Agent memory storage
└── notebooks/          # Development notebooks
```

## 🛠️ Technology Stack

**Backend:**
- **DeepAgents**: Multi-agent orchestration framework
- **LangChain**: LLM integration and tooling
- **OpenAI GPTs**: Language models for planning
- **Tavily**: Web search and research capabilities
- **Flask**: Lightweight REST API framework

**Frontend:**
- **React**: Modern UI library
- **Vite**: Fast build tool and dev server
- **React Markdown**: Beautiful markdown rendering with GFM support

## 📝 Example Use Cases

- Launch a new business
- Learn a new skill or technology
- Plan a career transition
- Prepare for certifications or exams
- Organize a major event
- Develop a fitness or health program
- Write a book or content series

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT

## 🙏 Acknowledgments

Built with [DeepAgents](https://github.com/your-deepagents-link), powered by OpenAI and Tavily.
