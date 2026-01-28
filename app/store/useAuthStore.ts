import { create } from "zustand";

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

      const res = await fetch(
        "https://connectteen-server.vercel.app/api/auth/guest/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Guest login failed");
      }

      const data = await res.json();

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
      await fetch(
        "https://connectteen-server.vercel.app/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

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
