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

  // State untuk Infinite Scroll (Anda)
  page: number;
  hasMore: boolean;
  isFetching: boolean;

  // State Umum & Pagination (Gabungan)
  loading: boolean;
  error: string | null;
  pagination: {
    totalArticles: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };

  createArticle: (formData: FormData) => Promise<boolean>;
  // Mendukung parameter individual (Anda) dan objek params (Dev 1)
  fetchArticles: (params?: {
    limit?: number;
    search?: string;
    page?: number;
    sort?: string;
  }) => Promise<void>;
  fetchNextArticles: () => Promise<void>;
  resetArticles: () => void;

  fetchArticleById: (id: string) => Promise<void>;
  updateArticle: (id: string, data: FormData) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  article: null,
  loading: false,
  error: null,

  // Initial state Anda
  page: 1,
  hasMore: true,
  isFetching: false,

  // Initial state Dev 1
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
      set({ error: err?.response?.data?.message || "Create article failed" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchArticles: async (params = {}) => {
    const { isFetching, hasMore, articles } = get();
    const targetPage = params.page || 1;

    // Cegah fetch jika sedang loading atau data habis (kecuali reset/page 1)
    if (isFetching || (!hasMore && targetPage !== 1)) return;

    try {
      set({ isFetching: true, loading: true, error: null });

      const res = await api.get("/articles", { params });
      const newData: Article[] = res.data.data || [];
      const apiPagination = res.data.pagination;

      set((state) => ({
        articles:
          targetPage === 1
            ? newData
            : [
                ...state.articles,
                ...newData.filter(
                  (newArt) =>
                    !state.articles.some(
                      (existing) => existing.id === newArt.id,
                    ),
                ),
              ],
        // Sync ke dua sistem pagination
        page: apiPagination?.currentPage || targetPage,
        hasMore: apiPagination?.hasNextPage || false,
        pagination: apiPagination || state.pagination,
        isFetching: false,
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Fetch articles failed",
        isFetching: false,
        loading: false,
      });
    }
  },

  fetchNextArticles: async () => {
    const { page, fetchArticles } = get();
    // Mengirim objek params agar sesuai dengan signature baru
    await fetchArticles({ page: page + 1 });
  },

  resetArticles: () => {
    set({
      articles: [],
      page: 1,
      hasMore: true,
      pagination: {
        totalArticles: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
      },
    });
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
