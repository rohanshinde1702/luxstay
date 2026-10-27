import { useContext } from "react";
import { ToastContext, toast } from "../context/ToastContext";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      addToast: toast,
      removeToast: () => {},
      toast,
      showToast: toast,
    };
  }
  return context;
}

export { toast };
export default useToast;
