import { useState, useEffect } from "react";
import {
  LuCircleCheck as CheckCircle2,
  LuClock as Clock,
  LuMapPin as MapPin,
  LuShieldCheck as ShieldCheck,
  LuSparkles as Sparkles,
  LuArrowRight as ArrowRight,
  LuArrowLeft as ArrowLeft,
  LuPrinter as Printer,
  LuCopy as Copy,
  LuCheck as Check,
  LuTriangleAlert as AlertTriangle,
  LuX as XIcon
} from "react-icons/lu";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import ImageWithFallback from "../common/ImageWithFallback";
import DatePicker from "../common/DatePicker";
import { useBooking } from "../../hooks/useBooking";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

export default function TourBookingModal({
  isOpen,
  onClose,
  tour,
  initialDate = "",
  initialGuests = 2,
}) {
  const { addBooking } = useBooking();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1: Tour Config, 2: Traveler Info, 3: Voucher Confirmation
  const [tourDate, setTourDate] = useState(initialDate);
  const [participants, setParticipants] = useState(initialGuests);
  const [privateGuideAddon, setPrivateGuideAddon] = useState(false);
  const [champagneUpgrade, setChampagneUpgrade] = useState(true);

  // Traveler form state
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dietaryRequirements, setDietaryRequirements] = useState("");
  const [copied, setCopied] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (user) {
      if (!firstName) setFirstName(user.name.split(" ")[0]);
      if (!lastName) setLastName(user.name.split(" ").slice(1).join(" "));
      if (!email) setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      if (initialDate) setTourDate(initialDate);
      if (initialGuests) setParticipants(initialGuests);
      setFormError("");
    }
  }, [isOpen, initialDate, initialGuests]);

  if (!tour) return null;

  const basePrice = tour.price * participants;
  const guideFee = privateGuideAddon ? 1500 : 0;
  const taxes = Math.round(basePrice * 0.1);
  const totalAmount = basePrice + guideFee + taxes;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!tourDate) {
        setFormError("Please select a tour date.");
        addToast("Please select a tour date.", "warning");
        return;
      }
      if (!participants) {
        setFormError("Please select the number of guests.");
        addToast("Please select the number of guests.", "warning");
        return;
      }
      setFormError("");
      setStep(2);
    } else if (step === 2) {
      if (!firstName.trim()) {
        setFormError("Please enter your first name.");
        addToast("Please enter your first name.", "warning");
        return;
      }
      if (!lastName.trim()) {
        setFormError("Please enter your last name.");
        addToast("Please enter your last name.", "warning");
        return;
      }
      if (!email.trim()) {
        setFormError("Please enter your email address.");
        addToast("Please enter your email address.", "warning");
        return;
      }
      if (!phone.trim()) {
        setFormError("Please enter your phone number.");
        addToast("Please enter your phone number.", "warning");
        return;
      }

      setFormError("");
      const bookingRecord = addBooking({
        tourId: tour.id,
        tourSlug: tour.slug,
        title: tour.title,
        destination: tour.destination,
        image: tour.image,
        tourDate,
        participants,
        basePrice,
        taxes,
        guideFee,
        totalAmount,
        guestName: `${firstName} ${lastName}`.trim(),
        guestEmail: email,
        guestPhone: phone,
        pickupLocation,
        dietaryRequirements,
        type: "tour",
        inclusions: [
          champagneUpgrade ? "Champagne Service" : null,
          privateGuideAddon ? "Private Dedicated Master Guide" : null,
        ].filter(Boolean),
      });

      setCreatedBooking(bookingRecord);
      addToast({
        title: "Tour Reserved",
        message: `Tour booking #${bookingRecord.reference} has been confirmed!`,
        type: "success",
      });
      setStep(3);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setFormError("");
    onClose();
  };

  const handleCopyCode = () => {
    if (createdBooking?.reference) {
      navigator.clipboard.writeText(createdBooking.reference);
      setCopied(true);
      addToast("Tour voucher reference copied to clipboard!", "info");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      size="lg"
      title={
        step === 3
          ? "Excursion Confirmed"
          : `Book ${tour.title}`
      }
      description={
        step === 3
          ? "Your private travel itinerary is reserved and confirmed in your account."
          : step === 1
          ? "Step 1 of 2: Select date, travelers, and curated upgrades"
          : "Step 2 of 2: Lead traveler details & hotel pickup instructions"
      }
    >
      {/* STEP 1: TOUR CONFIGURATION */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="space-y-6">
          {/* Tour Summary Card */}
          <div className="flex flex-col sm:flex-row gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4">
            <div className="h-28 sm:w-36 rounded-md overflow-hidden shrink-0">
              <ImageWithFallback
                src={tour.image}
                alt={tour.title}
                aspectRatio="h-full w-full"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                <MapPin className="h-3 w-3 text-[#C5A880]" />
                <span>{tour.destination}</span>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white leading-snug">
                {tour.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#C5A880]" />
                  {tour.duration}
                </span>
                <span>•</span>
                <span>{tour.groupSize}</span>
              </div>
            </div>
          </div>

          {/* Inline Validation Banner inside Modal */}
          {formError && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 p-3.5 text-xs flex items-center justify-between gap-3 animate-slide-down">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                <span className="font-semibold leading-snug">{formError}</span>
              </div>
              <button
                type="button"
                onClick={() => setFormError("")}
                className="text-amber-500/70 hover:text-amber-500 cursor-pointer p-0.5"
                aria-label="Dismiss error"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Date & Guests Selection with react-calendar DatePicker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePicker
              label="Experience Date"
              required
              value={tourDate}
              minDate={new Date()}
              onChange={(e) => {
                setTourDate(e.target.value);
                setFormError("");
              }}
            />

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Number of Guests *
              </label>
              <select
                required
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-xs text-slate-800 dark:text-white focus:border-[#C5A880] focus:outline-none"
              >
                {[1, 2, 3, 4, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional VIP Upgrades */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Curated Excursion Inclusions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/50 p-3 cursor-pointer hover:border-[#C5A880]">
                <input
                  type="checkbox"
                  checked={champagneUpgrade}
                  onChange={(e) => setChampagneUpgrade(e.target.checked)}
                  className="rounded text-[#C5A880] focus:ring-[#C5A880]"
                />
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#C5A880]" />
                  <span className="font-semibold text-slate-800 dark:text-white">Champagne Tasting</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold ml-auto">Included</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/50 p-3 cursor-pointer hover:border-[#C5A880]">
                <input
                  type="checkbox"
                  checked={privateGuideAddon}
                  onChange={(e) => setPrivateGuideAddon(e.target.checked)}
                  className="rounded text-[#C5A880] focus:ring-[#C5A880]"
                />
                <div className="flex items-center gap-1.5 w-full">
                  <span className="font-semibold text-slate-800 dark:text-white">Private Master Guide</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold ml-auto">+₹1,500</span>
                </div>
              </label>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="rounded-lg bg-slate-900 dark:bg-slate-950 dark:border dark:border-slate-800 text-white p-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>₹{typeof tour.price === 'number' ? tour.price.toLocaleString() : tour.price} x {participants} Travelers</span>
              <span>₹{basePrice.toLocaleString()}</span>
            </div>
            {privateGuideAddon && (
              <div className="flex justify-between text-slate-300">
                <span>Dedicated Private Guide</span>
                <span>+₹1,500</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Estimated Marine & Park Permits (10%)</span>
              <span>₹{taxes.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
              <span>Total Estimated:</span>
              <span className="font-serif text-lg text-[#dfcaa4]">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gold"
              size="md"
              rightIcon={ArrowRight}
            >
              Continue to Lead Guest
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: TRAVELER DETAILS */}
      {step === 2 && (
        <form onSubmit={handleNextStep} className="space-y-5">
          {/* Inline Validation Banner inside Modal */}
          {formError && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 p-3.5 text-xs flex items-center justify-between gap-3 animate-slide-down">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                <span className="font-semibold leading-snug">{formError}</span>
              </div>
              <button
                type="button"
                onClick={() => setFormError("")}
                className="text-amber-500/70 hover:text-amber-500 cursor-pointer p-0.5"
                aria-label="Dismiss error"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Lead Traveler First Name"
              placeholder="e.g. Arthur"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFormError("");
              }}
            />
            <Input
              label="Lead Traveler Last Name"
              placeholder="e.g. Pendelton"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setFormError("");
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="arthur.pendelton@luxury.com"
              required
              helperText="Tour voucher and meeting point details will be sent here."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Phone Number"
              type="tel"
              required
              placeholder="+1 (800) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Hotel / Villa Pickup Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. LuxStay Amalfi Cliffside Villa, Room 304"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Dietary or Fitness Preferences <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Vegetarian picnic, non-alcoholic champagne substitute..."
              value={dietaryRequirements}
              onChange={(e) => setDietaryRequirements(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {/* Guarantee Box */}
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-3.5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
              <span>Private VIP Tour Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Certified master captains & certified alpine guides. Free cancellation up to 24 hours prior to excursion departure.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="md"
              leftIcon={ArrowLeft}
              onClick={() => setStep(1)}
            >
              Back
            </Button>

            <Button
              type="submit"
              variant="gold"
              size="md"
              rightIcon={CheckCircle2}
            >
              Confirm Tour Itinerary
            </Button>
          </div>
        </form>
      )}

      {/* STEP 3: VOUCHER CONFIRMATION */}
      {step === 3 && createdBooking && (
        <div className="space-y-6 text-center py-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-inner">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Excursion Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              We Look Forward to Welcoming You!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your private excursion pass has been registered. Detailed meeting point and captain contact info sent to{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{email}</span>.
            </p>
          </div>

          <div className="max-w-md mx-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Excursion Booking Reference
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white tracking-wider">
                {createdBooking.reference}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy reference code"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Date: {tourDate} • {participants} Guests • Total: ₹{totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={Printer}
              onClick={() => window.print()}
            >
              Print Pass
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleResetAndClose}
            >
              Explore More Experiences
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
