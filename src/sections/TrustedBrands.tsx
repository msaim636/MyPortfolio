export default function TrustedBrands() {
  const skills = ["Flutter", "Dart", "Git", "Java", "C++", "SQL"];
  
  return (
    <section className="bg-paper py-8 border-b border-line overflow-hidden">
      <div className="container-px flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 lg:gap-16">
        <div className="text-muted font-body text-xs font-bold uppercase tracking-widest leading-relaxed whitespace-nowrap flex-shrink-0">
          Technical
          <br />
          Expertise
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-8 overflow-hidden">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 text-ink/50 hover:text-ink transition-colors duration-300">
              <span className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tighter uppercase">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
