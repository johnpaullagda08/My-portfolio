"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ANIMATION_DURATION_MS } from "@/lib/constants";

// Pre-computed random offsets for decorative elements (stable across renders)
const DECORATIVE_OFFSETS = [
  { x: 25, y: -30 },
  { x: -40, y: 15 },
  { x: 10, y: 35 },
  { x: -25, y: -20 },
  { x: 45, y: 5 },
];

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Memoize random offsets to prevent recalculation on re-render
  const decorativeOffsets = useMemo(() => DECORATIVE_OFFSETS, []);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, ANIMATION_DURATION_MS.progressInterval);

    // Hide preloader after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, ANIMATION_DURATION_MS.preloader);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src="/logo.png"
              alt="JP Logo"
              width={100}
              height={70}
              className="object-contain"
            />
          </motion.div>

          {/* Loading bar */}
          <div className="w-48 md:w-64 h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-primary rounded-full"
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-muted-foreground text-sm font-mono"
          >
            Loading...
          </motion.p>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {decorativeOffsets.map((offset, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 1.5],
                  x: offset.x,
                  y: offset.y,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border border-primary/20"
                style={{
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
