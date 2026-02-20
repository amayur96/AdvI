// Removed mock data import - always use backend data

const severityStyles = {
  700: { bar: "bg-red-700", badge: "bg-red-50 text-red-700", dot: "bg-red-700" },
  600: { bar: "bg-red-600", badge: "bg-red-50 text-red-600", dot: "bg-red-600" },
  400: { bar: "bg-orange-400", badge: "bg-orange-50 text-orange-600", dot: "bg-orange-400" },
  300: { bar: "bg-amber-400", badge: "bg-amber-50 text-amber-600", dot: "bg-amber-400" },
};

export default function CriticalInfo({ criticalConcepts = null, onDiveDeep }) {
  // Use real data from backend - never fall back to mock data
  // If backend returns empty array, show empty state instead of mock data
  const concepts = criticalConcepts || [];
  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-4 h-full flex flex-col" style={{ minHeight: "500px" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-umblue-400">
            Critical Concepts
          </div>
          <div className="text-xs font-bold text-umblue-700 mt-0.5">
            Students struggling
          </div>
        </div>
        <span className="text-[10px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">
          {concepts.length}
        </span>
      </div>

      {/* Cards grid - 2x2 layout */}
      {concepts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-umblue-400">No critical concepts yet</p>
        </div>
      ) : (
        <div className={`grid gap-2 flex-1 grid-cols-2`}>
          {concepts.slice(0, 4).map((c) => {
          const s = severityStyles[c.severity] ?? severityStyles[400];
          return (
            <div
              key={c.id}
              className="border border-umblue-100 rounded-lg p-3 hover:shadow-sm hover:border-umblue-200 transition-all cursor-pointer"
              onClick={() => onDiveDeep(c.id, c.concept, c.pct)}
            >
              {/* Top: title + badge */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="font-semibold text-umblue-700 text-xs leading-tight flex-1 line-clamp-2">
                  {c.concept}
                </h4>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${s.badge}`}>
                  {c.pct}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-umblue-50 rounded-full mb-2">
                <div
                  className={`h-1 rounded-full ${s.bar}`}
                  style={{ width: `${c.pct}%` }}
                />
              </div>

              {/* Description - compact */}
              <p className="text-[10px] text-umblue-400 leading-relaxed line-clamp-2 mb-2">
                {c.desc}
              </p>

              {/* Dive Deep button - smaller */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDiveDeep(c.id, c.concept, c.pct);
                }}
                className="flex items-center gap-1 text-[10px] font-semibold text-umblue-600 bg-umblue-50 hover:bg-maize-500 hover:text-umblue-700 px-2 py-1 rounded-lg transition-colors w-full justify-center"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                Dive Deep
              </button>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
