import { useState, useRef, useEffect } from "react";
import {
  LuRotateCcw as RotateCcw,
  LuDollarSign as DollarSign,
  LuUsers as Users,
  LuSparkles as Sparkles,
  LuX as X,
  LuChevronDown as ChevronDown,
  LuMapPin as MapPin,
  LuSlidersHorizontal as SlidersHorizontal,
  LuLayoutGrid as LayoutGrid,
  LuList as List,
  LuArrowUpDown as ArrowUpDown,
  LuCheck as Check
} from "react-icons/lu";
import { AMENITY_OPTIONS, CATEGORY_OPTIONS } from "../../constants/filters";

const DESTINATION_OPTIONS = [
  { id: "all", label: "All Destinations" },
  { id: "amalfi", label: "Amalfi Coast, Italy" },
  { id: "aspen", label: "Aspen Highlands, USA" },
  { id: "bali", label: "Ubud & Seminyak, Bali" },
  { id: "zermatt", label: "Zermatt, Switzerland" },
  { id: "santorini", label: "Oia Caldera, Greece" },
  { id: "kyoto", label: "Kyoto Bamboo, Japan" },
];

export default function RoomTopFilters({
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
  const {
    category = "all",
    destination = "all",
    maxPrice = 80000,
    minGuests = 1,
    selectedAmenities = [],
  } = filters;

  const [activeDropdown, setActiveDropdown] = useState(null); // 'dest' | 'price' | 'guests' | 'amenities' | null
  const containerRef = useRef(null);

  // Close popovers on outside click
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

  const handleCategoryClick = (catId) => {
    onChange({ ...filters, category: catId });
  };

  const handleDestinationChange = (destId) => {
    onChange({ ...filters, destination: destId });
    setActiveDropdown(null);
  };

  const handlePriceChange = (val) => {
    onChange({ ...filters, maxPrice: Number(val) });
  };

  const handleGuestsChange = (val) => {
    onChange({ ...filters, minGuests: Number(val) });
    setActiveDropdown(null);
  };

  const handleAmenityToggle = (key) => {
    const nextAmenities = selectedAmenities.includes(key)
      ? selectedAmenities.filter((k) => k !== key)
      : [...selectedAmenities, key];
    onChange({ ...filters, selectedAmenities: nextAmenities });
  };

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (destination !== "all" ? 1 : 0) +
    (maxPrice < 80000 ? 1 : 0) +
    (minGuests > 1 ? 1 : 0) +
    selectedAmenities.length;

  const selectedDestinationLabel =
    DESTINATION_OPTIONS.find((d) => d.id === destination)?.label || "Destination";

  return (
    <div className={`space-y-4 relative z-20 ${className}`} ref={containerRef}>
      {/* 1. Category Quick-Select Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
        {CATEGORY_OPTIONS.map((cat) => {
          const isSelected = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`shrink-0 rounded-sm px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#C5A880] text-slate-950 font-bold shadow-md shadow-[#C5A880]/20 scale-102"
                  : "bg-white dark:bg-[#0c1322] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 2. Main Top Filter & Control Panel */}
      <div className={`rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-xl p-4 sm:p-5 shadow-sm space-y-4 relative ${activeDropdown ? "z-30" : "z-10"}`}>
        <div className="flex flex-wrap items-center justify-between gap-3.5">
          {/* Left Side: Filter Dropdown Triggers */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Destination Dropdown */}
            <div className={`relative ${activeDropdown === "dest" ? "z-50" : "z-10"}`}>
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "dest" ? null : "dest")
                }
                className={`inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  destination !== "all"
                    ? "border-[#C5A880] bg-[#C5A880]/10 text-[#997548] dark:text-[#dfcaa4]"
                    : "border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] text-slate-700 dark:text-slate-200 hover:border-[#C5A880]"
                } ${activeDropdown === "dest" ? "ring-1 ring-[#C5A880] border-[#C5A880]" : ""}`}
              >
                <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>{destination === "all" ? "Location" : selectedDestinationLabel}</span>
                <ChevronDown
                  className={`h-3 w-3 text-slate-400 transition-transform ${
                    activeDropdown === "dest" ? "rotate-180 text-[#C5A880]" : ""
                  }`}
                />
              </button>

              {/* Destination Popover */}
              {activeDropdown === "dest" && (
                <div className="absolute left-0 top-full mt-2 z-50 w-60 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-2 shadow-2xl animate-fade-in-scale ring-1 ring-slate-900/5 dark:ring-white/10">
                  <div className="space-y-1">
                    {DESTINATION_OPTIONS.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => handleDestinationChange(dest.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                          destination === dest.id
                            ? "bg-[#C5A880]/15 text-[#997548] dark:text-[#dfcaa4] font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span>{dest.label}</span>
                        {destination === dest.id && (
                          <Check className="h-3.5 w-3.5 text-[#C5A880]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Range Dropdown */}
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
                    ? `Up to $${(maxPrice / 1000).toFixed(0)}k`
                    : "Price Range"}
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
                      Max Nightly Rate
                    </span>
                    <span className="font-serif font-bold text-slate-900 dark:text-[#dfcaa4]">
                      ${maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={15000}
                    max={80000}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full accent-[#C5A880] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>$15k</span>
                    <span>$45k</span>
                    <span>$80k+</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handlePriceChange(80000)}
                      className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
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

            {/* Guests Selector Dropdown */}
            <div className={`relative ${activeDropdown === "guests" ? "z-50" : "z-10"}`}>
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "guests" ? null : "guests")
                }
                className={`inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  minGuests > 1
                    ? "border-[#C5A880] bg-[#C5A880]/10 text-[#997548] dark:text-[#dfcaa4]"
                    : "border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] text-slate-700 dark:text-slate-200 hover:border-[#C5A880]"
                } ${activeDropdown === "guests" ? "ring-1 ring-[#C5A880] border-[#C5A880]" : ""}`}
              >
                <Users className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>{minGuests > 1 ? `${minGuests}+ Guests` : "Guests"}</span>
                <ChevronDown
                  className={`h-3 w-3 text-slate-400 transition-transform ${
                    activeDropdown === "guests" ? "rotate-180 text-[#C5A880]" : ""
                  }`}
                />
              </button>

              {/* Guests Popover */}
              {activeDropdown === "guests" && (
                <div className="absolute left-0 top-full mt-2 z-50 w-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-3 shadow-2xl animate-fade-in-scale ring-1 ring-slate-900/5 dark:ring-white/10 space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Minimum Guests
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleGuestsChange(num)}
                        className={`rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          minGuests === num
                            ? "bg-[#C5A880] text-slate-950 shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Multi-Select Popover */}
            <div className={`relative ${activeDropdown === "amenities" ? "z-50" : "z-10"}`}>
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "amenities" ? null : "amenities"
                  )
                }
                className={`inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  selectedAmenities.length > 0
                    ? "border-[#C5A880] bg-[#C5A880]/10 text-[#997548] dark:text-[#dfcaa4]"
                    : "border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] text-slate-700 dark:text-slate-200 hover:border-[#C5A880]"
                } ${activeDropdown === "amenities" ? "ring-1 ring-[#C5A880] border-[#C5A880]" : ""}`}
              >
                <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>
                  Amenities
                  {selectedAmenities.length > 0 ? ` (${selectedAmenities.length})` : ""}
                </span>
                <ChevronDown
                  className={`h-3 w-3 text-slate-400 transition-transform ${
                    activeDropdown === "amenities" ? "rotate-180 text-[#C5A880]" : ""
                  }`}
                />
              </button>

              {/* Amenities Popover */}
              {activeDropdown === "amenities" && (
                <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-2xl animate-fade-in-scale ring-1 ring-slate-900/5 dark:ring-white/10 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4]">
                      Suite Inclusions
                    </span>
                    {selectedAmenities.length > 0 && (
                      <button
                        type="button"
                        onClick={() => onChange({ ...filters, selectedAmenities: [] })}
                        className="text-[10px] font-bold text-slate-400 hover:text-rose-500"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {AMENITY_OPTIONS.map((item) => {
                      const checked = selectedAmenities.includes(item.key);
                      return (
                        <label
                          key={item.key}
                          className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none py-1"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleAmenityToggle(item.key)}
                            className="rounded border-slate-300 dark:border-slate-700 text-[#C5A880] focus:ring-[#C5A880] h-4 w-4 bg-white dark:bg-slate-900"
                          />
                          <span>{item.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Clear All Filters Button */}
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

          {/* Right Side: Results counter + Sort + View Switcher */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange && onSortChange(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] py-2 pl-3 pr-8 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#C5A880] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Suites</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
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

        {/* 3. Active Chips Row (if any amenities or filters applied) */}
        {activeFiltersCount > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
              Active Filters:
            </span>

            {category !== "all" && (
              <span
                onClick={() => handleCategoryClick("all")}
                className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2.5 py-1 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span>Type: {CATEGORY_OPTIONS.find((c) => c.id === category)?.label || category}</span>
                <X className="h-3 w-3" />
              </span>
            )}

            {destination !== "all" && (
              <span
                onClick={() => handleDestinationChange("all")}
                className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2.5 py-1 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span>Dest: {selectedDestinationLabel}</span>
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

            {minGuests > 1 && (
              <span
                onClick={() => handleGuestsChange(1)}
                className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2.5 py-1 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span>{minGuests}+ Guests</span>
                <X className="h-3 w-3" />
              </span>
            )}

            {selectedAmenities.map((key) => {
              const label = AMENITY_OPTIONS.find((a) => a.key === key)?.label || key;
              return (
                <span
                  key={key}
                  onClick={() => handleAmenityToggle(key)}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2.5 py-1 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  <span>{label}</span>
                  <X className="h-3 w-3" />
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Results Subtitle */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
        <p>
          Showing <strong className="text-slate-900 dark:text-white">{totalResults}</strong> luxury stays in list view
        </p>
      </div>
    </div>
  );
}
