"use client";

/* Custom cursor — a ring that grows on interactive elements.
   Desktop (fine pointer) only; reduced-motion → no custom cursor. */

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='hover'], input, textarea")
      );
    };
    const loop = () => {
      // Ring trails the dot with easing — the "soft" feel.
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-saffron"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-bone/40 transition-[width,height,border-color,background] duration-200 ease-soft"
        style={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          background: hovering ? "rgba(245,165,36,0.08)" : "transparent",
          borderColor: hovering ? "rgba(245,165,36,0.6)" : "rgba(236,228,214,0.4)",
        }}
      />
    </>
  );
}
