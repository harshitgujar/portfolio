import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Syne,
  Playfair_Display,
  Space_Grotesk,
  JetBrains_Mono,
  Cinzel,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Harshit Gujar — Full-Stack & Mobile Engineer",
  description:
    "Portfolio of Harshit Gujar. Crafting high-performance React Native apps, scalable cloud backends, and fluid interactive web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${playfair.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cinzel.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#08090f] text-[#f3f4f6] selection:bg-[#3b5284] selection:text-white">
        {children}
      </body>
    </html>
  );
}
