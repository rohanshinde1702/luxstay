import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LuArrowUp as ArrowUp
} from "react-icons/lu";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show floating button on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#0F172A] dark:bg-slate-800 text-[#C5A880] dark:text-[#dfcaa4] shadow-2xl border border-[#C5A880]/30 transition-all duration-300 hover:scale-110 hover:bg-[#C5A880] hover:text-slate-950 dark:hover:bg-[#C5A880] dark:hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </>
  );
}
