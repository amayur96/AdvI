import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { startSession, sendMessage, sendFreeform, getPresetQuestions, getCurrentQuestion } from "./services/api";
import { ensureSeeded } from "./services/seed";
import Topbar from "./components/Topbar";
import ChatCard from "./components/ChatCard";
import LectureInfoCard from "./components/LectureInfoCard";
import KeyConceptsCard from "./components/KeyConceptsCard";
import ActivityCard from "./components/ActivityCard";

const STUDENT_ID = "alex";
const LECTURE_ID = "lec4";

// ── Offline dummy responses (used when backend is unreachable) ────────────────
const OFFLINE_WELCOME =
  "Hey Alex! I'm your AdvI study agent for **Lecture 4: Functions**. " +
  "*(Running in offline demo mode — responses are pre-written)* \n\n" +
  "Let's review what you learned. First question: In your own words, what is " +
  "the **purpose of a function** in C++?";

const OFFLINE_PRESET = [
  "Nice! Functions let us break programs into reusable, named chunks — " +
  "great for avoiding repetition. Next question:\n\n" +
  "What's the difference between **pass-by-value** and **pass-by-reference**?",

  "Exactly right. Pass-by-value copies the argument (original unchanged), " +
  "pass-by-reference gives direct access to the original variable via `&`. " +
  "One more:\n\n" +
  "What does a **function prototype** do and why do we need one?",

  "Great work! Prototypes declare a function's signature before its definition, " +
  "letting the compiler know what to expect — essential for multi-file projects. " +
  "You've finished all the preset questions! 🎉 Feel free to ask me anything else " +
  "about functions.",
];

