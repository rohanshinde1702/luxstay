export default function Badge({
  children,
  variant = "gold", // gold, navy, emerald, amber, rose, slate, outline, glass
  size = "sm", // xs, sm, md
  icon: Icon,
  dot = false,
  className = "",
  pill = true,
  ...props
}) {
  const sizeStyles = {
    xs: "text-[10px] px-2 py-0.5 gap-1",
    sm: "text-xs px-2.5 py-1 gap-1.5",
    md: "text-xs px-3.5 py-1.5 gap-2 font-semibold",
  };

  const variantStyles = {
    gold: "bg-[#C5A880]/15 dark:bg-[#C5A880]/25 text-[#997548] dark:text-[#dfcaa4] border border-[#C5A880]/30 dark:border-[#C5A880]/40",
    navy: "bg-slate-900 dark:bg-slate-800 text-white border border-slate-800 dark:border-slate-700",
    emerald: "bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
    amber: "bg-amber-500/15 dark:bg-amber-500/25 text-amber-700 dark:text-amber-400 border border-amber-500/20",
    rose: "bg-rose-500/15 dark:bg-rose-500/25 text-rose-700 dark:text-rose-400 border border-rose-500/20",
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    outline: "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-transparent",
    glass: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-900 dark:text-white border border-white/40 dark:border-slate-700/60 shadow-xs",
  };

  const dotColors = {
    gold: "bg-[#997548] dark:bg-[#dfcaa4]",
    navy: "bg-white",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    slate: "bg-slate-500",
    outline: "bg-slate-600 dark:bg-slate-400",
    glass: "bg-amber-600 dark:bg-amber-400",
  };

  return (
    <span
      className={`inline-flex items-center font-medium tracking-wide ${
        pill ? "rounded-full" : "rounded-lg"
      } ${sizeStyles[size] || sizeStyles.sm} ${
        variantStyles[variant] || variantStyles.gold
      } ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            dotColors[variant] || dotColors.gold
          } animate-pulse`}
        />
      )}
      {Icon && <Icon className="h-3 w-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
