import React, { useState, useEffect } from "react";
import {
  getTravelBookings,
  updateTravelBookingStatus,
  deleteTravelBooking,
  addTravelBooking,
} from "./adminStorage";

export default function AdminTravelBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // New tour booking form state
  const [newForm, setNewForm] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    tourName: "Aegean Sunset Catamaran Cruise",
    destination: "Santorini, Greece",
    guideName: "Capt. Nikos",
    travelDate: "2026-11-15",
    duration: "1 Day (5 Hours)",
    travelers: 2,
    totalPrice: 480,
    paymentStatus: "Paid",
    status: "Confirmed",
    specialRequests: "",
  });

  const loadData = () => {
    setBookings(getTravelBookings());
  };

  useEffect(() => {
    loadData();
    const handleStorage = (e) => {
      if (e.key === "luxstay_admin_travel_bookings") {
        loadData();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const showToast = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3500);
  };

  const handleStatusChange = (id, newStatus) => {
    updateTravelBookingStatus(id, newStatus);
    loadData();
    showToast(`Travel booking status updated to ${newStatus}`);
  };

  const handleDelete = (id, ref) => {
    if (window.confirm(`Are you sure you want to remove expedition reservation ${ref}?`)) {
      deleteTravelBooking(id);
      loadData();
      if (selectedBooking?.id === id) setSelectedBooking(null);
      showToast(`Expedition reservation ${ref} deleted.`);
    }
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!newForm.guestName || !newForm.guestEmail) {
      alert("Please provide guest name and email.");
      return;
    }

    addTravelBooking({
      ...newForm,
      travelers: Number(newForm.travelers),
      totalPrice: Number(newForm.totalPrice),
    });

    loadData();
    setIsNewModalOpen(false);
    showToast(`New travel reservation created for ${newForm.guestName}!`);
    setNewForm({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      tourName: "Aegean Sunset Catamaran Cruise",
      destination: "Santorini, Greece",
      guideName: "Capt. Nikos",
      travelDate: "2026-11-15",
      duration: "1 Day (5 Hours)",
      travelers: 2,
      totalPrice: 480,
      paymentStatus: "Paid",
      status: "Confirmed",
      specialRequests: "",
    });
  };

  // Filtered bookings
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.id?.toLowerCase().includes(search.toLowerCase()) ||
      b.guestName?.toLowerCase().includes(search.toLowerCase()) ||
      b.guestEmail?.toLowerCase().includes(search.toLowerCase()) ||
      b.tourName?.toLowerCase().includes(search.toLowerCase()) ||
      b.destination?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : b.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const totalTravelers = bookings.reduce((sum, b) => sum + (b.travelers || 0), 0);

  const getStatusBadge = (st) => {
    switch (st) {
      case "Confirmed":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Completed":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "Cancelled":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      default:
        return "bg-zinc-800 text-zinc-300 border border-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {feedbackMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#C5A880] text-zinc-950 px-5 py-3 rounded-lg shadow-xl font-medium text-sm flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {feedbackMsg}
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
            Expedition & Tour Reservations
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Curated private excursions, chartered journeys, and experience bookings stored in LocalStorage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A880] hover:bg-[#b3956e] text-zinc-950 font-medium text-sm transition-all shadow-md shadow-[#C5A880]/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Book New Expedition
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Total Tours Booked</span>
          <p className="text-2xl font-bold text-white mt-1">{bookings.length}</p>
          <span className="text-[10px] text-zinc-500 mt-1 block">Active expeditions in ledger</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Expedition Revenue</span>
          <p className="text-2xl font-bold text-[#C5A880] mt-1">${totalRevenue.toLocaleString()}</p>
          <span className="text-[10px] text-zinc-500 mt-1 block">Gross booked value</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Confirmed Journeys</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{confirmedCount}</p>
          <span className="text-[10px] text-zinc-500 mt-1 block">{pendingCount} pending confirmation</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Total Travelers</span>
          <p className="text-2xl font-bold text-blue-400 mt-1">{totalTravelers}</p>
          <span className="text-[10px] text-zinc-500 mt-1 block">Guests taking curated tours</span>
        </div>
      </div>

      {/* Controls: Search and Filters */}
      <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by tour, guest, email, destination or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#C5A880]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950/40 p-1 border border-zinc-800/60 rounded-lg">
          {["all", "Confirmed", "Pending", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                statusFilter.toLowerCase() === st.toLowerCase()
                  ? "bg-[#C5A880] text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              {st === "all" ? "All Bookings" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Reference</th>
                <th className="py-3.5 px-4 font-semibold">Tour & Destination</th>
                <th className="py-3.5 px-4 font-semibold">Guest</th>
                <th className="py-3.5 px-4 font-semibold">Date & Duration</th>
                <th className="py-3.5 px-4 font-semibold">Travelers</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-zinc-500">
                    No travel & tour bookings matched your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-[#C5A880] font-semibold">
                      {item.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-white line-clamp-1">{item.tourName}</div>
                      <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        <svg className="w-3 h-3 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {item.destination}
                        {item.guideName && <span className="text-zinc-500">• Guide: {item.guideName}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-zinc-200">{item.guestName}</div>
                      <div className="text-xs text-zinc-500">{item.guestEmail}</div>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div className="text-zinc-200">{item.travelDate}</div>
                      <div className="text-zinc-500">{item.duration || "Day Trip"}</div>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {item.travelers} {item.travelers > 1 ? "guests" : "guest"}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      ${item.totalPrice}
                      <span className="block text-[10px] font-normal text-zinc-500">
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer border focus:outline-none transition-colors ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        <option value="Confirmed" className="bg-zinc-900 text-emerald-400">
                          Confirmed
                        </option>
                        <option value="Pending" className="bg-zinc-900 text-amber-400">
                          Pending
                        </option>
                        <option value="Completed" className="bg-zinc-900 text-blue-400">
                          Completed
                        </option>
                        <option value="Cancelled" className="bg-zinc-900 text-rose-400">
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedBooking(item)}
                        className="text-xs text-[#C5A880] hover:text-[#e4c9a3] hover:underline font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C5A880] font-mono">
                  {selectedBooking.id}
                </span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">
                  {selectedBooking.tourName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-zinc-500 hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Guest Name</span>
                  <span className="font-medium text-white">{selectedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Email</span>
                  <span className="font-medium text-zinc-300">{selectedBooking.guestEmail}</span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Phone</span>
                  <span className="font-medium text-zinc-300">{selectedBooking.guestPhone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Guide</span>
                  <span className="font-medium text-zinc-300">{selectedBooking.guideName || "Private Escort"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Date & Duration</span>
                  <span className="font-medium text-white">
                    {selectedBooking.travelDate} ({selectedBooking.duration})
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Travelers</span>
                  <span className="font-medium text-white">{selectedBooking.travelers} Guests</span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Total Fare</span>
                  <span className="font-bold text-[#C5A880]">${selectedBooking.totalPrice}</span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">Payment</span>
                  <span className="font-medium text-emerald-400">{selectedBooking.paymentStatus}</span>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-[11px] text-zinc-500 block uppercase">Special Requests</span>
                  <p className="text-zinc-300 text-xs mt-1 italic">{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(selectedBooking.status)}`}>
                Status: {selectedBooking.status}
              </span>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Booking Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white">Book New Curated Expedition</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-zinc-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newForm.guestName}
                    onChange={(e) => setNewForm({ ...newForm, guestName: e.target.value })}
                    placeholder="e.g. Lady Catherine"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newForm.guestEmail}
                    onChange={(e) => setNewForm({ ...newForm, guestEmail: e.target.value })}
                    placeholder="catherine@heritage.co.uk"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Expedition / Tour Package</label>
                <select
                  value={newForm.tourName}
                  onChange={(e) => setNewForm({ ...newForm, tourName: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                >
                  <option value="Aegean Sunset Catamaran Cruise">Aegean Sunset Catamaran Cruise (Santorini)</option>
                  <option value="Bespoke Amalfi Coast Helicopter Tour">Bespoke Amalfi Coast Helicopter Tour (Ravello)</option>
                  <option value="Kyoto Imperial Zen Gardens & Tea Ritual">Kyoto Imperial Zen Gardens & Tea Ritual (Kyoto)</option>
                  <option value="Matterhorn Glacier Heli-Skiing & Fondue">Matterhorn Glacier Heli-Skiing (Zermatt)</option>
                  <option value="Private Desert Safari & Stargazing">Private Desert Safari & Stargazing (Dubai)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={newForm.travelDate}
                    onChange={(e) => setNewForm({ ...newForm, travelDate: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Travelers</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newForm.travelers}
                    onChange={(e) => setNewForm({ ...newForm, travelers: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={newForm.totalPrice}
                    onChange={(e) => setNewForm({ ...newForm, totalPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#C5A880] hover:bg-[#b3956e] text-zinc-950 font-semibold"
                >
                  Confirm Expedition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
