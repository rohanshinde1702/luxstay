import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuCrown as Crown,
  LuLandmark as Landmark,
  LuSparkles as Sparkles,
  LuShieldCheck as ShieldCheck,
  LuHeadphones as Headphones,
  LuArrowRight as ArrowRight,
  LuPlay as Play,
  LuX as X,
  LuStar as Star,
  LuCircleCheck as CheckCircle2,
  LuUtensils as Utensils,
  LuGlobe as Globe,
  LuFlame as Flame,
  LuShip as Ship,
  LuCompass as Compass,
  LuHeart as Heart,
  LuBed as Bed,
  LuUsers as Users,
  LuMaximize2 as Maximize2
} from "react-icons/lu";
import BookingModal from "../../components/booking/BookingModal";
import ReviewsSlider from "../../components/common/ReviewsSlider";

// --- 4 HERITAGE PILLARS DATA ---
const HERITAGE_PILLARS = [
  {
    id: "arch",
    icon: Landmark,
    title: "Heritage Architecture",
    desc: "Step into centuries of royal history",
  },
  {
    id: "comforts",
    icon: Sparkles,
    title: "Modern Comforts",
    desc: "Luxury in every detail",
  },
  {
    id: "privacy",
    icon: ShieldCheck,
    title: "Exclusive Privacy",
    desc: "Your comfort, our priority",
  },
  {
    id: "concierge",
    icon: Headphones,
    title: "24/7 Concierge",
    desc: "Always here for you",
  },
];

// --- 4 LUXURY ROOMS & SUITES DATA ---
const ROYAL_ROOMS_DATA = [
  {
    id: "royal-heritage-suite",
    title: "Royal Heritage Suite",
    badge: "Heritage Suite",
    badgeStyle: "bg-[#8A6D3B] text-white",
    image: "/images/heritage/royal-heritage-suite.jpg",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "45 m²",
    desc: "Elegant suite with classic interiors, private balcony and lake views.",
    price: "₹ 18,999",
    priceNum: 18999,
  },
  {
    id: "imperial-pool-villa",
    title: "Imperial Pool Villa",
    badge: "Private Pool",
    badgeStyle: "bg-[#1B302B] text-[#D4B68A] border border-[#D4B68A]/30",
    image: "/images/heritage/imperial-pool-villa.jpg",
    guests: "4 Guests",
    bed: "2 King Beds",
    size: "90 m²",
    desc: "Spacious villa with private pool, garden and outdoor lounge.",
    price: "₹ 34,999",
    priceNum: 34999,
  },
  {
    id: "royal-lake-view-suite",
    title: "Royal Lake View Suite",
    badge: "Lake View",
    badgeStyle: "bg-[#0E2A38] text-[#D4B68A] border border-[#D4B68A]/30",
    image: "/images/heritage/royal-lake-view-suite.jpg",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "60 m²",
    desc: "Panoramic lake views with luxury amenities and private deck.",
    price: "₹ 24,999",
    priceNum: 24999,
  },
  {
    id: "maharaja-palace-suite",
    title: "Maharaja Palace Suite",
    badge: "Palace Suite",
    badgeStyle: "bg-[#2A1E14] text-[#E0C9A6] border border-[#E0C9A6]/40",
    image: "/images/heritage/maharaja-palace-suite.jpg",
    guests: "4 Guests",
    bed: "2 King Beds",
    size: "120 m²",
    desc: "A royal experience with grand interiors, private lounge and heritage views.",
    price: "₹ 44,999",
    priceNum: 44999,
  },
];

// --- 4 EXPERIENCES DATA ---
const EXPERIENCES_DATA = [
  {
    id: "exp-1",
    title: "Heritage Walks",
    desc: "Explore royal palaces & forts.",
    image: "/images/heritage/heritage-walks.jpg",
  },
  {
    id: "exp-2",
    title: "Cultural Performances",
    desc: "Experience local traditions.",
    image: "/images/heritage/cultural-dance.jpg",
  },
  {
    id: "exp-3",
    title: "Boat Rides",
    desc: "See the beauty from the lake.",
    image: "/images/heritage/lake-palace.jpg",
  },
  {
    id: "exp-4",
    title: "Spa & Wellness",
    desc: "Relax & rejuvenate.",
    image: "/images/heritage/heritage-spa.jpg",
  },
];

