


function Navbar() {
  return (
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-md ">
        <div className="">
            <h2 className="text-lg font-bold text-left">StudyTime</h2>
            <p className="text-xs text-left">Manage your schedule effectively</p>
        </div>
        <div className="flex items-center gap-1">
            <a href="/daily-schedule" className="flex items-center gap-2 bg-indigo-600 hover:bg-orange-500 text-white font-bold py-2 px-2 rounded transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Daily Schedule
            </a>
            <a href="/timetable" className="flex items-center gap-2 bg-blue-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded transition-colors ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2zM9 8a1 1 0 11-2 0 1 1 0 012 0zm2 0a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              Timetable
            </a>
        </div>
      </div>
  )
}

export default Navbar