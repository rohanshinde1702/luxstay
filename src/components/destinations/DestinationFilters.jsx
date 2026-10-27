import {
  LuGlobe as Globe,
  LuRotateCcw as RotateCcw
} from "react-icons/lu";
import Button from "../common/Button";
import { DESTINATION_REGIONS } from "../../constants/travelFilters";

export default function DestinationFilters({
  filters,
  onChange,
  onReset,
  className = "",
}) {
  const { region = "all" } = filters;

  const handleRegionClick = (regId) => {
    onChange({ ...filters, region: regId });
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
          <Globe className="h-4 w-4 text-[#C5A880]" />
          <span>Filter Region:</span>
        </div>

        {DESTINATION_REGIONS.map((reg) => {
          const isSelected = region === reg.id;
          return (
            <button
              key={reg.id}
              type="button"
              onClick={() => handleRegionClick(reg.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 shadow-xs font-bold"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {reg.label.split(" (")[0]}
            </button>
          );
        })}
      </div>

      {region !== "all" && (
        <Button
          variant="ghost"
          size="xs"
          leftIcon={RotateCcw}
          onClick={onReset}
        >
          Reset Region
        </Button>
      )}
    </div>
  );
}
