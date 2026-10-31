import {
  LuGlobe as Globe,
  LuRotateCcw as RotateCcw,
  LuSearch as Search,
  LuDollarSign as DollarSign,
  LuMapPin as MapPin
} from "react-icons/lu";
import { DESTINATION_REGIONS } from "../../constants/travelFilters";
import Button from "../common/Button";

export default function DestinationSidebarFilters({
  filters,
  onChange,
  onReset,
  totalResults = 0,
  className = "",
}) {
  const { region = "all", searchQuery = "", maxPrice = 80000 } = filters;

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

  return (
    <aside
      className={`rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs space-y-6 transition-colors ${className}`}
    >
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
            Explore Regions
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {activeFiltersCount > 0 ? `${activeFiltersCount} filter(s) applied` : "Global Sanctuaries"}
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

      {/* Search Input */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Search Destination
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="e.g. Amalfi, Bali, Alps..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#070b14] py-2.5 pl-9 pr-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:border-[#C5A880] focus:outline-hidden"
          />
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Region Selection */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Globe className="h-3.5 w-3.5 text-[#C5A880]" />
          <span>Continents & Regions</span>
        </label>
        <div className="space-y-1">
          {DESTINATION_REGIONS.map((reg) => {
            const isSelected = region === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => handleRegionClick(reg.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#C5A880] text-slate-950 font-bold shadow-xs"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }`}
              >
                <span className="truncate">{reg.label.split(" (")[0]}</span>
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-950 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Starting Price Slider */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <span className="text-[#C5A880] font-bold text-xs">$</span>
            <span>Max Price Per Night</span>
          </label>
          <span className="font-serif text-sm font-bold text-slate-900 dark:text-[#dfcaa4]">
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
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
          <span>$10,000</span>
          <span>$80,000+</span>
        </div>
      </div>

      {/* Clear Filters CTA */}
      {activeFiltersCount > 0 && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onReset}
            leftIcon={RotateCcw}
          >
            Clear All Criteria
          </Button>
        </div>
      )}
    </aside>
  );
}
