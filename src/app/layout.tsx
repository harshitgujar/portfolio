import type { Metadata } from "next";
import {
  geistSans,
  geistMono,
  syne,
  playfair,
  spaceGrotesk,
  jetbrainsMono,
  cinzel,
} from "./fonts";
import "./globals.css";

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
