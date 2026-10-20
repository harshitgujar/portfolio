"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  TriangularClock3D,
  MetallicPreset,
} from "@/components/ui/TriangularClock3D";

function ClockView() {
  const searchParams = useSearchParams();
  const viewParam = (searchParams.get("view") || "front") as
    | "front"
    | "perspective"
    | "bevel"
    | "side"
    | "back";
  const matParam = (searchParams.get("mat") || "aluminum") as MetallicPreset;
  const modeParam = (searchParams.get("mode") || "photo") as "live" | "photo";

  return (
    <TriangularClock3D
      className="w-full h-full"
      defaultMaterial={matParam}
      defaultMode={modeParam}
      defaultView={viewParam}
    />
  );
}

export default function ClockPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0c0d12]">
      {/* Navigation Return Button */}
      <div className="absolute top-4 left-6 sm:left-12 md:left-16 z-30">
        <Link
          href="/extras"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] text-white/70 hover:text-white transition-colors group px-3 py-1.5 -ml-3 rounded-lg hover:bg-white/[0.05]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>back</span>
        </Link>
      </div>

      <Suspense fallback={<div className="w-full h-full bg-[#0c0d12]" />}>
        <ClockView />
      </Suspense>
    </main>
  );
}
