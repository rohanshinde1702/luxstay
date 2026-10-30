/**
 * ==============================================================================
 * LUXSTAY THEME LANDING & SHOWCASE MASTER DATA
 * ==============================================================================
 * Centralized catalog of all 8 concept homepages, 38+ inner pages, feature
 * highlights, tech specifications, and FAQs for the live presentation landing page.
 */

export const LANDING_HERO_STATS = [
  { label: "Concept Homepages", value: "8", suffix: "", desc: "Tailored hospitality prototypes" },
  { label: "Inner Page Views", value: "41", suffix: "+", desc: "Suites, maps, tours & dining" },
  { label: "Global State Engines", value: "6", suffix: "", desc: "Auth, booking, wishlist & theme" },
  { label: "Decoupled Data Modules", value: "17", suffix: "", desc: "Clean zero-clutter ES modules" },
];

export const HOME_DEMOS_DATA = [
  {
    id: "home-beach",
    number: "01",
    title: "Beach & Tropical Island Resort",
    path: "/home-beach",
    altPath: "/",
    category: "resort",
    badge: "Flagship • Most Popular",
    badgeColor: "gold",
    tagline: "Overwater bungalows, private beach coves & sunset catamaran charters",
    description: "Designed for world-renowned island sanctuaries in the Maldives and Bora Bora. Features video hero experience, floating booking bar, and curated ocean excursions.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    specs: {
      heroType: "4K Drone Video Reel",
      bookingStyle: "Horizontal Floating Bar",
      keyFocus: "Overwater Bungalows & Marine Life",
      colorTone: "Turquoise & Warm Gold"
    },
    highlights: [
      "Cinematic 4K drone video modal with ambient ocean sounds",
      "Interactive 4-benefit luxury service pillars",
      "Verified guest reviews carousel with 4.98 rating",
      "Contextual VIP booking promotion popups"
    ]
  },
  {
    id: "home-hotel",
    number: "02",
    title: "Flagship Grand Luxury Hotel",
    path: "/home-hotel",
    category: "hotel",
    badge: "3-Michelin Stars",
    badgeColor: "amber",
    tagline: "Grand cliffside luxury sanctuary with world-renowned gastronomy",
    description: "Perched majestically above the Mediterranean coast. Built for 5-star grand palaces with multi-field date range booking, count-up metric tickers, and Michelin-star cellar highlights.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    specs: {
      heroType: "Auto-Swiper Luxury Hero",
      bookingStyle: "Interactive DateRangePicker",
      keyFocus: "Cliffside Suites & Sommelier Vaults",
      colorTone: "Classic Luxury & Royal Navy"
    },
    highlights: [
      "Custom interactive DateRangePicker with month sync",
      "Dynamic CountUp animation counters for luxury milestones",
      "Cellar & 3-Michelin star dining spotlight section",
      "Responsive suites grid with direct booking checkout"
    ]
  },
  {
    id: "home-resort",
    number: "03",
    title: "Geothermal Wellness Resort & Spa",
    path: "/home-resort",
    category: "resort",
    badge: "Wellness Sanctuary",
    badgeColor: "emerald",
    tagline: "Holistic wellness sanctuaries, thermal mineral springs & restorative spa rituals",
    description: "Crafted for eco-luxury wellness retreats, hot springs, and alpine sanatoriums. Features geothermal pavilion cards, Ayurvedic treatment guides, and forest bathing retreats.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
    specs: {
      heroType: "Auto-Sliding Thermal Pavilion",
      bookingStyle: "Wellness Pass & Date Selector",
      keyFocus: "Thermal Springs & Hydrotherapy",
      colorTone: "Forest Sage & Warm Sand"
    },
    highlights: [
      "Dedicated wellness treatment timetable & specialists",
      "Geothermal mineral pool telemetry & temperature specs",
      "Organic farm-to-table culinary spotlight",
      "Integrated toast notifications for concierge reservations"
    ]
  },
  {
    id: "home-travel",
    number: "04",
    title: "Bespoke Travel Agency & Expeditions",
    path: "/home-travel",
    category: "travel",
    badge: "Global Expeditions",
    badgeColor: "blue",
    tagline: "Curated worldwide luxury tours, African safaris & private jet journeys",
    description: "Engineered for elite bespoke tour operators and expedition agencies. Includes global multi-field search, season weather indicators, and private yacht itinerary cards.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
    specs: {
      heroType: "Panoramic Sunset + Multi-Field Search",
      bookingStyle: "Multi-Destination Trip Planner",
      keyFocus: "Worldwide Curated Expeditions",
      colorTone: "Mediterranean Azure & Gold"
    },
    highlights: [
      "Horizontal search bar with location, dates, and expedition type",
      "Destination spotlight cards with climate seasonality tags",
      "Day-by-day expedition itinerary previews with maps",
      "Private jet charter and helicopter transfer inquiries"
    ]
  },
  {
    id: "home-boutique",
    number: "05",
    title: "Contemporary Boutique Hotel",
    path: "/home-boutique",
    category: "hotel",
    badge: "Boutique & Speakeasy",
    badgeColor: "purple",
    tagline: "Chic modern sanctuary with artistic spaces, rooftop terrace & speakeasy",
    description: "Designed for boutique heritage properties, design hotels, and urban creative hubs. Showcases custom art collections, vinyl listening lounges, and craft mixology bars.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
    specs: {
      heroType: "Vignette Editorial Showcase",
      bookingStyle: "Intimate Loft Reservation",
      keyFocus: "Artisanal Spaces & Vinyl Bar",
      colorTone: "Charcoal, Gold & Warm Clay"
    },
    highlights: [
      "Curated neighborhood cultural guide and art tours",
      "Hidden speakeasy mixology menu and tasting tables",
      "Artisan loft blueprints and custom furniture credits",
      "Intimate wedding and VIP buyout inquiry forms"
    ]
  },
  {
    id: "home-villa",
    number: "06",
    title: "Private Luxury Villa & Alpine Chalet",
    path: "/home-villa",
    category: "villa",
    badge: "Private Estates",
    badgeColor: "cyan",
    tagline: "Secluded cliffside private estates, infinity pools & alpine ski chalets",
    description: "Tailored for ultra-high-net-worth estate rentals, ski chalets in Zermatt, and oceanfront sanctuaries in Bali. Features full estate buyouts and private helipad specs.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    specs: {
      heroType: "Full-width Secluded Drone Vista",
      bookingStyle: "Estate Buyout Request",
      keyFocus: "Helipad, Private Butler & Pools",
      colorTone: "Alpine Granite & Sunlit Gold"
    },
    highlights: [
      "Dedicated 24/7 personal butler and executive chef bios",
      "Helipad coordinates and private yacht slip technical specs",
      "Detailed architectural floor plans and square footage metrics",
      "Curated VIP winery & ski-in/ski-out experience catalog"
    ]
  },
  {
    id: "home-modern",
    number: "07",
    title: "Modern Metropolitan Skyline Hotel",
    path: "/home-modern",
    category: "hotel",
    badge: "Metropolitan Skyline",
    badgeColor: "indigo",
    tagline: "Urban executive lifestyle, rooftop infinity pool & business boardroom suites",
    description: "Built for Tokyo, New York, and Dubai luxury skyline hotels. Highlighted by glass-edge rooftop infinity pools, executive business suites, and sunset cocktail lounges.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
    specs: {
      heroType: "Skyline Glass Pool Hero",
      bookingStyle: "Corporate Executive Checkout",
      keyFocus: "Rooftop Lounge & Tech Boardrooms",
      colorTone: "Midnight Slate & Neon Gold"
    },
    highlights: [
      "Breathtaking rooftop glass infinity pool photography",
      "Executive boardrooms with fiber Wi-Fi and conferencing",
      "Panoramic skyline dining terrace and mixology lounge",
      "Fast-track mobile check-in and VIP loyalty integration"
    ]
  },
  {
    id: "home-dark",
    number: "08",
    title: "Dark Luxury & Royal Heritage Palace",
    path: "/home-dark",
    category: "dark",
    badge: "Royal Heritage Noir",
    badgeColor: "gold",
    tagline: "Moody, opulent royal palace aesthetic with candlelit fine dining & historic suites",
    description: "An homage to imperial Indian lake palaces and Parisian historic châteaux. Features deep noir tones, brushed gold borders, Jharokha balconies, and candlelit courtyard dining.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
    specs: {
      heroType: "Night Illuminated Palace Grounds",
      bookingStyle: "Royal Chamber Reservation",
      keyFocus: "Heritage Architecture & Imperial Suites",
      colorTone: "Obsidian Noir & Royal Gold"
    },
    highlights: [
      "True dark mode aesthetic with hand-tuned contrast tokens",
      "Historical lineage timeline and royal architectural stories",
      "Candlelit lakeside dining and traditional sitar performances",
      "Maharaja presidential suites with private reflection pools"
    ]
  }
];

