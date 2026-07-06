"use client";

import { site } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-content px-6 py-24 md:px-10 md:py-32"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <p className="eyebrow mb-4">{site.contact.kicker}</p>
        <h2
          id="contact-heading"
          className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl"
        >
          {site.contact.title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {site.contact.body}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${site.contact.email}`}
            className="btn-primary text-base"
          >
            {site.contact.email}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {site.contact.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-text"
                {...(s.href === "#" ? { "aria-disabled": true } : {})}
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
