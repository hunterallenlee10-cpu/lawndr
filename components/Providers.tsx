"use client";

import { MotionConfig } from "motion/react";

/** reducedMotion="user" drops transform animations for people who ask for less motion, without SSR mismatches. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
