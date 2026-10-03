import { CDConfig, REFLECTION_PRESETS } from "@/types/digital-cd";

export interface RenderOptions {
  transparentBg?: boolean;
  isExport?: boolean;
  exportScale?: number;
  theme?: "dark" | "light";
}

/**
 * Draws text along a circular arc path.
 */
function drawCurvedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  isClockwise: boolean = true
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Measure character widths and calculate total angular span
  const characters = text.split("");
  const charWidths = characters.map((char) => ctx.measureText(char).width);
  const totalWidth = charWidths.reduce((a, b) => a + b, 0);

  // Circumference
  const circumference = 2 * Math.PI * radius;
  // If text is shorter than circumference, space characters nicely
  const spacingAngle = (totalWidth / circumference) * (2 * Math.PI);
  const charAngles = charWidths.map((w) => (w / totalWidth) * spacingAngle);

  let currentAngle = startAngle;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const halfAngle = charAngles[i] / 2;
    currentAngle += isClockwise ? halfAngle : -halfAngle;

    ctx.save();
    ctx.rotate(currentAngle);
    ctx.translate(0, isClockwise ? -radius : radius);
    ctx.fillText(char, 0, 0);
    ctx.restore();

    currentAngle += isClockwise ? halfAngle : -halfAngle;
  }

  ctx.restore();
}

/**
 * High-fidelity realistic CD and Sleeve renderer on HTML5 Canvas.
 */
