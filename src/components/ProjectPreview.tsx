import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../models/project";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const LINK_LABELS: { key: keyof Project["links"]; label: string }[] = [
  { key: "livePreviewUrl", label: "Live Preview" },
  { key: "webAppUrl", label: "Web App" },
  { key: "androidApkUrl", label: "Android APK" },
  { key: "playStoreUrl", label: "Google Play" },
  { key: "appStoreUrl", label: "App Store" },
  { key: "githubUrl", label: "GitHub" },
];

export default function ProjectPreview({ project, onClose }: Props) {
  const [playingPrototype, setPlayingPrototype] = useState(false);

  useEffect(() => {
    if (!project) {
      setPlayingPrototype(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (playingPrototype) setPlayingPrototype(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, playingPrototype]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} preview`}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden bg-cream shadow-2xl"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream hover:bg-accent transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <div className="aspect-[4/3] md:aspect-video w-full overflow-hidden bg-ink">
              <img
                src={project.image}
                alt={`${project.title} cover`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-y-auto p-6 md:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xs text-muted">{project.number}</span>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {project.title}
                </h3>
              </div>
              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink/80 md:text-base">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-body text-xs text-muted bg-white shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.links?.interactivePrototypeUrl && (
                  <button
                    onClick={() => setPlayingPrototype(true)}
                    className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-xs font-extrabold uppercase tracking-widest text-white transition-all hover:bg-accent/90 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Prototype
                  </button>
                )}

                {LINK_LABELS.filter(({ key }) => project.links[key]).map(({ key, label }) => (
                  <a
                    key={key}
                    href={project.links[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-body text-xs font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-ink/80"
                  >
                    {label}
                  </a>
                ))}
                
                {LINK_LABELS.every(({ key }) => !project.links[key]) && !project.links?.interactivePrototypeUrl && (
                  <p className="font-body text-xs text-muted">
                    This project is in active development Ã¢â‚¬â€ links will be added once it's live.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Fullscreen Interactive Prototype Player */}
      {playingPrototype && project?.links?.interactivePrototypeUrl && (
        <motion.div
          key="prototype-player"
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#111111]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setPlayingPrototype(false)}
        >
          <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 flex gap-4">
            <button
              onClick={() => setPlayingPrototype(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-[#333333] transition-colors shadow-lg"
              title="Close Prototype"
            >
               <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          
          <div 
            className="w-full h-full flex items-center justify-center pointer-events-auto" 
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={project.links.interactivePrototypeUrl}
              className="w-full h-full border-none bg-transparent"
              title={`${project.title} Prototype Player`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

