"use client";

import { useRef, useState, useEffect } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { DRAG_CONSTRAINTS, getCategoryConfig, getCategoryBadgeClasses } from "@/lib/constants";
import { ArrowRightIcon, CodeIcon, DragIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/common";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { Project } from "@/types";

function ProjectCardImage({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);
  const categoryConfig = getCategoryConfig(project.category);

  const PlaceholderBackground = () => (
    <div className={`absolute inset-0 ${categoryConfig.gradientClass}`}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      {/* Decorative elements */}
      <div className={`absolute top-1/4 left-1/4 w-24 h-24 rounded-full blur-3xl opacity-30 ${categoryConfig.glowClass}`} />
      <div className={`absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full blur-2xl opacity-20 ${categoryConfig.glowClass}`} />

      {/* Code icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
        <CodeIcon size={128} />
      </div>
    </div>
  );

  if (!project.image || imageError) {
    return <PlaceholderBackground />;
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
        className="object-cover"
        onError={() => setImageError(true)}
      />
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
    </div>
  );
}

type FilterCategory = "all" | "react" | "vue" | "php";

const filterTabs: { key: FilterCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "php", label: "PHP" },
];

export function Projects() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const dragStartX = useRef(0);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

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

    // Small delay to allow DOM to update after filter change
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
    // Small delay to allow click handler to check isDragging
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleCardClick = (slug: string) => {
    // Only navigate if not dragging (less than 10px movement)
    if (!isDragging) {
      router.push(`/projects/${slug}`);
    }
  };

  return (
    <AuroraBackground className="!h-auto py-20 md:py-28 overflow-visible">
      <section id="projects" className="w-full relative z-10">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <ScrollReveal>
          <p className="text-primary font-mono text-sm mb-4">[ PROJECTS ]</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground italic">
            WORK THAT SPEAKS
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">
            A collection of projects I&apos;ve built. Drag to explore, click to view details.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-70">
                  ({tab.key === "all"
                    ? projects.length
                    : projects.filter(p => p.category === tab.key).length})
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal Drag Scroll Container */}
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
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] h-[350px] sm:h-[400px] md:h-[480px]"
            >
              <div
                onClick={() => handleCardClick(project.slug)}
                className="group relative block cursor-pointer h-full w-full rounded-2xl"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 group-hover:-translate-y-1">
                      {/* Project Image or Placeholder Background */}
                      <ProjectCardImage project={project} />

                      {/* Content at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-card via-card/80 to-transparent">
                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {project.description}
                        </p>

                        {/* Category Badge */}
                        <Badge
                          variant="outline"
                          className={getCategoryBadgeClasses(project.category)}
                        >
                          {getCategoryConfig(project.category).label}
                        </Badge>
                      </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRightIcon size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll hint */}
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
