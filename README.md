# LuxStay — Hotel & Travel React Template (ThemeForest Edition)

**LuxStay** is a commercial-grade, ultra-premium frontend template built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **React Router v7**. It is crafted specifically for luxury boutique hotels, secluded private villas, wellness resorts, alpine ski chalets, and bespoke travel expedition agencies.

---

## 🌟 Key Highlights & Features

- **9 Concept Homepages:**
  - `Home 01: Beach & Tropical Resort` (`/` & `/home-beach`) — Overwater bungalows, turquoise lagoons, marine safaris, private beach coves, and sunset yacht cruises.
  - `Home 02: Luxury Hotel` (`/home-hotel`) — Grand flagship luxury stay with hero booking search widget, legacy story, and signature suites.
  - `Home 03: Resort & Spa` (`/home-resort`) — Tropical wellness sanctuary with geothermal hydrotherapy spa, daily yoga schedules, and wellness retreat packages.
  - `Home 04: Travel Agency` (`/home-travel`) — Curated worldwide expeditions, private jet & yacht charter discovery, and regional spotlights.
  - `Home 05: Boutique Hotel` (`/home-boutique`) — Chic art sanctuary with asymmetrical layout, 24 designer suites, exhibitions, and subterranean cocktail speakeasy.
  - `Home 06: Luxury Villa & Chalet` (`/home-villa`) — Secluded private estates with dedicated executive chef, 24/7 butler, and exclusive buyout inquiries.
  - `Home 07: Modern City Hotel` (`/home-modern`) — Metropolitan skyline, executive club lounge, fiber connectivity, and 50th-floor panoramic sky pool.
  - `Home 08: Dark Luxury & Heritage` (`/home-dark`) — Noir palatial aesthetic, candlelit Michelin dining, royal heritage suites, and 130-year subterranean wine vault.
  - `Home Demos Showcase Hub` (`/home-demos`) — Interactive visual switcher previewing all 8 concept homepages with instant links.

- **38+ Inner Page Variations:**
  - **Rooms & Suites (6 variations):** Rooms Grid (`/rooms`), Rooms List (`/rooms-list`), Rooms Modern (`/rooms-modern`), Rooms Luxury Editorial (`/rooms-editorial`), Room Details Gallery (`/room/:slug`), Room Details Blueprint & Amenities (`/room-details-v2/:slug`), Room Details Split Screen (`/room-details-v3/:slug`).
  - **Destinations & Travel (4 variations):** Destinations Grid (`/destinations`), Destinations List (`/destinations-list`), Destinations Interactive Map Explorer (`/destinations-map`), Destination Details Guide (`/destination/:slug`).
  - **Tours & Activities (4 variations):** Tours Catalog (`/tours`), Tours Modern Cards (`/tours-modern`), Tour Details & Timeline (`/tour/:slug`), Curated Activities & Excursions (`/activities`).
  - **Services, Dining & Facilities (4 variations):** Hotel Services & Spa (`/services`), Michelin Dining & Wine Vaults (`/services-dining`), Resort Facilities (`/facilities`), Exclusive Packages & Offers (`/offers`).
  - **Galleries & Media (3 variations):** Lightbox Photo Gallery (`/gallery`), Masonry Dynamic Feed (`/gallery-masonry`), Cinematic Short Film Showcase (`/gallery-video`).
  - **Blog & Journal (4 variations):** Blog 3-Column Grid (`/blog`), Blog List with Sidebar (`/blog-list`), Blog Modern Cards (`/blog-modern`), Single Editorial Article (`/blog/:slug`).
  - **About & Testimonials (4 variations):** About Story & Heritage (`/about`), About Modern Overview (`/about-v2`), About Master Curators (`/about-v3`), Guest Reviews & Press Accolades (`/testimonials`).
  - **Contact & Gateways (3 variations):** Standard Concierge Contact (`/contact`), Map & Arrival Gateways (`/contact-v2`), Dedicated Buyout & Event Inquiry (`/contact-v3`).
  - **VIP Authentication (3 variations):** Member Sign In (`/login`), VIP Loyalty Program Registration (`/register`), Password Recovery (`/forgot-password`).
  - **Utilities & Design System (4 variations):** Universal Multi-Category Search (`/search`), Living Design System Styleguide (`/design-system`), Terms of Service (`/terms`), Privacy Policy (`/privacy`), Luxury 404 Error Page (`/404`).

