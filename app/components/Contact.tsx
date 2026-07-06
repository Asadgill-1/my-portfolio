"use client";

import { site } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-content px-6 py-24 md:px-10 md:py-32"
      aria-labelledby="contact-heading"
    >
      {/* Ambient glow behind the contact CTA — ties to the hero palette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245,165,36,0.18) 0%, transparent 70%)",
        }}
      />
      <Reveal>
        <p className="eyebrow mb-4">{site.contact.kicker}</p>
        <h2
          id="contact-heading"
          className="relative max-w-3xl font-display text-4xl font-light leading-[1.1] tracking-tight text-balance md:text-6xl"
        >
          {site.contact.title}
        </h2>
        <p className="relative mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {site.contact.body}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <MagneticButton strength={0.4}>
            <a
              href={`mailto:${site.contact.email}`}
              className="btn-primary text-base"
              data-cursor="hover"
            >
              {site.contact.email}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </MagneticButton>
        </div>

        <ul className="relative mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {site.contact.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-bone"
                data-cursor="hover"
                {...(s.href === "#" ? { "aria-disabled": true, tabIndex: -1 } : {})}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
