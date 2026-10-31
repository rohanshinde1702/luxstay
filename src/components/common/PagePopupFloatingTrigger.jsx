import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  LuSparkles as Sparkles,
  LuX as X,
  LuRotateCcw as RotateCcw,
  LuSettings2 as Settings2,
  LuExternalLink as ExternalLink
} from "react-icons/lu";
import { usePagePopup } from "../../hooks/usePagePopup";
import { isHomePage } from "../../data/pagePopups";

const HOME_POPUP_PREVIEWS = [
  { id: "home-beach", label: "Beach Sanctuary (40% Off)", route: "/home-beach" },
  { id: "home-hotel", label: "Grand Hotel ($2,000 Credit)", route: "/home-hotel" },
  { id: "home-resort", label: "Resort & Spa (Stay 5 Pay 4)", route: "/home-resort" },
  { id: "home-travel", label: "Travel & Expeditions (Free Heli)", route: "/home-travel" },
  { id: "home-boutique", label: "Heritage Boutique (15% Off)", route: "/home-boutique" },
  { id: "home-villa", label: "Private Island Villas (Chef Included)", route: "/home-villa" },
  { id: "home-modern", label: "Modern Penthouse (20% Off)", route: "/home-modern" },
  { id: "home-dark", label: "Dark Nocturne (Dom Pérignon)", route: "/home-dark" },
  { id: "home-demos", label: "Concept Showcase Hub", route: "/home-demos" },
];

export default function PagePopupFloatingTrigger() {
  const {
    openPopup,
    activePopup,
    triggerPopupById,
    isAutoPopupEnabled,
    setIsAutoPopupEnabled,
    resetDismissedPopups,
  } = usePagePopup();

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Strictly only show on Homepages
  if (!isHomePage(location.pathname) || !activePopup) {
    return null;
  }

  return (
    <div ref={dropdownRef} className="fixed left-3 sm:left-6 bottom-3 sm:bottom-6 z-40">
      {/* Quick Switcher Drawer / Popover */}
      {menuOpen && (
        <div className="absolute bottom-14 sm:bottom-16 left-0 w-[calc(100vw-24px)] max-w-xs sm:w-80 max-h-[75vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 space-y-4 animate-slide-up text-slate-800 dark:text-slate-100 z-50">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4]">
                <Settings2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white">
                  Homepage Offers
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Preview & configure home special popups
                </p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Current Page Popup Trigger Button */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Home Offer
            </span>
            <button
              onClick={() => {
                setMenuOpen(false);
                openPopup();
              }}
              className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-[#C5A880] dark:to-[#d1b17e] text-white dark:text-slate-950 p-3 shadow-md hover:brightness-110 transition-all font-bold text-xs cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="h-4 w-4 shrink-0 text-[#C5A880] dark:text-slate-950" />
                <span className="truncate">{activePopup?.title || "Open Home Offer"}</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 ml-2" />
            </button>
          </div>

          {/* Auto Popup Setting */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Auto-Trigger Every 10 Mins</span>
              <button
                type="button"
                onClick={() => setIsAutoPopupEnabled(!isAutoPopupEnabled)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                  isAutoPopupEnabled ? "bg-[#C5A880]" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAutoPopupEnabled ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              When enabled, a tailored luxury offer smoothly appears every 10 minutes on homepage visits.
            </p>
          </div>

          {/* Home Variations Switcher */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Quick Test Homepage Popups:
            </span>
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {HOME_POPUP_PREVIEWS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMenuOpen(false);
                    triggerPopupById(item.id);
                  }}
                  className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <span className="truncate">{item.label}</span>
                  <ExternalLink className="h-3 w-3 opacity-60 ml-1 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Reset Dismissed */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={resetDismissedPopups}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Dismissed Offers</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => openPopup()}
          className="group flex items-center gap-1.5 sm:gap-2 rounded-full bg-slate-900/95 dark:bg-[#C5A880] text-[#dfcaa4] dark:text-slate-950 px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl hover:scale-105 transition-all duration-300 border border-[#C5A880]/40 backdrop-blur-md cursor-pointer ring-1 ring-white/10"
          aria-label="View homepage offer"
          title={activePopup?.title || "Special Homepage Offer"}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C5A880] dark:text-slate-950 group-hover:rotate-12 transition-transform shrink-0" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            {activePopup?.badge || "Special Offer"}
          </span>
        </button>

        {/* Options / Studio Popover toggle (hidden on small mobile to avoid screen crowding) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/95 dark:bg-slate-800 text-slate-300 dark:text-slate-300 hover:text-white border border-slate-700 hover:scale-105 transition-all cursor-pointer shadow-lg shrink-0"
          aria-label="Toggle Homepage Popups Menu"
          title="Explore & test homepage popups"
        >
          <Settings2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
