"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import { WorkLensCanvas } from "@/components/ui/work-lens-canvas";

interface ExtrasIntroProps {
  progress?: MotionValue<number>;
  smoothProgress?: MotionValue<number>;
  isHubActive?: boolean;
}

export function ExtrasIntro({
  progress,
  smoothProgress,
  isHubActive = false,
}: ExtrasIntroProps) {
  const { currentTheme, isLight } = useTheme();
  const [isIntroHidden, setIsIntroHidden] = useState(false);

  const fallbackProgress = useMotionValue(0);
  const activeProgress = progress || fallbackProgress;
  const activeSmooth = smoothProgress || fallbackProgress;

  // Sync hiding when fully scrolled off screen to optimize paint and accessibility
  useMotionValueEvent(activeSmooth, "change", (latest) => {
    if (latest >= 0.999 && !isIntroHidden) {
      setIsIntroHidden(true);
    } else if (latest < 0.999 && isIntroHidden) {
      setIsIntroHidden(false);
    }
  });

  // Physical continuous scroll controller when intro statement is active
  useEffect(() => {
    if (isHubActive) return;

    let touchStartY = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const checkIdleSnap = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        const current = activeProgress.get();
        // If scrolled past 82%, gently complete the transition
        if (current > 0.82 && current < 1) {
          activeProgress.set(1);
        } else if (current < 0.12 && current > 0) {
          activeProgress.set(0);
        }
      }, 300);
    };

    // 1. Mouse wheel / Trackpad continuous scroll
    const handleWheel = (e: WheelEvent) => {
      // Deliberate, slow scroll travel distance (~700px required for full transition)
      const TRAVEL_PX = 700;
      const current = activeProgress.get();
      const next = Math.max(0, Math.min(1, current + e.deltaY / TRAVEL_PX));
      activeProgress.set(next);

      if (next >= 0.94) {
        activeProgress.set(1);
      } else {
        checkIdleSnap();
      }
    };

    // 2. Touch dragging / swiping (1:1 finger tracking)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        const current = activeProgress.get();
        const next = Math.max(0, Math.min(1, current + deltaY / 550));
        activeProgress.set(next);

        if (next >= 0.94) {
          activeProgress.set(1);
        } else {
          checkIdleSnap();
        }
      }
    };

    // 3. Keyboard navigation (Arrow keys, PageDown/PageUp, Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      const current = activeProgress.get();
      if (e.key === "ArrowDown") {
        activeProgress.set(Math.min(1, current + 0.16));
      } else if (e.key === "PageDown" || e.key === " ") {
        activeProgress.set(Math.min(1, current + 0.35));
      } else if (e.key === "ArrowUp") {
        activeProgress.set(Math.max(0, current - 0.16));
      } else if (e.key === "PageUp") {
        activeProgress.set(Math.max(0, current - 0.35));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [isHubActive, activeProgress]);

  // Dynamic transforms driven by spring progress
  const introY = useTransform(activeSmooth, [0, 1], ["0%", "-115%"]);
  const introOpacity = useTransform(activeSmooth, [0, 0.75, 1], [1, 0.35, 0]);
  const introBlur = useTransform(activeSmooth, (v) => `blur(${v * 16}px)`);
  const introScale = useTransform(activeSmooth, [0, 1], [1, 0.95]);

  const isMonochrome = currentTheme.id === "monochrome";
  const accentColor = isMonochrome
    ? isLight
      ? "#18181b"
      : "#ffffff"
    : isLight
      ? currentTheme.lightPreviewColor || currentTheme.previewColor
      : currentTheme.previewColor;

  const introBgColor = isLight ? currentTheme.groundColor : "#000000";

  return (
    <motion.div
      key="extras-intro-overlay"
      style={{
        y: introY,
        opacity: introOpacity,
        filter: introBlur,
        scale: introScale,
        pointerEvents: isHubActive ? "none" : "auto",
        visibility: isIntroHidden ? "hidden" : "visible",
        backgroundColor: introBgColor,
        color: isLight ? "var(--ink)" : "#ffffff",
      }}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center px-4 sm:px-8 select-none outline-none overflow-hidden transition-colors duration-500 ${
        isLight ? "" : "bg-black"
      }`}
    >
      {/* 1. Real Three.js WebGL Work-Page Lens Canvas with dynamic light/dark mode support */}
      <WorkLensCanvas
        tintColor={accentColor}
        backgroundColor={introBgColor}
        isLight={isLight}
        rotation={45}
        sizeX={0.46}
        sizeY={0.82}
        glow={isLight ? 3.6 : 4.6}
        className="z-0"
      />

      {/* Tactile 35mm Analog Film Grain Overlay */}
      <div
        className={`pointer-events-none absolute inset-0 z-[5] transition-opacity duration-500 ${
          isLight
            ? "opacity-5 mix-blend-multiply"
            : "opacity-15 mix-blend-overlay"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ======================================================== */}
      {/* 2. Text Content - Sits Exactly Centered Inside the Lens  */}
      {/* ======================================================== */}
      <div className="relative z-10 max-w-[580px] sm:max-w-[660px] w-full flex flex-col items-center justify-center space-y-4 sm:space-y-5 px-4 text-center pointer-events-none">
        {/* Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex items-center justify-center gap-2.5"
        >
          <span
            className="w-2 h-2 rounded-full inline-block animate-pulse shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: accentColor, color: accentColor }}
          />
          <span
            className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
              isLight ? "text-neutral-500 font-medium" : "text-white/60"
            }`}
          >
            IN SUPPORT OF THE DESIGN COMMUNITY &bull; OPEN COMMONS
          </span>
        </motion.div>

        {/* Hero Statement Display */}
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={`font-[family-name:var(--font-instrument-serif)] text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-normal leading-[1.2] sm:leading-[1.16] tracking-tight transition-colors duration-300 ${
            isLight
              ? "text-neutral-900"
              : "text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]"
          }`}
        >
          &ldquo;Great craft flourishes when shared. A collective space built for the design community &mdash; to showcase tools, discover rare resources, and build together.&rdquo;
        </motion.h1>

        {/* Subtitle / Context signoff */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className={`font-[family-name:var(--font-space-grotesk)] text-xs sm:text-sm font-medium tracking-normal max-w-md transition-colors duration-300 ${
            isLight
              ? "text-neutral-600"
              : "text-neutral-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
          }`}
        >
          Share your software, shaders, and creative tools &bull; or explore what others have made.
        </motion.p>
      </div>

      {/* Persistent Scroll Prompt Indicator at Bottom (Positioned cleanly above footer) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="absolute bottom-20 sm:bottom-24 z-20 flex flex-col items-center gap-1.5 pointer-events-none select-none"
      >
        <div
          className="flex flex-col items-center gap-2 select-none"
          aria-label="Scroll to enter"
        >
          <span
            className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
              isLight ? "text-neutral-500 font-medium" : "text-white/50"
            }`}
          >
            Scroll to enter
          </span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className={`text-sm leading-none transition-colors duration-300 ${
              isLight ? "text-neutral-700" : "text-white/70"
            }`}
          >
            &darr;
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
