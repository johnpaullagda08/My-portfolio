"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  EASE_OUT_EXPO,
  ANIMATION_DURATION,
  MOVEMENT_OFFSET,
  VIEWPORT_MARGIN,
} from "@/lib/constants";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const offset = MOVEMENT_OFFSET.scrollReveal;
  const directions = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { y: 0, x: offset },
    right: { y: 0, x: -offset },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      transition={{
        duration: ANIMATION_DURATION.medium,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
