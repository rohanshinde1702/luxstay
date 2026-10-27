/**
 * LuxStay — Curated Experiences & Specialized Concepts Mock Data
 * Edit this file to customize wellness schedules, spa packages, estate privileges,
 * exhibitions, transit notes, and island activities.
 */

export const BEACH_EXPERIENCES_DATA = [
  {
    id: "exp-snorkeling-diving",
    title: "Snorkeling & Diving",
    tagline: "Discover vibrant coral reefs, crystal-clear waters and unforgettable marine life just beyond the resort.",
    desc: "Explore vibrant marine life and coral reefs.",
    overview: "Plunge into warm crystalline waters and explore thriving coral gardens teeming with tropical fish, gentle sea turtles, and majestic manta rays. Accompanied by certified PADI divemasters with top-tier equipment provided.",
    duration: "2–3 Hours",
    location: "House Reef",
    suitableFor: "Beginners & Experienced",
    bestTime: "8:00 AM – 4:00 PM",
    inclusions: [
      "Full Snorkel & Scuba Equipment",
      "Certified PADI Master Guide",
      "High-Resolution Underwater GoPro Photos",
      "Chilled Tropical Refreshments & Towels",
    ],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    badge: "Marine Life",
    price: "Complimentary Snorkel / Scuba from ₹ 4,500",
  },
  {
    id: "exp-sunset-cruise",
    title: "Sunset Cruise",
    tagline: "Sail into golden horizons aboard a luxury catamaran with vintage champagne, canapés and ocean breezes.",
    desc: "Romantic views, golden horizons and unforgettable sunsets.",
    overview: "Glide across tranquil sapphire waters as the sun paints the sky in shades of amber and violet. Enjoy sommelier-curated champagne, artisan canapés, and panoramic coastal views from the catamaran deck.",
    duration: "2 Hours",
    location: "Private Marina",
    suitableFor: "Couples & Families",
    bestTime: "5:00 PM – 7:00 PM",
    inclusions: [
      "Private Luxury Catamaran Charter",
      "Vintage Champagne & Artisan Canapés",
      "Certified Skipper & Hospitality Steward",
      "Professional Sunset Photography Session",
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    badge: "Romantic",
    price: "From ₹ 8,500 per couple",
  },
  {
    id: "exp-spa-wellness",
    title: "Spa & Wellness",
    tagline: "Restore harmony and rejuvenate your senses with holistic botanical therapies, hydrotherapy and oceanfront massage.",
    desc: "Relax your mind, body and soul.",
    overview: "Enter a sanctuary of tranquility nestled along the water's edge. Our signature wellness rituals combine ancestral Ayurvedic healing, thermal hydrotherapy, and custom organic botanical oils to restore deep vitality.",
    duration: "60–90 Minutes",
    location: "Resort Spa",
    suitableFor: "All Guests",
    bestTime: "10:00 AM – 8:00 PM",
    inclusions: [
      "Signature Hydrotherapy Bath & Steam Grotto",
      "Custom Organic Botanical Massage Oils",
      "Herbal Detox Elixirs & Floral Infusions",
      "Private Oceanfront Relaxation Pavilion",
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    badge: "Holistic",
    price: "From ₹ 6,000 per session",
  },
  {
    id: "exp-water-sports",
    title: "Water Sports",
    tagline: "Feel the adrenaline with high-speed jet skis, wakeboarding, windsurfing, and glass-bottom kayaking over turquoise lagoons.",
    desc: "Adventure awaits on the waves.",
    overview: "Embark on high-energy thrills across our private protected lagoon. Whether gliding gracefully on a transparent glass kayak or cruising on high-performance Yamaha WaveRunners, ocean excitement awaits.",
    duration: "1–3 Hours",
    location: "Beach Activity Center",
    suitableFor: "Beginners & Experienced",
    bestTime: "9:00 AM – 5:00 PM",
    inclusions: [
      "High-Performance WaveRunners & Jet Skis",
      "Transparent Glass-Bottom Kayaks & SUPs",
      "Certified Water Safety & Life Guard Support",
      "Dry Bags & Waterproof Action Cameras",
    ],
    image: "https://plus.unsplash.com/premium_photo-1719262671718-76ace3783857?auto=format&fit=crop&w=1200&q=80",
    badge: "Adventure",
    price: "Complimentary Kayaks / Jet Ski from ₹ 3,500",
  },
];

export const WELLNESS_SCHEDULE_DATA = [
  { time: "07:00 AM", title: "Sunrise Pranayama & Coastal Hatha Yoga", location: "Lotus Ocean Pavilion" },
  { time: "09:30 AM", title: "Tibetan Singing Bowl Sound Immersion", location: "Aura Meditation Cave" },
  { time: "02:00 PM", title: "Ayurvedic Herbal Detox & Botanical Workshop", location: "Organic Zen Gardens" },
  { time: "05:30 PM", title: "Sunset Mindful Meditation & Herbal Tea Flight", location: "Cliffside Sunset Deck" },
];

export const SPA_PACKAGES_DATA = [
  {
    title: "The Royal Mediterranean Renewal",
    duration: "180 mins",
    price: "₹ 18,500",
    desc: "Volcanic sea-salt scrub, warm organic olive oil body massage, and gold peptide anti-aging facial.",
  },
  {
    title: "Alpine Thermal Detox & Sauna Ritual",
    duration: "120 mins",
    price: "₹ 14,000",
    desc: "Pine needle aromatherapy, Finnish dry sauna infusion, cold plunge hydrotherapy, and deep tissue acupressure.",
  },
  {
    title: "Sacred Bali Floral Bath & Shirodhara",
    duration: "150 mins",
    price: "₹ 16,500",
    desc: "Traditional Balinese lulur exfoliation, frangipani petal immersion bath, and warm herbal scalp stream.",
  },
];

export const ESTATE_PRIVILEGES_DATA = [
  {
    title: "Dedicated Private Butler",
    desc: "24/7 personal estate manager handling baggage unpacking, event bookings, and bespoke dining arrangements.",
    icon: "ShieldCheck",
  },
  {
    title: "Private In-Villa Executive Chef",
    desc: "Exclusive breakfast, poolside lunch, and 5-course dinners customized to your exact nutritional preferences.",
    icon: "Utensils",
  },
  {
    title: "Gated Perimeter & Chauffeur",
    desc: "Private helicopter landing clearance, biometric villa access, and chauffeured Range Rover at your service.",
    icon: "Key",
  },
  {
    title: "Private Wine Cellar Access",
    desc: "In-villa temperature-controlled sommelier vault stocked with premier crus, vintage champagnes, and rare cognacs.",
    icon: "Wine",
  },
];

export const TRANSIT_PROXIMITY_DATA = [
  { hub: "Metropolitan Financial District", time: "5 Mins", mode: "Executive Chauffeur" },
  { hub: "International Airport Helipad", time: "12 Mins", mode: "Private Heli-Transfer" },
  { hub: "Luxury High-Street Boutiques", time: "3 Mins", mode: "Walking Distance" },
  { hub: "Grand Opera & Symphony Hall", time: "8 Mins", mode: "Limousine Service" },
];

export const HERITAGE_VAULTS_DATA = [
  {
    era: "1895 Vintage Room",
    items: "Rare Bordeaux First Growths & 1928 Champagne Reserves",
    desc: "Subterranean vaulted cellars carved into bedrock, maintaining a continuous 13°C and 70% humidity for over a century.",
  },
  {
    era: "Private Cigar & Cognac Salon",
    items: "Pre-Embargo Havana Cigars & 19th-Century Louis XIII",
    desc: "Soundproofed dark oak library equipped with artisanal air purification and individual guest humidor lockers.",
  },
  {
    era: "Black Card Member Vault",
    items: "Private Safe Deposit & Dedicated Sommelier Tastings",
    desc: "Biometrically secured sanctuary reserved exclusively for invitation-only global patrons.",
  },
];

export const ARTIST_EXHIBITIONS_DATA = [
  {
    artist: "Elena Rostova (Milan)",
    title: "Light & Shadow on Marble",
    dates: "October 15 – November 30, 2026",
    location: "The Atrium Gallery",
    medium: "Contemporary Marble Sculpture & Canvas",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
  {
    artist: "Marcus Vance (London)",
    title: "Monochrome Coastlines & Seascapes",
    dates: "December 05 – January 20, 2027",
    location: "The Mezzanine Salon",
    medium: "Sumi-e Ink & Minimalist Textile Installations",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
  },
];

export const ISLAND_EXPERIENCES_DATA = [
  {
    title: "Private Sandbank Sunset Dining",
    desc: "Cast away to an uninhabited white-sand shoal for a private candlelit 5-course seafood barbecue beneath the stars.",
    duration: "4 Hours",
    tag: "Exclusive",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Manta Ray & Whale Shark Safari",
    desc: "Guided snorkeling expedition aboard our luxury catamaran with resident marine biologists.",
    duration: "Full Day",
    tag: "Marine Life",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Overwater Coral Restoration Workshop",
    desc: "Adopt and plant your own coral fragment on our private protected lagoon reef with certified underwater photographers.",
    duration: "2 Hours",
    tag: "Eco-Immersion",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
];
