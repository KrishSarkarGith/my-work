
const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

export async function submitAssessment(payload){
  const res = await fetch(`${API_BASE}/api/assess`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export async function listCareers(){
  const res = await fetch(`${API_BASE}/api/careers`)
  return await res.json()
}
