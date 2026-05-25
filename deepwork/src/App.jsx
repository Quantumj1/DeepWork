import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import DailyPlanner from './components/dailyplanner'
import './App.css'

function App() {
  return (
    <Router>
      <div className=" w-full min-h-screen bg-indigo-900 text-white-500 p-4 center-">
        <div className="flex justify-center items-center min-h-[200px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<DailyPlanner />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

