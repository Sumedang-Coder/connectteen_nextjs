import { create } from "zustand";
import api from "@/lib/axios";
import { useMessageStore } from "./useMessageStore";
import { useArticleStore } from "./useArticleStore";
import { useEventStore } from "./useEventStore";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;

  setUser: (user: any) => void;
  loginGuest: () => Promise<{ success: boolean; message?: string }>;
  verifyEmail: (email: string, otp: string) => Promise<{ success: boolean; message: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (data: { name: string; no_hp: string }) => Promise<{ success: boolean; message: string }>;
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
      const res = await api.post("/auth/guest/login");
      const data = res.data;

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
      return { success: true };
    } catch (error: any) {
      console.error("Guest login failed:", error);
      set({ loading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || "Gagal masuk sebagai tamu. Silakan coba lagi."
      };
    }
  },

  verifyEmail: async (email, otp) => {
    try {
      set({ loading: true });
      const res = await api.post("/auth/verify-email", { email, otp });
      set({ 
        user: res.data.user, 
        isAuthenticated: true, 
        loading: false 
      });
      return { success: true, message: res.data.message };
    } catch (error: any) {
      set({ loading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || "Verification failed" 
      };
    }
  },

  resendVerification: async (email) => {
    try {
      const res = await api.post("/auth/resend-verification", { email });
      return { success: true, message: res.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Resend failed" 
      };
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      return { success: true, message: res.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Forgot password request failed" 
      };
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      const res = await api.post("/auth/reset-password", { token, newPassword });
      return { success: true, message: res.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Password reset failed" 
      };
    }
  },

  updateProfile: async (data: { name: string; no_hp: string }) => {
    try {
      set({ loading: true });
      const res = await api.put("/auth/me", data);
      set({ 
        user: res.data.user, 
        loading: false 
      });
      return { success: true, message: res.data.message };
    } catch (error: any) {
      set({ loading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || "Update profile failed" 
      };
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

      // Clear other stores
      useMessageStore.getState().resetStore();
      useArticleStore.getState().resetStore();
      useEventStore.getState().resetStore();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));
