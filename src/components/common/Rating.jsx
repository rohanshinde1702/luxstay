import { useState } from "react";
import {
  LuStar as Star
} from "react-icons/lu";

export default function Rating({
  value = 5,
  max = 5,
  reviewsCount,
  size = "sm", // xs, sm, md, lg
  showValue = true,
  interactive = false,
  onChange,
  className = "",
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizes = {
    xs: "text-[11px]",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-semibold",
  };

  const activeRating = hoverValue || value;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(max)].map((_, i) => {
          const starNumber = i + 1;
          const isFilled = starNumber <= activeRating;

          return (
            <button
              key={i}
              type={interactive ? "button" : undefined}
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starNumber)}
              onMouseEnter={() => interactive && setHoverValue(starNumber)}
              onMouseLeave={() => interactive && setHoverValue(0)}
              className={`transition-colors ${
                interactive
                  ? "cursor-pointer hover:scale-110 focus:outline-none"
                  : "cursor-default"
              }`}
              aria-label={interactive ? `Rate ${starNumber} stars` : undefined}
            >
              <Star
                className={`${sizeClasses[size] || sizeClasses.sm} ${
                  isFilled
                    ? "fill-[#C5A880] text-[#C5A880]"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span
          className={`font-bold text-slate-900 ${
            textSizes[size] || textSizes.sm
          }`}
        >
          {Number(value).toFixed(1)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span
          className={`text-slate-500 font-normal ${
            textSizes[size] || textSizes.sm
          }`}
        >
          ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
