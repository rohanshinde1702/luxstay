import { useState, useEffect } from "react";
import {
  LuCalendar as Calendar,
  LuUsers as Users,
  LuSearch as Search,
  LuX as X,
  LuCheck as Check,
  LuStar as Star,
  LuSparkles as Sparkles,
  LuUtensils as Utensils,
  LuDroplets as Droplets,
  LuSun as Sun,
  LuThermometer as Thermometer,
  LuArrowUpRight as ArrowUpRight,
  LuEye as Eye,
  LuShieldCheck as ShieldCheck,
  LuClock as Clock,
  LuCircleCheck as CheckCircle2,
  LuChevronDown as ChevronDown,
  LuNavigation as Navigation
} from "react-icons/lu";
import ReviewsSlider from "../../components/common/ReviewsSlider";
import CountUp from "../../components/common/CountUp";
import DatePicker, { formatToISODate } from "../../components/common/DatePicker";
import DateRangePicker from "../../components/common/DateRangePicker";

const VILLAS_DATA = [
  {
    id: "oceanfront-estate",
    name: "Azure Oceanfront Villa",
    category: "oceanfront",
    type: "Private Villa",
    sqft: "3,800 sq ft",
    guests: "Up to 6 Guests",
    bed: "3 King Bedrooms",
    pool: "Private Heated Infinity Pool",
    price: 24500,
    rating: 4.98,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
    tag: "Most Popular",
    description:
      "Perched over the cliffs with unobstructed panoramic ocean views, featuring floor-to-ceiling glass walls, outdoor rain shower, private infinity pool, and personal 24/7 butler service.",
    features: [
      "Panoramic Ocean View",
      "24/7 Personal Butler",
      "Thermal Plunge Pool",
      "Private Sunset Terrace",
      "Complimentary Champagne Arrival",
    ],
  },
  {
    id: "forest-spa-residence",
    name: "Emerald Forest Spa Residence",
    category: "forest",
    type: "Wellness Residence",
    sqft: "2,900 sq ft",
    guests: "Up to 4 Guests",
    bed: "2 Master Suites",
    pool: "Outdoor Cedar Hot Tub",
    price: 18500,
    rating: 4.95,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    tag: "Eco-Luxury",
    description:
      "Immersed in lush botanical flora, designed with sustainable cedar timber and volcanic stone. Includes a private in-villa massage room and natural hydrotherapy cedar bath.",
    features: [
      "In-Villa Treatment Room",
      "Botanical Canopy View",
      "Daily Herbal Elixir Service",
      "Private Sauna & Steam",
      "Organic Cotton Linens",
    ],
  },
  {
    id: "overwater-sanctuary",
    name: "Celestial Overwater Sanctuary",
    category: "overwater",
    type: "Overwater Villa",
    sqft: "3,200 sq ft",
    guests: "2 Adult Guests",
    bed: "1 Grand Emperor Bed",
    pool: "Glass-Bottom Infinity Pool",
    price: 31000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=85",
    tag: "Signature Suite",
    description:
      "Suspended over turquoise lagoon waters with direct reef access. Features glass floor viewports, hammocks over the sea, private wine cellar, and private yacht arrival pier.",
    features: [
      "Direct Lagoon Pier",
      "Glass Floor Viewing Box",
      "Private Sommelier Service",
      "Sunset Deck & Hammock",
      "Helicopter Transfer Option",
    ],
  },
  {
    id: "botanical-suite",
    name: "Grand Botanical Garden Suite",
    category: "suite",
    type: "Luxury Suite",
    sqft: "1,850 sq ft",
    guests: "Up to 3 Guests",
    bed: "1 King + Lounge Daybed",
    pool: "Thermal Garden Jet Pool",
    price: 12500,
    rating: 4.92,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85",
    tag: "Serene Escape",
    description:
      "Surrounded by fragrant jasmine and orchids, offering an intimate sanctuary with marble fireplace, outdoor rain courtyard, and curated aromatherapy menu.",
    features: [
      "Private Orchid Garden",
      "Outdoor Sun Courtyard",
      "Custom Bath Oil Bar",
      "Yoga & Meditation Pavilion",
      "Daily Gourmet Breakfast",
    ],
  },
  {
    id: "coral-reef-hideaway",
    name: "Coral Reef Hideaway",
    category: "oceanfront",
    type: "Beach Villa",
    sqft: "2,600 sq ft",
    guests: "Up to 4 Guests",
    bed: "2 King Suites",
    pool: "Beachfront Plunge Pool",
    price: 21000,
    rating: 4.96,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    tag: "Direct Beach Access",
    description:
      "Steps from powdery white sands. Features direct beach pathways, private cabana with lounge beds, alfresco dining pavilion, and stargazing telescope.",
    features: [
      "Direct White Sand Access",
      "Private Beach Cabana",
      "Stargazing Telescope",
      "Alfresco Dining Table",
      "Paddleboard & Kayak Included",
    ],
  },
  {
    id: "royal-cliffside-palace",
    name: "Royal Cliffside Pavilion",
    category: "overwater",
    type: "Presidential Estate",
    sqft: "5,500 sq ft",
    guests: "Up to 8 Guests",
    bed: "4 Luxury Suites",
    pool: "25m Olympic Infinity Pool",
    price: 48000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
    tag: "Crown Jewel",
    description:
      "The pinnacle of Luxstay luxury. Complete private estate with dedicated head chef, private spa wing, dual infinity pools, screening room, and personal security team.",
    features: [
      "Private Executive Chef",
      "In-Estate Thermal Wing",
      "Dual Infinity Pools",
      "Helipad Access",
      "Cinema & Wine Tasting Cellar",
    ],
  },
];