// --- 5 TESTIMONIALS DATA ---
const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "The most beautiful resort I've ever stayed at! The royal ambiance, food and service were absolutely perfect. Can't wait to visit again!",
  },
  {
    id: "t-2",
    name: "Arjun Mehta",
    location: "Bangalore, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "A truly special place. The heritage architecture, modern comforts and warm hospitality made our stay unforgettable.",
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
    name: "Kabir Singh",
    location: "Jaipur, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "The candlelit courtyard dinner and the moody, elegant suites felt straight out of a film. Pure understated luxury.",
  },
  {
    id: "t-5",
    name: "Meera Nair",
    location: "Kochi, India",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "Impeccable attention to detail. From the welcome ritual to the late-night lounge, every moment was crafted with care.",
  },
];

export default function HomeDark() {
  // Modal & Video Lightbox State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleBookRoom = (room) => {
    setSelectedRoom({
      title: room.title,
      price: room.priceNum || 24999,
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="bg-[#070D0F] text-slate-100 min-h-screen font-sans selection:bg-[#D4B68A] selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0E1B1D] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#D4B68A]/40 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-[#D4B68A]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Experience Royal Living)                                  */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center overflow-hidden py-28 sm:py-36 border-b border-white/5">
        {/* Full-bleed Palace Terrace & Lake Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/heritage/hero-palace.jpg"
            alt="LuxStay Royal Heritage Palace Resort"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6 text-white">
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#E0C9A6] uppercase block">
              ROYAL HERITAGE • TIMELESS ELEGANCE
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.1]">
              Experience<br />
              <span className="font-serif italic font-normal text-[#D4B68A] drop-shadow-md">
                Royal Living
              </span>
            </h1>

            {/* Subparagraph */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl">
              Step into a world of timeless elegance and royal heritage. Our luxury resort offers a unique blend of historic charm, modern comfort and breathtaking views.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Explore Our Rooms</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-md px-7 py-4 text-xs font-semibold text-white transition-all duration-300 cursor-pointer"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-950">
                  <Play className="h-2.5 w-2.5 fill-slate-950 ml-0.5" />
                </span>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Right Royal Suites Tag */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:flex items-center gap-3 text-white/70 text-[10px] tracking-widest uppercase font-medium">
          <span className="h-px w-12 bg-[#D4B68A]/60" />
          <span className="text-[#E0C9A6]">ROYAL SUITES</span>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. HERITAGE PILLARS STRIP                                                  */}
      {/* -------------------------------------------------------------------------- */}
      <section className="bg-[#0A1215] border-b border-white/5 py-10 transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-white/10">
            {HERITAGE_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-4 px-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-[#D4B68A] group-hover:bg-[#D4B68A] group-hover:text-slate-950 transition-all duration-300 shadow-xs shrink-0 border border-white/10">
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-light">
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
      {/* 3. WELCOME / ABOUT SECTION (A Royal Escape Like No Other)                  */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#05090C] text-slate-100 relative overflow-hidden border-b border-white/5">
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4B68A]/5 blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4B68A] block">
                WELCOME TO LUXSTAY PALACE —
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-white leading-[1.15]">
                A Royal Escape<br />
                <span className="font-serif italic text-[#D4B68A] drop-shadow-sm">Like No Other</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
                At LuxStay, we bring you an extraordinary experience where royal heritage meets modern luxury. Our palace resort is a celebration of timeless traditions, offering world-class amenities, candlelit lakeside dining, and 24/7 dedicated butler service in a breathtaking heritage setting.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Our Heritage Story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <span className="font-serif italic text-base text-[#E0C9A6] inline-flex items-center gap-2">
                  <span>Where history meets luxury</span>
                  <Heart className="h-4 w-4 fill-[#D4B68A] text-[#D4B68A]" />
                </span>
              </div>
            </div>

            {/* Right Editorial Image Collage */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
              {/* Main Large Lake Palace Photo */}
              <Link to="/gallery-masonry" className="sm:col-span-7 rounded-xl overflow-hidden shadow-2xl h-72 sm:h-full min-h-[300px] sm:min-h-[440px] border border-white/10 group relative block">
                <img
                  src="/images/heritage/lake-palace.jpg"
                  alt="Lake Palace Udaipur Panoramic View"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B68A]">Historic Landmark</span>
                  <p className="font-serif text-lg font-bold">The Royal Island Palace</p>
                </div>
              </Link>

              {/* Right 2 Stacked Palace Photos */}
              <div className="sm:col-span-5 flex flex-col gap-4 h-full">
                <Link to="/gallery-masonry" className="flex-1 rounded-xl overflow-hidden shadow-xl min-h-[140px] sm:min-h-0 border border-white/10 group relative block">
                  <img
                    src="/images/heritage/jharokha-lounge.jpg"
                    alt="Royal Jharokha Balcony Suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-bold">Jharokha Balconies</p>
                  </div>
                </Link>
                <Link to="/gallery-masonry" className="flex-1 rounded-xl overflow-hidden shadow-xl min-h-[140px] sm:min-h-0 border border-white/10 group relative block">
                  <img
                    src="/images/heritage/royal-tea.jpg"
                    alt="Traditional Royal Palace Tea Feast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-bold">Royal High Tea</p>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. ROOMS & SUITES (THE ROYAL COLLECTION)                                   */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#081014] text-white border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4B68A] block">
                THE ROYAL COLLECTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white">
                Luxury Rooms & Suites
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl pt-1">
                Elegantly appointed royal suites with hand-carved heritage interiors, modern marble baths, and private lake views.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4B68A] hover:text-white transition-colors"
            >
              <span>View All Stays</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROYAL_ROOMS_DATA.map((room) => {
              const targetUrl = `/room/${room.id}`;
              return (
                <div
                  key={room.id}
                  className="group flex flex-col justify-between rounded-xl bg-[#0D181C] border border-white/10 overflow-hidden shadow-2xl hover:border-[#D4B68A]/60 hover:shadow-[0_10px_35px_rgba(212,182,138,0.12)] transition-all duration-300"
                >
                  <div>
                    {/* Image with Direct Link & Badge */}
                    <Link to={targetUrl} className="relative h-56 block overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D181C] via-transparent to-transparent opacity-60" />
                      <span className={`absolute top-3.5 left-3.5 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-md shadow-md ${room.badgeStyle}`}>
                        {room.badge}
                      </span>
                    </Link>

                    {/* Info */}
                    <div className="p-6 space-y-3">
                      <Link to={targetUrl} className="block">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#D4B68A] transition-colors leading-snug">
                          {room.title}
                        </h3>
                      </Link>

                      {/* Specs Row */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-[#D4B68A]" /> {room.guests}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5 text-[#D4B68A]" /> {room.bed}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Maximize2 className="h-3.5 w-3.5 text-[#D4B68A]" /> {room.size}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2">
                        {room.desc}
                      </p>

                      {/* Price */}
                      <div className="pt-2">
                        <span className="text-xl font-bold text-[#E0C9A6]">
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
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Reserve Suite</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 5. FINE DINING (Candlelit Dining in a Royal Setting)                       */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative py-32 overflow-hidden bg-slate-950 text-white border-b border-white/5">
        {/* Full-bleed Candlelit Palace Terrace Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/heritage/dining-palace.jpg"
            alt="Candlelit Dining at Lake Palace"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4B68A] block">
                FINE DINING
              </span>

              <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight">
                Candlelit Dining<br />
                <span className="font-serif italic text-[#D4B68A]">in a Royal Setting</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
                Savor exquisite cuisines crafted by our expert chefs, featuring secret royal recipes and modern culinary flair. From authentic palace thalis to private candlelit terrace dinners over the lake, every meal is a celebration.
              </p>

              <div className="pt-2">
                <Link
                  to="/services-dining"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Explore Dining</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Signature Cuisines Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/10 p-7 sm:p-8 space-y-6 shadow-2xl">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4B68A] border-b border-white/10 pb-4">
                  OUR SIGNATURE CUISINES
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#D4B68A] text-slate-950 shrink-0 font-bold">
                      <Utensils className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Rajasthani Royal Thali</h4>
                      <p className="text-xs text-slate-400 font-light">Traditional palace recipes & saffron delicacies</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#D4B68A] text-slate-950 shrink-0 font-bold">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Continental & Global Sommelier</h4>
                      <p className="text-xs text-slate-400 font-light">Fine vintage wine pairings & European courses</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#D4B68A] text-slate-950 shrink-0 font-bold">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Private Lakeside Dining</h4>
                      <p className="text-xs text-slate-400 font-light">Intimate candlelit pavilions with personal butler</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 6. EXPERIENCES (Beyond the Ordinary)                                       */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#060A0D] text-white border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4B68A] block">
                EXCEPTIONAL EXPERIENCES
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white">
                Beyond the Ordinary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light pt-1 leading-relaxed">
                From guided heritage walks to twilight lake cruises and restorative spa therapies, immerse in royal living.
              </p>
            </div>

            <Link
              to="/tours"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer shrink-0"
            >
              <span>Explore All Expeditions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 4 Experience Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCES_DATA.map((exp) => (
              <Link
                key={exp.id}
                to="/tours"
                className="group flex flex-col justify-between rounded-xl bg-[#0C1518] border border-white/10 overflow-hidden shadow-xl hover:border-[#D4B68A]/60 transition-all duration-300 cursor-pointer block"
              >
                <div>
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1518] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-[#D4B68A] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center gap-1.5 text-xs font-bold text-[#D4B68A] group-hover:translate-x-1 transition-transform">
                  <span>Discover Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 7. TESTIMONIALS (What Our Guests Say)                                      */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#081014] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row */}
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-light text-white">
              What Our Guests Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light pt-1">
              Real stories from real people who experienced the magic of LuxStay.
            </p>
          </div>

          {/* Testimonial Slider */}
          <ReviewsSlider
            items={TESTIMONIALS}
            theme="dark"
            renderItem={(t) => (
              <div
                className="h-full rounded-lg bg-[#0F1C20] border border-white/10 p-7 shadow-xl hover:border-[#D4B68A]/40 transition-colors duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover border border-[#D4B68A]/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {t.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-1 text-amber-500 pt-2 border-t border-white/5">
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
      <section className="relative py-20 overflow-hidden bg-slate-950 text-white">
        {/* Panoramic Sunset Lake Palace Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/heritage/lake-palace.jpg"
            alt="Lake Palace Sunset Panorama"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4B68A] block">
                YOUR ROYAL ESCAPE AWAITS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                Book Your Dream Getaway Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Experience luxury, heritage and tranquility — all in one place.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedRoom({
                      id: "maharaja-heritage-palace",
                      slug: "maharaja-heritage-palace",
                      name: "Maharaja Heritage Palace Escape",
                      title: "Maharaja Heritage Palace Escape",
                      category: "Royal Heritage Suite",
                      price: 44999,
                      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
                      beds: "1 Royal King Bed",
                      size: "120 m² / 1,290 sq ft",
                      tagline: "Regal heritage sanctuary with private courtyard and personal butler service"
                    });
                    setIsBookingModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4B68A] hover:bg-[#c5a77b] text-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Handwritten Script */}
            <div className="hidden lg:block text-right pr-8">
              <p className="font-serif italic text-3xl text-[#E0C9A6] drop-shadow-md flex items-center justify-end gap-2">
                <span>See you at the palace</span>
                <Heart className="h-6 w-6 fill-[#E0C9A6] text-[#E0C9A6] inline" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 9. VIDEO MODAL LIGHTBOX                                                    */}
      {/* -------------------------------------------------------------------------- */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <span className="text-xs font-bold tracking-wider uppercase text-[#D4B68A]">
                LuxStay Heritage Palace Tour & Experience
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
                title="LuxStay Heritage Palace Tour"
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
        room={selectedRoom}
      />

    </div>
  );
}
