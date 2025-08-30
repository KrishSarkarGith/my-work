
import React from 'react'

export default function Dashboard({data, onReset}){
  const recs = data?.recommendations || []
  return (
    <div>
      <h2>Personalized Recommendations</h2>
      <p>Here are your top matches based on your profile.</p>
      {recs.map((r)=> (
        <div key={r.careerId} style={{border:'1px solid #ddd', borderRadius:12, padding:16, marginTop:12}}>
          <h3>{r.careerTitle} • Match {Math.round(r.matchScore*100)}%</h3>
          <p>{r.why}</p>
          <strong>Skill Gaps:</strong>
          <ul>
            {r.skillGaps.slice(0,5).map(s => <li key={s}>{s}</li>)}
          </ul>
          <strong>Suggested Courses:</strong>
          <ul>
            {r.courses.map((c,i)=> <li key={i}>{c.name} — {c.provider} ({c.level})</li>)}
          </ul>
          <strong>Next Steps:</strong>
          <ul>
            {r.nextSteps.map((n,i)=> <li key={i}>{n}</li>)}
          </ul>
        </div>
      ))}
      <button onClick={onReset} style={{marginTop:16, padding:'10px 14px', borderRadius:10, border:'none'}}>Start Over</button>
    </div>
  )
}
