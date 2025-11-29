import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './PlanDisplay.css'

function PlanDisplay({ plan, onReset }) {
  const handleDownload = () => {
    const blob = new Blob([plan], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my_action_plan.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="plan-display-container">
      <div className="plan-header">
        <h2 className="plan-title">📊 Your Personalized Plan</h2>
        <div className="plan-actions">
          <button onClick={handleDownload} className="download-button">
            📥 Download Plan
          </button>
          <button onClick={onReset} className="reset-button">
            🔄 Create Another Plan
          </button>
        </div>
      </div>

      <div className="plan-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {plan}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default PlanDisplay
