import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LuCalendar as CalendarIcon, LuChevronDown as ChevronDown, LuX as X, LuCheck as Check } from "react-icons/lu";

/**
 * Safe parser for dates to avoid timezone shift on YYYY-MM-DD strings
 */
export function parseDate(val) {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  if (typeof val === "string") {
    const match = val.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) {
      const y = Number(match[1]);
      const m = Number(match[2]) - 1;
      const d = Number(match[3]);
      return new Date(y, m, d);
    }
  }
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Format Date to YYYY-MM-DD string safely (ignoring timezone drift)
 */
export function formatToISODate(date) {
  if (!date) return "";
  const d = parseDate(date);
  if (!d || isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Format YYYY-MM-DD to elegant display format (e.g., "15 Oct 2026")
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const d = parseDate(dateStr);
  if (!d || isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Custom Luxury DatePicker built on react-calendar
 */
export default function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  label,
  labelClassName,
  buttonClassName,
  icon,
  hideIcon = false,
  chevronClassName = "",
  placeholder = "Select Date",
  required = false,
  name,
  id,
  className = "",
  inline = false,
  align = "left",
  direction = "auto", // 'auto' | 'down' | 'up'
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropUp, setIsDropUp] = useState(false);
  const containerRef = useRef(null);

  // Parse input value into Date object safely
  const selectedDate = parseDate(value);
  const parsedMinDate = parseDate(minDate);
  const parsedMaxDate = parseDate(maxDate);

  // Handle position calculation and outside click
  useEffect(() => {
    if (inline || !isOpen) return;

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
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, inline, direction]);

  const handleDateSelect = (date) => {
    const isoString = formatToISODate(date);
    if (onChange) {
      onChange({
        target: {
          name: name || id || "date",
          value: isoString,
        },
      });
    }
    if (!inline) {
      setIsOpen(false);
    }
  };

  const handleClear = (e) => {
    if (e) e.stopPropagation();
    if (onChange) {
      onChange({
        target: {
          name: name || id || "date",
          value: "",
        },
      });
    }
    if (!inline) {
      setIsOpen(false);
    }
  };

  const handleQuickSelect = (daysFromToday) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    handleDateSelect(d);
  };

  // Inline Calendar View
  if (inline) {
    return (
      <div className={`rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-sm ${className}`}>
        {label && (
          <div className="flex items-center justify-between mb-3">
            <label className={labelClassName || "block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"}>
              {label} {required && <span className="text-[#C5A880]">*</span>}
            </label>
            {selectedDate && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[10px] font-semibold text-rose-500 hover:underline cursor-pointer"
              >
                Clear Date
              </button>
            )}
          </div>
        )}
        <Calendar
          value={selectedDate || new Date()}
          onChange={handleDateSelect}
          minDate={parsedMinDate}
          maxDate={parsedMaxDate}
          prev2Label={null}
          next2Label={null}
        />
      </div>
    );
  }

  // Popover DatePicker View
  const defaultButtonClass = `flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0a0f1d] px-3.5 py-2.5 text-left text-xs font-medium transition-all cursor-pointer hover:border-[#C5A880] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] focus:outline-hidden ${
    isOpen ? "border-[#C5A880] ring-1 ring-[#C5A880] shadow-sm" : ""
  } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={id || name}
          className={labelClassName || "block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"}
        >
          {label} {required && typeof label === "string" && <span className="text-[#C5A880]">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClassName ? `${buttonClassName} flex items-center justify-between ${isOpen ? "border-[#C5A059] ring-1 ring-[#C5A059]" : ""}` : defaultButtonClass}
      >
        <div className="flex items-center gap-2 truncate">
          {!hideIcon && (icon || <CalendarIcon className="h-4 w-4 text-[#C5A880] shrink-0" />)}
          <span className={selectedDate ? "" : "text-white/60 dark:text-white/60 text-slate-400"}>
            {selectedDate ? formatDisplayDate(value) : placeholder}
          </span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 shrink-0 ${chevronClassName || "text-slate-400"} ${isOpen ? "rotate-180 text-[#C5A880]" : ""}`} />
      </button>

      {/* Hidden Native Input for standard HTML5 validation */}
      <input
        type="text"
        name={name}
        value={value || ""}
        required={required}
        readOnly
        onChange={() => {}}
        className="absolute opacity-0 pointer-events-none w-px h-px bottom-0 left-1/2"
      />

      {/* Dropdown Calendar Popover */}
      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } ${
            isDropUp ? "bottom-full mb-2" : "top-full mt-2"
          } z-[999] w-[320px] sm:w-[340px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-2xl animate-fade-in-scale ring-1 ring-slate-900/10 dark:ring-white/10`}
        >
          {/* Quick Preset Buttons */}
          <div className="flex items-center justify-between gap-1.5 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
              Select Stay Date
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleQuickSelect(0)}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#C5A880] hover:text-slate-950 transition-colors cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect(1)}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#C5A880] hover:text-slate-950 transition-colors cursor-pointer"
              >
                Tomorrow
              </button>
              {selectedDate && (
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
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer ml-0.5"
                aria-label="Close calendar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* React Calendar Component */}
          <Calendar
            value={selectedDate || new Date()}
            onChange={handleDateSelect}
            minDate={parsedMinDate}
            maxDate={parsedMaxDate}
            prev2Label={null}
            next2Label={null}
          />

          {/* Footer details */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-[140px] sm:max-w-[170px]">
              {selectedDate ? (
                <>Selected: <strong className="text-slate-900 dark:text-white">{formatDisplayDate(value)}</strong></>
              ) : (
                "No date selected"
              )}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {selectedDate && (
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
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#C5A880] text-slate-950 font-bold text-[10px] uppercase tracking-wider hover:bg-[#dfcaa4] transition-colors cursor-pointer"
              >
                <Check className="h-3 w-3" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
