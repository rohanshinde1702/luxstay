import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  LuX as X,
  LuSparkles as Sparkles,
  LuCrown as Crown,
  LuShieldCheck as ShieldCheck,
  LuUtensils as Utensils,
  LuWine as Wine,
  LuCar as Car,
  LuPlane as Plane,
  LuClock as Clock,
  LuCamera as Camera,
  LuCompass as Compass,
  LuSun as Sun,
  LuFlame as Flame,
  LuUmbrella as Umbrella,
  LuTag as Tag,
  LuGift as Gift,
  LuDownload as Download,
  LuArrowRight as ArrowRight,
} from "react-icons/lu";
import { usePagePopup } from "../../hooks/usePagePopup";
import ImageWithFallback from "./ImageWithFallback";

// Icon resolver helper
const ICON_MAP = {
  Tag,
  Utensils,
  ShieldCheck,
  Sparkles,
  Crown,
  Wine,
  Car,
  Plane,
  Clock,
  Camera,
  Compass,
  Sun,
  Flame,
  Umbrella,
  Gift,
  Download,
};

export default function PagePopupModal() {
  const {
    isOpen,
    activePopup,
    closePopup,
    dontShowAgainChecked,
    openBookingFromPopup,
  } = usePagePopup();

  const navigate = useNavigate();

  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closePopup({ dontShowAgain: dontShowAgainChecked });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closePopup, dontShowAgainChecked]);

  if (!isOpen || !activePopup || typeof document === "undefined") return null;

  const handleClose = () => {
    closePopup({ dontShowAgain: dontShowAgainChecked });
  };

  const handlePrimaryAction = () => {
    const action = activePopup.primaryAction;
    if (action?.actionType === "book" || !action?.link) {
      openBookingFromPopup(activePopup.roomData, activePopup.promoCode || "BEACH40");
    } else if (action?.link) {
      handleClose();
      navigate(action.link);
    } else {
      handleClose();
    }
  };

  const modalElement = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="page-popup-title"
    >
      {/* Darkened & Blurred Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Main Luxury Modal Card */}
      <div className="relative w-full max-w-[820px] h-[640px] max-h-[92dvh] sm:max-h-[90vh] my-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF7F2] dark:bg-[#0E1624] shadow-2xl border border-white/50 dark:border-slate-800/80 flex flex-col md:flex-row transition-all duration-300 z-10 animate-fade-in-scale">
        
        {/* Floating Mobile Close Button (top-right of image) */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 transition-colors md:hidden cursor-pointer shadow-md"
          aria-label="Close popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ------------------------------------------------------------- */}
        {/* TOP / LEFT COLUMN (50% Height on Mobile, 50% Width on Desktop) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative w-full h-1/2 md:h-full md:w-1/2 md:min-h-[480px] shrink-0 overflow-hidden bg-slate-950 flex flex-col justify-end p-4 sm:p-6 md:p-8">
          <ImageWithFallback
            src={activePopup.image || "/images/placeholders/750x1000.svg"}
            alt={activePopup.title || "LuxStay Resort Experience"}
            aspectRatio="h-full w-full"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle gradient vignette at the bottom for typography clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

          {/* Special Offer Script Typography Overlay */}
          <div className="relative z-10 select-none">
            <div className="leading-none">
              <span
                style={{ fontFamily: "'Alex Brush', cursive" }}
                className="text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[0.8] block drop-shadow-md"
              >
                {activePopup.scriptTop || "Special"}
              </span>
              <span
                style={{ fontFamily: "'Alex Brush', cursive" }}
                className="text-4xl sm:text-5xl md:text-6xl text-[#E5B869] font-normal leading-[0.8] block -mt-1 sm:-mt-1.5 ml-3.5 sm:ml-4 drop-shadow-md"
              >
                {activePopup.scriptBottom || "Offer"}
              </span>
            </div>

            {/* Subtitle with accent line */}
            <div className="flex items-center gap-2 mt-2 sm:mt-3">
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#E5B869] inline-block shrink-0" />
              <p className="text-white text-xs sm:text-[13px] font-normal tracking-wide leading-tight drop-shadow line-clamp-1 sm:line-clamp-none">
                {activePopup.imageTagline || "Make your next getaway more memorable"}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM / RIGHT COLUMN (50% Height on Mobile, 50% Width on Desktop) */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between relative bg-[#FAF7F2] dark:bg-[#0E1624] text-slate-800 dark:text-slate-100 overflow-y-auto">
          
          {/* Subtle Decorative Tropical Leaf Watermark in Top-Right Corner */}
          <svg
            className="absolute top-0 right-0 w-36 h-36 text-[#A37D4C] opacity-8 dark:opacity-4 pointer-events-none hidden sm:block"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path d="M190,10 C150,20 120,60 110,100 C100,140 70,170 10,190 C60,180 100,150 120,110 C140,70 170,30 190,10 Z" />
            <path d="M200,60 C160,70 135,100 130,135 C125,170 100,190 50,200 C95,190 125,165 140,130 C155,95 180,70 200,60 Z" opacity="0.6" />
          </svg>

          <div>
            {/* Top Brand & Desktop Close Button Row */}
            <div className="flex items-center justify-between relative z-10">
              <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#A37D4C] dark:text-[#D4B68A]">
                LuxStay
              </span>

              <button
                type="button"
                onClick={handleClose}
                className="hidden md:flex p-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Limited Time Offer Eyebrow */}
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#A37D4C] dark:text-[#D4B68A] block mt-1.5 sm:mt-3 md:mt-5 mb-1 sm:mb-1.5">
              {activePopup.eyebrow || "LIMITED TIME OFFER"}
            </span>

            {/* Headline */}
            <h2
              id="page-popup-title"
              className="font-serif text-base sm:text-xl md:text-[26px] lg:text-[29px] font-normal text-[#1B2A3A] dark:text-white leading-[1.18] tracking-tight"
            >
              {activePopup.title}
            </h2>

            {/* Description */}
            <p className="text-[11px] sm:text-xs md:text-[13px] text-[#5A6A7E] dark:text-slate-300 leading-relaxed mt-1 sm:mt-2 mb-2 sm:mb-4">
              {activePopup.subtitle}
            </p>

            {/* Benefits List (3 Items with Solid Bronze Circular Badges) */}
            <div className="space-y-2 sm:space-y-3">
              {(activePopup.highlights || [
                { title: "Up to 40% Discount", subtitle: "On selected rooms & suites", icon: "Tag" },
                { title: "Free Breakfast", subtitle: "For all bookings", icon: "Utensils" },
                { title: "Flexible Cancellation", subtitle: "Hassle-free booking", icon: "ShieldCheck" },
              ]).map((item, idx) => {
                const IconComponent = ICON_MAP[item.icon] || Tag;
                return (
                  <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                    {/* Circular solid bronze icon badge */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#A37D4C] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    {/* Benefit Title & Subtitle */}
                    <div className="min-w-0">
                      <h4 className="text-[11px] sm:text-xs md:text-[13px] font-bold text-[#1B2A3A] dark:text-white leading-tight">
                        {item.title || item.text}
                      </h4>
                      {item.subtitle && (
                        <p className="text-[10px] sm:text-[11px] text-[#7B8A9A] dark:text-slate-400 mt-0.5 leading-tight">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-3 sm:mt-4 md:mt-6 pt-1">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="w-full py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-[#A37D4C] hover:bg-[#8F6A3B] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span>{activePopup.primaryAction?.label || "BOOK NOW"}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
}
