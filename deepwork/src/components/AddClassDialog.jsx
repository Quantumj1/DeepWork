import { useEffect, useMemo, useState } from "react";

const DEFAULT_COLOR = "#a7f3d0"; // light green

export function AddClassDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  days,
}) {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    title: "",
    location: "",
    instructor: "",
    day: days?.[0] || "Monday",
    startTime: "",
    endTime: "",
    color: DEFAULT_COLOR,
  });

  useEffect(() => {
    if (!open) return;

    // Avoid cascading renders by deferring the state update to the next tick.
    const nextTick = () => {
      if (initialData) {
        setForm({
          title: initialData.title || "",
          location: initialData.location || "",
          instructor: initialData.instructor || "",
          day: initialData.day || days?.[0] || "Monday",
          startTime: initialData.startTime || "",
          endTime: initialData.endTime || "",
          color: initialData.color || DEFAULT_COLOR,
        });
      } else {
        setForm({
          title: "",
          location: "",
          instructor: "",
          day: days?.[0] || "Monday",
          startTime: "",
          endTime: "",
          color: DEFAULT_COLOR,
        });
      }
    };

    const id = window.setTimeout(nextTick, 0);
    return () => window.clearTimeout(id);
  }, [open, initialData, days]);

  const [error, setError] = useState("");

  const colorPresets = useMemo(
    () => [
      "#bfdbfe", // blue
      "#a7f3d0", // green
      "#fecaca", // red
      "#ddd6fe", // purple
      "#fde68a", // amber
      "#fecdd3", // pink-ish
      "#e9d5ff", // violet
    ],
    []
  );

  if (!open) return null;

  const validate = () => {
    if (!form.title.trim()) return "Class title is required.";
    if (!form.day) return "Day is required.";
    if (!form.startTime) return "Start time is required.";
    if (!form.endTime) return "End time is required.";
    if (form.endTime <= form.startTime)
      return "End time must be after start time.";
    return "";
  };

  const submit = () => {
    const msg = validate();
    setError(msg);
    if (msg) return;

    onSubmit?.({
      title: form.title.trim(),
      location: form.location.trim(),
      instructor: form.instructor.trim(),
      day: form.day,
      startTime: form.startTime,
      endTime: form.endTime,
      color: form.color,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isEdit ? "Edit Class" : "Add Class"}
            </h3>
            <p className="text-slate-600 mt-2">Weekly timetable details</p>
          </div>
          <button
            type="button"
            className="text-slate-600 hover:text-slate-900 text-2xl leading-none"
            onClick={() => onOpenChange?.(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Title
              </label>
              <input
                className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Day
              </label>
              <select
                className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm bg-white"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
              >
                {(days || []).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Start time
              </label>
              <input
                type="time"
                className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                End time
              </label>
              <input
                type="time"
                className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g., Room 204"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Instructor
              </label>
              <input
                className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                placeholder="e.g., Dr. Smith"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setForm({ ...form, color: c })}
                  className="w-8 h-8 rounded-full border border-slate-300 shadow-sm"
                  style={{ backgroundColor: c, outline: form.color === c ? "2px solid rgb(79,70,229)" : "none" }}
                  aria-label={`Select color ${c}`}
                />
              ))}
              <input
                type="color"
                className="w-10 h-10 p-0 border border-slate-300 rounded-full"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                aria-label="Pick a custom color"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
              onClick={submit}
            >
              {isEdit ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

