export const TOURS_DATA = [
  // ----------------------------------------------------------------------------
  // 1. AMALFI COAST, ITALY — Yacht & Marine
  // ----------------------------------------------------------------------------
  {
    id: "amalfi-private-yacht",
    slug: "amalfi-private-yacht",
    title: "Capri & Amalfi Coastline Private Yacht Cruise",
    destination: "Amalfi Coast, Italy",
    destinationSlug: "amalfi-coast-italy",
    category: "Yacht & Marine",
    duration: "Full Day (8 Hours)",
    groupSize: "Private / Up to 8 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Italian, French",
    price: 52000,
    oldPrice: 62000,
    rating: 4.99,
    reviewsCount: 76,
    badge: "Best Seller",
    featured: true,
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Custom 50ft Riva yacht with certified captain & steward",
      "Swim in the secluded Emerald & White Grottos",
      "Complimentary Prosecco & seafood antipasti",
      "Private tender transfer to Capri island",
    ],
    description:
      "Glide across the sapphire waters of the Tyrrhenian Sea aboard a handcrafted luxury yacht. Discover hidden sea caves, secluded bays, and dine at exclusive cliffside beach clubs. Tailored specifically for guests desiring effortless Mediterranean elegance.",
    itinerary: [
      { time: "09:30 AM", title: "VIP Marina Embarkation", desc: "Meet your captain and steward at the LuxStay private marina dock with a chilled glass of vintage Prosecco." },
      { time: "10:30 AM", title: "Emerald & White Grotto Exploration", desc: "Cruise along dramatic limestone cliffs and drop anchor for a private swim inside the illuminated turquoise sea cave." },
      { time: "01:00 PM", title: "Cliffside Seafood Luncheon at La Fontelina", desc: "Private tender transfer to the iconic Capri beach club for freshly caught Mediterranean sea bass and pasta." },
      { time: "03:30 PM", title: "Faraglioni Rocks & Capri Circumnavigation", desc: "Sail through the towering arch of the Faraglioni rock spires with champagne and fresh seasonal fruit platters." },
      { time: "05:30 PM", title: "Sunset Marina Return", desc: "Glide into the harbor as the golden hour sun bathes Positano's pastel villas in warm amber light." },
    ],
    inclusions: [
      "Handcrafted 50ft luxury Riva yacht & private crew",
      "All marine fuel, port fees, and captain gratuity",
      "Open bar with Italian Prosecco, soft drinks, and beer",
      "Fresh organic seasonal fruit and local artisan antipasti",
      "Snorkeling equipment & stand-up paddleboards",
      "Complimentary hotel Rolls-Royce marina transfer",
    ],
    exclusions: [
      "Restaurant lunch food & alcoholic purchases at La Fontelina",
      "Personal boutique shopping on Capri",
    ],
    guide: {
      name: "Captain Matteo Vivaldi",
      role: "Master Yacht Captain",
      experience: "16+ Years Amalfi Coast Master",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 2. SWISS ALPS — Helicopter & Alpine
  // ----------------------------------------------------------------------------
  {
    id: "swiss-alps-heli-tour",
    slug: "swiss-alps-heli-tour",
    title: "Matterhorn Glacier Heli-Flight & Alpine Picnic",
    destination: "Zermatt, Switzerland",
    destinationSlug: "swiss-alps-zermatt",
    category: "Helicopter & Alpine",
    duration: "Half Day (4 Hours)",
    groupSize: "Private / Up to 4 Guests",
    activityLevel: "Leisure & Scenic",
    languages: "English, German, French",
    price: 78000,
    oldPrice: 89000,
    rating: 5.0,
    reviewsCount: 42,
    badge: "Exclusive",
    featured: true,
    image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Helicopter flight directly circling the Matterhorn summit",
      "Champagne glacier landing at 3,800m altitude",
      "Gourmet Swiss fondue & charcuterie picnic",
      "Professional alpine photographer included",
    ],
    description:
      "Soar above pristine jagged peaks and vast ancient glaciers before touching down on untouched powder for a private luxury champagne brunch. An unforgettable, bucket-list alpine journey with certified mountain aviation pilots.",
    itinerary: [
      { time: "10:00 AM", title: "Private Helipad Briefing", desc: "Meet your senior pilot at the Zermatt Alpine Base for safety orientation and champagne welcome." },
      { time: "10:30 AM", title: "Aerial Matterhorn Circumnavigation", desc: "Fly within meters of the sheer North Face of the Matterhorn, Monte Rosa, and the Gorner Glacier." },
      { time: "11:15 AM", title: "High-Glacier Snow Landing & Brunch", desc: "Touch down on an untouched 3,800m glacier. Enjoy heated sheepskin chairs, truffle fondue, and vintage Dom Pérignon." },
      { time: "01:30 PM", title: "Scenic Descent & Alpine Base Return", desc: "Gliding descent through the Matter Valley back to your luxury chalet." },
    ],
    inclusions: [
      "Private charter of Airbus H125 VIP helicopter",
      "Touchdown permits on official high-altitude alpine glacier",
      "Gourmet Swiss artisan fondue & charcuterie banquet",
      "Bottle of vintage champagne per couple",
      "Professional digital photo package delivered same day",
    ],
    exclusions: ["Personal thermal winter outerwear (available for rental)"],
    guide: {
      name: "Pilot Hansruedi Weber",
      role: "Chief Mountain Aviator",
      experience: "22+ Years Swiss Air Rescue & Alpine Charter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 3. UBUD, BALI — Cultural & Heritage
  // ----------------------------------------------------------------------------
  {
    id: "bali-temple-waterfalls",
    slug: "bali-temple-waterfalls",
    title: "Sacred Waterfalls & Private Temple Blessing",
    destination: "Ubud, Bali",
    destinationSlug: "bali-indonesia",
    category: "Cultural & Heritage",
    duration: "Full Day (6 Hours)",
    groupSize: "Small Group / Up to 6",
    activityLevel: "Moderate Walk",
    languages: "English, Balinese, Indonesian",
    price: 9999,
    oldPrice: 12999,
    rating: 4.93,
    reviewsCount: 114,
    badge: "Cultural",
    featured: true,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Private VIP access before public opening hours",
      "Traditional water purification ritual with Hindu High Priest",
      "Hidden canyon swim beneath Sekumpul Falls",
      "Farm-to-table organic lunch in bamboo treehouse",
    ],
    description:
      "Immerse yourself in authentic Balinese spirituality. Experience ancient water purification ceremonies in sacred spring temples and swim beneath towering rainforest cascades with a dedicated cultural historian.",
    itinerary: [
      { time: "07:00 AM", title: "Early Morning Departure", desc: "Private luxury SUV pickup from your villa to arrive ahead of morning temple visitors." },
      { time: "08:15 AM", title: "Melukat Purification Ritual", desc: "Sacred water cleansing in volcanic spring pools guided step-by-step by an ordained Balinese priest." },
      { time: "10:30 AM", title: "Sekumpul Rainforest Falls Hike", desc: "Scenic descent through clove and cocoa plantations down to the thundering base of Sekumpul waterfall." },
      { time: "01:00 PM", title: "Bamboo Treehouse Organic Feast", desc: "Multi-course Balinese culinary lunch overlooking pristine jungle canopies." },
    ],
    inclusions: [
      "Private air-conditioned luxury SUV transfer",
      "All temple offerings (Canang Sari), sarongs, and priest donations",
      "Full farm-to-table organic 4-course lunch & fresh coconut water",
      "Private cultural guide and local waterfall escort",
    ],
    exclusions: ["Personal souvenir shopping"],
    guide: {
      name: "Wayan Sukadana",
      role: "Senior Cultural Anthropologist",
      experience: "14 Years Guiding Diplomatic & VIP Travelers",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 4. SANTORINI, GREECE — Yacht & Marine
  // ----------------------------------------------------------------------------
  {
    id: "santorini-sunset-catamaran",
    slug: "santorini-sunset-catamaran",
    title: "Caldera Sunset Sailing & Hot Springs Soak",
    destination: "Santorini, Greece",
    destinationSlug: "santorini-greece",
    category: "Yacht & Marine",
    duration: "Half Day (5 Hours)",
    groupSize: "Max 10 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Greek",
    price: 14500,
    oldPrice: 17500,
    rating: 4.91,
    reviewsCount: 88,
    badge: "Sunset Cruise",
    featured: false,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Volcanic hot springs swimming and mud bath",
      "Freshly grilled Greek BBQ buffet onboard",
      "Unlimited local Assyrtiko white wine",
      "Unobstructed front-row Oia sunset vista",
    ],
    description:
      "Sail past towering volcanic cliffs of the Santorini caldera. Swim in thermal sulphur springs and enjoy an open Greek feast as the sun sinks beneath the Aegean horizon.",
    itinerary: [
      { time: "02:30 PM", title: "Vlychada Port Boarding", desc: "Board the luxury Lagoon 52 catamaran with welcome glass of Assyrtiko wine." },
      { time: "03:30 PM", title: "Red & White Beach Swim Stops", desc: "Snorkel in crystalline waters beneath towering red volcanic rock cliffs." },
      { time: "05:00 PM", title: "Nea Kameni Hot Springs Soak", desc: "Relax in warm therapeutic volcanic mineral springs." },
      { time: "06:30 PM", title: "Onboard Grilled Seafood Dinner & Oia Sunset", desc: "Unobstructed view of the sun setting over the blue domes of Oia while enjoying freshly grilled Mediterranean prawns." },
    ],
    inclusions: [
      "Luxury Catamaran cruise with captain and hostess",
      "Full Greek BBQ feast with grilled meats, seafood, and salads",
      "Unlimited local wine, beer, and soft drinks",
      "Snorkeling gear & floating noodles",
      "Hotel round-trip transfers",
    ],
    exclusions: ["Premium imported champagne (available for purchase)"],
    guide: {
      name: "Captain Nikos Dimitriadis",
      role: "Aegean Sailing Master",
      experience: "18 Years Yachting Captain",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 5. KYOTO, JAPAN — Cultural & Heritage
  // ----------------------------------------------------------------------------
  {
    id: "kyoto-zen-tea-ceremony",
    slug: "kyoto-zen-tea-ceremony",
    title: "Arashiyama Bamboo Forest Sunrise & Private Zen Tea Ceremony",
    destination: "Kyoto, Japan",
    destinationSlug: "kyoto-japan",
    category: "Cultural & Heritage",
    duration: "Half Day (4 Hours)",
    groupSize: "Private / Up to 4 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Japanese",
    price: 32000,
    oldPrice: 38000,
    rating: 4.98,
    reviewsCount: 64,
    badge: "Heritage Master",
    featured: true,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Private dawn entry to Arashiyama Bamboo Grove before crowds",
      "Exclusive tea ceremony with a 15th-generation Urasenke Grand Master",
      "Private meditation session inside an ancient 800-year-old Zen temple",
      "Traditional seasonal wagashi confections and ceremonial grade matcha",
    ],
    description:
      "Witness dawn light filter through the towering emerald bamboo stalks of Arashiyama in absolute tranquility. Step into a private historic Zen monastery for an authentic private tea ritual and mindfulness instruction.",
    itinerary: [
      { time: "06:00 AM", title: "Sunrise Bamboo Grove Walk", desc: "Private stroll through empty paths of Arashiyama with peaceful soundscapes." },
      { time: "07:30 AM", title: "Zen Garden Meditation", desc: "Karesansui dry-landscape garden contemplation led by resident monk." },
      { time: "08:45 AM", title: "Grand Master Tea Ceremony", desc: "Intimate preparation and tasting of ceremonial matcha with handcrafted wagashi." },
      { time: "10:00 AM", title: "Chauffeur Return", desc: "Luxury Lexus transfer back to your Kyoto ryokan sanctuary." },
    ],
    inclusions: [
      "Private luxury chauffeur transportation throughout Kyoto",
      "Exclusive temple private opening fees and monk donations",
      "Ceremonial Uji matcha tasting and handcrafted confectionery",
      "Certified bilingual Kyoto cultural historian guide",
    ],
    exclusions: ["Traditional silk kimono rental (optional add-on)"],
    guide: {
      name: "Kenjiro Takahashi",
      role: "Kyoto Heritage Custodian",
      experience: "19+ Years Guiding Cultural VIPs",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 6. SERENGETI, TANZANIA — Safari & Wildlife
  // ----------------------------------------------------------------------------
  {
    id: "serengeti-balloon-safari",
    slug: "serengeti-balloon-safari",
    title: "Great Migration Hot Air Balloon Safari & Champagne Bush Breakfast",
    destination: "Serengeti National Park, Tanzania",
    destinationSlug: "serengeti-tanzania",
    category: "Safari & Wildlife",
    duration: "Half Day (5 Hours)",
    groupSize: "Small Group / Up to 8 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Swahili",
    price: 68000,
    oldPrice: 78000,
    rating: 5.0,
    reviewsCount: 92,
    badge: "Bucket List",
    featured: true,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Sunrise aerial flight drifting over vast herds of wildebeest and zebras",
      "Bird's-eye views of lion prides and elephant families at river crossings",
      "5-star silver-service champagne breakfast under acacia trees",
      "Custom 4x4 open-top Land Cruiser wildlife game drive return",
    ],
    description:
      "Float silently over the golden plains of the Serengeti as dawn breaks. Marvel at millions of migrating wildlife below, followed by a celebratory champagne banquet set on fine china in the heart of the African wilderness.",
    itinerary: [
      { time: "05:00 AM", title: "Early Dawn Camp Departure", desc: "4x4 transfer under starry African skies to the launch site." },
      { time: "06:15 AM", title: "Sunrise Balloon Lift-Off", desc: "Ascend as the golden sun illuminates endless savannah plains." },
      { time: "07:45 AM", title: "Savannah Landing & Toast", desc: "Traditional sparkling wine toast upon smooth grassland touchdown." },
      { time: "08:30 AM", title: "Silver-Service Bush Breakfast", desc: "English breakfast with freshly brewed Tanzanian coffee beneath wild acacia trees." },
      { time: "10:00 AM", title: "Game Drive En Route to Lodge", desc: "Scenic tracking of big cats, giraffes, and cheetahs." },
    ],
    inclusions: [
      "Sunrise hot air balloon flight with certified master pilot",
      "Full multi-course gourmet breakfast with vintage champagne",
      "Serengeti national park conservation permit fees",
      "Commemorative flight certificate signed by pilot",
    ],
    exclusions: ["Gratuities for safari trackers"],
    guide: {
      name: "Captain Joseph Mollel",
      role: "Chief Wildlife Aviator",
      experience: "15 Years Serengeti Balloon Veteran",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 7. MALDIVES — Yacht & Marine
  // ----------------------------------------------------------------------------
  {
    id: "maldives-manta-night-kayak",
    slug: "maldives-manta-night-kayak",
    title: "Bioluminescent Lagoon Night Kayak & Manta Ray Snorkel Safari",
    destination: "Baa Atoll, Maldives",
    destinationSlug: "maldives",
    category: "Yacht & Marine",
    duration: "Half Day (4 Hours)",
    groupSize: "Private / Up to 6 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Dhivehi",
    price: 36000,
    oldPrice: 42000,
    rating: 4.97,
    reviewsCount: 58,
    badge: "Eco-Immersion",
    featured: true,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Snorkel alongside majestic manta rays in Hanifaru Bay Biosphere Reserve",
      "Transparent glass-bottom night kayaking over glowing bioluminescent waters",
      "Underwater 4K photography package by resident marine biologist",
      "Sunset champagne cocktail reception on an uninhabited sandbank",
    ],
    description:
      "Experience the pure magic of the Indian Ocean. Swim alongside gentle manta rays in a protected UNESCO marine biosphere, followed by an evening paddle across glowing neon waters illuminated by marine bioluminescence.",
    itinerary: [
      { time: "03:00 PM", title: "Luxury Catamaran Departure", desc: "Cruise toward protected reef waters with iced coconuts and refreshments." },
      { time: "04:15 PM", title: "Hanifaru Bay Manta Snorkel", desc: "Witness manta rays barrel-rolling through feeding channels." },
      { time: "06:00 PM", title: "Sandbank Sunset Champagne", desc: "Toast the tropical dusk with canapés on a secluded white sandbank." },
      { time: "07:00 PM", title: "Glowing Night Kayak Safari", desc: "Paddle through twinkling neon phytoplankton under starry skies." },
    ],
    inclusions: [
      "Private luxury catamaran with skipper and marine biologist",
      "UNESCO Hanifaru Bay biosphere permit tags",
      "Snorkel gear, wetsuits, and transparent LED kayaks",
      "Full digital underwater photography package",
    ],
    exclusions: ["Personal scuba certification equipment (scuba add-on available)"],
    guide: {
      name: "Dr. Aishath Niyaz",
      role: "Marine Biologist & Coral Specialist",
      experience: "11 Years Maldives Marine Conservation",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 8. ICELAND — Adventure & Expedition
  // ----------------------------------------------------------------------------
  {
    id: "iceland-aurora-superjeep",
    slug: "iceland-aurora-superjeep",
    title: "Super-Jeep Glacier Hunt for Aurora Borealis & Blue Lagoon VIP",
    destination: "Reykjavik & Highlands, Iceland",
    destinationSlug: "iceland-reykjavik",
    category: "Adventure & Expedition",
    duration: "Full Day (8 Hours)",
    groupSize: "Small Group / Up to 6",
    activityLevel: "Moderate Walk",
    languages: "English, Icelandic",
    price: 48000,
    oldPrice: 55000,
    rating: 4.96,
    reviewsCount: 71,
    badge: "Northern Lights",
    featured: true,
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Custom 44-inch monster Super-Jeep navigating deep glacial snowfields",
      "Chasing vivid green and purple Aurora Borealis with astronomer guide",
      "Private access to exclusive Retreat Lounge at Blue Lagoon thermal spa",
      "Artisan Icelandic smoked lamb broth and warm Brennivín hot toddies",
    ],
    description:
      "Journey deep into Iceland's volcanic wilderness in a high-powered Super-Jeep. Search for dancing aurora lights across clear arctic skies and unwind in private geothermal silica waters.",
    itinerary: [
      { time: "01:00 PM", title: "Blue Lagoon VIP Retreat Lounge", desc: "Private changing suites, silica mud masks, and geothermal floating massage." },
      { time: "05:00 PM", title: "Glacier Super-Jeep Ascend", desc: "Conquer rugged lava fields and snowy mountain passes with giant balloon tires." },
      { time: "07:30 PM", title: "Dark Sky Stargazing & Aurora Hunting", desc: "Set up high-powered telescopes and professional tripod camera gear." },
      { time: "09:30 PM", title: "Campfire Hot Chocolate & Return", desc: "Warm beverages beneath the celestial light show before returning to luxury hotel." },
    ],
    inclusions: [
      "Private modified Arctic Super-Jeep with veteran driver-guide",
      "Blue Lagoon VIP Retreat Lounge access and silica ritual",
      "Professional DSLR aurora portraits delivered in high resolution",
      "Thermal arctic overalls, headlamps, and spikes",
    ],
    exclusions: ["Personal swimwear (towels and bathrobes provided)"],
    guide: {
      name: "Einar Sigurdsson",
      role: "Glacier & Aurora Specialist",
      experience: "17 Years Icelandic Highland Expedition Leader",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 9. NEW ZEALAND — Helicopter & Alpine
  // ----------------------------------------------------------------------------
  {
    id: "milford-sound-heli-cruise",
    slug: "milford-sound-heli-cruise",
    title: "Milford Sound Helicopter Glacier Landing & Private Fjord Yacht Cruise",
    destination: "Queenstown & Fiordland, New Zealand",
    destinationSlug: "new-zealand-queenstown",
    category: "Helicopter & Alpine",
    duration: "Full Day (7 Hours)",
    groupSize: "Private / Up to 6 Guests",
    activityLevel: "Leisure & Scenic",
    languages: "English",
    price: 84000,
    oldPrice: 96000,
    rating: 5.0,
    reviewsCount: 38,
    badge: "Ultimate Fjord",
    featured: true,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Helicopter flight over snow-capped Southern Alps and hanging valleys",
      "Exclusive alpine touchdown on Mount Tutoko glacier icefield",
      "Private charter yacht cruise beneath thundering Stirling Waterfalls",
      "Central Otago Pinot Noir wine and wild King Salmon luncheon",
    ],
    description:
      "Experience the dramatic grandeur of the Eighth Wonder of the World. Fly across jagged alpine crests, land on blue glacier ice, and cruise beneath 1,000-meter sheer granite cliffs surrounded by playful fur seals.",
    itinerary: [
      { time: "09:00 AM", title: "Queenstown Helipad Departure", desc: "Scenic flight over Lake Wakatipu and glacier-carved alpine ridges." },
      { time: "10:15 AM", title: "Mt. Tutoko Glacier Landing", desc: "Step out onto untouched snow with 360-degree panorama of Fiordland." },
      { time: "11:30 AM", title: "Milford Sound Yacht Boarding", desc: "Private vessel cruise close enough to feel the mist of Stirling Falls." },
      { time: "01:30 PM", title: "Gourmet Kiwi Seafood Lunch", desc: "Fresh crayfish, salmon, and Central Otago wine served on deck." },
      { time: "03:30 PM", title: "Return Flight via Skippers Canyon", desc: "Sunset aerial views returning to Queenstown." },
    ],
    inclusions: [
      "Private Eurocopter AS350 B3 flight with senior alpine pilot",
      "Exclusive glacier landing authorization",
      "Private charter yacht in Milford Sound with dedicated crew",
      "Gourmet multi-course luncheon and premium New Zealand wines",
    ],
    exclusions: ["Personal alpine souvenir purchases"],
    guide: {
      name: "Captain Alistair MacIntyre",
      role: "Senior Fiordland Mountain Pilot",
      experience: "21 Years New Zealand Aviation Veteran",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 10. BORA BORA — Yacht & Marine
  // ----------------------------------------------------------------------------
  {
    id: "bora-bora-private-motu-safari",
    slug: "bora-bora-private-motu-safari",
    title: "Private Motu Islet Picnic & Coral Lagoon Shark Ray Encounter",
    destination: "Bora Bora, French Polynesia",
    destinationSlug: "bora-bora-polynesia",
    category: "Yacht & Marine",
    duration: "Full Day (6 Hours)",
    groupSize: "Private / Up to 4 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, French, Tahitian",
    price: 58000,
    oldPrice: 68000,
    rating: 4.99,
    reviewsCount: 49,
    badge: "Romantic Escape",
    featured: true,
    image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Swim in shallow turquoise lagoon with harmless blacktip reef sharks and stingrays",
      "Private dining table set in crystal-clear knee-deep water on a secluded motu islet",
      "Traditional Polynesian Poisson Cru cooking demonstration and ukulele serenade",
      "Panoramic views of the dramatic volcanic spire of Mount Otemanu",
    ],
    description:
      "Surrender to South Pacific romance. Snorkel through vibrant coral gardens alongside gentle rays, then step onto your own private palm-fringed islet for an authentic Polynesian feast served at a table set right in the warm lagoon water.",
    itinerary: [
      { time: "09:30 AM", title: "Outrigger Canoe Pickup", desc: "Private handcrafted motorized outrigger arriving at your overwater villa dock." },
      { time: "10:30 AM", title: "Lagoon Coral Gardens Snorkel", desc: "Swim among schools of tropical butterflyfish and friendly stingrays." },
      { time: "12:30 PM", title: "Private Motu Water Table Luncheon", desc: "Feast on grilled mahi-mahi and fresh coconut milk while dipping toes in warm water." },
      { time: "02:30 PM", title: "Polynesian Cultural Workshops", desc: "Learn traditional pareo tying, coconut husking, and island melodies." },
      { time: "03:30 PM", title: "Lagoon Cruise Return", desc: "Scenic sail past Mount Otemanu back to resort." },
    ],
    inclusions: [
      "Private outrigger boat and dedicated Polynesian host",
      "All marine reserve access permits and snorkel gear",
      "Full private island lunch with chilled champagne and fresh tropical fruit",
      "Custom floral flower leis and coconut welcome drinks",
    ],
    exclusions: ["Gratuities for island musicians"],
    guide: {
      name: "Teva Teiho",
      role: "Polynesian Cultural Navigator",
      experience: "13 Years Lagoon Guiding Master",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 11. CAPPADOCIA, TURKEY — Helicopter & Alpine
  // ----------------------------------------------------------------------------
  {
    id: "cappadocia-sunrise-balloon",
    slug: "cappadocia-sunrise-balloon",
    title: "Sunrise Fairy Chimneys Hot Air Balloon & Underground Cave City Tour",
    destination: "Cappadocia, Turkey",
    destinationSlug: "cappadocia-turkey",
    category: "Helicopter & Alpine",
    duration: "Full Day (7 Hours)",
    groupSize: "Small Group / Up to 8 Guests",
    activityLevel: "Moderate Walk",
    languages: "English, Turkish",
    price: 34000,
    oldPrice: 40000,
    rating: 4.95,
    reviewsCount: 128,
    badge: "Top Rated",
    featured: false,
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Dawn flight drifting above volcanic rock valleys and ancient cave dwellings",
      "Champagne landing ceremony with traditional Turkish breakfast",
      "Private guided descent into Derinkuyu subterranean multi-level cave city",
      "Artisan pottery demonstration and Anatolian wine tasting",
    ],
    description:
      "Soar through surreal moonscapes as hundreds of colorful balloons ascend into the morning light over Cappadocia's iconic fairy chimneys. Explore ancient rock-hewn Byzantine churches and deep underground cities.",
    itinerary: [
      { time: "05:00 AM", title: "Hotel VIP Transfer & Pastry Breakfast", desc: "Early transfer to Goreme valley launch zone." },
      { time: "06:00 AM", title: "Sunrise Flight over Love Valley", desc: "Float gracefully between towering volcanic stone spires." },
      { time: "07:30 AM", title: "Champagne Touchdown & Medals", desc: "Celebratory toast and certificate presentation." },
      { time: "09:00 AM", title: "Derinkuyu Underground Exploration", desc: "Walk through 8 levels of ancient subterranean tunnels and dwellings." },
      { time: "11:30 AM", title: "Clay Pot Kebab Lunch & Pottery Atelier", desc: "Traditional slow-cooked Anatolian clay pot lunch." },
    ],
    inclusions: [
      "1-hour VIP hot air balloon flight with senior pilot",
      "Traditional champagne landing toast and certificate",
      "Full Anatolian gourmet lunch and museum admission fees",
      "Private Mercedes Sprinter vehicle throughout the tour",
    ],
    exclusions: ["Personal handmade carpet purchases"],
    guide: {
      name: "Murat Ozkan",
      role: "Licensed Anatolian Archaeologist",
      experience: "16 Years Cappadocia Cultural Historian",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 12. BANFF & CANADIAN ROCKIES — Adventure & Expedition
  // ----------------------------------------------------------------------------
  {
    id: "banff-rockies-heli-hike",
    slug: "banff-rockies-heli-hike",
    title: "Canadian Rockies Heli-Hiking & Moraine Lake Private Canoe Excursion",
    destination: "Banff & Lake Louise, Canada",
    destinationSlug: "banff-canada",
    category: "Adventure & Expedition",
    duration: "Full Day (8 Hours)",
    groupSize: "Private / Up to 6 Guests",
    activityLevel: "Moderate Walk",
    languages: "English, French",
    price: 62000,
    oldPrice: 72000,
    rating: 4.98,
    reviewsCount: 53,
    badge: "Alpine Wilderness",
    featured: true,
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Helicopter insertion onto secluded high-alpine wildflower meadows",
      "Guided trek past turquoise glacial lakes inaccessible by road",
      "VIP private wooden canoe rental on the radiant blue waters of Moraine Lake",
      "Artisan Canadian charcuterie and British Columbia Okanagan wine",
    ],
    description:
      "Access remote alpine ridgelines only reachable by air. Hike through fragrant subalpine fir forests and paddle handcrafted cedar canoes across radiant turquoise waters beneath the Valley of the Ten Peaks.",
    itinerary: [
      { time: "08:30 AM", title: "Canmore Helipad Lift-Off", desc: "Fly over the Three Sisters peaks and Bow Valley." },
      { time: "09:15 AM", title: "High-Alpine Meadow Trek", desc: "Guided hike through wild alpine terrain with naturalist guide." },
      { time: "12:30 PM", title: "Alpine Ridge Gourmet Picnic", desc: "Wild smoked salmon, artisan cheeses, and Okanagan wines." },
      { time: "02:30 PM", title: "Moraine Lake Canoe Experience", desc: "Private wooden canoe paddling on glacial waters." },
      { time: "04:30 PM", title: "Chauffeured Return to Banff Lodge", desc: "Relaxing drive with wildlife spotting." },
    ],
    inclusions: [
      "Private helicopter charter flight and backcountry landing permits",
      "Certified ACMG alpine hiking guide and bear safety equipment",
      "Private canoe rental on Moraine Lake (skip public queue)",
      "Full gourmet trail banquet and local wines",
    ],
    exclusions: ["Personal hiking boots (trekking poles provided)"],
    guide: {
      name: "Graham Sterling",
      role: "Certified ACMG Mountain Guide",
      experience: "18 Years Canadian Rockies Expedition Veteran",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 13. CAIRO & GIZA, EGYPT — Cultural & Heritage
  // ----------------------------------------------------------------------------
  {
    id: "giza-pyramids-private-access",
    slug: "giza-pyramids-private-access",
    title: "Private After-Hours Great Pyramids Access & Sunset Royal Camel Caravan",
    destination: "Giza & Cairo, Egypt",
    destinationSlug: "giza-egypt",
    category: "Cultural & Heritage",
    duration: "Half Day (5 Hours)",
    groupSize: "Private / Up to 4 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Arabic, French",
    price: 45000,
    oldPrice: 52000,
    rating: 4.97,
    reviewsCount: 82,
    badge: "Exclusive Access",
    featured: false,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Exclusive private entry inside the Great Pyramid of Khufu after public closing",
      "Stand between the paws of the Great Sphinx with a renowned Egyptologist",
      "Sunset royal camel caravan through the desert dunes with Egyptian mint tea",
      "Luxury dinner at 9 Pyramids Lounge overlooking illuminated monuments",
    ],
    description:
      "Step into the ancient world without crowds. Gain rare official government access to stand inside the King's Chamber of the Great Pyramid and touch the paws of the Sphinx at twilight with a leading Egyptologist.",
    itinerary: [
      { time: "03:30 PM", title: "Private Escort to Giza Plateau", desc: "VIP security clearance entrance after public gates close." },
      { time: "04:30 PM", title: "Great Pyramid Interior Exploration", desc: "Private ascent into the Grand Gallery and King's Chamber in silence." },
      { time: "05:45 PM", title: "Sphinx Paws Enclosure Access", desc: "Special permit entry directly between the paws of the Great Sphinx." },
      { time: "06:30 PM", title: "Sunset Camel Ride & Royal Dinner", desc: "Camel caravan to 9 Pyramids Lounge for Egyptian feast under floodlit pyramids." },
    ],
    inclusions: [
      "Special Ministry of Antiquities private after-hours opening permits",
      "Private consultation with PhD Egyptologist guide",
      "Royal camel caravan and horse-drawn carriage option",
      "Multi-course Egyptian dinner overlooking the plateau",
    ],
    exclusions: ["Personal photography permits for high-end cinema cameras"],
    guide: {
      name: "Dr. Tarek Mansour",
      role: "Professor of Classical Egyptology",
      experience: "24 Years Supreme Council of Antiquities Researcher",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 14. MAUI, HAWAII — Adventure & Expedition
  // ----------------------------------------------------------------------------
  {
    id: "maui-volcano-sunrise-snorkel",
    slug: "maui-volcano-sunrise-snorkel",
    title: "Haleakala Volcano Crater Sunrise & Molokini Coral Reef Scuba Safari",
    destination: "Maui, Hawaii, USA",
    destinationSlug: "maui-hawaii",
    category: "Adventure & Expedition",
    duration: "Full Day (8 Hours)",
    groupSize: "Small Group / Up to 8 Guests",
    activityLevel: "Moderate Walk",
    languages: "English, Hawaiian",
    price: 42000,
    oldPrice: 49000,
    rating: 4.94,
    reviewsCount: 67,
    badge: "Island Adventure",
    featured: false,
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Witness sacred sunrise from the 10,023ft summit of Haleakala volcano crater",
      "Charter catamaran cruise to volcanic crescent crater of Molokini",
      "Snorkel with Hawaiian green sea turtles (Honu) in Turtle Town",
      "Kona coffee tasting and fresh Maui Gold pineapple breakfast buffet",
    ],
    description:
      "From high-altitude volcanic summits above cloud inversions to pristine underwater marine sanctuaries, experience Maui's ultimate natural wonders in a seamless luxury day expedition.",
    itinerary: [
      { time: "04:30 AM", title: "Haleakala Summit Ascent", desc: "Drive up winding volcanic roads above the ocean of clouds." },
      { time: "06:00 AM", title: "Sacred Hawaiian Sunrise Chant", desc: "Experience the sunrise over the 3,000-meter volcanic crater." },
      { time: "08:30 AM", title: "Kona Coffee & Island Breakfast", desc: "Fresh tropical fruit and farm-to-table breakfast in Upcountry Maui." },
      { time: "10:30 AM", title: "Molokini Catamaran Snorkel Safari", desc: "Dive into 150ft visibility waters filled with 250 species of fish." },
    ],
    inclusions: [
      "Haleakala National Park sunrise vehicle reservation permits",
      "Luxury catamaran charter to Molokini Crater & Turtle Town",
      "Full premium snorkel equipment and optical masks",
      "Gourmet breakfast and hot grilled lunch buffet onboard",
    ],
    exclusions: ["Scuba tank rentals for certified divers (optional add-on)"],
    guide: {
      name: "Keanu Kalani",
      role: "Hawaiian Master Naturalist",
      experience: "14 Years Maui Ocean & Volcano Guide",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 15. ROVANIEMI, LAPLAND (FINLAND) — Adventure & Expedition
  // ----------------------------------------------------------------------------
  {
    id: "lapland-arctic-reindeer-igloo",
    slug: "lapland-arctic-reindeer-igloo",
    title: "Arctic Circle Reindeer Sleigh Safari & Private Glass Igloo Stargazing",
    destination: "Rovaniemi, Lapland, Finland",
    destinationSlug: "lapland-finland",
    category: "Adventure & Expedition",
    duration: "Full Day (6 Hours)",
    groupSize: "Private / Up to 4 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Finnish",
    price: 54000,
    oldPrice: 62000,
    rating: 4.99,
    reviewsCount: 79,
    badge: "Arctic Wonder",
    featured: true,
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Glide through snow-laden Taiga forests aboard a traditional reindeer sleigh",
      "Authentic Sami storytelling and hot lingonberry juice around a teepee fire",
      "Private evening session in a heated 360-degree glass igloo watching the aurora",
      "Traditional Finnish wood-fired sauna and optional ice hole dip",
    ],
    description:
      "Enter a winter fairytale in the Arctic Circle. Sleigh through frozen pine forests pulled by gentle reindeer, learn sacred indigenous Sami traditions, and watch the dancing northern lights through heated glass ceilings.",
    itinerary: [
      { time: "01:00 PM", title: "Sami Reindeer Farm Welcome", desc: "Meet indigenous herders and feed friendly arctic reindeer." },
      { time: "02:00 PM", title: "Deep Forest Reindeer Sleigh Ride", desc: "Peaceful glide through pristine snow-covered old-growth taiga." },
      { time: "04:00 PM", title: "Kotatent Fireplace Stories & Berry Soup", desc: "Warm up with smoked salmon soup and traditional joik singing." },
      { time: "06:30 PM", title: "Glass Igloo Aurora Stargazing", desc: "Relax with hot glögi in a private panoramic heated glass dome." },
    ],
    inclusions: [
      "Complete Arctic winter gear (thermal suits, boots, gloves, fur rugs)",
      "Traditional reindeer sleigh ride and driver's certificate",
      "Authentic Sami dinner in traditional wooden Kota pavilion",
      "Private heated glass igloo lounge reservation for aurora viewing",
    ],
    exclusions: ["Personal thermal wool base layers"],
    guide: {
      name: "Lauri Valkeapää",
      role: "Sami Heritage Ambassador",
      experience: "20 Years Arctic Wilderness Master",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 16. DUBAI & ARABIAN DESERT, UAE — Cultural & Heritage
  // ----------------------------------------------------------------------------
  {
    id: "dubai-royal-desert-safari",
    slug: "dubai-royal-desert-safari",
    title: "Private Royal Desert Conservation Safari with Falconry & 7-Course Feast",
    destination: "Dubai Desert Conservation Reserve, UAE",
    destinationSlug: "dubai-uae",
    category: "Cultural & Heritage",
    duration: "Half Day (6 Hours)",
    groupSize: "Private / Up to 4 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, Arabic",
    price: 49000,
    oldPrice: 58000,
    rating: 4.96,
    reviewsCount: 95,
    badge: "Royal Privilege",
    featured: false,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Traverse protected desert dunes in museum-quality vintage 1950s Land Rovers",
      "World-class private falconry demonstration with Royal family falconers",
      "Candlelit 7-course Bedouin banquet set in a secluded desert oasis",
      "Stargazing through high-powered astronomical telescopes with astrophysicist",
    ],
    description:
      "Experience Arabian heritage in the utmost regal comfort. Venture through protected dunes in a classic vintage Land Rover, witness hunting falcons swoop, and dine beneath starry desert skies with private oud musicians.",
    itinerary: [
      { time: "03:30 PM", title: "Luxury Hotel Chauffeur Pickup", desc: "Transit to the pristine Dubai Desert Conservation Reserve." },
      { time: "04:30 PM", title: "Vintage Land Rover Wildlife Drive", desc: "Spot wild Arabian Oryx and sand gazelles across untouched dunes." },
      { time: "05:45 PM", title: "Sunset Royal Falconry Display", desc: "Interactive flying of trained falcons and desert eagles." },
      { time: "07:00 PM", title: "Oasis Bedouin Banquet", desc: "Private 7-course feast featuring slow-cooked lamb ouzi and camel milk ice cream." },
    ],
    inclusions: [
      "Private vintage Land Rover and professional conservation ranger",
      "Dubai Desert Conservation Reserve entry fees",
      "Exclusive private royal camp setup with personal chef and butler",
      "7-course culinary banquet, aromatic shisha, and live acoustic oud",
    ],
    exclusions: ["Premium vintage champagne bottles (available on request)"],
    guide: {
      name: "Rashed Al-Maktoum",
      role: "Senior Desert Conservation Ranger",
      experience: "12 Years UAE Royal Safari Guide",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 17. ST. MORITZ, SWITZERLAND — Cultural & Heritage
  // ----------------------------------------------------------------------------
  {
    id: "st-moritz-glacier-train",
    slug: "st-moritz-glacier-train",
    title: "Glacier Express Panoramic VIP Train & High-Altitude Truffle Tasting",
    destination: "St. Moritz & Engadin, Switzerland",
    destinationSlug: "st-moritz-switzerland",
    category: "Cultural & Heritage",
    duration: "Full Day (7 Hours)",
    groupSize: "Private / Up to 4 Guests",
    activityLevel: "Easy & Leisure",
    languages: "English, German, Italian",
    price: 66000,
    oldPrice: 76000,
    rating: 4.97,
    reviewsCount: 45,
    badge: "VIP Excellence",
    featured: false,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "First-Class Excellence Class carriage on the world's most famous panoramic train",
      "Pass through 291 bridges and 91 tunnels across soaring Swiss viaducts",
      "5-course white truffle luncheon paired with rare Swiss Pinot Noirs",
      "Private horse-drawn carriage tour of frozen Lake St. Moritz",
    ],
    description:
      "Travel aboard the slowest express train in the world in unparalleled luxury. Relax in plush leather lounge seats with concierge service as breathtaking snow-draped alpine panoramas glide past floor-to-ceiling glass domes.",
    itinerary: [
      { time: "09:30 AM", title: "Excellence Class Welcome", desc: "Private red carpet boarding with regional sparkling wine in St. Moritz." },
      { time: "10:30 AM", title: "Landwasser Viaduct Crossing", desc: "Iconic traverse over the 65-meter-high curved limestone railway arch." },
      { time: "12:30 PM", title: "5-Course High Alpine Lunch", desc: "Fresh Engadin beef tenderloin with Alba white truffles." },
      { time: "03:00 PM", title: "Oberalp Pass Descent", desc: "Gliding descent back to St. Moritz with afternoon high tea." },
    ],
    inclusions: [
      "Glacier Express 'Excellence Class' guaranteed window seats",
      "Dedicated personal carriage concierge and sommelier",
      "5-course gourmet regional lunch and all paired Swiss wines",
      "Private hotel limousine station transfers",
    ],
    exclusions: ["Personal boutique purchases in St. Moritz"],
    guide: {
      name: "Therese Von Berg",
      role: "Swiss Alpine Rail Ambassador",
      experience: "15 Years Swiss Luxury Hospitality Host",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 18. GREAT BARRIER REEF, AUSTRALIA — Yacht & Marine
  // ----------------------------------------------------------------------------
  {
    id: "great-barrier-reef-scuba-heli",
    slug: "great-barrier-reef-scuba-heli",
    title: "Heart Reef Helicopter Scenic Flight & Outer Reef Private Scuba Charter",
    destination: "Whitsundays & Great Barrier Reef, Australia",
    destinationSlug: "great-barrier-reef-australia",
    category: "Yacht & Marine",
    duration: "Full Day (8 Hours)",
    groupSize: "Private / Up to 6 Guests",
    activityLevel: "Moderate Walk",
    languages: "English",
    price: 72000,
    oldPrice: 84000,
    rating: 4.99,
    reviewsCount: 56,
    badge: "World Wonder",
    featured: true,
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Low-altitude helicopter flight over the world-famous natural Heart Reef",
      "Private landing on the secluded Heart Island luxury pontoon",
      "Guided scuba dive or glass-bottom boat tour along pristine outer coral walls",
      "Chilled Moreton Bay bug seafood lunch with Australian Margaret River wine",
    ],
    description:
      "Witness Australia's greatest natural masterpiece from both air and water. Fly over radiant swirling turquoise coral atolls before dropping anchor on the remote outer barrier reef for unparalleled private diving and snorkeling.",
    itinerary: [
      { time: "08:30 AM", title: "Hamilton Island Helipad Departure", desc: "Aerial views over Whitehaven Beach's swirling silica sands." },
      { time: "09:45 AM", title: "Heart Reef Aerial Circle", desc: "Close-up photography circling the natural heart-shaped coral formation." },
      { time: "10:30 AM", title: "Private Outer Reef Dive", desc: "Submerge into pristine waters with sea turtles, clownfish, and reef sharks." },
      { time: "01:00 PM", title: "Seafood & Champagne Lunch", desc: "Fresh Queensland tiger prawns and chilled Australian Chardonnay." },
    ],
    inclusions: [
      "Private helicopter scenic flights across the Great Barrier Reef",
      "Access to exclusive private Heart Island pontoon",
      "Full premium scuba diving or snorkeling gear with divemaster",
      "Gourmet seafood banquet and all beverage refreshments",
    ],
    exclusions: ["PADI certification fees (discovery dives included)"],
    guide: {
      name: "Captain Liam O'Connor",
      role: "Marine Master & Aviation Pilot",
      experience: "16 Years Great Barrier Reef Expedition Leader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  },

  // ----------------------------------------------------------------------------
  // 19. GALAPAGOS ISLANDS, ECUADOR — Safari & Wildlife
  // ----------------------------------------------------------------------------
  {
    id: "galapagos-catamaran-wildlife",
    slug: "galapagos-catamaran-wildlife",
    title: "Private Luxury Catamaran Island Hopping & Giant Tortoise Sanctuary",
    destination: "Galapagos Islands, Ecuador",
    destinationSlug: "galapagos-ecuador",
    category: "Safari & Wildlife",
    duration: "Multi-Day (2 Days)",
    groupSize: "Small Group / Up to 8 Guests",
    activityLevel: "Moderate Walk",
    languages: "English, Spanish",
    price: 95000,
    oldPrice: 110000,
    rating: 5.0,
    reviewsCount: 34,
    badge: "Darwin Heritage",
    featured: true,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Encounter ancient Galapagos Giant Tortoises roaming freely in the wild highlands",
      "Snorkel alongside playful Galapagos sea lions and marine iguanas",
      "Private overnight luxury catamaran charter with Michelin-trained chef",
      "Led by Charles Darwin Foundation certified Level-3 Naturalist",
    ],
    description:
      "Journey to the cradle of evolutionary biology. Explore volcanic islands that have remained virtually unchanged for millions of years, getting extraordinarily close to fearless wildlife with world-renowned naturalists.",
    itinerary: [
      { time: "Day 1 - 09:00 AM", title: "Santa Cruz Highlands Tortoise Trek", desc: "Walk alongside 100-year-old giant tortoises in volcanic highlands." },
      { time: "Day 1 - 02:00 PM", title: "Embark on Luxury Catamaran", desc: "Set sail to secluded Bartolomé Island with fresh ceviche lunch." },
      { time: "Day 2 - 08:30 AM", title: "Pinnacle Rock Snorkel Safari", desc: "Swim with Galapagos penguins and green sea turtles." },
      { time: "Day 2 - 02:00 PM", title: "Lava Field Geology Hike", desc: "Traverse lunar volcanic spatter cones with panoramic ocean vistas." },
    ],
    inclusions: [
      "2-day private luxury yacht charter with private air-conditioned staterooms",
      "Galapagos National Park transit & inspection permits",
      "All gourmet meals, fresh seafood, and premium wine pairings",
      "Level-3 Galapagos National Park naturalist guide",
    ],
    exclusions: ["Galapagos National Park entry cash fee ($200 per adult)"],
    guide: {
      name: "Dr. Gabriel Morales",
      role: "Senior Evolutionary Biologist",
      experience: "21 Years Charles Darwin Research Station Naturalist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  },
];
