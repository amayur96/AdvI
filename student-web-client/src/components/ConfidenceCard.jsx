import { confidenceBars } from "../data/mockData";

const colorMap = {
  "var(--success)": { bar: "bg-maize-500", label: "text-umblue-600" },
  "var(--warning)": { bar: "bg-maize-400", label: "text-umblue-500" },
  "var(--danger)": { bar: "bg-umblue-400", label: "text-umblue-400" },
  "#CBD5E1": { bar: "bg-umblue-200", label: "text-umblue-300" },
};

export default function ConfidenceCard() {
  const avgConfidence = Math.round(
    confidenceBars.reduce((sum, b) => sum + b.pct, 0) / confidenceBars.length
  );

  return (
    <div className="bg-umblue-700 rounded-2xl p-5 shadow-sm text-white flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-maize-300">
          Your Confidence
        </h3>
        <div className="w-8 h-8 rounded-xl bg-umblue-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-maize-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </div>

      {/* Ring */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke="#FFCB05" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - avgConfidence / 100)}`}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold">{avgConfidence}%</span>
            <span className="text-[10px] text-maize-300 -mt-0.5">Overall</span>
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-3 flex-1">
        {confidenceBars.map((b, i) => {
          const colors = colorMap[b.color] || colorMap["#CBD5E1"];
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs w-20 text-umblue-200 flex-shrink-0">{b.label}</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                  style={{ width: `${b.pct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-maize-400 w-8 text-right">{b.pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
