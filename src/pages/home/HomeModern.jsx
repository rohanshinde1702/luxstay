import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuBed as Bed,
  LuUtensils as Utensils,
  LuWaves as Waves,
  LuDumbbell as Dumbbell,
  LuWifi as Wifi,
  LuFlower2 as Flower2,
  LuMonitor as Monitor,
  LuUsers as Users,
  LuCalendar as Calendar,
  LuChevronDown as ChevronDown,
  LuArrowRight as ArrowRight,
  LuPlay as Play,
  LuX as X,
  LuStar as Star,
  LuCircleCheck as CheckCircle2,
  LuMail as Mail,
  LuSparkles as Sparkles,
  LuMaximize2 as Maximize2
} from "react-icons/lu";
import BookingModal from "../../components/booking/BookingModal";
import ReviewsSlider from "../../components/common/ReviewsSlider";

// --- HERO SLIDES DATA ---
const HERO_SLIDES = [
  {
    id: "slide-1",
    eyebrow: "WELCOME TO SKYLINE HOTEL & SUITES",
    titleMain: "Luxury Stays",
    titleAccent: "Heart of the City",
    desc: "Experience world-class comfort, modern amenities and warm hospitality at our premium city hotel.",
    image: "/images/skyline/hero-rooftop-pool.jpg",
  },
  {
    id: "slide-2",
    eyebrow: "SKYLINE HOTEL & SUITES",
    titleMain: "Panoramic Views",
    titleAccent: "Above the Skyline",
    desc: "Unrivaled high-floor suites with floor-to-ceiling windows and heated rooftop infinity pool.",
    image: "/images/skyline/dining-terrace.jpg",
  },
  {
    id: "slide-3",
    eyebrow: "EXECUTIVE LUXURY LIVING",
    titleMain: "World-Class Dining",
    titleAccent: "Culinary Excellence",
    desc: "Michelin-inspired gastronomy, artisanal cocktails, and private skyline lounge experiences.",
    image: "/images/skyline/dining-restaurant.jpg",
  },
];

// --- 5 FEATURE PILLARS STRIP ---
const FEATURE_PILLARS = [
  {
    id: "rooms",
    icon: Bed,
    title: "Luxury Rooms & Suites",
    desc: "Spacious, stylish and designed for your comfort.",
  },
  {
    id: "dining",
    icon: Utensils,
    title: "Fine Dining",
    desc: "Savor exquisite flavors from our global cuisine.",
  },
  {
    id: "pool",
    icon: Waves,
    title: "Rooftop Pool",
    desc: "Relax, refresh and enjoy stunning city views.",
  },
  {
    id: "fitness",
    icon: Dumbbell,
    title: "Fitness Center",
    desc: "Stay active with our modern gym facilities.",
  },
  {
    id: "wifi",
    icon: Wifi,
    title: "Free High-Speed WiFi",
    desc: "Stay connected throughout your stay.",
  },
];

// --- OUR ROOMS DATA ---
const ROOMS_DATA = [
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    image: "/images/skyline/room-deluxe.jpg",
    bed: "King Bed",
    guests: "2 Guests",
    size: "28 m²",
    price: 8999,
  },
  {
    id: "executive-room",
    title: "Executive Room",
    image: "/images/skyline/room-executive.jpg",
    bed: "King Bed",
    guests: "2 Guests",
    size: "36 m²",
    price: 14999,
  },
  {
    id: "premium-suite",
    title: "Premium Suite",
    image: "/images/skyline/room-suite.jpg",
    bed: "King Bed",
    guests: "4 Guests",
    size: "60 m²",
    price: 24999,
  },
];

// --- WORLD-CLASS AMENITIES DATA ---
const AMENITIES_DATA = [
  { id: "pool", icon: Waves, title: "Swimming Pool" },
  { id: "spa", icon: Flower2, title: "Spa & Wellness" },
  { id: "gym", icon: Dumbbell, title: "Fitness Center" },
  { id: "dining", icon: Utensils, title: "Fine Dining" },
  { id: "business", icon: Monitor, title: "Business Center" },
  { id: "meetings", icon: Users, title: "Meeting Rooms" },
];

