import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LuDollarSign,
  LuBed,
  LuCompass,
  LuUsers,
  LuArrowUpRight,
  LuPlus,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuCheck,
  LuExternalLink
} from "react-icons/lu";
import {
  getHotelBookings,
  getTravelBookings,
  getLoginHistory,
  getUsers,
  updateHotelBookingStatus,
  updateTravelBookingStatus
} from "./adminStorage";

export default function AdminDashboard() {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [travelBookings, setTravelBookings] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setHotelBookings(getHotelBookings());
    setTravelBookings(getTravelBookings());
    setLoginHistory(getLoginHistory());
    setUsers(getUsers());
  }, []);

  // Compute metrics
  const totalHotelRevenue = hotelBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  const totalTravelRevenue = travelBookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);
  const grandTotalRevenue = totalHotelRevenue + totalTravelRevenue;

  const handleStatusChangeHotel = (id, newStatus) => {
    const updated = updateHotelBookingStatus(id, newStatus);
    setHotelBookings(updated);
  };

  const handleStatusChangeTravel = (id, newStatus) => {
    const updated = updateTravelBookingStatus(id, newStatus);
    setTravelBookings(updated);
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time hospitality metrics, guest reservations, and live login telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/hotel-bookings"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#C5A880] hover:bg-[#dfcaa4] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <LuPlus className="h-4 w-4" />
            <span>Manage Suites</span>
          </Link>
          <Link
            to="/admin/travel-bookings"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all"
          >
            <LuCompass className="h-4 w-4 text-[#C5A880]" />
            <span>Manage Tours</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Portfolio Revenue</span>
            <div className="h-9 w-9 rounded-lg bg-[#C5A880]/15 text-[#dfcaa4] flex items-center justify-center">
              <LuDollarSign className="h-5 w-5 text-[#C5A880]" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              ${grandTotalRevenue.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
              <LuArrowUpRight className="h-3.5 w-3.5" />
              +14.8%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Live sum from hotel & travel bookings</p>
        </div>

        {/* Card 2: Hotel Suite Bookings */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hotel Suites Booked</span>
            <div className="h-9 w-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <LuBed className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {hotelBookings.length}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (${totalHotelRevenue.toLocaleString()})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">94.2% Seasonal Occupancy Rate</p>
        </div>

        {/* Card 3: Travel & Expeditions */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Travel & Expeditions</span>
            <div className="h-9 w-9 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <LuCompass className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {travelBookings.length}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (${totalTravelRevenue.toLocaleString()})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Yacht charters, alpine flights & safaris</p>
        </div>

        {/* Card 4: Registered VIP Guests */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Registered VIP Guests</span>
            <div className="h-9 w-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <LuUsers className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {users.length}
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
              <LuArrowUpRight className="h-3.5 w-3.5" />
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Black, Gold & Silver Loyalty tiers</p>
        </div>
      </div>

      {/* Main Row: Recent Hotel Bookings & Who Logged In */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Who Books the Hotel (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <LuBed className="h-5 w-5 text-[#C5A880]" />
              <h2 className="text-base font-serif font-bold text-white">
                Recent Hotel Suite Reservations
              </h2>
            </div>
            <Link
              to="/admin/hotel-bookings"
              className="text-xs font-semibold text-[#dfcaa4] hover:text-[#C5A880] flex items-center gap-1 transition-colors"
            >
              <span>View All ({hotelBookings.length})</span>
              <LuArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Suite / Residence</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {hotelBookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#dfcaa4]">
                      {booking.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-white block">{booking.guestName}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                        {booking.guestEmail}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className="font-medium text-slate-200 block truncate max-w-[180px]">
                        {booking.roomTitle}
                      </span>
                      <span className="text-[10px] text-slate-500">{booking.guests}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                      <span>{booking.checkIn}</span>
                      <span className="mx-1 text-slate-600">→</span>
                      <span>{booking.checkOut}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white font-mono">
                      ${Number(booking.totalAmount).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChangeHotel(booking.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-md border cursor-pointer focus:outline-hidden ${
                          booking.status === "Confirmed"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/60"
                            : booking.status === "Checked-in"
                            ? "bg-blue-950/60 text-blue-400 border-blue-800/60"
                            : booking.status === "Pending"
                            ? "bg-amber-950/60 text-amber-400 border-amber-800/60"
                            : "bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Checked-in">Checked-in</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Live Login Stream ("Who Logged In") (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-base font-serif font-bold text-white">
                Live Login Audit Stream
              </h2>
            </div>
            <Link
              to="/admin/users"
              className="text-xs font-semibold text-[#dfcaa4] hover:text-[#C5A880] flex items-center gap-1 transition-colors"
            >
              <span>User Directory</span>
              <LuArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="p-4 space-y-3.5 overflow-y-auto max-h-[440px] flex-1">
            {loginHistory.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-white truncate max-w-[160px]">
                    {log.userName}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                      log.status === "Active Session"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <div className="text-slate-300 font-mono text-[10px] truncate">{log.userEmail}</div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <LuMapPin className="h-3 w-3 text-[#C5A880]" />
                      <span>{log.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <LuClock className="h-3 w-3 text-slate-400" />
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate pt-0.5">
                    {log.device}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row: Travel & Expeditions Overview */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LuCompass className="h-5 w-5 text-[#C5A880]" />
            <h2 className="text-base font-serif font-bold text-white">
              Bespoke Travel, Yacht & Expedition Bookings
            </h2>
          </div>
          <Link
            to="/admin/travel-bookings"
            className="text-xs font-semibold text-[#dfcaa4] hover:text-[#C5A880] flex items-center gap-1 transition-colors"
          >
            <span>View All ({travelBookings.length})</span>
            <LuArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-mono">
              <tr>
                <th className="py-3 px-4">Expedition ID</th>
                <th className="py-3 px-4">Lead Traveler</th>
                <th className="py-3 px-4">Curated Itinerary</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Departure Date</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {travelBookings.slice(0, 4).map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#dfcaa4]">
                    {t.id}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-white block">{t.travelerName}</span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                      {t.travelerEmail}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-200">
                    <span className="font-medium block truncate max-w-[240px]">{t.tourTitle}</span>
                    <span className="text-[10px] text-slate-500">{t.duration} • {t.guests}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="flex items-center gap-1 text-[11px]">
                      <LuMapPin className="h-3 w-3 text-[#C5A880]" />
                      <span>{t.destination}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {t.departureDate}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    ${Number(t.totalPrice).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={t.status}
                      onChange={(e) => handleStatusChangeTravel(t.id, e.target.value)}
                      className="text-[11px] font-semibold px-2 py-1 rounded-md bg-slate-950 border border-slate-700 text-slate-200 cursor-pointer focus:outline-hidden"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
