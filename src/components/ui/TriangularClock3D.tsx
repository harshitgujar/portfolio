"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RotateCw, Camera, Layers, Play, Clock, Sparkles } from "lucide-react";

export type MetallicPreset =
  | "aluminum"
  | "titanium"
  | "gunmetal"
  | "gold"
  | "chrome"
  | "rose";

interface MaterialConfig {
  name: string;
  subtitle: string;
  color: number;
  metalness: number;
  roughness: number;
  bumpScale: number;
  clearcoat: number;
  clearcoatRoughness: number;
  swatch: string;
}

const MATERIAL_CONFIGS: Record<MetallicPreset, MaterialConfig> = {
  aluminum: {
    name: "Brushed Aluminum",
    subtitle: "Reference Photo Spec",
    color: 0xdbe0e6,
    metalness: 0.94,
    roughness: 0.36,
    bumpScale: 0.010,
    clearcoat: 0.08,
    clearcoatRoughness: 0.35,
    swatch: "#dbe0e6",
  },
  titanium: {
    name: "Brushed Titanium",
    subtitle: "Space Grey",
    color: 0x767d86,
    metalness: 0.96,
    roughness: 0.32,
    bumpScale: 0.018,
    clearcoat: 0.12,
    clearcoatRoughness: 0.28,
    swatch: "#767d86",
  },
  gunmetal: {
    name: "Matte Gunmetal",
    subtitle: "Stealth Black",
    color: 0x272a2e,
    metalness: 0.92,
    roughness: 0.38,
    bumpScale: 0.012,
    clearcoat: 0.08,
    clearcoatRoughness: 0.35,
    swatch: "#272a2e",
  },
  gold: {
    name: "Champagne Brass",
    subtitle: "Brushed Gold",
    color: 0xe6cb93,
    metalness: 0.97,
    roughness: 0.26,
    bumpScale: 0.015,
    clearcoat: 0.22,
    clearcoatRoughness: 0.18,
    swatch: "#e6cb93",
  },
  chrome: {
    name: "Polished Chrome",
    subtitle: "Mirror Finish",
    color: 0xf5f8fb,
    metalness: 1.0,
    roughness: 0.07,
    bumpScale: 0.002,
    clearcoat: 0.35,
    clearcoatRoughness: 0.04,
    swatch: "#f5f8fb",
  },
  rose: {
    name: "Brushed Copper",
    subtitle: "Warm Anodized",
    color: 0xd8927b,
    metalness: 0.97,
    roughness: 0.29,
    bumpScale: 0.016,
    clearcoat: 0.16,
    clearcoatRoughness: 0.24,
    swatch: "#d8927b",
  },
};

