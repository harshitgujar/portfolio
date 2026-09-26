"use client";

import { WebGLLiquid } from "@/components/ui/webgl-liquid";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#02040b]">
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
          text="Product Builder"
          fontSize={150}
          particleSize={1.8}
          particleDensity={4}
          dispersionStrength={22}
          returnSpeed={0.08}
          color="#ffffff"
          className="w-full h-full"
        />
      </div>
    </main>
  );
}
