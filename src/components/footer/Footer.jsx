import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuCircleCheck as CheckCircle2,
  LuStar as Star,
  LuCompass as Compass,
  LuShieldCheck as ShieldCheck,
  LuGift as Gift,
  LuPhone as Phone,
  LuMail as Mail,
  LuMapPin as MapPin,
  LuAward as Award,
  LuClock as Clock,
  LuSparkles as Sparkles,
  LuArrowRight as ArrowRight,
  LuLock as Lock,
  LuGlobe as Globe,
  LuChevronRight as ChevronRight,
  LuSend as Send
} from "react-icons/lu";
import { SITE_CONFIG } from "../../constants/theme";
import { InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon } from "../common/SocialIcons";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";

// Reusable Sub-Components hoisted outside parent render to avoid remounting
function SocialLinks() {
  return (
    <div className="flex items-center gap-3 text-slate-400">
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noreferrer" 
        className="p-2 rounded-lg bg-slate-900 hover:bg-[#C5A059] hover:text-slate-950 transition-all cursor-pointer"
        aria-label="Instagram"
      >
        <InstagramIcon className="h-4 w-4" />
      </a>
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noreferrer" 
        className="p-2 rounded-lg bg-slate-900 hover:bg-[#C5A059] hover:text-slate-950 transition-all cursor-pointer"
        aria-label="Facebook"
      >
        <FacebookIcon className="h-4 w-4" />
      </a>
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noreferrer" 
        className="p-2 rounded-lg bg-slate-900 hover:bg-[#C5A059] hover:text-slate-950 transition-all cursor-pointer"
        aria-label="Twitter"
      >
        <TwitterIcon className="h-4 w-4" />
      </a>
      <a 
        href="https://youtube.com" 
        target="_blank" 
        rel="noreferrer" 
        className="p-2 rounded-lg bg-slate-900 hover:bg-[#C5A059] hover:text-slate-950 transition-all cursor-pointer"
        aria-label="YouTube"
      >
        <YoutubeIcon className="h-4 w-4" />
      </a>
    </div>
  );
}

function AwardsRibbon() {
  return (
    <div className="py-6 border-y border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-slate-400">
      <div className="flex items-center justify-center gap-2.5">
        <Award className="h-4 w-4 text-[#C5A059]" />
        <span><strong className="text-slate-200">Forbes 5-Star</strong> Verified Sanctuary 2026</span>
      </div>
      <div className="flex items-center justify-center gap-2.5">
        <Star className="h-4 w-4 text-[#C5A059]" />
        <span><strong className="text-slate-200">World's Best Hotel</strong> Luxury Awards</span>
      </div>
      <div className="flex items-center justify-center gap-2.5">
        <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
        <span><strong className="text-slate-200">3-Michelin Star</strong> Gastronomy & Sommelier</span>
      </div>
      <div className="flex items-center justify-center gap-2.5">
        <Globe className="h-4 w-4 text-[#C5A059]" />
        <span><strong className="text-slate-200">Virtuoso & Relais</strong> Global Partner</span>
      </div>
    </div>
  );
}



function BottomLegalBar() {
  return (
    <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <p>© {new Date().getFullYear()} LuxStay Sanctuaries & Resorts International. All rights reserved.</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs">
        <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
        <span>·</span>
        <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Stay</Link>
        <span>·</span>
        <Link to="/search" className="hover:text-slate-300 transition-colors">Sitemap</Link>
        <span>·</span>
        <Link to="/404" className="hover:text-slate-300 transition-colors">404 Error</Link>
        <span>·</span>
        <Link to="/design-system" className="hover:text-slate-300 transition-colors">Design Tokens</Link>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-400">
        <Lock className="h-3.5 w-3.5 text-[#C5A059]" />
        <span>256-Bit SSL Encrypted Direct Booking</span>
      </div>
    </div>
  );
}

