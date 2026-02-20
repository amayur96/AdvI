/**
 * AiCompanion — AdvI's animated AI character (image-based)
 *
 * state : 'idle' | 'thinking' | 'typing'
 * size  : 'sm' (32px) | 'md' (40px) | 'lg' (56px)
 */
const SIZES = { sm: 32, md: 40, lg: 56 };

export default function AiCompanion({ state = "idle", size = "md", className = "" }) {
  const px    = SIZES[size] ?? SIZES.md;
  const idle  = state === "idle";
  const think = state === "thinking";

  const wrapAnim = idle  ? "companion-float 3s ease-in-out infinite"
                 : think ? "companion-think-bob 1.1s ease-in-out infinite"
                 : "none";

  const ringAnim = think ? "companion-ring-spin 2s linear infinite"
                 : "none";

  const ringColor = think ? "border-maize-400"
                  : state === "typing" ? "border-maize-300"
                  : "border-transparent";

  return (
    <div
      className={`companion-root inline-block flex-shrink-0 relative ${className}`}
      style={{ width: px, height: px, animation: wrapAnim }}
      aria-hidden="true"
    >
      {/* Glow ring behind avatar */}
      <div
        className={`absolute inset-[-3px] rounded-full border-2 ${ringColor}`}
        style={{
          animation: ringAnim,
          borderStyle: think ? "dashed" : "solid",
          opacity: think ? 0.8 : state === "typing" ? 0.5 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Thinking orbiting dots */}
      {think && (
        <div
          className="absolute inset-[-6px] rounded-full"
          style={{ animation: "companion-ring-spin 1.5s linear infinite" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-maize-400 shadow-sm" />
        </div>
      )}

      <img
        src="/assets/ai-companion.png"
        alt=""
        className="w-full h-full rounded-full object-cover"
        draggable={false}
        style={{
          filter: think ? "brightness(1.05)" : state === "typing" ? "brightness(1.02)" : "none",
          transition: "filter 0.3s ease",
        }}
      />
    </div>
  );
}
