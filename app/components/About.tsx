"use client";

import { site } from "@/content/site";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line bg-surface/40"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">{site.about.kicker}</p>
            <h2
              id="about-heading"
              className="max-w-xl font-display text-3xl font-light leading-[1.2] tracking-tight text-balance md:text-4xl"
            >
              {site.about.body}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-8">
              {site.about.stats.map((stat) => (
                <div key={stat.label} className="border-l border-saffron/40 pl-5">
                  <dt
                    className="font-display text-4xl font-medium text-bone md:text-5xl"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    <CountUp value={stat.value} />
                  </dt>
                  <dd className="mt-1 font-mono text-2xs uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
