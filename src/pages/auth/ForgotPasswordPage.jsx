import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuMail as Mail,
  LuCircleCheck as CheckCircle2
} from "react-icons/lu";
import Button from "../../components/common/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center py-16 px-4 text-white relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Lux<span className="text-[#C5A880]">Stay</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 font-light">
            Password Recovery Portal
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/90 backdrop-blur-md p-8 sm:p-10 shadow-2xl space-y-6">
          {sent ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Reset Link Dispatched
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                If an account exists under <span className="font-bold text-white">{email}</span>, a secure authentication token has been delivered to your inbox.
              </p>
              <div className="pt-2">
                <Button to="/login" variant="primary" size="md" className="w-full justify-center">
                  Return to Sign In
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 text-center pb-2">
                <h3 className="font-serif text-xl font-bold text-white">
                  Forgot Your Password?
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Enter your registered member email and we will send a temporary one-time login link.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Registered Email Address *
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

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center mt-3"
              >
                Send Recovery Link
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <Link to="/login" className="font-bold text-[#dfcaa4] hover:underline">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
