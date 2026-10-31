import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuBed as Bed,
  LuUtensils as Utensils,
  LuLeaf as Leaf,
  LuFlower2 as Flower2,
  LuStar as Star,
  LuChevronDown as ChevronDown,
  LuArrowRight as ArrowRight,
  LuPlay as Play,
  LuX as X,
  LuWine as Wine,
  LuBellRing as BellRing,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuCircleCheck as CheckCircle2,
  LuMaximize2 as Maximize2,
  LuWaves as Waves
} from "react-icons/lu";
import BookingModal from "../../components/booking/BookingModal";
import ReviewsSlider from "../../components/common/ReviewsSlider";
import CountUp from "../../components/common/CountUp";
import DateRangePicker from "../../components/common/DateRangePicker";

// --- HERO SLIDES DATA ---
const HERO_SLIDES = [
  {
    id: "boutique-1",
    subtitle: "A BOUTIQUE HOTEL BY THE SEA",
    title: "More Than\na Stay — It's an\nExperience",
    desc: "Discover a refined escape where modern luxury meets timeless comfort. LuxStay offers a serene retreat with elegant rooms, personalized service, and unforgettable experiences.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "boutique-2",
    subtitle: "SERENE COASTAL SANCTUARY",
    title: "Artisanal Living\nby the Ocean Waves",
    desc: "Experience hand-crafted interiors, tranquil balcony ocean views, and bespoke sommelier-curated culinary evenings.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2400&q=85",
  },
];

// --- 5 FEATURE HIGHLIGHTS BAR ---
const HIGHLIGHTS = [
  {
    id: "location",
    icon: Leaf,
    title: "Prime Location",
    desc: "Steps away from the beach and local attractions.",
  },
  {
    id: "rooms",
    icon: Bed,
    title: "Luxury Rooms",
    desc: "Spacious, elegant rooms with modern amenities.",
  },
  {
    id: "dining",
    icon: Utensils,
    title: "Fine Dining",
    desc: "A culinary journey with local and global flavors.",
  },
  {
    id: "wellness",
    icon: Flower2,
    title: "Wellness & Spa",
    desc: "Rejuvenate your mind, body and soul.",
  },
  {
    id: "service",
    icon: Star,
    title: "Personalized Service",
    desc: "Your comfort is our priority.",
  },
];

// --- 4 ROOMS SHOWCASE ---
const BOUTIQUE_ROOMS = [
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    bed: "King Bed",
    size: "35 m²",
    view: "City View",
    price: 18999,
    desc: "An intimate, thoughtfully appointed bedroom with organic cotton linens and rainfall shower.",
  },
  {
    id: "ocean-view-suite",
    title: "Ocean View Suite",
    badge: "Sea View",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    bed: "King Bed",
    size: "48 m²",
    view: "Ocean View",
    price: 26999,
    desc: "Wake up to sweeping azure ocean panoramas from a spacious private open-air terrace.",
  },
  {
    id: "garden-villa",
    title: "Garden Villa",
    badge: "Family Friendly",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    bed: "King Bed",
    size: "65 m²",
    view: "Garden View",
    price: 34999,
    desc: "Immerse yourself in lush botanical surroundings with private outdoor plunge pool and daybeds.",
  },
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    bed: "King Bed",
    size: "85 m²",
    view: "Ocean View",
    price: 49999,
    desc: "The ultimate coastal sanctuary featuring wraparound views, soaking tub, and 24/7 dedicated butler.",
  },
];

// --- 4 EXPERIENCES CARDS ---
const EXPERIENCES_DATA = [
  {
    id: "exp-1",
    title: "Sunset Cruise",
    price: "From $ 9,500",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "exp-2",
    title: "Island Tour",
    price: "From $ 7,500",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "exp-3",
    title: "Spa & Wellness",
    price: "From $ 6,000",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "exp-4",
    title: "Local Culture",
    price: "From $ 4,500",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
];

// --- GALLERY DATA ---
const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Infinity Lagoon Pool",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-2",
    title: "Boutique Ocean Suite",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-3",
    title: "Sunset Terrace Dining",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-4",
    title: "Botanical Spa Rituals",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
];

