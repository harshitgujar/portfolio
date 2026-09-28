"use client";

import React, { useState, useEffect, useRef } from "react";
import { AboutPosterCard } from "./about-poster-card";
import { useTheme } from "@/context/ThemeContext";

interface AboutHeroStackProps {
  onScrollDown?: () => void;
}

export function AboutHeroStack({ onScrollDown }: AboutHeroStackProps) {
  const { currentTheme, isLight } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(true);

  // Auto-reveal the first card with bottom-up unmasking animation on page open
  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 120);

    const transitionTimer = setTimeout(() => {
      setIsRevealing(false);
    }, 1450);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(transitionTimer);
    };
  }, []);

  // If user scrolls during the entrance phase, instantly release transition so scroll inertia is 100% direct
  useEffect(() => {
    if (progress > 0.01 && isRevealing) {
      setIsRevealed(true);
      setIsRevealing(false);
    }
  }, [progress, isRevealing]);

  useEffect(() => {
    let current = 0;
    let target = 0;
    let rafId: number;

    const updateTarget = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = trackRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = trackHeight - windowHeight;

      if (totalScrollable <= 0) return;

      // Distance scrolled into the sticky track
      const scrolled = -rect.top;
      // Complete all choreographed phases over the first 75% of the scroll track
      target = Math.min(Math.max(scrolled / (totalScrollable * 0.75), 0), 1);
    };

    // Smooth physical inertia loop (0.042 damping gives deeper, weighted physical inertia)
    const animate = () => {
      const delta = target - current;
      if (Math.abs(delta) > 0.00005) {
        current += delta * 0.042;
        setProgress(current);
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    updateTarget();
    current = target;
    setProgress(target);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- CHOREOGRAPHY WITH PHYSICAL INERTIA ---
  // 1. Below Accent Card: Starts shrinking on first scroll (progress 0.0 -> 0.38) with smooth ease
  const shrinkProgress = Math.min(progress / 0.38, 1);
  const belowCardScale = 1 - shrinkProgress * 0.25; // 1.0 -> 0.75
  const belowCardOpacity = Math.max(1 - shrinkProgress * 0.25, 0.75);

  // 2. Second Image / Portrait: Starts revealing IN THE MIDDLE OF SHRINKING (at progress = 0.18)
  const stage2Progress = Math.min(Math.max((progress - 0.18) / 0.68, 0), 1);

  // Top Image / Portrait:
  // Rendered in the BIGGER size (scale: 1.16 -> 1.20, noticeably larger than the below card)
  const portraitScale = 1.16 + stage2Progress * 0.04;
  // Revealed from the bottom upward (de-crops from 100% down to 0%)
  const cropTop = Math.max((1 - stage2Progress) * 100, 0); // 100% -> 0%
  const portraitOpacity = stage2Progress > 0.005 ? 1 : 0;

  return (
    <section
      ref={trackRef}
      className="relative w-full h-[280vh] select-none"
    >
      {/* Sticky Viewport Stage: Pinned in viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 z-20">
        {/* Layered Composition Anchor: Shared aspect ratio frame with sharp editorial edges */}
        <div className="relative w-[min(370px,80vw)] aspect-[502/804] max-h-[64vh] flex items-center justify-center">
          {/* Below Card: Ambient Glow + Accent Card that Auto-Reveals on page open & SHRINKS on scroll */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center will-change-transform rounded-none pointer-events-auto"
            style={{
              transform: `scale(${belowCardScale})`,
              opacity: belowCardOpacity,
              filter: `blur(${stage2Progress * 2}px)`,
              pointerEvents: progress > 0.25 ? "none" : "auto",
            }}
          >
            {/* Outer ambient glow reacting to current theme accent, blooming in with the reveal */}
            <div
              className="pointer-events-none absolute -inset-6 rounded-none blur-3xl -z-10 transition-opacity duration-1000"
              style={{
                opacity: isRevealed ? (isLight ? 0.2 : 0.35) : 0,
                backgroundColor:
                  currentTheme.id === "monochrome"
                    ? isLight
                      ? "rgba(0,0,0,0.45)"
                      : "rgba(255,255,255,0.18)"
                    : currentTheme.previewColor,
              }}
            />

            {/* Auto-Revealing Card Container (Bottom-up unmasking sweep mirroring the second card) */}
            <div
              className="w-full h-full will-change-transform rounded-none"
              style={{
                clipPath: isRevealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                transform: isRevealed ? "scale(1)" : "scale(1.06)",
                opacity: isRevealed ? 1 : 0,
                filter: isRevealed
                  ? "drop-shadow(0 25px 60px rgba(0,0,0,0.85))"
                  : "drop-shadow(0 30px 80px rgba(0,0,0,0.95))",
                transition: isRevealing
                  ? "clip-path 1.25s cubic-bezier(0.16, 1, 0.3, 1), transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out, filter 1.25s ease-out"
                  : "none",
              }}
            >
              <AboutPosterCard className="w-full h-full" hideAmbientGlow />
            </div>
          </div>

          {/* Top Image: Full Portrait in BIGGER size that reveals in the middle of shrinking from bottom,
              then covers the whole below card as you continue scrolling (zero roundness, driven by physical inertia) */}
          <div
            className="absolute inset-0 z-20 will-change-transform pointer-events-none rounded-none"
            style={{
              transform: `scale(${portraitScale})`,
              opacity: portraitOpacity,
              clipPath: `inset(${cropTop}% 0% 0% 0%)`,
              filter: "drop-shadow(0 25px 60px rgba(0,0,0,0.95))",
            }}
          >
            <div className="w-full h-full rounded-none overflow-hidden border border-white/10 relative bg-black shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/harshit-portrait.png"
                alt="Harshit Gujar - Product Designer & Founding Designer @ STRON"
                className="w-full h-full object-cover object-center block"
                loading="eager"
              />

              {/* Gradient 1: Deep bottom cinematic shadow melt */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Gradient 2: Top subtle atmospheric vignette */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

              {/* Gradient 3: Outer edge depth vignette */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]" />

              {/* Gradient 4: Subtle ambient theme aura interacting with the streetlight */}
              <div
                className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 rounded-full blur-3xl opacity-25 mix-blend-screen transition-all duration-700"
                style={{ backgroundColor: currentTheme.previewColor }}
              />

              {/* Tactile Risograph / 35mm Analog Film Grain Overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />
            </div>
          </div>
        </div>

        {/* Pure Minimalist Instruction Text Below Card (No containers or pills, non-clickable) */}
        <div
          className={`mt-4 sm:mt-5 flex items-center justify-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] pointer-events-none select-none z-30 transition-all duration-500 ${
            isLight ? "text-neutral-500" : "text-white/50"
          }`}
          style={{
            opacity: isRevealed ? Math.max(0, 1 - progress * 3) : 0,
            transform: `translateY(${progress * 12}px)`,
            transitionDelay: isRevealed && isRevealing ? "700ms" : "0ms",
          }}
        >
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: currentTheme.previewColor }}
            />
            <span>Tap card to interact</span>
          </span>
          <span className="opacity-40">&bull;</span>
          <span className="flex items-center gap-1">
            <span>Scroll to see more</span>
            <span className="text-[10px] leading-none">&darr;</span>
          </span>
        </div>

        {/* Persistent Scroll Progress Hint at Viewport Bottom (Visible when scrolled) */}
        <button
          type="button"
          onClick={onScrollDown}
          className="absolute bottom-6 sm:bottom-8 z-30 group flex flex-col items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/80 transition-all duration-300 focus:outline-none cursor-pointer"
          style={{
            opacity: progress > 0.15 ? 1 : 0,
            pointerEvents: progress > 0.15 ? "auto" : "none",
          }}
          aria-label="Scroll to read bio and journey"
        >
          <span>
            {progress < 0.8
              ? "Scroll to unmask portrait ↓"
              : "Scroll to explore journey ↓"}
          </span>
          <span className="text-xs transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}
