# LuxStay — Master JSON Data Repository

This directory contains the entire structured mock dataset for **LuxStay** in standard JSON format.

Every suite, destination, tour expedition, dining venue, spa service, and team biography is represented here as pure JSON, making it effortless to customize the content, import into a headless CMS (Strapi, Sanity, Contentful), or connect to a real backend REST/GraphQL API.

---

## 📁 Directory Structure & File Catalog

| File | Type | Description |
| :--- | :--- | :--- |
| `rooms.json` | Array | 8 luxury residences & suites with pricing, size, guests, bed types, 360 overview, amenities, policies, and photos. |
| `destinations.json` | Array | 21 global luxury destinations with coordinates, climate charts, landmarks, concierge tips, and tours. |
| `tours.json` | Array | 19 bespoke expeditions across 10 global regions with day-by-day itineraries, group sizes, fitness ratings, and included checklists. |
| `activities.json` | Array | Specialized excursions (yachting, heliskiing, diving) with skill levels and equipment specs. |
| `services.json` | Array | Signature hotel services (Spa, dining, Rolls-Royce chauffeur, infinity cabanas). |
| `dining.json` | Object | 3-Michelin restaurants, sommelier cellar flights, and craft cocktail speakeasy recipes. |
| `facilities.json` | Array | Resort facilities (deepwater marina, helipad, sommelier vault, horizon pools, tennis courts). |
| `offers.json` | Array | Seasonal packages with promo codes, validity dates, discounts, and terms. |
| `about.json` | Object | 1928 timeline milestones, 4 pillars of hospitality, and carbon-neutral initiatives. |
| `team.json` | Array | Executive chefs, master sommeliers, wellness directors, and head concierges. |
| `testimonials.json` | Array | Verified guest reviews with star ratings and international press quotes. |
| `gallery.json` | Object | Filterable high-res photo wall and documentary short film trailers. |
| `blog.json` | Object | Journal articles with author metadata, reading times, tags, blockquotes, and related posts. |
| `contact.json` | Object | Aviation/helipad gateways, yacht marina berths, direct concierge lines, and FAQs. |
| `membership.json` | Object | Silver, Gold, and Black Card Royal Patron tiers with perks and credit rewards. |
| `experiences.json` | Object | Specialized data powering homepage concepts and inner showcases. |
| `pagePopups.json` | Object | Contextual luxury resort promotional popups, discounts, copyable promo codes, and modal triggers per homepage. |
| `landingData.json` | Object | Demo cards, hero stats, and feature highlights for the theme preview landing page. |
| `index.json` | Object | Unified master index containing all 18 datasets aggregated into one single file. |

---

## 🚀 How to Use

### 1. In React / Vite
You can import any JSON file directly:
```javascript
import rooms from './data/rooms.json';
// or from src/data/json/
import rooms from '@/data/json/rooms.json';
```

### 2. Via HTTP Fetch (from `/public/data/`)
The same JSON files are also available in `public/data/` for mock HTTP API calls:
```javascript
const response = await fetch('/data/rooms.json');
const rooms = await response.json();
```

### 3. Backend & Headless CMS Integration
These JSON files can be directly seeded into MongoDB, PostgreSQL, SQLite, or imported into headless CMS platforms like Strapi, Supabase, Firebase, or Sanity.

