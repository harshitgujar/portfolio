"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface WorkLensCanvasProps {
  tintColor: string;
  backgroundColor?: string;
  isLight?: boolean;
  rotation?: number; // In degrees, e.g. 45
  sizeX?: number; // Default 0.46
  sizeY?: number; // Default 0.82
  glow?: number; // Default 4.5
  className?: string;
}

const LENS_VERTEX = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const LENS_FRAGMENT = /* glsl */ `
#define PI 3.14159265
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uSizeX;
uniform float uSizeY;
uniform float uAspect;
uniform float uZoom;
uniform float uDispersion;
uniform float uBlur;
uniform float uGlow;
uniform float uWhiteGlow;
uniform float uNovaSize;
uniform float uBlueRing;
uniform float uRingRadius;
uniform float uRingWidth;
uniform float uShimmer;
uniform float uShimmerFreq;
uniform float uShimmerSpeed;
uniform float uShimmerDepth;
uniform float uTime;
uniform float uRimStart;
uniform float uRimTangential;
uniform float uRimInward;
uniform float uRimFreq1;
uniform float uRimFreq2;
uniform vec3 uBlueColor;
uniform float uRimLine;
uniform float uRimLinePos;
uniform float uRimLineWidth;
uniform float uVignette;
uniform float uVignetteSize;
uniform float uShape;
uniform float uSquareRound;
uniform float uRotation;
uniform float uIsLight;
uniform int uSamples;

const int MAX_SAMPLES = 16;

vec3 discLens(vec2 center, float aspectCorrect, out float outA) {
  vec2 p = (vUv - center);
  p.x *= aspectCorrect;
  float ca = cos(uRotation), sa = sin(uRotation);
  p = mat2(ca, -sa, sa, ca) * p;
  vec2 halfSize = vec2(uSizeX, uSizeY);
  float dist = length(p / halfSize);
  outA = 0.0;

  float maskND = dist;
  if (maskND > 1.0) return vec3(0.0);

  float shapeND = clamp(maskND, 0.0, 1.0);
  float nd = clamp(dist, 0.0, 1.0);
  vec2 offset = vUv - center;
  vec2 radialDir = normalize(offset + 1e-6);
  vec2 tangentDir = vec2(-radialDir.y, radialDir.x);
  float angle = atan(p.y, p.x);

  float pull = uZoom * 0.30 * (nd * nd);
  float rimStrength = smoothstep(uRimStart, 1.0, nd);
  float fluidWave = sin(angle * uRimFreq1) * 0.55 + sin(angle * uRimFreq2) * 0.25;
  float rScreen = (uSizeX + uSizeY) * 0.5;
  vec2 rimOff = tangentDir * fluidWave * rimStrength * rScreen * uRimTangential;
  vec2 rimPull = -radialDir * rimStrength * rScreen * uRimInward;

  vec2 baseUV = center + offset * (1.0 - pull) + rimOff + rimPull;

  float rimMask = smoothstep(0.55, 1.0, nd);
  vec2 dispDir = offset * uDispersion * 0.004 * rimMask;
  int N = uSamples;
  if (N < 2) N = 2;
  if (N > MAX_SAMPLES) N = MAX_SAMPLES;
  vec3 col = vec3(0.0);
  vec3 caW = vec3(0.0);
  for (int i = 0; i < MAX_SAMPLES; i++) {
    if (i >= N) break;
    float t = float(i) / float(N - 1);
    vec2 sUV = baseUV + dispDir * (t - 0.5);
    vec3 s = texture2D(uTex, sUV).rgb;
    vec3 w = vec3(
      exp(-pow((t - 0.00) / 0.38, 2.0)),
      exp(-pow((t - 0.50) / 0.38, 2.0)),
      exp(-pow((t - 1.00) / 0.38, 2.0))
    );
    col += s * w;
    caW += w;
  }
  col /= max(caW, vec3(0.001));

  float blurFade = 1.0 - smoothstep(0.72, 0.98, nd);
  if (uBlur > 0.01 && blurFade > 0.01) {
    vec2 blurRad = vec2(uBlur) / uRes * blurFade;
    vec3 bcol = vec3(0.0);
    float btw = 0.0;
    for (float a = 0.0; a < PI * 2.0; a += PI * 2.0 / 6.0) {
      for (float rr = 0.4; rr <= 1.001; rr += 0.3) {
        vec2 o = vec2(cos(a), sin(a)) * blurRad * rr;
        float w = 1.0 - rr * 0.38;
        bcol += texture2D(uTex, baseUV + o).rgb * w;
        btw += w;
      }
    }
    col = mix(bcol / btw, col, rimMask);
  }

  float dC = shapeND * 0.5;
  float tR = clamp(uRingRadius, 0.1, 0.49);
  float rW = max(uRingWidth, 0.003);
  float ring = exp(-pow((dC - tR) / rW, 2.0));
  if (uShimmer > 0.5) ring *= sin(angle * uShimmerFreq + uTime * uShimmerSpeed) * uShimmerDepth + (1.0 - uShimmerDepth);
  float ringAura = exp(-pow((dC - tR) / (rW * 5.5), 2.0)) * 0.36;

  if (uIsLight > 0.5) {
    // ☀️ Light Mode: Frosted optical glass refraction, pigmented chromatic rim, and clean specular gleam
    col *= mix(0.965, 1.0, smoothstep(0.0, 0.45, shapeND));

    float accentAlpha = clamp(ring * 0.88 + ringAura * 0.45, 0.0, 1.0);
    col = mix(col, uBlueColor, accentAlpha);

    // Specular outer highlight
    float spec = exp(-pow((dC - uRimLinePos) / max(uRimLineWidth * 1.5, 0.0001), 2.0));
    col = mix(col, vec3(1.0), clamp(spec * 0.9, 0.0, 1.0));

    outA = smoothstep(1.0, 0.94, maskND);
    return col;
  } else {
    // 🌙 Dark Mode: Original fiery additive glow math from work section
    col *= mix(0.91, 1.0, smoothstep(0.0, 0.38, shapeND));

    float r2 = shapeND * shapeND * 0.25;
    float gs = max(uNovaSize * uGlow * 0.003, 0.004);
    float nova = exp(-r2 / gs) + exp(-r2 / (gs * 7.0)) * 0.18;
    nova *= uWhiteGlow * (uGlow / 17.0) * 1.15;
    col += vec3(nova);

    ring *= uBlueRing * (uGlow / 17.0) * 1.8;
    float darkAura = exp(-pow((dC - tR) / (rW * 6.0), 2.0)) * 0.28 * uBlueRing * (uGlow / 17.0);
    col += uBlueColor * (ring + darkAura);
    col += vec3(exp(-pow((dC - uRimLinePos) / max(uRimLineWidth, 0.0001), 2.0)) * uRimLine);

    outA = smoothstep(1.0, 0.93, maskND);
    return col;
  }
}

void main(){
  vec3 base = texture2D(uTex, vUv).rgb;
  vec3 outc = base;
  float a = 0.0;
  vec3 c = discLens(uCenter, uAspect, a);
  outc = mix(outc, c, a);
  if (uVignette > 0.001 && uIsLight < 0.5) {
    vec2 vc = vUv - 0.5;
    vc.x *= uAspect;
    float d = length(vc) / max(uVignetteSize, 0.0001);
    float vig = 1.0 - uVignette * smoothstep(0.5, 1.0, d);
    outc *= clamp(vig, 0.0, 1.0);
  }
  gl_FragColor = vec4(outc, 1.0);
}
`;

