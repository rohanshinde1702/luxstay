# LuxStay — Data Architecture & Customization Guide

Welcome to the **LuxStay** Data Directory (`src/data/`).

This template is engineered with a strict **Separation of Concerns** principle: all mock data, copy text, images, pricing, and specifications are completely decoupled from JSX page views and isolated in structured JavaScript modules inside `src/data/`.

---

## 📁 File Structure & Data Models Overview

| File | Primary Export(s) | Description |
| :--- | :--- | :--- |
| [`rooms.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/rooms.js) | `ROOMS_DATA` | 8 luxury residences & suites with pricing, size, guests, bed types, 360 overview, amenities, policies, and photos. |
| [`destinations.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/destinations.js) | `DESTINATIONS_DATA` | 21 global luxury destinations with coordinates, climate charts, landmarks, concierge tips, and tours. |
| [`tours.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/tours.js) | `TOURS_DATA` | 19 bespoke expeditions across 10 global regions with day-by-day itineraries, group sizes, fitness ratings, and included checklists. |
| [`activities.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/activities.js) | `ACTIVITIES_DATA` | Specialized excursions (yachting, heliskiing, diving) with skill levels and equipment specs. |
| [`services.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/services.js) | `SERVICES_DATA` | Signature hotel services (Spa, dining, Rolls-Royce chauffeur, infinity cabanas). |
| [`dining.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/dining.js) | `RESTAURANTS_DATA`, `SIGNATURE_COCKTAILS_DATA` | 3-Michelin restaurants, sommelier cellar flights, and craft cocktail speakeasy recipes. |
| [`facilities.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/facilities.js) | `FACILITIES_DATA` | Resort facilities (deepwater marina, helipad, sommelier vault, horizon pools, tennis courts). |
| [`offers.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/offers.js) | `OFFERS_DATA` | Seasonal packages with promo codes, validity dates, discounts, and terms. |
| [`about.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/about.js) | `TIMELINE_EVENTS_DATA`, `CORE_VALUES_DATA`, `SUSTAINABILITY_PILLARS_DATA` | 1928 timeline milestones, 4 pillars of hospitality, and carbon-neutral initiatives. |
| [`team.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/team.js) | `TEAM_DATA` | Executive chefs, master sommeliers, wellness directors, and head concierges. |
| [`testimonials.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/testimonials.js) | `TESTIMONIALS_DATA`, `PRESS_ACCOLADES_DATA` | Verified guest reviews with star ratings and international press quotes. |
| [`gallery.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/gallery.js) | `GALLERY_DATA`, `VIDEO_STORIES_DATA` | Filterable high-res photo wall and documentary short film trailers. |
| [`blog.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/blog.js) | `BLOG_DATA` | Journal articles with author metadata, reading times, tags, blockquotes, and related posts. |
| [`contact.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/contact.js) | `ARRIVAL_POINTS_DATA`, `DEPARTMENTS_CONTACT_DATA`, `FAQ_ITEMS_DATA` | Aviation/helipad gateways, yacht marina berths, direct concierge lines, and FAQs. |
| [`membership.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/membership.js) | `VIP_TIERS_DATA`, `CLUB_BENEFITS_DATA` | Silver, Gold, and Black Card Royal Patron tiers with perks and credit rewards. |
| [`experiences.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/experiences.js) | `WELLNESS_SCHEDULE_DATA`, `SPA_PACKAGES_DATA`, `ESTATE_PRIVILEGES_DATA` | Specialized data powering homepage concepts and inner showcases. |
| [`pagePopups.js`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/pagePopups.js) | `PAGE_POPUPS_CONFIG` | Contextual luxury resort promotional popups, discounts, copyable promo codes, and modal triggers per homepage. |

---

## 🛠️ Detailed Schema Definitions & Customization

### 1. Accommodations & Suites (`src/data/rooms.js`)
Each room object contains specifications, categorized amenities, cancellation policies, and galleries:
```javascript
export const ROOMS_DATA = [
  {
    id: "deluxe-ocean-suite",
    slug: "deluxe-ocean-suite",
    title: "Deluxe Ocean Panoramic Suite",
    category: "Signature Suites",       // Used by RoomFilters
    price: 680,                          // Base price per night in USD
    rating: 4.95,                        // 1.0 - 5.0 rating
    reviewsCount: 42,
    size: "85 m² / 915 ft²",
    capacity: "2 Guests",
    bedType: "1 King Bed (Simmons Black)",
    view: "Direct Cliffside Ocean View",
    description: "Perched high on the Amalfi cliffs with private heated plunge pool...",
    image: "https://images.unsplash.com/photo-...",
    gallery: [
      "https://images.unsplash.com/photo-...",
      "https://images.unsplash.com/photo-...",
    ],
    amenities: [
      "Private Heated Plunge Pool",
      "24/7 Dedicated Butler",
      "Bang & Olufsen Audio",
      "Complimentary Minibar & Grand Cru Champagne"
    ],
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Full refund up to 72 hours before arrival",
      pets: "Luxury pet amenities available upon advance request"
    },
    featured: true
  }
];
```

