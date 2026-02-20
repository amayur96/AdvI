import { useState } from "react";
import { materials } from "../data/mockData";

const typeStyles = {
  pdf: { bg: "bg-red-50", text: "text-red-600" },
  ppt: { bg: "bg-amber-50", text: "text-amber-600" },
  pptx: { bg: "bg-amber-50", text: "text-amber-600" },
  doc: { bg: "bg-blue-50", text: "text-blue-600" },
  docx: { bg: "bg-blue-50", text: "text-blue-600" },
};

const typeLabel = { pdf: "PDF", ppt: "PPT", pptx: "PPT", doc: "DOC", docx: "DOC" };

function extOf(name) {
  return name.split(".").pop().toLowerCase();
}

export default function MaterialsCard({ lectureName }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm overflow-hidden h-full">
      {/* Header (always visible) */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-umblue-50/50 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-umblue-50 border border-umblue-100 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-umblue-400">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
              Course Materials
            </div>
            <div className="text-sm font-bold text-umblue-700 mt-0.5">
              {lectureName} &middot; {materials.length} files
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-semibold bg-maize-500 hover:bg-maize-400 text-umblue-700 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload
          </button>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            className={`text-umblue-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Expandable body */}
      <div
        className={`overflow-hidden transition-all duration-200 ${expanded ? "max-h-96" : "max-h-0"}`}
      >
        <div className="px-5 pb-5 border-t border-umblue-50 pt-4 space-y-3">
          {materials.map((m, i) => {
            const ext = extOf(m.name);
            const style = typeStyles[ext] ?? typeStyles.doc;
            return (
              <div key={i} className="flex items-center gap-3 hover:bg-umblue-50/50 p-2 -mx-2 rounded-xl transition-colors cursor-pointer">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${style.bg} ${style.text}`}>
                  {(typeLabel[ext] ?? "FILE").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-umblue-700 truncate">{m.name}</div>
                  <div className="text-xs text-umblue-400">Uploaded {m.date} &middot; {m.size}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
