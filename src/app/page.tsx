"use client";

import { CRTBackground } from "@/components/ui/crt-background";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* 📺 CRT Holographic Scanline Background */}
      <div className="absolute inset-0 z-0">
        <CRTBackground imageSrc="/crt-hologram.jpg" interactive={true} />
      </div>

      {/* ⚡ Retro Terminal HUD Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 font-mono text-[11px] text-[#00e5ff]/70 tracking-widest uppercase">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            <span>SYS.NEURAL_NET // ACTIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <span>CH: 01_CYAN</span>
            <span>● 60 FPS</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#00e5ff]/50">
          <span>RASTER_SCAN: 1080i</span>
          <span>PHOSPHOR: CRT-P22</span>
        </div>
      </div>

      {/* ✍️ Center Particle Typography: "Product Builder" in Glowing Cyan */}
      <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-auto">
        <CursorDrivenParticleTypography
          text="Product Builder"
          fontSize={140}
          particleSize={1.8}
          particleDensity={4}
          dispersionStrength={22}
          returnSpeed={0.08}
          color="#80f7ff"
          className="w-full h-full"
        />
      </div>
    </main>
  );
}
