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
      <div className="absolute bottom-5 right-6 z-30">
        <Link
          href="/extras"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 hover:bg-black/90 text-white/90 hover:text-white border border-white/15 backdrop-blur-xl text-xs font-medium shadow-2xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Extras</span>
        </Link>
      </div>

      <Suspense fallback={<div className="w-full h-full bg-[#0c0d12]" />}>
        <ClockView />
      </Suspense>
    </main>
  );
}
