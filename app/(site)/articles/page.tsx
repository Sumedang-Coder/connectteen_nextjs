'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Clock, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useArticleStore, Article } from "@/app/store/useArticleStore"
import Loader from "@/components/Loader"

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

export default function ArticlesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const {
    articles,
    fetchArticles,
    fetchNextArticles,
    resetArticles,
    hasMore,
    isFetching,
  } = useArticleStore()

  useEffect(() => {
    resetArticles()
    fetchArticles({ page: 1, limit: 6, search: "" })
  }, [])

  if (isFetching && articles.length === 0) {
    return <Loader fullScreen size="sm" />
  }

  const handleSearch = async () => {
    resetArticles()
    await fetchArticles({ page: 1, limit: 6, search: searchQuery })
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">

      {/* ================= HERO ================= */}
      <section className="relative bg-linear-to-br from-cyan-500 to-blue-600 px-6 md:px-20 py-20 text-center overflow-hidden">
        <div className="max-w-3xl animate-fade-in mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Semua Artikel 📝
          </h1>

          <p className="text-white/90 text-lg mb-10">
            Eksplorasi wawasan terbaru untuk generasi muda Indonesia.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex animate-fade-in items-center bg-white rounded-2xl shadow-2xl p-2 focus-within:ring-4 ring-white/20 transition">
              <Search className="ml-4 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari artikel edukasi dan gaya hidup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 outline-none bg-transparent text-slate-900"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Cari
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl" />
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* Result Info */}
        <div className="flex items-center justify-between animate-fade-in mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            {searchQuery
              ? `Hasil Pencarian (${articles.length})`
              : `${articles.length} Artikel Tersedia`}
          </h2>
        </div>
        {/* EMPTY */}
        {articles.length === 0 ? (
          <div className="py-24 text-center animate-fade-in flex flex-col items-center">
            <div className="w-40 h-40 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Artikel tidak ditemukan
            </h3>
            <p className="text-slate-500">
              Coba kata kunci lain atau telusuri artikel terbaru.
            </p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-15 gap-8">
              {articles.map((article: Article) => (
                <div
                  key={article.id}
                  onClick={() => router.push(`/articles/${article.id}`)}
                  className="group bg-white animate-fade-in dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                >
                  <div className="h-2 bg-blue-600" />

                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image_url || "/placeholder.jpg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-blue-600 transition">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
                      {stripHtml(article.description || "")}
                    </p>

                    <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(article.created_at || "").toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>

                      <span className="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-16">
                <Button
                  onClick={fetchNextArticles}
                  disabled={isFetching}
                  className="px-8 py-3"
                >
                  {isFetching ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}

            {/* No More */}
            {!hasMore && (
              <p className="text-center text-slate-400 mt-12">
                Tidak ada artikel lagi
              </p>
            )}
          </>
        )}
      </section>
    </div>
  )
}