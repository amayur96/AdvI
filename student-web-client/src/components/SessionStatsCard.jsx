export default function SessionStatsCard({ messageCount, completedCount }) {
  return (
    <div className="bg-white rounded-2xl border border-umblue-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold text-umblue-700 uppercase tracking-wide">
          Session Stats
        </h3>
        <div className="w-8 h-8 rounded-xl bg-umblue-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-umblue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </div>

      <div className="text-3xl font-extrabold text-umblue-700 mt-2">
        {messageCount}
        <span className="text-sm font-medium text-umblue-400 ml-1.5">messages</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-maize-50 rounded-xl p-3 text-center">
          <div className="text-lg font-extrabold text-umblue-700">8m</div>
          <div className="text-[10px] text-umblue-400 font-medium">Duration</div>
        </div>
        <div className="bg-umblue-50 rounded-xl p-3 text-center">
          <div className="text-lg font-extrabold text-umblue-700">{completedCount}/5</div>
          <div className="text-[10px] text-umblue-400 font-medium">Qs Done</div>
        </div>
        <div className="bg-maize-50 rounded-xl p-3 text-center">
          <div className="text-lg font-extrabold text-maize-700">B+</div>
          <div className="text-[10px] text-umblue-400 font-medium">Est. Grade</div>
        </div>
      </div>
    </div>
  );
}
