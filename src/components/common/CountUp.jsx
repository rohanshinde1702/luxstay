import { useState, useEffect, useRef } from "react";

/**
 * Parses raw strings or numbers like "38°C", "100%", "2,400+", "4.8", "10K+", "24/7"
 * into structured numeric target, decimals, prefix, suffix, and comma formatting.
 */
export function parseStatValue(raw) {
  if (typeof raw === "number") {
    return {
      prefix: "",
      end: raw,
      decimals: Number.isInteger(raw) ? 0 : (raw.toString().split(".")[1]?.length || 1),
      hasComma: false,
      suffix: "",
    };
  }

  const str = String(raw || "").trim();
  const match = str.match(/^([^\d.]*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", end: 0, decimals: 0, hasComma: false, suffix: str };
  }

  const [, prefix, numStr, suffix] = match;
  const hasComma = numStr.includes(",");
  const cleanNum = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return {
    prefix: prefix || "",
    end: isNaN(cleanNum) ? 0 : cleanNum,
    decimals,
    hasComma,
    suffix: suffix || "",
  };
}

/**
 * Ease Out Cubic easing function for smooth luxury counter animation.
 */
function easeOutCubic(t) {
  return --t * t * t + 1;
}

/**
 * CountUp Component
 * 
 * Animates from 0 to target `end` value when visible in the viewport.
 * Automatically resets to 0 when scrolled out of viewport.
 * 
 * Props:
 * - value / children / end: string | number (e.g. "38°C", "100%", 12, "2,400+")
 * - duration: duration in milliseconds (default: 1800ms)
 * - prefix: optional prefix string (e.g. "$", "₹")
 * - suffix: optional suffix string (e.g. "°C", "%", "+")
 * - decimals: optional decimal places count
 * - separator: boolean or string (default: true if input has commas)
 * - className: custom styling classes
 */
export default function CountUp({
  value,
  children,
  end: propEnd,
  start = 0,
  duration = 1800,
  prefix: propPrefix,
  suffix: propSuffix,
  decimals: propDecimals,
  separator = true,
  className = "",
  threshold = 0.2,
}) {
  const rawInput = value ?? children ?? propEnd ?? 0;
  const parsed = parseStatValue(rawInput);

  const targetEnd = propEnd !== undefined ? Number(propEnd) : parsed.end;
  const prefix = propPrefix !== undefined ? propPrefix : parsed.prefix;
  const suffix = propSuffix !== undefined ? propSuffix : parsed.suffix;
  const decimals = propDecimals !== undefined ? propDecimals : parsed.decimals;
  const useSeparator = separator && (parsed.hasComma || targetEnd >= 1000);

  const [currentValue, setCurrentValue] = useState(start);
  const elementRef = useRef(null);
  const animFrameRef = useRef(null);
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersectingRef.current = true;
            startAnimation();
          } else {
            isIntersectingRef.current = false;
            if (animFrameRef.current) {
              cancelAnimationFrame(animFrameRef.current);
            }
            setCurrentValue(start);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [targetEnd, start, duration, threshold]);

  const startAnimation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startTime = performance.now();
    const diff = targetEnd - start;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const val = start + diff * easedProgress;

      setCurrentValue(val);

      if (progress < 1 && isIntersectingRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else if (progress >= 1) {
        setCurrentValue(targetEnd);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  // Format the display string
  const formatNumber = (num) => {
    const fixed = num.toFixed(decimals);
    if (!useSeparator) return fixed;

    const [intPart, decPart] = fixed.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
  };

  return (
    <span ref={elementRef} className={`inline-block tabular-nums transition-opacity duration-200 ${className}`}>
      {prefix}
      {formatNumber(currentValue)}
      {suffix}
    </span>
  );
}
