import React, { useState, useEffect } from "react";
import { getInquiries, updateInquiryStatus } from "./adminStorage";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const loadData = () => {
    setInquiries(getInquiries());
  };

  useEffect(() => {
    loadData();
    const handleStorage = (e) => {
      if (e.key === "luxstay_admin_inquiries") {
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
    updateInquiryStatus(id, newStatus);
    loadData();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
    showToast(`Inquiry ${id} status updated to ${newStatus}`);
  };

  const filtered = inquiries.filter((inq) => {
    const q = search.toLowerCase();
    const matchesSearch =
      inq.id?.toLowerCase().includes(q) ||
      inq.name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.subject?.toLowerCase().includes(q) ||
      inq.message?.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" ? true : inq.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "In Progress":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
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
            Concierge & Guest Inquiries
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            VIP concierge requests, pre-arrival bespoke amenities, and direct customer messages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Total in queue:</span>
          <span className="font-mono text-sm font-bold text-[#C5A880]">{inquiries.length}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search inquiries by guest, subject or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-950/40 p-1 border border-zinc-800/60 rounded-lg">
          {["all", "New", "In Progress", "Resolved"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                statusFilter.toLowerCase() === st.toLowerCase()
                  ? "bg-[#C5A880] text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              {st === "all" ? "All Messages" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Ref</th>
                <th className="py-3.5 px-4 font-semibold">Guest</th>
                <th className="py-3.5 px-4 font-semibold">Subject & Preview</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-zinc-500">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-[#C5A880] font-semibold">
                      {item.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-xs text-zinc-500">{item.email}</div>
                    </td>
                    <td className="py-3 px-4 max-w-md">
                      <div className="font-medium text-zinc-200 line-clamp-1">{item.subject}</div>
                      <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{item.message}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-zinc-400">
                      {item.date || "2026-10-30"}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer border focus:outline-none ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        <option value="New" className="bg-zinc-900 text-rose-400">
                          New
                        </option>
                        <option value="In Progress" className="bg-zinc-900 text-amber-400">
                          In Progress
                        </option>
                        <option value="Resolved" className="bg-zinc-900 text-emerald-400">
                          Resolved
                        </option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="text-xs text-[#C5A880] hover:text-[#e4c9a3] hover:underline font-medium"
                      >
                        Read Message
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                  {selectedInquiry.id}
                </span>
                <h3 className="text-lg font-bold font-serif text-white mt-1">
                  {selectedInquiry.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-zinc-500 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Guest Name</span>
                  <span className="text-white font-medium">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Email Address</span>
                  <span className="text-zinc-300">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Date Submitted</span>
                  <span className="text-zinc-300">{selectedInquiry.date || "2026-10-30"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Current Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusBadge(selectedInquiry.status)}`}>
                    {selectedInquiry.status}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950/60 p-4 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">Message Content</span>
                <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Mark as:</span>
                <button
                  onClick={() => handleStatusChange(selectedInquiry.id, "Resolved")}
                  className="px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-medium"
                >
                  Resolved
                </button>
                <button
                  onClick={() => handleStatusChange(selectedInquiry.id, "In Progress")}
                  className="px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-medium"
                >
                  In Progress
                </button>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
