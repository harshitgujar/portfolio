"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-nav";
import { useTheme } from "@/context/ThemeContext";

export function SiteHeader() {
  const pathname = usePathname();
  const { extrasExperiment, setExtrasExperiment, isLight, activeCaseStudy } = useTheme();

  const isCDPage = pathname === "/cd" || pathname.startsWith("/cd/");
  const isLiquidPage = pathname === "/liquid" || pathname.startsWith("/liquid/");
  const isEvoraPage = pathname === "/evora" || pathname.startsWith("/evora/");
  const isArkenPage = pathname === "/arken" || pathname.startsWith("/arken/");
  const isRunagonPage = pathname === "/runagon" || pathname.startsWith("/runagon/");
  const isSpotifyPage = pathname === "/spotify" || pathname.startsWith("/spotify/");
  const isStronPage = pathname === "/stron" || pathname.startsWith("/stron/");
  const isClockPage = pathname === "/clock" || pathname.startsWith("/clock/");
  const isExtrasSubpage =
    (pathname === "/extras" || pathname === "/gallery" || pathname.startsWith("/extras/")) &&
    Boolean(extrasExperiment);

  const handleBackToPlayground = () => {
    setExtrasExperiment(null);
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(null, "", "/extras");
    }
  };

  // If on studio / case-study pages (/cd, /liquid, /evora, /arken, /runagon, /spotify, /clock), active case study modal, or CD experiment in /extras: they render their own unified header
  if (
    isCDPage ||
    isLiquidPage ||
    isEvoraPage ||
    isArkenPage ||
    isRunagonPage ||
    isSpotifyPage ||
    isStronPage ||
    isClockPage ||
    Boolean(activeCaseStudy) ||
    extrasExperiment === "cd"
  ) {
    return null;
  }

  return (
    <header className="chrome chrome--top w-full z-50">
      {/* Brand Wordmark OR Back to Playground Button on subpages of extra */}
      {isExtrasSubpage ? (
        <button
          type="button"
          onClick={handleBackToPlayground}
          className={`pointer-events-auto inline-flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] transition-colors group px-3 py-1.5 -ml-3 rounded-lg cursor-pointer ${
            isLight && extrasExperiment === "gallery"
              ? "text-neutral-600 hover:text-black hover:bg-black/[0.05]"
              : "text-white/70 hover:text-white hover:bg-white/[0.05]"
          }`}
          title="back"
          aria-label="back"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>back</span>
        </button>
      ) : (
        <Link
          href="/"
          className="wordmark pointer-events-auto"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textDecoration: "none",
          }}
          aria-label="Harshit Gujar - Home"
        >
          harshit gujar
        </Link>
      )}

      {/* Floating Pill Nav Bar with Moving Spring Pill */}
      <FloatingNav />
    </header>
  );
}
