"use client";

import { useState, useEffect } from "react";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { THEMES } from "@/data/themes";

type ModalView = "about" | "contact" | null;

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalView>(null);
  const [copied, setCopied] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState("terracotta");

  const currentTheme =
    THEMES.find((t) => t.id === selectedThemeId) ?? THEMES[0];

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
    <main className="page relative h-full w-full overflow-hidden" style={currentTheme.vars}>
      {/* 🚀 Interactive Liquid Glass Projects Showcase (Main Landing / Home Page) */}
      <ProjectSection
        backgroundHex={currentTheme.groundColor}
        accentColor={currentTheme.previewColor}
        inkColor="var(--ink)"
        selectedThemeId={selectedThemeId}
        onSelectTheme={setSelectedThemeId}
      />

      {/* Top Header & Floating Pill Navigation Bar */}
      <header className="chrome chrome--top w-full z-50">
        {/* Brand Wordmark */}
        <button
          onClick={() => setActiveModal(null)}
          className="wordmark"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Harshit Gujar - Home"
        >
          harshit gujar
        </button>

        {/* Floating Pill Nav Bar (Work, About, Contact) */}
        <nav
          className="floating-nav"
          role="navigation"
          aria-label="Main Navigation"
        >
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className={`floating-nav__item ${activeModal === null ? "floating-nav__item--active" : ""}`}
            aria-current={activeModal === null ? "page" : undefined}
          >
            {activeModal === null && <span className="floating-nav__dot" />}
            Work
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("about")}
            className={`floating-nav__item ${activeModal === "about" ? "floating-nav__item--active" : ""}`}
            aria-current={activeModal === "about" ? "page" : undefined}
          >
            {activeModal === "about" && <span className="floating-nav__dot" />}
            About
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("contact")}
            className={`floating-nav__item ${activeModal === "contact" ? "floating-nav__item--active" : ""}`}
            aria-current={activeModal === "contact" ? "page" : undefined}
          >
            {activeModal === "contact" && <span className="floating-nav__dot" />}
            Contact
          </button>
        </nav>
      </header>

      {/* Interactive Modal Drawer for About / Contact */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[var(--ink)]/20 bg-[var(--ground)]/95 p-6 sm:p-8 text-[var(--ink)] shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--ink)]/15 mb-6">
              <span className="font-['Instrument_Serif',serif] italic text-2xl tracking-wide capitalize">
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

            {/* Modal Body: About */}
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
                    "Three.js",
                    "Physics UI",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-full bg-[var(--ink)]/10 border border-[var(--ink)]/20 text-[var(--ink)] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Body: Contact */}
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
    </main>
  );
}
