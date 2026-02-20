import { useState } from "react";
import { materials } from "../data/mockData";

const typeStyles = {
  pdf:  { bg: "bg-red-100",   text: "text-red-600",   label: "PDF" },
  ppt:  { bg: "bg-amber-100", text: "text-amber-700",  label: "PPT" },
  pptx: { bg: "bg-amber-100", text: "text-amber-700",  label: "PPT" },
  doc:  { bg: "bg-blue-50",   text: "text-blue-600",   label: "DOC" },
  docx: { bg: "bg-blue-50",   text: "text-blue-600",   label: "DOC" },
};

function extOf(name) { return name.split(".").pop().toLowerCase(); }

function FileIcon({ ext, size = "sm" }) {
  const s = typeStyles[ext] ?? typeStyles.doc;
  const cls = size === "xs"
    ? `w-5 h-5 rounded text-[7px] font-bold flex items-center justify-center flex-shrink-0 ${s.bg} ${s.text}`
    : `w-8 h-8 rounded-lg text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${s.bg} ${s.text}`;
  return <div className={cls}>{s.label}</div>;
}

export default function MaterialsCard() {
  const [expanded, setExpanded] = useState(false); // closed by default

  const limited = materials.slice(0, 6);
  const grouped = limited.reduce((acc, m) => {
    const c = m.course || "EECS 183";
    if (!acc[c]) acc[c] = [];
    acc[c].push(m);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl border border-umblue-100 shadow-sm overflow-hidden">
      {/* Header / Toggle */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-umblue-50/50 transition-colors text-left"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Folder icon */}
          <div className="w-7 h-7 rounded-lg bg-umblue-50 border border-umblue-100 flex items-center justify-center flex-shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-umblue-400">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-umblue-400">Course Materials</div>
            <div className="text-xs font-bold text-umblue-700">{limited.length} files · Canvas</div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mini preview icons (only when collapsed) */}
          {!expanded && (
            <div className="flex items-center gap-0.5">
              {limited.slice(0, 4).map((m, i) => (
                <FileIcon key={i} ext={extOf(m.name)} size="xs" />
              ))}
              {limited.length > 4 && (
                <span className="text-[9px] text-umblue-400 font-semibold ml-0.5">+{limited.length - 4}</span>
              )}
            </div>
          )}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            className={`text-umblue-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Expandable body */}
      {expanded && (
        <div className="border-t border-umblue-50 px-4 pb-4 pt-3 space-y-3 max-h-72 overflow-y-auto">
          {Object.entries(grouped).map(([course, files]) => (
            <div key={course}>
              <div className="text-[10px] font-bold text-umblue-500 mb-1.5 px-0.5">{course}</div>
              <div className="space-y-1">
                {files.map((m, i) => {
                  const ext = extOf(m.name);
                  return (
                    <div key={i} className="flex items-center gap-2.5 hover:bg-umblue-50/50 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer">
                      <FileIcon ext={ext} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-umblue-700 truncate">{m.name}</div>
                        <div className="text-[10px] text-umblue-400">{m.date} · {m.size}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
