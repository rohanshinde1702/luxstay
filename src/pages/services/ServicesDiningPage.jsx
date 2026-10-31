import {
  LuSparkles as Sparkles,
  LuClock as Clock,
  LuArrowRight as ArrowRight
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import { RESTAURANTS_DATA } from "../../data/dining";

export default function ServicesDiningPage() {

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="/images/placeholders/1905x680.svg"
            alt="Fine Dining"
            className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Experiences", to: "/services" },
                { label: "Michelin Gastronomy & Wine", to: "/services-dining" },
              ]}
              className="text-slate-400"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              Culinary Artistry
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
              Fine Dining & The Grand Cru Vaults
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              From 3-Michelin-starred tasting menus to private candlelit wine vaults and in-suite master cooking ateliers.
            </p>
          </div>
        </Container>
      </section>

      {/* Restaurant Collection */}
      <Container className="py-16 lg:py-24 space-y-16">
        {RESTAURANTS_DATA.map((rest, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs transition-all"
          >
            <div className="lg:col-span-6 relative rounded-lg overflow-hidden aspect-16/10 shadow-md">
              <ImageWithFallback
                src={rest.image}
                alt={rest.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="glass" size="xs">
                  {rest.tag}
                </Badge>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#dfcaa4]">
                  {rest.chef}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {rest.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{rest.cuisine}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {rest.desc}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#C5A880]" />
                  <span>{rest.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#C5A880]" />
                  <span>Dress Code: {rest.dress}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  to="/contact"
                  variant="primary"
                  size="sm"
                  rightIcon={ArrowRight}
                >
                  Reserve a Table
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
