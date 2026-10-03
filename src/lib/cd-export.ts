import { GIFEncoder, quantize, applyPalette } from "gifenc";
import {
  Output,
  Mp4OutputFormat,
  BufferTarget,
  CanvasSource,
  AudioBufferSource,
  Quality,
} from "mediabunny";
import { CDConfig } from "@/types/digital-cd";
import { renderCDToCanvas } from "./cd-renderer";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Exports high-resolution PNG image (optionally transparent).
 */
export async function exportCDAsPNG(
  config: CDConfig,
  artworkImg: HTMLImageElement | null,
  options: {
    width?: number;
    height?: number;
    transparentBg?: boolean;
    title?: string;
  } = {}
): Promise<void> {
  const width = options.width || 1200;
  const height = options.height || 1200;
  const transparentBg = options.transparentBg ?? false;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create 2D canvas context");

  renderCDToCanvas(ctx, width, height, config, { x: 0, y: 0 }, artworkImg, {
    transparentBg,
    isExport: true,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to generate image blob"));
          return;
        }
        const filename = `${slugify(config.title || "digital-cd")}-disc.png`;
        downloadBlob(blob, filename);
        resolve();
      },
      "image/png",
      1.0
    );
  });
}

/**
 * Copies high-res image directly to system clipboard.
 */
export async function copyCDImageToClipboard(
  config: CDConfig,
  artworkImg: HTMLImageElement | null
): Promise<boolean> {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error("ClipboardItem API not supported");
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    renderCDToCanvas(ctx, 1000, 1000, config, { x: 0, y: 0 }, artworkImg, {
      transparentBg: false,
      isExport: true,
    });

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, "image/png");
    });
  } catch {
    return false;
  }
}

/**
 * Exports a looping animated GIF of the CD spinning with iridescent reflections.
 */
export async function exportCDAsGIF(
  config: CDConfig,
  artworkImg: HTMLImageElement | null,
  options: {
    size?: number;
    totalFrames?: number;
    fps?: number;
    onProgress?: (progress: number) => void;
  } = {}
): Promise<void> {
  const size = options.size || 540; // High quality yet fast encode size
  const totalFrames = options.totalFrames || 36;
  const fps = options.fps || 24;
  const delay = Math.round(1000 / fps);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not initialize canvas context for GIF");

  const gif = GIFEncoder();

  // Render each frame of the 360 degree spin
  for (let f = 0; f < totalFrames; f++) {
    const fraction = f / totalFrames;
    const frameRotation = fraction * Math.PI * 2;

    const frameConfig: CDConfig = {
      ...config,
      rotationAngle: frameRotation,
    };

    // Slight shifting light angle during spin for dynamic iridescence
    const lightTilt = {
      x: Math.cos(frameRotation * 0.5) * 0.4,
      y: Math.sin(frameRotation * 0.5) * 0.4,
    };

    renderCDToCanvas(ctx, size, size, frameConfig, lightTilt, artworkImg, {
      transparentBg: false,
      isExport: true,
    });

    const imageData = ctx.getImageData(0, 0, size, size);
    const { data } = imageData;
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);

    gif.writeFrame(index, size, size, {
      palette,
      delay,
    });

    if (options.onProgress) {
      options.onProgress(Math.round(((f + 1) / totalFrames) * 100));
    }

    // Yield to browser main thread so UI stays responsive
    await new Promise((r) => setTimeout(r, 0));
  }

  gif.finish();
  const bytes = gif.bytes();
  const blob = new Blob([bytes as unknown as BlobPart], { type: "image/gif" });
  const filename = `${slugify(config.title || "digital-cd")}-spin.gif`;
  downloadBlob(blob, filename);
}

/**
 * Loads an audio track from a URL, decodes it, and returns an AudioBuffer sliced to the requested duration.
 */
async function loadAndSliceAudio(
  audioUrl: string,
  startSec: number,
  durationSec: number
): Promise<AudioBuffer | null> {
  try {
    const res = await fetch(audioUrl);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return null;

    const audioCtx = new AudioContextClass();
    const decoded = await audioCtx.decodeAudioData(arrayBuffer);

    const sampleRate = decoded.sampleRate;
    const numChannels = decoded.numberOfChannels;
    const startOffset = Math.max(0, Math.floor(startSec * sampleRate));
    const targetFrames = Math.floor(durationSec * sampleRate);

    const sliced = audioCtx.createBuffer(numChannels, targetFrames, sampleRate);
    for (let ch = 0; ch < numChannels; ch++) {
      const srcData = decoded.getChannelData(ch);
      const destData = sliced.getChannelData(ch);
      for (let i = 0; i < targetFrames; i++) {
        const srcIdx = (startOffset + i) % srcData.length;
        destData[i] = srcData[srcIdx];
      }
    }

    if (audioCtx.state !== "closed") {
      audioCtx.close();
    }
    return sliced;
  } catch (err) {
    console.warn("Could not load or slice audio for MP4 export:", err);
    return null;
  }
}

