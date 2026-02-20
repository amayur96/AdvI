import { useEffect, useRef, useState } from "react";

/* ─── Animated Donut ───────────────────────────────────── */
function DonutChart({ pct, size = 82, stroke = 9, color = "#0050B3", trackColor = "#E8EEF7", label, sublabel }) {
  const [animated, setAnimated] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const center = size / 2;

  useEffect(() => {
    let start = null;
    const duration = 1100;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(eased * pct));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [pct]);

  const dashArr = `${(animated / 100) * circ} ${circ}`;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={center} cy={center} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
          <circle cx={center} cy={center} r={r} fill="none" stroke={color} strokeWidth={stroke}
            strokeDasharray={dashArr} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.05s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-extrabold text-umblue-700" style={{ fontSize: size * 0.2 }}>{animated}%</span>
        </div>
      </div>
      {label && <div className="text-[10px] font-bold text-umblue-700 text-center leading-tight">{label}</div>}
      {sublabel && <div className="text-[9px] text-umblue-400 text-center">{sublabel}</div>}
    </div>
  );
}

/* ─── Animated Response Bar ─────────────────────────────── */
function AnimBar({ correct, partial, incorrect }) {
  const [w, setW] = useState({ c: 0, p: 0, i: 0 });
  useEffect(() => {
    const t = setTimeout(() => setW({ c: correct, p: partial, i: incorrect }), 80);
    return () => clearTimeout(t);
  }, [correct, partial, incorrect]);
  return (
    <div className="flex h-2 rounded-full overflow-hidden gap-px w-full">
      <div className="bg-emerald-400 rounded-l-full" style={{ width: `${w.c}%`, transition: "width 0.9s cubic-bezier(.4,0,.2,1)" }} />
      <div className="bg-amber-400" style={{ width: `${w.p}%`, transition: "width 0.9s cubic-bezier(.4,0,.2,1) 0.1s" }} />
      <div className="bg-red-400 rounded-r-full" style={{ width: `${w.i}%`, transition: "width 0.9s cubic-bezier(.4,0,.2,1) 0.2s" }} />
    </div>
  );
}

/* ─── Pulse Stat ────────────────────────────────────────── */
function PulseStat({ value, label, color = "#10b981" }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative flex items-center justify-center w-9 h-9">
        <div className="absolute w-9 h-9 rounded-full opacity-20 animate-ping" style={{ backgroundColor: color }} />
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: color + "22" }}>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        </div>
      </div>
      <span className="text-base font-extrabold text-umblue-700 leading-none">{value}</span>
      <span className="text-[9px] text-umblue-400 text-center font-medium leading-tight">{label}</span>
    </div>
  );
}

/* ─── Lecture Feedback Card ─────────────────────────────── */

