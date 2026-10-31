import { useState } from "react";
import {
  LuImage as ImageIcon
} from "react-icons/lu";

export default function ImageWithFallback({
  src,
  alt = "LuxStay Image",
  fallbackSrc = "/images/placeholders/800x600.svg",
  className = "",
  aspectRatio = "aspect-16/10",
  loading = "lazy",
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const finalSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${aspectRatio} ${className}`}
    >
      {/* Loading Skeleton Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 animate-pulse">
          <ImageIcon className="h-6 w-6 text-slate-400" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={finalSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`h-full w-full object-cover transition-all duration-500 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        {...props}
      />
    </div>
  );
}
