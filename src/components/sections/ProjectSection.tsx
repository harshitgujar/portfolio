"use client";

import { useState, useEffect, useRef } from "react";
import {
  LiquidGlassCarousel,
  type LiquidGlassCarouselHandle,
} from "@/components/ui/liquid-glass-carousel";
import { PROJECTS, type ProjectItem } from "@/data/projects";
import { THEMES } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";

export interface ProjectSectionProps {
  onClose?: () => void;
  backgroundHex?: string;
  accentColor?: string;
  inkColor?: string;
  selectedThemeId?: string;
  onSelectTheme?: (themeId: string) => void;
}

export function ProjectSection({
  onClose,
  backgroundHex = "#0e0e11",
  accentColor = "#f04e23",
  inkColor = "#f2e7de",
  selectedThemeId = "terracotta",
  onSelectTheme,
}: ProjectSectionProps) {
  const { currentTheme, isLight, toggleColorMode } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<LiquidGlassCarouselHandle>(null);

  const currentProject: ProjectItem = PROJECTS[activeIdx] ?? PROJECTS[0];

  const handleBloomStart = () => {
    setIsRevealed(true);
  };

  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
  };

  // Close theme menu when clicking outside
  useEffect(() => {
    if (!themeMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(e.target as Node)
      ) {
        setThemeMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [themeMenuOpen]);

  // Safety fallback: if bloom callback is somehow skipped or delayed, reveal after 2.2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (themeMenuOpen) {
          setThemeMenuOpen(false);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, themeMenuOpen]);

  return (
    <div
      className="fixed inset-0 z-40 overflow-hidden select-none animate-in fade-in duration-300"
      style={{
        backgroundColor: backgroundHex,
        color: inkColor,
      }}
    >
      {/* Main WebGL Liquid Glass Canvas (Edge-to-edge full bleed) */}
      <div className="absolute inset-0 w-full h-full">
        <LiquidGlassCarousel
          ref={carouselRef}
          items={PROJECTS}
          background={backgroundHex}
          tintColor={accentColor}
          panelHeight={480}
          gap={18}
          entry={true}
          autoScroll={autoScroll}
          autoScrollSpeed={0.85}
          pauseOnHover={true}
          hideCloseButton={true}
          onActiveChange={(idx) => setActiveIdx(idx)}
          onFocusChange={handleFocusChange}
          onBloomStart={handleBloomStart}
          className="h-full w-full"
        />
      </div>

      {/* Bottom Project Details Bar */}
      <footer
        className={`absolute bottom-0 inset-x-0 z-30 px-[clamp(20px,4vw,54px)] py-4 sm:py-5 border-t backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLight
            ? "border-black/10 bg-white/80 text-neutral-900"
            : "border-white/10 bg-black/50 text-white"
        } ${
          !isRevealed
            ? "translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        {/* Top Details Row: Project Category/Description on Left, Tags on Right */}
        <div
          className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 delay-100 ${
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {/* Active Project Info */}
          <div className="flex-1 space-y-1" key={currentProject.id}>
            <div className="flex items-center gap-2.5">
              <h3
                className={`text-sm sm:text-base font-semibold tracking-tight ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {currentProject.title}
              </h3>
              <span className="opacity-30 text-xs">•</span>
              <span
                className={`text-xs font-[family-name:var(--font-space-grotesk)] ${
                  isLight ? "text-neutral-500" : "text-white/60"
                }`}
              >
                {currentProject.category}
              </span>
            </div>
            <p
              className={`text-xs sm:text-sm max-w-2xl line-clamp-2 leading-relaxed ${
                isLight ? "text-neutral-700" : "text-white/75"
              }`}
            >
              {currentProject.description}
            </p>
          </div>

          {/* Tech Stack Tags (Clean Minimalist space-grotesk chips) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {currentProject.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs font-[family-name:var(--font-space-grotesk)] rounded-md border transition-colors ${
                  isLight
                    ? "border-black/[0.08] bg-black/[0.03] text-neutral-600"
                    : "border-white/[0.08] bg-white/[0.04] text-white/60"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Corners Row: Theme Changer & Mode Switcher on Left, User's Email on Right */}
        <div
          className={`w-full mt-3.5 pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs tracking-normal transition-all duration-700 delay-200 ${
            isLight ? "border-black/10" : "border-white/10"
          } ${
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {/* Bottom Left Corner: Theme Palette Switcher & Dark/Light Mode Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onSelectTheme && (
              <div className="relative" ref={themeMenuRef}>
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
                            onSelectTheme(t.id);
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
            )}

            {/* Dark Mode / Light Mode Switcher Button */}
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
              <span className="text-[11px] leading-none opacity-70">
                {isLight ? "☼" : "☾"}
              </span>
              <span>{isLight ? "Light" : "Dark"}</span>
            </button>

            {/* Auto-scroll Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => {
                const nextState = !autoScroll;
                setAutoScroll(nextState);
                carouselRef.current?.setAutoScroll?.(nextState);
              }}
              className={`btn-minimal ${
                isLight
                  ? "border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] text-neutral-800 hover:border-black/20"
                  : "border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/90 hover:border-white/20"
              }`}
              title={autoScroll ? "Pause auto-scroll animation" : "Resume auto-scroll animation"}
              aria-label={autoScroll ? "Pause auto-scroll animation" : "Resume auto-scroll animation"}
            >
              <span className="text-[9px] leading-none opacity-60">
                {autoScroll ? "⏸" : "▶"}
              </span>
              <span>{autoScroll ? "Auto" : "Paused"}</span>
            </button>

            <span
              className={`hidden sm:inline text-xs font-[family-name:var(--font-space-grotesk)] transition-colors ${
                isLight ? "text-neutral-400" : "text-white/40"
              }`}
            >
              Drag or scroll to explore
            </span>
          </div>

          {/* Bottom Right Corner: User's Mail ID */}
          <a
            href="mailto:harshitgujar1604@gmail.com"
            className={`font-[family-name:var(--font-space-grotesk)] text-sm sm:text-base font-medium tracking-normal transition-colors duration-200 lowercase hover:opacity-100 ml-auto sm:ml-0 ${
              isLight
                ? "text-neutral-700 hover:text-black"
                : "text-white/80 hover:text-white"
            }`}
            title="Send email to harshitgujar1604@gmail.com"
          >
            harshitgujar1604@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
