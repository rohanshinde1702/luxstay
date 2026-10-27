import {
  LuQuote as Quote,
  LuCircleCheck as CheckCircle2
} from "react-icons/lu";
import Rating from "./Rating";
import ImageWithFallback from "./ImageWithFallback";

export default function TestimonialCard({
  testimonial,
  variant = "card", // card, minimal
  className = "",
}) {
  if (!testimonial) return null;

  const {
    author,
    role,
    location,
    avatar,
    rating,
    suiteStayed,
    date,
    verifiedStay,
    quote,
  } = testimonial;

  if (variant === "minimal") {
    return (
      <div
        className={`rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs ${className}`}
      >
        <Rating value={rating} size="xs" />
        <p className="font-serif italic text-xs text-slate-700 dark:text-slate-300 mt-2">"{quote}"</p>
        <p className="text-xs font-bold text-slate-900 dark:text-white mt-3">{author} • <span className="text-slate-500 dark:text-slate-400 font-normal">{location}</span></p>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col justify-between rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-6 text-[#C5A880]/20 pointer-events-none">
        <Quote className="h-10 w-10 rotate-180" />
      </div>

      <div className="space-y-4">
        {/* Rating and Stay Verification */}
        <div className="flex items-center justify-between">
          <Rating value={rating} size="sm" />
          {verifiedStay && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span>Verified Guest</span>
            </span>
          )}
        </div>

        {/* Quote */}
        <p className="font-serif italic text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed pt-1">
          "{quote}"
        </p>

        {suiteStayed && (
          <p className="text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4] tracking-wide uppercase">
            Stayed in: {suiteStayed}
          </p>
        )}
      </div>

      {/* Guest Author Profile */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3.5">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#C5A880]/40">
          <ImageWithFallback
            src={avatar}
            alt={author}
            aspectRatio="h-full w-full"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white">
            {author}
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            {role} • {location}
          </p>
          {date && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{date}</p>}
        </div>
      </div>
    </div>
  );
}
