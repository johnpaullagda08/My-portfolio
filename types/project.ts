export type ProjectCategory = "vue" | "php" | "react" | "node";

export interface Project {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  image: string;
  images?: string[];
  url?: string;
  about?: string;
  features?: string[];
}
