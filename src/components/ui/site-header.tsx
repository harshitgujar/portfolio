"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-nav";
import { useTheme } from "@/context/ThemeContext";

export function SiteHeader() {
  const pathname = usePathname();
  const { extrasExperiment, setExtrasExperiment, isLight } = useTheme();

  const isCDPage = pathname === "/cd" || pathname.startsWith("/cd/");
  const isLiquidPage = pathname === "/liquid" || pathname.startsWith("/liquid/");
  const isExtrasSubpage =
    (pathname === "/extras" || pathname === "/gallery" || pathname.startsWith("/extras/")) &&
    Boolean(extrasExperiment);

  const handleBackToPlayground = () => {
    setExtrasExperiment(null);
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(null, "", "/extras");
    }
  };

  // If on studio pages (/cd, /liquid): they render their own unified studio header
  if (isCDPage || isLiquidPage) {
    return null;
  }

  // If inside CD experiment in /extras: show only Back button
  if (extrasExperiment === "cd") {
    return (
      <header className="chrome chrome--top w-full z-50 pointer-events-none flex items-center justify-between">
        <button
          type="button"
          onClick={handleBackToPlayground}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-[family-name:var(--font-space-grotesk)] text-xs font-medium backdrop-blur-xl border border-white/10 bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-all duration-150 active:scale-[0.98]"
          title="Back"
          aria-label="Back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </header>
    );
  }

  return (
    <header className="chrome chrome--top w-full z-50">
      {/* Brand Wordmark OR Back to Playground Button on subpages of extra */}
      {isExtrasSubpage ? (
        <button
          type="button"
          onClick={handleBackToPlayground}
          className={`pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-[family-name:var(--font-space-grotesk)] text-xs font-medium backdrop-blur-xl border transition-all duration-150 active:scale-[0.98] ${
            isLight && extrasExperiment === "gallery"
              ? "bg-white/80 border-black/10 text-neutral-800 hover:text-black hover:bg-white"
              : "bg-black/60 border-white/10 text-white/80 hover:text-white hover:bg-black/80"
          }`}
          title="Back"
          aria-label="Back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
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
