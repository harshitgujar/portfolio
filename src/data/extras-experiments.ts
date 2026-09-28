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
