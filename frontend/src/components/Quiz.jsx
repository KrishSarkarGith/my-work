
import React, { useState } from 'react'
import { submitAssessment } from '../services/api'

const chipStyle = {
  padding: '8px 12px', border: '1px solid #ccc', borderRadius: 999, cursor: 'pointer', margin: 6
}

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

  const submit = async () => {
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
    const data = await submitAssessment(payload)
    setLoading(false)
    onDone(data)
  }

  return (
    <div>
      <h2>Quick Profile</h2>
      <div style={{marginTop: 12}}>
        <label>Name</label><br/>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{padding:8, width:'100%', border:'1px solid #ccc', borderRadius:8}} />
      </div>
      <div style={{marginTop: 12}}>
        <label>Highest Education</label><br/>
        <select value={education_level} onChange={e=>setEdu(e.target.value)} style={{padding:8, borderRadius:8}}>
          <option>Class 10</option>
          <option>Class 12</option>
          <option>BTech</option>
          <option>BSc</option>
          <option>Any Bachelor's</option>
        </select>
      </div>

      <div style={{marginTop: 12}}>
        <label>Interests</label><br/>
        {options.interests.map(opt => (
          <span key={opt} style={{...chipStyle, background: interests.includes(opt)?'#eee':'#fff'}} onClick={()=>toggle(interests,setInterests,opt)}>{opt}</span>
        ))}
      </div>

      <div style={{marginTop: 12}}>
        <label>Strengths</label><br/>
        {options.strengths.map(opt => (
          <span key={opt} style={{...chipStyle, background: strengths.includes(opt)?'#eee':'#fff'}} onClick={()=>toggle(strengths,setStrengths,opt)}>{opt}</span>
        ))}
      </div>

      <div style={{marginTop: 12}}>
        <label>Preferred Languages</label><br/>
        {options.languages.map(opt => (
          <span key={opt} style={{...chipStyle, background: preferred_languages.includes(opt)?'#eee':'#fff'}} onClick={()=>toggle(preferred_languages,setLangs,opt)}>{opt}</span>
        ))}
      </div>

      <button onClick={submit} disabled={loading} style={{marginTop: 16, padding: '12px 16px', borderRadius: 10, border: 'none'}}>
        {loading ? 'Generating Plan…' : 'Get My Career Plan'}
      </button>
    </div>
  )
}
