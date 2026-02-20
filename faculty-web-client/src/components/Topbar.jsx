import AiCompanion from "./AiCompanion";

export default function Topbar({ lectureName, onOpenSidebar }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-umblue-100 px-6 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2 mr-2">
          <AiCompanion state="idle" size="sm" />
          <span className="font-extrabold text-umblue-700 text-base">AdvI</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-umblue-100" />

        {/* Lecture picker */}
        <button
          onClick={onOpenSidebar}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-umblue-50 hover:bg-umblue-100 transition-colors text-sm font-medium text-umblue-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>{lectureName}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Greeting */}
        <span className="text-umblue-400 text-sm">
          Hi, <span className="font-semibold text-umblue-700">Mr. Bob</span>
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-umblue-50 rounded-full px-4 py-2 w-48">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-umblue-400 flex-shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-umblue-700 placeholder-umblue-300 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="w-9 h-9 rounded-full bg-umblue-50 flex items-center justify-center hover:bg-umblue-100 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-umblue-400">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-umblue-700 text-maize-500 font-extrabold text-sm flex items-center justify-center">
          B
        </div>
      </div>
    </header>
  );
}
