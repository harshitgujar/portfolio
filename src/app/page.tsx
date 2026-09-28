"use client";

import { ProjectSection } from "@/components/sections/ProjectSection";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { currentTheme, selectedThemeId, setSelectedThemeId } = useTheme();

  return (
    <main
      className="page relative h-full w-full overflow-hidden"
      style={currentTheme.vars}
    >
      {/* 🚀 Interactive Liquid Glass Projects Showcase (Main Landing / Home Page) */}
      <ProjectSection
        backgroundHex={currentTheme.groundColor}
        accentColor={currentTheme.previewColor}
        inkColor="var(--ink)"
        selectedThemeId={selectedThemeId}
        onSelectTheme={setSelectedThemeId}
      />
    </main>
  );
}
