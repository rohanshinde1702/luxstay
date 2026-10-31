import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuCompass as Compass,
  LuMapPin as MapPin,
  LuCalendar as Calendar,
  LuUsers as Users,
  LuArrowRight as ArrowRight,
  LuStar as Star,
  LuHeart as Heart,
  LuShieldCheck as ShieldCheck,
  LuHeadphones as Headphones,
  LuSparkles as Sparkles,
  LuPlane as Plane,
  LuBuilding as Building,
  LuMountain as Mountain,
  LuLandmark as Landmark,
  LuUtensils as Utensils,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuCircleCheck as CheckCircle2,
  LuX as X,
  LuPlus as Plus
} from "react-icons/lu";
import BookingModal from "../../components/booking/BookingModal";
import TourBookingModal from "../../components/tours/TourBookingModal";
import DateRangePicker from "../../components/common/DateRangePicker";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// --- TOP DESTINATIONS DATA ---
const TOP_DESTINATIONS = [
  {
    id: "santorini",
    title: "Santorini, Greece",
    country: "Greece",
    desc: "Best for: Romance & Views",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    toursCount: 12,
    startingPrice: "$ 24,999",
  },
  {
    id: "bali",
    title: "Bali, Indonesia",
    country: "Indonesia",
    desc: "Best for: Nature & Wellness",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    toursCount: 18,
    startingPrice: "$ 16,999",
  },
  {
    id: "kyoto",
    title: "Kyoto, Japan",
    country: "Japan",
    desc: "Best for: Culture & History",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    toursCount: 15,
    startingPrice: "$ 21,999",
  },
  {
    id: "dubai",
    title: "Dubai, UAE",
    country: "UAE",
    desc: "Best for: Luxury & Shopping",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    toursCount: 22,
    startingPrice: "$ 31,999",
  },
];

// --- FEATURED HANDPICKED HOTELS ---
const FEATURED_HOTELS = [
  {
    id: "aman-tokyo",
    title: "Aman Tokyo",
    location: "Tokyo, Japan",
    badge: "Luxury",
    rating: "4.9",
    reviews: 124,
    price: "34,999",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "oberoi-marrakech",
    title: "The Oberoi, Marrakech",
    location: "Marrakech, Morocco",
    badge: "Boutique",
    rating: "4.8",
    reviews: 89,
    price: "24,999",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "six-senses",
    title: "Six Senses Zighy Bay",
    location: "Oman",
    badge: "Resort",
    rating: "4.9",
    reviews: 176,
    price: "49,999",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "capella-ubud",
    title: "Capella Ubud",
    location: "Bali, Indonesia",
    badge: "Villa",
    rating: "4.9",
    reviews: 212,
    price: "39,999",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
];

// --- TRAVEL GUIDES ARTICLES ---
const TRAVEL_GUIDES = [
  {
    id: "guide-1",
    title: "10 Must-Visit Places in Europe for First-Time Travelers",
    date: "May 12, 2026",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "guide-2",
    title: "What to Pack for a 7-Day Trip (And What to Leave Behind)",
    date: "May 8, 2026",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "guide-3",
    title: "The Ultimate Guide to Bali on a Budget",
    date: "May 3, 2026",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
  },
];

// --- TESTIMONIALS DATA ---
const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Emily Carter",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "LuxStay made our honeymoon absolutely magical. The hotel was stunning, and the entire experience was seamless from start to finish.",
  },
  {
    id: "t-2",
    name: "David Miller",
    country: "Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "The best travel experience we've ever had! From the booking process to the guided tours, everything was perfect.",
  },
  {
    id: "t-3",
    name: "Sophia Patel",
    country: "India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "Incredible service, beautiful destinations, and a team that truly cares. I can't wait to plan my next trip with LuxStay!",
  },
  {
    id: "t-4",
    name: "Lucas Bennett",
    country: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Our Swiss Alps itinerary was flawlessly planned. Every transfer, hotel and excursion was handled with real attention to detail.",
  },
  {
    id: "t-5",
    name: "Isabella Rossi",
    country: "Italy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "From the Maldives villa to the private sunset cruise, LuxStay exceeded every expectation. Truly a once-in-a-lifetime trip.",
  },
];

