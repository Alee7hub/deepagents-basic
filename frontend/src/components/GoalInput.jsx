import { useState } from 'react'
import './GoalInput.css'

function GoalInput({ onGenerate, loading, disabled }) {
  const [goal, setGoal] = useState('')
  const [timeWindow, setTimeWindow] = useState('6 months')
  const [customTime, setCustomTime] = useState('')

  const timeOptions = [
    '1 week',
    '2 weeks',
    '1 month',
    '3 months',
    '6 months',
    '1 year',
    '2 years',
    'Custom'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedTime = timeWindow === 'Custom' && customTime ? customTime : timeWindow
    onGenerate(goal, selectedTime)
  }

  return (
    <div className="goal-input-container">
      <div className="info-box">
        <span className="info-icon">💡</span>
        <p>
          <strong>Tip:</strong> Be specific about your goal. The more details you provide, 
          the more tailored your plan will be!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label htmlFor="goal" className="form-label">
            📋 What's your goal?
          </label>
          <textarea
            id="goal"
            className="goal-textarea"
            placeholder="e.g., I want to launch a successful e-commerce business selling handmade jewelry..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={6}
            disabled={disabled}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeWindow" className="form-label">
            ⏰ What's your timeline?
          </label>
          <select
            id="timeWindow"
            className="time-select"
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            disabled={disabled}
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {timeWindow === 'Custom' && (
          <div className="form-group">
            <input
              type="text"
              className="custom-time-input"
              placeholder="e.g., 8 months, 18 months, etc."
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              disabled={disabled}
              required
            />
          </div>
        )}

        <button 
          type="submit" 
          className={`generate-button ${loading ? 'loading' : ''}`}
          disabled={disabled}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Generating Your Plan...
            </>
          ) : (
            <>
              🚀 Generate My Plan
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default GoalInput
