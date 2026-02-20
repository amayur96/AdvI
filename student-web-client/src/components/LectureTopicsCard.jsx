import { useState } from "react";
import { lectureTopics } from "../data/mockData";

export default function LectureTopicsCard() {
  const [selected, setSelected] = useState(new Set([10]));

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-umblue-700 uppercase tracking-wide">
          Explore Lectures
        </h3>
        <span className="text-[10px] font-semibold text-maize-600 bg-maize-50 px-2.5 py-1 rounded-full">
          Free-form
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {lectureTopics.map((t) => (
          <button
            key={t.id}
            onClick={() => toggle(t.id)}
            className={`text-xs font-medium px-3.5 py-2 rounded-full border transition ${
              selected.has(t.id)
                ? "bg-maize-500 border-maize-500 text-umblue-700 shadow-sm"
                : "bg-white border-umblue-200 text-umblue-400 hover:border-maize-400 hover:text-maize-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mini line chart placeholder */}
      <div className="mt-4 pt-4 border-t border-umblue-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-umblue-400 font-medium">Engagement trend</span>
          <span className="text-xs font-bold text-maize-600">+9.3%</span>
        </div>
        <svg className="w-full h-10" viewBox="0 0 200 40" fill="none">
          <polyline
            points="0,35 25,28 50,30 75,20 100,22 125,15 150,18 175,8 200,12"
            stroke="#FFCB05"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="0,35 25,28 50,30 75,20 100,22 125,15 150,18 175,8 200,12"
            stroke="none"
            fill="url(#maize-gradient)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="maize-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFCB05" />
              <stop offset="100%" stopColor="#FFCB05" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
