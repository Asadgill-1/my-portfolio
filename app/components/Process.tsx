"use client";

import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section
      id="process"
      className="relative border-y border-line bg-surface/40"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow mb-4">How it goes</p>
          <h2
            id="process-heading"
            className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl"
          >
            A real sequence — not a black box.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {site.process.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 0.1}>
              <div className="h-full bg-ink p-8 md:p-10">
                <span
                  className="font-mono text-3xl font-medium text-signal"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