// --- SPECIAL OFFERS DATA ---
const SPECIAL_OFFERS = [
  {
    id: "weekend-getaway",
    badge: "UP TO 20% OFF",
    title: "Weekend Getaway",
    subtitle: "Relax. Recharge. Repeat.",
    price: "$6,999",
    priceNum: 6999,
    image: "/images/skyline/offer-weekend.jpg",
  },
  {
    id: "city-explorer",
    badge: "DISCOVER MORE",
    title: "City Explorer Package",
    subtitle: "Stay + Breakfast + City Tour",
    price: "$8,999",
    priceNum: 8999,
    image: "/images/skyline/offer-city-explorer.jpg",
  },
  {
    id: "romantic-escape",
    badge: "LIMITED TIME",
    title: "Romantic Escape",
    subtitle: "Special setup & candlelight dinner",
    price: "$9,999",
    priceNum: 9999,
    image: "/images/skyline/offer-romantic-escape.jpg",
  },
];

// --- TESTIMONIALS DATA ---
const TESTIMONIALS_DATA = [
  {
    id: "t-1",
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "Absolutely loved my stay! The rooms were spotless, the staff was courteous and the location is perfect for both work and leisure.",
  },
  {
    id: "t-2",
    name: "Rahul Mehta",
    location: "Delhi, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "Great experience! The rooftop pool and dining were the highlights of our trip. Will definitely come back again.",
  },
  {
    id: "t-3",
    name: "Sneha Kapoor",
    location: "Bangalore, India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "One of the best hotels I've stayed at. Comfortable rooms, delicious food and amazing service.",
  },
  {
    id: "t-4",
    name: "Vikram Malhotra",
    location: "Hyderabad, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Ideal for business travel — fast Wi-Fi, a quiet executive lounge and a skyline view that makes late-night calls bearable.",
  },
  {
    id: "t-5",
    name: "Neha Joshi",
    location: "Ahmedabad, India",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "Our weekend getaway was perfect. The rooftop dinner at sunset and the plush suite made it feel like a true city escape.",
  },
];

