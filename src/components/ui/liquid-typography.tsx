"use client";

import React from "react";

interface VelumTypographyProps {
  text?: string;
  className?: string;
}

export function VelumTypography({
  text = "Product Builder",
  className = "",
}: VelumTypographyProps) {
  const words = text.trim().split(/\s+/);

  return (
    <div
      className={`relative select-none pointer-events-none flex flex-col items-center justify-center text-center max-w-[96vw] ${className}`}
    >
      {/* Soft Ambient Warm Glow Behind Letters */}
      <div
        className="absolute pointer-events-none w-[125%] h-[125%] -z-10 rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(240, 78, 35, 0.35) 0%, rgba(255, 186, 92, 0.12) 45%, transparent 70%)",
        }}
      />

      {/* Clean, Massive Velum Stroke Typography */}
      <h1
        className="font-normal tracking-wider select-none pointer-events-none text-center"
        style={{
          fontFamily: "var(--font-velum), 'Velum Stroke', sans-serif",
          fontSize: "clamp(3.2rem, 10.5vw, 9.2rem)",
          lineHeight: 0.92,
          letterSpacing: "0.03em",
          color: "#f2e7de",
          textShadow:
            "0 20px 50px rgba(0, 0, 0, 0.85), 0 4px 14px rgba(0, 0, 0, 0.6), 0 0 35px rgba(240, 78, 35, 0.2)",
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-1">
          {words.map((word, idx) => (
            <span key={idx} className="inline-block whitespace-nowrap">
              {word}
            </span>
          ))}
        </div>
      </h1>
    </div>
  );
}

// Backwards compatibility aliases
export const AlienationTypography = VelumTypography;
export const LiquidTypography = VelumTypography;
