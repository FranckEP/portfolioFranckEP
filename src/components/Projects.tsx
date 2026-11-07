"use client";

import { useState } from "react";
import { categories, moreWork, projects, type Category, type Project } from "../data/content";
import { ApiFigure, BanksFigure, RedditFigure, RetailFigure } from "./Figures";

const FIGURES: Record<Project["figure"], () => React.ReactElement> = {
  reddit: RedditFigure,
  banks: BanksFigure,
  retail: RetailFigure,
  api: ApiFigure,
};

export default function Projects() {
  const [filter, setFilter] = useState<Category | null>(null);
  const shown = projects.filter((p) => !filter || p.categories.includes(filter));
  const more = moreWork.filter((m) => !filter || m.categories.includes(filter));

  return (
    <section id="work" aria-labelledby="work-title" className="frame pt-[var(--section)]">
      <div className="grid grid-cols-1 items-end gap-x-10 gap-y-8 lg:grid-cols-12" data-stagger>
        <h2 id="work-title" className="title reveal lg:col-span-7">
          Selected data work
        </h2>
        <div className="reveal lg:col-span-5">
          <p>Four data projects in depth, then everything else I’ve shipped. Filter by the kind of work.</p>
          <div role="group" aria-label="Filter projects" className="mt-5 flex flex-wrap gap-2">
            <button type="button" className="chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
              All
            </button>
            {categories.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
        {shown.map((p, i) => {
          const Figure = FIGURES[p.figure];
          const flip = i % 2 === 1;
          return (
            <article
              key={p.id}
              aria-labelledby={`p-${p.id}`}
              className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-12"
              data-stagger
            >
              <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                <p className="reveal note text-ink-soft">{p.categories.join(" · ")}</p>
                <h3 id={`p-${p.id}`} className="reveal sub mt-3 !text-[clamp(1.9rem,3.2vw,3rem)] !leading-[1.02]">
                  {p.title}
                </h3>
                <p className="reveal mt-5">{p.summary}</p>
                <p className="reveal note mt-5 text-ink-soft">{p.stack.join(" · ")}</p>
                <p className="reveal mt-7 flex flex-wrap gap-x-7 gap-y-3">
                  {p.live && (
                    <a href={p.live.href} target="_blank" rel="noopener noreferrer" className="btn">
                      {p.live.label} <span className="arrow" aria-hidden>↗</span>
                    </a>
                  )}
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className={p.live ? "link self-center" : "link"}>
                    Read the code on GitHub
                  </a>
                </p>
              </div>
              <div className={`reveal lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
                <Figure />
              </div>
            </article>
          );
        })}
      </div>

      {more.length > 0 && (
        <div className="mt-28 grid grid-cols-1 gap-x-10 gap-y-8 lg:mt-36 lg:grid-cols-12" data-stagger>
          <h3 className="reveal sub self-start lg:col-span-4">More on GitHub</h3>
          <ul className="lg:col-span-8">
            {more.map((m) => (
              <li key={m.name} className="reveal">
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 gap-x-8 gap-y-1 py-5 transition-colors hover:bg-ground-2 sm:grid-cols-[1fr_auto] sm:px-4"
                >
                  <span>
                    <span className="text-xl font-bold tracking-tight group-hover:text-accent">{m.name}</span>
                    <span className="mt-1 block text-ink-soft">{m.line}</span>
                  </span>
                  <span className="note self-center text-ink-soft sm:text-right">{m.stack}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {shown.length === 0 && more.length === 0 && (
        <p className="mt-16">Nothing in that category yet.</p>
      )}
    </section>
  );
}
