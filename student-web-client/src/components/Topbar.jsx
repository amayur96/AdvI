import { student } from "../data/mockData";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-8 py-5">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-umblue-700 flex items-center justify-center text-white font-extrabold text-lg">
          A
        </div>
        <div>
          <span className="text-lg font-bold text-umblue-700">Adv</span>
          <span className="text-lg font-bold text-maize-500">I</span>
          <div className="text-xs text-umblue-400 -mt-0.5">Student Portal</div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/60 border border-umblue-100 rounded-xl px-4 py-2 text-sm text-umblue-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Start searching here...</span>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-white border border-umblue-100 flex items-center justify-center hover:bg-maize-50 transition">
          <svg className="w-5 h-5 text-umblue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-maize-500 text-umblue-700 text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-umblue-600 to-umblue-400 flex items-center justify-center text-white font-bold">
            {student.initials}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-umblue-700">{student.name}</div>
            <div className="text-xs text-umblue-400">{student.course}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
