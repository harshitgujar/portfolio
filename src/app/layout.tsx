import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshit Gujar — Full-Stack & Mobile Engineer",
  description:
    "Portfolio of Harshit Gujar. Crafting high-performance React Native apps, scalable cloud backends, and fluid interactive web experiences.",
  keywords: [
    "Harshit Gujar",
    "Software Engineer",
    "Full-Stack Developer",
    "React Native",
    "Next.js",
    "Mobile Developer",
    "Portfolio",
  ],
  authors: [{ name: "Harshit Gujar" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#08090f] text-[#f3f4f6] selection:bg-[#3b5284] selection:text-white">
        {children}
      </body>
    </html>
  );
}
