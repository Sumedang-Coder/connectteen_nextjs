import { create } from "zustand";
import api from "@/lib/axios";

interface DashboardStats {
    messages: number;
    events: number;
    users: number;
    articles: number;
}

interface AdminState {
    stats: DashboardStats;
    loading: boolean;
    error: string | null;

    fetchStats: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
    stats: {
        messages: 0,
        events: 0,
        users: 0,
        articles: 0,
    },
    loading: false,
    error: null,

    fetchStats: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.get("/admin/stats");
            if (res.data.success) {
                set({ stats: res.data.data });
            }
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Fetch stats failed" });
            console.error("Dashboard stats error:", err);
        } finally {
            set({ loading: false });
        }
    },
}));