- **Complete 6-Context State Architecture:**
  - `ThemeContext` & `useTheme`: Controls color modes (Light/Dark), active font family (`raleway`/`noto`), 4 header layouts (`standard`, `transparent`, `dark`, `minimal`), sticky header toggle, and 3 footer layouts (`standard`, `minimal`, `newsletter`).
  - `AuthContext` & `useAuth`: VIP membership simulation (Silver, Gold, Black Card), session persistence in `localStorage`, member discount calculation, and login/register state.
  - `BookingContext` & `useBooking`: Global booking state, dates, guest counts, room/tour selection, price calculation, and printable confirmation vouchers.
  - `FavoritesContext` & `useFavorites`: Wishlist system with heart button toggles, saved items counter badge, and sliding `SavedDrawer`.
  - `ToastContext` & `useToast`: Luxury animated toast notifications for user interactions (adding to favorites, copying coupon codes, booking confirmations).
  - `PagePopupContext` & `usePagePopup`: Dynamic page popup triggers (promotional offer, newsletter signup, concierge assistant) with customizable delays, floating trigger badge, and popup modal.

- **Interactive Theme Studio Drawer:** Floating customizer enabling buyers and clients to switch Light/Dark modes, typography, 4 header styles, and 3 footer styles live on any page.
- **Interactive Leaflet Maps:** Seamless interactive map with custom gold luxury markers, telemetry popups, and style tile layer switchers (`/destinations-map`).
- **Decoupled Data Architecture:** All mock content resides in `src/data/` (17 standalone ES modules) with a master barrel export (`src/data/index.js`) and zero hardcoded content in JSX views.
- **Tailwind CSS v4 & Custom Tokens:** Zero-config CSS-first engine using `@theme` luxury gold and primary color scales, custom scrollbars, and accessible `:focus-visible` outlines.

---

## 🚀 Quick Start

### 1. Requirements
- **Node.js:** `v18.18+` or `v20.x+ LTS`
- **NPM:** `v9+` or `v10+`

### 2. Installation
```bash
# Navigate to the project root directory
cd luxstay-theme

# Install all dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server at `http://localhost:5173` with instant Hot Module Replacement (HMR). |
| `npm run build` | Compiles and optimizes assets into a production-ready bundle in the `/dist` directory. |
| `npm run preview` | Starts a local web server to preview the production build. |
| `npm run lint` | Runs ESLint across all JSX and JS files. |

---

## 📁 Directory Structure

```text
luxstay-theme/
├── public/                 # Static assets, favicons, robots.txt
├── src/
│   ├── assets/             # Brand logos, vectors, local graphics
│   ├── components/         # Reusable React components
│   │   ├── blog/           # BlogCard, BlogSidebar, AuthorBio
│   │   ├── booking/        # Search widget, checkout modal, guest popover, quick drawer
│   │   ├── common/         # Button, Badge, Modal, Rating, DatePicker, SavedDrawer, etc.
│   │   ├── destinations/   # DestinationCard, DestinationFilters, MapExplorer
│   │   ├── footer/         # Standard 5-Col, Minimal 1-Col, Newsletter Spotlight Footers
│   │   ├── gallery/        # Lightbox modal, video player modal
│   │   ├── header/         # Standard, Transparent, Dark, Minimal Headers & MobileNav
│   │   ├── home/           # Homepage hero banners, experience drawers, special sections
│   │   ├── rooms/          # RoomCard, RoomFilters, GalleryMosaic, RoomBookingCard
│   │   ├── services/       # ServiceCard, FacilityCard, DiningCard, OfferCard
│   │   └── tours/          # TourCard, TourFilters, TourBookingModal, ItineraryTimeline
│   ├── constants/          # Site config, NAV_LINKS, filter configs, theme options
│   ├── context/            # 6 React Contexts (Theme, Auth, Booking, Favorites, Toast, PagePopup)
│   ├── data/               # 17 Centralized mock datasets (rooms, tours, blog, destinations)
│   ├── hooks/              # Custom React hooks (useTheme, useAuth, useBooking, useFavorites, useToast, usePagePopup)
│   ├── layouts/            # MainLayout shell with header, footer, customizer & popup slots
│   ├── pages/              # 9 Homepages & 38+ Inner page variations
│   │   ├── about/          # 3 About variations & Testimonials
│   │   ├── auth/           # Login, Register, Forgot Password
│   │   ├── blog/           # 3 Blog layouts & Article detail
│   │   ├── contact/        # 3 Contact layouts & Map gateways
│   │   ├── design-system/  # Living Design System styleguide
│   │   ├── destinations/   # Grid, List, Interactive Map & Details
│   │   ├── error/          # Luxury 404 Not Found Page
│   │   ├── gallery/        # Lightbox, Masonry & Video galleries
│   │   ├── home/           # 9 Curated Concept Homepages & Showcase Hub
│   │   ├── rooms/          # 4 Room listings & 3 Room details
│   │   ├── services/       # Spa, Michelin Dining, Facilities, Offers
│   │   ├── tours/          # Catalog, Modern Cards, Details & Activities
│   │   └── utility/        # Universal Search, Terms, Privacy
│   ├── routes/             # Centralized React Router v7 routes (AppRoutes.jsx)
│   ├── index.css           # Tailwind CSS v4 setup, theme tokens & calendar styles
│   ├── main.jsx            # Application entry point
│   └── App.jsx             # Top-level context providers & router wrapper
├── documentation/          # Offline standalone HTML Documentation
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build configuration
├── LICENSE.md              # Commercial licensing & credits
└── RELEASE_CHECKLIST.md    # Pre-submission checklist & route directory
```

