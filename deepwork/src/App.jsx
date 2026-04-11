import React from 'react'
import Navbar from './components/navbar'
import DailyPlanner from './components/dailyplanner'
import './App.css'

function App() {
  return (
    <>
    <div className='max-w-4xl mx-auto px-4'>
      <h1 className="text-4xl md:text-5xl font-black text-center 600  bg-clip-text drop-shadow-lg">
        DeepWork
      </h1>
      <p className="text-xl md:text-xl  text-center 600 ">
        Your ultimate study companion – plan your days, master your schedule, achieve deep focus
      </p>
      <br />
      <Navbar />
      <DailyPlanner />
      
    </div>
      
    </>
  )
}

export default App

