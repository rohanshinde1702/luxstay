export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center", // center, left, right
  dark = false,
  size = "md", // sm, md, lg
  action,
  className = "",
}) {
  const alignClasses = {
    center: "text-center mx-auto items-center",
    left: "text-left items-start",
    right: "text-right ml-auto items-end",
  };

  const titleSizes = {
    sm: "text-2xl sm:text-3xl",
    md: "text-3xl sm:text-4xl lg:text-5xl",
    lg: "text-4xl sm:text-5xl lg:text-6xl",
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 ${className}`}
    >
      <div className={`max-w-2xl flex flex-col ${alignClasses[align]}`}>
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-widest text-[#997548] mb-2.5">
            {eyebrow}
          </span>
        )}

        <h2
          className={`font-serif font-bold tracking-tight leading-tight ${
            titleSizes[size] || titleSizes.md
          } ${dark ? "text-white" : "text-slate-900 dark:text-white"}`}
        >
          {title}{" "}
          {highlight && (
            <span className="italic text-[#C5A880]">{highlight}</span>
          )}
        </h2>

        {description && (
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              dark ? "text-slate-300" : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 mt-2 md:mt-0">{action}</div>}
    </div>
  );
}
