import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import DailyPlanner from './components/dailyplanner'
import TimeTableDialog from './components/timetabledialog'
import Navbar from './components/navbar'
import './App.css'

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <div className="w-full min-h-screen bg-indigo-900 text-white">
      {showNavbar && <Navbar />}
      <div className="flex justify-center items-start min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<DailyPlanner />} />
          <Route path="/timetable" element={<TimeTableDialog />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App