export const INNER_PAGES_DATA = [
  // --- 1. SUITES & ROOMS ---
  {
    id: "rooms-grid",
    categoryKey: "rooms",
    categoryName: "Suites & Rooms",
    title: "Rooms Grid View",
    path: "/rooms",
    badge: "3-Column Grid",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "3-column responsive suite grid with multi-tier price filter, guest capacity pills, and live availability drawer trigger.",
    features: ["Price Filter", "Amenity Badges", "Quick Reserve Modal"]
  },
  {
    id: "rooms-list",
    categoryKey: "rooms",
    categoryName: "Suites & Rooms",
    title: "Rooms List View",
    path: "/rooms-list",
    badge: "Wide Card Listing",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    description: "Horizontal layout with spacious room descriptions, square meterage, bedroom counts, and prominent booking button.",
    features: ["Horizontal Layout", "Detailed Specs", "Instant Checkout"]
  },
  {
    id: "rooms-modern",
    categoryKey: "rooms",
    categoryName: "Suites & Rooms",
    title: "Rooms Modern Cards",
    path: "/rooms-modern",
    badge: "Modern Minimal",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    description: "Sleek floating cards with micro-interactions, smooth hover zoom, and quick favorite wishlist drawer heart toggle.",
    features: ["Wishlist Heart", "Hover Transitions", "Compact Layout"]
  },
  {
    id: "rooms-editorial",
    categoryKey: "rooms",
    categoryName: "Suites & Rooms",
    title: "Rooms Luxury Editorial",
    path: "/rooms-editorial",
    badge: "Magazine Style",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    description: "High-fashion editorial layout featuring large photography, pull quotes, architecture notes, and curated room narratives.",
    features: ["Architectural Notes", "Editorial Typography", "Storyteller Design"]
  },
  {
    id: "room-details-v1",
    categoryKey: "rooms",
    categoryName: "Suites & Rooms",
    title: "Room Details — Gallery View",
    path: "/room/deluxe-ocean-suite",
    badge: "Hero Lightbox",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "Full-width photo gallery with interactive lightbox, floor blueprints, guest reviews slider, and sticky booking calculator.",
    features: ["Full Lightbox", "Sticky Rate Calculator", "Guest Ratings"]
  },
  {
    id: "room-details-v2",
    categoryKey: "rooms",
    categoryName: "Suites & Rooms",
    title: "Room Details — Amenities Blueprint",
    path: "/room-details-v2/deluxe-ocean-suite",
    badge: "Amenities Focus",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    description: "Deep dive layout focusing on Acqua di Parma bath amenities, King Hypnos beds, butler services, and soundproofing.",
    features: ["Categorized Amenities", "Blueprint Specs", "Butler Hotline"]
  },
  {
    id: "room-details-v3",
    categoryKey: "rooms",
    categoryName: "Suites & Rooms",
    title: "Room Details — Split-Screen Booking",
    path: "/room-details-v3/deluxe-ocean-suite",
    badge: "High Conversion",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    description: "Split 50/50 layout designed for high conversion with an always-visible booking form and scrolling room photo reel.",
    features: ["50/50 Split Screen", "Real-Time Pricing", "Instant Availability"]
  },

  // --- 2. DESTINATIONS & MAPS ---
  {
    id: "destinations-grid",
    categoryKey: "destinations",
    categoryName: "Destinations & Maps",
    title: "Destinations Grid Directory",
    path: "/destinations",
    badge: "World Directory",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Global directory of handpicked luxury destinations with regional climate indicators, resort counts, and curated city guides.",
    features: ["Region Filter", "Climate Badges", "Resort Counter"]
  },
  {
    id: "destinations-list",
    categoryKey: "destinations",
    categoryName: "Destinations & Maps",
    title: "Destinations List Guide",
    path: "/destinations-list",
    badge: "Travel Guide",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description: "Rich descriptive list highlighting prime visiting seasons, local cultural customs, Michelin restaurants, and luxury transfers.",
    features: ["Seasonal Guide", "Cultural Insights", "Transfer Options"]
  },
  {
    id: "destinations-map",
    categoryKey: "destinations",
    categoryName: "Destinations & Maps",
    title: "Interactive Leaflet Map Explorer",
    path: "/destinations-map",
    badge: "Leaflet & OpenStreetMap",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    description: "Dynamic Leaflet map with custom gold SVG markers, telemetry popups, location coordinates, and resort card sidebar.",
    features: ["Gold SVG Markers", "OpenStreetMap Sync", "Sidebar Cards"]
  },
  {
    id: "destination-details",
    categoryKey: "destinations",
    categoryName: "Destinations & Maps",
    title: "Destination Details — Bali Indonesia",
    path: "/destination/bali-indonesia",
    badge: "Single Destination",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Complete guide featuring private helipad transfers, partner boutique resorts, seasonal weather stats, and day trip ideas.",
    features: ["Transfer Booking", "Weather Forecast", "Resort Packages"]
  },

  // --- 3. TOURS & ACTIVITIES ---
  {
    id: "tours-catalog",
    categoryKey: "tours",
    categoryName: "Tours & Expeditions",
    title: "Tours & Expeditions Catalog",
    path: "/tours",
    badge: "Tours Hub",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive expedition catalog with duration badges, physical intensity meters, group limits, and season calendars.",
    features: ["Intensity Meters", "Duration Filter", "Departure Dates"]
  },
  {
    id: "tours-modern",
    categoryKey: "tours",
    categoryName: "Tours & Expeditions",
    title: "Tours Modern Cards",
    path: "/tours-modern",
    badge: "Modern Grid",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    description: "Modern cards detailing included VIP gear, private aircraft charter, multilingual guides, and direct expedition booking.",
    features: ["Included Gear", "Charter Flights", "Guide Profiles"]
  },
  {
    id: "tour-details",
    categoryKey: "tours",
    categoryName: "Tours & Expeditions",
    title: "Tour Details — Amalfi Private Yacht",
    path: "/tour/amalfi-private-yacht",
    badge: "Day-by-Day Timeline",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80",
    description: "Day-by-day expedition timeline with nautical map coordinates, yacht specifications, captain profile, and meal inclusions.",
    features: ["Day Timeline", "Captain Bio", "Nautical Coordinates"]
  },
  {
    id: "activities-page",
    categoryKey: "tours",
    categoryName: "Tours & Expeditions",
    title: "Curated Resort Activities",
    path: "/activities",
    badge: "Experiences",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Private helicopter excursions, sommelier masterclasses, deep-sea diving, championship golf, and wellness workshops.",
    features: ["Category Filter", "Instructor Bios", "Schedule Booking"]
  },

  // --- 4. DINING, SPA & SERVICES ---
  {
    id: "services-dining",
    categoryKey: "dining",
    categoryName: "Dining & Spa",
    title: "Michelin Dining & Grand Cru Cellar",
    path: "/services-dining",
    badge: "3-Michelin Gastronomy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Seasonal tasting menus, sommelier wine pairing notes, chef philosophy, private dining reservations, and cocktail lounge.",
    features: ["Seasonal Menu", "Sommelier Notes", "Table Booking"]
  },
  {
    id: "services-spa",
    categoryKey: "dining",
    categoryName: "Dining & Spa",
    title: "Hotel Services & Holistic Spa",
    path: "/services",
    badge: "Wellness Rituals",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    description: "Ayurvedic body treatments, hydrotherapy pools, restorative massages, sound healing chambers, and concierge hotline.",
    features: ["Treatment Cards", "Thermal Passes", "Wellness Concierge"]
  },
  {
    id: "facilities-page",
    categoryKey: "dining",
    categoryName: "Dining & Spa",
    title: "Resort Facilities & Amenities",
    path: "/facilities",
    badge: "Resort Amenities",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Helipad access, championship grass tennis courts, private marina, heated infinity pools, and luxury vehicle fleet.",
    features: ["Helipad Specs", "Marina Slips", "Championship Courts"]
  },
  {
    id: "offers-page",
    categoryKey: "dining",
    categoryName: "Dining & Spa",
    title: "Exclusive Offers & Packages",
    path: "/offers",
    badge: "Limited Promotions",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "Honeymoon escapes, seasonal extended stay discounts, golf packages, and direct booking complimentary credits.",
    features: ["Promo Codes", "Welcome Credit", "Package Inclusions"]
  },

  // --- 5. GALLERIES & JOURNAL ---
  {
    id: "gallery-lightbox",
    categoryKey: "gallery",
    categoryName: "Galleries & Journal",
    title: "Photo Lightbox Gallery",
    path: "/gallery",
    badge: "Interactive Lightbox",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "High-definition photo gallery with category filter tabs (Architecture, Suites, Dining, Nature) and keyboard full-screen view.",
    features: ["Category Filter", "Full-Screen Zoom", "Touch Swipe"]
  },
  {
    id: "gallery-masonry",
    categoryKey: "gallery",
    categoryName: "Galleries & Journal",
    title: "Dynamic Masonry Wall",
    path: "/gallery-masonry",
    badge: "Pinterest Style",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    description: "Artistic staggered masonry layout highlighting candid moments, sunsets, architectural details, and guest photography.",
    features: ["Masonry Grid", "Smooth Hover Effects", "High DPI Images"]
  },
  {
    id: "gallery-video",
    categoryKey: "gallery",
    categoryName: "Galleries & Journal",
    title: "Cinematic Film Gallery",
    path: "/gallery-video",
    badge: "4K Film Showcase",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    description: "Immersive 4K drone cinematography showcase with modal video playback, ambient audio tracks, and behind-the-scenes reels.",
    features: ["Modal Playback", "Drone Reels", "Curated Soundtracks"]
  },
  {
    id: "blog-grid",
    categoryKey: "journal",
    categoryName: "Editorial Journal",
    title: "Blog Grid — Editorial Hub",
    path: "/blog",
    badge: "3-Column Magazine",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Editorial lifestyle hub featuring articles on global luxury travel, culinary trends, and boutique hotel architecture.",
    features: ["Reading Time", "Author Avatars", "Tag Badges"]
  },
  {
    id: "blog-list",
    categoryKey: "journal",
    categoryName: "Editorial Journal",
    title: "Blog List with Sidebar",
    path: "/blog-list",
    badge: "Sidebar & Tags",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    description: "Classic publication layout with article search widget, popular stories, category taxonomy, and newsletter signup box.",
    features: ["Search Widget", "Popular Posts", "Newsletter Box"]
  },
  {
    id: "blog-modern",
    categoryKey: "journal",
    categoryName: "Editorial Journal",
    title: "Blog Modern — Magazine Spreads",
    path: "/blog-modern",
    badge: "Editorial Spread",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description: "Contemporary magazine layout with oversized hero typography, featured interviews, and high-fashion lifestyle imagery.",
    features: ["Hero Feature", "Pull Quotes", "Social Sharing"]
  },
  {
    id: "blog-details",
    categoryKey: "journal",
    categoryName: "Editorial Journal",
    title: "Featured Article — Amalfi Coast",
    path: "/blog/hidden-gems-amalfi-coast",
    badge: "Single Editorial",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description: "Long-form editorial post with drop caps, pull-quotes, image galleries, related reading links, and comment section.",
    features: ["Drop Caps", "Related Stories", "Social Share Links"]
  },

  // --- 6. ABOUT, TEAM & CONTACT ---
  {
    id: "about-story",
    categoryKey: "about",
    categoryName: "About & Contact",
    title: "About Us — Story & Heritage",
    path: "/about",
    badge: "Heritage Story",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    description: "80-year hospitality heritage, founding philosophy, architectural honors, and commitments to environmental stewardship.",
    features: ["Heritage Timeline", "Awards Shelf", "Leadership Message"]
  },
  {
    id: "about-modern",
    categoryKey: "about",
    categoryName: "About & Contact",
    title: "About Us — Modern Overview",
    path: "/about-v2",
    badge: "Visual Overview",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Clean overview with milestone numbers, interactive sustainability report, and architecture photo gallery.",
    features: ["Milestone Numbers", "Eco Commitments", "Interactive Tabs"]
  },
  {
    id: "about-team",
    categoryKey: "about",
    categoryName: "About & Contact",
    title: "Master Curators & Team",
    path: "/about-v3",
    badge: "Leadership Grid",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    description: "Profile grid of head sommeliers, master concierges (Les Clefs d'Or), executive chefs, and expedition directors.",
    features: ["Staff Roles", "Direct Contact", "Accreditations"]
  },
  {
    id: "testimonials-page",
    categoryKey: "about",
    categoryName: "About & Contact",
    title: "Guest Reviews & Press",
    path: "/testimonials",
    badge: "5.0 ★ Press & Awards",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    description: "Verified guest reviews, Conde Nast Traveler honors, TripAdvisor certificates of excellence, and video quotes.",
    features: ["Verified Reviews", "Press Logos", "Rating Breakdown"]
  },
  {
    id: "contact-page",
    categoryKey: "about",
    categoryName: "About & Contact",
    title: "Contact Us — Standard",
    path: "/contact",
    badge: "Concierge Desk",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    description: "Direct contact inquiry form, interactive arrival map, 24/7 concierge phone numbers, and reservation FAQ.",
    features: ["Inquiry Form", "Map Coordinates", "Live Hotline"]
  },
  {
    id: "contact-v2",
    categoryKey: "about",
    categoryName: "About & Contact",
    title: "Concierge & Arrival Gateways",
    path: "/contact-v2",
    badge: "Interactive Map",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    description: "Multi-location arrival protocols, private yacht and helicopter transfer coordinates, and local chauffeur services.",
    features: ["Arrival Coordinates", "Transfer Booking", "Chauffeur Gateways"]
  },
  {
    id: "contact-v3",
    categoryKey: "about",
    categoryName: "About & Contact",
    title: "Dedicated Event & Buyout Inquiry",
    path: "/contact-v3",
    badge: "Estate Buyouts",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Specialized lead-capture application for full estate private buyouts, luxury weddings, and executive board retreats.",
    features: ["Full Estate Buyout", "Wedding Planner", "Capacity Calculator"]
  },

  // --- 7. VIP AUTH, DESIGN SYSTEM & UTILITIES ---
  {
    id: "auth-login",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "VIP Member Sign In",
    path: "/login",
    badge: "VIP Auth",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Simulated VIP membership sign in unlocking tier perks, welcome credit balance, and personalized butler requests.",
    features: ["Quick Demo Login", "Tier Simulator", "Credit Balance"]
  },
  {
    id: "auth-register",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "Create VIP Account",
    path: "/register",
    badge: "Tier Privileges",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "Multi-tier loyalty program signup with immediate ₹25,000 welcome credit grant and exclusive member lounge access.",
    features: ["Silver, Gold & Black", "Welcome Credit", "Form Validation"]
  },
  {
    id: "auth-forgot",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "VIP Password Recovery",
    path: "/forgot-password",
    badge: "Recovery Protocol",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    description: "Secure password reset flow with automated email dispatch simulation and VIP concierge hotline fallback.",
    features: ["One-Time Token", "Instant Validation", "Concierge Fallback"]
  },
  {
    id: "utility-search",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "Universal Instant Search",
    path: "/search?q=deluxe",
    badge: "Real-Time Query",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Instant multi-entity search query parsing rooms, destinations, dining, and blog posts with highlighted matches.",
    features: ["Multi-Entity Search", "Quick Result Badges", "Filter By Type"]
  },
  {
    id: "design-system",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "Living Design System Styleguide",
    path: "/design-system",
    badge: "Component Library",
    image: "/images/preview-banner.jpg",
    description: "Interactive living styleguide showcasing all UI components: buttons, badges, color palettes, typography, inputs & modals.",
    features: ["Interactive Tokens", "Component Sandbox", "Code Snippets"]
  },
  {
    id: "utility-privacy",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "GDPR Privacy Policy",
    path: "/privacy",
    badge: "GDPR Compliant",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "Legally structured privacy policy covering guest data protection, encryption protocols, and cookie usage preferences.",
    features: ["Clean Typography", "Legal Clauses", "GDPR Disclosures"]
  },
  {
    id: "utility-terms",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "Terms & Conditions",
    path: "/terms",
    badge: "Reservation Policy",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "Standard terms covering direct reservations, deposit refunds, cancellation rules, and property conduct.",
    features: ["Cancellation Rules", "Refund Terms", "Deposit Guidelines"]
  },
  {
    id: "utility-404",
    categoryKey: "utility",
    categoryName: "VIP & Utilities",
    title: "Luxury 404 Experience",
    path: "/404",
    badge: "Error Page",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    description: "Custom branded 404 page that gracefully guides lost visitors back to available suites, destinations, or concierge assistance.",
    features: ["Back to Home CTA", "Concierge Link", "Search Fallback"]
  }
];

