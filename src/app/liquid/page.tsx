"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Code2,
  Sliders,
  X,
} from "lucide-react";
import { WebGLLiquid } from "@/components/ui/webgl-liquid";

export interface LiquidPreset {
  id: string;
  name: string;
  colorDeep: string;
  colorMid: string;
  colorHighlight: string;
  speed: number;
  flowStrength: number;
  grain: number;
  contrast: number;
  opacity: number;
  delayMs?: number;
}

const PRESETS: LiquidPreset[] = [
  {
    id: "default",
    name: "DEFAULT",
    colorDeep: "#04050b",
    colorMid: "#134d93",
    colorHighlight: "#8cecff",
    speed: 1.0,
    flowStrength: 1.0,
    grain: 0.05,
    contrast: 1.1,
    opacity: 0.95,
    delayMs: 0,
  },
  {
    id: "midnight",
    name: "MIDNIGHT",
    colorDeep: "#03050c",
    colorMid: "#0e2a6b",
    colorHighlight: "#3b82f6",
    speed: 0.8,
    flowStrength: 0.9,
    grain: 0.08,
    contrast: 1.25,
    opacity: 0.95,
    delayMs: 0,
  },
  {
    id: "aurora",
    name: "AURORA",
    colorDeep: "#021a1a",
    colorMid: "#105e4d",
    colorHighlight: "#34d399",
    speed: 1.2,
    flowStrength: 1.3,
    grain: 0.06,
    contrast: 1.2,
    opacity: 0.92,
    delayMs: 0,
  },
  {
    id: "rose-gold",
    name: "ROSE GOLD",
    colorDeep: "#1c0710",
    colorMid: "#832242",
    colorHighlight: "#fb7185",
    speed: 1.1,
    flowStrength: 1.2,
    grain: 0.07,
    contrast: 1.3,
    opacity: 0.9,
    delayMs: 0,
  },
  {
    id: "kinetic",
    name: "KINETIC",
    colorDeep: "#040506",
    colorMid: "#146684",
    colorHighlight: "#c6ffff",
    speed: 2.0,
    flowStrength: 1.1,
    grain: 0.16,
    contrast: 1.45,
    opacity: 0.82,
    delayMs: 0,
  },
];

// Interactive Hardware Tick-Mark Slider
interface HardwareSliderProps {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  ticks?: number;
}

