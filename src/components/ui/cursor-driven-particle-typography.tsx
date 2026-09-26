"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export interface CursorDrivenParticleTypographyProps {
  /** Additional CSS classes */
  className?: string;
  /** The text to render */
  text: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Size of each particle */
  particleSize?: number;
  /** Density of particles (lower number = more particles, minimum 1) */
  particleDensity?: number;
  /** How strongly the cursor pushes particles away */
  dispersionStrength?: number;
  /** Speed at which particles return to origin */
  returnSpeed?: number;
  /** Custom color for particles. Overrides inherited text color if set. */
  color?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  dispersion: number;
  returnSpd: number;

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    dispersion: number,
    returnSpd: number,
  ) {
    this.x = x + (Math.random() - 0.5) * 10;
    this.y = y + (Math.random() - 0.5) * 10;
    this.originX = x;
    this.originY = y;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    this.size = size;
    this.color = color;
    this.dispersion = dispersion;
    this.returnSpd = returnSpd;
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Physics interaction with mouse
    const interactionRadius = 140;

    if (distance < interactionRadius && mouseX !== -1000 && mouseY !== -1000) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;

      const force = (interactionRadius - distance) / interactionRadius;

      // Calculate repulsion
      const repulsionX = forceDirectionX * force * this.dispersion;
      const repulsionY = forceDirectionY * force * this.dispersion;

      this.vx -= repulsionX;
      this.vy -= repulsionY;
    }

    // Return to origin (spring physics)
    this.vx += (this.originX - this.x) * this.returnSpd;
    this.vy += (this.originY - this.y) * this.returnSpd;

    // Friction
    this.vx *= 0.85;
    this.vy *= 0.85;

    // Add subtle noise/jitter when close to origin
    const distToOrigin = Math.sqrt(
      Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2),
    );
    if (distToOrigin < 1 && Math.random() > 0.95) {
      this.vx += (Math.random() - 0.5) * 0.2;
      this.vy += (Math.random() - 0.5) * 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CursorDrivenParticleTypography({
  className,
  text,
  fontSize = 130,
  fontFamily = "Inter, system-ui, sans-serif",
  particleSize = 1.6,
  particleDensity = 4,
  dispersionStrength = 18,
  returnSpeed = 0.08,
  color = "#ffffff",
}: CursorDrivenParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    let mouseX = -1000;
    let mouseY = -1000;

    let containerWidth = 0;
    let containerHeight = 0;

    const init = () => {
      const container = containerRef.current;
      if (!container) return;

      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;
      if (containerWidth === 0 || containerHeight === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      ctx.scale(dpr, dpr);

      // Determine text color
      const computedStyle = window.getComputedStyle(container);
      const textColor = color || computedStyle.color || "#ffffff";

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      // Resolve any CSS variables in fontFamily so Canvas parser accepts it
      const resolveFamily = (family: string): string => {
        let f = family;
        if (f.includes("var(--") && typeof window !== "undefined") {
          const target = container || document.documentElement;
          f = f.replace(/var\((--[^,\s)]+)\)/g, (_, varName) => {
            const val = window.getComputedStyle(target).getPropertyValue(varName).trim();
            return val || "sans-serif";
          });
        }
        return f;
      };

      const resolvedFamily = resolveFamily(fontFamily);

      const applyFont = (size: number) => {
        ctx.font = `900 ${size}px ${resolvedFamily}`;
        if (ctx.font.includes("10px") && size > 20) {
          ctx.font = `900 ${size}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        }
      };

      // Dynamically fit font size to container width & height
      const lines = text.split("\n");
      let effectiveFontSize = fontSize;
      applyFont(effectiveFontSize);

      let maxLineWidth = 0;
      for (const line of lines) {
        const w = ctx.measureText(line).width;
        if (w > maxLineWidth) maxLineWidth = w;
      }

      const maxAllowedWidth = containerWidth * 0.95;
      if (maxLineWidth > maxAllowedWidth && maxLineWidth > 0) {
        effectiveFontSize = Math.floor(effectiveFontSize * (maxAllowedWidth / maxLineWidth));
      }

      const lineHeight = effectiveFontSize * 0.98;
      const totalBlockHeight = (lines.length - 1) * lineHeight + effectiveFontSize;
      const maxAllowedHeight = containerHeight * 0.88;
      if (totalBlockHeight > maxAllowedHeight && totalBlockHeight > 0) {
        effectiveFontSize = Math.floor(effectiveFontSize * (maxAllowedHeight / totalBlockHeight));
      }

      applyFont(effectiveFontSize);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const finalLineHeight = effectiveFontSize * 0.98;
      const finalTotalHeight = (lines.length - 1) * finalLineHeight;
      const startY = containerHeight / 2 - finalTotalHeight / 2;

      // Draw standard text first to measure and rasterize it
      ctx.fillStyle = textColor;
      lines.forEach((line, index) => {
        ctx.fillText(line, containerWidth / 2, startY + index * finalLineHeight);
      });

      // Get pixel data
      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      particles = [];

      // Create particles from text pixels
      const step = Math.max(1, Math.floor(particleDensity * dpr));
      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3] || 0;

          if (alpha > 128) {
            particles.push(
              new Particle(
                x / dpr,
                y / dpr,
                particleSize,
                textColor,
                dispersionStrength,
                returnSpeed,
              ),
            );
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      init();
    };

    let timeoutId: NodeJS.Timeout;
    const startAnimation = () => {
      init();
      cancelAnimationFrame(animationFrameId);
      animate();
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        timeoutId = setTimeout(startAnimation, 40);
      });
    } else {
      timeoutId = setTimeout(startAnimation, 60);
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const themeObserver = new MutationObserver(() => {
      init();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    });
    canvas.addEventListener("touchmove", (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    });
    window.addEventListener("touchend", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchend", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    text,
    fontSize,
    fontFamily,
    particleSize,
    particleDensity,
    dispersionStrength,
    returnSpeed,
    color,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full min-h-[400px] flex items-center justify-center relative touch-none",
        className,
      )}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default CursorDrivenParticleTypography;
