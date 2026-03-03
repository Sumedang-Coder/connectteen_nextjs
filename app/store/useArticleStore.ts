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

  page: number;
  hasMore: boolean;
  isFetching: boolean;

  loading: boolean;
  error: string | null;

  createArticle: (formData: FormData) => Promise<boolean>;
  fetchArticles: (page?: number, limit?: number, search?: string) => Promise<void>;
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

  page: 1,
  hasMore: true,
  isFetching: false,

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

 fetchArticles: async (page = 1, limit = 6, search = "") => {
  const { isFetching, hasMore } = get();
  if (isFetching || !hasMore) return;

  try {
    set({ isFetching: true, error: null });

    const res = await api.get("/articles", {
      params: { page, limit, search },
    });

    const newData: Article[] = res.data.data || [];
    const pagination = res.data.pagination;

    set((state) => ({
      articles:
        page === 1
          ? newData
          : [
              ...state.articles,
              ...newData.filter(
                (newArticle) =>
                  !state.articles.some(
                    (existing) => existing.id === newArticle.id
                  )
              ),
            ],
      page: pagination.currentPage,
      hasMore: pagination.hasNextPage,
      isFetching: false,
    }));
  } catch (err: any) {
    set({
      error: err?.response?.data?.message || "Fetch articles failed",
      isFetching: false,
    });
  }
},

fetchNextArticles: async () => {
  const { page, fetchArticles } = get();
  await fetchArticles(page + 1);
},

resetArticles: () => {
  set({
    articles: [],
    page: 1,
    hasMore: true,
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
