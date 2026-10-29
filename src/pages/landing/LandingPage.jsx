import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LuPlay,
  LuSearch,
  LuCheck,
  LuShieldCheck,
  LuCompass,
  LuBed,
  LuUtensils,
  LuBookOpen,
  LuUser,
  LuLayers,
  LuArrowRight,
  LuArrowUpRight,
  LuSlidersHorizontal,
  LuMonitor,
  LuTablet,
  LuSmartphone,
  LuHeadphones,
  LuAward,
  LuMenu,
  LuX,
  LuChevronDown,
  LuExternalLink,
  LuStar,
  LuLock,
  LuRotateCw,
  LuSparkles,
} from "react-icons/lu";

import {
  INNER_PAGES_DATA,
  INNER_CATEGORY_FILTERS,
} from "../../data/landingData";

// 8 Master Homepages matching the reference design (All URLs verified HTTP 200)
const HOMEPAGES = [
  {
    id: "home-01",
    number: "Home 01",
    subtitle: "Classic Travel",
    title: "Beach & Tropical Island Resort",
    path: "/home-beach",
    urlSlug: "voyara.luxury/beach",
    tagline: "Overwater Villas & Sunset Plunge Pools",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    badge: "Flagship",
    location: "Santorini & Maldives",
  },
  {
    id: "home-02",
    number: "Home 02",
    subtitle: "Modern Travel",
    title: "Flagship Grand Luxury Hotel",
    path: "/home-hotel",
    urlSlug: "voyara.luxury/hotel",
    tagline: "Grand Cliffside Suites & Sommelier Cellars",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
    badge: "5-Star Grand",
    location: "Amalfi Coast & Como",
  },
  {
    id: "home-03",
    number: "Home 03",
    subtitle: "Hotel & Resort",
    title: "Geothermal Wellness Spa & Pavilion",
    path: "/home-resort",
    urlSlug: "voyara.luxury/wellness",
    tagline: "Thermal Springs & Hydrotherapy Rituals",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    badge: "Spa & Wellness",
    location: "Swiss Alps & Iceland",
  },
  {
    id: "home-04",
    number: "Home 04",
    subtitle: "Food & Restaurant",
    title: "Travel Agency & Gastronomy",
    path: "/home-travel",
    urlSlug: "voyara.luxury/dining",
    tagline: "3-Michelin Star Dining & Curated Expeditions",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85",
    badge: "Michelin Dining",
    location: "Paris & Tuscany",
  },
  {
    id: "home-05",
    number: "Home 05",
    subtitle: "Adventure",
    title: "Contemporary Boutique Hotel",
    path: "/home-boutique",
    urlSlug: "voyara.luxury/boutique",
    tagline: "Artisan Lofts & Hidden Speakeasy Lounges",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
    badge: "Speakeasy Loft",
    location: "Soho & Kyoto",
  },
  {
    id: "home-06",
    number: "Home 06",
    subtitle: "City & Culture",
    title: "Private Luxury Villa & Alpine Chalet",
    path: "/home-villa",
    urlSlug: "voyara.luxury/villa",
    tagline: "Helipad Estates & Private Butler Service",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    badge: "Private Estate",
    location: "Zermatt & Bali",
  },
  {
    id: "home-07",
    number: "Home 07",
    subtitle: "Minimal",
    title: "Modern Metropolitan Skyline Hotel",
    path: "/home-modern",
    urlSlug: "voyara.luxury/skyline",
    tagline: "Glass Rooftop Pools & Penthouse Boardrooms",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
    badge: "Skyline Lounge",
    location: "Tokyo & Manhattan",
  },
  {
    id: "home-08",
    number: "Home 08",
    subtitle: "Luxury",
    title: "Dark Luxury & Royal Heritage Palace",
    path: "/home-dark",
    urlSlug: "voyara.luxury/palace",
    tagline: "Imperial Noir Suites & Candlelit Courtyards",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
    badge: "Royal Heritage",
    location: "Udaipur & Rajasthan",
  },
];

// Section 3 Category Chips with assigned card index
const SECTION3_CHIPS = [
  { label: "Destination Pages", icon: LuCompass, filter: "destinations", cardIndex: 2 },
  { label: "Hotel (10+ Pages)", icon: LuBed, filter: "rooms", cardIndex: 0 },
  { label: "Food & Dining (7+ Pages)", icon: LuUtensils, filter: "dining", cardIndex: 1 },
  { label: "Blog & Guides Pages", icon: LuBookOpen, filter: "journal", cardIndex: 2 },
  { label: "User Account Pages", icon: LuUser, filter: "utility", cardIndex: 0 },
  { label: "Other Pages", icon: LuLayers, filter: "about", cardIndex: 1 },
];

