"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

/* TiltCard — a project card that tilts toward the cursor in 3D.
   Desktop (fine pointer) only; flat + graceful on touch. */
function TiltCard({ project }: { project: (typeof site.work)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(srx, [0, 1], ["6deg", "-6deg"]);
  const rotateY = useTransform(sry, [0, 1], ["-8deg", "8deg"]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height);
    ry.set((e.clientX - r.left) / r.width);
  };
  const reset = () => {
    rx.set(0.5);
    ry.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="panel group h-full p-8 transition-colors duration-300 ease-soft hover:border-saffron/40 [transform-style:preserve-3d]"
      data-cursor="hover"
    >
      <div className="flex items-center justify-between [transform:translateZ(40px)]">
        <span className="font-mono text-2xs uppercase tracking-[0.2em] text-saffron">
          {project.tag}
        </span>
        <ArrowIcon className="h-4 w-4 text-muted transition-colors group-hover:text-bone" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight [transform:translateZ(30px)]">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted [transform:translateZ(20px)]">
        {project.summary}
      </p>
      <p
        className="mt-6 font-mono text-sm text-saffron [transform:translateZ(50px)]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {project.result}
      </p>
    </motion.div>
  );
}

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
          className="max-w-2xl font-display text-4xl font-light leading-[1.1] tracking-tight text-balance md:text-5xl"
        >
          Systems we shipped that kept running.
        </h2>
      </Reveal>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2">
        {site.work.map((project, i) => (
          <Reveal as="li" key={project.title} delay={i * 0.06}>
            <TiltCard project={project} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
