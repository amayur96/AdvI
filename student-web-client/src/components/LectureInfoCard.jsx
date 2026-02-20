import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { lectures } from "../data/mockData";

function masteryColor(pct) {
  if (pct >= 70) return { bar: "bg-green-400",   text: "text-green-600",  dot: "bg-green-400",  label: "Strong"      };
  if (pct >= 30) return { bar: "bg-maize-400",    text: "text-maize-600",  dot: "bg-maize-400",  label: "In Progress" };
  if (pct  > 0)  return { bar: "bg-orange-400",   text: "text-orange-500", dot: "bg-orange-400", label: "Weak"        };
  return           { bar: "bg-umblue-200",   text: "text-umblue-300", dot: "bg-umblue-200", label: "Not started" };
}

export default function LectureInfoCard() {
  const [activeIdx, setActiveIdx] = useState(3);
  const [open, setOpen]           = useState(false);
  const lec = lectures[activeIdx];
  const mc  = masteryColor(lec.mastery);

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 p-5 shadow-sm">

      {/* Header row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-maize-50 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-maize-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-umblue-700">{lec.num}</h3>
          <p className="text-xs text-umblue-400">{lec.title}</p>
        </div>

        {/* Mastery dots — 1 per lecture, colored by mastery, acts as toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          title={open ? "Collapse lecture list" : "Browse all lectures"}
          className="flex items-center gap-1.5 group"
        >
          {lectures.map((l, i) => {
            const c = masteryColor(l.mastery);
            return (
              <span
                key={l.id}
                className={`
                  block rounded-full transition-all duration-200
                  ${i === activeIdx
                    ? `w-3 h-3 ${c.dot} ring-2 ring-offset-1 ring-umblue-200`
                    : `w-2 h-2 ${c.dot} opacity-60 group-hover:opacity-90`}
                `}
              />
            );
          })}
          <svg
            className={`w-3 h-3 text-umblue-300 ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Inline lecture list — expands/collapses, no overflow issues */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mb-3 rounded-xl border border-umblue-100 overflow-hidden">
              {lectures.map((l, i) => {
                const c = masteryColor(l.mastery);
                const isActive = i === activeIdx;
                return (
                  <button
                    key={l.id}
                    onClick={() => { setActiveIdx(i); setOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 border-b border-umblue-50 last:border-0 transition-colors ${
                      isActive ? "bg-maize-50" : "hover:bg-umblue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-semibold ${isActive ? "text-maize-700" : "text-umblue-700"}`}>
                        {l.num} – {l.title}
                      </span>
                      <span className={`text-[10px] font-bold tabular-nums ${c.text}`}>
                        {l.mastery > 0 ? `${l.mastery}%` : "—"}
                      </span>
                    </div>
                    <div className="h-1.5 bg-umblue-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${l.mastery}%` }} />
                    </div>
                    <div className={`text-[10px] mt-0.5 ${c.text}`}>{c.label}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description */}
      <p className="text-xs text-umblue-400 leading-relaxed">{lec.description}</p>

      {/* Pills */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] font-semibold text-umblue-400 bg-umblue-50 px-2.5 py-1 rounded-full">
          {lec.materials} materials
        </span>
        <span className="text-[10px] font-semibold text-maize-700 bg-maize-50 px-2.5 py-1 rounded-full">
          {lec.concepts} concepts
        </span>
        {lec.mastery > 0 && (
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ml-auto ${mc.text} bg-umblue-50`}>
            {lec.mastery}% mastery
          </span>
        )}
      </div>
    </div>
  );
}
