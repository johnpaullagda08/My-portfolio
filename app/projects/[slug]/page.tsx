import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, profile } from "@/lib/data";
import { getCategoryConfig } from "@/lib/constants";
import { ProjectContent } from "./ProjectContent";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const categoryConfig = getCategoryConfig(project.category);

  return {
    title: `${project.name} | ${profile.name}`,
    description: project.description,
    keywords: [...project.tech, categoryConfig.label, "portfolio", "web development"],
    openGraph: {
      title: `${project.name} - ${categoryConfig.label} Project`,
      description: project.description,
      type: "article",
      images: project.image ? [{ url: project.image, alt: project.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <ProjectContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
