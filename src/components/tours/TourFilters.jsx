import {
  LuRotateCcw as RotateCcw,
  LuDollarSign as DollarSign,
  LuCompass as Compass,
  LuClock as Clock,
  LuActivity as Activity,
  LuSearch as Search,
  LuCheck as Check
} from "react-icons/lu";
import Button from "../common/Button";
import { 
  TOUR_CATEGORIES, 
  TOUR_DURATIONS, 
  TOUR_ACTIVITY_LEVELS 
} from "../../constants/travelFilters";

export default function TourFilters({
  filters,
  onChange,
  onReset,
  className = "",
}) {
  const {
    search = "",
    category = "all",
    duration = "all",
    activityLevel = "all",
    priceRange = [0, 100000],
  } = filters;

  const handleFieldChange = (field, value) => {
    onChange(field, value);
  };

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    (category !== "all" ? 1 : 0) +
    (duration !== "all" ? 1 : 0) +
    (activityLevel !== "all" ? 1 : 0) +
    (priceRange[1] < 100000 ? 1 : 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
            Filter Expeditions
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {activeFiltersCount > 0 ? `${activeFiltersCount} filter(s) applied` : "Refine your journey"}
          </p>
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-bold text-[#997548] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white uppercase tracking-wider cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label htmlFor="tour-search-filter" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Search className="h-3.5 w-3.5 text-[#C5A880]" />
          <span>Search</span>
        </label>
        <input
          id="tour-search-filter"
          type="text"
          placeholder="Keywords, places, yachts..."
          value={search}
          onChange={(e) => handleFieldChange("search", e.target.value)}
          aria-label="Search tours by keywords"
          className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0c1322] px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/20"
        />
      </div>

      {/* Category Pills */}
      <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Compass className="h-3.5 w-3.5 text-[#C5A880]" />
          <span>Category</span>
        </label>
        <div className="flex flex-col gap-1">
          {TOUR_CATEGORIES.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFieldChange("category", cat.id)}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-all text-left cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 font-semibold shadow-xs"
                    : "bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-[#C5A880] dark:text-slate-950" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration Dropdown */}
      <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label htmlFor="tour-duration-select" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-[#C5A880]" />
          <span>Duration</span>
        </label>
        <select
          id="tour-duration-select"
          value={duration}
          onChange={(e) => handleFieldChange("duration", e.target.value)}
          aria-label="Select tour duration"
          className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1322] px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:border-[#C5A880] focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/20 cursor-pointer"
        >
          {TOUR_DURATIONS.map((dur) => (
            <option key={dur.id} value={dur.id} className="dark:bg-slate-900">
              {dur.label}
            </option>
          ))}
        </select>
      </div>

      {/* Activity Level Dropdown */}
      <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label htmlFor="tour-level-select" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Activity className="h-3.5 w-3.5 text-[#C5A880]" />
          <span>Activity Level</span>
        </label>
        <select
          id="tour-level-select"
          value={activityLevel}
          onChange={(e) => handleFieldChange("activityLevel", e.target.value)}
          aria-label="Select activity level"
          className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1322] px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:border-[#C5A880] focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/20 cursor-pointer"
        >
          {TOUR_ACTIVITY_LEVELS.map((lvl) => (
            <option key={lvl.id} value={lvl.id} className="dark:bg-slate-900">
              {lvl.label}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <label htmlFor="tour-price-range" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <span className="text-[#C5A880] font-bold text-xs">$</span>
            <span>Max Price / Guest</span>
          </label>
          <span className="font-serif text-sm font-bold text-slate-900 dark:text-[#dfcaa4]">
            ${priceRange[1].toLocaleString()}
          </span>
        </div>
        <input
          id="tour-price-range"
          type="range"
          min={5000}
          max={100000}
          step={2500}
          value={priceRange[1]}
          onChange={(e) => handleFieldChange("priceRange", [0, Number(e.target.value)])}
          aria-label="Filter maximum price per guest"
          className="w-full accent-[#C5A880] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
          <span>$5,000</span>
          <span>$100,000+</span>
        </div>
      </div>

      {/* Reset CTA */}
      {activeFiltersCount > 0 && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center"
            onClick={onReset}
            leftIcon={RotateCcw}
          >
            Clear Tour Filters
          </Button>
        </div>
      )}
    </div>
  );
}
