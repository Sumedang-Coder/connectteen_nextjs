import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    }),

  logout: async () => {
    try {
      await fetch("https://connectteen-server.vercel.app/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));
