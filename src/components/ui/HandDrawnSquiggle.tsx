import React from "react";

interface HandDrawnSquiggleProps {
  color?: string;
  className?: string;
}

export function HandDrawnSquiggle({
  color = "currentColor",
  className = "",
}: HandDrawnSquiggleProps) {
  return (
    <svg
      viewBox="0 0 420 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Primary Hand-Drawn Wavy Loop Underline matching reference */}
      <path
        d="M 6,24 C 22,12 40,10 56,26 C 68,37 78,44 94,32 C 104,24 116,14 132,32 C 146,48 152,50 156,38 C 158,32 162,18 184,28 C 204,36 218,44 246,24 C 274,4 324,8 368,26 C 392,36 414,46 418,48"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Little accent notch under the loop */}
      <path
        d="M 148,46 L 146,53"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Secondary trailing speed stroke above the right tail */}
      <path
        d="M 288,14 C 330,12 376,16 406,22"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
