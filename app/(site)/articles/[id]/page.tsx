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
    <div className="min-h-screen bg-slate-50">

      {/* HERO SECTION */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={article.image_url || "/placeholder.jpg"}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          className="absolute top-8 left-8 z-20 group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md text-gray-800 font-semibold shadow-lg hover:bg-white transition-all"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali
        </Button>

        {/* Title Overlay */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-200">
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {new Date(article.created_at || "").toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative pb-16 -mt-16 px-6">
        <div className="max-w-4xl mx-auto b-20 bg-white rounded-2xl shadow-2xl p-8 md:p-14 border border-slate-100">

          {/* Lead / Highlight Opening */}
          <p className="text-xl md:text-2xl text-slate-600 font-light italic leading-relaxed mb-10 border-l-4 border-blue-500 pl-6">
            {article.description.split("\n")[0]}
          </p>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-slate-800">
            {article.description.split("\n").slice(1).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}
