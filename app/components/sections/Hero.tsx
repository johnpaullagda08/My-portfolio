"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";
import { TechStack3D, AnimatedText, ScrollRevealWipe } from "@/components/common";
import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  GitHubIcon,
  LinkedInIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  EmailIcon,
  LocationIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";

const SPRING = { type: "spring", stiffness: 90, damping: 18 } as const;

const HERO_TECH = ["Vue", "React", "Next.js", "Node.js", "TypeScript", "PHP"];

export function Hero() {
  const reducedMotion = useReducedMotion();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AuroraBackground>
      <section className="min-h-dvh flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-32 relative z-30">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            {/* Left — Content */}
            <div className="max-w-2xl">
              {/* Status spec line */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 text-xs font-mono text-muted-foreground"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                  <span className="relative flex h-2 w-2">
                    {!reducedMotion && (
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    )}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-green-400 font-medium">Available for work</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <LocationIcon size={12} />
                  Cavite, PH
                </span>
                <span className="text-border">·</span>
                <span>Available worldwide</span>
              </motion.div>

              {/* Greeting */}
              <ScrollRevealWipe delay={0.1} className="mb-3">
                <p className="text-primary font-mono text-sm md:text-base">
                  Hi, my name is
                </p>
              </ScrollRevealWipe>

              {/* Name */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight">
                <AnimatedText
                  text={profile.name}
                  as="h1"
                  staggerDelay={0.03}
                  initialDelay={0.3}
                />
                <span className="text-primary">.</span>
              </div>

              {/* Subtitle */}
              <ScrollRevealWipe delay={0.5} direction="right" className="mb-6">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground/85">
                  {profile.title}
                </h2>
              </ScrollRevealWipe>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.7 }}
                className="text-muted-foreground text-base md:text-lg max-w-xl mb-6 leading-relaxed"
              >
                I build production web apps end-to-end — Vue and React on the front,
                Node and PHP on the back. I care about clean architecture,
                honest UX, and shipping things that actually work.
              </motion.p>

              {/* Tech chip strip */}
              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.85 }}
                className="flex flex-wrap gap-2 mb-8"
                aria-label="Primary tech stack"
              >
                {HERO_TECH.map((tech, i) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...SPRING, delay: 0.9 + i * 0.04 }}
                    className="px-3 py-1 rounded-full text-xs font-mono text-muted-foreground bg-secondary/50 border border-border/60 hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    {tech}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA pair */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 1.0 }}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToId("projects")}
                  className="group relative h-11 px-6 shadow-[0_0_24px_-6px_var(--primary)] hover:shadow-[0_0_32px_-4px_var(--primary)] transition-shadow"
                  data-cursor-hover
                >
                  View Projects
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToId("contact")}
                  className="h-11 px-6 border-border/80 bg-background/40 backdrop-blur-sm hover:bg-secondary/60"
                  data-cursor-hover
                >
                  <EmailIcon size={16} />
                  Get in Touch
                </Button>
              </motion.div>

              {/* Social row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.15 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-mono text-muted-foreground/70 mr-1">
                  Or connect:
                </span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all hover:-translate-y-0.5"
                  aria-label="GitHub"
                  data-cursor-hover
                >
                  <GitHubIcon size={20} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all hover:-translate-y-0.5"
                  aria-label="LinkedIn"
                  data-cursor-hover
                >
                  <LinkedInIcon size={20} />
                </a>
              </motion.div>
            </div>

            {/* Right — 3D Tech Stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING, delay: 0.4, mass: 0.8 }}
              className="hidden lg:flex justify-center items-center"
              data-cursor-large
            >
              <TechStack3D />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — now interactive */}
        <motion.button
          type="button"
          onClick={() => scrollToId("about")}
          aria-label="Scroll to about section"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors group"
          data-cursor-hover
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
            Scroll
          </span>
          <motion.span
            animate={reducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowDownIcon size={22} />
          </motion.span>
        </motion.button>
      </section>
    </AuroraBackground>
  );
}
