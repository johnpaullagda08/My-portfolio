import type { ProjectCategory } from "@/types";

export interface CategoryConfig {
  label: string;
  color: "green" | "cyan" | "purple";
  borderClass: string;
  textClass: string;
  bgClass: string;
  gradientClass: string;
  glowClass: string;
}

export const CATEGORY_CONFIG: Record<ProjectCategory, CategoryConfig> = {
  vue: {
    label: "Vue/Node.js",
    color: "green",
    borderClass: "border-green-500/50",
    textClass: "text-green-400",
    bgClass: "bg-green-500/10",
    gradientClass: "bg-gradient-to-br from-green-900/40 via-green-800/20 to-transparent",
    glowClass: "bg-green-500",
  },
  react: {
    label: "React/Next.js",
    color: "cyan",
    borderClass: "border-cyan-500/50",
    textClass: "text-cyan-400",
    bgClass: "bg-cyan-500/10",
    gradientClass: "bg-gradient-to-br from-cyan-900/40 via-cyan-800/20 to-transparent",
    glowClass: "bg-cyan-500",
  },
  php: {
    label: "PHP",
    color: "purple",
    borderClass: "border-purple-500/50",
    textClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
    gradientClass: "bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-transparent",
    glowClass: "bg-purple-500",
  },
  node: {
    label: "Node.js",
    color: "green",
    borderClass: "border-green-500/50",
    textClass: "text-green-400",
    bgClass: "bg-green-500/10",
    gradientClass: "bg-gradient-to-br from-green-900/40 via-green-800/20 to-transparent",
    glowClass: "bg-green-500",
  },
};

export const getCategoryConfig = (category: ProjectCategory): CategoryConfig => {
  return CATEGORY_CONFIG[category];
};

export const getCategoryBadgeClasses = (category: ProjectCategory): string => {
  const config = CATEGORY_CONFIG[category];
  return `${config.borderClass} ${config.textClass} ${config.bgClass}`;
};
