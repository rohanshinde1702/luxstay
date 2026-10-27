import { useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight
} from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 1 card on mobile, 2 on tablet, 3 on desktop
const DEFAULT_BREAKPOINTS = {
  0: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
};

const CONTROL_THEMES = {
  light:
    "border-stone-300 text-slate-700 hover:bg-stone-200 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
  dark: "border-white/20 text-white hover:bg-white/10",
};

/**
 * Reusable Swiper-powered reviews/testimonials slider.
 * Each page keeps its own card design through `renderItem`.
 *
 * - `prevEl` / `nextEl`: optional CSS selectors for arrow buttons that live elsewhere
 *   on the page (e.g. in the section header). When omitted, built-in arrows are rendered.
 * - `showControls`: renders the built-in arrows + pagination dots below the slider.
 * - `theme`: "light" | "dark" styling for the built-in controls.
 */
export default function ReviewsSlider({
  items,
  renderItem,
  getKey = (item, i) => item.id ?? i,
  breakpoints = DEFAULT_BREAKPOINTS,
  prevEl,
  nextEl,
  showControls = true,
  theme = "light",
  autoplayDelay = 4500,
  spaceBetween = 24,
  className = "",
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const prevClass = `reviews-prev-${uid}`;
  const nextClass = `reviews-next-${uid}`;
  const paginationClass = `reviews-pagination-${uid}`;

  const hasExternalArrows = Boolean(prevEl && nextEl);
  const showBuiltInArrows = showControls && !hasExternalArrows;
  const controlClass = CONTROL_THEMES[theme] || CONTROL_THEMES.light;

  return (
    <div className={`reviews-slider ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: hasExternalArrows ? prevEl : `.${prevClass}`,
          nextEl: hasExternalArrows ? nextEl : `.${nextClass}`,
        }}
        pagination={showControls ? { el: `.${paginationClass}`, clickable: true } : false}
        loop={items.length >= 4}
        speed={700}
        grabCursor
        spaceBetween={spaceBetween}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={breakpoints}
        className="pb-1!"
      >
        {items.map((item, i) => (
          <SwiperSlide key={getKey(item, i)} className="h-auto!">
            <div className="h-full">{renderItem(item, i)}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showControls && (
        <div className="mt-8 flex items-center justify-center gap-5">
          {showBuiltInArrows && (
            <button
              type="button"
              aria-label="Previous review"
              className={`${prevClass} h-10 w-10 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${controlClass}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div className={`${paginationClass} reviews-slider-pagination`} />

          {showBuiltInArrows && (
            <button
              type="button"
              aria-label="Next review"
              className={`${nextClass} h-10 w-10 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${controlClass}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
