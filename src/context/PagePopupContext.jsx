import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getPagePopupConfig, isHomePage, PAGE_POPUPS_CONFIG } from "../data/pagePopups";
import { ROOMS_DATA } from "../data/rooms";
import { useToast } from "../hooks/useToast";

export const PagePopupContext = createContext(null);

const AUTOSHOW_STORAGE_KEY = "luxstay_autopopup_enabled";
const LAST_SHOWN_STORAGE_KEY = "luxstay_popup_last_shown_time";
const RECURRING_INTERVAL_MS = 10 * 60 * 1000; // Exactly every 10 minutes (600,000 ms)
const INITIAL_FIRST_VISIT_DELAY_MS = 2500; // 2.5s smooth entrance on initial visit

export function PagePopupProvider({ children }) {
  const location = useLocation();
  const { addToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(() => getPagePopupConfig(location.pathname));
  const [copiedCode, setCopiedCode] = useState("");
  const [dontShowAgainChecked, setDontShowAgainChecked] = useState(false);
  
  // Auto popup global toggle (default true)
  const [isAutoPopupEnabled, setIsAutoPopupEnabledState] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTOSHOW_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Direct Booking Integration state
  const [bookingModalRoom, setBookingModalRoom] = useState(null);
  const [bookingModalPromo, setBookingModalPromo] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // References to handle interval and path without stale closures
  const currentPathRef = useRef(location.pathname);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const setIsAutoPopupEnabled = useCallback((enabled) => {
    setIsAutoPopupEnabledState(enabled);
    try {
      localStorage.setItem(AUTOSHOW_STORAGE_KEY, JSON.stringify(enabled));
      addToast(
        enabled ? "10-minute recurring homepage popups enabled." : "Automatic homepage popups paused.",
        "info"
      );
    } catch (e) {
      console.error(e);
    }
  }, [addToast]);

  // Update active popup config whenever pathname changes
  useEffect(() => {
    currentPathRef.current = location.pathname;
    const config = getPagePopupConfig(location.pathname);
    setActivePopup(config);
    // If user leaves home pages, automatically dismiss any open popup
    if (!config) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Recurring 10-Minute Popup Timer Lifecycle (Active only for Homepages)
  useEffect(() => {
    if (!isAutoPopupEnabled) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const triggerPopup = () => {
      const currentConfig = getPagePopupConfig(currentPathRef.current);
      // Strictly only display if user is on a homepage
      if (!currentConfig) return;

      setActivePopup(currentConfig);
      setIsOpen(true);
      try {
        localStorage.setItem(LAST_SHOWN_STORAGE_KEY, Date.now().toString());
      } catch (e) {
        console.error(e);
      }
    };

    // Check when popup was last shown
    let delayBeforeNextShow = INITIAL_FIRST_VISIT_DELAY_MS;
    try {
      const lastShown = localStorage.getItem(LAST_SHOWN_STORAGE_KEY);
      if (lastShown) {
        const timePassed = Date.now() - Number(lastShown);
        if (timePassed < RECURRING_INTERVAL_MS) {
          // Calculate remaining time until the 10-minute interval is reached
          delayBeforeNextShow = RECURRING_INTERVAL_MS - timePassed;
        } else {
          delayBeforeNextShow = INITIAL_FIRST_VISIT_DELAY_MS;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Schedule the next popup appearance
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      triggerPopup();

      // After first scheduled execution, establish recurring 10-minute interval
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        triggerPopup();
      }, RECURRING_INTERVAL_MS);
    }, delayBeforeNextShow);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPopupEnabled]);

  // Open popup manually for current page or with custom override
  const openPopup = useCallback((customConfig = null) => {
    const targetConfig = customConfig || getPagePopupConfig(location.pathname) || PAGE_POPUPS_CONFIG["home-beach"];
    if (targetConfig) {
      setActivePopup(targetConfig);
      setIsOpen(true);
      try {
        localStorage.setItem(LAST_SHOWN_STORAGE_KEY, Date.now().toString());
      } catch (e) {
        console.error(e);
      }
    }
  }, [location.pathname]);

  // Close popup
  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Trigger popup for a specific route / page key
  const triggerPopupForRoute = useCallback((routePath) => {
    const config = getPagePopupConfig(routePath) || PAGE_POPUPS_CONFIG["home-beach"];
    if (config) {
      setActivePopup(config);
      setIsOpen(true);
    }
  }, []);

  const triggerPopupById = useCallback((key) => {
    if (PAGE_POPUPS_CONFIG[key]) {
      setActivePopup(PAGE_POPUPS_CONFIG[key]);
      setIsOpen(true);
    }
  }, []);

  // Copy promo code helper
  const copyPromoCode = useCallback((code) => {
    if (!code) return;
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      addToast({
        title: "Privilege Code Copied! ✨",
        message: `Promo code "${code}" is saved to clipboard. Ready to apply at checkout.`,
        type: "success",
      });
      setTimeout(() => setCopiedCode(""), 4000);
    } catch (e) {
      console.error(e);
      addToast(`Promo code: ${code}`, "info");
    }
  }, [addToast]);

  // Reset 10-minute timer and trigger immediately
  const resetDismissedPopups = useCallback(() => {
    try {
      localStorage.removeItem(LAST_SHOWN_STORAGE_KEY);
      addToast("10-minute timer reset. Popup ready to launch.", "success");
    } catch (e) {
      console.error(e);
    }
  }, [addToast]);

  // Open booking modal directly from popup
  const openBookingFromPopup = useCallback((room = null, promoCode = "") => {
    setIsOpen(false);
    const targetRoom = room || activePopup?.roomData || ROOMS_DATA[0];
    const code = promoCode || activePopup?.promoCode || "BEACH40";
    setBookingModalRoom(targetRoom);
    setBookingModalPromo(code);
    setIsBookingModalOpen(true);
  }, [activePopup]);

  const closeBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
    setBookingModalRoom(null);
    setBookingModalPromo("");
  }, []);

  return (
    <PagePopupContext.Provider
      value={{
        isOpen,
        activePopup,
        isHomePage: isHomePage(location.pathname),
        openPopup,
        closePopup,
        triggerPopupForRoute,
        triggerPopupById,
        copyPromoCode,
        copiedCode,
        isAutoPopupEnabled,
        setIsAutoPopupEnabled,
        resetDismissedPopups,
        dontShowAgainChecked,
        setDontShowAgainChecked,
        openBookingFromPopup,
        closeBookingModal,
        bookingModalRoom,
        bookingModalPromo,
        isBookingModalOpen,
        PAGE_POPUPS_CONFIG,
      }}
    >
      {children}
    </PagePopupContext.Provider>
  );
}
