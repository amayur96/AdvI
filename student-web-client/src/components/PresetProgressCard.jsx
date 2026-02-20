import { presetQuestions } from "../data/mockData";

export default function PresetProgressCard({ completedCount }) {
  const total = presetQuestions.length;
  const pct = Math.round((completedCount / total) * 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-umblue-700 uppercase tracking-wide">
          Preset Questions
        </h3>
        <span className="text-xs font-semibold text-umblue-400 bg-umblue-50 px-2.5 py-1 rounded-full">
          Lecture 10
        </span>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center gap-5 mb-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#E8F0FA" strokeWidth="8" />
            <circle
              cx="50" cy="50" r={radius} fill="none"
              stroke="#FFCB05" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-extrabold text-umblue-700">{pct}%</span>
          </div>
        </div>
        <div className="text-sm text-umblue-500">
          <span className="text-2xl font-extrabold text-umblue-700 block">{completedCount}/{total}</span>
          completed
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-2 flex-1">
        {presetQuestions.map((q, i) => {
          const done = i < completedCount;
          const active = i === completedCount;
          return (
            <div
              key={q.id}
              className={`flex items-center gap-2.5 text-xs rounded-lg px-3 py-2 transition ${
                done
                  ? "bg-umblue-50/50 text-umblue-300 line-through"
                  : active
                    ? "bg-maize-50 text-umblue-700 font-semibold border border-maize-300"
                    : "text-umblue-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  done
                    ? "bg-maize-500 text-umblue-700"
                    : active
                      ? "border-2 border-maize-500 text-maize-600"
                      : "border-2 border-umblue-200 text-umblue-300"
                }`}
              >
                {done ? "✓" : q.id}
              </div>
              <span className="truncate">{q.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
