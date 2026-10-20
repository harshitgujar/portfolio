"use client";

import { useRouter } from "next/navigation";
import { EvoraCaseStudy } from "@/components/evora/EvoraCaseStudy";

export default function EvoraCaseStudyPage() {
  const router = useRouter();

  return (
    <EvoraCaseStudy
      onBack={() => router.push("/")}
      nextProjectHref="/arken"
    />
  );
}
