/* Real figures from the LinkedIn experience entries, each drawn as the data it counts. */

function Units({ n, accent = [], round = false, cols = 10 }: { n: number; accent?: number[]; round?: boolean; cols?: number }) {
  return (
    <span
      aria-hidden
      className="grid w-fit gap-[4px]"
      style={{ gridTemplateColumns: `repeat(${cols}, 12px)` }}
    >
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className={`pop block h-[12px] w-[12px] ${round ? "rounded-full" : ""} ${
            accent.includes(i) ? "bg-accent" : "bg-ink"
          }`}
          style={{ ["--i" as string]: i }}
        />
      ))}
    </span>
  );
}

function Bars({ rows }: { rows: { label: string; value: number; accent?: boolean }[] }) {
  return (
    <span aria-hidden className="block w-full space-y-2.5">
      {rows.map((r, i) => (
        <span key={r.label} className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
          <span className="note text-ink-soft">{r.label}</span>
          <span className="block h-[14px] w-full">
            <span
              className={`grow block h-full ${r.accent ? "bg-accent" : "bg-ink"}`}
              style={{ width: `${r.value}%`, ["--i" as string]: i * 4 }}
            />
          </span>
        </span>
      ))}
    </span>
  );
}

function FlowSteps() {
  return (
    <span aria-hidden className="block space-y-2.5">
      <span className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
        <span className="note text-ink-soft">before</span>
        <Units n={13} cols={13} />
      </span>
      <span className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
        <span className="note text-ink-soft">after</span>
        <Units n={6} cols={13} accent={[0, 1, 2, 3, 4, 5]} />
      </span>
    </span>
  );
}

const FIGURES = [
  {
    value: "13 → 6",
    label: "tasks in an approval flow, after reading its production logs and removing branches that never ran",
    where: "OMBIA",
    viz: <FlowSteps />,
  },
  {
    value: "354K",
    label: "runs in the busiest of the 30+ legacy workflows I analysed with SQL before migrating them",
    where: "OMBIA",
    viz: <Units n={32} cols={16} accent={[0]} />,
  },
  {
    value: "−90%",
    label: "hours spent on recurring reports once I automated them as pipelines in Mobileum RAID",
    where: "Verizon account",
    viz: (
      <Bars
        rows={[
          { label: "before", value: 100 },
          { label: "after", value: 10, accent: true },
        ]}
      />
    ),
  },
  {
    value: "~20",
    label: "fraud cases a week surfaced from daily KPI monitoring in Python and SQL, plus about 2 incidents a day",
    where: "Verizon account",
    viz: <Units n={20} round cols={10} accent={[0, 1, 2]} />,
  },
];

export default function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="mt-[clamp(64px,8vw,120px)] bg-ground-2 py-[clamp(80px,10vw,150px)]"
    >
      <div className="frame">
        <div className="grid grid-cols-1 items-end gap-x-10 gap-y-6 lg:grid-cols-12" data-stagger>
          <h2 id="impact-title" className="title reveal lg:col-span-7">
            What the work moved
          </h2>
          <p className="reveal lg:col-span-5">
            Numbers from the last two jobs, each drawn as what it counts. I measure my own work the
            way I measure a business: before, after, and how often.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4" data-stagger>
          {FIGURES.map((f) => (
            <li key={f.value} className="reveal flex flex-col">
              <div className="flex min-h-[86px] items-end">{f.viz}</div>
              <p className="title num mt-8 whitespace-nowrap !text-[clamp(3rem,5vw,4.75rem)]">{f.value}</p>
              <p className="mt-4">{f.label}</p>
              <p className="note mt-3 text-ink-soft">{f.where}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
