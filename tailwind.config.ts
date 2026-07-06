import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./app/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Autonomous World palette — semantic tokens, not raw hex in components.
        ink: "#060912",
        surface: "#0D1320",
        "surface-2": "#161F30",
        line: "rgba(255,255,255,0.08)",
        signal: "#2DE2C8",
        ember: "#FF9D5C",
        text: "#EAF0F7",
        muted: "#8794AB",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        // 4→40 type scale, mobile-first.
        "2xs": ["0.75rem", { lineHeight: "1rem" }],
        xs: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.5rem", { lineHeight: "2.75rem" }],
        "5xl": ["3.25rem", { lineHeight: "3.5rem" }],
        "6xl": ["4rem", { lineHeight: "4.25rem" }],
      },
      borderRadius: {
        // Soft-but-not-round; engineered feel.
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "10px",
        xl: "14px",
      },
      maxWidth: {
        content: "72rem",
      },
      transitionTimingFunction: {
        // Natural feel per motion guidelines (spring-ish curve).
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
