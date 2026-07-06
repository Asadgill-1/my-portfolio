"use client";

import { site } from "@/content/site";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";
import { AutomationIcon, WebsiteIcon, IntegrationIcon } from "./Icons";
import type { SVGProps } from "react";

const iconFor: Record<string, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  automations: AutomationIcon,
  websites: WebsiteIcon,
  integrations: IntegrationIcon,
};

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative mx-auto max-w-content px-6 py-24 md:px-10 md:py-32"
      aria-labelledby="capabilities-heading"
    >
      <Reveal>
        <p className="eyebrow mb-4">What we build</p>
        <h2
          id="capabilities-heading"
          className="max-w-2xl font-display text-4xl font-light leading-[1.1] tracking-tight text-balance md:text-5xl"
        >
          Three pillars. One goal — get the system running without you.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
        {site.capabilities.map((cap) => {
          const Icon = iconFor[cap.id];
          return (
            <StaggerItem key={cap.id} className="h-full">
              <article
                className="panel group h-full p-8 transition-all duration-300 ease-soft hover:-translate-y-1 hover:border-saffron/40"
                data-cursor="hover"
              >
                <span
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md border border-line bg-surface-2 text-saffron"
                  style={{ boxShadow: "0 0 28px -10px var(--saffron)" }}
                >
                  {Icon && <Icon className="h-6 w-6" />}
                </span>
                <p className="eyebrow-muted">{cap.kicker}</p>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">
                  {cap.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {cap.summary}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {cap.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-sm text-bone"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-saffron"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
