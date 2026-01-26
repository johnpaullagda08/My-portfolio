"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_EXPO, ANIMATION_DURATION } from "@/lib/constants";

interface ScrollRevealWipeProps {
  children: ReactNode;
  direction?: "left" | "right";
  color?: string;
  delay?: number;
  className?: string;
}

export function ScrollRevealWipe({
  children,
  direction = "left",
  color = "var(--primary)",
  delay = 0,
  className = "",
}: ScrollRevealWipeProps) {
  const isLeft = direction === "left";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Content - starts hidden, revealed after wipe */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.01,
          delay: delay + ANIMATION_DURATION.medium,
        }}
      >
        {children}
      </motion.div>

      {/* Wipe overlay */}
      <motion.div
        initial={{
          x: isLeft ? "-100%" : "100%",
        }}
        whileInView={{
          x: [
            isLeft ? "-100%" : "100%",
            "0%",
            isLeft ? "100%" : "-100%",
          ],
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: ANIMATION_DURATION.medium * 2,
          delay,
          ease: EASE_OUT_EXPO,
          times: [0, 0.5, 1],
        }}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
