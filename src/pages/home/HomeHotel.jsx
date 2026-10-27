import { useState, useEffect } from "react";
import {
  LuCalendar as Calendar,
  LuUsers as Users,
  LuChevronRight as ChevronRight,
  LuChevronLeft as ChevronLeft,
  LuStar as Star,
  LuX as X,
  LuSearch as Search,
  LuCheck as Check,
  LuClock as Clock,
  LuCompass as Compass,
  LuSparkles as Sparkles,
  LuEye as Eye,
  LuArrowRight as ArrowRight,
  LuBed as Bed,
  LuMaximize2 as Maximize2,
  LuWaves as Waves,
  LuUtensils as Utensils,
  LuPlay as Play,
  LuPause as Pause,
  LuCircleCheck as CheckCircle2,
  LuSparkle as Sparkle
} from "react-icons/lu";
import ReviewsSlider from "../../components/common/ReviewsSlider";
import CountUp from "../../components/common/CountUp";
import DatePicker, { formatToISODate } from "../../components/common/DatePicker";
import DateRangePicker from "../../components/common/DateRangePicker";
import { toast } from "../../hooks/useToast";

const HERO_SLIDES = [
  {
    id: 1,
    title: "A Sanctuary of Unrivaled Tranquility",
    subtitle: "PERCHED ON THE CLIFFS OF AMALFI",
    location: "Amalfi Coast, Italy",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85",
    badge: "WORLD'S LEADING HOTEL 2026",
  },
  {
    id: 2,
    title: "Bespoke Oceanfront Sanctuary Suites",
    subtitle: "PRIVATE INFINITY POOLS & PERSONAL BUTLER SERVICE",
    location: "Cliffside Amalfi Suite Deck",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85",
    badge: "3-MICHELIN STAR GASTRONOMY",
  },
  {
    id: 3,
    title: "Haute Cuisine & Panoramic Sunsets",
    subtitle: "CURATED BY WORLD-RENOWNED EXECUTIVE CHEFS",
    location: "L'Étoile Terrace Bar",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85",
    badge: "HOLISTIC THERMAL SPA & WELLNESS",
  },
];

const SUITES_DATA = [
  {
    id: "suite-1",
    title: "The Royal Amalfi Terrace Villa",
    category: "villa",
    categoryLabel: "Private Pool Villa",
    price: 34500,
    sqm: 240,
    sqft: 2580,
    guests: "4 Guests",
    beds: "2 King Beds",
    view: "Panoramic Mediterranean Sea",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Private Plunge Pool",
      "24/7 Dedicated Butler",
      "Oceanfront Terrace",
      "Marble Spa Bath",
      "Bang & Olufsen Audio",
    ],
    description:
      "Occupying the top tier of our cliffside retreat, the Royal Amalfi Terrace Villa provides total seclusion with an expansive outdoor deck, private heated plunge pool, and dedicated butler service.",
  },
  {
    id: "suite-2",
    title: "Signature Horizon Ocean Suite",
    category: "ocean",
    categoryLabel: "Ocean Suite",
    price: 19500,
    sqm: 130,
    sqft: 1400,
    guests: "2 Guests",
    beds: "1 Grand Emperor Bed",
    view: "Direct Cliffside Ocean View",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Private Ocean Balcony",
      "Personal Butler",
      "Freestanding Soaking Tub",
      "Dyson Supersonic Care",
    ],
    description:
      "Framed by floor-to-ceiling glass doors opening onto a private marble loggia overlooking the Azure coastline. Styled with bespoke Italian linen and handcrafted walnut millwork.",
  },
  {
    id: "suite-3",
    title: "The Penthouse Belmond Suite",
    category: "penthouse",
    categoryLabel: "Penthouse Suite",
    price: 48000,
    sqm: 310,
    sqft: 3330,
    guests: "6 Guests",
    beds: "3 Master Suites",
    view: "360° Coast & Old Town View",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Rooftop Private Jacuzzi",
      "Private Elevator Access",
      "Chef's Preparation Kitchen",
      "24/7 Sommelier Service",
    ],
    description:
      "The pinnacle of Mediterranean luxury. Features three ensuite king bedrooms, an expansive wrap-around dining terrace, private infinity jacuzzi, and direct VIP elevator entry.",
  },
  {
    id: "suite-4",
    title: "Garden Sanctuary Courtyard Suite",
    category: "ocean",
    categoryLabel: "Sanctuary Suite",
    price: 14000,
    sqm: 110,
    sqft: 1180,
    guests: "2 Guests",
    beds: "1 Super King Bed",
    view: "Botanical Garden & Cove",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Private Citrus Grove Patio",
      "Outdoor Rainforest Shower",
      "Aromatherapy Bar",
    ],
    description:
      "Surrounded by lemon groves and scented jasmine, this suite offers absolute quiet, private daybeds, and effortless access to our thermal wellness spa.",
  },
];

const FACILITIES_DATA = [
  {
    icon: Sparkles,
    title: "Thermal Spa & Ayurvedic Center",
    tag: "WELLNESS & SPA",
    desc: "1,800m² subterranean sanctuary featuring seawater hydrotherapy, Roman baths, and personalized holistic therapies.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    stat: "12 Treatment Rooms",
  },
  {
    icon: Utensils,
    title: "Michelin-Starred 'L'Étoile'",
    tag: "HAUTE CUISINE",
    desc: "Led by 3-Michelin Star Chef Marcella Vane, celebrating regional seafood paired with world-class vintage vintages.",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    stat: "3 Michelin Stars",
  },
  {
    icon: Waves,
    title: "Cliffside Heated Infinity Pool",
    tag: "RECREATION",
    desc: "Cascading 40-meter saltwater infinity edge suspended 150 meters above the Tyrrhenian Sea with private cabanas.",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    stat: "28°C Year-round",
  },
  {
    icon: Compass,
    title: "Riva Yacht & Helipad Charters",
    tag: "EXCURSIONS",
    desc: "Direct access to our custom 48ft Riva yacht for private Capri sunset cruises and rooftop helipad transfers.",
    image:
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800&q=80",
    stat: "Private Fleet",
  },
];

const EXPERIENCES_DATA = [
  {
    id: "exp-1",
    cat: "culinary",
    title: "Sunset Wine Tasting in Coastal Cellars",
    duration: "3 Hours",
    price: "₹ 18,500 per guest",
    desc: "Guided tasting of rare Italian vintages led by Master Sommelier Giovanni Rossi in our 400-year-old subterranean stone cellar.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Sampling of 6 Grand Cru Vintages",
      "Artisanal Amalfi Cheese Pairings",
      "Private Cellar Tour",
    ],
  },
  {
    id: "exp-2",
    cat: "wellness",
    title: "Sunrise Ocean Yoga & Sound Bath Ritual",
    duration: "2 Hours",
    price: "₹ 12,000 per guest",
    desc: "Realign body and mind atop our cliffside pavilion listening to waves below, followed by Tibetan singing bowl therapy.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Private Yoga Master",
      "Freshly Pressed Herbal Elixirs",
      "Aromatherapy Oil Kit",
    ],
  },
  {
    id: "exp-3",
    cat: "charter",
    title: "Private Capri & Blue Grotto Yacht Voyage",
    duration: "Full Day (7 Hours)",
    price: "₹ 1,50,000 charter",
    desc: "Set sail aboard our custom Riva boat with a dedicated skipper and personal butler. Includes champagne lunch in a hidden cove.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Exclusive Capri Anchorages",
      "Dom Pérignon Welcome Champagne",
      "Gourmet Picnic Onboard",
    ],
  },
];

