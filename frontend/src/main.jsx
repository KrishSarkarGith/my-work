// Career Advisor Frontend (Single-file React + Tailwind + Framer Motion)
// Single-module preview file. Paste into your app entry (e.g. src/main.jsx or src/index.jsx)
// Recommended: react, react-dom, framer-motion, tailwindcss

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// -------------------------
// Sample questions
// -------------------------
const SAMPLE_QUESTIONS = [
  {
    id: 1,
    text: 'Which activity excites you the most?',
    options: ['Coding apps', 'Designing posters', 'Solving math problems', 'Talking to people'],
  },
  {
    id: 2,
    text: 'Pick a subject you enjoy at school',
    options: ['Computer Science', 'Art', 'Mathematics', 'Economics'],
  },
  {
    id: 3,
    text: 'What describes you best?',
    options: ['Analytical', 'Creative', 'Organized', 'Outgoing'],
  },
  {
    id: 4,
    text: 'Choose a preferred work style',
    options: ['Solo deep work', 'Team collaboration', 'Flexible & dynamic', 'Client-facing'],
  },
];

// -------------------------
// ResultCard
// -------------------------
function ResultCard({ result, onRetake }) {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] text-white flex items-center justify-center text-2xl font-bold">
          {result && result.career ? result.career[0] : 'C'}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{(result && result.career) || 'Career suggestion'}</h2>
          <p className="text-sm text-gray-500 mt-1">{(result && result.message) || 'We generated a suggestion based on your answers.'}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border">
          <div className="text-xs text-gray-500">Confidence</div>
          <div className="text-lg font-semibold mt-2">{(result && result.details && result.details.confidence) || '—'}</div>
        </div>

        <div className="p-4 rounded-xl border">
          <div className="text-xs text-gray-500">Next steps</div>
          <div className="text-sm mt-2">Explore projects, internships, and tailored learning paths to get started quickly.</div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={onRetake} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white">Retake Quiz</button>
        <a className="px-4 py-2 rounded-full bg-white border text-sm" href="#">Save Report</a>
        <a className="px-4 py-2 rounded-full bg-white border text-sm" href="#">Explore Careers</a>
      </div>
    </div>
  );
}

// -------------------------
// QuizModal
// -------------------------
function QuizModal({ onClose, onResult }) {
  const [questions] = useState(SAMPLE_QUESTIONS);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const select = (opt) => {
    const next = [...answers];
    next[qIndex] = opt;
    setAnswers(next);

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex((i) => i + 1);
      } else {
        submit(next);
      }
    }, 250);
  };

  const submit = async (finalAnswers) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const res = await fetch('/api/quiz/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      if (!res.ok) throw new Error('Server returned an error');

      const data = await res.json();
      onResult(data);
    } catch (err) {
      onResult({ career: 'Software Developer', message: "Based on your answers, software development seems like a great fit!", details: { confidence: '80%' } });
    } finally {
      setLoading(false);
    }
  };

  const progress = Math.round((qIndex / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-xl p-6 bg-white rounded-2xl shadow-2xl border"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Question {qIndex + 1} of {questions.length}</div>
                <div className="text-xs text-gray-400 mt-1">Quick • Fun • No right answer</div>
              </div>
              <div>
                <button onClick={onClose} className="text-sm text-gray-500">Close ✕</button>
              </div>
            </div>

            <div className="mt-4">
              <motion.h3 key={questions[qIndex].id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-semibold">
                {questions[qIndex].text}
              </motion.h3>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[qIndex].options.map((opt) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={opt}
                    onClick={() => select(opt)}
                    className="text-left p-4 rounded-xl border hover:shadow-md transition-shadow"
                  >
                    <div className="font-medium">{opt}</div>
                    <div className="text-xs text-gray-400 mt-1">Select</div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div style={{ width: `${progress}%` }} className="h-2 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]" />
                </div>
                <div className="text-xs text-gray-500 mt-2">{qIndex} of {questions.length} completed</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border flex flex-col items-center gap-4">
            <div className="animate-pulse text-3xl">✨</div>
            <div className="text-lg font-semibold">Crunching your strengths...</div>
            <div className="text-sm text-gray-500">We're matching your profile to the best career options — hang tight!</div>
            <div className="w-full mt-4">
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] animate-[pulse_2s_infinite]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------
// Hero
// -------------------------
function Hero({ onStart }) {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Find the career that fits you — fun, fast & personal.</h1>
          <p className="mt-4 text-lg text-gray-600">Answer a quick, interactive quiz and get tailored career suggestions based on your interests and strengths.</p>

          <div className="mt-8 flex gap-4">
            <button onClick={onStart} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-medium shadow-lg">Start Quiz</button>
            <button className="px-6 py-3 rounded-full bg-white border shadow text-sm">Learn more</button>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">⭐ Engaging questions</div>
            <div className="flex items-center gap-2">⚡ Instant results</div>
            <div className="flex items-center gap-2">🔒 Privacy-first</div>
            <div className="flex items-center gap-2">📱 Fully responsive</div>
          </div>
        </div>

        <div className="flex-1 relative">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a9f861171b3b3d9f8a2a9b4c4c6a9a1"
            alt="students"
            className="rounded-3xl shadow-2xl w-full object-cover max-h-96"
          />

          <div className="absolute -left-4 -bottom-6 bg-white px-4 py-3 rounded-2xl shadow-md border">
            <div className="text-sm font-semibold">Quick Quiz</div>
            <div className="text-xs text-gray-500">5-8 mins • Personalized</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------
// App (root)
// -------------------------
function App() {
  const [started, setStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 -top-20 w-96 h-96 bg-gradient-to-tr from-[#a78bfa] to-[#60a5fa] opacity-20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-20 w-96 h-96 bg-gradient-to-br from-[#34d399] to-[#60a5fa] opacity-12 rounded-full blur-3xl" />

      <header className="z-20">
        <nav className="max-w-6xl mx-auto p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">🎯</div>
            <div className="font-semibold text-lg">CareerSpark</div>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <a className="text-sm">About</a>
            <a className="text-sm">How it works</a>
            <button onClick={() => { setShowQuiz(true); setStarted(true); }} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white text-sm shadow">Start Quiz</button>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center">
        {!started && <Hero onStart={() => { setShowQuiz(true); setStarted(true); }} />}

        {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onResult={(res) => { setResult(res); setShowQuiz(false); }} />}

        {result && <div className="p-6"><ResultCard result={result} onRetake={() => { setResult(null); setShowQuiz(true); }} /></div>}
      </main>

      <footer className="text-center p-6 text-sm text-gray-500">Made with ❤️ for students — experiment, explore, succeed.</footer>
    </div>
  );
}

// -------------------------
// Render app
// -------------------------
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
