import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuUser as User,
  LuMail as Mail,
  LuPhone as Phone,
  LuLock as Lock,
  LuKeyRound as KeyRound,
  LuCrown as Crown,
  LuBed as Bed,
  LuCompass as Compass,
  LuCalendar as Calendar,
  LuSparkles as Sparkles,
  LuMapPin as MapPin,
  LuCircleCheck as CheckCircle2,
  LuCircleAlert as AlertCircle,
  LuClock as Clock,
  LuEye as Eye,
  LuEyeOff as EyeOff,
  LuPencil as Pencil,
  LuLogOut as LogOut,
  LuShieldCheck as ShieldCheck
} from "react-icons/lu";
import Button from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import { useBooking } from "../../hooks/useBooking";
import { useFavorites } from "../../hooks/useFavorites";
import { getTravelBookings, getHotelBookings } from "../admin/adminStorage";

export default function UserDashboardPage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { bookings: contextBookings, cancelBooking } = useBooking();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("packages"); // "packages" | "profile" | "privileges"
  const [packageType, setPackageType] = useState("all"); // "all" | "hotel" | "travel"

  // Profile Edit State
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  // Modals for viewing booked package dossier
  const [selectedHotelBooking, setSelectedHotelBooking] = useState(null);
  const [selectedTravelBooking, setSelectedTravelBooking] = useState(null);

  // Sync profile form when user changes
  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditEmail(user.email || "");
      setEditPhone(user.phone || "+1 (800) 456-7890");
      setEditPassword(user.password || "password123");
    }
  }, [user]);

  // Combine user's hotel bookings from context and admin storage
  const userHotelBookings = (() => {
    if (!user) return [];
    const email = user.email.toLowerCase();
    const adminHotels = getHotelBookings().filter(
      (b) => b.guestEmail?.toLowerCase() === email
    );
    const ctxHotels = (contextBookings || []).filter(
      (b) => b.guestEmail?.toLowerCase() === email
    );

    // Merge by id/reference
    const map = new Map();
    [...ctxHotels, ...adminHotels].forEach((item) => {
      const key = item.reference || item.id;
      if (!map.has(key)) {
        map.set(key, item);
      }
    });
    return Array.from(map.values());
  })();

  // User's travel & tour bookings from admin storage
  const userTravelBookings = (() => {
    if (!user) return [];
    const email = user.email.toLowerCase();
    return getTravelBookings().filter(
      (t) => t.guestEmail?.toLowerCase() === email
    );
  })();

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");

    if (!editName.trim()) {
      setProfileError("Name cannot be empty.");
      return;
    }
    if (!editEmail.trim()) {
      setProfileError("Email cannot be empty.");
      return;
    }
    if (!editPassword.trim() || editPassword.length < 6) {
      setProfileError("Password must be at least 6 characters.");
      return;
    }

    updateProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      password: editPassword.trim(),
    });

    setProfileSuccess("Your profile details and password have been securely updated in LocalStorage.");
    setTimeout(() => setProfileSuccess(""), 4000);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center py-20 px-4 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 text-[#dfcaa4] mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Private Sanctuary Access</h2>
            <p className="text-xs text-slate-400 mt-2">
              Please sign in to view your booked suites, travel packages, and personal membership profile.
            </p>
          </div>
          <div className="space-y-3">
            <Button to="/login" variant="primary" size="md" className="w-full justify-center">
              Sign In to Member Portal
            </Button>
            <Button to="/register" variant="outline" size="md" className="w-full justify-center">
              Create an Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ========================================================= */}
        {/* 1. HERO MEMBER BANNER                                    */}
        {/* ========================================================= */}
        <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0d1627] to-slate-950 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Member Avatar */}
              <div className="relative">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={user.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#C5A880]/60 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 ring-2 ring-slate-900 text-[10px]">
                  ✓
                </span>
              </div>

              {/* Identity Details */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    {user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#C5A880]/20 text-[#dfcaa4] border border-[#C5A880]/30">
                    {user.tier || "Black Diamond VIP"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-3">
                  <span>{user.email}</span>
                  <span>•</span>
                  <span>Member Since {user.memberSince || "2024"}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Button
                to="/rooms"
                variant="primary"
                size="sm"
                className="text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
              >
                Book New Suite
              </Button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700 transition-colors text-xs font-semibold cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Active Suites</span>
              <p className="text-xl font-bold text-white mt-0.5">{userHotelBookings.length}</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Expedition Tours</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">{userTravelBookings.length}</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Privilege Credit</span>
              <p className="text-xl font-bold text-[#C5A880] mt-0.5">
                ${(user.welcomeCredit || 2500).toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Saved Sanctuaries</span>
              <p className="text-xl font-bold text-purple-300 mt-0.5">{favoritesCount}</p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DASHBOARD TABS NAVIGATION                             */}
        {/* ========================================================= */}
        <div className="flex border-b border-slate-800 gap-2 sm:gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("packages")}
            className={`pb-3 px-2 sm:px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "packages"
                ? "border-[#C5A880] text-[#dfcaa4]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Bed className="h-4 w-4" />
            <span>My Booked Packages & Stays</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {userHotelBookings.length + userTravelBookings.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`pb-3 px-2 sm:px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "profile"
                ? "border-[#C5A880] text-[#dfcaa4]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Personal Info & Security</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("privileges")}
            className={`pb-3 px-2 sm:px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "privileges"
                ? "border-[#C5A880] text-[#dfcaa4]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Crown className="h-4 w-4" />
            <span>VIP Membership Privileges</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: MY BOOKED PACKAGES & STAYS                         */}
        {/* ========================================================= */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Filter By:</span>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setPackageType("all")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      packageType === "all"
                        ? "bg-[#C5A880] text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All Packages ({userHotelBookings.length + userTravelBookings.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackageType("hotel")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      packageType === "hotel"
                        ? "bg-[#C5A880] text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Suites & Villas ({userHotelBookings.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackageType("travel")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      packageType === "travel"
                        ? "bg-[#C5A880] text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Expedition Tours ({userTravelBookings.length})
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/rooms"
                  className="text-xs text-[#C5A880] hover:text-[#dfcaa4] hover:underline font-semibold"
                >
                  + Add Another Reservation
                </Link>
              </div>
            </div>

            {/* List of Booked Suites */}
            {(packageType === "all" || packageType === "hotel") && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Bed className="h-4 w-4 text-[#C5A880]" />
                  <span>Hotel & Villa Reservations</span>
                </div>

                {userHotelBookings.length === 0 ? (
                  <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                    <p className="text-xs text-slate-400">No hotel suite reservations found under your account.</p>
                    <Button to="/rooms" variant="outline" size="sm">
                      Browse Sanctuaries & Suites
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userHotelBookings.map((b) => (
                      <div
                        key={b.id || b.reference}
                        className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 hover:border-[#C5A880]/50 transition-all space-y-4 relative group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#dfcaa4] uppercase tracking-wider block">
                              Ref: {b.reference || b.id}
                            </span>
                            <h3 className="font-serif text-lg font-bold text-white mt-1">
                              {b.roomName || b.roomType || "Presidential Suite"}
                            </h3>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-[#C5A880]" />
                              {b.hotelName || b.location || "LuxStay Resort & Sanctuary"}
                            </p>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              b.status === "Cancelled"
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}
                          >
                            {b.status || "Confirmed"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Stay Dates</span>
                            <span className="font-medium text-slate-200">
                              {b.checkIn} → {b.checkOut}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Party & Nights</span>
                            <span className="font-medium text-slate-200">
                              {b.nights || 3} Nights • {b.guests || 2} Guests
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Total Amount</span>
                            <span className="font-bold text-[#C5A880] text-base">
                              ${(b.totalAmount || b.totalPrice || 2400).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedHotelBooking(b)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              View Dossier
                            </button>
                            {b.status !== "Cancelled" && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm("Are you sure you wish to cancel this reservation?")) {
                                    cancelBooking(b.id);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg hover:bg-rose-950/30 text-rose-400 text-xs font-medium transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* List of Booked Travel & Expeditions */}
            {(packageType === "all" || packageType === "travel") && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Compass className="h-4 w-4 text-[#C5A880]" />
                  <span>Curated Expeditions & Chartered Tours</span>
                </div>

                {userTravelBookings.length === 0 ? (
                  <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                    <p className="text-xs text-slate-400">No expedition or tour packages booked under your account.</p>
                    <Button to="/tours" variant="outline" size="sm">
                      Discover Curated Expeditions
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userTravelBookings.map((t) => (
                      <div
                        key={t.id}
                        className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 hover:border-[#C5A880]/50 transition-all space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#dfcaa4] uppercase tracking-wider block">
                              Ref: {t.id}
                            </span>
                            <h3 className="font-serif text-lg font-bold text-white mt-1">
                              {t.tourName}
                            </h3>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-[#C5A880]" />
                              {t.destination}
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {t.status || "Confirmed"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Date & Duration</span>
                            <span className="font-medium text-slate-200">
                              {t.travelDate} ({t.duration})
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Travelers & Guide</span>
                            <span className="font-medium text-slate-200">
                              {t.travelers} Guests • {t.guideName || "Private Escort"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Expedition Fare</span>
                            <span className="font-bold text-[#C5A880] text-base">
                              ${(t.totalPrice || 480).toLocaleString()}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedTravelBooking(t)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Tour Voucher
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PERSONAL INFO & SECURITY FORM                      */}
        {/* ========================================================= */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">Member Credentials & Security</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage your personal identity, verified email address, phone number, and confidential account password.
                </p>
              </div>

              {profileSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{profileSuccess}</span>
                </div>
              )}

              {profileError && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                    />
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                      />
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="+1 (800) 555-0199"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                      />
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Confidential Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 pr-10 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden font-mono"
                    />
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Use this password alongside your email address to sign into your member dashboard.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto px-6 justify-center"
                  >
                    Save Changes to LocalStorage
                  </Button>
                </div>
              </form>
            </div>

            {/* Side Card: Account Summary */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <h3 className="text-sm font-serif font-bold text-white">Confidential Profile Key</h3>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>User ID:</span>
                  <span className="font-mono text-slate-200">{user.id || "usr_vip_8842"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Tier Status:</span>
                  <span className="text-[#dfcaa4] font-semibold">{user.tier || "Black Diamond VIP"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Credit Balance:</span>
                  <span className="text-emerald-400 font-bold">${(user.welcomeCredit || 2500).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Account Type:</span>
                  <span className="text-slate-300">Registered Guest</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-xs text-[#dfcaa4] space-y-1">
                  <span className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                    Local Storage Encrypted
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Your profile and credentials are automatically synced across browser tabs and sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: VIP PRIVILEGES                                    */}
        {/* ========================================================= */}
        {activeTab === "privileges" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 text-[#dfcaa4] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">$2,500 Direct Booking Credit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically deducted upon checkout for signature presidential suites and private chartered island villas.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 text-[#dfcaa4] flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">4:00 PM Late Departure</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enjoy unhurried mornings with guaranteed 4:00 PM late check-out privileges across all global sanctuaries.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 text-[#dfcaa4] flex items-center justify-center">
                <Crown className="h-5 w-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">24/7 Private Butler Desk</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct WhatsApp and private telephone access to your personal concierge for customized in-suite dining and bespoke charters.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* HOTEL RESERVATION DOSSIER MODAL                           */}
      {/* ========================================================= */}
      {selectedHotelBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                  Reservation Voucher • {selectedHotelBooking.reference || selectedHotelBooking.id}
                </span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">
                  {selectedHotelBooking.roomName || selectedHotelBooking.roomType || "Signature Suite"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHotelBooking(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Sanctuary</span>
                  <span className="font-medium text-white">{selectedHotelBooking.hotelName || selectedHotelBooking.location || "LuxStay Resort"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Status</span>
                  <span className="font-semibold text-emerald-400">{selectedHotelBooking.status || "Confirmed"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Check-In Date</span>
                  <span className="font-medium text-white">{selectedHotelBooking.checkIn}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Check-Out Date</span>
                  <span className="font-medium text-white">{selectedHotelBooking.checkOut}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Guests</span>
                  <span className="font-medium text-slate-200">{selectedHotelBooking.guests || 2} Adults</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Total Price</span>
                  <span className="font-bold text-[#C5A880] text-sm">
                    ${(selectedHotelBooking.totalAmount || selectedHotelBooking.totalPrice || 2400).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedHotelBooking(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Close Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TRAVEL EXPEDITION VOUCHER MODAL                           */}
      {/* ========================================================= */}
      {selectedTravelBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                  Expedition Pass • {selectedTravelBooking.id}
                </span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">
                  {selectedTravelBooking.tourName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTravelBooking(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Destination</span>
                  <span className="font-medium text-white">{selectedTravelBooking.destination}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Date</span>
                  <span className="font-medium text-white">{selectedTravelBooking.travelDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Duration</span>
                  <span className="font-medium text-slate-200">{selectedTravelBooking.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Travelers</span>
                  <span className="font-medium text-slate-200">{selectedTravelBooking.travelers} Guests</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Tour Guide</span>
                  <span className="font-medium text-slate-200">{selectedTravelBooking.guideName || "Private Escort"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Total Fare</span>
                  <span className="font-bold text-[#C5A880] text-sm">
                    ${(selectedTravelBooking.totalPrice || 480).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedTravelBooking(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
