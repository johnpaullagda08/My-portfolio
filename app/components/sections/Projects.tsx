"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  PanInfo,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { DRAG_CONSTRAINTS, getCategoryConfig, getCategoryBadgeClasses } from "@/lib/constants";
import { ArrowRightIcon, CodeIcon, DragIcon } from "@/components/icons";
import { ScrollReveal, AnimatedText } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { Project } from "@/types";

// Animation tokens
const SPRING_ENTER = { type: "spring", stiffness: 90, damping: 18 } as const;
const SPRING_TILT = { type: "spring", stiffness: 200, damping: 20, mass: 0.5 } as const;
const SPRING_PILL = { type: "spring", stiffness: 380, damping: 32 } as const;
const TILT_MAX = 6;
const IMAGE_ZOOM = 1.08;
const STAGGER_S = 0.06;

function ProjectCardImage({
  project,
  imageScale,
}: {
  project: Project;
  imageScale: MotionValue<number>;
}) {
  const [imageError, setImageError] = useState(false);
  const categoryConfig = getCategoryConfig(project.category);

  if (!project.image || imageError) {
    return (
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <div className={`absolute inset-0 ${categoryConfig.gradientClass}`}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div className={`absolute top-1/4 left-1/4 w-24 h-24 rounded-full blur-3xl opacity-30 ${categoryConfig.glowClass}`} />
          <div className={`absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full blur-2xl opacity-20 ${categoryConfig.glowClass}`} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
            <CodeIcon size={128} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
        className="object-cover"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  isDragging,
}: {
  project: Project;
  index: number;
  isDragging: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position normalized 0..1 (0.5 = center = no tilt)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [TILT_MAX, -TILT_MAX]),
    SPRING_TILT
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-TILT_MAX, TILT_MAX]),
    SPRING_TILT
  );

  // Image zoom driven by hover state via a separate motion value
  const hoverProgress = useMotionValue(0);
  const imageScale = useSpring(
    useTransform(hoverProgress, [0, 1], [1, IMAGE_ZOOM]),
    { stiffness: 120, damping: 20 }
  );
  const arrowScale = useSpring(
    useTransform(hoverProgress, [0, 1], [0.85, 1]),
    { stiffness: 300, damping: 22 }
  );

  // Reset tilt + hover state when carousel begins dragging
  useEffect(() => {
    if (isDragging) {
      mouseX.set(0.5);
      mouseY.set(0.5);
      hoverProgress.set(0);
    }
  }, [isDragging, mouseX, mouseY, hoverProgress]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isDragging) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    hoverProgress.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    hoverProgress.set(0);
  };

  const enterTransition = reducedMotion
    ? { duration: 0 }
    : { ...SPRING_ENTER, delay: index * STAGGER_S };

  return (
    <motion.div
      layout
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={enterTransition}
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] h-[350px] sm:h-[400px] md:h-[480px]"
      style={{ perspective: 1000 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        onClick={(e) => { if (isDragging) e.preventDefault(); }}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        className="group relative block h-full w-full rounded-2xl select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: reducedMotion ? 0 : rotateX,
            rotateY: reducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full w-full rounded-2xl overflow-hidden bg-card border border-border will-change-transform"
        >
          <ProjectCardImage project={project} imageScale={imageScale} />

          {/* Content at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-card via-card/80 to-transparent"
            style={{ transform: "translateZ(40px)" }}
          >
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1">
              {project.name}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
              {project.description}
            </p>

            <Badge
              variant="outline"
              className={getCategoryBadgeClasses(project.category)}
            >
              {getCategoryConfig(project.category).label}
            </Badge>
          </div>

          {/* Arrow indicator */}
          <motion.div
            style={{
              scale: reducedMotion ? 1 : arrowScale,
              transform: "translateZ(60px)",
            }}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center text-primary opacity-70 md:opacity-60 md:group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowRightIcon size={20} />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

type FilterCategory = "all" | "react" | "vue" | "php";

const filterTabs: { key: FilterCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "php", label: "PHP" },
];

function FilterTabs({
  activeFilter,
  onChange,
  counts,
}: {
  activeFilter: FilterCategory;
  onChange: (key: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-8">
      {filterTabs.map((tab) => {
        const isActive = activeFilter === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            aria-pressed={isActive}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-filter-pill"
                className="absolute inset-0 bg-primary rounded-full"
                transition={SPRING_PILL}
                aria-hidden
              />
            )}
            {!isActive && (
              <span
                className="absolute inset-0 bg-secondary/50 rounded-full hover:bg-secondary"
                aria-hidden
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              <span className="text-xs opacity-70 tabular-nums">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={counts[tab.key]}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-block"
                  >
                    ({counts[tab.key]})
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const dragStartX = useRef(0);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const counts: Record<FilterCategory, number> = {
    all: projects.length,
    react: projects.filter(p => p.category === "react").length,
    vue: projects.filter(p => p.category === "vue").length,
    php: projects.filter(p => p.category === "php").length,
  };

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const scrollWidth = containerRef.current.scrollWidth;
        setDragConstraints({
          left: -(scrollWidth - containerWidth + DRAG_CONSTRAINTS.padding),
          right: 0,
        });
      }
    };

    const timeoutId = setTimeout(updateConstraints, 50);
    window.addEventListener("resize", updateConstraints);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateConstraints);
    };
  }, [activeFilter]);

  const handleDragStart = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragStartX.current = info.point.x;
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setTimeout(() => setIsDragging(false), 100);
  };

  return (
    <AuroraBackground className="!h-auto py-20 md:py-28 overflow-visible">
      <section id="projects" className="w-full relative z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-12">
          <ScrollReveal>
            <p className="text-primary font-mono text-sm mb-4">[ PROJECTS ]</p>
            <AnimatedText
              text="WORK THAT SPEAKS"
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground italic"
              staggerDelay={0.025}
              initialDelay={0.1}
            />
            <motion.p
              className="text-muted-foreground mt-4 max-w-xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              A collection of projects I&apos;ve built. Drag to explore, click to view details.
            </motion.p>

            <FilterTabs
              activeFilter={activeFilter}
              onChange={setActiveFilter}
              counts={counts}
            />
          </ScrollReveal>
        </div>

        <div
          ref={containerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={DRAG_CONSTRAINTS.elastic}
            dragTransition={{ bounceStiffness: DRAG_CONSTRAINTS.bounceStiffness, bounceDamping: DRAG_CONSTRAINTS.bounceDamping }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="flex gap-4 md:gap-6 pl-6 md:pl-20 pr-6 md:pr-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  isDragging={isDragging}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-6">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <DragIcon size={16} />
            Drag to explore, click to view
          </p>
        </div>
      </section>
    </AuroraBackground>
  );
}
