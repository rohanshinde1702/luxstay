import {
  LuLoaderCircle as Loader2
} from "react-icons/lu";

export default function LoadingState({
  type = "skeleton-grid", // skeleton-grid, skeleton-list, spinner, card
  count = 3,
  message = "Loading luxury experiences...",
  className = "",
}) {
  if (type === "spinner") {
    return (
      <div
        className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
      >
        <Loader2 className="h-8 w-8 animate-spin text-[#C5A880] mb-3" />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {message}
        </p>
      </div>
    );
  }

  if (type === "skeleton-list") {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-xs animate-pulse"
          >
            <div className="h-48 sm:h-40 sm:w-64 rounded-md bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="flex-1 space-y-3 py-2">
              <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-1/2 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="pt-4 flex items-center justify-between">
                <div className="h-6 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-9 w-28 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default skeleton-grid
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 shadow-xs space-y-4 animate-pulse"
        >
          <div className="h-56 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2">
            <div className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-4/5 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-2/3 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
