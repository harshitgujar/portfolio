export interface DesignToolItem {
  id: string;
  title: string;
  url: string;
  category: string;
  thumbnail: string;
  description?: string;
  author?: string;
  date?: string;
}

export const INITIAL_DESIGN_TOOLS: DesignToolItem[] = [
  {
    id: "shader-gradient",
    title: "ShaderGradient",
    url: "https://www.shadergradient.co",
    category: "3D & WebGL",
    thumbnail: "/tools/shadergradient-preview.png",
    description: "Generate fluid 3D moving gradients for WebGL and Figma.",
    author: "Community",
    date: "2026",
  },
  {
    id: "realtime-colors",
    title: "Realtime Colors",
    url: "https://realtimecolors.com",
    category: "Color Systems",
    thumbnail: "/tools/realtime-colors-preview.png",
    description: "Visualize color palettes on real UI templates in real time.",
    author: "Juxtopposed",
    date: "2026",
  },
  {
    id: "ray-so",
    title: "Ray.so",
    url: "https://ray.so",
    category: "Design Utility",
    thumbnail: "/tools/ray-so-preview.png",
    description: "Generate beautiful, shareable syntax-highlighted code images.",
    author: "Raycast",
    date: "2026",
  },
  {
    id: "typescale",
    title: "Type Scale",
    url: "https://typescale.com",
    category: "Typography",
    thumbnail: "/tools/typescale-preview.png",
    description: "Visual modular typographic hierarchy calculator for design systems.",
    author: "Jeremy Church",
    date: "2026",
  },
  {
    id: "lottielab",
    title: "LottieLab",
    url: "https://www.lottielab.com",
    category: "Motion & UI",
    thumbnail: "/tools/lottielab-preview.png",
    description: "In-browser vector animation and Lottie creation studio.",
    author: "LottieLab Team",
    date: "2026",
  },
  {
    id: "krea-ai",
    title: "Krea AI",
    url: "https://www.krea.ai",
    category: "Generative AI",
    thumbnail: "/tools/krea-preview.png",
    description: "Real-time AI generation canvas and creative visual enhancement.",
    author: "Krea",
    date: "2026",
  },
];
