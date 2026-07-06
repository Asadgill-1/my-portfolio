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
        // Autonomous World — "Operator's Console".
        // Warm indigo-midnight (NOT pure black) + warm bone text + saffron accent.
        // Deliberately not the cyan/acid-green-on-black AI default.
        ink: "#0E0B1A",
        surface: "#161128",
        "surface-2": "#1F1838",
        bone: "#ECE4D6",
        muted: "#9B92AE",
        saffron: "#F5A524",
        cobalt: "#818CF8",
        line: "rgba(236, 228, 214, 0.10)",
      },
      fontFamily: {
        // Fraunces = characterful variable soft-serif display (the editorial break).
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter-tight)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.75rem", { lineHeight: "1rem" }],
        xs: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.5rem", { lineHeight: "2.75rem" }],
        "5xl": ["3.25rem", { lineHeight: "3.5rem" }],
        "6xl": ["4rem", { lineHeight: "4.25rem" }],
        "7xl": ["5rem", { lineHeight: "5rem" }],
        "8xl": ["6.5rem", { lineHeight: "6.5rem" }],
      },
      borderRadius: {
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
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.15)" },
        },
        "boot-in": {
          from: { opacity: "0", filter: "blur(8px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-in-out infinite",
        "boot-in": "boot-in 1.2s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
