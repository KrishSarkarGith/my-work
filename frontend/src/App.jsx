
import React, { useState } from 'react'
import Quiz from './components/Quiz.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  const [result, setResult] = useState(null)
  return (
    <div style={{maxWidth: 960, margin: '0 auto', padding: 16}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 24}}>
        <h1>One‑Stop Career & Education Advisor</h1>
        <span>SIH 2025 • MVP</span>
      </header>
      {!result ? (
        <Quiz onDone={setResult} />
      ) : (
        <Dashboard data={result} onReset={()=>setResult(null)} />
      )}
      <footer style={{marginTop: 48, fontSize: 12}}>
        <p>Demo build for SIH: AI‑powered recommendations, multilingual‑ready, and WhatsApp flow friendly.</p>
      </footer>
    </div>
  )
}
