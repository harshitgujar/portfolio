"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { THEMES, ThemeConfig } from "@/data/themes";

export type ColorMode = "dark" | "light";

interface ThemeContextType {
  selectedThemeId: string;
  setSelectedThemeId: (id: string) => void;
  currentTheme: ThemeConfig;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  isLight: boolean;
  extrasExperiment: string | null;
  setExtrasExperiment: (id: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [selectedThemeId, setSelectedThemeIdState] = useState<string>("terracotta");
  const [colorMode, setColorModeState] = useState<ColorMode>("dark");
  const [extrasExperiment, setExtrasExperiment] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem("portfolio_theme");
      if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
        setSelectedThemeIdState(savedTheme);
      }

      // Default to dark theme on initial load / fresh visits.
      // Only keep mode if user explicitly switched it during their active session.
      const sessionMode = sessionStorage.getItem("portfolio_color_mode") as ColorMode | null;
      if (sessionMode === "light" || sessionMode === "dark") {
        setColorModeState(sessionMode);
      } else {
        setColorModeState("dark");
        // Clear any old stored light mode preference from localStorage
        try {
          localStorage.removeItem("portfolio_color_mode");
        } catch {
          // Ignore
        }
      }
    } catch {
      // Ignore storage errors
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

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    try {
      sessionStorage.setItem("portfolio_color_mode", mode);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  const rawTheme = useMemo(() => {
    return THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];
  }, [selectedThemeId]);

  const isLight = colorMode === "light";

  const currentTheme = useMemo<ThemeConfig>(() => {
    if (!isLight) {
      return rawTheme;
    }
    return {
      ...rawTheme,
      groundColor: rawTheme.lightGroundColor,
      previewColor: rawTheme.lightPreviewColor,
      vars: rawTheme.lightVars,
    };
  }, [rawTheme, isLight]);

  // Sync document root class and colorScheme
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (isLight) {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    }

    // Apply active CSS variables to root
    if (currentTheme.vars) {
      Object.entries(currentTheme.vars).forEach(([key, val]) => {
        if (typeof val === "string") {
          root.style.setProperty(key, val);
        }
      });
    }
  }, [isLight, currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        selectedThemeId,
        setSelectedThemeId,
        currentTheme,
        colorMode,
        setColorMode,
        toggleColorMode,
        isLight,
        extrasExperiment,
        setExtrasExperiment,
      }}
    >
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

