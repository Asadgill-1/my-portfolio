"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-saffron focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-soft ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-lg font-medium tracking-tight"
            data-cursor="hover"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full bg-saffron"
              style={{ boxShadow: "0 0 12px var(--saffron)" }}
            />
            {site.brand}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-2xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-bone"
                  data-cursor="hover"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex btn-primary text-sm"
            data-cursor="hover"
          >
            Start a project
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-bone md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Start a project
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
