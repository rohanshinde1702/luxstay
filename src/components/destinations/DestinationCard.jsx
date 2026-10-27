import { Link } from "react-router-dom";
import {
  LuArrowRight as ArrowRight,
  LuMapPin as MapPin,
  LuBuilding as Building,
  LuCompass as Compass,
  LuHeart as Heart
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import Badge from "../common/Badge";
import { useFavorites } from "../../hooks/useFavorites";

export default function DestinationCard({
  destination,
  variant = "overlay", // overlay, standard
  className = "",
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  if (!destination) return null;

  const {
    id,
    slug,
    title,
    country,
    image,
    propertiesCount,
    toursCount,
    startingPrice,
    tagline,
  } = destination;

  const isSaved = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(destination, "destination");
  };

  // List Variant (Horizontal Full-Width Layout)
  if (variant === "list") {
    return (
      <div
        className={`group flex flex-col md:flex-row overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
      >
        {/* Left: Image Container */}
        <div className="relative w-full md:w-2/5 overflow-hidden block shrink-0">
          <Link to={`/destination/${slug}`} className="block h-full w-full">
            <ImageWithFallback
              src={image}
              alt={title}
              aspectRatio="h-80 w-full"
              className="h-80 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <Badge variant="glass" size="xs" icon={MapPin}>
              {country}
            </Badge>
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
            }`}
            title={isSaved ? "Remove from saved" : "Save destination"}
            aria-label="Save destination"
          >
            <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
          </button>
        </div>

        {/* Right: Content Details */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-7">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 text-[#C5A880]" />
                  {propertiesCount} Stays
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5 text-[#C5A880]" />
                  {toursCount} Expeditions
                </span>
              </div>

              {startingPrice && (
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-[#dfcaa4]">
                    ₹{typeof startingPrice === "number" ? startingPrice.toLocaleString() : startingPrice}
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> / nt</span>
                  </span>
                </div>
              )}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
              <Link to={`/destination/${slug}`}>{title}</Link>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
              {tagline || destination.overview}
            </p>

            {destination.quickFacts && (
              <div className="overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070b14]/60 my-2.5">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200/60 dark:border-slate-800/60">
                      <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500 w-1/4">
                        Best Season
                      </td>
                      <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200 w-1/4">
                        {destination.quickFacts.bestTime || "Year-round"}
                      </td>
                      <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500 w-1/4">
                        Climate
                      </td>
                      <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200 w-1/4">
                        {destination.quickFacts.climate || "Temperate"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500">
                        Currency
                      </td>
                      <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200">
                        {destination.quickFacts.currency || "Local Currency"}
                      </td>
                      <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500">
                        Airport
                      </td>
                      <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200 truncate max-w-[140px]" title={destination.quickFacts.airport}>
                        {destination.quickFacts.airport || "International"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Region: <strong className="text-slate-900 dark:text-white">{destination.region}</strong>
            </span>

            <div className="flex items-center gap-2.5">
              <Link
                to={`/rooms?dest=${encodeURIComponent(title.split(" &")[0])}`}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                View Accommodations
              </Link>
              <Link
                to={`/destination/${slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#C5A880] text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-[#dfcaa4] transition-colors"
              >
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Overlay Variant (Editorial Magazine Style)
  if (variant === "overlay") {
    return (
      <div className={`group relative block overflow-hidden rounded-lg shadow-md transition-all duration-500 ${className}`}>
        <Link
          to={`/destination/${slug}`}
          className="block h-full w-full"
        >
          <ImageWithFallback
            src={image}
            alt={title}
            aspectRatio="aspect-4/5 sm:aspect-3/4"
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        </Link>

        {/* Top Badges & Favorite Button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
          <Badge variant="glass" size="xs" icon={MapPin}>
            {country}
          </Badge>

          <div className="flex items-center gap-2">
            {startingPrice && (
              <span className="rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#dfcaa4] border border-white/20">
                From ₹{typeof startingPrice === "number" ? startingPrice.toLocaleString() : startingPrice}/nt
              </span>
            )}
            <button
              onClick={handleFavoriteClick}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
              }`}
              title={isSaved ? "Remove from saved" : "Save destination"}
              aria-label="Save destination"
            >
              <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-2 text-white pointer-events-none">
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Building className="h-3 w-3 text-[#C5A880]" />
              {propertiesCount} Stays
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Compass className="h-3 w-3 text-[#C5A880]" />
              {toursCount} Tours
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold leading-tight group-hover:text-[#dfcaa4] transition-colors">
            {title}
          </h3>

          <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed">
            {tagline}
          </p>

          <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#dfcaa4] group-hover:translate-x-1 transition-transform">
            <span>Explore Region</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Variant
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
    >
      <div className="relative overflow-hidden block">
        <Link to={`/destination/${slug}`} className="block">
          <ImageWithFallback
            src={image}
            alt={title}
            aspectRatio="aspect-16/10"
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <Badge variant="glass" size="xs">
            {country}
          </Badge>
        </div>

        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
            isSaved
              ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
              : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
          }`}
          title={isSaved ? "Remove from saved" : "Save destination"}
          aria-label="Save destination"
        >
          <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between p-5 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>{propertiesCount} Accommodations</span>
            <span>•</span>
            <span>{toursCount} Expeditions</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
            <Link to={`/destination/${slug}`}>{title}</Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
            {tagline}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">₹{typeof startingPrice === 'number' ? startingPrice.toLocaleString() : startingPrice} / nt</span>
          </div>

          <Link
            to={`/destination/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
