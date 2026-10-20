"use client";

import { useRouter } from "next/navigation";
import { RunagonCaseStudy } from "@/components/runagon/RunagonCaseStudy";

export default function RunagonCaseStudyPage() {
  const router = useRouter();

  return (
    <RunagonCaseStudy
      onBack={() => router.push("/")}
      nextProjectHref="/cd"
    />
  );
}
