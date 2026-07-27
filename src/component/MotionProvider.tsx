"use client";

import { LazyMotion } from "framer-motion";
import loadFeatures from "@/lib/motion-features";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
