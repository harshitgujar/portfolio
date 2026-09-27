import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Harshit Gujar — Portfolio",
  description:
    "Interactive Diagonal Carousel Portfolio of Harshit Gujar — Full-Stack & Mobile Engineer.",
  keywords: [
    "Harshit Gujar",
    "Software Engineer",
    "Full-Stack Developer",
    "React Native",
    "Next.js",
    "Mobile Developer",
    "Portfolio",
    "Diagonal Carousel",
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
      className={`${instrumentSerif.variable} ${inter.variable} dark antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#2c180f] text-[#f2e7de] selection:bg-[#f04e23] selection:text-white">
        {children}
      </body>
    </html>
  );
}
