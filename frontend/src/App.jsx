import { useState } from 'react'
import Header from './components/Header'
import GoalInput from './components/GoalInput'
import PlanDisplay from './components/PlanDisplay'
import './App.css'

function App() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGeneratePlan = async (goal, timeWindow) => {
    setLoading(true)
    setError(null)
    setPlan(null)

    try {
      console.log('Sending request to generate plan...')
      console.log('Goal:', goal)
      console.log('Time window:', timeWindow)
      
      const response = await fetch('http://localhost:5001/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal, timeWindow }),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      // Check if the response has content
      const contentType = response.headers.get('content-type')
      console.log('Content-Type:', contentType)
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response body:', text)
        throw new Error(`Server did not return JSON response. Content-Type: ${contentType}`)
      }

      const text = await response.text()
      console.log('Response text length:', text.length)
      console.log('Response text preview:', text.substring(0, 200))
      
      if (!text) {
        throw new Error('Server returned empty response')
      }

      const data = JSON.parse(text)
      console.log('Parsed data success:', data.success)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate plan')
      }

      if (!data.plan) {
        throw new Error('No plan returned from server')
      }

      setPlan(data.plan)
    } catch (err) {
      console.error('Error generating plan:', err)
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPlan(null)
    setError(null)
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <GoalInput 
          onGenerate={handleGeneratePlan} 
          loading={loading}
          disabled={loading}
        />
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}
        {plan && (
          <PlanDisplay 
            plan={plan} 
            onReset={handleReset}
          />
        )}
      </main>
      <footer className="footer">
        <p>Powered by DeepAgent • Built with React</p>
      </footer>
    </div>
  )
}

export default App