export interface VideoExportOptions {
  durationSec?: number;
  size?: number;
  fps?: number;
  onProgress?: (progress: number) => void;
  title?: string;
  config?: CDConfig;
  artworkImg?: HTMLImageElement | null;
}

/**
 * Exports an MP4 video (H.264 video + AAC audio) with fast-start moov header,
 * universally compatible across iOS, Android, and web.
 */
export async function exportCDAsMP4(
  config: CDConfig,
  artworkImg: HTMLImageElement | null,
  audioEl: HTMLAudioElement | null,
  options: VideoExportOptions = {}
): Promise<void> {
  const durationSec = options.durationSec || 8;
  const size = options.size || 720; // 720x720 square HD format
  const fps = options.fps || 30;
  const totalFrames = Math.round(durationSec * fps);

  // 1. Primary engine: Hardware WebCodecs + Mediabunny (outputs standard AVC/H.264 + AAC MP4)
  const hasWebCodecs =
    typeof window !== "undefined" &&
    typeof window.VideoEncoder !== "undefined" &&
    typeof HTMLCanvasElement !== "undefined";

  if (hasWebCodecs) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) throw new Error("Could not initialize 2D canvas context for MP4 export");

    const output = new Output({
      format: new Mp4OutputFormat({ fastStart: "in-memory" }),
      target: new BufferTarget(),
    });

    const videoSource = new CanvasSource(canvas, {
      codec: "avc",
      quality: new Quality("high"),
    });
    output.addVideoTrack(videoSource);

    // Audio track setup
    let audioSource: AudioBufferSource | null = null;
    let slicedAudio: AudioBuffer | null = null;
    const audioUrl = config.audioUrl || audioEl?.src;

    if (audioUrl && typeof window.AudioEncoder !== "undefined") {
      try {
        const currentPlaybackTime = audioEl?.currentTime ?? 0;
        slicedAudio = await loadAndSliceAudio(
          audioUrl,
          currentPlaybackTime,
          durationSec
        );
        if (slicedAudio) {
          audioSource = new AudioBufferSource({
            codec: "aac",
            quality: new Quality("high"),
          });
          output.addAudioTrack(audioSource);
        }
      } catch (audioErr) {
        console.warn("Could not attach AAC audio to MP4, proceeding video-only", audioErr);
      }
    }

    await output.start();

    if (audioSource && slicedAudio) {
      await audioSource.add(slicedAudio);
    }

    // Render 360 spin frames with smooth continuous rotation
    const initialRotation = config.rotationAngle || 0;
    // 2 complete revolutions across durationSec
    const totalRotationSpan = Math.PI * 2 * 2;

    for (let f = 0; f < totalFrames; f++) {
      const fraction = f / totalFrames;
      const frameRotation = initialRotation + fraction * totalRotationSpan;

      const frameConfig: CDConfig = {
        ...config,
        rotationAngle: frameRotation,
      };

      const lightTilt = {
        x: Math.cos(frameRotation * 0.5) * 0.35,
        y: Math.sin(frameRotation * 0.5) * 0.25,
      };

      renderCDToCanvas(ctx, size, size, frameConfig, lightTilt, artworkImg, {
        transparentBg: false,
        isExport: true,
      });

      await videoSource.add(f / fps, 1 / fps);

      if (options.onProgress) {
        options.onProgress(Math.round(((f + 1) / totalFrames) * 95));
      }

      await new Promise((r) => setTimeout(r, 0));
    }

    await output.finalize();

    if (options.onProgress) {
      options.onProgress(100);
    }

    const buffer = output.target.buffer;
    if (!buffer) {
      throw new Error("Finalized MP4 buffer is empty");
    }

    const blob = new Blob([buffer], { type: "video/mp4" });
    const filename = `${slugify(options.title || config.title || "digital-cd")}.mp4`;
    downloadBlob(blob, filename);
    return;
  }

  // 2. Secondary fallback: Safari native MediaRecorder with video/mp4
  if (
    typeof MediaRecorder !== "undefined" &&
    (MediaRecorder.isTypeSupported("video/mp4;codecs=avc1") ||
      MediaRecorder.isTypeSupported("video/mp4"))
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not initialize canvas context");

    const canvasStream = canvas.captureStream(fps);
    const chunks: Blob[] = [];
    const mimeType = MediaRecorder.isTypeSupported("video/mp4;codecs=avc1")
      ? "video/mp4;codecs=avc1"
      : "video/mp4";

    const recorder = new MediaRecorder(canvasStream, {
      mimeType,
      videoBitsPerSecond: 4000000,
    });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    return new Promise((resolve, reject) => {
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        const filename = `${slugify(options.title || config.title || "digital-cd")}.mp4`;
        downloadBlob(blob, filename);
        resolve();
      };
      recorder.onerror = reject;

      recorder.start();
      let f = 0;
      const initialRotation = config.rotationAngle || 0;
      const totalRotationSpan = Math.PI * 2 * 2;

      const interval = setInterval(() => {
        f++;
        const fraction = f / totalFrames;
        const frameRotation = initialRotation + fraction * totalRotationSpan;
        const lightTilt = {
          x: Math.cos(frameRotation * 0.5) * 0.35,
          y: Math.sin(frameRotation * 0.5) * 0.25,
        };
        renderCDToCanvas(
          ctx,
          size,
          size,
          { ...config, rotationAngle: frameRotation },
          lightTilt,
          artworkImg,
          {
            transparentBg: false,
            isExport: true,
          }
        );

        if (options.onProgress) {
          options.onProgress(Math.min(100, Math.round((f / totalFrames) * 100)));
        }

        if (f >= totalFrames) {
          clearInterval(interval);
          recorder.stop();
        }
      }, 1000 / fps);
    });
  }

  // 3. Strictly reject WebM to ensure universal MP4 playback
  throw new Error(
    "MP4 (H.264) video encoding is not supported on this browser. Please use Google Chrome, Microsoft Edge, or Safari."
  );
}

