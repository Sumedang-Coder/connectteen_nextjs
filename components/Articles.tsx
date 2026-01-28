'use client'

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AspectRatio } from "./ui/aspect-ratio"
import { Button } from "./ui/button"
import { Clock, ArrowRight } from "lucide-react"
import { useArticleStore, Article } from "@/app/store/useArticleStore"
import { useEffect } from "react"
import Loader from "@/components/Loader"

export function Articles() {
  const router = useRouter()
  const { articles, fetchArticles, loading } = useArticleStore()

  useEffect(() => {
    fetchArticles({ limit: 3 })
  }, [])

  if (loading) {
    return <Loader size="md" fullScreen/>
  }

  return (
    <section className="py-14 px-6 bg-gray-50 relative overflow-hidden animate-fade-in">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center md:px-15 justify-between mb-12">
          <div>
            <h2 className="text-transparent text-3xl bg-clip-text bg-blue-500 drop-shadow-md">
              Artikel Terbaru
            </h2>
          </div>

          <Button
            variant="link"
            onClick={() => router.push("/articles")}
            className="gap-2 active:bg-purple-100 bg-transparent cursor-pointer text-blue-600"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 md:px-15 gap-6">
          {articles.map((article: Article) => (
            <Card
            onClick={() => router.push(`/articles/${article.id}`)}
              key={article.id}
              className="flex flex-col cursor-pointer overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-white shadow-md bg-white"
            >
              <div className="h-1 bg-linear-to-r from-blue-400 to-blue-600" />

              <AspectRatio ratio={16 / 9}>
                <img
                  src={article.image_url || "/placeholder.jpg"}
                  alt={article.title}
                  className="w-full h-full rounded-3xl px-2 object-cover"
                />
              </AspectRatio>

              <div className="flex-1 px-4 space-y-1">
                <h3 className="text-md font-semibold line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="mt-auto flex justify-between items-center px-4 pb-4">
                <Button
                  variant="link"
                  className="p-0 pointer-cursor gap-1 text-sm text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600"
                >
                  Baca selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <span className="text-xs text-muted-foreground flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" />
                  {new Date(article.created_at || "").toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
