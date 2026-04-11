import React from 'react'
import Navbar from './components/navbar'
import DailyPlanner from './components/dailyplanner'
import './App.css'

function App() {
return (
  
  <div className='min-h-screen bg-indigo-100'>
    <Navbar />
    <DailyPlanner />
  </div>
)
}

export default App