// Procedural Brushed Metal Canvas Textures
function createBrushedMetalTextures() {
  const size = 1024;

  // Diffuse
  const cD = document.createElement("canvas");
  cD.width = size;
  cD.height = size;
  const ctxD = cD.getContext("2d")!;
  const grad = ctxD.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "#e5e9ee");
  grad.addColorStop(0.5, "#dbe0e6");
  grad.addColorStop(1, "#e8ecf1");
  ctxD.fillStyle = grad;
  ctxD.fillRect(0, 0, size, size);

  for (let i = 0; i < 5000; i++) {
    const y = Math.random() * size;
    const len = 50 + Math.random() * 450;
    const x = Math.random() * size;
    const delta = (Math.random() - 0.5) * 45;
    const r = Math.min(255, Math.max(0, 222 + delta));
    const g = Math.min(255, Math.max(0, 226 + delta));
    const b = Math.min(255, Math.max(0, 232 + delta));
    const alpha = 0.05 + Math.random() * 0.16;

    ctxD.strokeStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`;
    ctxD.lineWidth = 0.6 + Math.random() * 1.4;
    ctxD.beginPath();
    ctxD.moveTo(x, y);
    ctxD.lineTo(x + len, y);
    ctxD.stroke();
    if (x + len > size) {
      ctxD.beginPath();
      ctxD.moveTo(0, y);
      ctxD.lineTo(x + len - size, y);
      ctxD.stroke();
    }
  }

  // Bump
  const cB = document.createElement("canvas");
  cB.width = size;
  cB.height = size;
  const ctxB = cB.getContext("2d")!;
  ctxB.fillStyle = "#808080";
  ctxB.fillRect(0, 0, size, size);

  for (let i = 0; i < 3500; i++) {
    const y = Math.random() * size;
    const len = 40 + Math.random() * 350;
    const x = Math.random() * size;
    const val = 128 + (Math.random() - 0.5) * 80;
    ctxB.strokeStyle = `rgba(${val | 0},${val | 0},${val | 0},0.35)`;
    ctxB.lineWidth = 0.8 + Math.random() * 1.5;
    ctxB.beginPath();
    ctxB.moveTo(x, y);
    ctxB.lineTo(x + len, y);
    ctxB.stroke();
  }

  // Roughness
  const cR = document.createElement("canvas");
  cR.width = size;
  cR.height = size;
  const ctxR = cR.getContext("2d")!;
  ctxR.fillStyle = "#4c4c4c";
  ctxR.fillRect(0, 0, size, size);

  for (let i = 0; i < 2500; i++) {
    const y = Math.random() * size;
    const len = 70 + Math.random() * 400;
    const x = Math.random() * size;
    const val = 76 + (Math.random() - 0.5) * 45;
    ctxR.strokeStyle = `rgba(${val | 0},${val | 0},${val | 0},0.28)`;
    ctxR.lineWidth = 1.2;
    ctxR.beginPath();
    ctxR.moveTo(x, y);
    ctxR.lineTo(x + len, y);
    ctxR.stroke();
  }

  const diffuseTex = new THREE.CanvasTexture(cD);
  diffuseTex.wrapS = THREE.RepeatWrapping;
  diffuseTex.wrapT = THREE.RepeatWrapping;
  diffuseTex.repeat.set(1.5, 1.5);

  const bumpTex = new THREE.CanvasTexture(cB);
  bumpTex.wrapS = THREE.RepeatWrapping;
  bumpTex.wrapT = THREE.RepeatWrapping;
  bumpTex.repeat.set(1.5, 1.5);

  const roughTex = new THREE.CanvasTexture(cR);
  roughTex.wrapS = THREE.RepeatWrapping;
  roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(1.5, 1.5);

  return { diffuseTex, bumpTex, roughTex };
}

// Dial Texture (matte stipple)
function createDialTexture() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#141414";
  ctx.fillRect(0, 0, size, size);

  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 16;
    const v = Math.min(255, Math.max(0, 20 + n));
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

interface TriangularClock3DProps {
  className?: string;
  defaultMaterial?: MetallicPreset;
  defaultMode?: "live" | "photo";
  defaultView?: "front" | "perspective" | "bevel" | "side" | "back";
}

export function TriangularClock3D({
  className = "",
  defaultMaterial = "aluminum",
  defaultMode = "photo",
  defaultView = "front",
}: TriangularClock3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // UI state
  const [selectedMaterial, setSelectedMaterial] =
    useState<MetallicPreset>(defaultMaterial);
  const [timeMode, setTimeMode] = useState<"live" | "photo">(defaultMode);
  const [smoothSweep, setSmoothSweep] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [activeView, setActiveView] = useState<string>(defaultView);
  const [explodedAmount, setExplodedAmount] = useState(0);
  const [wallVisible, setWallVisible] = useState(true);

  // Engine references
  const clockControllerRef = useRef<{
    setMaterial: (preset: MetallicPreset) => void;
    setMode: (mode: "live" | "photo") => void;
    setSmoothSweep: (val: boolean) => void;
    setAutoRotate: (val: boolean) => void;
    setCameraView: (view: string) => void;
    setExploded: (amt: number) => void;
    setWallVisible: (val: boolean) => void;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    if (defaultView === "perspective") {
      camera.position.set(3.2, 1.8, 7.2);
    } else if (defaultView === "bevel") {
      camera.position.set(0, 4.2, 4.6);
    } else if (defaultView === "side") {
      camera.position.set(7.5, 0, 0.6);
    } else if (defaultView === "back") {
      camera.position.set(0, 0, -8.4);
    } else {
      camera.position.set(0, 0, 8.4);
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // Environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envMap;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.0;
    controls.maxDistance = 14;
    controls.target.set(0, 0, 0);

    // Studio Lighting (soft balanced studio softbox lighting matching reference photo)
    const keyLight = new THREE.DirectionalLight(0xfffbf5, 1.4);
    keyLight.position.set(-1.0, 3.8, 6.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 18;
    keyLight.shadow.camera.left = -4.5;
    keyLight.shadow.camera.right = 4.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.0002;
    keyLight.shadow.radius = 4.5;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf0f5fc, 0.95);
    fillLight.position.set(2.5, 0.5, 4.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, 4.2, -1.0);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Background Wall / Shadow receiver
    const wallGeo = new THREE.PlaneGeometry(32, 32);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf4f5f7,
      roughness: 0.96,
      metalness: 0.02,
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 0, -0.68);
    wallMesh.receiveShadow = true;
    scene.add(wallMesh);

    // Procedural textures
    const brushedTex = createBrushedMetalTextures();
    const dialTex = createDialTexture();

    // Clock Root Group
    const clockRoot = new THREE.Group();
    scene.add(clockRoot);

    // Equilateral Triangle Dimensions
    const S = 4.4;
    const H = (S * Math.sqrt(3)) / 2; // ~3.8105
    const R_circ = (2 * H) / 3; // ~2.5403 (apex)
    const R_in = H / 3; // ~1.2702 (bottom edge)

    // Ultra-slender metallic frame matching the original reference photo:
    // Frame border width is ~5% of total triangle height, leaving ~85% of the area for the spacious black dial
    const frameWidth = 0.19;
    const R_in_inner = R_in - frameWidth; // ~1.0802
    const scaleInner = R_in_inner / R_in; // ~0.8504
    const S_inner = S * scaleInner; // ~3.742
    const H_inner = H * scaleInner; // ~3.240

    // 1. Outside Metallic Frame
    const frameShape = new THREE.Shape();
    frameShape.moveTo(0, R_circ);
    frameShape.lineTo(-S / 2, -R_in);
    frameShape.lineTo(S / 2, -R_in);
    frameShape.closePath();

    const holePath = new THREE.Path();
    holePath.moveTo(0, (2 * H_inner) / 3);
    holePath.lineTo(S_inner / 2, -H_inner / 3);
    holePath.lineTo(-S_inner / 2, -H_inner / 3);
    holePath.closePath();
    frameShape.holes.push(holePath);

    const frameGeo = new THREE.ExtrudeGeometry(frameShape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.014,
      bevelOffset: -0.003,
      bevelSegments: 4,
    });
    frameGeo.translate(0, 0, -0.14);

    const initialMatConfig = MATERIAL_CONFIGS[defaultMaterial];
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: initialMatConfig.color,
      metalness: initialMatConfig.metalness,
      roughness: initialMatConfig.roughness,
      map: brushedTex.diffuseTex,
      bumpMap: brushedTex.bumpTex,
      bumpScale: initialMatConfig.bumpScale,
      roughnessMap: brushedTex.roughTex,
      clearcoat: initialMatConfig.clearcoat,
      clearcoatRoughness: initialMatConfig.clearcoatRoughness,
      envMapIntensity: 1.4,
    });

    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.castShadow = true;
    frameMesh.receiveShadow = true;
    clockRoot.add(frameMesh);

    // 2. Recessed Black Dial
    const dialShape = new THREE.Shape();
    dialShape.moveTo(0, (2 * H_inner) / 3);
    dialShape.lineTo(-S_inner / 2, -H_inner / 3);
    dialShape.lineTo(S_inner / 2, -H_inner / 3);
    dialShape.closePath();

    const dialGeo = new THREE.ExtrudeGeometry(dialShape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
    });
    dialGeo.translate(0, 0, -0.055);

    const dialMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      map: dialTex,
      roughness: 0.88,
      metalness: 0.05,
    });
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.receiveShadow = true;
    clockRoot.add(dialMesh);

    // 3. Apex Red Triangle Marker
    const apexY = (2 * H_inner) / 3;
    const markerH = 0.30;
    const markerW = markerH / (Math.sqrt(3) / 2);

    const redTriShape = new THREE.Shape();
    redTriShape.moveTo(0, apexY - 0.01);
    redTriShape.lineTo(-markerW / 2, apexY - 0.01 - markerH);
    redTriShape.lineTo(markerW / 2, apexY - 0.01 - markerH);
    redTriShape.closePath();

    const redTriGeo = new THREE.ExtrudeGeometry(redTriShape, {
      depth: 0.016,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2,
    });
    redTriGeo.translate(0, 0, -0.026);

    const redTriMat = new THREE.MeshStandardMaterial({
      color: 0xbb161c,
      emissive: 0x220204,
      roughness: 0.65,
      metalness: 0.05,
    });
    const redTriMesh = new THREE.Mesh(redTriGeo, redTriMat);
    redTriMesh.castShadow = true;
    redTriMesh.receiveShadow = true;
    clockRoot.add(redTriMesh);

    // 4. Bottom 6 O'Clock White Marker
    const bottomMarkerY = -H_inner / 3 + 0.32;
    const bottomDotGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.022, 32);
    bottomDotGeo.rotateX(Math.PI / 2);
    bottomDotGeo.translate(0, bottomMarkerY, -0.022);

    const whiteMarkerMat = new THREE.MeshStandardMaterial({
      color: 0xfcfcfc,
      roughness: 0.32,
      metalness: 0.05,
    });
    const bottomDotMesh = new THREE.Mesh(bottomDotGeo, whiteMarkerMat);
    bottomDotMesh.castShadow = true;
    bottomDotMesh.receiveShadow = true;
    clockRoot.add(bottomDotMesh);

    // 5. Clock Hands
    const handsGroup = new THREE.Group();
    handsGroup.position.set(0, 0, -0.04);
    clockRoot.add(handsGroup);

    const handMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.28,
      metalness: 0.06,
    });

    // Hour Hand
    const hourGroup = new THREE.Group();
    hourGroup.position.z = 0.022;
    handsGroup.add(hourGroup);

    const hw = 0.058;
    const hLen = 0.76;
    const hTail = 0.26;

    const hourHandShape = new THREE.Shape();
    hourHandShape.moveTo(-hw, -hTail + 0.04);
    hourHandShape.quadraticCurveTo(-hw, -hTail, 0, -hTail);
    hourHandShape.quadraticCurveTo(hw, -hTail, hw, -hTail + 0.04);
    hourHandShape.lineTo(hw, hLen - 0.03);
    hourHandShape.quadraticCurveTo(hw, hLen, 0, hLen);
    hourHandShape.quadraticCurveTo(-hw, hLen, -hw, hLen - 0.03);
    hourHandShape.closePath();

    // Hole near tip
    const holeY = hLen - 0.18;
    const holeRadius = 0.028;
    const hourHole = new THREE.Path();
    hourHole.absarc(0, holeY, holeRadius, 0, Math.PI * 2, true);
    hourHandShape.holes.push(hourHole);

    const hourGeo = new THREE.ExtrudeGeometry(hourHandShape, {
      depth: 0.022,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
    });
    const hourMesh = new THREE.Mesh(hourGeo, handMat);
    hourMesh.castShadow = true;
    hourMesh.receiveShadow = true;
    hourGroup.add(hourMesh);

    // Side post with spherical bead
    const postMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.065, 16),
      handMat
    );
    postMesh.rotateZ(Math.PI / 2);
    postMesh.position.set(-hw - 0.03, -0.095, 0.011);
    postMesh.castShadow = true;
    hourGroup.add(postMesh);

    const beadMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.026, 16, 16),
      handMat
    );
    beadMesh.position.set(-hw - 0.065, -0.095, 0.011);
    beadMesh.castShadow = true;
    hourGroup.add(beadMesh);

    // Minute Hand
    const minuteGroup = new THREE.Group();
    minuteGroup.position.z = 0.052;
    handsGroup.add(minuteGroup);

    const mw = 0.046;
    const mLen = 1.18;
    const mTail = 0.28;

    const minuteHandShape = new THREE.Shape();
    minuteHandShape.moveTo(-mw, -mTail + 0.04);
    minuteHandShape.quadraticCurveTo(-mw, -mTail, 0, -mTail);
    minuteHandShape.quadraticCurveTo(mw, -mTail, mw, -mTail + 0.04);
    minuteHandShape.lineTo(mw, mLen - 0.09);
    minuteHandShape.lineTo(-mw, mLen); // 45 deg chisel tip
    minuteHandShape.closePath();

    const minuteGeo = new THREE.ExtrudeGeometry(minuteHandShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
    });
    const minuteMesh = new THREE.Mesh(minuteGeo, handMat);
    minuteMesh.castShadow = true;
    minuteMesh.receiveShadow = true;
    minuteGroup.add(minuteMesh);

    // Second Hand
    const secondGroup = new THREE.Group();
    secondGroup.position.z = 0.082;
    handsGroup.add(secondGroup);

    const sLen = 1.42;
    const sTail = 0.36;
    const secondHandShape = new THREE.Shape();
    secondHandShape.moveTo(-0.012, -sTail);
    secondHandShape.lineTo(0.012, -sTail);
    secondHandShape.lineTo(0.014, 0.02);
    secondHandShape.lineTo(0.006, sLen);
    secondHandShape.lineTo(-0.006, sLen);
    secondHandShape.lineTo(-0.014, 0.02);
    secondHandShape.closePath();

    const secondGeo = new THREE.ExtrudeGeometry(secondHandShape, {
      depth: 0.012,
      bevelEnabled: false,
    });
    const secondMesh = new THREE.Mesh(secondGeo, handMat);
    secondMesh.castShadow = true;
    secondGroup.add(secondMesh);

    // Center Hub
    const hubGroup = new THREE.Group();
    hubGroup.position.z = 0.098;
    handsGroup.add(hubGroup);

    const hubGeo = new THREE.CylinderGeometry(0.105, 0.11, 0.038, 36);
    hubGeo.rotateX(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeo, handMat);
    hubMesh.castShadow = true;
    hubGroup.add(hubMesh);

    const centerPinGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.046, 24);
    centerPinGeo.rotateX(Math.PI / 2);
    const centerPinMat = new THREE.MeshStandardMaterial({
      color: 0x999999,
      metalness: 0.95,
      roughness: 0.18,
    });
    const pinMesh = new THREE.Mesh(centerPinGeo, centerPinMat);
    pinMesh.position.z = 0.012;
    hubGroup.add(pinMesh);

    // 6. Back Mount Group
    const backGroup = new THREE.Group();
    backGroup.position.z = -0.16;
    clockRoot.add(backGroup);

    const backPlateGeo = new THREE.ShapeGeometry(frameShape);
    const backPlateMat = new THREE.MeshStandardMaterial({
      color: 0x222428,
      metalness: 0.75,
      roughness: 0.55,
    });
    backGroup.add(new THREE.Mesh(backPlateGeo, backPlateMat));

    const movementBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.7, 0.18),
      new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.85,
        metalness: 0.1,
      })
    );
    movementBox.position.set(0, 0, -0.09);
    movementBox.castShadow = true;
    backGroup.add(movementBox);

    // State Variables
    let currentMode: "live" | "photo" = defaultMode;
    let isSmoothSweep = true;
    let isAutoRotating = false;
    let explodedFactor = 0;

    function setClockHands(
      hours: number,
      minutes: number,
      seconds: number,
      millis = 0
    ) {
      const secFraction = isSmoothSweep ? seconds + millis / 1000 : seconds;
      const minFraction = minutes + secFraction / 60;
      const hourFraction = (hours % 12) + minFraction / 60;

      secondGroup.rotation.z = -(secFraction / 60) * Math.PI * 2;
      minuteGroup.rotation.z = -(minFraction / 60) * Math.PI * 2;
      hourGroup.rotation.z = -(hourFraction / 12) * Math.PI * 2;
    }

    function setPhotoReferencePose() {
      hourGroup.rotation.z = 1.15; // ~9:40
      minuteGroup.rotation.z = -0.98; // ~1:48
      secondGroup.rotation.z = -2.35; // ~4:26
    }

    // Animation loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isAutoRotating) {
        clockRoot.rotation.y += delta * 0.4;
      }

      if (currentMode === "live") {
        const d = new Date();
        setClockHands(
          d.getHours(),
          d.getMinutes(),
          d.getSeconds(),
          d.getMilliseconds()
        );
      } else {
        setPhotoReferencePose();
      }

      // Exploded View
      if (explodedFactor > 0) {
        handsGroup.position.z = -0.04 + explodedFactor * 0.9;
        dialMesh.position.z = -0.055 + explodedFactor * 0.3;
        redTriMesh.position.z = -0.026 + explodedFactor * 0.32;
        bottomDotMesh.position.z = -0.022 + explodedFactor * 0.32;
        frameMesh.position.z = explodedFactor * 0.1;
        backGroup.position.z = -0.16 - explodedFactor * 0.95;
      } else {
        handsGroup.position.z = -0.04;
        dialMesh.position.z = -0.055;
        redTriMesh.position.z = -0.026;
        bottomDotMesh.position.z = -0.022;
        frameMesh.position.z = 0;
        backGroup.position.z = -0.16;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Controller
    clockControllerRef.current = {
      setMaterial: (preset: MetallicPreset) => {
        const cfg = MATERIAL_CONFIGS[preset];
        if (!cfg) return;
        frameMat.color.setHex(cfg.color);
        frameMat.metalness = cfg.metalness;
        frameMat.roughness = cfg.roughness;
        frameMat.bumpScale = cfg.bumpScale;
        frameMat.clearcoat = cfg.clearcoat;
        frameMat.clearcoatRoughness = cfg.clearcoatRoughness;
        frameMat.needsUpdate = true;
      },
      setMode: (mode: "live" | "photo") => {
        currentMode = mode;
      },
      setSmoothSweep: (val: boolean) => {
        isSmoothSweep = val;
      },
      setAutoRotate: (val: boolean) => {
        isAutoRotating = val;
      },
      setCameraView: (view: string) => {
        controls.reset();
        clockRoot.rotation.set(0, 0, 0);
        if (view === "front") {
          camera.position.set(0, 0, 8.4);
        } else if (view === "perspective") {
          camera.position.set(3.2, 1.8, 7.2);
        } else if (view === "bevel") {
          camera.position.set(0, 4.2, 4.6);
        } else if (view === "side") {
          camera.position.set(7.5, 0, 0.6);
        } else if (view === "back") {
          camera.position.set(0, 0, -8.4);
        }
        controls.target.set(0, 0, 0);
      },
      setExploded: (amt: number) => {
        explodedFactor = amt;
      },
      setWallVisible: (val: boolean) => {
        wallMesh.visible = val;
      },
    };

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      pmremGenerator.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [defaultMaterial, defaultMode]);

  // Synchronize component state with controller
  const handleMaterialChange = (preset: MetallicPreset) => {
    setSelectedMaterial(preset);
    clockControllerRef.current?.setMaterial(preset);
  };

  const handleTimeModeChange = (mode: "live" | "photo") => {
    setTimeMode(mode);
    clockControllerRef.current?.setMode(mode);
  };

  const handleSweepToggle = () => {
    const next = !smoothSweep;
    setSmoothSweep(next);
    clockControllerRef.current?.setSmoothSweep(next);
  };

  const handleAutoRotateToggle = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    clockControllerRef.current?.setAutoRotate(next);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    clockControllerRef.current?.setCameraView(view);
  };

  const handleExplodedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExplodedAmount(val);
    clockControllerRef.current?.setExploded(val / 100);
  };

  const handleWallToggle = () => {
    const next = !wallVisible;
    setWallVisible(next);
    clockControllerRef.current?.setWallVisible(next);
  };

  return (
    <div
      className={`relative w-full h-full min-h-[580px] overflow-hidden select-none bg-[#0c0d12] text-white ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Header (positioned below global site header) */}
      <div className="absolute top-20 inset-x-6 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto backdrop-blur-xl bg-black/60 border border-white/10 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute opacity-75" />
            <span className="w-2 h-2 rounded-full bg-red-500 relative" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wide flex items-center gap-2">
              <span>Triangular Precision Clock</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-normal">
                Metallic Frame
              </span>
            </div>
            <div className="text-[11px] text-neutral-400">
              WebGL 3D Model &bull; Drag to rotate &bull; Scroll to zoom
            </div>
          </div>
        </div>

        {/* View Presets */}
        <div className="pointer-events-auto backdrop-blur-xl bg-black/60 border border-white/10 p-1 rounded-2xl shadow-xl flex items-center gap-1 text-xs">
          {[
            { id: "front", label: "Front" },
            { id: "perspective", label: "3D Angle" },
            { id: "bevel", label: "Top Bevel" },
            { id: "side", label: "Side" },
            { id: "back", label: "Back Mount" },
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => handleViewChange(v.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeView === v.id
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-300 hover:bg-white/10"
              }`}
            >
              {v.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleAutoRotateToggle}
            className={`px-2.5 py-1.5 rounded-xl border-l border-white/10 ml-1 flex items-center gap-1.5 transition-all ${
              autoRotate
                ? "bg-emerald-500/20 text-emerald-300 font-medium"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <RotateCw
              className={`w-3 h-3 ${autoRotate ? "animate-spin" : ""}`}
            />
            <span>Spin</span>
          </button>
        </div>
      </div>

      {/* Floating Controls Sidebar */}
      <div className="absolute left-6 top-36 bottom-6 z-20 w-72 flex flex-col gap-3 pointer-events-none overflow-y-auto pr-1">
        {/* Frame Material Card */}
        <div className="pointer-events-auto backdrop-blur-xl bg-black/70 border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Metallic Frame Finish
            </span>
            <span className="text-xs font-medium text-amber-400">
              {MATERIAL_CONFIGS[selectedMaterial].name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(
              Object.keys(MATERIAL_CONFIGS) as MetallicPreset[]
            ).map((matKey) => {
              const cfg = MATERIAL_CONFIGS[matKey];
              const isSelected = selectedMaterial === matKey;
              return (
                <button
                  key={matKey}
                  type="button"
                  onClick={() => handleMaterialChange(matKey)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-white/30"
                    style={{ backgroundColor: cfg.swatch }}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-medium truncate">
                      {cfg.name.replace("Brushed ", "")}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {cfg.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Mode Card */}
        <div className="pointer-events-auto backdrop-blur-xl bg-black/70 border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Clock Time & Hands
          </span>

          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleTimeModeChange("photo")}
              className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
                timeMode === "photo"
                  ? "bg-white text-black shadow-sm font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Photo Pose
            </button>
            <button
              type="button"
              onClick={() => handleTimeModeChange("live")}
              className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
                timeMode === "live"
                  ? "bg-white text-black shadow-sm font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Live Local Time
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
            <span>Second Hand Motion</span>
            <button
              type="button"
              onClick={handleSweepToggle}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-xs"
            >
              {smoothSweep ? "Smooth Sweep" : "Quartz Tick"}
            </button>
          </div>
        </div>

        {/* Exploded 3D Assembly Card */}
        <div className="pointer-events-auto backdrop-blur-xl bg-black/70 border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded 3D View</span>
            </span>
            <span className="text-xs font-mono text-neutral-300">
              {explodedAmount}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={explodedAmount}
            onChange={handleExplodedChange}
            className="w-full h-1.5 bg-white/20 rounded-lg cursor-pointer accent-amber-400"
          />
          <p className="text-[10px] text-neutral-400 leading-tight">
            Separates the metallic outer frame, recessed black dial, apex marker,
            clock hands, and rear quartz movement in 3D space.
          </p>
        </div>

        {/* Wall Mount Toggle */}
        <div className="pointer-events-auto backdrop-blur-xl bg-black/70 border border-white/10 px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between">
          <span className="text-xs text-neutral-300">Wall Drop Shadow</span>
          <button
            type="button"
            onClick={handleWallToggle}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
              wallVisible
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-white/10 text-neutral-400 border-white/10"
            }`}
          >
            {wallVisible ? "Visible" : "Hidden"}
          </button>
        </div>
      </div>

      {/* Subtle Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none backdrop-blur-xl bg-black/50 border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs text-neutral-400 shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>Click & drag to orbit &bull; Right-click to pan &bull; Scroll to zoom</span>
      </div>
    </div>
  );
}
