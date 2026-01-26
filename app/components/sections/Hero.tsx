"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { TechStack3D, AnimatedText, ScrollRevealWipe } from "@/components/common";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GitHubIcon, LinkedInIcon, ArrowDownIcon } from "@/components/icons";

export function Hero() {
  return (
    <AuroraBackground>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-20 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="max-w-2xl">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-xs font-medium">
                Available for work
              </span>
            </motion.div>

            {/* Greeting with wipe effect */}
            <ScrollRevealWipe delay={0.1} className="mb-4">
              <p className="text-primary font-mono text-sm md:text-base">
                Hi, my name is
              </p>
            </ScrollRevealWipe>

            {/* Name with character animation */}
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              <AnimatedText
                text={profile.name}
                as="h1"
                staggerDelay={0.03}
                initialDelay={0.3}
              />
              <span className="text-primary">.</span>
            </div>

            {/* Title with wipe effect */}
            <ScrollRevealWipe delay={0.5} direction="right" className="mb-6">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-muted-foreground">
                {profile.title}
              </h2>
            </ScrollRevealWipe>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-muted-foreground text-base md:text-lg max-w-xl mb-8 leading-relaxed"
            >
              Building robust web applications with 7+ years of experience.
              Specialized in full-stack development with Vue, React, Node.js,
              and PHP.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-6"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
                data-cursor-hover
              >
                <GitHubIcon size={24} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                data-cursor-hover
              >
                <LinkedInIcon size={24} />
              </a>
            </motion.div>
          </div>

          {/* Right - 3D Tech Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
            data-cursor-large
          >
            <TechStack3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-muted-foreground"
        >
          <ArrowDownIcon size={24} />
        </motion.div>
      </motion.div>
      </section>
    </AuroraBackground>
  );
}
