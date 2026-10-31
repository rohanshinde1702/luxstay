/**
 * ==============================================================================
 * LUXSTAY ADMIN PERSISTENCE HUB (LocalStorage Architecture)
 * ==============================================================================
 * Centralized data layer for the LuxStay Executive Administration Portal.
 * Handles persistent state for:
 *   - Admin Authentication & Session
 *   - User Accounts & VIP Tiers
 *   - Login Audit Logs & Live Session Records
 *   - Hotel Suite & Villa Bookings
 *   - Travel, Tours & Expedition Bookings
 *   - Concierge & Butler Inquiries
 */

export const ADMIN_CREDENTIALS = {
  email: "admin",
  username: "admin",
  password: "admin",
  name: "admin",
  title: "System Administrator",
  role: "Super Administrator",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
};

export function validateAdminCredentials(loginIdentifier, password) {
  const cleanId = (loginIdentifier || "").trim().toLowerCase();
  const cleanPass = (password || "").trim();
  const validId = cleanId === "admin" || cleanId === "admin@luxstay.com";
  const validPass = cleanPass === "admin";
  return validId && validPass;
}

// Storage keys
const STORAGE_KEYS = {
  ADMIN_AUTH: "luxstay_admin_auth",
  USERS: "luxstay_admin_users",
  LOGINS: "luxstay_admin_login_history",
  HOTEL_BOOKINGS: "luxstay_admin_hotel_bookings",
  TRAVEL_BOOKINGS: "luxstay_admin_travel_bookings",
  INQUIRIES: "luxstay_admin_inquiries",
};

// Default seed data: Users
const DEFAULT_USERS = [
  {
    id: "usr-01",
    name: "Eleanor Vance",
    email: "eleanor.vance@vanceholdings.com",
    phone: "+1 (212) 555-0198",
    tier: "Black Card Royal Patron",
    tierColor: "text-amber-300 bg-amber-950/40 border-amber-500/30",
    welcomeCredit: 5000,
    totalBookings: 6,
    totalSpend: 38400,
    joinedDate: "2025-01-14",
    status: "Active",
    country: "United States",
    city: "New York",
  },
  {
    id: "usr-02",
    name: "Lord Julian Beaumont",
    email: "julian.b@beaumontcapital.co.uk",
    phone: "+44 20 7946 0912",
    tier: "Gold Elite Member",
    tierColor: "text-yellow-400 bg-yellow-950/40 border-yellow-500/30",
    welcomeCredit: 2500,
    totalBookings: 3,
    totalSpend: 18250,
    joinedDate: "2025-03-22",
    status: "Active",
    country: "United Kingdom",
    city: "London",
  },
  {
    id: "usr-03",
    name: "Lady Serena Kensington",
    email: "serena@kensingtonestates.com",
    phone: "+33 1 42 68 55 00",
    tier: "Black Card Royal Patron",
    tierColor: "text-amber-300 bg-amber-950/40 border-amber-500/30",
    welcomeCredit: 5000,
    totalBookings: 8,
    totalSpend: 54600,
    joinedDate: "2024-11-05",
    status: "Active",
    country: "France",
    city: "Paris",
  },
  {
    id: "usr-04",
    name: "Marcus Thorne",
    email: "marcus.thorne@thorneventures.sg",
    phone: "+65 6789 0123",
    tier: "Silver Sovereign",
    tierColor: "text-slate-300 bg-slate-800 border-slate-600",
    welcomeCredit: 1000,
    totalBookings: 2,
    totalSpend: 8900,
    joinedDate: "2025-06-18",
    status: "Active",
    country: "Singapore",
    city: "Marina Bay",
  },
  {
    id: "usr-05",
    name: "Dr. Alistair Sterling",
    email: "alistair@sterlinggeneva.ch",
    phone: "+41 22 819 00 00",
    tier: "Gold Elite Member",
    tierColor: "text-yellow-400 bg-yellow-950/40 border-yellow-500/30",
    welcomeCredit: 2500,
    totalBookings: 4,
    totalSpend: 27500,
    joinedDate: "2025-02-10",
    status: "Active",
    country: "Switzerland",
    city: "Geneva",
  },
  {
    id: "usr-06",
    name: "Sophia Rossi",
    email: "sophia.rossi@rossimilano.it",
    phone: "+39 02 8765 4321",
    tier: "Silver Sovereign",
    tierColor: "text-slate-300 bg-slate-800 border-slate-600",
    welcomeCredit: 1000,
    totalBookings: 1,
    totalSpend: 6400,
    joinedDate: "2025-09-02",
    status: "Active",
    country: "Italy",
    city: "Milan",
  },
];

