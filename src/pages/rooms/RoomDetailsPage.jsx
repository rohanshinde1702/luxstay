import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LuUsers as Users,
  LuBed as Bed,
  LuMaximize2 as Maximize2,
  LuBath as Bath,
  LuCheck as Check,
  LuClock as Clock,
  LuShieldCheck as ShieldCheck,
  LuShare2 as Share2,
  LuHeart as Heart,
  LuSparkles as Sparkles,
  LuImages as Images,
  LuArrowRight as ArrowRight,
  LuChevronRight as ChevronRight
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import Button from "../../components/common/Button";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import BookingModal from "../../components/booking/BookingModal";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";
import RoomCard from "../../components/rooms/RoomCard";
import DatePicker from "../../components/common/DatePicker";
import DateRangePicker from "../../components/common/DateRangePicker";
import NotFoundPage from "../error/NotFoundPage";
import { ROOMS_DATA } from "../../data/rooms";
import { useFavorites } from "../../hooks/useFavorites";
import { useToast } from "../../hooks/useToast";

export default function RoomDetailsPage() {
  const { slug } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const room = useMemo(() => {
    return ROOMS_DATA.find((r) => r.slug === slug) || ROOMS_DATA[0];
  }, [slug]);

  // Calculate nights & pricing
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2 - date1);
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;
  }, [checkIn, checkOut]);

  if (!room) {
    return <NotFoundPage />;
  }

  const saved = isFavorite(room.id);
  const subtotal = (room?.price || 0) * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const galleryImages = room.gallery || [room.image];
  const similarRooms = ROOMS_DATA.filter((r) => r.id !== room.id).slice(0, 3);

  const galleryItemsFormatted = galleryImages.map((img, idx) => ({
    id: `room-img-${idx}`,
    title: `${room.name} — Angle ${idx + 1}`,
    category: "suites",
    src: img,
    caption: room.tagline,
  }));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: room.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast({
        title: "Link Copied",
        message: `${room.name} link copied to your clipboard.`,
        type: "success",
      });
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: room.id,
      title: room.name,
      name: room.name,
      image: room.image,
      price: room.price,
      category: room.category,
      type: "room",
      path: `/room/${room.slug}`,
      rating: room.rating,
      badge: room.badge,
    });
  };

  return (
    <div className="py-8 sm:py-12 space-y-12 pb-24">
      <Container>
        {/* Top Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Breadcrumbs
            items={[
              { label: "Suites & Villas", path: "/rooms" },
              { label: room.category, path: `/rooms?category=${room.category}` },
              { label: room.name },
            ]}
          />

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                saved
                  ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 hover:border-[#C5A880] hover:text-[#C5A880]"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${saved ? "fill-[#C5A880]" : ""}`} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Title & Quick Info Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="gold" size="xs">
                {room.category}
              </Badge>
              {room.badge && (
                <Badge variant="navy" size="xs">
                  {room.badge}
                </Badge>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              {room.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              {room.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1 shrink-0">
            <Rating value={room.rating} reviewsCount={room.reviewsCount} size="md" />
            <div className="flex items-baseline gap-1.5 mt-1">
              {room.oldPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${typeof room.oldPrice === 'number' ? room.oldPrice.toLocaleString() : room.oldPrice}
                </span>
              )}
              <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                ${typeof room.price === 'number' ? room.price.toLocaleString() : room.price}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ night</span>
            </div>
          </div>
        </div>

        {/* Hero Gallery Mosaic */}
        <div className="relative mt-8 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[420px] sm:h-[520px] rounded-lg overflow-hidden shadow-lg">
          {/* Main big image */}
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer" onClick={() => setActiveLightboxIndex(0)}>
            <ImageWithFallback
              src={galleryImages[0] || room.image}
              alt={room.name}
              aspectRatio="h-full w-full"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Secondary images */}
          {galleryImages.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLightboxIndex(idx + 1)}
              className="hidden md:block relative overflow-hidden group cursor-pointer"
            >
              <ImageWithFallback
                src={img}
                alt={`${room.name} ${idx + 1}`}
                aspectRatio="h-full w-full"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}

          {/* "View All Photos" Button */}
          <button
            onClick={() => setActiveLightboxIndex(0)}
            className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-md bg-slate-950/80 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white shadow-xl hover:bg-white hover:text-slate-900 transition-all cursor-pointer"
          >
            <Images className="h-4 w-4 text-[#C5A880]" />
            <span>View All {galleryImages.length} Photos</span>
          </button>
        </div>

        {/* Quick Specs Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 sm:p-5 shadow-xs text-xs text-slate-700 dark:text-slate-300 transition-colors">
          <div className="flex items-center gap-2.5">
            <Users className="h-4 w-4 text-[#C5A880]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Capacity</p>
              <p className="font-semibold text-slate-900 dark:text-white">{room.guests} Guests Max</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Bed className="h-4 w-4 text-[#C5A880]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Beds</p>
              <p className="font-semibold text-slate-900 dark:text-white">{room.beds}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Bath className="h-4 w-4 text-[#C5A880]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Bathrooms</p>
              <p className="font-semibold text-slate-900 dark:text-white">{room.bathrooms || 1} En-Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Maximize2 className="h-4 w-4 text-[#C5A880]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Space</p>
              <p className="font-semibold text-slate-900 dark:text-white">{room.size}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <Sparkles className="h-4 w-4 text-[#C5A880]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Service</p>
              <p className="font-semibold text-slate-900 dark:text-white">24/7 Butler</p>
            </div>
          </div>
        </div>

        {/* Main Content & Sticky Booking Column */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Details & Amenities */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                About This Sanctuary
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {room.description}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Individually tailored by world-renowned interior architects, every detail has been thoughtfully 
                conceived to maximize natural illumination, acoustic calm, and seamless connection with the 
                surrounding scenic beauty.
              </p>
            </div>

            {/* Categorized Amenities */}
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Suite Inclusions & Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(room.amenityCategories || [
                  { name: "Curated Inclusions", items: room.amenities || [] },
                ]).map((cat) => (
                  <div
                    key={cat.name}
                    className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0c1322] p-5 space-y-3"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4]">
                      {cat.name}
                    </h4>
                    <ul className="space-y-2">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4] shrink-0 mt-0.5">
                            <Check className="h-2.5 w-2.5" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies & Guidelines */}
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                House Policies & Stay Rules
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4">
                  <Clock className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Check-in & Check-out</p>
                    <p className="mt-1">{room.policies?.checkIn || "Check-in from 3:00 PM"}</p>
                    <p>{room.policies?.checkOut || "Check-out until 11:00 AM"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4">
                  <ShieldCheck className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Cancellation Guarantee</p>
                    <p className="mt-1">{room.policies?.cancellation || "Free cancellation up to 48 hours before check-in."}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Availability Calendar */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Live Suite Availability
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Select your check-in date directly on the calendar below
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#C5A880]" />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Available</span>
                  </div>
                </div>
              </div>

              <div className="max-w-md">
                <DatePicker
                  inline={true}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  minDate={new Date()}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation Widget */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 sm:p-7 shadow-xl space-y-6 transition-colors mt-8">
              <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    ${typeof room.price === 'number' ? room.price.toLocaleString() : room.price}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / night</span>
                </div>
                <Rating value={room.rating} reviewsCount={room.reviewsCount} size="xs" />
              </div>

              {/* Date selection with react-calendar */}
              <DateRangePicker
                startDate={checkIn}
                endDate={checkOut}
                onStartDateChange={(e) => setCheckIn(e.target.value)}
                onEndDateChange={(e) => setCheckOut(e.target.value)}
                required
              />

              {/* Guests */}
              <div className="space-y-1 text-xs">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Guests *
                </label>
                <select
                  required
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 p-2.5 text-xs font-semibold text-slate-800 dark:text-white focus:border-[#C5A880] focus:outline-none cursor-pointer"
                >
                  {[...Array(room.guests || 4)].map((_, i) => (
                    <option key={i + 1} value={i + 1} className="dark:bg-slate-900">
                      {i + 1} {i === 0 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Calculation Box */}
              <div className="rounded-lg bg-slate-50 dark:bg-[#070b14] border border-slate-200/60 dark:border-slate-800 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>${typeof room.price === 'number' ? room.price.toLocaleString() : room.price} x {nights} Nights</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Resort Fees & Taxes (12%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span>Complimentary Butler & Champagne</span>
                  <span className="font-bold">Free</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
                  <span>Total Due:</span>
                  <span className="font-serif text-xl text-[#997548] dark:text-[#dfcaa4]">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant="gold"
                size="lg"
                fullWidth
                rightIcon={ArrowRight}
                onClick={() => {
                  if (!checkIn || !checkOut) {
                    addToast("Please select check-in and check-out dates.", "warning");
                    return;
                  }
                  if (!guests) {
                    addToast("Please select the number of guests.", "warning");
                    return;
                  }
                  setBookingModalOpen(true);
                }}
              >
                Reserve This Suite
              </Button>

              <div className="space-y-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400 text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Best Rate Guaranteed • No Booking Fee</span>
                </div>
                <p>You won't be charged yet in this demo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Suites Recommendation */}
        <div className="pt-16 border-t border-slate-200 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
                Discover Alternatives
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Similar Luxury Sanctuaries
              </h3>
            </div>
            <Link
              to="/rooms"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-[#997548]"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarRooms.map((r) => (
              <RoomCard key={r.id} room={r} variant="grid" />
            ))}
          </div>
        </div>
      </Container>

      {/* Booking Checkout Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        room={room}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialGuests={guests}
      />

      {/* Fullscreen Photo Lightbox */}
      <GalleryLightbox
        items={galleryItemsFormatted}
        showFilter={false}
        showGrid={false}
        isOpen={activeLightboxIndex !== null}
        initialIndex={activeLightboxIndex ?? 0}
        onClose={() => setActiveLightboxIndex(null)}
      />
    </div>
  );
}
