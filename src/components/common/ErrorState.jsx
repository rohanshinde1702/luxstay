import {
  LuCircleAlert as AlertCircle,
  LuRotateCcw as RotateCcw
} from "react-icons/lu";
import Button from "./Button";

export default function ErrorState({
  title = "Something Went Wrong",
  message = "We encountered an unexpected error while loading this content. Please refresh or try again.",
  onRetry,
  retryLabel = "Try Again",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border border-rose-200 bg-rose-50/40 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-rose-100 text-rose-600 mb-4">
        <AlertCircle className="h-7 w-7" />
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-2">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          leftIcon={RotateCcw}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
