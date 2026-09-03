import { motion } from "framer-motion";
import type { Project } from "../models/project";

interface Props {
  project: Project;
  onPreview: (project: Project) => void;
  featured?: boolean;
}

export default function ProjectCard({ project, onPreview, featured }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${featured ? "md:col-span-2" : ""}`}
    >
      <button
        onClick={() => onPreview(project)}
        className="block w-full overflow-hidden bg-cream text-left"
        aria-label={`Preview ${project.title}`}
      >
        <div className={`relative overflow-hidden ${featured ? "aspect-video" : "aspect-[4/5]"}`}>
          <img
            src={project.image}
            alt={`${project.title} cover`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
          <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-cream opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H5M12 4V11" stroke="#0B0B0C" strokeWidth="1.5" />
            </svg>
          </span>
        </div>
      </button>

      <div className="flex items-start justify-between gap-4 border-b border-line py-4">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-body text-xs text-muted">{project.number}</span>
            <h3 className="font-display text-xl font-bold tracking-tight">{project.title}</h3>
          </div>
          <p className="mt-1 font-body text-sm text-muted">{project.tagline}</p>
        </div>
      </div>
    </motion.article>
  );
}
