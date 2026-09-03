export type ProjectCategory = "Mobile" | "Web" | "Backend";

export interface ProjectLinks {
  livePreviewUrl?: string;
  androidApkUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  webAppUrl?: string;
  githubUrl?: string;
  interactivePrototypeUrl?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  image: string;
  video?: string;
  category: ProjectCategory;
  featured: boolean;
  links: ProjectLinks;
}
