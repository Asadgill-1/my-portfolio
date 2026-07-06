# Autonomous World

Portfolio site for **Autonomous World** — a studio that builds automations and websites for business. The signature element is a 3D orbital node network in the hero: a glowing core with nodes traveling on connected rings, reading as automation workflows running on their own.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom design-token palette
- **React Three Fiber + drei + postprocessing** for the 3D hero (Bloom glow)
- **Framer Motion** for restrained scroll reveals and hover micro-interactions
- Fonts: Space Grotesk (display), Geist (body), Geist Mono (labels/data)

## Design notes

- Palette: cool `ink` void with a warm `ember` accent and `signal` mint — deliberately not the acid-green/vermilion-on-black default.
- The mono face carries the "systems / terminal" vernacular (eyebrows, labels, numbers).
- Motion is bold at the hero and disciplined everywhere else.
- Accessibility: `prefers-reduced-motion` swaps the WebGL scene for a static gradient panel; visible focus rings; 4.5:1 contrast on the dark background; skip link; semantic heading hierarchy.

## Edit your content

All copy lives in **`content/site.ts`** — brand name, tagline, capabilities, process steps, project cards, about, contact, socials. Edit there and it updates everywhere. No component code needs to change.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repo.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.
4. Your site goes live on a `*.vercel.app` URL (add a custom domain in project settings).
