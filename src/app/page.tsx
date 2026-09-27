"use client";

import { useCallback, useState, useEffect } from "react";
import { DiagonalCarousel } from "@/components/carousel/DiagonalCarousel";
import { ITEMS, type CarouselItem } from "@/components/carousel/items";
import { LiquidTypography } from "@/components/ui/liquid-typography";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { PROJECTS } from "@/data/projects";

export interface ThemeConfig {
  id: string;
  name: string;
  previewColor: string;
  groundColor: string;
  vars: React.CSSProperties;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "terracotta",
    name: "Terracotta Rust",
    previewColor: "#f04e23",
    groundColor: "#2c180f",
    vars: {
      "--ground": "#2c180f",
      "--ambient-start": "#3d2214",
      "--ambient-end": "#200f08",
      "--accent": "#f04e23",
      "--vignette": "rgba(18, 8, 4, 0.55)",
      "--ink": "#f2e7de",
      "--ink-dim": "rgba(242, 231, 222, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "cyber-cyan",
    name: "Cyber Cyan",
    previewColor: "#00e5ff",
    groundColor: "#080c14",
    vars: {
      "--ground": "#080c14",
      "--ambient-start": "#0f1b2b",
      "--ambient-end": "#04070c",
      "--accent": "#00e5ff",
      "--vignette": "rgba(4, 7, 12, 0.65)",
      "--ink": "#f0f9ff",
      "--ink-dim": "rgba(240, 249, 255, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "forest-lime",
    name: "Forest Lime",
    previewColor: "#a3e635",
    groundColor: "#0b140e",
    vars: {
      "--ground": "#0b140e",
      "--ambient-start": "#13261a",
      "--ambient-end": "#070e0a",
      "--accent": "#a3e635",
      "--vignette": "rgba(7, 14, 10, 0.65)",
      "--ink": "#f2fbf4",
      "--ink-dim": "rgba(242, 251, 244, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "monochrome",
    name: "Monochrome Noir",
    previewColor: "#ffffff",
    groundColor: "#0e0e11",
    vars: {
      "--ground": "#0e0e11",
      "--ambient-start": "#1c1c22",
      "--ambient-end": "#09090b",
      "--accent": "#ffffff",
      "--vignette": "rgba(9, 9, 11, 0.7)",
      "--ink": "#f4f4f5",
      "--ink-dim": "rgba(244, 244, 245, 0.55)",
    } as React.CSSProperties,
  },
  {
    id: "nocturne-magenta",
    name: "Nocturne Magenta",
    previewColor: "#e879f9",
    groundColor: "#120919",
    vars: {
      "--ground": "#120919",
      "--ambient-start": "#221030",
      "--ambient-end": "#0b050f",
      "--accent": "#e879f9",
      "--vignette": "rgba(11, 5, 15, 0.65)",
      "--ink": "#fae8ff",
      "--ink-dim": "rgba(250, 232, 255, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "solar-cobalt",
    name: "Solar Cobalt",
    previewColor: "#38bdf8",
    groundColor: "#09101f",
    vars: {
      "--ground": "#09101f",
      "--ambient-start": "#13203c",
      "--ambient-end": "#050912",
      "--accent": "#38bdf8",
      "--vignette": "rgba(5, 9, 18, 0.65)",
      "--ink": "#f0f8ff",
      "--ink-dim": "rgba(240, 248, 255, 0.6)",
    } as React.CSSProperties,
  },
];

type ModalView = "work" | "about" | "contact" | null;

export default function Home() {
  const [label, setLabel] = useState(ITEMS[0].label);
  const [auto, setAuto] = useState(true);
  const [interval, setIntervalMs] = useState(2200);
  const [activeModal, setActiveModal] = useState<ModalView>(null);
  const [copied, setCopied] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState("terracotta");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const currentTheme = THEMES.find((t) => t.id === selectedThemeId) ?? THEMES[0];

  const activeSection = showProjects
    ? "work"
    : activeModal === "contact"
      ? "contact"
      : "home";

  const onCenterChange = useCallback((item: CarouselItem) => {
    setLabel(item.label);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("harshitgujar1604@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
        setThemeMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="page" style={currentTheme.vars}>
      {/* 🌊 Liquid "Product Builder" Typography (Shifted BEHIND Carousel Components & Images) */}
      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center pointer-events-none px-4">
        <LiquidTypography text="Product Builder" />
      </div>

      {/* 3D Diagonal Physics Carousel (In FRONT of text: 3D objects float over the typography) */}
      <DiagonalCarousel
        autoPlay={auto}
        interval={interval}
        itemScale={0.65}
        onCenterChange={onCenterChange}
        className="page__carousel"
      />

      {/* Top Header & Floating Pill Navigation Bar (Global across Home & Projects) */}
      <header className="chrome chrome--top w-full z-50">
        {/* Brand Wordmark */}
        <button
          onClick={() => {
            setActiveModal(null);
            setShowProjects(false);
          }}
          className="wordmark"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          harshit gujar
        </button>

        {/* Floating Pill Nav Bar (Home, Work, Contact) */}
        <nav
          className="floating-nav"
          role="navigation"
          aria-label="Main Navigation"
        >
          <button
            type="button"
            onClick={() => {
              setShowProjects(false);
              setActiveModal(null);
            }}
            className={`floating-nav__item ${activeSection === "home" ? "floating-nav__item--active" : ""}`}
            aria-current={activeSection === "home" ? "page" : undefined}
          >
            {activeSection === "home" && <span className="floating-nav__dot" />}
            Home
          </button>

          <button
            type="button"
            onClick={() => {
              setShowProjects(true);
              setActiveModal(null);
            }}
            className={`floating-nav__item ${activeSection === "work" ? "floating-nav__item--active" : ""}`}
            aria-current={activeSection === "work" ? "page" : undefined}
          >
            {activeSection === "work" && <span className="floating-nav__dot" />}
            Work
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveModal("contact");
            }}
            className={`floating-nav__item ${activeSection === "contact" ? "floating-nav__item--active" : ""}`}
            aria-current={activeSection === "contact" ? "page" : undefined}
          >
            {activeSection === "contact" && <span className="floating-nav__dot" />}
            Contact
          </button>
        </nav>
      </header>

      {/* Center Dynamic Label */}
      <div className="chrome chrome--caption">
        <span className="caption__rule" />
        <span className="caption__label" key={label}>
          {label}
        </span>
      </div>

      {/* Bottom Controls */}
      <footer className="chrome chrome--bottom">
        <div className="flex flex-col gap-1">
          <span className="caption__subtitle text-[var(--ink)] opacity-85 font-medium tracking-[0.16em]">
            Things I am interested in
          </span>
          <p className="hint">Scroll or drag to run it faster</p>
        </div>
        <div className="controls relative">
          {/* Theme Palette Switcher */}
          <div className="relative">
            <button
              type="button"
              className="control control--theme"
              onClick={() => setThemeMenuOpen((v) => !v)}
              aria-expanded={themeMenuOpen}
              title="Select color palette"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block transition-colors duration-300"
                style={{ backgroundColor: currentTheme.previewColor }}
              />
              <span>Theme: {currentTheme.name}</span>
            </button>

            {themeMenuOpen && (
              <div className="theme-popover">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-option ${t.id === currentTheme.id ? "theme-option--active" : ""}`}
                    onClick={() => {
                      setSelectedThemeId(t.id);
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

          <button
            type="button"
            className="control"
            aria-pressed={auto}
            onClick={() => setAuto((v) => !v)}
          >
            {auto ? "Pause" : "Play"}
          </button>
          <label className="control control--range">
            <span>{(interval / 1000).toFixed(1)}s</span>
            <input
              type="range"
              min={900}
              max={4000}
              step={100}
              value={interval}
              onChange={(e) => setIntervalMs(Number(e.target.value))}
              aria-label="Seconds between switches"
            />
          </label>
        </div>
      </footer>

      {/* Interactive Modal Drawer for Portfolio Info */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[var(--ink)]/20 bg-[var(--ground)]/95 p-6 sm:p-8 text-[var(--ink)] shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--ink)]/15 mb-6">
              <span className="font-['Instrument_Serif',serif] italic text-2xl tracking-wide capitalize">
                {activeModal === "work" && "Selected Work & Engineering"}
                {activeModal === "about" && "About Harshit Gujar"}
                {activeModal === "contact" && "Get in Touch"}
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--ink)]/24 hover:bg-[var(--ink)]/10 transition-colors"
              >
                Close ✕
              </button>
            </div>

            {/* Modal Body */}
            {activeModal === "work" && (
              <div className="space-y-6 text-sm text-[var(--ink-dim)] leading-relaxed">
                <div>
                  <h3 className="text-base font-medium text-[var(--ink)] mb-1">
                    Fluid Interactive Web & Graphics
                  </h3>
                  <p className="text-xs text-[var(--ink-dim)]/70 mb-2">
                    Next.js, WebGL, Shader Engineering, Tailwind CSS, TypeScript
                  </p>
                  <p>
                    Designing responsive, 60fps physics-driven interfaces with custom shaders,
                    spring kinematics, and low-latency interaction models.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--ink)]/10">
                  <h3 className="text-base font-medium text-[var(--ink)] mb-1">
                    Cross-Platform Mobile Applications
                  </h3>
                  <p className="text-xs text-[var(--ink-dim)]/70 mb-2">
                    React Native, Expo, Native Modules, Offline-First Architecture
                  </p>
                  <p>
                    Building snappy mobile applications with smooth gesture navigation, reactive state
                    management, and tight native integrations.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--ink)]/10">
                  <h3 className="text-base font-medium text-[var(--ink)] mb-1">
                    Scalable Backend & Cloud Systems
                  </h3>
                  <p className="text-xs text-[var(--ink-dim)]/70 mb-2">
                    Node.js, Python, PostgreSQL, Redis, Docker, Cloud APIs
                  </p>
                  <p>
                    Designing resilient APIs, real-time sync engines, and containerized cloud services.
                  </p>
                </div>
              </div>
            )}

            {activeModal === "about" && (
              <div className="space-y-4 text-sm text-[var(--ink-dim)] leading-relaxed">
                <p>
                  I am <strong className="text-[var(--ink)]">Harshit Gujar</strong>, a Full-Stack and Mobile
                  Engineer passionate about crafting elegant digital products where thoughtful design
                  meets robust engineering.
                </p>
                <p>
                  My work spans interactive web experiences, performant mobile apps, and distributed backend
                  services. I enjoy exploring physics-driven animations, tactile web aesthetics, and clean
                  software architecture.
                </p>
                <div className="pt-4 border-t border-[var(--ink)]/10 flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "React",
                    "React Native",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "WebGL",
                    "Physics UI",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-full bg-[var(--ink)]/10 border border-[var(--ink)]/20 text-[var(--ink)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeModal === "contact" && (
              <div className="space-y-5 text-sm text-[var(--ink-dim)] leading-relaxed">
                <p>
                  Available for new projects, engineering roles, and creative collaborations.
                </p>
                <div className="p-4 rounded-xl bg-black/40 border border-[var(--ink)]/15 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--ink)]">
                    harshitgujar1604@gmail.com
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs uppercase tracking-wider px-3 py-1 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/35 hover:bg-[var(--accent)]/25 transition-colors"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <div className="flex gap-4 pt-2">
                  <a
                    href="mailto:harshitgujar1604@gmail.com"
                    className="flex-1 text-center py-2.5 rounded-full bg-[var(--accent)] text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Send Email
                  </a>
                  <a
                    href="https://github.com/harshitgujar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-full border border-[var(--ink)]/30 text-[var(--ink)] text-xs uppercase tracking-wider hover:bg-[var(--ink)]/10 transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🚀 Interactive Liquid Glass Projects Showcase Section */}
      {showProjects && (
        <ProjectSection
          onClose={() => setShowProjects(false)}
          backgroundHex={currentTheme.groundColor}
          accentColor={currentTheme.previewColor}
          inkColor="var(--ink)"
        />
      )}
    </main>
  );
}
