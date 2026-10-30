import { useState } from "react";
import {
  LuCalendar as Calendar,
  LuCheck as Check,
  LuCopy as Copy,
  LuCircleCheck as CheckCircle2,
  LuArrowRight as ArrowRight
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import Badge from "../../components/common/Badge";
import BookingModal from "../../components/booking/BookingModal";
import { OFFERS_DATA } from "../../data/offers";
import { ROOMS_DATA } from "../../data/rooms";
import { useToast } from "../../hooks/useToast";

export default function OffersPage() {
  const { addToast } = useToast();
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedOfferRoom, setSelectedOfferRoom] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addToast({
      title: "Exclusive Code Copied",
      message: `Code "${code}" copied! Enter it during reservation checkout to apply benefits.`,
      type: "success",
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleClaimOffer = (offer) => {
    // Pick suitable room or matching category
    const matchingRoom = ROOMS_DATA.find((r) => r.category === "Villas") || ROOMS_DATA[0];
    setSelectedOfferRoom({
      ...matchingRoom,
      tagline: `${offer.title} (${offer.discountPercent} applied)`,
    });
    addToast({
      title: "Privilege Package Selected",
      message: `Opening reservation checkout for ${offer.title}.`,
      type: "info",
    });
  };

  return (
    <div className="space-y-16 pb-24 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative bg-slate-950 py-16 sm:py-24 text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <Container>
          <Breadcrumbs
            items={[
              { label: "Experiences", path: "/services" },
              { label: "Exclusive Offers & Packages" },
            ]}
            dark
            className="mb-6"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Seasonal Privileges & Stays
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Exclusive Packages & Private Releases
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              Discover limited-edition seasonal retreats featuring complimentary yacht charters, 
              Michelin dining credits, and private helicopter transfers.
            </p>
          </div>
        </Container>
      </section>

      {/* Offers List */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OFFERS_DATA.map((offer) => (
            <div
              key={offer.id}
              className="group flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-[#C5A880]/50 transition-all duration-300"
            >
              {/* Photo & Badge */}
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  aspectRatio="aspect-16/10"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <Badge variant="glass" size="xs">
                    {offer.badge}
                  </Badge>
                </div>

                <div className="absolute bottom-4 right-4 z-10 rounded-md bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 text-white shadow-lg border border-white/10">
                  <span className="font-serif text-base font-bold text-[#dfcaa4]">
                    {offer.discountPercent}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>Valid until: {offer.validUntil}</span>
                    <span>•</span>
                    <span>{offer.minStay}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#997548] dark:group-hover:text-[#dfcaa4] transition-colors leading-tight">
                    {offer.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {offer.tagline}
                  </p>

                  {/* Inclusions */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Package Inclusions
                    </p>
                    <ul className="space-y-1.5">
                      {offer.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4] shrink-0 mt-0.5">
                            <Check className="h-2.5 w-2.5" />
                          </div>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Promo Code & Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Copy code pill */}
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Code:</span>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">{offer.promoCode}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.promoCode)}
                      className="ml-auto text-slate-400 hover:text-slate-900"
                      title="Copy code"
                    >
                      {copiedCode === offer.promoCode ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <Button
                    variant="gold"
                    size="sm"
                    rightIcon={ArrowRight}
                    onClick={() => handleClaimOffer(offer)}
                  >
                    Claim Privilege
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Booking Checkout for Claimed Offer */}
      {selectedOfferRoom && (
        <BookingModal
          isOpen={Boolean(selectedOfferRoom)}
          onClose={() => setSelectedOfferRoom(null)}
          room={selectedOfferRoom}
        />
      )}
    </div>
  );
}
