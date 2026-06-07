import { useMemo } from "react";

// Lightweight timetable grid.
// Expects classes shaped like:
// { id, title, location, instructor, day, startTime, endTime, color }
export function TimetableGrid({ days, classes, onEdit, onDelete }) {
  const classesByDay = useMemo(() => {
    const map = new Map();
    for (const d of days) map.set(d, []);
    for (const cls of classes || []) {
      if (!map.has(cls.day)) map.set(cls.day, []);
      map.get(cls.day).push(cls);
    }
    // Sort by start time (lexicographic works for HH:MM)
    for (const [k, list] of map.entries()) {
      list.sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));
      map.set(k, list);
    }
    return map;
  }, [days, classes]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {days.map((day) => {
          const dayClasses = classesByDay.get(day) || [];
          return (
            <div key={day} className="min-h-[220px]">
              <div className="text-slate-700 font-semibold mb-3">{day}</div>
              <div className="space-y-3">
                {dayClasses.length === 0 ? (
                  <div className="text-slate-400 text-sm italic">No classes</div>
                ) : (
                  dayClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="rounded-xl p-3 border border-slate-200 shadow-sm"
                      style={{
                        backgroundColor: cls.color || "#e0f2fe",
                        borderColor: "rgba(15,23,42,0.12)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm truncate">
                            {cls.title}
                          </div>
                          {(cls.startTime || cls.endTime) && (
                            <div className="text-slate-700 text-xs mt-1">
                              {cls.startTime || ""} - {cls.endTime || ""}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            className="text-slate-700 hover:text-blue-700 text-xs font-semibold"
                            onClick={() => onEdit?.(cls)}
                            title="Edit"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-slate-700 hover:text-red-700 text-xs font-semibold"
                            onClick={() => onDelete?.(cls.id)}
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {(cls.location || cls.instructor) && (
                        <div className="text-slate-800 text-xs mt-2 space-y-1">
                          {cls.location && (
                            <div className="truncate">{cls.location}</div>
                          )}
                          {cls.instructor && (
                            <div className="truncate">{cls.instructor}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

