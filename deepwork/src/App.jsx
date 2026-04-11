import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import DailyPlanner from './components/dailyplanner'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<DailyPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

