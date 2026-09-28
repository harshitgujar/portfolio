"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { THEMES } from "@/data/themes";
import { AboutHeroStack } from "@/components/ui/about-hero-stack";

export default function AboutPage() {
  const {
    currentTheme,
    selectedThemeId,
    setSelectedThemeId,
    colorMode,
    toggleColorMode,
    isLight,
  } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });
      setLocalTime(`${formatted} GMT+5:30`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById("about-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main
      className="min-h-screen w-full relative overflow-x-clip selection:bg-[var(--accent)] selection:text-black font-sans transition-colors duration-500"
      style={{
        ...currentTheme.vars,
        backgroundColor: currentTheme.groundColor,
        color: "var(--ink)",
      }}
    >
      {/* Ambient Top Atmospheric Radial Glow matching current theme */}
      <div
        className={`pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] rounded-full blur-[140px] sm:blur-[180px] transition-all duration-700 ${
          isLight ? "opacity-10" : "opacity-20"
        }`}
        style={{
          background: `radial-gradient(circle, ${currentTheme.previewColor} 0%, transparent 70%)`,
        }}
      />

      {/* Opening Full-View Hero: Accent Poster Card & Scroll-Revealing Portrait Stack */}
      <AboutHeroStack onScrollDown={handleScrollDown} />

      {/* Main Scrollable Content Container */}
      <div
        id="about-content"
        className="pt-12 sm:pt-20 pb-36 px-[clamp(20px,5vw,72px)] max-w-5xl mx-auto space-y-20 sm:space-y-28"
      >
        {/* 1. Category Tag & Display Headline */}
        <section className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: currentTheme.previewColor }}
            />
            <span
              className={`font-mono text-xs uppercase tracking-[0.25em] ${
                isLight ? "text-neutral-500" : "text-white/50"
              }`}
            >
              ABOUT
            </span>
          </div>

          <h1
            className={`font-[family-name:var(--font-instrument-serif)] text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight ${
              isLight ? "text-neutral-900" : "text-white"
            }`}
          >
            I design and build 0&rarr;1 products, end to end.
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-3xl ${
              isLight ? "text-neutral-600" : "text-white/60"
            }`}
          >
            Founder’s Office @ STRON &bull; Founding Designer &bull; Product Designer &amp; UI/UX based in Bhopal, India &mdash; designing at the intersection of design thinking and data-driven execution.
          </p>

          {/* Minimal Structured Narrative Grid */}
          <div
            className={`pt-8 mt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 ${
              isLight ? "border-black/10" : "border-white/10"
            }`}
          >
            <p
              className={`text-sm sm:text-base leading-relaxed font-normal ${
                isLight ? "text-neutral-700" : "text-white/75"
              }`}
            >
              &ldquo;I didn&apos;t build my first interface &mdash; I broke it first, then learned why it failed. That&apos;s been my approach to design ever since: understand the user&apos;s friction point before reaching for a tool.&rdquo; I care about restraint and craft: designing not just for how interfaces look, but how they perform, feel, and function in real hands.
            </p>

            <p
              className={`text-sm sm:text-base leading-relaxed font-normal ${
                isLight ? "text-neutral-700" : "text-white/75"
              }`}
            >
              Currently at STRON (Founder’s Office) leading product design solo &mdash; owning UI/UX, interactive prototyping, and the design system end-to-end. Also founder of Arken Creatives. Pursuing an Integrated M.Tech in Data Science at VIT Bhopal, solving complex friction with analytical precision.
            </p>
          </div>

          {/* Social Links Icon Row */}
          <div className="flex items-center gap-2.5 pt-3">
            {[
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/harshit-gujar-8b8627297/",
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                ),
              },
              {
                label: "Twitter / X",
                href: "https://x.com/gujar_harshit",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ),
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/harshitgujar__16/",
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                ),
              },
              {
                label: "GitHub",
                href: "https://github.com/harshitgujar",
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className={`group inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border transition-all duration-150 active:scale-[0.96] ${
                  isLight
                    ? "border-black/10 bg-black/[0.03] hover:bg-black/[0.07] hover:border-black/25 text-neutral-700 hover:text-black"
                    : "border-white/10 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25 text-white/70 hover:text-white"
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>

        {/* 2. Focus Areas Section */}
        <section
          className={`space-y-6 pt-12 border-t ${
            isLight ? "border-black/10" : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`font-mono text-xs uppercase tracking-[0.25em] flex items-center gap-2 ${
                isLight ? "text-neutral-500" : "text-white/50"
              }`}
            >
              WHAT
              <span
                className="w-1.5 h-1.5 rounded-full inline-block opacity-75"
                style={{ backgroundColor: currentTheme.previewColor }}
              />
              DO
            </span>
          </div>

          <h2
            className={`font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
              isLight ? "text-neutral-900" : "text-white"
            }`}
          >
            Focus areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 pt-2">
            {/* Column 1: 01, 03, 05 */}
            <div>
              <div
                className={`flex items-baseline gap-4 py-4 border-b ${
                  isLight ? "border-black/10" : "border-white/10"
                }`}
              >
                <span
                  className={`font-mono text-xs flex-shrink-0 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  01
                </span>
                <span
                  className={`text-base sm:text-lg font-medium ${
                    isLight ? "text-neutral-900" : "text-white/90"
                  }`}
                >
                  0&rarr;1 Product Design
                </span>
              </div>
              <div
                className={`flex items-baseline gap-4 py-4 border-b ${
                  isLight ? "border-black/10" : "border-white/10"
                }`}
              >
                <span
                  className={`font-mono text-xs flex-shrink-0 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  03
                </span>
                <span
                  className={`text-base sm:text-lg font-medium ${
                    isLight ? "text-neutral-900" : "text-white/90"
                  }`}
                >
                  High-Fidelity Prototyping
                </span>
              </div>
              <div
                className={`flex items-baseline gap-4 py-4 border-b ${
                  isLight ? "border-black/10" : "border-white/10"
                }`}
              >
                <span
                  className={`font-mono text-xs flex-shrink-0 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  05
                </span>
                <span
                  className={`text-base sm:text-lg font-medium ${
                    isLight ? "text-neutral-900" : "text-white/90"
                  }`}
                >
                  Data-Driven Design &amp; ML
                </span>
              </div>
            </div>

            {/* Column 2: 02, 04, 06 */}
            <div>
              <div
                className={`flex items-baseline gap-4 py-4 border-b ${
                  isLight ? "border-black/10" : "border-white/10"
                }`}
              >
                <span
                  className={`font-mono text-xs flex-shrink-0 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  02
                </span>
                <span
                  className={`text-base sm:text-lg font-medium ${
                    isLight ? "text-neutral-900" : "text-white/90"
                  }`}
                >
                  Design Systems &amp; Tokenization
                </span>
              </div>
              <div
                className={`flex items-baseline gap-4 py-4 border-b ${
                  isLight ? "border-black/10" : "border-white/10"
                }`}
              >
                <span
                  className={`font-mono text-xs flex-shrink-0 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  04
                </span>
                <span
                  className={`text-base sm:text-lg font-medium ${
                    isLight ? "text-neutral-900" : "text-white/90"
                  }`}
                >
                  Information Architecture &amp; User Flows
                </span>
              </div>
              <div
                className={`flex items-baseline gap-4 py-4 border-b ${
                  isLight ? "border-black/10" : "border-white/10"
                }`}
              >
                <span
                  className={`font-mono text-xs flex-shrink-0 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  06
                </span>
                <span
                  className={`text-base sm:text-lg font-medium ${
                    isLight ? "text-neutral-900" : "text-white/90"
                  }`}
                >
                  Community &amp; Event Platforms
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Experience Section: Where I've worked */}
        <section
          className={`space-y-6 pt-12 border-t ${
            isLight ? "border-black/10" : "border-white/10"
          }`}
        >
          <span
            className={`font-mono text-xs uppercase tracking-[0.25em] block ${
              isLight ? "text-neutral-500" : "text-white/50"
            }`}
          >
            EXPERIENCE &bull; CRAFT &amp; LEADERSHIP
          </span>

          <h2
            className={`font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
              isLight ? "text-neutral-900" : "text-white"
            }`}
          >
            Where I’ve worked
          </h2>

          <div className="space-y-6 pt-2">
            {/* Item 1: STRON */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                May 2026 &mdash; Present
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  STRON &bull; Bhopal, India
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-500" : "text-white/50"
                  }`}
                >
                  Founding Designer &bull; Founder&apos;s Office
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isLight ? "text-neutral-700" : "text-white/70"
                  }`}
                >
                  Independently designing the complete product experience for STRON &mdash; a fitness event listing, community, and social platform &mdash; owning UI/UX, interactive prototyping, and design system end-to-end solo with no design team. Architected core event discovery and listing flows engineered for speed and zero friction, alongside community features (athlete profiles, activity feeds, and social interactions) bridging discovery with ongoing engagement.
                </p>
              </div>
            </div>

            {/* Item 2: Arken Creatives */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                May 2026 &mdash; Present
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Arken Creatives &bull; Bhopal, India
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-500" : "text-white/50"
                  }`}
                >
                  Founder &bull; Design Studio
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isLight ? "text-neutral-700" : "text-white/70"
                  }`}
                >
                  Founded a freelance design studio offering end-to-end UI/UX design and visual branding services to early-stage startups and small businesses. Managing the complete client lifecycle from brief &amp; discovery sprints through user flows, wireframes, high-fidelity prototypes, brand identities, and design audits with client engineering teams.
                </p>
              </div>
            </div>

            {/* Item 3: Techbrill Solutions */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                Aug 2025 &mdash; May 2026
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Techbrill Solutions &bull; Remote
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-500" : "text-white/50"
                  }`}
                >
                  UI/UX Designer
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isLight ? "text-neutral-700" : "text-white/70"
                  }`}
                >
                  Designed intuitive user interfaces and interactive prototypes for client-facing digital platforms, translating product requirements into wireframes and production-ready screens. Collaborated closely with cross-functional development teams on live product features; strengthened core UX competencies including user flow mapping, responsive layout systems, and interactive Figma prototyping.
                </p>
              </div>
            </div>

            {/* Item 4: Edunet Foundation */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                Feb 2025 &mdash; Apr 2025
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Edunet Foundation &bull; Remote
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-500" : "text-white/50"
                  }`}
                >
                  Student Intern &bull; Machine Learning
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isLight ? "text-neutral-700" : "text-white/70"
                  }`}
                >
                  Completed an intensive 8-week internship focused on applied Machine Learning. Engineered and delivered an end-to-end AI/ML project: a Resume ATS Scorer for automated resume parsing, keyword extraction, and candidate qualification scoring.
                </p>
              </div>
            </div>

            {/* Item 5: Data Science Club VIT Bhopal */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                Dec 2023 &mdash; May 2026
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Data Science Club &bull; VIT Bhopal
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-500" : "text-white/50"
                  }`}
                >
                  President (Aug 2025 &ndash; May 2026) &bull; Design Co-Lead (Jun 2024 &ndash; Aug 2025) &bull; Core Member (Dec 2023 &ndash; Jul 2024)
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isLight ? "text-neutral-700" : "text-white/70"
                  }`}
                >
                  Served over a 2.5-year tenure across design and executive leadership. As President, led 90 members across 10 sub-teams, setting strategic direction for technical symposiums, hackathons, and design initiatives. Scaled active club membership from 60 to 90 and represented the club in key external partnerships with Hack2skill, Unstop, and Educado.
                </p>
              </div>
            </div>

            {/* Item 6: D2C Igniters Club VIT Bhopal */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                Oct 2023 &mdash; Jun 2026
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  D2C Igniters Club &bull; VIT Bhopal
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-500" : "text-white/50"
                  }`}
                >
                  Vice President (Jun 2025 &ndash; Jun 2026) &bull; Design Lead (Jun 2024 &ndash; Aug 2025) &bull; Core Member (Oct 2023 &ndash; Jun 2024)
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isLight ? "text-neutral-700" : "text-white/70"
                  }`}
                >
                  Over a 2-year 9-month tenure, steered club visual identity, campus-wide entrepreneurship challenges, and user experience workshops. Led cross-functional teams to execute student competitions, foster innovation on campus, and elevate event engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Education Section: Where I've Studied */}
        <section
          className={`space-y-6 pt-12 border-t ${
            isLight ? "border-black/10" : "border-white/10"
          }`}
        >
          <span
            className={`font-mono text-xs uppercase tracking-[0.25em] block ${
              isLight ? "text-neutral-500" : "text-white/50"
            }`}
          >
            EDUCATION
          </span>

          <h2
            className={`font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
              isLight ? "text-neutral-900" : "text-white"
            }`}
          >
            Where I’ve Studied
          </h2>

          <div className="space-y-6 pt-2">
            {/* College */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                Oct 2023 &mdash; Apr 2027
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Vellore Institute of Technology Bhopal
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-600" : "text-white/60"
                  }`}
                >
                  Integrated M.Tech in Data Science
                </p>
                <p
                  className={`text-xs font-mono pt-0.5 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  Focus on Data Science, Machine Learning, UI/UX Design Systems &amp; HCI
                </p>
              </div>
            </div>

            {/* School */}
            <div
              className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 pt-6 border-t ${
                isLight ? "border-black/10" : "border-white/10"
              }`}
            >
              <span
                className={`font-mono text-xs sm:text-sm w-36 sm:w-44 flex-shrink-0 ${
                  isLight ? "text-neutral-400" : "text-white/40"
                }`}
              >
                Jun 2008 &mdash; Apr 2023
              </span>
              <div className="space-y-1.5 flex-1">
                <h3
                  className={`font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl font-normal ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Naveen Vidya Bharti
                </h3>
                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isLight ? "text-neutral-600" : "text-white/60"
                  }`}
                >
                  High School / Secondary Certificate Program
                </p>
                <p
                  className={`text-xs font-mono pt-0.5 ${
                    isLight ? "text-neutral-400" : "text-white/40"
                  }`}
                >
                  Foundational Schooling &amp; Higher Secondary Certificate &bull; Science &amp; Mathematics
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* 5. Contact Section: Let's work together */}
        <section
          className={`space-y-6 pt-12 border-t ${
            isLight ? "border-black/10" : "border-white/10"
          }`}
        >
          <span
            className={`font-mono text-xs uppercase tracking-[0.25em] block ${
              isLight ? "text-neutral-500" : "text-white/50"
            }`}
          >
            CONTACT
          </span>

          <h2
            className={`font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
              isLight ? "text-neutral-900" : "text-white"
            }`}
          >
            Let’s work together
          </h2>

          <a
            href="mailto:harshitgujar1604@gmail.com"
            className={`font-[family-name:var(--font-instrument-serif)] text-2xl sm:text-4xl md:text-5xl transition-colors block pt-1 underline underline-offset-8 ${
              isLight
                ? "text-neutral-900 hover:text-black decoration-black/20 hover:decoration-black"
                : "text-white/90 hover:text-white decoration-white/20 hover:decoration-white"
            }`}
          >
            harshitgujar1604@gmail.com
          </a>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
            <a
              href="mailto:harshitgujar1604@gmail.com"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-[family-name:var(--font-space-grotesk)] font-medium text-xs sm:text-sm transition-all active:scale-[0.98] ${
                isLight
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              <span>recruit, or just say hi</span>
              <span>&rarr;</span>
            </a>

            <a
              href="https://www.linkedin.com/in/harshit-gujar-8b8627297/"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-[family-name:var(--font-space-grotesk)] text-xs sm:text-sm transition-colors ${
                isLight
                  ? "text-neutral-700 hover:text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              LinkedIn
            </a>

            <a
              href="https://x.com/gujar_harshit"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono text-xs sm:text-sm transition-colors ${
                isLight
                  ? "text-neutral-700 hover:text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Twitter/X
            </a>

            <a
              href="https://www.instagram.com/harshitgujar__16/"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono text-xs sm:text-sm transition-colors ${
                isLight
                  ? "text-neutral-700 hover:text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Instagram
            </a>

            <a
              href="https://github.com/harshitgujar"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono text-xs sm:text-sm transition-colors ${
                isLight
                  ? "text-neutral-700 hover:text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              GitHub
            </a>
          </div>
        </section>

        {/* 6. Editorial Local Time & Copyright Footer */}
        <section
          className={`pt-16 pb-12 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] sm:text-xs ${
            isLight
              ? "border-black/10 text-neutral-500"
              : "border-white/10 text-white/40"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>My local time</span>
            <span
              className={isLight ? "text-neutral-800" : "text-white/70"}
            >
              {localTime || "1:50:36 AM GMT+5:30"}
            </span>
          </div>

          <div>
            <span>&copy; 2026 Harshit Gujar</span>
          </div>
        </section>
      </div>

      {/* Bottom Chrome Bar (Flush to Edges) */}
      <footer
        className={`fixed bottom-0 inset-x-0 z-40 px-[clamp(20px,4vw,54px)] py-4 sm:py-5 border-t backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-wider pointer-events-auto transition-colors duration-300 ${
          isLight
            ? "border-black/10 bg-white/75 text-neutral-900 shadow-lg"
            : "border-white/10 bg-black/60 text-white"
        }`}
      >
        {/* Bottom Left Corner: Theme Palette Switcher & Dark/Light Mode Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
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
            <span className="text-[11px] leading-none opacity-70">{isLight ? "☼" : "☾"}</span>
            <span>{isLight ? "Light" : "Dark"}</span>
          </button>

          <span
            className={`hidden sm:inline text-xs font-[family-name:var(--font-space-grotesk)] transition-colors ${
              isLight ? "text-neutral-400" : "text-white/40"
            }`}
          >
            Personal Archive &amp; Studio
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
      </footer>
    </main>
  );
}
