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
  preview_url?: string;
  is_admin_only?: boolean;
  is_anonymous?: boolean;
  sender_name?: string;
  created_at?: string;
  reactions: {
    heart: number;
    laugh: number;
    like: number;
    wow: number;
    sad: number;
  };
  userReaction?: string | null;
  comments?: any[];
}

interface MessageState {
  messages: Message[];
  allMessages: Message[];
  myMessages: Message[];
  selectedMessage: Message | null;
  loading: boolean;
  page: number;
  hasMore: boolean;
  isFetching: boolean;
  pagination: {
    totalMessages: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  reactionSequence: number;
  reactionTimeout: any;
  reactingIds: Set<string>;
  error: string | null;

  sendMessage: (msg: Omit<Message, "id" | "created_at">) => Promise<void>;
  fetchMessages: (params?: {
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchAllMessages: (params?: {
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchSecretMessages: (params?: {
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchMyMessages: () => Promise<void>;
  fetchMessageById: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  resetAllMessages: () => void;
  reactToMessage: (id: string, type: string) => Promise<void>;
  addComment: (id: string, name: string, message: string) => Promise<void>;
  fetchComments: (id: string) => Promise<any[]>;
  addReply: (commentId: string, name: string, message: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  allMessages: [],
  myMessages: [],
  selectedMessage: null,
  loading: true,
  page: 1,
  hasMore: true,
  isFetching: false,
  pagination: {
    totalMessages: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  },
  reactionSequence: 0,
  reactionTimeout: null,
  reactingIds: new Set(),
  error: null,

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
    set({ loading: true, isFetching: true });
    try {
      // axios requires params to be an object; default to empty if undefined
      const res = await api.get("/messages", { params: params || {} });
      const data: Message[] = res.data.data || [];
      const pagination = res.data.pagination || {
        totalMessages: data.length,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
      };
      set((state) => ({
        allMessages:
          params && params.page && params.page > 1
            ? [...state.allMessages, ...data]
            : data,
        pagination,
        page: pagination.currentPage,
        hasMore: pagination.currentPage < pagination.totalPages,
      }));
    } catch (err) {
      console.error("Failed to fetch secret messages:", err);
      set({ allMessages: [] });
    } finally {
      set({ loading: false, isFetching: false });
    }
  },

  fetchSecretMessages: async (params) => {
    set({ loading: true, isFetching: true });
    try {
      const res = await api.get("/messages/secret", { params: params || {} });
      const data: Message[] = res.data.data || [];
      const pagination = res.data.pagination || {
        totalMessages: data.length,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
      };
      set((state) => ({
        allMessages:
          params && params.page && params.page > 1
            ? [...state.allMessages, ...data]
            : data,
        pagination,
        page: pagination.currentPage,
        hasMore: pagination.currentPage < pagination.totalPages,
      }));
    } catch (err) {
      console.error("Failed to fetch secret messages:", err);
      set({ allMessages: [] });
    } finally {
      set({ loading: false, isFetching: false });
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
        },
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
      // Fetch comments after getting message
      get().fetchComments(id);
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

  reactToMessage: async (id, type) => {
    // 1. Prevent concurrent requests for the same ID
    if (get().reactingIds.has(id)) return;

    // 2. Determine Intent (Toggle-off vs Set)
    const lists = [get().messages, get().allMessages, get().myMessages];
    const currentMsg = lists.flat().find(m => m.id === id) || (get().selectedMessage?.id === id ? get().selectedMessage : null);
    const nextUserReaction = currentMsg?.userReaction === type ? null : type;

    // 3. Update State: Entering "Reacting" Mode
    set((state) => {
      const nextIds = new Set(state.reactingIds);
      nextIds.add(id);
      return { reactingIds: nextIds, error: null };
    });

    const sequence = get().reactionSequence + 1;
    set({ reactionSequence: sequence });

    try {
      // 4. IMMEDIATE Server Request (No Debounce)
      const res = await api.post(`/messages/${id}/react`, { type: nextUserReaction });
      if (!res.data.success) throw new Error("Sync failed");

      // 5. Update State: Apply Verified Server Ground Truth
      if (get().reactionSequence === sequence) {
        set((state) => {
          const syncData = (m: Message) => {
            if (!m || m.id !== id) return m;
            return { 
              ...m, 
              reactions: res.data.data.allReactions, 
              userReaction: res.data.data.userReaction 
            };
          };

          return {
            messages: state.messages.map(syncData),
            allMessages: state.allMessages.map(syncData),
            myMessages: state.myMessages.map(syncData),
            selectedMessage: syncData(state.selectedMessage as any)
          };
        });
      }
    } catch (err: any) {
      console.error("Message reaction failed:", err);
      if (get().reactionSequence === sequence) {
        set({ 
          error: err?.response?.status === 401 
            ? "Harap login untuk memberikan reaksi" 
            : "Gagal menghubungkan ke server" 
        });
        if (err?.response?.status === 401) {
          alert("Harap login terlebih dahulu untuk memberikan reaksi.");
        }
      }
    } finally {
      // 6. Exit "Reacting" Mode
      set((state) => {
        const nextIds = new Set(state.reactingIds);
        nextIds.delete(id);
        return { reactingIds: nextIds };
      });
    }
  },

  addComment: async (id, name, message) => {
    try {
      const res = await api.post(`/messages/${id}/comments`, { name, message });
      if (res.data.success) {
        set((state) => ({
          selectedMessage: state.selectedMessage 
            ? { ...state.selectedMessage, comments: [res.data.data, ...(state.selectedMessage.comments || [])] }
            : null
        }));
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  },

  fetchComments: async (id) => {
    try {
      const res = await api.get(`/messages/${id}/comments`);
      if (res.data.success) {
        const comments = res.data.data;
        set((state) => ({
          selectedMessage: state.selectedMessage 
            ? { ...state.selectedMessage, comments }
            : null
        }));
        return comments;
      }
      return [];
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      return [];
    }
  },

  addReply: async (commentId, name, message) => {
    try {
      const res = await api.post(`/comments/${commentId}/reply`, { name, message });
      if (res.data.success) {
        // Refresh comments
        const selectedMessage = get().selectedMessage;
        if (selectedMessage) {
          get().fetchComments(selectedMessage.id);
        }
      }
    } catch (err) {
      console.error("Failed to add reply:", err);
    }
  },

  resetAllMessages: () => {
    // clear the cached messages and restore pagination defaults
    set({
      allMessages: [],
      pagination: {
        totalMessages: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
      },
    });
  },
}));
