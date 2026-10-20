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
  Smartphone,
  ShieldCheck,
  Award,
  Layers,
  LayoutDashboard,
  CheckCircle2,
  QrCode,
  Flame,
  Trophy,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ShowcaseItem {
  id: string;
  category: "app" | "brand" | "store" | "certificate" | "admin" | "web";
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

export interface StronCaseStudyProps {
  onBack?: () => void;
  nextProjectHref?: string;
  className?: string;
}

export function StronCaseStudy({
  onBack,
  nextProjectHref = "/digital-cd",
  className = "",
}: StronCaseStudyProps) {
  const { currentTheme } = useTheme();
  const accent = currentTheme?.previewColor || "#0067FF";

  const [activeFilter, setActiveFilter] = useState<
    "all" | "app" | "brand" | "store" | "certificate" | "admin" | "web"
  >("all");
  const [logoSurface, setLogoSurface] = useState<"dark" | "electric" | "gold">("dark");
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
        id: "hero-poster",
        category: "brand",
        step: "01",
        badge: "brand identity",
        title: "stron visual identity & system poster",
        subtitle: "1200 × 1600px • mathematical s-monogram & athletic dark os",
        src: "/stron.png",
        pixelDimensions: "1200 × 1600px",
        aspectClass: "aspect-[3/4]",
        bgClass: "bg-[#06070a]",
        objectFit: "contain",
        description:
          "Official STRON brand identity showcase: electric sapphire radial gradient (#96C1FF to #0067FF), tactical grid markings, and athletic-premium typography system.",
      },
      {
        id: "app-social-racing",
        category: "app",
        step: "02",
        badge: "mobile app ui/ux",
        title: "competitive fitness racing & live feed",
        subtitle: "react native / expo • step challenges & face-offs",
        src: "/stron/engage-mockup-new.webp",
        pixelDimensions: "high-res mockup",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#0a0c14]",
        objectFit: "contain",
        description:
          "Athletic racing feed showing live step competitions, real-time leaderboards, virtual marathons, and head-to-head athletic challenges.",
      },
      {
        id: "gym-business-os",
        category: "app",
        step: "03",
        badge: "gym pass & booking",
        title: "multi-city gym discovery & dynamic qr pass",
        subtitle: "bangalore • delhi • mumbai • hyderabad • pune",
        src: "/stron/grow-mockup-new.webp",
        pixelDimensions: "high-res mockup",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#08090f]",
        objectFit: "contain",
        description:
          "Location-indexed gym discovery and membership pass engine with sub-second dynamic QR door access across partner fitness centers and crossfit boxes.",
      },
      {
        id: "admin-console-web",
        category: "admin",
        step: "04",
        badge: "admin console & dev",
        title: "owner control center & staff operations dashboard",
        subtitle: "designed & developed • react • vite • tailwind • typescript",
        src: "/stron/hero-macbook-mockup.webp",
        pixelDimensions: "macbook display",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#07080d]",
        objectFit: "contain",
        description:
          "Single-pane administrative operating system for gym managers and event directors: member check-in audits, attendance telemetry, live revenue, and coach assignments.",
      },
      {
        id: "mobile-screen-home",
        category: "app",
        step: "05",
        badge: "mobile screens",
        title: "production app interface & training suite",
        subtitle: "iphone mockup 01 • athlete telemetry & daily streak",
        src: "/stron/iphone-mockup-1.webp",
        pixelDimensions: "iphone mockup",
        aspectClass: "aspect-[3/4]",
        bgClass: "bg-[#090b12]",
        objectFit: "contain",
        description:
          "Core mobile athlete view: daily step goal tracking, heart rate telemetry, active streak counter, and direct race check-in.",
      },
      {
        id: "mobile-screen-challenges",
        category: "app",
        step: "06",
        badge: "mobile screens",
        title: "king of the hill & race lobby",
        subtitle: "iphone mockup 02 • competitive racing brackets",
        src: "/stron/iphone-mockup-2.webp",
        pixelDimensions: "iphone mockup",
        aspectClass: "aspect-[3/4]",
        bgClass: "bg-[#090b12]",
        objectFit: "contain",
        description:
          "Competitive race lobby interface: countdown clocks, prize pool distribution, bracket matches, and instant race invite tokens.",
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
    setLightbox({
      isOpen: false,
      src: "",
      title: "",
      subtitle: "",
      description: "",
      currentIndex: -1,
    });
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightbox.currentIndex === -1) return;
    const total = filteredItems.length;
    const nextIndex =
      direction === "next"
        ? (lightbox.currentIndex + 1) % total
        : (lightbox.currentIndex - 1 + total) % total;
    const target = filteredItems[nextIndex];
    setLightbox({
      isOpen: true,
      src: target.src,
      title: target.title,
      subtitle: target.subtitle,
      description: target.description,
      currentIndex: nextIndex,
    });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightbox.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.isOpen, lightbox.currentIndex, navigateLightbox]);

  return (
    <main
      className={`min-h-screen w-full relative pt-16 font-sans bg-[#050608] text-[#f0f1f3] selection:bg-[#0067FF] selection:text-white ${className}`}
    >
      {/* Sticky Top Editorial Bar */}
      <header className="fixed top-0 inset-x-0 z-50 w-full px-6 sm:px-12 md:px-16 py-4 flex items-center justify-between bg-[#050608]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live in Production</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-[11px] font-mono text-blue-300">
            <span>React Native • Expo • Vite</span>
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SHOWCASE */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 pt-6 pb-16 sm:pb-24 max-w-[1440px] mx-auto">
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-white/75 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0067FF] animate-pulse" />
              <span>athletic fitness racing &amp; gym operating system</span>
            </div>
            <h1 className="text-7xl sm:text-9xl md:text-[140px] font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-[0.9]">
              STRON
            </h1>
            <div className="mt-5 space-y-1 text-sm sm:text-base text-white/70 font-[family-name:var(--font-space-grotesk)] lowercase tracking-wide">
              <p>founding designer &amp; full-stack developer — 0→1 complete ecosystem</p>
              <p className="text-white/45">
                mobile app ui/ux • brand logo • store screenshots • e-certificates • admin console • marketing website
              </p>
            </div>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">scope</div>
              <div className="text-base sm:text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                6 Deliverables
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">tokens</div>
              <div className="text-base sm:text-lg font-bold text-[#7096f0] font-[family-name:var(--font-space-grotesk)]">
                100+ Design Tokens
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">platforms</div>
              <div className="text-base sm:text-lg font-bold text-emerald-400 font-[family-name:var(--font-space-grotesk)]">
                iOS • Android • Web
              </div>
            </div>
          </div>
        </div>

        {/* Hero Tri-Stage Showcase Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 5 cols: Official Project Card Artwork */}
          <div
            onClick={() =>
              openLightbox(
                "/stron.png",
                "STRON — Ecosystem System Poster & Monogram",
                "1200 × 1600px • Electric Sapphire Radial & Tactical Grid",
                "Full-bleed visual identity poster showcasing the mathematical S-monogram logo and dark athletic UI framework.",
                0
              )
            }
            className="lg:col-span-5 relative aspect-[3/4] rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] bg-[#06070a] cursor-pointer group transition-all duration-500 hover:border-blue-500/40"
          >
            <Image
              src="/stron.png"
              alt="STRON Ecosystem Poster"
              fill
              priority
              unoptimized
              className="object-contain p-2 sm:p-4 group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 block">
                  identity system
                </span>
                <span className="text-sm sm:text-base font-medium font-[family-name:var(--font-space-grotesk)]">
                  stron brand &amp; system card
                </span>
              </div>
              <span className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                <Maximize2 className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>

          {/* Right 7 cols: Ecosystem Staged Mockups */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Top: MacBook Admin & Web Platform */}
            <div
              onClick={() =>
                openLightbox(
                  "/stron/hero-macbook-mockup.webp",
                  "STRON Admin Console & Web Platform",
                  "Desktop Operating System • React • Vite • Tailwind • TypeScript",
                  "The web admin dashboard designed and developed for gym managers, race coordinators, and operations staff.",
                  3
                )
              }
              className="relative aspect-[16/10] rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] bg-[#07080d] cursor-pointer group transition-all duration-500 hover:border-blue-500/40 p-4 sm:p-8 flex items-center justify-center"
            >
              <Image
                src="/stron/hero-macbook-mockup.webp"
                alt="STRON MacBook Mockup"
                fill
                unoptimized
                className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute top-5 left-6 text-white pointer-events-none">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 block">
                  designed &amp; developed
                </span>
                <span className="text-sm sm:text-base font-medium font-[family-name:var(--font-space-grotesk)]">
                  admin console &amp; marketing web platform
                </span>
              </div>
              <div className="absolute bottom-5 right-6 pointer-events-none">
                <span className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 inline-block">
                  <Maximize2 className="w-4 h-4 text-white" />
                </span>
              </div>
            </div>

            {/* Bottom: Dual Mobile Experiences (Social Racing + Gym Pass) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                onClick={() =>
                  openLightbox(
                    "/stron/engage-mockup-new.webp",
                    "STRON Competitive Fitness Racing",
                    "React Native / Expo • Real-Time Race Feed",
                    "Mobile race lobby, bracket challenges, and athlete telemetry.",
                    1
                  )
                }
                className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0c14] cursor-pointer group hover:border-blue-500/40 p-4"
              >
                <Image
                  src="/stron/engage-mockup-new.webp"
                  alt="STRON Competitive Racing"
                  fill
                  unoptimized
                  className="object-contain p-3 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-blue-400 block">
                    mobile ui/ux
                  </span>
                  <span className="text-xs font-medium font-[family-name:var(--font-space-grotesk)] truncate block">
                    competitive racing &amp; telemetry
                  </span>
                </div>
              </div>

              <div
                onClick={() =>
                  openLightbox(
                    "/stron/grow-mockup-new.webp",
                    "STRON Gym OS & Membership Pass",
                    "Dynamic QR Pass • Multi-City Club Booking",
                    "Location-indexed gym pass and booking workflows across partner locations.",
                    2
                  )
                }
                className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#08090f] cursor-pointer group hover:border-blue-500/40 p-4"
              >
                <Image
                  src="/stron/grow-mockup-new.webp"
                  alt="STRON Gym OS"
                  fill
                  unoptimized
                  className="object-contain p-3 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-blue-400 block">
                    mobile ui/ux
                  </span>
                  <span className="text-xs font-medium font-[family-name:var(--font-space-grotesk)] truncate block">
                    gym os &amp; qr membership
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN EDITORIAL CASE STUDY GRID */}
      {/* ========================================================================= */}
      <div className="px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto divide-y divide-white/[0.08]">
        {/* ========================================================================= */}
        {/* ( 01 ) ABOUT PROJECT & HARSHIT'S SCOPE */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span style={{ color: accent }} className="font-mono text-base sm:text-lg md:text-xl font-semibold">
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
              STRON is an athletic-premium fitness ecosystem bridging{" "}
              <span className="text-white font-medium">competitive fitness racing</span> with an end-to-end{" "}
              <span className="text-white font-medium">gym membership &amp; club operating system</span>.
              Built from scratch from 0→1, I led both the{" "}
              <span className="text-white font-medium">founding product design</span> and the{" "}
              <span className="text-white font-medium">full-stack frontend engineering</span> across the mobile application, admin console, and web platform.
            </p>

            {/* 6 Key Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                  1. Mobile App Design
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Engineered end-to-end UI/UX and React Native screens: race lobbies, step trackers, telemetry, and gym booking.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Flame className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                  2. Brand Identity &amp; Logo
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Crafted the mathematical S-monogram logo with electric sapphire radial gradient and comprehensive design tokens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                  3. App &amp; Play Store Screenshots
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Designed high-converting store listing assets, marketing frames, device mockups, and feature highlights.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                  4. E-Certificates of Achievement
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Architected the digital certification engine with official verification seals, corner ornaments, and social sharing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                  5. Admin Console (Developed)
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Designed and developed the full web admin dashboard (React, Vite, Tailwind, TS) for gym owners and event managers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                  6. Marketing Platform (Developed)
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Designed and built the official responsive STRON website: city gym directories, interactive mockups, and pricing tiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 02 ) THE BRAND LOGO & ATHLETIC DESIGN SYSTEM */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span style={{ color: accent }} className="font-mono text-base sm:text-lg md:text-xl font-semibold">
              ( 02 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              brand identity &amp; logo
            </h2>
            <p className="mt-2 text-xs font-mono text-white/40 uppercase tracking-widest">
              mathematical s-monogram
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              The STRON brand identity is anchored by a core principle:{" "}
              <span className="text-white font-medium">
                flat dark surfaces carry the UI, an electric blue gradient carries the brand, and color is never decorative — it always encodes status or meaning.
              </span>
            </p>

            {/* Interactive Logo Surface Showcase */}
            <div className="p-6 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#06070a] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
                    STRON Kinetic Monogram
                  </h3>
                  <p className="text-xs text-white/50 font-mono mt-0.5">
                    Vector precision • 207 × 254 viewBox • Electric Sapphire Radial
                  </p>
                </div>

                {/* Surface toggle buttons */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setLogoSurface("dark")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      logoSurface === "dark" ? "bg-white/15 text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    Dark OS (#050506)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoSurface("electric")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      logoSurface === "electric" ? "bg-blue-600/50 text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    Electric Void
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoSurface("gold")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      logoSurface === "gold" ? "bg-amber-500/30 text-amber-200" : "text-white/45 hover:text-white"
                    }`}
                  >
                    STRON PRO (#F0B83C)
                  </button>
                </div>
              </div>

              {/* Surface Container */}
              <div
                className={`relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl flex items-center justify-center p-8 transition-colors duration-500 border ${
                  logoSurface === "dark"
                    ? "bg-[#050506] border-white/10"
                    : logoSurface === "electric"
                    ? "bg-gradient-to-br from-[#0c1638] via-[#080d22] to-[#040610] border-blue-500/30"
                    : "bg-gradient-to-br from-[#1c1404] via-[#0d0901] to-[#050400] border-amber-500/30"
                }`}
              >
                {/* Background glow behind logo */}
                <div
                  className={`absolute w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
                    logoSurface === "gold"
                      ? "bg-amber-500/20"
                      : "bg-[#0067FF]/25"
                  }`}
                />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-28 sm:w-36 h-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/stron/stron-logo.svg"
                      alt="STRON Logo Monogram"
                      className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,103,255,0.4)]"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white font-[family-name:var(--font-space-grotesk)] block">
                      STRON
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                      competitive fitness racing &bull; gym os
                    </span>
                  </div>
                </div>
              </div>

              {/* Color Token Architecture */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#050506] border border-white/20" />
                    <span className="text-xs font-mono text-white/80">#050506</span>
                  </div>
                  <p className="text-[11px] text-white/40 font-[family-name:var(--font-space-grotesk)]">
                    --bg-page: canvas surface
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0067FF]" />
                    <span className="text-xs font-mono text-white/80">#0067FF</span>
                  </div>
                  <p className="text-[11px] text-white/40 font-[family-name:var(--font-space-grotesk)]">
                    --blue-brand: hero actions
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4CD964]" />
                    <span className="text-xs font-mono text-white/80">#4CD964</span>
                  </div>
                  <p className="text-[11px] text-white/40 font-[family-name:var(--font-space-grotesk)]">
                    --active: live events &amp; paid
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#F0B83C]" />
                    <span className="text-xs font-mono text-white/80">#F0B83C</span>
                  </div>
                  <p className="text-[11px] text-white/40 font-[family-name:var(--font-space-grotesk)]">
                    --gold-solid: STRON PRO tier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 03 ) MOBILE APP DESIGN & PRODUCTION SCREENS */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span style={{ color: accent }} className="font-mono text-base sm:text-lg md:text-xl font-semibold">
              ( 03 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              mobile app screens
            </h2>
            <p className="mt-2 text-xs font-mono text-white/40 uppercase tracking-widest">
              react native / expo app
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              I designed and built the complete user experience for the STRON React Native mobile app.
              The application combines <span className="text-white font-medium">competitive fitness challenges</span> (Step Races, King of the Hill, Virtual Marathons) with an intuitive <span className="text-white font-medium">Gym OS Pass</span> that lets members scan into crossfit boxes and fitness clubs across 5 major Indian metros.
            </p>

            {/* Screens Showcase Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                onClick={() =>
                  openLightbox(
                    "/stron/iphone-mockup-1.webp",
                    "STRON Mobile App — Athlete Dashboard",
                    "iPhone Presentation • Daily Activity Streak & Telemetry",
                    "Athletes track their daily step target, heart rate zones, upcoming races, and active gym memberships.",
                    4
                  )
                }
                className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#07090e] cursor-pointer group hover:border-blue-500/40 p-4"
              >
                <Image
                  src="/stron/iphone-mockup-1.webp"
                  alt="STRON Athlete View"
                  fill
                  unoptimized
                  className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block">
                      production app ui
                    </span>
                    <span className="text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
                      athlete dashboard &amp; streaks
                    </span>
                  </div>
                  <span className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </span>
                </div>
              </div>

              <div
                onClick={() =>
                  openLightbox(
                    "/stron/iphone-mockup-2.webp",
                    "STRON Mobile App — Race Arena",
                    "iPhone Presentation • Live Countdown & Leaderboards",
                    "Real-time racing arena where athletes compete head-to-head in step races and endurance circuits.",
                    5
                  )
                }
                className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#07090e] cursor-pointer group hover:border-blue-500/40 p-4"
              >
                <Image
                  src="/stron/iphone-mockup-2.webp"
                  alt="STRON Race Arena"
                  fill
                  unoptimized
                  className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block">
                      production app ui
                    </span>
                    <span className="text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
                      race arena &amp; bracket lobby
                    </span>
                  </div>
                  <span className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </span>
                </div>
              </div>
            </div>

            {/* Folder Dropzone Ready Notification */}
            <div className="p-5 rounded-2xl bg-blue-500/[0.05] border border-blue-500/20 flex items-start gap-4">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-white font-[family-name:var(--font-space-grotesk)]">
                  Dedicated Screens Directory Ready: <code className="text-blue-300 font-mono text-xs">public/stron/screens/</code>
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
                  The modular screen pipeline is fully wired. Once you drop your export screens into the folder, they will dynamically load into the high-res interactive lightbox.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 04 ) APP STORE & PLAY STORE SCREENSHOTS */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span style={{ color: accent }} className="font-mono text-base sm:text-lg md:text-xl font-semibold">
              ( 04 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              app &amp; play store
            </h2>
            <p className="mt-2 text-xs font-mono text-white/40 uppercase tracking-widest">
              store listing graphics
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              To maximize conversion on both the <span className="text-white font-medium">Apple App Store</span> and <span className="text-white font-medium">Google Play Store</span>, I designed an impactful suite of presentation frames.
              Each slide communicates a single value proposition with bold athletic typography and clean high-contrast device mockups.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <span className="text-xs font-mono text-blue-400 block">SLIDE 01 // RACING</span>
                <h4 className="text-base font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                  Race Against Real Athletes
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Turn daily step counts into thrilling competitive brackets and virtual marathons.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <span className="text-xs font-mono text-emerald-400 block">SLIDE 02 // GYM OS</span>
                <h4 className="text-base font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                  One Pass • All Gyms
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Instant QR door check-in at partner gyms and athletic crossfit boxes across 5 cities.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <span className="text-xs font-mono text-amber-400 block">SLIDE 03 // PRO TIER</span>
                <h4 className="text-base font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                  STRON PRO Membership
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Unlock unlimited event entries, coach consulting, and verified race certificates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 05 ) VERIFIED DIGITAL CERTIFICATES */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span style={{ color: accent }} className="font-mono text-base sm:text-lg md:text-xl font-semibold">
              ( 05 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              verified certificates
            </h2>
            <p className="mt-2 text-xs font-mono text-white/40 uppercase tracking-widest">
              proof of achievement
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              To celebrate race finishers, I designed the <span className="text-white font-medium">STRON Certificate of Achievement</span> engine (<code className="text-blue-300 font-mono text-xs">ECertificateModal.tsx</code>).
              Scaled dynamically to any device, it generates cryptographic verification badges, custom metallic corner plaques, race telemetry, and one-tap social shareable image exports.
            </p>

            {/* Certificate Visual Mockup */}
            <div className="p-8 sm:p-12 rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#0e111a] to-[#07090e] relative overflow-hidden space-y-6">
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-12 h-12 opacity-80 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/stron/certificate_corner.png" alt="Corner" className="w-full h-full object-contain" />
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 opacity-80 pointer-events-none rotate-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/stron/certificate_corner.png" alt="Corner" className="w-full h-full object-contain" />
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 opacity-80 pointer-events-none -rotate-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/stron/certificate_corner.png" alt="Corner" className="w-full h-full object-contain" />
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 opacity-80 pointer-events-none rotate-180">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/stron/certificate_corner.png" alt="Corner" className="w-full h-full object-contain" />
              </div>

              <div className="text-center space-y-4 max-w-xl mx-auto py-4">
                <div className="w-12 h-12 mx-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/stron/certificate_logo.png" alt="Certificate Emblem" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block">
                    official certificate of achievement
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)] mt-1">
                    STRON ATHLETIC RACING
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/70 italic font-[family-name:var(--font-space-grotesk)]">
                  &ldquo;This verified certificate is awarded to acknowledge official race completion, verified distance, and athletic endurance on the STRON network.&rdquo;
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono text-blue-300">
                    FINISHING TIME: 02h 38m
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-amber-300">
                    RANK: #12 OVERALL
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                    VERIFIED SECURE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 06 ) ADMIN CONSOLE & OPERATIONS SYSTEM */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span style={{ color: accent }} className="font-mono text-base sm:text-lg md:text-xl font-semibold">
              ( 06 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              admin console &amp; web
            </h2>
            <p className="mt-2 text-xs font-mono text-white/40 uppercase tracking-widest">
              design &amp; full-stack dev
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              In addition to consumer mobile apps, I designed and developed the{" "}
              <span className="text-white font-medium">STRON Admin Console</span> (Vite + React + Tailwind + TypeScript) and the{" "}
              <span className="text-white font-medium">official marketing website</span>.
              The admin console equips gym owners, race directors, and staff with operational superpowers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">
                  <QrCode className="w-4 h-4 text-blue-400" />
                  <span>Door Scanner &amp; QR Access</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Sub-second member check-in verification via live camera scanning and offline validation token fallback.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Race Staging &amp; Prize Pools</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Create custom step races, set entry fees, configure multi-tier prize pools, and lock competitive brackets.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Membership Audit &amp; Revenue</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Live MRR breakdowns, member renewal reminders, gym visit heatmap telemetry, and trainer commission tracking.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Marketing &amp; City Discovery Web</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  SEO-optimized city directory pages (Bangalore, Delhi, Mumbai, Pune) driving organic gym acquisition and race signups.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* NEXT PROJECT FOOTER BANNER */}
      {/* ========================================================================= */}
      <footer className="px-6 sm:px-12 md:px-16 py-20 sm:py-28 border-t border-white/[0.08] max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 block mb-2">
              next showcase
            </span>
            <Link
              href={nextProjectHref}
              className="text-3xl sm:text-5xl font-medium text-white font-[family-name:var(--font-space-grotesk)] hover:text-blue-400 transition-colors inline-flex items-center gap-3 group"
            >
              <span>Digital CD Studio</span>
              <ArrowRight className="w-6 h-6 sm:w-10 sm:h-10 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-2.5 rounded-full border border-white/15 text-xs sm:text-sm font-medium font-[family-name:var(--font-space-grotesk)] text-white hover:bg-white/[0.05] transition-colors"
              >
                ← back to overview
              </button>
            ) : (
              <Link
                href="/"
                className="px-5 py-2.5 rounded-full border border-white/15 text-xs sm:text-sm font-medium font-[family-name:var(--font-space-grotesk)] text-white hover:bg-white/[0.05] transition-colors"
              >
                ← back to overview
              </Link>
            )}
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-[family-name:var(--font-space-grotesk)]">
                  {lightbox.title}
                </h3>
                {lightbox.subtitle && (
                  <p className="text-xs text-white/50 font-mono mt-0.5">{lightbox.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-white/[0.08] hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Main Image Display */}
            <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-w-full max-h-full object-contain rounded-2xl border border-white/10 shadow-2xl"
                />
              </div>

              {/* Prev / Next Controls */}
              {lightbox.currentIndex !== -1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox("prev");
                    }}
                    className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox("next");
                    }}
                    className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            {lightbox.description && (
              <div className="text-center max-w-2xl mx-auto pt-2 text-xs sm:text-sm text-white/70 font-[family-name:var(--font-space-grotesk)]">
                {lightbox.description}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
