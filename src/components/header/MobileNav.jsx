import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  LuX as X,
  LuPhone as Phone,
  LuMail as Mail,
  LuMapPin as MapPin,
  LuSun as Sun,
  LuMoon as Moon,
  LuUser as User,
  LuLogIn as LogIn,
  LuUserPlus as UserPlus,
  LuLogOut as LogOut
} from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { NAV_LINKS } from "../../constants/navigation";
import { SITE_CONFIG } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";

export default function MobileNav({ isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  // Esc key listener and body overflow lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const navContent = (
    <div className="fixed inset-0 z-[99999] lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 border-l border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Lux<span className="text-[#C5A880]">Stay</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Toggle theme mode"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* User Auth Card for Mobile */}
        <div className="border-b border-slate-100 dark:border-slate-800 px-4 py-3.5 bg-slate-50/70 dark:bg-slate-800/40">
          {isAuthenticated && user ? (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#997548] dark:text-[#dfcaa4] font-serif font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">{user.name}</span>
                    <span className="shrink-0 px-1.5 py-0.2 rounded-full bg-[#C5A880]/20 text-[9px] font-bold text-[#997548] dark:text-[#dfcaa4] uppercase">
                      {user.tier}
                    </span>
                  </div>
                  <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Credit: ${user.welcomeCredit.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex-1 text-center py-1.5 px-2 rounded-md bg-[#C5A880] text-slate-950 text-[11px] font-bold transition-colors shadow-xs"
                >
                  My Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="py-1.5 px-2.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <User className="h-4 w-4 text-[#C5A880]" />
                <span>Guest Sanctuary</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 dark:bg-[#C5A880] text-white dark:text-slate-950 text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A880] hover:text-slate-950 transition-colors shadow-xs"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider hover:border-[#C5A880] hover:text-[#997548] dark:hover:text-[#dfcaa4] transition-colors"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Links list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-1">
            {NAV_LINKS.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedSection === idx;

              return (
                <div key={item.title} className="border-b border-slate-50 dark:border-slate-800/60 pb-1">
                  {hasChildren ? (
                    <div>
                      <button
                        onClick={() => toggleSection(idx)}
                        className="flex w-full items-center justify-between px-3 py-3 text-left font-medium text-slate-800 dark:text-slate-200 hover:text-[#C5A880]"
                      >
                        <span className="text-sm font-semibold tracking-wide uppercase">{item.title}</span>
                        <FaAngleRight
                          className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-90 text-[#C5A880]" : "text-slate-400"}`} 
                        />
                      </button>

                      {isExpanded && (
                        <div className="space-y-1 pl-3 pr-1 pb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              to={child.path}
                              onClick={onClose}
                              className="flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#C5A880] dark:hover:text-[#dfcaa4]"
                            >
                              <span>{child.title}</span>
                              {child.badge && (
                                <span className="rounded bg-[#C5A880]/15 dark:bg-[#C5A880]/25 px-1.5 py-0.5 text-[10px] font-semibold text-[#997548] dark:text-[#dfcaa4]">
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="block px-3 py-3 text-sm font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200 hover:text-[#C5A880]"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Quick contact summary */}
          <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-800/70 p-4 text-xs text-slate-600 dark:text-slate-300 space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#C5A880]" />
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-slate-900 dark:hover:text-white">{SITE_CONFIG.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#C5A880]" />
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-slate-900 dark:hover:text-white">{SITE_CONFIG.email}</a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.address}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-4">
          <Link
            to="/rooms"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-lg bg-[#0F172A] dark:bg-[#C5A880] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white dark:text-slate-950 shadow-md transition-colors hover:bg-[#C5A880] hover:text-slate-900"
          >
            Book Your Stay
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(navContent, document.body);
}