export default function HomeTravel() {
  // Search Form State
  const [destinationQuery, setDestinationQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  // Favorites & Modals State
  const [favorites, setFavorites] = useState({});
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestinationModal, setSelectedDestinationModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    const isNowSaved = !favorites[id];
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    showToast(isNowSaved ? "Saved to your Travel Wishlist!" : "Removed from Wishlist.");
  };

  const handleSearchHotels = (e) => {
    e.preventDefault();
    if (!destinationQuery.trim()) {
      showToast("Please enter your destination.");
      return;
    }
    if (!checkIn || !checkOut) {
      showToast("Please select check-in and check-out dates.");
      return;
    }
    if (!guests) {
      showToast("Please select the number of guests.");
      return;
    }
    setSelectedItemForBooking({
      title: `Stay in ${destinationQuery}`,
      price: 34999,
      dates: `${checkIn} to ${checkOut}`,
      guests,
    });
    setIsBookingModalOpen(true);
  };

  const handleBookHotel = (hotel) => {
    setSelectedItemForBooking({
      title: hotel.title,
      price: hotel.price,
      location: hotel.location,
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#071114] text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0B1B1E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C5A880]/40 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-[#C5A880]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Santorini Sunset View + Floating Search Bar)              */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-24 pb-36">
        {/* Background Santorini Panoramic Sunset */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=85"
            alt="Santorini Greece Sunset"
            className="w-full h-full object-cover object-center" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/55 to-slate-950/30" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/40" />
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6 text-white">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#dfcaa4] uppercase block">
                LUXURY TRAVEL & PRIVATE EXPEDITIONS
              </span>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.1]">
                Discover<br />
                Extraordinary<br />
                Places
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl">
                From breathtaking destinations to curated experiences, we help you explore the world in comfort, style and unforgettable moments.
              </p>

              <div className="pt-2">
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C5A880] hover:bg-[#b89360] px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Destinations</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Decorative Cursive Script Annotation */}
            <div className="lg:col-span-4 hidden lg:flex justify-end pr-8">
              <div className="text-right text-white/90 space-y-1">
                <p className="font-serif italic text-3xl sm:text-4xl font-light tracking-wide drop-shadow-md">
                  More than<br />
                  just a trip
                </p>
                <span className="text-xs text-[#dfcaa4] inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#dfcaa4]" />
                  <span>Curated for you</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Horizontal Multi-Field Search Bar (Positioned at bottom of hero) */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 sm:p-5 shadow-2xl border border-slate-200/80 dark:border-slate-800">
              <form
                onSubmit={handleSearchHotels}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
              >
                {/* 1. Destination (4 cols) */}
                <div className="lg:col-span-4 px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FAF8F5] dark:bg-slate-800 text-[#C5A880] shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Destination
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Where are you going?"
                        value={destinationQuery}
                        onChange={(e) => setDestinationQuery(e.target.value)}
                        className="w-full text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 bg-transparent focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* 2 & 3. Stay Dates with react-calendar DateRangePicker (4 cols) */}
                <div className="lg:col-span-4 px-3 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Dates of Expedition
                  </label>
                  <DateRangePicker
                    variant="combined"
                    startDate={checkIn}
                    endDate={checkOut}
                    onStartDateChange={(e) => setCheckIn(e.target.value)}
                    onEndDateChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                {/* 4. Guests (2 cols) */}
                <div className="lg:col-span-2 px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FAF8F5] dark:bg-slate-800 text-[#C5A880] shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Guests
                      </label>
                      <select
                        required
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full text-xs font-semibold text-slate-800 dark:text-slate-100 bg-transparent focus:outline-hidden cursor-pointer"
                      >
                        <option value="">Select Guests</option>
                        <option value="1 Adult">1 Adult</option>
                        <option value="2 Adults">2 Adults</option>
                        <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                        <option value="4+ Guests">4+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 5. Search Button (2 cols) */}
                <div className="lg:col-span-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#997548] hover:bg-[#7c5e3c] text-white py-4 px-6 text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Search Hotels</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. FOUR TRAVEL PILLARS BAR (with Flight Line Graphic)                      */}
      {/* -------------------------------------------------------------------------- */}
      <section className="bg-white dark:bg-[#0c171a] border-b border-stone-200/80 dark:border-slate-800/80 py-12 transition-colors relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-stone-200 dark:lg:divide-slate-800">
            
            {/* Pillar 1 */}
            <div className="flex items-start gap-4 px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#997548] dark:text-[#dfcaa4] shrink-0">
                <Building className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Handpicked Hotels
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  Stay at the world's most loved properties.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-4 px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#997548] dark:text-[#dfcaa4] shrink-0">
                <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Secure Booking
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  Your safety and comfort are our priority.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-4 px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#997548] dark:text-[#dfcaa4] shrink-0">
                <Headphones className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  24/7 Support
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  We're here whenever you need us.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-start gap-4 px-4 relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#997548] dark:text-[#dfcaa4] shrink-0">
                <Star className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Exclusive Deals
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  Get special offers and travel perks.
                </p>
              </div>

              {/* Decorative Airplane Icon */}
              <div className="absolute right-2 top-0 text-[#C5A880]/30 hidden xl:block pointer-events-none">
                <Plane className="h-8 w-8 rotate-45" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. POPULAR DESTINATIONS (Explore Our Top Travel Destinations)             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#997548] dark:text-[#dfcaa4] block">
                POPULAR DESTINATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Explore Our Top Travel Destinations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                Discover handpicked destinations that offer the perfect blend of culture, adventure and relaxation.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/destinations"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#997548] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>View All Destinations</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 Destinations Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                onClick={() => {
                  setDestinationQuery(dest.title);
                  showToast(`Selected destination: ${dest.title}`);
                }}
                className="group relative h-96 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-6 border border-slate-200/60 dark:border-slate-800"
              >
                <img src={dest.image}
                  alt={dest.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Country Tag */}
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#dfcaa4] bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <MapPin className="h-3 w-3" />
                    <span>{dest.country}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-tight">
                    {dest.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light">
                    {dest.desc}
                  </p>
                </div>

                {/* Plus Action Floating Button */}
                <div className="absolute bottom-6 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg group-hover:bg-[#C5A880] group-hover:rotate-90 transition-all duration-300">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. CURATED EXPERIENCES (Alpine Lake Banner + 4 Experience Badges)          */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-28 overflow-hidden bg-slate-950 text-white">
        {/* Background Hiker & Emerald Alpine Lake Image */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
            alt="Alpine Emerald Lake"
            className="w-full h-full object-cover opacity-45" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/75 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#dfcaa4] block">
              CURATED EXPERIENCES
            </span>

            <h2 className="text-3xl sm:text-5xl font-light text-white leading-[1.15]">
              Unforgettable<br />
              Travel Experiences
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
              Go beyond sightseeing. Choose from our unique experiences designed to bring you closer to the heart of every destination.
            </p>

            <div className="pt-2">
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C5A880] hover:bg-[#b89360] text-slate-950 px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                <span>Explore Experiences</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 4 Experience Badges Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-[#dfcaa4] shrink-0 border border-white/10">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Guided Tours</h4>
                <p className="text-[11px] text-slate-400">Expert local guides.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-[#dfcaa4] shrink-0 border border-white/10">
                <Mountain className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Adventure Activities</h4>
                <p className="text-[11px] text-slate-400">For the thrill seekers.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-[#dfcaa4] shrink-0 border border-white/10">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Cultural Experiences</h4>
                <p className="text-[11px] text-slate-400">Real local connections.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-[#dfcaa4] shrink-0 border border-white/10">
                <Utensils className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Food & Wine</h4>
                <p className="text-[11px] text-slate-400">Taste the local flavors.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 5. FEATURED HOTELS (Handpicked Stays for Every Kind of Traveler)           */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#997548] dark:text-[#dfcaa4] block">
                FEATURED HOTELS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Handpicked Stays for Every Kind of Traveler
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                From boutique hotels to luxury resorts, we've curated the best stays for your next adventure.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#997548] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View All Hotels</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Hotel Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_HOTELS.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => handleBookHotel(hotel)}
                className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Image with Badge and Heart button */}
                  <div className="relative h-56 overflow-hidden">
                    <img src={hotel.image}
                      alt={hotel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <span className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-md text-white font-medium text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                      {hotel.badge}
                    </span>

                    <button
                      onClick={(e) => toggleFavorite(hotel.id, e)}
                      className={`absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                        favorites[hotel.id]
                          ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 hover:border-[#C5A880] hover:text-[#C5A880]"
                      }`}
                      aria-label="Save to favorites"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          favorites[hotel.id] ? "fill-[#C5A880]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
                      {hotel.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {hotel.location}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-amber-500 pt-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{hotel.rating}</span>
                      <span className="text-[11px] text-slate-400">({hotel.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Price Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      ${hotel.price}
                    </span>
                    <span className="text-[11px] text-slate-400"> / night</span>
                  </div>

                  <span className="text-xs font-bold text-[#997548] dark:text-[#dfcaa4] group-hover:translate-x-1 transition-transform">
                    Reserve →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 6. TRAVEL & GUIDES (Hiker Mountain Photo + 3 Guide Articles)               */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#F5F0EB] dark:bg-[#0a130f]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Photo with Cursive Annotation */}
            <div className="lg:col-span-4 relative rounded-lg overflow-hidden shadow-xl aspect-4/5">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80"
                alt="Hiker Mountain Peak"
                className="w-full h-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              <div className="absolute top-6 right-6 text-white text-right space-y-0.5">
                <p className="font-serif italic text-2xl drop-shadow-md">Plan Better Travel ~</p>
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#997548] dark:text-[#dfcaa4] block">
                TRAVEL & GUIDES
              </span>

              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white leading-[1.15]">
                Helpful Travel Guides<br />
                & Insider Tips
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Get inspired with our travel guides, packing tips, and destination recommendations from seasoned travelers.
              </p>

              <div className="pt-2">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#997548] hover:bg-[#7c5e3c] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Browse All Guides</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right 3 Article Rows */}
            <div className="lg:col-span-4 space-y-4">
              {TRAVEL_GUIDES.map((guide) => (
                <div
                  key={guide.id}
                  onClick={() => showToast(`Opened article: ${guide.title}`)}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <img src={guide.image}
                    alt={guide.title}
                    className="h-16 w-16 rounded-md object-cover shrink-0 group-hover:scale-105 transition-transform" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors line-clamp-2 leading-snug">
                      {guide.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {guide.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 7. TRAVELERS STORIES (What Our Travelers Say)                              */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#997548] dark:text-[#dfcaa4] block">
                TRAVELERS STORIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                What Our Travelers Say
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                Real stories from real travelers. Here's what they have to say about their LuxStay experiences.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label="Previous review"
                className="travel-reviews-prev h-10 w-10 flex items-center justify-center rounded-xl border border-stone-300 dark:border-slate-700 hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next review"
                className="travel-reviews-next h-10 w-10 flex items-center justify-center rounded-xl border border-stone-300 dark:border-slate-700 hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Review Cards Swiper Slider */}
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: ".travel-reviews-prev", nextEl: ".travel-reviews-next" }}
            loop
            speed={700}
            grabCursor
            spaceBetween={24}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-2!"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id} className="h-auto!">
              <div
                className="h-full rounded-lg bg-white dark:bg-slate-900 border hover:border-[#C5A059]/40 transition-all duration-300 border-slate-200/80 dark:border-slate-800 p-7 shadow-xs transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover border border-[#C5A880]/30" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
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
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 8. CALL TO ACTION (Your Next Journey Awaits)                               */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-20 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
            alt="Your Next Journey"
            className="w-full h-full object-cover opacity-45" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#dfcaa4] block">
                READY FOR YOUR NEXT ADVENTURE?
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                Your Next Journey Awaits
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Let us help you create unforgettable memories. Explore our curated destinations and start your new adventure today.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedItemForBooking({ title: "Custom Private Journey", price: 49999 });
                setIsBookingModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A880] hover:bg-[#b89360] text-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer shrink-0"
            >
              <span>Book Your Trip</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={selectedItemForBooking}
      />

    </div>
  );
}
