
import React from 'react'

export default function Dashboard({data, onReset}){
  const recs = data?.recommendations || []
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your Personalized Career Recommendations</h2>
        <p>Based on your profile, here are the best career paths for you</p>
      </div>

      {recs.length === 0 ? (
        <div className="card">
          <p>No recommendations found. Please try again or contact support.</p>
        </div>
      ) : (
        <div className="recommendations-grid">
          {recs.map((r, index) => (
            <div key={r.careerId} className="recommendation-card">
              <div className="career-header">
                <h3>{r.careerTitle}</h3>
                <span className="match-score">Match {Math.round(r.matchScore*100)}%</span>
              </div>
              
              <p className="career-description">{r.why}</p>
              
              <div className="career-details">
                <div className="skill-gaps">
                  <h4>Skill Gaps to Address</h4>
                  <ul>
                    {r.skillGaps.slice(0, 5).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="courses">
                  <h4>Recommended Courses</h4>
                  <ul>
                    {r.courses.map((c, i) => (
                      <li key={i}>
                        <strong>{c.name}</strong> — {c.provider} ({c.level})
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="next-steps">
                  <h4>Next Steps</h4>
                  <ul>
                    {r.nextSteps.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="dashboard-actions">
        <button onClick={onReset} className="btn btn-secondary">
          Start Over
        </button>
      </div>
    </div>
  )
}
