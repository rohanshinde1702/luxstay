import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  LuSparkles as Sparkles,
  LuShieldCheck as ShieldCheck,
  LuCircleCheck as CheckCircle2,
  LuHeart as Heart,
  LuShare2 as Share2
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import BookingModal from "../../components/booking/BookingModal";
import { ROOMS_DATA } from "../../data/rooms";
import { useFavorites } from "../../hooks/useFavorites";
import { useToast } from "../../hooks/useToast";
import NotFoundPage from "../error/NotFoundPage";

export default function RoomDetailsSplitPage() {
  const { slug } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedNights, setSelectedNights] = useState(3);
  const [selectedGuests, setSelectedGuests] = useState(2);

  const room = useMemo(() => {
    return ROOMS_DATA.find((r) => r.slug === slug) || ROOMS_DATA[0];
  }, [slug]);

  if (!room) {
    return <NotFoundPage />;
  }

  const roomTitle = room.name || room.title;
  const isSaved = isFavorite(room.id);

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: room.id,
      title: roomTitle,
      name: roomTitle,
      image: room.image,
      price: room.price,
      category: room.category,
      type: "room",
      path: `/room/${room.slug}`,
      rating: room.rating,
      badge: room.badge,
    });
  };

  const galleryImages = room.gallery && room.gallery.length > 0
    ? room.gallery
    : [room.image, room.image, room.image];

  const estimatedTotal = room.price * selectedNights;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-24 transition-colors">
      {/* Top Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
        <Container className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Rooms & Suites", to: "/rooms" },
                { label: roomTitle, to: `/room/${room.slug}` },
                { label: "Split Showcase" },
              ]}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  isSaved
                    ? "border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] dark:bg-[#C5A880]/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 hover:border-[#C5A880] hover:text-[#C5A880]"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-[#C5A880]" : ""}`} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
              <Badge variant="gold" size="xs">
                Variation: Split Photo Stack & Sticky Reservation
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Continuous Photo Stack (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="xs">
                  {room.category}
                </Badge>
                <Rating value={room.rating} reviewsCount={room.reviewsCount} size="xs" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                {room.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {room.description}
              </p>
            </div>

            {/* Stacked Large Photos */}
            <div className="space-y-6 pt-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden shadow-lg aspect-16/10">
                  <ImageWithFallback
                    src={img}
                    alt={`${room.title} view ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Room Features Grid */}
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs space-y-4">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Signature Privileges & Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {room.amenities?.map((am, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card & Price Breakdown (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-lg space-y-6">
              <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Nightly Rate
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    ${typeof room.price === 'number' ? room.price.toLocaleString() : room.price}
                    <span className="text-xs font-sans font-normal text-slate-500 dark:text-slate-400"> / night</span>
                  </div>
                </div>
                <Rating value={room.rating} size="sm" />
              </div>

              {/* Booking Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Nights of Stay
                  </label>
                  <div className="flex items-center justify-between rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs font-bold text-slate-900 dark:text-white">
                    <button
                      onClick={() => setSelectedNights(Math.max(1, selectedNights - 1))}
                      className="h-8 w-8 rounded-lg bg-white dark:bg-slate-700 shadow-2xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      -
                    </button>
                    <span>{selectedNights} Nights</span>
                    <button
                      onClick={() => setSelectedNights(selectedNights + 1)}
                      className="h-8 w-8 rounded-lg bg-white dark:bg-slate-700 shadow-2xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Guests
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs font-bold text-slate-900 dark:text-white">
                    <button
                      onClick={() => setSelectedGuests(Math.max(1, selectedGuests - 1))}
                      className="h-8 w-8 rounded-lg bg-white dark:bg-slate-700 shadow-2xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      -
                    </button>
                    <span>{selectedGuests} Guests</span>
                    <button
                      onClick={() => setSelectedGuests(selectedGuests + 1)}
                      className="h-8 w-8 rounded-lg bg-white dark:bg-slate-700 shadow-2xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Live Calculated Price Breakdown */}
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 space-y-2 text-xs border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>${typeof room.price === 'number' ? room.price.toLocaleString() : room.price} × {selectedNights} nights</span>
                    <strong className="text-slate-900 dark:text-white">${estimatedTotal.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>VIP Butler Liaison</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Breakfast & Spa Pass</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Included</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span>Total Estimate</span>
                    <span className="font-serif text-lg text-[#997548] dark:text-[#dfcaa4]">${estimatedTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Reserve Suite
              </Button>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
                  <span>Free cancellation up to 48 hours prior</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#C5A880]" />
                  <span>Best rate guarantee direct booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={room}
        initialGuests={selectedGuests}
      />
    </div>
  );
}
