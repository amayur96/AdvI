export default function HeroRow() {
  const today = new Date();
  const day = today.getDate();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
  });

  return (
    <div className="flex items-center justify-between px-8 pb-4">
      {/* Left: Date + CTA */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full border-2 border-umblue-200 bg-white flex items-center justify-center text-umblue-700 text-xl font-extrabold">
          {day}
        </div>
        <div className="text-sm text-umblue-500 font-medium leading-tight">
          {dateStr.split(",")[0]},
          <br />
          {dateStr.split(",")[1]?.trim() || ""}
        </div>
        <button className="ml-2 flex items-center gap-2 bg-maize-500 hover:bg-maize-400 text-umblue-700 font-semibold text-sm px-5 py-2.5 rounded-full transition shadow-sm">
          Start Session
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-xl bg-white border border-umblue-100 flex items-center justify-center text-umblue-400 hover:bg-maize-50 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </button>
      </div>

      {/* Right: Greeting */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-umblue-700">
            Hey, Need help?
          </h2>
          <p className="text-umblue-400 text-base">
            |Just ask me anything!
          </p>
        </div>
        <button className="w-12 h-12 rounded-full bg-umblue-700 flex items-center justify-center hover:bg-umblue-600 transition shadow-lg">
          <svg className="w-5 h-5 text-maize-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </div>
    </div>
  );
}
