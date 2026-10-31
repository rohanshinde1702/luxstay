import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuBed,
  LuCompass,
  LuUsers,
  LuMail,
  LuLogOut,
  LuExternalLink,
  LuMenu,
  LuX,
  LuShieldCheck,
  LuBell,
  LuSearch,
  LuRotateCcw,
} from "react-icons/lu";
import { isAdminAuthenticated, clearAdminSession, resetAdminDataToDefaults, getAdminSession } from "./adminStorage";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Authentication check - Demo and regular users CANNOT access the admin panel
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/login", {
        replace: true,
        state: { error: "Access Denied: Standard users and demo accounts cannot access the Admin Panel. Please sign in as Admin." },
      });
    } else {
      const session = getAdminSession();
      setAdminUser(session?.user || null);
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    clearAdminSession();
    navigate("/login", { replace: true });
  };

  const handleResetData = () => {
    if (window.confirm("Reset all Admin demo bookings, users, and logins to initial luxury defaults?")) {
      resetAdminDataToDefaults();
      window.location.reload();
    }
  };

  const navigationItems = [
    { name: "Executive Overview", path: "/admin", icon: LuLayoutDashboard, exact: true },
    { name: "Hotel & Suite Bookings", path: "/admin/hotel-bookings", icon: LuBed },
    { name: "Travel & Tours Bookings", path: "/admin/travel-bookings", icon: LuCompass },
    { name: "Users & Login Activity", path: "/admin/users", icon: LuUsers },
    { name: "Concierge Inquiries", path: "/admin/inquiries", icon: LuMail },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === "/admin" || location.pathname === "/admin/";
    }
    return location.pathname.startsWith(item.path);
  };

  if (!isAdminAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-[#C5A880]/30 selection:text-white">
      {/* Top Utility Bar for Mobile */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A880] text-slate-950 font-serif font-bold text-sm">
            L
          </div>
          <span className="font-serif text-lg font-bold text-white tracking-tight">
            Lux<span className="text-[#C5A880]">Stay</span> <span className="text-xs uppercase font-sans text-slate-400 font-normal">Admin</span>
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/80 flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800/80 hidden lg:flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C5A880] text-slate-950 font-serif font-bold text-base shadow-sm">
                L
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-tight block leading-tight">
                  Lux<span className="text-[#C5A880]">Stay</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#dfcaa4] block">
                  Executive Suite
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Stats Pill */}
          <div className="px-5 pt-4 pb-2">
            <div className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">System Status:</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Management Modules
            </div>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "bg-[#C5A880] text-slate-950 font-bold shadow-sm"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? "text-slate-950" : "text-[#C5A880]"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions & User Profile */}
          <div className="p-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                title="Open Public Website in new tab"
              >
                <LuExternalLink className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>View Site</span>
              </Link>
              <button
                onClick={handleResetData}
                className="py-2 px-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-amber-400 text-xs transition-colors cursor-pointer"
                title="Reset local storage to luxury seed data"
              >
                <LuRotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Admin Profile Footer Card */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-full bg-[#C5A880]/20 text-[#dfcaa4] border border-[#C5A880]/30 flex items-center justify-center font-bold text-xs">
                  {adminUser?.name?.charAt(0) || "A"}
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-white truncate">{adminUser?.name || "Administrator"}</span>
                  <span className="block text-[10px] text-slate-400 truncate">{adminUser?.role || "Super Admin"}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Sign Out of Admin Console"
                aria-label="Sign Out"
              >
                <LuLogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Admin Console</span>
                <span>/</span>
                <span className="text-[#C5A880] capitalize">
                  {location.pathname === "/admin" || location.pathname === "/admin/"
                    ? "Executive Overview"
                    : location.pathname.replace("/admin/", "").replace("-", " ")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 w-64">
                <LuSearch className="h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Quick search bookings, users..."
                  className="bg-transparent focus:outline-hidden w-full text-slate-200 placeholder-slate-500 text-xs"
                />
              </div>

              {/* Notification Pill */}
              <div className="relative">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  aria-label="Notifications"
                >
                  <LuBell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A880] text-[9px] font-bold text-slate-950">
                    3
                  </span>
                </button>
              </div>

              {/* Admin Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#dfcaa4] text-xs font-semibold">
                <LuShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>Admin Secure Session</span>
              </div>
            </div>
          </header>

          {/* Subview Outlet */}
          <main className="p-6 md:p-8 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

