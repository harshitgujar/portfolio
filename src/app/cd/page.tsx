"use client";

import React, { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { DigitalCDStudio } from "@/components/ui/DigitalCDStudio";

export default function CDStudioPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#06070a] flex flex-col">
      {/* Main Studio Viewport */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#06070a] text-white/50 text-xs">
              <Sparkles className="w-5 h-5 animate-spin mr-2 text-blue-400" />
              Loading Digital CD Studio...
            </div>
          }
        >
          <DigitalCDStudio className="w-full h-full" />
        </Suspense>
      </div>
    </main>
  );
}