const OFFERS_DATA = [
  {
    id: "offer-1",
    tag: "ROMANCE EDITION",
    title: "Amalfi Romance & Sunset Serenade",
    subtitle: "STAY 3 NIGHTS, RECEIVE COMPLIMENTARY YACHT CRUISE",
    price: "₹ 1,95,000",
    value: "Includes ₹ 45,000 in Perks",
    validity: "Valid through Nov 2026",
    inclusions: [
      "Daily gourmet champagne breakfast on private suite terrace",
      "Complimentary 2-hour sunset Riva yacht cruise for two",
      "Couple's 90-min Thermal Spa treatment",
      "Private candlelit dinner at L'Étoile Chef's Table",
    ],
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "offer-2",
    tag: "EPICUREAN RETREAT",
    title: "Michelin Star Culinary Journey",
    subtitle: "A 4-NIGHT IMMERSION IN MEDITERRANEAN FLAVORS",
    price: "₹ 2,45,000",
    value: "Curated Gastronomy",
    validity: "All Season",
    inclusions: [
      "7-Course Michelin Tasting Menu with Reserve Wine Pairing",
      "Private cooking masterclass with Chef Marcella Vane",
      "Helicopter transfer from Naples or Rome airport",
      "Complimentary upgrade to Ocean Suite (subject to availability)",
    ],
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
  },
];

const MENU_ITEMS = {
  tasting: [
    {
      name: "Raw Scallop & White Truffle",
      desc: "Wild Capresian scallops, pressed citrus blossom oil, shaved Piedmont white truffle",
      price: "₹ 5,800",
    },
    {
      name: "Handcrafted Tagliolini al Limone",
      desc: "Aged 36-month Parmigiano Reggiano, organic Amalfi lemons, Oscietra caviar",
      price: "₹ 6,900",
    },
    {
      name: "Mediterranean Sea Bass in Salt Crust",
      desc: "Wild-caught line bass, braised fennel bulb, saffron fumet",
      price: "₹ 8,500",
    },
    {
      name: "Wagyu A5 Rossini",
      desc: "Miyazaki A5 Wagyu fillet, pan-seared foie gras, Madeira jus",
      price: "₹ 12,500",
    },
  ],
  wine: [
    {
      name: "Solaia Tenuta San Guido 2018",
      desc: "Tuscany, Italy - Deep ruby, complex dark fruits and cedar notes",
      price: "₹ 55,000 / bottle",
    },
    {
      name: "Dom Pérignon P2 Vintage 2004",
      desc: "Champagne, France - Remarkable energy, toasted brioche and ripe citrus",
      price: "₹ 75,000 / bottle",
    },
    {
      name: "Barolo Monfortino Riserva 2013",
      desc: "Piemonte, Italy - World-famous structure, rose petal, liquorice",
      price: "₹ 1,05,000 / bottle",
    },
  ],
};

const GALLERY_IMAGES = [
  {
    id: 1,
    cat: "architecture",
    title: "Cliffside Terrace Architecture",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    cat: "suites",
    title: "Royal Villa Private Pool",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    cat: "gastronomy",
    title: "Michelin Plating Precision",
    url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    cat: "wellness",
    title: "Hydrotherapy Thermal Spa Pool",
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    cat: "surroundings",
    title: "Sunset over Amalfi Coastline",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    cat: "suites",
    title: "Emperor Suite Bedroom",
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
  },
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Lord Harrison Sterling",
    origin: "London, UK",
    suite: "Royal Amalfi Terrace Villa",
    stars: 5,
    date: "Stayed September 2026",
    quote:
      "LUXSTAY sets an entirely new benchmark for discretion and understated opulence. The private butler service was intuitive without being intrusive, and watching the sunset from our villa pool was unforgettable.",
  },
  {
    id: 2,
    name: "Elena Rostova",
    origin: "Zurich, Switzerland",
    suite: "Penthouse Belmond Suite",
    stars: 5,
    date: "Stayed August 2026",
    quote:
      "Having stayed at Aman and Belmond properties globally, LUXSTAY effortlessly rivals the finest boutique sanctuaries on earth. The dining at L'Étoile is pure culinary poetry.",
  },
  {
    id: 3,
    name: "Alessandro & Giulia Conti",
    origin: "Milan, Italy",
    suite: "Positano Cliffside Suite",
    stars: 5,
    date: "Stayed July 2026",
    quote:
      "Our honeymoon could not have been more perfect. Private boat excursions along the coast, candlelit terrace dinners and a team that remembered every little detail.",
  },
  {
    id: 4,
    name: "Victoria Ashford",
    origin: "New York, USA",
    suite: "Grand Heritage Suite",
    stars: 5,
    date: "Stayed June 2026",
    quote:
      "The spa is a sanctuary unto itself. Between the thermal pools, the lemon-grove massages and the breathtaking sea views, I left feeling entirely renewed.",
  },
  {
    id: 5,
    name: "Rajiv & Ananya Malhotra",
    origin: "Mumbai, India",
    suite: "Presidential Sea-View Villa",
    stars: 5,
    date: "Stayed May 2026",
    quote:
      "Impeccable from arrival to departure. The chef tailored every meal to our family's preferences, and the children still talk about the private cooking class.",
  },
];

