"use client";

import { useState, useEffect, useRef } from "react";
import {
  LiquidGlassCarousel,
  type LiquidGlassCarouselHandle,
} from "@/components/ui/liquid-glass-carousel";
import { PROJECTS, type ProjectItem } from "@/data/projects";
import { THEMES } from "@/data/themes";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";

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
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<LiquidGlassCarouselHandle>(null);

  const currentTheme =
    THEMES.find((t) => t.id === selectedThemeId) ?? THEMES[0];
  const currentProject: ProjectItem = PROJECTS[activeIdx] ?? PROJECTS[0];

  const handleBloomStart = () => {
    setIsRevealed(true);
  };

  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
    if (focused) {
      setCaseStudyOpen(true);
    }
  };

  const handleCloseCaseStudy = () => {
    setCaseStudyOpen(false);
    setIsFocused(false);
    carouselRef.current?.closeFocus();
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
        } else if (caseStudyOpen) {
          handleCloseCaseStudy();
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, caseStudyOpen, themeMenuOpen]);

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
          hideCloseButton={true}
          onActiveChange={(idx) => setActiveIdx(idx)}
          onFocusChange={handleFocusChange}
          onBloomStart={handleBloomStart}
          className="h-full w-full"
        />
      </div>

      {/* Bottom Project Details Bar (Reveals from down to up when containers zoom & gradient blooms) */}
      <footer
        className={`absolute bottom-0 inset-x-0 z-30 px-[clamp(20px,4vw,54px)] py-4 sm:py-5 border-t border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          !isRevealed
            ? "translate-y-full opacity-0 pointer-events-none"
            : caseStudyOpen
              ? "translate-y-6 opacity-0 pointer-events-none duration-300"
              : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        {/* Top Details Row: Project Category/Description on Left, Tags & Case Study on Right */}
        <div
          className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 delay-100 ${
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {/* Active Project Info */}
          <div className="flex-1 space-y-1.5" key={currentProject.id}>
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-[11px] uppercase tracking-[0.18em] opacity-70 font-mono">
                {currentProject.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm opacity-75 max-w-2xl line-clamp-2 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Actions: Tech Stack & Case Study Button */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="hidden lg:flex flex-wrap items-center gap-1.5">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full border border-white/15 bg-white/5 opacity-80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read Case Study Button */}
            <button
              type="button"
              onClick={() => setCaseStudyOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
              style={{
                backgroundColor: accentColor,
                color: "#000",
                boxShadow: `0 4px 20px -2px ${accentColor}50`,
              }}
            >
              <span>Case Study</span>
              <span className="text-sm leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Corners Row: Theme Changer on Left, User's Email on Right */}
        <div
          className={`w-full mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-wider transition-all duration-700 delay-200 ${
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {/* Bottom Left Corner: Theme Palette Switcher */}
          <div className="flex items-center gap-3">
            {onSelectTheme && (
              <div className="relative" ref={themeMenuRef}>
                <button
                  type="button"
                  onClick={() => setThemeMenuOpen((v) => !v)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider border border-white/15 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white transition-all active:scale-95 shadow-sm"
                  aria-expanded={themeMenuOpen}
                  title="Select theme palette"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block transition-colors duration-300"
                    style={{ backgroundColor: currentTheme.previewColor }}
                  />
                  <span className="font-mono text-[11px]">
                    Theme: {currentTheme.name}
                  </span>
                  <span className="opacity-50 text-[9px]">▾</span>
                </button>

                {themeMenuOpen && (
                  <div
                    className="theme-popover"
                    style={{
                      bottom: "calc(100% + 10px)",
                      left: 0,
                      backgroundColor: "rgba(13, 15, 20, 0.96)",
                      borderColor: "rgba(255, 255, 255, 0.18)",
                    }}
                  >
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        className={`theme-option ${t.id === currentTheme.id ? "theme-option--active" : ""}`}
                        onClick={() => {
                          onSelectTheme(t.id);
                          setThemeMenuOpen(false);
                        }}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full inline-block flex-shrink-0"
                          style={{
                            background: `radial-gradient(circle at 35% 35%, ${t.previewColor} 0%, ${t.groundColor} 100%)`,
                            border: "1px solid rgba(255,255,255,0.25)",
                          }}
                        />
                        <span className="truncate">{t.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <span className="hidden sm:inline text-white/40 uppercase tracking-widest text-[10px]">
              Scroll or ← → to explore
            </span>
          </div>

          {/* Bottom Right Corner: User's Mail ID */}
          <a
            href="mailto:harshitgujar1604@gmail.com"
            className="font-mono text-[11px] sm:text-xs tracking-wide text-white/70 hover:text-white transition-colors duration-200 lowercase hover:underline ml-auto sm:ml-0"
            title="Send email to harshitgujar1604@gmail.com"
          >
            harshitgujar1604@gmail.com
          </a>
        </div>
      </footer>

      {/* Full-Detail Case Study Modal */}
      <ProjectCaseStudyModal
        project={currentProject}
        isOpen={caseStudyOpen}
        onClose={handleCloseCaseStudy}
        accentColor={accentColor}
        onSelectProject={(idx) => setActiveIdx(idx)}
        currentIndex={activeIdx}
        totalProjects={PROJECTS.length}
      />
    </div>
  );
}
