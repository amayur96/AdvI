import { useId } from "react";

/**
 * AiCompanion — AdvI's animated AI character
 *
 * state : 'idle' | 'thinking' | 'typing'
 * size  : 'sm' (32px) | 'md' (40px) | 'lg' (56px)
 */
const SIZES = { sm: 32, md: 40, lg: 56 };

export default function AiCompanion({ state = "idle", size = "md", className = "" }) {
  const uid   = useId().replace(/:/g, "");
  const px    = SIZES[size] ?? SIZES.md;
  const idle  = state === "idle";
  const think = state === "thinking";
  const type  = state === "typing";

  // Wrapper float / bob animation (CSS on the div, not SVG)
  const wrapAnim = idle  ? "companion-float 3s ease-in-out infinite"
                 : think ? "companion-think-bob 1.1s ease-in-out infinite"
                 : "none";

  // Glow ring opacity animation
  const glowAnim = think ? "companion-glow-think 0.75s ease-in-out infinite"
                 : type  ? "companion-glow-type 0.5s ease-in-out infinite"
                 : "companion-glow-idle 3s ease-in-out infinite";

  const gradId   = `cFace-${uid}`;
  const glowId   = `cGlow-${uid}`;
  const shineId  = `cShine-${uid}`;

  return (
    <div
      className={`companion-root inline-block flex-shrink-0 ${className}`}
      style={{ width: px, height: px, animation: wrapAnim }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 60 60"
        width={px}
        height={px}
        overflow="visible"
        style={{ display: "block" }}
      >
        <defs>
          {/* Face depth gradient */}
          <radialGradient id={gradId} cx="38%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#1558b0" />
            <stop offset="100%" stopColor="#001a40" />
          </radialGradient>

          {/* Glow blur filter */}
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Eye inner shine gradient */}
          <radialGradient id={shineId} cx="65%" cy="30%" r="55%">
            <stop offset="0%"   stopColor="#fff6c8" />
            <stop offset="100%" stopColor="#ffcb05" />
          </radialGradient>
        </defs>

        {/* ── Soft outer glow ring (always present) ──────────────────── */}
        <circle
          cx="30" cy="30" r="29.5"
          fill="none"
          stroke="#ffcb05"
          strokeWidth="1.8"
          style={{ animation: glowAnim }}
        />

        {/* ── Face base ───────────────────────────────────────────────── */}
        <circle cx="30" cy="30" r="27" fill={`url(#${gradId})`} />

        {/* Subtle inner ring detail */}
        <circle
          cx="30" cy="30" r="23.5"
          fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.07"
          strokeDasharray="4 3"
        />

        {/* ── THINKING: spinning dashed orbit ring ────────────────────── */}
        {think && (
          <circle
            cx="30" cy="30" r="29.5"
            fill="none" stroke="#ffcb05"
            strokeWidth="2.2" strokeDasharray="11 6"
            strokeLinecap="round" opacity="0.8"
          >
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 30 30" to="360 30 30"
              dur="2s" repeatCount="indefinite"
            />
          </circle>
        )}

        {/* ── THINKING: three orbiting dots ───────────────────────────── */}
        {think && (
          <>
            {/* Dot 1 – brightest, largest */}
            <circle cx="30" cy="-2" r="3" fill="#ffcb05" filter={`url(#${glowId})`} opacity="0.95">
              <animateTransform
                attributeName="transform" type="rotate"
                from="0 30 30" to="360 30 30"
                dur="1.55s" repeatCount="indefinite"
              />
            </circle>

            {/* Dot 2 – 120° offset */}
            <circle cx="30" cy="-2" r="2.1" fill="#ffcb05" opacity="0.55">
              <animateTransform
                attributeName="transform" type="rotate"
                from="120 30 30" to="480 30 30"
                dur="1.55s" repeatCount="indefinite"
              />
            </circle>

            {/* Dot 3 – 240° offset, faintest */}
            <circle cx="30" cy="-2" r="1.4" fill="#ffcb05" opacity="0.28">
              <animateTransform
                attributeName="transform" type="rotate"
                from="240 30 30" to="600 30 30"
                dur="1.55s" repeatCount="indefinite"
              />
            </circle>
          </>
        )}

        {/* ── LEFT EYE GROUP (shifts up when thinking) ────────────────── */}
        <g style={{
          transform: think ? "translateY(-2.5px)" : "translateY(0px)",
          transition: "transform 0.35s ease",
        }}>
          {/* Iris */}
          <ellipse cx="20" cy="26" rx="4" ry="4.8" fill={`url(#${shineId})`}>
            {/* Blink in idle */}
            {idle && (
              <animate
                attributeName="ry"
                values="4.8;4.8;0.25;4.8;4.8"
                keyTimes="0;0.85;0.9;0.95;1"
                dur="5.5s" begin="1.2s" repeatCount="indefinite"
              />
            )}
            {/* Rapid focused blink while typing */}
            {type && (
              <animate
                attributeName="ry"
                values="4.8;2.8;4.8"
                keyTimes="0;0.5;1"
                dur="0.65s" repeatCount="indefinite"
              />
            )}
          </ellipse>
          {/* Pupil */}
          <circle cx="20" cy="26.6" r="2.3" fill="#001428" />
          {/* Specular shine */}
          <circle cx="21.6" cy="24.9" r="1" fill="white" opacity="0.88" />
        </g>

        {/* ── RIGHT EYE GROUP ──────────────────────────────────────────── */}
        <g style={{
          transform: think ? "translateY(-2.5px)" : "translateY(0px)",
          transition: "transform 0.35s ease",
        }}>
          <ellipse cx="40" cy="26" rx="4" ry="4.8" fill={`url(#${shineId})`}>
            {idle && (
              <animate
                attributeName="ry"
                values="4.8;4.8;0.25;4.8;4.8"
                keyTimes="0;0.85;0.9;0.95;1"
                dur="5.5s" begin="1.25s" repeatCount="indefinite"
              />
            )}
            {type && (
              <animate
                attributeName="ry"
                values="4.8;2.8;4.8"
                keyTimes="0;0.5;1"
                dur="0.65s" repeatCount="indefinite"
              />
            )}
          </ellipse>
          <circle cx="40" cy="26.6" r="2.3" fill="#001428" />
          <circle cx="41.6" cy="24.9" r="1" fill="white" opacity="0.88" />
        </g>

        {/* ── LEFT EYEBROW (lifts when thinking) ──────────────────────── */}
        <g style={{
          transform: think ? "translateY(-3px)" : "translateY(0px)",
          transition: "transform 0.35s ease",
        }}>
          <path
            d="M 14.5 21 Q 20 18.5 25.5 21"
            fill="none" stroke="#ffcb05" strokeWidth="2" strokeLinecap="round"
          />
        </g>

        {/* ── RIGHT EYEBROW ────────────────────────────────────────────── */}
        <g style={{
          transform: think ? "translateY(-3px)" : "translateY(0px)",
          transition: "transform 0.35s ease",
        }}>
          <path
            d="M 34.5 21 Q 40 18.5 45.5 21"
            fill="none" stroke="#ffcb05" strokeWidth="2" strokeLinecap="round"
          />
        </g>

        {/* ── MOUTH ─────────────────────────────────────────────────────── */}

        {/* Idle: relaxed smile */}
        <path
          d="M 21 37.5 Q 30 43 39 37.5"
          fill="none" stroke="#ffcb05" strokeWidth="2" strokeLinecap="round"
          opacity={idle ? 1 : 0}
          style={{ transition: "opacity 0.3s ease" }}
        />

        {/* Thinking: small neutral curve */}
        <path
          d="M 24.5 38 Q 30 40 35.5 38"
          fill="none" stroke="#ffcb05" strokeWidth="2" strokeLinecap="round"
          opacity={think ? 1 : 0}
          style={{ transition: "opacity 0.3s ease" }}
        />

        {/* Typing: speaking — animates between open and nearly-closed */}
        {type && (
          <path fill="none" stroke="#ffcb05" strokeWidth="2" strokeLinecap="round">
            <animate
              attributeName="d"
              values="M 22 37.5 Q 30 43 38 37.5; M 22 37.5 Q 30 39.5 38 37.5; M 22 37.5 Q 30 43 38 37.5"
              dur="0.42s"
              repeatCount="indefinite"
            />
          </path>
        )}
      </svg>
    </div>
  );
}
