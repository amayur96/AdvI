import { criticalConcepts } from "../data/mockData";

const severityStyles = {
  700: { bar: "bg-red-700", badge: "bg-red-50 text-red-700", dot: "bg-red-700" },
  600: { bar: "bg-red-600", badge: "bg-red-50 text-red-600", dot: "bg-red-600" },
  400: { bar: "bg-orange-400", badge: "bg-orange-50 text-orange-600", dot: "bg-orange-400" },
  300: { bar: "bg-amber-400", badge: "bg-amber-50 text-amber-600", dot: "bg-amber-400" },
};

export default function CriticalInfo({ onDiveDeep }) {
  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
            Critical Concepts
          </div>
          <div className="text-sm font-bold text-umblue-700 mt-0.5">
            Concepts students are struggling with
          </div>
        </div>
        <span className="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1 rounded-full">
          {criticalConcepts.length} flagged
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {criticalConcepts.map((c) => {
          const s = severityStyles[c.severity] ?? severityStyles[400];
          return (
            <div
              key={c.id}
              className="border border-umblue-100 rounded-xl p-4 hover:shadow-md hover:border-umblue-200 transition-all group"
            >
              {/* Top: title + badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-umblue-700 text-sm leading-snug flex-1">
                  {c.concept}
                </h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${s.badge}`}>
                  {c.pct}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-umblue-50 rounded-full mb-3">
                <div
                  className={`h-1 rounded-full ${s.bar}`}
                  style={{ width: `${c.pct}%` }}
                />
              </div>

              {/* Description */}
              <p className="text-xs text-umblue-400 leading-relaxed mb-3 line-clamp-3">
                {c.desc}
              </p>

              {/* Dive Deep button */}
              <button
                onClick={() => onDiveDeep(c.id, c.concept, c.pct)}
                className="flex items-center gap-1.5 text-xs font-semibold text-umblue-700 bg-umblue-50 hover:bg-maize-500 hover:text-umblue-700 px-3 py-1.5 rounded-full transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                Dive Deep
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
