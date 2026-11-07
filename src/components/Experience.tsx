import { experience } from "../data/content";
import CareerChart from "./CareerChart";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="exp-title"
      className="mt-[var(--section)] bg-field py-[var(--section)] text-on-field"
    >
      <div className="frame grid grid-cols-1 items-end gap-x-10 gap-y-6 lg:grid-cols-12" data-stagger>
        <h2 id="exp-title" className="title reveal lg:col-span-7">
          Support desk to data engineer
        </h2>
        <p className="reveal text-lg lg:col-span-5">
          Almost four years on the Verizon account: answering customers first, then reading their
          data, then leading three analysts. Since July 2026, building the data platform itself at
          OMBIA.
        </p>
      </div>

      <div className="frame mt-16 lg:mt-24">
        <CareerChart />
      </div>

      <div className="frame mt-24 grid grid-cols-1 gap-x-10 gap-y-10 lg:mt-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="sub reveal lg:sticky lg:top-12">What I did in each role</h3>
        </div>

        <ol className="space-y-4 lg:col-span-7" aria-label="Roles, most recent first">
          {experience.map((e, i) => (
            <li
              key={e.role + e.when}
              className={`reveal p-6 sm:p-8 ${i === 0 ? "bg-accent text-white" : "bg-field-2"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="sub">{e.role}</h3>
                <p className={`num ${i === 0 ? "text-white/85" : "text-on-field-soft"}`}>{e.when}</p>
              </div>
              <p className={`mt-1 font-semibold ${i === 0 ? "text-white/90" : "text-on-field-soft"}`}>{e.org}</p>
              <ul className="mt-4 space-y-2">
                {e.points.map((pt) => (
                  <li key={pt} className="max-w-[60ch]">
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
