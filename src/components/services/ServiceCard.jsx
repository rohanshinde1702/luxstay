import { Link } from "react-router-dom";
import {
  LuCheck as Check,
  LuClock as Clock,
  LuArrowRight as ArrowRight
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import Badge from "../common/Badge";

export default function ServiceCard({
  service,
  variant = "card", // card, minimal
  className = "",
}) {
  if (!service) return null;

  const {
    id,
    title,
    category,
    image,
    tagline,
    features = [],
    hours,
  } = service;

  if (variant === "minimal") {
    return (
      <div
        className={`group rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs hover:border-[#C5A880]/50 hover:shadow-lg transition-all ${className}`}
      >
        <Badge variant="gold" size="xs">
          {category}
        </Badge>
        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors mt-3">
          {title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{tagline}</p>
        {hours && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Clock className="h-3.5 w-3.5 text-[#C5A880]" />
            <span>{hours}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
    >
      {/* Image Banner */}
      <Link to={`/services#${id}`} className="relative overflow-hidden block">
        <ImageWithFallback
          src={image}
          alt={title}
          aspectRatio="aspect-16/10"
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <Badge variant="glass" size="xs">
            {category}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6 space-y-4">
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
            <Link to={`/services#${id}`}>{title}</Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tagline}</p>

          {/* Features list */}
          {features.length > 0 && (
            <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {features.slice(0, 3).map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#997548] dark:text-[#D4B68A] shrink-0 mt-0.5">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer & CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          {hours && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5 text-[#C5A880]" />
              <span className="line-clamp-1">{hours}</span>
            </div>
          )}

          <Link
            to={`/services#${id}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
