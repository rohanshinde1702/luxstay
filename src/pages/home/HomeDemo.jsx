import { Link } from "react-router-dom";
import {
  LuSparkles as Sparkles,
  LuCalendar as Calendar,
  LuUsers as Users,
  LuMapPin as MapPin,
  LuArrowRight as ArrowRight,
  LuShieldCheck as ShieldCheck,
  LuStar as Star,
  LuCircleCheck as CheckCircle2,
  LuChevronRight as ChevronRight,
  LuLayers as Layers,
  LuPalette as Palette,
  LuCode as Code2,
  LuComponent as Component
} from "react-icons/lu";
import { NAV_LINKS } from "../../constants/navigation";

export default function HomeDemo() {
  const homeDemos = NAV_LINKS[0]?.children || [];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 text-white">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#dfcaa4] uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>ThemeForest Ready • Luxury React Template</span>
            </div>

            <Link
              to="/design-system"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white transition-colors border border-white/20"
            >
              <Component className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Live Design System</span>
            </Link>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            The Pinnacle of <span className="italic text-[#C5A880]">Luxury Stays</span> & Bespoke Travel
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Crafted for world-class luxury hotels, boutique resorts, private chalets, and premium travel agencies.
            Built with React 19, Tailwind CSS v4, and clean modular architecture.
          </p>

          {/* Quick Mock Search Bar */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-lg p-4 sm:p-5 shadow-2xl text-slate-800 border border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              {/* Destination */}
              <div className="text-left px-3 py-2 rounded-md hover:bg-slate-50 transition-colors border border-slate-100 sm:border-0">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Destination</label>
                <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-slate-800">
                  <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>Aspen, Colorado</span>
                </div>
              </div>

              {/* Check-in / Out */}
              <div className="text-left px-3 py-2 rounded-md hover:bg-slate-50 transition-colors border border-slate-100 sm:border-0">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Dates</label>
                <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-slate-800">
                  <Calendar className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>Oct 12 — Oct 18</span>
                </div>
              </div>

              {/* Guests */}
              <div className="text-left px-3 py-2 rounded-md hover:bg-slate-50 transition-colors border border-slate-100 sm:border-0">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Guests</label>
                <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-slate-800">
                  <Users className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>2 Adults, 1 Suite</span>
                </div>
              </div>

              {/* Action */}
              <div>
                <Link
                  to="/design-system"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F172A] py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#C5A880] hover:text-slate-900"
                >
                  <span>Explore Design</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 sm:gap-14 text-slate-400 text-xs font-medium">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#C5A880] fill-[#C5A880]" />
              <span>5.0 Star Luxury Hospitality Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
              <span>100% Verified Direct Reservation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#C5A880]" />
              <span>Zero Booking Fees & Free Concierge</span>
            </div>
          </div>
        </div>
      </section>

      {/* Planned 8 Homepage Variations Showcase */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#997548]">
            Multi-Concept Architectural Design
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            8 Tailored Homepage Variations
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Each concept is uniquely designed with custom section ordering, hero formats, and tailored hospitality layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeDemos.map((demo, idx) => (
            <div
              key={demo.title}
              className="group flex flex-col justify-between rounded-lg border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A880]/50 hover:shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">0{idx + 1}</span>
                  {demo.badge && (
                    <span className="rounded-full bg-[#C5A880]/15 px-2 py-0.5 text-[10px] font-bold text-[#997548]">
                      {demo.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-[#997548] transition-colors">
                  {demo.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {demo.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to={demo.path}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#997548] hover:text-slate-900 transition-colors"
                >
                  <span>Explore Demo</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech & Architecture Foundation Pillars */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              ThemeForest Quality Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Built for Performance, Speed & Customization
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#C5A880]/20 text-[#C5A880]">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Clean & Modular Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured with modular folders, centralized data files in <code className="text-[#C5A880]">src/data</code>, 
                and zero clutter in the project root.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#C5A880]/20 text-[#C5A880]">
                <Palette className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Tailwind CSS v4 Design Tokens</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consistent luxury color tokens, typography scales, responsive utility prefixes, and accessible focus rings.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#C5A880]/20 text-[#C5A880]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Aggressive Component Reusability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Shared cards, filters, lightboxes, and modals reused across hotel and travel pages to maintain lightweight bundle sizes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