// Section 4 Category Cards
const CATEGORY_CARDS = [
  {
    id: "destinations",
    title: "Destination Pages",
    count: "(8+ Pages)",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    filter: "destinations",
  },
  {
    id: "hotel",
    title: "Hotel Pages",
    count: "(10+ Pages)",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    filter: "rooms",
  },
  {
    id: "dining",
    title: "Food & Dining Pages",
    count: "(7+ Pages)",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    filter: "dining",
  },
  {
    id: "blog",
    title: "Blog & Guides",
    count: "(6+ Pages)",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    filter: "journal",
  },
  {
    id: "account",
    title: "User Account Pages",
    count: "(5+ Pages)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    filter: "utility",
  },
  {
    id: "other",
    title: "Other Pages",
    count: "(4+ Pages)",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    filter: "all",
  },
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [innerPagesModalOpen, setInnerPagesModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [demosMenuOpen, setDemosMenuOpen] = useState(false);

  // Dynamic Interactive Showcase State in Section 2
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [mockupViewport, setMockupViewport] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'

  // Dynamic Card Shuffle State in Section 3 (0: Hotel Suite, 1: Dining, 2: Destination)
  const [activeInnerCard, setActiveInnerCard] = useState(0);

  // Mouse tilt offsets for interactive 3D perspective
  const [tiltSec2, setTiltSec2] = useState({ x: 0, y: 0 });
  const [tiltSec3, setTiltSec3] = useState({ x: 0, y: 0 });

  const searchInputRef = useRef(null);

  // Set document title
  useEffect(() => {
    document.title =
      "Voyara / LuxStay — Luxury Hotel, Travel & Gastronomy Template | 8 Demos & 38+ Inner Pages";
  }, []);

  // Track scroll position and scroll percentage for smooth parallax
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          setScrollY(currentScroll);

          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(
              Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100))
            );
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interactive 3D mouse move handler for realistic perspective
  const handleMouseMoveSec2 = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltSec2({ x: x * 8, y: y * -8 });
  }, []);

  const handleMouseLeaveSec2 = useCallback(() => {
    setTiltSec2({ x: 0, y: 0 });
  }, []);

  const handleMouseMoveSec3 = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltSec3({ x: x * 7, y: y * -7 });
  }, []);

  const handleMouseLeaveSec3 = useCallback(() => {
    setTiltSec3({ x: 0, y: 0 });
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchModalOpen]);

  // Filtered inner pages for directory modal
  const filteredInnerPages = useMemo(() => {
    return INNER_PAGES_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categoryKey === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Instant global search results (Homepages + Inner Pages)
  const globalSearchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    const matchedHomes = HOMEPAGES.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.subtitle.toLowerCase().includes(q) ||
        h.number.toLowerCase().includes(q)
    ).map((h) => ({
      title: `${h.number}: ${h.title}`,
      subtitle: `${h.subtitle} Demo`,
      path: h.path,
      type: "Homepage Demo",
    }));

    const matchedInner = INNER_PAGES_DATA.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).map((p) => ({
      title: p.title,
      subtitle: p.categoryName,
      path: p.path,
      type: "Inner Page",
    }));

    return [...matchedHomes, ...matchedInner].slice(0, 10);
  }, [searchQuery]);

  const handleOpenCategory = (categoryKey, cardIdx = 0) => {
    setSelectedCategory(categoryKey);
    setActiveInnerCard(cardIdx);
    setInnerPagesModalOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setDemosMenuOpen(false);
  };

  const isScrolled = scrollY > 40;
  const currentDemo = HOMEPAGES[activeDemoIndex];

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-[#E5C39C] selection:text-slate-900 font-sans relative">
      {/* ========================================================================= */}
      {/* 0. TOP SCROLL PROGRESS BAR                                               */}
      {/* ========================================================================= */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-300 via-[#E5C39C] to-amber-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(229,195,156,0.9)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. STICKY / TRANSPARENT NAVIGATION HEADER                                */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-slate-950/92 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] py-3.5"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Stylized Geometric Icon */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#E5C39C] transition-transform duration-300 ease-out group-hover:scale-105">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 drop-shadow-sm"
              >
                <path
                  d="M16 3L6 14L16 11L26 14L16 3Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 14L16 29L26 14L16 19L6 14Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="15" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="font-serif-luxury text-xl sm:text-2xl font-medium tracking-wide text-white">
              Voyara
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-white/90">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-1 hover:text-[#E5C39C] transition-colors focus:outline-none"
            >
              Home <LuChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Demos Dropdown with Smooth Reveal */}
            <div
              className="relative"
              onMouseEnter={() => setDemosMenuOpen(true)}
              onMouseLeave={() => setDemosMenuOpen(false)}
            >
              <button
                onClick={() => scrollToSection("homepages")}
                className="flex items-center gap-1 hover:text-[#E5C39C] transition-colors focus:outline-none py-1"
              >
                Demos <LuChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {demosMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 mt-1 animate-slide-up text-left">
                  <div className="text-[10px] font-bold text-[#E5C39C] uppercase tracking-wider px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                    <span>8 Homepage Concepts</span>
                    <LuSparkles className="w-3 h-3 text-[#E5C39C]" />
                  </div>
                  {HOMEPAGES.map((h, idx) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        setActiveDemoIndex(idx);
                        scrollToSection("homepages");
                        setDemosMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 text-xs transition-colors text-left"
                    >
                      <span className="font-medium">
                        {h.number}: {h.subtitle}
                      </span>
                      <LuArrowRight className="w-3 h-3 text-[#E5C39C]" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("inner-pages")}
              className="flex items-center gap-1 hover:text-[#E5C39C] transition-colors focus:outline-none"
            >
              Pages <LuChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            <button
              onClick={() => scrollToSection("categories")}
              className="flex items-center gap-1 hover:text-[#E5C39C] transition-colors focus:outline-none"
            >
              Features <LuChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            <button
              onClick={() => scrollToSection("trust")}
              className="flex items-center gap-1 hover:text-[#E5C39C] transition-colors focus:outline-none"
            >
              Support <LuChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchModalOpen(true);
              }}
              aria-label="Search template pages"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LuSearch className="w-4 h-4" />
            </button>

            {/* Purchase Now CTA Button with Animated Light Sweep */}
            <a
              href="#purchase"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("cta-banner");
              }}
              className="px-5 py-2 rounded-full bg-[#E5C39C] hover:bg-[#dba878] text-slate-900 text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 animate-shimmer-sweep"
            >
              Purchase Here
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-white/90 hover:text-white"
              aria-label="Toggle mobile navigation"
            >
              {mobileMenuOpen ? (
                <LuX className="w-6 h-6" />
              ) : (
                <LuMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-slide-down">
            <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider text-white/90 text-left">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left py-2 hover:text-[#E5C39C] border-b border-white/5"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("homepages")}
                className="text-left py-2 hover:text-[#E5C39C] border-b border-white/5"
              >
                8 Homepages
              </button>
              <button
                onClick={() => scrollToSection("inner-pages")}
                className="text-left py-2 hover:text-[#E5C39C] border-b border-white/5"
              >
                38+ Inner Pages
              </button>
              <button
                onClick={() => scrollToSection("categories")}
                className="text-left py-2 hover:text-[#E5C39C] border-b border-white/5"
              >
                Categories
              </button>
              <button
                onClick={() => scrollToSection("trust")}
                className="text-left py-2 hover:text-[#E5C39C]"
              >
                Support & Updates
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION — SANTORINI SUNSET CLIFFSIDE WITH PARALLAX DEPTH         */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-950"
      >
        {/* Parallax Background Image: Santorini Sunset Caldera & Village */}
        <div
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.22, 160)}px) scale(1.08)`,
            transition: "transform 0.1s linear",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=85"
            alt="Santorini Caldera Sunset"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Subtle directional gradient overlay ensuring text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/35" />
        </div>

        {/* Ambient atmospheric drifting glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-light-beam" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-8 text-left">
              {/* Spaced Uppercase Tag */}
              <div className="inline-flex items-center gap-2 text-amber-200/90 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase mb-4">
                <span>TRAVEL · FOOD · HOTELS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C39C] animate-pulse" />
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight mb-5">
                More Than a Trip <br />
                It&apos;s an{" "}
                <span className="italic font-serif-luxury text-[#E5C39C] relative inline-block">
                  Experience
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5C39C]/40 to-transparent" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/80 text-sm sm:text-base font-light max-w-xl leading-relaxed mb-8">
                Discover a beautifully crafted template for travel, food and
                hotel bookings — with 8 stunning homepages and 38+ inner pages.
              </p>

              {/* Watch the Preview CTA with Play Icon */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="group flex items-center gap-3.5 focus:outline-none"
                  aria-label="Watch video preview"
                >
                  <div className="w-12 h-12 rounded-full border border-white/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#E5C39C] group-hover:bg-[#E5C39C] group-hover:text-slate-950">
                    <LuPlay className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                  <span className="text-sm font-medium text-white/95 tracking-wide group-hover:text-white transition-colors">
                    Watch the Preview
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Handwritten Script Callout & Hand-Drawn Curved Arrow */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-start self-start pt-6 pr-6">
              <div className="text-right select-none transform rotate-[-3deg] animate-float-subtle">
                <span className="font-script text-4xl sm:text-5xl text-[#E5C39C] font-normal tracking-wide drop-shadow-md">
                  Explore The World
                </span>
                {/* Hand-drawn SVG Curved Arrow */}
                <div className="flex justify-end mt-1 mr-3">
                  <svg
                    width="48"
                    height="46"
                    viewBox="0 0 48 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#E5C39C] opacity-85"
                  >
                    <path
                      d="M10 6 C20 14, 34 22, 32 38"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="3.5 3.5"
                    />
                    <path
                      d="M26 31 L32 39 L38 32"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Ticker Pills (4 Key Pillars) */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuCompass className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  8+ Homepages
                </span>
                <span className="text-[11px] text-white/60">Ready to Launch</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuLayers className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  38+ Inner Pages
                </span>
                <span className="text-[11px] text-white/60">Fully Integrated</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuMonitor className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  Fully Responsive
                </span>
                <span className="text-[11px] text-white/60">Mobile & Tablet</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuSlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  Easy to Customize
                </span>
                <span className="text-[11px] text-white/60">Tailwind Tokens</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: 8 STUNNING HOME PAGES (INTERACTIVE LIVE DEMO SWITCHER)      */}
      {/* ========================================================================= */}
      <section id="homepages" className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Left Copy & Right 3D Perspective Browser Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Copy */}
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase">
                  8 STUNNING HOME PAGES
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-100 text-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1 animate-pulse" />
                  Interactive Preview
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 leading-tight mb-4">
                Beautifully Designed Homepages
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Choose from 8 unique homepage layouts, each crafted for a
                different style, mood and travel experience. Select any preview
                below to switch the live interactive view.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={currentDemo.path}
                  className="px-6 py-3 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 shadow-md transition-all group animate-shimmer-sweep"
                >
                  Launch {currentDemo.number}
                  <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="text-xs text-slate-400 font-mono">
                  {currentDemo.location}
                </span>
              </div>
            </div>

            {/* Right 3D Perspective Layered Floating Browser Mockup Stack with Mouse Parallax & Dynamic Switcher */}
            <div
              className="lg:col-span-7 relative flex items-center justify-center pt-8 pb-4"
              onMouseMove={handleMouseMoveSec2}
              onMouseLeave={handleMouseLeaveSec2}
            >
              {/* Subtle ambient light glow behind 3D stack */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/25 via-sky-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

              <div
                className="relative w-full max-w-xl mx-auto h-[400px] sm:h-[480px] perspective-1200 transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: `rotateY(${tiltSec2.x}deg) rotateX(${tiltSec2.y}deg)`,
                }}
              >
                {/* Back Left Window Mockup */}
                <div
                  onClick={() =>
                    setActiveDemoIndex((prev) => (prev > 0 ? prev - 1 : 7))
                  }
                  className="cursor-pointer absolute left-0 top-8 w-[68%] sm:w-[65%] rounded-xl bg-white border border-slate-200/90 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.16)] overflow-hidden animate-float-left transition-all duration-500"
                >
                  <div className="bg-slate-100/90 px-3 py-1.5 border-b border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="bg-white/90 rounded text-[9px] px-2 py-0.5 text-slate-500 font-mono w-28 text-center truncate flex items-center justify-center gap-1 border border-slate-200/60 shadow-2xs">
                      <LuLock className="w-2.5 h-2.5 text-slate-400" />
                      <span>voyara.luxury/hotel</span>
                    </div>
                    <LuRotateCw className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  <div className="relative">
                    <img
                      src={HOMEPAGES[(activeDemoIndex + 7) % 8].image}
                      alt="Previous Concept Preview"
                      className="w-full h-56 sm:h-64 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                  </div>
                  <div className="p-3 bg-white text-left border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-900 block truncate">
                      {HOMEPAGES[(activeDemoIndex + 7) % 8].title}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {HOMEPAGES[(activeDemoIndex + 7) % 8].location}
                    </span>
                  </div>
                </div>

                {/* Back Right Window Mockup */}
                <div
                  onClick={() =>
                    setActiveDemoIndex((prev) => (prev < 7 ? prev + 1 : 0))
                  }
                  className="cursor-pointer absolute right-0 top-10 w-[68%] sm:w-[65%] rounded-xl bg-white border border-slate-200/90 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.16)] overflow-hidden animate-float-right transition-all duration-500"
                >
                  <div className="bg-slate-100/90 px-3 py-1.5 border-b border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="bg-white/90 rounded text-[9px] px-2 py-0.5 text-slate-500 font-mono w-28 text-center truncate flex items-center justify-center gap-1 border border-slate-200/60 shadow-2xs">
                      <LuLock className="w-2.5 h-2.5 text-slate-400" />
                      <span>voyara.luxury/dining</span>
                    </div>
                    <LuRotateCw className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  <div className="relative">
                    <img
                      src={HOMEPAGES[(activeDemoIndex + 1) % 8].image}
                      alt="Next Concept Preview"
                      className="w-full h-56 sm:h-64 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                  </div>
                  <div className="p-3 bg-white text-left border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-900 block truncate">
                      {HOMEPAGES[(activeDemoIndex + 1) % 8].title}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {HOMEPAGES[(activeDemoIndex + 1) % 8].location}
                    </span>
                  </div>
                </div>

                {/* Center Elevated Front Window Mockup with Dynamic Transition & Responsive Viewport Switcher */}
                <div
                  className={`absolute left-1/2 top-0 rounded-xl bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.28)] z-20 overflow-hidden animate-float-center transition-all duration-500 ${
                    mockupViewport === "desktop"
                      ? "w-[84%] sm:w-[80%]"
                      : mockupViewport === "tablet"
                      ? "w-[70%] sm:w-[64%]"
                      : "w-[52%] sm:w-[48%]"
                  }`}
                  style={{ transform: "translateX(-50%)" }}
                >
                  {/* Browser Chrome Bar with Device Viewport Switcher */}
                  <div className="bg-slate-100/95 px-3 py-2 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>

                    {/* URL Bar */}
                    <div className="bg-white rounded-md text-[10px] px-3 py-0.5 text-slate-600 font-mono w-44 text-center border border-slate-200/70 shadow-xs truncate flex items-center justify-center gap-1.5">
                      <LuLock className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{currentDemo.urlSlug}</span>
                    </div>

                    {/* Interactive Responsive Viewport Controls */}
                    <div className="flex items-center gap-1 text-slate-400">
                      <button
                        onClick={() => setMockupViewport("desktop")}
                        className={`p-1 rounded hover:text-slate-800 ${
                          mockupViewport === "desktop"
                            ? "text-slate-900 bg-slate-200"
                            : ""
                        }`}
                        title="Desktop view"
                      >
                        <LuMonitor className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setMockupViewport("tablet")}
                        className={`p-1 rounded hover:text-slate-800 ${
                          mockupViewport === "tablet"
                            ? "text-slate-900 bg-slate-200"
                            : ""
                        }`}
                        title="Tablet view"
                      >
                        <LuTablet className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setMockupViewport("mobile")}
                        className={`p-1 rounded hover:text-slate-800 ${
                          mockupViewport === "mobile"
                            ? "text-slate-900 bg-slate-200"
                            : ""
                        }`}
                        title="Mobile view"
                      >
                        <LuSmartphone className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Main Preview with Crossfade Key */}
                  <div
                    key={currentDemo.id}
                    className="relative animate-fadeIn transition-opacity duration-500"
                  >
                    <img
                      src={currentDemo.image}
                      alt={currentDemo.title}
                      className="w-full h-60 sm:h-72 object-cover"
                    />
                    {/* Realistic Glass Sheen Overlay */}
                    <div className="absolute inset-0 realistic-browser-glare" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E5C39C]">
                          {currentDemo.location}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/20 backdrop-blur-xs text-white">
                          {currentDemo.badge}
                        </span>
                      </div>
                      <h3 className="font-serif-luxury text-base sm:text-xl font-normal">
                        {currentDemo.title}
                      </h3>
                      <p className="text-[11px] text-white/80 line-clamp-1 font-light">
                        {currentDemo.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white flex items-center justify-between text-left border-t border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {currentDemo.number}: {currentDemo.subtitle}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Interactive Live Preview Ready
                      </span>
                    </div>
                    <Link
                      to={currentDemo.path}
                      className="px-3 py-1.5 rounded-full bg-[#0B132B] text-white text-[10px] font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <LuArrowRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8-Card Showcase Grid with Interactive Selection Indicator */}
          <div
            id="homepages-grid"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"
          >
            {HOMEPAGES.map((home, idx) => {
              const isSelected = activeDemoIndex === idx;
              return (
                <div
                  key={home.id}
                  onClick={() => setActiveDemoIndex(idx)}
                  className={`cursor-pointer group flex flex-col bg-white rounded-lg p-1 transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-[#E5C39C] shadow-md -translate-y-1"
                      : "hover:border-slate-300"
                  }`}
                >
                  {/* Thumbnail Frame */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200/90 shadow-2xs transition-all duration-500 bg-slate-100">
                    <img
                      src={home.image}
                      alt={home.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Active Radar Indicator Pill */}
                    {isSelected ? (
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-xs text-[#E5C39C] text-[9px] font-bold flex items-center gap-1 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5C39C] animate-radar-ping" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-2xs">
                        <span className="px-2 py-0.5 rounded-full bg-white/95 text-slate-900 text-[9px] font-semibold uppercase tracking-wider shadow">
                          Select
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Meta matching screenshot labels */}
                  <div className="pt-2 text-left px-1">
                    <div
                      className={`text-xs font-semibold transition-colors duration-300 ${
                        isSelected ? "text-amber-800" : "text-slate-900"
                      }`}
                    >
                      {home.number}:
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {home.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: 38+ BEAUTIFUL INNER PAGES (DARK NAVY / BLACK BACKGROUND)   */}
      {/* ========================================================================= */}
      <section
        id="inner-pages"
        className="py-20 lg:py-28 bg-[#080D1A] text-white relative overflow-hidden"
      >
        {/* Subtle radial ambient glow in background with gentle pulse */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Description & Category Chips */}
            <div className="lg:col-span-6 text-left">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#E5C39C] uppercase block mb-3">
                EXPLORE ALL INNER PAGES
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4">
                38+ Beautiful <br />
                Inner Pages
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light max-w-lg">
                From destination guides to food menus, hotel details to booking
                pages — everything you need is included in this complete
                template. Click any category chip below to shuffle the live
                mockups.
              </p>

              {/* View All Pages CTA Button */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setInnerPagesModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-full border border-slate-700 bg-white/5 hover:bg-white/10 hover:border-[#E5C39C] text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-all duration-300 mb-10 group"
              >
                View All Pages
                <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Category Feature Chips Grid with Active State */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SECTION3_CHIPS.map((chip, idx) => {
                  const ChipIcon = chip.icon;
                  const isActive = activeInnerCard === chip.cardIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveInnerCard(chip.cardIndex)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all duration-300 text-left group ${
                        isActive
                          ? "border-[#E5C39C] bg-white/10 shadow-[0_0_12px_rgba(229,195,156,0.2)]"
                          : "border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-[#E5C39C]">
                        <ChipIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                        {chip.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Handwritten Script Callout & 3D Fanned Inner Pages Mockup Stack */}
            <div
              className="lg:col-span-6 relative flex flex-col items-center"
              onMouseMove={handleMouseMoveSec3}
              onMouseLeave={handleMouseLeaveSec3}
            >
              {/* Handwritten Script Callout on Top Right */}
              <div className="self-end mr-6 mb-2 select-none animate-float-subtle">
                <span className="font-script text-3xl sm:text-4xl text-[#E5C39C] font-normal tracking-wide drop-shadow-md flex items-center gap-1.5">
                  Real Pages, Real Experience
                  <LuArrowUpRight className="w-4 h-4 text-[#E5C39C]" />
                </span>
                {/* Curved SVG Arrow */}
                <div className="flex justify-end mr-6 mt-1">
                  <svg
                    width="44"
                    height="38"
                    viewBox="0 0 44 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#E5C39C] opacity-80"
                  >
                    <path
                      d="M8 4 C16 12, 28 18, 26 32"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeDasharray="3 3"
                    />
                    <path
                      d="M21 26 L26 33 L32 27"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* 3D Overlapping Fanned Cards Stack with Dynamic Layer Shuffle */}
              <div
                className="relative w-full max-w-md h-[440px] sm:h-[500px] perspective-1200 transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: `rotateY(${tiltSec3.x}deg) rotateX(${tiltSec3.y}deg)`,
                }}
              >
                {/* Ambient underglow on dark floor */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card 2: Destination Guide View (Layer 1 or Front) */}
                <div
                  onClick={() => setActiveInnerCard(2)}
                  className={`cursor-pointer absolute left-4 top-16 w-[84%] rounded-xl bg-slate-900 border border-slate-700/80 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-500 ${
                    activeInnerCard === 2
                      ? "z-30 scale-100 rotate-0 shadow-2xl"
                      : "z-10 scale-90 -rotate-6 opacity-75"
                  }`}
                >
                  <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-[9px]">voyara.luxury/destinations</span>
                    <span className="text-sky-300">World Directory</span>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                      alt="Destination Guide Preview"
                      className="w-full h-44 sm:h-52 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                  </div>
                  <div className="p-3 bg-slate-900 text-xs text-left">
                    <span className="font-semibold text-white block">
                      Bali, Indonesia — Private Sanctuary
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      Helipad Transfers & Boutique Villa Directory
                    </span>
                  </div>
                </div>

                {/* Card 1: Gastronomy / Menu View (Layer 2 or Front) */}
                <div
                  onClick={() => setActiveInnerCard(1)}
                  className={`cursor-pointer absolute right-0 top-10 w-[84%] rounded-xl bg-slate-900 border border-slate-700/80 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-500 ${
                    activeInnerCard === 1
                      ? "z-30 scale-100 rotate-0 shadow-2xl"
                      : "z-15 scale-92 rotate-6 opacity-85"
                  }`}
                >
                  <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-[9px]">voyara.luxury/dining</span>
                    <span className="text-amber-300">Michelin Menu</span>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80"
                      alt="Dining Page Preview"
                      className="w-full h-44 sm:h-52 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                  </div>
                  <div className="p-3 bg-slate-900 text-xs text-left">
                    <span className="font-semibold text-white block">
                      Sommelier & Degustation
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      Wine Pairing Notes & Table Reservation
                    </span>
                  </div>
                </div>

                {/* Card 0: Luxury Beach Resort & Spa Details (Default Front with Illuminated Pool & Thumbnails) */}
                <div
                  onClick={() => setActiveInnerCard(0)}
                  className={`cursor-pointer absolute left-0 top-0 w-[90%] rounded-xl bg-white text-slate-900 border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 ${
                    activeInnerCard === 0
                      ? "z-30 scale-100 rotate-0 shadow-2xl"
                      : "z-10 scale-90 -rotate-3 opacity-80"
                  }`}
                >
                  {/* Browser Bar */}
                  <div className="bg-slate-100/95 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[9px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200/60 shadow-2xs">
                      <LuLock className="w-2.5 h-2.5 text-emerald-600" />
                      <span>voyara.luxury/room/deluxe-suite</span>
                    </div>
                    <LuRotateCw className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  {/* Room Showcase Details: Illuminated Luxury Resort Pool */}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                      alt="Room Details Suite Preview"
                      className="w-full h-44 sm:h-52 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                    <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[10px] font-semibold shadow">
                      $450 / night
                    </div>
                  </div>

                  <div className="p-4 bg-white text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif-luxury text-base font-semibold text-slate-900">
                        Luxury Beach Resort & Spa
                      </h3>
                      <div className="flex items-center text-amber-500 text-xs">
                        <LuStar className="w-3.5 h-3.5 fill-current" />
                        <span className="ml-1 font-bold text-slate-800 text-[11px]">
                          4.98
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2.5">
                      Overwater Bungalow with private plunge pool and glass floor.
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mb-2.5">
                      <div>
                        <span className="block font-semibold text-slate-800">
                          Capacity
                        </span>
                        2 Guests
                      </div>
                      <div>
                        <span className="block font-semibold text-slate-800">
                          Living Area
                        </span>
                        98 m²
                      </div>
                      <div>
                        <span className="block font-semibold text-slate-800">
                          View
                        </span>
                        Oceanfront
                      </div>
                    </div>

                    {/* 3 Gallery Thumbnails matching reference image */}
                    <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=75"
                        alt="Suite view 1"
                        className="w-full h-10 object-cover rounded border border-slate-200"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=300&q=75"
                        alt="Suite view 2"
                        className="w-full h-10 object-cover rounded border border-slate-200"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=75"
                        alt="Suite view 3"
                        className="w-full h-10 object-cover rounded border border-slate-200"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-emerald-600 font-medium">
                        ✓ Instant Confirmation
                      </span>
                      <Link
                        to="/room/deluxe-ocean-suite"
                        className="px-3 py-1 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white text-[10px] font-semibold transition-colors"
                      >
                        Reserve Suite
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 4: BROWSE BY CATEGORY (WARM LIGHT BACKGROUND #FAF8F5)         */}
      {/* ========================================================================= */}
      <section
        id="categories"
        className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div className="text-left">
              <span className="text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase block mb-2">
                BROWSE BY CATEGORY
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-slate-900">
                Explore Inner Page Categories
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setInnerPagesModalOpen(true);
              }}
              className="mt-4 sm:mt-0 text-xs font-semibold text-slate-800 hover:text-amber-800 uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors group"
            >
              View All Pages
              <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 6 Category Image Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {CATEGORY_CARDS.slice(0, 4).map((cat, i) => (
              <div
                key={cat.id}
                onClick={() => handleOpenCategory(cat.filter, i)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-slate-500">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: 2 Remaining Cards + 1 Feature Card with Palm Leaf Shadow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* User Account Pages Card */}
            <div
              onClick={() => handleOpenCategory("utility", 0)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={CATEGORY_CARDS[4].image}
                  alt={CATEGORY_CARDS[4].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors duration-300">
                  {CATEGORY_CARDS[4].title}
                </h3>
                <span className="text-xs text-slate-500">
                  {CATEGORY_CARDS[4].count}
                </span>
              </div>
            </div>

            {/* Other Pages Card */}
            <div
              onClick={() => handleOpenCategory("all", 1)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={CATEGORY_CARDS[5].image}
                  alt={CATEGORY_CARDS[5].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors duration-300">
                  {CATEGORY_CARDS[5].title}
                </h3>
                <span className="text-xs text-slate-500">
                  {CATEGORY_CARDS[5].count}
                </span>
              </div>
            </div>

            {/* Feature Card with Realistic Sun-Dappled Palm Leaf Shadow & Checklist */}
            <div className="relative bg-white rounded-xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-center overflow-hidden">
              {/* Botanical Palm Leaf SVG Shadow with Graceful Leaflets & Natural Blur */}
              <div
                className="absolute -bottom-6 -right-6 w-60 h-60 opacity-[0.22] pointer-events-none text-slate-800"
                style={{ filter: "blur(1.5px)" }}
              >
                <svg
                  viewBox="0 0 300 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M40 280 C110 230, 200 160, 260 40"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M260 40 C235 65, 195 80, 160 85"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M235 60 C210 90, 175 110, 135 120"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M205 90 C180 120, 145 140, 105 155"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M175 120 C150 150, 115 175, 75 190"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M145 155 C125 185, 95 210, 55 225"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M260 40 C270 75, 260 110, 240 145"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M235 70 C250 105, 240 140, 215 175"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M205 105 C220 140, 210 175, 185 210"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M170 140 C185 175, 175 210, 150 240"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Handwritten Script Title */}
              <h3 className="font-script text-3xl sm:text-4xl text-slate-800 font-normal leading-snug mb-5 text-left">
                Everything you need <br />
                in one template
              </h3>

              {/* 4 Bullet Items with Warm Gold Circled Checkmarks */}
              <div className="space-y-3 relative z-10 text-left">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full border border-amber-600/40 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <LuCheck className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                  <span>Modern & Elegant Design</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full border border-amber-600/40 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <LuCheck className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                  <span>Fully Responsive Layout</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full border border-amber-600/40 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <LuCheck className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                  <span>Easy to Customize</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full border border-amber-600/40 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <LuCheck className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                  <span>Lifetime Updates & Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION 5: FULL-WIDTH BANNER — SUNSET CLIFFSIDE DINING TERRACE        */}
      {/* ========================================================================= */}
      <section className="relative py-28 lg:py-36 bg-slate-950 overflow-hidden">
        {/* Full-bleed coastal terrace dining photograph with Parallax Scroll */}
        <div
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
          style={{
            transform: `translateY(${Math.min((scrollY - 1500) * 0.12, 100)}px) scale(1.05)`,
            transition: "transform 0.1s linear",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=2400&q=85"
            alt="Candlelit Coastal Terrace Dining at Sunset"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark gradient overlay ensuring contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        </div>

        {/* Floating Content Card with Shimmer Button */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] font-bold tracking-wider uppercase mb-4">
              <span>ⓘ</span> PERFECT FOR
            </div>

            {/* Headline */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4">
              Travel, Food & Hotel <br />
              Businesses
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 font-light">
              Built for creators, agencies and businesses who want to showcase
              the world in the most beautiful way.
            </p>

            {/* Button */}
            <button
              onClick={() => scrollToSection("homepages")}
              className="px-6 py-3 rounded-full border border-white/30 bg-black/40 hover:bg-black/60 text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 backdrop-blur-sm transition-all duration-300 group"
            >
              Get Started Now
              <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION 6: READY TO BUILD YOUR WEBSITE? (DARK MOUNTAIN PANORAMA)     */}
      {/* ========================================================================= */}
      <section
        id="cta-banner"
        className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden text-center"
      >
        {/* Mountain Valley Twilight Background with Parallax Depth */}
        <div
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
          style={{
            transform: `translateY(${Math.min((scrollY - 2200) * 0.1, 80)}px) scale(1.06)`,
            transition: "transform 0.1s linear",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
            alt="Twilight Mountain Panorama"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90" />
        </div>

        {/* Centered CTA Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-bold tracking-[0.28em] text-white/70 uppercase block mb-3">
            READY TO BUILD YOUR WEBSITE?
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4">
            Start Your Journey Today
          </h2>

          <p className="text-white/80 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
            Get access to 8 homepages, 38+ inner pages and everything you need
            to create a stunning travel, food and hotel website.
          </p>

          <Link
            to="/home-beach"
            className="px-8 py-3.5 rounded-full bg-[#E5C39C] hover:bg-[#dba878] text-slate-900 text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 animate-shimmer-sweep"
          >
            Purchase Now
            <LuArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SECTION 7: TRUST BAR & CLEAN FOOTER (PURE WHITE BACKGROUND #FFFFFF)    */}
      {/* ========================================================================= */}
      <section id="trust" className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 mb-8">
            {/* Pillar 1: Lifetime Updates */}
            <div className="flex items-center justify-center gap-3.5 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700">
                <LuShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-900">
                  Lifetime Updates
                </span>
                <span className="text-[11px] text-slate-500">Free</span>
              </div>
            </div>

            {/* Pillar 2: Dedicated Support */}
            <div className="flex items-center justify-center gap-3.5 pt-6 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700">
                <LuHeadphones className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-900">
                  Dedicated Support
                </span>
                <span className="text-[11px] text-slate-500">Always Here</span>
              </div>
            </div>

            {/* Pillar 3: 100% Satisfaction */}
            <div className="flex items-center justify-center gap-3.5 pt-6 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700">
                <LuAward className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-900">
                  100% Satisfaction
                </span>
                <span className="text-[11px] text-slate-500">Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Clean Copyright Line */}
          <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-light flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 Voyara / LuxStay. All rights reserved.</span>
            <span>Handcrafted for luxury travel, boutique resorts and fine gastronomy.</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. MODALS: VIDEO PREVIEW, SEARCH & ALL INNER PAGES DIRECTORY             */}
      {/* ========================================================================= */}

      {/* A. Video Preview Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950">
              <div className="flex items-center gap-2">
                <LuPlay className="w-4 h-4 text-[#E5C39C]" />
                <span className="text-sm font-semibold text-white">
                  Voyara Luxury Showcase Reel
                </span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label="Close video preview"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded 16:9 Video Player */}
            <div className="relative aspect-video bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&rel=0"
                title="Santorini & Luxury Travel Experience Reel"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* B. Header Instant Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50">
              <LuSearch className="w-5 h-5 text-slate-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search homepages, suites, dining, destinations, tours..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-600"
              >
                <LuX className="w-4 h-4" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {searchQuery.trim() === "" ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Type a keyword like &quot;beach&quot;, &quot;suite&quot;,
                  &quot;michelin&quot;, &quot;bali&quot;, or &quot;chalet&quot; to
                  find pages instantly.
                </div>
              ) : globalSearchResults.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-sm">
                  No matching pages found for &quot;{searchQuery}&quot;.
                </div>
              ) : (
                <div className="space-y-2">
                  {globalSearchResults.map((res, idx) => (
                    <Link
                      key={idx}
                      to={res.path}
                      onClick={() => setSearchModalOpen(false)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                    >
                      <div>
                        <span className="text-xs font-semibold text-slate-900 block">
                          {res.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {res.subtitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {res.type}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* C. All Inner Pages Directory Modal */}
      {innerPagesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">
                  38+ COMPLETE INNER PAGES
                </span>
                <h3 className="font-serif-luxury text-2xl font-semibold text-slate-900">
                  Inner Page Directory
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-48 sm:w-64">
                  <LuSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter pages..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:border-slate-400"
                  />
                </div>
                <button
                  onClick={() => setInnerPagesModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700"
                  aria-label="Close modal"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="px-6 py-3 border-b border-slate-100 bg-white flex items-center gap-2 overflow-x-auto">
              {INNER_CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.key
                      ? "bg-[#0B132B] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            {/* Inner Pages Grid */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInnerPages.map((page) => (
                <Link
                  key={page.id}
                  to={page.path}
                  onClick={() => setInnerPagesModalOpen(false)}
                  className="group flex flex-col bg-slate-50 hover:bg-white rounded-xl border border-slate-200 p-3.5 transition-all hover:shadow-md hover:border-slate-300 text-left"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-200 mb-3">
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded font-medium">
                      {page.badge || page.categoryName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {page.title}
                    </h4>
                    <LuExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800" />
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 font-light">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