// --- TESTIMONIALS DATA ---
const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Emily Carter",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "The most beautiful hotel we've ever stayed at! The staff was incredibly kind and the views were breathtaking.",
  },
  {
    id: "t-2",
    name: "David Miller",
    country: "Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "LuxStay exceeded all our expectations. The room was spotless, the food was amazing, and the location is perfect.",
  },
  {
    id: "t-3",
    name: "Sophia Patel",
    country: "India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "A truly relaxing experience. From the spa to the dining, everything was perfect. We can't wait to come back!",
  },
  {
    id: "t-4",
    name: "Lucas Fischer",
    country: "Germany",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Every corner of this boutique hotel has character. Thoughtful design, curated art and the coziest rooftop bar in town.",
  },
  {
    id: "t-5",
    name: "Charlotte Dubois",
    country: "France",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "Intimate, stylish and so personal — the team remembered our names and our coffee orders from day one. Simply charming.",
  },
];

// --- BLOG POSTS DATA ---
const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "Top 5 Things to Do on Your Stay",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    date: "May 12, 2026",
    readTime: "5 min read",
  },
  {
    id: "blog-2",
    title: "The Best Local Cuisine to Try",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    date: "May 8, 2026",
    readTime: "4 min read",
  },
  {
    id: "blog-3",
    title: "How to Plan a Perfect Getaway",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    date: "May 2, 2026",
    readTime: "3 min read",
  },
];

