import {
  LuSearch as Search
} from "react-icons/lu";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = Search,
  title = "No Stays Found",
  description = "We could not find any results matching your current filters. Please try adjusting your criteria.",
  action,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 ${className}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548] mb-4">
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-2">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mb-6">
        {description}
      </p>

      {action ||
        (actionLabel && onAction && (
          <Button onClick={onAction} variant="primary" size="sm">
            {actionLabel}
          </Button>
        ))}
    </div>
  );
}
