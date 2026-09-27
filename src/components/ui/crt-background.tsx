"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;

// Screen curvature / barrel distortion
vec2 curve(vec2 uv) {
    uv = (uv - 0.5) * 2.0;
    uv.x *= 1.0 + pow((abs(uv.y) / 5.2), 2.0);
    uv.y *= 1.0 + pow((abs(uv.x) / 4.4), 2.0);
    uv = (uv / 2.0) + 0.5;
    return uv;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_res;
    vec2 uv = curve(st);

    // Bezel crop
    if (uv.x < 0.005 || uv.x > 0.995 || uv.y < 0.005 || uv.y > 0.995) {
        gl_FragColor = vec4(0.005, 0.008, 0.015, 1.0);
        return;
    }

    // Parallax mouse displacement
    vec2 mouseOffset = (u_mouse - 0.5) * 0.025;
    vec2 imgUv = uv + mouseOffset;

    // Fit texture with cover aspect ratio
    float imgAspect = 16.0 / 9.0;
    float screenAspect = u_res.x / max(u_res.y, 1.0);
    vec2 texCoord = imgUv;
    if (screenAspect > imgAspect) {
        float scale = imgAspect / screenAspect;
        texCoord.y = (texCoord.y - 0.5) * scale + 0.5;
    } else {
        float scale = screenAspect / imgAspect;
        texCoord.x = (texCoord.x - 0.5) * scale + 0.5;
    }

    // Chromatic aberration (RGB channel shift)
    float dist = length(uv - 0.5);
    vec2 offset = normalize(uv - 0.5 + 0.0001) * dist * 0.006;

    float r = texture2D(u_texture, texCoord + offset).r;
    float g = texture2D(u_texture, texCoord).g;
    float b = texture2D(u_texture, texCoord - offset).b;
    vec3 col = vec3(r, g, b);

    // Electric Cyan phosphor boost & bloom
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 cyanTint = vec3(0.05, 0.85, 1.0) * pow(luma, 1.3) * 0.45;
    col += cyanTint;

    // High-density horizontal CRT Scanlines
    float scanline = sin(uv.y * u_res.y * 1.8) * 0.18;
    col -= scanline;

    // Moving CRT scan beam sweep
    float scanRoll = sin((uv.y * 3.5) - (u_time * 2.8));
    col += clamp(scanRoll * 0.035, 0.0, 0.05);

    // Subpixel aperture grille (vertical RGB stripes)
    float subpixel = mod(gl_FragCoord.x, 3.0);
    vec3 mask = vec3(0.88, 0.88, 0.88);
    if (subpixel < 1.0) mask = vec3(1.12, 0.90, 0.90);
    else if (subpixel < 2.0) mask = vec3(0.90, 1.12, 0.90);
    else mask = vec3(0.90, 0.90, 1.18);
    col *= mask;

    // CRT Vignette & tube edge falloff
    float vig = 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vig = clamp(pow(vig, 0.22), 0.0, 1.0);
    col *= vig;

    // Subtle cathode ray tube noise & flicker
    float noise = (fract(sin(dot(gl_FragCoord.xy + u_time * 30.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
    col += noise;

    float flicker = sin(u_time * 60.0) * 0.008;
    col += flicker;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

interface CRTBackgroundProps {
  className?: string;
  imageSrc?: string;
  interactive?: boolean;
}

export function CRTBackground({
  className,
  imageSrc = "/crt-hologram.jpg",
  interactive = true,
}: CRTBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      targetMouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("CRT Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const posAttr = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTexture = gl.getUniformLocation(program, "u_texture");

    // Load texture
    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    let textureLoaded = false;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      textureLoaded = true;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let rafId = 0;
    const start = performance.now();

    const render = (now: number) => {
      const elapsed = (now - start) / 1000;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      if (uTime) gl.uniform1f(uTime, elapsed);
      if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);

      if (textureLoaded && uTexture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(uTexture, 0);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handlePointerMove);
      ro.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [imageSrc, interactive]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden bg-black", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block"
      />
      {/* Physical CRT Glass reflection & bezel vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.85)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06)_0%,rgba(0,0,0,0.4)_75%,rgba(0,0,0,0.9)_100%)]"
        aria-hidden="true"
      />
    </div>
  );
}

export default CRTBackground;