// Default seed data: Who Logged In (Login History)
const DEFAULT_LOGINS = [
  {
    id: "log-101",
    userName: "Eleanor Vance",
    userEmail: "eleanor.vance@vanceholdings.com",
    tier: "Black Card Royal Patron",
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 mins ago
    ipAddress: "194.230.14.88",
    location: "Geneva, Switzerland",
    device: "Safari on macOS (MacBook Pro)",
    method: "VIP Biometric SSO",
    status: "Active Session",
  },
  {
    id: "log-102",
    userName: "Lord Julian Beaumont",
    userEmail: "julian.b@beaumontcapital.co.uk",
    tier: "Gold Elite Member",
    timestamp: new Date(Date.now() - 48 * 60 * 1000).toISOString(), // 48 mins ago
    ipAddress: "82.165.197.1",
    location: "London, United Kingdom",
    device: "Chrome on Windows 11",
    method: "Email Credentials",
    status: "Active Session",
  },
  {
    id: "log-103",
    userName: "Lady Serena Kensington",
    userEmail: "serena@kensingtonestates.com",
    tier: "Black Card Royal Patron",
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), // 3 hrs ago
    ipAddress: "176.31.252.12",
    location: "Paris, France",
    device: "Mobile Safari (iPhone 16 Pro)",
    method: "Mobile App Auth",
    status: "Signed Out",
  },
  {
    id: "log-104",
    userName: "Marcus Thorne",
    userEmail: "marcus.thorne@thorneventures.sg",
    tier: "Silver Sovereign",
    timestamp: new Date(Date.now() - 7 * 3600 * 1000).toISOString(), // 7 hrs ago
    ipAddress: "119.74.22.45",
    location: "Singapore",
    device: "Edge on Windows 11",
    method: "Email Credentials",
    status: "Signed Out",
  },
  {
    id: "log-105",
    userName: "Dr. Alistair Sterling",
    userEmail: "alistair@sterlinggeneva.ch",
    tier: "Gold Elite Member",
    timestamp: new Date(Date.now() - 22 * 3600 * 1000).toISOString(), // 22 hrs ago
    ipAddress: "193.134.254.10",
    location: "Zurich, Switzerland",
    device: "Firefox on macOS",
    method: "Email Credentials",
    status: "Signed Out",
  },
  {
    id: "log-106",
    userName: "Sophia Rossi",
    userEmail: "sophia.rossi@rossimilano.it",
    tier: "Silver Sovereign",
    timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(), // 1.5 days ago
    ipAddress: "151.38.112.50",
    location: "Milan, Italy",
    device: "Chrome on Android (Samsung S24)",
    method: "Email Credentials",
    status: "Signed Out",
  },
];

