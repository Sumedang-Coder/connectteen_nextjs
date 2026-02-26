import { create } from "zustand";
import api from "@/lib/axios";

export interface Article {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

interface ArticleState {
  articles: Article[];
  article: Article | null;
  loading: boolean;
  error: string | null;

  createArticle: (formData: FormData) => Promise<boolean>;
  fetchArticles: (params?: { limit?: number; search?: string }) => Promise<void>;
  fetchArticleById: (id: string) => Promise<void>;
  updateArticle: (id: string, data: FormData) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [
    {
      id: "1",
      title: "Mental Health Awareness in Adolescents",
      description: "Discussing the importance of mental health support for teenagers in today's digital age...",
      image_url: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2083&auto=format&fit=crop",
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "The Future of Community Engagement",
      description: "Exploring new ways for communities to connect and thrive through technology and shared values...",
      image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop",
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  article: null,
  loading: false,
  error: null,

  createArticle: async (formData) => {
    try {
      set({ loading: true, error: null });

      await api.post("/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return true;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Create article failed",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchArticles: async (params) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/articles", { params });
      set({ articles: res.data.data || [] });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Fetch articles failed" });
    } finally {
      set({ loading: false });
    }
  },

  fetchArticleById: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get(`/articles/${id}`);
      set({ article: res.data.data });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Fetch article failed" });
    } finally {
      set({ loading: false });
    }
  },

  updateArticle: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      await api.put(`/articles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return true;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Update article failed" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteArticle: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/articles/${id}`);
      set({
        articles: get().articles.filter((a) => a.id !== id),
      });
      return true;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Delete article failed" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
