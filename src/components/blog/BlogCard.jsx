import { Link } from "react-router-dom";
import {
  LuClock as Clock,
  LuCalendar as Calendar,
  LuArrowRight as ArrowRight
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import Badge from "../common/Badge";

export default function BlogCard({
  post,
  variant = "grid", // grid, list, compact
  className = "",
}) {
  if (!post) return null;

  const {
    slug,
    title,
    category,
    date,
    readTime,
    author,
    image,
    excerpt,
  } = post;

  if (variant === "list") {
    return (
      <article
        className={`group flex flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 sm:h-64 lg:h-68 ${className}`}
      >
        <Link to={`/blog/${slug}`} className="relative w-full sm:w-2/5 md:w-[38%] shrink-0 overflow-hidden block h-56 sm:h-full">
          <ImageWithFallback
            src={image}
            alt={title}
            aspectRatio="h-full w-full"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <Badge variant="glass" size="xs">
              {category}
            </Badge>
          </div>
        </Link>

        <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 lg:p-7 min-w-0 h-full">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-[#C5A880]" />
                {date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#C5A880]" />
                {readTime}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors leading-snug line-clamp-2">
              <Link to={`/blog/${slug}`}>{title}</Link>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed font-light">
              {excerpt}
            </p>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-3">
            {author && (
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-[#C5A880]/30">
                  <ImageWithFallback
                    src={author.avatar}
                    alt={author.name}
                    aspectRatio="h-full w-full"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 truncate">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{author.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{author.role}</p>
                </div>
              </div>
            )}

            <Link
              to={`/blog/${slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors shrink-0"
            >
              <span>Read</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Default Grid
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
    >
      <Link to={`/blog/${slug}`} className="relative overflow-hidden block">
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

      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-[#C5A880]" />
              {date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#C5A880]" />
              {readTime}
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors leading-snug">
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
            {excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {author && (
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 overflow-hidden rounded-full ring-1 ring-[#C5A880]/30">
                <ImageWithFallback
                  src={author.avatar}
                  alt={author.name}
                  aspectRatio="h-full w-full"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {author.name}
              </span>
            </div>
          )}

          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
          >
            <span>Read More</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
