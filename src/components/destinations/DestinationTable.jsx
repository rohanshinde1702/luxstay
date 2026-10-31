import { Link } from "react-router-dom";
import {
  LuMapPin as MapPin,
  LuBuilding as Building,
  LuCompass as Compass,
  LuArrowRight as ArrowRight,
  LuHeart as Heart,
  LuStar as Star,
  LuCalendar as Calendar,
  LuSun as Sun,
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import { useFavorites } from "../../hooks/useFavorites";

export default function DestinationTable({ destinations = [], className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!destinations || destinations.length === 0) return null;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] shadow-sm relative z-0 ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-[#070b14]/90 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-4 px-5 min-w-[280px]">Destination</th>
              <th className="py-4 px-4 min-w-[150px]">Location</th>
              <th className="py-4 px-4 min-w-[180px]">Season & Climate</th>
              <th className="py-4 px-4 min-w-[140px]">Sanctuaries</th>
              <th className="py-4 px-4 min-w-[130px]">Starting From</th>
              <th className="py-4 px-5 text-right min-w-[160px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            {destinations.map((dest) => {
              const {
                id,
                slug,
                title,
                country,
                region,
                image,
                propertiesCount,
                toursCount,
                startingPrice,
                rating,
                tagline,
                quickFacts = {},
              } = dest;

              const isSaved = isFavorite(id);

              return (
                <tr
                  key={id}
                  className="group hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Destination Info & Thumbnail */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg shadow-xs group-hover:shadow-md transition-shadow">
                        <Link to={`/destination/${slug}`} className="block h-full w-full">
                          <ImageWithFallback
                            src={image}
                            alt={title}
                            aspectRatio="h-full w-full"
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/destination/${slug}`}
                            className="font-serif text-sm font-bold text-slate-900 dark:text-white hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
                          >
                            {title}
                          </Link>
                          {rating && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                              {rating}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xs font-light">
                          {tagline}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location & Region */}
                  <td className="py-4 px-4 align-middle">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200 text-xs">
                        <MapPin className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                        <span>{country}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal">
                        {region}
                      </span>
                    </div>
                  </td>

                  {/* Season & Climate */}
                  <td className="py-4 px-4 align-middle">
                    <div className="space-y-1 text-[11px]">
                      {quickFacts.bestTime && (
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Calendar className="h-3 w-3 text-[#C5A880] shrink-0" />
                          <span>{quickFacts.bestTime}</span>
                        </div>
                      )}
                      {quickFacts.climate && (
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <Sun className="h-3 w-3 text-[#C5A880] shrink-0" />
                          <span className="truncate max-w-[150px]">{quickFacts.climate}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Accommodations & Tours */}
                  <td className="py-4 px-4 align-middle">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                        <Building className="h-3.5 w-3.5 text-[#C5A880]" />
                        <span>{propertiesCount} Stays</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <Compass className="h-3 w-3 text-slate-400" />
                        <span>{toursCount} Tours</span>
                      </div>
                    </div>
                  </td>

                  {/* Starting Price */}
                  <td className="py-4 px-4 align-middle">
                    <div>
                      <span className="font-serif text-sm font-bold text-slate-900 dark:text-[#dfcaa4] block">
                        ${typeof startingPrice === "number" ? startingPrice.toLocaleString() : startingPrice}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        per night
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right align-middle">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(dest, "destination");
                        }}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                          isSaved
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                            : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
                        }`}
                        title={isSaved ? "Saved" : "Save destination"}
                      >
                        <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
                      </button>

                      <Link
                        to={`/destination/${slug}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A880] px-3 py-1.5 text-xs font-bold text-slate-950 uppercase tracking-wider hover:bg-[#dfcaa4] transition-colors shadow-xs"
                      >
                        <span>Explore</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