export default function Footer({ variant: propVariant }) {
  const { footerVariant: contextVariant } = useTheme();
  const { addToast } = useToast();
  const activeVariant = propVariant || contextVariant || "standard";

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      addToast({
        title: "VIP Gazette Subscribed",
        message: `Thank you for subscribing (${email}). Private retreat invitations will be delivered directly to your inbox.`,
        type: "success",
      });
      setEmail("");
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  // =========================================================================
  // 1. MINIMALIST CLEAN FOOTER VARIATION
  // =========================================================================
  if (activeVariant === "minimal") {
    return (
      <footer className="bg-[#070b14] text-slate-300 py-12 border-t border-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A059] text-slate-950 font-serif font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                L
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Lux<span className="text-[#C5A059]">Stay</span>
              </span>
            </Link>

            {/* Inline Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <Link to="/rooms" className="hover:text-[#C5A059] transition-colors">Suites & Villas</Link>
              <Link to="/destinations" className="hover:text-[#C5A059] transition-colors">Destinations</Link>
              <Link to="/services-dining" className="hover:text-[#C5A059] transition-colors">Gastronomy</Link>
              <Link to="/services" className="hover:text-[#C5A059] transition-colors">Thermal Spa</Link>
              <Link to="/tours" className="hover:text-[#C5A059] transition-colors">Private Charters</Link>
              <Link to="/offers" className="hover:text-[#C5A059] transition-colors">Special Offers</Link>
              <Link to="/gallery" className="hover:text-[#C5A059] transition-colors">Gallery</Link>
              <Link to="/about" className="hover:text-[#C5A059] transition-colors">Our Story</Link>
              <Link to="/contact" className="hover:text-[#C5A059] transition-colors">Concierge</Link>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors" aria-label="YouTube">
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} LuxStay Luxury Sanctuaries & Resorts. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
              <span>·</span>
              <Link to="/terms" className="hover:text-slate-400">Terms of Stay</Link>
              <span>·</span>
              <Link to="/search" className="hover:text-slate-400">Global Directory</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // =========================================================================
  // 2. NEWSLETTER CENTRIC FOOTER VARIATION
  // =========================================================================
  if (activeVariant === "newsletter") {
    return (
      <footer className="bg-[#070b14] text-slate-300 pt-16 pb-10 border-t border-slate-900 relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#C5A059]/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
          
          {/* HIGH-IMPACT VIP MEMBER CIRCLE & NEWSLETTER HERO BANNER */}
          <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-r from-slate-900 via-[#0d1527] to-slate-950 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#dfcaa4]">
                  <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                  Private Concierge & Membership Circle
                </div>
                
                <h3 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
                  Step into the Circle of <span className="text-[#C5A059] font-normal italic">Extraordinary Stays</span>
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-2xl">
                  Join our exclusive global community of discerning travelers. Receive private access to seasonal sanctuary previews, secret sommelier cellar dinners, and a <strong className="text-white font-medium">$2,500 welcome credit</strong> toward your inaugural suite booking.
                </p>

                {/* VIP Perks Row */}
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 rounded-md px-3 py-2">
                    <Gift className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span className="text-[11px] font-medium">$2,500 Credit</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 rounded-md px-3 py-2">
                    <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span className="text-[11px] font-medium">Best Rate Direct</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 rounded-md px-3 py-2">
                    <Clock className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span className="text-[11px] font-medium">4 PM Late Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 rounded-md px-3 py-2">
                    <Star className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span className="text-[11px] font-medium">24/7 VIP Butler</span>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 sm:p-7 rounded-xl shadow-xl space-y-3">
                <h4 className="text-sm font-serif font-medium text-white">
                  Request Invitation to the Circle
                </h4>
                <p className="text-xs text-slate-400 font-light">
                  Enter your private email to receive privileged booking codes.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md bg-slate-900 border border-slate-700/80 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-hidden focus:ring-1 focus:ring-[#C5A059]/40 transition-all"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#C5A059] hover:bg-[#dfcaa4] text-slate-950 font-bold uppercase tracking-wider py-3 text-xs transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Claim Privilege Membership</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>

                {subscribed && (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-xl">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Welcome! Your $2,500 credit pass has been emailed to you.</span>
                  </div>
                )}

                <p className="text-[10px] text-slate-500 text-center font-light pt-1">
                  Zero spam. Strict guest privacy. Unsubscribe anytime with one click.
                </p>
              </div>
            </div>
          </div>

          {/* ACCREDITATIONS & LUXURY RECOGNITION RIBBON */}
          <AwardsRibbon />

          {/* STREAMLINED 4-COLUMN FOOTER NAVIGATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-slate-900">
            {/* Column 1: Brand & Concierge Info */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A059] text-slate-950 font-serif font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                  L
                </div>
                <span className="font-serif text-3xl font-bold tracking-tight text-white">
                  Lux<span className="text-[#C5A059]">Stay</span>
                </span>
              </Link>

              <p className="text-xs text-slate-400 leading-relaxed font-light">
                An architectural collection of ultra-luxury sanctuaries, cliffside villas, and private island retreats perched in the world's most breathtaking landscapes.
              </p>

              <div className="space-y-2 text-xs text-slate-400 pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Palazzo Del Mare, Via Panoramica 48, Amalfi Coast, Italy</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <a href="tel:+18004567890" className="hover:text-white transition-colors">
                    +1 (800) 456-7890 / +91 (22) 6988-5000
                  </a>
                </div>
              </div>

              <SocialLinks />
            </div>

            {/* Column 2: Suites & Sanctuaries */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800/80 pb-2">
                Suites & Villas
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                <li>
                  <Link to="/rooms" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>All Accommodations</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home-beach" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Ocean & Water Villas</span>
                  </Link>
                </li>
                <li>
                  <Link to="/rooms-editorial" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Presidential Penthouse</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home-villa" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Private Estate Rentals</span>
                  </Link>
                </li>
                <li>
                  <Link to="/rooms-list" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Suite Comparison Grid</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Experiences & Spa */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800/80 pb-2">
                Experiences
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                <li>
                  <Link to="/services-dining" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>3-Michelin Star Dining</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Hydrothermal Spa</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tours" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Private Yacht Charters</span>
                  </Link>
                </li>
                <li>
                  <Link to="/activities" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Helicopter Alpine Flights</span>
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Seasonal Offers</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Destinations & Support */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800/80 pb-2">
                Destinations & Support
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                <li>
                  <Link to="/destination/amalfi-coast-italy" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Amalfi Coast, Italy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/destination/santorini-greece" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Santorini Caldera, Greece</span>
                  </Link>
                </li>
                <li>
                  <Link to="/destination/swiss-alps-zermatt" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Zermatt & Swiss Alps</span>
                  </Link>
                </li>
                <li>
                  <Link to="/destinations-map" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>Interactive World Map</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>24/7 Butler Desk</span>
                  </Link>
                </li>
                <li>
                  <Link to="/404" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                    <span>404 Error Page</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM LEGAL BAR */}
          <BottomLegalBar />
        </div>
      </footer>
    );
  }

  // =========================================================================
  // 3. STANDARD 5-COLUMN FOOTER VARIATION (DEFAULT)
  // =========================================================================
  return (
    <footer className="bg-[#070b14] text-slate-300 pt-16 pb-10 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#C5A059]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C5A059]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* 1. ACCREDITATIONS & LUXURY RECOGNITION RIBBON */}
        <AwardsRibbon />

        {/* 2. CLASSIC 5-COLUMN ARCHITECTURE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-10 border-b border-slate-900">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A059] text-slate-950 font-serif font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                L
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                Lux<span className="text-[#C5A059]">Stay</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              An architectural collection of ultra-luxury sanctuaries, cliffside villas, and private island retreats.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2.5 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Palazzo Del Mare, Amalfi Coast, Italy</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#C5A059] shrink-0" />
                <a href="tel:+18004567890" className="hover:text-white transition-colors">
                  +1 (800) 456-7890
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#C5A059] shrink-0" />
                <a href="mailto:concierge@luxstay.com" className="hover:text-white transition-colors">
                  concierge@luxstay.com
                </a>
              </div>
            </div>

            <SocialLinks />
          </div>

          {/* Column 2: Suites & Villas */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800/80 pb-2">
              Suites & Villas
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link to="/rooms" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>All Accommodations</span>
                </Link>
              </li>
              <li>
                <Link to="/home-beach" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Ocean & Water Villas</span>
                </Link>
              </li>
              <li>
                <Link to="/rooms-editorial" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Presidential Penthouse</span>
                </Link>
              </li>
              <li>
                <Link to="/home-villa" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Private Estate Rentals</span>
                </Link>
              </li>
              <li>
                <Link to="/home-dark" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Royal Heritage Pavilions</span>
                </Link>
              </li>
              <li>
                <Link to="/rooms-modern" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Architectural Chalets</span>
                </Link>
              </li>
              <li>
                <Link to="/rooms-list" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Suite Comparison Grid</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Experiences */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800/80 pb-2">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link to="/services-dining" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>3-Michelin Star Dining</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Hydrothermal Thalasso Spa</span>
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Private Yacht Charters</span>
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Helicopter Alpine Flights</span>
                </Link>
              </li>
              <li>
                <Link to="/services-dining" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Sommelier Wine Cellar</span>
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Infinity Pool & Cabanas</span>
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Seasonal Escape Offers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Destinations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800/80 pb-2">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link to="/destination/amalfi-coast-italy" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Amalfi Coast, Italy</span>
                </Link>
              </li>
              <li>
                <Link to="/destination/santorini-greece" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Santorini Caldera, Greece</span>
                </Link>
              </li>
              <li>
                <Link to="/destination/swiss-alps-zermatt" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Zermatt & Swiss Alps</span>
                </Link>
              </li>
              <li>
                <Link to="/destination/kyoto-japan" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Kyoto Arashiyama, Japan</span>
                </Link>
              </li>
              <li>
                <Link to="/destination/bali-indonesia" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Uluwatu Cliffs, Bali</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations-map" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>Interactive World Map</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 text-[#C5A059]/60" />
                  <span>All Global Retreats</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Stay Connected & Check-in Details */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800/80 pb-2">
              Privilege Club
            </h4>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Subscribe for private seasonal offerings, secret cellar allocations & member previews.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md bg-slate-900 border border-slate-800 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-hidden focus:ring-1 focus:ring-[#C5A059]/40 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#C5A059] hover:bg-[#dfcaa4] text-slate-950 font-bold uppercase tracking-wider py-2.5 text-[11px] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="h-3 w-3" />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 p-2 rounded-lg">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Subscribed successfully!</span>
              </div>
            )}

            {/* Quick Check-in Info Box */}
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-1.5 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="text-slate-200 font-medium">{SITE_CONFIG.checkInTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="text-slate-200 font-medium">{SITE_CONFIG.checkOutTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Late Check-out:</span>
                <span className="text-[#C5A059] font-medium">4:00 PM (VIP)</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM BAR: COPYRIGHT, LEGAL & ENCRYPTION BADGES */}
        <BottomLegalBar />

      </div>
    </footer>
  );
}
