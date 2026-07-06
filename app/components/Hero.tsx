"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { ArrowIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

// Word-by-word headline reveal — the editorial "thesis" entrance.
const headlineWords = ["Automations", "&", "websites", "that", "run", "themselves."];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Scene3D />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
        style={{ background: "linear-gradient(to bottom, transparent, var(--ink))" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 py-32 md:px-10">
        {/* Boot eyebrow — animates in first. */}
        <motion.p
          className="eyebrow mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-saffron"
            style={{ boxShadow: "0 0 10px var(--saffron)" }}
          />
          {site.brand}
          <span className="eyebrow-muted">— systems online</span>
        </motion.p>

        {/* Word-stagger headline in Fraunces. */}
        <motion.h1
          id="hero-heading"
          variants={container}
          initial="hidden"
          animate="visible"
          className="font-display max-w-4xl text-5xl font-light leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
          style={{ fontStyle: "normal" }}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className={`mr-[0.28em] inline-block ${
                word === "themselves." ? "text-gradient italic" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.heroSub}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton>
            <a href={site.heroPrimaryCta.href} className="btn-primary" data-cursor="hover">
              {site.heroPrimaryCta.label}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </MagneticButton>
          <a href={site.heroSecondaryCta.href} className="btn-secondary" data-cursor="hover">
            {site.heroSecondaryCta.label}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-20 flex items-center gap-3 font-mono text-2xs uppercase tracking-[0.2em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="relative flex h-4 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-saffron"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          scroll
        </motion.div>
      </div>
    </section>
  );
}
