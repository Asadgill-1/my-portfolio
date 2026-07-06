"use client";

/* Tools marquee — a continuous strip of integrated platforms.
   Duplicated track loops via the `marquee` keyframe. Masked at edges. */

import { site } from "@/content/site";

export default function Marquee() {
  // Duplicate so the loop is seamless (translateX -50%).
  const items = [...site.tools, ...site.tools];
  return (
    <section
      aria-label="Tools and platforms we integrate"
      className="relative border-y border-line bg-surface/30 py-6"
    >
      <div className="mask-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
          {items.map((tool, i) => (
            <li
              key={`${tool}-${i}`}
              className="flex items-center gap-12 font-mono text-sm uppercase tracking-[0.2em] text-muted"
            >
              <span className="transition-colors duration-300 hover:text-bone">
                {tool}
              </span>
              <span aria-hidden="true" className="text-saffron/50">
                ◦
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
