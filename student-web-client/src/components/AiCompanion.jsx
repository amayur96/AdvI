/**
 * AiCompanion — animated character images
 *
 * Auto-picks the right image based on state + isStatic.
 * Pass `src` explicitly to override (e.g. faculty character).
 *
 * isStatic=true  → ai-companion.png,         no animation
 * state=thinking → ai-companion-thinking.png, bob animation
 * state=idle     → ai-companion-sleeping.png, slow breathe
 *
 * size     : 'sm' (32px) | 'md' (40px) | 'lg' (56px)
 * isStatic : true → completely frozen (navbars, past messages)
 */

import { motion } from "motion/react";

const SIZES = { sm: 32, md: 40, lg: 56 };

const ANIM = {
  idle: {
    animate:    { y: [0, -3, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  thinking: {
    animate:    { y: [0, -6, 0] },
    transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
  },
  typing: {
    animate:    { x: [-2, 2, -2] },
    transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
  },
};

function autoSrc(state, isStatic) {
  if (isStatic)              return "/assets/ai-companion.png";
  if (state === "thinking")  return "/assets/ai-companion-thinking.png";
  return "/assets/ai-companion-sleeping.png";
}

export default function AiCompanion({
  state     = "idle",
  size      = "md",
  className = "",
  isStatic  = false,
  src,
}) {
  const px     = SIZES[size] ?? SIZES.md;
  const imgSrc = src ?? autoSrc(state, isStatic);
  const a      = ANIM[state] ?? ANIM.idle;

  return (
    <div
      className={`companion-root inline-block flex-shrink-0 ${className}`}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <motion.img
        src={imgSrc}
        width={px}
        height={px}
        style={{ display: "block", borderRadius: "50%", objectFit: "cover" }}
        animate={isStatic ? {} : a.animate}
        transition={isStatic ? {} : a.transition}
        draggable={false}
      />
    </div>
  );
}
