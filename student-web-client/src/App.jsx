import { useState } from "react";
import { initialMessages } from "./data/mockData";
import Topbar from "./components/Topbar";
import HeroRow from "./components/HeroRow";
import PresetProgressCard from "./components/PresetProgressCard";
import SessionStatsCard from "./components/SessionStatsCard";
import ConfidenceCard from "./components/ConfidenceCard";
import LectureInfoCard from "./components/LectureInfoCard";
import ChatCard from "./components/ChatCard";
import KeyConceptsCard from "./components/KeyConceptsCard";
import LectureTopicsCard from "./components/LectureTopicsCard";
import ActivityCard from "./components/ActivityCard";

export default function App() {
  const [messages, setMessages] = useState(initialMessages);
  const completedCount = 2;
  const studentMsgCount = messages.filter((m) => m.role === "student").length;

  function handleNewMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  return (
    <div className="min-h-screen bg-umblue-50">
      {/* Wireframe Banner */}
      <div className="bg-gradient-to-r from-umblue-700 to-umblue-600 text-center py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-maize-300">
        <span className="text-white">AdvI</span> — Student AI Agent — 2026 AI Hackathon
      </div>

      {/* Top Bar */}
      <Topbar />

      {/* Hero Row */}
      <HeroRow />

      {/* Bento Grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-12 gap-4 auto-rows-auto">

          {/* Row 1: Preset Progress (3 cols) | Session Stats + Lecture Info (2 cols) | Confidence (2 cols) | Chat starts (5 cols, spans 2 rows) */}
          <div className="col-span-3 row-span-2">
            <PresetProgressCard completedCount={completedCount} />
          </div>

          <div className="col-span-2">
            <SessionStatsCard messageCount={studentMsgCount} completedCount={completedCount} />
          </div>

          <div className="col-span-2 row-span-2">
            <ConfidenceCard />
          </div>

          <div className="col-span-5 row-span-2" style={{ minHeight: 520 }}>
            <ChatCard messages={messages} onSend={handleNewMessage} />
          </div>

          {/* Row 1 continued: under session stats */}
          <div className="col-span-2">
            <LectureInfoCard />
          </div>

          {/* Row 3: Key Concepts | Activity | Lecture Topics */}
          <div className="col-span-3">
            <KeyConceptsCard />
          </div>

          <div className="col-span-4">
            <ActivityCard />
          </div>

          <div className="col-span-5">
            <LectureTopicsCard />
          </div>

        </div>
      </div>
    </div>
  );
}
