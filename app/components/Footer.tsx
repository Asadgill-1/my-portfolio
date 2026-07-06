import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center md:px-10">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-base font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-signal"
            style={{ boxShadow: "0 0 12px var(--signal)" }}
          />
          {site.brand}
        </a>
        <p className="font-mono text-2xs uppercase tracking-widest text-muted">
          {site.footer.note} © {site.footer.year}
        </p>
      </div>
    </footer>
  );
}
