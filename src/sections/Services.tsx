import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Custom Flutter Dev",
    desc: "Building blazing fast, scalable, and beautifully animated cross-platform mobile applications tailored to your business needs."
  },
  {
    num: "02",
    title: "Supabase Backend",
    desc: "Architecting robust databases, secure authentication, and real-time features using Supabase for seamless app performance."
  },
  {
    num: "03",
    title: "UI/UX Implementation",
    desc: "Translating complex Figma designs into pixel-perfect, responsive, and intuitive mobile interfaces."
  },
  {
    num: "04",
    title: "Playstore Deployment",
    desc: "Handling the entire release process, from optimizing assets to successfully launching your app on the Google Play Store."
  }
];

export default function Services() {
  return (
    <section id="services" className="bg-paper py-20 md:py-32 border-b border-line">
      <div className="container-px">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
          
          <div className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-accent">
                What I Do
              </span>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl font-black leading-[0.9] tracking-tightest uppercase lg:sticky lg:top-32"
            >
              Services <br />
              <span className="text-muted">&amp; Value</span>
            </motion.h2>
          </div>

          <div className="lg:w-2/3 flex flex-col">
            {services.map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-row gap-6 sm:gap-12 border-t border-line py-8 md:py-12"
              >
                <div className="font-display text-3xl sm:text-4xl font-black text-muted/30 group-hover:text-accent transition-colors flex-shrink-0 w-10 sm:w-14">
                  {srv.num}
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-ink mb-3">
                    {srv.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-ink/70 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
