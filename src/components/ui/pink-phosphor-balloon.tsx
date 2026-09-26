"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface PinkPhosphorBalloonProps {
  className?: string;
  size?: number | string;
  interactive?: boolean;
}

export function PinkPhosphorBalloon({
  className,
  size = 280,
  interactive = true,
}: PinkPhosphorBalloonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const textureLoader = new THREE.TextureLoader();
    const pinkMatcap = textureLoader.load("/pink-matcap.jpg");
    const maskMatcap = textureLoader.load("/mask-matcap.jpg");

    pinkMatcap.colorSpace = THREE.SRGBColorSpace;
    maskMatcap.colorSpace = THREE.SRGBColorSpace;

    const pinkMaterial = new THREE.MeshMatcapMaterial({ matcap: pinkMatcap });
    const maskMaterial = new THREE.MeshMatcapMaterial({ matcap: maskMatcap });

    let model: THREE.Group | null = null;
    let targetRotY = 0;
    let targetRotX = 0;

    const loader = new GLTFLoader();
    loader.load(
      "/balloon.glb",
      (gltf) => {
        model = gltf.scene;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (
              mesh.name.toLowerCase().includes("mask") ||
              child.parent?.name.toLowerCase().includes("mask")
            ) {
              mesh.material = maskMaterial;
            } else {
              mesh.material = pinkMaterial;
            }
          }
        });

        // Center model geometry
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const sizeVec = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
        const scale = 2.4 / (maxDim || 1);

        model.scale.set(scale, scale, scale);
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        scene.add(model);
        setLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading balloon model:", err);
      },
    );

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (model) {
        model.rotation.y += (targetRotY - model.rotation.y) * 0.05;
        model.rotation.x += (targetRotX - model.rotation.x) * 0.05;
        // Subtle organic float
        model.position.y = Math.sin(elapsed * 1.5) * 0.06;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 280;
      const h = container.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      resizeObserver.disconnect();
      renderer.dispose();
      pinkMatcap.dispose();
      maskMatcap.dispose();
      pinkMaterial.dispose();
      maskMaterial.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
      }}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default PinkPhosphorBalloon;
