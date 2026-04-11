import { useState, useEffect } from 'react';
import Navbar from './navbar';

function DailyPlanner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState({title: '', time: '', description: '' });
  const [tasks, setTasks] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage - standard pattern
  useEffect(() => {
    const saved = localStorage.getItem("dailyTasks");
    if (saved) {
      // Standard React pattern for localStorage init
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
  }, [tasks]);

  const todayTasks = tasks.filter(
    (task) => task.date === selectedDate.toISOString().split('T')[0]
  );

  const addTask = (task) => {
    const newTaskData = { ...task, id: crypto.randomUUID() };
    setTasks([...tasks, newTaskData]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title || '',
      time: task.time || '',
      description: task.description || ''
    });
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setEditingTask(null);
    setNewTask({title: '', time: '', description: ''});
  };

  return (
    <>
     <Navbar />
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Daily Planner
          </h2>
          <p className="text-xl text-gray-600">Plan your day, achieve more</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            onClick={() => setIsAddDialogOpen(true)}
          >
            + Add Task
          </button>
          <button 
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            onClick={() => changeDate(-1)}
          >
            Yesterday
          </button>
          <button 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            onClick={() => changeDate(1)}
          >
            Tomorrow
          </button>
          <button 
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Tasks for {selectedDate.toLocaleDateString()}</h3>
          {todayTasks.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-2xl border border-dashed border-gray-300">
              <div className="text-6xl mb-4">📝</div>
              <h4 className="text-2xl font-bold text-gray-600 mb-2">No tasks yet</h4>
              <p className="text-lg text-gray-500 mb-6">Get started by adding your first task above</p>
              <button 
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() => setIsAddDialogOpen(true)}
              >
                Create First Task
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {todayTasks.map((task) => (
                <div key={task.id} className="group bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-blue-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-gray-900 mb-1 truncate">{task.title}</h4>
                      {task.time && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293 .707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {task.time}
                        </div>
                      )}
                      {task.description && (
                        <p className="text-gray-600 leading-relaxed mb-3 line-clamp-2">{task.description}</p>
                      )}
                      <p className="text-sm text-gray-500">Due: {task.date}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 ml-4">
                      <button 
                        className="group-hover:bg-yellow-500 text-yellow-700 bg-yellow-100 p-2 rounded-2xl hover:bg-yellow-500 hover:text-white transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                        onClick={() => handleEditTask(task)}
                        title="Edit task"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H8a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1.586l-.293.293a1 1 0 01-1.414 0l-3.586-3.586a1 1 0 010-1.414l.293-.293A1 1 0 0112 11V8a1 1 0 011-1h1" />
                        </svg>
                      </button>
                      <button 
                        className="group-hover:bg-red-500 text-red-700 bg-red-100 p-2 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <h3 className="text-3xl font-black mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {editingTask ? 'Edit Task' : 'New Task'}
            </h3>
            <div className="space-y-5">
              <input
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
              <div className="grid grid-cols-1 gap-4">
                <input
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm"
                  type="time"
                  placeholder="Time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                />
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm h-32 resize-none"
                  placeholder="Additional details (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
                  onClick={() => {
                    const taskData = {...newTask, date: selectedDate.toISOString().split('T')[0]};
                    if (editingTask) {
                      updateTask(editingTask.id, taskData);
                    } else {
                      addTask(taskData);
                    }
                    handleDialogClose();
                  }}
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default DailyPlanner;

