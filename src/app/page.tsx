"use client";

import { ClosingPlasma } from "@/components/ui/closing-plasma";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#08090f]">
      <ClosingPlasma
        speed={1}
        turbulence={1}
        mouseInfluence={1}
        grain={1}
        sparkle={1}
        vignette={1}
        opacity={1}
        interactive={true}
        darkColorA="#0d0d14"
        darkColorB="#1f2540"
        darkColorC="#4a6191"
        lightColorA="#f0f2f7"
        lightColorB="#d7dceb"
        lightColorC="#bcc5e0"
        className="w-full h-full"
      />
    </main>
  );
}
