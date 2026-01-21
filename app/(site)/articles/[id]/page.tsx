'use client'

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useArticleStore } from "@/app/store/useArticleStore"
import Loader from "@/components/Loader"

export default function ArticleDetailPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const { article, fetchArticleById, loading } = useArticleStore()


  useEffect(() => {
    if (id) fetchArticleById(id)
  }, [id])

  if (loading || !article) return <Loader size="sm" />

  return (
    <div className="min-h-screen bg-linear-to-br  from-cyan-100 via-blue-100 to-white">
      {/* HEADER */}
      <div className="relative w-full h-[50vh]">
        <Image
          src={article.image_url || "/placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover brightness-90"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-6 left-6 text-white z-10">

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(article.created_at || "").toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>


        <Button
          onClick={() => router.back()}
          className="absolute top-6 left-6 group inline-flex items-center mb-4 gap-2 rounded-full bg-white/70 backdrop-blur px-5 py-2.5 text-gray-800 font-medium shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl active:scale-95"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-500 text-white transition-transform group-hover:-translate-x-1">
            <ArrowLeft size={16} />
          </span>
          <span>Kembali</span>
        </Button>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-12 text-justify prose prose-lg prose-slate dark:prose-invert">
        {article.description.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

    </div>
  )
}