export function renderCDToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: CDConfig,
  tilt: { x: number; y: number } = { x: 0, y: 0 },
  artworkImg: HTMLImageElement | null = null,
  options: RenderOptions = {}
) {
  const { transparentBg = false } = options;

  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const size = Math.min(width, height);

  // Sizing and layout calculation:
  // For disc-only: CD is centered at (cx, cy)
  // For in-sleeve / half-slide: we center the entire composite assembly (sleeve + disc)
  // horizontally around cx with generous margins so it NEVER clips or goes out of frame.
  let discR = size * 0.35;
  let sleeveSize = size * 0.62;
  let sleeveRadius = sleeveSize * 0.23; // Signature smooth rounded corners of the CD case
  let sleeveX = cx - sleeveSize / 2;
  let sleeveY = cy - sleeveSize / 2;
  let cdX = cx;
  let cdY = cy;

  if (config.sleeveMode === "disc-only") {
    discR = size * 0.36;
    cdX = cx;
    cdY = cy;
  } else {
    // Sizing for realistic packaging proportions (standard CD ~120mm, sleeve ~125mm)
    sleeveSize = size * 0.62;
    sleeveRadius = sleeveSize * 0.23; // Signature smooth rounded corners
    discR = size * 0.295;

    // Slide offset determines how much of the CD peeks out
    // "in-sleeve": peeks out slightly (~18% of disc radius)
    // "half-slide": smoothly pulled out to reveal grooves and artwork (~58% of disc radius)
    const slideRatio = config.sleeveMode === "half-slide" ? 0.58 : 0.18;
    const slideOffset = discR * slideRatio;

    // Total composition width from sleeve left edge to disc right edge
    const compWidth = sleeveSize / 2 + slideOffset + discR;

    // Perfectly center the entire composition horizontally at cx
    sleeveX = cx - compWidth / 2;
    sleeveY = cy - sleeveSize / 2;
    cdX = sleeveX + sleeveSize / 2 + slideOffset;
    cdY = cy;
  }

  // 1. Background layer
  if (!transparentBg) {
    const isLightMode = options.theme === "light";
    const bgBase = config.bgColor || (isLightMode ? "#ffffff" : "#0c0d14");
    const bgGrad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.75);
    bgGrad.addColorStop(0, bgBase);
    bgGrad.addColorStop(0.68, adjustColorBrightness(bgBase, -15));
    bgGrad.addColorStop(1, adjustColorBrightness(bgBase, -35));
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Soft colored ambient atmospheric glow behind the sleeve
    if (config.sleeveMode !== "disc-only") {
      ctx.save();
      const glowGrad = ctx.createRadialGradient(
        cx,
        cy,
        sleeveSize * 0.2,
        cx,
        cy,
        sleeveSize * 0.75
      );
      if (isLightMode) {
        glowGrad.addColorStop(0, `${config.sleeveColor}25`);
        glowGrad.addColorStop(0.6, `${config.sleeveColor}0c`);
      } else {
        glowGrad.addColorStop(0, `${config.sleeveColor}44`);
        glowGrad.addColorStop(0.6, `${config.sleeveColor}18`);
      }
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sleeveSize * 0.75, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // 2. Sleeve Back & Base Pocket (if sleeve mode is active)
  if (config.sleeveMode !== "disc-only") {
    ctx.save();

    // Drop shadow under sleeve
    const isLightMode = options.theme === "light";
    ctx.shadowColor = isLightMode ? "rgba(0, 0, 0, 0.14)" : "rgba(0, 0, 0, 0.65)";
    ctx.shadowBlur = size * (isLightMode ? 0.06 : 0.08);
    ctx.shadowOffsetY = size * (isLightMode ? 0.02 : 0.03);

    // Sleeve body rounded rectangle
    ctx.beginPath();
    ctx.roundRect(sleeveX, sleeveY, sleeveSize, sleeveSize, sleeveRadius);

    // Sleeve rich vibrant gradient
    const sleeveGrad = ctx.createLinearGradient(
      sleeveX,
      sleeveY,
      sleeveX + sleeveSize,
      sleeveY + sleeveSize
    );
    sleeveGrad.addColorStop(0, config.sleeveColor);
    sleeveGrad.addColorStop(0.5, config.sleeveColor);
    sleeveGrad.addColorStop(1, adjustColorBrightness(config.sleeveColor, -25));
    ctx.fillStyle = sleeveGrad;
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Inner subtle sleeve rim highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Four corner rivet/punch holes (matching reference image!)
    if (config.showCornerRivets) {
      const rivetInset = sleeveSize * 0.11;
      const rivetR = sleeveSize * 0.038;
      const rivetPositions = [
        { x: sleeveX + rivetInset, y: sleeveY + rivetInset },
        { x: sleeveX + sleeveSize - rivetInset, y: sleeveY + rivetInset },
        { x: sleeveX + rivetInset, y: sleeveY + sleeveSize - rivetInset },
        { x: sleeveX + sleeveSize - rivetInset, y: sleeveY + sleeveSize - rivetInset },
      ];

      for (const pos of rivetPositions) {
        ctx.save();
        // Recessed shadow
        const rivetGrad = ctx.createRadialGradient(
          pos.x - rivetR * 0.2,
          pos.y - rivetR * 0.2,
          rivetR * 0.1,
          pos.x,
          pos.y,
          rivetR
        );
        rivetGrad.addColorStop(0, "rgba(0, 0, 0, 0.35)");
        rivetGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.25)");
        rivetGrad.addColorStop(1, "rgba(255, 255, 255, 0.08)");
        ctx.fillStyle = rivetGrad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, rivetR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.restore();
  }

  // 3. Compact Disc (CD)
  ctx.save();
  ctx.translate(cdX, cdY);

  // Realistic disc drop shadow onto sleeve / background
  const isLightMode = options.theme === "light";
  ctx.save();
  ctx.shadowColor = isLightMode ? "rgba(0, 0, 0, 0.22)" : "rgba(0, 0, 0, 0.55)";
  ctx.shadowBlur = discR * 0.25;
  ctx.shadowOffsetX = -discR * 0.08;
  ctx.shadowOffsetY = discR * 0.06;
  ctx.beginPath();
  ctx.arc(0, 0, discR, 0, Math.PI * 2);
  ctx.fillStyle = isLightMode ? "#dbe1ea" : "#1e2029";
  ctx.fill();
  ctx.restore();

  // A. Outer Polycarbonate Clear Bevel Rim (100% to 94%)
  ctx.beginPath();
  ctx.arc(0, 0, discR, 0, Math.PI * 2);
  const outerRimGrad = ctx.createRadialGradient(
    0,
    0,
    discR * 0.93,
    0,
    0,
    discR
  );
  outerRimGrad.addColorStop(0, "#9ca3af");
  outerRimGrad.addColorStop(0.6, "#e2e8f0");
  outerRimGrad.addColorStop(0.9, "#ffffff");
  outerRimGrad.addColorStop(1, "#64748b");
  ctx.fillStyle = outerRimGrad;
  ctx.fill();

  // B. Aluminum Mirror Data Storage Layer (94% down to 36%)
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, discR * 0.94, 0, Math.PI * 2);
  ctx.arc(0, 0, discR * 0.36, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  // C. Determine Reflection Preset & Disc Base Color
  const preset =
    REFLECTION_PRESETS.find((p) => p.id === config.reflectionPreset) ||
    REFLECTION_PRESETS[0];

  const discBaseColor = config.cdColor || preset.discColor || "#0f2bf6";
  const discDark = adjustColorBrightness(discBaseColor, -55);
  const discMidDark = adjustColorBrightness(discBaseColor, -25);
  const discVivid = discBaseColor;
  const discBright = adjustColorBrightness(discBaseColor, 35);

  // Base CD data disc body gradient
  const cdBodyGrad = ctx.createRadialGradient(0, 0, discR * 0.36, 0, 0, discR * 0.94);
  cdBodyGrad.addColorStop(0, discDark);
  cdBodyGrad.addColorStop(0.2, discMidDark);
  cdBodyGrad.addColorStop(0.52, discVivid);
  cdBodyGrad.addColorStop(0.78, discBright);
  cdBodyGrad.addColorStop(0.92, discMidDark);
  cdBodyGrad.addColorStop(1, discDark);
  ctx.fillStyle = cdBodyGrad;
  ctx.fillRect(-discR, -discR, discR * 2, discR * 2);

  // Subtle metallic sheen overlay
  const metalSheen = ctx.createLinearGradient(-discR, -discR, discR, discR);
  metalSheen.addColorStop(0, "rgba(255, 255, 255, 0.14)");
  metalSheen.addColorStop(0.5, "rgba(0, 0, 0, 0.12)");
  metalSheen.addColorStop(1, "rgba(255, 255, 255, 0.18)");
  ctx.fillStyle = metalSheen;
  ctx.fillRect(-discR, -discR, discR * 2, discR * 2);

  // Concentric micro-groove tracks
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  const step = discR * 0.012;
  for (let r = discR * 0.38; r < discR * 0.94; r += step) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // In real life physics, light reflections stay steady in space while the CD disc spins beneath it.
  // The reflection only responds subtly to interactive 3D mouse tilt.
  const lightBaseAngle = -Math.PI * 0.35;
  const reflectionAngle = lightBaseAngle + (tilt.x * 0.35 + tilt.y * 0.25);

  // Conic Rainbow / Color diffraction gradient
  let colorStops = preset.colors;
  if (config.reflectionPreset === "custom") {
    colorStops = [
      "#ffffff",
      config.customColor1,
      config.customColor2,
      config.customColor3,
      config.customColor1,
      "#ffffff",
    ];
  }

  const conicGrad = ctx.createConicGradient(reflectionAngle, 0, 0);
  const numStops = colorStops.length;
  colorStops.forEach((col, idx) => {
    conicGrad.addColorStop(idx / (numStops - 1), col);
  });

  // Blend broad diffuse rainbow reflection with soft blur
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  if (typeof ctx.filter !== "undefined") {
    ctx.filter = "blur(16px) saturate(1.2)";
  }
  ctx.globalAlpha = 0.45 * config.reflectionIntensity;
  ctx.fillStyle = conicGrad;
  ctx.fillRect(-discR, -discR, discR * 2, discR * 2);
  ctx.restore();

  // Specular Anisotropic Light Sheen (Smooth diffuse gradient with wide spread & blur, NO hard triangles!)
  const primaryFlareAngle = reflectionAngle + Math.PI * 0.75;
  const spreadScale = Math.max(1.0, Math.min(2.2, config.specularSpread * 1.35));
  const s1 = 0.035 * spreadScale;
  const s2 = 0.085 * spreadScale;
  const s3 = 0.15 * spreadScale;
  const s4 = 0.23 * spreadScale;

  const coreCol = preset.flareColor || "rgba(255, 255, 255, 0.98)";
  const tint1 = hexToRgbaString(preset.colors[1] || "#60a5fa", 0.85);
  const tint2 = hexToRgbaString(preset.colors[2] || "#3b82f6", 0.5);
  const tint3 = hexToRgbaString(preset.colors[3] || preset.colors[1] || "#8b5cf6", 0.18);

  // Dedicated specular conic gradient wrapping 360 degrees around the center
  const specConic = ctx.createConicGradient(primaryFlareAngle, 0, 0);

  // Lobe 1: Centered at 0.0 (wrapping at 1.0)
  specConic.addColorStop(0, coreCol);
  specConic.addColorStop(Math.min(0.24, s1), tint1);
  specConic.addColorStop(Math.min(0.24, s2), tint2);
  specConic.addColorStop(Math.min(0.24, s3), tint3);
  specConic.addColorStop(Math.min(0.25, s4), "transparent");

  // Gap between lobes
  specConic.addColorStop(Math.max(0.25, 0.5 - s4), "transparent");
  specConic.addColorStop(Math.max(0.26, 0.5 - s3), tint3);
  specConic.addColorStop(Math.max(0.27, 0.5 - s2), tint2);
  specConic.addColorStop(Math.max(0.28, 0.5 - s1), tint1);

  // Lobe 2: Centered at 0.5 (180 degrees opposing secondary flare)
  specConic.addColorStop(0.5, hexToRgbaString(coreCol, 0.88));
  specConic.addColorStop(Math.min(0.74, 0.5 + s1), tint1);
  specConic.addColorStop(Math.min(0.74, 0.5 + s2), tint2);
  specConic.addColorStop(Math.min(0.74, 0.5 + s3), tint3);
  specConic.addColorStop(Math.min(0.75, 0.5 + s4), "transparent");

  // Gap wrapping back to 1.0
  specConic.addColorStop(Math.max(0.75, 1.0 - s4), "transparent");
  specConic.addColorStop(Math.max(0.76, 1.0 - s3), tint3);
  specConic.addColorStop(Math.max(0.77, 1.0 - s2), tint2);
  specConic.addColorStop(Math.max(0.78, 1.0 - s1), tint1);
  specConic.addColorStop(1.0, coreCol);

  // Draw smooth blurred continuous angular specular reflection
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  if (typeof ctx.filter !== "undefined") {
    ctx.filter = "blur(10px) brightness(1.15)";
  }
  ctx.globalAlpha = 0.72 * config.reflectionIntensity;
  ctx.fillStyle = specConic;
  ctx.fillRect(-discR, -discR, discR * 2, discR * 2);
  ctx.restore();

  // Smooth Radial Specular Blooms (Soft glowing diffused highlights)
  const bloomDist = discR * 0.62;

  // Primary hotspot bloom (matching the bright flare in the reference photo)
  const px = Math.cos(primaryFlareAngle) * bloomDist;
  const py = Math.sin(primaryFlareAngle) * bloomDist;
  const primaryBloom = ctx.createRadialGradient(
    px,
    py,
    discR * 0.04,
    px,
    py,
    discR * 0.62 * spreadScale
  );
  primaryBloom.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  primaryBloom.addColorStop(0.2, hexToRgbaString(preset.colors[1] || "#60a5fa", 0.65));
  primaryBloom.addColorStop(0.48, hexToRgbaString(preset.colors[2] || "#3b82f6", 0.25));
  primaryBloom.addColorStop(0.75, hexToRgbaString(preset.colors[3] || "#8b5cf6", 0.06));
  primaryBloom.addColorStop(1, "transparent");

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  if (typeof ctx.filter !== "undefined") {
    ctx.filter = "blur(14px)";
  }
  ctx.globalAlpha = 0.8 * config.reflectionIntensity;
  ctx.fillStyle = primaryBloom;
  ctx.fillRect(-discR, -discR, discR * 2, discR * 2);
  ctx.restore();

  // Opposing secondary hotspot bloom (softer)
  const oppAngle = primaryFlareAngle + Math.PI;
  const ox = Math.cos(oppAngle) * bloomDist;
  const oy = Math.sin(oppAngle) * bloomDist;
  const oppBloom = ctx.createRadialGradient(
    ox,
    oy,
    discR * 0.04,
    ox,
    oy,
    discR * 0.52 * spreadScale
  );
  oppBloom.addColorStop(0, "rgba(255, 255, 255, 0.7)");
  oppBloom.addColorStop(0.22, hexToRgbaString(preset.colors[1] || "#60a5fa", 0.38));
  oppBloom.addColorStop(0.5, hexToRgbaString(preset.colors[2] || "#3b82f6", 0.12));
  oppBloom.addColorStop(1, "transparent");

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  if (typeof ctx.filter !== "undefined") {
    ctx.filter = "blur(14px)";
  }
  ctx.globalAlpha = 0.55 * config.reflectionIntensity;
  ctx.fillStyle = oppBloom;
  ctx.fillRect(-discR, -discR, discR * 2, discR * 2);
  ctx.restore();

  // D. Custom Artwork (Full disc print layer)
  const isFullDiscActive = Boolean(config.showFullDisc || config.artworkStyle === "full");
  if (isFullDiscActive && artworkImg) {
    ctx.save();
    ctx.globalCompositeOperation = config.artworkBlendMode || "source-over";
    ctx.globalAlpha = config.artworkOpacity ?? 1.0;
    ctx.rotate(config.rotationAngle);
    const artSize = discR * 2 * (config.artworkScale || 1.0);
    const imgW = artworkImg.naturalWidth || artworkImg.width || artSize;
    const imgH = artworkImg.naturalHeight || artworkImg.height || artSize;
    const minDim = Math.min(imgW, imgH);
    const sx = (imgW - minDim) / 2;
    const sy = (imgH - minDim) / 2;
    ctx.drawImage(
      artworkImg,
      sx,
      sy,
      minDim,
      minDim,
      -artSize / 2,
      -artSize / 2,
      artSize,
      artSize
    );

    // Subtle physical sheen over printed artwork
    const artSheen = ctx.createLinearGradient(-discR, -discR, discR, discR);
    artSheen.addColorStop(0, "rgba(255, 255, 255, 0.12)");
    artSheen.addColorStop(0.5, "transparent");
    artSheen.addColorStop(1, "rgba(255, 255, 255, 0.06)");
    ctx.fillStyle = artSheen;
    ctx.fillRect(-discR, -discR, discR * 2, discR * 2);
    ctx.restore();
  }

  // E. Diagonal Tape / Sticker Chord (Matching reference image "SWAP"!)
  if (config.showTape) {
    ctx.save();
    // Rotate with CD
    ctx.rotate(config.rotationAngle);

    const tapeRad = (config.tapeAngle * Math.PI) / 180;
    ctx.rotate(tapeRad);

    // Height of tape strip
    const tapeH = discR * Math.max(0.14, Math.min(0.32, (config.tapeWidth / 100) * 1.15));

    // Distance from center:
    // Hub outer radius is discR * 0.38
    // We enforce safe clearance so the chord NEVER overlaps or touches the center hub / spindle hole
    const minSafeDist = discR * 0.38 + tapeH / 2 + discR * 0.04;
    const requestedDist = discR * (config.chordDistance ?? 0.58);
    const chordDist = Math.max(minSafeDist, Math.min(discR * 0.76, requestedDist));

    // Clip chord ends to the circular outer disc boundary so it forms a clean geometric chord
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, discR * 0.94, 0, Math.PI * 2);
    ctx.clip();

    // Tape drop shadow on disc
    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    const tapeW = discR * 2.2;

    // Tape base
    ctx.fillStyle = config.tapeColor;
    ctx.fillRect(-tapeW / 2, chordDist - tapeH / 2, tapeW, tapeH);

    // Reset shadow
    ctx.shadowColor = "transparent";

    // Subtle paper tape edge fiber / border
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    ctx.lineWidth = 1;
    ctx.strokeRect(-tapeW / 2, chordDist - tapeH / 2, tapeW, tapeH);

    // Main Title Typography on Tape (like "SWAP" in the reference image)
    if (config.title) {
      ctx.save();
      // Clip strictly inside the tape with safety padding so NO text can EVER bleed outside the tape bounds
      ctx.beginPath();
      ctx.rect(-tapeW / 2 + 10, chordDist - tapeH / 2 + 3, tapeW - 20, tapeH - 6);
      ctx.clip();

      ctx.fillStyle = config.textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Scale font size proportionally to comfortably fit inside the tape height
      const maxFontSize = Math.round(tapeH * 0.58);
      const targetFontSize = Math.min(config.titleSize, maxFontSize);

      // Font selection
      let fontStr: string;
      if (config.fontFamily === "syne") {
        fontStr = `800 ${targetFontSize}px "Syne", "Helvetica Neue", sans-serif`;
      } else if (config.fontFamily === "sans") {
        fontStr = `900 ${targetFontSize}px "Inter", "Helvetica Neue", "Arial Black", sans-serif`;
      } else if (config.fontFamily === "mono") {
        fontStr = `700 ${Math.round(targetFontSize * 0.88)}px "Space Grotesk", "Space Mono", monospace`;
      } else if (config.fontFamily === "serif") {
        fontStr = `italic 700 ${Math.round(targetFontSize * 1.05)}px "Instrument Serif", Georgia, serif`;
      } else if (config.fontFamily === "alienation") {
        fontStr = `${targetFontSize}px "Alienation", system-ui, sans-serif`;
      } else {
        // "marker"
        fontStr = `700 ${targetFontSize}px "Caveat", cursive, sans-serif`;
      }

      ctx.font = fontStr;

      // Draw Title centered directly on the chord at chordDist
      ctx.fillText(config.title, 0, chordDist);
      ctx.restore();
    }

    ctx.restore(); // End chord disc clip
    ctx.restore(); // End tape rotation
  }


  // G. Perimeter Circular Rim Text ("SWAP LYRICS BY LUNI • SWAP LYRICS BY LUNI • ...")
  if (config.rimText) {
    ctx.save();
    ctx.rotate(config.rotationAngle);
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 3;
    const rimFontSize = Math.max(9, Math.round(discR * 0.038));
    ctx.font = `700 ${rimFontSize}px "Space Grotesk", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Repeat text to fill circular perimeter nicely
    let fullRimText = config.rimText.trim();
    if (!fullRimText.endsWith("•") && !fullRimText.endsWith(" ")) {
      fullRimText += " • ";
    }
    // Repeat 2 or 3 times depending on length
    if (fullRimText.length < 35) {
      fullRimText = fullRimText.repeat(3);
    } else if (fullRimText.length < 65) {
      fullRimText = fullRimText.repeat(2);
    }

    drawCurvedText(
      ctx,
      fullRimText,
      0,
      0,
      discR * 0.89,
      0,
      true
    );
    ctx.restore();
  }

  ctx.restore(); // End data ring clip

  // 4. Clear Transparent Hub & Clamping Ring (36% down to 14%)
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, discR * 0.36, 0, Math.PI * 2);
  ctx.arc(0, 0, discR * 0.14, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  // Clear plastic translucent fill
  const hubGrad = ctx.createRadialGradient(0, 0, discR * 0.14, 0, 0, discR * 0.36);
  hubGrad.addColorStop(0, "rgba(240, 245, 255, 0.35)");
  hubGrad.addColorStop(0.5, "rgba(200, 215, 235, 0.2)");
  hubGrad.addColorStop(0.85, "rgba(180, 195, 220, 0.45)");
  hubGrad.addColorStop(1, "rgba(255, 255, 255, 0.7)");
  ctx.fillStyle = hubGrad;
  ctx.fillRect(-discR * 0.4, -discR * 0.4, discR * 0.8, discR * 0.8);

  // Plastic mould seam rings
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, discR * 0.32, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
  ctx.beginPath();
  ctx.arc(0, 0, discR * 0.24, 0, Math.PI * 2);
  ctx.stroke();

  // Micro laser matrix text on the inner clear hub ring
  ctx.save();
  ctx.rotate(config.rotationAngle);
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  const hubFontSize = Math.max(7, Math.round(discR * 0.024));
  ctx.font = `600 ${hubFontSize}px monospace`;
  drawCurvedText(
    ctx,
    "COMPACT DISC DIGITAL AUDIO • IFPI 9840 • STEREO • ",
    0,
    0,
    discR * 0.28,
    0,
    true
  );
  ctx.restore();

  ctx.restore(); // End hub clip

  // 4b. Center Vinyl Label (Circular printed sticker layer over the hub)
  const isCenterLabelActive = Boolean(config.showCenterLabel || config.artworkStyle === "center");
  if (isCenterLabelActive && artworkImg) {
    ctx.save();
    ctx.rotate(config.rotationAngle);
    // Outer circle for the label sticker with cutout for the center spindle hole
    ctx.beginPath();
    ctx.arc(0, 0, discR * 0.44, 0, Math.PI * 2);
    ctx.arc(0, 0, discR * 0.14, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.globalCompositeOperation = config.artworkBlendMode || "source-over";
    ctx.globalAlpha = config.artworkOpacity ?? 1.0;

    const labelD = discR * 0.88 * (config.artworkScale || 1.0);
    const imgW = artworkImg.naturalWidth || artworkImg.width || labelD;
    const imgH = artworkImg.naturalHeight || artworkImg.height || labelD;
    const minDim = Math.min(imgW, imgH);
    const sx = (imgW - minDim) / 2;
    const sy = (imgH - minDim) / 2;
    ctx.drawImage(
      artworkImg,
      sx,
      sy,
      minDim,
      minDim,
      -labelD / 2,
      -labelD / 2,
      labelD,
      labelD
    );

    // Subtle paper edge ring
    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, discR * 0.44, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // 5. Center Spindle Hole (14% radius cutout)
  // Shows whatever is behind the disc: if in sleeve, shows the sleeve interior!
  ctx.save();
  if (config.sleeveMode !== "disc-only") {
    // Show the recessed purple sleeve interior inside the center hole
    const holeGrad = ctx.createRadialGradient(
      -discR * 0.03,
      -discR * 0.03,
      discR * 0.02,
      0,
      0,
      discR * 0.14
    );
    holeGrad.addColorStop(0, adjustColorBrightness(config.sleeveColor, -35));
    holeGrad.addColorStop(1, adjustColorBrightness(config.sleeveColor, -15));
    ctx.fillStyle = holeGrad;
    ctx.beginPath();
    ctx.arc(0, 0, discR * 0.14, 0, Math.PI * 2);
    ctx.fill();

    // Inner rim shadow inside hole
    ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  } else {
    // Transparent hole for disc-only
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(0, 0, discR * 0.14, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Spindle hole bevel edge highlight
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, discR * 0.14, 0, Math.PI * 2);
  ctx.stroke();

  // 6. Overall Polycarbonate Glass Gloss Sheen across upper hemisphere
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, discR * 0.96, 0, Math.PI * 2);
  ctx.clip();

  const glossGrad = ctx.createLinearGradient(0, -discR, 0, discR);
  glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.28)");
  glossGrad.addColorStop(0.45, "rgba(255, 255, 255, 0.04)");
  glossGrad.addColorStop(0.5, "transparent");
  glossGrad.addColorStop(1, "transparent");

  ctx.fillStyle = glossGrad;
  ctx.beginPath();
  ctx.ellipse(0, -discR * 0.2, discR * 0.95, discR * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // End CD translation

  // 7. Sleeve Front Pocket Flap with FROSTED GLASSMORPHISM
  // The upper layer of the envelope is frosted translucent glassmorphism
  // that blurs the underlying CD, its bright white flare, and tape!
  if (config.sleeveMode === "in-sleeve" || config.sleeveMode === "half-slide") {
    ctx.save();

    // First, copy the rendered scene (CD + background) into an offscreen canvas
    // so we can draw it back blurred into the flap clip area
    let blurCanvas: HTMLCanvasElement | null = null;
    if (typeof document !== "undefined") {
      blurCanvas = getCachedBlurCanvas(width, height);
      const bctx = blurCanvas.getContext("2d");
      if (bctx) {
        bctx.clearRect(0, 0, width, height);
        bctx.drawImage(ctx.canvas, 0, 0);
      }
    }

    // Clip to sleeve boundary
    ctx.beginPath();
    ctx.roundRect(sleeveX, sleeveY, sleeveSize, sleeveSize, sleeveRadius);
    ctx.clip();

    // The front pocket covers everything up to the curved die-cut slit
    const cutoutLipX = sleeveX + sleeveSize * 0.54;

    ctx.beginPath();
    ctx.moveTo(sleeveX - 20, sleeveY - 20);
    ctx.lineTo(cutoutLipX, sleeveY - 20);
    // Smooth die-cut curved lip dipping in towards left and back out
    ctx.bezierCurveTo(
      cutoutLipX - discR * 0.12,
      cy - discR * 0.45,
      cutoutLipX - discR * 0.12,
      cy + discR * 0.45,
      cutoutLipX,
      sleeveY + sleeveSize + 20
    );
    ctx.lineTo(sleeveX - 20, sleeveY + sleeveSize + 20);
    ctx.closePath();
    ctx.clip(); // Strictly inside the front flap!

    // A. Draw the BLURRED CD through the glass flap
    const glassBlur = config.glassBlur ?? 18;
    const glassOpacity = config.glassOpacity ?? 0.35;

    if (blurCanvas) {
      ctx.save();
      // Realistic frosted gaussian blur
      if (typeof ctx.filter !== "undefined") {
        ctx.filter = `blur(${glassBlur}px) brightness(1.15) saturate(1.25)`;
      }
      ctx.drawImage(blurCanvas, 0, 0);
      ctx.restore();
    }

    // B. Translucent Frosted Glass Color Tint (Transparent glass allows the underlying CD flare & tape to glow softly through)
    ctx.save();
    const rgbaTint = hexToRgbaString(config.sleeveColor, glassOpacity);
    const rgbaTintDark = hexToRgbaString(
      adjustColorBrightness(config.sleeveColor, -20),
      Math.min(0.85, glassOpacity + 0.08)
    );

    const glassColorGrad = ctx.createLinearGradient(
      sleeveX,
      sleeveY,
      cutoutLipX,
      sleeveY + sleeveSize
    );
    glassColorGrad.addColorStop(0, rgbaTint);
    glassColorGrad.addColorStop(1, rgbaTintDark);
    ctx.fillStyle = glassColorGrad;
    ctx.fillRect(sleeveX - 20, sleeveY - 20, sleeveSize + 40, sleeveSize + 40);

    // C. Glass Surface Sheen & Highlights
    const glassSheen = ctx.createLinearGradient(
      sleeveX,
      sleeveY,
      sleeveX + sleeveSize * 0.6,
      sleeveY + sleeveSize * 0.8
    );
    glassSheen.addColorStop(0, "rgba(255, 255, 255, 0.32)");
    glassSheen.addColorStop(0.25, "rgba(255, 255, 255, 0.10)");
    glassSheen.addColorStop(0.6, "rgba(255, 255, 255, 0.02)");
    glassSheen.addColorStop(1, "rgba(0, 0, 0, 0.12)");
    ctx.fillStyle = glassSheen;
    ctx.fillRect(sleeveX - 20, sleeveY - 20, sleeveSize + 40, sleeveSize + 40);
    ctx.restore();

    // D. Refractive Beveled Glass Lip Edge
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cutoutLipX, sleeveY);
    ctx.bezierCurveTo(
      cutoutLipX - discR * 0.12,
      cy - discR * 0.45,
      cutoutLipX - discR * 0.12,
      cy + discR * 0.45,
      cutoutLipX,
      sleeveY + sleeveSize
    );
    // Outer bright glass highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Soft inner refraction shadow on the disc
    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // E. Re-draw corner rivets on front flap
    if (config.showCornerRivets) {
      const rivetInset = sleeveSize * 0.11;
      const rivetR = sleeveSize * 0.038;
      const leftRivets = [
        { x: sleeveX + rivetInset, y: sleeveY + rivetInset },
        { x: sleeveX + rivetInset, y: sleeveY + sleeveSize - rivetInset },
      ];
      for (const pos of leftRivets) {
        ctx.save();
        const rivetGrad = ctx.createRadialGradient(
          pos.x - rivetR * 0.2,
          pos.y - rivetR * 0.2,
          rivetR * 0.1,
          pos.x,
          pos.y,
          rivetR
        );
        rivetGrad.addColorStop(0, "rgba(0, 0, 0, 0.35)");
        rivetGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.25)");
        rivetGrad.addColorStop(1, "rgba(255, 255, 255, 0.15)");
        ctx.fillStyle = rivetGrad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, rivetR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.restore();
  }
}

/**
 * Adjust hex color brightness
 */
function adjustColorBrightness(hex: string, percent: number): string {
  if (!hex || hex[0] !== "#") return hex;
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

/**
 * Converts hex color to rgba string with custom alpha
 */
function hexToRgbaString(hex: string, alpha: number): string {
  if (!hex || hex[0] !== "#") return `rgba(46, 18, 232, ${alpha})`;
  const clean = hex.replace("#", "");
  const num = parseInt(
    clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean,
    16
  );
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Cached offscreen canvas for zero-allocation high-performance blur rendering
 */
let cachedBlurCanvas: HTMLCanvasElement | null = null;
function getCachedBlurCanvas(width: number, height: number): HTMLCanvasElement {
  if (!cachedBlurCanvas) {
    cachedBlurCanvas = document.createElement("canvas");
  }
  if (cachedBlurCanvas.width !== width || cachedBlurCanvas.height !== height) {
    cachedBlurCanvas.width = width;
    cachedBlurCanvas.height = height;
  }
  return cachedBlurCanvas;
}
