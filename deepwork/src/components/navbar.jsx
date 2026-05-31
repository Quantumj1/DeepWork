import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-xl border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="items-center grid grid-rows-1 grid-flow-col gap-4">
            <div>
              <img src="../image/high-resolution-color-logo.png" alt="DeepWork Logo" className="rounded-full h-10 w-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DeepWork
              </h2>
              <p className="text-base text-gray-600">Productivity Reimagined</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="px-6 py-2 font-semibold text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
            >
              Home
            </Link>
            <Link 
              to="/planner" 
              className="px-6 py-2 font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5"
            >
              Daily Planner
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
