import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import TourBookingModal from "../../components/tours/TourBookingModal";
import { TOURS_DATA } from "../../data/tours";

const CATEGORIES = ["All", "Yacht & Marine", "Helicopter & Alpine", "Cultural & Heritage"];

export default function ToursModernPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);

  const filteredTours = activeCategory === "All"
    ? TOURS_DATA
    : TOURS_DATA.filter((t) => t.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=2000&q=80"
            alt="Alpine & Marine Tours"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Tours", to: "/tours" },
                { label: "Modern Expeditions", to: "/tours-modern" },
              ]}
              className="text-slate-400"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              Private Charters & Flights
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
              Bespoke Private Expeditions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              From superyacht charters on the Amalfi Coast to private helicopter glacier brunches in the Swiss Alps.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Modern Grid */}
      <Container className="py-12 lg:py-16">
        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-900">{filteredTours.length}</strong> master charters
          </span>
        </div>

        {/* 2-Column Wide Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-xs hover:border-[#C5A880]/50 transition-all duration-300"
            >
              <Link to={`/tour/${tour.slug}`} className="relative aspect-16/10 overflow-hidden block">
                <ImageWithFallback
                  src={tour.image}
                  alt={tour.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <Badge variant="glass" size="xs">
                    {tour.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 z-10 rounded-md bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 text-white shadow-lg pointer-events-none">
                  <span className="font-serif text-lg font-bold text-[#dfcaa4]">
                    ₹{typeof tour.price === 'number' ? tour.price.toLocaleString() : tour.price}
                  </span>
                  <span className="text-[10px] text-slate-300"> / guest</span>
                </div>
              </Link>

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#997548]">
                      {tour.destination}
                    </span>
                    <Rating value={tour.rating} reviewsCount={tour.reviewsCount} size="xs" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-[#997548] transition-colors">
                    <Link to={`/tour/${tour.slug}`}>{tour.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {tour.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                    <div className="rounded-md bg-slate-50 p-2 text-xs">
                      <span className="block text-[10px] uppercase text-slate-400 font-bold">Duration</span>
                      <strong className="text-slate-800 line-clamp-1">{tour.duration}</strong>
                    </div>
                    <div className="rounded-md bg-slate-50 p-2 text-xs">
                      <span className="block text-[10px] uppercase text-slate-400 font-bold">Group</span>
                      <strong className="text-slate-800 line-clamp-1">{tour.groupSize}</strong>
                    </div>
                    <div className="rounded-md bg-slate-50 p-2 text-xs">
                      <span className="block text-[10px] uppercase text-slate-400 font-bold">Fitness</span>
                      <strong className="text-slate-800 line-clamp-1">{tour.activityLevel}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/tour/${tour.slug}`}
                    className="text-xs font-bold text-slate-900 hover:text-[#997548] uppercase tracking-wider"
                  >
                    View Itinerary →
                  </Link>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedTourForBooking(tour)}
                  >
                    Book Charter
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <TourBookingModal
        isOpen={!!selectedTourForBooking}
        onClose={() => setSelectedTourForBooking(null)}
        tour={selectedTourForBooking}
      />
    </div>
  );
}
