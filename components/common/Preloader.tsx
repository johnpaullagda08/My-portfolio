"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO, ANIMATION_DURATION_MS } from "@/lib/constants";

// Scattered elements configuration - positions for scatter effect
const SCATTER_ELEMENTS = [
  { id: 1, icon: "⚛", color: "#61DAFB", finalX: -200, finalY: -150, rotation: -15 },
  { id: 2, icon: "🟢", color: "#3ECC5F", finalX: 180, finalY: -120, rotation: 20 },
  { id: 3, icon: "🔷", color: "#3178C6", finalX: -150, finalY: 100, rotation: -25 },
  { id: 4, icon: "🟣", color: "#8B5CF6", finalX: 200, finalY: 80, rotation: 15 },
  { id: 5, icon: "🔶", color: "#F7DF1E", finalX: -80, finalY: -180, rotation: 30 },
  { id: 6, icon: "🔵", color: "#3B82F6", finalX: 120, finalY: 160, rotation: -20 },
  { id: 7, icon: "⬡", color: "#68A063", finalX: -220, finalY: 20, rotation: 10 },
  { id: 8, icon: "◆", color: "#FF6B6B", finalX: 250, finalY: -50, rotation: -10 },
];

export function Preloader() {
  const [phase, setPhase] = useState<"scatter" | "gather" | "exit">("scatter");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Phase 1: Scatter (elements fly outward)
    const scatterTimer = setTimeout(() => {
      setPhase("gather");
    }, 800);

    // Phase 2: Gather (elements come back and scale up)
    const gatherTimer = setTimeout(() => {
      setPhase("exit");
    }, 1600);

    // Phase 3: Exit (slide up and fade out)
    const exitTimer = setTimeout(() => {
      setIsComplete(true);
    }, ANIMATION_DURATION_MS.preloader);

    return () => {
      clearTimeout(scatterTimer);
      clearTimeout(gatherTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  // Prevent scroll during preloader
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isComplete]);

  const getElementVariants = (element: typeof SCATTER_ELEMENTS[0]) => ({
    initial: {
      x: 0,
      y: 0,
      scale: 0,
      rotate: 0,
      opacity: 0,
    },
    scatter: {
      x: element.finalX,
      y: element.finalY,
      scale: 1,
      rotate: element.rotation,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: EASE_OUT_EXPO,
      },
    },
    gather: {
      x: 0,
      y: 0,
      scale: 1.5,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: EASE_OUT_EXPO,
      },
    },
    exit: {
      x: 0,
      y: -100,
      scale: 0.5,
      rotate: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: EASE_OUT_EXPO,
      },
    },
  });

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Scattered elements container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {SCATTER_ELEMENTS.map((element, index) => (
              <motion.div
                key={element.id}
                className="absolute flex items-center justify-center"
                variants={getElementVariants(element)}
                initial="initial"
                animate={phase}
                custom={index}
                style={{
                  fontSize: "3rem",
                  filter: `drop-shadow(0 0 20px ${element.color}40)`,
                }}
                transition={{
                  delay: index * 0.05,
                }}
              >
                {/* Geometric shape */}
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${element.color}20, ${element.color}40)`,
                    border: `2px solid ${element.color}60`,
                    boxShadow: `0 0 30px ${element.color}30`,
                  }}
                >
                  <span style={{ color: element.color, fontSize: "1.5rem" }}>
                    {element.icon}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Center logo/text that appears during gather */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: phase === "gather" || phase === "exit" ? 1 : 0,
                scale: phase === "gather" ? 1 : phase === "exit" ? 0.8 : 0.5,
                y: phase === "exit" ? -50 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: EASE_OUT_EXPO,
              }}
              className="absolute z-10"
            >
              <div className="text-4xl font-bold text-foreground">
                JP<span className="text-primary">.</span>
              </div>
            </motion.div>
          </div>

          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
