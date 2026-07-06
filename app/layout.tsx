import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fraunces — characterful variable soft-serif. The "wonky" high-contrast
// display face is the editorial break from the engineered-sans AI default.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const SITE_URL = "https://autonomous-world.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Autonomous World — Automations & Websites for Business",
    template: "%s · Autonomous World",
  },
  description:
    "Autonomous World builds automations and websites that run themselves — so your business keeps moving while you sleep.",
  keywords: [
    "business automation",
    "workflow automation",
    "custom websites",
    "integrations",
    "Autonomous World",
  ],
  authors: [{ name: "Autonomous World" }],
  openGraph: {
    title: "Autonomous World — Automations & Websites for Business",
    description:
      "Automations and websites that run themselves. Built for businesses that move.",
    url: SITE_URL,
    siteName: "Autonomous World",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous World",
    description:
      "Automations and websites that run themselves. Built for businesses that move.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E0B1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
