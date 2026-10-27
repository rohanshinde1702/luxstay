import { Link } from "react-router-dom";
import {
  LuLoaderCircle as Loader2
} from "react-icons/lu";

export default function Button({
  children,
  variant = "primary", // primary, gold, accent, outline, ghost, dark, white, danger
  size = "md", // xs, sm, md, lg
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  fullWidth = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 uppercase tracking-wider select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl";

  const sizeStyles = {
    xs: "text-[10px] px-3 py-1.5 gap-1.5",
    sm: "text-xs px-4 py-2 gap-2",
    md: "text-xs px-5 py-2.5 gap-2.5",
    lg: "text-sm px-7 py-3.5 gap-3",
  };

  const variantStyles = {
    primary:
      "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 hover:bg-[#C5A880] hover:text-slate-900 dark:hover:bg-[#dfcaa4] focus:ring-slate-900 shadow-sm hover:shadow-md cursor-pointer",
    gold:
      "bg-[#C5A880] text-slate-950 hover:bg-[#b59367] hover:text-white focus:ring-[#C5A880] shadow-sm hover:shadow-md cursor-pointer",
    accent:
      "bg-[#C5A880] text-slate-950 hover:bg-slate-900 hover:text-white focus:ring-[#C5A880] shadow-sm hover:shadow-md cursor-pointer",
    outline:
      "border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-800 dark:hover:border-slate-600 focus:ring-slate-900 cursor-pointer",
    ghost:
      "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white focus:ring-slate-300 cursor-pointer",
    dark:
      "bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-800 border border-slate-800 cursor-pointer",
    white:
      "bg-white text-slate-900 hover:bg-slate-100 focus:ring-white shadow-md hover:shadow-lg cursor-pointer",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm cursor-pointer",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      {!isLoading && LeftIcon && <LeftIcon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
      {!isLoading && RightIcon && <RightIcon className="h-4 w-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