function HardwareSlider({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
  ticks = 26,
}: HardwareSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const fraction = Math.min(Math.max((value - min) / (max - min), 0), 1);

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const rawPct = (clientX - rect.left) / rect.width;
      const clampedPct = Math.min(Math.max(rawPct, 0), 1);
      const rawVal = min + clampedPct * (max - min);
      const steppedVal = Math.round(rawVal / step) * step;
      onChange(Number(steppedVal.toFixed(3)));
    },
    [min, max, step, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    updateFromPointer(e.clientX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-neutral-300 font-medium">{label}</span>
        <span className="font-mono text-[11px] text-neutral-400">
          {displayValue}
        </span>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-9 rounded-md bg-[#0d0f17] border border-white/10 cursor-ew-resize overflow-hidden select-none"
      >
        {/* Subtle filled area */}
        <div
          className="absolute inset-y-0 left-0 bg-white/[0.06] border-r border-white/20 transition-all duration-75"
          style={{ width: `${fraction * 100}%` }}
        />

        {/* Vertical Tick Marks */}
        <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none opacity-40">
          {Array.from({ length: ticks }).map((_, i) => {
            const tickFraction = i / (ticks - 1);
            const isFilled = tickFraction <= fraction;
            const isMajor = i % 5 === 0;
            return (
              <div
                key={i}
                className={`transition-colors ${
                  isMajor ? "h-3.5 w-[1.5px]" : "h-2 w-[1px]"
                } ${isFilled ? "bg-white/90" : "bg-white/20"}`}
              />
            );
          })}
        </div>

        {/* Knob / Slider Thumb Indicator */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-sm pointer-events-none transform -translate-x-1/2 transition-all duration-75"
          style={{ left: `${fraction * 100}%` }}
        />
      </div>
    </div>
  );
}

const STANDALONE_COMPONENT_CODE = `"use client";

import React, { useEffect, useMemo, useRef } from "react";

const VERTEX_SHADER = \`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAGMENT_SHADER = \`
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_colorDeep;
uniform vec3 u_colorMid;
uniform vec3 u_colorHighlight;
uniform float u_speed;
uniform float u_flowStrength;
uniform float u_grain;
uniform float u_contrast;
uniform float u_opacity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.86, 0.51, -0.51, 0.86);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

vec3 applyContrast(vec3 c, float contrast) {
  return clamp((c - 0.5) * contrast + 0.5, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * (0.14 * u_speed);
  vec2 aspect = vec2(u_res.x / max(u_res.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;

  vec2 flowP = vec2(p.x * 1.1, p.y - t * 0.35);
  float n1 = fbm(flowP * 2.8 + vec2(0.0, t * 0.2));
  float n2 = fbm((flowP + n1 * 0.45) * 4.0 - vec2(0.0, t * 0.35));
  float n3 = fbm((flowP + n2 * 0.4) * 6.5 + vec2(t * 0.15, 0.0));

  float structure = n3 * 1.15 + (n2 - 0.5) * 0.5;
  structure += (n1 - 0.5) * 0.3 * u_flowStrength;

  float lowBand = smoothstep(0.18, 0.6, structure);
  float highBand = smoothstep(0.62, 1.08, structure);
  vec3 col = mix(u_colorDeep, u_colorMid, lowBand);
  col = mix(col, u_colorHighlight, highBand);

  float glow = smoothstep(0.52, 0.95, structure) * (0.35 + 0.5 * u_flowStrength);
  col += glow * u_colorHighlight * 0.35;

  float verticalMask = smoothstep(1.05, 0.05, uv.y);
  verticalMask = pow(verticalMask, 1.1);

  float vignette = smoothstep(1.28, 0.36, length(uv - 0.5));
  col *= mix(0.9, 1.05, vignette);

  col = applyContrast(col, u_contrast);

  float dither = (hash(gl_FragCoord.xy + t * 10.0) - 0.5) * u_grain;
  col += dither;

  float alpha = verticalMask * smoothstep(0.08, 0.95, structure);
  alpha *= u_opacity;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), clamp(alpha, 0.0, 1.0));
}
\`;

function hexToRgb01(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r || 0, g || 0, b || 0];
}

export interface WebGLLiquidProps extends React.HTMLAttributes<HTMLDivElement> {
  colorDeep?: string;
  colorMid?: string;
  colorHighlight?: string;
  speed?: number;
  flowStrength?: number;
  grain?: number;
  contrast?: number;
  opacity?: number;
  delayMs?: number;
  children?: React.ReactNode;
}

export function WebGLLiquid({
  colorDeep = "#040506",
  colorMid = "#146684",
  colorHighlight = "#c6ffff",
  speed = 1.0,
  flowStrength = 1.0,
  grain = 0.05,
  contrast = 1.1,
  opacity = 0.95,
  delayMs = 0,
  className = "",
  children,
  style,
  ...props
}: WebGLLiquidProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  const settings = useMemo(
    () => ({ colorDeep, colorMid, colorHighlight, speed, flowStrength, grain, contrast, opacity, delayMs }),
    [colorDeep, colorMid, colorHighlight, speed, flowStrength, grain, contrast, opacity, delayMs]
  );

  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const pos = gl.getAttribLocation(prog, "position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uColorDeep = gl.getUniformLocation(prog, "u_colorDeep");
    const uColorMid = gl.getUniformLocation(prog, "u_colorMid");
    const uColorHighlight = gl.getUniformLocation(prog, "u_colorHighlight");
    const uSpeed = gl.getUniformLocation(prog, "u_speed");
    const uFlowStrength = gl.getUniformLocation(prog, "u_flowStrength");
    const uGrain = gl.getUniformLocation(prog, "u_grain");
    const uContrast = gl.getUniformLocation(prog, "u_contrast");
    const uOpacity = gl.getUniformLocation(prog, "u_opacity");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = host.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    let rafId = 0;
    const start = performance.now();

    const render = (now: number) => {
      const cur = settingsRef.current;
      const elapsed = Math.max(0, (now - start - cur.delayMs) / 1000);
      const deep = hexToRgb01(cur.colorDeep);
      const mid = hexToRgb01(cur.colorMid);
      const hi = hexToRgb01(cur.colorHighlight);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTime, elapsed);
      gl.uniform3f(uColorDeep, deep[0], deep[1], deep[2]);
      gl.uniform3f(uColorMid, mid[0], mid[1], mid[2]);
      gl.uniform3f(uColorHighlight, hi[0], hi[1], hi[2]);
      gl.uniform1f(uSpeed, cur.speed);
      gl.uniform1f(uFlowStrength, cur.flowStrength);
      gl.uniform1f(uGrain, cur.grain);
      gl.uniform1f(uContrast, cur.contrast);
      gl.uniform1f(uOpacity, cur.opacity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={\`relative flex min-h-screen w-full items-center overflow-hidden bg-[#02040b] text-white \${className}\`}
      style={style}
      {...props}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {children}
    </div>
  );
}

export default WebGLLiquid;
`;

// Color Swatch Card Component
interface ColorSwatchCardProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

function ColorSwatchCard({ label, value, onChange }: ColorSwatchCardProps) {
  return (
    <div className="flex-1 min-w-[130px] flex items-center gap-3 p-2.5 rounded-md bg-[#0d0f17] border border-white/10 hover:border-white/20 transition-colors">
      <label className="relative w-8 h-8 rounded-sm overflow-hidden flex-shrink-0 cursor-pointer border border-white/15 shadow-inner">
        <div className="w-full h-full" style={{ backgroundColor: value }} />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
      <div className="flex-1 truncate">
        <span className="block text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
          {label}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-xs text-white focus:outline-none uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}

export default function WebGLLiquidStudioPage() {
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [showTextOverlay, setShowTextOverlay] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string>("kinetic");

  // Shader parameters
  const [colorDeep, setColorDeep] = useState("#040506");
  const [colorMid, setColorMid] = useState("#146684");
  const [colorHighlight, setColorHighlight] = useState("#c6ffff");
  const [speed, setSpeed] = useState(2.0);
  const [flowStrength, setFlowStrength] = useState(1.1);
  const [grain, setGrain] = useState(0.16);
  const [contrast, setContrast] = useState(1.45);
  const [opacity, setOpacity] = useState(0.82);
  const [delayMs, setDelayMs] = useState(0);

  // Toast & Export modal state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportTab, setExportTab] = useState<"jsx" | "component" | "config">("jsx");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const applyPreset = (p: LiquidPreset) => {
    setActivePresetId(p.id);
    setColorDeep(p.colorDeep);
    setColorMid(p.colorMid);
    setColorHighlight(p.colorHighlight);
    setSpeed(p.speed);
    setFlowStrength(p.flowStrength);
    setGrain(p.grain);
    setContrast(p.contrast);
    setOpacity(p.opacity);
    setDelayMs(p.delayMs ?? 0);
    showToast(`Loaded ${p.name} preset`);
  };

  const resetToDefault = () => {
    const def = PRESETS[0];
    applyPreset(def);
  };

  // Generate JSX Code Snippet
  const jsxSnippet = useMemo(() => {
    return `<WebGLLiquid
  colorDeep="${colorDeep}"
  colorMid="${colorMid}"
  colorHighlight="${colorHighlight}"
  speed={${speed}}
  flowStrength={${flowStrength}}
  grain={${grain}}
  contrast={${contrast}}
  opacity={${opacity}}
  delayMs={${delayMs}}
  className="w-full h-full min-h-screen"
/>`;
  }, [
    colorDeep,
    colorMid,
    colorHighlight,
    speed,
    flowStrength,
    grain,
    contrast,
    opacity,
    delayMs,
  ]);

  // Generate Config JSON
  const configJson = useMemo(() => {
    return JSON.stringify(
      {
        colorDeep,
        colorMid,
        colorHighlight,
        speed,
        flowStrength,
        grain,
        contrast,
        opacity,
        delayMs,
      },
      null,
      2
    );
  }, [
    colorDeep,
    colorMid,
    colorHighlight,
    speed,
    flowStrength,
    grain,
    contrast,
    opacity,
    delayMs,
  ]);

  const [hasCopiedModal, setHasCopiedModal] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setHasCopiedModal(true);
        setTimeout(() => setHasCopiedModal(false), 2000);
        showToast(`${label} copied to clipboard`);
        return;
      }
    } catch {}

    // Fallback for browsers without clipboard permissions
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setHasCopiedModal(true);
      setTimeout(() => setHasCopiedModal(false), 2000);
      showToast(`${label} copied to clipboard`);
    } catch {
      showToast("Unable to copy to clipboard");
    }
  };

  // Keyboard shortcut: Escape closes controls or modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isExportModalOpen) {
          setIsExportModalOpen(false);
        } else if (isControlsOpen) {
          setIsControlsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExportModalOpen, isControlsOpen]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#07080b] flex flex-col select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-[80] flex items-center gap-2 px-3.5 py-2 rounded-md bg-neutral-900/95 border border-white/15 text-white text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. TOP HEADER BAR (UNIFIED, SLEEK, WITH CD STUDIO STYLE) */}
      {/* ======================================================== */}
      <header className="relative w-full h-14 px-4 sm:px-6 md:px-8 flex items-center justify-between border-b border-white/[0.08] bg-[#08090d]/85 backdrop-blur-xl text-white z-40">
        {/* Left: Back to Portfolio & Studio Name */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs tracking-tight">
              Fluid Motion Studio
            </span>
          </div>
        </div>

        {/* Center: Current Preset Indicator (Clickable to Toggle Controls) */}
        <button
          type="button"
          onClick={() => setIsControlsOpen((prev) => !prev)}
          className="hidden md:flex items-center gap-2 text-xs text-neutral-400 font-mono hover:text-white transition-colors"
          title="Click to toggle controls"
        >
          <span>Preset:</span>
          <span className="px-2 py-0.5 rounded-sm bg-white/[0.06] border border-white/10 text-white font-sans font-medium text-[11px] tracking-wide uppercase hover:bg-white/[0.12] transition-colors">
            {PRESETS.find((p) => p.id === activePresetId)?.name || "Custom"}
          </span>
        </button>

        {/* Right: Quick Actions & Prominent Controls Button */}
        <div className="flex items-center gap-2">
          {/* Quick Copy Code */}
          <button
            type="button"
            onClick={() => copyToClipboard(jsxSnippet, "JSX snippet")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all"
            title="Copy JSX Component Code"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Code</span>
          </button>

          {/* Export Dialog */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all"
            title="Export Options"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* PROMINENT CONTROLS BUTTON (OPENS CONTROL PANEL) */}
          <button
            type="button"
            onClick={() => setIsControlsOpen((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all shadow-sm ${
              isControlsOpen
                ? "bg-white/20 text-white border border-white/30 shadow-white/5"
                : "bg-white text-black hover:bg-neutral-200 shadow-white/10"
            }`}
            aria-label="Toggle Controls Panel"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isControlsOpen ? "Close Controls" : "Controls"}</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. FULLSCREEN PURE LIQUID SHADER VIEWPORT (NO TEXT OVERLAY) */}
      {/* ======================================================== */}
      <div className="relative flex-1 w-full h-[calc(100vh-3.5rem)] overflow-hidden">
        <WebGLLiquid
          colorDeep={colorDeep}
          colorMid={colorMid}
          colorHighlight={colorHighlight}
          speed={speed}
          flowStrength={flowStrength}
          grain={grain}
          contrast={contrast}
          opacity={opacity}
          reveal={false}
          delayMs={delayMs}
          className="w-full h-full min-h-0"
        />
      </div>

      {/* ======================================================== */}
      {/* 3. CONTROL PANEL DRAWER (OPENS BY BUTTON LIKE CD STUDIO) */}
      {/* ======================================================== */}
      {/* Backdrop for mobile */}
      {isControlsOpen && (
        <div
          className="fixed inset-0 top-14 bg-black/40 backdrop-blur-sm z-40 sm:hidden animate-in fade-in duration-150"
          onClick={() => setIsControlsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-14 right-0 bottom-0 w-full sm:w-[420px] md:w-[460px] bg-[#090b10]/95 border-l border-white/[0.08] backdrop-blur-2xl shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isControlsOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Panel Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold tracking-tight text-white">
                Personalize
              </h2>
              <span className="px-1.5 py-0.5 rounded-sm bg-white/[0.06] border border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
                {PRESETS.find((p) => p.id === activePresetId)?.name || "Custom"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-neutral-400">
              Tune palette, motion dynamics, and shader response.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={resetToDefault}
              className="px-2 py-1 rounded-sm border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-[10px] font-mono tracking-wider text-neutral-300 hover:text-white transition-colors uppercase"
              title="Reset to default preset"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setIsControlsOpen(false)}
              className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Close controls"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Panel Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-xs no-scrollbar">
          {/* SECTION 1: PRESETS */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500 font-mono">
              PRESETS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESETS.map((p) => {
                const isActive = activePresetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-md border transition-all ${
                      isActive
                        ? "bg-white/[0.08] border-white/40 shadow-sm"
                        : "bg-[#0d0f17] border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Visual Horizontal Gradient Pill */}
                    <div
                      className="w-full h-4 rounded-full border border-white/15 shadow-inner"
                      style={{
                        background: `linear-gradient(90deg, ${p.colorDeep} 0%, ${p.colorMid} 50%, ${p.colorHighlight} 100%)`,
                      }}
                    />
                    <span
                      className={`mt-2 text-[10px] font-mono tracking-wider ${
                        isActive ? "text-white font-semibold" : "text-neutral-400"
                      }`}
                    >
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: PALETTE */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500 font-mono">
              PALETTE
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <ColorSwatchCard
                label="Deep Base"
                value={colorDeep}
                onChange={(val) => {
                  setColorDeep(val);
                  setActivePresetId("custom");
                }}
              />
              <ColorSwatchCard
                label="Mid Tone"
                value={colorMid}
                onChange={(val) => {
                  setColorMid(val);
                  setActivePresetId("custom");
                }}
              />
              <ColorSwatchCard
                label="Highlight"
                value={colorHighlight}
                onChange={(val) => {
                  setColorHighlight(val);
                  setActivePresetId("custom");
                }}
              />
            </div>
          </div>

          {/* SECTION 3: MOTION & SHADER DYNAMICS */}
          <div className="space-y-3.5">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500 font-mono">
              MOTION
            </span>
            <div className="space-y-3">
              <HardwareSlider
                label="Speed"
                value={speed}
                displayValue={`${speed.toFixed(1)}x`}
                min={0.1}
                max={4.0}
                step={0.1}
                onChange={(val) => {
                  setSpeed(val);
                  setActivePresetId("custom");
                }}
              />
              <HardwareSlider
                label="Flow Strength"
                value={flowStrength}
                displayValue={`${flowStrength.toFixed(1)}`}
                min={0.0}
                max={2.5}
                step={0.1}
                onChange={(val) => {
                  setFlowStrength(val);
                  setActivePresetId("custom");
                }}
              />
              <HardwareSlider
                label="Grain"
                value={grain}
                displayValue={`${grain.toFixed(2)}`}
                min={0.0}
                max={0.4}
                step={0.01}
                onChange={(val) => {
                  setGrain(val);
                  setActivePresetId("custom");
                }}
              />
              <HardwareSlider
                label="Contrast"
                value={contrast}
                displayValue={`${contrast.toFixed(2)}`}
                min={0.5}
                max={2.5}
                step={0.05}
                onChange={(val) => {
                  setContrast(val);
                  setActivePresetId("custom");
                }}
              />
              <HardwareSlider
                label="Opacity"
                value={opacity}
                displayValue={`${opacity.toFixed(2)}`}
                min={0.1}
                max={1.0}
                step={0.02}
                onChange={(val) => {
                  setOpacity(val);
                  setActivePresetId("custom");
                }}
              />
              <HardwareSlider
                label="Delay"
                value={delayMs}
                displayValue={`${delayMs.toFixed(0)}ms`}
                min={0}
                max={2000}
                step={50}
                onChange={(val) => {
                  setDelayMs(val);
                  setActivePresetId("custom");
                }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 4. CODE EXPORT MODAL                                     */}
      {/* ======================================================== */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-[#0b0d14] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Export WebGL Liquid Shader
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Copy this tailored configuration into your React / Next.js app.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white transition-colors text-xs"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-3 flex items-center gap-1 border-b border-white/10 bg-black/20 text-xs">
              {[
                { id: "jsx", label: "JSX Snippet" },
                { id: "component", label: "Component Source" },
                { id: "config", label: "JSON Config" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setExportTab(t.id as typeof exportTab)}
                  className={`px-3 py-1.5 rounded-t font-medium border-b-2 transition-colors ${
                    exportTab === t.id
                      ? "border-white text-white font-semibold"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Code Body */}
            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs bg-[#06080d] text-neutral-300">
              {exportTab === "jsx" && (
                <pre className="overflow-x-auto p-3 rounded bg-black/50 border border-white/5 whitespace-pre">
                  {jsxSnippet}
                </pre>
              )}
              {exportTab === "component" && (
                <div className="space-y-3">
                  <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-sans">
                    Save as <code className="text-white font-mono">components/ui/webgl-liquid.tsx</code> in your project. Pure native WebGL, zero external dependencies.
                  </div>
                  <pre className="overflow-x-auto p-3 rounded bg-black/50 border border-white/5 whitespace-pre max-h-[360px]">
                    {STANDALONE_COMPONENT_CODE}
                  </pre>
                </div>
              )}
              {exportTab === "config" && (
                <pre className="overflow-x-auto p-3 rounded bg-black/50 border border-white/5 whitespace-pre">
                  {configJson}
                </pre>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-white/10 bg-black/30 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                Pure WebGL 1.0 • Client-side 60fps
              </span>
              <button
                type="button"
                onClick={() => {
                  const toCopy =
                    exportTab === "jsx"
                      ? jsxSnippet
                      : exportTab === "component"
                      ? STANDALONE_COMPONENT_CODE
                      : configJson;
                  const label =
                    exportTab === "jsx"
                      ? "JSX snippet"
                      : exportTab === "component"
                      ? "Component source"
                      : "JSON configuration";
                  copyToClipboard(toCopy, label);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded font-semibold text-xs transition-colors shadow-sm ${
                  hasCopiedModal
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
              >
                {hasCopiedModal ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
