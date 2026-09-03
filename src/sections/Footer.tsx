export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper py-8 sm:py-10">
      <div className="container-px flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-extrabold tracking-tightest">SAIM</p>
          <p className="font-body text-xs text-muted">Flutter Developer</p>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-6 font-body text-xs uppercase tracking-wide text-muted">
          <a href="https://www.linkedin.com/in/muhammad-saim-24b236407/" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">LinkedIn</a>
          <a href="https://github.com/msaim636" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">GitHub</a>
          <a href="mailto:chsaim715@gmail.com" className="hover:text-ink transition-colors">Email</a>
          <a href="tel:+923226099010" className="hover:text-ink transition-colors">Phone</a>
        </div>

        <p className="font-body text-xs text-muted">{`&copy; ${year} Saim. All rights reserved.`}</p>
      </div>
    </footer>
  );
}