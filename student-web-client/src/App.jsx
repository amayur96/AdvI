import { useState, useEffect, useCallback } from "react";
import { startSession, sendMessage, sendFreeform } from "./services/api";
import { ensureSeeded } from "./services/seed";
import Topbar from "./components/Topbar";
import ChatCard from "./components/ChatCard";
import LectureInfoCard from "./components/LectureInfoCard";
import KeyConceptsCard from "./components/KeyConceptsCard";
import ActivityCard from "./components/ActivityCard";
import LectureTopicsCard from "./components/LectureTopicsCard";

const STUDENT_ID = "alex";
const LECTURE_ID = "lec4";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [presetComplete, setPresetComplete] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [backendDown, setBackendDown] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const seeded = await ensureSeeded();
      if (!seeded) { setBackendDown(true); return; }
      try {
        const res = await startSession(STUDENT_ID, LECTURE_ID);
        if (cancelled) return;
        setMessages([{ role: "ai", text: res.reply, time: now() }]);
        setPresetComplete(res.preset_complete);
        setSessionReady(true);
      } catch {
        if (!cancelled) setBackendDown(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSend = useCallback(
    async (text) => {
      setMessages((prev) => [...prev, { role: "student", text, time: now() }]);
      setLoading(true);
      try {
        const res = presetComplete
          ? await sendFreeform(STUDENT_ID, [LECTURE_ID], text)
          : await sendMessage(STUDENT_ID, LECTURE_ID, text);
        setMessages((prev) => [...prev, { role: "ai", text: res.reply, time: now() }]);
        if (res.preset_complete && !presetComplete) setPresetComplete(true);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: `Something went wrong: ${err.message}`, time: now() },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [presetComplete]
  );

  return (
    <div className="min-h-screen bg-umblue-50">
      <div className="bg-umblue-700 py-1.5 px-8 flex items-center justify-end">
        <div className="flex items-center gap-5">
          <span className="text-umblue-300 text-[10px] tabular-nums">Feb 20, 2026</span>
          <div className="flex items-center gap-1.5 text-[10px] text-umblue-300">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Online
          </div>
        </div>
      </div>

      <Topbar />

      {backendDown && (
        <div className="mx-auto max-w-2xl mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-sm text-center">
          <strong>Backend not reachable.</strong>{" "}
          <code className="bg-red-100 px-2 py-0.5 rounded text-xs">
            uvicorn app.main:app --reload --port 8000
          </code>
        </div>
      )}

      <div className="px-6 pb-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Left sidebar */}
          <div className="col-span-3 flex flex-col gap-4">
            <LectureInfoCard />
            <KeyConceptsCard />
            <LectureTopicsCard />
          </div>

          {/* Centered chat */}
          <div className="col-span-6 flex justify-center">
            <div className="w-full max-w-lg" style={{ height: "calc(100vh - 160px)" }}>
              <ChatCard
                messages={messages}
                onSend={handleSend}
                loading={loading}
                disabled={!sessionReady}
                presetComplete={presetComplete}
              />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-3 flex flex-col gap-4">
            <ActivityCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
