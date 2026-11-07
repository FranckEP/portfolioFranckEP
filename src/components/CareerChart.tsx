import { CAREER_MONTHS, CAREER_START, timeline } from "../data/content";

const COLORS: Record<(typeof timeline)[number]["kind"], string> = {
  now: "bg-accent",
  data: "bg-on-field",
  side: "bg-[#3a4d66]",
  support: "bg-[#5f6f82]",
};

// Month index of each 1 January after the start, for the year labels.
const YEARS = Array.from({ length: 5 }, (_, i) => CAREER_START.year + 1 + i)
  .map((year) => ({ year, at: (year - CAREER_START.year) * 12 - (CAREER_START.month - 1) }))
  .filter((y) => y.at < CAREER_MONTHS);

const pct = (m: number) => `${(m / CAREER_MONTHS) * 100}%`;

function span(from: number, to: number) {
  const months = to - from;
  if (months < 12) return `${months} mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y} yr ${m} mo` : `${y} yr`;
}

export default function CareerChart() {
  return (
    <figure className="reveal" aria-labelledby="career-caption">
      <figcaption id="career-caption" className="sr-only">
        Career timeline from August 2022 to now: three support tiers, data analyst, team lead, and
        data engineer since July 2026.
      </figcaption>

      <ol className="space-y-2.5">
        {timeline.map((t, i) => (
          <li key={t.role} className="grid grid-cols-1 items-center gap-x-8 gap-y-1.5 lg:grid-cols-[17rem_1fr]">
            <p className="flex items-baseline justify-between gap-4 lg:block">
              <span className={`font-semibold ${t.kind === "now" ? "text-on-field" : ""}`}>{t.role}</span>
              <span className="note text-on-field-soft lg:block">{t.where}</span>
            </p>
            <div className="relative h-9">
              <div
                className={`grow absolute inset-y-0 flex items-center ${COLORS[t.kind]}`}
                style={{ left: pct(t.from), width: pct(t.to - t.from), ["--i" as string]: timeline.length - i }}
              />
              <span
                className={`note num absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${
                  t.kind === "data" && t.to > CAREER_MONTHS * 0.75 ? "font-semibold text-ink" : "text-on-field-soft"
                }`}
                style={
                  t.kind === "now"
                    ? { right: pct(CAREER_MONTHS - t.from), paddingRight: "0.75rem" }
                    : t.to > CAREER_MONTHS * 0.75
                      ? { right: pct(CAREER_MONTHS - t.to), paddingRight: "0.75rem" }
                      : { left: pct(t.to), paddingLeft: "0.75rem" }
                }
              >
                {t.kind === "now" ? "now" : span(t.from, t.to)}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid grid-cols-1 gap-x-8 lg:grid-cols-[17rem_1fr]" aria-hidden>
        <span className="hidden lg:block" />
        <div className="note num relative h-6 text-on-field-soft">
          <span className="absolute left-0 hidden sm:inline">2022</span>
          {YEARS.map((y) => (
            <span key={y.year} className="absolute -translate-x-1/2" style={{ left: pct(y.at) }}>
              {y.year}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
