import type { Metadata } from "next";
import "./globals.css";
import {
  Source_Sans_3,
  Lexend,
  Atkinson_Hyperlegible,
  Source_Serif_4,
  JetBrains_Mono,
} from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});
const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-atkinson",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Content Viewer",
  description: "Simple markdown content viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-font="sourceSans">
      <body
        className={`${sourceSans.variable} ${lexend.variable} ${atkinson.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
