export type ProjectCategory = "vue" | "php" | "react" | "node";

export interface Project {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  image: string;
}
