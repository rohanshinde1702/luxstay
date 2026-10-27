import { Link } from "react-router-dom";
import {
  LuClock as Clock,
  LuUsers as Users,
  LuMapPin as MapPin,
  LuArrowRight as ArrowRight,
  LuCheck as Check,
  LuHeart as Heart
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import Badge from "../common/Badge";
import Rating from "../common/Rating";
import Button from "../common/Button";
import { useFavorites } from "../../hooks/useFavorites";

export default function TourCard({
  tour,
  variant = "grid", // grid, list
  className = "",
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  if (!tour) return null;

  const {
    id,
    slug,
    title,
    destination,
    duration,
    groupSize,
    price,
    oldPrice,
    rating,
    reviewsCount,
    badge,
    image,
    highlights = [],
    description,
  } = tour;

  const isSaved = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tour, "tour");
  };

  if (variant === "list") {
    return (
      <div
        className={`group flex flex-col md:flex-row overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
      >
        <div className="relative md:w-2/5 overflow-hidden block">
          <Link to={`/tour/${slug}`} className="block h-full w-full">
            <ImageWithFallback
              src={image}
              alt={title}
              aspectRatio="aspect-16/10 md:aspect-auto"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {badge && (
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <Badge variant="glass" size="xs">
                {badge}
              </Badge>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
            }`}
            title={isSaved ? "Remove from saved" : "Save excursion"}
            aria-label="Save tour"
          >
            <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>{destination}</span>
              </div>
              <div className="text-right">
                {oldPrice && (
                  <span className="text-xs text-slate-400 line-through mr-1.5">
                    ₹{typeof oldPrice === 'number' ? oldPrice.toLocaleString() : oldPrice}
                  </span>
                )}
                <span className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  ₹{typeof price === 'number' ? price.toLocaleString() : price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / person</span>
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
              <Link to={`/tour/${slug}`}>{title}</Link>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>{groupSize}</span>
              </div>
              <Rating value={rating} reviewsCount={reviewsCount} size="xs" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-2">
              {highlights.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/60"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <Button
                to={`/tour/${slug}`}
                variant="outline"
                size="sm"
                className="dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Itinerary Details
              </Button>
              <Button
                to={`/tour/${slug}?book=true`}
                variant="primary"
                size="sm"
                rightIcon={ArrowRight}
              >
                Reserve Tour
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Variant
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
    >
      <div className="relative overflow-hidden block">
        <Link to={`/tour/${slug}`} className="block">
          <ImageWithFallback
            src={image}
            alt={title}
            aspectRatio="aspect-16/10"
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {badge && (
          <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
            <Badge variant="glass" size="xs">
              {badge}
            </Badge>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
            isSaved
              ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
              : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
          }`}
          title={isSaved ? "Remove from saved" : "Save excursion"}
          aria-label="Save tour"
        >
          <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
        </button>

        <div className="absolute bottom-3.5 right-3.5 z-10 rounded-xl bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-white shadow-lg pointer-events-none">
          {oldPrice && (
            <span className="text-[11px] text-slate-400 line-through mr-1.5">
              ₹{typeof oldPrice === 'number' ? oldPrice.toLocaleString() : oldPrice}
            </span>
          )}
          <span className="font-serif text-base font-bold text-[#dfcaa4]">
            ₹{typeof price === 'number' ? price.toLocaleString() : price}
          </span>
          <span className="text-[10px] text-slate-300"> / guest</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>{destination}</span>
            </div>
            <Rating value={rating} reviewsCount={reviewsCount} size="xs" />
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors leading-snug">
            <Link to={`/tour/${slug}`}>{title}</Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>{duration}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>{groupSize}</span>
            </div>
          </div>

          <Link
            to={`/tour/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
