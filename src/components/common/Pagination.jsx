import {
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight
} from "react-icons/lu";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-2 py-4 ${className}`}
    >
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 transition-colors hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 disabled:cursor-not-allowed shadow-xs"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-10 w-8 items-center justify-center text-xs text-slate-400 select-none"
              >
                ...
              </span>
            );
          }

          const isActive = currentPage === page;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                isActive
                  ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-md font-bold"
                  : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4]"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 transition-colors hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 disabled:cursor-not-allowed shadow-xs"
        aria-label="Next Page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
