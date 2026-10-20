"use client";

import { useRouter } from "next/navigation";
import { ArkenCaseStudy } from "@/components/arken/ArkenCaseStudy";

export default function ArkenCaseStudyPage() {
  const router = useRouter();

  return (
    <ArkenCaseStudy
      onBack={() => router.push("/")}
      nextProjectHref="/spotify"
    />
  );
}
