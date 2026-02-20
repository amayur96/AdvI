import { keyConcepts } from "../data/mockData";

const statusConfig = {
  strong: { dot: "bg-maize-500", label: "Strong", badge: "bg-maize-50 text-maize-700" },
  partial: { dot: "bg-umblue-400", label: "Partial", badge: "bg-umblue-50 text-umblue-500" },
  weak: { dot: "bg-umblue-200", label: "Weak", badge: "bg-umblue-50 text-umblue-300" },
};

export default function KeyConceptsCard() {
  return (
    <div className="bg-white rounded-2xl border border-umblue-100 p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-umblue-700 uppercase tracking-wide">
          Key Concepts
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-umblue-400">Lecture 10</span>
        </div>
      </div>

      <div className="space-y-2.5 flex-1">
        {keyConcepts.map((c, i) => {
          const cfg = statusConfig[c.status];
          return (
            <div
              key={i}
              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-umblue-50/50 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                <span className="text-sm font-medium text-umblue-700">{c.label}</span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cfg.badge}`}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
