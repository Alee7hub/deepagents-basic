import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="header-icon">🎯</span>
          DeepAgent Planner
        </h1>
        <p className="header-subtitle">
          Transform your goals into actionable plans with AI-powered insights
        </p>
      </div>
    </header>
  )
}

export default Header
