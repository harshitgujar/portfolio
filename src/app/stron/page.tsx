"use client";

import { useRouter } from "next/navigation";
import { StronCaseStudy } from "@/components/stron/StronCaseStudy";

export default function StronCaseStudyPage() {
  const router = useRouter();

  return (
    <StronCaseStudy
      onBack={() => router.push("/")}
      nextProjectHref="/digital-cd"
    />
  );
}
