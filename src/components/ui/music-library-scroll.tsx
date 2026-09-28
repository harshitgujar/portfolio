"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion } from "motion/react";
import { MUSIC_LIBRARY_ITEMS, MusicTrack } from "@/data/music-library";

interface MusicLibraryScrollProps {
  className?: string;
  onTrackChange?: (track: MusicTrack, index: number) => void;
}

const COPIES = 9;
const MIDDLE_COPY = 4; // 0, 1, 2, 3, [4], 5, 6, 7, 8

export function MusicLibraryScroll({
  className = "",
  onTrackChange,
}: MusicLibraryScrollProps) {
  const tracks = useMemo(() => MUSIC_LIBRARY_ITEMS, []);
  const N = tracks.length;

  // Infinite repeated items (9 continuous blocks)
  const repeatedTracks = useMemo(() => {
    const list: (MusicTrack & { uniqueKey: string; originalIndex: number })[] = [];
    for (let c = 0; c < COPIES; c++) {
      tracks.forEach((t, i) => {
        list.push({
          ...t,
          uniqueKey: `${t.id}-copy-${c}`,
          originalIndex: i,
        });
      });
    }
    return list;
  }, [tracks]);

  // Start in the middle copy (seamless room to scroll infinitely up and down)
  const [activeIndex, setActiveIndex] = useState(MIDDLE_COPY * N);
  const activeIndexRef = useRef(MIDDLE_COPY * N);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const hasInitializedScroll = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollAccumulator = useRef(0);

  const activeTrack = tracks[((activeIndex % N) + N) % N] || tracks[0];

  // Helper to measure exact pixel height of one full set of tracks
  const getSingleSetHeight = useCallback(() => {
    const elA = itemRefs.current[MIDDLE_COPY * N];
    const elB = itemRefs.current[(MIDDLE_COPY - 1) * N];
    if (elA && elB) {
      return elA.offsetTop - elB.offsetTop;
    }
    return 0;
  }, [N]);

  // Initialize native Web Audio context
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  // Listen for initial user gestures to wake browser audio engine
  useEffect(() => {
    const handleGesture = () => {
      initAudio();
    };
    window.addEventListener("pointerdown", handleGesture, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("wheel", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("wheel", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, [initAudio]);

  // Satisfying mechanical "tik" scroll sound (enabled by default)
  const playTikSound = useCallback(() => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.02);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.022);
    } catch {
      // AudioContext policy fallback
    }
  }, [initAudio]);

  // Infinite track selector with seamless instant boundary normalization
  const selectTrack = useCallback(
    (index: number) => {
      let target = index;
      const listEl = listRef.current;
      const singleSetHeight = getSingleSetHeight();

      // Instant seamless normalization when approaching outer buffer copies
      if (listEl && singleSetHeight > 0) {
        if (target >= 6 * N) {
          const shiftSets = 2;
          listEl.style.scrollBehavior = "auto";
          listEl.scrollTop -= shiftSets * singleSetHeight;
          target -= shiftSets * N;
        } else if (target < 2 * N) {
          const shiftSets = 2;
          listEl.style.scrollBehavior = "auto";
          listEl.scrollTop += shiftSets * singleSetHeight;
          target += shiftSets * N;
        }
      }

      activeIndexRef.current = target;
      setActiveIndex(target);
      playTikSound();

      const origTrack = tracks[((target % N) + N) % N];
      onTrackChange?.(origTrack, ((target % N) + N) % N);
    },
    [tracks, N, getSingleSetHeight, playTikSound, onTrackChange]
  );

  // Wheel handling with smooth infinite threshold
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      initAudio();
      const now = Date.now();
      scrollAccumulator.current += e.deltaY;

      // Responsive throttle for wheel clicks
      if (now - lastScrollTime.current > 60) {
        if (scrollAccumulator.current > 30) {
          selectTrack(activeIndexRef.current + 1);
          scrollAccumulator.current = 0;
          lastScrollTime.current = now;
        } else if (scrollAccumulator.current < -30) {
          selectTrack(activeIndexRef.current - 1);
          scrollAccumulator.current = 0;
          lastScrollTime.current = now;
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [selectTrack, initAudio]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      initAudio();
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        selectTrack(activeIndexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        selectTrack(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectTrack, initAudio]);

  // Smooth scroll centering on active index change
  useEffect(() => {
    const activeEl = itemRefs.current[activeIndex];
    const listEl = listRef.current;
    if (!activeEl || !listEl) return;

    const listRect = listEl.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    const offset =
      itemRect.top -
      listRect.top -
      listRect.height / 2 +
      itemRect.height / 2;

    if (!hasInitializedScroll.current) {
      listEl.scrollTop += offset;
      hasInitializedScroll.current = true;
    } else {
      listEl.scrollBy({
        top: offset,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Keep centered on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeEl = itemRefs.current[activeIndexRef.current];
      const listEl = listRef.current;
      if (!activeEl || !listEl) return;
      const listRect = listEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const offset =
        itemRect.top -
        listRect.top -
        listRect.height / 2 +
        itemRect.height / 2;
      listEl.scrollTop += offset;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch & Pointer drag handlers for mobile and mouse scrub
  const handlePointerDown = (e: React.PointerEvent) => {
    initAudio();
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    const threshold = 45;

    if (Math.abs(deltaY) > threshold) {
      if (deltaY < 0) {
        selectTrack(activeIndexRef.current + 1);
      } else {
        selectTrack(activeIndexRef.current - 1);
      }
      startYRef.current = e.clientY;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative h-screen w-full overflow-hidden select-none transition-none ${className}`}
      style={{
        backgroundColor: activeTrack.bgColor,
        color: activeTrack.textColor,
      }}
    >
      {/* Background Soft Lighting Gradients */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 70%),
                       radial-gradient(ellipse 60% 60% at 85% 80%, rgba(0,0,0,0.3) 0%, transparent 80%)`,
        }}
      />

      {/* Main Infinite Kinetic Scroll List Area */}
      <div
        ref={listRef}
        className="h-full w-full overflow-y-auto no-scrollbar flex flex-col justify-start pt-[35vh] pb-[45vh] px-6 sm:px-14 md:px-20 lg:px-28 z-10 relative"
      >
        <div className="flex flex-col gap-5 sm:gap-7 md:gap-8 max-w-4xl">
          {repeatedTracks.map((track, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={track.uniqueKey}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onClick={() => {
                  initAudio();
                  selectTrack(idx);
                }}
                className={`group relative text-left flex items-center gap-3.5 sm:gap-4 md:gap-5 transition-opacity duration-200 outline-none ${
                  isActive
                    ? "opacity-100 cursor-default"
                    : "opacity-35 hover:opacity-65 cursor-pointer"
                }`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Select ${track.title} by ${track.artist}`}
              >
                {/* Track Title - Normal font weight matching media_1790592549456.png */}
                <span
                  className="font-sans font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-black select-none whitespace-nowrap"
                  style={{
                    letterSpacing: "-0.035em",
                  }}
                >
                  {track.title}
                </span>

                {/* Genre Tag Pill - Exactly matching media_1790592549456.png */}
                <span
                  className={`inline-flex items-center text-xs sm:text-sm font-normal text-black transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/10"
                      : "px-0 py-0 bg-transparent text-black/60 group-hover:text-black/80"
                  }`}
                >
                  {track.genre}
                </span>

                {/* Date Tag - Exactly matching media_1790592549456.png */}
                <span className="font-sans text-xs sm:text-sm text-black font-normal whitespace-nowrap">
                  [{track.date}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom-Right Album Artwork Card - Instant change, zero stroke, pure artwork */}
      <motion.div
        drag
        dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
        className="fixed bottom-24 sm:bottom-28 md:bottom-24 right-6 sm:right-12 md:right-16 z-30 pointer-events-auto cursor-grab touch-none"
        title="Album cover"
      >
        <div className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-76 md:h-76 lg:w-84 lg:h-84 rounded-none overflow-hidden shadow-[0_24px_64px_-8px_rgba(0,0,0,0.5)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activeTrack.id}
            src={activeTrack.coverImage}
            alt={`${activeTrack.title} cover`}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  );
}
