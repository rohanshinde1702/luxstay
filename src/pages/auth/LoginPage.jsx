import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LuLock as Lock,
  LuMail as Mail,
  LuCrown as Crown,
  LuUser as User,
  LuShieldCheck as ShieldCheck,
  LuCircleAlert as AlertCircle,
  LuSparkles as Sparkles
} from "react-icons/lu";
import Button from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import { setAdminSession } from "../admin/adminStorage";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Role selector: "user" (guest/member) vs "admin" (administrator)
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(location.state?.error || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (role === "admin") {
      // -------------------------------------------------------------
      // ADMIN LOGIN: Strict Credentials (email: 'admin', password: 'admin')
      // -------------------------------------------------------------
      const cleanEmail = (email || "").trim().toLowerCase();
      const cleanPassword = (password || "").trim();

      if (
        (cleanEmail === "admin" || cleanEmail === "admin@luxstay.com") &&
        cleanPassword === "admin"
      ) {
        setAdminSession({
          name: "admin",
          username: "admin",
          email: "admin",
          role: "Super Administrator",
          lastLogin: new Date().toISOString(),
        });
        navigate("/admin", { replace: true });
        return;
      } else {
        setError("Invalid administrator credentials. Access restricted to Admin only (Username: admin | Password: admin).");
        return;
      }
    } else {
      // -------------------------------------------------------------
      // USER LOGIN: Strict Account Verification in LocalStorage
      // Note: Demo/Normal users CANNOT access the admin panel!
      // -------------------------------------------------------------
      const result = login(email, password);
      if (!result?.success) {
        setError(result?.error || "Login failed. Please verify your account credentials.");
        return;
      }
      setLoggedIn(true);
    }
  };

  const handleFillDemoUser = () => {
    setEmail("arthur.pendelton@luxury.com");
    setPassword("password123");
    setError("");
  };

  const handleFillAdmin = () => {
    setEmail("admin");
    setPassword("admin");
    setError("");
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center py-16 px-4 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Lux<span className="text-[#C5A880]">Stay</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 font-light">
            Sign in to access your confidential sanctuary or management console.
          </p>
        </div>

        {/* Card Frame */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-8 sm:p-10 shadow-2xl space-y-6">
          {/* 1. ROLE SELECTOR TABS: USER VS ADMIN */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800/80">
            <button
              type="button"
              onClick={() => {
                setRole("user");
                setError("");
                setEmail("");
                setPassword("");
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === "user"
                  ? "bg-[#C5A880] text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Log in as User</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setError("");
                setEmail("");
                setPassword("");
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === "admin"
                  ? "bg-[#C5A880] text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Log in as Admin</span>
            </button>
          </div>

          {loggedIn && role === "user" ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#dfcaa4]">
                <Crown className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Welcome Back, {user?.name || "Member"}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Your guest profile, ${user?.welcomeCredit?.toLocaleString() || "2,500"} welcome credit, and bookings are active.
              </p>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                🔒 You are signed in as a <strong>Standard Member</strong> (Demo user accounts cannot access the Admin panel).
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Button to="/dashboard" variant="primary" size="md" className="w-full justify-center">
                  Go to Member Dashboard
                </Button>
                <Button to="/rooms" variant="outline" size="md" className="w-full justify-center">
                  Explore Member Suites
                </Button>
                <Button to="/" variant="outline" size="md" className="w-full justify-center">
                  Return to Homepage
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error banner when account is not created or unauthorized */}
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300 flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-rose-200">Unable to Sign In</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-rose-300/90">{error}</p>
                    {role === "user" && (
                      <Link
                        to="/register"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#dfcaa4] hover:underline"
                      >
                        <span>Create your account now</span>
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Helper box based on selected role */}
              {role === "user" ? (
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#C5A880]" />
                      Demo Member Account:
                    </span>
                    <button
                      type="button"
                      onClick={handleFillDemoUser}
                      className="text-[11px] font-semibold text-[#C5A880] hover:text-[#dfcaa4] transition-colors cursor-pointer"
                    >
                      1-Click Fill
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    arthur.pendelton@luxury.com / password123
                  </div>
                  <p className="text-[10px] text-zinc-500 italic pt-0.5">
                    * Note: Standard & demo users cannot access the Admin panel.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-slate-950/60 border border-[#C5A880]/30 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#dfcaa4] flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                      Fixed Admin Credentials:
                    </span>
                    <button
                      type="button"
                      onClick={handleFillAdmin}
                      className="text-[11px] font-bold text-slate-950 bg-[#C5A880] hover:bg-[#dfcaa4] px-2 py-0.5 rounded transition-colors cursor-pointer"
                    >
                      1-Click Fill
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-300 pt-1">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Username</span>
                      <span className="font-semibold text-white">admin</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Password</span>
                      <span className="font-semibold text-[#dfcaa4]">admin</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Login identifier input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  {role === "admin" ? "Admin Username or Email *" : "Member Email *"}
                </label>
                <div className="relative">
                  <input
                    type={role === "admin" ? "text" : "email"}
                    required
                    placeholder={role === "admin" ? "admin" : "member@luxstay.com"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                  />
                  {role === "admin" ? (
                    <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  ) : (
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Password input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    {role === "admin" ? "Admin Password *" : "Password *"}
                  </label>
                  {role === "user" && (
                    <Link
                      to="/forgot-password"
                      className="text-[11px] text-[#dfcaa4] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder={role === "admin" ? "admin" : "••••••••••••"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded accent-[#C5A880] cursor-pointer"
                />
                <label htmlFor="remember" className="cursor-pointer">
                  Remember this device securely
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center mt-2"
              >
                {role === "admin" ? "Sign In to Admin Console" : "Sign In to Member Portal"}
              </Button>
            </form>
          )}

          {role === "user" && !loggedIn && (
            <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              <span>Not yet a member? </span>
              <Link to="/register" className="font-bold text-[#dfcaa4] hover:underline">
                Create an Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