function FeedbackCard({ item, visible }) {
  return (
    <div
      className={`rounded-xl border ${item.border} ${item.bg} p-2.5 flex flex-col gap-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <div className="flex items-center gap-1.5">
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.bg} border ${item.border} text-umblue-500 uppercase tracking-wider`}>{item.tag}</span>
        <div className="text-[10px] font-bold text-umblue-700 leading-snug">{item.title}</div>
      </div>
      <div className="text-[9px] text-umblue-500 leading-relaxed">{item.text}</div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────── */
export default function GarminAnalytics({ 
  classAnalytics = {
    comprehension: 61,
    questions_done: 76,
    engagement: 78,
    active_students: 142,
    ai_conversations: 287,
    avg_score: 61,
  },
  questionResponses = [],
  lectureFeedback = [],
}) {
  const [insightsVisible, setInsightsVisible] = useState(false);
  const [visibleInsights, setVisibleInsights] = useState([]);

  // Track previous feedback length to detect new insights
  const prevFeedbackLengthRef = useRef(0);
  
  // Animate insights in when they appear
  useEffect(() => {
    if (lectureFeedback.length > 0) {
      const isNewInsight = lectureFeedback.length > prevFeedbackLengthRef.current;
      
      // Show first 2 insights immediately (they're always there)
      // Then show 3rd insight with delay if it's new (after students complete questions)
      lectureFeedback.forEach((_, index) => {
        if (index < 2) {
          // First 2 insights show immediately
          setTimeout(() => {
            setVisibleInsights((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }, 400 + (index * 200));
        } else if (index === 2) {
          if (isNewInsight) {
            // 3rd insight (from student chat completion) shows with delay
            setTimeout(() => {
              setVisibleInsights((prev) => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            }, 1500); // Delay to show it appeared after completion
          } else {
            // 3rd insight already exists, show it immediately
            setVisibleInsights((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        }
      });
      
      prevFeedbackLengthRef.current = lectureFeedback.length;
    } else {
      setVisibleInsights([]);
      prevFeedbackLengthRef.current = 0;
    }
  }, [lectureFeedback]);

  // Use provided data or fallback to defaults
  const comprehension = classAnalytics.comprehension || 61;
  const questionsDone = classAnalytics.questions_done || 76;
  const engagement = classAnalytics.engagement || 78;
  const activeStudents = classAnalytics.active_students || 142;
  const aiConvos = classAnalytics.ai_conversations || 287;
  const avgScore = classAnalytics.avg_score || 61;
  
  // Use provided question responses or empty array
  const responses = questionResponses.length > 0 ? questionResponses : [];
  
  // Use provided lecture feedback or empty array
  const feedback = lectureFeedback.length > 0 ? lectureFeedback : [];

  useEffect(() => {
    // Always show insights visible after a short delay
    const t = setTimeout(() => setInsightsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);
  
  // Ensure first 2 insights are always visible after component mounts
  useEffect(() => {
    if (feedback.length >= 2 && insightsVisible) {
      // Make sure first 2 are visible
      setVisibleInsights((prev) => {
        const updated = [...prev];
        if (!updated.includes(0)) updated.push(0);
        if (!updated.includes(1)) updated.push(1);
        return updated;
      });
    }
  }, [feedback.length, insightsVisible, feedback]);
  
  // Debug: log feedback to console
  useEffect(() => {
    console.log("GarminAnalytics - lectureFeedback:", lectureFeedback);
    console.log("GarminAnalytics - feedback:", feedback);
    console.log("GarminAnalytics - insightsVisible:", insightsVisible);
    console.log("GarminAnalytics - visibleInsights:", visibleInsights);
  }, [lectureFeedback, feedback, insightsVisible, visibleInsights]);

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-umblue-400">Class Analytics</div>
        <span className="text-[9px] bg-green-50 text-green-600 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
          Live
        </span>
      </div>

      {/* Donut ring row */}
      <div className="flex items-center justify-around gap-2 mb-4">
        <DonutChart pct={comprehension} size={82} stroke={9} color="#0050B3" label="Comprehension" sublabel="class avg" />
        <DonutChart pct={questionsDone} size={82} stroke={9} color="#FFC107" label="Questions Done" sublabel="of assigned" />
        <DonutChart pct={engagement} size={82} stroke={9} color="#10b981" label="Engagement" sublabel="active today" />
      </div>

      <div className="h-px bg-umblue-50 mb-3" />

      {/* Pulse stats: Active Students · AI Convos · Avg Score */}
      <div className="flex items-start justify-around gap-2 mb-4">
        <PulseStat value={activeStudents.toString()} label="Active Students" color="#0050B3" />
        <PulseStat value={aiConvos.toString()} label="AI Convos" color="#FFC107" />
        <PulseStat value={`${avgScore}%`} label="Avg Score" color="#10b981" />
      </div>

      <div className="h-px bg-umblue-50 mb-3" />

      {/* Response breakdown */}
      <div className="text-[10px] font-semibold uppercase tracking-wider text-umblue-400 mb-2">Response Breakdown</div>
      <div className="flex flex-col gap-2 mb-3">
        {questionResponses.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-umblue-400 w-4 flex-shrink-0">{r.label}</span>
            <AnimBar correct={r.correct} partial={r.partial} incorrect={r.incorrect} />
            <span className="text-[10px] text-umblue-400 w-7 text-right flex-shrink-0">{r.correct}%</span>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-1">
          {[{ c: "bg-emerald-400", l: "Strong" }, { c: "bg-amber-400", l: "Partial" }, { c: "bg-red-400", l: "Struggling" }].map(({ c, l }) => (
            <div key={l} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${c}`} />
              <span className="text-[9px] text-umblue-400 font-medium">{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-umblue-50 mb-3" />

      {/* Next Lecture */}
      <div className="rounded-xl bg-umblue-700 px-3 py-2.5 mb-3 flex items-center justify-between gap-2">
        <div>
          <div className="text-[9px] font-semibold text-umblue-300 uppercase tracking-wider mb-0.5">Next Lecture</div>
          <div className="text-xs font-bold text-white leading-tight">Lecture 5 · Arrays &amp; Strings</div>
          <div className="text-[9px] text-umblue-300 mt-0.5">in 3 days · Feb 23</div>
        </div>
        <button className="flex-shrink-0 text-[10px] font-semibold bg-maize-500 hover:bg-maize-400 text-umblue-700 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap">
          Set Questions →
        </button>
      </div>

      {/* Lecture Feedback */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-umblue-400">Lecture Feedback</div>
        <span className="text-[9px] bg-purple-50 text-purple-600 font-semibold px-1.5 py-0.5 rounded-full">AI Insights</span>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {feedback.length > 0 ? (
          feedback.map((item, i) => (
            <FeedbackCard key={i} item={item} visible={insightsVisible && visibleInsights.includes(i)} />
          ))
        ) : (
          <div className="text-[9px] text-umblue-400 italic py-2">
            AI insights will appear as students interact with questions...
          </div>
        )}
      </div>
    </div>
  );
}
