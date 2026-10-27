import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LuWaves as Waves,
  LuFlower2 as Flower2,
  LuShieldCheck as ShieldCheck,
  LuHeadphones as Headphones,
  LuArrowRight as ArrowRight,
  LuPlay as Play,
  LuX as X,
  LuStar as Star,
  LuCircleCheck as CheckCircle2,
  LuBed as Bed,
  LuUsers as Users,
  LuMaximize2 as Maximize2,
  LuHeart as Heart
} from "react-icons/lu";
import BookingModal from "../../components/booking/BookingModal";
import ExperienceModal from "../../components/home/ExperienceModal";
import ReviewsSlider from "../../components/common/ReviewsSlider";
import CountUp from "../../components/common/CountUp";
import { BEACH_EXPERIENCES_DATA } from "../../data/experiences";

// --- 4 BENEFITS DATA ---
const BENEFITS_LIST = [
  {
    id: "beach",
    icon: Waves,
    title: "Private Beach Access",
    desc: "Step directly into paradise",
  },
  {
    id: "amenities",
    icon: Flower2,
    title: "World-Class Amenities",
    desc: "Relax, Rejuvenate, Repeat",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Safe & Secure",
    desc: "Your comfort is our priority",
  },
  {
    id: "support",
    icon: Headphones,
    title: "24/7 Support",
    desc: "Always here for you",
  },
];

// --- 4 ROOMS & VILLAS DATA ---
const ROOMS_DATA = [
  {
    id: "ocean-view-room",
    title: "Ocean View Room",
    badge: "BEST SELLER",
    badgeStyle: "bg-[#C5A880] text-slate-950",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "32 m²",
    desc: "Wake up to breathtaking ocean views from your private balcony.",
    price: "₹ 12,999",
    priceNum: 12999,
  },
  {
    id: "water-villa",
    title: "Water Villa",
    badge: "PREMIUM",
    badgeStyle: "bg-[#08201E] text-[#D4B68A] border border-[#D4B68A]/30",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "45 m²",
    desc: "Stay above the turquoise waters with direct lagoon access.",
    price: "₹ 18,999",
    priceNum: 18999,
  },
  {
    id: "family-suite",
    title: "Family Suite",
    badge: "FAMILY",
    badgeStyle: "bg-[#3D5245] text-white",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    guests: "4 Guests",
    bed: "2 King Beds",
    size: "60 m²",
    desc: "Spacious suites perfect for families and groups.",
    price: "₹ 24,999",
    priceNum: 24999,
  },
  {
    id: "private-pool-villa",
    title: "Private Pool Villa",
    badge: "LUXURY",
    badgeStyle: "bg-[#0B2523] text-[#D4B68A] border border-[#D4B68A]/40",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "80 m²",
    desc: "Ultimate privacy with your own pool and garden.",
    price: "₹ 34,999",
    priceNum: 34999,
  },
];

// --- 4 EXPERIENCES DATA ---
const EXPERIENCES_DATA = BEACH_EXPERIENCES_DATA;

// --- 5 GALLERY STRIP PHOTOS ---
const GALLERY_PHOTOS = [
  {
    id: "gal-1",
    title: "Aerial Beach & Turquoise Waters",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-2",
    title: "Resort Infinity Pool & Umbrellas",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-3",
    title: "Candlelit Sunset Beach Dinner",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-4",
    title: "Beachfront Open-Air Dining Terrace",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-5",
    title: "Sunset Tropical Cocktails on the Shore",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
  },
];

// --- 5 TESTIMONIALS DATA ---
const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "The most beautiful resort I've ever stayed at! The beach, the food, the entire experience was just magical. Can't wait to visit again!",
  },
  {
    id: "t-2",
    name: "Arjun Mehta",
    location: "Bangalore, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "Perfect place to unwind and relax. The staff was super friendly and the views are out of this world. Highly recommended!",
  },
  {
    id: "t-3",
    name: "Sneha Kapoor",
    location: "Delhi, India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "LuxStay is a slice of heaven. Everything was top-notch — from the rooms to the food. Truly a memorable experience!",
  },
  {
    id: "t-4",
    name: "Rohan Verma",
    location: "Pune, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Waking up to the sound of waves every morning was unreal. The sunset dinner on the beach was the highlight of our anniversary trip!",
  },
  {
    id: "t-5",
    name: "Ananya Iyer",
    location: "Chennai, India",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "The spa treatments and the infinity pool were pure bliss. Our kids loved the beach activities. We've already booked our next stay!",
  },
];

