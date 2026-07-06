"use client";

/* Scroll progress — a thin saffron bar pinned to the top of the viewport,
   tracking scroll position. Signature "you are here" detail. */

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-saffron"
    />
  );
}
