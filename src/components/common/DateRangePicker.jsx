import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LuCalendar as CalendarIcon, LuChevronDown as ChevronDown, LuX as X, LuCheck as Check } from "react-icons/lu";
import { formatToISODate, formatDisplayDate, parseDate } from "./DatePicker";

/**
 * Custom Luxury DateRangePicker for Check-in & Check-out Stay Selection
 */
export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onRangeChange,
  minDate,
  startLabel = "Check-in",
  endLabel = "Check-out",
  labelClassName,
  buttonClassName,
  hideIcon = false,
  chevronClassName = "",
  splitGridClassName = "grid grid-cols-2 gap-3",
  required = false,
  className = "",
  variant = "split", // 'split' (2 separate inputs) | 'combined' (single combined bar)
  align = "left",
  direction = "auto", // 'auto' | 'down' | 'up'
}) {
  const [activePicker, setActivePicker] = useState(null); // 'start' | 'end' | 'combined' | null
  const [isDropUp, setIsDropUp] = useState(false);
  const containerRef = useRef(null);

  const parsedStart = parseDate(startDate);
  const parsedEnd = parseDate(endDate);
  const today = parseDate(minDate) || new Date();

  // Calculate nights
  const calculateNights = () => {
    if (!parsedStart || !parsedEnd) return 0;
    const diff = parsedEnd.getTime() - parsedStart.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();

  // Handle position calculation and outside clicks
  useEffect(() => {
    if (!activePicker) return;

    if (direction === "up") {
      setIsDropUp(true);
    } else if (direction === "down") {
      setIsDropUp(false);
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 370px below and more space above, open upward
      if (spaceBelow < 370 && rect.top > 370) {
        setIsDropUp(true);
      } else {
        setIsDropUp(false);
      }
    }

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActivePicker(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActivePicker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePicker, direction]);

  const handleStartSelect = (date) => {
    const iso = formatToISODate(date);
    if (onStartDateChange) {
      onStartDateChange({ target: { name: "checkIn", value: iso } });
    }
    if (onRangeChange) {
      onRangeChange({ startDate: iso, endDate });
    }

    // If selected check-in is >= current check-out, automatically bump check-out by 2 days
    if (parsedEnd && date >= parsedEnd) {
      const nextEnd = new Date(date);
      nextEnd.setDate(nextEnd.getDate() + 2);
      const nextEndIso = formatToISODate(nextEnd);
      if (onEndDateChange) {
        onEndDateChange({ target: { name: "checkOut", value: nextEndIso } });
      }
    }

    setActivePicker("end");
  };

  const handleEndSelect = (date) => {
    const iso = formatToISODate(date);
    if (onEndDateChange) {
      onEndDateChange({ target: { name: "checkOut", value: iso } });
    }
    if (onRangeChange) {
      onRangeChange({ startDate, endDate: iso });
    }
    setActivePicker(null);
  };

  const handleClear = (e) => {
    if (e) e.stopPropagation();
    if (onStartDateChange) {
      onStartDateChange({ target: { name: "checkIn", value: "" } });
    }
    if (onEndDateChange) {
      onEndDateChange({ target: { name: "checkOut", value: "" } });
    }
    if (onRangeChange) {
      onRangeChange({ startDate: "", endDate: "" });
    }
    setActivePicker(null);
  };

  // Combined Single Bar Variant (Great for horizontal search widgets)
  if (variant === "combined") {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        <button
          type="button"
          onClick={() => setActivePicker(activePicker ? null : "combined")}
          className={buttonClassName || "flex w-full items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"}
        >
          <div className="flex items-center gap-2 truncate">
            {!hideIcon && <CalendarIcon className="h-4 w-4 text-[#C5A880] shrink-0" />}
            <span className="truncate">
              {startDate ? formatDisplayDate(startDate) : "Check-in"} — {endDate ? formatDisplayDate(endDate) : "Check-out"}
            </span>
            {nights > 0 && (
              <span className="hidden sm:inline-block rounded bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-1.5 py-0.5 text-[10px] font-bold text-[#997548] dark:text-[#dfcaa4]">
                {nights} night{nights > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 shrink-0 ${chevronClassName || "text-slate-400"} ${activePicker ? "rotate-180 text-[#C5A880]" : ""}`} />
        </button>

        {activePicker && (
          <div
            className={`absolute ${
              align === "right" ? "right-0" : "left-0"
            } ${
              isDropUp ? "bottom-full mb-3" : "top-full mt-3"
            } z-[999] w-[320px] sm:w-[350px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-2xl animate-fade-in-scale ring-1 ring-slate-900/10 dark:ring-white/10`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
                Select Stay Dates
              </span>
              <div className="flex items-center gap-1.5">
                {(startDate || endDate) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActivePicker(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <Calendar
              selectRange={true}
              value={[parsedStart || today, parsedEnd || new Date(today.getTime() + 86400000 * 3)]}
              onChange={(range) => {
                if (Array.isArray(range) && range[0] && range[1]) {
                  const startIso = formatToISODate(range[0]);
                  const endIso = formatToISODate(range[1]);
                  if (onStartDateChange) onStartDateChange({ target: { name: "checkIn", value: startIso } });
                  if (onEndDateChange) onEndDateChange({ target: { name: "checkOut", value: endIso } });
                  if (onRangeChange) onRangeChange({ startDate: startIso, endDate: endIso });
                  setActivePicker(null);
                }
              }}
              minDate={today}
              prev2Label={null}
              next2Label={null}
            />

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">
                {nights > 0 ? (
                  <>Stay: <strong className="text-slate-900 dark:text-white">{nights} Nights</strong></>
                ) : (
                  "Select Check-in & Check-out"
                )}
              </span>
              <div className="flex items-center gap-1.5">
                {(startDate || endDate) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-800 font-semibold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActivePicker(null)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#C5A880] text-slate-950 font-bold text-[10px] uppercase tracking-wider hover:bg-[#dfcaa4] transition-colors cursor-pointer"
                >
                  <Check className="h-3 w-3" />
                  <span>Apply Dates</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Native Inputs for standard HTML5 validation */}
        <input
          type="text"
          name="startDate"
          value={startDate || ""}
          required={required}
          readOnly
          onChange={() => {}}
          className="absolute opacity-0 pointer-events-none w-px h-px bottom-0 left-1/4"
        />
        <input
          type="text"
          name="endDate"
          value={endDate || ""}
          required={required}
          readOnly
          onChange={() => {}}
          className="absolute opacity-0 pointer-events-none w-px h-px bottom-0 left-3/4"
        />
      </div>
    );
  }

  // Split 2-Column Grid Variant
  const defaultSplitButtonClass = (isActive) =>
    `flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0a0f1d] px-3.5 py-2.5 text-left text-xs font-medium transition-all cursor-pointer hover:border-[#C5A880] ${
      isActive ? "border-[#C5A880] ring-1 ring-[#C5A880]" : ""
    }`;

  return (
    <div className={`${splitGridClassName} relative ${className}`} ref={containerRef}>
      {/* Check-in Column */}
      <div className="space-y-1.5">
        <label className={labelClassName || "block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"}>
          {startLabel} {required && typeof startLabel === "string" && <span className="text-[#C5A880]">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setActivePicker(activePicker === "start" ? null : "start")}
          className={buttonClassName ? `${buttonClassName} flex items-center justify-between ${activePicker === "start" ? "border-[#C5A059] ring-1 ring-[#C5A059]" : ""}` : defaultSplitButtonClass(activePicker === "start")}
        >
          <div className="flex items-center gap-2 truncate">
            {!hideIcon && <CalendarIcon className="h-4 w-4 text-[#C5A880] shrink-0" />}
            <span className={startDate ? "" : "text-white/60 dark:text-white/60 text-slate-400"}>
              {startDate ? formatDisplayDate(startDate) : "Select Check-in"}
            </span>
          </div>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 shrink-0 ${chevronClassName || "text-slate-400"} ${activePicker === "start" ? "rotate-180 text-[#C5A880]" : ""}`} />
        </button>
      </div>

      {/* Check-out Column */}
      <div className="space-y-1.5">
        <label className={labelClassName || "block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"}>
          {endLabel} {required && typeof endLabel === "string" && <span className="text-[#C5A880]">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setActivePicker(activePicker === "end" ? null : "end")}
          className={buttonClassName ? `${buttonClassName} flex items-center justify-between ${activePicker === "end" ? "border-[#C5A059] ring-1 ring-[#C5A059]" : ""}` : defaultSplitButtonClass(activePicker === "end")}
        >
          <div className="flex items-center gap-2 truncate">
            {!hideIcon && <CalendarIcon className="h-4 w-4 text-[#C5A880] shrink-0" />}
            <span className={endDate ? "" : "text-white/60 dark:text-white/60 text-slate-400"}>
              {endDate ? formatDisplayDate(endDate) : "Select Check-out"}
            </span>
          </div>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 shrink-0 ${chevronClassName || "text-slate-400"} ${activePicker === "end" ? "rotate-180 text-[#C5A880]" : ""}`} />
        </button>
      </div>

      {/* Shared Dropdown Popover */}
      {activePicker && (
        <div
          className={`absolute ${
            activePicker === "end" ? "right-0" : "left-0"
          } ${
            isDropUp ? "bottom-full mb-2" : "top-full mt-2"
          } z-[999] w-[320px] sm:w-[340px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-2xl animate-fade-in-scale ring-1 ring-slate-900/10 dark:ring-white/10`}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
              {activePicker === "start" ? "Select Check-In Date" : "Select Check-Out Date"}
            </span>
            <div className="flex items-center gap-1.5">
              {(startDate || endDate) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setActivePicker(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <Calendar
            value={activePicker === "start" ? (parsedStart || today) : (parsedEnd || parsedStart || today)}
            onChange={activePicker === "start" ? handleStartSelect : handleEndSelect}
            minDate={activePicker === "start" ? today : (parsedStart ? new Date(parsedStart.getTime() + 86400000) : today)}
            prev2Label={null}
            next2Label={null}
          />

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">
              {nights > 0 ? (
                <>Duration: <strong className="text-slate-900 dark:text-white">{nights} Nights</strong></>
              ) : (
                "Choose Date"
              )}
            </span>
            <div className="flex items-center gap-1.5">
              {(startDate || endDate) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-800 font-semibold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setActivePicker(null)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#C5A880] text-slate-950 font-bold text-[10px] uppercase tracking-wider hover:bg-[#dfcaa4] transition-colors cursor-pointer"
              >
                <Check className="h-3 w-3" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Native Inputs for standard HTML5 validation */}
      <input
        type="text"
        name="startDate"
        value={startDate || ""}
        required={required}
        readOnly
        onChange={() => {}}
        className="absolute opacity-0 pointer-events-none w-px h-px bottom-0 left-1/4"
      />
      <input
        type="text"
        name="endDate"
        value={endDate || ""}
        required={required}
        readOnly
        onChange={() => {}}
        className="absolute opacity-0 pointer-events-none w-px h-px bottom-0 left-3/4"
      />
    </div>
  );
}