// Default seed data: Hotel Suite & Villa Bookings
const DEFAULT_HOTEL_BOOKINGS = [
  {
    id: "LX-HTL-8492",
    guestName: "Eleanor Vance",
    guestEmail: "eleanor.vance@vanceholdings.com",
    roomTitle: "Deluxe Ocean Panoramic Suite",
    roomCategory: "Signature Suites",
    checkIn: "2026-11-12",
    checkOut: "2026-11-18",
    nights: 6,
    guests: "2 Adults",
    totalAmount: 5280,
    deposit: 1500,
    paymentStatus: "Paid",
    status: "Confirmed",
    specialRequests: "Private champagne arrival, 24/7 dedicated butler, hypoallergenic bedding",
    bookingDate: "2026-10-24",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-HTL-8419",
    guestName: "Lord Julian Beaumont",
    guestEmail: "julian.b@beaumontcapital.co.uk",
    roomTitle: "Royal Presidential Cliffside Villa",
    roomCategory: "Private Villas",
    checkIn: "2026-11-01",
    checkOut: "2026-11-08",
    nights: 7,
    guests: "4 Adults",
    totalAmount: 12950,
    deposit: 3500,
    paymentStatus: "Paid",
    status: "Checked-in",
    specialRequests: "Helipad arrival coordination, sommelier Grand Cru tasting in villa cellar",
    bookingDate: "2026-10-18",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-HTL-8390",
    guestName: "Lady Serena Kensington",
    guestEmail: "serena@kensingtonestates.com",
    roomTitle: "Imperial Alpine Chalet & Thermal Spa",
    roomCategory: "Alpine Chalets",
    checkIn: "2026-12-04",
    checkOut: "2026-12-10",
    nights: 6,
    guests: "2 Adults, 1 Child",
    totalAmount: 9600,
    deposit: 2500,
    paymentStatus: "Paid",
    status: "Confirmed",
    specialRequests: "Private ski instructor booked, private fireplace cedar logs replenished daily",
    bookingDate: "2026-10-26",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-HTL-8344",
    guestName: "Marcus Thorne",
    guestEmail: "marcus.thorne@thorneventures.sg",
    roomTitle: "Metropolitan Horizon Sky Penthouse",
    roomCategory: "Skyline Penthouses",
    checkIn: "2026-12-18",
    checkOut: "2026-12-22",
    nights: 4,
    guests: "1 Adult",
    totalAmount: 4800,
    deposit: 1200,
    paymentStatus: "Pending",
    status: "Pending",
    specialRequests: "Quiet corner suite, high-speed fiber terminal for video conferencing",
    bookingDate: "2026-10-29",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-HTL-8291",
    guestName: "Sophia Rossi",
    guestEmail: "sophia.rossi@rossimilano.it",
    roomTitle: "Overwater Lagoon Sanctuary Bungalow",
    roomCategory: "Beach Bungalows",
    checkIn: "2026-10-15",
    checkOut: "2026-10-21",
    nights: 6,
    guests: "2 Adults",
    totalAmount: 7500,
    deposit: 2000,
    paymentStatus: "Paid",
    status: "Completed",
    specialRequests: "Anniversary dinner setup on the private deck",
    bookingDate: "2026-09-28",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
];

// Default seed data: Travel, Tours & Expedition Bookings
const DEFAULT_TRAVEL_BOOKINGS = [
  {
    id: "LX-TRV-5201",
    travelerName: "Lord Julian Beaumont",
    travelerEmail: "julian.b@beaumontcapital.co.uk",
    tourTitle: "Amalfi Coast Private Yacht Charter & Faraglioni Caves",
    destination: "Amalfi Coast, Italy",
    departureDate: "2026-11-04",
    duration: "Full Day (8 Hours)",
    guests: "4 Guests",
    totalPrice: 3800,
    paymentStatus: "Paid",
    status: "Confirmed",
    captain: "Capt. Matteo Riva",
    bookingDate: "2026-10-20",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-TRV-5182",
    travelerName: "Eleanor Vance",
    travelerEmail: "eleanor.vance@vanceholdings.com",
    tourTitle: "Kyoto Imperial Bamboo & Zen Heritage Sanctuary",
    destination: "Kyoto, Japan",
    departureDate: "2026-12-02",
    duration: "Full Day (7 Hours)",
    guests: "2 Guests",
    totalPrice: 2400,
    paymentStatus: "Paid",
    status: "Confirmed",
    captain: "Grand Master Kenjiro",
    bookingDate: "2026-10-25",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-TRV-5140",
    travelerName: "Dr. Alistair Sterling",
    travelerEmail: "alistair@sterlinggeneva.ch",
    tourTitle: "Swiss Alps Helicopter Safari & Glacier Landing",
    destination: "Zermatt, Switzerland",
    departureDate: "2026-12-14",
    duration: "Half Day (4 Hours)",
    guests: "2 Guests",
    totalPrice: 4500,
    paymentStatus: "Paid",
    status: "Confirmed",
    captain: "Flight Capt. Marc Brun",
    bookingDate: "2026-10-28",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-TRV-5095",
    travelerName: "Marcus Thorne",
    travelerEmail: "marcus.thorne@thorneventures.sg",
    tourTitle: "Santorini Sunset Catamaran & Volcanic Caldera Cruise",
    destination: "Santorini, Greece",
    departureDate: "2026-12-20",
    duration: "Half Day (5 Hours)",
    guests: "2 Guests",
    totalPrice: 1950,
    paymentStatus: "Pending",
    status: "Pending",
    captain: "Capt. Nikos Costas",
    bookingDate: "2026-10-30",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "LX-TRV-4980",
    travelerName: "Lady Serena Kensington",
    travelerEmail: "serena@kensingtonestates.com",
    tourTitle: "Provence Truffle Hunting & Private Michelin Cellar Flight",
    destination: "Provence, France",
    departureDate: "2026-10-10",
    duration: "Full Day (8 Hours)",
    guests: "2 Guests",
    totalPrice: 3200,
    paymentStatus: "Paid",
    status: "Completed",
    captain: "Chef Jean-Luc Moreau",
    bookingDate: "2026-09-20",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  },
];

// Default seed data: Inquiries & Concierge Messages
const DEFAULT_INQUIRIES = [
  {
    id: "INQ-201",
    name: "Eleanor Vance",
    email: "eleanor.vance@vanceholdings.com",
    subject: "Private Aviation Slot & Yacht Berth at Portofino",
    message: "Requesting confirmation for Gulfstream G650 landing slot at Genoa Aviation Hub and simultaneous tender transfer to LuxStay Portofino deepwater berth on Nov 12.",
    date: "2026-10-30T10:15:00Z",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "INQ-202",
    name: "Charles Montagu",
    email: "cmontagu@montagu.co.uk",
    subject: "Full Buyout Inquiry for Corporate Executive Retreat 2027",
    message: "Our partners wish to book the entirety of the Zermatt Alpine Chalet estate for 24 executives between Feb 15-22, 2027. Please send full buyout dossier.",
    date: "2026-10-29T16:40:00Z",
    status: "New",
    priority: "Urgent",
  },
  {
    id: "INQ-203",
    name: "Sophia Rossi",
    email: "sophia.rossi@rossimilano.it",
    subject: "Sommelier Cellar Private Vintage Allocation",
    message: "Could Head Sommelier reserve 2 bottles of Domaine de la Romanée-Conti 2015 for our upcoming reservation?",
    date: "2026-10-28T09:20:00Z",
    status: "Resolved",
    priority: "Standard",
  },
];

// Helper safe JSON parser
function safeGet(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("LocalStorage write error:", err);
  }
}

