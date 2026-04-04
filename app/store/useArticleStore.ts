import { create } from "zustand";
import api from "@/lib/axios";
import { toast } from "sonner";

export interface Article {
  id: string;
  title: string;
  description: string;
  image_url: string;
  subtitle?: string;
  polls?: {
    _id: string;
    question: string;
    options: {
      _id: string;
      text: string;
      votes: number;
    }[];
    voters: string[];
  }[];
  created_at?: string;
  updated_at?: string;
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

interface ArticleState {
  articles: Article[];
  article: Article | null;

  // State untuk Infinite Scroll
  page: number;
  hasMore: boolean;
  isFetching: boolean;

  // State Umum & Pagination
  loading: boolean;
  error: string | null;
  pagination: {
    totalArticles: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  
  // Interactions & Sync
  reactionSequence: number;
  reactionTimeout: any;
  reactingIds: Set<string>;

  createArticle: (formData: FormData) => Promise<boolean>;
  fetchArticles: (params?: {
    limit?: number;
    search?: string;
    page?: number;
    sort?: string;
    append?: boolean;
  }) => Promise<void>;
  fetchNextArticles: () => Promise<void>;
  resetArticles: () => void;

  fetchArticleById: (id: string) => Promise<void>;
  updateArticle: (id: string, data: FormData) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;

  // Reactions & Comments
  fetchComments: (articleId: string) => Promise<void>;
  reactToArticle: (id: string, type: string) => Promise<void>;
  addComment: (articleId: string, name: string, message: string) => Promise<void>;
  deleteComment: (articleId: string, commentId: string) => Promise<void>;
  addReply: (commentId: string, name: string, message: string) => Promise<void>;
  deleteReply: (articleId: string, commentId: string, replyId: string) => Promise<void>;
  votePoll: (articleId: string, pollId: string, optionId: string) => Promise<void>;
  resetStore: () => void;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  article: null,
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  isFetching: false,
  reactionSequence: 0,
  reactionTimeout: null,
  reactingIds: new Set(),
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
          params.append
            ? [
                ...state.articles,
                ...newData.filter(
                  (newArt) =>
                    !state.articles.some(
                      (existing) => existing.id === newArt.id,
                    ),
                ),
              ]
            : newData,
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
    await fetchArticles({ page: page + 1, append: true });
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

  fetchComments: async (articleId: string) => {
    try {
      const res = await api.get(`/articles/${articleId}/comments`);
      if (res.data.success) {
        const comments = res.data.data;
        set((state) => ({
          article: state.article && state.article.id === articleId 
            ? { ...state.article, comments }
            : state.article
        }));
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  },

  reactToArticle: async (id, type) => {
    // 1. Prevent concurrent requests for the same ID
    if (get().reactingIds.has(id)) return;

    // 2. Determine Intent (Toggle-off vs Set)
    const currentItem = get().articles.find(a => a.id === id) || (get().article?.id === id ? get().article : null);
    const nextUserReaction = currentItem?.userReaction === type ? null : type;

    // 3. Update State: Entering "Reacting" Mode
    set((state) => {
      const nextIds = new Set(state.reactingIds);
      nextIds.add(id);
      return { reactingIds: nextIds, error: null };
    });

    const sequence = get().reactionSequence + 1;
    set({ reactionSequence: sequence });

    try {
      // 4. IMMEDIATE Server Request (No Debounce for Non-Optimistic Mode)
      const res = await api.post(`/articles/${id}/react`, { type: nextUserReaction });
      if (!res.data.success) throw new Error("Sync failed");

      // 5. Update State: Apply Verified Server Ground Truth
      if (get().reactionSequence === sequence) {
        set((state) => {
          const syncData = (item: any) => {
            if (!item || item.id !== id) return item;
            return { 
              ...item, 
              reactions: res.data.data.allReactions, 
              userReaction: res.data.data.userReaction 
            };
          };

          return {
            article: syncData(state.article),
            articles: state.articles.map(syncData)
          };
        });
      }
    } catch (err: any) {
      console.error("Article reaction failed:", err);
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

  addComment: async (articleId, name, message) => {
    try {
      const res = await api.post(`/articles/${articleId}/comments`, { name, message });
      if (res.data.success) {
        get().fetchComments(articleId);
      }
    } catch (err) {
      console.error("Comment failed:", err);
    }
  },

  addReply: async (commentId, name, message) => {
    try {
      const res = await api.post(`/comments/${commentId}/reply`, { name, message });
      if (res.data.success) {
        const article = get().article;
        if (article) get().fetchComments(article.id);
      }
    } catch (err) {
      console.error("Reply failed:", err);
    }
  },

  deleteComment: async (articleId: string, commentId: string) => {
    try {
      const res = await api.delete(`/comments/${commentId}`);
      if (res.data.success) {
        set((state) => ({
          article: state.article && state.article.id === articleId 
            ? { ...state.article, comments: state.article.comments?.filter((c: any) => c._id !== commentId) }
            : state.article
        }));
      }
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  },

  deleteReply: async (articleId: string, commentId: string, replyId: string) => {
    try {
      const res = await api.delete(`/comments/${commentId}/reply/${replyId}`);
      if (res.data.success) {
        set((state) => {
          if (!state.article || state.article.id !== articleId) return state;
          
          const newComments = state.article.comments?.map((c: any) => {
            if (c._id === commentId) {
              return { ...c, replies: c.replies.filter((r: any) => r._id !== replyId) };
            }
            return c;
          });

          return {
            article: { ...state.article, comments: newComments }
          };
        });
      }
    } catch (err) {
      console.error("Failed to delete reply:", err);
    }
  },

  votePoll: async (articleId, pollId, optionId) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post(`/articles/${articleId}/polls/${pollId}/vote`, { optionId });
      if (res.data.success) {
        const updatedPoll = res.data.data;
        set((state) => {
          if (!state.article || state.article.id !== articleId) return state;
          const updatedPolls = state.article.polls?.map((p: any) => 
            p._id === pollId ? updatedPoll : p
          );
          return {
            article: { ...state.article, polls: updatedPolls }
          };
        });
        toast.success("Vote berhasil!");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Gagal melakukan vote";
      set({ error: msg });
      toast.error(msg);
    } finally {
      set({ loading: false });
    }
  },

  resetStore: () => {
    set({
      articles: [],
      article: null,
      page: 1,
      hasMore: true,
      isFetching: false,
      loading: false,
      error: null,
      pagination: {
        totalArticles: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
      },
    });
  },
}));
