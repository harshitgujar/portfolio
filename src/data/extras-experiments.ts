export interface PlaygroundExperiment {
  id: string;
  title: string;
  category: string;
  techStack: string;
  date: string;
  description: string;
  thumbnail: string;
  isInteractive: boolean;
  accentColor?: string;
}

export const PLAYGROUND_EXPERIMENTS: PlaygroundExperiment[] = [
  {
    id: "cd",
    title: "Digital CD Studio",
    category: "Interactive 3D & Audio",
    techStack: "Canvas / Web Audio / GIF",
    date: "Oct 2026",
    description: "Digital CD creator for artists. Upload custom artwork, write typography, change iridescent light reflections, burn songs, and export as GIF or video.",
    thumbnail: "/experiments/digital-cd-preview.png",
    isInteractive: true,
    accentColor: "#2e12e8",
  },
  {
    id: "clock",
    title: "Triangular Precision Clock",
    category: "3D Product Design",
    techStack: "Three.js / PBR Shaders",
    date: "Oct 2026",
    description: "Brushed metallic triangular clock with recessed matte dial, crimson apex badge, and real-time mechanics.",
    thumbnail: "/experiments/triangular-clock-preview.png",
    isInteractive: true,
    accentColor: "#f59e0b",
  },
  {
    id: "gallery",
    title: "Infinite 3D Gallery",
    category: "WebGL Canvas",
    techStack: "Three.js / WebGL 2.0",
    date: "Sep 2026",
    description: "Curved fisheye lens grid with inertia momentum and chromatic aberration.",
    thumbnail: "/experiments/infinite-gallery-preview.png",
    isInteractive: true,
    accentColor: "#38bdf8",
  },
  {
    id: "music",
    title: "Kinetic Music Reel",
    category: "Kinetic UI & Sound",
    techStack: "Web Audio / Motion",
    date: "Sep 2026",
    description: "Endless scrolling music archive with instant color interpolation and acoustic ticks.",
    thumbnail: "/experiments/kinetic-music-preview.png",
    isInteractive: true,
    accentColor: "#8555f8",
  },
];
