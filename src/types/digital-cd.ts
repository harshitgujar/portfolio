export type ReflectionPresetId =
  | "electric-indigo"
  | "prism-rainbow"
  | "cyber-neon"
  | "solar-gold"
  | "acid-lime"
  | "chrome-silver"
  | "hyper-violet"
  | "custom";

export interface ReflectionPreset {
  id: ReflectionPresetId;
  name: string;
  colors: string[]; // Gradient color stops for anisotropic rainbow / sheen
  flareColor: string; // Specular hotspot color
  intensity: number;
  discColor: string; // Base rich body color of the CD data surface
}

export type ArtworkStyle = "tape" | "full" | "center" | "split" | "none";
export type SleeveMode = "in-sleeve" | "half-slide" | "disc-only";
export type TextFontFamily =
  | "syne" // Avant-Garde Bold Display (Syne 800)
  | "sans" // Heavy Swiss Grotesk (Inter 900 / Helvetica Neue)
  | "mono" // Industrial Monospace (Space Grotesk)
  | "serif" // Luxury Editorial Serif (Instrument Serif)
  | "alienation" // Cyber Y2K (Alienation)
  | "marker"; // Casual Sharpie Marker

export interface CDConfig {
  // Title & Typography
  title: string;
  artist: string;
  subtitle: string;
  rimText: string;
  fontFamily: TextFontFamily;
  textColor: string;
  titleSize: number; // 24 - 72

  // Diagonal Tape / Sticker Chord (as in the reference image)
  showTape: boolean;
  tapeColor: string; // Background color of the tape/sticker
  tapeAngle: number; // In degrees, default -34
  tapeWidth: number; // Width of tape in % of CD radius
  chordDistance: number; // Distance from center as ratio of disc radius (default 0.58, outside hub)

  // Custom Artwork / Image Layers (Independent toggleable layers)
  artworkUrl: string | null;
  artworkName?: string;
  artworkStyle: ArtworkStyle;
  showFullDisc: boolean;
  showCenterLabel: boolean;
  artworkScale: number;
  artworkOpacity: number;
  artworkBlendMode: "source-over" | "screen" | "multiply" | "overlay";

  // CD Disc Body Color & Reflection
  cdColor: string; // Base body color of the CD disc (e.g. #0f2bf6 electric blue like reference)
  cdTintIntensity: number; // 0.0 to 1.0 (how vibrantly the CD body takes the color)
  reflectionPreset: ReflectionPresetId;
  customColor1: string;
  customColor2: string;
  customColor3: string;
  reflectionIntensity: number; // 0.2 - 1.5
  specularSpread: number; // 0.5 - 2.0
  rotationAngle: number; // Current CD rotation in radians

  // Sleeve / Pocket & Frosted Glassmorphism
  sleeveMode: SleeveMode;
  sleeveColor: string;
  showCornerRivets: boolean;
  sleeveTexture: "gloss" | "matte" | "frosted";
  glassOpacity: number; // 0.15 - 0.70 (transparency of upper envelope layer, default 0.35)
  glassBlur: number; // 8 - 32px (frost blur for underlying CD, default 18px)

  // Stage & Canvas Background Backdrop
  bgColor?: string; // Backdrop color behind the CD/sleeve (default #0c0d14)

  // Audio & Spin
  audioUrl: string | null;
  audioName: string;
  audioDuration: number;
  isPlaying: boolean;
  spinSpeed: number; // 0.5 (slow/vinyl) to 2.0 (fast)
}

