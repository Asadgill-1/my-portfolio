import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
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
  themeColor: "#060912",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
