import { motion } from "framer-motion";

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="bg-paper py-20 md:py-40">
      <div className="container-px">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tightest"
        >
          Have a project
          <br />
          in mind?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-md font-body text-sm sm:text-base text-ink/70"
        >
          Let's build something meaningful together.
        </motion.p>

        <div className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 border-t border-line pt-8">
          <a
            href="mailto:chsaim715@gmail.com"
            className="group flex items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight hover:text-[#EA4335] transition-colors"
          >
            Email
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowIcon />
            </span>
          </a>
          <a
            href="tel:+923226099010"
            className="group flex items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight hover:text-[#34A853] transition-colors"
          >
            Phone
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowIcon />
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-saim-24b236407/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight hover:text-[#0A66C2] transition-colors"
          >
            LinkedIn
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowIcon />
            </span>
          </a>
          <a
            href="https://github.com/msaim636"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight hover:text-[#333] transition-colors"
          >
            GitHub
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}