"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, ArrowUpRight } from "lucide-react";
import {
  PLAYGROUND_EXPERIMENTS,
  PlaygroundExperiment,
} from "@/data/extras-experiments";
import { INITIAL_DESIGN_TOOLS, DesignToolItem } from "@/data/design-tools";
import { useTheme } from "@/context/ThemeContext";
import { SubmitToolModal } from "@/components/ui/submit-tool-modal";
import { HoverTransition } from "@/components/ui/hover-transition";

interface PlaygroundHubProps {
  onSelectExperiment: (id: string) => void;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  onHardScrollUp?: () => void;
  isInteractive?: boolean;
}

interface ExtraCardProps {
  title: string;
  subtitle?: string;
  category: string;
  date?: string;
  thumbnail: string;
  hoverDescription: string;
  themeColor: string;
  isMonochrome: boolean;
  isLight: boolean;
  onClick?: () => void;
  isInteractive?: boolean;
}

function ExtraCard({
  title,
  subtitle,
  category,
  date,
  thumbnail,
  hoverDescription,
  themeColor,
  isMonochrome,
  isLight,
  onClick,
  isInteractive = true,
}: ExtraCardProps) {
  // All themes use black text, except monochrome theme which uses white text
  const isDarkText = !isMonochrome;

  // 1. Default State: Minimal with just the image and the name of the tool (no rounded corners)
  const defaultCard = (
    <div className="relative flex h-full min-h-[300px] sm:min-h-[320px] w-full flex-col justify-end overflow-hidden rounded-none p-5 sm:p-6 text-white bg-neutral-950 select-none">
      {/* Full-bleed clean image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        loading="lazy"
      />

      {/* Subtle bottom vignette to ensure the title is always crisp and readable */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Just the Name of the Tool */}
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );

  // 2. Hover State: Vibrant theme-colored container with details, description, and remaining metadata
  const hoverCard = (
    <div
      className={`relative flex h-full min-h-[300px] sm:min-h-[320px] w-full flex-col justify-between overflow-hidden rounded-none p-5 sm:p-6 select-none transition-colors duration-300 ${
        isDarkText ? "text-black" : "text-white"
      }`}
      style={{ backgroundColor: themeColor }}
    >
      {/* Top Row: Category & Date */}
      <div
        className={`flex items-center justify-between font-[family-name:var(--font-space-grotesk)] text-xs ${
          isDarkText ? "text-black/60" : "text-white/60"
        }`}
      >
        <span className="font-semibold">{category}</span>
        {date && <span>{date}</span>}
      </div>

      {/* Middle Body: Description ("remaining info the user provides while submitting") */}
      <div className="my-auto py-2">
        <p
          className={`text-sm sm:text-base font-normal leading-relaxed line-clamp-4 sm:line-clamp-5 ${
            isDarkText ? "text-black/85" : "text-white/85"
          }`}
        >
          {hoverDescription}
        </p>
      </div>

      {/* Bottom Row: Name of the Tool / Experiment + Remaining Metadata */}
      <div
        className={`pt-3 border-t ${
          isDarkText ? "border-black/15" : "border-white/20"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <h4
            className={`text-lg sm:text-xl font-bold tracking-tight truncate ${
              isDarkText ? "text-black" : "text-white"
            }`}
          >
            {title}
          </h4>
          <ArrowUpRight
            className={`w-5 h-5 flex-shrink-0 ${
              isDarkText ? "text-black" : "text-white"
            }`}
          />
        </div>
        {subtitle && (
          <p
            className={`font-mono text-[10.5px] uppercase tracking-wider mt-0.5 truncate ${
              isDarkText ? "text-black/60" : "text-white/60"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <HoverTransition
      effect="wipe"
      direction="right"
      defaultComponent={defaultCard}
      hoverComponent={hoverCard}
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`rounded-none overflow-hidden transition-all duration-300 ${
        isInteractive ? "cursor-pointer" : "cursor-default"
      } ${
        isLight
          ? "border border-black/15 shadow-sm hover:border-black/40"
          : "border border-white/15 shadow-md hover:border-white/40"
      }`}
      label={title}
    />
  );
}

export function PlaygroundHub({
  onSelectExperiment,
  className = "",
  scrollContainerRef,
  onHardScrollUp,
  isInteractive = true,
}: PlaygroundHubProps) {
  const { isLight, currentTheme } = useTheme();

  const isMonochrome = currentTheme.id === "monochrome";
  // In monochrome theme, use #18181b with white text. In all other themes, use theme's preview color with black text.
  const themeColor = isMonochrome
    ? "#18181b"
    : isLight
      ? currentTheme.lightPreviewColor || currentTheme.previewColor
      : currentTheme.previewColor;

  const [toolsList, setToolsList] = useState<DesignToolItem[]>(INITIAL_DESIGN_TOOLS);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const internalRef = React.useRef<HTMLDivElement | null>(null);

  // Hard scroll up detection at top of content (overscroll upwards)
  useEffect(() => {
    const el = internalRef.current;
    if (!el || !onHardScrollUp) return;

    let reachedTopTime = Date.now();
    let cumulativeUpDelta = 0;
    let upDeltaResetTimer: ReturnType<typeof setTimeout> | null = null;
    let touchStartY = 0;

    const handleScroll = () => {
      if (el.scrollTop <= 2) {
        if (reachedTopTime === 0) {
          reachedTopTime = Date.now();
        }
      } else {
        reachedTopTime = 0;
        cumulativeUpDelta = 0;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isInteractive) return;
      if (el.scrollTop <= 2) {
        if (e.deltaY < 0) {
          const timeAtTop = reachedTopTime > 0 ? Date.now() - reachedTopTime : 0;
          cumulativeUpDelta += e.deltaY;
          if (upDeltaResetTimer) clearTimeout(upDeltaResetTimer);
          upDeltaResetTimer = setTimeout(() => {
            cumulativeUpDelta = 0;
          }, 320);

          // Hard scroll criteria:
          // A single strong flick (deltaY <= -55) OR cumulative upward overscroll (<= -75)
          // while settled at top (or a deliberate strong flick deltaY <= -65)
          if (
            (e.deltaY <= -55 || cumulativeUpDelta <= -75) &&
            (timeAtTop > 140 || e.deltaY <= -65)
          ) {
            cumulativeUpDelta = 0;
            onHardScrollUp();
          }
        } else {
          cumulativeUpDelta = 0;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isInteractive) return;
      if (el.scrollTop <= 2 && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      } else {
        touchStartY = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInteractive) return;
      if (touchStartY > 0 && el.scrollTop <= 2 && e.touches.length > 0) {
        const pullDistance = e.touches[0].clientY - touchStartY;
        // User pulls down hard (scrolls harder from down to up) at the top
        if (pullDistance > 75) {
          touchStartY = 0;
          onHardScrollUp();
        }
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    el.addEventListener("wheel", handleWheel, { passive: true });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      if (upDeltaResetTimer) clearTimeout(upDeltaResetTimer);
    };
  }, [onHardScrollUp, isInteractive]);

  // Load community submissions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_community_tools");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const combined = [
            ...parsed,
            ...INITIAL_DESIGN_TOOLS.filter(
              (init) => !parsed.some((p: DesignToolItem) => p.id === init.id)
            ),
          ];
          setToolsList(combined);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleAddTool = (newTool: Omit<DesignToolItem, "id">) => {
    const item: DesignToolItem = {
      ...newTool,
      id: `tool-${Date.now()}`,
    };
    const updated = [item, ...toolsList];
    setToolsList(updated);
    try {
      const userSubmissions = JSON.parse(
        localStorage.getItem("portfolio_community_tools") || "[]"
      );
      localStorage.setItem(
        "portfolio_community_tools",
        JSON.stringify([item, ...userSubmissions])
      );
    } catch {
      // Ignore localStorage errors
    }
    setToastMessage(`"${item.title}" added to the library!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div
      ref={(node) => {
        internalRef.current = node;
        if (scrollContainerRef) {
          (scrollContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={`h-full w-full px-6 sm:px-12 md:px-16 lg:px-24 pt-28 sm:pt-32 pb-36 ${
        isInteractive
          ? "overflow-y-auto pointer-events-auto"
          : "overflow-hidden pointer-events-none"
      } select-none no-scrollbar ${className}`}
    >
      <div className="max-w-6xl mx-auto space-y-20 sm:space-y-28">
        {/* ========================================================= */}
        {/* SECTION 1: Personal Experiments & Prototypes              */}
        {/* ========================================================= */}
        <section className="space-y-10 sm:space-y-12">
          {/* Section 1 Header */}
          <div className="flex flex-col items-start max-w-2xl space-y-2">
            <h2
              className={`font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              Personal
            </h2>
            <p
              className={`font-sans text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-tight ${
                isLight ? "text-neutral-600" : "text-neutral-300"
              }`}
            >
              Interaction design experiments, visual prototypes, and kinetic archives I built while agents are mulling over other stuff.
            </p>
          </div>

          {/* Section 1 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 md:gap-8 max-w-4xl">
            {PLAYGROUND_EXPERIMENTS.map((exp: PlaygroundExperiment, index: number) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ExtraCard
                  title={exp.title}
                  subtitle={`${exp.techStack} • ${exp.isInteractive ? "Interactive" : "Personal"}`}
                  category={exp.category || "Experiment"}
                  date={exp.date}
                  thumbnail={exp.thumbnail}
                  hoverDescription={exp.description}
                  themeColor={themeColor}
                  isMonochrome={isMonochrome}
                  isLight={isLight}
                  isInteractive={exp.isInteractive}
                  onClick={() => {
                    if (exp.isInteractive) {
                      onSelectExperiment(exp.id);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: Design Tools & Community Library               */}
        {/* ========================================================= */}
        <section className="space-y-10 sm:space-y-12 pt-14 sm:pt-18 border-t border-black/10 dark:border-white/10">
          {/* Section 2 Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="flex flex-col items-start max-w-xl space-y-2">
              <h2
                className={`font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                Community
              </h2>
              <p
                className={`font-sans text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-tight ${
                  isLight ? "text-neutral-600" : "text-neutral-300"
                }`}
              >
                An open repository of design tools, software, shaders, and creative resources. Built for the design community to share useful tools or discover new craft.
              </p>
            </div>

            {/* Submit Project / Tool Button */}
            <button
              type="button"
              onClick={() => setIsSubmitOpen(true)}
              className={`group flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-[family-name:var(--font-space-grotesk)] text-xs font-medium border transition-all duration-150 active:scale-[0.98] ${
                isLight
                  ? "bg-white hover:bg-neutral-50 border-black/10 text-neutral-900"
                  : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white"
              }`}
              title="Submit a Design Tool or Project"
              aria-label="Submit a Design Tool or Project"
            >
              <Plus className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-200" />
              <span>Submit a Project</span>
            </button>
          </div>

          {/* Section 2 Grid (External Tools / Projects with Redirection) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {toolsList.map((tool: DesignToolItem, index: number) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ExtraCard
                  title={tool.title}
                  subtitle={`${tool.author || "Community"} • ${tool.category}`}
                  category={tool.category}
                  date={tool.date || "2026"}
                  thumbnail={tool.thumbnail}
                  hoverDescription={
                    tool.description ||
                    `Curated design tool for ${tool.category.toLowerCase()} and creative engineering.`
                  }
                  themeColor={themeColor}
                  isMonochrome={isMonochrome}
                  isLight={isLight}
                  isInteractive={true}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(tool.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Community Submission Modal */}
      <SubmitToolModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleAddTool}
      />

      {/* Success Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg font-[family-name:var(--font-space-grotesk)] text-xs bg-black/85 text-white backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
