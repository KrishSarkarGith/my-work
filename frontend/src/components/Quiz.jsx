
import React, { useState } from 'react'
import { submitAssessment } from '../services/api'

const options = {
  interests: ['python','design','public policy','business','mechanics','ai/ml','visual design','sql','research'],
  strengths: ['communication','problem solving','statistics','leadership','creativity','wireframing','maths'],
  languages: ['English','Hindi','Kashmiri']
}

export default function Quiz({onDone}){
  const [name, setName] = useState('')
  const [education_level, setEdu] = useState('BTech')
  const [interests, setInterests] = useState([])
  const [strengths, setStrengths] = useState([])
  const [preferred_languages, setLangs] = useState(['English'])
  const [loading, setLoading] = useState(false)

  const toggle = (arr, setter, v) => {
    setter(arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v])
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim() || interests.length === 0 || strengths.length === 0) {
      alert('Please fill in all required fields and select at least one interest and strength.')
      return
    }
    
    setLoading(true)
    const payload = {
      name,
      age: 18,
      education_level,
      interests,
      strengths,
      preferred_languages,
      values: ['impact','growth','stability']
    }
    
    try {
      const data = await submitAssessment(payload)
      onDone(data)
    } catch (error) {
      console.error('Error submitting assessment:', error)
      alert('There was an error processing your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Create Your Career Profile</h2>
        <p>Tell us about yourself to get personalized career recommendations</p>
      </div>

      <form onSubmit={submit}>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input 
            className="form-input"
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Enter your full name" 
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Highest Education Level</label>
          <select 
            className="form-select"
            value={education_level} 
            onChange={e => setEdu(e.target.value)}
          >
            <option>Class 10</option>
            <option>Class 12</option>
            <option>BTech</option>
            <option>BSc</option>
            <option>Any Bachelor's</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Areas of Interest *</label>
          <p className="form-hint">Select all that apply</p>
          <div className="chips-container">
            {options.interests.map(opt => (
              <span 
                key={opt} 
                className={`chip ${interests.includes(opt) ? 'selected' : ''}`} 
                onClick={() => toggle(interests, setInterests, opt)}
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Key Strengths *</label>
          <p className="form-hint">Select your top strengths</p>
          <div className="chips-container">
            {options.strengths.map(opt => (
              <span 
                key={opt} 
                className={`chip ${strengths.includes(opt) ? 'selected' : ''}`} 
                onClick={() => toggle(strengths, setStrengths, opt)}
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Preferred Languages</label>
          <p className="form-hint">Select languages you're comfortable with</p>
          <div className="chips-container">
            {options.languages.map(opt => (
              <span 
                key={opt} 
                className={`chip ${preferred_languages.includes(opt) ? 'selected' : ''}`} 
                onClick={() => toggle(preferred_languages, setLangs, opt)}
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="btn btn-primary" 
          disabled={loading || !name.trim() || interests.length === 0 || strengths.length === 0}
        >
          {loading ? 'Generating Your Career Plan...' : 'Get My Career Plan'}
        </button>
      </form>
    </div>
  )
}
