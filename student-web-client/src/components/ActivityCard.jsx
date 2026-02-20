export default function ActivityCard() {
  const activities = [
    { label: "Completed Q1", time: "2:34 PM", type: "success" },
    { label: "Completed Q2", time: "2:38 PM", type: "success" },
    { label: "Answering Q3...", time: "2:39 PM", type: "active" },
    { label: "Q4 – Pending", time: "—", type: "pending" },
    { label: "Q5 – Pending", time: "—", type: "pending" },
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
