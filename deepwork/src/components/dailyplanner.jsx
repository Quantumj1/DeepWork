import { useState, useEffect } from 'react';

function DailyPlanner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState({title: '', time: '', description: '' });
  const [tasks, setTasks] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dailyTasks");
    if (saved) {
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
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
    <div className="mt-3 mx-4">
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-md">
        <div className="">
          <h2 className="text-2xl font-bold">Daily Planner</h2>
          <p className="text-gray-600">Plan your day effectively</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={() => setIsAddDialogOpen(true)}
            >
              + Add Task
            </button>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={() => changeDate(-1)}
            >
              Yesterday
            </button>
            <button 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={() => changeDate(1)}
            >
              Tomorrow
            </button>
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={() => setSelectedDate(new Date())}
            >
              Today
            </button>
          </div>
        </div>

        {/* task edit or cancel */}
      </div>
        <div className="w-full mt-6">
          <h3 className="text-xl font-semibold mb-4">Tasks for {selectedDate.toLocaleDateString()}:</h3>
          <ul className="space-y-3">
            {todayTasks.map((task) => (
              <li key={task.id} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <span className="font-medium text-lg">{task.title || 'No title'}</span>
                  {task.time && <span className="ml-2 text-gray-500 text-sm">({task.time})</span>}
                  <p className="text-sm text-gray-600 mt-1">{task.date}</p>
                  {task.description && <p className="text-sm text-gray-500 mt-1 italic">{task.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg font-medium text-sm transition-colors"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium text-sm transition-colors"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {todayTasks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No tasks for {selectedDate.toLocaleDateString()}</p>
              <p>Create your first task using the Add Task button above!</p>
            </div>
          )}
        </div>

      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
            <div className="space-y-4">
              <input
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                type="time"
                placeholder="Time (optional)"
                value={newTask.time}
                onChange={(e) => setNewTask({...newTask, time: e.target.value})}
              />
              <textarea
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24 resize-vertical"
                placeholder="Description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <div className="flex gap-3 pt-2">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
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
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                <button
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
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
  );
}

export default DailyPlanner;

