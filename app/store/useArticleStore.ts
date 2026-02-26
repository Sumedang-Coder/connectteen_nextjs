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
  pagination: {
    totalArticles: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };

  createArticle: (formData: FormData) => Promise<boolean>;
  fetchArticles: (params?: { limit?: number; search?: string; page?: number; sort?: string }) => Promise<void>;
  fetchArticleById: (id: string) => Promise<void>;
  updateArticle: (id: string, data: FormData) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  article: null,
  loading: true,
  error: null,
  pagination: {
    totalArticles: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  },

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
      set({
        articles: res.data.data || [],
        pagination: res.data.pagination || get().pagination
      });
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