export default function HomeModern() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [roomType, setRoomType] = useState("");

  // Newsletter & Modals
  const [email, setEmail] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      showToast("Please select check-in and check-out dates.");
      return;
    }
    if (!guests) {
      showToast("Please select the number of guests.");
      return;
    }
    if (!roomType) {
      showToast("Please select a room type.");
      return;
    }
    setSelectedRoom({
      id: `modern-${roomType.toLowerCase().replace(/\s+/g, "-")}`,
      name: `${roomType} Skyline Sanctuary`,
      title: `${roomType} Skyline Sanctuary`,
      category: "Skyline Suite",
      price: roomType === "Premium Suite" ? 24999 : roomType === "Executive Room" ? 14999 : 8999,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      beds: "1 King Bed • High Floor",
      size: "82 m² / 880 sq ft",
      tagline: "Panoramic floor-to-ceiling city skyline views with private lounge access",
      dates: `${checkIn} - ${checkOut}`,
      guests,
    });
    setIsBookingModalOpen(true);
  };

  const handleBookRoom = (room) => {
    setSelectedRoom({
      ...room,
      name: room.name || room.title,
      price: room.price || room.priceNum || 18999,
      image: room.image || (Array.isArray(room.images) && room.images[0]) || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      category: room.category || "Luxury Suite",
      beds: room.beds || "King Bed",
      size: room.size || "75 m²",
      tagline: room.tagline || room.description || "Executive sanctuary with bespoke amenities",
    });
    setIsBookingModalOpen(true);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast("Thank you for subscribing to Skyline Hotel & Suites!");
      setEmail("");
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#070e14] text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300 font-sans">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0B131B] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-[#D4B68A]/40 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-[#D4B68A]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Sunset Skyline Infinity Pool Backdrop + Availability Card) */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center py-24 sm:py-32">
        {/* Background Image Carousel with Smooth Crossfade */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
            >
              <img src={slide.image}
                alt={slide.titleMain}
                className="w-full h-full object-cover object-center" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
              {/* Dark Gradient Vignettes for Clear Typography & Sunset Horizon */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B131B]/90 via-[#0B131B]/50 to-[#0B131B]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B131B]/90 via-transparent to-[#0B131B]/30" />
            </div>
          ))}
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-white">
              {/* Eyebrow */}
              <span className="text-xs font-semibold tracking-[0.25em] text-[#D8B17A] uppercase block">
                {activeSlide.eyebrow}
              </span>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.1]">
                {activeSlide.titleMain}<br />
                <span className="font-normal text-white">
                  in the{" "}
                  <span className="font-serif italic text-[#D8B17A] drop-shadow-md">
                    {activeSlide.titleAccent}
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl">
                {activeSlide.desc}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleBookRoom({ title: "Skyline Luxury Stay", price: 14999 })}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D4B68A] hover:bg-[#c5a477] text-slate-950 px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>BOOK YOUR STAY</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-3 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3.5 text-xs font-semibold text-white transition-all duration-300 cursor-pointer"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-950">
                    <Play className="h-2.5 w-2.5 fill-slate-950 ml-0.5" />
                  </span>
                  <span>WATCH VIDEO</span>
                </button>
              </div>

              {/* Slide Number Indicators */}
              <div className="pt-8 flex items-center gap-3 text-xs tracking-widest text-slate-300 font-medium">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`transition-all duration-300 flex items-center gap-2 cursor-pointer ${i === currentSlide ? "text-[#D8B17A] font-bold" : "text-white/60 hover:text-white"
                      }`}
                  >
                    <span>0{i + 1}</span>
                    <span
                      className={`h-[2px] transition-all duration-300 ${i === currentSlide ? "w-8 bg-[#D8B17A]" : "w-3 bg-white/30"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Floating Check Availability Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-2xl border border-slate-100 max-w-md mx-auto lg:ml-auto text-slate-900">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Check Availability
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-light">
                      Plan your perfect stay with us
                    </p>
                  </div>

                  <form onSubmit={handleSearch} className="space-y-4">
                    {/* Check In / Out Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Check In */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-600">
                          Check In
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Check-in Date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-[#D4B68A] focus:outline-hidden pr-8"
                          />
                          <Calendar className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Check Out */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-600">
                          Check Out
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Check-out Date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-[#D4B68A] focus:outline-hidden pr-8"
                          />
                          <Calendar className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Guests & Room Type */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Guests */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-600">
                          Guests
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-[#D4B68A] focus:outline-hidden appearance-none cursor-pointer pr-8"
                          >
                            <option value="" disabled hidden>Select Guests</option>
                            <option value="1 Adult">1 Adult</option>
                            <option value="2 Adults">2 Adults</option>
                            <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                            <option value="4 Guests">4 Guests</option>
                          </select>
                          <Users className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Room Type */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-600">
                          Room Type
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-[#D4B68A] focus:outline-hidden appearance-none cursor-pointer pr-8"
                          >
                            <option value="" disabled hidden>Select Room Type</option>
                            <option value="Deluxe Room">Deluxe Room</option>
                            <option value="Executive Room">Executive Room</option>
                            <option value="Premium Suite">Premium Suite</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0B131B] hover:bg-[#162534] text-white py-3.5 px-6 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <span>CHECK AVAILABILITY</span>
                        <ArrowRight className="h-3.5 w-3.5" />
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
      {/* 2. FIVE FEATURE PILLARS HIGHLIGHT STRIP                                     */}
      {/* -------------------------------------------------------------------------- */}
      <section className="bg-white dark:bg-[#0b141c] border-b border-stone-200/80 dark:border-slate-800/80 py-10 transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-stone-200 dark:lg:divide-slate-800">
            {FEATURE_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex flex-col items-center text-center px-4 space-y-2 group">
                  <div className="text-[#C89D5C] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 stroke-[1.2]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-[210px]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. OUR ROOMS (Elegant Rooms for Every Traveler)                            */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#070e14]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D5C] block">
                  OUR ROOMS
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-slate-900 dark:text-white leading-[1.15]">
                  Elegant Rooms<br />
                  for Every Traveler
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                From cozy Deluxe Rooms to lavish Suites, our accommodations are designed to offer the perfect blend of style, comfort and modern luxury.
              </p>

              <div className="pt-2">
                <Link
                  to="/rooms"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#997548] hover:bg-[#7c5e3c] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>VIEW ALL ROOMS</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Room Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROOMS_DATA.map((room) => (
                <div
                  key={room.id}
                  className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all duration-300"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative h-56 overflow-hidden">
                      <img src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    </div>

                    {/* Room Info */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {room.title}
                      </h3>

                      {/* Specs Row */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5" /> {room.bed}
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {room.guests}
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                          <Maximize2 className="h-3.5 w-3.5" /> {room.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleBookRoom(room)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#997548] dark:text-[#D8B17A] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer duration-300"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. WORLD-CLASS AMENITIES (Dark Luxury Gym/Spa Backdrop + 6 Glass Cards)    */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-28 overflow-hidden bg-[#0B131B] text-white">
        {/* Subtle Luxury Fitness / Lounge Backdrop */}
        <div className="absolute inset-0 z-0">
          <img src="/images/skyline/hero-rooftop-pool.jpg"
            alt="Skyline Amenities"
            className="w-full h-full object-cover opacity-15 filter blur-xs" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
          <div className="absolute inset-0 bg-[#0B131B]/95" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D8B17A] block">
                  WORLD-CLASS AMENITIES
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-white leading-[1.15]">
                  Everything You Need<br />
                  for a Perfect Stay
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md">
                Unwind, stay active or get productive — our hotel offers premium facilities for a seamless and memorable experience.
              </p>

              <div className="pt-2">
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D4B68A] hover:bg-[#c5a477] text-slate-950 px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  <span>EXPLORE ALL AMENITIES</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: 6 Amenity Cards (3x2 Grid) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {AMENITIES_DATA.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={amenity.id}
                    className="flex flex-col items-center justify-center p-7 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-md text-white shadow-lg transition-all duration-300 group border border-white/10 text-center space-y-3 cursor-pointer"
                    onClick={() => showToast(`Selected Amenity: ${amenity.title}`)}
                  >
                    <div className="text-[#D8B17A] transition-transform">
                      <Icon className="h-6 w-6 stroke-[1.4]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">
                      {amenity.title}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 5. SPECIAL OFFERS (Make Your Stay More Special)                            */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#070e14]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D5C] block">
                  SPECIAL OFFERS
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-slate-900 dark:text-white leading-[1.15]">
                  Make Your Stay<br />
                  More Special
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Enjoy exclusive deals, seasonal offers and special packages for a memorable experience at Skyline Hotel & Suites.
              </p>

              <div className="pt-2">
                <Link
                  to="/offers"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#997548] hover:bg-[#7c5e3c] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>VIEW OFFERS</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Special Offer Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPECIAL_OFFERS.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all duration-300"
                >
                  <div>
                    {/* Image with Top-Left Badge */}
                    <div className="relative h-52 overflow-hidden">
                      <img src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                      <span className="absolute top-3 left-3 bg-[#0B131B]/85 backdrop-blur-md text-[#D8B17A] font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm border border-white/10">
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#C89D5C] transition-colors">
                        {pkg.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                        {pkg.subtitle}
                      </p>

                      {/* Price */}
                      <div className="pt-2">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          From{" "}
                        </span>
                        <span className="text-base font-bold text-slate-900 dark:text-white">
                          {pkg.price}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">
                          / night
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Book Action */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleBookRoom(pkg)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#997548] dark:text-[#D8B17A] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer duration-300"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 6. DINING (A Culinary Journey - Panoramic Left + Center + Mosaic Right)     */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#0B131B] text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Large High-Floor Panoramic Restaurant Photo */}
            <div className="lg:col-span-4 rounded-lg overflow-hidden shadow-2xl h-80 sm:h-96 lg:h-[440px]">
              <img src="/images/skyline/dining-restaurant.jpg"
                alt="Skyline Fine Dining Restaurant"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
            </div>

            {/* Middle: Culinary Journey Text & CTA */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D8B17A] block">
                  DINING
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                  A Culinary Journey
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Indulge in a world of flavors at our signature restaurant, where every dish tells a story.
              </p>

              <div className="pt-2">
                <Link
                  to="/services-dining"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 hover:border-[#D4B68A] hover:bg-[#D4B68A] hover:text-slate-950 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <span>EXPLORE DINING</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: 4-Item Food & Rooftop Mosaic Grid */}
            <div className="lg:col-span-5 space-y-4">
              {/* Top Row: Steak (Left) + Rooftop Terrace (Right) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md h-36 sm:h-44">
                  <img src="/images/skyline/dining-steak.jpg"
                    alt="Gourmet Steak"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md h-36 sm:h-44">
                  <img src="/images/skyline/dining-terrace.jpg"
                    alt="Rooftop Dining Terrace"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                </div>
              </div>

              {/* Bottom Row: Coffee + Dessert + Fresh Salad (3 Columns) */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md h-28 sm:h-32">
                  <img src="/images/skyline/dining-coffee.jpg"
                    alt="Artisanal Coffee"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md h-28 sm:h-32">
                  <img src="/images/skyline/dining-dessert.jpg"
                    alt="Gourmet Plated Dessert"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md h-28 sm:h-32">
                  <img src="/images/skyline/dining-salad.jpg"
                    alt="Fresh Artisan Salad"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 7. TESTIMONIALS (What Our Guests Say)                                      */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#070e14]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C89D5C] block">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                What Our Guests Say
              </h2>
            </div>

            <Link
              to="/testimonials"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#997548] dark:text-[#D8B17A] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View All Reviews</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Testimonial Slider */}
          <ReviewsSlider
            items={TESTIMONIALS_DATA}
            renderItem={(rev) => (
              <div
                className="h-full rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-7 border hover:border-[#C89D5C]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Author Info & Rating */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar}
                      alt={rev.name}
                      className="h-10 w-10 rounded-full object-cover border border-[#D4B68A]/30" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {rev.name}
                      </h4>
                      <div className="flex items-center gap-1 text-amber-500 pt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Location Footer */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  <span>{rev.location}</span>
                </div>
              </div>
            )}
          />

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 8. NEWSLETTER BANNER (Stay in Touch)                                       */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-12 bg-[#0B131B] text-white border-t border-slate-800/80">
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* Left: Icon & Text */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-[#D8B17A] shrink-0 border border-white/10">
                <Mail className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Stay in Touch
                </h3>
                <p className="text-xs text-slate-400 font-light">
                  Get exclusive offers, travel tips and updates.
                </p>
              </div>
            </div>

            {/* Right: Email Input & Subscribe Button */}
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-[#D4B68A]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#D4B68A] hover:bg-[#c5a477] text-slate-950 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 9. WATCH VIDEO MODAL                                                       */}
      {/* -------------------------------------------------------------------------- */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white bg-slate-950/90">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#D4B68A] animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-[#D4B68A]">
                  Skyline Hotel & Suites • Rooftop & City Tour
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-slate-950 flex items-center justify-center">
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
                poster="/images/skyline/hero-rooftop-pool.jpg"
              >
                <source src="/videos/coastal-aerial-sunset.mp4" type="video/mp4" />
                <source src="https://videos.pexels.com/video-files/1409899/1409899-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
