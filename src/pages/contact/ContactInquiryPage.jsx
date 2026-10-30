import { useState } from "react";
import {
  LuCircleCheck as CheckCircle2,
  LuSend as Send
} from "react-icons/lu";
import Container from "../../components/common/Container";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import DatePicker from "../../components/common/DatePicker";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";

export default function ContactInquiryPage() {
  const { addToast } = useToast();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("full-estate"); // full-estate | wedding | corporate
  const [proposalRef, setProposalRef] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    date: "",
    duration: "",
    guests: "",
    requirements: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `BYO-${Math.floor(100000 + Math.random() * 900000)}`;
    setProposalRef(ref);
    setSubmitted(true);
    addToast(`Buyout dossier ${ref} dispatched to Private Client Director`, "success", 6000);
  };

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
                { label: "VIP Buyout & Event Inquiry", to: "/contact-v3" },
              ]}
            />
            <Badge variant="gold" size="xs">
              Layout 3: VIP Buyout & Celebration Planner
            </Badge>
          </div>
        </Container>
      </div>

      <Container className="py-10 lg:py-16">
        <div className="max-w-4xl mx-auto rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-md">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
                VIP Inquiry Received
              </h3>
              <div className="max-w-md mx-auto rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
                Proposal Reference: <strong className="text-slate-900 dark:text-white">{proposalRef}</strong>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Our Private Client Director will contact you within 2 hours at <span className="font-bold text-slate-900 dark:text-white">{formData.email}</span> to begin custom floorplan and culinary planning.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Submit Another Plan
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
                  Exclusive Experience Planning
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                  Plan a Private Buyout or Milestone Gala
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Complete exclusivity of our villas, culinary kitchens, and private grounds for your party.
                </p>
              </div>

              {/* Event Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Event / Buyout Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "full-estate", title: "Full Estate Buyout", desc: "Up to 24 Guests" },
                    { id: "wedding", title: "Luxury Wedding", desc: "Up to 120 Guests" },
                    { id: "corporate", title: "Executive Retreat", desc: "Confidential Summit" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setInquiryType(t.id)}
                      className={`rounded-lg p-4 text-left border transition-all cursor-pointer ${
                        inquiryType === t.id
                          ? "bg-slate-900 dark:bg-[#C5A059] text-white dark:text-slate-950 border-slate-900 dark:border-[#C5A059] shadow-md"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <strong className="block text-xs font-bold">{t.title}</strong>
                      <span className={`text-[11px] ${inquiryType === t.id ? "text-slate-300 dark:text-slate-800" : "text-slate-500 dark:text-slate-400"}`}>
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Lead Organizer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Vivienne Montgomery"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. beatrice@rossi.it"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <DatePicker
                  label="Planned Date"
                  required
                  value={formData.date}
                  minDate={new Date()}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Duration *
                  </label>
                  <select
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                  >
                    <option value="" disabled hidden>Select Duration</option>
                    <option value="Weekend (3 Nights)">Weekend (3 Nights)</option>
                    <option value="Full Week (7 Nights)">Full Week (7 Nights)</option>
                    <option value="Fortnight (14 Nights)">Fortnight (14 Nights)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Estimated Guests *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 12"
                    value={formData.guests}
                    min={1}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value ? Number(e.target.value) : "" })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Custom Requirements & Culinary Vision *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Special requests regarding Michelin menus, private yacht moorings, or security details..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs text-slate-900 dark:text-white focus:border-[#C5A880] focus:outline-hidden leading-relaxed"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                rightIcon={Send}
              >
                Request VIP Buyout Proposal
              </Button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
