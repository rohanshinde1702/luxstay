import { createContext, useState, useCallback, useEffect } from "react";
import {
  LuCircleCheck as CheckCircle2,
  LuCircleAlert as AlertCircle,
  LuTriangleAlert as AlertTriangle,
  LuInfo as Info,
  LuX as X
} from "react-icons/lu";

export const ToastContext = createContext(null);

let toastListeners = [];

export const toast = (payload, type = "info", duration = 4000) => {
  toastListeners.forEach((fn) => fn(payload, type, duration));
};

toast.success = (payload, duration = 4000) => toast(payload, "success", duration);
toast.error = (payload, duration = 4000) => toast(payload, "error", duration);
toast.warning = (payload, duration = 4000) => toast(payload, "warning", duration);
toast.info = (payload, duration = 4000) => toast(payload, "info", duration);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((payload, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    const toastObj =
      typeof payload === "object" && payload !== null
        ? { id, title: payload.title, message: payload.message, type: payload.type || type }
        : { id, message: payload, type };

    setToasts((prev) => [...prev, toastObj]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  useEffect(() => {
    const handleListener = (payload, type, duration) => {
      addToast(payload, type, duration);
    };
    toastListeners.push(handleListener);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== handleListener);
    };
  }, [addToast]);

  const [hasModalOpen, setHasModalOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkModal = () => {
      const dialog = document.querySelector('[role="dialog"]');
      setHasModalOpen(Boolean(dialog));
    };

    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Intercept native window.alert to automatically convert any alert() into our luxury toaster
  useEffect(() => {
    if (typeof window === "undefined") return;
    const originalAlert = window.alert;
    window.alert = (msg) => {
      addToast(typeof msg === "string" ? msg : JSON.stringify(msg), "warning");
    };
    return () => {
      window.alert = originalAlert;
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast, showToast: addToast }}>
      {children}

      {/* Floating Luxury Toast Notification Container */}
      <div
        className={`fixed z-[999999] flex flex-col gap-2.5 w-full pointer-events-none transition-all duration-300 ${
          hasModalOpen
            ? "top-5 sm:top-6 left-0 right-0 mx-auto max-w-md px-4 items-center"
            : "top-20 sm:top-24 md:top-28 right-4 sm:right-6 max-w-sm px-4 sm:px-0"
        }`}
      >
        {toasts.map((t) => {
          const isError = t.type === "error";
          const isWarning = t.type === "warning";
          const isInfo = t.type === "info";
          const isSuccess = t.type === "success" || (!isError && !isWarning && !isInfo);

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3.5 rounded-xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 w-full ${
                hasModalOpen ? "animate-slide-down" : "animate-slide-left"
              } ${
                isError
                  ? "bg-slate-950/95 border-rose-500/40 text-rose-100 shadow-[0_10px_30px_rgba(244,63,94,0.18)] ring-1 ring-rose-500/20"
                  : isWarning
                  ? "bg-slate-950/95 border-amber-500/40 text-amber-100 shadow-[0_10px_30px_rgba(245,158,11,0.18)] ring-1 ring-amber-500/20"
                  : isInfo
                  ? "bg-slate-950/95 border-sky-500/40 text-sky-100 shadow-[0_10px_30px_rgba(14,165,233,0.18)] ring-1 ring-sky-500/20"
                  : "bg-slate-950/95 border-[#C5A059]/40 text-white shadow-[0_10px_30px_rgba(197,160,89,0.18)] ring-1 ring-[#C5A059]/20"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isError ? (
                  <AlertCircle className="h-5 w-5 text-rose-400" />
                ) : isWarning ? (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                ) : isInfo ? (
                  <Info className="h-5 w-5 text-sky-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-[#C5A059]" />
                )}
              </div>
              <div className="flex-1 text-xs font-medium leading-relaxed">
                {t.title && (
                  <div
                    className={`font-bold text-sm mb-0.5 tracking-tight ${
                      isError
                        ? "text-rose-200"
                        : isWarning
                        ? "text-amber-200"
                        : isInfo
                        ? "text-sky-200"
                        : "text-[#C5A059]"
                    }`}
                  >
                    {t.title}
                  </div>
                )}
                <div className="text-slate-200 leading-snug">{t.message}</div>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 -mr-1 -mt-1 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
