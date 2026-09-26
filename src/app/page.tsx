"use client";

import { useState } from "react";
import { ClosingPlasma } from "@/components/ui/closing-plasma";
import {
  Code2,
  Smartphone,
  Server,
  Sparkles,
  Mail,
  Copy,
  Check,
  ChevronRight,
  Layers,
  Cpu,
  Flame,
  ArrowUpRight,
  Terminal,
  Activity,
  Sliders,
} from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Home() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [plasmaSpeed, setPlasmaSpeed] = useState(1);
  const [plasmaTurbulence, setPlasmaTurbulence] = useState(1);
  const [showControls, setShowControls] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("harshitgujar1604@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const projects = [
    {
      title: "Stron — Fitness & Social Run Ecosystem",
      category: "Mobile & Web Platform",
      badge: "Flagship Product",
      description:
        "Full-stack fitness ecosystem powering active run clubs, gym discovery across 5+ major metropolitan cities (Bangalore, Mumbai, Delhi, Hyderabad, Pune), real-time workout stats, and community events.",
      tech: [
        "React Native",
        "Expo",
        "Node.js",
        "MongoDB",
        "AWS S3",
        "Razorpay",
        "PostHog",
      ],
      metrics: [
        "Cross-platform iOS & Android with native bridge",
        "Multi-city discovery & event check-ins",
        "Real-time payment & subscription processing",
      ],
      link: "https://github.com/harshitgujar",
      isPrimary: true,
    },
    {
      title: "Apollo Scraper & Data Pipeline",
      category: "Data Engineering & Automation",
      badge: "High Throughput",
      description:
        "Engineered an automated data extraction and enrichment engine capable of harvesting, deduplicating, and formatting structured B2B contact intelligence for outbound sales workflows.",
      tech: ["Node.js", "Cheerio", "Express", "REST APIs", "Automation"],
      metrics: [
        "Intelligent rate limiting & queueing",
        "Robust error-handling & schema validation",
      ],
      link: "https://github.com/harshitgujar",
      isPrimary: false,
    },
    {
      title: "AI Mail Drafter & Workflow Agent",
      category: "GenAI & Developer Tooling",
      badge: "LLM Orchestration",
      description:
        "Context-aware automated communication assistant powered by Google GenAI models and custom system prompts, automating prompt-to-draft generation with tone customization.",
      tech: ["Google GenAI", "Node.js", "Express", "Zod", "TypeScript"],
      metrics: [
        "Structured outputs with Zod validation",
        "Low-latency streaming responses",
      ],
      link: "https://github.com/harshitgujar",
      isPrimary: false,
    },
    {
      title: "Interactive WebGL & Motion Labs",
      category: "Creative Coding & UI Labs",
      badge: "Shader Experiments",
      description:
        "Explorations in GPU-accelerated computing, fragment shaders, Perlin/Simplex noise fields, and interactive Spline 3D canvas experiences.",
      tech: ["WebGL", "GLSL Shaders", "Canvas API", "Tailwind CSS", "Next.js"],
      metrics: [
        "60fps hardware-accelerated fluid mechanics",
        "Dynamic mouse pointer displacement",
      ],
      link: "https://github.com/harshitgujar",
      isPrimary: false,
    },
  ];

  const skillCategories = [
    {
      icon: Smartphone,
      title: "Mobile Architecture",
      accent: "from-blue-500/20 to-cyan-500/10",
      skills: [
        "React Native",
        "Expo (Prebuild, Dev Client)",
        "iOS Codegen & CocoaPods",
        "Android ADB & Native Setup",
        "In-App Purchases (StoreKit)",
        "Cross-Platform State & Nav",
      ],
    },
    {
      icon: Code2,
      title: "Frontend & Creative Web",
      accent: "from-indigo-500/20 to-purple-500/10",
      skills: [
        "Next.js (App Router)",
        "React 19 & TypeScript",
        "Tailwind CSS v4",
        "WebGL & GLSL Shaders",
        "Framer Motion / Motion",
        "Responsive & Glassmorphic UI",
      ],
    },
    {
      icon: Server,
      title: "Backend & Cloud Services",
      accent: "from-emerald-500/20 to-teal-500/10",
      skills: [
        "Node.js & Express.js",
        "MongoDB & Mongoose",
        "AWS S3 & Cloud Storage",
        "Firebase Admin & Auth",
        "Razorpay Payments",
        "PostHog Analytics & Telemetry",
      ],
    },
    {
      icon: Cpu,
      title: "Engineering & Tooling",
      accent: "from-amber-500/20 to-orange-500/10",
      skills: [
        "Git & CI/CD Pipelines",
        "Google GenAI (Gemini SDK)",
        "Zod Schema Validation",
        "Vitest & Supertest",
        "RESTful API Design",
        "Postman & Performance Profiling",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
      {/* 🌌 WebGL ClosingPlasma Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ClosingPlasma
          speed={plasmaSpeed}
          turbulence={plasmaTurbulence}
          mouseInfluence={1.2}
          grain={0.9}
          sparkle={1.2}
          vignette={1.1}
          opacity={0.88}
          interactive={true}
          darkColorA="#0a0c16"
          darkColorB="#171e38"
          darkColorC="#3f588a"
          lightColorA="#18223c"
          lightColorB="#25355e"
          lightColorC="#5478b8"
          className="w-full h-full"
        />
        {/* Subtle vignette and ambient depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/40 via-transparent to-[#08090f]/80 pointer-events-none" />
      </div>

      {/* 🧭 Floating Navigation */}
      <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
        <nav className="glass-panel rounded-full px-5 py-3 flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl">
          <a
            href="#hero"
            className="flex items-center gap-2.5 font-bold tracking-tight text-white group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-xs font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              HG
            </div>
            <span className="text-sm tracking-wide font-medium text-slate-200 group-hover:text-white transition-colors">
              Harshit Gujar
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-slate-300 font-medium">
            <a
              href="#projects"
              className="hover:text-blue-300 transition-colors"
            >
              Projects
            </a>
            <a href="#stack" className="hover:text-blue-300 transition-colors">
              Stack
            </a>
            <a href="#about" className="hover:text-blue-300 transition-colors">
              Philosophy
            </a>
            <a
              href="#contact"
              className="hover:text-blue-300 transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Work
            </div>
            <a
              href="#contact"
              className="text-xs px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-600/30 active:scale-95"
            >
              Let&apos;s Talk
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-16 sm:pt-24 pb-24 space-y-28">
        {/* 🚀 Hero Section */}
        <section
          id="hero"
          className="flex flex-col items-start justify-center min-h-[75vh] pt-6"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-blue-300 mb-6 border border-blue-400/20 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Full-Stack & Mobile Systems Engineer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Building high-performance <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
              mobile apps & fluid web systems.
            </span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-slate-300/90 leading-relaxed mb-8 font-normal">
            I specialize in crafting full-lifecycle applications — from reactive{" "}
            <span className="text-white font-semibold">React Native / Expo</span>{" "}
            mobile architectures to scalable{" "}
            <span className="text-white font-semibold">Node.js backends</span>{" "}
            and atmospheric{" "}
            <span className="text-white font-semibold">WebGL experiences</span>.
            Founder & builder of <span className="text-blue-300">Stron</span>.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Projects
              <ChevronRight className="w-4 h-4" />
            </a>

            <button
              onClick={copyEmailToClipboard}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel glass-panel-hover text-slate-200 text-sm font-medium"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/harshitgujar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel glass-panel-hover text-slate-300 hover:text-white"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Highlights Grid / Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-white/10">
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Full-Stack
              </div>
              <div className="text-xs text-slate-400">
                End-to-end architecture & APIs
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
                iOS & Android
              </div>
              <div className="text-xs text-slate-400">
                React Native & Expo ecosystem
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-300 mb-1">
                Cloud & Data
              </div>
              <div className="text-xs text-slate-400">
                MongoDB, S3, Automated pipelines
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-purple-300 mb-1">
                WebGL & GPU
              </div>
              <div className="text-xs text-slate-400">
                Hardware-accelerated shaders
              </div>
            </div>
          </div>
        </section>

        {/* 💻 Featured Projects */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
                <Layers className="w-4 h-4" /> Selected Portfolio
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Featured Work & Systems
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              Real-world software built with scalability, slick interactions,
              and strict attention to performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className={`glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between border ${
                  proj.isPrimary
                    ? "md:col-span-2 border-blue-500/30 bg-gradient-to-br from-[#12192d]/80 via-[#0d1326]/70 to-[#090d1a]/90"
                    : "border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {proj.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-slate-300/90 leading-relaxed mb-5">
                    {proj.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {proj.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-slate-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Inspect
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🛠️ Skills & Tech Stack */}
        <section id="stack" className="space-y-8 scroll-mt-24">
          <div className="border-b border-white/10 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
              <Terminal className="w-4 h-4" /> Capabilities & Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Tools & Technologies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/20 text-blue-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.03] px-3 py-2 rounded-lg border border-white/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* 💡 Engineering Philosophy & Workflow */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Flame className="w-4 h-4" /> Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Architected for speed, built for humans.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether deploying a native iOS/Android build, scaling high-throughput
                scraping pipelines, or synthesizing fluid WebGL shaders, my priority
                is always delivering butter-smooth 60fps responsiveness paired with
                uncompromising reliability under the hood.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="text-sm font-semibold text-white mb-1">
                    Native Velocity
                  </div>
                  <div className="text-xs text-slate-400">
                    Optimized React Native bridges, fast start times, and zero UI stutters.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="text-sm font-semibold text-white mb-1">
                    Resilient Backends
                  </div>
                  <div className="text-xs text-slate-400">
                    Strong typing, safe rate limits, and clear schema contracts.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="text-sm font-semibold text-white mb-1">
                    Aesthetic Precision
                  </div>
                  <div className="text-xs text-slate-400">
                    Living shaders, tailored typography, and frictionless usability.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📬 Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto text-blue-300">
                <Mail className="w-6 h-6" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let&apos;s build something exceptional.
              </h2>

              <p className="text-sm sm:text-base text-slate-300">
                Interested in collaborating on mobile apps, scalable web products, or AI tools?
                My inbox is always open.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href="mailto:harshitgujar1604@gmail.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                  harshitgujar1604@gmail.com
                </a>

                <button
                  onClick={copyEmailToClipboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl glass-panel glass-panel-hover text-slate-200 text-sm font-medium"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-6 text-xs text-slate-400">
                <a
                  href="https://github.com/harshitgujar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Activity className="w-4 h-4 text-emerald-400" /> Bangalore / Remote
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🎛️ Live Plasma Background Tweak Toolbar (Bottom-Right Floating) */}
      <div className="fixed bottom-4 right-4 z-50">
        {showControls ? (
          <div className="glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-2xl w-64 space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                WebGL Plasma Engine
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="text-[11px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Speed</span>
                <span className="font-mono text-blue-300">{plasmaSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={plasmaSpeed}
                onChange={(e) => setPlasmaSpeed(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1 bg-white/20 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Turbulence</span>
                <span className="font-mono text-blue-300">
                  {plasmaTurbulence.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.1"
                value={plasmaTurbulence}
                onChange={(e) => setPlasmaTurbulence(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1 bg-white/20 rounded-lg"
              />
            </div>

            <div className="text-[10px] text-slate-400 pt-1 text-center font-mono">
              Pointer-reactive GLSL noise
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowControls(true)}
            className="glass-panel glass-panel-hover px-3 py-2 rounded-full border border-white/15 text-xs text-slate-300 hover:text-white flex items-center gap-2 shadow-xl backdrop-blur-xl"
            title="Adjust WebGL Background"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Plasma Shader</span>
          </button>
        )}
      </div>

      {/* ⚓ Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Harshit Gujar. Powered by Next.js & WebGL Closing Plasma.</p>
      </footer>
    </div>
  );
}
