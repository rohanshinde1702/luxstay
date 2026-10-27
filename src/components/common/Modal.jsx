import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  LuX as X
} from "react-icons/lu";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md", // sm, md, lg, xl, full
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
}) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        className={`relative w-full rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/10 transition-all duration-300 max-h-[92dvh] sm:max-h-[90vh] my-auto flex flex-col border border-slate-100 dark:border-slate-800 overflow-hidden ${
          sizeClasses[size] || sizeClasses.md
        } ${className}`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 p-4 sm:p-6 pb-3 sm:pb-4 bg-slate-50/50 dark:bg-slate-950/30 rounded-t-xl sm:rounded-t-2xl shrink-0">
            <div>
              {title && (
                <h3
                  id="modal-title"
                  className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-0.5 sm:mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 px-4 sm:px-6 py-3 sm:py-4 rounded-b-xl sm:rounded-b-2xl flex items-center justify-end gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
