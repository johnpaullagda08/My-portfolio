"use client";

import { useRef, useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { DRAG_CONSTRAINTS } from "@/lib/constants";
import { ArrowRightIcon, CodeIcon, DragIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/common";
import { useRouter } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { Project } from "@/types";

function ProjectCardImage({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);

  const PlaceholderBackground = () => (
    <div className={`absolute inset-0 ${
      project.category === "vue"
        ? "bg-gradient-to-br from-green-900/40 via-green-800/20 to-transparent"
        : project.category === "react"
        ? "bg-gradient-to-br from-cyan-900/40 via-cyan-800/20 to-transparent"
        : "bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-transparent"
    }`}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      {/* Decorative elements */}
      <div className={`absolute top-1/4 left-1/4 w-24 h-24 rounded-full blur-3xl opacity-30 ${
        project.category === "vue" ? "bg-green-500" : project.category === "react" ? "bg-cyan-500" : "bg-purple-500"
      }`} />
      <div className={`absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full blur-2xl opacity-20 ${
        project.category === "vue" ? "bg-emerald-400" : project.category === "react" ? "bg-sky-400" : "bg-violet-400"
      }`} />

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
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
    </div>
  );
}

export function Projects() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

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

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

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
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
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
                          className={`${
                            project.category === "vue"
                              ? "border-green-500/50 text-green-400 bg-green-500/10"
                              : project.category === "react"
                              ? "border-cyan-500/50 text-cyan-400 bg-cyan-500/10"
                              : "border-purple-500/50 text-purple-400 bg-purple-500/10"
                          }`}
                        >
                          {project.category === "vue" ? "Vue/Node.js" : project.category === "react" ? "React/Next.js" : "PHP"}
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
