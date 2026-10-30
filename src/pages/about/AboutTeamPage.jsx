import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuUsers as Users,
  LuAward as Award
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { TEAM_MEMBERS } from "../../data/team";

const CATEGORIES = ["All", "Leadership", "Gastronomy", "Concierge Guild", "Wine & Cellar", "Wellness & Spa"];

export default function AboutTeamPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMembers = selectedCategory === "All"
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter((m) => m.badge === selectedCategory);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/images/placeholders/1905x680.svg"
            alt="LuxStay Team & Masters"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Team & Curators", to: "/about-v3" },
              ]}
              className="justify-center text-slate-400"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#dfcaa4]">
              <Users className="h-3.5 w-3.5" />
              Master Curators & Directors
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              The People Behind the Perfection
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Meet the Michelin-starred chefs, Les Clefs d’Or concierges, and visionary architects dedicated to orchestrating your stay.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Team Directory */}
      <section className="py-20 lg:py-28">
        <Container>
          {/* Category Filter Pills */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 dark:bg-[#C5A059] text-white dark:text-slate-950 shadow-md ring-2 ring-[#C5A880]"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-[#C5A880]/50 transition-all duration-300"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="glass" size="xs">
                      {member.badge}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#997548] dark:text-[#dfcaa4] uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Award className="h-3.5 w-3.5 text-[#C5A880]" /> Verified Master
                    </span>
                    <Link
                      to="/contact"
                      className="font-bold text-slate-900 dark:text-slate-200 hover:text-[#997548] dark:hover:text-[#dfcaa4] uppercase tracking-wider"
                    >
                      Connect →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom Concierge Consultation CTA */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <Container>
          <div className="rounded-lg bg-slate-950 p-8 sm:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
                Les Clefs d'Or Liaison
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                Connect With Our Head Concierge Desk
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Have specific requests regarding private aviation, rare vintage wine allocations, or bespoke security details?
              </p>
            </div>
            <Button to="/contact" variant="primary" size="lg" className="shrink-0">
              Speak with Concierge
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
