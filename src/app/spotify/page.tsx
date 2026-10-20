"use client";

import { useRouter } from "next/navigation";
import { SpotifyCaseStudy } from "@/components/spotify/SpotifyCaseStudy";

export default function SpotifyCaseStudyPage() {
  const router = useRouter();

  return (
    <SpotifyCaseStudy
      onBack={() => router.push("/")}
      nextProjectHref="/runagon"
    />
  );
}