export const INNER_CATEGORY_FILTERS = [
  { key: "all", label: "All Inner Pages", count: 41 },
  { key: "rooms", label: "Suites & Accommodation", count: 7 },
  { key: "destinations", label: "Destinations & Maps", count: 4 },
  { key: "tours", label: "Tours & Expeditions", count: 4 },
  { key: "dining", label: "Gastronomy & Spa", count: 4 },
  { key: "gallery", label: "Visual Galleries", count: 3 },
  { key: "journal", label: "Editorial Journal", count: 4 },
  { key: "about", label: "About & Gateways", count: 7 },
  { key: "utility", label: "VIP & Utilities", count: 8 },
];

export const KEY_FEATURES_DATA = [
  {
    iconName: "Zap",
    title: "React 19 & Tailwind CSS v4",
    badge: "Sub-500ms HMR",
    desc: "Built on the cutting edge with CSS-first @theme design tokens, zero build friction, and instantaneous hot-module replacement."
  },
  {
    iconName: "Layers",
    title: "6 Global React State Engines",
    badge: "Decoupled Contexts",
    desc: "Includes ThemeContext (Light/Dark), AuthContext (VIP tiers), BookingContext (calculator), FavoritesContext (wishlist), and PagePopupContext."
  },
  {
    iconName: "MapPin",
    title: "Interactive Leaflet Maps",
    badge: "Custom Gold Markers",
    desc: "Integrated OpenStreetMap explorer with custom gold SVG pins, interactive hotel popups, coordinates telemetry, and fluid sidebar sync."
  },
  {
    iconName: "SlidersHorizontal",
    title: "Live Theme Studio Drawer",
    badge: "Real-Time Switcher",
    desc: "Visitors can customize color themes, typography pairings (Raleway vs Noto Sans), 4 header styles, and 3 footer layouts on the fly."
  },
  {
    iconName: "Code2",
    title: "17 Decoupled Data Modules",
    badge: "CMS & API Ready",
    desc: "Zero hardcoded JSX content. Centralized in src/data/ for effortless binding to WordPress REST, Strapi, Sanity, or Node.js."
  },
  {
    iconName: "ShieldCheck",
    title: "Commercial ThemeForest Grade",
    badge: "100% Validated",
    desc: "Zero ESLint warnings, accessible focus rings, responsive mobile hamburger drawer, and comprehensive offline HTML documentation."
  }
];

