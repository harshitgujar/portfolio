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
  website?: string;
  appStore?: string;
  playStore?: string;
  caseStudy?: any;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "digital-cd",
    title: "Digital CD Studio",
    category: "0→1 Creative Tool & Interactive Audio",
    description:
      "A tactile digital CD & vinyl packaging workstation featuring physical light refraction, anisotropic reflection physics, real-time audio playback, and high-res export.",
    tags: ["0→1 Product", "Creative Tool", "Interactive Audio", "Canvas 2D", "Next.js"],
    src: "/digital-cd.webp",
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
    title: "Fluid Studio",
    category: "0→1 Creative Tool & Smoke Shader Engine",
    description:
      "A real-time WebGL smoke & fluid shader generator and interactive customization studio for high-craft hero surfaces and live JSX/TSX code export.",
    tags: ["0→1 Product", "Creative Tool", "WebGL", "GLSL Shaders", "Next.js"],
    src: "/fluid-studio.webp",
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
          image: "/fluid-studio.png",
        },
        {
          title: "Hardware-Inspired Studio Console",
          tag: "Interaction Design",
          description: "Tactile tick-mark sliders and live palette pickers providing instant visual feedback on every micro-adjustment.",
          image: "/fluid-studio.png",
        },
        {
          title: "One-Click Production Export",
          tag: "Developer Experience",
          description: "Instantly copy tailored JSX snippets or the entire self-contained component source into any Next.js app.",
          image: "/fluid-studio.png",
        },
      ],
      results:
        "Delivered a viral open-source creative tool empowering designers and developers to generate, personalize, and copy production-grade WebGL hero backgrounds.",
    },
  },
  {
    id: "evora",
    title: "EVORA",
    category: "0→1 Product Design & Mobile Platform",
    description:
      "Simplifying the College Event Experience: A unified mobile ecosystem connecting Students, Clubs, and Authorities with seamless event discovery, in-app UPI ticketing, and digital governance.",
    tags: ["0→1 Product", "UX Research", "Mobile App", "Design System", "Figma"],
    src: "/evora.webp",
    aspect: 3 / 4,
    link: "/evora",
    figma: "https://www.figma.com/@harshitgujar",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Designing a unified college event management platform connecting 20k+ students, 40+ clubs, and faculty coordinators across VIT Bhopal.",
      role: "Lead Experience Designer & Event Coordinator",
      timeline: "14 Weeks • 2026",
      platform: "Mobile iOS & Admin Console (Figma / Notion / Design System)",
      status: "Featured Case Study",
      metrics: [
        { label: "Missed Events Solved", value: "78%", detail: "Addressed primary reason students missed campus fests and workshops" },
        { label: "Unified App Demand", value: "90%", detail: "Survey respondents demanding a single app over fragmented WhatsApp groups" },
        { label: "Instant Reminders", value: "92%", detail: "Demand for instant schedule alerts, venue changes, and ticket notifications" },
        { label: "Ecosystem Roles", value: "3 Roles", detail: "Interconnected workflows for Students, Club Organizers, and College Authorities" },
      ],
      challenge:
        "Managing college events involves scattered WhatsApp groups, manual Google Form registrations, offline payment verification, and zero administrative oversight, leaving students uninformed and organizers overwhelmed.",
      solution:
        "Designed EVORA: a college-exclusive digital platform streamlining event discovery, instant UPI ticketing, dynamic QR check-ins, club analytics, and faculty approval pipelines.",
      designSystem: {
        tokens: ["Campus Kinetic Tokens", "High-Contrast Dark Mode", "Dynamic QR Tokens", "Role-Based Component Matrix"],
        description: "Crafted a vibrant yet utilitarian interface tuned for rapid discovery under bright campus sunlight and sub-second door check-ins during packed events."
      },
      architecture: [
        "Unified Discovery Feed: Real-time categorized event stream with timeline filtering (Today, This Week, This Month).",
        "Dynamic QR Check-in: Encrypted QR passes generated instantly upon UPI payment, scanned in <0.5s by organizers.",
        "Role-Based Access Control: Granular views tailored for student attendees, club executive committees, and faculty in-charges.",
        "Centralized Approval Pipeline: Faculty dashboard enabling instant verification, policy adherence checks, and calendar locking.",
      ],
      features: [
        {
          title: "Student Discovery & Instant Pass",
          tag: "Mobile Experience",
          description: "Categorized event exploration with in-app UPI checkout and dynamic QR passes stored directly in the student wallet.",
          image: "/evora/screens/Users_perspective_iPhone_13_mini_-_104.png",
        },
        {
          title: "Club Organizer Studio",
          tag: "Event Operations",
          description: "Centralized workspace for club leads to stage events, manage ticket tiers, track live revenue, and scan QR check-ins.",
          image: "/evora/screens/Organizers_Perspective_Clubs_home_page.png",
        },
        {
          title: "Faculty Governance Console",
          tag: "Administrative Portal",
          description: "Single-pane dashboard for campus authorities to review club submissions, ensure policy compliance, and audit engagement.",
          image: "/evora/screens/Authorities_Perspective_Home.png",
        },
      ],
      results:
        "Delivered 40+ production-ready screens, 3 end-to-end user journeys, and a cohesive design system validated through usability testing with 15+ student club leads at VIT Bhopal.",
    },
  },
  {
    id: "arken",
    title: "Arken Creatives",
    category: "0→1 Product Design & Creative Studio",
    description:
      "An independent design and engineering studio crafting iconic 3D character universes, visceral visual identities, and interactive web experiences.",
    tags: ["0→1 Product", "Creative Studio", "3D & Brand", "Design System", "Art Direction"],
    src: "/arken.webp",
    aspect: 3 / 4,
    link: "/arken",
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
          title: "Tactile Merchandise & Audio CD Kit",
          tag: "Physical Artifacts",
          description: "Physical collectible release system featuring jewel-case CD audio packaging, 3D chrome star charms, and specimen sheets.",
          image: "/arken/arken-sticker-sheet-artifacts.webp",
        },
        {
          title: "Optical Identity & Creative Direction",
          tag: "Campaign Art Direction",
          description: "Cinematic macro iris campaign key visual pairing high-detail human eye optics with an emerald neon Arken insignia.",
          image: "/arken/arken-vision-eye-campaign.webp",
        },
      ],
      results:
        "Established Arken Creatives as a recognized creative playground and design studio, bridging physical subculture collectibles with world-class digital product design.",
    },
  },
  {
    id: "spotify",
    title: "Spotify Reimagined",
    category: "0→1 Conceptual Product Redesign & Social Music",
    description:
      "A comprehensive social & interactive redesign of Spotify — introducing in-track floating comments over album art, native music DMs with emoji reactions, and analytics-driven taste profiles.",
    tags: ["Product Redesign", "Mobile UX", "Music Streaming", "Social UX", "Figma"],
    src: "/spotify.webp",
    aspect: 3 / 4,
    link: "/spotify",
    figma: "https://www.figma.com/@harshitgujar",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Transforming Spotify from a passive music utility into an engaging, community-driven social streaming experience.",
      role: "Lead Product & UX Designer",
      timeline: "2026 • Conceptual Redesign",
      platform: "iOS Mobile (iPhone 13 Mini)",
      status: "Behance Case Study",
      metrics: [
        { label: "Social Sharing", value: "Native", detail: "100% in-app music chats without external link copy-pasting" },
        { label: "Community", value: "Real-Time", detail: "Dynamic fading shuffle comment bubbles over album cover art" },
        { label: "Taste Analytics", value: "Verified", detail: "Automated top artists and genres with one-tap privacy control" },
        { label: "UX Prototype", value: "9 Screens", detail: "End-to-end design system from inbox to player discussions" },
      ],
      challenge:
        "Mainstream music streaming platforms treat listening as an isolated, solitary utility. Users discover great songs but are forced to leave Spotify to share them, with no space for spontaneous discussions or reactions.",
      solution:
        "Designed Spotify Reimagined with three core pillars: in-track floating comments that shuffle over album art, dedicated music DMs with hold-to-react emojis, and authentic analytics profiles with full privacy controls.",
      designSystem: {
        tokens: ["Spotify Emerald #1ED760", "Midnight Obsidian #07090C", "Fading Shuffle Bubbles", "Seen/Unseen Weight Typography"],
        description: "Built upon Spotify's dark-mode design language while introducing fluid micro-interactions, spring-based reaction trays, and clear typographic hierarchy for conversational music."
      },
      architecture: [
        "In-Track Comment Engine: Fading shuffle bubbles floating over album artwork synchronized with track playback.",
        "Music DM Protocol: Dedicated chat architecture rendering rich song cards, seen/unseen font weights, and multi-track counters.",
        "Hold-to-React Quick Strip: Frictionless emoji reaction overlay and one-tap 'Add to Playlist' shortcuts.",
        "Privacy-First Analytics Profile: Granular visibility toggle allowing listeners to share or hide listening metrics.",
      ],
      features: [
        {
          title: "In-Track Floating Comments",
          tag: "Community Interaction",
          description: "Comments dynamically appear over cover art with fading shuffle effects as songs play, plus an expandable discussion drawer.",
          image: "/spotify/screens/02-now-playing-floating-comments.png",
        },
        {
          title: "Native Music DMs & Reactions",
          tag: "Conversational Sharing",
          description: "Direct in-app messaging for songs with seen/unseen typography, pinned chats, and hold-to-react emoji strips.",
          image: "/spotify/screens/05-music-chat-conversation.png",
        },
        {
          title: "Analytics-Driven Taste Profiles",
          tag: "Identity & Privacy",
          description: "Authentic showcase of top artists, genres, and playlists derived from listening data with instant privacy toggle.",
          image: "/spotify/screens/01-profile-analytics.png",
        },
      ],
      results:
        "Created an acclaimed conceptual redesign celebrated on Behance that proves music streaming can be deeply personal and social without compromising Spotify's core simplicity.",
    },
  },
  {
    id: "runagon",
    title: "Runagon",
    category: "0→1 Product Design & AI Second Brain (In Progress)",
    description:
      "Currently in active development — Your Second Brain that thinks with you. Designed the 0→1 brand identity, beta recruitment campaign, and interactive 3D Join Waitlist website.",
    tags: ["In Progress", "0→1 Product", "AI Second Brain", "Brand Identity", "Waitlist Web UI"],
    src: "/runagon.webp",
    aspect: 3 / 4,
    link: "/runagon",
    figma: "https://vorph.dpdns.org/",
    github: "https://github.com/harshitgujar",
    caseStudy: {
      headline:
        "Designing Runagon (In Progress): a local-first personal knowledge capture ecosystem, 6-blade geometric brand identity, and interactive 3D Join Waitlist website.",
      role: "Lead Product & Brand Designer",
      timeline: "2026 – In Progress",
      platform: "Waitlist Web UI, Brand System & Beta Campaign",
      status: "In Progress • Waitlist Open",
      metrics: [
        { label: "Architecture", value: "Local-First", detail: "Instant personal knowledge capture and search across all notes" },
        { label: "AI Portability", value: "100%", detail: "Connected context portable across Notion, Obsidian, and AI tools" },
        { label: "3D Web Engine", value: "60 FPS", detail: "Interactive Spline 3D cobalt sphere cluster on a 3×3 crosshair grid" },
        { label: "Brand System", value: "360°", detail: "6-blade aperture logo, desktop UI, and cross-channel beta campaign" },
      ],
      challenge:
        "Traditional note-taking apps turn into passive graveyards of saved links and forgotten folders that require constant manual organization.",
      solution:
        "Crafted Runagon from 0→1 as an intelligent Second Brain—pairing a 6-blade optical aperture identity with an interactive 3D web flagship and a targeted beta program for Notion and Obsidian users.",
      designSystem: {
        tokens: ["Electric Cobalt (#2244FF)", "Periwinkle Daylight Glass", "3×3 Crosshair Grid", "6-Blade Aperture Mark"],
        description: "Engineered a dual-theme design system uniting airy daylight glassmorphism on the web flagship with deep-void cobalt luminescence across social launch campaigns."
      },
      architecture: [
        "3×3 Crosshair Coordinate Grid: Precision Swiss layout framing navigation, 3D spheres, and waitlist actions.",
        "Interactive Spline 3D Sphere Cluster: Real-time magnetic cobalt spheres visualizing interconnected memory nodes.",
        "Adaptive Light & Dark Theme Engine: Seamless toggle between periwinkle daylight glass and deep memory void.",
        "Frictionless Waitlist & Beta Pipeline: Integrated waitlist and Q&A flows live at vorph.dpdns.org.",
      ],
      features: [
        {
          title: "Flagship Desktop Web UI",
          tag: "Web Experience",
          description: "Interactive 3D neural sphere cluster and crosshair grid live at vorph.dpdns.org.",
          image: "/runagon/macbook-web-ui.png",
        },
        {
          title: "Beta Testing Launch Campaign",
          tag: "Product Launch",
          description: "'Bring your Memory. Help build the app that keeps up.' beta recruitment system for Notion and Obsidian users.",
          image: "/runagon/instagram-beta-poster.png",
        },
        {
          title: "6-Blade Aperture Brand System",
          tag: "Brand Identity",
          description: "Rotational geometric logotype, radial cobalt luminescence posters, and widescreen social headers.",
          image: "/runagon/runagon-emblem-poster.png",
        },
      ],
      results:
        "Launched the Runagon brand universe and live interactive web flagship at vorph.dpdns.org, onboarding founding beta testers across Notion, Obsidian, and notebook workflows.",
    },
  },
  {
    id: "stron",
    title: "STRON",
    category: "Athletic Racing & Gym OS",
    description:
      "End-to-end fitness ecosystem: complete React Native mobile app UI/UX, brand logo identity, App Store & Google Play Store presentation graphics, verified achievement certificates, admin console, and web platform.",
    tags: ["Mobile App UI/UX", "Brand & Logo", "Store Screenshots", "Certificates", "Admin Console", "Web Platform"],
    src: "/stron.webp",
    aspect: 3 / 4,
    link: "/stron",
    website: "https://stron.in",
    appStore: "https://apps.apple.com/us/app/stron-gyms-events-more/id6776768421",
    playStore: "https://play.google.com/store/apps/details?id=com.stepwars.stepwarsnew_app&hl=en_IN",
    caseStudy: {
      headline:
        "Designing and engineering STRON from 0→1: an athletic fitness racing mobile app, gym OS, verified digital certificates, owner admin console, and marketing platform.",
      role: "Founding Designer & Full-Stack Developer",
      timeline: "2026",
      platform: "React Native (iOS & Android) • Web Admin Console (Vite / React) • Marketing Web",
      status: "Production Ecosystem",
      metrics: [
        { label: "Platforms", value: "3 Platforms", detail: "React Native Mobile App, Owner Admin Console, and Marketing Web" },
        { label: "Design System", value: "100+ Tokens", detail: "Tactile dark athletic surfaces with strict functional color semantics" },
        { label: "Store Presence", value: "Dual Store", detail: "End-to-end App Store & Google Play Store presentation graphics" },
        { label: "Verification", value: "Instant Export", detail: "Shareable digital certificates of achievement with cryptographic validation" },
      ],
      challenge:
        "Fitness apps either feel like dry workout spreadsheets or fragmented booking tools without athletic excitement, club cohesion, or verified race accomplishments.",
      solution:
        "Architected STRON as a high-octane competitive fitness racing platform and complete gym operating system, unifying athletes, gym owners, coaches, and race organizers through a unified dark athletic design system.",
      designSystem: {
        tokens: ["Electric Sapphire Gradient", "Tactile Dark Canvas (#050506)", "STRON Gold PRO Tier (#F0B83C)", "Status Dot Semantics"],
        description: "Built around a clear visual philosophy: flat dark surfaces carry the UI, an electric blue gradient carries the brand, and color is never decorative — it always encodes status or meaning."
      },
      architecture: [
        "Competitive Fitness Racing Engine: Real-time step racing, King of the Hill challenges, face-offs, and virtual marathons with live telemetry.",
        "Multi-City Gym Discovery & QR OS: Location-indexed gym pass across Bangalore, Delhi, Mumbai, Hyderabad, and Pune with instant QR check-in.",
        "Verified E-Certificates Engine: Pixel-perfect digital achievement certificates with custom corner ornaments, finishing time, and social share cards.",
        "Owner & Staff Admin Console: Single-pane dashboard for gym managers to track revenue, manage memberships, stage events, and audit attendance.",
        "Marketing & Discovery Web Platform: High-conversion responsive website with interactive device mockups, pricing tiers, and city filter engines.",
      ],
      features: [
        {
          title: "Competitive Racing & Social Feed",
          tag: "Mobile App Experience",
          description: "Real-time athletic race lobbies, step face-offs, and live countdown timers designed with high-contrast tactical dark surfaces.",
          image: "/stron/engage-mockup-new.webp",
        },
        {
          title: "Gym Business & Membership OS",
          tag: "Gym Operations",
          description: "Multi-gym discovery, dynamic QR pass scanning, and club membership management for athletes and crossfit boxes.",
          image: "/stron/grow-mockup-new.webp",
        },
        {
          title: "Verified E-Certificate System",
          tag: "Achievement & Proof",
          description: "Cryptographically verified digital achievement certificates generated upon race completion with gold/sapphire badges and social share export.",
          image: "/stron/stron-logo.png",
        },
        {
          title: "Owner Admin Console & Web Suite",
          tag: "Full-Stack Web Console",
          description: "Dedicated web application for gym owners, event directors, and coaches to manage daily operations, attendance, and member tiers.",
          image: "/stron/hero-macbook-mockup.webp",
        },
      ],
      results:
        "Engineered the full STRON ecosystem from zero to production launch, including brand identity, App Store assets, mobile app screens, web console, and marketing platform.",
    },
  },
];

