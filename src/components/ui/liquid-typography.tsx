"use client";

import React from "react";

interface VandalTypographyProps {
  text?: string;
  className?: string;
}

export function VandalTypography({
  text = "Product Builder",
  className = "",
}: VandalTypographyProps) {
  const words = text.trim().split(/\s+/);

  return (
    <div
      className={`relative select-none pointer-events-none flex flex-col items-center justify-center text-center max-w-[96vw] ${className}`}
    >
      {/* Vandal Rebels Thick Typography in Theme Accent Color */}
      <h1
        className="font-normal select-none pointer-events-none text-center"
        style={{
          fontFamily: "var(--font-vandal), 'Vandal Rebels Thick', sans-serif",
          fontSize: "clamp(2.6rem, 8.5vw, 7.8rem)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          color: "var(--accent, #f04e23)",
          textShadow: "0 16px 45px rgba(0, 0, 0, 0.85), 0 2px 8px rgba(0, 0, 0, 0.6)",
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
export const VelumTypography = VandalTypography;
export const AlienationTypography = VandalTypography;
export const LiquidTypography = VandalTypography;