export const THEME_HEADER_VARIANTS = [
  { id: "standard", name: "Standard Classic", desc: "White/Slate top utility bar + main navigation with subtle elevation." },
  { id: "transparent", name: "Transparent Glass", desc: "Floating glassmorphic header overlaying full-height hero banners." },
  { id: "dark", name: "Dark Noir Luxury", desc: "Deep slate & charcoal styling with brushed gold accents." },
  { id: "minimal", name: "Minimal Modern", desc: "Streamlined single-line layout without utility top bar for clean focus." }
];

export const FAQ_DATA = [
  {
    q: "Can I easily connect this template to WordPress or a Headless CMS?",
    a: "Yes! All room details, tours, destinations, dining menus, and blog articles are cleanly centralized in 17 ES modules in 'src/data/'. You can simply replace these files with fetch() or React Query hooks connecting to your WordPress REST API, Strapi, Sanity, or backend endpoints."
  },
  {
    q: "Does this template use Tailwind CSS v4 or v3?",
    a: "LuxStay is built natively on the latest Tailwind CSS v4 engine using modern @theme tokens in index.css. It provides full support for light/dark mode, luxury gold color tokens, and custom fonts without needing a legacy tailwind.config.js file."
  },
  {
    q: "How do I switch between the 8 different homepage variations?",
    a: "Every homepage is an independent page component located in 'src/pages/home/'. You can link directly to them via routes (/home-beach, /home-hotel, /home-resort, etc.) or set any variation as your root index route in 'src/routes/AppRoutes.jsx'."
  },
  {
    q: "Are the Leaflet maps and date pickers fully functional?",
    a: "Yes. The map explorer uses Leaflet and OpenStreetMap with custom gold SVG marker pins and popup cards. The date pickers support single and range selections with calendar synchronization and price calculations."
  },
  {
    q: "Is there documentation included for setting up and deploying the project?",
    a: "Absolutely. The package includes a comprehensive 29-section offline documentation suite located in 'documentation/index.html', covering setup, Tailwind tokens, routing, adding new suites, and deployment to Vercel/Netlify."
  }
];

