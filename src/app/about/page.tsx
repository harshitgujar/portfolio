"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { THEMES } from "@/data/themes";
import { FisheyeInfiniteGrid } from "@/components/ui/fisheye-infinite-grid";

const SOCIAL_LINKS = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/harshitgujar" },
  { label: "MEDIUM", href: "https://medium.com/@harshitgujar1604" },
  { label: "BEHANCE", href: "https://www.behance.net/harshitgujar" },
  { label: "SPOTIFY", href: "https://open.spotify.com" },
  { label: "DRIBBBLE", href: "https://dribbble.com/harshitgujar" },
  { label: "EMAIL", href: "mailto:harshitgujar1604@gmail.com" },
  { label: "TWITTER", href: "https://twitter.com/harshitgujar" },
  { label: "GITHUB", href: "https://github.com/harshitgujar" },
];

export default function AboutPage() {
  const { currentTheme, selectedThemeId, setSelectedThemeId } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("harshitgujar1604@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <main
      className="page min-h-screen relative overflow-y-auto selection:bg-[var(--accent)] selection:text-black"
      style={{
        ...currentTheme.vars,
        backgroundColor: currentTheme.groundColor,
        color: "var(--ink)",
      }}
    >
      {/* Top Header & Floating Navigation */}
      <header className="chrome chrome--top w-full z-50">
        <Link
          href="/"
          className="wordmark"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textDecoration: "none",
          }}
          aria-label="Harshit Gujar - Home"
        >
          harshit gujar
        </Link>

        {/* Floating Pill Nav Bar: Work & About */}
        <nav
          className="floating-nav"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link
            href="/"
            className="floating-nav__item"
          >
            Work
          </Link>

          <Link
            href="/about"
            className="floating-nav__item floating-nav__item--active"
            aria-current="page"
          >
            <span className="floating-nav__dot" />
            About
          </Link>
        </nav>
      </header>

      {/* Main Scrollable Content Container */}
      <div className="pt-28 sm:pt-36 pb-32 px-[clamp(20px,4vw,54px)] max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* 1. Quick Social Proof Links Bar */}
        <nav
          aria-label="Social and Portfolio Links"
          className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-white/50 border-b border-white/10 pb-8"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 uppercase hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* 2. Hero Bio & Philosophy Quote */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <blockquote
            className="text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-wide transition-colors duration-300"
            style={{ color: currentTheme.previewColor }}
          >
            &ldquo;From playing football to designing great visuals, digital products, and micro-interactions, I love spending my time crafting delight and constantly evolving. You&apos;ll always find me with my earbuds on.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm font-mono text-white/60 tracking-wider uppercase">
            &mdash; Don&apos;t hesitate to stop by and say hi!
          </p>
        </section>

        {/* 3. Education Section */}
        <section className="space-y-8">
          <h2 className="text-lg sm:text-xl font-mono tracking-tight text-white">
            [ EDUCATION ]
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div className="space-y-1.5 pb-6 border-b border-white/10">
              <h3 className="text-base sm:text-lg text-white font-normal">
                High / Secondary certificate program
              </h3>
              <p className="text-xs sm:text-sm italic font-serif text-white/60">
                NVBHSS 2021 . 2023
              </p>
            </div>

            <div className="space-y-1.5 pt-2">
              <h3 className="text-base sm:text-lg text-white font-normal">
                Pursuing Integrated Program in Computational and Data Science
              </h3>
              <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-white/60">
                VELLORE INSTITUTE OF TECHNOLOGY BHOPAL
              </p>
            </div>
          </div>
        </section>

        {/* 4. Experience Section (2-Column Grid matching screenshot) */}
        <section className="space-y-8">
          <h2 className="text-lg sm:text-xl font-mono tracking-tight text-white">
            [ EXPERIENCE ]
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Column 1: Igniters Club */}
            <div className="space-y-6">
              <div className="space-y-1.5 pb-6 border-b border-white/10">
                <h3 className="text-base sm:text-lg text-white font-normal">
                  Design Lead
                </h3>
                <p className="text-xs sm:text-sm italic font-serif text-white/60">
                  Igniters Club , VIT Bhopal
                </p>
                <p className="text-xs font-mono text-white/40">2024</p>
              </div>

              <div className="space-y-1.5 pt-2">
                <h3 className="text-base sm:text-lg text-white font-normal">
                  Core Member
                </h3>
                <p className="text-xs sm:text-sm italic font-serif text-white/60">
                  Igniters Club , VIT Bhopal
                </p>
                <p className="text-xs font-mono text-white/40">2023</p>
              </div>
            </div>

            {/* Column 2: Data Science Club */}
            <div className="space-y-6">
              <div className="space-y-1.5 pb-6 border-b border-white/10">
                <h3 className="text-base sm:text-lg text-white font-normal">
                  Design Co - Lead
                </h3>
                <p className="text-xs sm:text-sm italic font-serif text-white/60">
                  Data Science Club , VIT Bhopal
                </p>
                <p className="text-xs font-mono text-white/40">2024</p>
              </div>

              <div className="space-y-1.5 pt-2">
                <h3 className="text-base sm:text-lg text-white font-normal">
                  Core Member
                </h3>
                <p className="text-xs sm:text-sm italic font-serif text-white/60">
                  Data Science Club , VIT Bhopal
                </p>
                <p className="text-xs font-mono text-white/40">2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Extra Creative Work Gallery Showcase with WebGL Fisheye Infinite Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block mb-1">
                Visual Archive &amp; Explorations
              </span>
              <h2 className="text-lg sm:text-xl font-mono tracking-tight text-white">
                [ GALLERY ]
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
              Drag in any direction or scroll to explore
            </p>
          </div>

          {/* Interactive WebGL Fisheye Infinite Canvas */}
          <div className="relative h-[480px] sm:h-[580px] md:h-[640px] w-full rounded-2xl overflow-hidden border border-white/15 bg-[#070707] shadow-2xl">
            <FisheyeInfiniteGrid
              tileWidth={260}
              tileHeight={300}
              gap={16}
              lensStrength={0.28}
              theme="dark"
              hoverNudge={18}
              inertia={0.94}
              wheelSensitivity={0.45}
              className="h-full w-full"
            />
          </div>
        </section>

        {/* 6. Contact & Direct Connection */}
        <section className="space-y-6 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 block mb-1">
                Let&apos;s Build Something Memorable
              </span>
              <h2 className="text-xl sm:text-2xl font-mono tracking-tight text-white">
                [ CONTACT ]
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:harshitgujar1604@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
                style={{
                  backgroundColor: currentTheme.previewColor,
                  color: "#000",
                  boxShadow: `0 4px 20px -2px ${currentTheme.previewColor}50`,
                }}
              >
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
              >
                {copied ? "Copied ✓" : "Copy Email"}
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-mono text-xs sm:text-sm text-white/80">
              harshitgujar1604@gmail.com
            </span>
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
              Available for full-time roles & creative engineering collaborations
            </span>
          </div>
        </section>
      </div>

      {/* Bottom Chrome Bar (Flush to Edges) */}
      <footer className="fixed bottom-0 inset-x-0 z-40 px-[clamp(20px,4vw,54px)] py-4 sm:py-5 border-t border-white/10 bg-black/60 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-wider pointer-events-auto">
        {/* Bottom Left Corner: Theme Palette Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative">
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

          <span className="hidden sm:inline text-white/40 uppercase tracking-widest text-[10px]">
            Personal Archive &amp; Studio
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
      </footer>
    </main>
  );
}
