import { create } from "zustand";
import api from "@/lib/axios";

interface DashboardStats {
    messages: number;
    events: number;
    users: number;
    articles: number;
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: "super_admin" | "content_editor" | "viewer";
    status: "active" | "suspended" | "invited";
    lastLogin?: string;
}

interface AdminState {
    stats: DashboardStats;
    admins: AdminUser[];
    loading: boolean;
    error: string | null;
    pagination: {
        totalUsers: number;
        totalPages: number;
        currentPage: number;
        hasNextPage: boolean;
    };

    fetchStats: () => Promise<void>;
    fetchAdmins: (params?: { search?: string; page?: number; limit?: number }) => Promise<void>;
    inviteAdmin: (email: string, role: string) => Promise<{ success: boolean; token?: string }>;
    updateAdmin: (id: string, data: Partial<AdminUser>) => Promise<boolean>;
    deleteAdmin: (id: string) => Promise<boolean>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
    stats: {
        messages: 0,
        events: 0,
        users: 0,
        articles: 0,
    },
    admins: [],
    loading: false,
    error: null,
    pagination: {
        totalUsers: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
    },

    fetchStats: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.get("/admin/stats");
            if (res.data.success) {
                set({ stats: res.data.data });
            }
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Fetch stats failed" });
        } finally {
            set({ loading: false });
        }
    },

    fetchAdmins: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.get("/admin", { params });
            if (res.data.success) {
                set({
                    admins: res.data.data,
                    pagination: res.data.pagination
                });
            }
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Fetch admins failed" });
        } finally {
            set({ loading: false });
        }
    },

    inviteAdmin: async (email, role) => {
        try {
            set({ loading: true, error: null });
            const res = await api.post("/admin/invite", { email, role });
            return { success: true, token: res.data.data.invitationToken };
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Invite failed" });
            return { success: false };
        } finally {
            set({ loading: false });
        }
    },

    updateAdmin: async (id, data) => {
        try {
            set({ loading: true, error: null });
            await api.put(`/admin/${id}`, data);
            await get().fetchAdmins();
            return true;
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Update failed" });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    deleteAdmin: async (id) => {
        try {
            set({ loading: true, error: null });
            await api.delete(`/admin/${id}`);
            set({ admins: get().admins.filter(a => a.id !== id) });
            return true;
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Delete failed" });
            return false;
        } finally {
            set({ loading: false });
        }
    },
}));
