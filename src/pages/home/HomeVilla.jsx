import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuHouse as HomeIcon,
  LuShieldCheck as ShieldCheck,
  LuTreePalm as Palmtree,
  LuHeadphones as Headphones,
  LuGem as Gem,
  LuBed as Bed,
  LuBath as Bath,
  LuUsers as Users,
  LuMapPin as MapPin,
  LuCalendar as Calendar,
  LuChevronDown as ChevronDown,
  LuArrowRight as ArrowRight,
  LuPlay as Play,
  LuX as X,
  LuStar as Star,
  LuWaves as Waves,
  LuChefHat as ChefHat,
  LuWifi as Wifi,
  LuSparkles as Sparkles,
  LuSofa as Sofa,
  LuCircleCheck as CheckCircle2,
  LuWine as Wine
} from "react-icons/lu";
import BookingModal from "../../components/booking/BookingModal";
import ReviewsSlider from "../../components/common/ReviewsSlider";
import DateRangePicker from "../../components/common/DateRangePicker";

// --- HERO SLIDES DATA ---
const HERO_SLIDES = [
  {
    id: "villa-1",
    subtitle: "LUXURY VILLAS FOR UNFORGETTABLE STAYS",
    title: "Your Private\nVilla, Our\nPersonal Touch",
    desc: "Experience the perfect blend of luxury, privacy and comfort. Our handpicked villas offer you a home away from home — where every stay feels special.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2400&q=85",
  },
];

// --- 5 VILLA FEATURE HIGHLIGHTS BAR ---
const VILLA_HIGHLIGHTS = [
  {
    id: "private",
    icon: HomeIcon,
    title: "Private Villas",
    desc: "Exclusive villas with complete privacy and comfort.",
  },
  {
    id: "safe",
    icon: ShieldCheck,
    title: "Trusted & Safe",
    desc: "Verified properties and secure booking process.",
  },
  {
    id: "locations",
    icon: Palmtree,
    title: "Prime Locations",
    desc: "Stunning destinations across coastal and hill regions.",
  },
  {
    id: "support",
    icon: Headphones,
    title: "24/7 Support",
    desc: "We're here whenever you need us.",
  },
  {
    id: "luxury",
    icon: Gem,
    title: "Luxury Experiences",
    desc: "Personalized services for a memorable stay.",
  },
];

// --- 4 HANDPICKED FEATURED VILLAS ---
const FEATURED_VILLAS = [
  {
    id: "sunset-infinity",
    title: "The Sunset Infinity Villa",
    location: "Bali, Indonesia",
    badge: "Ocean View",
    image: "/images/villas/villa-bali-ocean.jpg",
    beds: "4 Beds",
    baths: "4 Baths",
    guests: "8 Guests",
    price: "34,999",
  },
  {
    id: "palm-paradise",
    title: "Villa Palm Paradise",
    location: "Goa, India",
    badge: "Private Pool",
    image: "/images/villas/villa-goa-pool.jpg",
    beds: "3 Beds",
    baths: "3 Baths",
    guests: "6 Guests",
    price: "24,999",
  },
  {
    id: "royal-retreat",
    title: "The Royal Retreat",
    location: "Udaipur, India",
    badge: "Mountain View",
    image: "/images/villas/villa-udaipur-retreat.jpg",
    beds: "5 Beds",
    baths: "4 Baths",
    guests: "10 Guests",
    price: "49,999",
  },
  {
    id: "ocean-breeze",
    title: "Ocean Breeze Villa",
    location: "Phuket, Thailand",
    badge: "Beachfront",
    image: "/images/villas/villa-phuket-beachfront.jpg",
    beds: "4 Beds",
    baths: "4 Baths",
    guests: "8 Guests",
    price: "38,999",
  },
];

