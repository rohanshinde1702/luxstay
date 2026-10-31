import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import BookingModal from "../../components/booking/BookingModal";
import { ROOMS_DATA } from "../../data/rooms";

const CATEGORIES = ["All", "Signature Suites", "Presidential Suites", "Villas & Chalets", "Penthouses"];

export default function RoomsModernPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  const filteredRooms = useMemo(() => {
    if (activeCategory === "All") return ROOMS_DATA;
    return ROOMS_DATA.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img src="/images/placeholders/1905x680.svg"
            alt="Modern Suites"
            className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Rooms & Suites", to: "/rooms" },
                { label: "Modern Showcase", to: "/rooms-modern" },
              ]}
              className="text-slate-400"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              Contemporary Architecture
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
              Modern Suites & Penthouses
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              Explore our architectural sanctuaries designed with seamless floor-to-ceiling glass, acoustic soundproofing, and private terrace plunge pools.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Modern Grid */}
      <Container className="py-12 lg:py-16">
        {/* Category Filter Chips */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-slate-900 dark:bg-[#C5A059] text-white dark:text-slate-950 shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{filteredRooms.length}</strong> modern residences
          </span>
        </div>

        {/* Modern 2-Column Wide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-[#C5A880]/50 transition-all duration-300"
            >
              {/* Photo Frame */}
              <Link to={`/room/${room.slug}`} className="relative aspect-16/10 overflow-hidden block">
                <ImageWithFallback
                  src={room.image}
                  alt={room.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <Badge variant="glass" size="xs">
                    {room.badge || room.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 z-10 rounded-md bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 text-white shadow-lg pointer-events-none">
                  <span className="font-serif text-lg font-bold text-[#dfcaa4]">
                    ${typeof room.price === 'number' ? room.price.toLocaleString() : room.price}
                  </span>
                  <span className="text-[10px] text-slate-300"> / night</span>
                </div>
              </Link>

              {/* Specs & Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4]">
                      {room.category}
                    </span>
                    <Rating value={room.rating} reviewsCount={room.reviewsCount} size="xs" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
                    <Link to={`/room/${room.slug}`}>{room.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Modern Specs Pill Bar */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                    <div className="rounded-md bg-slate-50 dark:bg-slate-800/60 p-2 text-xs">
                      <span className="block text-[10px] uppercase text-slate-400 dark:text-slate-500 font-bold">Space</span>
                      <strong className="text-slate-800 dark:text-slate-200">{room.size}</strong>
                    </div>
                    <div className="rounded-md bg-slate-50 dark:bg-slate-800/60 p-2 text-xs">
                      <span className="block text-[10px] uppercase text-slate-400 dark:text-slate-500 font-bold">Capacity</span>
                      <strong className="text-slate-800 dark:text-slate-200">{room.capacity}</strong>
                    </div>
                    <div className="rounded-md bg-slate-50 dark:bg-slate-800/60 p-2 text-xs">
                      <span className="block text-[10px] uppercase text-slate-400 dark:text-slate-500 font-bold">Bed Type</span>
                      <strong className="text-slate-800 dark:text-slate-200 line-clamp-1">{room.bedType}</strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    to={`/room/${room.slug}`}
                    className="text-xs font-bold text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#dfcaa4] uppercase tracking-wider"
                  >
                    View Specs →
                  </Link>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedRoomForBooking(room)}
                  >
                    Instant Book
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <BookingModal
        isOpen={!!selectedRoomForBooking}
        onClose={() => setSelectedRoomForBooking(null)}
        room={selectedRoomForBooking}
      />
    </div>
  );
}
