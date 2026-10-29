import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LuPlay,
  LuPause,
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
  LuPlus,
  LuMinus,
  LuMaximize2,
  LuMapPin,
  LuSun,
} from "react-icons/lu";

import {
  INNER_PAGES_DATA,
  INNER_CATEGORY_FILTERS,
} from "../../data/landingData";

// Dynamic Rotating Words for Hero Headline
const HERO_WORDS = [
  "Experience",
  "Adventure",
  "Sanctuary",
  "Masterpiece",
  "Getaway",
];

// Dynamic Destination Ticker
const DESTINATION_TICKER = [
  { name: "Santorini, Greece", time: "19:45", temp: "24°C", sky: "Sunset Glow" },
  { name: "Maldives Islands", time: "22:45", temp: "28°C", sky: "Lagoon Calm" },
  { name: "Amalfi Coast, Italy", time: "18:45", temp: "22°C", sky: "Sea Breeze" },
  { name: "Zermatt, Switzerland", time: "18:45", temp: "14°C", sky: "Alpine Crisp" },
  { name: "Kyoto, Japan", time: "02:45", temp: "19°C", sky: "Misty Dawn" },
];

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
    category: "resort",
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
    category: "hotel",
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
    category: "resort",
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
    category: "villa",
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
    category: "hotel",
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
    category: "villa",
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
    category: "hotel",
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
    category: "villa",
  },
];

// Section 2 Category Filters
const DEMO_FILTER_TABS = [
  { key: "all", label: "All Demos (8)" },
  { key: "resort", label: "Beach & Wellness (2)" },
  { key: "hotel", label: "Grand Hotels (3)" },
  { key: "villa", label: "Villas & Dining (3)" },
];

// Section 3 Category Chips with assigned card index and direct paths
const SECTION3_CHIPS = [
  { label: "Destination Pages", icon: LuCompass, filter: "destinations", cardIndex: 2, path: "/destinations" },
  { label: "Hotel (10+ Pages)", icon: LuBed, filter: "rooms", cardIndex: 0, path: "/rooms" },
  { label: "Food & Dining (7+ Pages)", icon: LuUtensils, filter: "dining", cardIndex: 1, path: "/services-dining" },
  { label: "Blog & Guides Pages", icon: LuBookOpen, filter: "journal", cardIndex: 2, path: "/blog" },
  { label: "User Account Pages", icon: LuUser, filter: "utility", cardIndex: 0, path: "/login" },
  { label: "Other Pages", icon: LuLayers, filter: "about", cardIndex: 1, path: "/about" },
];

