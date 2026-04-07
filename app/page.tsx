"use client";

import { useState, useEffect } from "react";

// ================= UTILITIES =================
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const isInRange = (date: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false;
  return date >= start && date <= end;
};

const formatKey = (start: Date, end: Date) =>
  `${start.toISOString()}_${end.toISOString()}`;

export default function WallCalendar() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("calendar-notes-map");
    if (saved) setNotesMap(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("calendar-notes-map", JSON.stringify(notesMap));
    }
  }, [notesMap, mounted]);

  if (!mounted) return null;

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      setCurrentNote("");
    } else if (clickedDate >= startDate) {
      setEndDate(clickedDate);
      const key = formatKey(startDate, clickedDate);
      setCurrentNote(notesMap[key] || "");
    } else {
      setStartDate(clickedDate);
      setEndDate(null);
      setCurrentNote("");
    }
  };

  const saveNote = () => {
    if (startDate && endDate) {
      const key = formatKey(startDate, endDate);
      setNotesMap((prev) => ({ ...prev, [key]: currentNote }));
    }
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => today.getFullYear() - 5 + i
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-black/60 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-3xl w-full max-w-6xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* HERO */}
        <div className="relative h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Calendar visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
            <h1 className="text-white text-4xl font-bold tracking-wide">
              {monthNames[currentMonth]}
            </h1>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 flex flex-col gap-5">
          {/* NAV + YEAR */}
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={prevMonth}
              className="px-3 py-1 bg-black text-white rounded-xl shadow hover:scale-105 transition"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">
                {monthNames[currentMonth]}
              </h2>

              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="bg-black text-white border border-gray-700 rounded-lg px-2 py-1 text-sm shadow"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={nextMonth}
              className="px-3 py-1 bg-black text-white rounded-xl shadow hover:scale-105 transition"
            >
              →
            </button>
          </div>

          <p className="text-sm text-gray-300">Select a start and end date</p>

          {/* DAYS */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 tracking-wide">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-7 gap-2">
            {daysArray.map((day, idx) => {
              if (!day) return <div key={idx} className="h-10" />;

              const dateObj = new Date(currentYear, currentMonth, day);

              const isStart = isSameDay(dateObj, startDate);
              const isEnd = isSameDay(dateObj, endDate);
              const inRange = isInRange(dateObj, startDate, endDate);
              const isToday = isSameDay(dateObj, today);

              return (
                <div
                  key={idx}
                  onClick={() => handleDateClick(day)}
                  className={`h-10 flex items-center justify-center cursor-pointer rounded-xl text-sm transition-all duration-200
                    ${
                      isStart || isEnd
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110"
                        : "text-gray-200"
                    }
                    ${inRange ? "bg-purple-900/40" : ""}
                    ${isToday ? "ring-2 ring-indigo-400" : ""}
                    hover:bg-gray-700 hover:scale-105
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* NOTES */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-white">Notes</label>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Add notes for selected range..."
              className="border border-gray-600 bg-gray-900 text-white rounded-xl p-3 min-h-[110px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={saveNote}
              className="bg-black text-white py-2 rounded-xl shadow hover:scale-105 transition"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
