"use client";

import { useState, useEffect, useRef } from "react";
import {
  LiquidGlassCarousel,
  type LiquidGlassCarouselHandle,
} from "@/components/ui/liquid-glass-carousel";
import { PROJECTS, type ProjectItem } from "@/data/projects";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";

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
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const carouselRef = useRef<LiquidGlassCarouselHandle>(null);

  const currentProject: ProjectItem = PROJECTS[activeIdx] ?? PROJECTS[0];

  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
    if (focused) {
      setCaseStudyOpen(true);
    }
  };

  const handleCloseCaseStudy = () => {
    setCaseStudyOpen(false);
    setIsFocused(false);
    carouselRef.current?.closeFocus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (caseStudyOpen) {
          handleCloseCaseStudy();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, caseStudyOpen]);

  return (
    <div
      className="fixed inset-0 z-40 overflow-hidden select-none animate-in fade-in duration-300"
      style={{
        backgroundColor: backgroundHex,
        color: inkColor,
      }}
    >
      {/* Main WebGL Liquid Glass Canvas (Edge-to-edge full bleed) */}
      <div className="absolute inset-0 w-full h-full">
        <LiquidGlassCarousel
          ref={carouselRef}
          items={PROJECTS}
          background={backgroundHex}
          tintColor={accentColor}
          panelHeight={480}
          gap={18}
          entry={true}
          hideCloseButton={true}
          onActiveChange={(idx) => setActiveIdx(idx)}
          onFocusChange={handleFocusChange}
          className="h-full w-full"
        />
      </div>

      {/* Bottom Project Details Bar */}
      <footer
        className={`absolute bottom-0 inset-x-0 z-30 px-6 sm:px-12 py-5 border-t border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 ${
          caseStudyOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Active Project Info */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-[11px] uppercase tracking-[0.18em] opacity-70 font-mono">
                {currentProject.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm opacity-75 max-w-2xl line-clamp-2 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Actions & Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-3">
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

            {/* Read Case Study Button */}
            <button
              type="button"
              onClick={() => setCaseStudyOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
              style={{
                backgroundColor: accentColor,
                color: "#000",
                boxShadow: `0 4px 20px -2px ${accentColor}50`,
              }}
            >
              <span>Case Study</span>
              <span className="text-sm leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Interaction Guidance */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] tracking-wider uppercase opacity-50">
          <span>Scroll, drag or use ← → arrow keys to explore projects</span>
          <span className="hidden sm:inline">Click any card to read full case study</span>
        </div>
      </footer>

      {/* Full-Detail Case Study Modal */}
      <ProjectCaseStudyModal
        project={currentProject}
        isOpen={caseStudyOpen}
        onClose={handleCloseCaseStudy}
        accentColor={accentColor}
        onSelectProject={(idx) => setActiveIdx(idx)}
        currentIndex={activeIdx}
        totalProjects={PROJECTS.length}
      />
    </div>
  );
}
