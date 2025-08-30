
# SIH One‑Stop Career & Education Advisor (MVP)

A full‑stack demo built for SIH judging: FastAPI backend + React (Vite) frontend, with a simple AI recommender using scikit‑learn TF‑IDF + cosine similarity.

## Run Backend (FastAPI)
```bash
cd backend
python -m venv .venv && . .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

## Run Frontend (React + Vite)
```bash
cd frontend
npm install
# tell frontend where API lives (optional if using default 127.0.0.1:8000)
# create .env file with: VITE_API_BASE=http://127.0.0.1:8000
npm run dev
```
Open http://localhost:5173

## Notes
- Dataset is in `backend/models/data/careers.json` – extend with 1500+ careers.
- Recommendation approach: TF‑IDF over skills/description; compares with user profile text.
- Multilingual-ready: Add options in quiz and feed translated text to the recommender.
- Add WhatsApp bot by exposing backend endpoints to a WhatsApp provider (e.g., Twilio/Meta Cloud API).

## Folder Structure
- `backend/` FastAPI app + recommender
- `frontend/` React Vite app
