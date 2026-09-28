"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import { THEMES } from "@/data/themes";
import { FisheyeInfiniteGrid } from "@/components/ui/fisheye-infinite-grid";
import { MusicLibraryScroll } from "@/components/ui/music-library-scroll";
import { PlaygroundHub } from "@/components/sections/PlaygroundHub";
import { ExtrasIntro } from "@/components/ui/extras-intro";

export default function ExtrasPage() {
  const {
    currentTheme,
    selectedThemeId,
    setSelectedThemeId,
    colorMode,
    toggleColorMode,
    isLight,
    extrasExperiment,
    setExtrasExperiment,
  } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  // Determine initial progress: 1 if direct subpage/hash, 0 for fresh extras landing
  const initialProgress = (() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const search = window.location.search;
      if (
        hash === "gallery" ||
        search.includes("exp=gallery") ||
        hash === "music" ||
        search.includes("exp=music")
      ) {
        return 1;
      }
    }
    return 0;
  })();

  const progress = useMotionValue(initialProgress);
  const smoothProgress = useSpring(progress, {
    damping: 28,
    stiffness: 110,
    mass: 0.9,
  });

  const [isHubActive, setIsHubActive] = useState(initialProgress === 1);
  const hubScrollRef = useRef<HTMLDivElement | null>(null);

  // Monitor spring progress to toggle hub interaction state
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.98 && !isHubActive) {
      setIsHubActive(true);
    } else if (latest < 0.98 && isHubActive) {
      setIsHubActive(false);
    }
  });

  // Re-appear intro statement when user scrolls harder from down to up at the top
  const handleHardScrollUp = useCallback(() => {
    if (extrasExperiment) return;
    if (hubScrollRef.current) {
      hubScrollRef.current.scrollTop = 0;
    }
    progress.set(0);
  }, [extrasExperiment, progress]);

  // Read initial view from hash or search param
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const search = window.location.search;
      if (hash === "gallery" || search.includes("exp=gallery")) {
        setExtrasExperiment("gallery");
        progress.set(1);
      } else if (hash === "music" || search.includes("exp=music")) {
        setExtrasExperiment("music");
        progress.set(1);
      }
    }
  }, [setExtrasExperiment, progress]);

  const handleSelectExperiment = (id: string) => {
    setExtrasExperiment(id);
    progress.set(1);
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  // Coordinated transforms for playground hub underneath
  const hubY = useTransform(smoothProgress, [0, 1], [50, 0]);
  const hubOpacity = useTransform(smoothProgress, [0, 0.45, 1], [0, 0.4, 1]);
  const hubBlur = useTransform(smoothProgress, (v) => `blur(${(1 - v) * 8}px)`);
  const hubScale = useTransform(smoothProgress, [0, 1], [0.975, 1]);

  const footerOpacity = useTransform(smoothProgress, [0.65, 1], [0, 1]);

  return (
    <main
      className="relative h-screen w-full overflow-hidden select-none transition-colors duration-500"
      style={{
        ...currentTheme.vars,
        backgroundColor:
          extrasExperiment === "music"
            ? "transparent"
            : currentTheme.groundColor,
        color: "var(--ink)",
      }}
    >
      {/* 0. Opening Statement in Support of the Design Community (Scroll-driven) */}
      {!extrasExperiment && (
        <ExtrasIntro
          progress={progress}
          smoothProgress={smoothProgress}
          isHubActive={isHubActive}
        />
      )}

      {/* 1. Playground Hub Index Screen (Reveals progressively with scroll) */}
      {!extrasExperiment && (
        <motion.div
          key="playground-hub-content"
          style={{
            y: hubY,
            opacity: hubOpacity,
            filter: hubBlur,
            scale: hubScale,
          }}
          className="h-full w-full"
        >
          <PlaygroundHub
            scrollContainerRef={hubScrollRef}
            onHardScrollUp={handleHardScrollUp}
            isInteractive={isHubActive}
            onSelectExperiment={handleSelectExperiment}
            className="h-full"
          />
        </motion.div>
      )}

      {/* 2. Interactive Experiment: Infinite 3D Gallery */}
      {extrasExperiment === "gallery" && (
        <>
          <div className="absolute inset-0 w-full h-full">
            <FisheyeInfiniteGrid
              tileWidth={280}
              tileHeight={320}
              gap={18}
              lensStrength={0.28}
              theme={colorMode}
              hoverNudge={20}
              inertia={0.94}
              wheelSensitivity={0.45}
              enableWheel={true}
              className="h-full w-full"
            />
          </div>

          {/* Vignettes for Chrome Readability */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 z-30 h-28 transition-all duration-500 ${
              isLight
                ? "bg-gradient-to-b from-white/80 via-white/30 to-transparent"
                : "bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/40 to-transparent"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 h-28 transition-all duration-500 ${
              isLight
                ? "bg-gradient-to-t from-white/80 via-white/30 to-transparent"
                : "bg-gradient-to-t from-[#08080a]/90 via-[#08080a]/40 to-transparent"
            }`}
          />

          {/* Center-Bottom Interaction Prompt */}
          <div
            className={`pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-[family-name:var(--font-space-grotesk)] text-xs tracking-normal backdrop-blur-md border transition-colors duration-300 ${
              isLight
                ? "bg-white/80 border-black/10 text-neutral-600"
                : "bg-black/60 border-white/10 text-white/60"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: currentTheme.previewColor }}
            />
            <span>Drag in any direction &bull; Scroll to glide</span>
          </div>
        </>
      )}

      {/* 3. Interactive Experiment: Kinetic Music Library Reel */}
      {extrasExperiment === "music" && (
        <div className="absolute inset-0 w-full h-full">
          <MusicLibraryScroll className="h-full w-full" />
        </div>
      )}

      {/* Bottom Chrome Bar - Fixed and flush to all outer edges */}
      <motion.footer
        className={`fixed bottom-0 inset-x-0 z-40 w-full px-[clamp(20px,4vw,54px)] py-4 sm:py-5 border-t backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs tracking-normal transition-colors duration-300 ${
          extrasExperiment === "music"
            ? "border-white/10 bg-black/70 text-white"
            : isLight
              ? "border-black/10 bg-white/80 text-neutral-900"
              : "border-white/10 bg-black/70 text-white"
        }`}
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          margin: 0,
          opacity: extrasExperiment ? 1 : footerOpacity,
          pointerEvents: isHubActive || extrasExperiment ? "auto" : "none",
        }}
      >
        {/* Bottom Left Corner */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {extrasExperiment !== "music" ? (
            <>
              {/* Theme Palette Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setThemeMenuOpen((v) => !v)}
                  className={`btn-minimal ${
                    isLight
                      ? "border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] text-neutral-800 hover:border-black/20"
                      : "border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/90 hover:border-white/20"
                  }`}
                  aria-expanded={themeMenuOpen}
                  title={`Change theme (current: ${currentTheme.name})`}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                    style={{ backgroundColor: currentTheme.previewColor }}
                  />
                  <span>Theme</span>
                  <span className="opacity-50 text-[10px]">▾</span>
                </button>

                {themeMenuOpen && (
                  <div
                    className="theme-popover"
                    style={{
                      backgroundColor: isLight
                        ? "rgba(255, 255, 255, 0.98)"
                        : "rgba(18, 18, 22, 0.96)",
                      borderColor: isLight
                        ? "rgba(0, 0, 0, 0.12)"
                        : "rgba(255, 255, 255, 0.12)",
                      color: isLight ? "#111113" : "#f2e7de",
                    }}
                  >
                    {THEMES.map((t) => {
                      const tPreview = isLight ? t.lightPreviewColor : t.previewColor;
                      const tGround = isLight ? t.lightGroundColor : t.groundColor;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          className={`theme-option ${t.id === selectedThemeId ? "theme-option--active" : ""}`}
                          onClick={() => {
                            setSelectedThemeId(t.id);
                            setThemeMenuOpen(false);
                          }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                            style={{
                              background: `radial-gradient(circle at 35% 35%, ${tPreview} 0%, ${tGround} 100%)`,
                            }}
                          />
                          <span className="truncate">{t.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dark / Light Mode Switcher */}
              <button
                type="button"
                onClick={toggleColorMode}
                className={`btn-minimal ${
                  isLight
                    ? "border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] text-neutral-800 hover:border-black/20"
                    : "border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/90 hover:border-white/20"
                }`}
                title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
                aria-label="Toggle Dark and Light Mode"
              >
                <span className="text-[11px] leading-none opacity-70">{isLight ? "☼" : "☾"}</span>
                <span>{isLight ? "Light" : "Dark"}</span>
              </button>

              <span
                className={`hidden sm:inline text-xs font-[family-name:var(--font-space-grotesk)] transition-colors ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                Playground &bull; Visual Explorations
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-[family-name:var(--font-space-grotesk)] text-xs text-white/80">
                Music Reel &bull; Kinetic Color Archive
              </span>
            </div>
          )}
        </div>

        {/* Bottom Right Corner */}
        <a
          href="mailto:harshitgujar1604@gmail.com"
          className={`font-[family-name:var(--font-space-grotesk)] text-sm sm:text-base font-medium tracking-normal transition-colors duration-200 lowercase hover:opacity-100 ml-auto sm:ml-0 ${
            extrasExperiment === "music"
              ? "text-white/80 hover:text-white"
              : isLight
                ? "text-neutral-700 hover:text-black"
                : "text-white/80 hover:text-white"
          }`}
          title="Send email to harshitgujar1604@gmail.com"
        >
          harshitgujar1604@gmail.com
        </a>
      </motion.footer>
    </main>
  );
}
