"use client";

import { useEffect, useState } from "react";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import { PinkPhosphorBalloon } from "@/components/ui/pink-phosphor-balloon";
import { Sun } from "lucide-react";

export default function Home() {
  const [timeStr, setTimeStr] = useState("18:26");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Tokyo",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#cecece] flex flex-col justify-between select-none">
      {/* ☀️ Top Bar */}
      <header className="relative z-20 w-full pt-5 flex items-center justify-center">
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-neutral-800 uppercase">
          <Sun className="w-3.5 h-3.5 text-neutral-800 animate-[spin_12s_linear_infinite]" />
          <span>TOKYO {timeStr}</span>
        </div>
      </header>

      {/* ✍️ Center Typography: "Product Builder" Interactive Particle Typography */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
        <CursorDrivenParticleTypography
          text="Product Builder"
          fontSize={150}
          particleSize={1.8}
          particleDensity={4}
          dispersionStrength={24}
          returnSpeed={0.08}
          color="#000000"
          className="w-full h-full"
        />
      </div>

      {/* 🎈 Bottom Section: Pink Phosphor 3D Balloon Image & Neon Pink Phosphor Accent Bar */}
      <div className="relative z-20 w-full flex flex-col items-center pointer-events-none">
        {/* Interactive 3D Pink Phosphor Balloon */}
        <div className="pointer-events-auto -mb-6 hover:scale-105 transition-transform duration-300">
          <PinkPhosphorBalloon size={240} interactive={true} />
        </div>

        {/* 💖 Vibrant Pink Phosphor Bottom Bar */}
        <div
          className="w-full h-4 sm:h-5 bg-[#ff026c] shadow-[0_-4px_24px_rgba(255,2,108,0.4)]"
          aria-hidden="true"
        />
      </div>
    </main>
  );
}
