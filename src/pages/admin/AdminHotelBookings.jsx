import { useState, useEffect } from "react";
import {
  LuBed,
  LuPlus,
  LuSearch,
  LuFilter,
  LuCalendar,
  LuUser,
  LuTrash2,
  LuEye,
  LuX,
  LuClock,
  LuDollarSign,
} from "react-icons/lu";
import {
  getHotelBookings,
  addHotelBooking,
  updateHotelBookingStatus,
  deleteHotelBooking,
} from "./adminStorage";

export default function AdminHotelBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Booking Form State
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    roomTitle: "Deluxe Ocean Panoramic Suite",
    roomCategory: "Signature Suites",
    checkIn: "2026-11-15",
    checkOut: "2026-11-20",
    guests: "2 Adults",
    totalAmount: 4800,
    specialRequests: "",
  });

  useEffect(() => {
    setBookings(getHotelBookings());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateHotelBookingStatus(id, newStatus);
    setBookings(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to remove reservation ${id}?`)) {
      const updated = deleteHotelBooking(id);
      setBookings(updated);
    }
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.guestEmail) return;

    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.abs(end - start);
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 5;

    const created = addHotelBooking({
      ...formData,
      nights,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    });

    setBookings([created, ...bookings]);
    setShowAddModal(false);
    setFormData({
      guestName: "",
      guestEmail: "",
      roomTitle: "Deluxe Ocean Panoramic Suite",
      roomCategory: "Signature Suites",
      checkIn: "2026-11-15",
      checkOut: "2026-11-20",
      guests: "2 Adults",
      totalAmount: 4800,
      specialRequests: "",
    });
  };

  // Filter & Search Logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.roomTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || b.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title & Top Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
            <LuBed className="h-7 w-7 text-[#C5A880]" />
            <span>Hotel & Suite Bookings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Oversee room reservations, guest check-in schedules, and roomfolio folios in LocalStorage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A880] hover:bg-[#dfcaa4] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <LuPlus className="h-4 w-4" />
          <span>New Suite Reservation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search guest, email, suite, or ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#C5A880]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["all", "Confirmed", "Checked-in", "Pending", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter.toLowerCase() === st.toLowerCase()
                  ? "bg-[#C5A880] text-slate-950 font-bold shadow-xs"
                  : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-mono">
              <tr>
                <th className="py-3.5 px-4">Ref #</th>
                <th className="py-3.5 px-4">Guest Information</th>
                <th className="py-3.5 px-4">Suite / Residence</th>
                <th className="py-3.5 px-4">Stay Itinerary</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                    No hotel bookings found matching the current search & filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#dfcaa4]">
                      {b.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{b.guestName}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[170px]">{b.guestEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-200 truncate max-w-[200px]">{b.roomTitle}</div>
                      <div className="text-[10px] text-slate-500">{b.roomCategory || "Luxury Suite"}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-slate-300">
                      <div>
                        {b.checkIn} → {b.checkOut}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {b.nights} Nights • {b.guests}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      ${Number(b.totalAmount).toLocaleString()}
                      <span className="block text-[9px] text-emerald-400 font-normal">{b.paymentStatus || "Paid"}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer focus:outline-hidden ${
                          b.status === "Confirmed"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/60"
                            : b.status === "Checked-in"
                            ? "bg-blue-950/60 text-blue-400 border-blue-800/60"
                            : b.status === "Pending"
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
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Complete Dossier"
                          aria-label="View Booking"
                        >
                          <LuEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete Reservation"
                          aria-label="Delete Booking"
                        >
                          <LuTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: View Details Dossier */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#dfcaa4] uppercase">Reservation Folio</span>
                <h3 className="text-lg font-serif font-bold text-white">{selectedBooking.id}</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">Guest Name</span>
                  <span className="font-semibold text-white text-sm">{selectedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Email</span>
                  <span className="font-mono text-slate-300">{selectedBooking.guestEmail}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Suite Reserved</span>
                  <span className="font-medium text-slate-200">{selectedBooking.roomTitle}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Total Rate</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    ${Number(selectedBooking.totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 block text-[10px]">Dates & Capacity</span>
                <p className="text-slate-200">
                  {selectedBooking.checkIn} to {selectedBooking.checkOut} ({selectedBooking.nights} nights)
                </p>
                <p className="text-slate-400">{selectedBooking.guests}</p>
              </div>

              {selectedBooking.specialRequests && (
                <div className="p-3 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/20 space-y-1">
                  <span className="text-[#dfcaa4] font-bold block text-[10px] uppercase">
                    Concierge & Special Requests
                  </span>
                  <p className="text-slate-300 italic">{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                Close Folio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Reservation */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleCreateBooking}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#dfcaa4] uppercase">Manual Reservation</span>
                <h3 className="text-lg font-serif font-bold text-white">Create New Hotel Booking</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Charles Sterling"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Guest Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="guest@residence.com"
                  value={formData.guestEmail}
                  onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Select Suite / Villa
                </label>
                <select
                  value={formData.roomTitle}
                  onChange={(e) => setFormData({ ...formData, roomTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                >
                  <option value="Deluxe Ocean Panoramic Suite">Deluxe Ocean Panoramic Suite ($880/nt)</option>
                  <option value="Royal Presidential Cliffside Villa">Royal Presidential Cliffside Villa ($1,850/nt)</option>
                  <option value="Imperial Alpine Chalet & Thermal Spa">Imperial Alpine Chalet & Thermal Spa ($1,600/nt)</option>
                  <option value="Metropolitan Horizon Sky Penthouse">Metropolitan Horizon Sky Penthouse ($1,200/nt)</option>
                  <option value="Overwater Lagoon Sanctuary Bungalow">Overwater Lagoon Sanctuary Bungalow ($1,250/nt)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Check-out Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Guests
                </label>
                <input
                  type="text"
                  placeholder="2 Adults"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Total Amount ($ USD)
                </label>
                <input
                  type="number"
                  required
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 uppercase font-semibold text-[10px] mb-1">
                  Special Butler / Hospitality Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Private helipad transfer, Dom Pérignon champagne greeting, dietary requirements..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#C5A880] hover:bg-[#dfcaa4] text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Create Reservation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
