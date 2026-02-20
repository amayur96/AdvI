import { diveDeepData } from "../data/mockData";

const insightAccent = ["border-maize-500", "border-umblue-400", "border-emerald-400"];

export default function DiveDeepModal({ open, conceptId, conceptName, pct, onClose }) {
  if (!open) return null;

  const insights = diveDeepData[conceptId] ?? [];

  return (
    <div
      className="fixed inset-0 bg-umblue-700/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scale-in .15s ease" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-umblue-100">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400 mb-1">
              Dive Deep Analysis
            </div>
            <h3 className="font-bold text-umblue-700 text-lg leading-snug">{conceptName}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-umblue-50 flex items-center justify-center text-umblue-400 hover:bg-umblue-100 transition-colors text-lg leading-none flex-shrink-0 ml-4"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Summary badge */}
          <div className="flex items-center gap-2 mb-5 p-3 bg-red-50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-sm text-red-700">
              <span className="font-bold">{pct}% of students</span> are struggling with this concept.
            </p>
          </div>

          {/* Insights */}
          <div className="flex flex-col gap-4">
            {insights.map((ins, i) => (
              <div
                key={i}
                className={`border-l-2 pl-4 ${insightAccent[i % insightAccent.length]}`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-umblue-700 mb-1">
                  {ins.title}
                </div>
                <p className="text-sm text-umblue-400 leading-relaxed">{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
