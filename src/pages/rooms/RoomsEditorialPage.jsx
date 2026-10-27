import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight as ArrowRight,
  LuCircleCheck as CheckCircle2
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import BookingModal from "../../components/booking/BookingModal";
import { ROOMS_DATA } from "../../data/rooms";

export default function RoomsEditorialPage() {
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Editorial Cover */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=80"
            alt="Editorial Rooms"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Rooms & Suites", to: "/rooms" },
                { label: "Editorial Magazine Spread", to: "/rooms-editorial" },
              ]}
              className="text-slate-400"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              The Architectural Folio
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
              The Suite Anthology
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              An intimate look into our most prestigious residences, crafted with bespoke Italian furniture, hand-carved stone, and uninterrupted panoramic vistas.
            </p>
          </div>
        </Container>
      </section>

      {/* Alternating Editorial Spreads */}
      <Container className="py-16 lg:py-24 space-y-24">
        {ROOMS_DATA.map((room, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={room.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Photo Frame (7 Cols) */}
              <div
                className={`lg:col-span-7 relative ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Link to={`/room/${room.slug}`} className="relative rounded-lg overflow-hidden shadow-2xl aspect-16/11 block group">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <Badge variant="glass" size="xs">
                      {room.category}
                    </Badge>
                  </div>
                </Link>

                {/* Floating Specs Card */}
                <div className="absolute -bottom-6 right-6 z-20 rounded-lg bg-slate-950 p-4 sm:p-5 text-white shadow-2xl border border-slate-800 flex items-center gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                      Tariff
                    </span>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-white">
                      ₹{typeof room.price === 'number' ? room.price.toLocaleString() : room.price}
                      <span className="text-xs text-slate-400 font-sans font-normal"> / night</span>
                    </p>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                      Dimensions
                    </span>
                    <p className="text-xs font-bold text-slate-200">{room.size}</p>
                  </div>
                </div>
              </div>

              {/* Editorial Prose (5 Cols) */}
              <div
                className={`lg:col-span-5 space-y-6 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold font-mono text-slate-400">
                      FOLIO NO. 0{idx + 1}
                    </span>
                    <span className="text-slate-300">•</span>
                    <Rating value={room.rating} reviewsCount={room.reviewsCount} size="xs" />
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                    <Link
                      to={`/room/${room.slug}`}
                      className="hover:text-[#997548] transition-colors"
                    >
                      {room.title}
                    </Link>
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {room.description}
                </p>

                {/* Key Amenities */}
                {room.amenities && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Signature Privileges
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.slice(0, 4).map((am, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                          <span className="line-clamp-1">{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setSelectedRoomForBooking(room)}
                  >
                    Reserve Residence
                  </Button>
                  <Button
                    to={`/room/${room.slug}`}
                    variant="outline"
                    size="md"
                    rightIcon={ArrowRight}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Container>

      <BookingModal
        isOpen={!!selectedRoomForBooking}
        onClose={() => setSelectedRoomForBooking(null)}
        room={selectedRoomForBooking}
      />
    </div>
  );
}
