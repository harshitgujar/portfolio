"use client";

import React, { useEffect, useRef, useState } from "react";

interface LiquidTypographyProps {
  text?: string;
  className?: string;
}

export function LiquidTypography({
  text = "Product Builder",
  className = "",
}: LiquidTypographyProps) {
  const filterId = useRef(`liquid-filter-${Math.random().toString(36).slice(2, 9)}`).current;
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mouseSpeed, setMouseSpeed] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let currentScale = 12;
    let targetScale = 12;
    let baseFreqX = 0.012;
    let baseFreqY = 0.022;

    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      const dist = Math.hypot(dx, dy);
      mouseVelocity = Math.min(dist * 0.4, 30);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = (now: number) => {
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      // Decay mouse velocity
      mouseVelocity *= 0.92;
      setMouseSpeed(mouseVelocity);

      // Modulate scale with base breathing + mouse ripple
      targetScale = 10 + Math.sin(now * 0.0016) * 3 + mouseVelocity * 0.7;
      currentScale += (targetScale - currentScale) * 0.1;

      // Modulate frequency for organic liquid rolling wave
      const fX = baseFreqX + Math.sin(now * 0.0012) * 0.003 + (mouseVelocity * 0.0003);
      const fY = baseFreqY + Math.cos(now * 0.0018) * 0.004 + (mouseVelocity * 0.0004);

      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute("baseFrequency", `${fX.toFixed(5)} ${fY.toFixed(5)}`);
      }
      if (displacementRef.current) {
        displacementRef.current.setAttribute("scale", currentScale.toFixed(2));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none flex flex-col items-center justify-center text-center max-w-[95vw] ${className}`}
    >
      {/* SVG Liquid Filter Definition */}
      <svg
        className="absolute w-0 h-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, top: -9999 }}
      >
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.022"
              numOctaves="3"
              result="liquidNoise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="liquidNoise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Chromatic highlight shimmer */}
            <feGaussianBlur in="displaced" stdDeviation="0.6" result="softGloss" />
            <feMerge>
              <feMergeNode in="displaced" />
              <feMergeNode in="softGloss" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Viscous Ambient Liquid Halo Behind Text */}
      <div
        className="absolute pointer-events-none w-[115%] h-[130%] -z-10 rounded-full blur-3xl opacity-30 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(240, 78, 35, 0.4) 0%, rgba(255, 186, 92, 0.18) 40%, rgba(44, 24, 15, 0) 70%)",
          transform: `scale(${1 + mouseSpeed * 0.01})`,
        }}
      />

      {/* Main Liquid Typography Heading with Alienation font */}
      <div className="relative group">
        <h1
          className="liquid-text font-normal tracking-wide leading-[1.05]"
          style={{
            fontFamily: "var(--font-alienation), 'Alienation', sans-serif",
            filter: `url(#${filterId}) drop-shadow(0 18px 30px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 45px rgba(240, 78, 35, 0.3))`,
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7 gap-y-2">
            {text.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block px-1 sm:px-3 text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] via-[#fed7aa] via-[#f04e23] to-[#ffb38a] animate-liquid-flow"
                style={{
                  fontFamily: "var(--font-alienation), 'Alienation', sans-serif",
                  backgroundSize: "220% 220%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* Liquid reflection sheen layer */}
        <h1
          aria-hidden="true"
          className="absolute inset-0 select-none pointer-events-none font-normal tracking-wide leading-[1.05] opacity-40 mix-blend-color-dodge"
          style={{
            fontFamily: "var(--font-alienation), 'Alienation', sans-serif",
            filter: `url(#${filterId}) blur(1px)`,
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7 gap-y-2">
            {text.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block px-1 sm:px-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffedd5] to-transparent animate-liquid-pulse"
                style={{
                  fontFamily: "var(--font-alienation), 'Alienation', sans-serif",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>
      </div>
    </div>
  );
}
