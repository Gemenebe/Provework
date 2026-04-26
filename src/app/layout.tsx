import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProveWork — The Open Talent Protocol",
  description:
    "An evidence-cited credential layer for the global workforce. Reads what people have built and emits a verifiable talent passport. No CV. No claims without receipts.",
  openGraph: {
    title: "ProveWork — The Open Talent Protocol",
    description: "Evidence-cited talent passports for the global workforce.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
