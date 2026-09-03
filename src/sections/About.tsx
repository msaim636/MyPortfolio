import { motion } from "framer-motion";
import TechOrbit from "../components/TechOrbit";

export default function About() {
  return (
    <section id="about" className="bg-paper py-20 md:py-32 border-b border-line overflow-hidden">
      <div className="container-px">
        <div className="flex items-center gap-2 mb-8 lg:mb-12">
          <div className="w-1.5 h-1.5 bg-ink rounded-full" />
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-muted">
            Better Digital Journeys.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 lg:gap-y-0">
          {/* Top Left: Heading */}
          <div className="lg:pb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black leading-[0.9] tracking-tighter uppercase text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5rem]"
            >
              My Impact <br />
              <span className="text-muted">Through</span> <br />
              User Experience
            </motion.h2>
          </div>

          {/* Top Right: Intro Text */}
          <div className="lg:pb-20 lg:pt-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-sm md:text-base font-semibold leading-relaxed tracking-wide text-ink/80 uppercase"
            >
              Turning complex ideas into elegant, high-performance mobile experiences. I believe great software is a seamless blend of robust architecture and pixel-perfect design.
            </motion.p>
          </div>

          {/* Bottom Left: Image */}
          <div className="flex">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group w-full max-w-[280px] sm:max-w-xs lg:max-w-[320px] aspect-[4/5] bg-ink/5 overflow-hidden flex items-center justify-center"
            >
              <img 
                src="/saim-bg.png" 
                alt="Saim" 
                className="w-full h-full object-cover object-top grayscale opacity-80 mix-blend-multiply transition-transform duration-700 ease-out scale-100 group-hover:scale-95" 
              />
            </motion.div>
          </div>

          {/* Bottom Right: Core Stack */}
          <div className="flex flex-col justify-between h-full relative">
            <div className="border-t border-line pt-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span className="font-body text-xs font-bold uppercase tracking-widest text-accent">Core Stack</span>
              </div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-black uppercase tracking-tighter text-ink leading-none mb-3 text-3xl sm:text-4xl md:text-5xl"
              >
                Orbiting The <br/> <span className="text-muted">Ecosystem</span>
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-body text-sm font-semibold leading-relaxed tracking-wide text-ink/70 uppercase max-w-xs sm:max-w-sm relative z-10"
              >
                My workflow revolves around building robust, scalable, and beautifully animated cross-platform experiences.
              </motion.p>
            </div>

            <div className="w-full overflow-hidden relative z-0 mt-auto md:-ml-12 lg:-ml-20">
              <div className="transform origin-bottom lg:-mb-10 -mt-8 lg:-mt-16">
                 <TechOrbit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
