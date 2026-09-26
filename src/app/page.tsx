"use client";

import { WebGLLiquid } from "@/components/ui/webgl-liquid";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#02040b]">
      <WebGLLiquid
        title=""
        subtitle=""
        description=""
        className="w-full h-full min-h-screen"
      />
    </main>
  );
}
