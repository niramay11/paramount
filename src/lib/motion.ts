import { Variants } from "framer-motion";

/* ─── Spring configs ────────────────────────────────── */

export const SPRING_BRISK = {
  type:      "spring" as const,
  stiffness: 360,
  damping:   28,
};

export const SPRING_GENTLE = {
  type:      "spring" as const,
  stiffness: 220,
  damping:   32,
};

/* ─── Variants ──────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export const STAGGER_SM: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const STAGGER_MD: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.06 } },
};

export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ─── Viewport shorthand ────────────────────────────── */

export const VIEWPORT_ONCE = { once: true, amount: 0.15 };
