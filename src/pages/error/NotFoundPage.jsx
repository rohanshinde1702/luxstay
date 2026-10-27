import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuCompass as Compass,
  LuHouse as Home,
  LuSearch as Search,
  LuArrowRight as ArrowRight,
  LuBed as Bed,
  LuMapPin as MapPin,
  LuPhone as Phone
} from "react-icons/lu";

export default function NotFoundPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Subtle decorative emblem */}
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548] ring-1 ring-[#C5A880]/30 shadow-inner">
          <Compass className="h-8 w-8 animate-spin-slow" />
        </div>

        {/* 404 Title */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
            Error Code 404
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The sanctuary or destination you are attempting to reach has either been relocated 
            or does not exist in our registry.
          </p>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Search rooms, destinations, or experiences..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white py-3.5 pl-4 pr-12 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-[#C5A880] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/20"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 top-2 bottom-2 flex items-center justify-center rounded-md bg-[#0F172A] px-3 text-white transition-colors hover:bg-[#C5A880] hover:text-slate-900"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Quick Links Suggestions */}
        <div className="pt-4 border-t border-slate-100 max-w-lg mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Suggested Destinations & Concierge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200/80 bg-white p-2.5 text-xs font-medium text-slate-700 shadow-xs hover:border-[#C5A880] hover:text-[#997548] transition-all"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <Link
              to="/rooms"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200/80 bg-white p-2.5 text-xs font-medium text-slate-700 shadow-xs hover:border-[#C5A880] hover:text-[#997548] transition-all"
            >
              <Bed className="h-3.5 w-3.5" />
              <span>Suites</span>
            </Link>
            <Link
              to="/destinations"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200/80 bg-white p-2.5 text-xs font-medium text-slate-700 shadow-xs hover:border-[#C5A880] hover:text-[#997548] transition-all"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Destinations</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200/80 bg-white p-2.5 text-xs font-medium text-slate-700 shadow-xs hover:border-[#C5A880] hover:text-[#997548] transition-all"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Concierge</span>
            </Link>
          </div>
        </div>

        {/* Return Button */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-[#0F172A] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#C5A880] hover:text-slate-900 hover:shadow-xl"
          >
            <span>Return To Sanctuary</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
