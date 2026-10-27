import { createContext, useState, useEffect, useCallback } from "react";
import { useToast } from "../hooks/useToast";

export const AuthContext = createContext(null);

const STORAGE_KEY = "luxstay_auth_user";

const DEFAULT_VIP_USER = {
  id: "usr_vip_8842",
  name: "Arthur Pendelton",
  email: "arthur.pendelton@luxury.com",
  phone: "+1 (800) 456-7890",
  tier: "Black Diamond VIP Member",
  memberSince: "2024",
  welcomeCredit: 25000,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  preferences: {
    pillowType: "Goose Down Soft",
    champagne: "Dom Pérignon Vintage",
    tempPreference: "21°C",
    airportTransfer: "Rolls-Royce Ghost",
  },
};

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        return saved ? JSON.parse(saved) : null;
      }
      return DEFAULT_VIP_USER; // Default to luxury logged in preview or user can toggle
    } catch {
      return DEFAULT_VIP_USER;
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

  const login = useCallback(
    (email, password) => {
      const loggedInUser = {
        ...DEFAULT_VIP_USER,
        email: email || DEFAULT_VIP_USER.email,
        name: email ? email.split("@")[0].replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase()) : DEFAULT_VIP_USER.name,
      };
      setUser(loggedInUser);
      addToast(`Welcome back, ${loggedInUser.name}! Your Black Diamond privileges are active.`, "success");
      return true;
    },
    [addToast]
  );

  const register = useCallback(
    (userData) => {
      const newUser = {
        ...DEFAULT_VIP_USER,
        id: `usr_${Date.now().toString(36)}`,
        name: `${userData.firstName || "Distinguished"} ${userData.lastName || "Guest"}`.trim(),
        email: userData.email,
        phone: userData.phone || DEFAULT_VIP_USER.phone,
        welcomeCredit: 25000,
      };
      setUser(newUser);
      addToast(`Welcome to LuxStay VIP Circle, ${newUser.name}! ₹25,000 welcome credit has been applied.`, "success");
      return true;
    },
    [addToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    addToast("You have been signed out safely. Sanctuary sessions closed.", "info");
  }, [addToast]);

  const updateProfile = useCallback(
    (updates) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...updates };
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
