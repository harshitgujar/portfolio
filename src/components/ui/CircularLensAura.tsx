"use client";

import React, { useEffect, useRef } from "react";

interface CircularLensAuraProps {
  accentColor?: string;
  groundColor?: string;
  size?: number | string;
  className?: string;
}

export function CircularLensAura({
  accentColor = "#f04e23",
  groundColor = "#2c180f",
  className = "",
}: CircularLensAuraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 35;
      targetY = ((e.clientY / innerHeight) - 0.5) * 25;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      if (el) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none relative flex items-center justify-center ${className}`}
      style={{
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Outer Volumetric Bloom / Aura Glow */}
      <div
        className="absolute inset-0 rounded-full blur-[80px] sm:blur-[110px] opacity-40 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, ${accentColor}35 45%, ${groundColor}00 70%)`,
        }}
      />

      {/* Secondary Ambient Flare */}
      <div
        className="absolute w-[80%] h-[80%] rounded-full blur-[45px] opacity-35 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${accentColor}80 0%, ${accentColor}15 60%, transparent 80%)`,
        }}
      />

      {/* Glassmorphic Disc Body (Simulating optical lens element) */}
      <div
        className="relative w-full h-full rounded-full backdrop-blur-[6px] overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 38% 38%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.3) 100%)`,
        }}
      >
        {/* Luminous Circular Lens Rim Arc */}
        <div
          className="absolute inset-0 rounded-full transition-colors duration-700"
          style={{
            boxShadow: `inset 0 0 28px -2px ${accentColor}50, inset 0 0 4px 1px ${accentColor}80`,
            border: `1.5px solid ${accentColor}55`,
          }}
        />

        {/* Concentric Inner Optical Ring (Mirrors the WebGL lens ring on work page) */}
        <div
          className="absolute inset-[15%] rounded-full border border-white/10 opacity-60 transition-colors duration-700"
          style={{
            borderColor: `${accentColor}30`,
            boxShadow: `0 0 20px -3px ${accentColor}25`,
          }}
        />

        {/* Center Optical Pinpoint */}
        <div
          className="absolute inset-[32%] rounded-full opacity-40 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 48% 48%, ${accentColor}40 0%, transparent 70%)`,
          }}
        />

        {/* Specular Glint Highlight Arc */}
        <div
          className="absolute top-2 left-6 w-[45%] h-[20%] -rotate-12 rounded-full opacity-30 blur-[2px] bg-gradient-to-r from-white/60 via-white/20 to-transparent"
        />
      </div>
    </div>
  );
}
