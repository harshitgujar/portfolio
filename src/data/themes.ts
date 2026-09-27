import React from "react";

export interface ThemeConfig {
  id: string;
  name: string;
  previewColor: string;
  groundColor: string;
  vars: React.CSSProperties;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "terracotta",
    name: "Terracotta Rust",
    previewColor: "#f04e23",
    groundColor: "#2c180f",
    vars: {
      "--ground": "#2c180f",
      "--ambient-start": "#3d2214",
      "--ambient-end": "#200f08",
      "--accent": "#f04e23",
      "--vignette": "rgba(18, 8, 4, 0.55)",
      "--ink": "#f2e7de",
      "--ink-dim": "rgba(242, 231, 222, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "cyber-cyan",
    name: "Cyber Cyan",
    previewColor: "#00e5ff",
    groundColor: "#080c14",
    vars: {
      "--ground": "#080c14",
      "--ambient-start": "#0f1b2b",
      "--ambient-end": "#04070c",
      "--accent": "#00e5ff",
      "--vignette": "rgba(4, 7, 12, 0.65)",
      "--ink": "#f0f9ff",
      "--ink-dim": "rgba(240, 249, 255, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "forest-lime",
    name: "Forest Lime",
    previewColor: "#a3e635",
    groundColor: "#0b140e",
    vars: {
      "--ground": "#0b140e",
      "--ambient-start": "#13261a",
      "--ambient-end": "#070e0a",
      "--accent": "#a3e635",
      "--vignette": "rgba(7, 14, 10, 0.65)",
      "--ink": "#f2fbf4",
      "--ink-dim": "rgba(242, 251, 244, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "monochrome",
    name: "Monochrome Noir",
    previewColor: "#ffffff",
    groundColor: "#0e0e11",
    vars: {
      "--ground": "#0e0e11",
      "--ambient-start": "#1c1c22",
      "--ambient-end": "#09090b",
      "--accent": "#ffffff",
      "--vignette": "rgba(9, 9, 11, 0.7)",
      "--ink": "#f4f4f5",
      "--ink-dim": "rgba(244, 244, 245, 0.55)",
    } as React.CSSProperties,
  },
  {
    id: "nocturne-magenta",
    name: "Nocturne Magenta",
    previewColor: "#e879f9",
    groundColor: "#120919",
    vars: {
      "--ground": "#120919",
      "--ambient-start": "#221030",
      "--ambient-end": "#0b050f",
      "--accent": "#e879f9",
      "--vignette": "rgba(11, 5, 15, 0.65)",
      "--ink": "#fae8ff",
      "--ink-dim": "rgba(250, 232, 255, 0.6)",
    } as React.CSSProperties,
  },
  {
    id: "solar-cobalt",
    name: "Solar Cobalt",
    previewColor: "#38bdf8",
    groundColor: "#09101f",
    vars: {
      "--ground": "#09101f",
      "--ambient-start": "#13203c",
      "--ambient-end": "#050912",
      "--accent": "#38bdf8",
      "--vignette": "rgba(5, 9, 18, 0.65)",
      "--ink": "#f0f8ff",
      "--ink-dim": "rgba(240, 248, 255, 0.6)",
    } as React.CSSProperties,
  },
];
