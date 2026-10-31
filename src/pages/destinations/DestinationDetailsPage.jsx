import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LuMapPin as MapPin,
  LuSun as Sun,
  LuCalendar as Calendar,
  LuCoins as Coins,
  LuPlane as Plane,
  LuSparkles as Sparkles,
  LuArrowRight as ArrowRight,
  LuChevronRight as ChevronRight,
  LuCircleCheck as CheckCircle2
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import Button from "../../components/common/Button";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import RoomCard from "../../components/rooms/RoomCard";
import TourCard from "../../components/tours/TourCard";
import NotFoundPage from "../error/NotFoundPage";
import { DESTINATIONS_DATA } from "../../data/destinations";
import { ROOMS_DATA } from "../../data/rooms";
import { TOURS_DATA } from "../../data/tours";

export default function DestinationDetailsPage() {
  const { slug } = useParams();

  const destination = useMemo(() => {
    return (
      DESTINATIONS_DATA.find((d) => d.slug === slug) ||
      DESTINATIONS_DATA.find((d) => d.slug.startsWith(slug)) ||
      DESTINATIONS_DATA.find((d) => d.id.includes(slug)) ||
      DESTINATIONS_DATA[0]
    );
  }, [slug]);

  // Find related curated rooms and tours
  const relatedRooms = useMemo(() => {
    if (destination?.roomIds && destination.roomIds.length > 0) {
      return ROOMS_DATA.filter((r) => destination.roomIds.includes(r.id));
    }
    return ROOMS_DATA.slice(0, 2);
  }, [destination]);

  const relatedTours = useMemo(() => {
    if (destination?.tourIds && destination.tourIds.length > 0) {
      return TOURS_DATA.filter((t) => destination.tourIds.includes(t.id));
    }
    if (destination?.slug) {
      return TOURS_DATA.filter((t) => t.destinationSlug === destination.slug).slice(0, 2);
    }
    return [];
  }, [destination]);

  if (!destination) {
    return <NotFoundPage />;
  }

  return (
    <div className="space-y-16 pb-24 bg-transparent text-slate-900 dark:text-slate-100">
      {/* Panoramic Hero Cover */}
      <section className="relative min-h-[480px] sm:min-h-[560px] flex items-end bg-slate-950 text-white overflow-hidden pb-12 sm:pb-16 pt-24">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={destination.image}
            alt={destination.title}
            aspectRatio="h-full w-full"
            className="h-full w-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <Container className="relative z-10 space-y-6">
          <Breadcrumbs
            items={[
              { label: "Destinations", path: "/destinations" },
              { label: destination.country, path: "/destinations" },
              { label: destination.title },
            ]}
            dark
          />

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge variant="glass" size="xs" icon={MapPin}>
                  {destination.country}
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#dfcaa4]">
                  {destination.region}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {destination.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                {destination.tagline}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <Rating value={destination.rating} reviewsCount={destination.reviewsCount} size="md" />
              <div className="text-xs text-slate-300">
                Starting from <span className="font-serif text-2xl font-bold text-[#dfcaa4]">${typeof destination.startingPrice === 'number' ? destination.startingPrice.toLocaleString() : destination.startingPrice}</span> / night
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Facts Grid */}
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-5 sm:p-6 shadow-xs text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Calendar className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Best Season</span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">{destination.quickFacts?.bestTime || "May to Oct"}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Sun className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Climate</span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">{destination.quickFacts?.climate || "Sunny (26°C)"}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Coins className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Currency</span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">{destination.quickFacts?.currency || "EUR (€)"}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Plane className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Gateway Airport</span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{destination.quickFacts?.airport || "International (NAP)"}</p>
          </div>

          <div className="space-y-1 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Portfolio</span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {destination.propertiesCount} Stays • {destination.toursCount} Tours
            </p>
          </div>
        </div>
      </Container>

      {/* Destination Overview & Highlights */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left 2 Cols: Guide Content & Landmarks */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#D4B68A]">
                Editorial Destination Guide
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                About {destination.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {destination.overview}
              </p>
            </div>

            {/* Top Landmarks */}
            {destination.topLandmarks && destination.topLandmarks.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  Iconic Highlights & Landmarks
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.topLandmarks.map((lm, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0c1322] p-5 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold">
                          0{i + 1}
                        </span>
                        <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                          {lm.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                        {lm.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curated Stays in this destination */}
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#D4B68A]">
                    Private Accommodations
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Featured Stays in {destination.title.split(" &")[0]}
                  </h3>
                </div>

                <Link
                  to="/rooms"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#D4B68A]"
                >
                  <span>All Stays</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedRooms.map((room) => (
                  <RoomCard key={room.id} room={room} variant="grid" />
                ))}
              </div>
            </div>

            {/* Recommended Tours in this destination */}
            {relatedTours.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#D4B68A]">
                      Curated Excursions
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                      Recommended Tours & Cruises
                    </h3>
                  </div>

                  <Link
                    to="/tours"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#D4B68A]"
                  >
                    <span>All Tours</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {relatedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} variant="list" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Insider Tips & Concierge CTA Card */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            {/* Insider Tips Card */}
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#997548] dark:text-[#D4B68A]">
                  Head Concierge Notes
                </span>
                <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Local Insider Tips
                </h4>
              </div>

              <ul className="space-y-3">
                {(destination.insiderTips || [
                  "Arrange private helicopter or yacht transfers in advance during peak season.",
                  "Request reservations for clifftop dining terraces at least two weeks prior.",
                ]).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concierge Inquiry Box */}
            <div className="rounded-lg bg-slate-900 dark:bg-[#0c1322] dark:border dark:border-slate-800 text-white p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Custom Travel Design
              </span>
              <h4 className="font-serif text-xl font-bold text-white">
                Plan a Bespoke Itinerary to {destination.title.split(" &")[0]}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Our destination specialists will craft a seamless journey connecting private villa 
                residences, helicopter excursions, and Michelin reservations.
              </p>
              <Button
                to="/contact"
                variant="gold"
                size="sm"
                fullWidth
                rightIcon={ArrowRight}
              >
                Inquire with Concierge
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
