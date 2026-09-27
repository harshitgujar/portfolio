"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ProjectItem } from "@/data/projects";

export interface ProjectCaseStudyModalProps {
  project: ProjectItem;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
  onSelectProject?: (index: number) => void;
  currentIndex?: number;
  totalProjects?: number;
}

export function ProjectCaseStudyModal({
  project,
  isOpen,
  onClose,
  accentColor = "#f04e23",
  onSelectProject,
  currentIndex = 0,
  totalProjects = 8,
}: ProjectCaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { caseStudy } = project;

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onSelectProject && currentIndex > 0) {
        onSelectProject(currentIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
        onSelectProject &&
        currentIndex < totalProjects - 1
      ) {
        onSelectProject(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onSelectProject, currentIndex, totalProjects]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl transition-all duration-300 animate-in fade-in select-text"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-white/15 bg-[#0d0f14]/95 text-[#f2e7de] shadow-2xl overflow-hidden backdrop-blur-3xl animate-in zoom-in-95 duration-200"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px -10px ${accentColor}25`,
        }}
      >
        {/* Sticky Header Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-[#0d0f14]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] opacity-60 font-mono">
                {project.category}
              </span>
              <h1 className="text-base sm:text-lg font-medium tracking-tight text-white line-clamp-1">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/15 hover:bg-white/10 transition-colors text-white"
              >
                <span>Live Demo</span>
                <span className="text-[11px] opacity-60">↗</span>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/15 hover:bg-white/10 transition-colors text-white"
              >
                <span>GitHub</span>
                <span className="text-[11px] opacity-60">↗</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white active:scale-95"
              aria-label="Close Case Study"
            >
              <span>Close</span>
              <span className="opacity-60 text-[10px]">✕</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-8 custom-scrollbar">
          {/* Hero Banner with Image & Headline */}
          <div className="space-y-4">
            <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-white/10 group">
              <Image
                src={project.src}
                alt={project.title}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:left-6 sm:bottom-6 right-4 sm:right-6">
                <span
                  className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white mb-2"
                >
                  Project Case Study
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                  {caseStudy.headline}
                </h2>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-white/50 block font-mono">
                  Role
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/90 block">
                  {caseStudy.role}
                </span>
              </div>

              {caseStudy.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-[2px]"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-white/50 block font-mono">
                    {metric.label}
                  </span>
                  <span
                    className="text-base sm:text-lg font-bold block"
                    style={{ color: accentColor }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-[11px] text-white/60 block line-clamp-1">
                    {metric.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🎯</span>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-white/90">
                  The Technical Challenge
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-white/90">
                  The Engineering Solution
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Section: System Architecture & Technical Execution */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="text-base">🏗️</span>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 font-mono">
                System Architecture & Engineering
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.architecture.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Key Features & Innovations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="text-base">✨</span>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 font-mono">
                Key Features & Innovations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-white/20 transition-all"
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Results & Impact */}
          <div
            className="p-5 rounded-xl border relative overflow-hidden"
            style={{
              backgroundColor: `${accentColor}08`,
              borderColor: `${accentColor}30`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">📈</span>
              <h3
                className="text-xs sm:text-sm font-semibold tracking-wider uppercase font-mono"
                style={{ color: accentColor }}
              >
                Results & Quantifiable Outcome
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {caseStudy.results}
            </p>
          </div>

          {/* Technologies & Tags */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] uppercase tracking-widest text-white/50 font-mono block">
              Core Technologies & Tools
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/15 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Previous / Next Navigation */}
        <footer className="px-5 sm:px-8 py-4 border-t border-white/10 bg-[#0d0f14]/90 backdrop-blur-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {onSelectProject && (
              <>
                <button
                  type="button"
                  disabled={currentIndex <= 0}
                  onClick={() => onSelectProject(currentIndex - 1)}
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none text-white font-medium"
                >
                  ← Prev
                </button>
                <span className="text-white/40 font-mono text-[11px]">
                  {currentIndex + 1} / {totalProjects}
                </span>
                <button
                  type="button"
                  disabled={currentIndex >= totalProjects - 1}
                  onClick={() => onSelectProject(currentIndex + 1)}
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none text-white font-medium"
                >
                  Next →
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              Back to 3D Carousel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
