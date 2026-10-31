import {
  LuGlobe as Globe2,
  LuBuilding as Building,
  LuCircleCheck as CheckCircle2,
  LuRecycle as Recycle,
  LuSun as Sun,
  LuLeaf as Leaf
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SectionHeading from "../../components/common/SectionHeading";
import Button from "../../components/common/Button";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import CountUp from "../../components/common/CountUp";
import { SUSTAINABILITY_PILLARS_DATA as SUSTAINABILITY_PILLARS } from "../../data/about";

const ECO_ICONS = [Sun, Recycle, Building, Leaf];

export default function AboutModernPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Modern Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img src="/images/placeholders/1905x680.svg"
            alt="Modern Architecture"
            className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Modern Vision & Sustainability", to: "/about-v2" },
              ]}
              className="justify-center text-slate-400"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-200">
              <Globe2 className="h-3.5 w-3.5 text-sky-400" />
              Conscious Luxury & Sustainable Design
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Pioneering the Future of Luxury Living
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Where progressive architectural engineering meets ecological harmony and intuitive human hospitality.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Counter Ribbon */}
      <section className="relative z-20 -mt-8 sm:-mt-10">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl text-center">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                <CountUp value="0%" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Single-Use Plastics
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                <CountUp value="100%" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Renewable Energy
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                <CountUp value="2,400+" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Coral Heads Planted
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                <CountUp value="12,000" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Alpine Pines Restored
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Sustainable Architecture Deep Dive */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-lg overflow-hidden shadow-2xl aspect-4/3">
              <ImageWithFallback
                src="/images/placeholders/750x1000.svg"
                alt="Sustainable Estate"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <SectionHeading
                subtitle="Design Architecture"
                title="Built in Harmony With the Natural World"
                description="Our properties are designed to leave no permanent ecological footprint while maximizing guest comfort."
                alignment="left"
              />

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Every villa and suite is engineered with passive thermal massing, natural cross-ventilation, and rainwater harvesting systems. We partner with world-renowned eco-architects to ensure our sanctuaries enhance their native habitats.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>LEED Platinum and EarthCheck Gold Certified Facilities</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Subterranean Geothermal Heat Exchange Systems</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>On-Site Farm-to-Table Organic Permaculture Gardens</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Four Sustainability Pillars */}
      <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-800/10 blur-3xl pointer-events-none" />
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Ecological Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The Four Cornerstones of Our Eco-Charter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SUSTAINABILITY_PILLARS.map((p, i) => {
              const Icon = ECO_ICONS[i % ECO_ICONS.length];
              return (
                <div
                  key={i}
                  className="rounded-lg border border-emerald-800/60 bg-emerald-900/40 p-7 shadow-xl space-y-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {p.title}
                  </h4>
                  <p className="text-xs text-emerald-100/75 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <Container>
          <div className="rounded-lg bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
                Conscious Travel
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                Stay in Certified Sustainable Sanctuaries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience the harmony of eco-luxury without compromise.
              </p>
            </div>
            <Button to="/rooms" variant="primary" size="lg" className="shrink-0">
              Browse Sanctuaries
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
