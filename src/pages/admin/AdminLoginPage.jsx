import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuLock,
  LuMail,
  LuKeyRound,
  LuArrowRight,
  LuShieldCheck,
  LuSparkles,
  LuCircleAlert,
  LuCircleCheck
} from "react-icons/lu";
import { ADMIN_CREDENTIALS, setAdminSession, isAdminAuthenticated } from "./adminStorage";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  // If already logged in, redirect to /admin dashboard
  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleFillDemo = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setError("");
    setAutoFilled(true);
    setTimeout(() => setAutoFilled(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      if (
        (cleanEmail === "admin" || cleanEmail === "admin@luxstay.com") &&
        cleanPassword === "admin"
      ) {
        setAdminSession({
          ...ADMIN_CREDENTIALS,
          name: "admin",
          email: "admin",
          username: "admin",
          lastLogin: new Date().toISOString(),
        });
        navigate("/admin", { replace: true });
      } else {
        setError("Invalid credentials. Please use fixed administrator access: admin / admin");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12">
      {/* Ambient Luxury Background Lights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Anchor */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 mb-8">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C5A880] text-slate-950 font-serif font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            L
          </div>
          <span className="font-serif text-3xl font-bold tracking-tight text-white">
            Lux<span className="text-[#C5A880]">Stay</span>
          </span>
        </Link>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#C5A880]/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#dfcaa4] font-semibold">
            Executive Portal
          </span>
          <span className="h-px w-8 bg-[#C5A880]/40" />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Secure central console for booking management, login auditing & hospitality telemetry.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Fixed Credentials Demo Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-[#C5A880]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#dfcaa4] uppercase tracking-wider">
                <LuShieldCheck className="h-4 w-4 text-[#C5A880]" />
                Fixed Admin Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-slate-950 bg-[#C5A880] hover:bg-[#dfcaa4] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LuSparkles className="h-3 w-3" />
                <span>1-Click Fill</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Username / Email</span>
                <span className="text-slate-200 select-all font-semibold">admin</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Password</span>
                <span className="text-[#dfcaa4] select-all font-semibold">admin</span>
              </div>
            </div>
            {autoFilled && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <LuCircleCheck className="h-3 w-3" />
                Credentials filled! Click &quot;Sign In to Admin Console&quot; below.
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
              <LuCircleAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <LuMail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <LuLock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#C5A880] hover:bg-[#dfcaa4] text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer font-bold disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Authenticating Executive Access...</span>
              ) : (
                <>
                  <LuKeyRound className="h-4 w-4" />
                  <span>Sign In to Admin Console</span>
                  <LuArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Return to Main Site */}
          <div className="pt-2 border-t border-slate-800/80 text-center">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