const SPA_MENU_DATA = {
  hydrotherapy: [
    {
      title: "Volcanic Mineral Thermal Circuit",
      duration: "90 MIN",
      price: "$ 14,000",
      desc: "Guided immersion through five temperature-controlled mineral pools, geothermal mud mask, and oxygenating herbal bath.",
    },
    {
      title: "Cold Plunge & Infrared Detox",
      duration: "60 MIN",
      price: "$ 11,500",
      desc: "Custom combination of full-spectrum infrared therapy paired with contrast ice plunge to stimulate lymphatic circulation.",
    },
    {
      title: "Aromatherapy Herbal Vapor Cave",
      duration: "75 MIN",
      price: "$ 12,500",
      desc: "Natural underground quartz cave infused with organic eucalyptus, rosemary, and native wild lavender steam.",
    },
  ],
  massage: [
    {
      title: "Deep Tissue Botanical Relief",
      duration: "90 MIN",
      price: "$ 15,500",
      desc: "Targeted deep muscle work using warm Arnica and organic CBD-infused cold-pressed botanical oils.",
    },
    {
      title: "Luxstay Signature Warm Stone Massage",
      duration: "100 MIN",
      price: "$ 17,500",
      desc: "Smooth basalt volcanic stones heated in herbal infusion water to release deep physical and energetic tension.",
    },
    {
      title: "Four-Hands Synchronized Harmony",
      duration: "75 MIN",
      price: "$ 21,000",
      desc: "Two master therapists work in synchronized rhythm with warm sandalwood oils for ultimate neurological relaxation.",
    },
  ],
  facials: [
    {
      title: "Gold Leaf & Marine Collagen Rejuvenation",
      duration: "90 MIN",
      price: "$ 19,000",
      desc: "Pure 24k gold leaf application combined with micro-current lifting and deep sea marine algae serum.",
    },
    {
      title: "Cellular Oxygen & Botanical Hydration",
      duration: "75 MIN",
      price: "$ 14,500",
      desc: "Hyperbaric oxygen mist infused with botanical hyaluronic acid for instantly glowing and revitalized skin.",
    },
    {
      title: "Custom Organic Facial & Scalp Ritual",
      duration: "60 MIN",
      price: "$ 12,000",
      desc: "Tailored to your skin analysis using estate-harvested botanicals and warm herbal scalp acupressure.",
    },
  ],
  ayurveda: [
    {
      title: "Shirodhara Mind Awakening Therapy",
      duration: "90 MIN",
      price: "$ 16,500",
      desc: "Continuous stream of warm, herbal-infused sesame oil poured gently onto the third eye to quiet mental chatter.",
    },
    {
      title: "Abhyanga Full Body Marma Detox",
      duration: "90 MIN",
      price: "$ 15,500",
      desc: "Traditional warm oil herbal massage targeting vital energy points to release physical toxins and fatigue.",
    },
    {
      title: "Pizhichil Royal Herbal Bath",
      duration: "105 MIN",
      price: "$ 19,500",
      desc: "Warm herbal oils squeezed systematically over the body by two therapists for deep cellular renewal.",
    },
  ],
  sound: [
    {
      title: "Tibetan Singing Bowl Sound Immersion",
      duration: "60 MIN",
      price: "$ 11,000",
      desc: "Acoustic sound therapy utilizing hand-hammered quartz and Tibetan bronze bowls to balance energy centers.",
    },
    {
      title: "Full Moon Gong & Crystal Meditation",
      duration: "75 MIN",
      price: "$ 13,000",
      desc: "Deep vibrational healing frequency experience performed inside the open-air oceanfront stone dome.",
    },
  ],
};

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "villas",
    title: "Sunset Deck at Villa Azure",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    category: "spa",
    title: "Thermal Mineral Pool Sanctuary",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    category: "culinary",
    title: "Michelin Star Botanical Tasting",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    category: "nature",
    title: "Private Lagoon & Coral Reef",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    category: "villas",
    title: "Forest Residence Interior Suite",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    category: "spa",
    title: "Botanical Herbal Vapor Bath",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 7,
    category: "culinary",
    title: "Oceanfront Sunset Cocktail Bar",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 8,
    category: "nature",
    title: "Zen Botanical Meditation Garden",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85",
  },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85",
];

// --- VERIFIED GUEST STORIES ---
const GUEST_REVIEWS = [
  {
    id: "gr-1",
    quote:
      "Our stay in the Azure Oceanfront Villa was nothing short of life-changing. Waking up to private thermal pool plunges overlooking the cliff face was pure magic.",
    author: "Dr. Evelyn & Marcus Vance",
    stay: "Stayed October 2026 • 6 Nights",
    rating: 5,
  },
  {
    id: "gr-2",
    quote:
      "The 5-Day Mindful Detox retreat completely restored my sleep cycles. The Shirodhara oil ritual and organic culinary menus were divine.",
    author: "Helena Rostova",
    stay: "Stayed September 2026 • 5 Nights",
    rating: 5,
  },
  {
    id: "gr-3",
    quote:
      "Our private butler anticipated every wish — from sunrise yoga on the deck to a surprise candlelit dinner in the rainforest pavilion. Flawless.",
    author: "Aarav & Ishita Khanna",
    stay: "Stayed August 2026 • 4 Nights",
    rating: 5,
  },
  {
    id: "gr-4",
    quote:
      "The farm-to-table tasting menu was the finest meal of our travels. Knowing every ingredient came from the estate gardens made it even better.",
    author: "Julien Moreau",
    stay: "Stayed July 2026 • 7 Nights",
    rating: 5,
  },
  {
    id: "gr-5",
    quote:
      "A true sanctuary for families. The kids adored the reef snorkelling while we unwound in the cliffside spa. We're already planning our return.",
    author: "The Whitfield Family",
    stay: "Stayed June 2026 • 8 Nights",
    rating: 5,
  },
];

