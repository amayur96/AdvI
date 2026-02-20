import { dashboardStats, conceptMastery, questionResponses } from "../data/mockData";

// Severity color for concept mastery
const masteryColor = (pct) => {
  if (pct >= 80) return { bar: "#10b981", text: "#059669" };   // green
  if (pct >= 60) return { bar: "#f59e0b", text: "#d97706" };   // amber
  if (pct >= 40) return { bar: "#f87171", text: "#dc2626" };   // light red
  return { bar: "#b91c1c", text: "#991b1b" };                  // deep red
};

function TrendIcon({ up }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      {up
        ? <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
        : <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
      }
    </svg>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {dashboardStats.map((s, i) => (
        <div key={i} className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400 mb-1">
            {s.label}
          </div>
          <div className={`text-3xl font-extrabold leading-none mb-2 ${!s.up && i === 1 ? "text-amber-500" : "text-umblue-700"}`}>
            {s.value}
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-green-600" : "text-red-500"}`}>
            <TrendIcon up={s.up} />
            {s.change}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartsColumn() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Concept Mastery */}
      <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
            Concept Mastery
          </div>
          <span className="text-xs text-umblue-400 font-medium">Lecture 10</span>
        </div>
        <div className="flex flex-col gap-3">
          {conceptMastery.map((c, i) => {
            const col = masteryColor(c.pct);
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-umblue-700 font-medium">{c.label}</span>
                  <span className="text-xs font-bold" style={{ color: col.text }}>{c.pct}%</span>
                </div>
                <div className="h-1.5 bg-umblue-50 rounded-full">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${c.pct}%`, background: col.bar }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Responses */}
      <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
            Student Responses
          </div>
          <span className="text-xs text-umblue-400 font-medium">128 students</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {questionResponses.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-bold text-umblue-400 w-5 flex-shrink-0">{r.label}</span>
              <div className="flex-1 flex h-2 rounded-full overflow-hidden gap-px">
                <div className="bg-emerald-400 rounded-l-full" style={{ width: `${r.correct}%` }} />
                <div className="bg-amber-400" style={{ width: `${r.partial}%` }} />
                <div className="bg-red-400 rounded-r-full" style={{ width: `${r.incorrect}%` }} />
              </div>
              <span className="text-[10px] text-umblue-400 w-8 text-right flex-shrink-0">{r.correct}%</span>
            </div>
          ))}
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-umblue-50">
          {[
            { color: "bg-emerald-400", label: "Strong" },
            { color: "bg-amber-400", label: "Partial" },
            { color: "bg-red-400", label: "Struggling" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-[10px] text-umblue-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ statsOnly, chartsOnly }) {
  if (statsOnly) return <StatsRow />;
  if (chartsOnly) return <ChartsColumn />;
  return (
    <div>
      <StatsRow />
      <div className="mt-4">
        <ChartsColumn />
      </div>
    </div>
  );
}
