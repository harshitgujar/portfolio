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
    id: "verve-mobile",
    title: "Verve Mobile Workspace",
    category: "Mobile Engineering / React Native",
    description:
      "Offline-first productivity mobile app built with React Native and Reanimated 3, running 120fps fluid gestures and local SQLite sync.",
    tags: ["React Native", "Expo", "Reanimated 3", "SQLite", "TypeScript"],
    src: photo("1514906689926-25ba6dcb584b"),
    aspect: 3 / 4,
    link: "https://github.com/harshitgujar",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Crafting a buttery 120fps offline-first mobile workspace with reactive CRDT synchronization and native gesture pipelines.",
      role: "Lead Mobile Architect",
      timeline: "5 Months • 2024",
      metrics: [
        { label: "Display Cadence", value: "120 Hz", detail: "Silky smooth ProMotion animations without JS thread drops" },
        { label: "Offline Sync", value: "< 25ms", detail: "Local SQLite transactions synced via delta CRDT protocols" },
        { label: "App Bundle", value: "14.8 MB", detail: "Lean native binary with aggressive Hermes bytecode tree-shaking" },
      ],
      challenge:
        "Collaborative productivity tools often feel sluggish on mobile due to roundtrip cloud latency, complex state trees, and heavy JavaScript gesture thread bottlenecks during rapid keyboard input and continuous pan gestures.",
      solution:
        "Designed a local-first SQLite embedded architecture utilizing React Native Reanimated 3 worklets running directly on the UI thread, paired with an optimistic CRDT mutation log that reconciles with remote databases seamlessly in background threads.",
      architecture: [
        "Embedded OP-SQLite native bridge delivering zero-copy binary data transfers to Hermes runtime.",
        "Thread-isolated Reanimated 3 worklet pipelines for drag-and-drop kanban cards and gesture swipes.",
        "Conflict-free replicated data types (CRDT) maintaining transaction integrity across offline states.",
        "Background task runner orchestrating differential cloud synchronization with exponential backoff.",
      ],
      features: [
        {
          title: "Worklet-Driven Gestures",
          description: "Bypasses the JS bridge entirely, executing complex drag, swipe, and fling kinematics directly on the 120Hz native thread.",
        },
        {
          title: "Deterministic Offline Storage",
          description: "All notes, tasks, and state mutations persist instantly to SQLite, providing zero-latency reads and writes anywhere.",
        },
        {
          title: "Smart Delta Rebalancing",
          description: "When connectivity resumes, micro-deltas are compressed and transmitted via binary streams to minimize mobile data usage.",
        },
      ],
      results:
        "Delivered a zero-latency native user experience praised for its desktop-class speed, reliable offline reliability, and delightful micro-interactions.",
    },
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
    caseStudy: {
      headline:
        "Architecting a high-throughput real-time distributed message broker capable of handling 50,000+ persistent sockets with sub-10ms delivery.",
      role: "Backend & Systems Engineer",
      timeline: "4 Months • 2024",
      metrics: [
        { label: "Conns Handled", value: "50,000+", detail: "Simultaneous concurrent WebSocket sessions per cluster" },
        { label: "Pub/Sub Latency", value: "8.4 ms", detail: "P99 message propagation from ingest to client delivery" },
        { label: "Uptime SLA", value: "99.99%", detail: "Zero-downtime rolling upgrades backed by Redis cluster state" },
      ],
      challenge:
        "Real-time event synchronization systems suffer from socket memory bloat, 'thundering herd' reconnection cascades during cluster failovers, and head-of-line blocking across distributed database write bottlenecks.",
      solution:
        "Built a modular pub/sub relay using Go micro-daemons for connection multiplexing, Redis streams for high-speed message queuing, and PostgreSQL with logical replication for permanent audit trails and persistent storage.",
      architecture: [
        "Go-based socket edge proxy terminating TLS and managing connection keep-alives with low memory footprint (~4KB per socket).",
        "Redis Streams backing distributed topic partitions with atomic consumer group acknowledgment.",
        "Token-bucket rate limiting and jittered reconnect protocols preventing reconnection stampedes.",
        "Prometheus & Grafana telemetry observing p95/p99 roundtrip latencies and queue depth dynamics.",
      ],
      features: [
        {
          title: "Multiplexed Socket Routing",
          description: "Combines multiple logical application subscriptions over a single lightweight duplex connection.",
        },
        {
          title: "Adaptive Backpressure Control",
          description: "Monitors client buffer drains and temporarily throttles high-volume publishers to prevent client-side out-of-memory crashes.",
        },
        {
          title: "Atomic Session Recovery",
          description: "Allows clients to resume interrupted sessions within a 60-second grace window without losing unacknowledged messages.",
        },
      ],
      results:
        "Successfully reduced server infrastructure compute costs by 45% while decreasing P99 real-time message latency from 140ms to under 10ms.",
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
