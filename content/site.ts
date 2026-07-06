/* ============================================================================
   Autonomous World — site content
   ----------------------------------------------------------------------------
   This is the SINGLE source of truth for all copy on the site.
   Edit your details here and they update everywhere. No need to touch
   component code to change text, links, or project listings.
   ========================================================================== */

export const site = {
  brand: "Autonomous World",
  brandShort: "AW",
  tagline: "Automations & websites that run themselves.",
  // Hero subhead — one sentence, plain verbs, no hype.
  heroSub:
    "We build the systems that keep your business moving — automations that fire on their own, and websites that pull their weight. You set the goal. The world runs it.",
  heroPrimaryCta: { label: "Start a project", href: "#contact" },
  heroSecondaryCta: { label: "See the work", href: "#work" },

  // Sticky nav — keep to 5 items max (mobile-friendly).
  nav: [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] as const,

  // What we do. Three pillars — automations, websites, integrations.
  capabilities: [
    {
      id: "automations",
      title: "Automations",
      kicker: "01 / Systems",
      summary:
        "Workflows that fire themselves. Lead routing, invoicing, follow-ups, report generation — the repetitive work that eats your week, handled by systems that never forget a step.",
      points: [
        "Lead capture to CRM, automatically enriched",
        "Invoice and receipt generation on trigger",
        "Slack & email alerts on the events that matter",
        "Scheduled reporting without a human in the loop",
      ],
    },
    {
      id: "websites",
      title: "Websites",
      kicker: "02 / Surfaces",
      summary:
        "Fast, focused sites built to convert — not just to fill a screen. Engineered for speed, readable on any device, and wired into the tools your business already runs on.",
      points: [
        "Sub-second loads, optimized for Core Web Vitals",
        "Forms that write straight into your CRM",
        "Analytics that tell you what to fix next",
        "Edit your own copy without breaking the build",
      ],
    },
    {
      id: "integrations",
      title: "Integrations",
      kicker: "03 / Connect",
      summary:
        "The duct tape holding your stack together, done right. We connect the apps you already pay for so data moves where it should — no more copy-paste between tabs.",
      points: [
        "Stripe, HubSpot, Notion, Airtable, Slack, and more",
        "Two-way sync, not just one-way pushes",
        "Error handling that actually tells you what broke",
        "Logs and monitoring on every connection",
      ],
    },
  ],

  // A real sequence — numbered markers are justified here because order
  // carries information the reader needs.
  process: [
    {
      step: "01",
      title: "Map the goal",
      body: "We sit down and pin the single outcome you're chasing — the manual task, the slow handoff, the page that doesn't convert. Everything else is built backward from that goal.",
    },
    {
      step: "02",
      title: "Build the system",
      body: "We ship the automation, the website, or the integration — small enough to test, solid enough to trust. You see it working against real data, not a demo.",
    },
    {
      step: "03",
      title: "Let it run",
      body: "It goes live and keeps running. We watch the logs, tune the edges, and hand you the controls. The system keeps moving while you focus on the next thing.",
    },
  ],

  // Project cards — replace placeholders with your real work.
  // `tag` should be short (one or two words). `result` is the headline number.
  work: [
    {
      title: "Lead engine for a B2B services firm",
      tag: "Automation",
      summary:
        "New form submissions auto-enriched, scored, and routed to the right rep in under 30 seconds — no manual triage.",
      result: "−82% lead response time",
    },
    {
      title: "Booking site for a wellness studio",
      tag: "Website",
      summary:
        "A focused single-page site with class scheduling wired directly into their calendar and payment processor.",
      result: "3.4× bookings in 60 days",
    },
    {
      title: "Finance ops pipeline",
      tag: "Integration",
      summary:
        "Stripe events, invoice PDFs, and a Notion dashboard synced two ways — closing the month stopped being a spreadsheet exercise.",
      result: "12 hrs / month reclaimed",
    },
    {
      title: "Onboarding flow for a SaaS",
      tag: "Automation",
      summary:
        "Welcome sequence, account provisioning, and churn-check alerts triggered the moment a new user signs up.",
      result: "31% activation lift",
    },
  ],

  about: {
    kicker: "About",
    body: "Autonomous World is a small studio that builds the systems businesses wish they had time to build themselves. We don't sell dashboards or decks — we ship automations and websites that keep running after we're gone. Every project leaves you with something that works while you sleep, and the keys to change it yourself.",
    stats: [
      { label: "Projects shipped", value: "40+" },
      { label: "Hours automated / mo", value: "600+" },
      { label: "Avg. response time", value: "<1 day" },
    ],
  },

  contact: {
    kicker: "Contact",
    title: "Tell us what should be running by itself.",
    body: "Send the messy description — the task that keeps eating your week, the page that's not converting, the three apps that won't talk to each other. We'll come back with the cleanest version of it we can build.",
    email: "hello@autonomousworld.studio",
    // Socials — leave href as "#" if you don't have one yet.
    socials: [
      { label: "Email", href: "mailto:hello@autonomousworld.studio" },
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },

  footer: {
    note: "Built by Autonomous World. Systems that run themselves.",
    year: new Date().getFullYear(),
  },
};

export type Site = typeof site;