/**
 * Backwards-compatible video record wrapper that ensures MP4 output.
 */
export async function recordCDAsVideo(
  getCanvasStream: () => MediaStream | null,
  audioEl: HTMLAudioElement | null,
  options: VideoExportOptions = {}
): Promise<void> {
  if (options.config) {
    return exportCDAsMP4(options.config, options.artworkImg ?? null, audioEl, options);
  }

  throw new Error(
    "CD configuration is required to export MP4 video."
  );
}

/**
 * Encodes CD config into a shareable URL string
 */
export function encodeCDConfigToURL(config: CDConfig): string {
  try {
    const compact = {
      t: config.title,
      a: config.artist,
      r: config.rimText,
      f: config.fontFamily,
      c: config.textColor,
      cdc: config.cdColor,
      rp: config.reflectionPreset,
      sc: config.sleeveColor,
      sm: config.sleeveMode,
      go: config.glassOpacity,
      gb: config.glassBlur,
      c1: config.customColor1,
      c2: config.customColor2,
      c3: config.customColor3,
      tp: config.showTape,
      sfd: config.showFullDisc,
      scl: config.showCenterLabel,
      cd: config.chordDistance,
      ta: config.tapeAngle,
      bg: config.bgColor,
    };
    const json = JSON.stringify(compact);
    const b64 = btoa(encodeURIComponent(json));
    const url = new URL(window.location.href);
    url.searchParams.set("cd", b64);
    return url.toString();
  } catch {
    return window.location.href;
  }
}

/**
 * Decodes CD config from URL
 */
export function decodeCDConfigFromURL(urlString: string): Partial<CDConfig> | null {
  try {
    const url = new URL(urlString);
    const b64 = url.searchParams.get("cd");
    if (!b64) return null;
    const json = decodeURIComponent(atob(b64));
    const data = JSON.parse(json);
    let fontFamily = data.f;
    if (fontFamily === "vandal" || !fontFamily) {
      fontFamily = "marker";
    }

    return {
      title: data.t,
      artist: data.a,
      rimText: data.r,
      fontFamily,
      textColor: data.c,
      cdColor: data.cdc,
      reflectionPreset: data.rp,
      sleeveColor: data.sc,
      sleeveMode: data.sm,
      glassOpacity: data.go,
      glassBlur: data.gb,
      customColor1: data.c1,
      customColor2: data.c2,
      customColor3: data.c3,
      showTape: data.tp !== undefined ? Boolean(data.tp) : true,
      showFullDisc: Boolean(data.sfd),
      showCenterLabel: Boolean(data.scl),
      chordDistance: data.cd,
      tapeAngle: data.ta,
      bgColor: data.bg,
    };
  } catch {
    return null;
  }
}
