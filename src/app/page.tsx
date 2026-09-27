"use client";

import Link from "next/link";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { currentTheme, selectedThemeId, setSelectedThemeId } = useTheme();

  return (
    <main
      className="page relative h-full w-full overflow-hidden"
      style={currentTheme.vars}
    >
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

        {/* Floating Pill Nav Bar (Strictly two pills: Work and About) */}
        <nav
          className="floating-nav"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link
            href="/"
            className="floating-nav__item floating-nav__item--active"
            aria-current="page"
          >
            <span className="floating-nav__dot" />
            Work
          </Link>

          <Link
            href="/about"
            className="floating-nav__item"
          >
            About
          </Link>
        </nav>
      </header>
    </main>
  );
}