// Section 4 Category Cards with direct paths
const CATEGORY_CARDS = [
  {
    id: "destinations",
    title: "Destination Pages",
    count: "(8+ Pages)",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    filter: "destinations",
    path: "/destinations",
  },
  {
    id: "hotel",
    title: "Hotel Pages",
    count: "(10+ Pages)",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    filter: "rooms",
    path: "/rooms",
  },
  {
    id: "dining",
    title: "Food & Dining Pages",
    count: "(7+ Pages)",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    filter: "dining",
    path: "/services-dining",
  },
  {
    id: "blog",
    title: "Blog & Guides",
    count: "(6+ Pages)",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    filter: "journal",
    path: "/blog",
  },
  {
    id: "account",
    title: "User Account Pages",
    count: "(5+ Pages)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    filter: "utility",
    path: "/login",
  },
  {
    id: "other",
    title: "Other Pages",
    count: "(4+ Pages)",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    filter: "all",
    path: "/about",
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

  // Dynamic Word Rotator in Hero
  const [heroWordIndex, setHeroWordIndex] = useState(0);

  // Dynamic Weather / Local Time Ticker
  const [tickerIndex, setTickerIndex] = useState(0);

  // Dynamic Metrics CountUp States
  const [countHomes, setCountHomes] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [countResponsive, setCountResponsive] = useState(0);
  const [countRating, setCountRating] = useState("0.00");

  // Dynamic Showcase State in Section 2
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [mockupViewport, setMockupViewport] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  const [activeDemoFilter, setActiveDemoFilter] = useState("all");
  const [autoplayDemos, setAutoplayDemos] = useState(true);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [fullscreenSandboxOpen, setFullscreenSandboxOpen] = useState(false);

  // Dynamic Card Shuffle & Calculator State in Section 3
  const [activeInnerCard, setActiveInnerCard] = useState(0);
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcNights, setCalcNights] = useState(3);
  const [calcMealPlan, setCalcMealPlan] = useState("inclusive"); // 'standard' | 'inclusive'
  const [bookingToast, setBookingToast] = useState(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 400, y: 300 });

  // Dynamic Expandable Category Drawer in Section 4
  const [expandedCategoryKey, setExpandedCategoryKey] = useState(null);

  const searchInputRef = useRef(null);

  // Set document title
  useEffect(() => {
    document.title =
      "Voyara / LuxStay — Luxury Hotel, Travel & Gastronomy Template | 8 Demos & 38+ Inner Pages";
  }, []);

  // Dynamic Rotating Word Timer (every 3.2s)
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Weather / Destination Ticker Timer (every 4s)
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % DESTINATION_TICKER.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Smooth Count-Up Effect for Hero Metrics on mount
  useEffect(() => {
    let frame;
    const duration = 1600;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCountHomes(Math.floor(ease * 8));
      setCountPages(Math.floor(ease * 38));
      setCountResponsive(Math.floor(ease * 100));
      setCountRating((ease * 4.98).toFixed(2));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCountHomes(8);
        setCountPages(38);
        setCountResponsive(100);
        setCountRating("4.98");
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Dynamic Autoplay Demo Cycling in Section 2 (every 6 seconds with progress bar)
  useEffect(() => {
    if (!autoplayDemos) {
      setAutoplayProgress(0);
      return;
    }

    const intervalTime = 60;
    const totalDuration = 6000;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setAutoplayProgress((prev) => {
        if (prev >= 100) {
          setActiveDemoIndex((current) => (current + 1) % HOMEPAGES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoplayDemos]);

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

  const handleMouseMoveSec3 = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchModalOpen]);

  // Dynamic filter for Homepage Concepts
  const filteredHomepages = useMemo(() => {
    if (activeDemoFilter === "all") return HOMEPAGES;
    return HOMEPAGES.filter((h) => h.category === activeDemoFilter);
  }, [activeDemoFilter]);

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

  const handleToggleCategoryDrawer = (categoryKey) => {
    setExpandedCategoryKey((prev) => (prev === categoryKey ? null : categoryKey));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setDemosMenuOpen(false);
  };

  // Dynamic Booking Calculation for Section 3 Suite Card
  const calcBaseRate = 450;
  const calcMealRate = calcMealPlan === "inclusive" ? 120 : 0;
  const calcSubtotal = (calcBaseRate + calcMealRate) * calcNights;
  const calcTaxes = Math.round(calcSubtotal * 0.1);
  const calcTotal = calcSubtotal + calcTaxes;

  const handleSimulateBooking = () => {
    setBookingToast({
      title: "Reservation Simulated!",
      details: `${calcNights} Nights • ${calcGuests} Guests • Total: $${calcTotal.toLocaleString()} USD`,
    });
    setTimeout(() => setBookingToast(null), 4000);
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
      {/* 2. HERO SECTION — SANTORINI SUNSET WITH DYNAMIC ROTATING WORDS & TICKER  */}
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
          {/* Directional gradient overlay ensuring text readability */}
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
              {/* Dynamic Live Weather / Destination Ticker Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-[11px] mb-4 shadow-sm animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar-ping" />
                <span className="font-semibold text-[#E5C39C] flex items-center gap-1">
                  <LuMapPin className="w-3 h-3 text-[#E5C39C]" />
                  {DESTINATION_TICKER[tickerIndex].name}
                </span>
                <span className="text-white/40">•</span>
                <span className="font-mono text-[10px] text-white/80">
                  {DESTINATION_TICKER[tickerIndex].time}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-amber-200 flex items-center gap-1 font-medium">
                  <LuSun className="w-3 h-3 text-amber-300" />
                  {DESTINATION_TICKER[tickerIndex].temp} {DESTINATION_TICKER[tickerIndex].sky}
                </span>
              </div>

              {/* Spaced Uppercase Tag */}
              <div className="block text-amber-200/90 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase mb-3">
                TRAVEL · FOOD · HOTELS
              </div>

              {/* Main Headline with Dynamic Rotating Word */}
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight mb-5">
                More Than a Trip <br />
                It&apos;s an{" "}
                <span
                  key={heroWordIndex}
                  className="italic font-serif-luxury text-[#E5C39C] relative inline-block animate-fadeIn duration-500"
                >
                  {HERO_WORDS[heroWordIndex]}
                  <span className="absolute bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#E5C39C]/60 to-transparent" />
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

          {/* Bottom Ticker Pills (4 Key Pillars with Dynamic Live Count-Up) */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <button
              onClick={() => scrollToSection("homepages-grid")}
              className="flex items-center gap-3 text-white/90 text-left hover:text-[#E5C39C] transition-colors cursor-pointer"
              title="Jump to 8 Homepages Grid"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuCompass className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  {countHomes}+ Homepages
                </span>
                <span className="text-[11px] text-white/60">Ready to Launch</span>
              </div>
            </button>

            <button
              onClick={() => setInnerPagesModalOpen(true)}
              className="flex items-center gap-3 text-white/90 text-left hover:text-[#E5C39C] transition-colors cursor-pointer"
              title="Open All 38+ Inner Pages Directory"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuLayers className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  {countPages}+ Inner Pages
                </span>
                <span className="text-[11px] text-white/60">Fully Integrated</span>
              </div>
            </button>

            <button
              onClick={() => setFullscreenSandboxOpen(true)}
              className="flex items-center gap-3 text-white/90 text-left hover:text-[#E5C39C] transition-colors cursor-pointer"
              title="Open Multi-Device Sandbox Preview"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuMonitor className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  {countResponsive}% Responsive
                </span>
                <span className="text-[11px] text-white/60">Mobile & Tablet</span>
              </div>
            </button>

            <Link
              to="/testimonials"
              className="flex items-center gap-3 text-white/90 text-left hover:text-[#E5C39C] transition-colors cursor-pointer"
              title="Open Testimonials & Reviews"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E5C39C]">
                <LuStar className="w-4 h-4 fill-current" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white tracking-wide">
                  {countRating}★ Elite Quality
                </span>
                <span className="text-[11px] text-white/60">ThemeForest Grade</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: 8 STUNNING HOME PAGES (DYNAMIC AUTOPLAY DEMO STUDIO)        */}
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
                  Live Dynamic Studio
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

              {/* Dynamic Autoplay Controls & Category Filter */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={() => setAutoplayDemos(!autoplayDemos)}
                  className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium inline-flex items-center gap-2 transition-colors"
                  title={autoplayDemos ? "Pause autoplay" : "Resume autoplay"}
                >
                  {autoplayDemos ? (
                    <>
                      <LuPause className="w-3 h-3 text-amber-700" />
                      <span>Autoplay Active</span>
                      <span className="w-10 h-1.5 bg-slate-200 rounded-full overflow-hidden ml-1">
                        <span
                          className="h-full bg-amber-600 block transition-all"
                          style={{ width: `${autoplayProgress}%` }}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <LuPlay className="w-3 h-3 text-emerald-600 fill-current" />
                      <span>Resume Autoplay</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setFullscreenSandboxOpen(true)}
                  className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <LuMaximize2 className="w-3 h-3 text-slate-500" />
                  <span>Sandbox Preview</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToSection("homepages-grid")}
                  className="px-6 py-3 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 shadow-md transition-all group animate-shimmer-sweep"
                >
                  <span>Explore All 8 Homepages</span>
                  <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  to={currentDemo.path}
                  className="px-5 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <span>Launch {currentDemo.number}</span>
                  <LuExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </Link>
                <span className="text-xs text-slate-400 font-mono">
                  {currentDemo.location}
                </span>
              </div>
            </div>

            {/* Right Layered Browser Mockup Stack */}
            <div className="lg:col-span-7 relative flex items-center justify-center pt-8 pb-4">
              {/* Subtle ambient light glow behind stack */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/25 via-sky-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

              <div className="relative w-full max-w-xl mx-auto h-[400px] sm:h-[480px]">
                {/* Back Left Window Mockup */}
                <div
                  onClick={() => {
                    setActiveDemoIndex((prev) => (prev > 0 ? prev - 1 : 7));
                    setAutoplayProgress(0);
                  }}
                  className="cursor-pointer absolute left-0 top-8 w-[68%] sm:w-[65%] rounded-xl bg-white border border-slate-200/90 shadow-lg overflow-hidden animate-float-left transition-opacity duration-300"
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
                  onClick={() => {
                    setActiveDemoIndex((prev) => (prev < 7 ? prev + 1 : 0));
                    setAutoplayProgress(0);
                  }}
                  className="cursor-pointer absolute right-0 top-10 w-[68%] sm:w-[65%] rounded-xl bg-white border border-slate-200/90 shadow-lg overflow-hidden animate-float-right transition-opacity duration-300"
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

                {/* Center Elevated Front Window Mockup */}
                <div
                  className={`absolute left-1/2 top-0 rounded-xl bg-white border border-slate-200/90 shadow-2xl z-20 overflow-hidden animate-float-center transition-all duration-300 ${
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

                    {/* URL Bar (Click to Open) */}
                    <Link
                      to={currentDemo.path}
                      className="bg-white rounded-md text-[10px] px-3 py-0.5 text-slate-600 font-mono w-44 text-center border border-slate-200/70 shadow-xs truncate flex items-center justify-center gap-1.5 hover:text-amber-800 transition-colors"
                      title={`Open ${currentDemo.title}`}
                    >
                      <LuLock className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{currentDemo.urlSlug}</span>
                    </Link>

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

                  {/* Main Preview with Direct Click to Open */}
                  <Link
                    key={currentDemo.id}
                    to={currentDemo.path}
                    className="block relative cursor-pointer animate-fadeIn transition-opacity duration-300 overflow-hidden"
                    title={`Click to open ${currentDemo.title}`}
                  >
                    <img
                      src={currentDemo.image}
                      alt={currentDemo.title}
                      className="w-full h-60 sm:h-72 object-cover"
                    />
                    {/* Realistic Glass Sheen Overlay */}
                    <div className="absolute inset-0 realistic-browser-glare" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left pointer-events-none">
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
                  </Link>

                  <div className="p-3 bg-white flex items-center justify-between text-left border-t border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {currentDemo.number}: {currentDemo.subtitle}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Click card or button to open page
                      </span>
                    </div>
                    <Link
                      to={currentDemo.path}
                      className="px-3.5 py-1.5 rounded-full bg-[#0B132B] text-white text-[11px] font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-1 shadow-xs"
                    >
                      <span>Open Page</span>
                      <LuArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs for Homepages */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {DEMO_FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveDemoFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeDemoFilter === tab.key
                    ? "bg-[#0B132B] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 4-Grid Showcase: 2 Rows of 4 Cards on Desktop (Click to Open Every Page) */}
          <div
            id="homepages-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4"
          >
            {filteredHomepages.map((home) => {
              const originalIndex = HOMEPAGES.findIndex((h) => h.id === home.id);
              const isSelected = activeDemoIndex === originalIndex;
              return (
                <Link
                  key={home.id}
                  to={home.path}
                  onMouseEnter={() => {
                    setActiveDemoIndex(originalIndex);
                    setAutoplayProgress(0);
                  }}
                  className={`group flex flex-col bg-white rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-amber-400 shadow-md ring-1 ring-amber-300/40"
                      : "border-slate-200/90 shadow-2xs hover:border-slate-400 hover:shadow-sm"
                  }`}
                  title={`Open ${home.number}: ${home.title}`}
                >
                  {/* Thumbnail Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={home.image}
                      alt={home.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient Shade for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

                    {/* Top Badges: Number on Left, Badge on Right */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/15 shadow-sm">
                        {home.number}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E5C39C] text-slate-950 text-[10px] font-bold tracking-wide shadow-sm">
                        {home.badge}
                      </span>
                    </div>

                    {/* Bottom Destination Tag on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none text-white text-left">
                      <span className="text-[11px] font-medium text-amber-200 drop-shadow-sm flex items-center gap-1">
                        <LuMapPin className="w-3 h-3 text-[#E5C39C]" />
                        {home.location}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between text-left bg-white">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-amber-800 uppercase tracking-wider text-[11px]">
                          {home.subtitle}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {home.urlSlug}
                        </span>
                      </div>
                      <h3 className="font-serif-luxury text-base font-medium text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-1">
                        {home.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 font-light leading-relaxed mb-3">
                        {home.tagline}
                      </p>
                    </div>

                    {/* Bottom Interactive Row */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-amber-800 inline-flex items-center gap-1.5 transition-colors">
                        <span>Open Homepage</span>
                        <LuArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                        <LuExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: 38+ BEAUTIFUL INNER PAGES (DYNAMIC SIMULATOR & SPOTLIGHT)   */}
      {/* ========================================================================= */}
      <section
        id="inner-pages"
        className="py-20 lg:py-28 bg-[#080D1A] text-white relative overflow-hidden"
      >
        {/* Dynamic Cursor-Following Ambient Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(229,195,156,0.14), transparent 75%)`,
          }}
        />

        {/* Dynamic Booking Toast Alert */}
        {bookingToast && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-emerald-500/60 shadow-2xl rounded-xl p-4 text-left max-w-sm animate-slide-left">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
              <LuCheck className="w-4 h-4" />
              <span>{bookingToast.title}</span>
            </div>
            <p className="text-xs text-slate-300">{bookingToast.details}</p>
          </div>
        )}

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

              {/* Category Feature Chips Grid with Active State & Direct Click to Open */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SECTION3_CHIPS.map((chip, idx) => {
                  const ChipIcon = chip.icon;
                  const isActive = activeInnerCard === chip.cardIndex;
                  return (
                    <Link
                      key={idx}
                      to={chip.path}
                      onMouseEnter={() => setActiveInnerCard(chip.cardIndex)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 text-left group cursor-pointer ${
                        isActive
                          ? "border-[#E5C39C] bg-white/10 shadow-[0_0_12px_rgba(229,195,156,0.2)]"
                          : "border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                      title={`Open ${chip.label}`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-[#E5C39C] shrink-0">
                          <ChipIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                          {chip.label}
                        </span>
                      </div>
                      <LuArrowRight className="w-3 h-3 text-slate-500 group-hover:text-[#E5C39C] transition-colors shrink-0 ml-1" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Handwritten Script Callout & Layered Inner Pages Mockup Stack */}
            <div className="lg:col-span-6 relative flex flex-col items-center">
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

              {/* Layered Inner Pages Mockup Stack with Direct Click to Open */}
              <div className="relative w-full max-w-md h-[460px] sm:h-[520px]">
                {/* Ambient underglow on dark floor */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card 2: Destination Guide View (Click to Open /destinations) */}
                <Link
                  to="/destinations"
                  onMouseEnter={() => setActiveInnerCard(2)}
                  className={`cursor-pointer absolute left-4 top-16 w-[84%] rounded-xl bg-slate-900 border border-slate-700/80 shadow-xl overflow-hidden transition-all duration-300 group/dest ${
                    activeInnerCard === 2
                      ? "z-30 scale-100 rotate-0"
                      : "z-10 scale-90 -rotate-6 opacity-75"
                  }`}
                  title="Open Destination Pages"
                >
                  <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-[9px]">voyara.luxury/destinations</span>
                    <span className="text-sky-300 flex items-center gap-1">
                      <span>World Directory</span>
                      <LuArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                      alt="Destination Guide Preview"
                      className="w-full h-44 sm:h-52 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                  </div>
                  <div className="p-3 bg-slate-900 text-xs text-left">
                    <span className="font-semibold text-white block group-hover/dest:text-[#E5C39C] transition-colors">
                      Bali, Indonesia — Private Sanctuary
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      Helipad Transfers & Boutique Villa Directory
                    </span>
                  </div>
                </Link>

                {/* Card 1: Gastronomy / Menu View (Click to Open /services-dining) */}
                <Link
                  to="/services-dining"
                  onMouseEnter={() => setActiveInnerCard(1)}
                  className={`cursor-pointer absolute right-0 top-10 w-[84%] rounded-xl bg-slate-900 border border-slate-700/80 shadow-xl overflow-hidden transition-all duration-300 group/dine ${
                    activeInnerCard === 1
                      ? "z-30 scale-100 rotate-0"
                      : "z-15 scale-92 rotate-6 opacity-85"
                  }`}
                  title="Open Food & Dining Pages"
                >
                  <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-[9px]">voyara.luxury/dining</span>
                    <span className="text-amber-300 flex items-center gap-1">
                      <span>Michelin Menu</span>
                      <LuArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80"
                      alt="Dining Page Preview"
                      className="w-full h-44 sm:h-52 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                  </div>
                  <div className="p-3 bg-slate-900 text-xs text-left">
                    <span className="font-semibold text-white block group-hover/dine:text-[#E5C39C] transition-colors">
                      Sommelier & Degustation
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      Wine Pairing Notes & Table Reservation
                    </span>
                  </div>
                </Link>

                {/* Card 0: Luxury Beach Resort & Spa Details with Dynamic Calculator */}
                <div
                  onClick={() => setActiveInnerCard(0)}
                  className={`cursor-pointer absolute left-0 top-0 w-[90%] rounded-xl bg-white text-slate-900 border border-slate-200/90 shadow-2xl overflow-hidden transition-all duration-300 ${
                    activeInnerCard === 0
                      ? "z-30 scale-100 rotate-0"
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
                    <Link
                      to="/room/deluxe-suite"
                      className="flex items-center gap-1 font-mono text-[9px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200/60 shadow-2xs hover:text-amber-800"
                      title="Open Deluxe Suite Page"
                    >
                      <LuLock className="w-2.5 h-2.5 text-emerald-600" />
                      <span>voyara.luxury/room/deluxe-suite</span>
                    </Link>
                    <LuRotateCw className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  {/* Room Showcase Details: Illuminated Luxury Resort Pool (Click to Open) */}
                  <Link
                    to="/room/deluxe-suite"
                    className="block relative overflow-hidden"
                    title="Open Deluxe Suite Page"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                      alt="Room Details Suite Preview"
                      className="w-full h-40 sm:h-44 object-cover"
                    />
                    <div className="absolute inset-0 realistic-browser-glare" />
                    <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[10px] font-semibold shadow">
                      ${calcBaseRate} / night
                    </div>
                  </Link>

                  <div className="p-4 bg-white text-left">
                    <div className="flex items-center justify-between mb-1">
                      <Link
                        to="/room/deluxe-suite"
                        className="font-serif-luxury text-base font-semibold text-slate-900 hover:text-amber-800 transition-colors"
                      >
                        Luxury Beach Resort & Spa
                      </Link>
                      <div className="flex items-center text-amber-500 text-xs">
                        <LuStar className="w-3.5 h-3.5 fill-current" />
                        <span className="ml-1 font-bold text-slate-800 text-[11px]">
                          4.98
                        </span>
                      </div>
                    </div>

                    {/* Dynamic Booking Simulator Controls */}
                    <div className="my-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200/80">
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-slate-600 font-medium">Guests:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCalcGuests((g) => Math.max(1, g - 1));
                            }}
                            className="w-5 h-5 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <LuMinus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-slate-900 w-12 text-center">
                            {calcGuests} {calcGuests === 1 ? "Guest" : "Guests"}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCalcGuests((g) => Math.min(6, g + 1));
                            }}
                            className="w-5 h-5 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <LuPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-slate-600 font-medium">Nights:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCalcNights((n) => Math.max(1, n - 1));
                            }}
                            className="w-5 h-5 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <LuMinus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-slate-900 w-12 text-center">
                            {calcNights} {calcNights === 1 ? "Night" : "Nights"}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCalcNights((n) => Math.min(14, n + 1));
                            }}
                            className="w-5 h-5 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <LuPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCalcMealPlan((m) =>
                              m === "inclusive" ? "standard" : "inclusive"
                            );
                          }}
                          className={`px-2 py-0.5 rounded transition-colors ${
                            calcMealPlan === "inclusive"
                              ? "bg-amber-100 text-amber-800 font-semibold"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {calcMealPlan === "inclusive"
                            ? "✓ All-Inclusive Plan (+$120)"
                            : "Standard Breakfast"}
                        </button>
                        <span className="font-bold text-slate-900 text-xs">
                          Total: ${calcTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* 3 Gallery Thumbnails matching reference image */}
                    <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=75"
                        alt="Suite view 1"
                        className="w-full h-9 object-cover rounded border border-slate-200"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=300&q=75"
                        alt="Suite view 2"
                        className="w-full h-9 object-cover rounded border border-slate-200"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=75"
                        alt="Suite view 3"
                        className="w-full h-9 object-cover rounded border border-slate-200"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-emerald-600 font-medium">
                        ✓ Best Direct Rate Guaranteed
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulateBooking();
                        }}
                        className="px-3 py-1 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white text-[10px] font-semibold transition-colors"
                      >
                        Reserve Suite
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 4: BROWSE BY CATEGORY (WITH DYNAMIC INLINE PAGE DRAWER)        */}
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

          {/* 6 Category Image Cards Grid (Click to Open Each Category Page) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {CATEGORY_CARDS.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 block"
                title={`Open ${cat.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="p-4 text-left flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors duration-200">
                      {cat.title}
                    </h3>
                    <span className="text-xs text-slate-500">{cat.count}</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium inline-flex items-center gap-1">
                    <span>Explore</span>
                    <LuArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-amber-800 transition-colors" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Row: 2 Remaining Cards + 1 Feature Card with Palm Leaf Shadow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* User Account Pages Card */}
            <Link
              to={CATEGORY_CARDS[4].path}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 block"
              title={`Open ${CATEGORY_CARDS[4].title}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={CATEGORY_CARDS[4].image}
                  alt={CATEGORY_CARDS[4].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-4 text-left flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors duration-200">
                    {CATEGORY_CARDS[4].title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {CATEGORY_CARDS[4].count}
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium inline-flex items-center gap-1">
                  <span>Explore</span>
                  <LuArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-amber-800 transition-colors" />
                </span>
              </div>
            </Link>

            {/* Other Pages Card */}
            <Link
              to={CATEGORY_CARDS[5].path}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 block"
              title={`Open ${CATEGORY_CARDS[5].title}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={CATEGORY_CARDS[5].image}
                  alt={CATEGORY_CARDS[5].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-4 text-left flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors duration-200">
                    {CATEGORY_CARDS[5].title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {CATEGORY_CARDS[5].count}
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium inline-flex items-center gap-1">
                  <span>Explore</span>
                  <LuArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-amber-800 transition-colors" />
                </span>
              </div>
            </Link>

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

            {/* Button (Click to Open Demo) */}
            <Link
              to="/home-beach"
              className="px-6 py-3 rounded-full border border-white/30 bg-black/40 hover:bg-black/60 text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 backdrop-blur-sm transition-all duration-300 group"
            >
              <span>Get Started Now</span>
              <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
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

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/home-beach"
              className="px-8 py-3.5 rounded-full bg-[#E5C39C] hover:bg-[#dba878] text-slate-900 text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 animate-shimmer-sweep"
            >
              <span>Explore Flagship Demo</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => scrollToSection("homepages-grid")}
              className="px-6 py-3.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 backdrop-blur-sm transition-all"
            >
              <span>View All 8 Homepages</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
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
      {/* 9. DYNAMIC FLOATING DOCK (QUICK NAVIGATION & SCROLL PROGRESS)             */}
      {/* ========================================================================= */}
      {scrollY > 300 && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-slate-950/85 backdrop-blur-xl border border-white/15 px-3 py-2 rounded-full shadow-2xl animate-slide-up">
          <button
            onClick={() => scrollToSection("homepages")}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            Demos
          </button>
          <button
            onClick={() => scrollToSection("inner-pages")}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            Pages
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            Categories
          </button>

          {/* Scroll to Top Circular Progress Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#E5C39C] transition-colors relative"
            title="Scroll to Top"
          >
            <LuArrowUpRight className="w-3.5 h-3.5 transform -rotate-45" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. MODALS: FULLSCREEN SANDBOX, VIDEO PREVIEW & ALL INNER PAGES DIRECTORY */}
      {/* ========================================================================= */}

      {/* A. Fullscreen Interactive Sandbox Preview Modal */}
      {fullscreenSandboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white animate-fadeIn">
          {/* Sandbox Top Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-xs font-semibold text-slate-300">
                {currentDemo.number}: {currentDemo.title}
              </span>
            </div>

            {/* Viewport Toggles in Sandbox */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1 rounded-lg border border-white/10">
              <button
                onClick={() => setMockupViewport("desktop")}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  mockupViewport === "desktop"
                    ? "bg-amber-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LuMonitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setMockupViewport("tablet")}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  mockupViewport === "tablet"
                    ? "bg-amber-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LuTablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setMockupViewport("mobile")}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  mockupViewport === "mobile"
                    ? "bg-amber-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LuSmartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={currentDemo.path}
                className="px-3 py-1 rounded-full bg-[#E5C39C] text-slate-900 text-xs font-semibold hover:bg-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Open Full Page</span>
                <LuExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => setFullscreenSandboxOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sandbox Frame Container */}
          <div className="flex-1 bg-slate-950 p-4 flex items-center justify-center overflow-auto">
            <div
              className={`h-full bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col ${
                mockupViewport === "desktop"
                  ? "w-full max-w-6xl"
                  : mockupViewport === "tablet"
                  ? "w-[768px]"
                  : "w-[390px]"
              }`}
            >
              <iframe
                src={currentDemo.path}
                title={`Live Preview of ${currentDemo.title}`}
                className="w-full flex-1 border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* B. Video Preview Modal */}
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

      {/* C. Header Instant Search Modal */}
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

      {/* D. All Inner Pages Directory Modal */}
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