export function WorkLensCanvas({
  tintColor,
  backgroundColor = "#000000",
  isLight = false,
  rotation = 45,
  sizeX = 0.46,
  sizeY = 0.82,
  glow = 4.5,
  className = "",
}: WorkLensCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<Record<string, { value: unknown }> | null>(null);
  const bgTexRef = useRef<THREE.DataTexture | null>(null);

  // Initialize WebGL Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      });
      rendererRef.current = renderer;
    } catch (e) {
      console.warn("Failed to create WebGLRenderer for WorkLensCanvas:", e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const initialBg = new THREE.Color(backgroundColor || (isLight ? "#fbf7f4" : "#000000"));
    renderer.setClearColor(initialBg, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Dynamic 1x1 background texture for uTex matching backgroundColor
    const bgTex = new THREE.DataTexture(
      new Uint8Array([
        Math.round(initialBg.r * 255),
        Math.round(initialBg.g * 255),
        Math.round(initialBg.b * 255),
        255,
      ]),
      1,
      1,
      THREE.RGBAFormat
    );
    bgTex.needsUpdate = true;
    bgTexRef.current = bgTex;

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);

    const uniforms = {
      uTex: { value: bgTex },
      uRes: { value: new THREE.Vector2(width * dpr, height * dpr) },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uSizeX: { value: sizeX },
      uSizeY: { value: sizeY },
      uShape: { value: 0 },
      uSquareRound: { value: 0 },
      uRotation: { value: (rotation * Math.PI) / 180 },
      uIsLight: { value: isLight ? 1.0 : 0.0 },
      uAspect: { value: width / height },
      uZoom: { value: 0 },
      uDispersion: { value: 11.0 },
      uBlur: { value: 0.0 },
      uGlow: { value: glow },
      uWhiteGlow: { value: 0.26 },
      uNovaSize: { value: 12.0 },
      uBlueRing: { value: 6.0 },
      uRingRadius: { value: 0.49 },
      uRingWidth: { value: 0.014 },
      uShimmer: { value: 1.0 },
      uShimmerFreq: { value: 12.0 },
      uShimmerSpeed: { value: 3.5 },
      uShimmerDepth: { value: 0.12 },
      uTime: { value: 0 },
      uRimStart: { value: 0.578 },
      uRimTangential: { value: 0.6 },
      uRimInward: { value: 0.0 },
      uRimFreq1: { value: 2.0 },
      uRimFreq2: { value: 1.0 },
      uBlueColor: { value: new THREE.Color(tintColor || "#f04e23") },
      uRimLine: { value: 1.4 },
      uRimLinePos: { value: 0.488 },
      uRimLineWidth: { value: 0.003 },
      uVignette: { value: 0.35 },
      uVignetteSize: { value: 0.85 },
      uSamples: { value: 16 },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: LENS_VERTEX,
      fragmentShader: LENS_FRAGMENT,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let rafId: number;
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      uniforms.uTime.value = performance.now() * 0.001;
      renderer?.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas || !renderer) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w * dpr, h * dpr);
      uniforms.uAspect.value = w / h;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      mesh.geometry.dispose();
      material.dispose();
      bgTex.dispose();
      renderer?.dispose();
      rendererRef.current = null;
      uniformsRef.current = null;
      bgTexRef.current = null;
    };
  }, [rotation, sizeX, sizeY, glow]);

  // Reactive updates for theme switching without re-initializing WebGL
  useEffect(() => {
    if (!rendererRef.current || !uniformsRef.current) return;
    const col = new THREE.Color(backgroundColor || (isLight ? "#fbf7f4" : "#000000"));
    rendererRef.current.setClearColor(col, 1);

    (uniformsRef.current.uIsLight as { value: number }).value = isLight ? 1.0 : 0.0;
    (uniformsRef.current.uBlueColor as { value: THREE.Color }).value.set(tintColor || "#f04e23");

    const tex = bgTexRef.current;
    if (tex && tex.image && tex.image.data) {
      tex.image.data[0] = Math.round(col.r * 255);
      tex.image.data[1] = Math.round(col.g * 255);
      tex.image.data[2] = Math.round(col.b * 255);
      tex.image.data[3] = 255;
      tex.needsUpdate = true;
    }
  }, [backgroundColor, isLight, tintColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full select-none ${className}`}
    />
  );
}
