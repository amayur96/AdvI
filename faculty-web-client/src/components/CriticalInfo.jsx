import { useEffect, useRef, useState } from "react";

const severityStyles = {
  700: { bar: "#b91c1c", bg: "bg-red-50", badge: "bg-red-100 text-red-700" },
  600: { bar: "#dc2626", bg: "bg-red-50/50", badge: "bg-red-50 text-red-600" },
  400: { bar: "#f59e0b", bg: "bg-amber-50/50", badge: "bg-amber-50 text-amber-600" },
  300: { bar: "#fbbf24", bg: "bg-amber-50/30", badge: "bg-yellow-50 text-yellow-600" },
};

function AnimatedBar({ pct, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 150);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div className="h-1.5 bg-umblue-50 rounded-full w-full overflow-hidden">
      <div
        className="h-1.5 rounded-full"
        style={{
          width: `${width}%`,
          backgroundColor: color,
          transition: "width 0.9s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

export default function CriticalInfo({ criticalConcepts = null, onDiveDeep }) {
  // Use real data from backend - never fall back to mock data
  const concepts = criticalConcepts || [];
  
  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-4 h-full flex flex-col" style={{ minHeight: "500px" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-umblue-400">
            Critical Concepts
          </div>
          <div className="text-xs font-bold text-umblue-700 mt-0.5">Students struggling most</div>
        </div>
        <span className="text-[10px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">
          {concepts.length}
        </span>
      </div>

      {/* Single column, 4 rows */}
      {concepts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-umblue-400">No critical concepts yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 flex-1">
          {concepts.slice(0, 4).map((c) => {
            const s = severityStyles[c.severity] ?? severityStyles[400];
            return (
              <div
                key={c.id}
                className={`border border-umblue-100 rounded-xl p-3 hover:shadow-sm hover:border-umblue-200 transition-all cursor-pointer flex-1 flex flex-col justify-between ${s.bg}`}
                onClick={() => onDiveDeep(c.id, c.concept, c.pct)}
              >
                {/* Top row: name + pct badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-umblue-700 text-xs leading-snug flex-1">{c.concept}</h4>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${s.badge}`}>
                    {c.pct}%
                  </span>
                </div>

                {/* Progress bar */}
                <AnimatedBar pct={c.pct} color={s.bar} />

                {/* Short description */}
                <p className="text-[9px] text-umblue-400 leading-relaxed mt-1.5 line-clamp-2">{c.desc}</p>

                {/* Dive Deeper button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDiveDeep(c.id, c.concept, c.pct);
                  }}
                  className="flex items-center gap-1 text-[10px] font-semibold text-umblue-600 bg-white/70 hover:bg-maize-500 hover:text-umblue-700 px-2 py-1 rounded-lg transition-colors w-full justify-center mt-2 border border-umblue-100"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                  Dive Deeper
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
