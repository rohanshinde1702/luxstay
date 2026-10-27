import { Link } from "react-router-dom";
import {
  LuChevronRight as ChevronRight,
  LuHouse as Home
} from "react-icons/lu";

export default function Breadcrumbs({
  items = [],
  showHome = true,
  dark = false,
  className = "",
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-xs font-medium ${className}`}
    >
      <ol className="flex items-center space-x-2">
        {showHome && (
          <li className="flex items-center">
            <Link
              to="/"
              className={`flex items-center gap-1 transition-colors ${
                dark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const targetPath = item.path || item.to;

          return (
            <li key={item.label || index} className="flex items-center space-x-2">
              <ChevronRight
                className={`h-3 w-3 shrink-0 ${
                  dark ? "text-slate-600" : "text-slate-400 dark:text-slate-600"
                }`}
                aria-hidden="true"
              />
              {isLast || !targetPath ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`line-clamp-1 max-w-[200px] sm:max-w-none ${
                    dark ? "text-[#C5A880]" : "text-slate-900 dark:text-[#dfcaa4] font-semibold"
                  }`}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={targetPath}
                  className={`transition-colors ${
                    dark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
