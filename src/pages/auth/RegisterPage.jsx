import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuLock as Lock,
  LuMail as Mail,
  LuUser as User,
  LuCircleCheck as CheckCircle2
} from "react-icons/lu";
import Button from "../../components/common/Button";
import { VIP_TIERS_DATA } from "../../data/membership";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTier, setSelectedTier] = useState(VIP_TIERS_DATA[0].tier);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "Distinguished";
    const lastName = nameParts.slice(1).join(" ") || "Guest";

    register({
      firstName,
      lastName,
      email,
      tier: selectedTier,
    });
    setRegistered(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center py-16 px-4 text-white relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Lux<span className="text-[#C5A880]">Stay</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 font-light">
            Join the LuxStay Private Membership Society.
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/90 backdrop-blur-md p-8 sm:p-10 shadow-2xl space-y-6">
          {registered ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Account Created Successfully
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Your member credentials and ₹25,000 welcome credit are now active. Welcome to the LuxStay society, {name}.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Button to="/rooms" variant="primary" size="md" className="w-full justify-center">
                  Explore Member Suites
                </Button>
                <Button to="/" variant="outline" size="md" className="w-full justify-center">
                  Return to Home
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Vivienne Montgomery"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="member@luxury.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Create Confidential Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:border-[#C5A880] focus:outline-hidden"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                </div>
              </div>

              {/* Tier Selection */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Membership Tier
                </label>
                <div className="space-y-2">
                  {VIP_TIERS_DATA.map((tier) => (
                    <div
                      key={tier.tier}
                      onClick={() => setSelectedTier(tier.tier)}
                      className={`flex items-center justify-between rounded-xl p-3 border transition-all cursor-pointer ${
                        selectedTier === tier.tier
                          ? "border-[#C5A880] bg-[#C5A880]/15"
                          : "border-slate-800 bg-slate-950/60 hover:bg-slate-800"
                      }`}
                    >
                      <div>
                        <strong className="block text-xs font-bold text-white">{tier.tier}</strong>
                        <span className="text-[10px] text-slate-400">{tier.spend}</span>
                      </div>
                      <input
                        type="radio"
                        checked={selectedTier === tier.tier}
                        onChange={() => setSelectedTier(tier.tier)}
                        className="accent-[#C5A880]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center mt-4"
              >
                Create Member Account
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-[#dfcaa4] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
