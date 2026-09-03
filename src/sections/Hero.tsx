import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="top" 
      className="relative overflow-hidden pt-28 pb-20 md:pt-44 md:pb-32 min-h-[85vh] flex items-center"
      style={{ backgroundColor: "#BD4403" }}
    >
      {/* Background image - only show on large screens */}
      <div 
        className="absolute inset-0 bg-no-repeat hidden lg:block" 
        style={{ 
          backgroundImage: "url(&apos;/saim-bg.png&apos;)",
          backgroundSize: "auto 100%",
          backgroundPosition: "calc(50% + 20vw) bottom",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
          maskImage: "linear-gradient(to right, transparent, black 30%)"
        }} 
      />

      {/* Gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent pointer-events-none z-0" />

      <div className="container-px w-full relative z-10">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg">
          <motion.h2 
            variants={item} 
            className="text-3xl sm:text-4xl md:text-5xl tracking-wide mb-3 drop-shadow-md"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 700, color: "#FFD166" }}
          >
            SAIM
          </motion.h2>

          <motion.h1
            variants={item}
            className="font-display font-black leading-[0.88] tracking-tightest text-white"
            style={{ fontSize: "clamp(2.5rem, 14vw, 6rem)" }}
          >
            FLUTTER
            <br />
            <span className="text-white/90">DEVELOPER</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-body text-sm leading-relaxed text-white/90 max-w-sm">
            Hi, I&apos;m Saim, a Flutter Developer passionate about creating intuitive and visually engaging mobile applications. I specialize in building scalable apps using Dart and Supabase.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={scrollTo("#work")}
              className="bg-white px-5 py-3 font-body text-xs font-semibold uppercase tracking-wide text-orange-600 transition-colors hover:bg-white/90"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              onClick={scrollTo("#contact")}
              className="border border-white px-5 py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-orange-600"
            >
              Let&apos;s Talk
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}