### 2. Destinations & Regional Guides (`src/data/destinations.js`)
Contains regional taxonomy, coordinates, seasonal highlights, and linked stays:
```javascript
export const DESTINATIONS_DATA = [
  {
    id: "amalfi-coast-italy",
    slug: "amalfi-coast-italy",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",                   // Filtered by DestinationFilters
    tagline: "Vertical cliffs, pastel villas, and sapphire waters",
    startingPrice: 540,
    rating: 4.98,
    image: "https://images.unsplash.com/photo-...",
    coordinates: { lat: 40.6340, lng: 14.6027 },
    bestTimeToVisit: "May to October",
    climate: "Mediterranean (22°C - 30°C)",
    highlights: ["Positano Cliffside", "Capri Blue Grotto", "Ravello Gardens"],
    insiderTips: "Take an early morning private wooden gozzo boat before 9 AM...",
    featured: true
  }
];
```

### 3. Tours, Expeditions & Itineraries (`src/data/tours.js`)
Expeditions with chronological timelines, fitness requirements, and guide profiles:
```javascript
export const TOURS_DATA = [
  {
    id: "amalfi-private-yacht",
    slug: "amalfi-private-yacht",
    title: "Amalfi Coast & Capri Private Yacht Charter",
    destination: "Amalfi Coast, Italy",
    price: 1450,
    duration: "Full Day (8 Hours)",
    groupSize: "Up to 8 Guests",
    activityLevel: "Leisure",           // Leisure, Moderate, Challenging, Extreme
    category: "Marine & Sailing",       // Filtered by TourFilters
    rating: 4.97,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-...",
    itinerary: [
      { day: "09:00 AM", title: "Positano Pier Departure", desc: "Welcome mimosa..." },
      { day: "11:30 AM", title: "Faraglioni Rocks & Blue Grotto", desc: "Private tender..." },
      { day: "01:30 PM", title: "Seaside Seafood Lunch", desc: "Conca dei Marini..." }
    ],
    inclusions: [
      "50ft Riva Dolceriva Yacht",
      "Licensed Captain & First Mate",
      "Open Champagne & Prosecco Bar",
      "Snorkeling & SeaBob Equipment"
    ],
    exclusions: [
      "Capri Port Disembarkation Tax",
      "Crew Discretionary Gratuity"
    ],
    featured: true
  }
];
```

### 4. Promotional Popups (`src/data/pagePopups.js`)
Contextual luxury resort popups tied to homepages or triggered by the Theme Studio:
```javascript
export const PAGE_POPUPS_CONFIG = {
  "home-beach": {
    id: "home-beach-offer",
    route: "/home-beach",
    pageName: "Home Beach Sanctuary",
    eyebrow: "LIMITED TIME OFFER",
    title: "Get Up to 40% Off on Your Next Stay",
    subtitle: "Indulge in luxury, comfort and breathtaking views...",
    image: "/images/luxury-beach-popup-villa.jpg",
    promoCode: "BEACH40",
    promoDiscount: "40% Discount",
    badge: "Special Offer",
    highlights: [
      { title: "Up to 40% Discount", subtitle: "On selected rooms & suites", icon: "Tag" },
      { title: "Free Breakfast", subtitle: "For all bookings", icon: "Utensils" },
      { title: "Flexible Cancellation", subtitle: "Hassle-free booking", icon: "ShieldCheck" }
    ],
    primaryAction: { label: "BOOK NOW", link: "/rooms", actionType: "book" },
    secondaryAction: { label: "Maybe Later" }
  }
};
```

---

## ⚡ Master Barrel Export (`src/data/index.js`)

All 17 data modules are aggregated and exported from `src/data/index.js`. You can import any dataset anywhere in your components using a single clean import:

```javascript
import { 
  ROOMS_DATA, 
  DESTINATIONS_DATA, 
  TOURS_DATA, 
  SERVICES_DATA, 
  BLOG_DATA,
  PAGE_POPUPS_CONFIG 
} from "../data";
```

---

## 🌐 Connecting to a Headless CMS or Backend API

Because all data files export standard JavaScript arrays and objects, connecting to a backend is effortless:

### 1. Using TanStack React Query (Recommended for Production)
```javascript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ROOMS_DATA } from "../data/rooms";

export function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("https://your-api.com/api/rooms");
        return data;
      } catch (err) {
        console.warn("API unavailable, falling back to local dataset", err);
        return ROOMS_DATA;
      }
    },
    initialData: ROOMS_DATA,
  });
}
```

### 2. Using Direct `fetch()` or Axios in a `useEffect`
```javascript
const [rooms, setRooms] = useState(ROOMS_DATA);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("https://your-cms-endpoint/api/rooms")
    .then((res) => res.json())
    .then((data) => setRooms(data))
    .catch(() => setRooms(ROOMS_DATA))
    .finally(() => setLoading(false));
}, []);
```

---

© 2026 LuxStay. Commercial Hospitality React Template.
