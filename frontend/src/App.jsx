
import React, { useState } from 'react'
import AssessmentQuiz from './components/AssessmentQuiz.jsx'
import Dashboard from './components/Dashboard.jsx'
import './components/AssessmentQuiz.css'

export default function App() {
  const [result, setResult] = useState(null)
  
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">Career Advisor</div>
            <div className="header-badge">AI-Powered • MVP</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {!result ? (
            <div className="card">
              <AssessmentQuiz onDone={setResult} />
            </div>
          ) : (
            <Dashboard data={result} onReset={() => setResult(null)} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>AI-powered career recommendations, multilingual-ready, and designed for modern career guidance.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
