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
      className="relative overflow-hidden pt-24 pb-16 md:pt-44 md:pb-32 min-h-[90vh] flex items-center"
      style={{ backgroundColor: "#BD4403" }}
    >
      {/* Background image - low opacity on mobile, full on desktop */}
      <div 
        className="absolute inset-0 bg-no-repeat opacity-20 md:opacity-100" 
        style={{ 
          backgroundImage: "url('/saim-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent)"
        }} 
      />
      
      {/* Desktop-specific overrides for background via a second div so we don't fight inline styles */}
      <div 
        className="absolute inset-0 bg-no-repeat hidden md:block" 
        style={{ 
          backgroundImage: "url('/saim-bg.png')",
          backgroundSize: "auto 100%",
          backgroundPosition: "calc(50% + 20vw) bottom",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
          maskImage: "linear-gradient(to right, transparent, black 30%)"
        }} 
      />

      {/* Gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent pointer-events-none z-0" />

      <div className="container-px w-full relative z-10">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg md:max-w-xl relative">
          <motion.h2 
            variants={item} 
            className="text-4xl md:text-5xl lg:text-6xl tracking-wide mb-3 drop-shadow-md"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, color: "#FFD166" }}
          >
            SAIM
          </motion.h2>

          <motion.h1
            variants={item}
            className="font-display font-black leading-[0.9] tracking-tighter text-white text-[3.5rem] sm:text-[4.5rem] md:text-6xl lg:text-7xl break-words"
          >
            FLUTTER
            <br />
            <span className="text-white/90">DEVELOPER</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-body text-sm md:text-base leading-relaxed text-white/90 max-w-[280px] sm:max-w-sm md:max-w-md drop-shadow-sm">
            Hi, I'm Saim, a Flutter Developer passionate about creating intuitive and visually engaging mobile applications. I specialize in building scalable apps using Dart and Supabase.
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
              className="border border-white px-5 py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-orange-600 bg-black/10 backdrop-blur-sm"
            >
              Let's Talk
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