/* -------------------------------------------------------------------------- */
/* 1. CINEMATIC HERO SECTION                                                  */
/* -------------------------------------------------------------------------- */
function CinematicHero({ onSearchAvailability }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Booking Widget Inputs State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [suiteCategory, setSuiteCategory] = useState("");
  const [promo] = useState("");

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-12 bg-[#1C1B18] text-white">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-10000 ease-linear scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1C1B18] via-[#1C1B18]/40 to-black/60" />
          </div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 pt-12 md:pt-20 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-medium">
            <Sparkle className="w-3.5 h-3.5" />
            <span>{slide.badge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-none tracking-tight text-white drop-shadow-md">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 font-light tracking-wider uppercase font-sans pt-2">
            — {slide.subtitle}
          </p>

          <div className="pt-4 flex items-center space-x-4">
            <a
              href="#suites"
              className="inline-flex items-center px-7 py-3.5 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300"
            >
              Explore Accommodations
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a
              href="#story"
              className="hidden sm:inline-flex items-center px-6 py-3.5 bg-black/40 hover:bg-black/70 border border-white/30 text-white text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-sm transition-all"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls & Indicator */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 w-full py-4 flex items-center justify-between text-xs text-gray-300">
        <div className="flex items-center space-x-3">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? "w-10 bg-[#C5A059]"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-3 p-1 hover:text-[#C5A059] text-white/80 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-serif text-sm">
            0{currentSlide + 1} / 0{HERO_SLIDES.length}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
                )
              }
              className="p-2 bg-black/40 hover:bg-[#C5A059] hover:text-black border border-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
              }
              className="p-2 bg-black/40 hover:bg-[#C5A059] hover:text-black border border-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Integrated Booking Widget */}
      <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-8 w-full mt-6">
        <div className="bg-[#1C1B18]/95 backdrop-blur-xl border border-[#C5A059]/30 p-4 sm:p-6 shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!checkIn) {
                toast.warning("Please select a check-in date.");
                return;
              }
              if (!checkOut) {
                toast.warning("Please select a check-out date.");
                return;
              }
              if (!guests) {
                toast.warning("Please select the number of guests.");
                return;
              }
              if (!suiteCategory) {
                toast.warning("Please select a suite type.");
                return;
              }
              onSearchAvailability({
                checkIn,
                checkOut,
                guests,
                suiteCategory,
                promo,
              });
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            {/* 1. Check-In with react-calendar */}
            <div className="space-y-1">
              <DatePicker
                label={
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-[#C5A059]" />
                    Check-In <span className="text-[#C5A059] ml-0.5">*</span>
                  </span>
                }
                labelClassName="text-[10px] tracking-widest text-[#C5A059] uppercase font-semibold flex items-center"
                buttonClassName="w-full bg-[#2A2824] border border-[#E6E0D6]/20 text-white text-xs px-3 py-2.5 focus:outline-hidden focus:border-[#C5A059] cursor-pointer hover:border-[#C5A059]/60 transition-colors"
                hideIcon
                chevronClassName="text-stone-400 w-3.5 h-3.5"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            {/* 2. Check-Out with react-calendar */}
            <div className="space-y-1">
              <DatePicker
                label={
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-[#C5A059]" />
                    Check-Out <span className="text-[#C5A059] ml-0.5">*</span>
                  </span>
                }
                labelClassName="text-[10px] tracking-widest text-[#C5A059] uppercase font-semibold flex items-center"
                buttonClassName="w-full bg-[#2A2824] border border-[#E6E0D6]/20 text-white text-xs px-3 py-2.5 focus:outline-hidden focus:border-[#C5A059] cursor-pointer hover:border-[#C5A059]/60 transition-colors"
                hideIcon
                chevronClassName="text-stone-400 w-3.5 h-3.5"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                minDate={checkIn}
                required
              />
            </div>

            {/* Guests */}
            <div className="space-y-1">
              <label className="text-[10px] tracking-widest text-[#C5A059] uppercase font-semibold flex items-center">
                <Users className="w-3 h-3 mr-1" />
                Guests & Occupancy <span className="text-[#C5A059] ml-0.5">*</span>
              </label>
              <select
                required
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-[#2A2824] border border-[#E6E0D6]/20 text-white text-xs px-3 py-2.5 focus:outline-hidden focus:border-[#C5A059] cursor-pointer"
              >
                <option value="" disabled hidden>Select Guests</option>
                <option value="1 Adult">1 Adult (Solo Retreat)</option>
                <option value="2 Adults, 0 Children">2 Adults (Couple)</option>
                <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                <option value="4 Adults (Villa)">4 Adults (Private Villa)</option>
              </select>
            </div>

            {/* Suite Category */}
            <div className="space-y-1">
              <label className="text-[10px] tracking-widest text-[#C5A059] uppercase font-semibold flex items-center">
                <Bed className="w-3 h-3 mr-1" />
                Suite Type <span className="text-[#C5A059] ml-0.5">*</span>
              </label>
              <select
                required
                value={suiteCategory}
                onChange={(e) => setSuiteCategory(e.target.value)}
                className="w-full bg-[#2A2824] border border-[#E6E0D6]/20 text-white text-xs px-3 py-2.5 focus:outline-hidden focus:border-[#C5A059] cursor-pointer"
              >
                <option value="" disabled hidden>Select Suite Tier</option>
                <option value="all">All Suites & Villas</option>
                <option value="ocean">Signature Ocean Suites</option>
                <option value="villa">Private Pool Villas</option>
                <option value="penthouse">Royal Penthouse</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. EDITORIAL STORY SECTION                                                 */
/* -------------------------------------------------------------------------- */
function EditorialStory() {
  return (
    <section id="story" className="py-24 bg-[#FDFBF7] dark:bg-[#0c1322] text-[#1C1B18] dark:text-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase">
                THE ART OF LUXSTAY LIVING
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight text-[#1C1B18] dark:text-white">
                Where Timeless Italian Elegance Meets Mediterranean Quietude
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              Founded in 1928 as a private coastal haven for European aristocracy,
              LUXSTAY has been meticulously preserved and elevated into a 5-star
              sanctuary. Carved into the sheer limestone cliffs above Amalfi,
              every suite offers uninterrupted vistas of the Mediterranean
              horizon.
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              We operate on a philosophy of discrete hospitality—where every
              guest's preference is anticipated before it is spoken. From custom
              botanical bath rituals to private yacht transfers, living at LUXSTAY
              is an unforgettable masterpiece.
            </p>

            {/* General Manager Quote & Signature Box */}
            <div className="pt-4 border-t border-[#E6E0D6] dark:border-slate-800 flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="General Manager"
                className="w-14 h-14 object-cover rounded-full border border-[#C5A059]"
              />
              <div>
                <p className="font-serif italic text-lg text-stone-800 dark:text-stone-200">
                  "True luxury is not defined by excess, but by seamless
                  serenity and flawless detail."
                </p>
                <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium pt-1">
                  Countess Eleanor Vance — General Manager
                </p>
              </div>
            </div>
          </div>

          {/* Overlapping Editorial Imagery Right Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 overflow-hidden shadow-xl border border-[#E6E0D6] dark:border-slate-800 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80"
                alt="Hotel Gardens"
                className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Overlapping smaller framed photo */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 z-20 w-3/5 overflow-hidden shadow-2xl border-4 border-[#FDFBF7] dark:border-slate-900 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80"
                alt="Butler Service"
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Gold Badge */}
            <div className="absolute top-6 right-6 z-20 bg-[#1C1B18] text-[#C5A059] border border-[#C5A059]/40 p-4 shadow-lg text-center hidden sm:block">
              <span className="block font-serif text-2xl font-bold">
                <CountUp value="100%" />
              </span>
              <span className="text-[9px] uppercase tracking-widest text-stone-300">
                Private Cliff Estate
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Callout Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-6 bg-[#F4EFEA] dark:bg-[#131c2e] border border-[#E6E0D6] dark:border-slate-800">
          <div className="text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl text-[#C5A059]">
              <CountUp value={42} />
            </span>
            <p className="text-xs tracking-widest uppercase text-stone-600 dark:text-slate-400 font-medium">
              Bespoke Suites & Villas
            </p>
          </div>
          <div className="text-center space-y-1 border-l border-[#E6E0D6] dark:border-slate-800">
            <span className="font-serif text-3xl sm:text-4xl text-[#C5A059]">
              <CountUp end={3} suffix=" Michelin" />
            </span>
            <p className="text-xs tracking-widest uppercase text-stone-600 dark:text-slate-400 font-medium">
              Star Gastronomy
            </p>
          </div>
          <div className="text-center space-y-1 border-l border-[#E6E0D6] dark:border-slate-800">
            <span className="font-serif text-3xl sm:text-4xl text-[#C5A059]">
              <CountUp end={24} suffix="/7" />
            </span>
            <p className="text-xs tracking-widest uppercase text-stone-600 dark:text-slate-400 font-medium">
              Personal Butler Service
            </p>
          </div>
          <div className="text-center space-y-1 border-l border-[#E6E0D6] dark:border-slate-800">
            <span className="font-serif text-3xl sm:text-4xl text-[#C5A059]">
              <CountUp value="100%" />
            </span>
            <p className="text-xs tracking-widest uppercase text-stone-600 dark:text-slate-400 font-medium">
              Seawater Hydrothermal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. SUITES & RESIDENCES SHOWCASE                                            */
/* -------------------------------------------------------------------------- */
function SuitesShowcase({ onSelectSuiteQuickView, onBookSuite }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSuites = SUITES_DATA.filter(
    (s) => activeTab === "all" || s.category === activeTab
  );

  return (
    <section
      id="suites"
      className="py-24 bg-[#F4EFEA] dark:bg-[#080d1a] border-t border-b border-[#E6E0D6] dark:border-slate-800"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block mb-2">
              ACCOMMODATIONS & RESIDENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B18] dark:text-white font-light">
              Suites & Private Villas
            </h2>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#E6E0D6] dark:border-slate-800 pb-2">
            {[
              { id: "all", label: "All Suites" },
              { id: "ocean", label: "Ocean Suites" },
              { id: "villa", label: "Private Pool Villas" },
              { id: "penthouse", label: "Penthouse" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#C5A059] text-[#1C1B18] dark:text-[#C5A059]"
                    : "border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Suites Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              className="bg-[#FDFBF7] dark:bg-[#131c2e] border border-[#E6E0D6] dark:border-slate-800 overflow-hidden group shadow-xs transition-all duration-500 flex flex-col justify-between rounded-lg"
            >
              {/* Suite Image Thumbnail */}
              <div className="relative h-56 sm:h-60 overflow-hidden">
                <img
                  src={suite.image}
                  alt={suite.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3.5 left-3.5 bg-[#1C1B18]/85 backdrop-blur-md px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 rounded-md font-semibold">
                  {suite.categoryLabel}
                </div>

                <button
                  onClick={() => onSelectSuiteQuickView(suite)}
                  className="absolute bottom-3.5 right-3.5 bg-[#FDFBF7]/90 dark:bg-slate-900/90 hover:bg-[#C5A059] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-slate-950 text-[#1C1B18] dark:text-white p-2 transition-all shadow-md cursor-pointer rounded-full backdrop-blur-xs"
                  title="Quick View Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suite Info Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="mb-2">
                    <h3 className="font-serif text-lg font-medium text-[#1C1B18] dark:text-white group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-1 mb-1">
                      {suite.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                      {suite.view}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between mb-3 pb-2.5 border-b border-[#E6E0D6]/60 dark:border-slate-800">
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">Rate / Night</span>
                    <div className="text-right">
                      <span className="font-serif text-xl font-medium text-[#1C1B18] dark:text-[#C5A059]">
                        ₹{suite.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-3">
                    {suite.description}
                  </p>

                  {/* Suite Spec Icons Bar */}
                  <div className="grid grid-cols-3 gap-1 py-2 px-2 bg-[#F4EFEA] dark:bg-slate-900 text-[10px] text-stone-700 dark:text-stone-300 font-medium mb-3 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Maximize2 className="w-3 h-3 text-[#C5A059] shrink-0" />
                      <span className="truncate">{suite.sqm} m²</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 border-x border-stone-200 dark:border-slate-800">
                      <Users className="w-3 h-3 text-[#C5A059] shrink-0" />
                      <span className="truncate">{suite.guests}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Bed className="w-3 h-3 text-[#C5A059] shrink-0" />
                      <span className="truncate">{suite.beds}</span>
                    </div>
                  </div>

                  {/* Amenities Highlights Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    {suite.amenities.slice(0, 2).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] bg-stone-200/60 dark:bg-slate-800 text-stone-700 dark:text-slate-300 px-2 py-0.5 uppercase tracking-wider font-medium rounded-xs inline-flex items-center gap-1"
                      >
                        <Check className="h-2.5 w-2.5 text-stone-700 dark:text-slate-300" />
                        <span>{amenity}</span>
                      </span>
                    ))}
                    {suite.amenities.length > 2 && (
                      <span className="text-[9px] text-stone-500 dark:text-slate-400 px-1 py-0.5 font-medium">
                        +{suite.amenities.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action CTAs */}
                <div className="pt-3 border-t border-[#E6E0D6] dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => onSelectSuiteQuickView(suite)}
                    className="flex-1 py-2 px-2.5 border border-stone-300 dark:border-slate-700 hover:border-[#C5A059] dark:hover:border-[#C5A059] text-[10px] uppercase tracking-widest font-semibold text-stone-700 dark:text-stone-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all rounded-lg text-center cursor-pointer"
                  >
                    Specs
                  </button>

                  <button
                    onClick={() => onBookSuite(suite)}
                    className="flex-1 py-2 px-2.5 bg-[#1C1B18] dark:bg-[#C5A059] hover:bg-[#C5A059] hover:text-[#1C1B18] dark:text-slate-950 text-white text-[10px] uppercase tracking-widest transition-all duration-300 font-bold cursor-pointer rounded-lg shadow-xs hover:shadow-md text-center"
                  >
                    Book Suite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. BESPOKE FACILITIES SECTION                                              */
/* -------------------------------------------------------------------------- */
function BespokeFacilities() {
  return (
    <section id="amenities" className="py-24 bg-[#FDFBF7] dark:bg-[#0c1322] text-[#1C1B18] dark:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block">
            CURATED HAVENS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1B18] dark:text-white">
            World-Class Amenities & Private Facilities
          </h2>
          <div className="w-16 h-px bg-[#C5A059] mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FACILITIES_DATA.map((fac, i) => {
            const Icon = fac.icon;
            return (
              <div
                key={i}
                className="group bg-[#F4EFEA] dark:bg-[#131c2e] border border-[#E6E0D6] dark:border-slate-800 p-6 flex flex-col justify-between hover:border-[#C5A059] transition-all duration-300 rounded-lg"
              >
                <div>
                  <div className="h-48 mb-6 overflow-hidden relative rounded-lg">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-[#1C1B18] text-[#C5A059] text-[9px] uppercase tracking-widest px-2 py-1 font-medium">
                      {fac.stat}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[#C5A059] mb-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-semibold">
                      {fac.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1C1B18] dark:text-white mb-3 group-hover:text-[#C5A059] transition-colors">
                    {fac.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light mb-4">
                    {fac.desc}
                  </p>
                </div>

                <a
                  href="#suites"
                  className="text-xs uppercase tracking-widest font-semibold text-stone-800 dark:text-stone-200 hover:text-[#C5A059] flex items-center pt-2 border-t border-[#E6E0D6] dark:border-slate-800"
                >
                  Inquire Concierge
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. CURATED EXPERIENCES SECTION                                             */
/* -------------------------------------------------------------------------- */
function CuratedExperiences({ onRequestExperience }) {
  const [activeExp, setActiveExp] = useState("exp-1");
  const selectedExp = EXPERIENCES_DATA.find((e) => e.id === activeExp);

  return (
    <section id="experiences" className="py-24 bg-[#1C1B18] text-white relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block mb-2">
              BESPOKE ADVENTURES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              Curated Hotel Experiences
            </h2>
          </div>

          {/* Interactive Experience Selection Tabs */}
          <div className="flex flex-wrap gap-2">
            {EXPERIENCES_DATA.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveExp(exp.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 border cursor-pointer ${
                  activeExp === exp.id
                    ? "bg-[#C5A059] border-[#C5A059] text-[#1C1B18]"
                    : "bg-transparent border-stone-700 text-stone-300 hover:border-stone-500"
                }`}
              >
                {exp.title.split(" ")[0]} {exp.title.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Experience Detail Hero Card */}
        {selectedExp && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#2A2824] border border-[#C5A059]/30 p-6 sm:p-10 shadow-2xl items-center rounded-lg">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-4 text-xs text-[#C5A059] tracking-widest uppercase font-semibold">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {selectedExp.duration}
                </span>
                <span>•</span>
                <span>{selectedExp.price}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
                {selectedExp.title}
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {selectedExp.desc}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
                  Experience Inclusions:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedExp.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] mr-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onRequestExperience(selectedExp)}
                  className="px-7 py-3.5 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] text-xs font-semibold uppercase tracking-widest transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer shadow-md rounded-lg"
                >
                  <span>Request Custom Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-80 sm:h-96 border border-[#E6E0D6]/20 overflow-hidden rounded-lg">
              <img
                src={selectedExp.image}
                alt={selectedExp.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. SEASONAL OFFERS & PACKAGES                                              */
/* -------------------------------------------------------------------------- */
function SeasonalOffers({ onBookOffer }) {
  return (
    <section id="offers" className="py-24 bg-[#FDFBF7] dark:bg-[#0c1322] text-[#1C1B18] dark:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block">
            EXCLUSIVE RETREATS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1B18] dark:text-white">
            Seasonal Offers & Special Packages
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 font-light pt-2">
            Curated stays designed for romantic escapes, gastronomy enthusiasts, and extended coastal retreats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {OFFERS_DATA.map((offer) => (
            <div
              key={offer.id}
              className="bg-[#F4EFEA] dark:bg-[#131c2e] border border-[#E6E0D6] dark:border-slate-800 flex flex-col justify-between overflow-hidden group hover:border-[#C5A059] transition-all rounded-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#1C1B18] text-[#C5A059] text-[10px] uppercase tracking-widest px-3 py-1 border border-[#C5A059]/40 font-semibold">
                  {offer.tag}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900 text-stone-900 dark:text-white text-xs px-3 py-1 font-serif font-bold">
                  {offer.validity}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B18] dark:text-white mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-4">
                    {offer.subtitle}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                      Package Inclusions:
                    </p>
                    <ul className="space-y-1.5">
                      {offer.inclusions.map((inc, i) => (
                        <li key={i} className="text-xs text-stone-700 dark:text-stone-300 flex items-start">
                          <Check className="w-3.5 h-3.5 text-[#C5A059] mr-2 mt-0.5 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E0D6] dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block">
                      Starting From
                    </span>
                    <span className="font-serif text-2xl font-semibold text-[#1C1B18] dark:text-white">
                      {offer.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookOffer(offer)}
                    className="px-6 py-3 bg-[#1C1B18] dark:bg-[#C5A059] hover:bg-[#C5A059] hover:text-[#1C1B18] dark:text-slate-950 text-white text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer rounded-sm"
                  >
                    Reserve Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. MICHELIN GASTRONOMY SECTION                                             */
/* -------------------------------------------------------------------------- */
function GastronomySection({ onReserveTable }) {
  const [activeMenuTab, setActiveMenuTab] = useState("tasting");

  return (
    <section id="dining" className="py-24 bg-[#1C1B18] text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block">
              MICHELIN STAR GASTRONOMY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              L'Étoile & Aura Sunset Lounge
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Under the creative direction of Executive Chef Marcella Vane, our culinary venues combine locally caught Tyrrhenian seafood with wild Mediterranean botanicals and rare vintage cellars.
            </p>
            <div className="pt-2 flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs uppercase tracking-widest text-stone-400">
                3 Michelin Stars (2026)
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <button
              onClick={onReserveTable}
              className="px-8 py-4 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] text-xs font-semibold uppercase tracking-widest transition-all shadow-xl flex items-center space-x-2 cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Reserve A Dining Table</span>
            </button>
          </div>
        </div>

        {/* Interactive Menu Tabs */}
        <div className="bg-[#282622] border border-[#C5A059]/30 p-6 sm:p-10 rounded-lg">
          <div className="flex justify-between items-center border-b border-stone-700 pb-4 mb-8 flex-wrap gap-4">
            <h3 className="font-serif text-2xl text-[#C5A059]">
              Sample Culinary Selections
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveMenuTab("tasting")}
                className={`text-xs uppercase tracking-widest pb-2 font-medium transition-colors cursor-pointer ${
                  activeMenuTab === "tasting"
                    ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                7-Course Tasting Menu
              </button>
              <button
                onClick={() => setActiveMenuTab("wine")}
                className={`text-xs uppercase tracking-widest pb-2 font-medium transition-colors cursor-pointer ${
                  activeMenuTab === "wine"
                    ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Sommelier Wine List
              </button>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MENU_ITEMS[activeMenuTab].map((item, idx) => (
              <div key={idx} className="space-y-1 pb-4 border-b border-stone-800">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-serif text-lg text-stone-100 font-medium">
                    {item.name}
                  </h4>
                  <span className="text-xs font-semibold text-[#C5A059] ml-2">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. RESORT PHOTO GALLERY                                                    */
/* -------------------------------------------------------------------------- */
function PhotoGallery({ onOpenLightbox }) {
  const [filter, setFilter] = useState("all");

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => filter === "all" || img.cat === filter
  );

  return (
    <section id="gallery" className="py-24 bg-[#F4EFEA] dark:bg-[#080d1a] border-t border-[#E6E0D6] dark:border-slate-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block mb-2">
              VISUAL PERSPECTIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1B18] dark:text-white">
              The Resort Photo Gallery
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Photos" },
              { id: "architecture", label: "Architecture" },
              { id: "suites", label: "Suites" },
              { id: "gastronomy", label: "Gastronomy" },
              { id: "wellness", label: "Wellness" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-widest transition-colors cursor-pointer rounded-xs ${
                  filter === tab.id
                    ? "bg-[#1C1B18] dark:bg-[#C5A059] text-[#C5A059] dark:text-slate-950 font-bold"
                    : "bg-white/80 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => onOpenLightbox(idx)}
              className="relative h-72 cursor-pointer group shadow-md border border-[#E6E0D6] dark:border-slate-800 overflow-hidden rounded-lg"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
                  {img.cat}
                </p>
                <h4 className="font-serif text-xl">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. REVIEWS & PRESS RECOGNITION                                             */
/* -------------------------------------------------------------------------- */
function ReviewsAndPress() {
  return (
    <section className="py-24 bg-[#FDFBF7] dark:bg-[#0c1322] text-[#1C1B18] dark:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* Press Logos Bar */}
        <div className="border-b border-[#E6E0D6] dark:border-slate-800 pb-12 mb-16">
          <p className="text-center text-[10px] tracking-[0.3em] font-semibold text-stone-400 uppercase mb-8">
            INTERNATIONAL PRESS RECOGNITION
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-stone-800 dark:text-white">
              CONDÉ NAST TRAVELER
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-stone-800 dark:text-white">
              VOGUE LIVING
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-stone-800 dark:text-white">
              TRAVEL + LEISURE
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-stone-800 dark:text-white">
              FORBES 5-STAR
            </span>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto">
          <ReviewsSlider
            items={REVIEWS_DATA}
            breakpoints={{ 0: { slidesPerView: 1 } }}
            autoplayDelay={5500}
            renderItem={(review) => (
              <div className="h-full text-center space-y-6 px-2">
                <div className="flex justify-center space-x-1 text-[#C5A059]">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <blockquote className="font-serif text-2xl sm:text-4xl italic text-stone-800 dark:text-stone-200 font-light leading-relaxed">
                  "{review.quote}"
                </blockquote>

                <div>
                  <p className="font-semibold text-sm uppercase tracking-widest text-[#1C1B18] dark:text-white">
                    {review.name}
                  </p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider pt-0.5">
                    {review.origin} — {review.suite}
                  </p>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 10. LOCATION GUIDE                                                         */
/* -------------------------------------------------------------------------- */
function LocationGuide() {
  return (
    <section className="py-24 bg-[#1C1B18] text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block">
              PRIME COASTAL LOCATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              Amalfi Coast Heights
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Perched 150 meters above sea level between Amalfi and Positano,
              LUXSTAY offers quiet seclusion while remaining minutes away from
              historic Italian landmarks.
            </p>

            {/* Distances List */}
            <div className="space-y-4 pt-4 border-t border-stone-800">
              {[
                {
                  name: "Private Ocean Cove & Deck",
                  time: "2 Min via Private Elevator",
                },
                { name: "Resort Helipad Pad 1", time: "5 Min Walk" },
                {
                  name: "Historic Amalfi Town Center",
                  time: "10 Min Drive / Water Taxi",
                },
                {
                  name: "Ravello Gardens & Villa Rufolo",
                  time: "15 Min Private Transfer",
                },
                {
                  name: "Capri Island Charter Port",
                  time: "25 Min Yacht Cruise",
                },
              ].map((loc, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-stone-300 font-medium">{loc.name}</span>
                  <span className="text-[#C5A059] font-semibold">{loc.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative h-96 border border-[#C5A059]/30 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
              alt="Location Coastline"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 left-6 bg-[#1C1B18]/90 p-4 border border-[#C5A059]/40 max-w-xs rounded-sm">
              <p className="text-xs text-[#C5A059] uppercase font-bold tracking-widest">
                GPS Coordinates
              </p>
              <p className="font-serif text-sm text-white pt-1">
                40° 38' 0.384'' N, 14° 36' 11.232'' E
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 11. VIP CONCIERGE NEWSLETTER                                               */
/* -------------------------------------------------------------------------- */
function VIPNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-[#282622] text-white border-t border-[#C5A059]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <span className="text-[11px] tracking-[0.3em] font-semibold text-[#C5A059] uppercase block">
          THE LUXSTAY CIRCLE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
          Join Our VIP Concierge Newsletter
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto">
          Subscribe to receive exclusive invitation-only seasonal offers, priority suite release notifications, and complimentary vintage champagne vouchers.
        </p>

        {submitted ? (
          <div className="p-4 bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
            <span>Welcome to the LUXSTAY Circle. Your voucher code has been emailed.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#1C1B18] border border-[#E6E0D6]/30 px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5A059] rounded-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer rounded-sm"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 12. RESERVATION WIZARD DRAWER                                              */
/* -------------------------------------------------------------------------- */
function BookingWizardDrawer({ isOpen, onClose, initialData }) {
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState(initialData?.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialData?.checkOut || "");
  const [guests, setGuests] = useState(initialData?.guests || "");
  const [selectedSuite, setSelectedSuite] = useState(initialData?.selectedSuite || null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [addTransfer, setAddTransfer] = useState(false);
  const [refId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    if (isOpen) {
      if (initialData?.checkIn) setCheckIn(initialData.checkIn);
      if (initialData?.checkOut) setCheckOut(initialData.checkOut);
      if (initialData?.guests) setGuests(initialData.guests);
      if (initialData?.selectedSuite) setSelectedSuite(initialData.selectedSuite);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const date1 = checkIn ? new Date(checkIn) : null;
  const date2 = checkOut ? new Date(checkOut) : null;
  const diffTime = date1 && date2 ? Math.abs(date2 - date1) : 0;
  const totalNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;
  const currentSuite = selectedSuite || SUITES_DATA[0];
  const subtotal = (selectedSuite?.price || 0) * (checkIn && checkOut ? totalNights : 1);
  const transferCost = addTransfer ? 15000 : 0;
  const totalCost = subtotal + transferCost;

  const handleStep1Submit = (e) => {
    e?.preventDefault?.();
    if (!checkIn) {
      toast.warning("Please select a check-in date.");
      return;
    }
    if (!checkOut) {
      toast.warning("Please select a check-out date.");
      return;
    }
    if (!guests) {
      toast.warning("Please select the number of guests.");
      return;
    }
    if (!selectedSuite) {
      toast.warning("Please choose an accommodation suite.");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e?.preventDefault?.();
    if (!guestName.trim()) {
      toast.warning("Please enter your full name.");
      return;
    }
    if (!guestEmail.trim()) {
      toast.warning("Please enter your email address.");
      return;
    }
    if (!guestPhone.trim()) {
      toast.warning("Please enter your phone number.");
      return;
    }
    setStep(3);
    toast.success("Suite reservation registered!");
  };

  const handleCloseDrawer = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#1C1B18] text-white h-full flex flex-col justify-between overflow-y-auto border-l border-[#C5A059]/40 p-6 sm:p-10">
        <div>
          <div className="flex justify-between items-center border-b border-stone-800 pb-4 mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                RESERVATION WIZARD
              </span>
              <h3 className="font-serif text-2xl text-white">
                Reserve Your Stay at LUXSTAY
              </h3>
            </div>
            <button
              onClick={handleCloseDrawer}
              className="p-2 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-3 gap-2 mb-8 text-[10px] uppercase tracking-widest text-center">
            <div
              className={`py-2 border-b-2 ${
                step >= 1
                  ? "border-[#C5A059] text-[#C5A059]"
                  : "border-stone-800 text-stone-600"
              }`}
            >
              1. Dates & Suite
            </div>
            <div
              className={`py-2 border-b-2 ${
                step >= 2
                  ? "border-[#C5A059] text-[#C5A059]"
                  : "border-stone-800 text-stone-600"
              }`}
            >
              2. Guest Details
            </div>
            <div
              className={`py-2 border-b-2 ${
                step >= 3
                  ? "border-[#C5A059] text-[#C5A059]"
                  : "border-stone-800 text-stone-600"
              }`}
            >
              3. Confirmation
            </div>
          </div>

          {/* Step 1: Dates & Select Suite */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              {/* Interactive Dates and Guests Input Grid */}
              <div className="bg-[#282622] p-4 border border-stone-700 space-y-3 rounded-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <DatePicker
                    label={
                      <span className="flex items-center text-[#C5A059]">
                        <Calendar className="w-3 h-3 mr-1" /> Check-In *
                      </span>
                    }
                    buttonClassName="w-full bg-[#1C1B18] border border-stone-700 text-white text-xs p-2.5 focus:border-[#C5A059] cursor-pointer hover:border-[#C5A059]"
                    placeholder="Select Check-in Date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    minDate={new Date()}
                  />

                  <DatePicker
                    label={
                      <span className="flex items-center text-[#C5A059]">
                        <Calendar className="w-3 h-3 mr-1" /> Check-Out *
                      </span>
                    }
                    buttonClassName="w-full bg-[#1C1B18] border border-stone-700 text-white text-xs p-2.5 focus:border-[#C5A059] cursor-pointer hover:border-[#C5A059]"
                    placeholder="Select Check-out Date"
                    value={checkOut}
                    minDate={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold block mb-1">
                    Number of Guests *
                  </label>
                  <select
                    required
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#1C1B18] border border-stone-700 text-white text-xs p-2.5 focus:border-[#C5A059] cursor-pointer"
                  >
                    <option value="" disabled hidden>Select Guests</option>
                    <option value="1 Adult">1 Adult (Solo Retreat)</option>
                    <option value="2 Adults, 0 Children">2 Adults (Couple)</option>
                    <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                    <option value="4 Adults (Villa)">4 Adults (Private Villa)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                  Choose Accommodations * :
                </p>
                <p className="text-[11px] text-stone-400">
                  Select your preferred suite or private residence below
                </p>
              </div>

              <div className="space-y-3">
                {SUITES_DATA.map((s) => {
                  const isChosen = selectedSuite?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSuite(s)}
                      className={`p-4 border cursor-pointer transition-all flex justify-between items-center rounded-sm ${
                        isChosen
                          ? "bg-[#282622] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]"
                          : "bg-[#1C1B18] border-stone-800 hover:border-stone-700"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg text-white">{s.title}</h4>
                          {isChosen && (
                            <span className="text-[10px] bg-[#C5A059] text-black font-bold uppercase px-1.5 py-0.5 rounded-xs">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-400">
                          {s.sqm} m² • {s.view}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-lg text-[#C5A059]">
                          ₹{s.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          / night
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extras Toggle */}
              <div className="pt-4 border-t border-stone-800">
                <label className="flex items-center space-x-3 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addTransfer}
                    onChange={(e) => setAddTransfer(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>
                    Add Helicopter / Luxury Private Transfer from Airport (+₹15,000)
                  </span>
                </label>
              </div>
            </form>
          )}

          {/* Step 2: Guest Details */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#C5A059]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Countess Eleanor Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#282622] border border-stone-700 px-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#C5A059]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleanor@vance-estate.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[#282622] border border-stone-700 px-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#C5A059]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7700 900077"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-[#282622] border border-stone-700 px-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#C5A059]">
                  Special Requests / Concierge Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. High floor ocean view, dietary preferences, champagne in room..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#282622] border border-stone-700 px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5A059]"
                />
              </div>
            </form>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#C5A059] mx-auto" />
              <h4 className="font-serif text-3xl text-white">
                Reservation Confirmed
              </h4>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Thank you,{" "}
                <strong className="text-white">{guestName}</strong>
                . Your booking request for{" "}
                <strong className="text-[#C5A059]">{selectedSuite?.title}</strong> has
                been received with Reference ID{" "}
                <strong className="text-white">
                  #LUX-{refId}
                </strong>
                .
              </p>
              <div className="p-4 bg-[#282622] border border-stone-700 max-w-sm mx-auto text-left text-xs space-y-1.5 rounded-sm">
                <p>
                  <span className="text-stone-400">Dates:</span> {checkIn} to {checkOut} ({totalNights} Nights)
                </p>
                <p>
                  <span className="text-stone-400">Guests:</span> {guests}
                </p>
                <p>
                  <span className="text-stone-400">Total Price:</span> ₹
                  {totalCost.toLocaleString()} INR
                </p>
                <p>
                  <span className="text-stone-400">Confirmation Sent To:</span>{" "}
                  {guestEmail}
                </p>
                <p>
                  <span className="text-stone-400">Butler Desk:</span> Active upon
                  arrival
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions & Price Summary */}
        <div className="pt-6 border-t border-stone-800 space-y-4">
          {step < 3 && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-400">Est. Total Cost:</span>
              <span className="font-serif text-2xl text-[#C5A059] font-semibold">
                ₹{totalCost.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between space-x-4">
            {step > 1 && step < 3 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-stone-700 text-stone-300 text-xs uppercase tracking-widest hover:bg-stone-800 cursor-pointer"
              >
                Back
              </button>
            )}

            {step === 1 && (
              <button
                onClick={handleStep1Submit}
                className="w-full py-3 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] font-bold text-xs uppercase tracking-widest cursor-pointer"
              >
                Continue to Guest Info
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handleStep2Submit}
                className="w-full py-3 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] font-bold text-xs uppercase tracking-widest cursor-pointer"
              >
                Confirm & Guarantee Stay
              </button>
            )}

            {step === 3 && (
              <button
                onClick={handleCloseDrawer}
                className="w-full py-3 bg-[#C5A059] text-[#1C1B18] font-bold text-xs uppercase tracking-widest cursor-pointer"
              >
                Close Window
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 13. TABLE RESERVATION MODAL                                                */
/* -------------------------------------------------------------------------- */
function TableReservationModal({ isOpen, onClose }) {
  const [reserved, setReserved] = useState(false);
  const [diningDate, setDiningDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReserved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setReserved(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
      <div className="bg-[#1C1B18] text-white max-w-lg w-full border border-[#C5A059]/40 p-6 sm:p-8 space-y-6 relative rounded-lg shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold">
            L'ÉTOILE RESTAURANT
          </span>
          <h3 className="font-serif text-3xl text-white">Reserve A Dining Table</h3>
        </div>

        {reserved ? (
          <div className="text-center py-6 space-y-3">
            <Check className="w-12 h-12 text-[#C5A059] mx-auto" />
            <p className="font-serif text-2xl text-white">Table Request Received</p>
            <p className="text-xs text-stone-300">
              Our Maitre d' will confirm your reservation time for {diningDate} ({timeSlot}) via SMS within 15
              minutes.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-[#C5A059] text-[#1C1B18] text-xs font-bold uppercase cursor-pointer hover:bg-[#B89346] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!diningDate) {
                toast.warning("Please select a dining date.");
                return;
              }
              if (!timeSlot) {
                toast.warning("Please select a time slot.");
                return;
              }
              if (!guestCount) {
                toast.warning("Please select the number of guests.");
                return;
              }
              if (!guestEmail.trim()) {
                toast.warning("Please provide your email address.");
                return;
              }
              setReserved(true);
              toast.success("Dining reservation submitted! Maitre d' will confirm shortly.");
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <DatePicker
                label="Dining Date"
                labelClassName="text-[#C5A059] block uppercase font-semibold mb-1"
                buttonClassName="w-full bg-[#282622] border border-stone-700 p-2.5 text-white focus:outline-hidden focus:border-[#C5A059] cursor-pointer hover:border-[#C5A059]"
                placeholder="Select Dining Date"
                required
                value={diningDate}
                onChange={(e) => setDiningDate(e.target.value)}
                minDate={new Date()}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#C5A059] block uppercase font-semibold mb-1">
                  Time Slot *
                </label>
                <select
                  required
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#282622] border border-stone-700 p-2.5 text-white focus:outline-hidden focus:border-[#C5A059] cursor-pointer"
                >
                  <option value="" disabled hidden>Select Time</option>
                  <option value="19:30 Sunset Sitting">19:30 Sunset Sitting</option>
                  <option value="21:00 Prime Sitting">21:00 Prime Sitting</option>
                  <option value="22:15 Late Dining">22:15 Late Dining</option>
                </select>
              </div>
              <div>
                <label className="text-[#C5A059] block uppercase font-semibold mb-1">
                  Guests *
                </label>
                <select
                  required
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-[#282622] border border-stone-700 p-2.5 text-white focus:outline-hidden focus:border-[#C5A059] cursor-pointer"
                >
                  <option value="" disabled hidden>Select Guests</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="Private Dining (6+)">Private Dining (6+)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[#C5A059] block uppercase font-semibold mb-1">
                Guest Contact Email *
              </label>
              <input
                type="email"
                required
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="e.g. name@domain.com"
                className="w-full bg-[#282622] border border-stone-700 p-2.5 text-white focus:outline-hidden focus:border-[#C5A059]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C5A059] hover:bg-[#B89346] text-[#1C1B18] font-bold uppercase tracking-widest pt-3 cursor-pointer shadow-md transition-colors"
            >
              Confirm Dining Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 14. SUITE QUICK VIEW MODAL                                                 */
/* -------------------------------------------------------------------------- */
function SuiteQuickViewModal({ suite, onClose, onBook }) {
  if (!suite) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] dark:bg-[#131c2e] text-[#1C1B18] dark:text-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E6E0D6] dark:border-slate-800 p-6 sm:p-8 space-y-6 relative rounded-lg shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 sm:h-full overflow-hidden rounded-lg">
            <img
              src={suite.image}
              alt={suite.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
              {suite.categoryLabel}
            </span>
            <h3 className="font-serif text-3xl text-[#1C1B18] dark:text-white">
              {suite.title}
            </h3>
            <p className="font-serif text-2xl text-[#C5A059]">
              ₹{suite.price.toLocaleString()} / night
            </p>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {suite.description}
            </p>

            <div className="space-y-1 text-xs">
              <p className="font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-widest">
                Included Amenities:
              </p>
              <ul className="grid grid-cols-1 gap-1">
                {suite.amenities.map((a, idx) => (
                  <li key={idx} className="flex items-center text-stone-600 dark:text-stone-300">
                    <Check className="w-3.5 h-3.5 text-[#C5A059] mr-2" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                onClose();
                onBook(suite);
              }}
              className="w-full py-3 bg-[#1C1B18] dark:bg-[#C5A059] hover:bg-[#C5A059] text-white dark:text-slate-950 hover:text-[#1C1B18] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer rounded-sm shadow-md"
            >
              Book This Suite Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PAGE EXPORT: HomeHotel                                                */
/* -------------------------------------------------------------------------- */
export default function HomeHotel() {
  // Modals & Drawers States
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [bookingSearchData, setBookingSearchData] = useState(null);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [selectedSuiteQuickView, setSelectedSuiteQuickView] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpenBooking = (data) => {
    if (data) setBookingSearchData(data);
    setBookingDrawerOpen(true);
  };

  const handleBookSuite = (suite) => {
    if (suite) {
      setSelectedSuiteQuickView(null);
      setBookingSearchData((prev) => ({ ...prev, selectedSuite: suite }));
    }
    setBookingDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7] dark:bg-[#080D1A] text-slate-800 dark:text-slate-100 antialiased selection:bg-[#C5A059] selection:text-white">
      {/* 1. Cinematic Hero Banner & Integrated Reservation Bar */}
      <CinematicHero onSearchAvailability={handleOpenBooking} />

      {/* 2. Editorial Heritage & Story Section */}
      <EditorialStory />

      {/* 3. Suites & Private Residences Showcase */}
      <SuitesShowcase
        onSelectSuiteQuickView={(suite) => setSelectedSuiteQuickView(suite)}
        onBookSuite={handleBookSuite}
      />

      {/* 4. Bespoke Facilities */}
      <BespokeFacilities />

      {/* 5. Curated Experiences */}
      <CuratedExperiences
        onRequestExperience={() => setBookingDrawerOpen(true)}
      />

      {/* 6. Seasonal Offers & Packages */}
      <SeasonalOffers onBookOffer={() => setBookingDrawerOpen(true)} />

      {/* 7. Michelin Star Gastronomy */}
      <GastronomySection onReserveTable={() => setTableModalOpen(true)} />

      {/* 8. Photo Gallery */}
      <PhotoGallery onOpenLightbox={(idx) => setLightboxIndex(idx)} />

      {/* 9. Guest Reviews & Press Recognition */}
      <ReviewsAndPress />

      {/* 10. Location Guide */}
      <LocationGuide />

      {/* 11. VIP Concierge Newsletter */}
      <VIPNewsletter />

      {/* Modals & Overlay Drawers */}
      <BookingWizardDrawer
        isOpen={bookingDrawerOpen}
        onClose={() => setBookingDrawerOpen(false)}
        initialData={bookingSearchData}
      />

      <TableReservationModal
        isOpen={tableModalOpen}
        onClose={() => setTableModalOpen(false)}
      />

      <SuiteQuickViewModal
        suite={selectedSuiteQuickView}
        onClose={() => setSelectedSuiteQuickView(null)}
        onBook={handleBookSuite}
      />

      {/* Photo Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white p-2 hover:text-[#C5A059] cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>

          <img
            src={GALLERY_IMAGES[lightboxIndex].url}
            alt="Enlarged gallery view"
            className="max-w-5xl max-h-[80vh] object-contain border border-stone-800 shadow-2xl rounded-sm"
          />

          <div className="absolute bottom-6 text-center text-white space-y-1">
            <p className="font-serif text-2xl">
              {GALLERY_IMAGES[lightboxIndex].title}
            </p>
            <p className="text-xs uppercase tracking-widest text-[#C5A059]">
              {GALLERY_IMAGES[lightboxIndex].cat}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
