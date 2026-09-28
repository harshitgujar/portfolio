"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface AboutPosterCardProps {
  className?: string;
  onTap?: () => void;
  hideAmbientGlow?: boolean;
}

export const POSTER_QUOTES = [
  {
    quote: "Understand the user's friction point before reaching for a tool.",
    author: "HARSHIT GUJAR",
  },
  {
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "STEVE JOBS",
  },
  {
    quote: "Simplicity is about subtracting the obvious and adding the meaningful.",
    author: "JOHN MAEDA",
  },
  {
    quote: "Good design is as little design as possible. Less, but better.",
    author: "DIETER RAMS",
  },
  {
    quote: "The details are not the details. They make the design.",
    author: "CHARLES EAMES",
  },
  {
    quote: "It’s very easy to be different, but very difficult to be better.",
    author: "JONY IVE",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "ALAN KAY",
  },
];

export function AboutPosterCard({
  className = "",
  onTap,
  hideAmbientGlow = false,
}: AboutPosterCardProps) {
  const { currentTheme, isLight } = useTheme();
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeQuote = POSTER_QUOTES[quoteIdx];
  const isMonochrome = currentTheme.id === "monochrome";
  const cardBg = isMonochrome ? "#18181b" : currentTheme.previewColor;

  const handleTap = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setQuoteIdx((prev) => (prev + 1) % POSTER_QUOTES.length);
      setIsTransitioning(false);
      onTap?.();
    }, 140);
  };

  return (
    <div className={`relative select-none ${className}`}>
      {/* Outer ambient glow reacting to current theme accent */}
      {!hideAmbientGlow && (
        <div
          className="pointer-events-none absolute -inset-6 rounded-none blur-3xl opacity-35 transition-all duration-700 -z-10"
          style={{
            backgroundColor: isMonochrome
              ? isLight
                ? "rgba(0,0,0,0.45)"
                : "rgba(255,255,255,0.18)"
              : currentTheme.previewColor,
          }}
        />
      )}

      {/* Main Poster Card Container (Sharp Rectangular Editorial Edges, Interactive on Tap/Click) */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Design Quote: "${activeQuote.quote}" by ${activeQuote.author}. Tap to cycle quote.`}
        onClick={handleTap}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTap(e);
          }
        }}
        className={`group relative w-full h-full aspect-[502/804] rounded-none overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_0_50px_-10px_rgba(0,0,0,0.6)] border flex flex-col justify-center p-8 sm:p-10 cursor-pointer pointer-events-auto transition-transform duration-200 active:scale-[0.985] hover:shadow-[0_35px_100px_-15px_rgba(0,0,0,0.9)] outline-none ${
          isMonochrome
            ? "border-white/20 focus-visible:ring-2 focus-visible:ring-white"
            : "border-black/20 focus-visible:ring-2 focus-visible:ring-black"
        }`}
        style={{
          backgroundColor: cardBg,
        }}
      >
        {/* Tactile Risograph / Screenprint Paper Grain Texture Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 z-20 ${
            isMonochrome ? "opacity-20 mix-blend-overlay" : "opacity-30 mix-blend-multiply"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Delicate Hairline Line Art Illustration */}
        <div
          className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${
            isMonochrome ? "opacity-60" : "opacity-75"
          }`}
        >
          <svg
            viewBox="0 0 500 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover scale-[1.05] translate-x-3 translate-y-1"
          >
            <path
              d="M320 180 C370 190 410 240 400 310 C390 380 340 430 260 440 C170 450 70 380 60 280 C50 200 120 150 200 150 C260 150 300 180 320 220"
              stroke={isMonochrome ? "#ffffff" : "#0a0a0c"}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M260 440 C280 470 310 510 325 560 C332 585 348 595 365 590"
              stroke={isMonochrome ? "#ffffff" : "#0a0a0c"}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M10 390 C60 360 140 345 220 365 C280 380 320 420 330 460"
              stroke={isMonochrome ? "#ffffff" : "#0a0a0c"}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Pure Minimalist Quote & Author */}
        <div className="relative z-30 max-w-full space-y-4 px-1 sm:px-2">
          <p
            className={`font-[family-name:var(--font-instrument-serif)] italic text-2xl sm:text-3xl md:text-[34px] leading-[1.2] sm:leading-[1.15] tracking-tight font-normal transition-all duration-150 ${
              isMonochrome ? "text-white" : "text-[#0a0a0c]"
            } ${
              isTransitioning
                ? "opacity-0 translate-y-2 scale-[0.98]"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            &ldquo;{activeQuote.quote}&rdquo;
          </p>

          <div
            className={`transition-all duration-150 ${
              isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
            }`}
          >
            <span
              className={`font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] font-semibold block ${
                isMonochrome ? "text-white/80" : "text-[#0a0a0c]/80"
              }`}
            >
              &mdash; {activeQuote.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
