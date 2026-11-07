"use client";

import { useState } from "react";

/* Each project shows a piece of its own work, drawn from its README:
   the pipeline, the chart, the cleaning log, the request. */

const stage = "bg-white/80 p-5 sm:p-8";

export function RedditFigure() {
  const steps = [
    { name: "extract.py", detail: "Reddit API via PRAW, r/technology top of the day" },
    { name: "transform.py", detail: "Clean, standardise, timestamp, drop duplicates" },
    { name: "load.py", detail: "BigQuery table reddit_etl.daily_posts" },
    { name: "Looker Studio", detail: "Public dashboard on the live table" },
  ];
  return (
    <div data-ui className={stage}>
      <p className="note text-ink-soft">main.py — runs daily from the scheduler</p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li
            key={s.name}
            className={`p-5 ${i === 3 ? "bg-accent text-white" : i === 2 ? "bg-ink text-ground" : "bg-ground-2"}`}
          >
            <p className="text-xl font-bold tracking-tight">{s.name}</p>
            <p className={`note mt-2 ${i >= 2 ? "opacity-80" : "text-ink-soft"}`}>{s.detail}</p>
          </li>
        ))}
      </ol>
      <p className="note mt-6 text-ink-soft">
        Captures title, upvotes, comments and author for every post.
      </p>
    </div>
  );
}

// Top ten banks by market cap (USD billions) from the archived Wikipedia list the project scrapes,
// and the exchange rates from the project's rate file.
const BANKS = [
  { name: "JPMorgan Chase", usd: 432.92 },
  { name: "Bank of America", usd: 231.52 },
  { name: "ICBC", usd: 194.56 },
  { name: "Agricultural Bank of China", usd: 160.68 },
  { name: "HDFC Bank", usd: 157.91 },
  { name: "Wells Fargo", usd: 155.87 },
  { name: "HSBC Holdings", usd: 148.9 },
  { name: "Morgan Stanley", usd: 140.83 },
  { name: "China Construction Bank", usd: 139.82 },
  { name: "Bank of China", usd: 136.81 },
];
const RATES = { USD: 1, GBP: 0.8, EUR: 0.93, INR: 82.95 } as const;
type Cur = keyof typeof RATES;

export function BanksFigure() {
  const [cur, setCur] = useState<Cur>("USD");
  const max = BANKS[0].usd;
  const fmt = new Intl.NumberFormat("en", { maximumFractionDigits: cur === "INR" ? 0 : 1 });
  return (
    <div data-ui className={stage}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="note text-ink-soft">Market cap, billions of {cur}</p>
        <div role="group" aria-label="Currency" className="flex gap-1.5">
          {(Object.keys(RATES) as Cur[]).map((c) => (
            <button key={c} type="button" className="chip !px-3 !py-1.5" aria-pressed={cur === c} onClick={() => setCur(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-6 space-y-2.5">
        {BANKS.map((b, i) => (
          <li key={b.name} className="grid grid-cols-[minmax(0,9.5rem)_1fr] items-center gap-3 sm:grid-cols-[13rem_1fr]">
            <span className="note truncate">{b.name}</span>
            <span className="flex items-center gap-3">
              <span
                className={`grow block h-6 ${i === 0 ? "bg-accent" : "bg-ink"}`}
                style={{ width: `${(b.usd / max) * 78}%`, ["--i" as string]: i }}
              />
              <span className="note num whitespace-nowrap font-semibold">{fmt.format(b.usd * RATES[cur])}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RetailFigure() {
  const log = [
    { step: "Rows loaded from Online Retail.xlsx", value: "≈540,000" },
    { step: "Duplicate records removed", value: "5,268" },
    { step: "Invalid prices removed (UnitPrice ≤ 0)", value: "2,517" },
    { step: "Negative quantities dropped", value: "all" },
    { step: "Missing CustomerID kept as “Unknown”", value: "imputed" },
    { step: "Revenue = Quantity × UnitPrice", value: "added" },
  ];
  return (
    <div data-ui className={stage}>
      <p className="note text-ink-soft">Cleaning log</p>
      <table className="mt-4 w-full text-left">
        <tbody>
          {log.map((r) => (
            <tr key={r.step} className="border-t border-ink/10">
              <td className="py-3 pr-4">{r.step}</td>
              <td className="num py-3 text-right font-semibold">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 bg-ink p-5 text-ground sm:p-6">
        <p className="sub">Over 90% of transactions come from the UK</p>
        <div className="mt-5 flex h-4 w-full bg-field-2" aria-hidden>
          <span className="grow block h-full w-[91%] bg-accent" />
        </div>
        <p className="note mt-4 text-on-field-soft">
          Revenue climbs toward year-end: the seasonal peak to plan stock and campaigns around.
        </p>
      </div>
    </div>
  );
}

export function ApiFigure() {
  return (
    <div data-ui className={stage}>
      <p className="note text-ink-soft">extraction.py — one paginated, rate-aware call</p>
      <pre className="mt-5 overflow-x-auto bg-ink p-5 text-[0.875rem] leading-relaxed text-ground sm:p-6">
        <code>{`GET /search/repositories?q=topic:etl&per_page=100&page=2
Authorization: Bearer <personal access token>

HTTP/1.1 200 OK
x-ratelimit-limit: 30
x-ratelimit-remaining: 28
link: <…page=3>; rel="next", <…page=10>; rel="last"`}</code>
      </pre>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Pagination", "follows the link header until the last page"],
          ["Rate limits", "reads the remaining calls and waits for the reset"],
          ["Errors", "401, 403, 404 and 422 mapped to a fix in the guide"],
        ].map(([t, d]) => (
          <li key={t} className="bg-ground-2 p-4">
            <p className="font-semibold">{t}</p>
            <p className="note mt-1 text-ink-soft">{d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
