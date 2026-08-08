import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import DailyPlanner from './components/dailyplanner'
import TimeTableDialog from './components/timetabledialog'
import Navbar from './components/navbar'
import './App.css'

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-indigo-900 text-white">
        <Navbar />
        <div className="flex justify-center items-start min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<DailyPlanner />} />
            <Route path="/timetable" element={<TimeTableDialog />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

