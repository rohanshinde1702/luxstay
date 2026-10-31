import popupsData from "./json/pagePopups.json";

export const PAGE_POPUPS_CONFIG = popupsData.PAGE_POPUPS_CONFIG || popupsData;

export function isHomePage(pathname) {
  if (!pathname) return true;
  const cleanPath = pathname.toLowerCase().replace(/\/$/, "") || "/";
  return (
    cleanPath === "/" ||
    cleanPath === "/home-beach" ||
    cleanPath === "/home-hotel" ||
    cleanPath === "/home-resort" ||
    cleanPath === "/home-travel" ||
    cleanPath === "/home-boutique" ||
    cleanPath === "/home-villa" ||
    cleanPath === "/home-modern" ||
    cleanPath === "/home-dark" ||
    cleanPath === "/home-demos"
  );
}

export function getPagePopupConfig(pathname) {
  if (!pathname) return PAGE_POPUPS_CONFIG["home-beach"];

  const cleanPath = pathname.toLowerCase().replace(/\/$/, "") || "/";

  if (!isHomePage(cleanPath)) {
    return null;
  }

  if (cleanPath === "/" || cleanPath === "/home-beach") return PAGE_POPUPS_CONFIG["home-beach"];
  if (cleanPath === "/home-hotel") return PAGE_POPUPS_CONFIG["home-hotel"];
  if (cleanPath === "/home-resort") return PAGE_POPUPS_CONFIG["home-resort"];
  if (cleanPath === "/home-travel") return PAGE_POPUPS_CONFIG["home-travel"];
  if (cleanPath === "/home-boutique") return PAGE_POPUPS_CONFIG["home-boutique"];
  if (cleanPath === "/home-villa") return PAGE_POPUPS_CONFIG["home-villa"];
  if (cleanPath === "/home-modern") return PAGE_POPUPS_CONFIG["home-modern"];
  if (cleanPath === "/home-dark") return PAGE_POPUPS_CONFIG["home-dark"];
  if (cleanPath === "/home-demos") return PAGE_POPUPS_CONFIG["home-demos"];

  return PAGE_POPUPS_CONFIG["home-beach"];
}

export default PAGE_POPUPS_CONFIG;
