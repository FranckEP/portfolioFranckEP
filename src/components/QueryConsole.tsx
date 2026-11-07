"use client";

import { useEffect, useMemo, useState } from "react";

/* A small SQL console about me. Every row is real: LinkedIn and the CV.
   The query types itself out, then the result rows arrive. */

type Token = { t: string; k?: "kw" | "lit" };
type Query = {
  id: string;
  label: string;
  sql: Token[];
  columns: string[];
  rows: string[][];
  highlight?: number; // row index drawn in the accent
};

const kw = (t: string): Token => ({ t, k: "kw" });
const lit = (t: string): Token => ({ t, k: "lit" });
const p = (t: string): Token => ({ t });

const QUERIES: Query[] = [
  {
    id: "career",
    label: "career",
    sql: [
      kw("SELECT"), p(" role, company, since\n"),
      kw("FROM"), p(" franck.career\n"),
      kw("ORDER BY"), p(" since "), kw("DESC"), p("\n"),
      kw("LIMIT"), p(" "), lit("4"), p(";"),
    ],
    columns: ["role", "company", "since"],
    rows: [
      ["Data Engineer", "OMBIA", "2026-07"],
      ["Team Lead, Data Analyst", "Verizon account", "2024-03"],
      ["Data Analyst", "Verizon account", "2023-09"],
      ["Support, Tier 3", "Quantica BPO", "2023-06"],
    ],
    highlight: 0,
  },
  {
    id: "stack",
    label: "stack",
    sql: [
      kw("SELECT"), p(" layer, "), kw("STRING_AGG"), p("(tool, "), lit("', '"), p(")\n"),
      kw("FROM"), p(" franck.stack\n"),
      kw("GROUP BY"), p(" layer;"),
    ],
    columns: ["layer", "tools"],
    rows: [
      ["Warehouses", "Azure Synapse, PostgreSQL, Oracle, BigQuery, Snowflake"],
      ["Pipelines", "Data Factory, Fabric, Databricks, Airflow, Kafka"],
      ["Python", "Pandas, NumPy, PySpark, Matplotlib"],
      ["BI & apps", "Power BI, Power Apps, Looker Studio, Excel"],
      ["Backend", "C# / .NET, BPMN on Camunda, NestJS, React"],
      ["Tools", "GitHub, Jira, Asana, Mobileum RAID"],
    ],
  },
  {
    id: "impact",
    label: "impact",
    sql: [
      kw("SELECT"), p(" metric, before, after\n"),
      kw("FROM"), p(" franck.impact\n"),
      kw("WHERE"), p(" verified = "), kw("TRUE"), p(";"),
    ],
    columns: ["metric", "before", "after"],
    rows: [
      ["approval flow tasks", "13", "6"],
      ["recurring report hours", "100%", "10%"],
      ["legacy flows analysed", "—", "30+"],
      ["fraud cases / week", "—", "~20"],
    ],
    highlight: 0,
  },
];

const CHAR_MS = 14;

export default function QueryConsole() {
  const [active, setActive] = useState(0);
  const q = QUERIES[active];
  const total = useMemo(() => q.sql.reduce((n, tk) => n + tk.t.length, 0), [q]);
  const [typed, setTyped] = useState(total);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(total);
      return;
    }
    setTyped(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= total) window.clearInterval(id);
    }, CHAR_MS);
    return () => window.clearInterval(id);
  }, [active, total]);

  const done = typed >= total;

  // Render the tokens up to the typed length.
  let left = typed;
  const shown = q.sql.map((tk, i) => {
    if (left <= 0) return null;
    const text = tk.t.slice(0, left);
    left -= tk.t.length;
    const cls = tk.k === "kw" ? "text-[#ff8b74]" : tk.k === "lit" ? "text-[#9cc4ff]" : "text-on-field";
    return (
      <span key={i} className={cls}>
        {text}
      </span>
    );
  });

  return (
    <div data-ui className="bg-field text-on-field">
      <div role="tablist" aria-label="Queries about me" className="flex gap-1 bg-field-2 p-1.5">
        {QUERIES.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="console-panel"
            onClick={() => setActive(i)}
            className={`px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors ${
              i === active ? "bg-field text-on-field" : "text-on-field-soft hover:text-on-field"
            }`}
          >
            {item.label}.sql
          </button>
        ))}
      </div>

      <div id="console-panel" role="tabpanel" className="p-5 sm:p-7">
        <pre className="min-h-[6.5rem] whitespace-pre-wrap font-mono text-[0.9rem] leading-[1.65] sm:text-[0.95rem]">
          <code aria-label={q.sql.map((t) => t.t).join("")}>
            {shown}
            {!done && <span className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-accent" aria-hidden />}
          </code>
        </pre>

        <div className={`mt-6 transition-opacity duration-300 ${done ? "opacity-100" : "opacity-0"}`} aria-hidden={!done}>
          <table className="w-full text-left text-[0.9375rem]">
            <thead>
              <tr className="text-on-field-soft">
                {q.columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`pb-2 font-mono text-[0.8125rem] font-normal ${i > 0 && q.columns.length === 3 && i === q.columns.length - 1 ? "text-right" : ""}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {q.rows.map((r, ri) => (
                <tr
                  key={r.join()}
                  className="border-t border-on-field/10 transition-[opacity,transform] duration-500"
                  style={{
                    opacity: done ? 1 : 0,
                    transform: done ? "none" : "translateY(6px)",
                    transitionDelay: done ? `${ri * 70}ms` : "0ms",
                  }}
                >
                  {r.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`num py-2.5 pr-3 ${ci === 0 ? "font-semibold" : "text-on-field-soft"} ${r.length === 3 && ci === r.length - 1 ? "whitespace-nowrap" : ""} ${
                        ci > 0 && r.length === 3 && ci === r.length - 1 ? "pr-0 text-right" : ""
                      } ${q.highlight === ri && ci === r.length - 1 ? "!text-[#ff8b74] font-semibold" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note mt-4 text-on-field-soft">
            {q.rows.length} rows · source: my CV and LinkedIn
          </p>
        </div>
      </div>
    </div>
  );
}
