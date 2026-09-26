"use client";

import { useState } from "react";
import { WebGLLiquid } from "@/components/ui/webgl-liquid";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import {
  syne,
  spaceGrotesk,
  cinzel,
  playfair,
  jetbrainsMono,
  geistSans,
} from "./fonts";
import { Type, Sparkles } from "lucide-react";

const FONT_OPTIONS = [
  {
    id: "syne",
    name: "Futuristic (Syne)",
    family: `${syne.style.fontFamily}, sans-serif`,
    tag: "Bold Display",
  },
  {
    id: "space",
    name: "Brutalist (Space Grotesk)",
    family: `${spaceGrotesk.style.fontFamily}, sans-serif`,
    tag: "Modern Tech",
  },
  {
    id: "cinzel",
    name: "Cinematic (Cinzel)",
    family: `${cinzel.style.fontFamily}, serif`,
    tag: "Luxury Serif",
  },
  {
    id: "playfair",
    name: "Editorial (Playfair)",
    family: `${playfair.style.fontFamily}, serif`,
    tag: "Classic Serif",
  },
  {
    id: "mono",
    name: "Cyberpunk (JetBrains Mono)",
    family: `${jetbrainsMono.style.fontFamily}, monospace`,
    tag: "Monospace",
  },
  {
    id: "geist",
    name: "Clean (Geist Sans)",
    family: `${geistSans.style.fontFamily}, sans-serif`,
    tag: "Clean Sans",
  },
];

export default function Home() {
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [isStacked, setIsStacked] = useState(true);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#02040b] select-none">
      {/* 🌊 WebGL Liquid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WebGLLiquid
          title=""
          subtitle=""
          description=""
          className="w-full h-full min-h-screen"
        />
      </div>

      {/* ✨ Interactive Cursor-Driven Particle Typography */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <CursorDrivenParticleTypography
          key={`${selectedFont.id}-${isStacked}`}
          text={isStacked ? "Product\nBuilder" : "Product Builder"}
          fontSize={isStacked ? 280 : 180}
          fontFamily={selectedFont.family}
          particleSize={2.4}
          particleDensity={3}
          dispersionStrength={26}
          returnSpeed={0.08}
          color="#ffffff"
          className="w-full h-full"
        />
      </div>

      {/* 🎨 Floating Font Selector Toolbar */}
      <aside aria-label="Font Selection Controls" className="fixed bottom-6 inset-x-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div className="glass-panel p-2 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-wrap items-center justify-center gap-1.5 pointer-events-auto max-w-2xl">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 border-r border-white/10 mr-1">
            <Type className="w-3.5 h-3.5 text-cyan-400" />
            <span>Font Style:</span>
          </div>

          {FONT_OPTIONS.map((font) => {
            const isActive = selectedFont.id === font.id;
            return (
              <button
                key={font.id}
                onClick={() => setSelectedFont(font)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-black shadow-lg shadow-white/20 scale-105 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {font.name.split(" ")[0]}
              </button>
            );
          })}

          <div className="w-[1px] h-4 bg-white/15 mx-1 hidden sm:block" />

          {/* Layout Toggle */}
          <button
            onClick={() => setIsStacked((prev) => !prev)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
            title="Toggle Single-line or Stacked layout"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{isStacked ? "Stacked" : "1 Line"}</span>
          </button>
        </div>
      </aside>
    </main>
  );
}
