import { useState, useEffect } from "react";
import {
  LuSettings2 as Settings2,
  LuX as X,
  LuSun as Sun,
  LuMoon as Moon,
  LuRotateCcw as RotateCcw,
  LuCheck as Check,
  LuSparkles as Sparkles
} from "react-icons/lu";
import { useTheme } from "../../hooks/useTheme";
import { usePagePopup } from "../../hooks/usePagePopup";

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    theme,
    toggleTheme,
    fontFamily,
    setFontFamily,
    headerVariant,
    setHeaderVariant,
    footerVariant,
    setFooterVariant,
    resetTheme,
  } = useTheme();

  const {
    openPopup,
    isAutoPopupEnabled,
    setIsAutoPopupEnabled,
    resetDismissedPopups,
  } = usePagePopup();

  // Esc key listener and body overflow lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Trigger Button (Stacked cleanly above ScrollToTop) */}
      <div className="fixed right-3 sm:right-6 bottom-15 sm:bottom-20 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#0F172A] dark:bg-[#C5A880] text-[#dfcaa4] dark:text-slate-950 shadow-2xl hover:scale-110 transition-all duration-300 border border-[#C5A880]/30 cursor-pointer"
          aria-label="Open Theme Customizer"
          title="Customize Theme & Layout Options"
        >
          <Settings2 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 border-l border-slate-200 dark:border-slate-800 ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                Theme Studio
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Live options & layout switcher
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7 text-xs">
          {/* 1. Theme Mode (Light / Dark) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Color Mode
              </span>
              <span className="text-[10px] uppercase font-bold text-[#997548] dark:text-[#dfcaa4]">
                {theme}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (theme !== "light") toggleTheme();
                }}
                className={`flex items-center justify-center gap-2 rounded-xl p-3.5 font-semibold transition-all border cursor-pointer ${
                  theme === "light"
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
              >
                <Sun className="h-4 w-4 text-amber-500" />
                <span>Light</span>
                {theme === "light" && <Check className="h-3.5 w-3.5 ml-auto text-[#dfcaa4]" />}
              </button>

              <button
                onClick={() => {
                  if (theme !== "dark") toggleTheme();
                }}
                className={`flex items-center justify-center gap-2 rounded-xl p-3.5 font-semibold transition-all border cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#C5A880] text-slate-950 border-[#C5A880] shadow-sm font-bold"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
              >
                <Moon className="h-4 w-4 text-indigo-400" />
                <span>Dark Luxury</span>
                {theme === "dark" && <Check className="h-3.5 w-3.5 ml-auto text-slate-950" />}
              </button>
            </div>
          </div>

          {/* 2. Font Family (Raleway [Default] / Noto Sans) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Font Family
              </span>
              <span className="text-[10px] uppercase font-bold text-[#997548] dark:text-[#dfcaa4]">
                {fontFamily === "noto" ? "Noto Sans, sans-serif" : "Raleway, sans-serif (Default)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFontFamily("raleway")}
                style={{ fontFamily: "'Raleway', sans-serif" }}
                className={`flex flex-col text-left rounded-xl p-3.5 border transition-all cursor-pointer ${
                  fontFamily === "raleway"
                    ? "border-[#C5A880] bg-[#C5A880]/10 dark:bg-[#C5A880]/20 text-slate-900 dark:text-white ring-1 ring-[#C5A880] shadow-xs"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs">Raleway</span>
                  </div>
                  {fontFamily === "raleway" && (
                    <Check className="h-3.5 w-3.5 text-[#997548] dark:text-[#dfcaa4]" />
                  )}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Elegant & Refined (Default)
                </span>
                <span className="text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] mt-2">
                  Aa Bb Gg 123
                </span>
              </button>

              <button
                onClick={() => setFontFamily("noto")}
                style={{ fontFamily: "'Noto Sans', sans-serif" }}
                className={`flex flex-col text-left rounded-xl p-3.5 border transition-all cursor-pointer ${
                  fontFamily === "noto"
                    ? "border-[#C5A880] bg-[#C5A880]/10 dark:bg-[#C5A880]/20 text-slate-900 dark:text-white ring-1 ring-[#C5A880] shadow-xs"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">Noto Sans</span>
                  {fontFamily === "noto" && (
                    <Check className="h-3.5 w-3.5 text-[#997548] dark:text-[#dfcaa4]" />
                  )}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Clean & Universal
                </span>
                <span className="text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] mt-2">
                  Aa Bb Gg 123
                </span>
              </button>
            </div>
          </div>

          {/* 3. Header Variations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Header Layout
              </span>
              <span className="text-[10px] uppercase font-bold text-[#997548] dark:text-[#dfcaa4]">
                {headerVariant}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: "standard", label: "Standard White", desc: "Classic 2-tier bar" },
                { id: "transparent", label: "Transparent Glass", desc: "Hero overlay" },
                { id: "dark", label: "Noir Dark", desc: "Deep luxury slate" },
                { id: "minimal", label: "Minimalist", desc: "Single tier centered" },
              ].map((h) => (
                <button
                  key={h.id}
                  onClick={() => setHeaderVariant(h.id)}
                  className={`flex flex-col text-left rounded-xl p-3 border transition-all cursor-pointer ${
                    headerVariant === h.id
                      ? "border-[#C5A880] bg-[#C5A880]/10 dark:bg-[#C5A880]/20 text-slate-900 dark:text-white ring-1 ring-[#C5A880]"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{h.label}</span>
                    {headerVariant === h.id && <Check className="h-3.5 w-3.5 text-[#997548] dark:text-[#dfcaa4]" />}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{h.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Footer Variations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Footer Layout
              </span>
              <span className="text-[10px] uppercase font-bold text-[#997548] dark:text-[#dfcaa4]">
                {footerVariant}
              </span>
            </div>
            <div className="space-y-2">
              {[
                { id: "standard", label: "Standard 5-Column", desc: "Comprehensive brand story, links, awards, newsletter" },
                { id: "newsletter", label: "Newsletter Centric", desc: "High-impact VIP circle subscription banner with perks" },
                { id: "minimal", label: "Minimalist Clean", desc: "Streamlined single row with monogram and inline links" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFooterVariant(f.id)}
                  className={`w-full flex items-center justify-between rounded-xl p-3 border text-left transition-all cursor-pointer ${
                    footerVariant === f.id
                      ? "border-[#C5A880] bg-[#C5A880]/10 dark:bg-[#C5A880]/20 text-slate-900 dark:text-white ring-1 ring-[#C5A880]"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div>
                    <span className="font-bold block text-xs">{f.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{f.desc}</span>
                  </div>
                  {footerVariant === f.id && <Check className="h-4 w-4 text-[#997548] dark:text-[#dfcaa4] shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Homepage Popups & Special Offers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Homepage Special Popups
              </span>
              <span className="text-[10px] uppercase font-bold text-[#997548] dark:text-[#dfcaa4]">
                {isAutoPopupEnabled ? "Auto Enabled" : "Manual Only"}
              </span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openPopup();
                }}
                className="w-full flex items-center justify-between rounded-xl p-3 border border-[#C5A880] bg-[#C5A880]/10 dark:bg-[#C5A880]/20 text-slate-900 dark:text-white font-bold text-xs hover:bg-[#C5A880]/20 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#997548] dark:text-[#dfcaa4]" />
                  <span>Preview Homepage Popup</span>
                </div>
                <span className="text-[10px] font-bold text-[#997548] dark:text-[#dfcaa4] uppercase">
                  Launch →
                </span>
              </button>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 text-xs">
                <div>
                  <span className="font-bold block">Auto-Show Every 10 Mins</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Smoothly appears every 10 minutes on homepage visits
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAutoPopupEnabled(!isAutoPopupEnabled)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
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

              <button
                onClick={resetDismissedPopups}
                className="w-full text-center text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors py-1 cursor-pointer"
              >
                Reset All "Don't show again" Dismissals
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-950/50">
          <button
            onClick={resetTheme}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>
    </>
  );
}
