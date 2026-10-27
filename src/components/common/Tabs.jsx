export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = "pills", // pills, underline, luxury, contained
  size = "md", // sm, md, lg
  className = "",
}) {
  const sizeStyles = {
    sm: "text-xs py-1.5 px-3 gap-1.5",
    md: "text-xs sm:text-sm py-2 px-4 gap-2",
    lg: "text-sm sm:text-base py-2.5 px-5 gap-2.5",
  };

  return (
    <div
      className={`flex items-center overflow-x-auto no-scrollbar ${
        variant === "contained"
          ? "rounded-lg bg-slate-100/90 dark:bg-[#0c1322] p-1.5 border border-slate-200 dark:border-slate-800"
          : variant === "underline"
          ? "border-b border-slate-200 dark:border-slate-800 gap-6"
          : "gap-2"
      } ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        let activeClasses = "";
        if (isActive) {
          if (variant === "pills" || variant === "contained") {
            activeClasses =
              "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-sm";
          } else if (variant === "luxury") {
            activeClasses =
              "bg-[#C5A880] text-slate-950 font-bold shadow-sm";
          } else if (variant === "underline") {
            activeClasses =
              "border-b-2 border-[#C5A880] text-[#997548] dark:text-[#dfcaa4] font-bold";
          }
        } else {
          if (variant === "pills" || variant === "contained") {
            activeClasses =
              "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80";
          } else if (variant === "luxury") {
            activeClasses =
              "bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4]";
          } else if (variant === "underline") {
            activeClasses =
              "border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700";
          }
        }

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A880]/30 ${
              sizeStyles[size] || sizeStyles.md
            } ${activeClasses}`}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#C5A880]/15 text-[#997548]"
                }`}
              >
                {tab.badge}
              </span>
            )}
            {tab.count !== undefined && (
              <span
                className={`ml-1.5 text-[11px] ${
                  isActive ? "text-white/80" : "text-slate-400"
                }`}
              >
                ({tab.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
