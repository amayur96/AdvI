export default function ActivityCard() {
  const total = 3;
  const answered = 2;
  const activities = [
    { label: "Pass-by-value vs Pass-by-reference", time: "2:34 PM", type: "success" },
    { label: "For loops vs While loops", time: "2:38 PM", type: "success" },
    { label: "Header files & .cpp files", time: "2:39 PM", type: "active" },
  ];

  const dotStyles = {
    success: "bg-maize-500",
    active: "bg-umblue-400 animate-pulse",
    pending: "bg-umblue-200",
  };

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-umblue-700 uppercase tracking-wide">
          Activity
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-maize-50 text-maize-700">Today</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-umblue-600">{answered}/{total} Questions</span>
          <span className="text-[10px] text-umblue-400">{Math.round((answered / total) * 100)}%</span>
        </div>
        <div className="h-2 bg-umblue-50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-maize-400 to-maize-500 rounded-full transition-all"
            style={{ width: `${(answered / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotStyles[a.type]}`} />
            <span className={`text-xs flex-1 ${a.type === "pending" ? "text-umblue-300" : "text-umblue-600"} ${a.type === "active" ? "font-semibold" : ""}`}>
              {a.label}
            </span>
            <span className="text-[10px] text-umblue-300 tabular-nums">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
