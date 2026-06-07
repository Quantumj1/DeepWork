import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { TimetableGrid } from "./TimetableGrid";
import { AddClassDialog } from "./AddClassDialog";

// Note: this project is .jsx (no TypeScript). Keep types out of runtime.
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Timetable() {
  const [classes, setClasses] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  // Load classes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("timetableClasses");
    if (!saved) return;
    // Defer to next tick to avoid effect cascading warnings.
    const id = window.setTimeout(() => {
      setClasses(JSON.parse(saved));
    }, 0);
    return () => window.clearTimeout(id);
  }, []);


  // Save classes to localStorage
  useEffect(() => {
    localStorage.setItem("timetableClasses", JSON.stringify(classes));
  }, [classes]);

  const addClass = (classData) => {
    const newClass = { ...classData, id: crypto.randomUUID() };
    setClasses([...classes, newClass]);
  };

  const updateClass = (id, updates) => {
    setClasses(
      classes.map((cls) => (cls.id === id ? { ...cls, ...updates } : cls))
    );
  };

  const deleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  const handleEditClass = (cls) => {
    setEditingClass(cls);
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setEditingClass(null);
  };

  return (
    <div className="w-full  mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 p-6 mx-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Weekly Timetable
            </h2>
            <p className="text-xl text-gray-600">Plan your week, achieve more</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Class
          </Button>
        </div>
      </div>

      {/* Timetable Grid */}
      <TimetableGrid
        days={days}
        classes={classes}
        onEdit={handleEditClass}
        onDelete={deleteClass}
      />

      {/* Add/Edit Class Dialog */}
      <AddClassDialog
        open={isAddDialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={(classData) => {
          if (editingClass) {
            updateClass(editingClass.id, classData);
          } else {
            addClass(classData);
          }
          handleDialogClose();
        }}
        initialData={editingClass}
        days={days}
      />
    </div>
  );
}
