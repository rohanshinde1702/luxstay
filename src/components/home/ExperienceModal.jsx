import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  LuX as X,
  LuClock as Clock,
  LuMapPin as MapPin,
  LuUsers as Users,
  LuSun as Sun,
  LuCheck as Check,
  LuSparkles as Sparkles,
  LuArrowRight as ArrowRight,
  LuShieldCheck as ShieldCheck,
  LuCircleCheck as CheckCircle2
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import { useToast } from "../../hooks/useToast";

export default function ExperienceModal({
  isOpen,
  onClose,
  experience,
}) {
  const { addToast } = useToast();
  const [booked, setBooked] = useState(false);

  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) {
      setBooked(false);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !experience || typeof document === "undefined") return null;

  const handleBookNow = () => {
    setBooked(true);
    addToast({
      title: "Experience Reserved! 🌴",
      message: `Your spot for "${experience.title}" has been registered. The resort concierge desk will confirm your preferred timing.`,
      type: "success",
    });
    setTimeout(() => {
      setBooked(false);
      onClose();
    }, 2000);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-modal-title"
    >
      {/* Darkened & Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Luxury Modal Box */}
      <div className="relative w-full max-w-4xl h-[640px] max-h-[92dvh] sm:max-h-[90vh] my-auto rounded-2xl sm:rounded-3xl bg-[#FAF7F2] dark:bg-[#0C1222] border border-white/50 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row overflow-hidden z-10 transition-all duration-300 animate-fade-in-scale text-slate-800 dark:text-slate-100">
        
        {/* Close Button in Top-Right Corner */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer shadow-lg"
          aria-label="Close experience details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ------------------------------------------------------------- */}
        {/* LEFT COLUMN: LARGE HIGH-QUALITY EXPERIENCE IMAGE (50% Mobile)  */}
        {/* ------------------------------------------------------------- */}
        <div className="relative w-full h-1/2 md:h-full md:w-1/2 md:min-h-[480px] shrink-0 overflow-hidden bg-slate-950 flex flex-col justify-between p-4 sm:p-6">
          <ImageWithFallback
            src={experience.image}
            alt={experience.title}
            aspectRatio="h-full w-full"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/40 pointer-events-none" />

          {/* Top Category Badge */}
          <div className="relative z-10 flex items-start justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#D4B68A] backdrop-blur-md border border-[#D4B68A]/30 shadow-md">
              <Sparkles className="h-3 w-3 text-[#D4B68A]" />
              <span>{experience.badge || "Resort Experience"}</span>
            </span>
          </div>

          {/* Bottom Floating Specs Card on Image */}
          <div className="relative z-10 space-y-2 mt-auto pt-4 sm:pt-6">
            <div className="rounded-xl bg-slate-900/85 backdrop-blur-md p-2.5 sm:p-3.5 border border-white/10 text-white space-y-1">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#D4B68A] tracking-wider block">
                Sanctuary Location & Duration
              </span>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 text-[#D4B68A] shrink-0" />
                  <span className="truncate">{experience.location}</span>
                </span>
                <span className="px-1.5">•</span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <Clock className="h-3.5 w-3.5 text-[#D4B68A] shrink-0" />
                  <span>{experience.duration}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* RIGHT COLUMN: DETAILED INFO, SPECS, INCLUSIONS & BOOKING CTA */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between space-y-4 sm:space-y-6 bg-[#FAF7F2] dark:bg-[#0C1222] overflow-y-auto">
          
          <div className="space-y-4">
            {/* Header / Brand */}
            <div className="space-y-1 pr-8">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#08201E] dark:text-[#D4B68A] block">
                UNFORGETTABLE RESORT EXPERIENCE
              </span>
              <h2
                id="experience-modal-title"
                className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-tight"
              >
                {experience.title}
              </h2>
            </div>

            {/* Short Description & Overview */}
            <div className="space-y-2">
              <p className="text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic border-l-2 border-[#D4B68A] pl-3 py-0.5">
                "{experience.tagline || experience.desc}"
              </p>
              {experience.overview && (
                <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  {experience.overview}
                </p>
              )}
            </div>

            {/* 4 Core Details Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-xl bg-white dark:bg-slate-900/70 p-3 border border-slate-200/80 dark:border-slate-800 space-y-0.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#08201E] dark:text-[#D4B68A] uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Duration</span>
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-white block">
                  {experience.duration}
                </span>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900/70 p-3 border border-slate-200/80 dark:border-slate-800 space-y-0.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#08201E] dark:text-[#D4B68A] uppercase tracking-wider">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Location</span>
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-white block">
                  {experience.location}
                </span>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900/70 p-3 border border-slate-200/80 dark:border-slate-800 space-y-0.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#08201E] dark:text-[#D4B68A] uppercase tracking-wider">
                  <Users className="h-3.5 w-3.5" />
                  <span>Suitable For</span>
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-white block truncate">
                  {experience.suitableFor}
                </span>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900/70 p-3 border border-slate-200/80 dark:border-slate-800 space-y-0.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#08201E] dark:text-[#D4B68A] uppercase tracking-wider">
                  <Sun className="h-3.5 w-3.5" />
                  <span>Best Time</span>
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-white block">
                  {experience.bestTime}
                </span>
              </div>
            </div>

            {/* Inclusions & Equipment */}
            {experience.inclusions && experience.inclusions.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  What's Included:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {experience.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[#D4B68A] shrink-0" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleBookNow}
                disabled={booked}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#08201E] hover:bg-[#123633] dark:bg-[#D4B68A] dark:hover:bg-[#c5a77b] text-white dark:text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                {booked ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-800" />
                    <span>Experience Reserved!</span>
                  </>
                ) : (
                  <>
                    <span>BOOK THIS EXPERIENCE</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <Link
                to="/tours"
                onClick={onClose}
                className="w-full sm:w-auto text-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-3.5 px-5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              >
                VIEW DETAILS
              </Link>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4B68A]" />
                <span>Zero pre-payment required • Reserved with Butler</span>
              </span>

              <button
                type="button"
                onClick={onClose}
                className="hover:underline hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
