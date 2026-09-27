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
      {/* Clean, Crisp Velum Stroke Typography in Theme Accent Color */}
      <h1
        className="font-normal tracking-wider select-none pointer-events-none text-center"
        style={{
          fontFamily: "var(--font-velum), 'Velum Stroke', sans-serif",
          fontSize: "clamp(2.4rem, 8vw, 7.2rem)",
          lineHeight: 0.92,
          letterSpacing: "0.03em",
          color: "var(--accent, #f04e23)",
          textShadow: "0 14px 40px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.5)",
          transition: "color 0.4s ease",
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
