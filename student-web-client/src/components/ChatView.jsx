import { useState, useEffect, useRef } from "react";

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

function TypingDots() {
  return (
    <div className="flex gap-1 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm self-start max-w-[70%]">
      <div className="typing-dot w-1.5 h-1.5 bg-white/60 rounded-full" />
      <div className="typing-dot w-1.5 h-1.5 bg-white/60 rounded-full" />
      <div className="typing-dot w-1.5 h-1.5 bg-white/60 rounded-full" />
    </div>
  );
}

export default function ChatView({ messages, onSend, loading = false, disabled = false }) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function send() {
    const trimmed = text.trim();
    if (!trimmed || loading || disabled) return;
    onSend(trimmed);
    setText("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div
      className="w-full max-w-md rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      style={{
        background: "linear-gradient(180deg, #001D38 0%, #0D3B6E 40%, #2870CA 100%)",
        minHeight: 0,
        height: "calc(100vh - 120px)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center pt-6 pb-4 px-6 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maize-400 to-maize-600 flex items-center justify-center mb-2 shadow-lg ring-2 ring-white/20">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00274C" strokeWidth="2.5">
            <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" />
            <path d="M18 14a6 6 0 00-12 0v4h12v-4z" />
          </svg>
        </div>
        <div className="text-white text-sm font-semibold">AdvI Study Agent</div>
        <div className="text-white/50 text-xs">Lecture 4 – Functions</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4 chat-scroll min-h-0">
        {messages.length === 0 && !loading && (
          <div className="text-white/30 text-sm text-center mt-12">
            {disabled ? "Connecting to AdvI agent..." : "Starting session..."}
          </div>
        )}

        {messages.map((msg, i) => {
          const isAi = msg.role === "ai";
          return (
            <div
              key={i}
              className={`flex flex-col animate-msg-in ${isAi ? "items-start" : "items-end"}`}
            >
              {isAi && (
                <span className="text-white/40 text-[11px] font-medium mb-1 ml-1">
                  AdvI
                </span>
              )}
              <div
                className={`px-4 py-3 text-[14px] leading-relaxed max-w-[85%] ${
                  isAi
                    ? "bg-white/[0.12] backdrop-blur-sm text-white/90 rounded-2xl rounded-tl-sm"
                    : "bg-white/[0.22] backdrop-blur-sm text-white rounded-2xl rounded-tr-sm"
                }`}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
              />
              <span className={`text-white/25 text-[10px] mt-1 ${isAi ? "ml-1" : "mr-1"}`}>
                {msg.time}
              </span>
            </div>
          );
        })}

        {loading && <TypingDots />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 pb-5 pt-2">
        <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-2xl px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none"
            placeholder={disabled ? "Connecting..." : "Ask anything"}
            value={text}
            disabled={disabled || loading}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            onClick={send}
            disabled={!text.trim() || loading || disabled}
            className="w-8 h-8 rounded-full bg-maize-500 hover:bg-maize-400 disabled:opacity-30 flex items-center justify-center transition flex-shrink-0"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00274C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
