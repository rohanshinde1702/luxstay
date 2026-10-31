import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuSparkles,
  LuCrown,
  LuZap,
  LuLayers,
  LuLayoutGrid,
  LuSmartphone,
  LuCode,
  LuArrowUp,
  LuExternalLink,
  LuShieldCheck,
  LuCompass,
  LuCalendarCheck,
  LuSlidersHorizontal,
  LuUserCheck
} from "react-icons/lu";

// 8 Curated Luxury Homepage Demos (4-Grid Layout)
const HOME_DEMOS = [
  {
    id: "home-beach",
    title: "Beach & Island Resort",
    subtitle: "Overwater Villas & Plunge Pools",
    badge: "Flagship",
    path: "/home-beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "home-hotel",
    title: "Flagship Grand Hotel",
    subtitle: "Palace Suites & Sommelier Cellar",
    badge: "5-Star Palace",
    path: "/home-hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "home-resort",
    title: "Wellness Spa & Pavilion",
    subtitle: "Thermal Springs & Hydrotherapy",
    badge: "Spa & Retreat",
    path: "/home-resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "home-travel",
    title: "Travel Agency & Tours",
    subtitle: "Bespoke Expeditions & Charters",
    badge: "Curated Tours",
    path: "/home-travel",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "home-boutique",
    title: "Boutique Heritage Hotel",
    subtitle: "Artisanal Chic & Tailored Luxury",
    badge: "Boutique Chic",
    path: "/home-boutique",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "home-villa",
    title: "Private Alpine Chalet",
    subtitle: "Mountain Slopes & Secluded Haven",
    badge: "Exclusive Chalet",
    path: "/home-villa",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "home-modern",
    title: "Modern Skyline Hotel",
    subtitle: "Metropolitan Towers & Penthouse",
    badge: "Metropolitan",
    path: "/home-modern",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "home-dark",
    title: "Dark Royal Palace",
    subtitle: "Midnight Opulence & Velvet Lights",
    badge: "Royal Dark",
    path: "/home-dark",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
];

// Inner Pages Collection (3-Column Grid Matching Structure)
const INNER_PAGES = [
  {
    id: "about",
    title: "About Our Heritage",
    subtitle: "Brand story & 5-star philosophy",
    category: "about",
    path: "/about",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "services",
    title: "Guest Services & Amenities",
    subtitle: "Butler, private yacht & concierge",
    category: "services",
    path: "/services",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "service-details",
    title: "Fine Dining & Sommelier",
    subtitle: "Michelin-star culinary experiences",
    category: "services",
    path: "/services-dining",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rooms-grid",
    title: "Suites & Villas Grid",
    subtitle: "Filterable luxury accommodation",
    category: "rooms",
    path: "/rooms",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rooms-list",
    title: "Suites List View",
    subtitle: "Detailed amenities & pricing comparison",
    category: "rooms",
    path: "/rooms-list",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "room-details",
    title: "Suite Single Details",
    subtitle: "360 tour, gallery & instant booking",
    category: "rooms",
    path: "/room/deluxe-ocean-suite",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "destinations",
    title: "World Destinations",
    subtitle: "Global luxury properties & resorts",
    category: "destinations",
    path: "/destinations",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "destination-map",
    title: "Interactive World Map",
    subtitle: "Live Leaflet map with custom pins",
    category: "destinations",
    path: "/destinations-map",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "destination-details",
    title: "Destination Guide",
    subtitle: "Island attractions, climate & tours",
    category: "destinations",
    path: "/destination/bali-indonesia",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tours",
    title: "Curated Expeditions",
    subtitle: "Private charters & cultural journeys",
    category: "tours",
    path: "/tours",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tour-details",
    title: "Tour Dossier & Itinerary",
    subtitle: "Day-by-day itinerary & bookings",
    category: "tours",
    path: "/tour/amalfi-private-yacht",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "activities",
    title: "Resort Experiences",
    subtitle: "Scuba diving, yoga & helicopter charters",
    category: "tours",
    path: "/activities",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gallery",
    title: "Curated Photo Gallery",
    subtitle: "Grid layout with lightbox preview",
    category: "gallery",
    path: "/gallery",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gallery-masonry",
    title: "Masonry Visual Showcase",
    subtitle: "Dynamic fluid photo masonry wall",
    category: "gallery",
    path: "/gallery-masonry",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "offers",
    title: "Seasonal Offers & Packages",
    subtitle: "Honeymoon & extended stay discounts",
    category: "rooms",
    path: "/offers",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "blog",
    title: "Travel Journal & Articles",
    subtitle: "Luxury lifestyle, destinations & guides",
    category: "blog",
    path: "/blog",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "blog-details",
    title: "Editorial Article Post",
    subtitle: "Typography, comments & related posts",
    category: "blog",
    path: "/blog/amalfi-coast-hidden-gems",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "team",
    title: "Concierge & Leadership",
    subtitle: "Executive team & personal concierges",
    category: "about",
    path: "/about-v3",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "contact",
    title: "Concierge & Contact",
    subtitle: "Direct inquiry form, phone & map",
    category: "contact",
    path: "/contact",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dashboard",
    title: "Guest Member Portal",
    subtitle: "Personal info, booked stays & vouchers",
    category: "utility",
    path: "/dashboard",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "admin-dashboard",
    title: "Admin Management Suite",
    subtitle: "Track live bookings, revenue & accounts",
    category: "utility",
    path: "/admin/dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "404",
    title: "Luxury 404 Error Page",
    subtitle: "Bespoke page-not-found screen with search",
    category: "utility",
    path: "/404",
    isLuxury404: true,
  },
];

// Inner category filter tags
const CATEGORIES = [
  { key: "all", label: "All Pages" },
  { key: "rooms", label: "Suites & Rooms" },
  { key: "destinations", label: "Destinations" },
  { key: "tours", label: "Tours & Expeditions" },
  { key: "services", label: "Services & Dining" },
  { key: "blog", label: "Journal & Blog" },
  { key: "about", label: "Heritage & Team" },
  { key: "utility", label: "Portals & Utility" },
];

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToDemos = () => {
    const el = document.getElementById("demos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredInnerPages =
    selectedCategory === "all"
      ? INNER_PAGES
      : INNER_PAGES.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FAF9F6] text-slate-800 font-sans selection:bg-[#c5a880]/30 selection:text-[#7c5e3c] min-h-screen relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. TOP MARKETPLACE LIVE PREVIEW BAR                       */}
      {/* ========================================================= */}
      <header className="bg-[#1e293b] text-white text-xs py-2.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 border-b border-slate-700/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className="text-[#82b440] font-black text-sm">envato</span>
            <span className="text-slate-300 font-normal">market</span>
          </div>
          <span className="hidden sm:inline-block w-px h-3.5 bg-slate-600" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 text-[11px]">
            <LuCrown className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>LuxStay – Luxury Hotel &amp; Resort React 19 Template</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToDemos}
            className="text-slate-300 hover:text-white text-[11px] font-medium transition-colors hidden md:inline-block cursor-pointer"
          >
            Explore Demos
          </button>
          <a
            href="#demos"
            onClick={(e) => {
              e.preventDefault();
              scrollToDemos();
            }}
            className="bg-[#82b440] hover:bg-[#729e38] text-white font-bold text-[11px] px-4 py-1.5 rounded transition-all shadow-xs"
          >
            Purchase Template
          </a>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. SHOWCASE HERO SECTION                                  */}
      {/* ========================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center bg-white border-b border-slate-200/70">
        
        {/* Subtle luxury ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-slate-100 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Centered Brand Crest */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F6] border border-[#c5a880]/40 shadow-xs">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c5a880] text-white">
              <LuCrown className="h-3 w-3" />
            </span>
            <span className="font-serif font-bold text-slate-900 tracking-wider text-xs uppercase">
              Lux<span className="text-[#c5a880]">Stay</span> · 5-Star Hospitality Theme
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
            The Ultimate React Template for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b59367] via-[#c5a880] to-[#7c5e3c]">
              Luxury Hotels &amp; Resorts
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            A premier, production-ready website template crafted for 5-star grand hotels, tropical island sanctuaries, private alpine villas, wellness spas, and curated travel agencies.
          </p>

          {/* Technology Badges Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-700 text-xs font-semibold">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#c5a880] shadow-xs">
                <LuZap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">Vite 8</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-sky-600 shadow-xs">
                <LuCode className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">React 19</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-teal-600 shadow-xs">
                <LuLayers className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">Tailwind v4</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-amber-600 shadow-xs">
                <LuLayoutGrid className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">8+ Demos</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#7c5e3c] shadow-xs">
                <LuShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">Admin Panel</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-rose-600 shadow-xs">
                <LuSmartphone className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">Responsive</span>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToDemos}
              className="px-7 py-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Explore Demos
            </button>
            <Link
              to="/rooms"
              className="px-6 py-3 rounded-lg bg-[#c5a880] hover:bg-[#b59367] text-white font-semibold text-xs tracking-wider transition-colors flex items-center gap-1.5 shadow-md shadow-[#c5a880]/20"
            >
              <span>Explore All Suites</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. HOME PAGES DEMOS (4-GRID DYNAMIC LAYOUT)               */}
      {/* ========================================================= */}
      <section id="demos" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#c5a880] uppercase">
            Curated Concepts
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            8 Handcrafted Homepage Demos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Click on any demo card to launch the full live interactive resort experience.
          </p>
        </div>

        {/* 4-Column Grid for Homepages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {HOME_DEMOS.map((demo) => (
            <Link
              key={demo.id}
              to={demo.path}
              className="group block rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              {/* Browser Mockup Window Bar */}
              <div className="bg-slate-100/90 px-3 py-2 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight truncate max-w-[130px]">
                  luxstay.com{demo.path}
                </span>
                <LuExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#c5a880] transition-colors" />
              </div>

              {/* Homepage Image Preview */}
              <div className="relative aspect-[16/11] bg-slate-100 overflow-hidden">
                <img
                  src={demo.image}
                  alt={demo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                />
                {demo.badge && (
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-[#0f172a]/90 backdrop-blur-xs text-[10px] font-semibold text-[#c5a880] shadow-xs">
                    {demo.badge}
                  </span>
                )}
              </div>

              {/* Title Below Card */}
              <div className="p-4 text-center border-t border-slate-100 bg-white">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#c5a880] transition-colors">
                  {demo.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {demo.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. VALUE & CORE CAPABILITIES STRIP                        */}
      {/* ========================================================= */}
      <section className="py-12 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">08+</span>
            <p className="text-xs text-slate-500 font-medium">Home Concepts</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#c5a880]">30+</span>
            <p className="text-xs text-slate-500 font-medium">Pre-built Inner Pages</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">100%</span>
            <p className="text-xs text-slate-500 font-medium">Responsive Layouts</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#c5a880]">LocalDB</span>
            <p className="text-xs text-slate-500 font-medium">Pre-wired LocalStorage</p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. AWESOME INNER PAGES (3-COLUMN GRID MATCHING STRUCTURE) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold tracking-widest text-[#c5a880] uppercase">
            Complete Experience
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Thoughtfully Crafted Inner Pages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Explore dedicated pages for room reservations, destinations, excursions, dining, and portals.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-[#0f172a] text-white shadow-xs font-semibold"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Grid for Inner Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredInnerPages.map((page) => (
            <Link
              key={page.id}
              to={page.path}
              className="group block rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              {/* Browser Dots Bar */}
              <div className="bg-slate-100/90 px-3.5 py-2 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight truncate max-w-[140px]">
                  {page.path}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-[#c5a880] transition-colors">
                  Open →
                </span>
              </div>

              {/* Page Preview Thumbnail */}
              {page.isLuxury404 ? (
                /* Luxury 404 Preview Card */
                <div className="aspect-[16/11] bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center text-white border-b border-slate-800">
                  <span className="text-4xl font-serif font-extrabold text-[#c5a880] tracking-tight">404</span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 mt-1">Page Not Found</p>
                  <span className="mt-3 px-3 py-1 rounded bg-[#c5a880] text-slate-950 text-[10px] font-bold">
                    Return to Sanctuary
                  </span>
                </div>
              ) : (
                <div className="aspect-[16/11] bg-slate-100 overflow-hidden">
                  <img
                    src={page.image}
                    alt={page.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
              )}

              {/* Title Below Card */}
              <div className="p-4 text-center border-t border-slate-100 bg-white">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#c5a880] transition-colors">
                  {page.title}
                </h3>
                {page.subtitle && (
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {page.subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. HOSPITALITY SUITE HIGHLIGHTS                           */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200/80 mb-16 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#c5a880] uppercase">
            Turnkey Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Built for High-Converting Hospitality
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#997548]">
              <LuCalendarCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Direct Reservation Flow</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Step-by-step room booking with date picker, guest selection, and instant confirmation.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#997548]">
              <LuShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Admin Control Panel</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated dashboard tracking real-time guest logins, room stays, tours, and revenue metrics.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#997548]">
              <LuUserCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Guest Member Portal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Allow clients to manage their personal profile, view booked packages, and download stay dossiers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#997548]">
              <LuCompass className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Interactive Leaflet Map</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Global resort destination pins with interactive popups, directions, and direct filters.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#997548]">
              <LuSlidersHorizontal className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Swiper Slider Galleries</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Touch-enabled responsive carousels for suites, reviews, hero spotlights, and masonry walls.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#997548]">
              <LuSparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">React 19 &amp; Tailwind v4</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Lightning fast build times, 0 lint errors, clean component tree, and production ready code.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. BOTTOM CALL TO ACTION                                  */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 text-center bg-[#0f172a] text-white relative">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold tracking-widest text-[#c5a880] uppercase">
            Start Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Launch Your Luxury Hospitality Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Empower your hotel or resort with a sophisticated, conversion-optimized web presence built with modern React.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#demos"
              onClick={(e) => {
                e.preventDefault();
                scrollToDemos();
              }}
              className="px-8 py-3.5 rounded-lg bg-[#c5a880] hover:bg-[#b59367] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Purchase LuxStay Template
            </a>
            <Link
              to="/home-beach"
              className="px-6 py-3.5 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-200 hover:text-white font-semibold text-xs tracking-wider transition-colors"
            >
              Launch Flagship Resort
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. MINIMAL CLEAN FOOTER                                   */}
      {/* ========================================================= */}
      <footer className="border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} LuxStay – Luxury Hotel &amp; Resort React 19 Template.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/home-beach" className="hover:text-slate-900 transition-colors">Demos</Link>
            <span>·</span>
            <Link to="/rooms" className="hover:text-slate-900 transition-colors">Suites</Link>
            <span>·</span>
            <Link to="/destinations" className="hover:text-slate-900 transition-colors">Destinations</Link>
            <span>·</span>
            <Link to="/dashboard" className="hover:text-slate-900 transition-colors">Guest Portal</Link>
            <span>·</span>
            <Link to="/admin/dashboard" className="hover:text-slate-900 transition-colors">Admin Panel</Link>
            <span>·</span>
            <Link to="/404" className="hover:text-slate-900 transition-colors">404 Error</Link>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 9. FLOATING SCROLL TO TOP BUTTON                          */}
      {/* ========================================================= */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-white text-slate-700 hover:text-[#c5a880] shadow-lg border border-slate-200 flex items-center justify-center transition-all cursor-pointer hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <LuArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
