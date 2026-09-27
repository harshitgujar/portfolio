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
      {/* Soft Ambient Warm Orange Glow Behind Letters */}
      <div
        className="absolute pointer-events-none w-[130%] h-[130%] -z-10 rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(240, 78, 35, 0.45) 0%, rgba(255, 110, 40, 0.18) 45%, transparent 70%)",
        }}
      />

      {/* Clean, Slightly Decreased Velum Stroke Typography in Vibrant Orange */}
      <h1
        className="font-normal tracking-wider select-none pointer-events-none text-center"
        style={{
          fontFamily: "var(--font-velum), 'Velum Stroke', sans-serif",
          fontSize: "clamp(2.4rem, 8vw, 7.2rem)",
          lineHeight: 0.92,
          letterSpacing: "0.03em",
          color: "#f04e23",
          textShadow:
            "0 20px 50px rgba(0, 0, 0, 0.9), 0 0 45px rgba(240, 78, 35, 0.45), 0 0 15px rgba(255, 110, 40, 0.3)",
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7 gap-y-1">
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
