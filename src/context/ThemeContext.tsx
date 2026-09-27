"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { THEMES, ThemeConfig } from "@/data/themes";

interface ThemeContextType {
  selectedThemeId: string;
  setSelectedThemeId: (id: string) => void;
  currentTheme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [selectedThemeId, setSelectedThemeIdState] = useState<string>("terracotta");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("portfolio_theme");
      if (saved && THEMES.some((t) => t.id === saved)) {
        setSelectedThemeIdState(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setSelectedThemeId = (id: string) => {
    setSelectedThemeIdState(id);
    try {
      localStorage.setItem("portfolio_theme", id);
    } catch {
      // Ignore localStorage errors
    }
  };

  const currentTheme = useMemo(() => {
    return THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];
  }, [selectedThemeId]);

  return (
    <ThemeContext.Provider value={{ selectedThemeId, setSelectedThemeId, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
