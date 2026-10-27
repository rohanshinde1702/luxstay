import { Link } from "react-router-dom";
import {
  LuUsers as Users,
  LuBed as Bed,
  LuMaximize2 as Maximize2,
  LuArrowRight as ArrowRight,
  LuHeart as Heart,
  LuStar as Star
} from "react-icons/lu";
import ImageWithFallback from "../common/ImageWithFallback";
import { useFavorites } from "../../hooks/useFavorites";

export default function RoomTable({ rooms = [], onBook, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!rooms || rooms.length === 0) return null;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] shadow-sm relative z-0 ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-[#070b14]/90 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-4 px-5 min-w-[280px]">Suite & Sanctuary</th>
              <th className="py-4 px-4 min-w-[140px]">Occupancy</th>
              <th className="py-4 px-4 min-w-[180px]">Beds & Dimension</th>
              <th className="py-4 px-4 min-w-[180px]">Exclusive Amenities</th>
              <th className="py-4 px-4 min-w-[140px]">Nightly Rate</th>
              <th className="py-4 px-5 text-right min-w-[170px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            {rooms.map((room) => {
              const {
                id,
                slug,
                name,
                category,
                tagline,
                price,
                oldPrice,
                rating,
                guests,
                beds,
                size,
                image,
                badge,
                amenities = []
              } = room;

              const isSaved = isFavorite(id);

              return (
                <tr
                  key={id}
                  className="group hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Suite Info & Thumbnail */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg shadow-xs group-hover:shadow-md transition-shadow">
                        <Link to={`/room/${slug}`} className="block h-full w-full">
                          <ImageWithFallback
                            src={image}
                            alt={name}
                            aspectRatio="h-full w-full"
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        {badge && (
                          <div className="absolute top-1 left-1">
                            <span className="rounded bg-slate-950/80 backdrop-blur-xs px-1.5 py-0.5 text-[9px] font-bold text-[#dfcaa4]">
                              {badge}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/room/${slug}`}
                            className="font-serif text-sm font-bold text-slate-900 dark:text-white hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
                          >
                            {name}
                          </Link>
                          {rating && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                              {rating}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xs font-light">
                          {tagline || room.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Occupancy & Category */}
                  <td className="py-4 px-4 align-middle">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                        <Users className="h-3.5 w-3.5 text-[#C5A880]" />
                        <span>{guests} Max Guests</span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        {category || "Luxury Suite"}
                      </span>
                    </div>
                  </td>

                  {/* Beds & Dimensions */}
                  <td className="py-4 px-4 align-middle">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                        <Bed className="h-3.5 w-3.5 text-[#C5A880]" />
                        <span>{beds}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <Maximize2 className="h-3 w-3 text-slate-400" />
                        <span>{size}</span>
                      </div>
                    </div>
                  </td>

                  {/* Amenities */}
                  <td className="py-4 px-4 align-middle">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {amenities.slice(0, 2).map((item, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 truncate"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Nightly Rate */}
                  <td className="py-4 px-4 align-middle">
                    <div>
                      {oldPrice && (
                        <span className="text-[10px] text-slate-400 line-through block">
                          ₹{typeof oldPrice === "number" ? oldPrice.toLocaleString() : oldPrice}
                        </span>
                      )}
                      <span className="font-serif text-sm font-bold text-slate-900 dark:text-[#dfcaa4] block">
                        ₹{typeof price === "number" ? price.toLocaleString() : price}
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
                          toggleFavorite(room, "room");
                        }}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                          isSaved
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                            : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
                        }`}
                        title={isSaved ? "Saved" : "Save sanctuary"}
                      >
                        <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
                      </button>

                      <Link
                        to={`/room/${slug}`}
                        className="hidden sm:inline-flex items-center px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Details
                      </Link>

                      {onBook ? (
                        <button
                          type="button"
                          onClick={() => onBook(room)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A880] px-3 py-1.5 text-xs font-bold text-slate-950 uppercase tracking-wider hover:bg-[#dfcaa4] transition-colors shadow-xs cursor-pointer"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      ) : (
                        <Link
                          to={`/room/${slug}?book=true`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A880] px-3 py-1.5 text-xs font-bold text-slate-950 uppercase tracking-wider hover:bg-[#dfcaa4] transition-colors shadow-xs"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
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
