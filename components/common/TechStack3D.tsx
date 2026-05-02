"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ANIMATION_DURATION_MS, RING_ROTATION_DURATION } from "@/lib/constants";
import { getYearsOfExperience } from "@/lib/data";

export function TechStack3D() {
  const [yearsCount, setYearsCount] = useState(0);
  const reducedMotion = useReducedMotion();
  const targetYears = getYearsOfExperience();

  useEffect(() => {
    const duration = ANIMATION_DURATION_MS.counterDuration;
    const steps = 60;
    const increment = targetYears / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetYears) {
        setYearsCount(targetYears);
        clearInterval(timer);
      } else {
        setYearsCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetYears]);

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] perspective-1000">
      {/* Central glowing orb */}
      <motion.div
        animate={reducedMotion ? { scale: 1, opacity: 0.45 } : {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: reducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/30 blur-2xl"
      />

      {/* Inner rotating ring */}
      <motion.div
        animate={reducedMotion ? { rotateZ: 0 } : { rotateZ: 360 }}
        transition={{ duration: RING_ROTATION_DURATION.inner, repeat: reducedMotion ? 0 : Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full border border-primary/30"
      >
        {/* Dots on inner ring */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 90}deg) translateX(${80}px) translateY(-50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Middle rotating ring */}
      <motion.div
        animate={reducedMotion ? { rotateZ: 0 } : { rotateZ: -360 }}
        transition={{ duration: RING_ROTATION_DURATION.middle, repeat: reducedMotion ? 0 : Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 rounded-full border border-border"
      >
        {/* Dots on middle ring */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 60}deg) translateX(${112}px) translateY(-50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Outer rotating ring */}
      <motion.div
        animate={reducedMotion ? { rotateZ: 0 } : { rotateZ: 360 }}
        transition={{ duration: RING_ROTATION_DURATION.outer, repeat: reducedMotion ? 0 : Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border border-border/50"
      >
        {/* Dots on outer ring */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-muted-foreground/30"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 45}deg) translateX(${144}px) translateY(-50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Center content with counting animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <motion.div
          className="text-5xl md:text-6xl font-bold text-primary"
          animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
        >
          {yearsCount}+
        </motion.div>
        <div className="text-sm md:text-base text-muted-foreground mt-1">Years Experience</div>
      </motion.div>

      {/* Floating particles — skip entirely on reduced-motion */}
      {!reducedMotion && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 rounded-full bg-primary/60"
          style={{
            top: `${15 + (i * 6) % 70}%`,
            left: `${15 + (i * 7) % 70}%`,
          }}
        />
      ))}

      {/* Glowing accent dots */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 rounded-full bg-primary blur-sm"
          style={{
            top: `${30 + i * 20}%`,
            left: `${25 + i * 25}%`,
          }}
        />
      ))}
    </div>
  );
}
