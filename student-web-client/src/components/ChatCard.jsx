import { useState, useEffect, useRef, useCallback } from "react";
import { student, aiResponses } from "../data/mockData";

function AiAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-umblue-600 to-umblue-400 flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
        <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" />
        <path d="M18 14a6 6 0 00-12 0v4h12v-4z" />
      </svg>
    </div>
  );
}

function StudentAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maize-500 to-maize-400 flex items-center justify-center text-umblue-700 text-xs font-bold flex-shrink-0">
      {student.initials}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 p-3.5 bg-white border border-umblue-100 rounded-2xl rounded-tl-sm self-start ml-10 shadow-sm">
      <div className="typing-dot w-2 h-2 bg-umblue-300 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-umblue-300 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-umblue-300 rounded-full" />
    </div>
  );
}

export default function ChatCard({ messages, onSend }) {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [responseIdx, setResponseIdx] = useState(0);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onSend({ role: "student", text: trimmed, time: now() });
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const aiText = aiResponses[responseIdx % aiResponses.length];
      onSend({ role: "ai", text: aiText, time: now() });
      setResponseIdx((p) => p + 1);
    }, 1500);
  }, [text, onSend, responseIdx]);

  function now() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  return (
    <div className="bg-white rounded-2xl border border-umblue-100 shadow-sm flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-umblue-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-umblue-600 to-umblue-400 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" />
                <path d="M18 14a6 6 0 00-12 0v4h12v-4z" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-maize-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="text-sm font-semibold text-umblue-700">AdvI Study Agent</div>
            <div className="text-[11px] text-umblue-400">Lecture 10 – Fine-Tuning LLMs</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-maize-50 text-maize-700 text-[11px] font-semibold px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-maize-500" />
          Preset Questions
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 chat-scroll bg-umblue-50/30">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 animate-msg-in ${
              msg.role === "student" ? "flex-row-reverse" : ""
            }`}
            style={{ maxWidth: "80%", marginLeft: msg.role === "student" ? "auto" : undefined }}
          >
            {msg.role === "ai" ? <AiAvatar /> : <StudentAvatar />}
            <div>
              {msg.presetLabel && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-maize-600 uppercase tracking-wider mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-maize-500" />
                  {msg.presetLabel}
                </div>
              )}
              <div
                className={`px-4 py-3 text-[13px] leading-relaxed rounded-2xl ${
                  msg.role === "ai"
                    ? "bg-white border border-umblue-100 text-umblue-700 rounded-tl-sm shadow-sm"
                    : "bg-umblue-700 text-white rounded-tr-sm"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
              <div
                className={`text-[10px] text-umblue-300 mt-1 ${
                  msg.role === "student" ? "text-right" : ""
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-3.5 border-t border-umblue-100 bg-white">
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-umblue-50/60 border border-umblue-100 rounded-xl px-4 py-2.5 flex items-center transition focus-within:border-maize-400 focus-within:ring-2 focus-within:ring-maize-100">
            <textarea
              ref={textareaRef}
              rows="1"
              className="flex-1 bg-transparent text-sm text-umblue-700 placeholder:text-umblue-300 outline-none resize-none min-h-[22px] max-h-[100px] font-[inherit]"
              placeholder="Type your answer..."
              value={text}
              onChange={(e) => { setText(e.target.value); autoResize(); }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-10 h-10 rounded-xl bg-maize-500 hover:bg-maize-400 disabled:bg-umblue-200 flex items-center justify-center transition shadow-sm flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00274C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
          </button>
        </div>
        <div className="text-center text-[10px] text-umblue-300 mt-2">
          Enter to send &bull; Shift+Enter for new line &bull; Saved automatically
        </div>
      </div>
    </div>
  );
}