// --- 6 VILLA AMENITIES ---
const VILLA_AMENITIES = [
  {
    id: "pool",
    icon: Waves,
    title: "Private Pool",
    desc: "Cool off in your own swimming pool.",
  },
  {
    id: "kitchen",
    icon: ChefHat,
    title: "Fully Equipped Kitchen",
    desc: "Cook your favorite meals with ease.",
  },
  {
    id: "wifi",
    icon: Wifi,
    title: "High-Speed WiFi",
    desc: "Stay connected always.",
  },
  {
    id: "bedrooms",
    icon: Bed,
    title: "Spacious Bedrooms",
    desc: "Designed for ultimate comfort.",
  },
  {
    id: "lounge",
    icon: Sofa,
    title: "Outdoor Lounge",
    desc: "Relax and enjoy the fresh air.",
  },
  {
    id: "housekeeping",
    icon: Sparkles,
    title: "Housekeeping",
    desc: "Daily cleaning and support.",
  },
];

// --- 4 LOCAL EXPERIENCES ---
const LOCAL_EXPERIENCES = [
  {
    id: "exp-1",
    title: "Island Boat Tour",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "exp-2",
    title: "Private Chef Dinner",
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "exp-3",
    title: "Yoga & Wellness",
    location: "Rishikesh, India",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "exp-4",
    title: "Wine Tasting",
    location: "Napa Valley, USA",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
  },
];

// --- TESTIMONIALS DATA ---
const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Emily Carter",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "The villa was absolutely stunning! The views, privacy and service were beyond our expectations. We can't wait to come back!",
  },
  {
    id: "t-2",
    name: "James Miller",
    country: "Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "A perfect getaway! The staff was incredibly helpful and the villa had everything we needed. Highly recommend!",
  },
  {
    id: "t-3",
    name: "Sophia Patel",
    country: "India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "LuxStay made our vacation unforgettable. Beautiful property, excellent service and breathtaking views!",
  },
  {
    id: "t-4",
    name: "Oliver Bennett",
    country: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Our private pool villa felt like a world of its own. The in-villa chef and sunset deck made every evening special.",
  },
  {
    id: "t-5",
    name: "Isabella Rossi",
    country: "Italy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "Elegant design, total privacy and a concierge who thought of everything. The perfect villa for our family reunion.",
  },
];

