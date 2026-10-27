import { useState, useMemo } from "react";
import {
  LuCompass as Compass,
  LuClock as Clock,
  LuMapPin as MapPin,
  LuSparkles as Sparkles,
  LuCircleCheck as CheckCircle2,
  LuShieldCheck as ShieldCheck,
  LuAward as Award,
  LuUtensils as Utensils,
  LuWaves as Waves,
  LuMountain as Mountain,
  LuHeartHandshake as HeartHandshake,
  LuArrowRight as ArrowRight,
  LuPhoneCall as PhoneCall
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SectionHeading from "../../components/common/SectionHeading";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import TourBookingModal from "../../components/tours/TourBookingModal";
import { ACTIVITIES_DATA } from "../../data/activities";

const CATEGORIES = [
  { id: "all", label: "All Experiences" },
  { id: "Culinary & Wine", label: "Culinary & Wine", icon: Utensils },
  { id: "Marine & Ocean", label: "Marine & Ocean", icon: Waves },
  { id: "Alpine & Sky", label: "Alpine & Sky", icon: Mountain },
  { id: "Wellness & Culture", label: "Wellness & Culture", icon: HeartHandshake },
  { id: "Alpine & Nature", label: "Alpine & Nature", icon: Compass },
];

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedActivityForBooking, setSelectedActivityForBooking] = useState(null);

  const filteredActivities = useMemo(() => {
    if (selectedCategory === "all") return ACTIVITIES_DATA;
    return ACTIVITIES_DATA.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80"
            alt="LuxStay Activities Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Bespoke Activities", to: "/activities" },
              ]}
              className="justify-center text-slate-400"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#dfcaa4]">
              <Sparkles className="h-3.5 w-3.5" />
              Signature Experiences
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Extraordinary Activities
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              From white truffle foraging with canine masters in Tuscany to private manta ray safaris in Bali, discover private excursions designed for profound memories.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Experience Grid Section */}
      <Container className="py-12 lg:py-16">
        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-[#C5A880]"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {Icon && <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-[#dfcaa4]" : "text-slate-400"}`} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Activities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-[#C5A880]/50"
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-16/11">
                <ImageWithFallback
                  src={act.image}
                  alt={act.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="glass" size="xs">
                    {act.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 z-10 rounded-md bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-white shadow-lg">
                  <span className="font-serif text-lg font-bold text-[#dfcaa4]">
                    ₹{typeof act.price === 'number' ? act.price.toLocaleString() : act.price}
                  </span>
                  <span className="text-[10px] text-slate-300"> / guest</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                      <span>{act.location}</span>
                    </div>
                    <Rating value={act.rating} size="xs" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#997548] transition-colors leading-snug">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {act.description}
                  </p>

                  {/* Key Inclusions */}
                  {act.inclusions && act.inclusions.length > 0 && (
                    <div className="pt-2 space-y-1.5 border-t border-slate-100">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Experience Features
                      </span>
                      <div className="space-y-1">
                        {act.inclusions.slice(0, 3).map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#997548] shrink-0" />
                            <span className="line-clamp-1">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>{act.duration}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      setSelectedActivityForBooking({
                        id: act.id,
                        title: act.title,
                        price: act.price,
                        destination: act.location,
                        duration: act.duration,
                      })
                    }
                  >
                    Reserve Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose LuxStay Concierge */}
        <div className="mt-20 rounded-lg border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs">
          <SectionHeading
            subtitle="The LuxStay Distinction"
            title="Uncompromising Privileges on Every Outing"
            description="Our experiential curation follows rigorous standards of privacy, security, and world-class expertise."
            alignment="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">
                100% Private Charters
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Never share boats, helicopters, or tasting rooms with strangers. Every outing is reserved strictly for your group.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548]">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">
                Master Practitioners
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Led exclusively by certified mountain rescue pilots, Michelin-starred chefs, PADI dive masters, and licensed cultural anthropologists.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">
                Door-to-Door Chauffeur
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Complimentary luxury SUV and Rolls-Royce transfers from your villa directly to marinas, helipads, and trailheads.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548]">
                <PhoneCall className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">
                24/7 Butler Liaison
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Special dietary requests, rare champagne vintages, and customized schedules managed seamlessly by your personal concierge.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-12 rounded-lg bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#dfcaa4]">
              VIP Bespoke Requests
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Looking for a Custom Unlisted Adventure?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our Chief Experience Designer to create custom mountaineering, submarine diving, or private palace galas.
            </p>
          </div>
          <Button
            to="/tours"
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            className="shrink-0"
          >
            Browse Expeditions
          </Button>
        </div>
      </Container>

      {/* Booking Flow Modal */}
      <TourBookingModal
        isOpen={!!selectedActivityForBooking}
        onClose={() => setSelectedActivityForBooking(null)}
        tour={selectedActivityForBooking}
      />
    </div>
  );
}
