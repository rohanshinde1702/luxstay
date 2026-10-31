import React, { useState, useEffect } from "react";
import {
  getUsers,
  getLoginHistory,
  addUser,
  recordUserLogin,
} from "./adminStorage";

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("logins"); // "logins" | "directory"
  const [users, setUsers] = useState([]);
  const [logins, setLogins] = useState([]);
  const [search, setSearch] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // New user form state
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    tier: "Gold Elite",
    role: "Guest",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    totalBookings: 0,
    totalSpent: 0,
  });

  const loadData = () => {
    setUsers(getUsers());
    setLogins(getLoginHistory());
  };

  useEffect(() => {
    loadData();
    const handleStorage = (e) => {
      if (
        e.key === "luxstay_admin_users" ||
        e.key === "luxstay_admin_login_history"
      ) {
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

  const handleSimulateLogin = () => {
    const sampleUsers = [
      { name: "Eleanor Vance", email: "eleanor.v@luxstay.vip", role: "Black Diamond VIP" },
      { name: "Sir Julian Sterling", email: "julian@sterling-holdings.co.uk", role: "Platinum VIP" },
      { name: "Sophia Montgomery", email: "sophia.m@montgomery-estate.com", role: "Gold Elite" },
      { name: "Alexander Wright", email: "wright@venture.io", role: "Ambassador" },
    ];
    const pick = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    recordUserLogin(pick, {
      device: navigator.userAgent.includes("Windows") ? "Windows PC / Chrome" : "Mobile / Safari",
      ip: `192.168.1.${Math.floor(Math.random() * 200 + 10)}`,
    });
    loadData();
    showToast(`Recorded new live login event for ${pick.name}!`);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) {
      alert("Name and email are required.");
      return;
    }
    addUser(newUserForm);
    loadData();
    setIsAddUserModalOpen(false);
    showToast(`User ${newUserForm.name} added to directory!`);
    setNewUserForm({
      name: "",
      email: "",
      phone: "",
      tier: "Gold Elite",
      role: "Guest",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      totalBookings: 0,
      totalSpent: 0,
    });
  };

  // Filtered lists
  const filteredLogins = logins.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.userName?.toLowerCase().includes(q) ||
      l.userEmail?.toLowerCase().includes(q) ||
      l.ip?.toLowerCase().includes(q) ||
      l.device?.toLowerCase().includes(q) ||
      l.status?.toLowerCase().includes(q)
    );
  });

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.tier?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

  const getTierBadge = (tier) => {
    switch (tier) {
      case "Black Diamond VIP":
        return "bg-purple-500/15 text-purple-300 border border-purple-500/30";
      case "Platinum VIP":
        return "bg-sky-500/15 text-sky-300 border border-sky-500/30";
      case "Gold Elite":
        return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
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
            User Directory & Access Audits
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time tracking of authenticated guests, login timestamps, device fingerprints, and VIP profiles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateLogin}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
            title="Simulate a real-time guest login event to verify live audit stream"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Simulate Login Event
          </button>
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A880] hover:bg-[#b3956e] text-zinc-950 font-medium text-sm transition-all shadow-md shadow-[#C5A880]/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Member
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Registered Guests</span>
          <p className="text-2xl font-bold text-white mt-1">{users.length}</p>
          <span className="text-[10px] text-zinc-500 mt-1 block">Profiles in local database</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Total Logins Audited</span>
          <p className="text-2xl font-bold text-[#C5A880] mt-1">{logins.length}</p>
          <span className="text-[10px] text-zinc-500 mt-1 block">Security authentication stream</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Black Diamond VIPs</span>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            {users.filter((u) => u.tier === "Black Diamond VIP").length}
          </p>
          <span className="text-[10px] text-zinc-500 mt-1 block">High-net-worth tier members</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Cumulative Spend</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            ${users.reduce((acc, u) => acc + (u.totalSpent || 0), 0).toLocaleString()}
          </p>
          <span className="text-[10px] text-zinc-500 mt-1 block">Member lifetime value</span>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-zinc-950/60 p-1 rounded-lg border border-zinc-800/80">
          <button
            onClick={() => setActiveTab("logins")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === "logins"
                ? "bg-[#C5A880] text-zinc-950 shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Who Logged In (Live Stream)
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === "logins"
                  ? "bg-zinc-950 text-[#C5A880]"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {logins.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === "directory"
                ? "bg-[#C5A880] text-zinc-950 shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Guest Directory
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === "directory"
                  ? "bg-zinc-950 text-[#C5A880]"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {users.length}
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm w-full">
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
            placeholder={activeTab === "logins" ? "Search logins by name, IP, device..." : "Search guests by name, email, tier..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>

      {/* Tab 1: Who Logged In Audit Trail */}
      {activeTab === "logins" && (
        <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-zinc-950/50 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h2 className="text-sm font-semibold text-white">Live Authentication Audit Trail</h2>
            </div>
            <span className="text-xs text-zinc-500 font-mono">
              Auto-records every user sign in to LocalStorage
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/30 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80">
                <tr>
                  <th className="py-3 px-4 font-semibold">User / Identity</th>
                  <th className="py-3 px-4 font-semibold">Role / Tier</th>
                  <th className="py-3 px-4 font-semibold">Timestamp</th>
                  <th className="py-3 px-4 font-semibold">IP Address</th>
                  <th className="py-3 px-4 font-semibold">Device & Browser</th>
                  <th className="py-3 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                {filteredLogins.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-zinc-500">
                      No login audit records found.
                    </td>
                  </tr>
                ) : (
                  filteredLogins.map((entry) => (
                    <tr key={entry.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-serif text-sm font-bold text-[#C5A880]">
                            {entry.userName?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-medium text-white">{entry.userName}</div>
                            <div className="text-xs text-zinc-500">{entry.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {entry.role || "Member"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-zinc-300">
                        {new Date(entry.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-zinc-400">
                        {entry.ip || "127.0.0.1"}
                      </td>
                      <td className="py-3 px-4 text-xs text-zinc-400">
                        {entry.device || "Chrome / Desktop"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {entry.status || "Success"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Guest Directory */}
      {activeTab === "directory" && (
        <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-zinc-950/50 border-b border-zinc-800/80 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Registered Guest & Member Profiles</h2>
            <span className="text-xs text-zinc-500">
              {filteredUsers.length} total active member profiles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/30 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80">
                <tr>
                  <th className="py-3 px-4 font-semibold">Member</th>
                  <th className="py-3 px-4 font-semibold">Tier & Status</th>
                  <th className="py-3 px-4 font-semibold">Bookings</th>
                  <th className="py-3 px-4 font-semibold">Total Spend</th>
                  <th className="py-3 px-4 font-semibold">Joined</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-zinc-500">
                      No guests match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                            }}
                            className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <div className="font-medium text-white">{u.name}</div>
                            <div className="text-xs text-zinc-500">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getTierBadge(u.tier)}`}>
                          {u.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <span className="font-semibold text-white">{u.totalBookings || 0}</span> reservations
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#C5A880]">
                        ${(u.totalSpent || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-xs text-zinc-400">
                        {u.joinedAt || "2026-01-15"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="text-xs text-[#C5A880] hover:text-[#e4c9a3] hover:underline font-medium"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Dossier Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C5A880]/40"
                />
                <div>
                  <h3 className="text-lg font-bold font-serif text-white">{selectedUser.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTierBadge(selectedUser.tier)}`}>
                    {selectedUser.tier}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-zinc-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Email:</span>
                  <span className="text-white font-medium">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Phone:</span>
                  <span className="text-white">{selectedUser.phone || "Not on file"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Member Since:</span>
                  <span className="text-white">{selectedUser.joinedAt || "2026-01-15"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Bookings:</span>
                  <span className="text-white font-bold">{selectedUser.totalBookings || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Lifetime Spend:</span>
                  <span className="text-[#C5A880] font-bold">
                    ${(selectedUser.totalSpent || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-zinc-800">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white">Enroll New Member</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-zinc-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="e.g. Duke Charles Bennett"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="charles@bennett-estate.com"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    placeholder="+1 555-0199"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">VIP Tier</label>
                  <select
                    value={newUserForm.tier}
                    onChange={(e) => setNewUserForm({ ...newUserForm, tier: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="Gold Elite">Gold Elite</option>
                    <option value="Platinum VIP">Platinum VIP</option>
                    <option value="Black Diamond VIP">Black Diamond VIP</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#C5A880] hover:bg-[#b3956e] text-zinc-950 font-semibold"
                >
                  Save Member Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