export default function HomeVilla() {
  // Booking Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");

  // Modals & Interactivity State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleQuickBook = (villa) => {
    setSelectedVilla(villa);
    setIsBookingModalOpen(true);
  };

  const handleSearchVillas = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      showToast("Please select check-in and check-out dates.");
      return;
    }
    if (!guests) {
      showToast("Please select the number of guests.");
      return;
    }
    if (!location) {
      showToast("Please select a destination location.");
      return;
    }
    setSelectedVilla({
      title: location !== "All Locations" ? `Luxury Villa in ${location}` : "The Sunset Infinity Villa",
      price: 34999,
      dates: `${checkIn} to ${checkOut}`,
      guests,
    });
    setIsBookingModalOpen(true);
  };

  const activeHero = HERO_SLIDES[0];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#071114] text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#2C3E35] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C5A880]/40 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-[#C5A880]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Sunset Villa Terrace + Floating Booking Card)             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center py-24 sm:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img src={activeHero.image}
            alt="LuxStay Luxury Villa"
            className="w-full h-full object-cover object-center" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/60 to-slate-950/35" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/40" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Buttons */}
            <div className="lg:col-span-7 space-y-6 text-white">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#dfcaa4] uppercase block">
                {activeHero.subtitle}
              </span>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.1]">
                Your Private<br />
                Villa, Our<br />
                <span className="italic font-serif font-normal text-[#dfcaa4]">Personal Touch</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl">
                {activeHero.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/rooms"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2C3E35] hover:bg-[#202e27] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Villas</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-3 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 text-xs font-semibold text-white transition-all duration-300 cursor-pointer"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-950">
                    <Play className="h-3 w-3 fill-slate-950 ml-0.5" />
                  </span>
                  <span>Watch Video</span>
                </button>
              </div>
            </div>

            {/* Right Column: Floating Booking Card ("Find Your Perfect Villa") */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-7 sm:p-9 shadow-2xl border border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto lg:ml-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Find Your Perfect Villa
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Direct estate booking with dedicated private concierge.
                    </p>
                  </div>

                  <form onSubmit={handleSearchVillas} className="space-y-4">
                    {/* Check In / Check Out Grid with react-calendar DateRangePicker */}
                    <DateRangePicker
                      startDate={checkIn}
                      endDate={checkOut}
                      onStartDateChange={(e) => setCheckIn(e.target.value)}
                      onEndDateChange={(e) => setCheckOut(e.target.value)}
                      required
                    />

                    {/* Guests & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Guests
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-3 text-xs font-medium text-slate-800 dark:text-slate-100 focus:border-[#2C3E35] focus:outline-hidden appearance-none cursor-pointer"
                          >
                            <option value="">Select Guests</option>
                            <option value="2 Adults">2 Adults</option>
                            <option value="4 Guests">4 Guests</option>
                            <option value="6 Guests">6 Guests</option>
                            <option value="8+ Guests">8+ Guests</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 pointer-events-none text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Location
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-3 text-xs font-medium text-slate-800 dark:text-slate-100 focus:border-[#2C3E35] focus:outline-hidden appearance-none cursor-pointer"
                          >
                            <option value="">Select Location</option>
                            <option value="All Locations">All Locations</option>
                            <option value="Bali, Indonesia">Bali, Indonesia</option>
                            <option value="Goa, India">Goa, India</option>
                            <option value="Phuket, Thailand">Phuket, Thailand</option>
                            <option value="Santorini, Greece">Santorini, Greece</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 pointer-events-none text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2C3E35] hover:bg-[#1f2c25] text-white py-4 px-6 text-xs font-bold uppercase tracking-wider shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <span>Search Villas</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. FIVE VILLA FEATURE HIGHLIGHTS BAR                                       */}
      {/* -------------------------------------------------------------------------- */}
      <section className="bg-white dark:bg-[#0c171a] border-y border-stone-200/80 dark:border-slate-800/80 py-10 transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-stone-200 dark:lg:divide-slate-800">
            {VILLA_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex flex-col items-center text-center px-4 space-y-2 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#2C3E35] dark:text-[#dfcaa4] group-hover:scale-110 group-hover:bg-[#2C3E35] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-[220px]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. FEATURED VILLAS (Handpicked Villas for Your Dream Getaway)              */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2C3E35] dark:text-[#dfcaa4] block">
                FEATURED VILLAS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Handpicked Villas for<br className="hidden sm:block" />
                Your Dream Getaway
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                From oceanfront escapes to hillside retreats, explore our most loved villas, each offering a unique experience.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C3E35] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View All Villas</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Villa Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_VILLAS.map((villa) => (
              <div
                key={villa.id}
                className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all duration-300"
              >
                <div>
                  {/* Image with Badge */}
                  <div className="relative h-56 overflow-hidden">
                    <img src={villa.image}
                      alt={villa.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <span className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-md text-white font-medium text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                      {villa.badge}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#2C3E35] dark:text-[#dfcaa4]" />
                      <span>{villa.location}</span>
                    </p>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#2C3E35] dark:group-hover:text-[#dfcaa4] transition-colors">
                      {villa.title}
                    </h3>

                    {/* Specs Row */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" /> {villa.beds}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" /> {villa.baths}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {villa.guests}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="pt-2">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        ${villa.price}
                      </span>
                      <span className="text-[11px] text-slate-400"> / night</span>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleQuickBook(villa)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2C3E35] hover:bg-[#1f2c25] text-white py-3 text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. MORE THAN JUST A STAY (Sunset Firepit Lounge Banner)                    */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-28 overflow-hidden bg-slate-950 text-white">
        {/* Panoramic Sunset Firepit Lounge Image */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85"
            alt="Sunset Villa Lounge"
            className="w-full h-full object-cover opacity-50" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#dfcaa4] block">
                MORE THAN JUST A STAY
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-white leading-[1.15]">
                Unwind, Reconnect,<br />
                Make Memories
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-xl">
                Our villas are designed for more than just a stay — they're a place to relax, celebrate and create lasting memories with your loved ones.
              </p>

              <div className="pt-2">
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/50 hover:bg-white hover:text-slate-950 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  <span>Explore Experiences</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Cursive Script Annotation */}
            <div className="lg:col-span-4 hidden lg:flex justify-end pr-8">
              <div className="text-right text-white/90 space-y-1">
                <p className="font-serif italic text-3xl sm:text-4xl font-light tracking-wide drop-shadow-md">
                  Good Vibes<br />
                  Great Stays
                </p>
                <span className="text-xs text-[#dfcaa4] inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#dfcaa4]" />
                  <span>Private Estates</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 5. OUR AMENITIES (Everything You Need for a Perfect Stay)                   */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Intro */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2C3E35] dark:text-[#dfcaa4] block">
                OUR AMENITIES
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-slate-900 dark:text-white leading-[1.15]">
                Everything You Need<br />
                for a Perfect Stay
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-md">
                From modern comforts to personalized services, we take care of every detail so you can relax and enjoy.
              </p>

              <div className="pt-2">
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2C3E35] hover:bg-[#1f2c25] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Explore All Amenities</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right 6 Amenities Grid (2 Cols x 3 Rows) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {VILLA_AMENITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#2C3E35] dark:text-[#dfcaa4] shrink-0 shadow-xs border border-stone-200 dark:border-slate-700">
                      <Icon className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 6. EXCLUSIVE EXPERIENCES (Local Experiences & Activities)                  */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#F5F0EB] dark:bg-[#0a130f]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2C3E35] dark:text-[#dfcaa4] block">
                EXCLUSIVE EXPERIENCES
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Local Experiences & Activities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                Make the most of your stay with curated experiences, from adventure activities to cultural tours and private dining.
              </p>
            </div>

            <Link
              to="/tours"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C3E35] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View All Experiences</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Experience Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCAL_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                onClick={() => showToast(`Selected experience: ${exp.title}`)}
                className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                </div>

                <div className="p-5 space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#2C3E35] dark:group-hover:text-[#dfcaa4] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#2C3E35] dark:text-[#dfcaa4]" />
                    <span>{exp.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 7. GUEST REVIEWS (What Our Guests Say)                                     */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2C3E35] dark:text-[#dfcaa4] block">
                GUEST REVIEWS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                What Our Guests Say
              </h2>
            </div>

            <Link
              to="/testimonials"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C3E35] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View All Reviews</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Review Slider */}
          <ReviewsSlider
            items={TESTIMONIALS}
            renderItem={(t) => (
              <div
                className="h-full rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-7 shadow-xs hover:border-[#2C3E35]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover border border-[#2C3E35]/30" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            )}
          />

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 8. CALL TO ACTION (Book Your Dream Villa Today)                            */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-20 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2400&q=85"
            alt="Dream Villa Sunset"
            className="w-full h-full object-cover opacity-45" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#dfcaa4] block">
                READY FOR YOUR NEXT ESCAPE?
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                Book Your Dream Villa Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Luxury, comfort and unforgettable experiences await you.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-950 hover:bg-[#C5A880] px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer shrink-0"
            >
              <span>Browse Villas</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 9. VIDEO MODAL                                                             */}
      {/* -------------------------------------------------------------------------- */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <span className="text-xs font-bold tracking-wider uppercase text-[#dfcaa4]">
                LuxStay Private Villa Tour
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-slate-950 flex items-center justify-center">
              <iframe
                src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1"
                title="LuxStay Villa Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={selectedVilla}
      />

    </div>
  );
}
