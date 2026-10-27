import { useState, useEffect } from "react";
import { ThemeContext } from "./theme-context";

const STORAGE_KEYS = {
  THEME: "luxstay_theme",
  HEADER_VARIANT: "luxstay_header_variant",
  STICKY_HEADER: "luxstay_sticky_header",
  FOOTER_VARIANT: "luxstay_footer_variant",
  FONT_FAMILY: "luxstay_font_family",
};

export function ThemeProvider({ children }) {
  // Theme mode: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "light" // Default to light luxury for hotel flagship, easily toggled
      : "light";
  });

  // Font family: 'raleway' | 'noto' (Default: 'raleway')
  const [fontFamily, setFontFamily] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FONT_FAMILY);
    if (saved === "noto" || saved === "raleway") return saved;
    return "raleway";
  });

  // Header style: 'standard' | 'transparent' | 'dark' | 'minimal'
  const [headerVariant, setHeaderVariant] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.HEADER_VARIANT) || "standard";
  });

  // Sticky header behavior: permanently true (always sticky)
  const [isStickyHeader, setIsStickyHeader] = useState(true);

  // Clean up any legacy false value from localStorage on mount
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEYS.STICKY_HEADER);
  }, []);

  // Footer style: 'standard' | 'minimal' | 'newsletter'
  const [footerVariant, setFooterVariant] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.FOOTER_VARIANT) || "standard";
  });

  // Sync theme with DOM class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Sync font family with DOM data-font attribute on <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-font", fontFamily);
    localStorage.setItem(STORAGE_KEYS.FONT_FAMILY, fontFamily);
  }, [fontFamily]);

  // Sync header variant
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HEADER_VARIANT, headerVariant);
  }, [headerVariant]);

  // Sync footer variant
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOOTER_VARIANT, footerVariant);
  }, [footerVariant]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const resetTheme = () => {
    setTheme("light");
    setFontFamily("raleway");
    setHeaderVariant("standard");
    setIsStickyHeader(true);
    setFooterVariant("standard");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        fontFamily,
        setFontFamily,
        headerVariant,
        setHeaderVariant,
        isStickyHeader,
        setIsStickyHeader,
        footerVariant,
        setFooterVariant,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
