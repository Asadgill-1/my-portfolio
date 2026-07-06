"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { ArrowIcon } from "./Icons";

// Load the WebGL scene client-side only, never blocking SSR or first paint.
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* 3D scene — absolute, behind content, pointer-events disabled so
           it never blocks the CTA on touch. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <Scene3D />
      </div>

      {/* Grid backdrop layered over the canvas for depth. */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      {/* Bottom fade so the scene melts into the next section. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to bottom, transparent, var(--ink))" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 py-32 md:px-10">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.brand}
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-text">Automations &amp; websites</span>
          <br />
          <span className="text-gradient">that run themselves.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.heroSub}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href={site.heroPrimaryCta.href} className="btn-primary">
            {site.heroPrimaryCta.label}
            <ArrowIcon className="h-4 w-4" />
          </a>
          <a href={site.heroSecondaryCta.href} className="btn-secondary">
            {site.heroSecondaryCta.label}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
