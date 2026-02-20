import { useState } from "react";

export default function AiInsights({ insights = [] }) {
  const [expanded, setExpanded] = useState({});

  if (!insights || insights.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5 h-full flex flex-col items-center justify-center" style={{ minHeight: "500px" }}>
        <div className="text-center">
          <div className="w-16 h-16 bg-umblue-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-umblue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-sm text-umblue-400 font-medium">No insights available yet</p>
          <p className="text-xs text-umblue-300 mt-1">AI insights will appear as students interact with the material</p>
        </div>
      </div>
    );
  }

  const toggleExpanded = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5 h-full flex flex-col" style={{ minHeight: "500px" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-maize-400 to-maize-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-umblue-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
                AI Insights
              </div>
              <div className="text-xs font-bold text-umblue-700 mt-0.5">
                Improve Your Lectures
              </div>
            </div>
          </div>
        </div>
        <span className="text-[10px] bg-maize-50 text-maize-700 font-semibold px-2 py-0.5 rounded-full">
          {insights.length}
        </span>
      </div>

      {/* Insights List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {insights.map((insight, index) => {
          const isExpanded = expanded[index];
          const severity = insight.struggling_pct >= 70 ? "high" : insight.struggling_pct >= 40 ? "medium" : "low";
          
          return (
            <div
              key={index}
              className={`border rounded-lg p-3 transition-all ${
                severity === "high"
                  ? "border-red-200 bg-red-50/30"
                  : severity === "medium"
                  ? "border-orange-200 bg-orange-50/30"
                  : "border-amber-200 bg-amber-50/30"
              }`}
            >
              {/* Header - Concept + Percentage */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-umblue-700 text-xs leading-tight">
                      {insight.concept}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        severity === "high"
                          ? "bg-red-100 text-red-700"
                          : severity === "medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {Math.round(insight.struggling_pct)}% struggling
                    </span>
                  </div>
                  {insight.summary && (
                    <p className="text-[10px] text-umblue-600 leading-relaxed line-clamp-2">
                      {insight.summary}
                    </p>
                  )}
                </div>
              </div>

              {/* Recommendation (expandable) */}
              {insight.recommendation && (
                <div>
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-umblue-600 hover:text-umblue-700 transition-colors w-full text-left"
                  >
                    <svg
                      className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>View Recommendation</span>
                  </button>
                  {isExpanded && (
                    <div className="mt-2 pl-4.5 border-l-2 border-maize-400">
                      <p className="text-[10px] text-umblue-700 leading-relaxed">
                        {insight.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="mt-4 pt-3 border-t border-umblue-50">
        <p className="text-[10px] text-umblue-400 text-center">
          💡 Insights update automatically as students interact with the material
        </p>
      </div>
    </div>
  );
}
