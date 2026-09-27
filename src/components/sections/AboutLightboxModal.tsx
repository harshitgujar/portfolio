"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/data/gallery";

interface AboutLightboxModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  accentColor?: string;
}

export function AboutLightboxModal({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  accentColor = "var(--accent)",
}: AboutLightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row overflow-hidden rounded-2xl border border-white/15 bg-[#120c0a]/95 text-[var(--ink)] shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Preview Side */}
        <div className="relative md:w-3/5 min-h-[280px] md:min-h-[500px] flex items-center justify-center bg-black/50 overflow-hidden p-6 sm:p-8">
          <div
            className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
            style={{ background: item.gradient }}
          />

          <div className="relative w-full h-full max-h-[460px] flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.title}
              width={700}
              height={700}
              className="max-h-[420px] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Quick Prev / Next Arrows */}
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-all"
              title="Previous item (←)"
            >
              ←
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-all"
              title="Next item (→)"
            >
              →
            </button>
          )}
        </div>

        {/* Details Side */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
          <div className="space-y-4">
            {/* Header: Category, Year & Close */}
            <div className="flex items-center justify-between">
              <span
                className="px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest rounded-full border border-white/15"
                style={{
                  backgroundColor: `${accentColor}18`,
                  color: accentColor,
                  borderColor: `${accentColor}40`,
                }}
              >
                {item.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs opacity-50">{item.year}</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-all"
                  title="Close modal (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug">
              {item.title}
            </h3>

            {/* Highlight Callout */}
            {item.highlight && (
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 py-1 px-2.5 rounded bg-white/5 border border-white/10 inline-block">
                ✦ {item.highlight}
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              {item.description}
            </p>

            {/* Tools Used */}
            <div className="pt-3 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono block mb-2">
                Tools & Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-white/5 border border-white/15 text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>Use ← → to navigate</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
