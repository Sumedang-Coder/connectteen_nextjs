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

  sendMessage: (msg: Omit<Message, "id" | "created_at">) => Promise<void>;
  fetchMessages: (search?: string, limit?: number) => Promise<void>;
  fetchAllMessages: (search?: string) => Promise<void>;
  fetchMyMessages: () => Promise<void>;
  fetchMessageById: (id: number | string) => Promise<void>;
  deleteMessage: (id: number | string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  allMessages: [
    {
      id: 1,
      recipient_name: "Admin",
      message: "This is a secret message from a mysterious supporter. Keep up the great work!",
      song_id: "spotify:track:4cOdK97xlZST91Zyd6P1iB",
      song_name: "Starboy",
      song_artist: "The Weeknd",
      song_image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258cf7ac552",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      recipient_name: "Moderator",
      message: "Thanks for organizing the summit, it was very impactful for the youth.",
      song_id: "",
      song_name: "",
      song_artist: "",
      song_image: "",
      created_at: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  myMessages: [],
  selectedMessage: null,

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

  fetchAllMessages: async () => {
    try {
      const res = await api.get("/messages");
      set({ allMessages: res.data.data || [] });
    } catch (err) {
      console.error("Failed to fetch all messages:", err);
      set({ allMessages: [] });
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