export default function HomeResort() {
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("EN");

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
    accommodation: "",
    spaPackage: "",
  });

  // Quick View Villa Modal State
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [villasFilter, setVillasFilter] = useState("all");

  // Spa Interactive Menu State
  const [activeSpaTab, setActiveSpaTab] = useState("hydrotherapy");

  // Dining Modal State
  const [selectedDiningVenue, setSelectedDiningVenue] = useState(null);
  const [diningReservationDate, setDiningReservationDate] = useState("");

  // Gallery Lightbox State
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  // Hero Image Carousel Slide State
  const [heroSlide, setHeroSlide] = useState(0);

  // Auto rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Toast Notification state
  const [toastMsg, setToastMsg] = useState(null);
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Arrival Guide Tab State
  const [arrivalTab, setArrivalTab] = useState("helicopter");

  // Retreat Accordion State
  const [expandedRetreat, setExpandedRetreat] = useState(0);

  // Filtered villas logic
  const filteredVillas = VILLAS_DATA.filter(
    (v) => villasFilter === "all" || v.category === villasFilter
  );

  // Filtered gallery logic
  const filteredGallery = GALLERY_ITEMS.filter(
    (g) => galleryFilter === "all" || g.category === galleryFilter
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#080D1A] text-[#1E1D1B] dark:text-slate-100 font-sans selection:bg-[#C5A059] selection:text-white">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="rounded-lg fixed bottom-6 right-6 z-50 bg-[#1C3326] text-[#FDFBF7] px-6 py-4 border border-[#C5A059] shadow-2xl flex items-center gap-4 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
              Luxstay Sanctuary Notification
            </p>
            <p className="text-sm font-light mt-0.5">{toastMsg}</p>
          </div>
          <button
            onClick={() => setToastMsg(null)}
            className="ml-4 text-stone-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div className="bg-[#1C3326] text-[#FDFBF7] text-xs py-2.5 px-4 text-center tracking-widest uppercase font-light border-b border-[#C5A059]/30 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-6 text-[11px] text-[#C5A059]">
          <span className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5" /> Amalfi Coast • 24°C Sunny
          </span>
          <span className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5" /> Water Temp • 22°C
          </span>
        </div>
        <p className="flex-1 text-center font-normal text-xs tracking-wider">
          <span className="text-[#C5A059]">Exclusive Reserve Offer:</span>{" "}
          Complimentary $15,000 Thermal Spa Credit on 4+ Night Stays
        </p>
        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-[#FDFBF7] focus:outline-hidden cursor-pointer"
          >
            <option value="INR" className="bg-[#1C3326]">
              INR ($)
            </option>
            <option value="USD" className="bg-[#1C3326]">
              USD ($)
            </option>
            <option value="EUR" className="bg-[#1C3326]">
              EUR (€)
            </option>
            <option value="GBP" className="bg-[#1C3326]">
              GBP (£)
            </option>
            <option value="CHF" className="bg-[#1C3326]">
              CHF (Fr)
            </option>
          </select>
          <span className="text-stone-600">|</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-[#FDFBF7] focus:outline-hidden cursor-pointer"
          >
            <option value="EN" className="bg-[#1C3326]">
              EN
            </option>
            <option value="FR" className="bg-[#1C3326]">
              FR
            </option>
            <option value="DE" className="bg-[#1C3326]">
              DE
            </option>
            <option value="IT" className="bg-[#1C3326]">
              IT
            </option>
          </select>
        </div>
      </div>

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[88vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {HERO_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === heroSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 18, 0.40), rgba(15, 23, 18, 0.70)), url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white pt-6">
          <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#C5A059] font-light mb-4 block">
            Exclusive Amalfi Coast Hideaway
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-tight mb-6 drop-shadow-xs">
            A Sanctuary where Nature, Mind & Spirit Align.
          </h1>
          <p className="text-stone-200 text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover 50 secluded acres of coastal wilderness, geothermal
            mineral springs, private infinity cliffside residences, and
            world-class Michelin culinary mastery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#B89248] text-[#1E1D1B] font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Explore Accommodation
            </button>
            <a
              href="#spa"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300"
            >
              Discover Thermal Spa
            </a>
          </div>
        </div>

        {/* Floating Horizontal Availability Search Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-20 hidden md:block">
          <div className="rounded-lg bg-[#FDFBF7] dark:bg-[#131c2e] p-4 lg:p-6 shadow-2xl border border-[#E6E0D6] dark:border-slate-800 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
            {/* Check-in & Check-out with react-calendar DateRangePicker */}
            <div className="flex-1 min-w-[280px] border-r border-[#E6E0D6] dark:border-slate-800 pr-4">
              <DateRangePicker
                variant="combined"
                startDate={bookingDetails.checkIn}
                endDate={bookingDetails.checkOut}
                onStartDateChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    checkIn: e.target.value,
                  })
                }
                onEndDateChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    checkOut: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Guests */}
            <div className="flex-1 min-w-[140px] border-r border-[#E6E0D6] dark:border-slate-800 pr-4">
              <label className="block text-[10px] uppercase tracking-widest text-[#C5A059] font-medium mb-1">
                Guests
              </label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-stone-400" />
                <select
                  value={bookingDetails.guests}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      guests: e.target.value,
                    })
                  }
                  className="bg-transparent text-xs font-medium text-[#1E1D1B] dark:text-white focus:outline-hidden w-full cursor-pointer"
                >
                  <option value="" className="bg-[#FDFBF7] dark:bg-[#131c2e]">Select Guests</option>
                  <option value="1 Adult" className="bg-[#FDFBF7] dark:bg-[#131c2e]">1 Guest</option>
                  <option value="2 Adults" className="bg-[#FDFBF7] dark:bg-[#131c2e]">2 Guests</option>
                  <option value="3 Adults" className="bg-[#FDFBF7] dark:bg-[#131c2e]">3 Guests</option>
                  <option value="4+ Adults" className="bg-[#FDFBF7] dark:bg-[#131c2e]">4+ Guests Family</option>
                </select>
              </div>
            </div>

            {/* Suite Category */}
            <div className="flex-1 min-w-[180px] pr-2">
              <label className="block text-[10px] uppercase tracking-widest text-[#C5A059] font-medium mb-1">
                Sanctuary Type
              </label>
              <select
                value={bookingDetails.accommodation}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    accommodation: e.target.value,
                  })
                }
                className="bg-transparent text-xs font-medium text-[#1E1D1B] dark:text-white focus:outline-hidden w-full cursor-pointer"
              >
                <option value="" className="bg-[#FDFBF7] dark:bg-[#131c2e]">Select Sanctuary</option>
                {VILLAS_DATA.map((v) => (
                  <option key={v.id} value={v.name} className="bg-[#FDFBF7] dark:bg-[#131c2e]">
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Submit */}
            <button
              onClick={() => {
                if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
                  showToast("Please select check-in and check-out dates.");
                  return;
                }
                if (!bookingDetails.guests) {
                  showToast("Please select the number of guests.");
                  return;
                }
                if (!bookingDetails.accommodation) {
                  showToast("Please select a sanctuary type.");
                  return;
                }
                setIsBookingOpen(true);
              }}
              className="bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] hover:text-[#1E1D1B] text-xs font-medium uppercase tracking-widest px-6 py-3.5 transition-colors duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-md"
            >
              <Search className="w-3.5 h-3.5" />
              Check Availability
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 right-8 z-20 flex space-x-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                i === heroSlide ? "bg-[#C5A059] w-6" : "bg-white/40 w-2.5"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. MINDFUL LUXURY NARRATIVE STORY */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                The Art of Mindful Luxury
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1E1D1B] dark:text-white leading-tight">
              Where Ancient Thermal Wisdom Meets Modern Seclusion.
            </h2>

            <p className="text-stone-600 dark:text-stone-300 font-light leading-relaxed text-sm md:text-base">
              Nestled between pristine cliffside olive groves and azure
              Mediterranean waters, LUXSTAY was envisioned as a timeless refuge
              for those seeking pure restoration. Here, luxury is measured in
              stillness, hyper-personalized botanical care, and harmonious
              natural architecture.
            </p>

            <p className="text-stone-600 dark:text-stone-300 font-light leading-relaxed text-sm md:text-base">
              Every detail—from our private volcanic mineral pools to our
              farm-to-table culinary creations—is meticulously crafted to slow
              down time and awaken the senses.
            </p>

            {/* Signature Block */}
            <div className="pt-4 border-t border-[#E6E0D6] dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-serif italic text-xl text-[#1E1D1B] dark:text-white">
                  Aurelius Thorne & Elena Vance
                </p>
                <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
                  Founders & Curators
                </p>
              </div>

              <div className="text-right">
                <span className="font-serif text-3xl font-light text-[#1C3326] dark:text-[#C5A059]">
                  <CountUp value="50+" />
                </span>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">
                  Acres of Private Reserve
                </p>
              </div>
            </div>
          </div>

          {/* Right Asymmetric Photo Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=85"
                alt="Spa Treatment"
                className="rounded-lg w-full h-72 md:h-80 object-cover shadow-lg border border-[#E6E0D6] dark:border-slate-800" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              <div className="rounded-lg bg-[#1C3326] text-[#FDFBF7] p-6 text-center border border-[#C5A059]">
                <Sparkles className="w-6 h-6 text-[#C5A059] mx-auto mb-2" />
                <p className="font-serif text-lg font-light">
                  100% Organic Botanical Spa
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#C5A059] mt-1">
                  Estate Crafted Oils
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-lg bg-[#F6F2EA] dark:bg-[#131c2e] p-6 text-center border border-[#E6E0D6] dark:border-slate-800">
                <p className="font-serif text-3xl font-light text-[#1C3326] dark:text-[#C5A059]">
                  <CountUp value="100%" />
                </p>
                <p className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mt-1">
                  Geothermal Powered
                </p>
              </div>
              <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=85"
                alt="Luxury Villa Interior"
                className="rounded-lg w-full h-72 md:h-80 object-cover shadow-lg border border-[#E6E0D6] dark:border-slate-800" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. VILLAS & RESIDENCES SHOWCASE */}
      <section
        id="villas"
        className="py-24 bg-[#F6F2EA] dark:bg-[#0c1322] border-y border-[#E6E0D6] dark:border-slate-800"
      >
        <div className="max-w-[1600px] mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-2">
                Private Havens
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1E1D1B] dark:text-white">
                Villas & Thermal Residences
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 border-b border-[#E6E0D6] dark:border-slate-800 pb-2">
              {[
                { id: "all", label: "All Accommodations" },
                { id: "oceanfront", label: "Oceanfront" },
                { id: "forest", label: "Forest Spa" },
                { id: "overwater", label: "Overwater" },
                { id: "suite", label: "Botanical Suites" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setVillasFilter(tab.id)}
                  className={`text-xs uppercase tracking-widest px-4 py-2 transition-all cursor-pointer ${
                    villasFilter === tab.id
                      ? "bg-[#1C3326] text-[#FDFBF7] font-semibold"
                      : "text-stone-600 dark:text-stone-400 hover:text-[#1E1D1B] dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Villas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVillas.map((villa) => (
              <div
                key={villa.id}
                className="bg-[#FDFBF7] dark:bg-[#131c2e] rounded-lg overflow-hidden border border-[#E6E0D6]/40 dark:border-slate-800 hover:border-[#C5A059] transition-all duration-300 group flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Image Container (clips the hover zoom inside rounded corners) */}
                  <div className="relative overflow-hidden h-64 rounded-t-lg isolate">
                    <img src={villa.image}
                      alt={villa.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <span className="absolute top-4 left-4 bg-[#1C3326]/90 text-[#FDFBF7] text-[10px] uppercase tracking-widest px-3 py-1 border border-[#C5A059]/40">
                      {villa.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900 text-[#1E1D1B] dark:text-white text-xs font-semibold px-3 py-1 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                      {villa.rating}
                    </span>
                  </div>

                  {/* Villa Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-medium">
                        {villa.type}
                      </span>
                      <span className="text-xs text-stone-500">
                        {villa.sqft}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-light text-[#1E1D1B] dark:text-white mb-3 group-hover:text-[#C5A059] transition-colors">
                      {villa.name}
                    </h3>

                    <p className="text-stone-600 dark:text-stone-300 text-xs font-light line-clamp-2 leading-relaxed mb-6">
                      {villa.description}
                    </p>

                    {/* Specs List */}
                    <div className="space-y-2 border-t border-[#E6E0D6] dark:border-slate-800 pt-4 mb-6 text-xs text-stone-600 dark:text-stone-300">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{villa.guests}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{villa.pool}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer & Actions */}
                <div className="px-6 pb-6 pt-2 border-t border-[#E6E0D6] dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                      From
                    </span>
                    <span className="font-serif text-2xl font-light text-[#1C3326] dark:text-[#C5A059]">
                      ${villa.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-500"> / night</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedVilla(villa)}
                      className="p-2 border border-[#E6E0D6] dark:border-slate-700 hover:border-[#1C3326] text-stone-600 dark:text-stone-300 hover:text-[#1E1D1B] transition-colors cursor-pointer"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setBookingDetails({
                          ...bookingDetails,
                          accommodation: villa.name,
                        });
                        setIsBookingOpen(true);
                      }}
                      className="bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] hover:text-[#1E1D1B] text-xs uppercase tracking-widest px-4 py-2 transition-colors cursor-pointer"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THERMAL HYDROTHERAPY SPA */}
      <section
        id="spa"
        className="py-24 bg-[#1C3326] text-[#FDFBF7] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3">
              Geothermal & Botanical Sanctuary
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight mb-4">
              The World-Class Thermal Hydrotherapy Spa
            </h2>
            <p className="text-stone-300 font-light text-sm md:text-base leading-relaxed">
              Harnessing natural geothermal volcanic springs and estate-harvested
              botanicals. Designed for deep neurological restoration and
              cellular vitality.
            </p>
          </div>

          {/* Interactive Treatment Menu Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-[#C5A059]/30 pb-4">
            {[
              { id: "hydrotherapy", name: "Hydrotherapy Circuits" },
              { id: "massage", name: "Holistic Massages" },
              { id: "facials", name: "Botanical Facials" },
              { id: "ayurveda", name: "Ayurvedic Rituals" },
              { id: "sound", name: "Sound & Vibration" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSpaTab(tab.id)}
                className={`text-xs uppercase tracking-widest px-5 py-2.5 transition-all duration-300 border cursor-pointer ${
                  activeSpaTab === tab.id
                    ? "bg-[#C5A059] text-[#1E1D1B] border-[#C5A059] font-semibold"
                    : "text-stone-300 border-transparent hover:border-[#C5A059]/40"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Treatment Display List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPA_MENU_DATA[activeSpaTab].map((treatment, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#243F30] p-8 border border-[#C5A059]/20 hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 text-[#C5A059] text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {treatment.duration}
                    </span>
                    <span className="font-serif text-xl text-white">
                      {treatment.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-light text-white mb-3 group-hover:text-[#C5A059] transition-colors">
                    {treatment.title}
                  </h3>

                  <p className="text-stone-300 text-xs font-light leading-relaxed mb-6">
                    {treatment.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    showToast(
                      `Selected treatment: ${treatment.title}. Requesting spa concierge.`
                    );
                  }}
                  className="w-full bg-[#1C3326] border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#1E1D1B] text-xs uppercase tracking-widest py-3 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Book Treatment
                </button>
              </div>
            ))}
          </div>

          {/* Spa Stats Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-[#C5A059]/20 pt-12">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-[#C5A059]">
                <CountUp value="38°C" />
              </p>
              <p className="text-[10px] uppercase tracking-widest text-stone-300 mt-1">
                Natural Geothermal Springs
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-[#C5A059]">
                <CountUp value={12} />
              </p>
              <p className="text-[10px] uppercase tracking-widest text-stone-300 mt-1">
                Private Treatment Pavilions
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-[#C5A059]">
                <CountUp value="100%" />
              </p>
              <p className="text-[10px] uppercase tracking-widest text-stone-300 mt-1">
                Organic Estate Botanicals
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-[#C5A059]">
                <CountUp value={5} />
              </p>
              <p className="text-[10px] uppercase tracking-widest text-stone-300 mt-1">
                Mineral Hydrothermal Baths
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MULTI-DAY WELLNESS RETREATS */}
      <section id="retreats" className="py-24 max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
              Curated Immersion
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1E1D1B] dark:text-white leading-tight">
              Transformative Multi-Day Wellness Retreats
            </h2>
            <p className="text-stone-600 dark:text-stone-300 font-light text-sm md:text-base leading-relaxed">
              Guided by world-renowned naturopaths, sound healers, and
              mindfulness masters. Each journey includes luxury villa
              accommodation, daily organic nutrition, diagnostic
              bio-consultations, and unlimited hydrotherapy.
            </p>

            <div className="rounded-lg p-6 bg-[#F6F2EA] dark:bg-[#131c2e] border border-[#E6E0D6] dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                <span className="text-xs uppercase tracking-wider font-medium text-[#1E1D1B] dark:text-white">
                  Personalized Naturopath Consultation Included
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-light pl-8">
                Every journey begins with a complimentary cellular diagnostic
                assessment to customize your daily treatments and herbal
                nutrition.
              </p>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {[
              {
                title: "3-Day Geothermal Thermal Reset",
                subtitle: "Deep cellular detox & stress dissolution",
                days: "3 Days / 2 Nights",
                price: "$ 1,20,000 / person",
                details:
                  "Day 1: Arrival botanical welcome & diagnostic consultation. Day 2: Volcanic mud wrap, 90-min deep tissue massage, full thermal circuit. Day 3: Morning oceanfront yoga & sound bowl release.",
              },
              {
                title: "5-Day Mindful Ayurvedic & Sleep Awakening",
                subtitle: "Neurological alignment & circadian rhythm repair",
                days: "5 Days / 4 Nights",
                price: "$ 2,40,000 / person",
                details:
                  "Includes daily Shirodhara head massage, custom herbal elixirs, bedtime magnesium baths, guided evening yoga nidra, and tailored organic anti-inflammatory menu.",
              },
              {
                title: "7-Day Royal Botanical Rejuvenation",
                subtitle: "The ultimate luxury holistic body & mind overhaul",
                days: "7 Days / 6 Nights",
                price: "$ 3,90,000 / person",
                details:
                  "Complete immersion featuring personalized chef nutrition, daily private spa sessions, yacht excursion with breathwork master, 24k gold facials, and unlimited thermal springs.",
              },
            ].map((retreat, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border border-[#E6E0D6] dark:border-slate-800 bg-[#FDFBF7] dark:bg-[#131c2e] transition-all"
              >
                <button
                  onClick={() =>
                    setExpandedRetreat(expandedRetreat === idx ? -1 : idx)
                  }
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-[#F6F2EA] dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium block">
                      {retreat.days} • {retreat.price}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#1E1D1B] dark:text-white mt-1">
                      {retreat.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light">
                      {retreat.subtitle}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 transition-transform ${
                      expandedRetreat === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedRetreat === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#E6E0D6] dark:border-slate-800 bg-[#F6F2EA]/40 dark:bg-slate-900/40 text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed animate-fade-in">
                    <p className="mb-4">{retreat.details}</p>
                    <button
                      onClick={() => {
                        showToast(
                          `Inquiring for ${retreat.title}. Sanctuary Concierge will reach out shortly.`
                        );
                      }}
                      className="bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] hover:text-[#1E1D1B] text-[11px] uppercase tracking-widest px-5 py-2 transition-colors cursor-pointer"
                    >
                      Reserve Journey
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ORGANIC FARM-TO-TABLE GASTRONOMY */}
      <section
        id="dining"
        className="py-24 bg-[#F6F2EA] dark:bg-[#0c1322] border-y border-[#E6E0D6] dark:border-slate-800"
      >
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3">
              Culinary Sanctuary
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1E1D1B] dark:text-white">
              Organic Farm-To-Table Gastronomy
            </h2>
            <p className="text-stone-600 dark:text-stone-300 font-light text-sm md:text-base mt-4 leading-relaxed">
              Every dish is an homage to coastal land and sea, prepared using
              ingredients harvested daily from our private organic estate
              gardens and local artisanal fishing partners.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                id: "aethel",
                name: "Aethel",
                cuisine: "Michelin Botanical Fine Dining",
                hours: "7:00 PM – 11:00 PM",
                image:
                  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85",
                desc: "An elevated 9-course botanical tasting journey paired with rare biodynamic wines from volcanic soil vineyards.",
                menuHighlights: [
                  "Estate Truffle & Wild Mushroom Emulsion",
                  "Wild Sea Bass with Native Herbs",
                  "Organic Honey & Lavender Glass",
                ],
              },
              {
                id: "solstice",
                name: "Solstice Ocean Grill",
                cuisine: "Casual Cliffside Seafood & Flame Grill",
                hours: "12:00 PM – 10:00 PM",
                image:
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
                desc: "Open-air cliffside dining overlooking the Mediterranean waves. Freshly caught seafood roasted over olive wood fire.",
                menuHighlights: [
                  "Wood-Fired Amalfi Langoustines",
                  "Organic Heirloom Tomato Carpaccio",
                  "Artisanal Sourdough & Smoked Butter",
                ],
              },
              {
                id: "herbalist",
                name: "The Herbalist Lounge",
                cuisine: "Botanical Elixirs & Mixology Bar",
                hours: "11:00 AM – 1:00 AM",
                image:
                  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85",
                desc: "Crafted botanical cocktails infused with house-distilled tinctures, cold-pressed herbs, and organic elixirs.",
                menuHighlights: [
                  "Smoked Rosemary Negroni",
                  "Geothermal Tonic with Wild Mint",
                  "Adaptogenic Reishi & Cacao Elixir",
                ],
              },
            ].map((venue) => (
              <div
                key={venue.id}
                className="bg-[#FDFBF7] dark:bg-[#131c2e] rounded-lg border border-[#E6E0D6] dark:border-slate-800 overflow-hidden flex flex-col justify-between group shadow-xs transition-all"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <div className="absolute top-4 left-4 bg-[#1C3326] text-[#FDFBF7] text-[10px] uppercase tracking-widest px-3 py-1">
                      {venue.cuisine}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-3xl font-light text-[#1E1D1B] dark:text-white mb-2">
                      {venue.name}
                    </h3>
                    <p className="text-xs text-[#C5A059] font-medium uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {venue.hours}
                    </p>
                    <p className="text-stone-600 dark:text-stone-300 text-xs font-light leading-relaxed mb-6">
                      {venue.desc}
                    </p>

                    <div className="border-t border-[#E6E0D6] dark:border-slate-800 pt-4">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-2">
                        Signature Offerings
                      </span>
                      <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-300 font-light">
                        {venue.menuHighlights.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setSelectedDiningVenue(venue);
                    }}
                    className="w-full bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] hover:text-[#1E1D1B] transition-all duration-300 text-xs uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Utensils className="w-3.5 h-3.5" /> Reserve Table
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VISUAL ATMOSPHERE GALLERY */}
      <section id="gallery" className="py-24 max-w-[1600px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
            Visual Atmosphere
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1E1D1B] dark:text-white">
            Inside The Luxstay Estate
          </h2>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[#E6E0D6] dark:border-slate-800 pb-4">
          {[
            { id: "all", label: "All Sanctuary Views" },
            { id: "villas", label: "Villas & Architecture" },
            { id: "spa", label: "Thermal Spa & Hydro" },
            { id: "culinary", label: "Gastronomy" },
            { id: "nature", label: "Coastal Reserve" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setGalleryFilter(tab.id)}
              className={`text-xs uppercase tracking-widest px-4 py-2 transition-all cursor-pointer ${
                galleryFilter === tab.id
                  ? "bg-[#1C3326] text-[#FDFBF7] font-semibold"
                  : "text-stone-600 dark:text-stone-400 hover:text-[#1E1D1B] dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxImg(item)}
              className="relative h-64 overflow-hidden group cursor-pointer border border-[#E6E0D6] dark:border-slate-800 rounded-lg"
            >
              <img src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                  {item.category}
                </span>
                <p className="font-serif text-lg font-light">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PRESS RECOGNITION & TESTIMONIALS */}
      <section className="py-24 bg-[#1C3326] text-[#FDFBF7]">
        <div className="max-w-[1600px] mx-auto px-6">
          {/* Press Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-b border-[#C5A059]/30 pb-16">
            <div>
              <p className="font-serif italic text-xl md:text-2xl font-light text-stone-200 mb-4">
                "The most sublime thermal hydrotherapy refuge in Europe. Luxstay
                redefines modern architectural wellness."
              </p>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                — Vogue Living
              </span>
            </div>

            <div>
              <p className="font-serif italic text-xl md:text-2xl font-light text-stone-200 mb-4">
                "A rare masterclass in eco-luxury, private butler perfection,
                and farm-to-table culinary genius."
              </p>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                — Condé Nast Traveler
              </span>
            </div>

            <div>
              <p className="font-serif italic text-xl md:text-2xl font-light text-stone-200 mb-4">
                "An unforgettable sanctuary where every ocean breeze feels
                tailored specifically for your restoration."
              </p>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                — Luxury Travel Magazine
              </span>
            </div>
          </div>

          {/* Guest Reviews Cards */}
          <div className="mt-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block text-center mb-8">
              Verified Guest Stories
            </span>

            <ReviewsSlider
              items={GUEST_REVIEWS}
              theme="dark"
              spaceBetween={32}
              breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 } }}
              renderItem={(review) => (
                <div
                  className="h-full rounded-lg bg-[#243F30] p-8 border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-colors duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex gap-1 text-[#C5A059]">
                      {[...Array(review.rating)].map((_, r) => (
                        <Star key={r} className="w-4 h-4 fill-[#C5A059]" />
                      ))}
                    </div>
                    <p className="text-stone-300 text-sm font-light italic leading-relaxed">
                      "{review.quote}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#C5A059]/20 flex justify-between items-center gap-4 text-xs">
                    <span className="font-serif text-lg text-white">
                      {review.author}
                    </span>
                    <span className="text-stone-400 text-[10px] uppercase tracking-wider text-right">
                      {review.stay}
                    </span>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* 9. PRIVATE ESTATE ARRIVAL EXPERIENCE */}
      <section
        id="arrival"
        className="py-24 bg-[#F6F2EA] dark:bg-[#0c1322] border-y border-[#E6E0D6] dark:border-slate-800"
      >
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Guide Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
                Seamless Arrival
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1E1D1B] dark:text-white">
                Your Private Estate Arrival Experience
              </h2>
              <p className="text-stone-600 dark:text-stone-300 font-light text-sm md:text-base leading-relaxed">
                Located on a private cliffside peninsula. We offer bespoke
                private transfer solutions to guarantee complete privacy from the
                moment you step off your aircraft or vessel.
              </p>

              {/* Arrival Mode Tabs */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    id: "helicopter",
                    label: "Private Helipad Direct Escort",
                    desc: "12-minute private flight from Naples or Rome International Airport directly to the Luxstay Cliff Helipad.",
                  },
                  {
                    id: "yacht",
                    label: "Riva Yacht Sea Transfer",
                    desc: "Private luxury Riva boat transfer from Sorrento or Capri harbor directly to our private lagoon pier.",
                  },
                  {
                    id: "escort",
                    label: "Chauffeur Executive Sedan",
                    desc: "Custom Mercedes Maybach escort with complimentary cold-pressed botanicals and Wi-Fi.",
                  },
                ].map((mode) => (
                  <div
                    key={mode.id}
                    onClick={() => setArrivalTab(mode.id)}
                    className={`p-4 border cursor-pointer transition-all ${
                      arrivalTab === mode.id
                        ? "bg-[#FDFBF7] dark:bg-[#131c2e] border-[#C5A059] shadow-md"
                        : "bg-transparent border-[#E6E0D6] dark:border-slate-800 hover:border-stone-400"
                    }`}
                  >
                    <h3 className="font-serif text-xl text-[#1E1D1B] dark:text-white font-light">
                      {mode.label}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-light mt-1">
                      {mode.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Visual */}
            <div className="rounded-lg lg:col-span-7 bg-[#1C3326] p-8 text-[#FDFBF7] border border-[#C5A059]/40 relative min-h-[420px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-4 mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium flex items-center gap-2">
                    <Navigation className="w-4 h-4" /> Luxstay Amalfi Coast Estate Map
                  </span>
                  <span className="text-xs text-stone-300">
                    40.6281° N, 14.3758° E
                  </span>
                </div>

                <p className="font-serif text-2xl font-light text-white mb-2">
                  Interactive Estate Zones
                </p>
                <p className="text-xs text-stone-300 font-light max-w-lg mb-6">
                  50-Acre Sanctuary including private botanical gardens, 5
                  thermal hydro springs, 3 dining pavilions, and private beach
                  cove.
                </p>

                {/* Key Points */}
                <div className="grid grid-cols-2 gap-4 text-xs text-stone-300">
                  <div className="rounded-lg bg-[#243F30] p-3 border border-[#C5A059]/20">
                    <span className="text-[#C5A059] font-medium block uppercase tracking-wider text-[10px]">
                      Zone A
                    </span>
                    <span>Cliffside Infinity Villas & Spa</span>
                  </div>
                  <div className="rounded-lg bg-[#243F30] p-3 border border-[#C5A059]/20">
                    <span className="text-[#C5A059] font-medium block uppercase tracking-wider text-[10px]">
                      Zone B
                    </span>
                    <span>Geothermal Thermal Springs & Vapor Caves</span>
                  </div>
                  <div className="rounded-lg bg-[#243F30] p-3 border border-[#C5A059]/20">
                    <span className="text-[#C5A059] font-medium block uppercase tracking-wider text-[10px]">
                      Zone C
                    </span>
                    <span>Aethel Fine Dining & Organic Herb Gardens</span>
                  </div>
                  <div className="rounded-lg bg-[#243F30] p-3 border border-[#C5A059]/20">
                    <span className="text-[#C5A059] font-medium block uppercase tracking-wider text-[10px]">
                      Zone D
                    </span>
                    <span>Private Lagoon Pier & Riva Yacht Deck</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#C5A059]/30 flex justify-between items-center text-xs">
                <span className="text-stone-400">
                  Concierge Desk Available 24/7
                </span>
                <button
                  onClick={() =>
                    showToast(
                      "Requesting high-resolution PDF Estate map sent to your email."
                    )
                  }
                  className="text-[#C5A059] hover:underline flex items-center gap-1 uppercase tracking-widest text-[10px] cursor-pointer"
                >
                  Download Estate Map PDF <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LUXSTAY CIRCLE VIP NEWSLETTER */}
      <section className="py-20 bg-[#FDFBF7] dark:bg-[#080D1A] border-b border-[#E6E0D6] dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
            Private Membership Invitation
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1E1D1B] dark:text-white">
            Join The Luxstay Circle
          </h2>
          <p className="text-stone-600 dark:text-stone-300 font-light text-sm max-w-xl mx-auto leading-relaxed">
            Receive private seasonal retreat invitations, chef tasting menus,
            and early access to our limited villa releases.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast(
                "Thank you for joining The Luxstay Circle. Welcome email dispatched."
              );
            }}
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 pt-4"
          >
            <input
              type="email"
              required
              placeholder="Enter your personal email address..."
              className="bg-[#F6F2EA] dark:bg-[#131c2e] text-xs px-4 py-3.5 border border-[#E6E0D6] dark:border-slate-700 text-[#1E1D1B] dark:text-white focus:outline-hidden focus:border-[#C5A059] flex-1"
            />
            <button
              type="submit"
              className="bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] hover:text-[#1E1D1B] text-xs font-medium uppercase tracking-widest px-8 py-3.5 transition-colors duration-300 cursor-pointer shadow-sm"
            >
              Subscribe
            </button>
          </form>

          <p className="text-[10px] text-stone-400 uppercase tracking-widest pt-2">
            We respect your inbox privacy • Unsubscribe anytime
          </p>
        </div>
      </section>

      {/* 11. QUICK VIEW VILLA MODAL */}
      {selectedVilla && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-lg bg-[#FDFBF7] dark:bg-[#131c2e] text-[#1E1D1B] dark:text-white max-w-3xl w-full border border-[#E6E0D6] dark:border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setSelectedVilla(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#1C3326] text-white hover:bg-[#C5A059] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedVilla.image}
                alt={selectedVilla.name}
                className="w-full h-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              <span className="absolute bottom-4 left-4 bg-[#1C3326] text-[#FDFBF7] text-[10px] uppercase tracking-widest px-3 py-1">
                {selectedVilla.tag}
              </span>
            </div>

            {/* Modal Specs */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                  {selectedVilla.type}
                </span>
                <h3 className="font-serif text-3xl font-light text-[#1E1D1B] dark:text-white mt-1 mb-2">
                  {selectedVilla.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed mb-6">
                  {selectedVilla.description}
                </p>

                <div className="space-y-2 border-t border-[#E6E0D6] dark:border-slate-800 pt-4 mb-6 text-xs text-stone-600 dark:text-stone-300">
                  <p>
                    <strong>Size:</strong> {selectedVilla.sqft}
                  </p>
                  <p>
                    <strong>Occupancy:</strong> {selectedVilla.guests}
                  </p>
                  <p>
                    <strong>Bedding:</strong> {selectedVilla.bed}
                  </p>
                  <p>
                    <strong>Pool:</strong> {selectedVilla.pool}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">
                    Villa Features
                  </span>
                  <ul className="grid grid-cols-1 gap-1 text-xs text-stone-600 dark:text-stone-300">
                    {selectedVilla.features.map((feat, f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#C5A059]" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E6E0D6] dark:border-slate-800 flex justify-between items-center mt-6">
                <div>
                  <span className="font-serif text-2xl font-light text-[#1C3326] dark:text-[#C5A059]">
                    ${selectedVilla.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-500"> / night</span>
                </div>
                <button
                  onClick={() => {
                    setBookingDetails({
                      ...bookingDetails,
                      accommodation: selectedVilla.name,
                    });
                    setSelectedVilla(null);
                    setIsBookingOpen(true);
                  }}
                  className="bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] text-xs uppercase tracking-widest px-6 py-3 transition-colors cursor-pointer"
                >
                  Book Villa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. DINING TABLE RESERVATION MODAL */}
      {selectedDiningVenue && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-lg bg-[#FDFBF7] dark:bg-[#131c2e] text-[#1E1D1B] dark:text-white max-w-lg w-full border border-[#E6E0D6] dark:border-slate-800 p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedDiningVenue(null)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-[#1E1D1B] dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium block">
              Table Reservation
            </span>
            <h3 className="font-serif text-3xl font-light text-[#1E1D1B] dark:text-white mt-1 mb-2">
              {selectedDiningVenue.name}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 font-light mb-6">
              {selectedDiningVenue.cuisine} • {selectedDiningVenue.hours}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!diningReservationDate) {
                  showToast("Please select a reservation date.");
                  return;
                }
                setSelectedDiningVenue(null);
                showToast(
                  `Table reserved at ${selectedDiningVenue.name}. Dining Concierge confirmation sent.`
                );
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <DatePicker
                  label="Reservation Date"
                  labelClassName="block text-[10px] uppercase tracking-widest text-stone-500 mb-1"
                  buttonClassName="w-full bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 p-3 text-[#1E1D1B] dark:text-white focus:outline-hidden cursor-pointer hover:border-[#C5A059]"
                  placeholder="Select Reservation Date"
                  required
                  value={diningReservationDate}
                  onChange={(e) => setDiningReservationDate(e.target.value)}
                  minDate={new Date()}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                  Preferred Time *
                </label>
                <select required defaultValue="" className="w-full bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 p-3 text-[#1E1D1B] dark:text-white focus:outline-hidden cursor-pointer">
                  <option value="" disabled>Select Preferred Time</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                  Number of Guests *
                </label>
                <select required defaultValue="" className="w-full bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 p-3 text-[#1E1D1B] dark:text-white focus:outline-hidden cursor-pointer">
                  <option value="" disabled>Select Number of Guests</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="6+ Guests Private Dining">6+ Guests Private Dining</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] uppercase tracking-widest text-xs py-3.5 transition-colors mt-4 cursor-pointer font-medium"
              >
                Confirm Dining Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 13. FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {activeLightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full text-center">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#C5A059] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <img src={activeLightboxImg.img}
              alt={activeLightboxImg.title}
              className="rounded-lg max-h-[80vh] mx-auto border border-[#C5A059]/40 object-contain" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />

            <div className="mt-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                {activeLightboxImg.category}
              </span>
              <p className="font-serif text-2xl font-light mt-1">
                {activeLightboxImg.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 14. BESPOKE RESERVATION DRAWER */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FDFBF7] dark:bg-[#131c2e] text-[#1E1D1B] dark:text-white w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E6E0D6] dark:border-slate-800">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[#E6E0D6] dark:border-slate-800 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                    Bespoke Reservation
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1E1D1B] dark:text-white">
                    Book Sanctuary Stay
                  </h3>
                </div>
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="p-2 text-stone-500 hover:text-[#1E1D1B] dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
                    showToast("Please select check-in and check-out dates.");
                    return;
                  }
                  if (!bookingDetails.guests) {
                    showToast("Please select the number of guests.");
                    return;
                  }
                  if (!bookingDetails.accommodation) {
                    showToast("Please select a sanctuary or villa.");
                    return;
                  }
                  setIsBookingOpen(false);
                  showToast(
                    `Reservation request received for ${bookingDetails.accommodation}. Confirmation sent to your concierge account.`
                  );
                }}
                className="space-y-4 text-xs"
              >
                <DateRangePicker
                  labelClassName="block text-[10px] uppercase tracking-widest text-stone-500 mb-1"
                  buttonClassName="w-full bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 p-3 text-[#1E1D1B] dark:text-white focus:outline-hidden cursor-pointer hover:border-[#C5A059]"
                  startDate={bookingDetails.checkIn}
                  endDate={bookingDetails.checkOut}
                  onStartDateChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      checkIn: e.target.value,
                    })
                  }
                  onEndDateChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      checkOut: e.target.value,
                    })
                  }
                  required
                />

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Guests
                  </label>
                  <select
                    value={bookingDetails.guests}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        guests: e.target.value,
                      })
                    }
                    className="w-full bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 p-3 text-[#1E1D1B] dark:text-white focus:outline-hidden cursor-pointer"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4+ Adults Private Wing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Selected Villa or Suite
                  </label>
                  <select
                    value={bookingDetails.accommodation}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        accommodation: e.target.value,
                      })
                    }
                    className="w-full bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 p-3 text-[#1E1D1B] dark:text-white focus:outline-hidden cursor-pointer"
                  >
                    {VILLAS_DATA.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} (${v.price.toLocaleString()}/night)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Complimentary Add-On Experience
                  </label>
                  <select
                    value={bookingDetails.spaPackage}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        spaPackage: e.target.value,
                      })
                    }
                    className="w-full bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 p-3 text-[#1E1D1B] dark:text-white focus:outline-hidden cursor-pointer"
                  >
                    <option>$15,000 Geothermal Spa Credit (Included)</option>
                    <option>Complimentary Helicopter Transfer Upgrade</option>
                    <option>Private Chef Wine Pairing Tasting Dinner</option>
                  </select>
                </div>

                <div className="rounded-lg p-4 bg-[#F6F2EA] dark:bg-slate-900 border border-[#E6E0D6] dark:border-slate-700 space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Estimated Total</span>
                    <span className="font-serif text-xl text-[#1C3326] dark:text-[#C5A059]">
                      $ 1,85,000
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Includes taxes, personal butler service, hydrotherapy &
                    daily organic breakfast.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1C3326] hover:bg-[#C5A059] text-[#FDFBF7] hover:text-[#1E1D1B] uppercase tracking-widest text-xs py-4 transition-colors font-medium mt-4 shadow-lg cursor-pointer"
                >
                  Complete Reservation Request
                </button>
              </form>
            </div>

            <div className="pt-6 border-t border-[#E6E0D6] dark:border-slate-800 text-center text-[10px] text-stone-500 uppercase tracking-widest">
              Direct Booking Guarantee • Best Rates & Benefits Included
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
