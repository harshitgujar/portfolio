"use client";

import React from "react";

interface AlienationTypographyProps {
  text?: string;
  className?: string;
}

export function AlienationTypography({
  text = "Product Builder",
  className = "",
}: AlienationTypographyProps) {
  const words = text.trim().split(/\s+/);

  return (
    <div
      className={`relative select-none pointer-events-none flex flex-col items-center justify-center text-center ${className}`}
    >
      {/* Soft Ambient Warm Glow Behind Letters */}
      <div
        className="absolute pointer-events-none w-[120%] h-[120%] -z-10 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(240, 78, 35, 0.35) 0%, rgba(255, 186, 92, 0.12) 45%, transparent 70%)",
        }}
      />

      {/* Clean, Massive Alienation Typography (Zero liquid distortion) */}
      <h1
        className="font-normal uppercase tracking-wide select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-alienation), 'Alienation', sans-serif",
          fontSize: "clamp(3.2rem, 11.5vw, 10.5rem)",
          lineHeight: 0.85,
          letterSpacing: "0.02em",
          color: "#f2e7de",
          textShadow:
            "0 24px 60px rgba(0, 0, 0, 0.85), 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(240, 78, 35, 0.15)",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          {words.map((word, idx) => (
            <span key={idx} className="block whitespace-nowrap">
              {word}
            </span>
          ))}
        </div>
      </h1>
    </div>
  );
}

// Retain backwards compatibility export
export const LiquidTypography = AlienationTypography;
