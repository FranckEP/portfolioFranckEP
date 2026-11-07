"use client";

import { useEffect, useMemo, useState } from "react";
import { GITHUB_USER, links } from "../data/content";

type Repo = {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  description: string | null;
};

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; repos: Repo[]; remaining: string | null; fetchedAt: Date };

// Tone steps of the ink, darkest for the most used language. The chosen one turns red.
const SHADES = ["#0c1a2b", "#2d3e53", "#506074", "#76838f", "#9ba6b0", "#bec6cc", "#d2d8dc"];

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function ago(iso: string, now: Date) {
  const diff = (new Date(iso).getTime() - now.getTime()) / 1000;
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of steps) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return "just now";
}

function prettyName(name: string) {
  return name.replace(/[-_]+/g, " ");
}

export default function LiveGitHub() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
          { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) {
          throw new Error(
            res.status === 403 ? "GitHub's hourly limit for this connection is used up." : `GitHub answered ${res.status}.`
          );
        }
        const data: Repo[] = await res.json();
        setState({
          status: "ready",
          repos: data.filter((r) => !r.fork),
          remaining: res.headers.get("x-ratelimit-remaining"),
          fetchedAt: new Date(),
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setState({ status: "error", message: (err as Error).message || "GitHub could not be reached." });
      }
    })();
    return () => ctrl.abort();
  }, []);

  const languages = useMemo(() => {
    if (state.status !== "ready") return [];
    const counts = new Map<string, number>();
    state.repos.forEach((r) => {
      const lang = r.language ?? "Other";
      counts.set(lang, (counts.get(lang) ?? 0) + 1);
    });
    return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [state]);

  const ready = state.status === "ready" ? state : null;
  const total = ready?.repos.length ?? 0;
  const visible = ready
    ? ready.repos.filter((r) => !selected || (r.language ?? "Other") === selected).slice(0, 6)
    : [];
  const latest = ready?.repos[0];

  return (
    <section
      id="live"
      aria-labelledby="live-title"
      className="frame grid grid-cols-1 gap-x-10 gap-y-12 pt-[var(--section)] lg:grid-cols-12"
    >
      <div className="lg:col-span-4" data-stagger>
        <h2 id="live-title" className="title reveal max-w-[9ch]">
          My GitHub, read live
        </h2>
        <p className="reveal mt-8 max-w-[34rem]">
          This panel calls the GitHub REST API from your browser as the page loads, the same
          request and rate-limit handling as the extraction kit further down. Pick a language to
          filter the repositories.
        </p>
        <p className="reveal mt-6">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="link">
            github.com/{GITHUB_USER}
          </a>
        </p>
      </div>

      <div
        data-ui
        className="reveal bg-white/70 p-5 sm:p-8 lg:col-span-8 lg:p-10"
        aria-live="polite"
        aria-busy={state.status === "loading"}
      >
        <noscript>
          <p>
            The live panel needs JavaScript. My repositories are at{" "}
            <a className="link" href={links.github}>github.com/{GITHUB_USER}</a>.
          </p>
        </noscript>

        {state.status === "error" && (
          <div>
            <p className="sub">The live call did not come back.</p>
            <p className="mt-3 text-ink-soft">
              {state.message} Every repository is still on{" "}
              <a className="link text-ink" href={links.github} target="_blank" rel="noopener noreferrer">
                github.com/{GITHUB_USER}
              </a>
              .
            </p>
          </div>
        )}

        {state.status !== "error" && (
          <>
            <dl className="grid grid-cols-3 gap-4">
              <div>
                <dt className="note text-ink-soft">Public repositories</dt>
                <dd className="title num mt-2">{ready ? total : "—"}</dd>
              </div>
              <div>
                <dt className="note text-ink-soft">Languages</dt>
                <dd className="title num mt-2">{ready ? languages.length : "—"}</dd>
              </div>
              <div>
                <dt className="note text-ink-soft">Last push</dt>
                <dd className="sub mt-3">{ready && latest ? ago(latest.pushed_at, ready.fetchedAt) : "—"}</dd>
              </div>
            </dl>

            <div className="mt-10">
              <p id="lang-label" className="note text-ink-soft">
                Repositories by main language
              </p>
              <div
                role="group"
                aria-labelledby="lang-label"
                className="mt-3 flex h-12 w-full overflow-hidden bg-ground-2"
              >
                {languages.map((l, i) => {
                  const on = selected === l.name;
                  return (
                    <button
                      key={l.name}
                      type="button"
                      aria-pressed={on}
                      aria-label={`${l.name}: ${l.count} of ${total}`}
                      title={`${l.name}: ${l.count}`}
                      onClick={() => setSelected(on ? null : l.name)}
                      className="h-full transition-[filter,background-color] duration-200 hover:brightness-125"
                      style={{
                        width: `${(l.count / total) * 100}%`,
                        background: on ? "var(--color-accent)" : SHADES[Math.min(i, SHADES.length - 1)],
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button
                    key={l.name}
                    type="button"
                    className="chip"
                    aria-pressed={selected === l.name}
                    onClick={() => setSelected(selected === l.name ? null : l.name)}
                  >
                    {l.name} <span className="num opacity-60">{l.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <table className="mt-10 w-full text-left">
              <caption className="note mb-3 text-left text-ink-soft">
                {selected ? `Latest ${selected} repositories` : "Most recently pushed"}
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Repository</th>
                  <th scope="col">Language</th>
                  <th scope="col">Last push</th>
                </tr>
              </thead>
              <tbody>
                {state.status === "loading" &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="border-t border-ink/10">
                      <td className="py-4" colSpan={3}>
                        <span className="block h-5 w-2/3 animate-pulse bg-ground-2" />
                      </td>
                    </tr>
                  ))}
                {ready &&
                  visible.map((r) => (
                    <tr key={r.name} className="border-t border-ink/10">
                      <td className="py-3.5 pr-4">
                        <a
                          href={r.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold [overflow-wrap:anywhere] hover:text-accent"
                        >
                          {prettyName(r.name)}
                        </a>
                      </td>
                      <td className="note hidden py-3.5 pr-4 text-ink-soft sm:table-cell">{r.language ?? "Other"}</td>
                      <td className="note num whitespace-nowrap py-3.5 text-right text-ink-soft">
                        {ago(r.pushed_at, ready.fetchedAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {ready && (
              <p className="note mt-6 text-ink-soft">
                Fetched {ready.fetchedAt.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })} from
                api.github.com
                {ready.remaining !== null && ` · ${ready.remaining} unauthenticated calls left this hour`}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
