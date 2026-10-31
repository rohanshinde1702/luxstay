import { useState } from "react";
import {
  LuPhone as Phone,
  LuMail as Mail,
  LuMapPin as MapPin,
  LuClock as Clock,
  LuSend as Send,
  LuCircleCheck as CheckCircle2
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import { SITE_CONFIG } from "../../constants/theme";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";

export default function ContactPage() {
  const { addToast } = useToast();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryRef(ref);
    setSubmitted(true);
    addToast(`Confidential inquiry ${ref} dispatched to Head Concierge`, "success");
  };

  return (
    <div className="bg-slate-50 dark:bg-[#060913] min-h-screen pb-24 text-slate-900 dark:text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
            alt="Contact Concierge"
            className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholders/800x600.svg"; }} />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-0" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Contact Us", to: "/contact" },
              ]}
              className="text-slate-400"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfcaa4]">
              24/7 VIP Concierge Desk
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
              Connect With LuxStay
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
              Our dedicated guest relations team is available around the clock to assist with bespoke reservations, private aviation, and custom itineraries.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form & Contact Info */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-7 shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                Headquarters & Desk
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#C5A880]/15 text-[#997548] dark:text-[#D4B68A] shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Global Flagship</strong>
                    <p>{SITE_CONFIG.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#C5A880]/15 text-[#997548] dark:text-[#D4B68A] shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Direct Telephone</strong>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-[#997548] dark:hover:text-[#D4B68A]">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#C5A880]/15 text-[#997548] dark:text-[#D4B68A] shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Confidential Concierge</strong>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-[#997548] dark:hover:text-[#D4B68A]">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#C5A880]/15 text-[#997548] dark:text-[#D4B68A] shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Operations Time</strong>
                    <p>24 Hours / 7 Days a Week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="rounded-lg border border-[#C5A880]/30 bg-[#C5A880]/10 dark:bg-[#C5A880]/5 p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#997548] dark:text-[#D4B68A]">
                Privilege Service Protocol
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                15-Minute Priority Response
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                All inquiries submitted through our concierge form are routed directly to on-duty Head Concierges at each respective sanctuary destination.
              </p>
            </div>
          </div>

          {/* Form Column (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-8 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Thank You, {formData.name || "Guest"}
                  </h3>
                  <div className="max-w-md mx-auto rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
                    Inquiry Reference: <strong className="text-slate-900 dark:text-white">{inquiryRef}</strong>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received. Our Head Concierge will contact you within 15 minutes at <span className="font-bold text-slate-900 dark:text-white">{formData.email || "your email"}</span>.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                      Send a Confidential Message
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Please fill out the form below and our concierge will respond promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lord Alistair Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. vance@luxury.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Inquiry Topic *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                      >
                        <option value="" disabled hidden>Select Inquiry Topic</option>
                        <option value="General Inquiry">General Guest Inquiry</option>
                        <option value="Suite Booking">Suite / Villa Reservation</option>
                        <option value="Private Charter">Yacht or Heli Charter</option>
                        <option value="Full Estate Buyout">Full Compound Buyout</option>
                        <option value="Private Event">Wedding or Milestone Gala</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Message & Special Requests *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please let us know your planned travel dates, party size, and any special preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden leading-relaxed"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    rightIcon={Send}
                  >
                    Submit Confidential Inquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
