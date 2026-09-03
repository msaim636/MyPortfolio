import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import type { Project } from "../models/project";
import ProjectCard from "../components/ProjectCard";
import ProjectPreview from "../components/ProjectPreview";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p.id !== featured?.id);

  return (
    <section id="work" className="bg-paper py-24 md:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-extrabold tracking-tightest md:text-6xl"
          >
            Selected Work
          </motion.h2>
          <p className="max-w-sm font-body text-sm text-muted md:text-right">
            A collection of Flutter &amp; Supabase apps I've built — from client platforms to
            open-source tools.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {featured && <ProjectCard project={featured} onPreview={setActive} featured />}
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} onPreview={setActive} />
          ))}
        </div>
      </div>

      <ProjectPreview project={active} onClose={() => setActive(null)} />
    </section>
  );
}
