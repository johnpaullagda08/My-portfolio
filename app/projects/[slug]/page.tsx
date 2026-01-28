"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { projects, profile } from "@/lib/data";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, ExternalLinkIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  if (!project) {
    notFound();
  }

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

      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            {/* Category Badge */}
            <Badge
              variant="outline"
              className={`mb-4 ${
                project.category === "vue"
                  ? "border-green-500/50 text-green-400"
                  : project.category === "react"
                  ? "border-cyan-500/50 text-cyan-400"
                  : "border-purple-500/50 text-purple-400"
              }`}
            >
              {project.category === "vue"
                ? "Vue/Node.js"
                : project.category === "react"
                ? "React/Next.js"
                : "PHP"}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {project.name}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* View Live Button */}
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
          </motion.div>
        </div>
      </section>

      {/* Project Images Carousel */}
      {project.images && project.images.length > 0 && (
        <section className="pb-20">
          <div className="w-full">
            <Carousel
              items={project.images.map((image, index) => (
                <Card
                  key={index}
                  index={index}
                  card={{
                    src: image,
                    title: `${project.name} Screenshot ${index + 1}`,
                    category: project.category === "vue" ? "Vue/Node.js" : project.category === "react" ? "React/Next.js" : "PHP",
                    content: (
                      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                          {project.description}
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

      {/* Project Details */}
      <section className="pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                About this project
              </h2>
              <div className="prose prose-invert max-w-none">
                {project.about ? (
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.about}
                  </p>
                ) : (
                  <>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      This project was developed as part of my work at HRD Singapore
                      PTE LTD. It showcases my ability to build full-stack
                      applications that solve real business problems.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The system was built using {project.tech.join(", ")} and
                      demonstrates my expertise in both frontend and backend
                      development.
                    </p>
                  </>
                )}
              </div>

              {/* Key Features */}
              <h3 className="text-xl font-semibold text-foreground mt-12 mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features ? (
                  project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">
                        <CheckCircleIcon size={20} />
                      </span>
                      {feature}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">
                        <CheckCircleIcon size={20} />
                      </span>
                      User-friendly interface designed for efficiency
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">
                        <CheckCircleIcon size={20} />
                      </span>
                      Robust backend with secure data handling
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">
                        <CheckCircleIcon size={20} />
                      </span>
                      Integration with company databases and systems
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">
                        <CheckCircleIcon size={20} />
                      </span>
                      Automated workflows to improve productivity
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation to other projects */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Previous Project */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex-1 p-6 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <p className="text-sm text-muted-foreground mb-2">
                Previous Project
              </p>
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                <ArrowLeftIcon size={20} />
                {prevProject.name}
              </p>
            </Link>

            {/* Next Project */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex-1 p-6 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-right"
            >
              <p className="text-sm text-muted-foreground mb-2">Next Project</p>
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-end gap-2">
                {nextProject.name}
                <ArrowRightIcon size={20} />
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Interested in working together?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let&apos;s discuss your project and see how I can help.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Let&apos;s Talk</Link>
          </Button>
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
