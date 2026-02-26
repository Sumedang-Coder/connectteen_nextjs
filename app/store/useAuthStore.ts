import { create } from "zustand";
import api from "@/lib/axios";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;

  setUser: (user: any) => void;
  loginGuest: () => Promise<void>;
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

  loginGuest: async () => {
    try {
      set({ loading: true });

      const res = await api.post("/auth/guest/login");
      const data = res.data;

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error("Guest login failed:", error);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");

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
