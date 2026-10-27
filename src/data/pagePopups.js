/**
 * ==============================================================================
 * LUXSTAY HOME PAGE POPUPS REGISTRY
 * ==============================================================================
 * Clean, modern luxury resort promotional popups matched precisely to the
 * reference screenshot design, exclusive to LuxStay homepages.
 */

export const PAGE_POPUPS_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. HOME BEACH SANCTUARY (DEFAULT HOME)
  // ----------------------------------------------------------------------------
  "home-beach": {
    id: "home-beach-offer",
    route: "/home-beach",
    pageName: "Home Beach Sanctuary",
    eyebrow: "LIMITED TIME OFFER",
    title: "Get Up to 40% Off on Your Next Stay",
    subtitle: "Indulge in luxury, comfort and breathtaking views. Book now and save big on your dream vacation.",
    image: "/images/luxury-beach-popup-villa.jpg",
    scriptTop: "Special",
    scriptBottom: "Offer",
    imageTagline: "Make your next getaway more memorable",
    promoCode: "BEACH40",
    promoDiscount: "40% Discount",
    badge: "Special Offer",
    highlights: [
      { title: "Up to 40% Discount", subtitle: "On selected rooms & suites", icon: "Tag" },
      { title: "Free Breakfast", subtitle: "For all bookings", icon: "Utensils" },
      { title: "Flexible Cancellation", subtitle: "Hassle-free booking", icon: "ShieldCheck" },
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 2. HOME LUXURY GRAND HOTEL
  // ----------------------------------------------------------------------------
  "home-hotel": {
    id: "home-hotel-offer",
    route: "/home-hotel",
    pageName: "Home Luxury Grand Hotel",
    eyebrow: "GRAND PALACE PRIVILEGE",
    title: "Exclusive Grand Suite Experience",
    subtitle: "Experience iconic 5-star urban elegance. Book today to enjoy complimentary dining credit and luxury limousine transfers.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Grand",
    scriptBottom: "Luxury",
    imageTagline: "Elevated hospitality in the heart of the city",
    promoCode: "GRANDSTAY",
    promoDiscount: "₹20,000 Credit",
    badge: "Palace Privilege",
    highlights: [
      { title: "₹20,000 Dining Credit", subtitle: "For Michelin-starred dining & spa", icon: "Utensils" },
      { title: "Airport Limousine", subtitle: "Complimentary Mercedes transfer", icon: "Car" },
      { title: "Late 4 PM Checkout", subtitle: "Guaranteed extended departure", icon: "Clock" },
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 3. HOME TROPICAL RESORT & SPA
  // ----------------------------------------------------------------------------
  "home-resort": {
    id: "home-resort-offer",
    route: "/home-resort",
    pageName: "Home Tropical Resort & Spa",
    eyebrow: "WELLNESS RETREAT ESCAPE",
    title: "Stay 5 Nights, Pay for 4",
    subtitle: "Immerse your senses in holistic tropical luxury. Enjoy your 5th night complimentary plus daily organic hydrotherapy sessions.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Tropical",
    scriptBottom: "Escape",
    imageTagline: "Pure serenity surrounded by nature",
    promoCode: "RESORTZEN",
    promoDiscount: "5th Night Free",
    badge: "Wellness Escape",
    highlights: [
      { title: "5th Night Complimentary", subtitle: "Stay 5 nights, pay for 4", icon: "Tag" },
      { title: "Daily Spa Treatment", subtitle: "60-minute signature hydrotherapy", icon: "Flame" },
      { title: "Organic Breakfast Included", subtitle: "Farm-to-table gourmet dining", icon: "Utensils" },
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 4. HOME TRAVEL & EXPEDITIONS
  // ----------------------------------------------------------------------------
  "home-travel": {
    id: "home-travel-offer",
    route: "/home-travel",
    pageName: "Home Travel & Expeditions",
    eyebrow: "WORLD WANDERER PASS",
    title: "Bespoke Archipelago Expeditions",
    subtitle: "Embark on uncharted journeys. Enjoy complimentary helicopter transfers on all multi-day chartered private expeditions.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Island",
    scriptBottom: "Voyage",
    imageTagline: "Discover uncharted tropical wonders",
    promoCode: "WANDERLUST",
    promoDiscount: "Free Aviation Transfer",
    badge: "Expedition Pass",
    highlights: [
      { title: "Helicopter Transfer", subtitle: "Complimentary island aviation", icon: "Plane" },
      { title: "Private Master Naturalist", subtitle: "Certified expedition guidance", icon: "Compass" },
      { title: "4K Drone Photography", subtitle: "Bespoke trip photo & video album", icon: "Camera" },
    ],
    primaryAction: { label: "EXPLORE TOURS", link: "/tours", actionType: "navigate" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 5. HOME HERITAGE BOUTIQUE
  // ----------------------------------------------------------------------------
  "home-boutique": {
    id: "home-boutique-offer",
    route: "/home-boutique",
    pageName: "Home Heritage Boutique",
    eyebrow: "ARTISAN HERITAGE PERK",
    title: "Artisan Vineyard & Heritage Stays",
    subtitle: "Discover timeless charm. Guests staying in our Heritage Suites receive private sommelier cellar tastings and bespoke welcome gifts.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Heritage",
    scriptBottom: "Living",
    imageTagline: "Timeless craftsmanship and wine heritage",
    promoCode: "BOUTIQUE15",
    promoDiscount: "15% Off",
    badge: "Heritage Perk",
    highlights: [
      { title: "15% Suite Discount", subtitle: "On all boutique heritage suites", icon: "Tag" },
      { title: "Sommelier Cellar Tasting", subtitle: "Private vintage tasting for two", icon: "Wine" },
      { title: "Artisan High Tea", subtitle: "Served daily on private balcony", icon: "Utensils" },
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 6. HOME PRIVATE ISLAND VILLAS
  // ----------------------------------------------------------------------------
  "home-villa": {
    id: "home-villa-offer",
    route: "/home-villa",
    pageName: "Home Private Island Villas",
    eyebrow: "PRIVATE ISLAND ULTRA-LUXE",
    title: "Secluded Clifftop Villa Sanctuaries",
    subtitle: "Unmatched seclusion and infinity horizons. Every private villa reservation includes a dedicated private chef and private jet terminal escort.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Private",
    scriptBottom: "Haven",
    imageTagline: "Complete seclusion with personal butler",
    promoCode: "VILLALUXE",
    promoDiscount: "Private Chef Included",
    badge: "Villa Sanctuary",
    highlights: [
      { title: "Dedicated Private Chef", subtitle: "Michelin-trained bespoke meals", icon: "Utensils" },
      { title: "VIP Jet Terminal Escort", subtitle: "Luggage valet & private transfer", icon: "Plane" },
      { title: "Private Infinity Pool", subtitle: "Heated sea-view deck & cabana", icon: "Sun" },
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 7. HOME MODERN MINIMALIST LUXE
  // ----------------------------------------------------------------------------
  "home-modern": {
    id: "home-modern-offer",
    route: "/home-modern",
    pageName: "Home Modern Minimalist Luxe",
    eyebrow: "METROPOLITAN PENTHOUSE",
    title: "Contemporary Architectural Splendor",
    subtitle: "Floor-to-ceiling glass and skyline panoramas. Enjoy 20% off plus private in-suite mixology masterclasses and Tesla chauffeur.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Modern",
    scriptBottom: "Elegance",
    imageTagline: "Panoramic urban luxury living",
    promoCode: "SKYLINE20",
    promoDiscount: "20% Discount",
    badge: "Penthouse Deal",
    highlights: [
      { title: "20% Penthouse Discount", subtitle: "On selected modern suites", icon: "Tag" },
      { title: "Tesla Chauffeur Service", subtitle: "Complimentary city transit", icon: "Car" },
      { title: "Rooftop Helipad Lounge", subtitle: "VIP evening cocktail access", icon: "Crown" },
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 8. HOME DARK NOCTURNE
  // ----------------------------------------------------------------------------
  "home-dark": {
    id: "home-dark-offer",
    route: "/home-dark",
    pageName: "Home Dark Luxury Nocturne",
    eyebrow: "NOCTURNE VIP PRIVILEGE",
    title: "Nocturne VIP Nightlife & Starlit Retreat",
    subtitle: "Experience luxury after dusk. Midnight yacht cruises, private rooftop observatory access, and vintage Dom Pérignon upon arrival.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Nocturne",
    scriptBottom: "Luxe",
    imageTagline: "Starlit tranquility and private astronomy",
    promoCode: "NOCTURNE",
    promoDiscount: "VIP Pass",
    badge: "Nocturne VIP",
    highlights: [
      { title: "Vintage Dom Pérignon", subtitle: "Chilled champagne on arrival", icon: "Wine" },
      { title: "Rooftop Observatory", subtitle: "Private stargazing & mixologist", icon: "Sun" },
      { title: "Midnight Thermal Spa", subtitle: "Heated hydro pool access", icon: "Flame" },
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" },
  },

  // ----------------------------------------------------------------------------
  // 9. CONCEPT SHOWCASE HUB
  // ----------------------------------------------------------------------------
  "home-demos": {
    id: "home-demos-overview",
    route: "/home-demos",
    pageName: "Concept Showcase Hub",
    eyebrow: "DEMO SHOWCASE STUDIO",
    title: "Explore 8 Luxury Resort Homepages",
    subtitle: "LuxStay provides 8 hand-crafted concept homepages tailored for Beach Resorts, Grand Palace Hotels, Boutiques, Private Villas, and Adventure Travel.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    scriptTop: "Theme",
    scriptBottom: "Studio",
    imageTagline: "Tailored luxury for every resort category",
    promoCode: "DEMOPASS",
    promoDiscount: "Full Access",
    badge: "Demo Showcase",
    highlights: [
      { title: "8 Specialized Concepts", subtitle: "Beach, hotel, villa, modern & dark", icon: "Crown" },
      { title: "Theme Customizer Included", subtitle: "Live color, font & layout switch", icon: "Sparkles" },
      { title: "Commercial Ready", subtitle: "ThemeForest standards & clean code", icon: "ShieldCheck" },
    ],
    primaryAction: { label: "VIEW DESIGN SYSTEM", link: "/design-system", actionType: "navigate" },
    secondaryAction: { label: "Maybe Later" },
  },
};

/**
 * Helper to check if a route is any of the Home variations
 */
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

/**
 * Smart Route to Popup Matcher — ONLY returns a config for homepages
 */
export function getPagePopupConfig(pathname) {
  if (!pathname) return PAGE_POPUPS_CONFIG["home-beach"];

  const cleanPath = pathname.toLowerCase().replace(/\/$/, "") || "/";

  // If not a home page, return null (popups strictly removed for all non-home pages)
  if (!isHomePage(cleanPath)) {
    return null;
  }

  // Home Page Variations Mapping
  if (cleanPath === "/" || cleanPath === "/home-beach") return PAGE_POPUPS_CONFIG["home-beach"];
  if (cleanPath === "/home-hotel") return PAGE_POPUPS_CONFIG["home-hotel"];
  if (cleanPath === "/home-resort") return PAGE_POPUPS_CONFIG["home-resort"];
  if (cleanPath === "/home-travel") return PAGE_POPUPS_CONFIG["home-travel"];
  if (cleanPath === "/home-boutique") return PAGE_POPUPS_CONFIG["home-boutique"];
  if (cleanPath === "/home-villa") return PAGE_POPUPS_CONFIG["home-villa"];
  if (cleanPath === "/home-modern") return PAGE_POPUPS_CONFIG["home-modern"];
  if (cleanPath === "/home-dark") return PAGE_POPUPS_CONFIG["home-dark"];
  if (cleanPath === "/home-demos") return PAGE_POPUPS_CONFIG["home-demos"];

  return null;
}
