import { useState } from "react";
import {
  LuClock as Clock,
  LuCheck as Check,
  LuCircleCheck as CheckCircle2,
  LuCalendarCheck as CalendarCheck
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import DatePicker from "../../components/common/DatePicker";
import ImageWithFallback from "../../components/common/ImageWithFallback";
import Badge from "../../components/common/Badge";
import { SERVICES_DATA } from "../../data/services";
import { useToast } from "../../hooks/useToast";

export default function ServicesPage() {
  const { addToast } = useToast();
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleBookService = (service) => {
    setSelectedService(service);
    setSubmitted(false);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      addToast("Please enter your name and contact details.", "warning");
      return;
    }
    if (!appointmentDate) {
      addToast("Please select your preferred date.", "warning");
      return;
    }
    setSubmitted(true);
    addToast("Appointment reserved! Our wellness concierge will confirm shortly.", "success");
    setTimeout(() => {
      setSubmitted(false);
      setSelectedService(null);
      setGuestName("");
      setGuestEmail("");
      setAppointmentDate("");
    }, 2500);
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
              { label: "Hotel Services & Spa" },
            ]}
            dark
            className="mb-6"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Exclusive Guest Experiences
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Curated Services, Spa & Michelin Dining
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              Elevate every moment of your residency with world-class gastronomic artistry, 
              holistic thermal rejuvenation, and around-the-clock bespoke concierge arrangements.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Detailed List */}
      <Container>
        <div className="space-y-16">
          {SERVICES_DATA.map((service, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 lg:gap-12 items-center rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs transition-all duration-300`}
              >
                {/* Photo */}
                <div className="w-full lg:w-1/2 overflow-hidden rounded-lg relative group">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    aspectRatio="aspect-16/10"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="glass" size="sm">
                      {service.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
                      Service 0{idx + 1}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Signature Highlights
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4] shrink-0 mt-0.5">
                            <Check className="h-2.5 w-2.5" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hours & Booking CTA */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    {service.hours && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="h-4 w-4 text-[#C5A880]" />
                        <span>{service.hours}</span>
                      </div>
                    )}

                    <Button
                      variant="gold"
                      size="sm"
                      rightIcon={CalendarCheck}
                      onClick={() => handleBookService(service)}
                    >
                      Reserve Appointment
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Appointment Booking Modal */}
      {selectedService && (
        <Modal
          isOpen={Boolean(selectedService)}
          onClose={() => setSelectedService(null)}
          title={`Reserve ${selectedService.title}`}
          description="Schedule your private appointment or dining table with our concierge."
        >
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">
                Arrangement Confirmed
              </h4>
              <p className="text-xs text-slate-500">
                Our Head Concierge has noted your reservation for {appointmentDate}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Guest Full Name"
                  placeholder="e.g. Lord Charles"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
                <Input
                  label="Contact Email"
                  type="email"
                  placeholder="charles@example.com"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DatePicker
                  label="Preferred Date"
                  required
                  value={appointmentDate}
                  minDate={new Date()}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
                <Input
                  label="Preferred Time"
                  placeholder="e.g. 07:30 PM"
                  required
                />
              </div>

              <Input
                label="Custom Requests or Dietary Preferences"
                placeholder="e.g. Sommelier wine pairing preference, outdoor table..."
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedService(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Confirm Arrangement
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
