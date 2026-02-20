import { useState } from "react";
import { lectures } from "./data/mockData";
import LectureSidebar from "./components/LectureSidebar";
import Topbar from "./components/Topbar";
import MaterialsCard from "./components/MaterialsCard";
import CriticalInfo from "./components/CriticalInfo";
import SuggestedQuestions from "./components/SuggestedQuestions";
import Dashboard from "./components/Dashboard";
import DiveDeepModal from "./components/DiveDeepModal";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(10);
  const [modal, setModal] = useState({ open: false, conceptId: null, conceptName: "", pct: 0 });

  const lecture = lectures.find((l) => l.id === currentLecture);
  const lectureName = `Lecture ${currentLecture}`;
  const lectureTitle = lecture?.title ?? "";

  function handleSelectLecture(id) {
    setCurrentLecture(id);
    setSidebarOpen(false);
  }

  function handleDiveDeep(conceptId, conceptName, pct) {
    setModal({ open: true, conceptId, conceptName, pct });
  }

  return (
    <div className="min-h-screen bg-umblue-50">
      {/* Wireframe Banner */}
      <div className="bg-gradient-to-r from-umblue-700 to-umblue-600 text-center py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-maize-300">
        <span className="text-white">AdvI</span> — Faculty Dashboard — 2026 AI Hackathon
      </div>

      <LectureSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentLecture={currentLecture}
        onSelect={handleSelectLecture}
      />

      <Topbar lectureName={lectureName} onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Hero Row */}
      <div className="px-8 pt-6 pb-4">
        <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Date circle */}
            <div className="w-16 h-16 rounded-full bg-umblue-50 border border-umblue-100 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-2xl font-extrabold text-umblue-700 leading-none">20</span>
              <span className="text-[10px] text-umblue-400 font-medium mt-0.5">FEB</span>
            </div>

            {/* Lecture info */}
            <div>
              <div className="text-xs text-umblue-400 font-medium">Thu, February</div>
              <div className="font-semibold text-umblue-700">
                {lectureName} &middot; {lectureTitle}
              </div>
            </div>

            <div className="w-px h-8 bg-umblue-100" />

            {/* CTA */}
            <button className="bg-maize-500 hover:bg-maize-400 text-umblue-700 font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors text-sm">
              View Live Session
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Calendar icon */}
            <button className="w-10 h-10 rounded-full bg-umblue-50 border border-umblue-100 flex items-center justify-center text-umblue-400 hover:bg-umblue-100 transition-colors relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full" />
            </button>
          </div>

          {/* Greeting */}
          <div className="text-right">
            <h2 className="text-2xl font-extrabold text-umblue-700 leading-tight">
              Hey, Mr. Bob! 👋
            </h2>
            <p className="text-umblue-400 text-sm mt-0.5">
              Here&apos;s your real-time lecture dashboard.
            </p>
          </div>

          {/* Mic button */}
          <button className="w-12 h-12 rounded-full bg-umblue-50 border border-umblue-100 flex items-center justify-center text-umblue-400 hover:bg-umblue-100 transition-colors flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-12 gap-4">

          {/* Row 1: 4 stat cards */}
          <div className="col-span-12">
            <Dashboard statsOnly />
          </div>

          {/* Row 2: Critical Info (8 cols) | Materials (4 cols) */}
          <div className="col-span-8">
            <CriticalInfo onDiveDeep={handleDiveDeep} />
          </div>
          <div className="col-span-4">
            <MaterialsCard lectureName={lectureName} />
          </div>

          {/* Row 3: Suggested Questions (7) | Charts (5) */}
          <div className="col-span-7">
            <SuggestedQuestions />
          </div>
          <div className="col-span-5">
            <Dashboard chartsOnly />
          </div>

        </div>
      </div>

      <DiveDeepModal
        open={modal.open}
        conceptId={modal.conceptId}
        conceptName={modal.conceptName}
        pct={modal.pct}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
