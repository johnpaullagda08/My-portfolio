"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { profile } from "@/lib/data";
import { getCategoryConfig, getCategoryBadgeClasses } from "@/lib/constants";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, FeatureIcon, GitHubIcon, CodeIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import type { Project, ProjectFeature } from "@/types";

interface ProjectContentProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

function isProjectFeatureArray(features: string[] | ProjectFeature[]): features is ProjectFeature[] {
  return features.length > 0 && typeof features[0] === "object";
}

function ImagePlaceholder({ category, size = "default", className = "" }: { category: Project["category"]; size?: "small" | "default" | "large"; className?: string }) {
  const config = getCategoryConfig(category);
  const iconSize = size === "small" ? 32 : size === "large" ? 64 : 48;
  const textSize = size === "small" ? "text-xs" : size === "large" ? "text-base" : "text-sm";

  return (
    <div className={`absolute inset-0 ${config.gradientClass} ${className}`}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Decorative blurs */}
      <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl opacity-20 ${config.glowClass}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full blur-2xl opacity-15 ${config.glowClass}`} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className={`p-4 rounded-2xl ${config.bgClass}`}>
          <CodeIcon size={iconSize} className={`${config.textClass} opacity-60`} />
        </div>
        <div className="text-center px-4">
          <p className={`${textSize} text-muted-foreground font-medium`}>Internal System</p>
          <p className={`${size === "small" ? "text-[10px]" : "text-xs"} text-muted-foreground/60`}>Screenshot Unavailable</p>
        </div>
      </div>
    </div>
  );
}

function HeroImage({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);
  const config = getCategoryConfig(project.category);

  return (
    <>
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
        {project.image && !imageError ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <ImagePlaceholder category={project.category} size="large" />
        )}
      </div>
      {/* Decorative glow */}
      <div className={`absolute -inset-4 rounded-3xl blur-3xl opacity-20 -z-10 ${config.glowClass}`} />
    </>
  );
}

function ProjectThumbnail({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);

  if (!project.image || imageError) {
    return (
      <div className="mt-4 aspect-video rounded-lg overflow-hidden relative opacity-60 group-hover:opacity-100 transition-opacity bg-card">
        <ImagePlaceholder category={project.category} size="small" />
      </div>
    );
  }

  return (
    <div className="mt-4 aspect-video rounded-lg overflow-hidden relative opacity-60 group-hover:opacity-100 transition-opacity">
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export function ProjectContent({ project, prevProject, nextProject }: ProjectContentProps) {
  const categoryConfig = getCategoryConfig(project.category);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="JP Logo"
                width={50}
                height={35}
                className="object-contain"
              />
            </Link>
            <Link
              href="/#projects"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeftIcon size={16} />
              Back to Projects
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Badge */}
              <Badge
                variant="outline"
                className={`mb-4 ${getCategoryBadgeClasses(project.category)}`}
              >
                {categoryConfig.label}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {project.name}
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Project Metadata */}
              {(project.role || project.year || project.duration) && (
                <div className="flex flex-wrap gap-6 mb-6 text-sm">
                  {project.role && (
                    <div>
                      <p className="text-muted-foreground">Role</p>
                      <p className="text-foreground font-medium">{project.role}</p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <p className="text-muted-foreground">Year</p>
                      <p className="text-foreground font-medium">{project.year}</p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="text-foreground font-medium">{project.duration}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.url && (
                  <Button asChild>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      View Live
                      <ExternalLinkIcon size={16} />
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <GitHubIcon size={16} />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <HeroImage project={project} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="py-12 border-y border-border bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {project.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Project Images Carousel with Captions */}
      {project.images && project.images.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Screenshots</h2>
            <p className="text-muted-foreground mt-2">Explore the interface and features</p>
          </div>
          <div className="w-full">
            <Carousel
              items={project.images.map((image, index) => (
                <Card
                  key={index}
                  index={index}
                  card={{
                    src: image,
                    title: project.imageCaptions?.[index] || `${project.name} Screenshot ${index + 1}`,
                    category: categoryConfig.label,
                    content: (
                      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                          {project.imageCaptions?.[index] || project.description}
                        </p>
                      </div>
                    ),
                  }}
                />
              ))}
            />
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                About this project
              </h2>
              <div className="prose prose-invert max-w-none">
                {project.about ? (
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {project.about}
                  </p>
                ) : (
                  <>
                    <p className="text-muted-foreground leading-relaxed">
                      This project was developed as part of my work at HRD Singapore
                      PTE LTD. It showcases my ability to build full-stack
                      applications that solve real business problems.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      The system was built using {project.tech.join(", ")} and
                      demonstrates my expertise in both frontend and backend
                      development.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Cards Grid */}
      {project.features && project.features.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Key Features
              </h2>
              <p className="text-muted-foreground mb-8">
                What makes this project stand out
              </p>

              {isProjectFeatureArray(project.features) ? (
                // Feature Cards Grid
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {(project.features as ProjectFeature[]).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${categoryConfig.bgClass} ${categoryConfig.textClass}`}>
                        <FeatureIcon name={feature.icon || "code"} size={20} />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Fallback: Simple list for string[] features
                <div className="grid sm:grid-cols-2 gap-4">
                  {(project.features as string[]).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${categoryConfig.bgClass} ${categoryConfig.textClass}`}>
                        <FeatureIcon name="check" size={14} />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Navigation to other projects */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Previous Project */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex-1 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all"
            >
              <p className="text-sm text-muted-foreground mb-2">
                Previous Project
              </p>
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                <ArrowLeftIcon size={20} />
                {prevProject.name}
              </p>
              <ProjectThumbnail project={prevProject} />
            </Link>

            {/* Next Project */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex-1 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all text-right"
            >
              <p className="text-sm text-muted-foreground mb-2">Next Project</p>
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-end gap-2">
                {nextProject.name}
                <ArrowRightIcon size={20} />
              </p>
              <ProjectThumbnail project={nextProject} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border bg-gradient-to-b from-transparent to-secondary/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <Button asChild size="lg">
              <Link href="/#contact">Let&apos;s Talk</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {profile.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
