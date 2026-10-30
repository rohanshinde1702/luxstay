import {
  LuMapPin as MapPin,
  LuCar as Car,
  LuShip as Ship,
  LuPlane as Plane
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { SITE_CONFIG } from "../../constants/theme";
import { ARRIVAL_POINTS_DATA } from "../../data/contact";

const ICON_MAP = {
  Plane,
  Ship,
  Car,
};

export default function ContactMapPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Top Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Container className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Contact", to: "/contact" },
                { label: "Map & Arrivals Guide", to: "/contact-v2" },
              ]}
            />
            <Badge variant="gold" size="xs">
              Layout 2: Interactive Map & Arrival Points
            </Badge>
          </div>
        </Container>
      </div>

      {/* Simulated Panoramic Map Frame */}
      <div className="relative h-96 sm:h-[480px] bg-slate-900 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Floating Map Pin Box */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="rounded-lg border border-slate-700 bg-slate-950/90 backdrop-blur-md p-6 sm:p-8 text-white shadow-2xl text-center space-y-3 max-w-md border-white/20">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-lg bg-[#C5A880] text-slate-950 shadow-lg">
              <MapPin className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              LuxStay Global Sanctuary
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {SITE_CONFIG.address}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
              >
                Open in Google Maps &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrival Protocols Matrix */}
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
            Arrival Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Arrival Protocols & Gateway Points
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
            Seamless access whether arriving by private aviation, superyacht tender, or limousine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARRIVAL_POINTS_DATA.map((pt, idx) => {
            const Icon = ICON_MAP[pt.iconName] || Plane;
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-xs hover:shadow-sm transition-all space-y-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/15 text-[#997548] dark:text-[#dfcaa4]">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  {pt.mode}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