const OFFLINE_FREEFORM = [
  "That's a great question! In C++, scope determines where a variable is " +
  "accessible. Variables declared inside a function are **local** and disappear " +
  "when the function returns. Anything else you'd like to explore?",
  "Good thinking! Recursion is when a function calls itself. The key is always " +
  "having a **base case** to stop the recursion, otherwise you get a stack overflow. " +
  "Want to go deeper on any topic?",
  "In C++, `void` means the function returns nothing. If a non-void function " +
  "falls off the end without a `return`, the behavior is undefined — always " +
  "include a return value! Any other questions?",
];
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [presetComplete, setPresetComplete] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [presetQuestions, setPresetQuestions] = useState([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [backendDown, setBackendDown] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);

  const lastRestartRef = useRef(0);
  const lastKnownTotalRef = useRef(3);
  const offlinePresetIdx = useRef(0);
  const offlineFreeformIdx = useRef(0);
  const isOffline = useRef(false);
  const lastPollStateRef = useRef({ presetComplete: false, totalQuestions: 0 });

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
          // Throttle refreshes to avoid loops (max once per 3 seconds)
          const now = Date.now();
          if (sessionReady && 
              Math.abs(newTotal - oldTotal) > 0 && 
              oldTotal > 0 && 
              (now - lastRestartRef.current > 3000)) {
            try {
              lastRestartRef.current = now;
              const currentState = await getCurrentQuestion(STUDENT_ID, LECTURE_ID);
              if (!cancelled) {
                // Update counts
                const backendTotal = currentState.total_questions || newTotal;
                const backendAnswered = currentState.answered_count || 0;
                const wasComplete = presetComplete;
                const nowComplete = currentState.preset_complete || false;
                
                setAnsweredCount(backendAnswered);
                setTotalQuestions(backendTotal);
                setPresetComplete(nowComplete);
                lastKnownTotalRef.current = backendTotal;
                
                // If there's a current question available, show it
                if (currentState.preset_question) {
                  const qNum = backendAnswered + 1;
                  const qTotal = backendTotal;
                  const newQuestionText = `📝 *Note: ${newTotal - oldTotal} new question(s) have been added. There are now ${newTotal} total questions.*\n\n**Question ${qNum} of ${qTotal}:**\n${currentState.preset_question.question}`;
                  
                  setMessages((prev) => {
                    if (prev.length === 0) return prev;
                    const lastMsg = prev[prev.length - 1];
                    
                    // If we were in free-form mode and new questions were added, add a new message
                    if (wasComplete && !nowComplete && lastMsg.role === "ai") {
                      return [...prev, { role: "ai", text: newQuestionText, time: now() }];
                    }
                    
                    // Otherwise, update the last message if it contains a question
                    if (lastMsg.role === "ai" && lastMsg.text.includes("Question")) {
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
                        const beforeQuestion = updatedText.substring(0, startIndex);
                        const newQuestionSection = `**Question ${qNum} of ${qTotal}:**\n${currentState.preset_question.question}`;
                        updatedText = beforeQuestion + newQuestionSection;
                      }
                      
                      return [...prev.slice(0, -1), { ...lastMsg, text: updatedText }];
                    }
                    
                    // If last message is completion message and we have new questions, add new message
                    if (wasComplete && !nowComplete && lastMsg.role === "ai") {
                      return [...prev, { role: "ai", text: newQuestionText, time: now() }];
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

  // Poll current question state periodically to keep counts in sync and detect new questions
  useEffect(() => {
    if (!sessionReady) return;
    
    let cancelled = false;
    
    const pollCurrentState = async () => {
      try {
        const currentState = await getCurrentQuestion(STUDENT_ID, LECTURE_ID);
        if (!cancelled) {
          const newPresetComplete = currentState.preset_complete ?? false;
          const newTotalQuestions = currentState.total_questions ?? 0;
          const newAnsweredCount = currentState.answered_count ?? 0;
          
          const lastState = lastPollStateRef.current;
          
          // Update counts from backend state
          setAnsweredCount(newAnsweredCount);
          setTotalQuestions(newTotalQuestions);
          setPresetComplete(newPresetComplete);
          
          // If we were in free-form mode and new questions were added, show them immediately
          // Check if: (1) we were complete, (2) now we're not complete OR total increased, (3) there's a question to show
          const questionsAdded = newTotalQuestions > lastState.totalQuestions;
          const transitionedFromComplete = lastState.presetComplete && (!newPresetComplete || questionsAdded);
          
          if (transitionedFromComplete && currentState.preset_question) {
            const qNum = newAnsweredCount + 1;
            const qTotal = newTotalQuestions;
            const addedCount = newTotalQuestions - lastState.totalQuestions;
            const newQuestionText = `📝 *Note: ${addedCount} new question(s) have been added. There are now ${qTotal} total questions.*\n\n**Question ${qNum} of ${qTotal}:**\n${currentState.preset_question.question}`;
            
            setMessages((prev) => {
              // Add new message with the question
              return [...prev, { role: "ai", text: newQuestionText, time: now() }];
            });
          }
          
          // Update last state
          lastPollStateRef.current = {
            presetComplete: newPresetComplete,
            totalQuestions: newTotalQuestions,
          };
        }
      } catch (err) {
        // Silently fail - session might not exist yet
        console.debug("Failed to poll current question state:", err);
      }
    };

    // Poll every 2 seconds to detect new questions quickly
    const interval = setInterval(pollCurrentState, 2000);
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
      if (!seeded) {
        if (!cancelled) startOfflineMode();
        return;
      }
      try {
        const res = await startSession(STUDENT_ID, LECTURE_ID);
        if (cancelled) return;
        setMessages([{ role: "ai", text: res.reply, time: now() }]);
        setPresetComplete(res.preset_complete);
        const backendTotal = res.total_questions || 3;
        setAnsweredCount(res.answered_count || 0);
        setTotalQuestions(backendTotal);
        lastKnownTotalRef.current = backendTotal;
        lastPollStateRef.current = {
          presetComplete: res.preset_complete || false,
          totalQuestions: backendTotal,
        };
        setSessionReady(true);
      } catch {
        if (!cancelled) startOfflineMode();
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function startOfflineMode() {
    isOffline.current = true;
    setBackendDown(true);
    setMessages([{ role: "ai", text: OFFLINE_WELCOME, time: now() }]);
    setSessionReady(true);
  }

  const handleSend = useCallback(
    async (text) => {
      setMessages((prev) => [...prev, { role: "student", text, time: now() }]);
      setLoading(true);

      if (isOffline.current) {
        // Simulate a short thinking delay
        await delay(900 + Math.random() * 600);
        let reply;
        if (!presetComplete) {
          const idx = offlinePresetIdx.current;
          reply = OFFLINE_PRESET[idx] ?? OFFLINE_FREEFORM[0];
          offlinePresetIdx.current = idx + 1;
          setAnsweredCount((c) => c + 1);
          if (idx + 1 >= OFFLINE_PRESET.length) setPresetComplete(true);
        } else {
          const idx = offlineFreeformIdx.current % OFFLINE_FREEFORM.length;
          reply = OFFLINE_FREEFORM[idx];
          offlineFreeformIdx.current = idx + 1;
        }
        setMessages((prev) => [...prev, { role: "ai", text: reply, time: now() }]);
        setLoading(false);
        return;
      }

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
            <div className={`w-1.5 h-1.5 rounded-full ${backendDown ? "bg-yellow-400" : "bg-green-400 animate-pulse"}`} />
            {backendDown ? "Offline demo" : "Online"}
          </div>
        </div>
      </div>

      <Topbar answeredCount={answeredCount} totalQuestions={totalQuestions} presetComplete={presetComplete} />

      {backendDown && (
        <div className="mx-auto max-w-2xl mt-4 bg-maize-50 border border-maize-200 text-maize-800 rounded-xl px-5 py-3 text-sm text-center">
          <strong>Running in offline demo mode.</strong>{" "}
          Responses are pre-written.{" "}
          <span className="text-umblue-400">
            Start backend:{" "}
            <code className="bg-white px-2 py-0.5 rounded text-xs border border-maize-200">
              uvicorn app.main:app --reload --port 8000
            </code>
          </span>
        </div>
      )}

      <div className="px-6 pb-8">
        <div className="flex gap-4">
          {/* Left sidebar */}
          <AnimatePresence initial={false}>
            {!chatExpanded && (
              <motion.div
                key="left"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "25%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex-shrink-0 overflow-hidden"
              >
                <div className="flex flex-col gap-4 pr-0">
                  <LectureInfoCard />
                  <KeyConceptsCard />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat */}
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="flex-1 min-w-0 flex justify-center"
          >
            <div className={`w-full ${chatExpanded ? "" : "max-w-lg"}`} style={{ height: "calc(100vh - 160px)" }}>
              <ChatCard
                messages={messages}
                onSend={handleSend}
                loading={loading}
                disabled={!sessionReady}
                presetComplete={presetComplete}
                isExpanded={chatExpanded}
                onToggleExpand={() => setChatExpanded((v) => !v)}
              />
            </div>
          </motion.div>

          {/* Right sidebar */}
          <AnimatePresence initial={false}>
            {!chatExpanded && (
              <motion.div
                key="right"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "25%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex-shrink-0 overflow-hidden"
              >
                <div className="flex flex-col gap-4">
                  <ActivityCard 
                    answeredCount={answeredCount} 
                    totalQuestions={totalQuestions}
                    presetQuestions={presetQuestions}
                    presetComplete={presetComplete} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
