"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { AboutLightboxModal } from "./AboutLightboxModal";

interface AboutGalleryProps {
  accentColor?: string;
}

const CATEGORIES = [
  "All",
  "3D & Motion",
  "UI & Micro-Interactions",
  "Graphic & Typography",
  "Creative Code",
] as const;

export function AboutGallery({ accentColor = "var(--accent)" }: AboutGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const selectedItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  };

  return (
    <section className="space-y-8">
      {/* Section Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block mb-1">
            Visual Exploration & Laboratory
          </span>
          <h2 className="text-xl sm:text-2xl font-mono tracking-tight text-white flex items-center gap-2">
            <span>[ EXTRAS ]</span>
            <span className="text-sm opacity-60">↘</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIdx(null);
                }}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: accentColor,
                        color: "#000",
                        boxShadow: `0 2px 14px -2px ${accentColor}60`,
                      }
                    : undefined
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Visual Works */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedIdx(idx)}
            className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
          >
            {/* Visual Thumbnail Area */}
            <div className="relative w-full h-56 sm:h-64 flex items-center justify-center p-6 bg-black/40 overflow-hidden">
              {/* Subtle ambient backdrop */}
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
                style={{ background: item.gradient }}
              />

              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                className="max-h-48 w-auto max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110"
              />

              {/* View Overlay Indicator */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono uppercase tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                View ↗
              </div>
            </div>

            {/* Item Meta Card */}
            <div className="p-4 sm:p-5 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-white/15"
                  style={{
                    backgroundColor: `${accentColor}12`,
                    color: accentColor,
                    borderColor: `${accentColor}30`,
                  }}
                >
                  {item.category}
                </span>
                <span className="font-mono text-[10px] text-white/40">{item.year}</span>
              </div>

              <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-white transition-colors line-clamp-1">
                {item.title}
              </h3>

              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1">
                {item.tools.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded bg-white/5 text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AboutLightboxModal
        item={selectedItem}
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        accentColor={accentColor}
      />
    </section>
  );
}
