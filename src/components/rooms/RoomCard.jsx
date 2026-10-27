import { Link } from "react-router-dom";
import {
  LuUsers as Users,
  LuBed as Bed,
  LuMaximize2 as Maximize2,
  LuArrowRight as ArrowRight,
  LuHeart as Heart
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import Badge from "../common/Badge";
import Rating from "../common/Rating";
import Button from "../common/Button";
import { useFavorites } from "../../hooks/useFavorites";

export default function RoomCard({
  room,
  variant = "grid", // grid, list, compact, editorial
  className = "",
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  if (!room) return null;

  const {
    id,
    slug,
    name,
    price,
    oldPrice,
    rating,
    reviewsCount,
    guests,
    beds,
    size,
    image,
    badge,
    description,
    amenities = [],
  } = room;

  const isSaved = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(room, "room");
  };

  // List Variant
  if (variant === "list") {
    return (
      <div
        className={`group flex flex-col md:flex-row overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
      >
        {/* Image Container */}
        <div className="relative md:w-2/5 overflow-hidden block">
          <Link to={`/room/${slug}`} className="block h-full w-full">
            <ImageWithFallback
              src={image}
              alt={name}
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
            title={isSaved ? "Remove from saved" : "Save sanctuary"}
            aria-label="Save room"
          >
            <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
          </button>
        </div>

        {/* Content Details */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-7">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Rating value={rating} reviewsCount={reviewsCount} size="xs" />
              <div className="text-right">
                {oldPrice && (
                  <span className="text-xs text-slate-400 line-through mr-2">
                    ₹{typeof oldPrice === 'number' ? oldPrice.toLocaleString() : oldPrice}
                  </span>
                )}
                <span className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  ₹{typeof price === 'number' ? price.toLocaleString() : price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / night</span>
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
              <Link to={`/room/${slug}`}>{name}</Link>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
              {description}
            </p>

            {/* Room Specifications Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070b14]/60 my-2.5">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200/60 dark:border-slate-800/60">
                    <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500 w-1/4">
                      Occupancy
                    </td>
                    <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200 w-1/4">
                      {guests} Guests
                    </td>
                    <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500 w-1/4">
                      Bed Configuration
                    </td>
                    <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200 w-1/4">
                      {beds}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500">
                      Suite Dimension
                    </td>
                    <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200">
                      {size}
                    </td>
                    <td className="py-1.5 px-3 font-semibold text-[10px] uppercase text-slate-400 dark:text-slate-500">
                      Bathrooms
                    </td>
                    <td className="py-1.5 px-3 font-medium text-slate-700 dark:text-slate-200">
                      {room.bathrooms ? `${room.bathrooms} Marble Bath` : "1.5 Marble Bath"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-2">
              {amenities.slice(0, 2).map((amenity, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/60"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <Button
                to={`/room/${slug}`}
                variant="outline"
                size="sm"
                className="dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                View Details
              </Button>
              <Button
                to={`/room/${slug}?book=true`}
                variant="primary"
                size="sm"
                rightIcon={ArrowRight}
              >
                Book Suite
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact Variant
  if (variant === "compact") {
    return (
      <div
        className={`group flex items-center gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] p-3 shadow-xs hover:shadow-md transition-all ${className}`}
      >
        <Link to={`/room/${slug}`} className="h-20 w-24 shrink-0 overflow-hidden rounded-md relative block">
          <ImageWithFallback
            src={image}
            alt={name}
            aspectRatio="h-full w-full"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <Rating value={rating} size="xs" showValue={false} />
            <span className="text-xs font-bold text-slate-900 dark:text-white">₹{typeof price === 'number' ? price.toLocaleString() : price}<span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">/nt</span></span>
          </div>
          <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors mt-0.5">
            <Link to={`/room/${slug}`}>{name}</Link>
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{beds} • {size}</p>
        </div>
      </div>
    );
  }

  // Default Grid Variant
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] shadow-xs transition-all duration-300 hover:border-[#C5A880]/50 dark:hover:border-[#C5A880]/60 ${className}`}
    >
      {/* Image Banner */}
      <div className="relative overflow-hidden block">
        <Link to={`/room/${slug}`} className="block">
          <ImageWithFallback
            src={image}
            alt={name}
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
          title={isSaved ? "Remove from saved" : "Save sanctuary"}
          aria-label="Save room"
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
          <span className="text-[10px] text-slate-300"> / night</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Rating value={rating} reviewsCount={reviewsCount} size="xs" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {guests} Max Guests
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors leading-snug">
            <Link to={`/room/${slug}`}>{name}</Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Specs & CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>{beds.split(" ")[0]} Bed</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>{size.split("/")[0]}</span>
            </div>
          </div>

          <Link
            to={`/room/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
          >
            <span>View Suite</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
