import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuLock as Lock,
  LuMail as Mail,
  LuCrown as Crown
} from "react-icons/lu";
import Button from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setLoggedIn(true);
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
            Sign in to access your confidential member sanctuary.
          </p>
        </div>

        {/* Card Frame */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/90 backdrop-blur-md p-8 sm:p-10 shadow-2xl space-y-6">
          {loggedIn ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#dfcaa4]">
                <Crown className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Welcome Back, {user?.name || "Member"}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Your Black Diamond profile, ₹{user?.welcomeCredit?.toLocaleString() || "25,000"} welcome credit, and confidential bookings are active.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Button to="/rooms" variant="primary" size="md" className="w-full justify-center">
                  Continue to Member Suites
                </Button>
                <Button to="/" variant="outline" size="md" className="w-full justify-center">
                  Return to Homepage
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Member Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="member@luxstay.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password *
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] text-[#dfcaa4] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                Sign In to Member Portal
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>Not yet a member? </span>
            <Link to="/register" className="font-bold text-[#dfcaa4] hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
