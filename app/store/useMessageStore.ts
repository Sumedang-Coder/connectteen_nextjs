import { create } from "zustand";
import api from "@/lib/axios";

interface Message {
  id: string;
  recipient_name: string;
  message: string;
  song_id: string;
  song_name: string;
  song_artist: string;
  song_image: string;
  created_at?: string;
}

interface MessageState {
  messages: Message[];
  allMessages: Message[];
  myMessages: Message[];
  selectedMessage: Message | null;
  loading: boolean;
  pagination: {
    totalMessages: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };

  sendMessage: (msg: Omit<Message, "id" | "created_at">) => Promise<void>;
  fetchMessages: (params?: { search?: string; sort?: string; page?: number; limit?: number }) => Promise<void>;
  fetchAllMessages: (params?: { search?: string; sort?: string; page?: number; limit?: number }) => Promise<void>;
  fetchMyMessages: () => Promise<void>;
  fetchMessageById: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  allMessages: [],
  myMessages: [],
  selectedMessage: null,
  loading: true,
  pagination: {
    totalMessages: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  },

  sendMessage: async (msg) => {
    try {
      const res = await api.post("/messages", msg);
      set((state) => ({
        messages: [res.data.data, ...state.messages],
      }));
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  },

  fetchAllMessages: async (params) => {
    set({ loading: true });
    try {
      const res = await api.get("/messages/secret", { params });
      set({
        allMessages: res.data.data || [],
        pagination: res.data.pagination || {
          totalMessages: (res.data.data || []).length,
          totalPages: 1,
          currentPage: 1,
          limit: 10,
        },
      });
    } catch (err) {
      console.error("Failed to fetch secret messages:", err);
      set({ allMessages: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchMessages: async (params) => {
    set({ loading: true });
    try {
      const res = await api.get("/messages", { params });
      set({
        messages: res.data.data || [],
        pagination: res.data.pagination || {
          totalMessages: (res.data.data || []).length,
          totalPages: 1,
          currentPage: 1,
          limit: 10,
        }
      });
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      set({ messages: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchMyMessages: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/messages/me");
      set({
        myMessages: Array.isArray(res.data.data) ? res.data.data : [],
      });
    } catch (err) {
      console.error("Failed to fetch my messages:", err);
      set({ myMessages: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchMessageById: async (id) => {
    set({ loading: true });
    try {
      const res = await api.get(`/messages/${id}`);
      set({ selectedMessage: res.data.data });
    } catch (err) {
      console.error("Failed to fetch message detail:", err);
      set({ selectedMessage: null });
    } finally {
      set({ loading: false });
    }
  },

  deleteMessage: async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      set((state) => ({
        allMessages: state.allMessages.filter((m) => m.id !== id),
        myMessages: state.myMessages.filter((m) => m.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete message:", err);
      throw err;
    }
  },
}));