export default function HomeBeach() {
  // Modal & Video Lightbox State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback handled gracefully
      });
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleBookRoom = (room) => {
    setSelectedRoom({
      title: room.title,
      price: room.priceNum || 18999,
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#071114] text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#08201E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#D4B68A]/40 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-[#D4B68A]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Escape to Paradise - Cinematic Aerial Resort Video)       */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center overflow-hidden py-28 sm:py-36">
        {/* Full-bleed Aerial Drone Resort & Calm Ocean Looping Video Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
            className="w-full h-full object-cover object-center scale-105 filter brightness-100 transition-transform duration-1000"
          >
            <source
              src="/videos/coastal-aerial-sunset.mp4"
              type="video/mp4"
            />
            <source
              src="/videos/drone-sunset-glide.mp4"
              type="video/mp4"
            />
            <source
              src="https://videos.pexels.com/video-files/1409899/1409899-uhd_3840_2160_25fps.mp4"
              type="video/mp4"
            />
            <source
              src="/videos/golden-sunset-waves.mp4"
              type="video/mp4"
            />
            {/* Fallback Image */}
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
              alt="LuxStay Luxury Beachfront Sunset Coast Drone"
              className="w-full h-full object-cover object-center"
            />
          </video>

          {/* Cinematic Dual-Tone Vignette Gradients for Crystal-Clear Text Legibility & Sunset Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6 text-white">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#E0C9A6] uppercase block">
                LUXURY • NATURE • YOU
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/40 backdrop-blur-md px-3 py-0.5 text-[10px] font-medium text-slate-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B68A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4B68A]"></span>
                </span>
                <span>Live Ocean Waves & Coral Coast</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.1]">
              Escape to<br />
              <span className="font-serif italic font-normal text-[#D4B68A] drop-shadow-md">
                Paradise
              </span>
            </h1>

            {/* Subparagraph */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl">
              Experience the perfect blend of luxury, comfort and nature at our beachfront resort. Wake up to the sound of waves, and let the ocean heal your soul.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Explore Rooms</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-md px-7 py-4 text-xs font-semibold text-white transition-all duration-300 cursor-pointer"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-950">
                  <Play className="h-2.5 w-2.5 fill-slate-950 ml-0.5" />
                </span>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 text-white/70 text-[10px] tracking-widest uppercase font-medium">
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#D4B68A] rounded-full animate-bounce" />
          </div>
          <span>Scroll Down</span>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. QUICK BENEFITS STRIP                                                    */}
      {/* -------------------------------------------------------------------------- */}
      <section className="bg-white dark:bg-[#0c1b19] border-b border-stone-200/80 dark:border-slate-800/80 py-10 transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-stone-200 dark:lg:divide-slate-800">
            {BENEFITS_LIST.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-4 px-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] dark:bg-slate-800 text-[#08201E] dark:text-[#D4B68A] group-hover:bg-[#08201E] group-hover:text-[#D4B68A] transition-all duration-300 shadow-xs shrink-0">
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. WELCOME / ABOUT SECTION (Your Perfect Beachfront Getaway)                */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-serif italic text-2xl text-[#8E7958] dark:text-[#D4B68A] block">
                Welcome to LuxStay
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-slate-900 dark:text-white leading-[1.15]">
                Your Perfect<br />
                Beachfront Getaway
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                At LuxStay, we believe in creating unforgettable experiences. Our resort offers a perfect blend of modern luxury and natural beauty, with direct access to a pristine beach, world-class amenities and warm hospitality.
              </p>

              <div className="pt-2 flex items-center gap-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#08201E] hover:bg-[#123633] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Our Story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <span className="font-serif italic text-sm text-[#8E7958] dark:text-[#D4B68A] inline-flex items-center gap-1.5">
                  <span>Made for beach lovers</span>
                  <Heart className="h-3.5 w-3.5 fill-[#8E7958] text-[#8E7958] dark:fill-[#D4B68A] dark:text-[#D4B68A]" />
                </span>
              </div>
            </div>

            {/* Right Editorial Image Collage */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Main Large Beach House Photo (Takes exact same height as the right column) */}
              <div className="sm:col-span-7 rounded-lg overflow-hidden shadow-xl h-64 sm:h-full">
                <img
                  src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury Beach House on the Sand"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Right 2 Stacked Beach House Photos */}
              <div className="sm:col-span-5 flex flex-col gap-4">
                <div className="rounded-lg overflow-hidden shadow-md h-48 sm:h-52">
                  <img
                    src="https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Tropical Beach Bungalow & Lagoon"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md h-48 sm:h-52">
                  <img
                    src="https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Luxury Oceanfront Coastal Beach Villa"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. ROOMS & VILLAS (Luxury Stays)                                           */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#F5F0EB] dark:bg-[#070e0b]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#08201E] dark:text-[#D4B68A] block">
                LUXURY STAYS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Our Rooms & Villas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl pt-1">
                Thoughtfully designed spaces with modern amenities and stunning views. Choose from our range of rooms and private villas.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#08201E] dark:text-[#D4B68A] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View All Rooms</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS_DATA.map((room) => (
              <div
                key={room.id}
                className="group flex flex-col justify-between rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-all duration-300"
              >
                <div>
                  {/* Image with Badge */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className={`absolute top-3.5 left-3.5 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-md shadow-md ${room.badgeStyle}`}>
                      {room.badge}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#08201E] dark:group-hover:text-[#D4B68A] transition-colors">
                      {room.title}
                    </h3>

                    {/* Specs Row */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {room.guests}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" /> {room.bed}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="h-3.5 w-3.5" /> {room.size}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed line-clamp-2">
                      {room.desc}
                    </p>

                    {/* Price */}
                    <div className="pt-2">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {room.price}
                      </span>
                      <span className="text-[11px] text-slate-400"> / night</span>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleBookRoom(room)}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#08201E] hover:bg-[#123633] text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 5. EXPERIENCES (More Than Just a Stay)                                     */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-28 overflow-hidden bg-[#08201E] text-white">
        {/* Ocean Lagoon Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
            alt="Ocean Experiences Lagoon"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#08201E]/95 via-[#08201E]/85 to-[#08201E]/70" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4B68A] block">
                UNFORGETTABLE EXPERIENCES
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight">
                More Than Just a Stay
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light pt-1 leading-relaxed">
                From thrilling water sports to relaxing spa sessions, create memories that last a lifetime.
              </p>
            </div>

            <Link
              to="/tours"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer shrink-0"
            >
              <span>Explore All Experiences</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 4 Image-Based Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCES_DATA.map((exp) => (
              <div
                key={exp.id}
                onClick={() => {
                  setSelectedExperience(exp);
                  setIsExpModalOpen(true);
                }}
                className="group relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-xl border border-white/10 flex flex-col justify-end p-6 transition-all duration-300 hover:border-[#D4B68A]/50 hover:shadow-2xl"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/50 to-transparent group-hover:from-slate-950/98 group-hover:via-slate-950/60 transition-colors duration-500" />

                <div className="relative z-10 space-y-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-[#D4B68A] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2">
                    {exp.desc}
                  </p>

                  {/* Subtle Luxury Reveal on Hover */}
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D4B68A] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore Experience</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 6. GALLERY (Moments at LuxStay)                                             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-white dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#08201E] dark:text-[#D4B68A] block">
                GALLERY
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                Moments at LuxStay
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light pt-1">
                A glimpse of the paradise that awaits you.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#08201E] dark:text-[#D4B68A] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 5-Photo Panoramic Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActiveLightboxImg(photo)}
                className="relative h-60 sm:h-72 rounded-lg overflow-hidden group cursor-pointer shadow-md border border-stone-200 dark:border-slate-800"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-medium text-white">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 7. TESTIMONIALS (What Our Guests Say)                                      */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#071114]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row with Rating Badge */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                What Our Guests Say
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light pt-1">
                Real stories from real people who experienced the magic of LuxStay.
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                ))}
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 ml-1">
                  <CountUp value={4.9} decimals={1} />/5
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Based on <CountUp value="1,500+" /> reviews
              </span>
            </div>
          </div>

          {/* Testimonial Slider */}
          <ReviewsSlider
            items={TESTIMONIALS}
            renderItem={(t) => (
              <div
                className="h-full rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-7 shadow-xs hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover border border-[#C5A880]/30"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-1 text-amber-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                  ))}
                </div>
              </div>
            )}
          />

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 8. CALL TO ACTION (Book Your Dream Getaway Today)                          */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-24 sm:py-28 overflow-hidden bg-[#08201E] text-white">
        {/* Cinematic Looping Sea Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
            className="w-full h-full object-cover object-bottom scale-105 filter brightness-95"
          >
            <source src="/videos/blue-sky-over-blue-sea.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/10782300/10782300-hd_1920_1080_30fps.mp4" type="video/mp4" />
            <source src="/videos/golden-sunset-waves.mp4" type="video/mp4" />
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
              alt="Blue Sky Over Blue Sea"
              className="w-full h-full object-cover opacity-50"
            />
          </video>
          {/* Dual Overlay Gradients for Perfect Text Contrast & Sea Visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08201E]/95 via-[#08201E]/75 to-[#08201E]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08201E]/80 via-transparent to-[#08201E]/50" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4B68A] block">
                READY FOR YOUR NEXT ADVENTURE?
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                Book Your Dream Getaway Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Experience luxury, nature and tranquility — all in one place.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedRoom({
                      id: "beachfront-retreat",
                      slug: "beachfront-retreat",
                      name: "Beachfront Getaway Retreat",
                      title: "Beachfront Getaway Retreat",
                      category: "Presidential Beach Villa",
                      price: 24999,
                      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
                      beds: "1 King Bed • Oceanfront",
                      size: "95 m² / 1,020 sq ft",
                      tagline: "Panoramic Indian Ocean views, private plunge pool, and dedicated butler service"
                    });
                    setIsBookingModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#08201E] hover:bg-[#123633] text-white border border-[#D4B68A]/40 px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Handwritten Decorative Script */}
            <div className="hidden lg:block text-right pr-8">
              <p className="font-serif italic text-3xl text-white/90 drop-shadow-md flex items-center justify-end gap-2">
                <span>See you at the beach</span>
                <Heart className="h-6 w-6 fill-[#D4B68A] text-[#D4B68A] inline" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 9. VIDEO MODAL (Hero Cinematic Video Player)                                */}
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
                  LuxStay Beach Resort • Cinematic Hero Video Tour
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
                poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
              >
                <source src="/videos/coastal-aerial-sunset.mp4" type="video/mp4" />
                <source src="/videos/drone-sunset-glide.mp4" type="video/mp4" />
                <source src="https://videos.pexels.com/video-files/1409899/1409899-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                <source src="/videos/golden-sunset-waves.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 10. GALLERY LIGHTBOX MODAL                                                 */}
      {/* -------------------------------------------------------------------------- */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 cursor-pointer"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] rounded-lg overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-[#D4B68A] hover:text-slate-950 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={activeLightboxImg.image}
              alt={activeLightboxImg.title}
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <div className="bg-slate-950/95 p-4 text-white text-center">
              <p className="text-sm font-light">{activeLightboxImg.title}</p>
            </div>
          </div>
        </div>
      )}

      {/* Experience Details Modal */}
      <ExperienceModal
        isOpen={isExpModalOpen}
        onClose={() => setIsExpModalOpen(false)}
        experience={selectedExperience}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={selectedRoom}
      />

    </div>
  );
}