// -----------------------------------------------------------------------------
// Initialization: Seed LocalStorage if keys don't exist
// -----------------------------------------------------------------------------
export function initializeAdminStorage() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    safeSet(STORAGE_KEYS.USERS, DEFAULT_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOGINS)) {
    safeSet(STORAGE_KEYS.LOGINS, DEFAULT_LOGINS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.HOTEL_BOOKINGS)) {
    safeSet(STORAGE_KEYS.HOTEL_BOOKINGS, DEFAULT_HOTEL_BOOKINGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TRAVEL_BOOKINGS)) {
    safeSet(STORAGE_KEYS.TRAVEL_BOOKINGS, DEFAULT_TRAVEL_BOOKINGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    safeSet(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  }
}

// -----------------------------------------------------------------------------
// Admin Authentication Session
// -----------------------------------------------------------------------------
export function getAdminSession() {
  return safeGet(STORAGE_KEYS.ADMIN_AUTH, null);
}

export function setAdminSession(adminData) {
  safeSet(STORAGE_KEYS.ADMIN_AUTH, {
    isAuthenticated: true,
    user: adminData || ADMIN_CREDENTIALS,
    loginTime: new Date().toISOString(),
  });
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
}

export function isAdminAuthenticated() {
  const session = getAdminSession();
  return Boolean(session && session.isAuthenticated);
}

// -----------------------------------------------------------------------------
// Users Management
// -----------------------------------------------------------------------------
export function getUsers() {
  initializeAdminStorage();
  return safeGet(STORAGE_KEYS.USERS, DEFAULT_USERS);
}

export function saveUsers(users) {
  safeSet(STORAGE_KEYS.USERS, users);
}

export function addUser(user) {
  const list = getUsers();
  const newUser = {
    id: `usr-${Date.now().toString().slice(-4)}`,
    joinedDate: new Date().toISOString().split("T")[0],
    totalBookings: 0,
    totalSpend: 0,
    status: "Active",
    welcomeCredit: 2500,
    tier: "Silver Sovereign",
    tierColor: "text-slate-300 bg-slate-800 border-slate-600",
    ...user,
  };
  list.unshift(newUser);
  saveUsers(list);
  return newUser;
}

// -----------------------------------------------------------------------------
// Login Activity Stream ("Who Logs In")
// -----------------------------------------------------------------------------
export function getLoginHistory() {
  initializeAdminStorage();
  return safeGet(STORAGE_KEYS.LOGINS, DEFAULT_LOGINS);
}

export function recordUserLogin(userData, meta = {}) {
  initializeAdminStorage();
  const list = getLoginHistory();
  const entry = {
    id: `log-${Date.now().toString().slice(-5)}`,
    userName: userData.name || "Guest Traveler",
    userEmail: userData.email,
    tier: userData.tier || "VIP Member",
    timestamp: new Date().toISOString(),
    ipAddress: meta.ip || "127.0.0.1 (Local Client)",
    location: meta.location || "Beverly Hills, California",
    device: meta.device || (typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 45) : "Modern Web Browser"),
    method: meta.method || "Direct Portal Authentication",
    status: "Active Session",
  };
  list.unshift(entry);
  // Keep max 50 recent events
  safeSet(STORAGE_KEYS.LOGINS, list.slice(0, 50));
  return entry;
}

