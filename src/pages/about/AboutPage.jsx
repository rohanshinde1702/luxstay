import {
  LuAward as Award,
  LuCrown as Crown,
  LuSparkles as Sparkles,
  LuShieldCheck as ShieldCheck,
  LuHeartHandshake as HeartHandshake,
  LuArrowRight as ArrowRight
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SectionHeading from "../../components/common/SectionHeading";
import Button from "../../components/common/Button";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import CountUp from "../../components/common/CountUp";
import { TEAM_MEMBERS } from "../../data/team";
import { 
  TIMELINE_EVENTS_DATA as TIMELINE_EVENTS, 
  CORE_VALUES_DATA as CORE_VALUES 
} from "../../data/about";

const VALUE_ICONS = [ShieldCheck, Sparkles, Crown, HeartHandshake];

export default function AboutPage() {
  return (
    <div className="bg-slate-50 dark:bg-[#060913] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Hero Cover */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
            alt="LuxStay Heritage Estate"
            className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
              ]}
              className="justify-center text-slate-400"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#dfcaa4]">
              <Award className="h-3.5 w-3.5" />
              Nearly a Century of Grace
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              The Story of LuxStay
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Born from a passion for architecture, privacy, and impeccable personal service, LuxStay has set the gold standard in hospitality since 1928.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Story & Heritage Philosophy */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <SectionHeading
                subtitle="Our Philosophy"
                title="Hospitality Elevated to an Art Form"
                description="True luxury is not merely opulent decor—it is the feeling of absolute tranquility and effortless belonging."
                alignment="left"
              />

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  From our founding in the golden age of European travel to our worldwide portfolio of villas, resorts, and private yachts today, LuxStay remains committed to one timeless standard: creating rare spaces where guests can truly disconnect from the world and reconnect with what matters.
                </p>
                <p>
                  Every property in our collection is architecturally unique, reflecting the heritage, flora, and spirit of its region while delivering seamless modern comfort.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    <CountUp value={1928} separator={false} />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Founded
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    <CountUp value="98%" />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Guest Satisfaction
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    <CountUp value={14} />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Global Awards
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl aspect-4/3">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                  alt="LuxStay Heritage Suite"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Chronological Heritage Timeline */}
      <section className="py-20 bg-slate-900 dark:bg-[#070b14] text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              A Century of Milestones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The Evolution of an Icon
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-800 bg-slate-950 dark:bg-[#0c1322] dark:border-slate-800 p-6 space-y-3 relative group hover:border-[#C5A880]/60 transition-all"
              >
                <span className="font-serif text-3xl font-bold text-[#dfcaa4]">
                  {event.year}
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  {event.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Four Core Values */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            subtitle="The Principles We Live By"
            title="Our Four Enduring Pillars"
            description="Guiding every interaction, design decision, and service gesture across our collection."
            alignment="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((val, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-7 shadow-xs hover:shadow-lg transition-all space-y-3 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548] dark:text-[#D4B68A]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership Highlights */}
      <section className="py-20 bg-slate-100/70 dark:bg-[#070b14] border-t border-slate-200 dark:border-slate-800">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              subtitle="The Guardians of Hospitality"
              title="Executive Leadership"
              description="Guided by visionaries dedicated to advancing luxury service worldwide."
              alignment="left"
            />
            <Button to="/about-v3" variant="outline" size="md" rightIcon={ArrowRight}>
              Meet All Curators & Masters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] shadow-xs hover:shadow-lg transition-all"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#997548] dark:text-[#D4B68A] uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <Container>
          <div className="rounded-lg bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
                Experience LuxStay
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                Ready to Experience Unmatched Hospitality?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Discover our curated rooms, private villas, and bespoke expeditions.
              </p>
            </div>
            <Button to="/rooms" variant="primary" size="lg" className="shrink-0">
              Browse Suites & Villas
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
