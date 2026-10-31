import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  LuX as X,
  LuHeart as Heart,
  LuTrash2 as Trash2,
  LuArrowRight as ArrowRight,
  LuBuilding as Building,
  LuMapPin as MapPin
} from "react-icons/lu";
import { useFavorites } from "../../hooks/useFavorites";
import ImageWithFallback from "./ImageWithFallback";
import Button from "./Button";

export default function SavedDrawer({ isOpen, onClose }) {
  const { favorites, removeFavorite, clearFavorites, favoritesCount } = useFavorites();

  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

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

  if (!isOpen || typeof document === "undefined") return null;

  const drawerContent = (
    <div className="fixed inset-0 z-[99999] flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 transition-all duration-300 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30">
              <Heart className="h-4 w-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                Saved Sanctuaries
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {favoritesCount} {favoritesCount === 1 ? "Item" : "Items"} Bookmarked
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close saved drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {favorites.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                <Heart className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                  No Saved Sanctuaries Yet
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Click the heart icon on any suite, private villa, or bespoke tour to save your favorites here.
                </p>
              </div>
              <Button to="/rooms" variant="primary" size="sm" onClick={onClose}>
                Explore Accommodations
              </Button>
            </div>
          ) : (
            favorites.map((item) => {
              const targetLink =
                item.type === "tour"
                  ? `/tour/${item.slug}`
                  : item.type === "destination"
                  ? `/destination/${item.slug}`
                  : `/room/${item.slug}`;

              return (
                <div
                  key={item.id}
                  className="flex gap-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-3 hover:border-[#C5A059]/50 transition-all group"
                >
                  <Link
                    to={targetLink}
                    onClick={onClose}
                    className="h-20 w-24 rounded-lg overflow-hidden shrink-0 relative block"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      aspectRatio="h-full w-full"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4]">
                          {item.type || "Sanctuary"}
                        </span>
                        <button
                          onClick={() => removeFavorite(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#997548] transition-colors mt-0.5">
                        <Link to={targetLink} onClick={onClose}>
                          {item.name}
                        </Link>
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                      {item.price && (
                        <span className="font-bold text-slate-900 dark:text-white">
                          ${typeof item.price === "number" ? item.price.toLocaleString() : item.price}
                          <span className="text-[10px] text-slate-500 font-normal"> / nt</span>
                        </span>
                      )}
                      <Link
                        to={targetLink}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#997548] dark:text-[#dfcaa4] hover:underline"
                      >
                        <span>View</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Actions */}
        {favorites.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 space-y-2">
            <Button
              to="/rooms"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={onClose}
            >
              Browse More Sanctuaries
            </Button>
            <button
              onClick={clearFavorites}
              className="w-full text-center text-xs text-slate-400 hover:text-rose-500 transition-colors py-1 cursor-pointer font-medium"
            >
              Clear All Saved Items
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
