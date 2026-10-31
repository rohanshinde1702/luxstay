import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LuClock as Clock,
  LuUsers as Users,
  LuMapPin as MapPin,
  LuGlobe as Globe,
  LuAward as Award,
  LuCircleCheck as CheckCircle2,
  LuCircleX as XCircle,
  LuSparkles as Sparkles,
  LuShieldCheck as ShieldCheck,
  LuShare2 as Share2,
  LuHeart as Heart,
  LuArrowRight as ArrowRight,
  LuUserCheck as UserCheck
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import TourBookingModal from "../../components/tours/TourBookingModal";
import TourCard from "../../components/tours/TourCard";
import DatePicker from "../../components/common/DatePicker";
import { TOURS_DATA } from "../../data/tours";
import { useFavorites } from "../../hooks/useFavorites";
import { useToast } from "../../hooks/useToast";
import NotFoundPage from "../error/NotFoundPage";

export default function TourDetailsPage() {
  const { slug } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [activeTab, setActiveTab] = useState("itinerary"); // 'itinerary' | 'inclusions' | 'guide' | 'policies'

  const tour = useMemo(() => {
    return (
      TOURS_DATA.find((t) => t.slug === slug) ||
      TOURS_DATA.find((t) => t.slug.startsWith(slug)) ||
      TOURS_DATA.find((t) => t.id.includes(slug)) ||
      TOURS_DATA[0]
    );
  }, [slug]);

  const isSaved = tour ? isFavorite(tour.id) : false;

  const relatedTours = useMemo(() => {
    if (!tour) return [];
    return TOURS_DATA.filter((t) => t.id !== tour.id).slice(0, 3);
  }, [tour]);

  if (!tour) {
    return <NotFoundPage />;
  }

  const totalPrice = tour.price * selectedGuests;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: tour.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast({
        title: "Link Copied",
        message: `${tour.title} expedition link copied to clipboard.`,
        type: "success",
      });
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: tour.id,
      title: tour.title,
      name: tour.title,
      image: tour.image,
      price: tour.price,
      category: tour.category,
      type: "tour",
      path: `/tour/${tour.slug}`,
      rating: tour.rating,
      badge: tour.badge,
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-[#070b14] min-h-screen text-slate-800 dark:text-slate-100 transition-colors pb-24">
      {/* Top Breadcrumbs & Action Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 sticky top-16 z-30 shadow-xs backdrop-blur-md transition-colors">
        <Container className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Expeditions", to: "/tours" },
                { label: tour.title, to: `/tour/${tour.slug}` },
              ]}
              className="text-slate-500 dark:text-slate-400"
            />
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c1322] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isSaved
                    ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 hover:border-[#C5A880] hover:text-[#C5A880]"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Container */}
      <Container className="py-8 lg:py-12">
        {/* Title & Metadata Header */}
        <div className="mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {tour.badge && (
              <Badge variant="gold" size="sm">
                {tour.badge}
              </Badge>
            )}
            <Badge variant="secondary" size="sm">
              {tour.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
              <Link
                to={`/destination/${tour.destinationSlug}`}
                className="text-slate-700 dark:text-slate-300 hover:text-[#997548] dark:hover:text-[#dfcaa4] underline-offset-2 hover:underline"
              >
                {tour.destination}
              </Link>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            {tour.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1">
            <Rating value={tour.rating} reviewsCount={tour.reviewsCount} size="sm" />
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#C5A880]" />
              <span>{tour.duration}</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-[#C5A880]" />
              <span>{tour.groupSize}</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-[#C5A880]" />
              <span>{tour.languages}</span>
            </div>
          </div>
        </div>

        {/* Gallery Mosaic */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800">
          <div className="md:col-span-2 h-72 sm:h-96 md:h-[450px]">
            <ImageWithFallback
              src={tour.image}
              alt={tour.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 h-72 sm:h-96 md:h-[450px]">
            {tour.gallery && tour.gallery.slice(1, 3).map((img, i) => (
              <div key={i} className="flex-1 overflow-hidden">
                <ImageWithFallback
                  src={img}
                  alt={`${tour.title} gallery ${i + 1}`}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Specs Bar */}
        <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs transition-colors">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Duration
            </span>
            <p className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {tour.duration}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Group Type
            </span>
            <p className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {tour.groupSize}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Activity Level
            </span>
            <p className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {tour.activityLevel}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Hosted In
            </span>
            <p className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
              {tour.languages}
            </p>
          </div>
        </div>

        {/* Two Column Content Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main Details (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Experience Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {tour.description}
              </p>

              {/* Highlights List */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                    Curated Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tour.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-3.5 shadow-2xs"
                      >
                        <Sparkles className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-800">
              <nav className="flex space-x-6 overflow-x-auto pb-px">
                {[
                  { id: "itinerary", label: "Full Itinerary" },
                  { id: "inclusions", label: "Inclusions & Amenities" },
                  { id: "guide", label: "Expedition Master" },
                  { id: "policies", label: "Important Policies" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                      activeTab === tab.id
                        ? "border-[#C5A880] text-slate-900 dark:text-white"
                        : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab: Itinerary */}
            {activeTab === "itinerary" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Chronological Itinerary
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Timings are tailored flexibly according to marine/weather conditions and guest preferences.
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#C5A880]/30">
                  {tour.itinerary &&
                    tour.itinerary.map((step, idx) => (
                      <div key={idx} className="relative group">
                        {/* Timeline Pin */}
                        <div className="absolute -left-6 sm:-left-8 top-1 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-slate-950 text-[#C5A880] text-xs font-bold ring-4 ring-slate-50 dark:ring-slate-900">
                          {idx + 1}
                        </div>

                        <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-5 shadow-xs group-hover:border-[#C5A880]/50 transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#C5A880]/10 px-2 py-0.5 text-[11px] font-bold text-[#7d5f34] dark:text-[#D4B68A]">
                              <Clock className="h-3 w-3" />
                              {step.time}
                            </span>
                            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                              Stop {idx + 1} of {tour.itinerary.length}
                            </span>
                          </div>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tab: Inclusions */}
            {activeTab === "inclusions" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* What's Included */}
                <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="font-serif text-lg font-bold">What is Included</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {tour.inclusions?.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Excluded */}
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <XCircle className="h-5 w-5 text-slate-400" />
                    <h4 className="font-serif text-lg font-bold">Not Included</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {tour.exclusions?.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Guide */}
            {activeTab === "guide" && tour.guide && (
              <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  <div className="relative">
                    <img src={tour.guide.avatar}
                      alt={tour.guide.name}
                      className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg object-cover shadow-md" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-[#C5A880] p-1.5 text-white shadow-md">
                      <Award className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                        {tour.guide.name}
                      </h4>
                      <Badge variant="gold" size="xs">
                        Certified LuxStay Master
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-[#997548] dark:text-[#D4B68A] uppercase tracking-wider">
                      {tour.guide.role}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {tour.guide.experience}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                      Personally vetted and certified to deliver an unmatched standard of discretion, cultural depth, and supreme safety on every expedition.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Policies */}
            {activeTab === "policies" && (
              <div className="space-y-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 shadow-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Cancellation & Refund Policy</h4>
                  <p>
                    Full refund for cancellations made up to 48 hours prior to scheduled departure. In cases of adverse alpine or marine weather conditions, tours are rescheduled with VIP priority or fully refunded without penalty.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Guest Requirements & Attire</h4>
                  <p>
                    Casual luxury resort attire is recommended for marine charters. For alpine helicopter flights, thermal layers are advised (or provided upon arrival).
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">VIP Private Transfers</h4>
                  <p>
                    Complimentary luxury hotel transfer is included for all guests staying within 25km of the departure marina or helipad.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar (Right 1 Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 sm:p-7 shadow-lg space-y-6">
              {/* Pricing Box */}
              <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    From
                  </span>
                  <div className="flex items-baseline gap-2">
                    {tour.oldPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        ${typeof tour.oldPrice === 'number' ? tour.oldPrice.toLocaleString() : tour.oldPrice}
                      </span>
                    )}
                    <span className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
                      ${typeof tour.price === 'number' ? tour.price.toLocaleString() : tour.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / person</span>
                  </div>
                </div>
                <Badge variant="glass" size="xs">
                  Instant Booking
                </Badge>
              </div>

              {/* Booking Inputs */}
              <div className="space-y-4">
                {/* Date Selection with react-calendar */}
                <DatePicker
                  label="Preferred Date"
                  required
                  value={selectedDate}
                  minDate={new Date()}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />

                {/* Guests Counter */}
                <div>
                  <label htmlFor="tour-guests-count" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Guests (Private Party)
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2">
                    <button
                      type="button"
                      onClick={() => setSelectedGuests(Math.max(1, selectedGuests - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-sm font-bold"
                      aria-label="Decrease guest count"
                    >
                      -
                    </button>
                    <span id="tour-guests-count" className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedGuests} {selectedGuests === 1 ? "Guest" : "Guests"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedGuests(Math.min(8, selectedGuests + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-sm font-bold"
                      aria-label="Increase guest count"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 p-3.5 space-y-2 text-xs border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>${typeof tour.price === 'number' ? tour.price.toLocaleString() : tour.price} × {selectedGuests} guests</span>
                    <span className="font-semibold text-slate-900 dark:text-white">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>VIP Concierge Service</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Marine/Alpine Insurance</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Included</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span>Total Estimate</span>
                    <span className="font-serif text-base text-[#997548] dark:text-[#D4B68A]">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => {
                    if (!selectedDate) {
                      addToast("Please select your preferred date for the tour.", "warning");
                      return;
                    }
                    setIsBookingModalOpen(true);
                  }}
                >
                  Book Private Tour
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center text-xs"
                  onClick={() => {
                    if (!selectedDate) {
                      addToast("Please select your preferred date for the tour.", "warning");
                      return;
                    }
                    setIsBookingModalOpen(true);
                  }}
                >
                  Inquire Custom Itinerary
                </Button>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
                  <span>Free cancellation up to 48 hours prior</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#C5A880]" />
                  <span>Instant digital confirmation voucher</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-[#C5A880]" />
                  <span>Private charter & dedicated host</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Expeditions */}
        {relatedTours.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#997548] dark:text-[#D4B68A]">
                  More Adventures
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  You Might Also Experience
                </h2>
              </div>
              <Button
                to="/tours"
                variant="outline"
                size="sm"
                rightIcon={ArrowRight}
              >
                View All Expeditions
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTours.map((relTour) => (
                <TourCard key={relTour.id} tour={relTour} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Tour Booking Flow Modal */}
      <TourBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tour={tour}
        initialDate={selectedDate}
        initialGuests={selectedGuests}
      />
    </div>
  );
}