export const REFLECTION_PRESETS: ReflectionPreset[] = [
  {
    id: "electric-indigo",
    name: "Electric Sapphire",
    colors: ["#ffffff", "#60a5fa", "#3b82f6", "#1d4ed8", "#8b5cf6", "#ffffff"],
    flareColor: "rgba(255, 255, 255, 0.98)",
    intensity: 1.2,
    discColor: "#0f2bf6", // Rich electric blue like reference image!
  },
  {
    id: "prism-rainbow",
    name: "Holographic Prism",
    colors: [
      "#ffffff",
      "#f43f5e",
      "#fbbf24",
      "#34d399",
      "#38bdf8",
      "#818cf8",
      "#f472b6",
      "#ffffff",
    ],
    flareColor: "rgba(255, 255, 255, 0.98)",
    intensity: 1.25,
    discColor: "#1e1352", // Deep prism violet
  },
  {
    id: "cyber-neon",
    name: "Cyber Neon",
    colors: ["#ffffff", "#f43f5e", "#ec4899", "#06b6d4", "#10b981", "#ffffff"],
    flareColor: "rgba(255, 255, 255, 0.95)",
    intensity: 1.2,
    discColor: "#58075f", // Deep vibrant neon magenta
  },
  {
    id: "solar-gold",
    name: "Solar Gold",
    colors: ["#ffffff", "#fef08a", "#f59e0b", "#d97706", "#fb7185", "#ffffff"],
    flareColor: "rgba(255, 255, 255, 0.95)",
    intensity: 1.15,
    discColor: "#613b02", // Deep metallic bronze gold
  },
  {
    id: "acid-lime",
    name: "Acid Lime",
    colors: ["#ffffff", "#bef264", "#84cc16", "#10b981", "#06b6d4", "#ffffff"],
    flareColor: "rgba(255, 255, 255, 0.95)",
    intensity: 1.15,
    discColor: "#064e3b", // Deep emerald acid green
  },
  {
    id: "hyper-violet",
    name: "Hyper Violet",
    colors: ["#ffffff", "#e879f9", "#c084fc", "#6366f1", "#3b82f6", "#ffffff"],
    flareColor: "rgba(255, 255, 255, 0.95)",
    intensity: 1.1,
    discColor: "#2e0854", // Deep royal ultraviolet
  },
  {
    id: "chrome-silver",
    name: "Liquid Chrome",
    colors: ["#ffffff", "#e2e8f0", "#94a3b8", "#cbd5e1", "#ffffff"],
    flareColor: "rgba(255, 255, 255, 1.0)",
    intensity: 1.0,
    discColor: "#475569", // Classic metallic silver chrome
  },
];

export const DEFAULT_CD_CONFIG: CDConfig = {
  title: "SWAP",
  artist: "LUNI",
  subtitle: "COMPACT DISC DIGITAL AUDIO • 2026",
  rimText: "SWAP LYRICS BY LUNI • SWAP LYRICS BY LUNI • SWAP LYRICS BY LUNI • ",
  fontFamily: "sans", // Heavy Swiss Grotesk (matches reference SWAP!)
  textColor: "#0f0f14",
  titleSize: 44,

  showTape: true,
  tapeColor: "#ffffff",
  tapeAngle: -34,
  tapeWidth: 22,
  chordDistance: 0.58,

  artworkUrl: null,
  artworkName: undefined,
  artworkStyle: "none",
  showFullDisc: false,
  showCenterLabel: false,
  artworkScale: 1.0,
  artworkOpacity: 1.0,
  artworkBlendMode: "source-over",

  cdColor: "#0f2bf6", // Signature electric sapphire blue from reference photo!
  cdTintIntensity: 0.85,
  reflectionPreset: "electric-indigo",
  customColor1: "#38bdf8",
  customColor2: "#8b5cf6",
  customColor3: "#ec4899",
  reflectionIntensity: 1.15,
  specularSpread: 1.1,
  rotationAngle: 0,

  sleeveMode: "in-sleeve",
  sleeveColor: "#2e12e8", // Signature vibrant royal purple from the reference image
  showCornerRivets: true,
  sleeveTexture: "frosted",
  glassOpacity: 0.35, // Glassy, transparent frosted upper envelope layer!
  glassBlur: 18, // Luminous frosted blur showing the CD underneath!
  bgColor: "#0c0d14", // Studio dark obsidian backdrop

  audioUrl: "/audio/demo-lofi.wav",
  audioName: "Lo-Fi Midnight Chords (Demo)",
  audioDuration: 12.0,
  isPlaying: false,
  spinSpeed: 1.0,
};
