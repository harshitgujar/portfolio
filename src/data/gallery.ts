export interface GalleryItem {
  id: string;
  title: string;
  category: "3D & Motion" | "UI & Micro-Interactions" | "Graphic & Typography" | "Creative Code";
  year: string;
  description: string;
  tools: string[];
  image: string;
  gradient: string;
  aspect: "portrait" | "landscape" | "square";
  link?: string;
  highlight?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "kinetic-hologram",
    title: "CRT Holographic Display Experiment",
    category: "Creative Code",
    year: "2024",
    description: "Scanline distortion and phosphor persistence simulation written with custom fragment shaders and WebGL.",
    tools: ["WebGL", "GLSL Shaders", "Three.js"],
    image: "/crt-hologram.jpg",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #065f46 100%)",
    aspect: "landscape",
    highlight: "Shader Math & Chromatic Dispersion",
  },
  {
    id: "tactile-boombox",
    title: "Analog Hi-Fi Soundbox 3D",
    category: "3D & Motion",
    year: "2024",
    description: "Hard-surface 3D render exploring tactile cassette mechanics, brushed aluminum textures, and retro audio tactile interfaces.",
    tools: ["Blender 4.0", "Cycles", "Substance 3D"],
    image: "/objects/boombox.webp",
    gradient: "linear-gradient(135deg, #2c180f 0%, #7c2d12 100%)",
    aspect: "square",
    highlight: "Tactile Materiality & Physics",
  },
  {
    id: "gesture-equalizer",
    title: "Spatial Equalizer & Fluid Micro-Interactions",
    category: "UI & Micro-Interactions",
    year: "2024",
    description: "Multi-touch kinetic equalizer featuring spring kinematics, haptic curves, and responsive audio peak visualization.",
    tools: ["Figma", "React Native", "Reanimated 3"],
    image: "/objects/phone-on.webp",
    gradient: "linear-gradient(135deg, #3b0764 0%, #0369a1 100%)",
    aspect: "portrait",
    highlight: "Spring Kinematics & Gesture Physics",
  },
  {
    id: "minimalist-camera",
    title: "Rangefinder Optical System",
    category: "3D & Motion",
    year: "2024",
    description: "High-precision geometric modeling of a classic optical viewfinder with anti-reflective glass dispersion and knurled metal dials.",
    tools: ["Blender", "Octane Render", "Figma"],
    image: "/objects/camera.webp",
    gradient: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
    aspect: "square",
    highlight: "Knurled Aluminum & Glass Caustics",
  },
  {
    id: "retro-portable-crt",
    title: "Portable CRT Monitor & Micro-OS",
    category: "UI & Micro-Interactions",
    year: "2023",
    description: "Nostalgic micro-operating system concept rendered on curved monochrome CRT glass with low-res phosphor typography.",
    tools: ["Figma", "After Effects", "TypeScript"],
    image: "/objects/tv-on.webp",
    gradient: "linear-gradient(135deg, #022c22 0%, #0f766e 100%)",
    aspect: "portrait",
    highlight: "Phosphor Bloom & Pixel Grid UI",
  },
  {
    id: "mushroom-lamp-ambient",
    title: "Ambient Chromatic Luminaire",
    category: "3D & Motion",
    year: "2023",
    description: "Atmospheric study of warm volumetric light scattering, soft subsurface translucent silicone, and evening dusk tones.",
    tools: ["Blender", "Cycles", "Photoshop"],
    image: "/objects/lamp-on.webp",
    gradient: "linear-gradient(135deg, #451a03 0%, #b45309 100%)",
    aspect: "portrait",
    highlight: "Subsurface Scattering & Lumens",
  },
  {
    id: "acid-swiss-poster",
    title: "Kinetic Swiss Grid & Sound Architecture",
    category: "Graphic & Typography",
    year: "2024",
    description: "Experimental poster series fusing modernist Swiss International Style hierarchy with raw acid club typography and dynamic grid offsets.",
    tools: ["Illustrator", "Glyphs", "InDesign"],
    image: "/objects/books.webp",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
    aspect: "landscape",
    highlight: "Rigid Systems & Intentional Glitch",
  },
  {
    id: "velvet-monolith",
    title: "Curvilinear Velvet Form Study",
    category: "3D & Motion",
    year: "2023",
    description: "Organic seating architecture exploring soft velvet microfibers, weight distribution simulation, and sculptural minimalism.",
    tools: ["Blender", "Cloth Physics", "KeyShot"],
    image: "/objects/armchair.webp",
    gradient: "linear-gradient(135deg, #172554 0%, #1e40af 100%)",
    aspect: "square",
    highlight: "Cloth Dynamics & Microfiber Sheen",
  },
];
