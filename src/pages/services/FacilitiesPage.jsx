import {
  LuCheck as Check
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import Badge from "../../components/common/Badge";
import { FACILITIES_DATA } from "../../data/facilities";

export default function FacilitiesPage() {
  return (
    <div className="space-y-16 pb-24">
      {/* Hero Header */}
      <section className="relative bg-slate-950 py-16 sm:py-24 text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <Container>
          <Breadcrumbs
            items={[
              { label: "Experiences", path: "/services" },
              { label: "Resort Facilities" },
            ]}
            dark
            className="mb-6"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              World-Class Grounds & Amenities
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Architectural Grandeur & Resort Grounds
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              From our deep-water private marina and FAA helipad to thermal hammams and tournament 
              clay tennis courts, LuxStay delivers an uncompromised standard of global luxury.
            </p>
          </div>
        </Container>
      </section>

      {/* Facilities Grid */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES_DATA.map((fac) => (
            <div
              key={fac.id}
              className="group flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-xs hover:border-[#C5A880]/50 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={fac.image}
                  alt={fac.name}
                  aspectRatio="aspect-16/10"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <Badge variant="glass" size="xs">
                    {fac.category}
                  </Badge>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col justify-between p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#997548] transition-colors leading-snug">
                    {fac.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>

                  {/* Specs */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {fac.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="h-3.5 w-3.5 text-[#997548] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Access Banner */}
        <div className="mt-16 rounded-lg bg-slate-900 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Exclusive Resident Access
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Private Yacht Berths & Helipad Inquiries
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              For private aviation clearances, mega-yacht moorings, or closed-door property buyouts, 
              our Senior Concierge team is available 24 hours daily.
            </p>
            <div className="pt-2">
              <Button
                to="/contact"
                variant="gold"
                size="md"
              >
                Inquire With Concierge
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
