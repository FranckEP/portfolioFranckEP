import { links } from "../data/content";

export default function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="mt-[var(--section)] bg-field text-on-field">
      <div className="frame pt-[clamp(96px,12vw,176px)]" data-stagger>
        <h2 id="contact-title" className="title reveal max-w-[12ch]">
          Have data that needs a pipeline?
        </h2>
        <p className="reveal mt-8 max-w-[34rem]">
          Roles, freelance work or a question about one of the projects. Email is fastest; I answer
          within a day.
        </p>
        <p className="reveal mt-12">
          <a
            href={`mailto:${links.email}?subject=${encodeURIComponent("Hello from your portfolio")}`}
            className="group inline-flex items-baseline gap-4 text-[clamp(1.6rem,4.6vw,4.5rem)] font-bold leading-none tracking-[-0.03em] [overflow-wrap:anywhere]"
          >
            <span className="underline decoration-accent decoration-[3px] underline-offset-[0.18em] transition-colors group-hover:text-accent">
              {links.email}
            </span>
            <span aria-hidden className="text-accent transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </p>
        <ul className="reveal mt-12 flex flex-wrap gap-x-10 gap-y-4 text-lg">
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="link">
              GitHub
            </a>
          </li>
          <li>
            <a href={links.cv} download className="link">
              CV (PDF)
            </a>
          </li>
        </ul>
      </div>

      <div className="frame mt-[clamp(96px,12vw,176px)] overflow-hidden pb-6">
        <p
          aria-hidden
          className="whitespace-nowrap text-[clamp(2.4rem,9.4vw,10rem)] font-bold leading-[0.85] tracking-[-0.05em]"
        >
          Franck E. Peñaloza
        </p>
        <div className="note mt-8 flex flex-col gap-2 text-on-field-soft md:flex-row md:justify-between">
          <p>© 2026 Franck Echeverría Peñaloza</p>
          <p>Barranquilla, Colombia · UTC−5 · Spanish and English (B2)</p>
        </div>
      </div>
    </footer>
  );
}
