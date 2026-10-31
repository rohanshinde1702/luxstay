import { createContext, useState, useEffect, useCallback } from "react";
import { useToast } from "../hooks/useToast";
import { recordUserLogin, addUser } from "../pages/admin/adminStorage";

export const AuthContext = createContext(null);

const STORAGE_KEY = "luxstay_auth_user";
const ACCOUNTS_KEY = "luxstay_registered_accounts";

// Initial demo accounts registered in LocalStorage for testing
const INITIAL_REGISTERED_ACCOUNTS = [
  {
    id: "usr_vip_8842",
    name: "Arthur Pendelton",
    email: "arthur.pendelton@luxury.com",
    password: "password123",
    phone: "+1 (800) 456-7890",
    tier: "Black Diamond VIP Member",
    memberSince: "2024",
    welcomeCredit: 2500,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    preferences: {
      pillowType: "Goose Down Soft",
      champagne: "Dom Pérignon Vintage",
      tempPreference: "21°C",
      airportTransfer: "Rolls-Royce Ghost",
    },
  },
  {
    id: "usr_vip_9011",
    name: "Eleanor Vance",
    email: "eleanor.v@luxstay.vip",
    password: "password123",
    phone: "+1 (800) 555-0101",
    tier: "Black Diamond VIP Member",
    memberSince: "2025",
    welcomeCredit: 2500,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    preferences: {
      pillowType: "Goose Down Firm",
      champagne: "Krug Clos d'Ambonnay",
      tempPreference: "20°C",
      airportTransfer: "Bentley Flying Spur",
    },
  },
];

function getStoredAccounts() {
  if (typeof window === "undefined") return INITIAL_REGISTERED_ACCOUNTS;
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Failed to parse registered accounts", e);
  }
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(INITIAL_REGISTERED_ACCOUNTS));
  } catch (e) {
    console.error("Failed to seed registered accounts", e);
  }
  return INITIAL_REGISTERED_ACCOUNTS;
}

export function AuthProvider({ children }) {
  const { addToast } = useToast();

  // Active authenticated session (starts null if not logged in)
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist user session", e);
    }
  }, [user]);

  // Login handler: Strictly validates that the account was previously registered
  const login = useCallback(
    (email, password) => {
      const cleanEmail = (email || "").trim().toLowerCase();
      const cleanPassword = (password || "").trim();

      if (!cleanEmail) {
        return { success: false, error: "Please enter your registered email address." };
      }

      if (!cleanPassword) {
        return { success: false, error: "Please enter your password." };
      }

      const accounts = getStoredAccounts();
      const account = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

      // Rule: User CANNOT log in without creating an account first!
      if (!account) {
        return {
          success: false,
          error: `No registered account found for "${cleanEmail}". Please create an account before logging in.`,
        };
      }

      // Validate password
      if (account.password && account.password !== cleanPassword) {
        return {
          success: false,
          error: "Incorrect password. Please verify your credentials and try again.",
        };
      }

      // Valid account: log in
      setUser(account);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account));

      // Record in Admin "Who Logged In" audit log
      recordUserLogin(
        {
          name: account.name,
          email: account.email,
          role: account.tier || "VIP Member",
        },
        {
          device:
            typeof navigator !== "undefined" && navigator.userAgent.includes("Windows")
              ? "Windows PC / Chrome"
              : "Mobile / Safari",
          ip: "192.168.1.108",
        }
      );

      addToast(`Welcome back, ${account.name}! Your member privileges are active.`, "success");
      return { success: true, user: account };
    },
    [addToast]
  );

  // Register handler: Persists new account to LocalStorage then enables login
  const register = useCallback(
    (userData) => {
      const cleanEmail = (userData.email || "").trim().toLowerCase();
      const cleanPassword = (userData.password || "").trim();

      if (!cleanEmail) {
        return { success: false, error: "Please provide a valid email address." };
      }

      if (!cleanPassword || cleanPassword.length < 6) {
        return { success: false, error: "Password must be at least 6 characters long." };
      }

      const accounts = getStoredAccounts();
      const alreadyExists = accounts.some((acc) => acc.email.toLowerCase() === cleanEmail);

      if (alreadyExists) {
        return {
          success: false,
          error: `An account with "${cleanEmail}" is already registered. Please sign in instead.`,
        };
      }

      const firstName = (userData.firstName || "").trim();
      const lastName = (userData.lastName || "").trim();
      const fullName = `${firstName} ${lastName}`.trim() || "Distinguished Member";

      const newAccount = {
        id: `usr_${Date.now().toString(36)}`,
        name: fullName,
        email: cleanEmail,
        password: cleanPassword,
        phone: userData.phone || "+1 (800) 555-0199",
        tier: userData.tier || "Gold Elite Member",
        memberSince: new Date().getFullYear().toString(),
        welcomeCredit: 2500,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        preferences: {
          pillowType: "Goose Down Soft",
          champagne: "Dom Pérignon Vintage",
          tempPreference: "21°C",
          airportTransfer: "Rolls-Royce Ghost",
        },
      };

      // 1. Add to registered accounts in LocalStorage
      const updatedAccounts = [newAccount, ...accounts];
      try {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
      } catch (e) {
        console.error("Failed to save registered accounts", e);
      }

      // 2. Also persist to Admin User Directory in LocalStorage
      addUser({
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        phone: newAccount.phone,
        tier: newAccount.tier,
        role: "Guest",
        avatar: newAccount.avatar,
        totalBookings: 0,
        totalSpent: 0,
      });

      // 3. Set active user session
      setUser(newAccount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAccount));

      // 4. Record registration in Admin "Who Logged In" audit log
      recordUserLogin(
        {
          name: newAccount.name,
          email: newAccount.email,
          role: `${newAccount.tier} (New Member)`,
        },
        {
          device:
            typeof navigator !== "undefined" && navigator.userAgent.includes("Windows")
              ? "Windows PC / Chrome"
              : "Mobile / Safari",
          ip: "192.168.1.108",
        }
      );

      addToast(
        `Welcome to LuxStay VIP Circle, ${newAccount.name}! Account registered in LocalStorage with $2,500 credit.`,
        "success"
      );

      return { success: true, user: newAccount };
    },
    [addToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    addToast("You have been signed out safely. Sanctuary sessions closed.", "info");
  }, [addToast]);

  const updateProfile = useCallback(
    (updates) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...updates };
        // Update in accounts store as well
        const accounts = getStoredAccounts();
        const updatedAccounts = accounts.map((acc) =>
          acc.id === prev.id ? { ...acc, ...updates } : acc
        );
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
        addToast("Member profile updated successfully", "success");
        return updated;
      });
    },
    [addToast]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
