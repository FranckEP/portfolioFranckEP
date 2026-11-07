import { certifications, education, publication } from "../data/content";

export default function Credentials() {
  return (
    <section
      id="credentials"
      aria-labelledby="cred-title"
      className="mt-[var(--section)] bg-ground-2 py-[clamp(80px,10vw,160px)]"
    >
      <div className="frame grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5" data-stagger>
          <h2 id="cred-title" className="title reveal">
            Study and research
          </h2>
        </div>

        <article
          id="research"
          aria-labelledby="research-title"
          className="reveal scroll-mt-8 bg-ink p-6 text-ground sm:p-10 lg:col-span-7"
        >
          <p className="note text-on-field-soft">
            Published in {publication.venue}, {publication.year}
          </p>
          <p id="research-title" className="mt-4 text-[clamp(1.35rem,2vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em]">
            {publication.title}
          </p>
          <p className="mt-5 max-w-[56ch]">
            Across Latin American countries, economic growth and R&amp;D efficiency feed each other in
            both directions. Tested with {publication.methods} models.
          </p>
          <p className="mt-7">
            <a href={publication.href} target="_blank" rel="noopener noreferrer" className="btn">
              Read the paper <span className="arrow" aria-hidden>↗</span>
            </a>
          </p>
        </article>

        <div className="lg:col-span-5" data-stagger>
          <h3 className="reveal sub">Education</h3>
          <ul className="mt-6 space-y-7">
            {education.map((e) => (
              <li key={e.name} className="reveal">
                <p className="text-xl font-bold leading-snug tracking-tight">{e.name}</p>
                <p className="mt-1 text-ink-soft">
                  {e.where} · <span className="num">{e.when}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 lg:pt-4" data-stagger>
          <h3 className="reveal sub">Certificates</h3>
          <ul className="mt-6">
            {certifications.map((c, i) => (
              <li
                key={c.name}
                className={`reveal flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 ${
                  i === 0 ? "bg-ink text-ground" : i % 2 ? "bg-ground" : ""
                }`}
              >
                <span className="font-semibold">{c.name}</span>
                <span className={`note num whitespace-nowrap ${i === 0 ? "text-on-field-soft" : "text-ink-soft"}`}>
                  {c.when}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
