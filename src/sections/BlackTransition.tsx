import { motion } from "framer-motion";

export default function BlackTransition() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute -left-20 top-10 h-48 w-48 sm:h-72 sm:w-72 rounded-full border border-accent" />
        <div className="absolute -right-10 bottom-0 h-40 w-40 sm:h-56 sm:w-56 rounded-full border border-accent" />
      </div>

      <div className="container-px relative">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tightest text-cream"
        >
          I don't just build apps.
          <br />
          <span className="text-accent">I build experiences.</span>
        </motion.h2>
      </div>
    </section>
  );
}
