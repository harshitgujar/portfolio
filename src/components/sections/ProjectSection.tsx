"use client";

import { useState, useEffect } from "react";
import { LiquidGlassCarousel } from "@/components/ui/liquid-glass-carousel";
import { PROJECTS, type ProjectItem } from "@/data/projects";

export interface ProjectSectionProps {
  onClose: () => void;
  backgroundHex?: string;
  accentColor?: string;
  inkColor?: string;
}

export function ProjectSection({
  onClose,
  backgroundHex = "#0e0e11",
  accentColor = "#f04e23",
  inkColor = "#f2e7de",
}: ProjectSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const currentProject: ProjectItem = PROJECTS[activeIdx] ?? PROJECTS[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isFocused) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isFocused]);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-300"
      style={{
        backgroundColor: backgroundHex,
        color: inkColor,
      }}
    >
      {/* Top Header Chrome */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-12 py-6 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="font-['Instrument_Serif',serif] italic text-2xl tracking-wide hover:opacity-80 transition-opacity"
            style={{ color: inkColor }}
          >
            harshit gujar
          </button>
          <span className="opacity-30">/</span>
          <span className="text-xs uppercase tracking-[0.16em] opacity-80 font-medium">
            Selected Works ({activeIdx + 1}/{PROJECTS.length})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-all hover:scale-105"
            style={{ color: inkColor }}
          >
            <span>← Back to 3D Stage</span>
          </button>
        </div>
      </header>

      {/* Main WebGL Liquid Glass Canvas */}
      <div className="relative flex-1 w-full h-full min-h-[350px]">
        <LiquidGlassCarousel
          items={PROJECTS}
          background={backgroundHex}
          panelHeight={480}
          gap={18}
          entry={true}
          onActiveChange={(idx) => setActiveIdx(idx)}
          onFocusChange={(focused) => setIsFocused(focused)}
          className="h-full w-full"
        />
      </div>

      {/* Bottom Project Details Bar */}
      <footer
        className={`relative z-30 px-6 sm:px-12 py-5 border-t border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 ${
          isFocused ? "opacity-30 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Active Project Info */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-[11px] uppercase tracking-[0.18em] opacity-70 font-mono">
                {currentProject.category}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-medium tracking-tight">
              {currentProject.title}
            </h2>
            <p className="text-xs sm:text-sm opacity-75 max-w-2xl line-clamp-2 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Tech Stack Pills & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full border border-white/15 bg-white/5 opacity-80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider border border-white/20 hover:bg-white/10 transition-colors"
                  style={{ color: inkColor }}
                >
                  GitHub ↗
                </a>
              )}
              {currentProject.link && (
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundColor: accentColor,
                    color: "#000000",
                  }}
                >
                  Explore ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Interaction Guidance */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] tracking-wider uppercase opacity-50">
          <span>Scroll, drag or use ← → arrow keys to explore projects</span>
          <span className="hidden sm:inline">Click any centered card to focus</span>
        </div>
      </footer>
    </div>
  );
}
