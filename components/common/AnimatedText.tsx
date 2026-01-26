"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerDelay?: number;
  initialDelay?: number;
}

export function AnimatedText({
  text,
  className = "",
  as: Component = "span",
  staggerDelay = 0.02,
  initialDelay = 0,
}: AnimatedTextProps) {
  // Split text into words and characters, preserving spaces
  const words = useMemo(() => {
    return text.split(" ").map((word, wordIndex) => ({
      word,
      chars: word.split(""),
      key: `word-${wordIndex}`,
    }));
  }, [text]);

  // Calculate total character index for stagger timing
  let charIndex = 0;

  return (
    <Component className={`inline-block ${className}`}>
      {words.map((wordData, wordIdx) => (
        <span key={wordData.key} className="inline-block whitespace-nowrap">
          {wordData.chars.map((char, idx) => {
            const currentIndex = charIndex++;
            return (
              <motion.span
                key={`${wordData.key}-char-${idx}`}
                className="inline-block cursor-default"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                  delay: initialDelay + currentIndex * staggerDelay,
                }}
                whileHover={{
                  y: -8,
                  color: "var(--primary)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {/* Add space after each word except the last */}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Component>
  );
}
