import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  LuCircleCheck as CheckCircle2,
  LuLayers as Layers,
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

export default function RoomDetailsAmenitiesPage() {
  const { slug } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("amenities"); // 'amenities' | 'floorplan' | 'bathroom' | 'technology'

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

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Bar */}
      <div className="border-b border-slate-200 bg-white">
        <Container className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Rooms & Suites", to: "/rooms" },
                { label: roomTitle, to: `/room/${room.slug}` },
                { label: "Floorplan & Amenities View" },
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
                Variation: Amenities & Floorplan Focus
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        {/* Title and Specs Header */}
        <div className="mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" size="sm">
              {room.category}
            </Badge>
            <Rating value={room.rating} reviewsCount={room.reviewsCount} size="sm" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {room.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Gallery 2-Up Banner */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg overflow-hidden shadow-lg">
          <div className="h-80 sm:h-96">
            <ImageWithFallback
              src={room.image}
              alt={room.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-80 sm:h-96">
            <ImageWithFallback
              src={room.gallery?.[1] || room.image}
              alt={`${room.title} Interior`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-slate-200">
          <div className="flex space-x-6 overflow-x-auto pb-px">
            {[
              { id: "amenities", label: "Full Amenity Matrix" },
              { id: "floorplan", label: "Architectural Floorplan & Layout" },
              { id: "bathroom", label: "Spa Bathroom Specifications" },
              { id: "technology", label: "In-Suite Smart Technology" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#C5A880] text-slate-900 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "amenities" && (
              <div className="space-y-6 rounded-lg border border-slate-200/80 bg-white p-8 shadow-xs">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Comprehensive Suite Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {room.amenities?.map((am, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 border border-slate-100"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800">
                        {am}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "floorplan" && (
              <div className="space-y-6 rounded-lg border border-slate-200/80 bg-white p-8 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Architectural Blueprint
                    </h3>
                    <p className="text-xs text-slate-500">
                      Total Living Area: {room.size} • Master Suite with Private Dressing Room
                    </p>
                  </div>
                  <Badge variant="gold" size="xs">
                    Scale 1:50
                  </Badge>
                </div>

                <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-100/60 p-8 sm:p-12 text-center space-y-3">
                  <Layers className="h-12 w-12 text-[#C5A880] mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-slate-800">
                    Interactive 3D Virtual Tour & Blueprint
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Features open-concept living pavilion, master king wing, freestanding soaking terrace, and oceanfront plunge pool deck.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "bathroom" && (
              <div className="space-y-6 rounded-lg border border-slate-200/80 bg-white p-8 shadow-xs">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Spa & Wellness Bathroom Specs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Freestanding Soaking Tub</strong>
                    <p className="text-slate-500 text-xs">Hand-carved volcanic stone or hammered copper overlooking private gardens.</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Dual Rain Showers</strong>
                    <p className="text-slate-500 text-xs">Thermostatic high-pressure rainfall cascades with steam therapy mode.</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Heated Marble Floors</strong>
                    <p className="text-slate-500 text-xs">Radiant underfloor heating throughout all bathroom and dressing areas.</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Bespoke Toiletries</strong>
                    <p className="text-slate-500 text-xs">Refillable botanical fragrances distilled on-site by resident aromatherapists.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "technology" && (
              <div className="space-y-6 rounded-lg border border-slate-200/80 bg-white p-8 shadow-xs">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Smart In-Suite Technology
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Lutron Lighting Automation</strong>
                    <p className="text-slate-500 text-xs">Circadian-tuned ambient lighting presets for morning, dinner, and relaxation.</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 space-y-1">
                    <strong className="block text-slate-900 font-bold">Sonos Acoustic Architecture</strong>
                    <p className="text-slate-500 text-xs">Multi-room lossless audio streaming with curated high-fidelity playlists.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Widget Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-lg border border-slate-200/80 bg-white p-6 shadow-xl space-y-6">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Nightly Rate
                  </span>
                  <div className="font-serif text-3xl font-bold text-slate-900">
                    ₹{typeof room.price === 'number' ? room.price.toLocaleString() : room.price}
                    <span className="text-xs font-sans font-normal text-slate-500"> / night</span>
                  </div>
                </div>
                <Badge variant="glass" size="xs">
                  Available
                </Badge>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Dimensions</span>
                  <strong className="text-slate-900">{room.size}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Bed Configuration</span>
                  <strong className="text-slate-900">{room.bedType}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Maximum Occupancy</span>
                  <strong className="text-slate-900">{room.capacity}</strong>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book This Suite
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={room}
      />
    </div>
  );
}
