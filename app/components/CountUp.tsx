"use client";

/* CountUp — animates a number from 0 to target when scrolled into view.
   Parses values like "40+", "600+", "<1". Handles reduced-motion (static). */

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({
  value,
  duration = 1.6,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  // Extract numeric + prefix/suffix.
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const isDecimal = match ? match[2].includes(".") : false;

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      setDisplay(
        prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix
      );
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, target, prefix, suffix, isDecimal, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
