import { useState, useEffect } from "react";
import {
  LuCircleCheck as CheckCircle2,
  LuShieldCheck as ShieldCheck,
  LuSparkles as Sparkles,
  LuCar as Car,
  LuArrowRight as ArrowRight,
  LuArrowLeft as ArrowLeft,
  LuPrinter as Printer,
  LuCopy as Copy,
  LuCheck as Check,
  LuTag as Tag,
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

export default function BookingModal({
  isOpen,
  onClose,
  room,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 2,
  initialPromoCode = "",
}) {
  const { addBooking, validatePromoCode } = useBooking();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1: Review, 2: Guest Info, 3: Confirmation
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [champagneWelcome, setChampagneWelcome] = useState(true);
  
  // Promo code state
  const [promoInput, setPromoInput] = useState(initialPromoCode || "");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  // Guest details form state (auto filled if user logged in)
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [specialRequests, setSpecialRequests] = useState("");
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
      if (initialCheckIn) setCheckIn(initialCheckIn);
      if (initialCheckOut) setCheckOut(initialCheckOut);
      if (initialGuests) setGuests(initialGuests);
      if (initialPromoCode) setPromoInput(initialPromoCode);
      setFormError("");

      const activeCheckIn = initialCheckIn || checkIn;
      const activeCheckOut = initialCheckOut || checkOut;
      const promoToValidate = initialPromoCode || promoInput;

      if (promoToValidate && room) {
        const date1 = new Date(activeCheckIn);
        const date2 = new Date(activeCheckOut);
        const diffTime = Math.abs(date2 - date1);
        const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 3;
        const subtotal = (Number(room.price) || 25000) * nights;
        const res = validatePromoCode(promoToValidate, subtotal);
        if (res?.valid) {
          setAppliedPromo(res);
          setPromoError("");
        }
      }
    }
  }, [isOpen, initialCheckIn, initialCheckOut, initialGuests, initialPromoCode, room, validatePromoCode]);

  if (!room) return null;

  // Normalize room data safely to handle both room.name and room.title
  const roomName = room.name || room.title || "Beachfront Sanctuary Villa";
  const roomCategory = room.category || "Signature Villa";
  const roomImage =
    room.image ||
    (Array.isArray(room.images) && room.images[0]) ||
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80";
  const roomPrice = Number(room.price) || 24999;
  const roomBeds = room.beds || "1 King Bed • Oceanfront";
  const roomSize = room.size || "95 m² / 1,020 sq ft";
  const roomTagline =
    room.tagline ||
    room.description ||
    "Panoramic ocean views, private plunge pool, and dedicated butler service";

  // Calculate nights
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = Math.abs(date2 - date1);
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 3;

  const roomSubtotal = roomPrice * nights;
  const taxesAndFees = Math.round(roomSubtotal * 0.12);
  const transferFee = airportTransfer ? 2500 : 0;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const totalAmount = Math.max(0, roomSubtotal + taxesAndFees + transferFee - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = validatePromoCode(promoInput, roomSubtotal);
    if (res.valid) {
      setAppliedPromo(res);
      setPromoError("");
    } else {
      setAppliedPromo(null);
      setPromoError(res.message || "Invalid voucher code");
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!checkIn) {
        setFormError("Please select a check-in date.");
        addToast("Please select a check-in date.", "warning");
        return;
      }
      if (!checkOut) {
        setFormError("Please select a check-out date.");
        addToast("Please select a check-out date.", "warning");
        return;
      }
      if (!guests) {
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
      // Create real dynamic reservation
      const bookingRecord = addBooking({
        roomId: room.id || `room-${Date.now()}`,
        roomSlug: room.slug || "luxury-suite",
        roomName: roomName,
        category: roomCategory,
        image: roomImage,
        checkIn,
        checkOut,
        nights,
        guests,
        roomSubtotal,
        taxesAndFees,
        transferFee,
        discountAmount,
        appliedPromoCode: appliedPromo?.code || null,
        totalAmount,
        guestName: `${firstName} ${lastName}`.trim(),
        guestEmail: email,
        guestPhone: phone,
        specialRequests,
        inclusions: [
          champagneWelcome ? "Complimentary Welcome Champagne" : null,
          airportTransfer ? "VIP Airport Chauffeur Service" : null,
        ].filter(Boolean),
      });

      setCreatedBooking(bookingRecord);
      addToast({
        title: "Reservation Confirmed",
        message: `Booking #${bookingRecord.reference} has been placed successfully!`,
        type: "success",
      });
      setStep(3);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setAppliedPromo(null);
    setPromoInput("");
    setFormError("");
    onClose();
  };

  const handleCopyCode = () => {
    if (createdBooking?.reference) {
      navigator.clipboard.writeText(createdBooking.reference);
      setCopied(true);
      addToast("Booking reference copied to clipboard!", "info");
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
          ? "Reservation Confirmed"
          : `Reserve ${roomName}`
      }
      description={
        step === 3
          ? "Your sanctuary reservation has been confirmed and registered in your account."
          : step === 1
          ? "Step 1 of 2: Review your dates, inclusions, and privilege vouchers"
          : "Step 2 of 2: Guest details and special arrangements"
      }
    >
      {/* STEP 1: SUMMARY & DATES */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="space-y-6">
          {/* Room Header Card */}
          <div className="flex flex-col sm:flex-row gap-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4">
            <div className="h-28 sm:w-36 rounded-md overflow-hidden shrink-0">
              <ImageWithFallback
                src={roomImage}
                alt={roomName}
                aspectRatio="h-full w-full"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <span className="rounded bg-[#C5A880]/15 dark:bg-[#C5A880]/10 px-2 py-0.5 text-[10px] font-bold text-[#997548] dark:text-[#D4B68A] uppercase">
                {roomCategory}
              </span>
              <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                {roomName}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{roomTagline}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium pt-1">
                {roomBeds} {roomSize ? `• ${roomSize}` : ""}
              </p>
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
                aria-label="Dismiss message"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Date & Guest Inputs with react-calendar DatePicker */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <DatePicker
              label="Check-in"
              required
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setFormError("");
              }}
            />

            <DatePicker
              label="Check-out"
              required
              value={checkOut}
              minDate={checkIn}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setFormError("");
              }}
            />

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                Guests *
              </label>
              <select
                required
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0a0f1d] px-3.5 py-2.5 text-xs font-medium text-slate-800 dark:text-white focus:border-[#C5A880] focus:outline-hidden"
              >
                {[...Array(room.guests || 4)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Complimentary Perks & Add-ons */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Curated In-Suite Inclusions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/50 p-3 cursor-pointer hover:border-[#C5A880]">
                <input
                  type="checkbox"
                  checked={champagneWelcome}
                  onChange={(e) => setChampagneWelcome(e.target.checked)}
                  className="rounded text-[#C5A880] focus:ring-[#C5A880]"
                />
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#C5A880]" />
                  <span className="font-semibold text-slate-800 dark:text-white">Welcome Champagne</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold ml-auto">Free</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/50 p-3 cursor-pointer hover:border-[#C5A880]">
                <input
                  type="checkbox"
                  checked={airportTransfer}
                  onChange={(e) => setAirportTransfer(e.target.checked)}
                  className="rounded text-[#C5A880] focus:ring-[#C5A880]"
                />
                <div className="flex items-center gap-1.5 w-full">
                  <Car className="h-4 w-4 text-[#C5A880]" />
                  <span className="font-semibold text-slate-800 dark:text-white">VIP Airport Chauffeur</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold ml-auto">+$2,500</span>
                </div>
              </label>
            </div>
          </div>

          {/* Privilege Promo Code Form */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Promo or VIP Voucher (e.g. VIP25K, LUXSTAY25, WELCOME)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 pl-9 pr-3 py-2 text-xs uppercase text-slate-800 dark:text-white placeholder-slate-400 focus:border-[#C5A880] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-[#C5A880] hover:text-slate-950 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                <span>{appliedPromo.label} applied (-${appliedPromo.discount.toLocaleString()})</span>
              </p>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-500 font-medium">
                {promoError}
              </p>
            )}
          </div>

          {/* Dynamic Price Breakdown */}
          <div className="rounded-lg bg-slate-900 dark:bg-slate-950 dark:border dark:border-slate-800 text-white p-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>${roomPrice.toLocaleString()} x {nights} Nights</span>
              <span>${roomSubtotal.toLocaleString()}</span>
            </div>
            {airportTransfer && (
              <div className="flex justify-between text-slate-300">
                <span>VIP Airport Transfer</span>
                <span>+$2,500</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Estimated Taxes & Resort Fees (12%)</span>
              <span>${taxesAndFees.toLocaleString()}</span>
            </div>
            {appliedPromo && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Privilege Voucher Discount</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
              <span>Total Estimated:</span>
              <span className="font-serif text-lg text-[#dfcaa4]">
                ${totalAmount.toLocaleString()}
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
              Continue to Guest Info
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: GUEST INFORMATION */}
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
              label="First Name"
              placeholder="e.g. Arthur"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFormError("");
              }}
            />
            <Input
              label="Last Name"
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
              helperText="Confidential voucher & booking receipt will be delivered here."
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
              Special Concierge & Dietary Requests <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. High floor ocean view, late checkout at 4 PM, champagne on arrival..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {/* Secure Booking Notice */}
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-3.5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
              <span>Direct Best Rate Guarantee • Zero Prepayment Required</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your reservation is registered directly with LuxStay Sanctuary concierge. Complimentary cancellation up to 48 hours prior to arrival.
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
              Complete Reservation
            </Button>
          </div>
        </form>
      )}

      {/* STEP 3: CONFIRMATION SCREEN */}
      {step === 3 && createdBooking && (
        <div className="space-y-6 text-center py-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-inner">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Reservation Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Thank You, {firstName || "Valued Guest"}!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your sanctuary suite has been registered successfully. A confirmation pass has been dispatched to{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{email}</span>.
            </p>
          </div>

          {/* Booking Reference Box */}
          <div className="max-w-md mx-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Booking Reference Code
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
              {checkIn} to {checkOut} ({nights} Nights) • {guests} Guests • Total: ${totalAmount.toLocaleString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={Printer}
              onClick={() => window.print()}
            >
              Print Voucher
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleResetAndClose}
            >
              Return to Stays
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
