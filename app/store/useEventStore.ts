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
  image_url?: string;
  registrants_count?: number;
  is_registered?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Registrant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  registered_at?: string;
}

interface EventState {
  events: Event[];
  event: Event | null;
  registrants: Registrant[];

  page: number;
  hasMore: boolean;
  isFetching: boolean;

  loading: boolean;
  error: string | null;

  fetchEvents: (page?: number, limit?: number, search?: string) => Promise<void>;
  fetchNextEvents: () => Promise<void>;
  resetEvents: () => void;

  fetchEventById: (id: string) => Promise<void>;
  toggleRegisterEvent: (eventId: string) => Promise<void>;
  createEvent: (formData: FormData) => Promise<boolean>;
  updateEvent: (id: string, formData: FormData) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  fetchRegistrants: (eventId: string) => Promise<void>;
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

  fetchEvents: async (page = 1, limit = 6, search = "") => {
  const { isFetching, hasMore } = get();
  if (isFetching || !hasMore) return;

  try {
    set({ isFetching: true, error: null });

    const res = await api.get("/events", {
      params: { page, limit, search },
    });

    const newData: Event[] = (res.data.data || []).map((e: any) => ({
      ...e,
      is_registered: e.isRegistered,
    }));

    const pagination = res.data.pagination;

    set((state) => ({
      events:
        page === 1
          ? newData
          : [
              ...state.events,
              ...newData.filter(
                (newEvent) =>
                  !state.events.some(
                    (existing) => existing.id === newEvent.id
                  )
              ),
            ],
      page: pagination.currentPage,
      hasMore: pagination.hasNextPage,
      isFetching: false,
    }));
  } catch (err: any) {
    set({
      error: err?.response?.data?.message || "Fetch events failed",
      isFetching: false,
    });
  }
},

fetchNextEvents: async () => {
  const { page, fetchEvents } = get();
  await fetchEvents(page + 1);
},

resetEvents: () => {
  set({
    events: [],
    page: 1,
    hasMore: true,
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

      const event = get().events.find((e) => e.id === eventId);
      if (!event) return;

      const res = await api.post(`/events/${eventId}/register`, {});

      if (!res.data.success) {
        toast.error("Aksi gagal");
        return;
      }

      const eventData = res.data.data;
      const DataRegis = res.data.message;

      set({
        events: get().events.map((e) =>
          e.id === eventId
            ? {
              ...e,
              is_registered: eventData.isRegistered,
              registrants_count:
                eventData.registrants_count ?? e.registrants_count,
            }
            : e
        ),
      });
      toast.success(DataRegis);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Aksi gagal";
      set({ error: message });
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
          e.id === id
            ? {
              ...e,
              ...res.data.data,
            }
            : e
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

  fetchRegistrants: async (eventId) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get(`/events/${eventId}/registrants`);
      set({ registrants: res.data.data || [] });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Fetch registrants failed" });
    } finally {
      set({ loading: false });
    }
  },
}));
