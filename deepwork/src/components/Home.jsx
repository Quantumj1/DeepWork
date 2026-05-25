import { Link } from 'react-router-dom';

function Home() {
  return (
      <div className="max-w-6xl text-center w-full min-h-screen flex flex-col items-center justify-center px-4">
        <div className="mb-2 p-4 content-center w-full">
          <img className='mx-auto w-20 h-20 rounded-full' src="../image/high-resolution-color-logo.png" alt="DeepWork Logo" />
          <h1 className='text-5xl md:text-7xl text-transparent mb-10 bg-clip-text text-white'>Welcome To DeepWork</h1>
          <p className='text-5xl md:text-2xl max-w-3xl mx-auto bg-clip-text text-white'>Productivity Reimagined</p>
          <p className="text-5xl md:text-2xl max-w-3xl mx-auto bg-clip-text text-white">
            Your ultimate study companion for focused learning and productivity
          </p>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-20 justify-items-center">
          <div className="group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl hover:shadow-3xl border 
          border-white/50 hover:-translate-y-3 transition-all duration-500 hover:border-blue-200 max-w-md">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center 
            justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Planner</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">Plan your day with time blocking, task 
              prioritization, and intelligent scheduling that adapts to your needs.</p>
            <Link to="/planner" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 
            hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg 
            hover:shadow-xl transition-all transform hover:-translate-y-1">
              Get Started →
            </Link>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl hover:shadow-3xl border border-white/50 hover:-translate-y-3 transition-all duration-500 hover:border-emerald-200 max-w-md">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v1H4zm6 0v-1h4v1h-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Timetable</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">Visualize your week with color-coded classes, drag-and-drop rescheduling, and automatic conflict detection.</p>
            <Link to="/timetable" className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Get Started →
            </Link>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-8 bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 mb-12 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.858 5.757a.75.75 0 00-1.061 1.061l1.767 1.768a.75.75 0 001.061-1.061L7.858 5.757zM14 13a1 1 0 11-2 0 1 1 0 012 0zm-6.5 1.5a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75h5a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">Ready to get started?</h3>
              <p className="text-xl text-gray-700">Dive into your daily planner and transform your productivity</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
