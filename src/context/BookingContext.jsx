import { createContext, useState, useEffect, useCallback } from "react";
import { useToast } from "../hooks/useToast";
import { addHotelBooking } from "../pages/admin/adminStorage";

export const BookingContext = createContext(null);

const STORAGE_KEY = "luxstay_reservations";

const PROMO_CODES = {
  LUXSTAY25: { type: "percent", value: 25, label: "25% Inaugural Suite Discount" },
  VIP25K: { type: "fixed", value: 25000, label: "$25,000 Welcome Member Credit" },
  WELCOME: { type: "percent", value: 15, label: "15% Direct Booking Privilege" },
  SUMMER10: { type: "percent", value: 10, label: "10% Seasonal Privilege" },
  BEACHVILLA25: { type: "percent", value: 25, label: "25% Beachfront Villa Privilege" },
  BEACH40: { type: "percent", value: 40, label: "40% Exclusive Stay Discount" },
  SUMMER40: { type: "percent", value: 40, label: "40% Limited-Time Summer Privilege" },
  GRANDSTAY: { type: "fixed", value: 20000, label: "$20,000 Grand Palace Luxury Credit" },
  RESORTZEN: { type: "percent", value: 20, label: "Stay 5, Pay 4 (20% Off Wellness Retreat)" },
  WANDERLUST: { type: "percent", value: 15, label: "15% Bespoke Expedition Privilege" },
  BOUTIQUE15: { type: "percent", value: 15, label: "15% Heritage Boutique Suite Privilege" },
  VILLALUXE: { type: "fixed", value: 30000, label: "$30,000 Private Villa Chef Perk" },
  SKYLINE20: { type: "percent", value: 20, label: "20% Skyline Penthouse Privilege" },
  NOCTURNE: { type: "percent", value: 15, label: "15% Nocturne VIP Nightlife Privilege" },
  DIRECTBEST: { type: "percent", value: 15, label: "15% Direct Booking Upgrade Perk" },
  SUITELUXE: { type: "fixed", value: 15000, label: "$15,000 In-Suite Dining & Limousine Credit" },
  SPAESCAPE: { type: "fixed", value: 10000, label: "$10,000 Spa Sanctuary Credit" },
  GOURMETVIP: { type: "fixed", value: 8000, label: "$8,000 Michelin Dining Privilege" },
  WELLNESS: { type: "fixed", value: 5000, label: "$5,000 Wellness Day Pass Perk" },
  FLASHSTAY: { type: "percent", value: 10, label: "10% Flash Escape Discount" },
  EXPLORE2026: { type: "fixed", value: 10000, label: "$10,000 Destination Travel Voucher" },
  DESTINATIONVIP: { type: "fixed", value: 10000, label: "$10,000 Regional Yacht Voucher" },
  ADVENTURE15: { type: "percent", value: 15, label: "15% Early Bird Adventure Discount" },
  TOURVIP: { type: "fixed", value: 7500, label: "$7,500 Drone & Gourmet Picnic Perk" },
  RESORTFUN: { type: "fixed", value: 5000, label: "$5,000 Resort Masterclass Pass" },
  LOOKBOOK5K: { type: "fixed", value: 5000, label: "$5,000 Lookbook Subscriber Credit" },
  WANDERLUST5K: { type: "fixed", value: 5000, label: "$5,000 Editorial Reader Credit" },
  HERITAGE10: { type: "percent", value: 10, label: "10% Heritage Story Privilege" },
  GUESTVIP: { type: "fixed", value: 5000, label: "$5,000 Guest Loyalty Voucher" },
  ELITE5K: { type: "fixed", value: 5000, label: "5,000 Elite Member Bonus Points" },
  MATCH2026: { type: "fixed", value: 10000, label: "$10,000 AI Matchmaker Credit" },
  RESCUE10: { type: "percent", value: 10, label: "10% Paradise Rescue Discount" },
};

const INITIAL_DEMO_BOOKINGS = [
  {
    id: "res_lx_772910",
    reference: "LX-772910",
    roomName: "Royal Presidential Pool Villa",
    category: "Presidential Villa",
    location: "Ubud & Seminyak, Bali",
    checkIn: "2026-11-10",
    checkOut: "2026-11-15",
    nights: 5,
    guests: 4,
    totalAmount: 345000,
    status: "Confirmed",
    guestName: "Arthur Pendelton",
    guestEmail: "arthur.pendelton@luxury.com",
    createdAt: "2026-10-01T10:30:00.000Z",
    image: "/images/placeholders/1200x800.svg",
    additions: ["Private Helicopter Transfer", "24/7 Personal Butler", "Dom Pérignon Welcome"],
  },
];

export function BookingProvider({ children }) {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error("Failed to save bookings", e);
    }
  }, [bookings]);

  const addBooking = useCallback(
    (bookingData) => {
      const reference = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking = {
        id: `res_${Date.now()}`,
        reference,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        ...bookingData,
      };

      setBookings((prev) => [newBooking, ...prev]);

      // Automatically sync to Admin Hotel Bookings LocalStorage ledger
      addHotelBooking({
        id: reference,
        guestName: bookingData.guestName || "Distinguished Guest",
        guestEmail: bookingData.guestEmail || "guest@luxstay.com",
        guestPhone: bookingData.guestPhone || "+1 (800) 555-0199",
        hotelName: bookingData.hotelName || "LuxStay Resort & Sanctuary",
        roomType: bookingData.roomName || bookingData.roomType || "Signature Suite",
        checkIn: bookingData.checkIn || new Date().toISOString().split("T")[0],
        checkOut: bookingData.checkOut || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
        nights: bookingData.nights || 3,
        guests: bookingData.guests || 2,
        totalPrice: bookingData.totalAmount || bookingData.totalPrice || 2400,
        paymentStatus: "Paid",
        status: "Confirmed",
        specialRequests: bookingData.specialRequests || "VIP Sea View, High Floor",
      });

      addToast(`Reservation ${reference} confirmed! Confirmation details dispatched.`, "success", 6000);
      return newBooking;
    },
    [addToast]
  );

  const cancelBooking = useCallback(
    (id) => {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
      );
      addToast("Reservation cancelled. Complimentary refund processed to original payment.", "info");
    },
    [addToast]
  );

  const validatePromoCode = useCallback((code, subtotal) => {
    if (!code) return { valid: false, discount: 0, message: "" };
    const cleanCode = code.trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];

    if (!promo) {
      return { valid: false, discount: 0, message: "Invalid privilege voucher code" };
    }

    let discount = 0;
    if (promo.type === "percent") {
      discount = Math.round((subtotal * promo.value) / 100);
    } else if (promo.type === "fixed") {
      discount = Math.min(subtotal, promo.value);
    }

    return {
      valid: true,
      code: cleanCode,
      discount,
      label: promo.label,
      message: `Privilege code applied: ${promo.label}`,
    };
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        cancelBooking,
        validatePromoCode,
        PROMO_CODES,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
