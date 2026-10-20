"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Globe,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ShowcaseItem {
  id: string;
  category: "ui-ux" | "brand";
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  src: string;
  pixelDimensions?: string;
  aspectClass?: string;
  bgClass?: string;
  objectFit?: "cover" | "contain";
  description: string;
}

interface LightboxState {
  isOpen: boolean;
  src: string;
  title: string;
  subtitle?: string;
  description?: string;
  currentIndex: number;
}

export interface RunagonCaseStudyProps {
  onBack?: () => void;
  nextProjectHref?: string;
  className?: string;
}

export function RunagonCaseStudy({
  onBack,
  nextProjectHref = "/cd",
  className = "",
}: RunagonCaseStudyProps) {
  const { currentTheme } = useTheme();
  const accent = currentTheme?.previewColor || "#2f6bff";

  const [activeFilter, setActiveFilter] = useState<"all" | "ui-ux" | "brand">("all");
  const [logoSurface, setLogoSurface] = useState<"dark" | "light" | "cobalt">("dark");
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: "",
    title: "",
    subtitle: "",
    description: "",
    currentIndex: -1,
  });

  const showcaseItems: ShowcaseItem[] = useMemo(
    () => [
      {
        id: "macbook-web-ui",
        category: "ui-ux",
        step: "01",
        badge: "flagship desktop ui",
        title: "meet runagon — desktop web flagship",
        subtitle: "1280 × 832px • crosshair grid, 3d neural sphere cluster & waitlist flow",
        src: "/runagon/macbook-web-ui.png",
        pixelDimensions: "1280 × 832px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#dce2ff]",
        objectFit: "cover",
        description:
          "Flagship web interface designed on a 3×3 architectural crosshair grid, featuring an interactive 3D luminescent cobalt sphere cluster ('Creativity With Accessibility') and frictionless waitlist onboarding.",
      },
      {
        id: "instagram-beta-poster",
        category: "brand",
        step: "02",
        badge: "beta launch campaign",
        title: "bring your memory — beta testing launch poster",
        subtitle: "1080 × 1350px • dark-mode product announcement & tester onboarding",
        src: "/runagon/instagram-beta-poster.png",
        pixelDimensions: "1080 × 1350px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#050714]",
        objectFit: "contain",
        description:
          "High-contrast midnight cobalt campaign poster announcing Runagon's open beta program ('Help build the app that keeps up'), detailing tester workflows, target users (Notion/Obsidian power users), and early-access rewards.",
      },
      {
        id: "runagon-emblem-poster",
        category: "brand",
        step: "03",
        badge: "brand key visual",
        title: "runagon 6-blade aperture emblem & radial halo",
        subtitle: "4445 × 5556px • geometric identity mark in electric cobalt",
        src: "/runagon/runagon-emblem-poster.png",
        pixelDimensions: "4445 × 5556px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#2f58ff]",
        objectFit: "cover",
        description:
          "High-resolution brand poster centered on Runagon's six-blade vortex aperture emblem surrounded by a stepped concentric cobalt-to-ivory radial luminescence field.",
      },
      {
        id: "linkedin-brand-cover",
        category: "brand",
        step: "04",
        badge: "wide brand banner",
        title: "runagon horizontal identity lockup & waitlist banner",
        subtitle: "1584 × 396px • pitch-black social & header banner system",
        src: "/runagon/linkedin-brand-cover.png",
        pixelDimensions: "1584 × 396px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-black",
        objectFit: "contain",
        description:
          "Minimalist widescreen brand header pairing the electric cobalt Runagon logotype with a high-contrast white 'Join Waitlist at vorph.dpdns.org' pill badge.",
      },
      {
        id: "runagon-vector-logo",
        category: "ui-ux",
        step: "05",
        badge: "vector symbol",
        title: "runagon geometric aperture mark (svg)",
        subtitle: "scalable 6-blade rotational vector emblem",
        src: "/runagon/runagon-logo.svg",
        pixelDimensions: "Vector SVG",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#090b14]",
        objectFit: "contain",
        description:
          "Precision-constructed six-blade rotational vector mark engineered to stay razor-sharp from 16px browser favicons and app dock icons to 4K campaign billboards.",
      },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return showcaseItems;
    return showcaseItems.filter((item) => item.category === activeFilter);
  }, [activeFilter, showcaseItems]);

  const openLightbox = (
    src: string,
    title: string,
    subtitle?: string,
    description?: string,
    index: number = -1
  ) => {
    setLightbox({
      isOpen: true,
      src,
      title,
      subtitle,
      description,
      currentIndex: index,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const navigateLightbox = (dir: "prev" | "next") => {
    if (lightbox.currentIndex === -1) return;
    const total = showcaseItems.length;
    const nextIdx =
      dir === "next"
        ? (lightbox.currentIndex + 1) % total
        : (lightbox.currentIndex - 1 + total) % total;
    const item = showcaseItems[nextIdx];
    setLightbox({
      isOpen: true,
      src: item.src,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      currentIndex: nextIdx,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.isOpen, lightbox.currentIndex]);

  return (
    <main
      className={`min-h-screen w-full relative pt-16 font-sans bg-[#0c0d10] text-[#f5f5f7] selection:bg-[var(--accent)] selection:text-white ${className}`}
    >
      {/* Sticky Top Editorial Bar */}
      <header className="fixed top-0 inset-x-0 z-50 w-full px-6 sm:px-12 md:px-16 py-4 flex items-center justify-between bg-[#0c0d10]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] text-white/70 hover:text-white transition-colors group px-3 py-1.5 -ml-3 rounded-lg hover:bg-white/[0.05] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </button>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] text-white/70 hover:text-white transition-colors group px-3 py-1.5 -ml-3 rounded-lg hover:bg-white/[0.05]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </Link>
        )}

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[11px] font-mono text-amber-300 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>In Progress</span>
          </span>
          <a
            href="https://vorph.dpdns.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: accent }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white font-[family-name:var(--font-space-grotesk)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>join waitlist • vorph.dpdns.org</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SHOWCASE */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 pt-4 pb-16 sm:pb-24 max-w-[1440px] mx-auto">
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-white/75 mb-4">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accent }}
              />
              <span>project in progress • waitlist &amp; beta recruitment live</span>
            </div>
            <h1 className="text-7xl sm:text-9xl md:text-[140px] font-normal tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-[0.9]">
              Runagon
            </h1>
            <div className="mt-5 space-y-1 text-sm sm:text-base text-white/70 font-[family-name:var(--font-space-grotesk)] lowercase tracking-wide">
              <p>your second brain — local-first personal knowledge capture &amp; search (in progress)</p>
              <p className="text-white/45">
                0→1 brand identity, interactive 3d waitlist website &amp; beta launch campaign
              </p>
            </div>
          </div>

          {/* Primary Waitlist Website CTA Button */}
          <a
            href="https://vorph.dpdns.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: accent }}
            className="self-start md:self-end inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-medium text-white font-[family-name:var(--font-space-grotesk)] transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] group flex-shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span>join waitlist • vorph.dpdns.org</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Hero Dual-Stage Showcase Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 cols: MacBook Air Waitlist Website UI ("Meet Runagon") */}
          <div
            onClick={() =>
              openLightbox(
                "/runagon/macbook-web-ui.png",
                "Meet Runagon — Interactive Waitlist Website UI",
                "Creativity With Accessibility • Live Waitlist at vorph.dpdns.org",
                "Waitlist landing page designed with a 3×3 architectural crosshair grid, 3D luminescent cobalt sphere cluster, and one-click waitlist onboarding.",
                0
              )
            }
            className="lg:col-span-8 relative aspect-[1280/832] rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] bg-[#dce2ff] cursor-pointer group transition-all duration-500 hover:border-white/25"
          >
            <Image
              src="/runagon/macbook-web-ui.png"
              alt="Runagon MacBook Air Waitlist Web UI"
              fill
              priority
              unoptimized
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80 block">
                  join waitlist website ui • macbook air
                </span>
                <span className="text-sm sm:text-base font-medium font-[family-name:var(--font-space-grotesk)]">
                  meet runagon — waitlist &amp; early access portal
                </span>
              </div>
              <span className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                <Maximize2 className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>

          {/* Right 4 cols: Instagram Beta Testing Launch Poster */}
          <div
            onClick={() =>
              openLightbox(
                "/runagon/instagram-beta-poster.png",
                "Bring Your Memory — Runagon Beta Launch Poster",
                "Beta • Open Now • Join Waitlist on vorph.dpdns.org",
                "Campaign poster inviting Notion, Obsidian, and notebook power users to join the waitlist and test-drive Runagon during active development.",
                1
              )
            }
            className="lg:col-span-4 relative aspect-[4/5] lg:aspect-auto min-h-[360px] rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] bg-[#040612] cursor-pointer group transition-all duration-500 hover:border-white/25"
          >
            <Image
              src="/runagon/instagram-beta-poster.png"
              alt="Runagon Beta Launch Poster"
              fill
              priority
              unoptimized
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/75 block">
                  beta tester recruitment
                </span>
                <span className="text-sm sm:text-base font-medium font-[family-name:var(--font-space-grotesk)]">
                  bring your memory. help build the app that keeps up.
                </span>
              </div>
              <span className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                <Maximize2 className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN EDITORIAL CASE STUDY GRID */}
      {/* ========================================================================= */}
      <div className="px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto divide-y divide-white/[0.08]">
        {/* ========================================================================= */}
        {/* ( 01 ) ABOUT PROJECT */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 01 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              about project
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              Runagon is an upcoming local-first personal knowledge capture and search platform—currently{" "}
              <span className="text-white font-medium">in active development (In Progress)</span>.
              Designed as <span className="text-white font-medium">Your Second Brain that thinks with you</span>,
              Runagon holds everything you&apos;ve saved, read, written, and discussed, connecting
              your notes automatically across every AI tool and workflow you use.
            </p>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              While the core application is being engineered and refined with early testers, we
              designed and launched the{" "}
              <span className="text-white/85 font-medium">
                official Join Waitlist &amp; Beta Onboarding Website
              </span>{" "}
              at{" "}
              <a
                href="https://vorph.dpdns.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accent }}
                className="underline underline-offset-4 hover:opacity-80"
              >
                vorph.dpdns.org
              </a>{" "}
              alongside the brand identity and beta recruitment campaign.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-white/60 font-[family-name:var(--font-space-grotesk)]">
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  role
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  Lead Product &amp; Brand Designer
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  status
                </span>
                <span className="text-amber-300 font-medium mt-1 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>In Progress (Beta)</span>
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  scope
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  Brand Identity &amp; Waitlist Web UI
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  stack &amp; tools
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  Figma, Spline 3D, WebGL
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  waitlist website
                </span>
                <a
                  href="https://vorph.dpdns.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accent }}
                  className="font-medium mt-1 inline-flex items-center gap-1 hover:underline"
                >
                  <span>vorph.dpdns.org</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 02 ) GOALS & STAGES */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 02 )
            </span>
          </div>
          <div className="md:col-span-11 space-y-12">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                goals &amp; stages
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                Traditional note-taking apps become digital graveyards where saved links, thoughts,
                and documents require manual tagging and folder maintenance. Our goal with Runagon
                was to craft a luminous, accessible brand identity and web flagship that visualizes
                effortless, interconnected memory.
              </p>
            </div>

            {/* Connected Stage Pills Track (Flat pills with zero shadow) */}
            <div className="pt-4 overflow-x-auto pb-4">
              <div className="min-w-[760px] space-y-6">
                <div className="relative flex items-center justify-between">
                  <div className="absolute top-1/2 left-8 right-8 h-[1.5px] bg-white/20 -translate-y-1/2 z-0" />

                  {[
                    "product vision",
                    "brand identity",
                    "web ui/ux flagship",
                    "beta campaign",
                  ].map((pill, i) => (
                    <div key={i} className="relative z-10">
                      <span
                        style={{ backgroundColor: accent }}
                        className="inline-block px-6 py-2 rounded-full text-white text-xs sm:text-sm font-semibold lowercase tracking-tight"
                      >
                        {pill}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-6 text-center font-[family-name:var(--font-space-grotesk)]">
                  {[
                    [
                      "( local-first memory )",
                      "( automatic connections )",
                      "( cross-ai portability )",
                    ],
                    [
                      "( 6-blade aperture logo )",
                      "( electric cobalt halo )",
                      "( dark/light token pair )",
                    ],
                    [
                      "( 3x3 crosshair swiss grid )",
                      "( spline 3d sphere cluster )",
                      "( waitlist & q&a modals )",
                    ],
                    [
                      "( beta tester recruitment )",
                      "( instagram launch poster )",
                      "( linkedin banner system )",
                    ],
                  ].map((items, i) => (
                    <div key={i} className="space-y-1.5">
                      {items.map((it, j) => (
                        <p key={j} className="text-xs sm:text-[13px] text-white/50">
                          {it}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 03 ) BRAND IDENTITY SYSTEM */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 03 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              brand identity
            </h2>
          </div>
          <div className="md:col-span-8 space-y-14">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                Runagon&apos;s visual identity centers on a{" "}
                <span className="text-white font-medium">six-blade rotational aperture mark</span>—a
                geometric metaphor for capturing scattered thoughts and focusing them into a single,
                coherent core. Paired with clean grotesk typography and an{" "}
                <span className="text-white font-medium">Electric Cobalt (`#2244FF`)</span> spectral
                palette, the identity scales effortlessly from dark-mode social campaigns to
                airy daylight interfaces.
              </p>
            </div>

            {/* ( a ) Interactive Vector Emblem & Wordmark Lockup Stage */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    style={{ color: accent }}
                    className="font-mono text-base sm:text-lg font-semibold"
                  >
                    ( a )
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                    6-blade aperture mark &amp; wordmark lockup
                  </span>
                </div>

                {/* Surface Switcher */}
                <div className="flex items-center gap-1.5">
                  {(["dark", "light", "cobalt"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setLogoSurface(mode)}
                      style={{
                        borderColor:
                          logoSurface === mode ? accent : "rgba(255,255,255,0.1)",
                        backgroundColor:
                          logoSurface === mode ? accent : "rgba(255,255,255,0.03)",
                      }}
                      className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-white transition-all border cursor-pointer"
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`relative w-full py-16 sm:py-24 px-8 rounded-3xl border border-white/[0.08] overflow-hidden transition-colors duration-500 flex flex-col items-center justify-center gap-8 ${
                  logoSurface === "dark"
                    ? "bg-[#05060b] text-white"
                    : logoSurface === "light"
                    ? "bg-[#eef1ff] text-[#0a0c14]"
                    : "bg-[#1b36d8] text-white"
                }`}
              >
                <div className="flex items-center gap-5 sm:gap-7">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/runagon/runagon-logo.svg"
                    alt="Runagon Vector Logo"
                    className={`w-16 h-16 sm:w-24 sm:h-24 object-contain transition-all duration-500 ${
                      logoSurface === "cobalt" ? "brightness-200" : ""
                    }`}
                  />
                  <span className="text-5xl sm:text-7xl font-normal tracking-tight font-[family-name:var(--font-space-grotesk)]">
                    Runagon
                  </span>
                </div>
                <span
                  className={`text-[11px] font-mono uppercase tracking-[0.22em] ${
                    logoSurface === "light" ? "text-black/50" : "text-white/50"
                  }`}
                >
                  rotational 6-blade aperture • primary identity lockup
                </span>
              </div>
            </div>

            {/* ( b ) Brand Banner & Radial Halo Key Visual Grid */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span
                  style={{ color: accent }}
                  className="font-mono text-base sm:text-lg font-semibold"
                >
                  ( b )
                </span>
                <span className="text-lg sm:text-xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                  brand banner &amp; radial luminescence system
                </span>
              </div>

              {/* Wide LinkedIn Brand Cover */}
              <div
                onClick={() =>
                  openLightbox(
                    "/runagon/linkedin-brand-cover.png",
                    "Runagon Widescreen Brand Banner (1584 × 396px)",
                    "Pitch-Black Identity Lockup & Waitlist Pill",
                    "Widescreen social and header banner pairing the Runagon logotype with the vorph.dpdns.org waitlist callout.",
                    3
                  )
                }
                className="relative w-full aspect-[4/1] rounded-3xl overflow-hidden border border-white/[0.08] bg-black cursor-pointer group hover:border-white/25 transition-all"
              >
                <Image
                  src="/runagon/linkedin-brand-cover.png"
                  alt="Runagon LinkedIn Cover Banner"
                  fill
                  unoptimized
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Radial Halo Poster + Color System Swatches */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div
                  onClick={() =>
                    openLightbox(
                      "/runagon/runagon-emblem-poster.png",
                      "Runagon Radial Halo Emblem Poster (4445 × 5556px)",
                      "Concentric Electric Cobalt Luminescence Field",
                      "Signature brand poster showcasing the 6-blade Runagon aperture inside a stepped cobalt-to-white optical gradient.",
                      2
                    )
                  }
                  className="md:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#2a52ff] cursor-pointer group hover:border-white/25 transition-all"
                >
                  <Image
                    src="/runagon/runagon-emblem-poster.png"
                    alt="Runagon Emblem Poster"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Color Palette & Typography Spec Card */}
                <div className="md:col-span-6 rounded-3xl border border-white/[0.08] bg-[#101218] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <span
                      style={{ color: accent }}
                      className="font-mono text-xs uppercase tracking-widest font-semibold block"
                    >
                      spectral token system
                    </span>
                    <h4 className="text-lg sm:text-xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                      cobalt luminescence &amp; obsidian contrast
                    </h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                      Calibrated for both daylight glassmorphic workspaces and deep-focus midnight
                      environments.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        name: "Electric Cobalt",
                        hex: "#2244FF",
                        role: "Primary Brand Accent, CTA Pills & 3D Core",
                        swatch: "#2244FF",
                      },
                      {
                        name: "Periwinkle Daylight",
                        hex: "#DCE2FF",
                        role: "Desktop Flagship Ambient Canvas Gradient",
                        swatch: "#DCE2FF",
                      },
                      {
                        name: "Deep Memory Void",
                        hex: "#040612",
                        role: "Dark Mode & Beta Launch Campaign Surface",
                        swatch: "#040612",
                      },
                      {
                        name: "Pure Signal White",
                        hex: "#FFFFFF",
                        role: "High-Contrast Display Typography & Badges",
                        swatch: "#FFFFFF",
                      },
                    ].map((token) => (
                      <div
                        key={token.hex}
                        className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-8 h-8 rounded-xl border border-white/20 flex-shrink-0"
                            style={{ backgroundColor: token.swatch }}
                          />
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-white">
                              {token.name}
                            </div>
                            <div className="text-[11px] text-white/45">{token.role}</div>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-white/70">{token.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 04 ) UI/UX DESIGN & WEB FLAGSHIP */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 04 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              waitlist website ui/ux
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                While the core Runagon app is in active development, we designed and deployed the{" "}
                <span className="text-white font-medium">official Join Waitlist Website</span> (live
                at{" "}
                <a
                  href="https://vorph.dpdns.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accent }}
                  className="underline underline-offset-4 hover:opacity-80"
                >
                  vorph.dpdns.org
                </a>
                ). It pairs a minimalist Swiss coordinate grid with an interactive{" "}
                <span className="text-white font-medium">Spline 3D cobalt sphere cluster</span>{" "}
                and one-click waitlist &amp; Q&amp;A onboarding modals.
              </p>
            </div>

            {/* Interactive MacBook Air Browser Frame */}
            <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#16181f] shadow-2xl">
              {/* Browser Chrome Top Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#0e1015] border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 inline-block" />
                </div>
                <a
                  href="https://vorph.dpdns.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[11px] font-mono text-white/75 hover:text-white transition-colors truncate max-w-xs sm:max-w-md inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 opacity-70" />
                  <span>https://vorph.dpdns.org (Waitlist)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href="https://vorph.dpdns.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: accent }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium text-white font-[family-name:var(--font-space-grotesk)] hover:opacity-90 transition-opacity"
                  >
                    <span>join waitlist</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        "/runagon/macbook-web-ui.png",
                        "Meet Runagon — Flagship Desktop Web UI (1280 × 832px)",
                        "Creativity With Accessibility • Interactive 3D Web Interface",
                        "Full desktop viewport design featuring architectural grid crosshairs, 3D sphere cluster, and waitlist onboarding.",
                        0
                      )
                    }
                    style={{ color: accent }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono hover:underline cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">full screen</span>
                  </button>
                </div>
              </div>

              {/* Desktop UI Canvas */}
              <div
                onClick={() =>
                  openLightbox(
                    "/runagon/macbook-web-ui.png",
                    "Meet Runagon — Flagship Desktop Web UI (1280 × 832px)",
                    "Creativity With Accessibility",
                    "Full desktop viewport design.",
                    0
                  )
                }
                className="relative w-full bg-[#dce2ff] cursor-pointer group overflow-hidden"
              >
                <Image
                  src="/runagon/macbook-web-ui.png"
                  alt="Runagon MacBook Air Web UI"
                  width={1280}
                  height={832}
                  unoptimized
                  className="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Bottom Status Bar */}
              <div className="px-5 py-2.5 bg-[#0e1015] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/45">
                <span>macbook air viewport • 3×3 crosshair grid + spline 3d orb</span>
                <span>1280 × 832px canvas</span>
              </div>
            </div>

            {/* 4 Architectural UI Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-[family-name:var(--font-space-grotesk)]">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span
                  style={{ color: accent }}
                  className="font-mono text-xs uppercase tracking-wider font-semibold"
                >
                  ui pillar 01
                </span>
                <h4 className="text-white text-base font-medium">
                  3×3 Crosshair Coordinate Grid
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Precision hairline rules and `+` intersection markers divide the viewport into
                  balanced thirds, anchoring the navigation, 3D orb, and CTA button in strict
                  architectural harmony.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span
                  style={{ color: accent }}
                  className="font-mono text-xs uppercase tracking-wider font-semibold"
                >
                  ui pillar 02
                </span>
                <h4 className="text-white text-base font-medium">
                  Interactive 3D Neural Sphere Cluster
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  A glowing core surrounded by magnetic cobalt spheres (powered by Spline WebGL)
                  serves as a living visual metaphor for automatic knowledge clustering.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span
                  style={{ color: accent }}
                  className="font-mono text-xs uppercase tracking-wider font-semibold"
                >
                  ui pillar 03
                </span>
                <h4 className="text-white text-base font-medium">
                  &ldquo;Creativity With Accessibility&rdquo; Hierarchy
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Oversized `Meet Runagon` display typography in the lower-left anchors the eye,
                  while `ABILITIES`, `HAVE QUESTIONS?`, and `Join Waitlist` guide immediate user
                  action.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span
                  style={{ color: accent }}
                  className="font-mono text-xs uppercase tracking-wider font-semibold"
                >
                  ui pillar 04
                </span>
                <h4 className="text-white text-base font-medium">
                  Dual-Theme Light &amp; Dark Continuity
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Supports instant theme switching between the airy periwinkle glass panel and a
                  deep-obsidian nocturnal mode with glowing cobalt aura highlights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 05 ) BETA LAUNCH & CAMPAIGN SYSTEM */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 05 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              beta launch campaign
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                To onboard founding beta testers, we designed the{" "}
                <span className="text-white font-medium">
                  &ldquo;Bring your Memory. Help build the app that keeps up.&rdquo;
                </span>{" "}
                campaign system—inviting serious note-takers to use Runagon on their real daily
                workflows for a month in exchange for direct product feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Beta Campaign Poster */}
              <div
                onClick={() =>
                  openLightbox(
                    "/runagon/instagram-beta-poster.png",
                    "Runagon Beta Program Poster (1080 × 1350px)",
                    "Bring your Memory. Help build the app that keeps up.",
                    "Official beta recruitment poster detailing what testing involves, who we want, and what founding testers receive.",
                    1
                  )
                }
                className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#050714] cursor-pointer group hover:border-white/25 transition-all"
              >
                <Image
                  src="/runagon/instagram-beta-poster.png"
                  alt="Runagon Instagram Beta Poster"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* 3 Campaign Pillars from the Poster */}
              <div className="lg:col-span-6 space-y-5 font-[family-name:var(--font-space-grotesk)]">
                {[
                  {
                    badge: "✦ what it involves",
                    title: "Real-Workflow Beta Testing",
                    desc: "Full app access used on your real notes and daily workflow. Quick in-app check-ins instead of long reports, with a direct line to the founding team.",
                  },
                  {
                    badge: "✦ who we want",
                    title: "Notion, Obsidian & Notebook Users",
                    desc: "Anyone serious about notes—whether in Notion, Obsidian, or plain notebooks—who values direct, honest feedback over polite silence.",
                  },
                  {
                    badge: "✦ what you get",
                    title: "Founding Tester Recognition & Lifetime Access",
                    desc: "A certificate of participation, a recommendation letter + LinkedIn endorsement for standout testers, and free lifetime access before public launch.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2"
                  >
                    <span
                      style={{ color: accent }}
                      className="font-mono text-xs uppercase tracking-wider font-semibold block"
                    >
                      {card.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-medium text-white">{card.title}</h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 06 ) SCREENS & BRAND ASSETS GALLERY */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 06 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              screens &amp; assets
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
                Complete archive of Runagon&apos;s UI/UX screens, vector marks, and launch campaign
                posters. Click any card to inspect in full resolution.
              </p>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {[
                  { id: "all", label: "all (5)" },
                  { id: "ui-ux", label: "ui/ux & vector (2)" },
                  { id: "brand", label: "brand & campaign (3)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id as any)}
                    style={{
                      backgroundColor:
                        activeFilter === tab.id ? accent : "rgba(255,255,255,0.05)",
                      color: activeFilter === tab.id ? "#ffffff" : "rgba(255,255,255,0.6)",
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] transition-all font-medium cursor-pointer"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {filteredItems.map((item) => {
                const globalIndex = showcaseItems.findIndex((s) => s.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      openLightbox(
                        item.src,
                        item.title,
                        item.subtitle,
                        item.description,
                        globalIndex
                      )
                    }
                    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#101116] p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-white/25 hover:shadow-xl"
                  >
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between text-xs font-[family-name:var(--font-space-grotesk)]">
                        <span style={{ color: accent }} className="font-mono font-semibold">
                          ( {item.step} )
                        </span>
                        <span className="text-white/40 uppercase text-[10px] tracking-wider font-mono">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-white transition-colors lowercase leading-snug font-[family-name:var(--font-space-grotesk)]">
                        {item.title}
                      </h4>
                    </div>

                    <div
                      className={`relative w-full ${
                        item.aspectClass || "aspect-[16/10]"
                      } rounded-xl overflow-hidden border border-white/10 my-2 ${
                        item.bgClass || "bg-black"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        unoptimized
                        className={`${
                          item.objectFit === "contain"
                            ? "object-contain p-4"
                            : "object-cover object-center"
                        } group-hover:scale-[1.03] transition-transform duration-500`}
                      />

                      {item.pixelDimensions && (
                        <div className="absolute inset-x-0 bottom-0 py-1.5 px-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-between">
                          <span className="text-[10px] font-mono text-white/75">hi-res</span>
                          <span style={{ color: accent }} className="text-[10px] font-mono">
                            {item.pixelDimensions}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 style={{ color: accent }} className="w-6 h-6" />
                      </div>
                    </div>

                    <p className="text-xs text-white/55 line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 07 ) TAKEAWAYS & LIVE WEBSITE CTA */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 07 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              takeaways
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8 text-sm sm:text-base text-white/80 font-[family-name:var(--font-space-grotesk)]">
            <div className="space-y-2">
              <h4 className="text-white font-medium text-base sm:text-lg">
                01. visualizing invisible ai memory
              </h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Instead of showing generic chat bubbles or file trees, representing Runagon&apos;s
                Second Brain through a six-blade optical aperture and a living 3D cluster of
                interconnected cobalt spheres immediately communicates intelligent synthesis.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
              <h4 className="text-white font-medium text-base sm:text-lg">
                02. cohesive cross-channel launch design
              </h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Aligning the MacBook Air web interface (`vorph.dpdns.org`), the Instagram beta
                recruitment poster, and the LinkedIn banner under a single cobalt-and-obsidian
                visual language created a unified product launch experience.
              </p>
            </div>

            {/* Live Join Waitlist Website CTA Banner */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#12141b] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <span
                  style={{ color: accent }}
                  className="font-mono text-xs uppercase tracking-widest font-semibold block"
                >
                  project in progress • waitlist website live
                </span>
                <h4 className="text-lg sm:text-xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                  join the runagon waitlist &amp; early beta program
                </h4>
                <p className="text-xs sm:text-sm text-white/55">
                  Runagon is currently in active development — explore the interactive 3D waitlist
                  website at vorph.dpdns.org
                </p>
              </div>
              <a
                href="https://vorph.dpdns.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: accent }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white font-[family-name:var(--font-space-grotesk)] transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] group flex-shrink-0"
              >
                <Globe className="w-4 h-4" />
                <span>join waitlist • vorph.dpdns.org</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* FOOTER NAVIGATION */}
      {/* ========================================================================= */}
      <footer className="w-full px-6 sm:px-12 md:px-16 py-14 max-w-[1440px] mx-auto flex items-center justify-between border-t border-white/[0.08] text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)]">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </button>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </Link>
        )}
        <span className="text-white/40 hidden sm:inline">
          Runagon — Brand Identity &amp; UI/UX Case Study • Harshit Gujar
        </span>
        <Link
          href={nextProjectHref}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
        >
          <span>next project</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </footer>

      {/* ========================================================================= */}
      {/* HIGH-DEFINITION LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <div
              className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 z-10 border-b border-white/10 pb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="truncate">
                <h3 className="text-sm sm:text-base font-medium text-white truncate lowercase font-[family-name:var(--font-space-grotesk)]">
                  {lightbox.title}
                </h3>
                {lightbox.subtitle && (
                  <p className="text-xs text-white/50 truncate font-[family-name:var(--font-space-grotesk)]">
                    {lightbox.subtitle}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative flex-1 w-full max-w-6xl mx-auto my-4 overflow-hidden flex items-center justify-center rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.currentIndex !== -1 && (
                <>
                  <button
                    type="button"
                    onClick={() => navigateLightbox("prev")}
                    className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/15 transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLightbox("next")}
                    className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/15 transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div
              className="w-full max-w-4xl mx-auto text-center z-10 border-t border-white/10 pt-3"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.description && (
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {lightbox.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
