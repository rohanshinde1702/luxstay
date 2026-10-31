import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuPhone as Phone, LuMail as Mail, LuSearch as Search, LuMenu as Menu, LuGlobe as Globe, LuSparkles as Sparkles, 
  LuSun as Sun, LuMoon as Moon, LuCompass as Compass, LuHeart as Heart, LuLogOut as LogOut, LuCrown as Crown,
  LuUser as User, LuLogIn as LogIn, LuUserPlus as UserPlus } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { NAV_LINKS } from "../../constants/navigation";
import { SITE_CONFIG } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import { isAdminAuthenticated } from "../../pages/admin/adminStorage";
import SavedDrawer from "../common/SavedDrawer";
import MobileNav from "./MobileNav";

export default function Header({ 
  variant: propVariant, 
  sticky = true,
}) {
  const { 
    theme, 
    toggleTheme, 
    headerVariant: contextVariant, 
  } = useTheme();
  const { favoritesCount } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Use props if provided, otherwise fallback to context
  const activeVariant = propVariant || contextVariant || "standard";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navUserMenuOpen, setNavUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef(null);
  const navUserMenuRef = useRef(null);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(isAdminAuthenticated());
    };
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, [location.pathname]);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (typeof window === "undefined") return;
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;

      // Hysteresis buffer to prevent any layout feedback flickering:
      setIsScrolled((prev) => {
        if (!prev && currentScrollY > 60) {
          return true;
        } else if (prev && currentScrollY < 15) {
          return false;
        }
        return prev;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Click outside listener for user menu dropdowns (crucial for tablet/touch devices)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (navUserMenuRef.current && !navUserMenuRef.current.contains(event.target)) {
        setNavUserMenuOpen(false);
      }
    };

    if (userMenuOpen || navUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [userMenuOpen, navUserMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setUserMenuOpen(false);
    setNavUserMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Compute container & background styling based on variant & scroll state
  const isTransparent = activeVariant === "transparent";
  const isDarkVariant = activeVariant === "dark";
  const isMinimal = activeVariant === "minimal";

  const getHeaderClasses = () => {
    const base = "w-full transition-all duration-300 ease-in-out";

    if (isMinimal) {
      if (isScrolled) {
        return `${base} glass-header-scrolled shadow-md py-3 text-slate-800 dark:text-slate-100`;
      }
      return `${base} bg-white dark:bg-slate-900 py-4 border-b border-slate-100 dark:border-slate-800 shadow-xs text-slate-800 dark:text-slate-100`;
    }

    if (isTransparent) {
      if (isScrolled) {
        return `${base} bg-slate-950/90 backdrop-blur-2xl shadow-2xl py-3.5 border-b border-white/10 text-white`;
      }
      return `${base} bg-slate-950/20 dark:bg-black/40 backdrop-blur-md border-b border-white/15 shadow-xs py-4 text-white`;
    }

    if (isDarkVariant) {
      if (isScrolled) {
        return `${base} bg-slate-950/95 backdrop-blur-md shadow-xl py-3.5 border-b border-slate-800 text-white`;
      }
      return `${base} bg-slate-950 text-white py-5 border-b border-slate-900`;
    }

    // Default 'standard'
    if (isScrolled) {
      return `${base} glass-header-scrolled shadow-md py-3.5 text-slate-800 dark:text-slate-100`;
    }
    return `${base} bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 py-5 border-b border-slate-100 dark:border-slate-800 shadow-xs`;
  };

  const getTextColor = () => {
    if (isTransparent) return "text-white/95 hover:text-[#dfcaa4] drop-shadow-xs";
    if (isDarkVariant) return "text-slate-200 hover:text-[#dfcaa4]";
    return "text-slate-700 dark:text-slate-200 hover:text-[#C5A880] dark:hover:text-[#dfcaa4]";
  };

  const getLogoColor = () => {
    if (isTransparent) return "text-white drop-shadow-xs";
    if (isDarkVariant) return "text-white";
    return "text-slate-900 dark:text-white";
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <div className={`w-full transition-all duration-300 ${
      isTransparent 
        ? (isScrolled ? "fixed top-0 left-0 z-50 animate-slide-down" : "absolute top-0 left-0 z-50") 
        : "sticky top-0 z-50"
    }`}>
      {/* 1. Top Utility Bar */}
      {!isMinimal && (!isTransparent || !isScrolled) && (
        <div className={`hidden md:block border-b py-2 text-xs transition-all duration-300 ${
          isTransparent
            ? "border-white/15 bg-black/25 backdrop-blur-md text-white/90"
            : isDarkVariant 
            ? "border-slate-800 bg-slate-950 text-slate-400" 
            : "border-slate-200/60 dark:border-slate-800 bg-slate-900 text-slate-300"
        }`}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left Utility Items */}
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6 shrink-0">
              {/* Phone - Always on md+ */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Phone className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white transition-colors text-xs whitespace-nowrap">
                  {SITE_CONFIG.phone}
                </a>
              </div>

              {/* Email - on lg+ screens to prevent tablet clutter */}
              <div className="hidden lg:flex items-center gap-2 shrink-0">
                <Mail className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors whitespace-nowrap">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Right Utility Items */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Admin Shortcut - strictly visible ONLY to authenticated admin */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    className="hover:text-[#C5A880] text-[#dfcaa4] transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs bg-slate-900/80 px-2.5 py-0.5 rounded border border-[#C5A880]/40 shadow-xs"
                    title="Admin Control Panel"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Admin</span>
                  </Link>
                  <div className="h-3 w-px bg-white/20 dark:bg-slate-700 shrink-0" />
                </>
              )}

              {/* Currency / Language */}
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors whitespace-nowrap">
                <Globe className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                <span>EN / USD ($)</span>
              </div>

              <div className="h-3 w-px bg-white/20 dark:bg-slate-700 shrink-0" />

              {/* Concierge Desk */}
              <Link to="/contact" className="hover:text-white transition-colors whitespace-nowrap">
                Concierge
              </Link>

              <div className="h-3 w-px bg-white/20 dark:bg-slate-700 shrink-0" />

              {/* Dynamic Auth Profile in Top Bar */}
              {isAuthenticated && user ? (
                <div className="relative group" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 sm:gap-2 text-white hover:text-[#C5A880] transition-colors cursor-pointer font-medium whitespace-nowrap"
                    aria-expanded={userMenuOpen}
                  >
                    <Crown className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                    <span>{user.name.split(" ")[0]} (VIP)</span>
                    <FaAngleRight className={`h-3 w-3 opacity-70 transition-transform duration-200 ${userMenuOpen ? "rotate-90" : ""}`} />
                  </button>

                  {/* VIP User Dropdown with touch and hover support */}
                  <div className={`absolute right-0 top-full pt-1 z-50 transition-all ${userMenuOpen ? "block" : "hidden md:group-hover:block"}`}>
                    <div className="w-56 rounded-lg bg-slate-950 border border-slate-800 p-2 shadow-2xl">
                      <div className="p-2 border-b border-slate-800 space-y-0.5">
                        <span className="block text-xs font-bold text-white truncate">{user.name}</span>
                        <span className="block text-[10px] text-[#dfcaa4]">{user.tier}</span>
                        <span className="block text-[10px] text-emerald-400 font-mono">Credit: ${user.welcomeCredit.toLocaleString()}</span>
                      </div>
                      <div className="py-1 space-y-0.5 text-xs">
                        <Link
                          to="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#dfcaa4] hover:text-white font-bold transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Crown className="h-3.5 w-3.5 text-[#C5A880]" />
                            <span>My Dashboard</span>
                          </span>
                          <span className="text-[10px] text-[#C5A880]">→</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSavedDrawerOpen(true);
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-900 text-slate-300 hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span>Saved Sanctuaries</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#C5A880]/20 text-[#dfcaa4]">{favoritesCount}</span>
                        </button>
                        <Link
                          to="/contact"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-2.5 py-1.5 rounded hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
                        >
                          Butler Inquiries
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-slate-900 text-[#dfcaa4] hover:text-[#C5A880] transition-colors"
                          >
                            <span>Admin Portal</span>
                            <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">LIVE</span>
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <LogOut className="h-3 w-3 shrink-0" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hover:text-white transition-colors font-medium whitespace-nowrap">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <header 
        className={`w-full transition-all duration-300 ${getHeaderClasses()}`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0 mr-3 xl:mr-6 group">
            {isMinimal && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C5A880] text-slate-950 shadow-xs">
                <Compass className="h-4 w-4" />
              </div>
            )}
            <span className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${getLogoColor()}`}>
              Lux<span className="text-[#C5A880]">Stay</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 shrink min-w-0">
            {NAV_LINKS.map((link) => {
              const hasChildren = link.children && link.children.length > 0;
              const isMega = link.isMega;

              return (
                <div key={link.title} className="relative group py-2">
                  <Link
                    to={link.path}
                    className={`flex items-center gap-0.5 xl:gap-1 text-[11px] xl:text-xs font-semibold uppercase tracking-tight xl:tracking-wider px-1 xl:px-1.5 py-1.5 transition-colors whitespace-nowrap ${getTextColor()}`}
                  >
                    <span>{link.title}</span>
                    {hasChildren && (
                      <FaAngleRight className="h-2.5 w-2.5 opacity-60 ml-0.5 group-hover:rotate-90 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Mega Menu for Home */}
                  {isMega && hasChildren && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full hidden w-[720px] rounded-lg bg-white dark:bg-slate-900 p-6 shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10 group-hover:block transition-all duration-200 z-50">
                      <div className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#997548] dark:text-[#dfcaa4]">
                            8 Curated Concept Homepages & 38+ Inner Pages
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#C5A880]/20 text-[9px] font-bold text-[#997548] dark:text-[#dfcaa4]">
                            All Demos
                          </span>
                        </div>
                        <Link to="/" className="text-[11px] font-bold text-[#997548] dark:text-[#dfcaa4] hover:text-[#C5A880] transition-colors">
                          View Master Landing →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.title}
                            to={child.path}
                            className="group/item flex flex-col rounded-md p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-[#C5A880] transition-colors">
                                {child.title}
                              </span>
                              {child.badge && (
                                <span className="rounded bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-1.5 py-0.5 text-[9px] font-semibold text-[#997548] dark:text-[#dfcaa4]">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            <span className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {child.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Standard Dropdown */}
                  {!isMega && hasChildren && (
                    <div className="absolute left-0 top-full hidden w-60 rounded-lg bg-white dark:bg-slate-900 p-2 shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 group-hover:block transition-all duration-200 z-50">
                      <div className="flex flex-col space-y-0.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.title}
                            to={child.path}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#C5A880] dark:hover:text-[#dfcaa4]"
                          >
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0">
            {/* Quick Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
                isTransparent
                  ? "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-xs"
                  : isDarkVariant
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              aria-label="Toggle dark/light theme"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Dynamic Saved / Wishlist Heart Trigger */}
            <button
              onClick={() => setSavedDrawerOpen(true)}
              className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
                isTransparent
                  ? "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-xs"
                  : isDarkVariant
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              aria-label="Saved Sanctuaries"
              title="Saved Sanctuaries"
            >
              <Heart className="h-4 w-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A059] text-[9px] font-bold text-slate-950 shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
                isTransparent
                  ? "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-xs"
                  : isDarkVariant
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* User Account / Sign In & Sign Up Trigger */}
            <div className="relative" ref={navUserMenuRef}>
              <button
                type="button"
                onClick={() => setNavUserMenuOpen((prev) => !prev)}
                className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
                  isTransparent
                    ? "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-xs"
                    : isDarkVariant
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                } ${navUserMenuOpen ? "ring-2 ring-[#C5A880]/60" : ""}`}
                aria-label="Account, Sign In or Sign Up"
                aria-expanded={navUserMenuOpen}
                title={isAuthenticated && user ? `${user.name} (${user.tier})` : "Sign In / Sign Up"}
              >
                {isAuthenticated && user ? (
                  <Crown className="h-4 w-4 text-[#C5A880]" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                {isAuthenticated && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-950" />
                )}
              </button>

              {/* Interactive Auth Dropdown */}
              {navUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 shadow-2xl z-50 text-slate-800 dark:text-slate-100">
                  {isAuthenticated && user ? (
                    <div>
                      {/* Authenticated User Summary */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 mb-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4] font-serif font-bold text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">{user.name}</span>
                            <span className="shrink-0 px-1.5 py-0.2 rounded-full bg-[#C5A880]/20 text-[9px] font-bold text-[#997548] dark:text-[#dfcaa4] uppercase">
                              {user.tier}
                            </span>
                          </div>
                          <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</span>
                          <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                            Credit: ${user.welcomeCredit.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Navigation Actions */}
                      <div className="space-y-0.5 text-xs">
                        <Link
                          to="/dashboard"
                          onClick={() => setNavUserMenuOpen(false)}
                          className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#997548] dark:text-[#dfcaa4] font-bold transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Crown className="h-4 w-4 text-[#C5A880]" />
                            <span>My Member Dashboard</span>
                          </span>
                          <span>→</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSavedDrawerOpen(true);
                            setNavUserMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer text-left"
                        >
                          <span className="flex items-center gap-2">
                            <Heart className="h-3.5 w-3.5 text-[#C5A880]" />
                            <span>Saved Sanctuaries</span>
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4] font-bold">
                            {favoritesCount}
                          </span>
                        </button>
                        <Link
                          to="/dashboard"
                          onClick={() => setNavUserMenuOpen(false)}
                          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        >
                          <Crown className="h-3.5 w-3.5 text-[#C5A880]" />
                          <span>VIP Loyalty Privileges</span>
                        </Link>
                        <Link
                          to="/contact"
                          onClick={() => setNavUserMenuOpen(false)}
                          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                          <span>Butler & Concierge Inquiries</span>
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setNavUserMenuOpen(false)}
                            className="flex items-center justify-between px-2.5 py-2 rounded-lg text-[#997548] dark:text-[#dfcaa4] hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                              <span>Admin Portal</span>
                            </span>
                            <span className="text-[10px] uppercase font-bold text-emerald-500 font-mono">LIVE</span>
                          </Link>
                        )}
                        <div className="border-t border-slate-100 dark:border-slate-800 my-1 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              setNavUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer text-left"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Unauthenticated Guest Header */}
                      <div className="p-2 border-b border-slate-100 dark:border-slate-800/80 mb-2.5">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4]">
                            <User className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                              Member Sanctuary
                            </span>
                            <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                              Access VIP rates & member perks
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Primary Actions: Sign In & Sign Up */}
                      <div className="space-y-2 py-0.5">
                        <Link
                          to="/login"
                          onClick={() => setNavUserMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A880] hover:text-slate-950 transition-all shadow-xs"
                        >
                          <LogIn className="h-3.5 w-3.5" />
                          <span>Sign In</span>
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setNavUserMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-all"
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          <span>Sign Up / Register</span>
                        </Link>
                      </div>

                      {/* VIP Teaser */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <Link
                          to="/offers"
                          onClick={() => setNavUserMenuOpen(false)}
                          className="group block p-2 rounded-lg bg-[#C5A880]/10 hover:bg-[#C5A880]/20 transition-colors"
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-[#997548] dark:text-[#dfcaa4]">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="h-3 w-3 text-[#C5A880]" />
                              <span>LuxStay Club VIP</span>
                            </span>
                            <span className="text-[10px] uppercase font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Join today for $2,500 welcome credit
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Booking CTA */}
            <Link
              to="/rooms"
              className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center justify-center rounded-md bg-[#b89360] hover:bg-[#a68250] px-3.5 xl:px-5 py-2 xl:py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-xs transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span>Book Now</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg lg:hidden transition-colors cursor-pointer ${
                isTransparent
                  ? "text-white bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md"
                  : isDarkVariant
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Global Quick Search Overlay */}
        {searchOpen && (
          <form
            onSubmit={handleSearchSubmit}
            className="absolute top-full left-0 w-full bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xl px-4 py-6 z-50 transition-all"
          >
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Search suites, villas, destinations, or expeditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
                autoFocus
              />
              <button
                type="submit"
                className="text-xs font-semibold bg-[#C5A059] text-slate-950 px-3.5 py-1.5 rounded-lg hover:bg-[#dfcaa4] transition-colors uppercase tracking-wider cursor-pointer font-bold"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white uppercase tracking-wider px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </form>
        )}

        {/* Mobile Navigation Drawer */}
        <MobileNav 
          key={location.pathname}
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />

        {/* Saved Sanctuaries Wishlist Drawer */}
        <SavedDrawer
          isOpen={savedDrawerOpen}
          onClose={() => setSavedDrawerOpen(false)}
        />
      </header>
    </div>
  );
}
