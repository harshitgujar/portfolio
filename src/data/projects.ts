export interface CaseStudyMetric {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
  tag?: string;
  image?: string;
}

export interface CaseStudyDesignSystem {
  tokens: string[];
  description: string;
}

export interface CaseStudyData {
  headline: string;
  role: string;
  timeline: string;
  platform?: string;
  status?: string;
  metrics: CaseStudyMetric[];
  challenge: string;
  solution: string;
  architecture: string[];
  features: CaseStudyFeature[];
  designSystem?: CaseStudyDesignSystem;
  results: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  src: string;
  aspect?: number;
  link?: string;
  figma?: string;
  github?: string;
  caseStudy?: any;
}

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=1600&q=85&auto=format&fit=crop`;

export const PROJECTS: ProjectItem[] = [
  {
    id: "digital-cd",
    title: "Digital CD Studio",
    category: "0→1 Creative Tool & Interactive Audio",
    description:
      "A tactile digital CD & vinyl packaging workstation featuring physical light refraction, anisotropic reflection physics, real-time audio playback, and high-res export.",
    tags: ["0→1 Product", "Creative Tool", "Interactive Audio", "Canvas 2D", "Next.js"],
    src: "/digital-cd.png",
    aspect: 3 / 4,
    link: "/cd",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Engineering a tactile digital CD and jewel packaging workstation combining physical optics, rotational physics, and lossless multi-format audio-video export.",
      role: "Lead Product Designer & Creative Technologist",
      timeline: "2026",
      platform: "Web & Interactive Workstation (Canvas API / Next.js / Web Audio)",
      status: "Featured Project",
      metrics: [
        { label: "Frame Rate", value: "60 FPS", detail: "Hardware-accelerated anisotropic lighting and smooth turntable physics" },
        { label: "Light Physics", value: "100% Real-Time", detail: "Directional specular highlights with static spatial illumination" },
        { label: "Export Formats", value: "4 Formats", detail: "60fps MP4 video, animated GIF, high-res PNG, and alpha cutout" },
        { label: "Audio Sync", value: "< 5ms", detail: "Lossless Web Audio synthesis with RPM speed modulation (33/45/78)" },
      ],
      challenge:
        "Digital music experiences have flattened album art into static 2D thumbnails, discarding the physical intimacy, reflective packaging, and tactile ritual of physical CDs and digipaks.",
      solution:
        "Crafted a high-craft interactive workstation replicating the authentic physics of compact discs—die-cut frosted packaging, holographic specular reflections, continuous typography, and multi-format studio exports.",
      designSystem: {
        tokens: ["Electric Sapphire Optics", "Frosted Glassmorphism Flaps", "Swiss Bold Grotesk", "Minimalist Hardware Console"],
        description: "Engineered a tactile design system balancing nostalgic Y2K physical music hardware with a modern, distraction-free creative studio interface."
      },
      architecture: [
        "Anisotropic Refraction Pipeline: Real-time multi-band specular gradients simulating physical laser groove dispersion.",
        "Glassmorphism Flap Compositor: Multi-pass Gaussian blur simulation showing underlying disc geometry through die-cut envelopes.",
        "Lossless Media Export Pipeline: Pure client-side frame rendering encoding 60fps MP4 video with synced AAC audio and universal playback.",
        "Rotational Physics & Turntable Controller: Gesture-driven momentum dragging with synchronized turntable RPM speeds.",
      ],
      features: [
        {
          title: "Stationary Specular Optics",
          tag: "Physical Simulation",
          description: "Physically authentic light reflections that stay anchored in space as the CD spins beneath them.",
          image: "/digital-cd.png",
        },
        {
          title: "Frosted Die-Cut Jewel Sleeve",
          tag: "Packaging Design",
          description: "Tactile digipak enclosure with signature corner rivets and translucent frosted glassmorphism preview flap.",
          image: "/digital-cd.png",
        },
        {
          title: "Multi-Format Production Export",
          tag: "Engineering",
          description: "One-click generation of 60fps MP4 video with fast-start moov atom and looping 360° GIFs.",
          image: "/digital-cd.png",
        },
      ],
      results:
        "Delivered a viral, interactive digital music studio that transforms static music listening into a tangible, customizable physical artifact.",
    },
  },
  {
    id: "webgl-liquid",
    title: "Fluid Motion Studio",
    category: "0→1 Creative Tool & WebGL Shader",
    description:
      "A cinematic real-time WebGL liquid shader field and interactive customization studio for high-craft hero surfaces and kinetic brand presences.",
    tags: ["0→1 Product", "Creative Tool", "WebGL", "GLSL Shaders", "Next.js"],
    src: "/webgl-liquid.png",
    aspect: 3 / 4,
    link: "/liquid",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Engineering a zero-dependency GPU liquid flow field with parametric FBM noise, chromatic diffusion, and live code export.",
      role: "Lead Creative Technologist & Shader Engineer",
      timeline: "2026",
      platform: "Web & Interactive Tool (WebGL / GLSL / Next.js / React)",
      status: "Featured Tool",
      metrics: [
        { label: "Rendering Performance", value: "60 FPS", detail: "Hardware-accelerated fragment shader running on zero external 3D libraries" },
        { label: "Memory Overhead", value: "0 MB", detail: "Zero-bundle texture footprint utilizing pure mathematical procedural noise" },
        { label: "Export Formats", value: "3 Modes", detail: "Single-click copy for JSX snippets, standalone TSX components, and JSON configs" },
        { label: "Presets", value: "5 Curated", detail: "Midnight, Aurora, Rose Gold, Kinetic Wave, and Default oceanic horizons" },
      ],
      challenge:
        "Modern digital experiences demand organic, fluid visual motion, yet off-the-shelf video loops are heavy, non-interactive, and static in resolution.",
      solution:
        "Engineered a lightweight GPU fragment shader simulating fractional Brownian motion fluid waves with interactive color tuning, typography sync, and direct code copy.",
      designSystem: {
        tokens: ["Procedural FBM Noise", "Atmospheric Chromatic Grain", "Custom Hardware Sliders", "Minimalist Studio Console"],
        description: "Crafted a tactile creative workstation balancing cinematic visual fluidity with precise, repeatable developer export tooling."
      },
      architecture: [
        "FBM Noise Waveform Synthesizer: Multi-octave rotated domain warping generating organic fluid eddies in pure GLSL.",
        "Zero-Overhead Uniform Dispatcher: Continuous RAF render loop polling updated parameters without WebGL context destruction.",
        "Adaptive Viewport Resolution: Native devicePixelRatio scaling with aspect ratio compensation preventing texture stretching.",
        "Direct Code Synthesizer: Client-side JSX and TSX code generation tailoring production-ready components on the fly.",
      ],
      features: [
        {
          title: "Real-Time GLSL Fluid Dynamics",
          tag: "Creative Coding",
          description: "Silky smooth procedural liquid flow computed directly on the client GPU with zero network latency.",
          image: "/webgl-liquid.png",
        },
        {
          title: "Hardware-Inspired Studio Console",
          tag: "Interaction Design",
          description: "Tactile tick-mark sliders and live palette pickers providing instant visual feedback on every micro-adjustment.",
          image: "/webgl-liquid.png",
        },
        {
          title: "One-Click Production Export",
          tag: "Developer Experience",
          description: "Instantly copy tailored JSX snippets or the entire self-contained component source into any Next.js app.",
          image: "/webgl-liquid.png",
        },
      ],
      results:
        "Delivered a viral open-source creative tool empowering designers and developers to generate, personalize, and copy production-grade WebGL hero backgrounds.",
    },
  },
  {
    id: "evora",
    title: "EVORA",
    category: "0→1 Product Design & Creative Direction",
    description:
      "A conceptual digital streetwear and lifestyle platform crafted with visceral brutalist typography, kinetic motion systems, and tactile brand identity.",
    tags: ["0→1 Product", "Creative Direction", "Brand Identity", "Design System", "Next.js"],
    src: "/evora.png",
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    figma: "https://www.figma.com/@harshitgujar",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Designing an immersive digital lifestyle and streetwear platform merging raw analog aesthetics with high-performance commerce architecture.",
      role: "Lead Product Designer & Creative Director",
      timeline: "8 Weeks • 2026",
      platform: "Web & Mobile (Next.js / WebGL / Tailwind)",
      status: "Featured Project",
      metrics: [
        { label: "Brand Identity", value: "100%", detail: "Custom brutalist typography with distinct subculture visual identity" },
        { label: "Display Cadence", value: "120 FPS", detail: "Hardware-accelerated touch physics and fluid lookbook transitions" },
        { label: "Engagement", value: "3.8x", detail: "Longer session duration through interactive product showcases" },
        { label: "Design Tokens", value: "54+", detail: "Modular token system translating Figma variables into CSS architecture" },
      ],
      challenge:
        "Conventional lifestyle and streetwear storefronts rely on predictable, sterile e-commerce layouts that dilute the visceral energy, physical weight, and cultural edge of independent drops.",
      solution:
        "Engineered a tactile 0→1 digital experience built around cinematic grain, bold graphic typography, interactive gesture-driven lookbooks, and sub-second page transitions.",
      designSystem: {
        tokens: ["Evora Crimson Tokens", "Custom Headline Typography", "Analog Film Grain Overlays", "Fluid Spatial Grids"],
        description: "Developed a bespoke visual system pairing intense red accents with deep noir tones, modular typographic scales, and micro-interactions tuned for tactile response."
      },
      architecture: [
        "Dynamic Lookbook Engine: Virtualized visual slider capable of streaming uncompressed editorial imagery without frame drops.",
        "Kinetic Physics Pipeline: Fluid spring curves mimicking the tactile momentum of editorial magazine flipping.",
        "Design Token Synchronization: Seamless alignment between Figma component styles and production code.",
        "Responsive Commerce Architecture: Mobile-first layout hierarchy with sticky action bars and zero layout shifts.",
      ],
      features: [
        {
          title: "Brutalist Editorial Typography",
          tag: "Brand Identity",
          description: "Signature oversized bubble wordmarks and raw graphic elements that anchor the collection's visual identity.",
          image: "/evora.png",
        },
        {
          title: "Kinetic Interactive Showcase",
          tag: "Interaction Design",
          description: "Gesture-controlled fluid cards and interactive lighting effects simulating analog photography development.",
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=80",
        },
        {
          title: "Adaptive Dark Theme Architecture",
          tag: "Design System",
          description: "Deep obsidian backdrop with calibrated crimson luminescence optimized for OLED mobile displays.",
          image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&q=80",
        },
      ],
      results:
        "Established a distinctive, high-impact digital identity that redefines the streetwear drop experience, blending editorial fashion storytelling with precision frontend engineering.",
    },
  },
  {
    id: "arken",
    title: "Arken Creatives",
    category: "0→1 Product Design & Creative Studio",
    description:
      "An independent design and engineering studio crafting iconic 3D character universes, visceral visual identities, and interactive web experiences.",
    tags: ["0→1 Product", "Creative Studio", "3D & Brand", "Design System", "Art Direction"],
    src: "/arken.png",
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    figma: "https://www.figma.com/@harshitgujar",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Building a high-impact creative studio uniting tactile 3D character design, subculture brand worldbuilding, and cutting-edge web interfaces.",
      role: "Founder & Creative Technologist",
      timeline: "2025 – Present",
      platform: "Web, 3D & Digital Platforms",
      status: "Active Studio Project",
      metrics: [
        { label: "Brand Universe", value: "100%", detail: "Bespoke character modeling, textures, and chrome typographic lockups" },
        { label: "Visual Fidelity", value: "4K Retina", detail: "Pristine texture resolution with real-time WebGL shader rendering" },
        { label: "Client Impact", value: "5.0x", detail: "Accelerated brand recognition across digital launches and drops" },
        { label: "System Assets", value: "40+", detail: "Extensible vector libraries, 3D rigs, and interactive motion tokens" },
      ],
      challenge:
        "Modern brand studios often treat 3D characters, identity design, and web technology as siloed disciplines, resulting in static websites that fail to translate the depth and tactile personality of physical collectibles.",
      solution:
        "Founded Arken Creatives to merge high-craft 3D toy art, tactile surrealist visual direction, and high-performance interactive web technology into unified digital flagship experiences.",
      designSystem: {
        tokens: ["Arken Chrome Metals", "Atmospheric Sky Gradients", "Tactile Cloth & Plush Shaders", "Kinetic Elastic Springs"],
        description: "Crafted a distinctive visual language featuring silver chrome metallurgy, soft fabric textures, and cinematic sky environments engineered for physical goods and interactive platforms."
      },
      architecture: [
        "3D Asset Pipeline: High-poly sculpting in Blender/Cinema4D optimized into WebGL-ready low-latency meshes.",
        "Real-Time Shader Optimization: Dynamic lighting and metallic reflections calibrated for 60fps WebGL execution.",
        "Brand Worldbuilding Framework: Modular art direction system spanning physical product concepts to interactive digital drops.",
        "Kinetic Interaction Design: Spring-physics cursor following and spatial depth parallax across all viewports.",
      ],
      features: [
        {
          title: "Iconic 3D Plush Worldbuilding",
          tag: "Character Design",
          description: "Signature balaclava-clad rabbit mascot featuring star studs, pierced floppy ears, and polished chrome chest emblem.",
          image: "/arken.png",
        },
        {
          title: "Atmospheric Surrealist Aesthetic",
          tag: "Art Direction",
          description: "Dreamlike daytime cloudscapes paired with tactile metallic textures and high-contrast digital lighting.",
          image: "/arken.png",
        },
        {
          title: "High-Fidelity Interaction Architecture",
          tag: "Design Engineering",
          description: "Fluid interactive web presence translating 3D spatial depth into smooth, responsive touch kinematics.",
          image: "/arken.png",
        },
      ],
      results:
        "Established Arken Creatives as a recognized creative playground and design studio, bridging physical subculture collectibles with world-class digital product design.",
    },
  },
  {
    id: "runagon",
    title: "Runagon",
    category: "0→1 Product Design & Social Fitness",
    description:
      "A community-centric running platform and social athletic ecosystem uniting urban run clubs, live telemetry tracking, and dynamic group challenges.",
    tags: ["0→1 Product", "Mobile App", "Brand Identity", "Design System", "Product Design"],
    src: "/runagon.png",
    aspect: 4445 / 5556,
    link: "https://github.com/harshitgujar",
    figma: "https://www.figma.com/@harshitgujar",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Designing a high-energy running platform uniting urban run clubs, kinetic activity tracking, and social milestone dynamics.",
      role: "Lead Product Designer",
      timeline: "2025 – 2026",
      platform: "iOS, Android & Design System",
      status: "Featured Project",
      metrics: [
        { label: "Active Runners", value: "25k+", detail: "Engaged runners participating in weekly urban club meetups" },
        { label: "Session Retention", value: "84%", detail: "Day-30 retention powered by group streaks and pace leaderboards" },
        { label: "Pace Precision", value: "Real-time", detail: "Sub-second cadence sync and audio coaching feedback" },
        { label: "Design Tokens", value: "60+", detail: "Dynamic typography, electric cobalt accents, and modular HUD cards" },
      ],
      challenge:
        "Traditional running apps prioritize clinical solo telemetry and sterile data tables, missing the social camaraderie, kinetic momentum, and cultural energy that define modern urban run clubs.",
      solution:
        "Engineered Runagon from 0→1 as an athletic lifestyle ecosystem merging high-contrast performance telemetry, live group run synchronization, social milestone challenges, and a bold modern athletic identity.",
      designSystem: {
        tokens: ["Electric Cobalt Tokens", "Kinetic Speed Scales", "High-Contrast HUD Cards", "Haptic Cadence Indicators"],
        description: "Engineered a high-visibility outdoor design system featuring vibrant cobalt luminescence, bold typographic hierarchies, and glanceable glance-and-go widgets calibrated for daylight running."
      },
      architecture: [
        "Real-Time Pace Engine: Low-overhead GPS telemetry filtering and spatial cadence visualization.",
        "Club Discovery Network: Location-based run club scheduling, live route previews, and RSVP check-in flows.",
        "Adaptive Sunlight Interface: High-contrast typography and ultra-legible HUD cards readable at sprint pace in direct sunlight.",
        "Milestone & Badge Rewards: Dynamic 3D badge visual systems and shareable post-run recap cards.",
      ],
      features: [
        {
          title: "High-Visibility Running HUD",
          tag: "Mobile Product",
          description: "Glanceable real-time speed, heart rate, and split tracking engineered for instant readability while in motion.",
          image: "/runagon.png",
        },
        {
          title: "Run Club Community & Group Streaks",
          tag: "Social Experience",
          description: "Interactive crew meetups, synchronized live checkpoints, and collaborative weekly distance challenges.",
          image: "/runagon.png",
        },
        {
          title: "Dynamic Milestone Badges & Recaps",
          tag: "Gamification & Identity",
          description: "Custom 3D visual rewards celebrating personal records, streak consistency, and route conquests.",
          image: "/runagon.png",
        },
      ],
      results:
        "Transformed solo workout routines into a connected community ritual, boosting weekly runner engagement and establishing a benchmark design system for modern athletic software.",
    },
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
    caseStudy: {
      headline:
        "Pioneering a generative canvas environment combining natural language layout generation with real-time visual code AST sync.",
      role: "Full-Stack AI Engineer",
      timeline: "4 Months • 2025",
      metrics: [
        { label: "Code Gen Speed", value: "< 1.4s", detail: "Streaming AST transformation and instant component preview" },
        { label: "Canvas FPS", value: "60 FPS", detail: "High-performance rendering with infinite pan and multi-level zoom" },
        { label: "Multiplayer Lag", value: "< 30ms", detail: "Peer-to-peer cursor tracking and layout reconciliation via Yjs" },
      ],
      challenge:
        "LLM output is typically unstructured text or markdown. Converting streaming LLM tokens into interactive, visual UI components that can be immediately dragged, resized, and edited on an infinite canvas requires tight AST parsing.",
      solution:
        "Engineered an incremental Babel AST parser that parses streaming LLM code in chunks, validates React JSX schemas in real-time Web Workers, and renders living components into an infinite HTML5 Canvas coordinate plane.",
      architecture: [
        "Streaming token deserializer that handles partial JSX trees without syntax crashes.",
        "Infinite viewport coordinate mapper supporting spatial zoom, viewport culling, and mini-map previews.",
        "Yjs CRDT integration allowing multiple designers and engineers to prompt, select, and edit components concurrently.",
        "Sandboxed iframe execution context preventing untrusted generative scripts from breaching host environment state.",
      ],
      features: [
        {
          title: "Streaming AST Synthesis",
          description: "Visual elements construct before your eyes as the AI streams tokens, with auto-healing syntax correction.",
        },
        {
          title: "Bidirectional Code & Canvas Sync",
          description: "Dragging a padding slider updates the underlying Tailwind CSS code; editing the code directly morphs the visual canvas.",
        },
        {
          title: "Design Token Extraction",
          description: "Automatically analyzes generated components to produce coherent color palettes, typography scales, and spacing systems.",
        },
      ],
      results:
        "Reduced rapid prototyping turnarounds from days to seconds, allowing product teams to experiment with tens of production-grade UI variants instantly.",
    },
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
    caseStudy: {
      headline:
        "Designing a browser-based polyphonic synthesizer with custom DSP AudioWorklets and GPU-accelerated frequency visualizers.",
      role: "Audio Technologist & Creative Coder",
      timeline: "3 Months • 2024",
      metrics: [
        { label: "Audio Latency", value: "< 4.8ms", detail: "Near-zero audio buffer delay matching hardware instruments" },
        { label: "Polyphony", value: "32 Voices", detail: "Concurrent oscillator voices with dynamic envelope stealing" },
        { label: "FFT Resolution", value: "2048 Bins", detail: "Real-time spectrum analysis at 60Hz smooth frequency updates" },
      ],
      challenge:
        "The legacy ScriptProcessorNode in Web Audio causes audio glitches whenever the browser's main thread encounters heavy GC pauses. Producing professional-grade sound in browsers requires low-latency, glitch-free audio synthesis.",
      solution:
        "Implemented dedicated AudioWorkletProcessor modules running on the isolated high-priority real-time audio thread, coupled with custom bilinear biquad filter implementations and a WebGL-based FFT spectrum visualizer.",
      architecture: [
        "AudioWorklet node executing modular envelope generators (ADSR) and band-limited oscillator algorithms.",
        "Circular ring-buffers enabling lock-free shared array transfers between audio thread and UI canvas.",
        "Fragment shader-driven waterfall spectrogram visualizing harmonics across logarithmic frequency bands.",
        "MIDI 2.0 Web API interface supporting hardware controllers with velocity sensitivity and pitch-bend curves.",
      ],
      features: [
        {
          title: "AudioWorklet DSP Architecture",
          description: "True real-time audio processing completely decoupled from the browser main thread, eliminating pops and clicks.",
        },
        {
          title: "Kinetic LFO Modulation",
          description: "Route any visual physics parameter—such as bounce velocity or spring damping—directly into synth filter cutoffs.",
        },
        {
          title: "GPU Logarithmic Spectrogram",
          description: "Visualizes pitch harmonics, resonant peaks, and stereo panning through a custom neon phosphorescent shader.",
        },
      ],
      results:
        "Delivered a studio-quality musical instrument directly in the web browser, capable of expressive performances with hardware MIDI compatibility.",
    },
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
    caseStudy: {
      headline:
        "Engineering an institutional-grade financial analytics terminal handling 100k+ updates per second with zero UI stutter.",
      role: "Lead Frontend Performance Engineer",
      timeline: "6 Months • 2024",
      metrics: [
        { label: "Tick Throughput", value: "100k/sec", detail: "Real-time market depth ticks parsed and aggregated without lag" },
        { label: "UI Thread Idle", value: "92%", detail: "Main thread kept free for instantaneous keyboard commands and charting" },
        { label: "Render Lag", value: "0 Drops", detail: "Sub-16ms frame times under extreme volatile market conditions" },
      ],
      challenge:
        "High-frequency financial markets transmit tens of thousands of price updates per second. Rendering these updates directly with React component state leads to severe DOM thrashing, garbage collection pauses, and frozen interfaces.",
      solution:
        "Moved all binary market data parsing, order book aggregation, and calculation logic into dedicated Web Workers. Used ArrayBuffers and TypedArrays for zero-copy memory transfers, paired with canvas-based virtualized grid tables.",
      architecture: [
        "Web Worker pipeline handling binary WebSocket protocols (Protobuf) and rolling statistics calculation.",
        "OffscreenCanvas and double-buffered GPU renderers for charting price action and depth matrices.",
        "Custom ring-buffer memory pool avoiding object allocation during continuous streaming ticks.",
        "Micro-batched RAF dispatch mechanism synchronizing state changes precisely with monitor refresh intervals.",
      ],
      features: [
        {
          title: "Worker-Driven Tick Processing",
          description: "All tick calculations occur in background worker threads, keeping the UI silky smooth regardless of market volatility.",
        },
        {
          title: "GPU-Accelerated Depth Visualizer",
          description: "Renders real-time bid/ask order book distributions using WebGL heatmaps with sub-pixel sharpness.",
        },
        {
          title: "Keyboard-First Command Palette",
          description: "Sub-millisecond modal palette allowing traders to filter portfolios, execute simulations, and toggle overlays via shortcuts.",
        },
      ],
      results:
        "Enabled traders to visualize high-volume liquidity changes with microsecond accuracy, eliminating the lag common to standard web-based finance portals.",
    },
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
    caseStudy: {
      headline:
        "Constructing a WCAG AAA compliant design system uniting tactile glassmorphism aesthetics with rigorous keyboard ergonomics.",
      role: "Design Systems Lead & Engineer",
      timeline: "4 Months • 2024",
      metrics: [
        { label: "Accessibility", value: "100%", detail: "WCAG 2.2 AAA certified contrast and focus management" },
        { label: "Components", value: "48+", detail: "Fully typed, themeable primitives with comprehensive storybook docs" },
        { label: "Bundle Impact", value: "< 8 KB", detail: "Per-component tree-shaking with zero unused CSS residue" },
      ],
      challenge:
        "Modern glassmorphism and blur aesthetics often fail accessibility requirements due to poor contrast against variable backgrounds, missing ARIA focus rings, and clunky keyboard navigation across nested menus.",
      solution:
        "Created an adaptive token engine that dynamically calculates WCAG contrast ratios against underlying background luminances in real time, built atop unstyled Radix UI primitives and composable Tailwind CSS variants.",
      architecture: [
        "Radix UI headless primitives guaranteeing full WAI-ARIA compliance, roving tabindex, and screen reader announcements.",
        "CSS Custom Properties engine managing fluid viewport clamping (`clamp()` typography) and theme transitions.",
        "Automated Axe-core CI audit suite verifying contrast ratios across light, dark, and vibrant theme configurations.",
        "Token generator synchronizing Figma design variables directly into TypeScript token definitions.",
      ],
      features: [
        {
          title: "Adaptive Luminance Contrast",
          description: "Components automatically adjust text weights and border opacities when positioned over high-contrast or noisy imagery.",
        },
        {
          title: "Polished Keyboard Ergonomics",
          description: "Full keyboard traversal with visible custom focus indicators that automatically suppress during mouse interactions.",
        },
        {
          title: "Zero-Runtime Theme Engine",
          description: "Switch between dark palettes, high-contrast monochrome, or vivid themes instantly without re-rendering component trees.",
        },
      ],
      results:
        "Adopted across multiple commercial web properties, increasing accessibility scores to 100/100 on Lighthouse while drastically improving development velocity.",
    },
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
    caseStudy: {
      headline:
        "Compiling a high-speed Hierarchical Navigable Small World (HNSW) vector search engine to WebAssembly for local-first AI apps.",
      role: "Systems & Algorithms Engineer",
      timeline: "3 Months • 2025",
      metrics: [
        { label: "Query Time", value: "0.38 ms", detail: "Sub-millisecond similarity search over 50,000 768-dim embeddings" },
        { label: "Memory Footprint", value: "18 MB", detail: "SIMD-vectorized graph representation with scalar quantization" },
        { label: "Throughput", value: "2,600 QPS", detail: "Queries per second running completely inside browser tab memory" },
      ],
      challenge:
        "Local-first AI applications (like private document Q&A or semantic search) cannot afford roundtrip latency to remote vector databases, but running vector similarity across thousands of high-dimensional embeddings in JS freezes the browser tab.",
      solution:
        "Implemented the HNSW graph algorithm in Rust, compiling to WebAssembly with 128-bit SIMD intrinsics. Embedded an 8-bit scalar quantization module that slashes memory usage by 75% while maintaining 99.2% recall accuracy.",
      architecture: [
        "Rust core compiled to wasm32-unknown-unknown with `-C target-feature=+simd128` optimizations.",
        "Cosine similarity and Euclidean distance kernels unrolled and vectorized using portable WebAssembly SIMD.",
        "SharedArrayBuffer memory mapping enabling multi-threaded queries across a pool of Web Workers.",
        "IndexedDB persistence layer streaming serialized vector graph snapshots to local browser disk.",
      ],
      features: [
        {
          title: "WASM SIMD Vector Acceleration",
          description: "Calculates 4 floating-point dot products in a single CPU instruction, achieving near-native desktop performance.",
        },
        {
          title: "8-Bit Scalar Quantization",
          description: "Compresses 32-bit floating point vectors into compact 8-bit integers, reducing memory footprint by 4x without accuracy loss.",
        },
        {
          title: "Zero-Network Semantic Search",
          description: "Enables 100% private, offline search over user notes, documents, and codebases directly in the client browser.",
        },
      ],
      results:
        "Demonstrated instant, privacy-preserving semantic similarity search directly in the browser with query times that rival dedicated cloud vector services.",
    },
  },
];
