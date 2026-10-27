import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuMapPin as MapPin,
  LuUsers as Users,
  LuSearch as Search,
  LuSparkles as Sparkles,
  LuChevronDown as ChevronDown,
  LuPlus as Plus,
  LuMinus as Minus,
  LuCheck as Check
} from "react-icons/lu";
import Button from "../common/Button";
import DateRangePicker from "../common/DateRangePicker";
import { useToast } from "../../hooks/useToast";

export default function BookingSearchWidget({
  variant = "horizontal", // horizontal, card, compact
  initialDestination = "all",
  initialGuests = 2,
  onSearch,
  className = "",
}) {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(initialGuests);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showPromo, setShowPromo] = useState(false);

  const totalGuests = adults + children;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      addToast("Please select check-in and check-out dates.", "warning");
      return;
    }
    if (!totalGuests || totalGuests < 1) {
      addToast("Please select the number of guests.", "warning");
      return;
    }
    setGuestPickerOpen(false);

    const searchParams = new URLSearchParams({
      dest: destination,
      checkIn,
      checkOut,
      guests: totalGuests.toString(),
      rooms: rooms.toString(),
      ...(promoCode ? { promo: promoCode } : {}),
    });

    if (onSearch) {
      onSearch({
        destination,
        checkIn,
        checkOut,
        guests: totalGuests,
        rooms,
        promoCode,
      });
    } else {
      navigate(`/rooms?${searchParams.toString()}`);
    }
  };

  // Card Layout Variant (e.g. for sidebar on details or homepages)
  if (variant === "card") {
    return (
      <div
        className={`rounded-lg border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c1322] p-6 shadow-xl space-y-5 relative z-20 ${className}`}
      >
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
            Direct Reservation
          </span>
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Check Availability
          </h3>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-4 text-xs">
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
              Destination
            </label>
            <div className="relative">
              <select
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 py-3 pl-9 pr-8 text-xs font-medium text-slate-800 dark:text-slate-100 focus:border-[#C5A880] focus:outline-hidden focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="all" className="dark:bg-slate-900 dark:text-white">All Sanctuaries & Resorts</option>
                <option value="aspen" className="dark:bg-slate-900 dark:text-white">Aspen Highlands, USA</option>
                <option value="amalfi" className="dark:bg-slate-900 dark:text-white">Amalfi Coast, Italy</option>
                <option value="bali" className="dark:bg-slate-900 dark:text-white">Ubud & Seminyak, Bali</option>
                <option value="zermatt" className="dark:bg-slate-900 dark:text-white">Zermatt & Matterhorn, Switzerland</option>
                <option value="santorini" className="dark:bg-slate-900 dark:text-white">Oia Caldera, Greece</option>
                <option value="kyoto" className="dark:bg-slate-900 dark:text-white">Kyoto Bamboo Retreat, Japan</option>
              </select>
              <MapPin className="pointer-events-none absolute left-3 top-3.5 h-3.5 w-3.5 text-[#C5A880]" />
            </div>
          </div>

          {/* Dates Grid with react-calendar */}
          <DateRangePicker
            startDate={checkIn}
            endDate={checkOut}
            onStartDateChange={(e) => setCheckIn(e.target.value)}
            onEndDateChange={(e) => setCheckOut(e.target.value)}
            required
          />

          {/* Guests Popover Trigger */}
          <div className={`space-y-1.5 relative ${guestPickerOpen ? "z-50" : "z-20"}`}>
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
              Guests & Suites
            </label>
            <button
              type="button"
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="flex w-full items-center justify-between rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 py-3 px-3.5 text-left text-xs font-medium text-slate-800 dark:text-slate-100 hover:border-[#C5A880] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>
                  {adults} Adults, {children > 0 ? `${children} Kids, ` : ""}{rooms} Suite{rooms > 1 ? "s" : ""}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Popover Dropdown */}
            {guestPickerOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 z-[999] rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xl space-y-3">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Adults</p>
                    <p className="text-[10px] text-slate-400">Ages 13 and above</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center font-bold text-slate-900 dark:text-white">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 10}
                      onClick={() => setAdults(adults + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Children</p>
                    <p className="text-[10px] text-slate-400">Ages 0 to 12</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center font-bold text-slate-900 dark:text-white">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={() => setChildren(children + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Suites / Rooms</p>
                    <p className="text-[10px] text-slate-400">Total units</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center font-bold text-slate-900 dark:text-white">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 5}
                      onClick={() => setRooms(rooms + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Done Button */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setGuestPickerOpen(false)}
                    className="w-full rounded-lg bg-slate-900 dark:bg-[#C5A880] py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white dark:text-slate-950 hover:bg-[#C5A880] hover:text-slate-900 transition-colors"
                  >
                    Apply Guests
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="md"
            rightIcon={Search}
          >
            Check Rates & Suites
          </Button>

          {/* Guarantee notice */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Best Rate Guaranteed • No Booking Fee</span>
          </div>
        </form>
      </div>
    );
  }

  // Default Horizontal Bar (For Hero & Listing Headers)
  return (
    <div
      className={`relative z-30 rounded-lg border border-white/40 dark:border-slate-800/90 bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-xl p-4 sm:p-5 shadow-2xl ${className}`}
    >
      <form onSubmit={handleSearchSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
          {/* Field 1: Destination */}
          <div className="relative rounded-md border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#070b14] p-3 hover:border-[#C5A880] transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Destination / Sanctuary
            </label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#C5A880] shrink-0" />
              <select
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="dark:bg-slate-900 dark:text-white">All Sanctuaries & Resorts</option>
                <option value="aspen" className="dark:bg-slate-900 dark:text-white">Aspen Highlands, USA</option>
                <option value="amalfi" className="dark:bg-slate-900 dark:text-white">Amalfi Coast, Italy</option>
                <option value="bali" className="dark:bg-slate-900 dark:text-white">Ubud & Seminyak, Bali</option>
                <option value="zermatt" className="dark:bg-slate-900 dark:text-white">Zermatt & Matterhorn, Switzerland</option>
                <option value="santorini" className="dark:bg-slate-900 dark:text-white">Oia Caldera, Greece</option>
                <option value="kyoto" className="dark:bg-slate-900 dark:text-white">Kyoto Bamboo Retreat, Japan</option>
              </select>
            </div>
          </div>

          {/* Field 2: Dates with react-calendar */}
          <div className="relative z-40 rounded-md border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#070b14] p-3 hover:border-[#C5A880] transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Dates of Stay
            </label>
            <DateRangePicker
              variant="combined"
              startDate={checkIn}
              endDate={checkOut}
              onStartDateChange={(e) => setCheckIn(e.target.value)}
              onEndDateChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>

          {/* Field 3: Guests Popover */}
          <div className={`relative rounded-md border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#070b14] p-3 hover:border-[#C5A880] transition-colors ${guestPickerOpen ? "z-50" : "z-20"}`}>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Guests & Suites
            </label>
            <button
              type="button"
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#C5A880] shrink-0" />
                <span className="truncate">
                  {adults} Adults, {children > 0 ? `${children} Kids, ` : ""}{rooms} Suite{rooms > 1 ? "s" : ""}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Popover Dropdown */}
            {guestPickerOpen && (
              <div className="absolute left-0 right-0 top-full mt-3 z-[999] rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Adults</p>
                    <p className="text-[10px] text-slate-400">Ages 13+</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center font-bold text-xs text-slate-900 dark:text-white">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 10}
                      onClick={() => setAdults(adults + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Children</p>
                    <p className="text-[10px] text-slate-400">Ages 0 to 12</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center font-bold text-xs text-slate-900 dark:text-white">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={() => setChildren(children + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Suites / Rooms</p>
                    <p className="text-[10px] text-slate-400">Total units</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center font-bold text-xs text-slate-900 dark:text-white">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 5}
                      onClick={() => setRooms(rooms + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setGuestPickerOpen(false)}
                    className="w-full rounded-lg bg-slate-900 dark:bg-[#C5A880] py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white dark:text-slate-950 hover:bg-[#C5A880] hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Field 4: Search Action */}
          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              rightIcon={Search}
              className="py-4 shadow-lg hover:shadow-xl"
            >
              Search Stays
            </Button>
          </div>
        </div>

        {/* Promo code toggle */}
        <div className="mt-2.5 flex items-center justify-between px-2 text-[11px] text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={() => setShowPromo(!showPromo)}
            className="inline-flex items-center gap-1 text-[#997548] dark:text-[#dfcaa4] font-semibold hover:underline cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>{showPromo ? "Hide promo code" : "Have an exclusive promo code?"}</span>
          </button>

          {showPromo && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. LUXURY2026"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs uppercase text-slate-800 dark:text-white placeholder-slate-400 focus:border-[#C5A880] focus:outline-none"
              />
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <span>Direct booking guarantees lowest available rate</span>
          </div>
        </div>
      </form>
    </div>
  );
}
