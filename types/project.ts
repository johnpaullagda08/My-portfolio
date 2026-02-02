export type ProjectCategory = "vue" | "php" | "react" | "node";

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  image: string;
  images?: string[];
  imageCaptions?: string[];
  url?: string;
  github?: string;
  about?: string;
  features?: string[] | ProjectFeature[];
  role?: string;
  year?: string;
  duration?: string;
  metrics?: ProjectMetric[];
}
