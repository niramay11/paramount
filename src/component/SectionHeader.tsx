"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

interface SectionHeaderProps {
  eyebrow?: string;
  heading:  string;
  body?:    string;
  center?:  boolean;
  id?:      string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  heading,
  body,
  center    = true,
  id,
  className = "",
}: SectionHeaderProps) {
  const reduced = useReducedMotion();

  return (
    <motion.header
      className={`flex flex-col gap-3 mb-14 ${center ? "items-center text-center" : "items-start"} ${className}`}
      variants={reduced ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      <div className="gradient-divider" />

      {eyebrow && (
        <p className="font-sora text-[11px] font-semibold uppercase tracking-[0.14em] text-[#793146]">
          {eyebrow}
        </p>
      )}

      <h2
        id={id}
        className="font-poppins text-3xl sm:text-4xl font-bold text-[#0d2b45] tracking-tight leading-tight"
      >
        {heading}
      </h2>

      {body && (
        <p className="font-poppins text-[15px] text-[#4a6070] max-w-2xl leading-relaxed">
          {body}
        </p>
      )}
    </motion.header>
  );
}
