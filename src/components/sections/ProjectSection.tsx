"use client";

import { useState, useEffect, useRef } from "react";
import {
  LiquidGlassCarousel,
  type LiquidGlassCarouselHandle,
} from "@/components/ui/liquid-glass-carousel";
import { PROJECTS, type ProjectItem } from "@/data/projects";
import { THEMES } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { Sun, Moon, Play, Pause, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EvoraCaseStudy } from "@/components/evora/EvoraCaseStudy";
import { ArkenCaseStudy } from "@/components/arken/ArkenCaseStudy";
import { RunagonCaseStudy } from "@/components/runagon/RunagonCaseStudy";
import { SpotifyCaseStudy } from "@/components/spotify/SpotifyCaseStudy";
import { StronCaseStudy } from "@/components/stron/StronCaseStudy";

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
  const router = useRouter();
  const { currentTheme, isLight, toggleColorMode, setActiveCaseStudy } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [evoraActive, setEvoraActive] = useState(false);
  const [arkenActive, setArkenActive] = useState(false);
  const [runagonActive, setRunagonActive] = useState(false);
  const [spotifyActive, setSpotifyActive] = useState(false);
  const [stronActive, setStronActive] = useState(false);
  const caseStudyActive = evoraActive || arkenActive || runagonActive || spotifyActive || stronActive;
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<LiquidGlassCarouselHandle>(null);

  const currentProject: ProjectItem = PROJECTS[activeIdx] ?? PROJECTS[0];

  const handleOpenProject = (idx?: number, item?: any) => {
    const project =
      (typeof idx === "number" && idx >= 0 && idx < PROJECTS.length
        ? PROJECTS[idx]
        : null) ??
      item ??
      currentProject;

    if (!project) return;

    // Strict check: evora triggers seamless case study expansion
    if (project.id === "evora" || project.title.toLowerCase().includes("evora")) {
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState({ evora: true }, "", "/evora");
      }
      setArkenActive(false);
      setRunagonActive(false);
      setSpotifyActive(false);
      setEvoraActive(true);
      setActiveCaseStudy("evora");
      return;
    }

    // Strict check: arken triggers seamless case study expansion
    if (project.id === "arken" || project.title.toLowerCase().includes("arken")) {
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState({ arken: true }, "", "/arken");
      }
      setEvoraActive(false);
      setRunagonActive(false);
      setSpotifyActive(false);
      setArkenActive(true);
      setActiveCaseStudy("arken");
      return;
    }

    // Strict check: spotify triggers seamless case study expansion
    if (project.id === "spotify" || project.title.toLowerCase().includes("spotify")) {
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState({ spotify: true }, "", "/spotify");
      }
      setEvoraActive(false);
      setArkenActive(false);
      setRunagonActive(false);
      setSpotifyActive(true);
      setActiveCaseStudy("spotify");
      return;
    }

    // Strict check: runagon triggers seamless case study expansion
    if (project.id === "runagon" || project.title.toLowerCase().includes("runagon")) {
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState({ runagon: true }, "", "/runagon");
      }
      setEvoraActive(false);
      setArkenActive(false);
      setSpotifyActive(false);
      setRunagonActive(true);
      setActiveCaseStudy("runagon");
      return;
    }

    // Strict check: stron triggers seamless case study expansion
    if (project.id === "stron" || project.title.toLowerCase().includes("stron")) {
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState({ stron: true }, "", "/stron");
      }
      setEvoraActive(false);
      setArkenActive(false);
      setRunagonActive(false);
      setSpotifyActive(false);
      setStronActive(true);
      setActiveCaseStudy("stron");
      return;
    }

    const targetLink = project.link;
    if (targetLink && targetLink.startsWith("/")) {
      router.push(targetLink);
    }
  };

  const handleCloseCaseStudy = () => {
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(null, "", "/");
    }
    setEvoraActive(false);
    setArkenActive(false);
    setRunagonActive(false);
    setSpotifyActive(false);
    setStronActive(false);
    setActiveCaseStudy(null);
  };

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

  // Synchronize browser history (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined") {
        const isEvora = window.location.pathname === "/evora";
        const isArken = window.location.pathname === "/arken";
        const isSpotify = window.location.pathname === "/spotify";
        const isRunagon = window.location.pathname === "/runagon";
        const isStron = window.location.pathname === "/stron";
        setEvoraActive(isEvora);
        setArkenActive(isArken);
        setSpotifyActive(isSpotify);
        setRunagonActive(isRunagon);
        setStronActive(isStron);
        if (isEvora) setActiveCaseStudy("evora");
        else if (isArken) setActiveCaseStudy("arken");
        else if (isSpotify) setActiveCaseStudy("spotify");
        else if (isRunagon) setActiveCaseStudy("runagon");
        else if (isStron) setActiveCaseStudy("stron");
        else setActiveCaseStudy(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (caseStudyActive) {
          handleCloseCaseStudy();
        } else if (themeMenuOpen) {
          setThemeMenuOpen(false);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [caseStudyActive, onClose, themeMenuOpen]);

  return (
    <div
      className="fixed inset-0 z-40 overflow-hidden select-none animate-in fade-in duration-300"
      style={{
        backgroundColor: backgroundHex,
        color: inkColor,
      }}
    >
      {/* Main WebGL Liquid Glass Canvas (Edge-to-edge full bleed) */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          caseStudyActive
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
      >
        <LiquidGlassCarousel
          ref={carouselRef}
          items={PROJECTS}
          background={backgroundHex}
          tintColor={accentColor}
          panelHeight={480}
          gap={18}
          entry={true}
          autoScroll={autoScroll && !caseStudyActive}
          autoScrollSpeed={0.85}
          pauseOnHover={true}
          hideCloseButton={true}
          onActiveChange={(idx) => setActiveIdx(idx)}
          onFocusChange={handleFocusChange}
          onBloomStart={handleBloomStart}
          onItemClick={handleOpenProject}
          className="h-full w-full"
        />
      </div>

      {/* Bottom Project Details Bar */}
      <footer
        className={`absolute bottom-0 inset-x-0 z-30 px-[clamp(16px,4vw,54px)] py-2.5 sm:py-3.5 md:py-4 border-t backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLight
            ? "border-black/10 bg-white/80 text-neutral-900"
            : "border-white/10 bg-black/50 text-white"
        } ${
          !isRevealed || caseStudyActive
            ? "translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        {/* Top Details Row: Project Category/Description on Left, Tags on Right */}
        <div
          className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-4 transition-all duration-700 delay-100 ${
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {/* Active Project Info */}
          <div className="flex-1 space-y-0.5 sm:space-y-1 select-none" key={currentProject.id}>
            <div className="flex items-center gap-2">
              <h3
                className={`text-xs sm:text-[13px] font-medium tracking-tight ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {currentProject.title}
              </h3>
              <span className="opacity-25 text-[10px]">•</span>
              <span
                className={`text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] font-mono ${
                  isLight ? "text-neutral-500" : "text-white/60"
                }`}
              >
                {currentProject.category}
              </span>
            </div>
            <p
              className={`text-[11px] sm:text-xs max-w-xl line-clamp-2 leading-relaxed ${
                isLight ? "text-neutral-600" : "text-white/70"
              }`}
            >
              {currentProject.description}
            </p>
          </div>

          {/* Tech Stack Tags - hidden on mobile view to keep bottom glass container vertically compact */}
          <div className="hidden md:flex flex-wrap items-center gap-1.5">
            {currentProject.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 text-[8.5px] sm:text-[9px] uppercase tracking-wider rounded-full border transition-colors ${
                  isLight
                    ? "border-black/[0.1] bg-black/[0.03] text-neutral-600"
                    : "border-white/10 bg-white/5 text-white/70"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Corners Row: Theme Changer & Mode Switcher on Left, User's Email on Right */}
        <div
          className={`w-full mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs tracking-normal transition-all duration-700 delay-200 ${
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
                  <ChevronDown className="w-2.5 h-2.5 opacity-60 ml-0.5" />
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
              <span className="flex items-center justify-center">
                {isLight ? (
                  <Sun className="w-3 h-3 opacity-75" />
                ) : (
                  <Moon className="w-3 h-3 opacity-75" />
                )}
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
              <span className="flex items-center justify-center">
                {autoScroll ? (
                  <Pause className="w-2.5 h-2.5 opacity-75 fill-current" />
                ) : (
                  <Play className="w-2.5 h-2.5 opacity-75 fill-current" />
                )}
              </span>
              <span>{autoScroll ? "Auto" : "Paused"}</span>
            </button>

            <span
              className={`hidden sm:inline text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.14em] transition-colors ${
                isLight ? "text-neutral-500" : "text-white/40"
              }`}
            >
              Drag or scroll to explore
            </span>
          </div>

          {/* Bottom Right Corner: User's Mail ID */}
          <a
            href="mailto:harshitgujar1604@gmail.com"
            className={`font-mono text-[10px] sm:text-[11px] tracking-wide transition-colors duration-200 lowercase hover:opacity-100 ml-auto sm:ml-0 ${
              isLight
                ? "text-neutral-750 hover:text-black"
                : "text-white/60 hover:text-white"
            }`}
            title="Send email to harshitgujar1604@gmail.com"
          >
            harshitgujar1604@gmail.com
          </a>
        </div>
      </footer>

      {/* Case Study Full-Screen Experience (with sticky header & smooth animation) */}
      <AnimatePresence>
        {evoraActive && (
          <motion.div
            key="evora-case-study"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] overflow-y-auto overflow-x-hidden bg-[#0c0d10] text-[#f5f5f7] select-text"
          >
            <EvoraCaseStudy
              onBack={handleCloseCaseStudy}
              nextProjectHref="/arken"
            />
          </motion.div>
        )}
        {arkenActive && (
          <motion.div
            key="arken-case-study"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] overflow-y-auto overflow-x-hidden bg-[#0c0d10] text-[#f5f5f7] select-text"
          >
            <ArkenCaseStudy
              onBack={handleCloseCaseStudy}
              nextProjectHref="/spotify"
            />
          </motion.div>
        )}
        {spotifyActive && (
          <motion.div
            key="spotify-case-study"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] overflow-y-auto overflow-x-hidden bg-[#07090c] text-[#f5f5f7] select-text"
          >
            <SpotifyCaseStudy
              onBack={handleCloseCaseStudy}
              nextProjectHref="/runagon"
            />
          </motion.div>
        )}
        {runagonActive && (
          <motion.div
            key="runagon-case-study"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] overflow-y-auto overflow-x-hidden bg-[#0c0d10] text-[#f5f5f7] select-text"
          >
            <RunagonCaseStudy
              onBack={handleCloseCaseStudy}
              nextProjectHref="/stron"
            />
          </motion.div>
        )}
        {stronActive && (
          <motion.div
            key="stron-case-study"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] overflow-y-auto overflow-x-hidden bg-[#050608] text-[#f0f1f3] select-text"
          >
            <StronCaseStudy
              onBack={handleCloseCaseStudy}
              nextProjectHref="/digital-cd"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
