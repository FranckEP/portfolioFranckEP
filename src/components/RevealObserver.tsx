"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to every `.reveal` element once it enters the viewport.
 * Children of a `[data-stagger]` parent get increasing delays so a section's
 * heading, text and picture arrive one after another.
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      group.querySelectorAll<HTMLElement>(":scope .reveal").forEach((el, i) => {
        el.style.setProperty("--delay", `${i * 80}ms`);
      });
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