---

## 🎨 Customization Guide

### 1. Changing Brand Name, Phone, Email & Social Links
Open `src/constants/theme.js`:
```javascript
export const SITE_CONFIG = {
  name: "LuxStay",
  tagline: "Luxury Hotel & Resort Template",
  phone: "+1 (800) 589-7829",
  email: "concierge@luxstay.com",
  address: "Via Panoramica 48, 84017 Positano (SA), Amalfi Coast, Italy",
  social: {
    instagram: "https://instagram.com/luxstay",
    facebook: "https://facebook.com/luxstay",
    twitter: "https://twitter.com/luxstay",
    youtube: "https://youtube.com/luxstay",
  }
};
```

### 2. Changing Theme Colors & Luxury Palette
Open `src/index.css` and modify the `@theme` luxury gold and primary color scale:
```css
@theme {
  /* Luxury Gold Accent Scale */
  --color-gold-300: #dfcaa4;
  --color-gold-400: #d1b17e;
  --color-gold-500: #c5a880; /* Primary Brand Gold */
  --color-gold-600: #b59367;
  --color-gold-700: #997548;

  /* Deep Slate Navy Scale */
  --color-primary-900: #0f172a;
  --color-primary-950: #080d1a;
}
```

### 3. Switching Typography & Fonts
LuxStay uses Google Fonts with a dynamic font-switching system. Supported fonts can be swapped in `index.html` and configured in `src/index.css`:
```css
@theme {
  --font-raleway: "Raleway", sans-serif;
  --font-noto: "Noto Sans", sans-serif;
}
```

### 4. Editing Room, Tour, Destination, and Blog Content
All data models are isolated inside `src/data/`:
- `src/data/rooms.js` — Edit prices, capacities, amenities, policies, and photos.
- `src/data/destinations.js` — Edit coordinates, climates, landmarks, and highlights.
- `src/data/tours.js` — Edit itineraries, inclusions, exclusions, and group sizes.
- `src/data/dining.js` — Edit Michelin restaurants, wine vault tastings, and cocktail menus.
- `src/data/blog.js` — Edit articles, author bios, categories, and reading times.
- `src/data/pagePopups.js` — Edit promotional popup offers, coupon codes, and timing.

Refer to [`src/data/DATA_DICTIONARY.md`](file:///d:/Rohan/React/Theme/luxstay-theme/src/data/DATA_DICTIONARY.md) for full schema documentation.

---

## 🚢 Deployment

### Deploying to Vercel or Netlify
1. Connect your repository to Vercel or Netlify.
2. Set **Build Command:** `npm run build`
3. Set **Output Directory:** `dist`

### Apache Server Configuration (`.htaccess`)
For single-page client routing on Apache servers, create a `.htaccess` file inside `public/` (or copy to your web root):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx Server Configuration
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 📜 Dependencies & Licensing

| Library | Version | License | Justification |
| :--- | :--- | :--- | :--- |
| **React & React DOM** | ^19.2.8 | MIT | Core UI library with modern Concurrent rendering. |
| **React Router DOM** | ^7.18.4 | MIT | Centralized client-side routing & nested layouts. |
| **Tailwind CSS** | ^4.3.3 | MIT | Modern CSS-first utility engine with zero-config `@theme`. |
| **React Icons** | ^5.7.0 | MIT | Tree-shakeable SVG icons (Lucide `react-icons/lu`, FontAwesome `fa6`, etc.). |
| **Leaflet** | ^1.9.4 | BSD-2-Clause | Lightweight interactive maps for destination explorers. |
| **Swiper** | ^14.3.0 | MIT | Touch-enabled mobile-friendly carousels and review sliders. |
| **React Calendar** | ^6.0.1 | MIT | Date picking and reservation calendar with custom luxury skin. |

- **Fonts:** Google Fonts ([Raleway](https://fonts.google.com/specimen/Raleway), [Noto Sans](https://fonts.google.com/specimen/Noto+Sans), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display), [Alex Brush](https://fonts.google.com/specimen/Alex+Brush)) — Open Font License (OFL).
- **Images:** Curated editorial hospitality photography from [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com) (used for demonstration purposes).

---

## ⚠️ Demo Functionality Disclaimer
LuxStay is a 100% frontend React template. Reservation widgets, search queries, booking modals, and confirmation vouchers provide a frontend client-side simulation. No backend database or live payment processor is included by default. To process real bookings, connect the checkout form handlers to your preferred booking API or payment gateway (e.g. Stripe, PayPal).

---

© 2026 LuxStay Theme. Crafted for ThemeForest.
