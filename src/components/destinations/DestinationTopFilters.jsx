import { useState, useRef, useEffect } from "react";
import {
  LuGlobe as Globe,
  LuRotateCcw as RotateCcw,
  LuSearch as Search,
  LuDollarSign as DollarSign,
  LuSlidersHorizontal as SlidersHorizontal,
  LuLayoutGrid as LayoutGrid,
  LuList as List,
  LuArrowUpDown as ArrowUpDown,
  LuX as X,
  LuChevronDown as ChevronDown,
  LuCheck as Check
} from "react-icons/lu";
import { DESTINATION_REGIONS } from "../../constants/travelFilters";

export default function DestinationTopFilters({
  filters,
  onChange,
  onReset,
  totalResults = 0,
  sortBy = "featured",
  onSortChange,
  viewMode = "list",
  onViewModeChange,
  className = "",
}) {
  const { region = "all", searchQuery = "", maxPrice = 80000 } = filters;
  const [activeDropdown, setActiveDropdown] = useState(null); // 'price' | null
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDropdown]);

  const handleRegionClick = (regId) => {
    onChange({ ...filters, region: regId });
  };

  const handleSearchChange = (val) => {
    onChange({ ...filters, searchQuery: val });
  };

  const handlePriceChange = (val) => {
    onChange({ ...filters, maxPrice: Number(val) });
  };

  const activeFiltersCount =
    (region !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (maxPrice < 80000 ? 1 : 0);

  const selectedRegionLabel =
    DESTINATION_REGIONS.find((r) => r.id === region)?.label.split(" (")[0] || "All Regions";

  return (
    <div className={`space-y-4 relative z-20 ${className}`} ref={containerRef}>
      {/* 1. Horizontal Region Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
        {DESTINATION_REGIONS.map((reg) => {
          const isSelected = region === reg.id;
          return (
            <button
              key={reg.id}
              type="button"
              onClick={() => handleRegionClick(reg.id)}
              className={`shrink-0 rounded-sm px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#C5A880] text-slate-950 font-bold shadow-md shadow-[#C5A880]/20 scale-102"
                  : "bg-white dark:bg-[#0c1322] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4]"
              }`}
            >
              {reg.label.split(" (")[0]}
            </button>
          );
        })}
      </div>

      {/* 2. Main Top Filter & Control Panel */}
      <div className={`rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-xl p-4 sm:p-5 shadow-sm space-y-4 relative ${activeDropdown ? "z-30" : "z-10"}`}>
        <div className="flex flex-wrap items-center justify-between gap-3.5">
          {/* Left Side: Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search sanctuaries, countries, cliffs..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] py-2 pl-9 pr-8 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:border-[#C5A880] focus:outline-hidden"
              />
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Price Filter Dropdown */}
            <div className={`relative ${activeDropdown === "price" ? "z-50" : "z-10"}`}>
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "price" ? null : "price")
                }
                className={`inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  maxPrice < 80000
                    ? "border-[#C5A880] bg-[#C5A880]/10 text-[#997548] dark:text-[#dfcaa4]"
                    : "border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] text-slate-700 dark:text-slate-200 hover:border-[#C5A880]"
                } ${activeDropdown === "price" ? "ring-1 ring-[#C5A880] border-[#C5A880]" : ""}`}
              >
                <span className="font-bold text-[#C5A880]">$</span>
                <span>
                  {maxPrice < 80000
                    ? `Max $${(maxPrice / 1000).toFixed(0)}k/nt`
                    : "Nightly Rate"}
                </span>
                <ChevronDown
                  className={`h-3 w-3 text-slate-400 transition-transform ${
                    activeDropdown === "price" ? "rotate-180 text-[#C5A880]" : ""
                  }`}
                />
              </button>

              {/* Price Popover */}
              {activeDropdown === "price" && (
                <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-2xl animate-fade-in-scale ring-1 ring-slate-900/5 dark:ring-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      Max Starting Rate
                    </span>
                    <span className="font-serif font-bold text-slate-900 dark:text-[#dfcaa4]">
                      ${maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={80000}
                    step={2000}
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full accent-[#C5A880] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>$10k</span>
                    <span>$45k</span>
                    <span>$80k+</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handlePriceChange(80000)}
                      className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(null)}
                      className="px-3 py-1 bg-[#C5A880] text-slate-950 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#dfcaa4] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 px-3 py-2 text-xs font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Right Side: Sort + View Switcher */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange && onSortChange(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] py-2 pl-3 pr-8 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#C5A880] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Destinations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="properties">Most Stays</option>
              </select>
            </div>

            {/* View Mode Switcher (Grid / List) */}
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => onViewModeChange && onViewModeChange("grid")}
                className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange && onViewModeChange("list")}
                className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Active Chips Row */}
        {activeFiltersCount > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
              Active Filters:
            </span>

            {region !== "all" && (
              <span
                onClick={() => handleRegionClick("all")}
                className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2.5 py-1 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span>Region: {selectedRegionLabel}</span>
                <X className="h-3 w-3" />
              </span>
            )}

            {searchQuery && (
              <span
                onClick={() => handleSearchChange("")}
                className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2.5 py-1 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span>Search: "{searchQuery}"</span>
                <X className="h-3 w-3" />
              </span>
            )}

            {maxPrice < 80000 && (
              <span
                onClick={() => handlePriceChange(80000)}
                className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2.5 py-1 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span>Max: ${maxPrice.toLocaleString()}</span>
                <X className="h-3 w-3" />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Subtitle */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
        <p>
          Showing <strong className="text-slate-900 dark:text-white">{totalResults}</strong> luxury destinations in list view
        </p>
      </div>
    </div>
  );
}
