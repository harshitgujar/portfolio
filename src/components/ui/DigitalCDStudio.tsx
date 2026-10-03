"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Upload,
  Download,
  Share2,
  Sparkles,
  Music,
  Disc3,
  Type,
  Layers,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  ArrowLeft,
  ChevronDown,
  X,
  Trash2,
  Sliders,
  ExternalLink,
} from "lucide-react";
import {
  CDConfig,
  DEFAULT_CD_CONFIG,
  REFLECTION_PRESETS,
  ArtworkStyle,
  SleeveMode,
  TextFontFamily,
} from "@/types/digital-cd";
import { renderCDToCanvas } from "@/lib/cd-renderer";
import {
  exportCDAsPNG,
  exportCDAsGIF,
  recordCDAsVideo,
  copyCDImageToClipboard,
  encodeCDConfigToURL,
  decodeCDConfigFromURL,
} from "@/lib/cd-export";

interface DigitalCDStudioProps {
  initialConfig?: Partial<CDConfig>;
  className?: string;
}

// -----------------------------------------------------------------------------
// REUSABLE MINIMALIST CRAFT UI COMPONENTS (NON-AI SLOPPED)
// -----------------------------------------------------------------------------

function StudioToggle({
  checked,
  onChange,
  label,
  description,
  isLight,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
  isLight: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 px-1">
      <div className="pr-3">
        <span
          className={`block font-medium text-xs tracking-tight ${
            isLight ? "text-neutral-900" : "text-neutral-100"
          }`}
        >
          {label}
        </span>
        {description && (
          <span
            className={`block text-[11px] leading-tight mt-0.5 ${
              isLight ? "text-neutral-500" : "text-neutral-400"
            }`}
          >
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-4.5 w-8 flex-shrink-0 cursor-pointer rounded-sm border border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${
          checked
            ? isLight
              ? "bg-neutral-900"
              : "bg-white"
            : isLight
            ? "bg-neutral-200"
            : "bg-neutral-800"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-sm shadow-sm transition duration-150 ease-in-out mt-[1px] ml-[1px] ${
            checked
              ? isLight
                ? "translate-x-3.5 bg-white"
                : "translate-x-3.5 bg-neutral-950"
              : isLight
              ? "translate-x-0 bg-white"
              : "translate-x-0 bg-neutral-400"
          }`}
        />
      </button>
    </div>
  );
}

function StudioSlider({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
  isLight,
}: {
  label: string;
  value: number;
  displayValue?: string | number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  isLight: boolean;
}) {
  return (
    <div className="space-y-1.5 py-1">
      <div className="flex items-center justify-between text-[11px]">
        <span
          className={
            isLight
              ? "text-neutral-600 font-medium"
              : "text-neutral-400 font-medium"
          }
        >
          {label}
        </span>
        <span
          className={`font-mono text-[10px] ${
            isLight ? "text-neutral-900" : "text-neutral-200"
          }`}
        >
          {displayValue ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1 rounded-full appearance-none cursor-pointer transition-colors ${
          isLight
            ? "bg-neutral-200 accent-neutral-900"
            : "bg-neutral-800 accent-white"
        }`}
      />
    </div>
  );
}

function StudioColorSwatch({
  label,
  value,
  onChange,
  isLight,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  isLight: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span
        className={`text-[11px] font-medium ${
          isLight ? "text-neutral-600" : "text-neutral-400"
        }`}
      >
        {label}
      </span>
      <label className="flex items-center gap-2 cursor-pointer group">
        <span
          className={`text-[10px] font-mono uppercase ${
            isLight ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          {value}
        </span>
        <div
          className="w-5 h-5 rounded-sm border border-black/15 dark:border-white/20 shadow-sm transition-transform group-hover:scale-110 relative overflow-hidden"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="opacity-0 absolute inset-0 cursor-pointer"
          />
        </div>
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export function DigitalCDStudio({
  initialConfig,
  className = "",
}: DigitalCDStudioProps) {
  // Theme state: "dark" or "light"
  const [studioTheme, setStudioTheme] = useState<"dark" | "light">("dark");
  const isLight = studioTheme === "light";
  const studioThemeRef = useRef<"dark" | "light">("dark");
  studioThemeRef.current = studioTheme;

  // Config state
  const [config, setConfig] = useState<CDConfig>(() => {
    if (typeof window !== "undefined") {
      const decoded = decodeCDConfigFromURL(window.location.href);
      if (decoded) {
        return { ...DEFAULT_CD_CONFIG, ...decoded, ...initialConfig };
      }
    }
    return { ...DEFAULT_CD_CONFIG, ...initialConfig };
  });

  // Active studio sidebar tab: 4 core creative tabs
  const [activeTab, setActiveTab] = useState<
    "artwork" | "typography" | "reflection" | "sleeve" | "audio"
  >("artwork");

  // Export popup state
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // Canvas & interactive state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const artworkImgRef = useRef<HTMLImageElement | null>(null);
  const tiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetTiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const configRef = useRef<CDConfig>(config);
  configRef.current = config;

  // Audio player & spin physics
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(12);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);

  const rotationRef = useRef(0);
  const spinVelocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Drag-to-spin state
  const isDraggingCDRef = useRef(false);
  const lastDragAngleRef = useRef(0);

  // Export progress states
  const [isExportingGIF, setIsExportingGIF] = useState(false);
  const [gifProgress, setGifProgress] = useState(0);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isAudioMuted;
    }
  }, [volume, isAudioMuted]);

  // Load uploaded artwork image
  useEffect(() => {
    if (!config.artworkUrl) {
      artworkImgRef.current = null;
      return;
    }
    const img = new Image();
    if (config.artworkUrl.startsWith("http")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      artworkImgRef.current = img;
    };
    img.onerror = () => {
      if (img.crossOrigin) {
        const fallback = new Image();
        fallback.onload = () => {
          artworkImgRef.current = fallback;
        };
        fallback.src = config.artworkUrl!;
      }
    };
    img.src = config.artworkUrl;
    if (img.complete && img.naturalWidth > 0) {
      artworkImgRef.current = img;
    }
  }, [config.artworkUrl]);

  // Main high-performance render loop
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Smooth tilt interpolation
    tiltRef.current.x += (targetTiltRef.current.x - tiltRef.current.x) * 0.1;
    tiltRef.current.y += (targetTiltRef.current.y - tiltRef.current.y) * 0.1;

    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `rotateY(${tiltRef.current.x * 12}deg) rotateX(${-tiltRef.current.y * 12}deg)`;
    }

    const currentConfig = configRef.current;

    // Update spin physics
    if (currentConfig.isPlaying) {
      isDraggingCDRef.current = false;
      const targetSpeed = 0.045 * currentConfig.spinSpeed;
      spinVelocityRef.current += (targetSpeed - spinVelocityRef.current) * 0.1;
    } else {
      spinVelocityRef.current *= 0.92;
    }

    if (!isDraggingCDRef.current) {
      rotationRef.current += spinVelocityRef.current;
      if (rotationRef.current >= Math.PI * 2) {
        rotationRef.current -= Math.PI * 2;
      } else if (rotationRef.current < 0) {
        rotationRef.current += Math.PI * 2;
      }
    }

    const frameConfig: CDConfig = {
      ...currentConfig,
      rotationAngle: rotationRef.current,
    };

    renderCDToCanvas(
      ctx,
      canvas.width,
      canvas.height,
      frameConfig,
      tiltRef.current,
      artworkImgRef.current,
      {
        transparentBg: false,
        theme: studioThemeRef.current,
      }
    );
  }, []);

  // Continuous animation frame loop
  useEffect(() => {
    let active = true;
    const loop = () => {
      if (!active) return;
      renderFrame();
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [renderFrame]);

  // Canvas resize to match crisp DPR
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 2;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      renderFrame();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [renderFrame]);

  // Sync Audio Play / Pause
  const togglePlay = () => {
    isDraggingCDRef.current = false;
    const audio = audioRef.current;
    if (!audio) {
      setConfig((c) => ({ ...c, isPlaying: !c.isPlaying }));
      return;
    }

    if (config.isPlaying) {
      audio.pause();
      setConfig((c) => ({ ...c, isPlaying: false }));
    } else {
      audio.play().catch(() => {});
      setConfig((c) => ({ ...c, isPlaying: true }));
    }
  };

  // Handle custom image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setConfig((c) => {
        const isCenter = c.showCenterLabel || c.artworkStyle === "center";
        return {
          ...c,
          artworkUrl: dataUrl,
          artworkName: file.name,
          showFullDisc: !isCenter,
          showCenterLabel: isCenter,
          artworkStyle: isCenter ? "center" : "full",
        };
      });
      showToast(`Loaded artwork "${file.name}"`);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Handle custom audio file upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setConfig((c) => ({
      ...c,
      audioUrl: objectUrl,
      audioName: file.name.replace(/\.[^/.]+$/, ""),
      isPlaying: false,
    }));
    showToast(`Loaded audio track "${file.name}"`);
  };

  // Mouse tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetTiltRef.current = { x: x * 0.7, y: y * 0.7 };
  };

  const handleMouseLeave = () => {
    targetTiltRef.current = { x: 0, y: 0 };
  };

  // Global pointerup to prevent drag locking
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isDraggingCDRef.current = false;
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
    };
  }, []);

  // Drag CD to scratch / spin (strictly disabled while playing)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (configRef.current.isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

    isDraggingCDRef.current = true;
    lastDragAngleRef.current = angle;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (configRef.current.isPlaying) {
      isDraggingCDRef.current = false;
      return;
    }
    if (!isDraggingCDRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

    const delta = angle - lastDragAngleRef.current;
    rotationRef.current += delta;
    spinVelocityRef.current = delta * 0.5;
    lastDragAngleRef.current = angle;
  };

  const handlePointerUp = () => {
    isDraggingCDRef.current = false;
  };

  // Export Handlers
  const handleExportPNG = async (transparent: boolean) => {
    try {
      showToast("Exporting PNG...");
      await exportCDAsPNG(config, artworkImgRef.current, {
        width: 1400,
        height: 1400,
        transparentBg: transparent,
        title: config.title,
      });
      showToast("PNG exported successfully");
    } catch {
      showToast("Failed to export PNG");
    }
  };

  const handleExportGIF = async () => {
    try {
      setIsExportingGIF(true);
      setGifProgress(0);
      showToast("Rendering animated GIF...");
      await exportCDAsGIF(config, artworkImgRef.current, {
        size: 540,
        totalFrames: 36,
        fps: 24,
        onProgress: (pct) => setGifProgress(pct),
      });
      showToast("GIF exported successfully");
    } catch {
      showToast("Failed to generate GIF");
    } finally {
      setIsExportingGIF(false);
    }
  };

  const handleRecordVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      setIsRecordingVideo(true);
      setVideoProgress(0);
      showToast("Rendering MP4 video...");
      await recordCDAsVideo(
        () => canvas.captureStream(30),
        audioRef.current,
        {
          durationSec: 8,
          onProgress: (pct) => setVideoProgress(pct),
          title: config.title,
          config,
          artworkImg: artworkImgRef.current,
        }
      );
      showToast("MP4 video exported successfully");
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : "Failed to export MP4 video");
    } finally {
      setIsRecordingVideo(false);
    }
  };

  const handleCopyLink = () => {
    const url = encodeCDConfigToURL(config);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    }
  };

  const handleCopyImage = async () => {
    const success = await copyCDImageToClipboard(config, artworkImgRef.current);
    if (success) {
      showToast("Image copied to clipboard");
    } else {
      showToast("Clipboard copy not supported in this browser");
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[92vh] flex flex-col overflow-hidden select-none transition-colors duration-200 ${
        isLight ? "bg-[#f5f5f7] text-neutral-900" : "bg-[#07080b] text-white"
      } ${className}`}
    >
      {/* Hidden Audio Element for playback */}
      {config.audioUrl && (
        <audio
          ref={audioRef}
          src={config.audioUrl}
          loop
          onTimeUpdate={(e) =>
            setAudioCurrentTime((e.target as HTMLAudioElement).currentTime)
          }
          onLoadedMetadata={(e) =>
            setAudioDuration((e.target as HTMLAudioElement).duration || 12)
          }
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-16 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full border shadow-2xl text-xs font-medium animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2 ${
            isLight
              ? "bg-white/95 text-neutral-900 border-neutral-200 backdrop-blur-xl"
              : "bg-neutral-900/90 text-white border-white/20 backdrop-blur-xl"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOP HEADER BAR (UNIFIED, SLEEK, WITH PROMINENT EXPORT)   */}
      {/* ======================================================== */}
      <header
        className={`w-full h-14 px-4 sm:px-6 flex items-center justify-between border-b transition-colors z-40 ${
          isLight
            ? "bg-white/80 border-neutral-200/80 backdrop-blur-xl text-neutral-900"
            : "bg-[#090a0f]/80 border-white/[0.08] backdrop-blur-xl text-white"
        }`}
      >
        {/* Left: Minimal Back Button & Studio Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/extras"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                : "bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
          <div
            className={`h-4 w-px ${
              isLight ? "bg-neutral-200" : "bg-white/10"
            }`}
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs tracking-tight">
              CD Studio
            </span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm ${
                isLight
                  ? "bg-neutral-100 text-neutral-600"
                  : "bg-white/[0.06] text-neutral-400"
              }`}
            >
              {config.spinSpeed === 0.75
                ? "33 RPM"
                : config.spinSpeed === 1.8
                ? "78 RPM"
                : "45 RPM"}
            </span>
          </div>
        </div>

        {/* Right: Light/Dark Mode Switcher & Prominent Export Button */}
        <div className="flex items-center gap-2 relative">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setStudioTheme(isLight ? "dark" : "light")}
            className={`p-2 rounded-md text-xs transition-all ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                : "bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white"
            }`}
            title={isLight ? "Switch to Dark Studio" : "Switch to Light Studio"}
            aria-label="Toggle studio theme"
          >
            {isLight ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>

          {/* PROMINENT HIGH-VISIBILITY EXPORT BUTTON */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportMenuOpen((prev) => !prev)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all shadow-sm ${
                isLight
                  ? "bg-neutral-900 text-white hover:bg-neutral-800 shadow-neutral-900/10"
                  : "bg-white text-black hover:bg-neutral-200 shadow-white/5"
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  isExportMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Aesthetic Minimalist Export Popover Dialog */}
            {isExportMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsExportMenuOpen(false)}
                />
                <div
                  className={`absolute right-0 top-full mt-2 w-72 rounded-md p-3 shadow-2xl border backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isLight
                      ? "bg-white/95 border-neutral-200 text-neutral-900 shadow-xl"
                      : "bg-[#111318]/95 border-white/10 text-white shadow-2xl"
                  }`}
                >
                  <div className="px-2 py-1.5 border-b mb-2 border-neutral-200 dark:border-white/10 flex items-center justify-between">
                    <span className="font-semibold text-xs">Export</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Format
                    </span>
                  </div>

                  {/* 1. MP4 Video */}
                  <div className="space-y-1 mb-2">
                    <button
                      type="button"
                      disabled={isRecordingVideo}
                      onClick={() => {
                        handleRecordVideo();
                        setIsExportMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-sm transition-colors flex items-center justify-between group ${
                        isLight
                          ? "bg-neutral-50 hover:bg-neutral-100"
                          : "bg-white/[0.04] hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs">
                            MP4 Video
                          </span>
                          <span className="px-1.5 py-0.2 rounded-sm text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                            H.264
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-500 block">
                          60 fps • Synced Audio • 1080p
                        </span>
                      </div>
                      <Download className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                    </button>
                  </div>

                  {/* 2. Animated GIF */}
                  <button
                    type="button"
                    disabled={isExportingGIF}
                    onClick={() => {
                      handleExportGIF();
                      setIsExportMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-sm text-xs transition-colors flex items-center justify-between mb-1 ${
                      isLight
                        ? "hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900"
                        : "hover:bg-white/[0.06] text-neutral-300 hover:text-white"
                    }`}
                  >
                    <span>Animated GIF</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Looping • 540px
                    </span>
                  </button>

                  {/* 3. High-Res PNG */}
                  <button
                    type="button"
                    onClick={() => {
                      handleExportPNG(false);
                      setIsExportMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-sm text-xs transition-colors flex items-center justify-between mb-1 ${
                      isLight
                        ? "hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900"
                        : "hover:bg-white/[0.06] text-neutral-300 hover:text-white"
                    }`}
                  >
                    <span>High-Res PNG</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      1400×1400
                    </span>
                  </button>

                  {/* 4. Transparent PNG */}
                  <button
                    type="button"
                    onClick={() => {
                      handleExportPNG(true);
                      setIsExportMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-sm text-xs transition-colors flex items-center justify-between mb-1 ${
                      isLight
                        ? "hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900"
                        : "hover:bg-white/[0.06] text-neutral-300 hover:text-white"
                    }`}
                  >
                    <span>Transparent PNG</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Alpha
                    </span>
                  </button>

                  <div className="h-px bg-neutral-200 dark:bg-white/10 my-1.5" />

                  {/* 5. Copy & Share actions */}
                  <div className="grid grid-cols-2 gap-1 pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        handleCopyImage();
                        setIsExportMenuOpen(false);
                      }}
                      className={`py-1.5 px-2 rounded-sm text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 ${
                        isLight
                          ? "hover:bg-neutral-100 text-neutral-600"
                          : "hover:bg-white/[0.06] text-neutral-300"
                      }`}
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleCopyLink();
                        setIsExportMenuOpen(false);
                      }}
                      className={`py-1.5 px-2 rounded-sm text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 ${
                        isLight
                          ? "hover:bg-neutral-100 text-neutral-600"
                          : "hover:bg-white/[0.06] text-neutral-300"
                      }`}
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Share Link</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* BODY CONTENT: STAGE VIEWPORT (LEFT) + CONTROL PANEL (RIGHT) */}
      {/* ======================================================== */}
      <div className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT / CENTER: THE DIGITAL CD STAGE & INTERACTIVE CANVAS */}
        <div
          className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden transition-colors duration-300"
          style={{
            backgroundColor: config.bgColor || undefined,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 transition-colors duration-700 blur-[120px]"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${config.sleeveColor}${
                isLight ? "18" : "38"
              } 0%, transparent 60%)`,
            }}
          />

          {/* 3D Parallax Canvas Wrapper */}
          <div
            ref={wrapperRef}
            className="relative w-full max-w-[560px] aspect-square flex items-center justify-center transition-transform duration-75 ease-out will-change-transform"
            style={{
              perspective: "1200px",
            }}
          >
            <canvas
              ref={canvasRef}
              className={`w-full h-full object-contain rounded-lg ${
                config.isPlaying
                  ? "cursor-default select-none"
                  : "cursor-grab active:cursor-grabbing"
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />
          </div>

          {/* Floating Minimalist Playback Dock */}
          <div
            className={`relative mt-4 sm:mt-6 z-20 flex flex-wrap items-center justify-center gap-2 px-2.5 py-1.5 rounded-md border backdrop-blur-xl transition-all shadow-xl ${
              isLight
                ? "bg-white/90 border-neutral-200/90 text-neutral-900"
                : "bg-neutral-950/90 border-white/10 text-white"
            }`}
          >
            {/* Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-medium text-xs transition-transform active:scale-95 ${
                isLight
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {config.isPlaying ? (
                <>
                  <Pause
                    className={`w-3.5 h-3.5 ${
                      isLight ? "fill-white" : "fill-black"
                    }`}
                  />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play
                    className={`w-3.5 h-3.5 ml-0.5 ${
                      isLight ? "fill-white" : "fill-black"
                    }`}
                  />
                  <span>Play & Spin</span>
                </>
              )}
            </button>

            {/* Sleeve Tuck Toggle (in-sleeve <-> half-slide <-> disc-only) */}
            <button
              type="button"
              onClick={() => {
                setConfig((c) => ({
                  ...c,
                  sleeveMode:
                    c.sleeveMode === "in-sleeve"
                      ? "half-slide"
                      : c.sleeveMode === "half-slide"
                      ? "disc-only"
                      : "in-sleeve",
                }));
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                isLight
                  ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-white/90"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span className="capitalize">
                {config.sleeveMode.replace("-", " ")}
              </span>
            </button>

            {/* RPM Selector */}
            <div
              className={`flex items-center gap-0.5 px-1 py-0.5 rounded-md border text-[11px] font-mono ${
                isLight
                  ? "bg-neutral-100 border-neutral-200"
                  : "bg-black/40 border-white/5"
              }`}
            >
              {[
                { label: "33", speed: 0.75 },
                { label: "45", speed: 1.0 },
                { label: "78", speed: 1.8 },
              ].map((rpm) => (
                <button
                  key={rpm.label}
                  type="button"
                  onClick={() =>
                    setConfig((c) => ({ ...c, spinSpeed: rpm.speed }))
                  }
                  className={`px-2 py-0.5 rounded-sm transition-colors ${
                    config.spinSpeed === rpm.speed
                      ? isLight
                        ? "bg-white text-neutral-900 font-bold shadow-sm"
                        : "bg-white/20 text-white font-bold"
                      : isLight
                      ? "text-neutral-500 hover:text-neutral-900"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {rpm.label}
                </button>
              ))}
            </div>

            {/* Audio Scrubber & Title */}
            {config.audioUrl && (
              <div
                className={`hidden sm:flex items-center gap-2 pl-2 border-l text-[11px] ${
                  isLight
                    ? "border-neutral-200 text-neutral-600"
                    : "border-white/10 text-white/70"
                }`}
              >
                <Music className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="max-w-[100px] truncate font-medium">
                  {config.audioName}
                </span>
                <span className="font-mono text-neutral-400 text-[10px]">
                  {Math.floor(audioCurrentTime)}s /{" "}
                  {Math.floor(audioDuration)}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT: MODERN, MINIMAL, AESTHETIC STUDIO WORKSTATION     */}
        {/* ======================================================== */}
        <div
          className={`w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 flex flex-col border-t lg:border-t-0 lg:border-l transition-colors z-30 ${
            isLight
              ? "bg-white/90 border-neutral-200/80 backdrop-blur-2xl text-neutral-900"
              : "bg-[#0b0c10]/95 border-white/[0.08] backdrop-blur-2xl text-white"
          }`}
        >
          {/* Minimalist Segmented Tabs */}
          <div
            className={`p-2.5 border-b ${
              isLight ? "border-neutral-200/80" : "border-white/[0.08]"
            }`}
          >
            <div
              className={`flex items-center p-0.5 rounded-md border gap-0.5 ${
                isLight
                  ? "bg-neutral-100/80 border-neutral-200/80"
                  : "bg-white/[0.03] border-white/[0.06]"
              }`}
            >
              {[
                { id: "artwork", label: "Layers" },
                { id: "typography", label: "Type" },
                { id: "reflection", label: "Optics" },
                { id: "sleeve", label: "Case & BG" },
                { id: "audio", label: "Sound" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 py-1 rounded-sm text-xs font-medium transition-all ${
                      isActive
                        ? isLight
                          ? "bg-white text-neutral-900 font-semibold shadow-sm"
                          : "bg-white text-neutral-950 font-semibold shadow-sm"
                        : isLight
                        ? "text-neutral-500 hover:text-neutral-900"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Body Scrollable View */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar text-xs">
            {/* =================================================== */}
            {/* TAB 1: LAYERS & ARTWORK                             */}
            {/* =================================================== */}
            {activeTab === "artwork" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* 1. Cover Asset Upload */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] uppercase font-semibold tracking-wider ${
                        isLight ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      Cover Artwork Asset
                    </span>
                  </div>

                  {config.artworkUrl ? (
                    <div
                      className={`flex items-center justify-between p-2.5 rounded-md border ${
                        isLight
                          ? "bg-neutral-50 border-neutral-200"
                          : "bg-white/[0.02] border-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <img
                          src={config.artworkUrl}
                          alt="Artwork"
                          className="w-9 h-9 rounded-sm object-cover flex-shrink-0 border border-black/10 dark:border-white/10"
                        />
                        <div className="truncate">
                          <span
                            className={`block font-medium text-xs truncate ${
                              isLight ? "text-neutral-900" : "text-white"
                            }`}
                          >
                            {config.artworkName || "Custom Artwork"}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            Active Asset
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <label className="cursor-pointer text-[11px] font-medium px-2 py-1 rounded-sm hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors">
                          Replace
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setConfig((c) => ({
                              ...c,
                              artworkUrl: null,
                              artworkName: undefined,
                              showFullDisc: false,
                              showCenterLabel: false,
                              artworkStyle: "none",
                            }))
                          }
                          className="p-1 rounded-sm text-neutral-400 hover:text-red-400 transition-colors"
                          title="Remove artwork"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`flex items-center justify-center gap-2 p-3 rounded-md border border-dashed cursor-pointer transition-all ${
                        isLight
                          ? "border-neutral-300 hover:border-neutral-400 bg-neutral-50/50 hover:bg-neutral-100/50 text-neutral-600"
                          : "border-white/15 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] text-neutral-300"
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="font-medium text-xs">
                        Upload Cover Artwork
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        (PNG, JPG)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* Sample Presets */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className={`text-[10px] ${
                        isLight ? "text-neutral-500" : "text-neutral-500"
                      }`}
                    >
                      Presets:
                    </span>
                    {[
                      {
                        name: "Portrait",
                        url: "/harshit-portrait-color.png",
                      },
                      { name: "Evora Art", url: "/evora.png" },
                      { name: "Arken Art", url: "/arken.png" },
                    ].map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() =>
                          setConfig((c) => {
                            const isCenter = c.showCenterLabel || c.artworkStyle === "center";
                            return {
                              ...c,
                              artworkUrl: p.url,
                              artworkName: p.name,
                              showFullDisc: !isCenter,
                              showCenterLabel: isCenter,
                              artworkStyle: isCenter ? "center" : "full",
                            };
                          })
                        }
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-medium transition-colors border ${
                          config.artworkName === p.name
                            ? isLight
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-white text-black border-white"
                            : isLight
                            ? "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
                            : "bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. LAYER ARCHITECTURE (CLEAN LINEAR/APPLE DESIGN) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] uppercase font-semibold tracking-wider ${
                        isLight ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      Design Layer Stack
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setConfig((c) => ({
                          ...c,
                          showTape: false,
                          showFullDisc: false,
                          showCenterLabel: false,
                          artworkStyle: "none",
                        }))
                      }
                      className="text-[10px] text-neutral-500 hover:text-neutral-400 font-medium"
                    >
                      Clear All Layers
                    </button>
                  </div>

                  <div
                    className={`rounded-md border divide-y overflow-hidden transition-colors ${
                      isLight
                        ? "bg-white border-neutral-200/80 divide-neutral-100"
                        : "bg-white/[0.02] border-white/[0.08] divide-white/[0.06]"
                    }`}
                  >
                    {/* Layer A: Diagonal Paper Tape */}
                    <div>
                      <StudioToggle
                        checked={Boolean(config.showTape)}
                        onChange={(val) =>
                          setConfig((c) => ({ ...c, showTape: val }))
                        }
                        label="Diagonal Paper Tape"
                        description="Signature chord sticker with typography"
                        isLight={isLight}
                      />
                      {config.showTape && (
                        <div
                          className={`p-3 space-y-2.5 border-t ${
                            isLight
                              ? "bg-neutral-50/50 border-neutral-100"
                              : "bg-white/[0.01] border-white/[0.05]"
                          }`}
                        >
                          <StudioColorSwatch
                            label="Tape Color"
                            value={config.tapeColor}
                            onChange={(val) =>
                              setConfig((c) => ({ ...c, tapeColor: val }))
                            }
                            isLight={isLight}
                          />
                          <StudioSlider
                            label="Tilt Angle"
                            value={config.tapeAngle}
                            displayValue={`${config.tapeAngle}°`}
                            min={-90}
                            max={90}
                            step={1}
                            onChange={(val) =>
                              setConfig((c) => ({ ...c, tapeAngle: val }))
                            }
                            isLight={isLight}
                          />
                          <StudioSlider
                            label="Tape Width"
                            value={config.tapeWidth}
                            displayValue={`${config.tapeWidth}%`}
                            min={15}
                            max={35}
                            step={1}
                            onChange={(val) =>
                              setConfig((c) => ({ ...c, tapeWidth: val }))
                            }
                            isLight={isLight}
                          />
                          <StudioSlider
                            label="Clearance from Spindle"
                            value={Math.round(
                              (config.chordDistance ?? 0.58) * 100
                            )}
                            displayValue={`${Math.round(
                              (config.chordDistance ?? 0.58) * 100
                            )}%`}
                            min={45}
                            max={75}
                            step={1}
                            onChange={(val) =>
                              setConfig((c) => ({
                                ...c,
                                chordDistance: val / 100,
                              }))
                            }
                            isLight={isLight}
                          />
                        </div>
                      )}
                    </div>

                    {/* Layer B: Full Disc Print */}
                    <div>
                      <StudioToggle
                        checked={Boolean(
                          config.showFullDisc || config.artworkStyle === "full"
                        )}
                        onChange={(val) => {
                          setConfig((c) => ({
                            ...c,
                            showFullDisc: val,
                            artworkStyle: val ? "full" : "none",
                            artworkUrl:
                              val && !c.artworkUrl
                                ? "/harshit-portrait-color.png"
                                : c.artworkUrl,
                            artworkName:
                              val && !c.artworkName
                                ? "Portrait"
                                : c.artworkName,
                          }));
                        }}
                        label="Full Disc Print"
                        description="Edge-to-edge artwork across data grooves"
                        isLight={isLight}
                      />
                      {Boolean(
                        config.showFullDisc || config.artworkStyle === "full"
                      ) && (
                        <div
                          className={`p-3 space-y-2.5 border-t ${
                            isLight
                              ? "bg-neutral-50/50 border-neutral-100"
                              : "bg-white/[0.01] border-white/[0.05]"
                          }`}
                        >
                          <StudioSlider
                            label="Print Opacity"
                            value={Math.round(config.artworkOpacity * 100)}
                            displayValue={`${Math.round(
                              config.artworkOpacity * 100
                            )}%`}
                            min={10}
                            max={100}
                            step={5}
                            onChange={(val) =>
                              setConfig((c) => ({
                                ...c,
                                artworkOpacity: val / 100,
                              }))
                            }
                            isLight={isLight}
                          />
                          <StudioSlider
                            label="Artwork Scale"
                            value={Math.round(config.artworkScale * 100)}
                            displayValue={`${Math.round(
                              config.artworkScale * 100
                            )}%`}
                            min={50}
                            max={180}
                            step={5}
                            onChange={(val) =>
                              setConfig((c) => ({
                                ...c,
                                artworkScale: val / 100,
                              }))
                            }
                            isLight={isLight}
                          />
                          <div className="space-y-1 pt-1">
                            <span
                              className={`text-[11px] font-medium block ${
                                isLight
                                  ? "text-neutral-600"
                                  : "text-neutral-400"
                              }`}
                            >
                              Blend Mode
                            </span>
                            <div className="grid grid-cols-4 gap-1">
                              {[
                                { id: "source-over", label: "Normal" },
                                { id: "screen", label: "Screen" },
                                { id: "overlay", label: "Overlay" },
                                { id: "multiply", label: "Multiply" },
                              ].map((m) => (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() =>
                                    setConfig((c) => ({
                                      ...c,
                                      artworkBlendMode: m.id as any,
                                    }))
                                  }
                                  className={`py-1 rounded-md text-[10px] font-medium border transition-colors ${
                                    config.artworkBlendMode === m.id
                                      ? isLight
                                        ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                        : "bg-white text-black border-white font-semibold"
                                      : isLight
                                      ? "bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-neutral-200"
                                      : "bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white"
                                  }`}
                                >
                                  {m.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Layer C: Center Vinyl Label */}
                    <div>
                      <StudioToggle
                        checked={Boolean(
                          config.showCenterLabel ||
                            config.artworkStyle === "center"
                        )}
                        onChange={(val) => {
                          setConfig((c) => ({
                            ...c,
                            showCenterLabel: val,
                            artworkStyle: val ? "center" : "none",
                            artworkUrl:
                              val && !c.artworkUrl
                                ? "/harshit-portrait-color.png"
                                : c.artworkUrl,
                            artworkName:
                              val && !c.artworkName
                                ? "Portrait"
                                : c.artworkName,
                          }));
                        }}
                        label="Center Vinyl Label"
                        description="Vintage circular sticker around the spindle"
                        isLight={isLight}
                      />
                      {Boolean(
                        config.showCenterLabel ||
                          config.artworkStyle === "center"
                      ) && (
                        <div
                          className={`p-3 space-y-2.5 border-t ${
                            isLight
                              ? "bg-neutral-50/50 border-neutral-100"
                              : "bg-white/[0.01] border-white/[0.05]"
                          }`}
                        >
                          <StudioSlider
                            label="Label Zoom"
                            value={Math.round(config.artworkScale * 100)}
                            displayValue={`${Math.round(
                              config.artworkScale * 100
                            )}%`}
                            min={50}
                            max={140}
                            step={5}
                            onChange={(val) =>
                              setConfig((c) => ({
                                ...c,
                                artworkScale: val / 100,
                              }))
                            }
                            isLight={isLight}
                          />
                        </div>
                      )}
                    </div>

                    {/* Layer D: CD Disc Base Surface Color */}
                    <div className="p-3 space-y-2">
                      <div>
                        <span
                          className={`block font-medium text-xs tracking-tight ${
                            isLight ? "text-neutral-900" : "text-neutral-100"
                          }`}
                        >
                          CD Disc Background Tint
                        </span>
                        <span
                          className={`block text-[11px] leading-tight mt-0.5 ${
                            isLight ? "text-neutral-500" : "text-neutral-400"
                          }`}
                        >
                          Base polycarbonate surface under reflections
                        </span>
                      </div>
                      <StudioColorSwatch
                        label="Disc Surface Color"
                        value={config.cdColor}
                        onChange={(val) =>
                          setConfig((c) => ({ ...c, cdColor: val }))
                        }
                        isLight={isLight}
                      />
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] text-neutral-500">Presets:</span>
                        {[
                          { name: "Electric Blue", color: "#0f2bf6" },
                          { name: "Royal Violet", color: "#2e0854" },
                          { name: "Silver Chrome", color: "#475569" },
                          { name: "Emerald", color: "#064e3b" },
                          { name: "Crimson", color: "#881337" },
                          { name: "Jet Obsidian", color: "#111116" },
                        ].map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() =>
                              setConfig((c) => ({ ...c, cdColor: p.color }))
                            }
                            className={`px-2 py-0.5 rounded-sm text-[10px] font-medium border transition-colors ${
                              config.cdColor.toLowerCase() === p.color.toLowerCase()
                                ? isLight
                                  ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                  : "bg-white text-black border-white font-semibold"
                                : isLight
                                ? "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
                                : "bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white"
                            }`}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Layer E: Stage & Scene Backdrop */}
                    <div className="p-3 space-y-2">
                      <div>
                        <span
                          className={`block font-medium text-xs tracking-tight ${
                            isLight ? "text-neutral-900" : "text-neutral-100"
                          }`}
                        >
                          Scene Backdrop Background
                        </span>
                        <span
                          className={`block text-[11px] leading-tight mt-0.5 ${
                            isLight ? "text-neutral-500" : "text-neutral-400"
                          }`}
                        >
                          Canvas environment backdrop behind the CD & case
                        </span>
                      </div>
                      <StudioColorSwatch
                        label="Backdrop Color"
                        value={config.bgColor || (isLight ? "#ffffff" : "#0c0d14")}
                        onChange={(val) =>
                          setConfig((c) => ({ ...c, bgColor: val }))
                        }
                        isLight={isLight}
                      />
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] text-neutral-500">Presets:</span>
                        {[
                          { name: "Obsidian", color: "#0c0d14" },
                          { name: "Pure Black", color: "#000000" },
                          { name: "Studio Dark", color: "#18181b" },
                          { name: "Slate", color: "#1e293b" },
                          { name: "Warm Cream", color: "#f5f4ef" },
                          { name: "Pure White", color: "#ffffff" },
                        ].map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() =>
                              setConfig((c) => ({ ...c, bgColor: p.color }))
                            }
                            className={`px-2 py-0.5 rounded-sm text-[10px] font-medium border transition-colors ${
                              (config.bgColor || "#0c0d14").toLowerCase() ===
                              p.color.toLowerCase()
                                ? isLight
                                  ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                  : "bg-white text-black border-white font-semibold"
                                : isLight
                                ? "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
                                : "bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white"
                            }`}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================== */}
            {/* TAB 2: TYPOGRAPHY                                  */}
            {/* =================================================== */}
            {activeTab === "typography" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* 1. Main Tape Title */}
                <div>
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block mb-2 ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Main Title Typography
                  </span>

                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={config.title}
                        onChange={(e) =>
                          setConfig((c) => ({ ...c, title: e.target.value }))
                        }
                        placeholder="Album / Track Title"
                        className={`w-full px-3 py-2 rounded-xl text-xs font-medium border transition-colors outline-none ${
                          isLight
                            ? "bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-400"
                            : "bg-white/[0.04] border-white/10 text-white focus:border-white/30"
                        }`}
                      />
                    </div>

                    {/* Font Selector Chips */}
                    <div className="space-y-1">
                      <span
                        className={`text-[11px] font-medium block ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Font Personality
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: "syne", label: "Syne (Avant-Garde)" },
                          { id: "sans", label: "Swiss Bold (Grotesk)" },
                          { id: "mono", label: "Space Mono (Industrial)" },
                          { id: "serif", label: "Instrument Serif" },
                          { id: "alienation", label: "Alienation (Y2K)" },
                          { id: "marker", label: "Caveat (Sharpie)" },
                        ].map((font) => (
                          <button
                            key={font.id}
                            type="button"
                            onClick={() =>
                              setConfig((c) => ({
                                ...c,
                                fontFamily: font.id as TextFontFamily,
                              }))
                            }
                            className={`px-2.5 py-1.5 rounded-sm text-xs font-medium text-left border transition-all ${
                              config.fontFamily === font.id
                                ? isLight
                                  ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                  : "bg-white text-black border-white font-semibold"
                                : isLight
                                ? "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                                : "bg-white/[0.04] border-white/10 text-neutral-300 hover:text-white"
                            }`}
                          >
                            {font.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <StudioColorSwatch
                      label="Text Color"
                      value={config.textColor}
                      onChange={(val) =>
                        setConfig((c) => ({ ...c, textColor: val }))
                      }
                      isLight={isLight}
                    />

                    <StudioSlider
                      label="Font Size"
                      value={config.titleSize}
                      displayValue={`${config.titleSize}px`}
                      min={20}
                      max={64}
                      step={1}
                      onChange={(val) =>
                        setConfig((c) => ({ ...c, titleSize: val }))
                      }
                      isLight={isLight}
                    />
                  </div>
                </div>

                {/* 2. Perimeter Rim Laser Text */}
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10">
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block mb-2 ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Perimeter Circular Lyrics
                  </span>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={config.rimText}
                      onChange={(e) =>
                        setConfig((c) => ({ ...c, rimText: e.target.value }))
                      }
                      placeholder="Laser rim text..."
                      className={`w-full px-3 py-2 rounded-md text-xs font-medium border transition-colors outline-none ${
                        isLight
                          ? "bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-400"
                          : "bg-white/[0.04] border-white/10 text-white focus:border-white/30"
                      }`}
                    />
                    <span className="text-[10px] text-neutral-500 block font-mono">
                      Curved clockwise along the outer disc boundary
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================== */}
            {/* TAB 3: REFLECTIONS & OPTICS                         */}
            {/* =================================================== */}
            {activeTab === "reflection" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* 1. Presets */}
                <div>
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block mb-2 ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Optical Reflection Preset
                  </span>

                  <div className="grid grid-cols-2 gap-1.5">
                    {REFLECTION_PRESETS.map((preset) => {
                      const isSelected = config.reflectionPreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() =>
                            setConfig((c) => ({
                              ...c,
                              reflectionPreset: preset.id,
                              cdColor: preset.discColor,
                            }))
                          }
                          className={`p-2 rounded-md border text-left flex items-center gap-2 transition-all ${
                            isSelected
                              ? isLight
                                ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                : "bg-white text-black border-white font-semibold"
                              : isLight
                              ? "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                              : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white"
                          }`}
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-sm flex-shrink-0 shadow-sm border border-black/10 dark:border-white/10"
                            style={{
                              background: `linear-gradient(135deg, ${preset.colors[1]}, ${preset.colors[2]})`,
                            }}
                          />
                          <span className="truncate text-xs">
                            {preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Optical Tuning */}
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10 space-y-3">
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Optics & Sheen
                  </span>

                  <StudioColorSwatch
                    label="CD Body Tint"
                    value={config.cdColor}
                    onChange={(val) =>
                      setConfig((c) => ({ ...c, cdColor: val }))
                    }
                    isLight={isLight}
                  />

                  <StudioSlider
                    label="Reflection Intensity"
                    value={Math.round(config.reflectionIntensity * 100)}
                    displayValue={`${Math.round(
                      config.reflectionIntensity * 100
                    )}%`}
                    min={20}
                    max={150}
                    step={5}
                    onChange={(val) =>
                      setConfig((c) => ({
                        ...c,
                        reflectionIntensity: val / 100,
                      }))
                    }
                    isLight={isLight}
                  />

                  <StudioSlider
                    label="Specular Light Spread"
                    value={Math.round(config.specularSpread * 100)}
                    displayValue={`${Math.round(
                      config.specularSpread * 100
                    )}%`}
                    min={50}
                    max={200}
                    step={5}
                    onChange={(val) =>
                      setConfig((c) => ({
                        ...c,
                        specularSpread: val / 100,
                      }))
                    }
                    isLight={isLight}
                  />
                </div>
              </div>
            )}

            {/* =================================================== */}
            {/* TAB 4: SLEEVE & PACKAGING CASE                      */}
            {/* =================================================== */}
            {activeTab === "sleeve" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* 1. Presentation Mode */}
                <div>
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block mb-2 ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Enclosure Style
                  </span>

                  <div
                    className={`grid grid-cols-3 gap-1 p-0.5 rounded-md border ${
                      isLight
                        ? "bg-neutral-100 border-neutral-200"
                        : "bg-white/[0.03] border-white/10"
                    }`}
                  >
                    {[
                      { id: "in-sleeve", label: "In Sleeve" },
                      { id: "half-slide", label: "Half Slide" },
                      { id: "disc-only", label: "Disc Only" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          setConfig((c) => ({
                            ...c,
                            sleeveMode: mode.id as SleeveMode,
                          }))
                        }
                        className={`py-1.5 rounded-sm text-xs font-medium transition-all ${
                          config.sleeveMode === mode.id
                            ? isLight
                              ? "bg-white text-neutral-900 font-semibold shadow-sm"
                              : "bg-white text-black font-semibold shadow-sm"
                            : isLight
                            ? "text-neutral-600 hover:text-neutral-900"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Frosted Glass Flap */}
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10 space-y-3">
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Frosted Glassmorphism Flap
                  </span>

                  <StudioSlider
                    label="Glass Frost Blur"
                    value={config.glassBlur}
                    displayValue={`${config.glassBlur}px`}
                    min={4}
                    max={32}
                    step={1}
                    onChange={(val) =>
                      setConfig((c) => ({ ...c, glassBlur: val }))
                    }
                    isLight={isLight}
                  />

                  <StudioSlider
                    label="Glass Opacity"
                    value={Math.round(config.glassOpacity * 100)}
                    displayValue={`${Math.round(
                      config.glassOpacity * 100
                    )}%`}
                    min={10}
                    max={70}
                    step={5}
                    onChange={(val) =>
                      setConfig((c) => ({
                        ...c,
                        glassOpacity: val / 100,
                      }))
                    }
                    isLight={isLight}
                  />
                </div>

                {/* 3. Sleeve Material */}
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10 space-y-3">
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Sleeve Material & Hardware
                  </span>

                  <StudioColorSwatch
                    label="Sleeve Envelope Color"
                    value={config.sleeveColor}
                    onChange={(val) =>
                      setConfig((c) => ({ ...c, sleeveColor: val }))
                    }
                    isLight={isLight}
                  />

                  <StudioToggle
                    checked={config.showCornerRivets}
                    onChange={(val) =>
                      setConfig((c) => ({ ...c, showCornerRivets: val }))
                    }
                    label="Corner Punch Rivet Holes"
                    description="4 corner eyelets matching physical vinyl case"
                    isLight={isLight}
                  />
                </div>

                {/* 4. Canvas & Scene Backdrop */}
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10 space-y-3">
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Canvas & Scene Background
                  </span>

                  <StudioColorSwatch
                    label="Backdrop Color"
                    value={config.bgColor || (isLight ? "#ffffff" : "#0c0d14")}
                    onChange={(val) =>
                      setConfig((c) => ({ ...c, bgColor: val }))
                    }
                    isLight={isLight}
                  />

                  {/* Quick Color Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] text-neutral-500">Presets:</span>
                    {[
                      { name: "Obsidian", color: "#0c0d14" },
                      { name: "Pure Black", color: "#000000" },
                      { name: "Studio Dark", color: "#18181b" },
                      { name: "Slate", color: "#1e293b" },
                      { name: "Warm Cream", color: "#f5f4ef" },
                      { name: "Pure White", color: "#ffffff" },
                    ].map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() =>
                          setConfig((c) => ({ ...c, bgColor: p.color }))
                        }
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-medium border transition-colors ${
                          (config.bgColor || "#0c0d14").toLowerCase() ===
                          p.color.toLowerCase()
                            ? isLight
                              ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                              : "bg-white text-black border-white font-semibold"
                            : isLight
                            ? "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
                            : "bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =================================================== */}
            {/* TAB 5: AUDIO & TURNTABLE SPEED                      */}
            {/* =================================================== */}
            {activeTab === "audio" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block mb-2 ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Audio Track
                  </span>

                  <div
                    className={`p-3 rounded-md border space-y-3 ${
                      isLight
                        ? "bg-neutral-50 border-neutral-200"
                        : "bg-white/[0.03] border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="truncate">
                        <span
                          className={`block font-semibold text-xs truncate ${
                            isLight ? "text-neutral-900" : "text-white"
                          }`}
                        >
                          {config.audioName || "Lo-Fi Midnight Chorus"}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {Math.floor(audioCurrentTime)}s /{" "}
                          {Math.floor(audioDuration)}s
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={togglePlay}
                        className={`p-2 rounded-md transition-all ${
                          isLight
                            ? "bg-neutral-900 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {config.isPlaying ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5 ml-0.5" />
                        )}
                      </button>
                    </div>

                    <label
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-md border border-dashed cursor-pointer transition-all ${
                        isLight
                          ? "border-neutral-300 hover:border-neutral-400 text-neutral-700"
                          : "border-white/20 hover:border-white/40 text-neutral-300"
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-xs font-medium">
                        Upload Custom MP3 / WAV
                      </span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Turntable RPM Speed */}
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10 space-y-3">
                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider block ${
                      isLight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Turntable RPM Speed
                  </span>

                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "33 RPM", speed: 0.75, desc: "Smooth Vinyl" },
                      { label: "45 RPM", speed: 1.0, desc: "Standard" },
                      { label: "78 RPM", speed: 1.8, desc: "Fast Spin" },
                    ].map((rpm) => (
                      <button
                        key={rpm.label}
                        type="button"
                        onClick={() =>
                          setConfig((c) => ({ ...c, spinSpeed: rpm.speed }))
                        }
                        className={`p-2 rounded-md border text-center transition-all ${
                          config.spinSpeed === rpm.speed
                            ? isLight
                              ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                              : "bg-white text-black border-white font-semibold"
                            : isLight
                            ? "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                            : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white"
                        }`}
                      >
                        <span className="block text-xs font-bold font-mono">
                          {rpm.label}
                        </span>
                        <span className="text-[9px] text-neutral-500">
                          {rpm.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  <StudioSlider
                    label="Volume"
                    value={Math.round(volume * 100)}
                    displayValue={`${Math.round(volume * 100)}%`}
                    min={0}
                    max={100}
                    step={5}
                    onChange={(val) => setVolume(val / 100)}
                    isLight={isLight}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Minimalist Studio Footer */}
          <div
            className={`p-3.5 border-t flex items-center justify-between text-[11px] ${
              isLight
                ? "border-neutral-200/80 bg-neutral-50/50 text-neutral-500"
                : "border-white/[0.08] bg-black/20 text-neutral-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px]">Digital CD Studio</span>
            </div>
            <button
              type="button"
              onClick={() => setConfig(DEFAULT_CD_CONFIG)}
              className="flex items-center gap-1 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
