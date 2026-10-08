import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kzngames.com"),
  title: {
    default: "KZN Games — Where Childhood Nostalgia Meets Next-Gen Mobile Play",
    template: "%s · KZN Games",
  },
  description:
    "KZN Games crafts hybrid-casual experiences and immersive AR worlds, powered by real-time adaptive AI systems to bring back the magic of classic gaming.",
  keywords: ["KZN Games", "mobile games", "hybrid-casual", "augmented reality", "AR games", "AI games", "game studio"],
  openGraph: {
    type: "website",
    url: "https://kzngames.com",
    siteName: "KZN Games",
    title: "KZN Games — Retro Soul, Next-Gen Tech",
    description: "Hybrid-casual and AR mobile games powered by real-time adaptive AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KZN Games — Retro Soul, Next-Gen Tech",
    description: "Hybrid-casual and AR mobile games powered by real-time adaptive AI.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#08080c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${pixel.variable}`}>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