export default function HomeBoutique() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Booking Form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [rooms, setRooms] = useState("");

  // Interactive Modals State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleQuickBook = (room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleSearchAvailability = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      showToast("Please select check-in and check-out dates.");
      return;
    }
    if (!guests) {
      showToast("Please select the number of guests.");
      return;
    }
    if (!rooms) {
      showToast("Please select the number of rooms.");
      return;
    }
    setSelectedRoom({
      title: "Boutique Coastal Suite",
      price: 24999,
      dates: `${checkIn} to ${checkOut}`,
      guests,
      rooms,
    });
    setIsBookingModalOpen(true);
  };

  const activeHero = HERO_SLIDES[currentSlide];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0a130f] text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1C2E24] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#8E9B82]/40 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-[#C5A880]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 1. BOUTIQUE HERO WITH INTEGRATED FLOATING CARD                             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative min-h-[92vh] lg:min-h-[95vh] flex items-center justify-center py-24 sm:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img src={activeHero.image}
            alt="LuxStay Boutique Hotel"
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

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.1] whitespace-pre-line">
                {activeHero.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl">
                {activeHero.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/rooms"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4E5E4E] hover:bg-[#3d4a3d] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Our Rooms</span>
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

            {/* Right Column: Floating Booking Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-7 sm:p-9 shadow-2xl border border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto lg:ml-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Book Your Stay
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Direct booking with complimentary welcome wine & breakfast.
                    </p>
                  </div>

                  <form onSubmit={handleSearchAvailability} className="space-y-4">
                    {/* Check In / Check Out Grid with react-calendar DateRangePicker */}
                    <DateRangePicker
                      startDate={checkIn}
                      endDate={checkOut}
                      onStartDateChange={(e) => setCheckIn(e.target.value)}
                      onEndDateChange={(e) => setCheckOut(e.target.value)}
                      required
                    />

                    {/* Guests & Rooms */}
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
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-3 text-xs font-medium text-slate-800 dark:text-slate-100 focus:border-[#4E5E4E] focus:outline-hidden appearance-none cursor-pointer"
                          >
                            <option value="">Select Guests</option>
                            <option value="1 Adult">1 Adult</option>
                            <option value="2 Adults">2 Adults</option>
                            <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                            <option value="3+ Guests">3+ Guests</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 pointer-events-none text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Rooms
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-3 text-xs font-medium text-slate-800 dark:text-slate-100 focus:border-[#4E5E4E] focus:outline-hidden appearance-none cursor-pointer"
                          >
                            <option value="">Select Rooms</option>
                            <option value="1 Room">1 Room</option>
                            <option value="2 Rooms">2 Rooms</option>
                            <option value="3+ Rooms">3+ Rooms</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 pointer-events-none text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1C2E24] hover:bg-[#4E5E4E] text-white py-4 px-6 text-xs font-bold uppercase tracking-wider shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <span>Check Availability</span>
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
      {/* 2. FIVE BOUTIQUE PILLARS HIGHLIGHT BAR                                     */}
      {/* -------------------------------------------------------------------------- */}
      <section className="bg-white dark:bg-[#0f1d16] border-y border-stone-200/80 dark:border-slate-800/80 py-10 transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-stone-200 dark:lg:divide-slate-800">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex flex-col items-center text-center px-4 space-y-2 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#4E5E4E] dark:text-[#dfcaa4] group-hover:scale-110 group-hover:bg-[#4E5E4E] group-hover:text-white transition-all duration-300 shadow-xs">
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
      {/* 3. WELCOME TO LUXSTAY (An Idyllic Retreat for Modern Travelers)            */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#0a130f]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4E5E4E] dark:text-[#dfcaa4] block">
                WELCOME TO LUXSTAY
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-slate-900 dark:text-white leading-[1.15]">
                An Idyllic Retreat<br />
                for Modern Travelers
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Nestled in a serene coastal location, LuxStay Boutique Hotel offers a perfect blend of luxury, comfort and personalized hospitality. Whether you're here for a romantic getaway, a family vacation, or a business trip — we make every stay special.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#4E5E4E] hover:bg-[#3d4a3d] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Our Story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* 3 Stats Counters */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200 dark:border-slate-800">
                <div>
                  <span className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white block">
                    <CountUp value="12+" />
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1 block">
                    Years of Hospitality
                  </span>
                </div>

                <div>
                  <span className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white block">
                    <CountUp value={4.8} decimals={1} />
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1 block">
                    Guest Rating
                  </span>
                </div>

                <div>
                  <span className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white block">
                    <CountUp value="10K+" />
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1 block">
                    Happy Guests
                  </span>
                </div>
              </div>
            </div>

            {/* Right Photo with Botanical Aesthetic Art Frame */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-stone-200 dark:border-slate-800 aspect-4/3 relative z-10">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
                  alt="LuxStay Boutique Living Room"
                  className="w-full h-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              </div>

              {/* Botanical Line Art Accent Overlay */}
              <div className="absolute -top-6 -right-6 w-32 h-32 text-[#4E5E4E]/30 pointer-events-none z-0 hidden sm:block">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M50 95 C50 50 85 30 85 10 C65 10 50 35 50 50 C50 35 35 10 15 10 C15 30 50 50 50 95 Z" />
                  <path d="M50 50 C65 40 75 25 75 15" />
                  <path d="M50 50 C35 40 25 25 25 15" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. ELEGANT ROOMS & SUITES (4 Room Cards Grid)                              */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#F5F0EB] dark:bg-[#070e0b]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4E5E4E] dark:text-[#dfcaa4] block">
                OUR ROOMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Elegant Rooms & Suites
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                Thoughtfully designed rooms with modern amenities, plush bedding, and calming views. Choose from our range of rooms and suites.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4E5E4E] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View All Rooms</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOUTIQUE_ROOMS.map((room) => (
              <div
                key={room.id}
                className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all duration-300"
              >
                <div>
                  {/* Image with Badge */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-medium text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {room.badge}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#4E5E4E] dark:group-hover:text-[#dfcaa4] transition-colors">
                      {room.title}
                    </h3>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" /> {room.bed}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="h-3.5 w-3.5" /> {room.size}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Waves className="h-3.5 w-3.5" /> {room.view}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleQuickBook(room)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4E5E4E] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer duration-300"
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
      {/* 5. EXPERIENCES (Unforgettable Moments)                                     */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#1C2E24] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Intro */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#dfcaa4] block">
                EXPERIENCES
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-white leading-[1.15]">
                Unforgettable<br />
                Moments
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
                From sunset cruises to guided tours, our curated experiences help you explore the best of the destination while creating memories that last a lifetime.
              </p>

              <div className="pt-2">
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#4E5E4E] hover:bg-[#3d4a3d] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  <span>Explore All Experiences</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right 4 Tall Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {EXPERIENCES_DATA.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => showToast(`Selected Experience: ${exp.title}`)}
                  className="relative h-72 sm:h-80 rounded-lg overflow-hidden group cursor-pointer shadow-xl border border-white/10 flex flex-col justify-end p-4"
                >
                  <img src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  
                  <div className="relative z-10 space-y-1">
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {exp.title}
                    </h4>
                    <span className="text-[11px] text-[#dfcaa4] block font-medium">
                      {exp.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 6. DINING (A Culinary Journey)                                             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#0a130f]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Dining Panoramic Photo */}
            <div className="lg:col-span-6 rounded-lg overflow-hidden shadow-2xl border border-stone-200 dark:border-slate-800 aspect-4/3">
              <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85"
                alt="Seaside Restaurant Dining"
                className="w-full h-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
            </div>

            {/* Right Column: Content & 3 Features */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4E5E4E] dark:text-[#dfcaa4] block">
                DINING
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-slate-900 dark:text-white leading-[1.15]">
                A Culinary Journey
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Savor exquisite dishes crafted by our talented chefs using the freshest local ingredients. From international favorites to authentic regional flavors, every meal is an experience.
              </p>

              <div className="pt-1">
                <Link
                  to="/services-dining"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4E5E4E] hover:bg-[#3d4a3d] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Dining</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* 3 Dining Pillars */}
              <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F0EB] dark:bg-slate-800 text-[#4E5E4E] dark:text-[#dfcaa4]">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      The Seaside Restaurant
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Continental & Local Cuisine
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F0EB] dark:bg-slate-800 text-[#4E5E4E] dark:text-[#dfcaa4]">
                    <Wine className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      The Lounge Bar
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Signature cocktails & drinks
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F0EB] dark:bg-slate-800 text-[#4E5E4E] dark:text-[#dfcaa4]">
                    <BellRing className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      In-Room Dining
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      24/7 service
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 7. GALLERY (Moments at LuxStay)                                             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#F5F0EB] dark:bg-[#070e0b]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4E5E4E] dark:text-[#dfcaa4] block">
                GALLERY
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Moments at LuxStay
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                Take a look at our collection of moments, spaces and experiences that make LuxStay a truly special place.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4E5E4E] dark:text-[#dfcaa4] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Photo Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxImg(item)}
                className="relative h-64 sm:h-72 rounded-lg overflow-hidden group cursor-pointer shadow-md border border-stone-200 dark:border-slate-800"
              >
                <img src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-medium text-white">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 8. TESTIMONIALS (What Our Guests Say)                                      */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#0a130f]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row with Arrows */}
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4E5E4E] dark:text-[#dfcaa4] block">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                What Our Guests Say
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                Read stories from real guests who made LuxStay their home away from home.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous review"
                className="boutique-reviews-prev h-10 w-10 flex items-center justify-center rounded-lg border border-stone-300 dark:border-slate-700 hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next review"
                className="boutique-reviews-next h-10 w-10 flex items-center justify-center rounded-lg border border-stone-300 dark:border-slate-700 hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Review Slider */}
          <ReviewsSlider
            items={TESTIMONIALS}
            prevEl=".boutique-reviews-prev"
            nextEl=".boutique-reviews-next"
            renderItem={(t) => (
              <div
                className="h-full rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-7 shadow-xs hover:border-[#4E5E4E]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover border border-[#4E5E4E]/30" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
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
      {/* 9. LATEST BLOG (Travel Tips & Hotel Updates)                               */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#1C2E24] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Intro */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#dfcaa4] block">
                LATEST FROM OUR BLOG
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-white leading-[1.15]">
                Travel Tips &<br />
                Hotel Updates
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
                Get inspired with our latest travel tips, destination guides, and special offers.
              </p>

              <div className="pt-2">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4E5E4E] hover:bg-[#3d4a3d] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right 3 Blog Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#4E5E4E] dark:group-hover:text-[#dfcaa4] transition-colors leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {post.date} • {post.readTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 10. VIDEO LIGHTBOX MODAL                                                   */}
      {/* -------------------------------------------------------------------------- */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <span className="text-xs font-bold tracking-wider uppercase text-[#dfcaa4]">
                LuxStay Boutique Experience Tour
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
                title="LuxStay Boutique Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 11. GALLERY LIGHTBOX MODAL                                                 */}
      {/* -------------------------------------------------------------------------- */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 cursor-pointer"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] rounded-lg overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-[#4E5E4E] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <img src={activeLightboxImg.image}
              alt={activeLightboxImg.title}
              className="w-full h-full object-contain max-h-[80vh]" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
            <div className="bg-slate-950/95 p-4 text-white text-center">
              <p className="text-sm font-light">{activeLightboxImg.title}</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={selectedRoom}
      />

    </div>
  );
}
