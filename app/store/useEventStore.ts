import { create } from "zustand";
import api from "@/lib/axios";
import { toast } from "sonner";

/* ================= TYPES ================= */

export interface Event {
  id: string;
  event_title: string;
  description: string;
  location: string;
  date: string;
  time?: string;
  quota: number;
  status: "open" | "full" | "closed";
  visibility: "public" | "private";
  image_url?: string;
  registrants_count?: number;
  attended_count?: number;
  is_registered?: boolean;
  attendance_token?: string;
  is_attended?: boolean;
  is_online?: boolean;
  link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Registrant {
  registrant_id: string;
  id: string;
  name: string;
  email: string;
  no_hp?: string;
  avatarUrl?: string;
  is_attended?: boolean;
  attended_at?: string;
  attendance_token?: string;
  registered_at?: string;
}

interface EventState {
  events: Event[];
  event: Event | null;
  registrants: Registrant[];

  // State Infinite Scroll (Anda)
  page: number;
  hasMore: boolean;
  isFetching: boolean;

  // State Umum
  loading: boolean;
  error: string | null;

  // State Pagination (Dev 1)
  pagination: {
    totalEvents: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  registrantsPagination: {
    totalRegistrants: number;
    totalAttended: number;
    totalAbsent: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };

  fetchEvents: (params?: {
    limit?: number;
    search?: string;
    page?: number;
    sort?: string;
    append?: boolean;
  }) => Promise<void>;
  fetchNextEvents: () => Promise<void>;
  resetEvents: () => void;

  fetchEventById: (id: string) => Promise<void>;
  toggleRegisterEvent: (eventId: string) => Promise<void>;
  createEvent: (formData: FormData) => Promise<boolean>;
  updateEvent: (id: string, formData: FormData) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  fetchRegistrants: (eventId: string, params?: { 
    page?: number; 
    limit?: number; 
    search?: string;
    sort?: string;
  }) => Promise<void>;
  resetStore: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  event: null,
  registrants: [],

  page: 1,
  hasMore: true,
  isFetching: false,

  loading: false,
  error: null,

  pagination: {
    totalEvents: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  },
  registrantsPagination: {
    totalRegistrants: 0,
    totalAttended: 0,
    totalAbsent: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  },

  fetchEvents: async (params = {}) => {
    const { isFetching, hasMore } = get();
    const targetPage = params.page || 1;

    if (isFetching || (!hasMore && targetPage !== 1)) return;

    try {
      set({ isFetching: true, loading: true, error: null });

      const res = await api.get("/events", { params });

      const newData: Event[] = (res.data.data || []).map((e: any) => ({
        ...e,
        is_registered: e.isRegistered,
        attendance_token: e.attendance_token || undefined,
        is_attended: e.is_attended || false,
        attended_count: e.attended_count || 0,
      }));

      const apiPagination = res.data.pagination;

      set((state) => ({
        events:
          params.append
            ? [
                ...state.events,
                ...newData.filter(
                  (newEvent) =>
                    !state.events.some(
                      (existing) => existing.id === newEvent.id,
                    ),
                ),
              ]
            : newData,
        page: apiPagination?.currentPage || targetPage,
        hasMore: apiPagination?.hasNextPage || false,
        pagination: apiPagination || state.pagination,
        isFetching: false,
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Fetch events failed",
        isFetching: false,
        loading: false,
      });
    }
  },

  fetchNextEvents: async () => {
    const { page, fetchEvents } = get();
    await fetchEvents({ page: page + 1, append: true });
  },

  resetEvents: () => {
    set({
      events: [],
      page: 1,
      hasMore: true,
      pagination: {
        totalEvents: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
      },
    });
  },

  fetchEventById: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get(`/events/${id}`);
      set({ event: res.data.data });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Fetch event failed" });
    } finally {
      set({ loading: false });
    }
  },

  toggleRegisterEvent: async (eventId) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post(`/events/${eventId}/register`, {});

      if (!res.data.success) {
        toast.error("Aksi gagal");
        return;
      }

      const eventData = res.data.data;
      set({
        events: get().events.map((e) =>
          e.id === eventId
            ? {
                ...e,
                is_registered: eventData.isRegistered,
                attendance_token: eventData.attendance_token,
                registrants_count:
                  eventData.registrants_count ?? e.registrants_count,
              }
            : e,
        ),
      });
      toast.success(res.data.message);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Aksi gagal";
      toast.error(message);
    } finally {
      set({ loading: false });
    }
  },

  createEvent: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        events: [...state.events, res.data.data],
      }));
      return true;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Create event failed" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateEvent: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      const res = await api.put(`/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({
        events: get().events.map((e) =>
          e.id === id ? { ...e, ...res.data.data } : e,
        ),
      });
      return true;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Update event failed" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteEvent: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/events/${id}`);
      set({ events: get().events.filter((e) => e.id !== id) });
      return true;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Delete event failed" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchRegistrants: async (eventId, params = {}) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get(`/events/${eventId}/registrants`, { params });
      if (res.data.success) {
        set({ 
          registrants: res.data.data || [],
          registrantsPagination: res.data.pagination || {
            totalRegistrants: (res.data.data || []).length,
            totalAttended: 0,
            totalAbsent: 0,
            totalPages: 1,
            currentPage: 1,
            limit: 10,
          }
        });
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Fetch registrants failed",
      });
    } finally {
      set({ loading: false });
    }
  },

  resetStore: () => {
    set({
      events: [],
      event: null,
      registrants: [],
      page: 1,
      hasMore: true,
      isFetching: false,
      loading: false,
      error: null,
      pagination: {
        totalEvents: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
      },
    });
  },
}));
