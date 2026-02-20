import { useState, useRef } from "react";
import { questionSets } from "../data/mockData";

export default function SuggestedQuestions() {
  const [setIndex, setSetIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const cardsRef = useRef([]);

  const currentSet = questionSets[setIndex];

  function shuffle() {
    if (animating) return;
    setAnimating(true);
    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(8px)";
      }
    });
    setTimeout(() => {
      setSetIndex((prev) => (prev + 1) % questionSets.length);
      setTimeout(() => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, i * 80);
          }
        });
        setAnimating(false);
      }, 30);
    }, 200);
  }

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm p-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-umblue-400">
            Suggested Questions
          </div>
          <div className="text-sm font-bold text-umblue-700 mt-0.5">
            Share with students to reinforce today&apos;s concepts
          </div>
        </div>
        <button
          onClick={shuffle}
          className="flex items-center gap-1.5 text-xs font-semibold text-umblue-700 bg-umblue-50 hover:bg-umblue-100 px-3 py-1.5 rounded-full transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
          </svg>
          Shuffle
        </button>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-3">
        {currentSet.map((item, i) => (
          <div
            key={`${setIndex}-${i}`}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ transition: "all .25s ease" }}
            className="border border-umblue-100 rounded-xl p-4 hover:border-umblue-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              {/* Number badge */}
              <div className="w-7 h-7 rounded-full bg-maize-500 text-umblue-700 text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-umblue-700 font-medium leading-relaxed">{item.q}</p>
                <span className="inline-block mt-2 text-xs text-umblue-400 bg-umblue-50 px-2.5 py-0.5 rounded-full font-medium">
                  {item.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
