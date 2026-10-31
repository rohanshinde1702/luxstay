import { useState, useEffect, useCallback } from "react";
import {
  LuX as X,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuMaximize2 as Maximize2
} from "react-icons/lu";
import Tabs from "../common/Tabs";
import Badge from "../common/Badge";
import ImageWithFallback from "../common/ImageWithFallback";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../../data/gallery";

export default function GalleryLightbox({
  items = GALLERY_ITEMS,
  showFilter = true,
  layout = "grid", // grid, masonry
  showGrid = true,
  isOpen,
  initialIndex = 0,
  onClose,
  className = "",
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [internalIndex, setInternalIndex] = useState(null);

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const isControlled = isOpen !== undefined;
  const isLightboxOpen = isControlled ? isOpen : internalIndex !== null;
  const activeImageIndex = isControlled
    ? (internalIndex !== null ? internalIndex : initialIndex)
    : internalIndex;

  const safeIndex = activeImageIndex !== null && activeImageIndex >= 0 && activeImageIndex < filteredItems.length
    ? activeImageIndex
    : 0;
  const currentImage = isLightboxOpen && filteredItems.length > 0 ? filteredItems[safeIndex] : null;

  const handleNext = useCallback(() => {
    if (!filteredItems.length) return;
    const nextIdx = (safeIndex + 1) % filteredItems.length;
    setInternalIndex(nextIdx);
  }, [safeIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (!filteredItems.length) return;
    const prevIdx = (safeIndex - 1 + filteredItems.length) % filteredItems.length;
    setInternalIndex(prevIdx);
  }, [safeIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setInternalIndex(null);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (isControlled && isOpen && initialIndex !== undefined) {
      setInternalIndex(initialIndex);
    }
  }, [isControlled, isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, handleNext, handlePrev, handleClose]);

  return (
    <div className={className}>
      {/* Filter Tabs & Grid (Only shown when showGrid is true) */}
      {showGrid && (
        <div className="space-y-8">
          {showFilter && (
            <div className="flex justify-center pb-2">
              <Tabs
                tabs={GALLERY_CATEGORIES}
                activeTab={selectedCategory}
                onChange={setSelectedCategory}
                variant="contained"
              />
            </div>
          )}

          {/* Gallery Photos Display */}
          <div
            className={`grid gap-5 ${
              layout === "masonry"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => setInternalIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-slate-100 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <ImageWithFallback
                  src={item.src}
                  alt={item.title}
                  aspectRatio={item.aspect === "portrait" ? "aspect-3/4" : "aspect-16/11"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-6 text-white">
                  <div className="flex justify-end">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-transform duration-300 group-hover:scale-110">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="rounded bg-[#C5A880]/30 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-[#dfcaa4] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p className="text-xs text-slate-300 line-clamp-1 font-light">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Click Close Area */}
          <div
            className="absolute inset-0 z-0 bg-transparent cursor-pointer"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Top Bar with Counter & Close */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 text-white pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto">
              <Badge variant="glass" size="sm">
                Photo {safeIndex + 1} of {filteredItems.length}
              </Badge>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider hidden sm:inline-block">
                {currentImage.title}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer pointer-events-auto shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Prev Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#C5A880] hover:text-slate-950 shadow-2xl cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main Image Stage */}
          <div className="relative z-10 max-h-[82vh] max-w-5xl w-full flex flex-col items-center justify-center px-4 sm:px-12 pointer-events-none">
            <div className="relative overflow-hidden rounded-lg shadow-2xl bg-slate-900 flex flex-col items-center max-w-full max-h-[75vh] pointer-events-auto border border-white/10">
              <img src={currentImage.src}
                alt={currentImage.title}
                className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              {(currentImage.caption || currentImage.title) && (
                <div className="w-full bg-slate-950/90 backdrop-blur-md p-3.5 sm:p-4 text-center border-t border-white/10 shrink-0">
                  <p className="font-serif text-sm sm:text-base font-semibold text-white">
                    {currentImage.title}
                  </p>
                  {currentImage.caption && (
                    <p className="text-xs text-slate-400 mt-0.5 max-w-xl mx-auto line-clamp-2">
                      {currentImage.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#C5A880] hover:text-slate-950 shadow-2xl cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
