import AiCompanion from "./AiCompanion";

export default function Topbar() {
  return (
    <header className="relative flex items-center justify-between px-8 py-4 bg-white border-b border-umblue-100">
      {/* Brand + companion */}
      <div className="flex items-center gap-4">
        <AiCompanion state="idle" size="lg" isStatic src="/assets/faculty-companion.png" />
        <div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-extrabold text-umblue-700 tracking-tight">AdvI</span>
          </div>
          <div className="text-[11px] text-umblue-400 font-medium -mt-0.5">Faculty Dashboard</div>
        </div>

      </div>

      {/* Center — Search (absolutely centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <div className="flex items-center gap-2.5 bg-white border border-umblue-100 rounded-2xl pl-4 pr-3 py-2.5 text-sm text-umblue-400 shadow-sm hover:shadow-md hover:border-umblue-200 focus-within:border-maize-400 focus-within:ring-2 focus-within:ring-maize-100 transition-all w-80 group">
          <svg className="w-4 h-4 text-umblue-300 group-hover:text-maize-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-umblue-700 placeholder:text-umblue-300 outline-none"
            placeholder="Search lectures, concepts..."
          />
          <kbd className="ml-auto text-[10px] font-mono bg-umblue-50 text-umblue-300 border border-umblue-100 rounded-md px-1.5 py-0.5 flex-shrink-0">/</kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative w-11 h-11 rounded-2xl bg-white border border-umblue-100 flex items-center justify-center hover:bg-maize-50 hover:border-maize-200 transition-all shadow-sm group">
          <svg className="w-5 h-5 text-umblue-400 group-hover:text-maize-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-maize-400 to-maize-500 text-umblue-700 text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
            3
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-umblue-100" />

        {/* User profile */}
        <div className="flex items-center gap-3 bg-white border border-umblue-100 rounded-2xl pl-1.5 pr-4 py-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-umblue-600 to-umblue-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            R
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-umblue-700 leading-tight">Mr. Ross</div>
            <div className="text-[10px] text-umblue-400">EECS 183</div>
          </div>
          <svg className="w-3.5 h-3.5 text-umblue-300 group-hover:text-umblue-500 transition-colors ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  );
}
