import type { Metadata } from "next";
import { Instrument_Serif, Inter, Syne, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SiteHeader } from "@/components/ui/site-header";

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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const alienation = localFont({
  src: [
    {
      path: "../../public/fonts/alienation.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/alienation-outline.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-alienation",
  display: "swap",
});

const velumStroke = localFont({
  src: "../../public/fonts/VelumStroke-Regular.ttf",
  variable: "--font-velum",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harshit Gujar — Product Designer & UI/UX | Founding Designer @ STRON",
  description:
    "Portfolio of Harshit Gujar — Product Designer (Founder's Office @ STRON) & Founder at Arken Creatives. Designing 0→1 products, high-speed platforms, and scalable design systems.",
  keywords: [
    "Harshit Gujar",
    "Product Designer",
    "UI/UX Designer",
    "STRON",
    "Founding Designer",
    "Founder's Office",
    "Arken Creatives",
    "Design Systems",
    "VIT Bhopal",
    "Bhopal",
    "Data Science",
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
      className={`${instrumentSerif.variable} ${inter.variable} ${spaceGrotesk.variable} ${syne.variable} ${alienation.variable} ${velumStroke.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--ground)] text-[var(--ink)] selection:bg-[var(--accent)] selection:text-white transition-colors duration-500">
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
