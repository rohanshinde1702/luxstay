import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuCompass as Compass,
  LuHouse as Home,
  LuSearch as Search,
  LuArrowRight as ArrowRight,
  LuBed as Bed,
  LuMapPin as MapPin,
  LuPhone as Phone,
  LuSparkles as Sparkles,
  LuArrowLeft as ArrowLeft
} from "react-icons/lu";

export default function NotFoundPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | LuxStay Luxury Hotel & Resort";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#080d1a] dark:via-[#0b111e] dark:to-[#080d1a] text-slate-800 dark:text-slate-100 transition-colors relative overflow-hidden">
      
      {/* Ambient luxury glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-[#C5A880]/10 dark:bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
        
        {/* Subtle decorative emblem */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A880]/10 dark:bg-[#C5A880]/20 border border-[#C5A880]/30 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
            Error 404 · Destination Sequestered
          </span>
        </div>

        {/* Large 404 Display */}
        <div className="relative">
          <div className="font-serif text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#C5A880] to-[#7c5e3c] select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border border-[#C5A880]/40 flex items-center justify-center text-[#997548] dark:text-[#dfcaa4]">
              <Compass className="h-8 w-8 sm:h-10 sm:w-10 animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* 404 Title & Subtitle */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Sanctuary Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            The private villa, suite, or expedition you are attempting to access has either been relocated 
            or does not exist in our international registry.
          </p>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative shadow-sm rounded-lg">
            <input
              type="text"
              required
              placeholder="Search suites, destinations, or experiences..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 py-3.5 pl-4 pr-12 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-[#C5A880] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center justify-center rounded-md bg-[#0F172A] dark:bg-[#C5A880] px-4 text-white dark:text-slate-950 transition-colors hover:bg-[#C5A880] dark:hover:bg-[#dfcaa4] hover:text-slate-950 cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0F172A] dark:bg-[#C5A880] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white dark:text-slate-950 shadow-md transition-all hover:bg-[#C5A880] dark:hover:bg-[#dfcaa4] hover:text-slate-950 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Sanctuary</span>
          </Link>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 shadow-xs hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-all"
          >
            <span>Explore Suites</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Quick Links Suggestions */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Popular Sanctuaries &amp; Concierge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              to="/home-beach"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-all"
            >
              <Home className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Resort Home</span>
            </Link>
            <Link
              to="/rooms"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-all"
            >
              <Bed className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Suites &amp; Villas</span>
            </Link>
            <Link
              to="/destinations-map"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-all"
            >
              <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>World Map</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-all"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>24/7 Concierge</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
