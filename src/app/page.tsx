"use client";

import { useCallback, useState, useEffect } from "react";
import { DiagonalCarousel } from "@/components/carousel/DiagonalCarousel";
import { ITEMS, type CarouselItem } from "@/components/carousel/items";
import { LiquidTypography } from "@/components/ui/liquid-typography";

type ModalView = "work" | "about" | "contact" | null;

export default function Home() {
  const [label, setLabel] = useState(ITEMS[0].label);
  const [auto, setAuto] = useState(true);
  const [interval, setIntervalMs] = useState(2200);
  const [activeModal, setActiveModal] = useState<ModalView>(null);
  const [copied, setCopied] = useState(false);

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
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="page">
      {/* 🌊 Liquid "Product Builder" Typography (Shifted BEHIND Carousel Components & Images) */}
      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center pointer-events-none px-4">
        <LiquidTypography text="Product Builder" />
      </div>

      {/* 3D Diagonal Physics Carousel (In FRONT of text: 3D objects float over the typography) */}
      <DiagonalCarousel
        autoPlay={auto}
        interval={interval}
        itemScale={0.52}
        onCenterChange={onCenterChange}
        className="page__carousel"
      />

      {/* Top Navigation Bar */}
      <header className="chrome chrome--top">
        <button
          onClick={() => setActiveModal(null)}
          className="wordmark"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          harshit gujar
        </button>
        <nav className="nav">
          <button type="button" onClick={() => setActiveModal("work")}>
            Work
          </button>
          <button type="button" onClick={() => setActiveModal("about")}>
            About
          </button>
          <button type="button" onClick={() => setActiveModal("contact")}>
            Contact
          </button>
          <a
            href="https://github.com/harshitgujar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            GitHub
          </a>
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
        <p className="hint">Scroll or drag to run it faster</p>
        <div className="controls">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[rgba(240,226,214,0.22)] bg-[#1e100a]/90 p-6 sm:p-8 text-[#f2e7de] shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(240,226,214,0.15)] mb-6">
              <span className="font-['Instrument_Serif',serif] italic text-2xl tracking-wide capitalize">
                {activeModal === "work" && "Selected Work & Engineering"}
                {activeModal === "about" && "About Harshit Gujar"}
                {activeModal === "contact" && "Get in Touch"}
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[rgba(240,226,214,0.24)] hover:bg-[rgba(240,226,214,0.1)] transition-colors"
              >
                Close ✕
              </button>
            </div>

            {/* Modal Body */}
            {activeModal === "work" && (
              <div className="space-y-6 text-sm text-[rgba(242,231,222,0.85)] leading-relaxed">
                <div>
                  <h3 className="text-base font-medium text-[#f2e7de] mb-1">
                    Fluid Interactive Web & Graphics
                  </h3>
                  <p className="text-xs text-[rgba(242,231,222,0.6)] mb-2">
                    Next.js, WebGL, Shader Engineering, Tailwind CSS, TypeScript
                  </p>
                  <p>
                    Designing responsive, 60fps physics-driven interfaces with custom shaders,
                    spring kinematics, and low-latency interaction models.
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(240,226,214,0.1)]">
                  <h3 className="text-base font-medium text-[#f2e7de] mb-1">
                    Cross-Platform Mobile Applications
                  </h3>
                  <p className="text-xs text-[rgba(242,231,222,0.6)] mb-2">
                    React Native, Expo, Native Modules, Offline-First Architecture
                  </p>
                  <p>
                    Building snappy mobile applications with smooth gesture navigation, reactive state
                    management, and tight native integrations.
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(240,226,214,0.1)]">
                  <h3 className="text-base font-medium text-[#f2e7de] mb-1">
                    Scalable Backend & Cloud Systems
                  </h3>
                  <p className="text-xs text-[rgba(242,231,222,0.6)] mb-2">
                    Node.js, Python, PostgreSQL, Redis, Docker, Cloud APIs
                  </p>
                  <p>
                    Designing resilient APIs, real-time sync engines, and containerized cloud services.
                  </p>
                </div>
              </div>
            )}

            {activeModal === "about" && (
              <div className="space-y-4 text-sm text-[rgba(242,231,222,0.85)] leading-relaxed">
                <p>
                  I am <strong className="text-[#f2e7de]">Harshit Gujar</strong>, a Full-Stack and Mobile
                  Engineer passionate about crafting elegant digital products where thoughtful design
                  meets robust engineering.
                </p>
                <p>
                  My work spans interactive web experiences, performant mobile apps, and distributed backend
                  services. I enjoy exploring physics-driven animations, tactile web aesthetics, and clean
                  software architecture.
                </p>
                <div className="pt-4 border-t border-[rgba(240,226,214,0.1)] flex flex-wrap gap-2">
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
                      className="px-2.5 py-1 text-xs rounded-full bg-[rgba(242,231,222,0.08)] border border-[rgba(240,226,214,0.18)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeModal === "contact" && (
              <div className="space-y-5 text-sm text-[rgba(242,231,222,0.85)] leading-relaxed">
                <p>
                  Available for new projects, engineering roles, and creative collaborations.
                </p>
                <div className="p-4 rounded-xl bg-[rgba(20,10,5,0.6)] border border-[rgba(240,226,214,0.18)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#f2e7de]">
                    harshitgujar1604@gmail.com
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs uppercase tracking-wider px-3 py-1 rounded-lg bg-[rgba(240,78,35,0.2)] text-[#f04e23] border border-[rgba(240,78,35,0.4)] hover:bg-[rgba(240,78,35,0.3)] transition-colors"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <div className="flex gap-4 pt-2">
                  <a
                    href="mailto:harshitgujar1604@gmail.com"
                    className="flex-1 text-center py-2.5 rounded-full bg-[#f04e23] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#ff5d33] transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href="https://github.com/harshitgujar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-full border border-[rgba(240,226,214,0.3)] text-[#f2e7de] text-xs uppercase tracking-wider hover:bg-[rgba(240,226,214,0.1)] transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
