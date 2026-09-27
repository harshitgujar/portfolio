export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  src: string;
  aspect?: number;
  link?: string;
  github?: string;
}

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=1200&q=85&auto=format&fit=crop`;

export const PROJECTS: ProjectItem[] = [
  {
    id: "aether-3d",
    title: "Aether 3D Engine",
    category: "WebGL / Three.js / Creative Tech",
    description:
      "High-performance browser graphics engine featuring volumetric light diffusion, liquid glass refraction, and spring-driven kinematics.",
    tags: ["WebGL", "Three.js", "GLSL", "TypeScript", "GSAP"],
    src: photo("1618005182384-a83a8bd57fbe"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
  {
    id: "verve-mobile",
    title: "Verve Mobile Workspace",
    category: "Mobile Engineering / React Native",
    description:
      "Offline-first productivity mobile app built with React Native and Reanimated 3, running 120fps fluid gestures and local SQLite sync.",
    tags: ["React Native", "Expo", "Reanimated", "SQLite", "TypeScript"],
    src: photo("1514906689926-25ba6dcb584b"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
  {
    id: "hypersync-cloud",
    title: "HyperSync Cloud API",
    category: "Backend Systems & Real-Time Sync",
    description:
      "Resilient distributed cloud service handling 50k+ persistent WebSocket connections with sub-10ms pub/sub event dispatch.",
    tags: ["Node.js", "Go", "PostgreSQL", "Redis", "Docker"],
    src: photo("1568557412756-7d219873dd11"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
  {
    id: "prism-ai",
    title: "Prism Generative Studio",
    category: "AI Systems & Design Tooling",
    description:
      "Multi-modal canvas enabling prompt-to-layout transformations with instant AST manipulation and real-time multiplayer editing.",
    tags: ["Next.js", "Canvas API", "AI / LLM", "Tailwind CSS"],
    src: photo("1581892805885-73bdd91beff0"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
  {
    id: "kinesis-audio",
    title: "Kinesis Audio Synthesizer",
    category: "Creative Coding & Web Audio",
    description:
      "Interactive physical sound synthesis suite leveraging Web Audio API, custom DSP shaders, and real-time FFT spectrum visualization.",
    tags: ["Web Audio API", "HTML5 Canvas", "DSP", "TypeScript"],
    src: photo("1482938289607-e9573fc25ebb"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
  {
    id: "nova-terminal",
    title: "Nova Financial Terminal",
    category: "Full-Stack FinTech / Performance Web",
    description:
      "Institutional-grade portfolio analytics dashboard processing streaming order-book tick data with zero frame drops.",
    tags: ["React", "TypeScript", "GraphQL", "Web Workers"],
    src: photo("1610846202780-b4d9837371ea"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
  {
    id: "aura-design",
    title: "Aura Spatial Design System",
    category: "Design Systems / Component Architecture",
    description:
      "Production-ready component library prioritizing accessible keyboard navigation, fluid typography, and glassmorphism.",
    tags: ["React", "Tailwind CSS", "Radix UI", "Accessibility"],
    src: photo("1527630941-4a229fd674ab"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
  {
    id: "chronos-vector",
    title: "Chronos Local Vector Index",
    category: "Data Engineering / Algorithmic Systems",
    description:
      "Embedded HNSW approximate nearest neighbor index running in WebAssembly with sub-millisecond similarity queries.",
    tags: ["Rust", "WebAssembly", "Vector Search", "Algorithms"],
    src: photo("1603786420263-ad59136a7409"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
  },
];
