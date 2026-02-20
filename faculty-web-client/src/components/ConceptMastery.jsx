import { conceptMastery as defaultConceptMastery, questionResponses as defaultQuestionResponses } from "../data/mockData";

const masteryColor = (pct) => {
  if (pct >= 80) return { bar: "#10b981", text: "#059669" };   // green
  if (pct >= 60) return { bar: "#f59e0b", text: "#d97706" };   // amber
  if (pct >= 40) return { bar: "#f87171", text: "#dc2626" };   // light red
  return { bar: "#b91c1c", text: "#991b1b" };                  // deep red
};

export default function ConceptMastery({ 
  conceptMastery = null, 
  questionResponses = null, 
  totalStudents = 0 
}) {
  // Use real data if available, otherwise fall back to mock data
  const mastery = conceptMastery && conceptMastery.length > 0 
    ? conceptMastery 
    : defaultConceptMastery;
  const responses = questionResponses && questionResponses.length > 0
    ? questionResponses
    : defaultQuestionResponses;
  const studentCount = totalStudents > 0 ? totalStudents : 142;
  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5 h-full flex flex-col" style={{ minHeight: "500px" }}>
      {/* Concept Mastery Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
            Concept Mastery
          </div>
          <span className="text-xs text-umblue-400 font-medium">Lecture 4</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {mastery.map((c, i) => {
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

      {/* Divider */}
      <div className="border-t border-umblue-100 my-4" />

      {/* Student Responses Section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
            Student Responses
          </div>
          <span className="text-xs text-umblue-400 font-medium">{studentCount} students</span>
        </div>
        <div className="flex flex-col gap-2">
          {responses.map((r, i) => (
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
        <div className="flex items-center gap-4 mt-3 pt-2 border-t border-umblue-50">
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