// -----------------------------------------------------------------------------
// Hotel Bookings Management ("Who Books the Hotel")
// -----------------------------------------------------------------------------
export function getHotelBookings() {
  initializeAdminStorage();
  return safeGet(STORAGE_KEYS.HOTEL_BOOKINGS, DEFAULT_HOTEL_BOOKINGS);
}

export function saveHotelBookings(bookings) {
  safeSet(STORAGE_KEYS.HOTEL_BOOKINGS, bookings);
}

export function addHotelBooking(booking) {
  const list = getHotelBookings();
  const newBooking = {
    id: `LX-HTL-${Math.floor(1000 + Math.random() * 9000)}`,
    bookingDate: new Date().toISOString().split("T")[0],
    status: "Confirmed",
    paymentStatus: "Paid",
    deposit: Math.round((booking.totalAmount || 2500) * 0.3),
    ...booking,
  };
  list.unshift(newBooking);
  saveHotelBookings(list);
  return newBooking;
}

export function updateHotelBookingStatus(id, newStatus) {
  const list = getHotelBookings();
  const updated = list.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
  saveHotelBookings(updated);
  return updated;
}

export function deleteHotelBooking(id) {
  const list = getHotelBookings();
  const filtered = list.filter((b) => b.id !== id);
  saveHotelBookings(filtered);
  return filtered;
}

// -----------------------------------------------------------------------------
// Travel & Tour Bookings Management ("Who Books Travel")
// -----------------------------------------------------------------------------
export function getTravelBookings() {
  initializeAdminStorage();
  return safeGet(STORAGE_KEYS.TRAVEL_BOOKINGS, DEFAULT_TRAVEL_BOOKINGS);
}

export function saveTravelBookings(bookings) {
  safeSet(STORAGE_KEYS.TRAVEL_BOOKINGS, bookings);
}

export function addTravelBooking(booking) {
  const list = getTravelBookings();
  const newBooking = {
    id: `LX-TRV-${Math.floor(1000 + Math.random() * 9000)}`,
    bookingDate: new Date().toISOString().split("T")[0],
    status: "Confirmed",
    paymentStatus: "Paid",
    ...booking,
  };
  list.unshift(newBooking);
  saveTravelBookings(list);
  return newBooking;
}

export function updateTravelBookingStatus(id, newStatus) {
  const list = getTravelBookings();
  const updated = list.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
  saveTravelBookings(updated);
  return updated;
}

export function deleteTravelBooking(id) {
  const list = getTravelBookings();
  const filtered = list.filter((b) => b.id !== id);
  saveTravelBookings(filtered);
  return filtered;
}

// -----------------------------------------------------------------------------
// Inquiries & Concierge Messages
// -----------------------------------------------------------------------------
export function getInquiries() {
  initializeAdminStorage();
  return safeGet(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
}

export function updateInquiryStatus(id, newStatus) {
  const list = getInquiries();
  const updated = list.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq));
  safeSet(STORAGE_KEYS.INQUIRIES, updated);
  return updated;
}

// -----------------------------------------------------------------------------
// Reset Data to Factory Luxury Defaults
// -----------------------------------------------------------------------------
export function resetAdminDataToDefaults() {
  safeSet(STORAGE_KEYS.USERS, DEFAULT_USERS);
  safeSet(STORAGE_KEYS.LOGINS, DEFAULT_LOGINS);
  safeSet(STORAGE_KEYS.HOTEL_BOOKINGS, DEFAULT_HOTEL_BOOKINGS);
  safeSet(STORAGE_KEYS.TRAVEL_BOOKINGS, DEFAULT_TRAVEL_BOOKINGS);
  safeSet(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
}

