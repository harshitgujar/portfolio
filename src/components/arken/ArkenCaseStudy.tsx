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
  Sliders,
  Sparkles,
  Layers,
  Box,
  Monitor,
  Eye,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ShowcaseItem {
  id: string;
  category: "ui-ux" | "brand-3d";
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  src: string;
  isLongScroll?: boolean;
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
  isLongScroll?: boolean;
  currentIndex: number;
}

export interface ArkenCaseStudyProps {
  onBack?: () => void;
  nextProjectHref?: string;
  className?: string;
}

export function ArkenCaseStudy({
  onBack,
  nextProjectHref = "/spotify",
  className = "",
}: ArkenCaseStudyProps) {
  const { currentTheme } = useTheme();
  const accent = currentTheme?.previewColor || "#f04e23";

  const [activeFilter, setActiveFilter] = useState<"all" | "ui-ux" | "brand-3d">("all");
  const [wordmarkBg, setWordmarkBg] = useState<"dark" | "light" | "sky">("dark");
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: "",
    title: "",
    subtitle: "",
    description: "",
    isLongScroll: false,
    currentIndex: -1,
  });
  const [lightboxFitMode, setLightboxFitMode] = useState<"scroll" | "fit">("scroll");

  const showcaseItems: ShowcaseItem[] = useMemo(
    () => [
      // ================= UI/UX DESIGN SCREENS =================
      {
        id: "full-web-flagship",
        category: "ui-ux",
        step: "01",
        badge: "full landing page",
        title: "arken creatives — full desktop web ui",
        subtitle: "complete 1512 × 8047px flagship agency experience",
        src: "/arken/arken-full-web-ui.webp",
        isLongScroll: true,
        pixelDimensions: "1512 × 8047px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#f4f4f2]",
        objectFit: "cover",
        description:
          "End-to-end desktop web experience combining atmospheric cloud photography, 3D liquid-chrome typography, editorial project showcases, numbered capability tables, staggered director portraits, and a high-contrast mascot footer.",
      },
      {
        id: "ui-hero-section",
        category: "ui-ux",
        step: "02",
        badge: "hero & navigation",
        title: "peak performance starts here — hero stage",
        subtitle: "skyline atmosphere, 4-pill nav & monumental chrome logo",
        src: "/arken/sections/01-hero-section.png",
        isLongScroll: false,
        pixelDimensions: "1512 × 920px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#dce6f2]",
        objectFit: "cover",
        description:
          "Above-the-fold agency statement ('Peak Performance Starts Here') paired with floating translucent navigation pills (HOME, TEAM, SERVICES, CONTACT) and the oversized 3D chrome Arken wordmark.",
      },
      {
        id: "ui-projects-showcase",
        category: "ui-ux",
        step: "03",
        badge: "work showcase",
        title: "projects — 'what we do' editorial rail",
        subtitle: "layered chrome calligraphy over swiss grid typography",
        src: "/arken/sections/02-projects-showcase.webp",
        isLongScroll: false,
        pixelDimensions: "1512 × 1360px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#f4f4f2]",
        objectFit: "cover",
        description:
          "Juxtaposes clean geometric 'PROJECTS' display type with 3D liquid-chrome 'WHAT WE DO' script lettering, framing the Monolith Studio Global case study carousel and pill action.",
      },
      {
        id: "ui-manifesto-monogram",
        category: "ui-ux",
        step: "04",
        badge: "manifesto & emblem",
        title: "founder manifesto & steel 'k' plaque",
        subtitle: "brutalist statement over orbital star watermark",
        src: "/arken/sections/03-manifesto-monogram.webp",
        isLongScroll: false,
        pixelDimensions: "1512 × 1315px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#f4f4f2]",
        objectFit: "cover",
        description:
          "All-caps agency manifesto built for founders who demand dominance, centered above the tactile brushed-steel 'K' monogram plate bolted with four machined corner screws.",
      },
      {
        id: "ui-services-index",
        category: "ui-ux",
        step: "05",
        badge: "capabilities matrix",
        title: "services — 'what we can do' numbered index",
        subtitle: "01 ui/ux • 02 branding • 03 web dev • 04 app dev",
        src: "/arken/sections/04-services-index.webp",
        isLongScroll: false,
        pixelDimensions: "1512 × 1050px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#f4f4f2]",
        objectFit: "cover",
        description:
          "Minimalist horizontal rule table listing core studio disciplines (01 UI/UX Design, 02 Branding, 03 Web Development, 04 App Development) anchored by custom 3D orbital chrome star indicators.",
      },
      {
        id: "ui-team-editorial",
        category: "ui-ux",
        step: "06",
        badge: "leadership layout",
        title: "meet our team — staggered director grid",
        subtitle: "harshit gujar, amaan ahmed & mukunda bhanot",
        src: "/arken/sections/05-team-editorial.webp",
        isLongScroll: true,
        pixelDimensions: "1512 × 2480px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#f4f4f2]",
        objectFit: "cover",
        description:
          "Repeating 'MEET OUR TEAM' marquee separated by interlocking double-X chrome stars, leading into an asymmetric editorial portrait layout pinned with 4-point metallic star badges.",
      },
      {
        id: "ui-footer-cta",
        category: "ui-ux",
        step: "07",
        badge: "conversion footer",
        title: "let's work together — 3d mascot footer",
        subtitle: "high-contrast pitch black stage with floating plush mascot",
        src: "/arken/sections/06-footer-cta.png",
        isLongScroll: false,
        pixelDimensions: "1512 × 979px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-black",
        objectFit: "cover",
        description:
          "Full-bleed black footer ('Where Vision Meets Absolute Execution') with custom sheared 'lets work together' display type and the 3D knit bunny mascot suspended at center.",
      },

      // ================= BRAND IDENTITY & 3D ASSETS =================
      {
        id: "brand-teaser-poster",
        category: "brand-3d",
        step: "08",
        badge: "campaign poster",
        title: "a glimpse behind the curtain — 3d keychain poster",
        subtitle: "2284 × 4096px photorealistic studio teaser artwork",
        src: "/arken/glimpse-behind-curtain-poster.webp",
        isLongScroll: false,
        pixelDimensions: "2284 × 4096px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#8d8f92]",
        objectFit: "cover",
        description:
          "High-fashion 3D promotional poster showcasing a chrome keyring with a sculpted 4-point star charm, suspended 'arken' wordmark, and baby-blue fur pom-pom bearing the metallic 'K' monogram.",
      },
      {
        id: "brand-mascot-character",
        category: "brand-3d",
        step: "09",
        badge: "3d character design",
        title: "arken knit-balaclava plush mascot",
        subtitle: "custom 3d character modeling & tactile material shaders",
        src: "/arken/arken-mascot-bunny.png",
        isLongScroll: false,
        pixelDimensions: "608 × 611px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#14161c]",
        objectFit: "contain",
        description:
          "Signature studio collectible figure featuring procedural white ribbed knitwear on the balaclava mask, distressed blue denim ears, pierced chrome stars, stitched 'X' details, and chrome chest emblem.",
      },
      {
        id: "brand-chrome-wordmark",
        category: "brand-3d",
        step: "10",
        badge: "primary logotype",
        title: "arken 3d liquid-chrome wordmark",
        subtitle: "custom display lettering with spiked 'k' ascender",
        src: "/arken/arken-title-logo.png",
        isLongScroll: false,
        pixelDimensions: "1512 × 558px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#0e1015]",
        objectFit: "contain",
        description:
          "Bespoke italicized logotype engineered with sharp bevel extrusions, high-contrast studio reflection maps, and a signature blade-like ascender on the 'k'.",
      },
      {
        id: "brand-steel-monogram",
        category: "brand-3d",
        step: "11",
        badge: "industrial monogram",
        title: "machined steel 'k' emblem plaque",
        subtitle: "recessed negative-space glyph with corner hardware screws",
        src: "/arken/k-monogram-plaque.png",
        isLongScroll: false,
        pixelDimensions: "687 × 714px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#14161c]",
        objectFit: "contain",
        description:
          "Secondary brand mark housed inside a dark anodized metal plate with four radial-brushed screw heads and an inset soft-shadow 'K' silhouette.",
      },
      {
        id: "brand-sticker-kit",
        category: "brand-3d",
        step: "12",
        badge: "physical artifacts & merch",
        title: "tactile brand merchandise & sticker specimen sheet",
        subtitle: "1987 × 2484px • jewel case cd, 3d chrome keychains & die-cut decals",
        src: "/arken/arken-sticker-sheet-artifacts.webp",
        isLongScroll: false,
        pixelDimensions: "1987 × 2484px",
        aspectClass: "aspect-[4/5]",
        bgClass: "bg-[#1c2c4d]",
        objectFit: "cover",
        description:
          "Comprehensive physical merchandise sheet showcasing Arken jewel-case CD audio edition ('ARKEN CREATIVES AUDIO PRODUCTION', barcode 4 017866 ARKEN1), sculpted chrome star keyrings, Helvetica specimen, plush mascot decals, and numbered Series One specimen plates.",
      },
      {
        id: "brand-vision-eye",
        category: "brand-3d",
        step: "13",
        badge: "brand campaign poster",
        title: "vision in focus — macro iris campaign key visual",
        subtitle: "1536 × 2752px • macro eye photography with luminous green pupil logo",
        src: "/arken/arken-vision-eye-campaign.webp",
        isLongScroll: false,
        pixelDimensions: "1536 × 2752px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#060b0d]",
        objectFit: "cover",
        description:
          "Cinematic macro close-up of human eye optics with an emerald pupil radiance housing the glowing Arken Creatives wordmark, expressing the studio's obsession with razor-sharp execution and creative clarity.",
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
    isLongScroll?: boolean,
    index: number = -1
  ) => {
    setLightbox({
      isOpen: true,
      src,
      title,
      subtitle,
      description,
      isLongScroll,
      currentIndex: index,
    });
    setLightboxFitMode(isLongScroll ? "scroll" : "fit");
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
      isLongScroll: item.isLongScroll,
      currentIndex: nextIdx,
    });
    setLightboxFitMode(item.isLongScroll ? "scroll" : "fit");
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
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-[family-name:var(--font-space-grotesk)] text-xs sm:text-sm text-white/40 tracking-wider">
            2025 – Present
          </span>
          <a
            href="https://arkencreatives.tech"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: accent }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white font-[family-name:var(--font-space-grotesk)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>arkencreatives.tech</span>
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
            <h1 className="text-7xl sm:text-9xl md:text-[140px] font-normal tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-[0.9]">
              Arken
            </h1>
            <div className="mt-5 space-y-1 text-sm sm:text-base text-white/70 font-[family-name:var(--font-space-grotesk)] lowercase tracking-wide">
              <p>brand identity system, 3d mascot worldbuilding &amp; flagship web ui/ux</p>
              <p className="text-white/45">
                0→1 creative studio identity, tactile chrome artifacts &amp; digital experience
              </p>
            </div>
          </div>

          {/* Primary Live Website CTA Button */}
          <a
            href="https://arkencreatives.tech"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: accent }}
            className="self-start md:self-end inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-medium text-white font-[family-name:var(--font-space-grotesk)] transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] group flex-shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span>visit arkencreatives.tech</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Hero Dual-Stage Showcase Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 cols: Full-bleed Sky + 3D Mascot + Chrome Wordmark Hero Stage */}
          <div
            onClick={() =>
              openLightbox(
                "/arken/sections/01-hero-section.png",
                "Arken Creatives — Flagship Web Hero",
                "Peak Performance Starts Here",
                "Hero section of the Arken Creatives web experience combining atmospheric sky imagery with the 3D liquid-chrome wordmark.",
                false,
                1
              )
            }
            className="lg:col-span-8 relative aspect-[16/10] rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] bg-[#dce6f2] cursor-pointer group transition-all duration-500 hover:border-white/25"
          >
            <Image
              src="/arken/sections/01-hero-section.png"
              alt="Arken Creatives Hero UI"
              fill
              priority
              unoptimized
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/75 block">
                  flagship web ui • hero stage
                </span>
                <span className="text-sm sm:text-base font-medium font-[family-name:var(--font-space-grotesk)]">
                  peak performance starts here
                </span>
              </div>
              <span className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                <Maximize2 className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>

          {/* Right 4 cols: The 3D Keychain Teaser Poster ("A Glimpse Behind The Curtain") */}
          <div
            onClick={() =>
              openLightbox(
                "/arken/glimpse-behind-curtain-poster.webp",
                "A Glimpse Behind The Curtain — Brand Teaser Poster",
                "3D Chrome Keyring, Fur Pom-Pom & Metallic Charm Render",
                "High-resolution studio campaign poster introducing Arken's signature textures, chrome hardware, and subculture energy.",
                false,
                7
              )
            }
            className="lg:col-span-4 relative aspect-[3/4] lg:aspect-auto min-h-[360px] rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] bg-[#7a7c80] cursor-pointer group transition-all duration-500 hover:border-white/25"
          >
            <Image
              src="/arken/glimpse-behind-curtain-poster.webp"
              alt="A Glimpse Behind The Curtain Poster"
              fill
              priority
              unoptimized
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/75 block">
                  3d brand campaign poster
                </span>
                <span className="text-sm sm:text-base font-medium font-[family-name:var(--font-space-grotesk)]">
                  a glimpse behind the curtain
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
              Arken Creatives is a 0→1 creative design and technology agency founded to build
              enduring brand identities and high-converting digital flagships. Moving away from
              sterile, cookie-cutter corporate agency templates, we crafted a visual universe rooted
              in tactile 3D liquid chrome, collectible streetwear plush culture, machined steel
              hardware, and razor-sharp editorial typography.
            </p>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              &ldquo;We are for the founders who stay up late obsessed with the &lsquo;how.&rsquo;
              We are for the leaders who demand more than just &lsquo;exposure&rsquo;—they demand
              dominance. We are for the visionaries who know that a great idea is worthless without
              a relentless machine to drive it forward.&rdquo;
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-white/60 font-[family-name:var(--font-space-grotesk)]">
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  role
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  Founder &amp; Creative Director
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  leadership team
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  Harshit, Amaan &amp; Mukunda
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  scope
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  Brand Identity, 3D &amp; Web UI
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  tools
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  Figma, Blender 3D, Adobe Suite
                </span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  live website
                </span>
                <a
                  href="https://arkencreatives.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accent }}
                  className="font-medium mt-1 inline-flex items-center gap-1 hover:underline"
                >
                  <span>arkencreatives.tech</span>
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
                Our goal was to architect a cohesive 360° brand identity and flagship web interface
                where physical-feeling 3D objects—chrome emblems, brushed metal plaques, and knit
                mascot characters—live seamlessly inside a fast, editorial UI/UX system.
              </p>
            </div>

            {/* Connected Stage Pills Track (Clean flat pills with zero drop shadow) */}
            <div className="pt-4 overflow-x-auto pb-4">
              <div className="min-w-[760px] space-y-6">
                <div className="relative flex items-center justify-between">
                  <div className="absolute top-1/2 left-8 right-8 h-[1.5px] bg-white/20 -translate-y-1/2 z-0" />

                  {[
                    "worldbuilding",
                    "brand identity",
                    "3d artifacts",
                    "web ui/ux design",
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
                      "( studio positioning )",
                      "( founder manifesto )",
                      "( creative direction )",
                    ],
                    [
                      "( 3d chrome wordmark )",
                      "( steel 'k' monogram )",
                      "( chrome script overlays )",
                    ],
                    [
                      "( knit bunny mascot )",
                      "( keychain teaser poster )",
                      "( metallic star pins )",
                    ],
                    [
                      "( 8047px web flagship )",
                      "( services & work rail )",
                      "( editorial team grid )",
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
                The Arken visual identity is built around a deliberate contrast between{" "}
                <span className="text-white font-medium">heavy industrial hardware</span> and{" "}
                <span className="text-white font-medium">fluid, specular liquid chrome</span>. Every
                brand mark was modeled and lit in 3D so it behaves like a real physical artifact
                rather than a flat vector glyph.
              </p>
            </div>

            {/* ( a ) Primary 3D Chrome Wordmark Interactive Stage */}
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
                    primary 3d liquid-chrome wordmark
                  </span>
                </div>

                {/* Surface Switcher to inspect the transparent PNG logo on different backgrounds */}
                <div className="flex items-center gap-1.5">
                  {(["dark", "light", "sky"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setWordmarkBg(mode)}
                      style={{
                        backgroundColor:
                          wordmarkBg === mode ? accent : "rgba(255,255,255,0.05)",
                        color: wordmarkBg === mode ? "#ffffff" : "rgba(255,255,255,0.6)",
                      }}
                      className="px-3 py-1 rounded-full text-xs font-mono lowercase transition-all cursor-pointer"
                    >
                      {mode} surface
                    </button>
                  ))}
                </div>
              </div>

              <div
                onClick={() =>
                  openLightbox(
                    "/arken/arken-title-logo.png",
                    "Arken 3D Liquid-Chrome Wordmark",
                    "Primary Custom Logotype (1512 × 558px)",
                    "Custom-modeled 3D chrome wordmark with razor-sharp beveled edges and a spiked ascender on the 'k'.",
                    false,
                    9
                  )
                }
                className={`relative w-full h-56 sm:h-72 rounded-3xl overflow-hidden border border-white/[0.08] flex items-center justify-center p-8 sm:p-12 cursor-pointer group transition-all duration-500 ${
                  wordmarkBg === "dark"
                    ? "bg-[#090a0f]"
                    : wordmarkBg === "light"
                    ? "bg-[#f4f4f2]"
                    : "bg-gradient-to-b from-[#b8cee8] via-[#d9e5f3] to-[#f2f5f8]"
                }`}
              >
                <div className="relative w-full h-full max-w-2xl">
                  <Image
                    src="/arken/arken-title-logo.png"
                    alt="Arken 3D Chrome Wordmark"
                    fill
                    unoptimized
                    className="object-contain group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <span
                  className={`absolute bottom-4 right-5 text-[10px] font-mono uppercase tracking-widest ${
                    wordmarkBg === "dark" ? "text-white/40" : "text-black/45"
                  }`}
                >
                  1512 × 558px transparent 3d render • click to zoom
                </span>
              </div>
            </div>

            {/* ( b ) Secondary Monogram & Chrome Script Overlays */}
            <div className="space-y-5 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span
                  style={{ color: accent }}
                  className="font-mono text-base sm:text-lg font-semibold"
                >
                  ( b )
                </span>
                <span className="text-lg sm:text-xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                  machined steel &lsquo;k&rsquo; monogram &amp; calligraphic chrome overlays
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left: Industrial Steel K Plaque */}
                <div
                  onClick={() =>
                    openLightbox(
                      "/arken/k-monogram-plaque.png",
                      "Machined Steel 'K' Monogram Plaque",
                      "Secondary Brand Emblem (687 × 714px)",
                      "Heavy industrial anodized steel plate bolted with 4 radial-brushed corner screws and a recessed bevel-carved 'K' mark.",
                      false,
                      10
                    )
                  }
                  className="md:col-span-5 rounded-3xl border border-white/[0.08] bg-[#12141a] p-6 sm:p-8 flex flex-col justify-between items-center cursor-pointer group hover:border-white/25 transition-all"
                >
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-auto">
                    <Image
                      src="/arken/k-monogram-plaque.png"
                      alt="Arken K Monogram Plaque"
                      fill
                      unoptimized
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-white font-medium block lowercase font-[family-name:var(--font-space-grotesk)]">
                        industrial &lsquo;k&rsquo; plaque
                      </span>
                      <span className="text-white/45 text-[11px]">
                        recessed glyph + 4 machined screws
                      </span>
                    </div>
                    <Maximize2 style={{ color: accent }} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Right: The two 3D Chrome Calligraphic Script Titles + 3 Hardware Icons */}
                <div className="md:col-span-7 flex flex-col justify-between gap-6">
                  {/* Chrome Script Overlays */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() =>
                        openLightbox(
                          "/arken/what-we-do-chrome.png",
                          "'WHAT WE DO' — 3D Chrome Script",
                          "Section Header Calligraphic Overlay",
                          "Custom 3D chrome brush script overlaid across geometric sans-serif section headers."
                        )
                      }
                      className="rounded-2xl border border-white/[0.08] bg-[#f4f4f2] p-5 flex flex-col justify-between cursor-pointer group hover:border-white/30 transition-all"
                    >
                      <div className="relative w-full h-24">
                        <Image
                          src="/arken/what-we-do-chrome.png"
                          alt="What We Do Chrome Script"
                          fill
                          unoptimized
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[11px] text-neutral-700 font-mono">
                        <span>&ldquo;what we do&rdquo; script</span>
                        <span>853 × 202px</span>
                      </div>
                    </div>

                    <div
                      onClick={() =>
                        openLightbox(
                          "/arken/what-we-can-do-chrome.png",
                          "'WHAT WE CAN DO' — 3D Chrome Script",
                          "Services Header Calligraphic Overlay",
                          "High-gloss dark chrome script lettering used to accent the Services & Capabilities index."
                        )
                      }
                      className="rounded-2xl border border-white/[0.08] bg-[#f4f4f2] p-5 flex flex-col justify-between cursor-pointer group hover:border-white/30 transition-all"
                    >
                      <div className="relative w-full h-24">
                        <Image
                          src="/arken/what-we-can-do-chrome.png"
                          alt="What We Can Do Chrome Script"
                          fill
                          unoptimized
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[11px] text-neutral-700 font-mono">
                        <span>&ldquo;what we can do&rdquo; script</span>
                        <span>1230 × 744px</span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Metallic Micro-Hardware Icons */}
                  <div className="rounded-2xl border border-white/[0.08] bg-[#12141a] p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                        custom 3d metallic hardware &amp; UI micro-icons
                      </span>
                      <span style={{ color: accent }} className="text-[11px] font-mono">
                        3 bespoke assets
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          src: "/arken/bound-metal-emblem.png",
                          name: "bound metal x",
                          usage: "team marquee divider",
                        },
                        {
                          src: "/arken/name-tag-star.png",
                          name: "4-point star pin",
                          usage: "director card badge",
                        },
                        {
                          src: "/arken/orbital-star-icon.png",
                          name: "orbital ring star",
                          usage: "service row action",
                        },
                      ].map((ico) => (
                        <div
                          key={ico.name}
                          onClick={() =>
                            openLightbox(ico.src, ico.name, ico.usage, "Custom 3D metallic icon asset.")
                          }
                          className="rounded-xl bg-[#f4f4f2] p-3 flex flex-col items-center text-center cursor-pointer group hover:scale-[1.02] transition-transform"
                        >
                          <div className="relative w-12 h-12 mb-2">
                            <Image
                              src={ico.src}
                              alt={ico.name}
                              fill
                              unoptimized
                              className="object-contain"
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-neutral-900 lowercase font-[family-name:var(--font-space-grotesk)]">
                            {ico.name}
                          </span>
                          <span className="text-[9.5px] text-neutral-500 font-mono">
                            {ico.usage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 04 ) 3D MASCOT & CAMPAIGN WORLDBUILDING */}
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
              3d character &amp; worldbuilding
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              Inspired by designer art toys and underground streetwear drops, we created the{" "}
              <span className="text-white font-medium">Arken Knit-Balaclava Bunny</span> and the{" "}
              <span className="text-white font-medium">Chrome Keychain Teaser</span> to give the
              studio an unmistakable, collectible identity across social campaigns and web touchpoints.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: Transparent 3D Plush Mascot Render */}
              <div
                onClick={() =>
                  openLightbox(
                    "/arken/arken-mascot-bunny.png",
                    "Arken 3D Knit-Balaclava Plush Mascot",
                    "Character Design & Procedural Material Study",
                    "Features procedural white knitwear, distressed denim ears, chrome star studs, ear hoop ring, and the chrome Arken chest wordmark.",
                    false,
                    8
                  )
                }
                className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#161922] to-[#0c0d12] p-6 sm:p-8 flex flex-col justify-between cursor-pointer group hover:border-white/25 transition-all"
              >
                <div className="relative w-full aspect-square max-h-[300px] mx-auto">
                  <Image
                    src="/arken/arken-mascot-bunny.png"
                    alt="Arken 3D Plush Mascot"
                    fill
                    unoptimized
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-5 mt-4 border-t border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: accent }}
                      className="font-mono text-xs uppercase tracking-wider font-semibold"
                    >
                      character 01 • studio mascot
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                    knit-balaclava denim bunny
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Textured white balaclava mask, washed denim ears with chrome star piercings,
                    stitched black &lsquo;X&rsquo; accents, and liquid-chrome chest plate.
                  </p>
                </div>
              </div>

              {/* Card 2: Sky Edition Cover Artwork (/arken.png) */}
              <div
                onClick={() =>
                  openLightbox(
                    "/arken.png",
                    "Arken Mascot — Sky Edition Key Visual",
                    "Official Portfolio Cover & Campaign Artwork",
                    "Full-bleed atmospheric sky composite featuring the Arken 3D plush mascot floating in daylight clouds."
                  )
                }
                className="rounded-3xl border border-white/[0.08] bg-[#161922] overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-white/25 transition-all"
              >
                <div className="relative w-full aspect-square max-h-[320px] overflow-hidden">
                  <Image
                    src="/arken.png"
                    alt="Arken Sky Edition"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-2 bg-[#12141a] border-t border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: accent }}
                      className="font-mono text-xs uppercase tracking-wider font-semibold"
                    >
                      key visual 02 • sky composite
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                    cloud atmosphere &amp; lighting study
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    High-altitude cloud environment that carries directly into the hero banner of
                    the flagship desktop website.
                  </p>
                </div>
              </div>

              {/* Card 3: Macro Iris Brand Campaign Key Visual */}
              <div
                onClick={() =>
                  openLightbox(
                    "/arken/arken-vision-eye-campaign.webp",
                    "Vision in Focus — Macro Iris Campaign Key Visual",
                    "Optical Brand Identity & Macro Campaign (1536 × 2752px)",
                    "Cinematic macro photography of human eye optics with an emerald pupil radiance housing the glowing Arken Creatives wordmark, expressing hyper-detailed precision and creative clarity.",
                    false,
                    12
                  )
                }
                className="rounded-3xl border border-white/[0.08] bg-[#0c0e14] overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-white/25 transition-all"
              >
                <div className="relative w-full aspect-square max-h-[320px] overflow-hidden bg-black">
                  <Image
                    src="/arken/arken-vision-eye-campaign.webp"
                    alt="Arken Iris Campaign Key Visual"
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-2 bg-[#10121a] border-t border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: accent }}
                      className="font-mono text-xs uppercase tracking-wider font-semibold"
                    >
                      campaign visual 03 • optical identity
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                    the creative vision — macro iris
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Cinematic macro iris close-up featuring an emerald pupil luminescence revealing
                    the glowing Arken Creatives insignia.
                  </p>
                </div>
              </div>

              {/* Card 4: Physical Merch & Sticker Specimen Sheet */}
              <div
                onClick={() =>
                  openLightbox(
                    "/arken/arken-sticker-sheet-artifacts.webp",
                    "Arken Tactile Brand Merchandise & Sticker Kit",
                    "Physical Brand Specimen & Jewel Case CD (1987 × 2484px)",
                    "Comprehensive physical merchandise sheet showcasing Arken jewel-case CD audio edition ('ARKEN CREATIVES AUDIO PRODUCTION', barcode 4 017866 ARKEN1), sculpted chrome star keyrings, Helvetica specimen, plush mascot decals, and numbered Series One specimen plates.",
                    false,
                    11
                  )
                }
                className="rounded-3xl border border-white/[0.08] bg-[#10192e] overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-white/25 transition-all"
              >
                <div className="relative w-full aspect-square max-h-[320px] overflow-hidden bg-[#182744]">
                  <Image
                    src="/arken/arken-sticker-sheet-artifacts.webp"
                    alt="Arken Sticker Specimen Sheet & CD Edition"
                    fill
                    unoptimized
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-2 bg-[#12141a] border-t border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: accent }}
                      className="font-mono text-xs uppercase tracking-wider font-semibold"
                    >
                      artifacts 04 • tactile merchandise
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                    collector&rsquo;s sticker kit &amp; audio cd
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Jewel-case CD audio release with barcode, 3D chrome keychains, interlocking star
                    specimen 007/500, and die-cut decals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 05 ) UI/UX DESIGN & INTERACTIVE FULL-PAGE PROTOTYPE */}
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
              ui/ux design &amp; web flagship
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                Designed at a native <span className="text-white font-medium">1512 × 8047px</span>{" "}
                MacBook Pro 14&Prime; viewport, the Arken website balances high-impact 3D brand
                moments with disciplined Swiss grid layout. Below is an{" "}
                <span className="text-white font-medium">interactive scrollable viewport</span> of
                the complete landing page design—scroll directly inside the browser frame or open it
                in full-screen mode.
              </p>
            </div>

            {/* Interactive MacBook Pro Browser Viewport (Scrollable 8047px Canvas) */}
            <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#16181f] shadow-2xl">
              {/* Browser Chrome Top Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#0e1015] border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 inline-block" />
                </div>
                <a
                  href="https://arkencreatives.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[11px] font-mono text-white/75 hover:text-white transition-colors truncate max-w-xs sm:max-w-md inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 opacity-70" />
                  <span>https://arkencreatives.tech</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href="https://arkencreatives.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: accent }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium text-white font-[family-name:var(--font-space-grotesk)] hover:opacity-90 transition-opacity"
                  >
                    <span>visit site</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        "/arken/arken-full-web-ui.webp",
                        "Arken Creatives — Full Desktop Web UI (1512 × 8047px)",
                        "Complete End-to-End Landing Page Design",
                        "Scrollable high-resolution desktop interface.",
                        true,
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

              {/* Scrollable Viewport Container */}
              <div className="relative w-full h-[520px] sm:h-[680px] overflow-y-auto overflow-x-hidden bg-[#f4f4f2] scrollbar-thin">
                <Image
                  src="/arken/arken-full-web-ui.webp"
                  alt="Arken Full Desktop Website UI/UX Design"
                  width={1512}
                  height={8047}
                  unoptimized
                  className="w-full h-auto block"
                />
              </div>

              {/* Bottom Status Bar */}
              <div className="px-5 py-2.5 bg-[#0e1015] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/45">
                <span>↕ scroll inside frame to explore all 6 page sections</span>
                <span>1512 × 8047px hi-fi canvas</span>
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
                  Dual-Layer Typography System
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Clean geometric sans-serif headings (`PROJECTS`, `SERVICES`) act as structural
                  scaffolding underneath expressive 3D liquid-chrome script overlays (`WHAT WE DO`,
                  `WHAT WE CAN DO`).
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
                  Tactile Noise-Paper Canvas
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  A warm `#F4F4F2` fine-grain paper background gives the specular metallic 3D assets
                  and drop shadows physical depth and gallery-grade contrast.
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
                  Asymmetric Editorial Rhythm
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Staggered director cards (Harshit Gujar, Amaan Ahmed, Mukunda Bhanot) break rigid
                  symmetry while maintaining strict vertical grid alignment.
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
                  High-Contrast Pitch-Black Finale
                </h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  The page transitions abruptly from light editorial paper into a `#000000` footer
                  stage where the 3D bunny mascot floats over oversized sheared typography.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 06 ) SCREENS & BRAND ARTIFACTS GALLERY */}
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
                Every UI/UX section and 3D brand identity artifact from the Arken Creatives system.
                Click any card to open the full-resolution lightbox inspector.
              </p>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {[
                  { id: "all", label: "all (13)" },
                  { id: "ui-ux", label: "ui/ux screens (7)" },
                  { id: "brand-3d", label: "brand & 3d (6)" },
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
                        item.isLongScroll,
                        globalIndex
                      )
                    }
                    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#101116] p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-[var(--accent)] hover:shadow-xl"
                  >
                    {/* Header Info */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between text-xs font-[family-name:var(--font-space-grotesk)]">
                        <span style={{ color: accent }} className="font-mono font-semibold">
                          ( {item.step} )
                        </span>
                        <span className="text-white/40 uppercase text-[10px] tracking-wider font-mono">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[var(--accent)] transition-colors lowercase leading-snug font-[family-name:var(--font-space-grotesk)]">
                        {item.title}
                      </h4>
                    </div>

                    {/* Visual Viewport */}
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
                            : item.isLongScroll
                            ? "object-cover object-top"
                            : "object-cover object-center"
                        } group-hover:scale-[1.03] transition-transform duration-500`}
                      />

                      {item.pixelDimensions && (
                        <div className="absolute inset-x-0 bottom-0 py-1.5 px-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-between">
                          <span className="text-[10px] font-mono text-white/75">
                            {item.isLongScroll ? "scrollable" : "hi-res"}
                          </span>
                          <span style={{ color: accent }} className="text-[10px] font-mono">
                            {item.pixelDimensions}
                          </span>
                        </div>
                      )}

                      {/* Hover Zoom Indicator */}
                      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 style={{ color: accent }} className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Description */}
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
        {/* ( 07 ) TAKEAWAYS */}
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
                01. tactile 3d artifacts anchor digital memory
              </h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                In a sea of flat SaaS landing pages, anchoring an agency&apos;s identity around
                collectible-grade 3D objects—a knit balaclava mascot, a bolted steel monogram plate,
                and liquid-chrome typography—creates immediate visceral recall.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
              <h4 className="text-white font-medium text-base sm:text-lg">
                02. contrast between chaos and swiss order
              </h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Expressive 3D chrome calligraphy (`WHAT WE DO`, `WHAT WE CAN DO`) works best when
                grounded by ultra-clean editorial grids, numbered service rows, and generous
                negative space.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
              <h4 className="text-white font-medium text-base sm:text-lg">
                03. worldbuilding before campaigning
              </h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Designing the teaser campaign (*&ldquo;A Glimpse Behind The Curtain&rdquo;*)
                alongside the flagship web UI ensured that every chrome star pin, texture, and tone
                spoke the exact same visual language from day one.
              </p>
            </div>

            {/* Live Flagship Website CTA Banner */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#12141b] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <span
                  style={{ color: accent }}
                  className="font-mono text-xs uppercase tracking-widest font-semibold block"
                >
                  live digital flagship
                </span>
                <h4 className="text-lg sm:text-xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                  experience arken creatives live on the web
                </h4>
                <p className="text-xs sm:text-sm text-white/55">
                  Explore the deployed agency flagship at arkencreatives.tech
                </p>
              </div>
              <a
                href="https://arkencreatives.tech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: accent }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white font-[family-name:var(--font-space-grotesk)] transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] group flex-shrink-0"
              >
                <Globe className="w-4 h-4" />
                <span>visit arkencreatives.tech</span>
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
          Arken Creatives — Brand Identity &amp; UI/UX Case Study • Harshit Gujar
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[94vh] w-full flex flex-col rounded-3xl overflow-hidden border border-white/15 bg-[#0a0c10] shadow-2xl"
            >
              {/* Lightbox Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/60">
                <div className="space-y-0.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)] lowercase">
                      {lightbox.title}
                    </h3>
                    {lightbox.currentIndex !== -1 && (
                      <span
                        style={{
                          color: accent,
                          borderColor: `${accent}40`,
                          backgroundColor: `${accent}15`,
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-mono border"
                      >
                        {lightbox.currentIndex + 1} / {showcaseItems.length}
                      </span>
                    )}
                  </div>
                  {lightbox.subtitle && (
                    <p style={{ color: accent }} className="text-xs font-mono lowercase">
                      {lightbox.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {lightbox.isLongScroll && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxFitMode(lightboxFitMode === "scroll" ? "fit" : "scroll")
                      }
                      className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-xs text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sliders style={{ color: accent }} className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {lightboxFitMode === "scroll" ? "fit window" : "scroll full width"}
                      </span>
                    </button>
                  )}

                  {lightbox.currentIndex !== -1 && (
                    <div className="flex items-center gap-1 border-x border-white/10 px-2 mx-1">
                      <button
                        type="button"
                        onClick={() => navigateLightbox("prev")}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="Previous item"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateLightbox("next")}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="Next item"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="p-2 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Viewport */}
              <div className="relative flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-black/90 min-h-[350px] max-h-[78vh]">
                {lightbox.isLongScroll && lightboxFitMode === "scroll" ? (
                  <div className="w-full max-w-4xl mx-auto py-2 self-start">
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#f4f4f2]">
                      <Image
                        src={lightbox.src}
                        alt={lightbox.title}
                        width={1512}
                        height={8047}
                        unoptimized
                        className="w-full h-auto object-contain block"
                        priority
                      />
                    </div>
                    <p className="text-center text-xs text-white/40 mt-3 font-mono">
                      scroll down to inspect the full resolution canvas
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full h-[65vh] sm:h-[72vh]">
                    <Image
                      src={lightbox.src}
                      alt={lightbox.title}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="95vw"
                      priority
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
