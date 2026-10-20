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
  MessageCircle,
  Share2,
  User,
  Shield,
  Heart,
  Music,
  Send,
  Pin,
  Smile,
  Layers,
  Sparkles,
  Check,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ShowcaseItem {
  id: string;
  category: "profile" | "comments" | "sharing" | "board";
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

export interface SpotifyCaseStudyProps {
  onBack?: () => void;
  nextProjectHref?: string;
  className?: string;
}

export function SpotifyCaseStudy({
  onBack,
  nextProjectHref = "/runagon",
  className = "",
}: SpotifyCaseStudyProps) {
  const { currentTheme } = useTheme();
  // Spotify signature vibrant emerald green: #1ed760 / #1db954
  const accent = currentTheme?.previewColor || "#1ed760";

  const [activeFilter, setActiveFilter] = useState<
    "all" | "profile" | "comments" | "sharing" | "board"
  >("all");
  const [privacyToggle, setPrivacyToggle] = useState<boolean>(true);
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
        id: "screen-now-playing-comments",
        category: "comments",
        step: "01",
        badge: "in-track comments",
        title: "now playing player with in-track floating comments",
        subtitle: "394 × 793px • dynamic fading shuffle comments over album artwork",
        src: "/spotify/screens/02-now-playing-floating-comments.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "User comments dynamically appear and float over the album cover art through a fading shuffle effect (SoundCloud meets YouTube comments) as the track plays, fostering real-time social engagement.",
      },
      {
        id: "screen-comments-drawer",
        category: "comments",
        step: "02",
        badge: "discussion drawer",
        title: "track comments & thread reply bottom sheet",
        subtitle: "394 × 793px • full discussion drawer with comment likes & timestamped replies",
        src: "/spotify/screens/03-comments-discussion-drawer.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Dedicated song discussion sheet allowing listeners to read community perspectives, leave timestamped thoughts, like top comments, and reply to threads directly within the listening experience.",
      },
      {
        id: "screen-profile-analytics",
        category: "profile",
        step: "03",
        badge: "personalized profile",
        title: "music taste profile with listening analytics",
        subtitle: "394 × 793px • top genres, verified artists & granular privacy control",
        src: "/spotify/screens/01-profile-analytics.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Automatically displays authentic top listening genres, top artists (Kendrick Lamar, Drake, David Guetta, Weeknd), and public playlists based on real Spotify analytics, backed by a one-tap privacy visibility toggle.",
      },
      {
        id: "screen-shared-songs-inbox",
        category: "sharing",
        step: "04",
        badge: "music dms inbox",
        title: "shared songs messaging inbox & pinned chats",
        subtitle: "394 × 793px • track cards, seen/unseen typography weights & pin icons",
        src: "/spotify/screens/04-shared-songs-inbox.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Native in-app music inbox specifically tailored for track sharing. Distinct font weights indicate unseen vs. seen messages, shared song count chips ('2+ songs shared'), and pinned favorite conversations.",
      },
      {
        id: "screen-music-chat-convo",
        category: "sharing",
        step: "05",
        badge: "1-on-1 music chat",
        title: "song sharing chat with quick emoji reaction bar",
        subtitle: "394 × 793px • interactive song cards with inline reactions & replies",
        src: "/spotify/screens/05-music-chat-conversation.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Direct conversational thread where shared songs display full artist metadata, timestamps, and an expressive hold-to-react emoji bar for immediate emotional reactions without leaving Spotify.",
      },
      {
        id: "screen-hold-reaction-actions",
        category: "sharing",
        step: "06",
        badge: "song context menu",
        title: "hold-to-react emoji bar & playlist quick actions",
        subtitle: "394 × 793px • add to playlist, save to liked songs & share to story",
        src: "/spotify/screens/06-hold-reaction-actions.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Holding on any shared song bubble triggers a quick emoji reaction strip and a frictionless action menu: 'Add to Playlist', 'Save to Liked Songs', 'Share in App', and 'Post to Story'.",
      },
      {
        id: "screen-song-share-search",
        category: "sharing",
        step: "07",
        badge: "song picker",
        title: "'what do you want to share?' song picker search",
        subtitle: "394 × 793px • instant track query with recent searches & recommendations",
        src: "/spotify/screens/07-song-share-search.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Frictionless song picker integrated directly inside the chat workflow with recent search history and one-tap selection, removing the need to exit to the main search tab.",
      },
      {
        id: "screen-friend-picker-search",
        category: "sharing",
        step: "08",
        badge: "contact selector",
        title: "'to whom you want to share?' contact selector",
        subtitle: "394 × 793px • quick friend search with active connections & recent contacts",
        src: "/spotify/screens/08-friend-picker-search.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Rapid connection selector allowing listeners to send music to friends, family, and collaborative playlist partners in under two taps.",
      },
      {
        id: "screen-chat-options-menu",
        category: "sharing",
        step: "09",
        badge: "chat controls",
        title: "conversation management context menu",
        subtitle: "394 × 793px • pin chat, mute notifications & block account controls",
        src: "/spotify/screens/09-chat-options-context-menu.png",
        pixelDimensions: "394 × 793px",
        aspectClass: "aspect-[9/16]",
        bgClass: "bg-[#0b0e14]",
        objectFit: "contain",
        description:
          "Long-press chat options sheet giving users complete control over their social inbox with Pin, Mute Messages, and Block Account controls.",
      },
      {
        id: "screen-full-artboard",
        category: "board",
        step: "10",
        badge: "case study presentation",
        title: "spotify reimagine — complete behance presentation artboard",
        subtitle: "2667 × 21911px • end-to-end case study narrative, user research & wireframes",
        src: "/spotify/spotify-reimagine-full-board.png",
        pixelDimensions: "2667 × 21911px",
        aspectClass: "aspect-[16/10]",
        bgClass: "bg-[#08090d]",
        objectFit: "cover",
        description:
          "Complete architectural case study presentation board detailing the project mission, vision, user persona (Maya Sharma), low-fidelity wireframe flows, and high-fidelity screen mockups.",
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
      className={`min-h-screen w-full relative pt-16 font-sans bg-[#07090c] text-[#f5f5f7] selection:bg-[#1ed760] selection:text-black ${className}`}
    >
      {/* ========================================================================= */}
      {/* STICKY TOP EDITORIAL BAR */}
      {/* ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 w-full px-6 sm:px-12 md:px-16 py-4 flex items-center justify-between bg-[#07090c]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
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
            <span>Conceptual Redesign</span>
          </span>
          <span className="font-[family-name:var(--font-space-grotesk)] text-xs sm:text-sm text-white/40 tracking-wider">
            2026 • Behance
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SHOWCASE */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 pt-4 pb-16 sm:pb-24 max-w-[1440px] mx-auto">
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span
              style={{ color: accent }}
              className="font-mono text-xs uppercase tracking-widest font-semibold"
            >
              0&rarr;1 mobile product redesign
            </span>
            <span className="text-white/30 text-xs">•</span>
            <span className="text-white/50 text-xs font-mono uppercase tracking-wider">
              social &amp; interactive music community
            </span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[130px] font-normal tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-[0.9]">
            Spotify Reimagined
          </h1>

          <div className="mt-5 space-y-1 text-sm sm:text-base text-white/70 font-[family-name:var(--font-space-grotesk)] lowercase tracking-wide max-w-3xl">
            <p>bridging the gap between music streaming and social connectivity</p>
            <p className="text-white/45">
              in-track floating comments • native music dms with emoji reactions • analytics-backed profiles
            </p>
          </div>
        </div>

        {/* Hero Visual Stage (Featuring the flagship player mockup with floating comments) */}
        <div
          onClick={() =>
            openLightbox(
              "/spotify/spotify-hero-banner.png",
              "Spotify Reimagined: Social & Interactive",
              "Official Conceptual Presentation Hero",
              "End-to-end design concept uniting in-track comments, direct song sharing, and profile analytics."
            )
          }
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#0e161c] via-[#080d12] to-[#05070a] shadow-2xl group cursor-pointer"
        >
          {/* Subtle Ambient Emerald Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 blur-3xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accent}33 0%, transparent 70%)`,
            }}
          />

          <Image
            src="/spotify/spotify-hero-banner.png"
            alt="Spotify Reimagined Hero"
            fill
            priority
            unoptimized
            className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span
                style={{ color: accent }}
                className="text-xs font-mono uppercase tracking-wider font-semibold block"
              >
                key concept showcase
              </span>
              <p className="text-sm sm:text-base text-white font-medium font-[family-name:var(--font-space-grotesk)] lowercase">
                floating comments &bull; in-app track sharing &bull; music taste profiles
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              <span>click to inspect presentation board</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ( 01 ) ABOUT PROJECT */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 py-16 sm:py-24 border-t border-white/[0.08] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
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
          <div className="md:col-span-8 space-y-12">
            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-10 border-b border-white/[0.08] font-[family-name:var(--font-space-grotesk)]">
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/40 font-mono mb-1">
                  role
                </span>
                <span className="text-sm sm:text-base text-white/90">
                  Lead Product &amp; UX Designer
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/40 font-mono mb-1">
                  timeline
                </span>
                <span className="text-sm sm:text-base text-white/90">
                  2026 • Conceptual Redesign
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/40 font-mono mb-1">
                  platform
                </span>
                <span className="text-sm sm:text-base text-white/90">
                  iOS Mobile (iPhone 13 Mini)
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/40 font-mono mb-1">
                  domain
                </span>
                <span className="text-sm sm:text-base text-white/90">
                  Social Music &amp; Streaming
                </span>
              </div>
            </div>

            {/* Mission & Problem Statement */}
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <span
                  style={{ color: accent }}
                  className="font-mono text-xs uppercase tracking-wider font-semibold block"
                >
                  [ mission &amp; vision ]
                </span>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
                  To enhance the Spotify experience by integrating native social interaction features,
                  allowing users to share, react, and engage with music in a more interactive and
                  personalized way &mdash;{" "}
                  <span className="text-white font-medium">
                    bridging the gap between music streaming and social connectivity.
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                  the core problem: music is social, but streaming is isolated
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Music has always sparked emotions, memories, and conversations. Yet mainstream
                  streaming platforms like Spotify have historically treated listening as a passive,
                  isolated utility. Users discover great songs but are forced to copy links into external
                  chat apps like WhatsApp or Instagram to share them. There was no native way to discuss
                  what makes a song special, no way to react emotionally to friends&rsquo; recommendations,
                  and no authentic way to showcase musical identity with granular privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ( 02 ) USER PERSONA & BEHAVIORAL INSIGHTS */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 py-16 sm:py-24 border-t border-white/[0.08] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 02 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              user persona
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
              Meet <span className="text-white font-medium">Maya Sharma</span>, a music enthusiast
              who loves discovering and discussing tracks with friends. Her persona bridges the gap
              between passive audio streaming and an engaging community-driven experience.
            </p>

            {/* Persona Deep-Dive Card */}
            <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0f141c] to-[#090c12] p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-white/[0.08]">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-emerald-500/30 flex-shrink-0">
                  <Image
                    src="/spotify/maya-sharma-persona.png"
                    alt="Maya Sharma Persona"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span
                    style={{ color: accent }}
                    className="font-mono text-xs uppercase tracking-wider font-semibold"
                  >
                    primary user persona
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white font-[family-name:var(--font-space-grotesk)]">
                    Maya Sharma, 24
                  </h3>
                  <p className="text-sm text-white/60 font-mono">
                    Marketing Coordinator &bull; Urban Music Enthusiast
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Motivations */}
                <div className="space-y-3">
                  <span
                    style={{ color: accent }}
                    className="font-mono text-xs uppercase tracking-wider font-semibold block"
                  >
                    motivations &amp; habits
                  </span>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Maya believes music is a powerful medium to connect with people. She frequently shares
                    tracks via third-party messaging apps, values her circle&rsquo;s taste, and craves
                    discussions around lyrics, beat drops, and newly dropped albums.
                  </p>
                </div>

                {/* Expectations & Needs */}
                <div className="space-y-3">
                  <span
                    style={{ color: accent }}
                    className="font-mono text-xs uppercase tracking-wider font-semibold block"
                  >
                    expectations &amp; solutions
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <Check style={{ color: accent }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Seamless in-app song sharing without switching to external messengers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check style={{ color: accent }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>In-track comments that spark conversation directly on the cover artwork.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check style={{ color: accent }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Dynamic music taste showcase on profile with full privacy control.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ( 03 ) THE 3 CORE SOCIAL PILLARS */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 py-16 sm:py-24 border-t border-white/[0.08] max-w-[1440px] mx-auto space-y-20 sm:space-y-28">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
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
              the 3 core pillars
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
              Three interconnected feature systems designed to transform Spotify from a silent audio
              utility into a vibrant, expressive community.
            </p>
          </div>
        </div>

        {/* ================= PILLAR 1: PERSONALIZED PROFILES ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-emerald-400">
              <User className="w-3.5 h-3.5" />
              <span>Pillar 01 &bull; Identity &amp; Privacy</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white lowercase font-[family-name:var(--font-space-grotesk)] leading-tight">
              personalized music profiles &amp; authentic analytics
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
              <p>
                <strong className="text-white font-medium">Vision:</strong> Music is both personal and
                social. While many listeners love sharing their favorite artists and genres, others
                prefer privacy. This feature balances self-expression and control.
              </p>
              <p>
                <strong className="text-white font-medium">Solution:</strong> Spotify automatically
                displays top artists (Kendrick Lamar, Drake, David Guetta, Weeknd) and top genres based
                on actual listening telemetry &mdash; eliminating manual faking. A simple toggle allows
                privacy-conscious users to hide their metrics anytime.
              </p>
            </div>

            {/* Interactive Privacy Toggle Demo Widget */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-white block">
                  Showcase listening taste on public profile
                </span>
                <span className="text-[11px] font-mono text-white/45">
                  Status: {privacyToggle ? "Publicly Visible" : "Private (Hidden)"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyToggle((prev) => !prev)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                  privacyToggle ? "bg-[#1ed760]" : "bg-neutral-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-black transition-transform ${
                    privacyToggle ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div
            onClick={() =>
              openLightbox(
                "/spotify/screens/01-profile-analytics.png",
                "Personalized Music Profile",
                "Authentic Analytics & Top Artists (394 × 793px)",
                "Showcases verified top listening genres, top artists, and curated playlists with quick privacy visibility toggle.",
                2
              )
            }
            className="lg:col-span-6 flex justify-center cursor-pointer group"
          >
            <div className="relative w-full max-w-[320px] aspect-[9/18] rounded-[42px] overflow-hidden border border-white/15 bg-black shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/spotify/screens/01-profile-analytics.png"
                alt="Profile Analytics"
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>

        {/* ================= PILLAR 2: EXPRESS THROUGH COMMENTS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div
            onClick={() =>
              openLightbox(
                "/spotify/screens/02-now-playing-floating-comments.png",
                "Now Playing with In-Track Floating Comments",
                "Dynamic Fading Shuffle Comments over Artwork (394 × 793px)",
                "Comments dynamically appear and fade over the album art as the track plays, turning playback into a community event.",
                0
              )
            }
            className="lg:col-span-6 order-2 lg:order-1 flex justify-center gap-4 cursor-pointer group"
          >
            <div className="relative w-full max-w-[280px] aspect-[9/18] rounded-[42px] overflow-hidden border border-white/15 bg-black shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/spotify/screens/02-now-playing-floating-comments.png"
                alt="Now Playing Floating Comments"
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>
            <div className="relative w-full max-w-[280px] aspect-[9/18] rounded-[42px] overflow-hidden border border-white/15 bg-black shadow-2xl hidden sm:block group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/spotify/screens/03-comments-discussion-drawer.png"
                alt="Comments Discussion Drawer"
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-emerald-400">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pillar 02 &bull; In-Track Floating Comments</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white lowercase font-[family-name:var(--font-space-grotesk)] leading-tight">
              express through comments &bull; community over cover art
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
              <p>
                <strong className="text-white font-medium">Vision:</strong> Listening to a song sparks
                spontaneous reactions: &ldquo;that beat drop was insane&rdquo; or &ldquo;this brings back summer &rsquo;22.&rdquo;
                Currently, Spotify provides no space for communal expression.
              </p>
              <p>
                <strong className="text-white font-medium">Solution:</strong> The Song Comments feature
                allows listeners to leave thoughts on tracks. Comments float over the album cover art
                through a subtle fading shuffle effect (SoundCloud meets modern Instagram stories).
                Tapping opens the full discussion drawer with threaded replies and comment likes.
              </p>
            </div>
          </div>
        </div>

        {/* ================= PILLAR 3: SONG SHARING WITH REACTIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-emerald-400">
              <Share2 className="w-3.5 h-3.5" />
              <span>Pillar 03 &bull; In-App Music DMs &amp; Reactions</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white lowercase font-[family-name:var(--font-space-grotesk)] leading-tight">
              song sharing with reactions &amp; dedicated music chats
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
              <p>
                <strong className="text-white font-medium">Vision:</strong> Sending a track shouldn&rsquo;t
                mean copying a bare link into external apps where it gets buried under daily work chat.
                Music sharing should feel musical and conversational.
              </p>
              <p>
                <strong className="text-white font-medium">Solution:</strong> Dedicated in-app messaging
                with rich song cards, hold-to-react emojis, pinned chats, and seen/unseen typography
                weights. Recipients can listen, react, and add directly to playlists with one tap.
              </p>
            </div>
          </div>

          <div
            onClick={() =>
              openLightbox(
                "/spotify/screens/05-music-chat-conversation.png",
                "1-on-1 Song Sharing Chat",
                "Direct Music Messaging with Emoji Reactions (394 × 793px)",
                "Full chat thread with shared song cards, timestamps, quick emoji reactions, and reply flows.",
                4
              )
            }
            className="lg:col-span-6 flex justify-center gap-4 cursor-pointer group"
          >
            <div className="relative w-full max-w-[280px] aspect-[9/18] rounded-[42px] overflow-hidden border border-white/15 bg-black shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/spotify/screens/04-shared-songs-inbox.png"
                alt="Shared Songs Inbox"
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>
            <div className="relative w-full max-w-[280px] aspect-[9/18] rounded-[42px] overflow-hidden border border-white/15 bg-black shadow-2xl hidden sm:block group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/spotify/screens/05-music-chat-conversation.png"
                alt="Music Chat Conversation"
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ( 04 ) SCREENS GALLERY & LIGHTBOX */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 py-16 sm:py-24 border-t border-white/[0.08] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
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
              screens gallery
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
                All 9 high-fidelity screen mockups and the end-to-end conceptual case study board.
                Click any screen to inspect at full resolution.
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {[
                  { id: "all", label: "all (10)" },
                  { id: "comments", label: "comments & player (2)" },
                  { id: "sharing", label: "song sharing & chat (6)" },
                  { id: "profile", label: "music profile (1)" },
                  { id: "board", label: "presentation board (1)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id as any)}
                    style={{
                      backgroundColor:
                        activeFilter === tab.id ? accent : "rgba(255,255,255,0.05)",
                      color: activeFilter === tab.id ? "#000000" : "rgba(255,255,255,0.6)",
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0e14] p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl"
                  >
                    <div className="space-y-1 mb-3 text-xs font-[family-name:var(--font-space-grotesk)]">
                      <div className="flex items-center justify-between">
                        <span style={{ color: accent }} className="font-mono font-semibold">
                          ( {item.step} )
                        </span>
                        <span className="text-white/40 uppercase text-[10px] tracking-wider font-mono">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors lowercase truncate">
                        {item.title}
                      </h4>
                    </div>

                    <div
                      className={`relative w-full ${
                        item.aspectClass || "aspect-[9/16]"
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
                            ? "object-contain p-2"
                            : "object-cover object-top"
                        } group-hover:scale-105 transition-transform duration-500`}
                      />

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
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ( 05 ) KEY TAKEAWAYS */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-12 md:px-16 py-16 sm:py-24 border-t border-white/[0.08] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
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
              takeaways
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase font-semibold">
                  01 &bull; Community-Driven Streaming
                </span>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Integrating floating comments turns passive playback into an active social event,
                  creating genuine emotional bonds between fans of niche genres and artists.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase font-semibold">
                  02 &bull; Privacy by Default
                </span>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Social features are only beloved when users feel completely in control. The one-tap
                  privacy toggle guarantees that listeners can share openly or stay completely private.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase font-semibold">
                  03 &bull; Frictionless Sharing Loops
                </span>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Eliminating external copy-paste links reduces the drop-off in music recommendations.
                  Direct track bubbles with one-tap &lsquo;Add to Playlist&rsquo; keep users engaged inside Spotify.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase font-semibold">
                  04 &bull; Micro-Interactions
                </span>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Fading shuffle comments and hold-to-react emoji strips provide subtle, delightful tactile
                  feedback that feels natural to modern mobile users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          Spotify Reimagined: Social &amp; Interactive &bull; Harshit Gujar
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
      {/* LIGHTBOX INSPECTOR MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col select-none"
          >
            <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 z-10 bg-black/60">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)] lowercase">
                  {lightbox.title}
                </h3>
                {lightbox.subtitle && (
                  <p className="text-[11px] font-mono text-white/50">{lightbox.subtitle}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateLightbox("prev")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  title="Previous (Arrow Left)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateLightbox("next")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  title="Next (Arrow Right)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
                  title="Close (Escape)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full p-4 sm:p-8 flex items-center justify-center overflow-auto">
              <div className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center">
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            {lightbox.description && (
              <div className="w-full px-6 py-3 border-t border-white/10 bg-black/70 text-center">
                <p className="text-xs text-white/60 max-w-3xl mx-auto leading-relaxed">
                  {lightbox.description}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
