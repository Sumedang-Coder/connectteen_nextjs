import { create } from "zustand";
import api from "@/lib/axios";

interface Message {
  id: number;
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
  page: number;
  hasMore: boolean;
  isFetching: boolean;

  sendMessage: (msg: Omit<Message, "id" | "created_at">) => Promise<void>;
  fetchMessages: (search?: string, limit?: number) => Promise<void>;
  fetchAllMessages: (page?: number, limit?: number) => Promise<void>;
  resetAllMessages: () => void;
  fetchMyMessages: () => Promise<void>;
  fetchMessageById: (id: number | string) => Promise<void>;
  deleteMessage: (id: number | string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  allMessages: [],
  myMessages: [],
  selectedMessage: null,
  page: 1,
  hasMore: true,
  isFetching: false,

  resetAllMessages: () => {
    set({
      allMessages: [],
      page: 1,
      hasMore: true,
    });
  },

  sendMessage: async (msg) => {
    try {
      const res = await api.post("/messages", msg);
      set((state) => ({
        messages: [res.data, ...state.messages],
      }));
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  },

  fetchAllMessages: async (page = 1, limit = 6) => {
  const { isFetching, hasMore } = get();
  if (isFetching || !hasMore) return;

  set({ isFetching: true });

  try {
    const res = await api.get("/messages", {
      params: { page, limit },
    });

    const newData: Message[] = res.data.data || [];
    const pagination = res.data.pagination;

    set((state) => ({
      allMessages:
        page === 1
          ? newData
          : [
              ...state.allMessages,
              ...newData.filter(
                (newMsg) =>
                  !state.allMessages.some(
                    (existing) => existing.id === newMsg.id
                  )
              ),
            ],

      page: pagination.currentPage,
      hasMore: pagination.hasNextPage,
      isFetching: false,
    }));
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    set({ isFetching: false });
  }
},

  fetchMessages: async (search = "", limit = 6) => {
    try {
      const res = await api.get("/messages", {
        params: { search, limit },
      });
      set({ messages: res.data.data || [] });
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      set({ messages: [] });
    }
  },

  fetchMyMessages: async () => {
    try {
      const res = await api.get("/messages/me")

      set({
        myMessages: Array.isArray(res.data.data)
          ? res.data.data
          : [],
      })
    } catch (err) {
      console.error("Failed to fetch my messages:", err)
      set({ myMessages: [] })
    }
  },


  fetchMessageById: async (id) => {
    try {
      const res = await api.get(`/messages/${id}`);
      set({ selectedMessage: res.data.data });
    } catch (err) {
      console.error("Failed to fetch message detail:", err);
      set({ selectedMessage: null });
    }
  },

  deleteMessage: async (id) => {
    try {
      await api.delete(`/messages/${id}`)

      set((state) => ({
        myMessages: state.myMessages.filter((m) => m.id !== id),
      }))
    } catch (err) {
      console.error("Failed to delete message:", err)
      throw err
    }
  },

}))