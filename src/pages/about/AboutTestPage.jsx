import { Link } from "react-router-dom";
import {
  LuAward as Award,
  LuShieldCheck as ShieldCheck,
  LuHeartHandshake as HeartHandshake,
  LuSparkles as Sparkles,
  LuChevronRight as ChevronRight
} from "react-icons/lu";

export default function AboutTestPage() {
  return (
    <div className="py-12 sm:py-16">
      {/* Breadcrumbs */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-medium text-slate-800">About Us</span>
        </nav>
      </div>

      {/* Header section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C5A880]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#997548]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Phase 1 Verified</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Crafting Extraordinary Hospitality & Travel Escapes
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Welcome to LuxStay. This page validates our nested React Router setup, typography tokens, 
            and layout shells during the foundation phase.
          </p>
        </div>

        {/* Feature pillars */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 text-[#C5A880] mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Unmatched Craftsmanship</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every suite and villa is individually inspected and appointed with the finest bespoke finishes.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 text-[#C5A880] mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Absolute Discretion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Private check-ins, dedicated VIP security details, and seamless sanctuary environments.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 text-[#C5A880] mb-4">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">24/7 Royal Concierge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalized private excursions, helicopter transfers, and Michelin-star private chef bookings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
