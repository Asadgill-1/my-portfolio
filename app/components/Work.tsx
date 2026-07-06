"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

export default function Work() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-content px-6 py-24 md:px-10 md:py-32"
      aria-labelledby="work-heading"
    >
      <Reveal>
        <p className="eyebrow mb-4">Selected work</p>
        <h2
          id="work-heading"
          className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl"
        >
          Systems we shipped that kept running.
        </h2>
      </Reveal>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2">
        {site.work.map((project, i) => (
          <Reveal as="li" key={project.title} delay={i * 0.06}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="panel group h-full p-8 transition-colors duration-300 ease-soft hover:border-signal/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xs uppercase tracking-widest text-signal">
                  {project.tag}
                </span>
                <ArrowIcon className="h-4 w-4 text-muted transition-colors group-hover:text-text" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.summary}
              </p>
              <p className="mt-6 font-mono text-sm text-ember" style={{ fontVariantNumeric: "tabular-nums" }}>
                {project.result}
              </p>
            </motion.article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
