import {
  LuRotateCcw as RotateCcw,
  LuDollarSign as DollarSign,
  LuUsers as Users,
  LuSparkles as Sparkles,
  LuX as X
} from "react-icons/lu";
import Button from "../common/Button";
import { AMENITY_OPTIONS, CATEGORY_OPTIONS } from "../../constants/filters";

export default function RoomFilters({
  filters,
  onChange,
  onReset,
  className = "",
}) {
  const {
    category = "all",
    maxPrice = 80000,
    minGuests = 1,
    selectedAmenities = [],
  } = filters;

  const handleCategoryClick = (catId) => {
    onChange({ ...filters, category: catId });
  };

  const handlePriceChange = (val) => {
    onChange({ ...filters, maxPrice: Number(val) });
  };

  const handleGuestsChange = (val) => {
    onChange({ ...filters, minGuests: Number(val) });
  };

  const handleAmenityToggle = (key) => {
    const nextAmenities = selectedAmenities.includes(key)
      ? selectedAmenities.filter((k) => k !== key)
      : [...selectedAmenities, key];
    onChange({ ...filters, selectedAmenities: nextAmenities });
  };

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (maxPrice < 80000 ? 1 : 0) +
    (minGuests > 1 ? 1 : 0) +
    selectedAmenities.length;

  return (
    <aside
      className={`rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs space-y-6 transition-colors ${className}`}
    >
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
            Filter Sanctuaries
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {activeFiltersCount > 0 ? `${activeFiltersCount} filter(s) applied` : "Refine your stay"}
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

      {/* Category Pills */}
      <div className="space-y-2.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Accommodation Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-xs font-bold"
                    : "bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
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
          min={15000}
          max={80000}
          step={1000}
          value={maxPrice}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="w-full accent-[#C5A880] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
          <span>$15,000 / nt</span>
          <span>$80,000+ / nt</span>
        </div>
      </div>

      {/* Guest Capacity */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Users className="h-3.5 w-3.5 text-[#C5A880]" />
          <span>Minimum Guests</span>
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[1, 2, 4, 6].map((num) => {
            const isSelected = minGuests === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => handleGuestsChange(num)}
                className={`rounded-md py-2 text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-xs font-bold"
                    : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {num}+
              </button>
            );
          })}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
          <span>Key Suite Inclusions</span>
        </label>
        <div className="space-y-2">
          {AMENITY_OPTIONS.map((item) => {
            const checked = selectedAmenities.includes(item.key);
            return (
              <label
                key={item.key}
                className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none"
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

      {/* Active Filter Badges */}
      {selectedAmenities.length > 0 && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Selected Inclusions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selectedAmenities.map((key) => {
              const label = AMENITY_OPTIONS.find((a) => a.key === key)?.label || key;
              return (
                <span
                  key={key}
                  onClick={() => handleAmenityToggle(key)}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-2 py-0.5 text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                >
                  <span>{label}</span>
                  <X className="h-3 w-3" />
                </span>
              );
            })}
          </div>
        </div>
      )}

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
