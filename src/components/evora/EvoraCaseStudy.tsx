"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
  Shield,
  QrCode,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Layers,
  Search,
  Maximize2,
  X,
  Workflow,
  Smartphone,
  Eye,
  CreditCard,
  Bell,
  GraduationCap,
  Building2,
  BarChart3,
  Sliders,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ScreenItem {
  id: string;
  perspective: "students" | "organizers" | "authorities";
  title: string;
  subtitle: string;
  step: string;
  src: string;
  isLongScroll?: boolean;
  pixelHeight?: string;
  badge: string;
  description: string;
  highlights: string[];
}

interface LightboxState {
  isOpen: boolean;
  src: string;
  title: string;
  subtitle?: string;
  description?: string;
  isLongScroll?: boolean;
  currentIndex: number;
}

export interface EvoraCaseStudyProps {
  onBack?: () => void;
  nextProjectHref?: string;
  className?: string;
}

export function EvoraCaseStudy({
  onBack,
  nextProjectHref = "/arken",
  className = "",
}: EvoraCaseStudyProps) {
  const { currentTheme } = useTheme();
  // Terracotta Rust from Work section is #f04e23
  const accent = currentTheme?.previewColor || "#f04e23";

  const [activePerspective, setActivePerspective] = useState<
    "all" | "students" | "organizers" | "authorities"
  >("all");
  const [activePersona, setActivePersona] = useState<number>(0);
  const [activeUserFlow, setActiveUserFlow] = useState<
    "students" | "organizers" | "authorities"
  >("students");
  const [flowViewMode, setFlowViewMode] = useState<"interactive" | "figma">("interactive");
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: "",
    title: "",
    subtitle: "",
    description: "",
    isLongScroll: false,
    currentIndex: -1,
  });
  const [lightboxFitMode, setLightboxFitMode] = useState<"phone" | "fit">("phone");

  // All 19 high-fidelity screens extracted from Evora PDFs
  const screens: ScreenItem[] = useMemo(
    () => [
      // ================= STUDENTS PERSPECTIVE (10 SCREENS) =================
      {
        id: "student-home",
        perspective: "students",
        step: "01",
        badge: "campus feed",
        title: "campus event discovery & feed",
        subtitle: "real-time categorized event exploration",
        src: "/evora/screens/Users_perspective_Home.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Centralized discovery feed filtering across all campus clubs by category (Tech, Cultural, Non-tech, Virtual) and timeline (Today, This Week). Replaces messy WhatsApp forwards with verified university listings.",
        highlights: [
          "Dynamic Category Chips",
          "Featured Campus Fest Carousel",
          "Timeline-Based Filtering",
        ],
      },
      {
        id: "student-event-detail",
        perspective: "students",
        step: "02",
        badge: "event details",
        title: "flames 2.0 detailed event showcase",
        subtitle: "full schedule, venue map & verified team",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_108.png",
        isLongScroll: true,
        pixelHeight: "4,650px",
        description:
          "High-information density event page providing detailed context, venue location, keynote objectives, schedule timing, and verified coordinator contact information (featuring Harshit Gujar).",
        highlights: [
          "Auditorium Venue & Date Stamp",
          "Coordinator Identification Cards",
          "Sticky Register Bottom Action",
        ],
      },
      {
        id: "student-event-detail-alt",
        perspective: "students",
        step: "03",
        badge: "session lineup",
        title: "extended event agenda & track details",
        subtitle: "session breakdowns & keynote roadmap",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_126.png",
        isLongScroll: true,
        pixelHeight: "4,650px",
        description:
          "Extended breakdown of multi-track sessions, speaker abstracts, prerequisite materials, and workshop logistics so attendees know precisely what each session entails prior to reserving.",
        highlights: [
          "Detailed Multi-Session Agenda",
          "Guest Speaker Credentials",
          "Prerequisite Skills List",
        ],
      },
      {
        id: "student-ticket-tiers",
        perspective: "students",
        step: "04",
        badge: "ticket tiers",
        title: "multi-tier ticket selection modal",
        subtitle: "modular access levels & session bundling",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_109.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Tiered pass selector allowing students to choose between single-session, day passes, or all-access fests (Ticket 1: 3 Sessions, Ticket 2: 2 Sessions, Ticket 3: Full Fest Pass) with instant price calculations.",
        highlights: [
          "Modular Session Access Tiers",
          "Real-Time Seat Availability",
          "Zero-Hidden-Fee Summary",
        ],
      },
      {
        id: "student-pricing-preview",
        perspective: "students",
        step: "05",
        badge: "pricing preview",
        title: "pass agenda mapping & pricing preview",
        subtitle: "day 1 keynote tracking & checkout summary",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_111.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Comprehensive checkout sheet displaying the selected pass details (₹150), linking specific session titles ('Pursuing your dreams: Overcoming failure and adversity') to the purchased pass.",
        highlights: [
          "Direct Session Mapping",
          "Standardized Institutional Pricing",
          "Campus Verification Pre-check",
        ],
      },
      {
        id: "student-booking-confirmed",
        perspective: "students",
        step: "06",
        badge: "instant receipt",
        title: "booking confirmed & digital receipt",
        subtitle: "instant confirmation with unique Transaction ID",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_106.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Instant celebratory receipt validating successful checkout with verified Transaction ID (634252909XXXL), timestamp (12 August, 19:30), thank you note from Data Science Club, and direct tap to open the entry pass.",
        highlights: [
          "Unique Transaction ID",
          "Club Attribution Note",
          "One-Tap Shortcut to QR Pass",
        ],
      },
      {
        id: "student-dynamic-qr",
        perspective: "students",
        step: "07",
        badge: "dynamic qr pass",
        title: "encrypted qr pass & 1d barcode ticket",
        subtitle: "high-contrast pass designed for rapid door entry",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_104.png",
        isLongScroll: true,
        pixelHeight: "2,410px",
        description:
          "Cryptographically signed digital entry ticket optimized for dark auditorium check-ins. Features high-contrast inverted QR code, 1D laser barcode, session details, and offline wallet caching.",
        highlights: [
          "High-Contrast Dynamic QR",
          "1D Laser Scanner Barcode",
          "100% Offline Wallet Caching",
        ],
      },
      {
        id: "student-tickets-wallet",
        perspective: "students",
        step: "08",
        badge: "pass wallet",
        title: "'my tickets' active event pass wallet",
        subtitle: "central repository for active & past credentials",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_105.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Unified wallet organizing all registered event passes (Foragers 3.0 by Data Science Club, Vibes by Igniters Club, Flames 2.0). Provides one-tap pass retrieval at venue turnstiles.",
        highlights: [
          "Chronological Event Wallet",
          "Club Branding & Status Badges",
          "One-Tap Access to Barcodes",
        ],
      },
      {
        id: "student-messaging",
        perspective: "students",
        step: "09",
        badge: "in-app chat",
        title: "peer-to-peer in-app messaging",
        subtitle: "direct communication & hackathon squad coordination",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_102.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Secure student messaging allowing participants to search peers by username or registration number (Kapil, Aditya, Amaan) to form hackathon squads, share ride-pools, or discuss fest sessions.",
        highlights: [
          "Registration Number Peer Search",
          "Direct Participant Chat",
          "Event Context Deep-Linking",
        ],
      },
      {
        id: "student-profile",
        perspective: "students",
        step: "10",
        badge: "student profile",
        title: "student profile & university credentials",
        subtitle: "Harshit Gujar (Reg: 23MIP10023)",
        src: "/evora/screens/Users_perspective_iPhone_13_mini_-_103.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Central student identity hub bound to university email, providing instant navigation to My Tickets, password configuration, profile edits, and participation history for academic credit.",
        highlights: [
          "Verified Student Registration Number",
          "Quick Pass Wallet Navigation",
          "Single Sign-On Security Settings",
        ],
      },

      // ================= ORGANIZERS PERSPECTIVE (8 SCREENS) =================
      {
        id: "organizer-club-profile",
        perspective: "organizers",
        step: "11",
        badge: "club showcase",
        title: "official club brand profile & hub",
        subtitle: "Data Science Club VIT Bhopal",
        src: "/evora/screens/Organizers_Perspective_Clubs_home_page.png",
        isLongScroll: true,
        pixelHeight: "1,439px",
        description:
          "Verified brand page for student organizations (datascienceclub@vitbhopal.ac.in). Highlights executive council leaders, active event drafts, member follower base, and legacy campus accomplishments.",
        highlights: [
          "Institutional Verification Badge",
          "Executive Council Roster Showcase",
          "Active vs Archived Fest Catalog",
        ],
      },
      {
        id: "organizer-club-history",
        perspective: "organizers",
        step: "12",
        badge: "past events",
        title: "club event portfolio & legacy archive",
        subtitle: "historical attendance metrics & reviews",
        src: "/evora/screens/Organizers_Perspective_Clubs_home_page-1.png",
        isLongScroll: false,
        pixelHeight: "814px",
        description:
          "Comprehensive public portfolio recording past fests, participant testimonials, and historical turnout data to establish credibility during freshman club recruitment and sponsorship drives.",
        highlights: [
          "Historical Turnout Telemetry",
          "Student Review Ratings",
          "Official Club Portfolio Archive",
        ],
      },
      {
        id: "organizer-home-console",
        perspective: "organizers",
        step: "13",
        badge: "console hub",
        title: "organizer operations command dashboard",
        subtitle: "event creation, active metrics & scanner launcher",
        src: "/evora/screens/Organizers_Perspective_Home.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Main staging hub for club leaders. Features quick actions to create new events, monitor active ticket counters for Flames 2.0, track revenue metrics, and launch the door QR scanner camera.",
        highlights: [
          "One-Click Event Creation Action",
          "Live Ticket Sales Telemetry",
          "Rapid Door Scanner Launcher",
        ],
      },
      {
        id: "organizer-events-search",
        perspective: "organizers",
        step: "14",
        badge: "event directory",
        title: "event search & lifecycle management",
        subtitle: "keyword search & active vs past tracking",
        src: "/evora/screens/Organizers_Perspective_Home-1.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Internal club directory providing instant keyword filtering across active and completed events ('Flames 2.0 - Active', 'Foragers - Club'), with batch participant data exports.",
        highlights: [
          "Live Status Badges (Active vs Past)",
          "Instant Event Keyword Search",
          "One-Tap CSV & Sheets Export",
        ],
      },
      {
        id: "organizer-login",
        perspective: "organizers",
        step: "15",
        badge: "sign in",
        title: "organizer secure authentication",
        subtitle: "role-based credential portal",
        src: "/evora/screens/Organizers_Perspective_iPhone_13_mini_-_90.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Secure login portal restricting club admin privileges to verified student council members with university email domain authentication, password recovery, and persistent session tokens.",
        highlights: [
          "Role-Based Access Enforcement",
          "Institutional Domain Verification",
          "Session Token Persistence",
        ],
      },
      {
        id: "organizer-event-creator",
        perspective: "organizers",
        step: "16",
        badge: "staging studio",
        title: "multi-stage event creator studio",
        subtitle: "venue selection, ticketing & faculty sign-off",
        src: "/evora/screens/Organizers_Perspective_iPhone_13_mini_-_91.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Guided 4-step wizard for staging events: Basic Details, Date & Venue, Ticket Tiers, and Faculty Co-Signing with real-time auditorium calendar conflict detection.",
        highlights: [
          "Auditorium Conflict Prevention",
          "Modular Ticket Tier Builder",
          "Real-Time Draft Auto-Save",
        ],
      },
      {
        id: "organizer-team-management",
        perspective: "organizers",
        step: "17",
        badge: "team roles",
        title: "organizer team & usher role management",
        subtitle: "Lead Organizer, Door Usher & Treasury Officer",
        src: "/evora/screens/Organizers_Perspective_iPhone_13_mini_-_96.png",
        isLongScroll: false,
        pixelHeight: "1,624px",
        description:
          "Permission assignment configuring organizer tiers: Lead Organizer (Full Edit), Door Usher (Scanner-Only Mode), and Treasury Officer (Financial Reports Only).",
        highlights: [
          "Granular Permission Tiers",
          "Scanner-Only Mode for Door Ushers",
          "Faculty Advisor Co-Signing",
        ],
      },
      {
        id: "organizer-attendee-roster",
        perspective: "organizers",
        step: "18",
        badge: "door telemetry",
        title: "live attendee roster & door telemetry",
        subtitle: "real-time door check-ins & attendee roster (4,700px)",
        src: "/evora/screens/Organizers_Perspective_iPhone_13_mini_-_98.png",
        isLongScroll: true,
        pixelHeight: "4,700px",
        description:
          "Comprehensive live attendee telemetry screen. Displays real-time door scan timestamps, participant registration numbers, check-in status, and immediate attendee search during crowded auditorium entries.",
        highlights: [
          "Real-Time Door Scan Timestamps",
          "Instant Search by Reg Number",
          "Live Attendance Rate Telemetry",
        ],
      },

      // ================= AUTHORITIES PERSPECTIVE (1 SCREEN) =================
      {
        id: "authority-console",
        perspective: "authorities",
        step: "19",
        badge: "admin console",
        title: "central campus governance & oversight console",
        subtitle: "Dean & faculty coordinator supervisory dashboard",
        src: "/evora/screens/Authorities_Perspective_Home.png",
        isLongScroll: false,
        pixelHeight: "812px",
        description:
          "High-level administrative console for Dean/Faculty Advisors. Displays pending club event proposals, daily active campus gatherings, auditorium clash alerts, and institutional policy verification.",
        highlights: [
          "One-Click Approval / Revision Feedback",
          "Automated Venue Conflict Lock Engine",
          "Campus Safety & Compliance Audit",
        ],
      },
    ],
    []
  );

  const filteredScreens = useMemo(() => {
    if (activePerspective === "all") return screens;
    return screens.filter((s) => s.perspective === activePerspective);
  }, [activePerspective, screens]);

  const openLightbox = (
    src: string,
    title: string,
    subtitle?: string,
    description?: string,
    isLongScroll?: boolean,
    index?: number
  ) => {
    setLightbox({
      isOpen: true,
      src,
      title,
      subtitle,
      description,
      isLongScroll: !!isLongScroll,
      currentIndex: typeof index === "number" ? index : -1,
    });
    setLightboxFitMode(isLongScroll ? "phone" : "fit");
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightbox.currentIndex === -1) return;
    const total = screens.length;
    let nextIndex =
      direction === "next"
        ? (lightbox.currentIndex + 1) % total
        : (lightbox.currentIndex - 1 + total) % total;
    const target = screens[nextIndex];
    setLightbox({
      isOpen: true,
      src: target.src,
      title: target.title,
      subtitle: target.subtitle,
      description: target.description,
      isLongScroll: !!target.isLongScroll,
      currentIndex: nextIndex,
    });
    setLightboxFitMode(target.isLongScroll ? "phone" : "fit");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (lightbox.isOpen && lightbox.currentIndex !== -1) {
        if (e.key === "ArrowRight") navigateLightbox("next");
        if (e.key === "ArrowLeft") navigateLightbox("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.isOpen, lightbox.currentIndex]);

  const personas = [
    {
      title: "active campus attendee",
      name: "Aditi Sharma",
      age: 20,
      occupation: "2nd Year B.Tech Student",
      avatarSrc: "/evora/persona_aditi_avatar.png",
      interest: "Technical workshops, coding hackathons, cultural music fests",
      goals: "Quickly browse and register for verified campus events without missing updates",
      difficulty:
        "Dispersed WhatsApp group clutter, broken Google Forms, manual payment screenshot verification",
      motivation:
        "A single mobile hub to explore all events, pay with instant UPI, and access digital passes in wallet",
      quote:
        "“I shouldn't have to scroll through 15 WhatsApp groups every evening just to know if a robotics workshop is happening.”",
    },
    {
      title: "club event coordinator",
      name: "Rohan Mehta",
      age: 21,
      occupation: "Event Coordinator, Data Science Club",
      avatarSrc: "/evora/persona_rohan_avatar.png",
      interest: "AI bootcamps, guest lectures, student technical showcases",
      goals:
        "Seamlessly stage events, bundle ticket sessions, and verify door entry attendance in seconds",
      difficulty:
        "Using 5+ disconnected tools (Forms, Excel, Paytm, WhatsApp), long entry queues, manual reconciliation",
      motivation:
        "Integrated organizer dashboard with live ticket sales telemetry and sub-second QR door check-in",
      quote:
        "“Manually verifying 300 UPI transaction screenshots right before an event starts is an operational nightmare.”",
    },
    {
      title: "faculty coordinator / authority",
      name: "Prof. Ritik Mehta",
      age: 38,
      occupation: "Faculty Coordinator & Event Incharge",
      avatarSrc: "/evora/persona_ritik_avatar.png",
      interest: "University compliance, student safety, auditorium scheduling",
      goals:
        "Real-time visibility into all active campus gatherings and instant one-click approval workflows",
      difficulty:
        "Slow physical paper approval forms, overlapping room bookings, zero unified record of past fests",
      motivation:
        "Centralized administrative console with automatic venue collision locking and compliance audit logging",
      quote:
        "“We need full visibility into student activities across campus to prevent venue clashes and ensure safety.”",
    },
  ];

  const userFlowData: Record<
    "students" | "organizers" | "authorities",
    {
      rootLabel: string;
      rootTarget: string;
      branches: Array<{
        title: string;
        items: string[];
      }>;
    }
  > = {
    students: {
      rootLabel: "start",
      rootTarget: "university sso login",
      branches: [
        {
          title: "campus feed",
          items: [
            "category filters",
            "featured fest carousel",
            "timeline (today / week)",
            "search by club",
          ],
        },
        {
          title: "event details",
          items: [
            "auditorium venue & time",
            "multi-session agenda",
            "coordinator contact",
            "ticket tier modal",
          ],
        },
        {
          title: "checkout & pass",
          items: [
            "single-tap upi pay",
            "instant digital receipt",
            "encrypted qr pass",
            "door turnstile scan",
          ],
        },
      ],
    },
    organizers: {
      rootLabel: "start",
      rootTarget: "coordinator sso login",
      branches: [
        {
          title: "create & stage event",
          items: [
            "create event wizard",
            "auditorium venue & time",
            "ticket tier & pricing setup",
            "send for faculty approval",
          ],
        },
        {
          title: "door operations & scan",
          items: [
            "live ticket qr scanner",
            "sub-second door validation",
            "real-time attendee count",
            "offline entry verification",
          ],
        },
        {
          title: "club hub & analytics",
          items: [
            "event registrations overview",
            "live ticket sales revenue",
            "club recruitment hiring form",
            "committee role delegation",
          ],
        },
      ],
    },
    authorities: {
      rootLabel: "start",
      rootTarget: "institutional admin login",
      branches: [
        {
          title: "approval pipeline",
          items: [
            "pending event review queue",
            "venue & hall collision check",
            "safety & policy verification",
            "one-click approve / reject",
          ],
        },
        {
          title: "campus oversight",
          items: [
            "all-campus active events feed",
            "real-time club activity log",
            "auditorium occupancy status",
            "capacity limit safeguards",
          ],
        },
        {
          title: "governance & audit",
          items: [
            "direct coordinator chats",
            "historical fest archives",
            "ticket sales & revenue audit",
            "campus alert broadcasts",
          ],
        },
      ],
    },
  };

  return (
    <main className={`min-h-screen w-full relative pt-16 font-sans bg-[#0c0d10] text-[#f5f5f7] selection:bg-[var(--accent)] selection:text-white ${className}`}>
      {/* Top Editorial Bar: Back button on left, 2024 on right (Fixed so it is ALWAYS visible while scrolling) */}
      <header className="fixed top-0 inset-x-0 z-50 w-full px-6 sm:px-12 md:px-16 py-4 flex items-center justify-between bg-[#0c0d10]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] text-white/70 hover:text-white transition-colors group px-3 py-1.5 -ml-3 rounded-lg hover:bg-white/[0.05] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </button>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] text-white/70 hover:text-white transition-colors group px-3 py-1.5 -ml-3 rounded-lg hover:bg-white/[0.05]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </Link>
        )}
        <span className="font-[family-name:var(--font-space-grotesk)] text-xs sm:text-sm text-white/40 tracking-wider">
          2024
        </span>
      </header>

      {/* Hero Showcase (Spot Stash editorial layout: Large display title + immersive visual stage) */}
      <section className="px-6 sm:px-12 md:px-16 pt-4 pb-16 sm:pb-24 max-w-[1440px] mx-auto">
        <div className="mb-10 sm:mb-14">
          <h1 className="text-7xl sm:text-9xl md:text-[140px] font-normal tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-[0.9]">
            Evora
          </h1>
          <div className="mt-5 space-y-1 text-sm sm:text-base text-white/70 font-[family-name:var(--font-space-grotesk)] lowercase tracking-wide">
            <p>simplifying the college event experience</p>
            <p className="text-white/45">0→1 mobile app design & campus ecosystem</p>
          </div>
        </div>

        {/* Hero Visual Showcase Rectangle (Using the official Evora brand image) */}
        <div
          onClick={() =>
            openLightbox(
              "/evora.png",
              "Evora Brand & Visual Identity",
              "0→1 Mobile App Design & Campus Ecosystem",
              "Official brand identity poster and cover artwork."
            )
          }
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] shadow-2xl bg-[#0c0d10] cursor-pointer group transition-all duration-500 hover:border-white/20"
        >
          <Image
            src="/evora.png"
            alt="Evora Brand Identity"
            fill
            priority
            unoptimized
            className="object-cover object-[center_42%] group-hover:scale-[1.02] transition-transform duration-700"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        </div>
      </section>

      {/* Main Editorial Case Study Grid (Column System matching reference screenshot) */}
      <div className="px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto divide-y divide-white/[0.08]">
        {/* ========================================================================= */}
        {/* ( 01 ) ABOUT PROJECTS */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 01 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              about projects
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              Evora is a college-focused mobile app for saving and finding campus events. It allows
              students to explore verified events, register with instant in-app UPI, and enter
              auditoriums with offline dynamic QR passes. At the same time, clubs manage event
              promotion, ticketing telemetry, and door check-ins, while college authorities maintain
              governance and automated venue conflict locking.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-white/60 font-[family-name:var(--font-space-grotesk)]">
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  role
                </span>
                <span className="text-white/90 font-medium mt-1 block">Lead Experience Designer</span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  timeline
                </span>
                <span className="text-white/90 font-medium mt-1 block">14 Weeks</span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  scope
                </span>
                <span className="text-white/90 font-medium mt-1 block">40+ Screens (3 Ecosystems)</span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-xs font-mono tracking-wider">
                  tools
                </span>
                <span className="text-white/90 font-medium mt-1 block">Figma, Notion, Photoshop</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 02 ) GOALS & STAGES (With connected process track in Terracotta) */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 02 )
            </span>
          </div>
          <div className="md:col-span-11 space-y-12">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                goals & stages
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                The goal is to develop an app that meets campus needs for discovering events,
                eliminating manual payment screenshot verification, and giving authorities
                transparent oversight.
              </p>
            </div>

            {/* Connected Stage Pills Track (Exact layout from reference screenshot with terracotta pills) */}
            <div className="pt-4 overflow-x-auto pb-4">
              <div className="min-w-[760px] space-y-6">
                {/* Row 1: The Stage Pills connected by the horizontal line running through their center */}
                <div className="relative flex items-center justify-between">
                  {/* Horizontal Track Connecting Line - mathematically centered on the pills row */}
                  <div className="absolute top-1/2 left-8 right-8 h-[1.5px] bg-white/20 -translate-y-1/2 z-0" />

                  {[
                    "research",
                    "prototyping",
                    "design",
                    "testing",
                  ].map((pill, i) => (
                    <div key={i} className="relative z-10">
                      <span
                        style={{ backgroundColor: accent }}
                        className="inline-block px-6 py-2 rounded-full text-white text-xs sm:text-sm font-semibold lowercase tracking-tight"
                      >
                        {pill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Row 2: Sub-items positioned cleanly below each corresponding pill */}
                <div className="grid grid-cols-4 gap-6 text-center font-[family-name:var(--font-space-grotesk)]">
                  {[
                    [
                      "( user interviews )",
                      "( 42-person survey )",
                      "( competitor audit )",
                    ],
                    [
                      "( functional prototype )",
                      "( user journeys )",
                      "( wireframes )",
                    ],
                    [
                      "( visual concept )",
                      "( design system )",
                      "( 40+ hi-fi screens )",
                    ],
                    [
                      "( 15+ club leads )",
                      "( usability testing )",
                      "( iterative refinement )",
                    ],
                  ].map((items, i) => (
                    <div key={i} className="space-y-1.5">
                      {items.map((it, j) => (
                        <p key={j} className="text-xs sm:text-[13px] text-white/50">
                          {it}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 03 ) RESEARCH & ( a ) USER PERSONA */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 03 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              research
            </h2>
          </div>
          <div className="md:col-span-8 space-y-14">
            <div className="space-y-8">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                We conducted an empirical survey via Google Forms targeting students, club leads,
                and faculty coordinators (42 verified respondents) to map out operational breakdowns
                across campus.
              </p>

              {/* Minimal Research Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2 font-[family-name:var(--font-space-grotesk)]">
                {[
                  { pct: "78%", label: "missed events due to communication gaps" },
                  { pct: "90%", label: "demand a single unified campus event app" },
                  { pct: "92%", label: "want push notifications & reminders" },
                  { pct: "85%", label: "agree clubs need an official platform" },
                  { pct: "67%", label: "face payment & ticketing friction" },
                  { pct: "62%", label: "rely strictly on informal WhatsApp chains" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1.5 border-t border-white/[0.08] pt-4">
                    <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      {stat.pct}
                    </span>
                    <p className="text-xs sm:text-sm text-white/60 leading-snug lowercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-item: ( a ) user persona (Exact overlapping light card layout from reference screenshot!) */}
            <div className="space-y-8 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    style={{ color: accent }}
                    className="font-mono text-base sm:text-lg font-semibold"
                  >
                    ( a )
                  </span>
                  <span className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
                    user persona
                  </span>
                </div>

                {/* Persona Selector Tabs */}
                <div className="flex gap-2">
                  {personas.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePersona(idx)}
                      style={{
                        backgroundColor: activePersona === idx ? accent : "rgba(255,255,255,0.05)",
                        color: activePersona === idx ? "#ffffff" : "rgba(255,255,255,0.6)",
                      }}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] transition-all font-medium"
                    >
                      {p.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overlapping Persona Cards Presentation (Matching Spot Stash reference) */}
              <div className="relative pt-2 pb-6">
                {/* Active Primary Persona Card */}
                <div className="rounded-3xl sm:rounded-[32px] bg-[#f5f1eb] text-[#111215] p-6 sm:p-10 shadow-2xl relative z-20">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
                    {/* Persona Real Extracted Avatar Artwork */}
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white border border-[#e5dfd5] flex-shrink-0 shadow-sm relative">
                      <Image
                        src={personas[activePersona].avatarSrc}
                        alt={personas[activePersona].name}
                        fill
                        unoptimized
                        priority
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Persona Details */}
                    <div className="flex-1 space-y-5">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111215] font-[family-name:var(--font-space-grotesk)] lowercase">
                          {personas[activePersona].title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#111215]/70 mt-1.5 font-[family-name:var(--font-space-grotesk)]">
                          <span>
                            <strong>{personas[activePersona].name}</strong>, {personas[activePersona].age} years old
                          </span>
                          <span>•</span>
                          <span>{personas[activePersona].occupation}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#111215]/85 font-[family-name:var(--font-space-grotesk)] pt-3 border-t border-[#111215]/10">
                        <div>
                          <span className="block text-[11px] uppercase font-semibold text-[#111215]/50">
                            interest
                          </span>
                          <p className="mt-1 leading-snug">{personas[activePersona].interest}</p>
                        </div>
                        <div>
                          <span className="block text-[11px] uppercase font-semibold text-[#111215]/50">
                            goals
                          </span>
                          <p className="mt-1 leading-snug">{personas[activePersona].goals}</p>
                        </div>
                        <div>
                          <span className="block text-[11px] uppercase font-semibold text-[#111215]/50">
                            difficulty
                          </span>
                          <p className="mt-1 leading-snug text-red-900 font-medium">
                            {personas[activePersona].difficulty}
                          </p>
                        </div>
                        <div>
                          <span className="block text-[11px] uppercase font-semibold text-[#111215]/50">
                            motivation
                          </span>
                          <p className="mt-1 leading-snug">{personas[activePersona].motivation}</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#ebe5dc] text-xs sm:text-sm italic text-[#111215]/90">
                        {personas[activePersona].quote}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Stacked Persona Card (Creates the layered depth from reference screenshot) */}
                <div
                  onClick={() => setActivePersona((activePersona + 1) % personas.length)}
                  className="hidden md:block absolute -bottom-4 right-4 left-8 rounded-3xl bg-[#e5dfd3] text-[#111215]/50 p-6 shadow-lg z-10 cursor-pointer transform translate-y-3 transition-transform hover:translate-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-[family-name:var(--font-space-grotesk)] font-medium">
                    <span>Next persona: {personas[(activePersona + 1) % personas.length].name} ({personas[(activePersona + 1) % personas.length].title})</span>
                    <span>click to view →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 04 ) USER FLOW (Full-width clean component matching reference screenshot) */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 04 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              user flow
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              End-to-end user journeys illustrating how Students, Coordinators, and Authorities
              navigate through the ecosystem without operational bottlenecks.
            </p>

            {/* View Mode Toggle: Interactive Journey Component vs Figma Diagram */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {[
                  { id: "students", label: "student flow" },
                  { id: "organizers", label: "coordinator flow" },
                  { id: "authorities", label: "authority flow" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveUserFlow(f.id as any)}
                    style={{
                      backgroundColor: activeUserFlow === f.id ? accent : "rgba(255,255,255,0.05)",
                      color: activeUserFlow === f.id ? "#ffffff" : "rgba(255,255,255,0.6)",
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] transition-all font-medium"
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFlowViewMode("interactive")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    flowViewMode === "interactive"
                      ? "bg-white/20 text-white font-medium"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  flow tree
                </button>
                <button
                  onClick={() => setFlowViewMode("figma")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    flowViewMode === "figma"
                      ? "bg-white/20 text-white font-medium"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  figma blueprint
                </button>
              </div>
            </div>

            {/* User Flow Canvas Component (Warm off-white background matching Spot Stash reference) */}
            {flowViewMode === "interactive" ? (
              <div className="rounded-3xl sm:rounded-[36px] bg-[#f5f1eb] text-[#111215] p-6 sm:p-12 shadow-2xl overflow-x-auto">
                <motion.div
                  key={activeUserFlow}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="min-w-[680px] space-y-8 font-[family-name:var(--font-space-grotesk)]"
                >
                  {/* Root Stage */}
                  <div className="flex items-center gap-3">
                    <span className="px-5 py-2 rounded-full bg-[#111215] text-white text-xs sm:text-sm font-semibold lowercase">
                      {userFlowData[activeUserFlow].rootLabel}
                    </span>
                    <span className="text-sm font-mono text-[#111215]/40">───</span>
                    <span className="px-5 py-2 rounded-full bg-[#111215] text-white text-xs sm:text-sm font-semibold lowercase">
                      {userFlowData[activeUserFlow].rootTarget}
                    </span>
                  </div>

                  {/* Branching Tree Nodes */}
                  <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#111215]/10">
                    {userFlowData[activeUserFlow].branches.map((branch) => (
                      <div key={branch.title} className="space-y-4">
                        <span
                          style={{ backgroundColor: accent }}
                          className="inline-block px-5 py-2 rounded-full text-white text-xs sm:text-sm font-semibold lowercase"
                        >
                          {branch.title}
                        </span>
                        <div className="space-y-2 pl-4 border-l-2 border-[#111215]/20">
                          {branch.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-4 py-2 rounded-xl bg-[#111215] text-white text-xs sm:text-sm font-medium"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Figma Blueprint Mode */
              <div
                onClick={() => {
                  const map = {
                    students: {
                      src: "/evora/user_flows_students.png",
                      title: "Student User Flow (Discovery → UPI Checkout → Pass)",
                    },
                    organizers: {
                      src: "/evora/user_flows_coordinators.png",
                      title: "Coordinator Flow (Draft Staging → Approval → Door Scan)",
                    },
                    authorities: {
                      src: "/evora/user_flows_authorities.png",
                      title: "Authority Approval Flow (Review → Policy Check → Publish)",
                    },
                  };
                  openLightbox(
                    map[activeUserFlow].src,
                    map[activeUserFlow].title,
                    "User Flow Architecture",
                    "Decision tree and state machine exported directly from Figma."
                  );
                }}
                className="rounded-3xl sm:rounded-[36px] bg-[#f5f1eb] p-6 sm:p-10 shadow-2xl cursor-pointer group"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={
                      activeUserFlow === "students"
                        ? "/evora/user_flows_students.png"
                        : activeUserFlow === "organizers"
                        ? "/evora/user_flows_coordinators.png"
                        : "/evora/user_flows_authorities.png"
                    }
                    alt="User Flow Diagram"
                    fill
                    unoptimized
                    className="object-contain group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
                <p className="text-center text-xs text-[#111215]/60 mt-4 font-mono">
                  click to expand high-resolution flowchart blueprint
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 05 ) SYSTEM ARCHITECTURE */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 05 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              architecture
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-[family-name:var(--font-space-grotesk)]">
              Multi-tenant system architecture divided into 4 functional pillars ensuring zero
              operational overlap, institutional compliance, and data security.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-[family-name:var(--font-space-grotesk)]">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase tracking-wider font-semibold">
                  pillar 01
                </span>
                <h4 className="text-white text-base font-medium">Student Interface</h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Categorized feed, single-tap UPI checkout, dynamic QR passes, and P2P messaging.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase tracking-wider font-semibold">
                  pillar 02
                </span>
                <h4 className="text-white text-base font-medium">Club Command Center</h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Club brand hub, event staging, live ticket sales telemetry, and door scanner.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase tracking-wider font-semibold">
                  pillar 03
                </span>
                <h4 className="text-white text-base font-medium">Authority Console</h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Campus-wide oversight, 1-click approvals, policy compliance, and venue clash locking.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span style={{ color: accent }} className="font-mono text-xs uppercase tracking-wider font-semibold">
                  pillar 04
                </span>
                <h4 className="text-white text-base font-medium">Security & Passes</h4>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  University OAuth SSO, encrypted QR validation, and anti-proxy offline caching.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 06 ) SCREENS (All 19 high-definition production screens) */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 06 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              screens
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
                Every screen designed in Figma across Students, Organizers, and Authorities.
                Click any screen to open the full-resolution inspector.
              </p>

              {/* Perspective Filter Pills */}
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {[
                  { id: "all", label: "all (19)" },
                  { id: "students", label: "students (10)" },
                  { id: "organizers", label: "organizers (8)" },
                  { id: "authorities", label: "authorities (1)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePerspective(tab.id as any)}
                    style={{
                      backgroundColor: activePerspective === tab.id ? accent : "rgba(255,255,255,0.05)",
                      color: activePerspective === tab.id ? "#ffffff" : "rgba(255,255,255,0.6)",
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)] transition-all font-medium"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Screens Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredScreens.map((item) => {
                const globalIndex = screens.findIndex((s) => s.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      openLightbox(
                        item.src,
                        item.title,
                        item.subtitle,
                        item.description,
                        item.isLongScroll,
                        globalIndex
                      )
                    }
                    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#101116] p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-[var(--accent)] hover:shadow-xl"
                  >
                    {/* Header info */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between text-xs font-[family-name:var(--font-space-grotesk)]">
                        <span style={{ color: accent }} className="font-mono font-semibold">
                          ( {item.step} )
                        </span>
                        <span className="text-white/40 uppercase text-[10px] tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[var(--accent)] transition-colors lowercase leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    {/* Device Mockup */}
                    <div className="relative w-full aspect-[9/18] rounded-xl overflow-hidden bg-black border border-white/10 my-2">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        unoptimized
                        className={`object-cover ${
                          item.isLongScroll ? "object-top" : "object-center"
                        } group-hover:scale-[1.02] transition-transform duration-300`}
                      />

                      {/* Long Screen Indicator */}
                      {item.isLongScroll && (
                        <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center">
                          <span style={{ color: accent }} className="text-[10px] font-mono">
                            scrollable ({item.pixelHeight})
                          </span>
                        </div>
                      )}

                      {/* Zoom Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 style={{ color: accent }} className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Footer Highlights */}
                    <p className="text-xs text-white/50 line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ( 07 ) TAKEAWAYS */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-1">
            <span
              style={{ color: accent }}
              className="font-mono text-base sm:text-lg md:text-xl font-semibold"
            >
              ( 07 )
            </span>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-medium text-white lowercase font-[family-name:var(--font-space-grotesk)]">
              takeaways
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8 text-sm sm:text-base text-white/80 font-[family-name:var(--font-space-grotesk)]">
            <div className="space-y-2">
              <h4 className="text-white font-medium text-base sm:text-lg">01. designing for competing interests</h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Students prioritize friction-free single-tap registration, while authorities demand
                governance, accountability, and audit trails. Reconciling speed with compliance was
                the core UX triumph of Evora.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
              <h4 className="text-white font-medium text-base sm:text-lg">02. environmental context matters</h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Auditoriums during college fests are loud, dim, and have spotty Wi-Fi. The dynamic QR
                ticket pass was specifically designed with maximum contrast, inverted margins, and
                offline cache validation for rapid door entry in &lt;0.5 seconds.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
              <h4 className="text-white font-medium text-base sm:text-lg">03. the power of domain empathy</h4>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                As a student coordinator who spent weekends cross-checking UPI payments in Excel,
                designing Evora was deeply personal. Real design breakthrough comes from having
                lived the friction every single day on campus.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Clean Bottom Navigation */}
      <footer className="w-full px-6 sm:px-12 md:px-16 py-14 max-w-[1440px] mx-auto flex items-center justify-between border-t border-white/[0.08] text-xs sm:text-sm font-[family-name:var(--font-space-grotesk)]">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </button>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back</span>
          </Link>
        )}
        <span className="text-white/40 hidden sm:inline">Evora UX Case Study • Harshit Gujar</span>
        <Link
          href={nextProjectHref}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
        >
          <span>next project</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </footer>

      {/* ========================================================================= */}
      {/* HIGH-DEFINITION LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[94vh] w-full flex flex-col rounded-3xl overflow-hidden border border-white/15 bg-[#0a0c10] shadow-2xl"
            >
              {/* Lightbox Header Bar */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/60">
                <div className="space-y-0.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)] lowercase">
                      {lightbox.title}
                    </h3>
                    {lightbox.currentIndex !== -1 && (
                      <span
                        style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}15` }}
                        className="px-2 py-0.5 rounded text-[10px] font-mono border"
                      >
                        {lightbox.currentIndex + 1} / {screens.length}
                      </span>
                    )}
                  </div>
                  {lightbox.subtitle && (
                    <p style={{ color: accent }} className="text-xs font-mono lowercase">
                      {lightbox.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Mode Toggle for Long Screens */}
                  {lightbox.isLongScroll && (
                    <button
                      onClick={() =>
                        setLightboxFitMode(lightboxFitMode === "phone" ? "fit" : "phone")
                      }
                      className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-xs text-white flex items-center gap-1.5 transition-colors"
                      title="Toggle scroll view"
                    >
                      <Sliders style={{ color: accent }} className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {lightboxFitMode === "phone" ? "scroll phone" : "fit window"}
                      </span>
                    </button>
                  )}

                  {/* Previous / Next buttons */}
                  {lightbox.currentIndex !== -1 && (
                    <div className="flex items-center gap-1 border-x border-white/10 px-2 mx-1">
                      <button
                        onClick={() => navigateLightbox("prev")}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors"
                        title="Previous screen"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigateLightbox("next")}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors"
                        title="Next screen"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="p-2 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Main Content Viewport */}
              <div className="relative flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-black/90 min-h-[350px] max-h-[78vh]">
                {lightbox.isLongScroll && lightboxFitMode === "phone" ? (
                  /* Phone-Width Scroll View for Long Screens */
                  <div className="w-full max-w-[420px] mx-auto py-4">
                    <div className="relative w-full rounded-[32px] overflow-hidden border-[8px] border-[#181a20] shadow-2xl bg-black">
                      <Image
                        src={lightbox.src}
                        alt={lightbox.title}
                        width={750}
                        height={4700}
                        unoptimized
                        className="w-full h-auto object-contain block"
                        priority
                      />
                    </div>
                    <p className="text-center text-xs text-white/40 mt-3 font-mono">
                      scroll down to inspect the full screen height
                    </p>
                  </div>
                ) : (
                  /* Fit-to-screen View */
                  <div className="relative w-full h-[65vh] sm:h-[72vh]">
                    <Image
                      src={lightbox.src}
                      alt={lightbox.title}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="95vw"
                      priority
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
