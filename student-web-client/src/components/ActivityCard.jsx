export default function ActivityCard({ answeredCount = 0, totalQuestions = 3, presetQuestions = [], presetComplete = false }) {
  // Extract concept labels from preset questions, or use fallback labels
  const questionLabels = presetQuestions.length > 0
    ? presetQuestions.map((q) => q.concept || q.question.substring(0, 50) + "...")
    : [
        "Pass-by-value vs Pass-by-reference",
        "For loops vs While loops",
        "Header files & .cpp files",
      ];

  const activities = questionLabels.map((label, i) => ({
    label,
    type: i < answeredCount ? "success" : i === answeredCount && !presetComplete ? "active" : "pending",
  }));

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
          <span className="text-[11px] font-semibold text-umblue-600">{answeredCount}/{totalQuestions} Questions</span>
          <span className="text-[10px] text-umblue-400">{Math.round((answeredCount / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-umblue-50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-maize-400 to-maize-500 rounded-full transition-all"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
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
            {a.type === "success" && (
              <svg className="w-3.5 h-3.5 text-maize-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
