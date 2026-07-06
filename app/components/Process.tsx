"use client";

import { motion } from "framer-motion";
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
            className="max-w-2xl font-display text-4xl font-light leading-[1.1] tracking-tight text-balance md:text-5xl"
          >
            A real sequence — not a black box.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {site.process.map((item, i) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-full bg-ink p-8 transition-colors duration-300 hover:bg-surface md:p-10"
            >
              <span
                className="font-display text-5xl font-light text-saffron/30 transition-colors duration-300 group-hover:text-saffron"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {item.step}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
              {/* Drawn connector line on hover */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-saffron transition-all duration-500 ease-soft group-hover:w-full"
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
