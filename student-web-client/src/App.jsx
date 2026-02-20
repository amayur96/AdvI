import { useState, useEffect, useCallback, useRef } from "react";
import { startSession, sendMessage, sendFreeform, getPresetQuestions, getCurrentQuestion } from "./services/api";
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
  const [answeredCount, setAnsweredCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [presetQuestions, setPresetQuestions] = useState([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [backendDown, setBackendDown] = useState(false);
  const lastRestartRef = useRef(0);
  const lastKnownTotalRef = useRef(3);

  // Fetch preset questions on mount and periodically to catch updates
  useEffect(() => {
    let cancelled = false;
    const fetchQuestions = async () => {
      try {
        const questionsRes = await getPresetQuestions(LECTURE_ID);
        if (!cancelled) {
          const newTotal = questionsRes.questions?.length || 3;
          const oldTotal = lastKnownTotalRef.current;
          
          setPresetQuestions(questionsRes.questions || []);
          setTotalQuestions(newTotal);
          // Ensure answeredCount doesn't exceed totalQuestions
          setAnsweredCount((prev) => Math.min(prev, newTotal));
          
          // If questions changed and session is ready, refresh the current question state
          // Throttle refreshes to avoid loops (max once per 5 seconds)
          const now = Date.now();
          if (sessionReady && 
              Math.abs(newTotal - oldTotal) > 0 && 
              oldTotal > 0 && 
              (now - lastRestartRef.current > 5000)) {
            try {
              lastRestartRef.current = now;
              const currentState = await getCurrentQuestion(STUDENT_ID, LECTURE_ID);
              if (!cancelled) {
                // Update counts
                setAnsweredCount(currentState.answered_count || 0);
                const backendTotal = currentState.total_questions || newTotal;
                setTotalQuestions(backendTotal);
                setPresetComplete(currentState.preset_complete || false);
                lastKnownTotalRef.current = backendTotal;
                
                // If there's a current question, update the greeting message to reflect correct counts
                if (currentState.preset_question) {
                  setMessages((prev) => {
                    if (prev.length === 0) return prev;
                    const lastMsg = prev[prev.length - 1];
                    // Check if last message is an AI message that might contain a question/greeting
                    if (lastMsg.role === "ai" && lastMsg.text.includes("Question")) {
                      const qNum = currentState.answered_count + 1;
                      const qTotal = currentState.total_questions;
                      
                      // Update both the intro count ("I have X questions") and the question number
                      let updatedText = lastMsg.text;
                      
                      // Replace intro count: "I have 3 questions" -> "I have {qTotal} questions"
                      updatedText = updatedText.replace(
                        /I have \d+ questions?/g,
                        `I have ${qTotal} question${qTotal !== 1 ? 's' : ''}`
                      );
                      
                      // Find where the question section starts and replace everything from there
                      const questionStartRegex = /\*\*Question \d+ of \d+:\*\*/;
                      const questionMatch = updatedText.match(questionStartRegex);
                      if (questionMatch) {
                        const startIndex = questionMatch.index;
                        // Replace from the question start to the end
                        const beforeQuestion = updatedText.substring(0, startIndex);
                        const newQuestionSection = `**Question ${qNum} of ${qTotal}:**\n${currentState.preset_question.question}`;
                        updatedText = beforeQuestion + newQuestionSection;
                      }
                      
                      return [...prev.slice(0, -1), { ...lastMsg, text: updatedText }];
                    }
                    return prev;
                  });
                }
              }
            } catch (err) {
              console.debug("Failed to refresh current question:", err);
              lastKnownTotalRef.current = newTotal;
            }
          } else {
            lastKnownTotalRef.current = newTotal;
          }
        }
      } catch (err) {
        // Silently fail for polling - don't show error on every poll
        console.debug("Failed to fetch preset questions:", err);
      }
    };

    // Initial fetch
    fetchQuestions();
    
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchQuestions, 5000);
    
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [sessionReady]);

  // Start session on mount
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
        const backendTotal = res.total_questions || 3;
        setAnsweredCount(res.answered_count || 0);
        setTotalQuestions(backendTotal);
        lastKnownTotalRef.current = backendTotal;
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
        // Always use backend's count - don't fall back to local state
        setAnsweredCount(res.answered_count ?? 0);
        setTotalQuestions(res.total_questions ?? 0);
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

      <Topbar answeredCount={answeredCount} totalQuestions={totalQuestions} presetComplete={presetComplete} />

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
            <ActivityCard answeredCount={answeredCount} totalQuestions={totalQuestions} presetQuestions={presetQuestions} presetComplete={presetComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
