import { useContext } from "react";
import { PagePopupContext } from "../context/PagePopupContext";

export function usePagePopup() {
  const context = useContext(PagePopupContext);
  if (!context) {
    throw new Error("usePagePopup must be used within a PagePopupProvider");
  }
  return context;
}
