"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Extras", href: "/extras" },
];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function FloatingNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const { currentTheme, isLight } = useTheme();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const hasMounted = useRef(false);

  // Normalize pathname to match active route
  const activeHref =
    NAV_ITEMS.find((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    })?.href ?? "/";

  const [activeRect, setActiveRect] = useState<{ left: number; width: number }>({
    left: 4,
    width: 0,
  });
  const [isReady, setIsReady] = useState(false);

  const updateActiveRect = useCallback(() => {
    const navEl = navRef.current;
    const activeEl = itemRefs.current[activeHref];
    if (navEl && activeEl) {
      const navBounding = navEl.getBoundingClientRect();
      const elBounding = activeEl.getBoundingClientRect();
      setActiveRect({
        left: elBounding.left - navBounding.left,
        width: elBounding.width,
      });
      setIsReady(true);
    }
  }, [activeHref]);

  useIsomorphicLayoutEffect(() => {
    updateActiveRect();
  }, [updateActiveRect]);

  // Keep synced on resize, font loading, or layout shifts
  useEffect(() => {
    const handleResize = () => updateActiveRect();
    window.addEventListener("resize", handleResize);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateActiveRect);
    }

    let observer: ResizeObserver | null = null;
    if (navRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        updateActiveRect();
      });
      observer.observe(navRef.current);
    }

    // Mark as mounted after initial layout measurement
    const timer = setTimeout(() => {
      hasMounted.current = true;
    }, 60);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      clearTimeout(timer);
    };
  }, [updateActiveRect]);

  return (
    <nav
      ref={navRef}
      className={`relative flex items-center gap-0.5 p-1 rounded-full backdrop-blur-xl user-select-none z-50 transition-colors duration-300 ${
        isLight
          ? "bg-white/80 border border-black/10 shadow-sm text-neutral-900"
          : "bg-neutral-950/70 border border-white/10 shadow-xl text-neutral-100"
      } ${className}`}
      role="navigation"
      aria-label="Main Navigation"
      onMouseLeave={() => setHoveredHref(null)}
    >
      {/* Active Moving Pill (Soft minimal indicator) */}
      {isReady && activeRect.width > 0 && (
        <motion.div
          className={`absolute inset-y-1 left-0 rounded-full pointer-events-none transition-colors duration-300 ${
            isLight
              ? "bg-black/[0.08]"
              : "bg-white/[0.12]"
          }`}
          initial={false}
          animate={{
            x: activeRect.left,
            width: activeRect.width,
            opacity: 1,
          }}
          transition={
            hasMounted.current
              ? {
                  type: "spring",
                  stiffness: 450,
                  damping: 34,
                }
              : { duration: 0 }
          }
        />
      )}

      {NAV_ITEMS.map((item) => {
        const isActive = activeHref === item.href;
        const isHovered = hoveredHref === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => {
              itemRefs.current[item.href] = el;
            }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant" as ScrollBehavior,
              });
            }}
            onMouseEnter={() => setHoveredHref(item.href)}
            className={`relative flex items-center px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-[family-name:var(--font-space-grotesk)] text-xs sm:text-[13px] tracking-tight transition-colors duration-200 z-10 ${
              isActive
                ? isLight
                  ? "text-neutral-950 font-semibold"
                  : "text-white font-semibold"
                : isLight
                  ? "text-neutral-500 hover:text-neutral-900 font-normal"
                  : "text-white/50 hover:text-white font-normal"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Subtle Hover preview */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute inset-0 rounded-full pointer-events-none ${
                    isLight ? "bg-black/[0.04]" : "bg-white/[0.06]"
                  }`}
                />
              )}
            </AnimatePresence>

            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
