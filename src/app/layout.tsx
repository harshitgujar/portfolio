import type { Metadata } from "next";
import { Instrument_Serif, Inter, Syne } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

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
  title: "Harshit Gujar — Product Builder & Engineer",
  description:
    "Interactive Diagonal Carousel Portfolio of Harshit Gujar — Product Builder, Full-Stack & Mobile Engineer.",
  keywords: [
    "Harshit Gujar",
    "Product Builder",
    "Software Engineer",
    "Full-Stack Developer",
    "React Native",
    "Next.js",
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
      className={`${instrumentSerif.variable} ${inter.variable} ${syne.variable} ${alienation.variable} ${velumStroke.variable} dark antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#2c180f] text-[#f2e7de] selection:bg-[#f04e23] selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
