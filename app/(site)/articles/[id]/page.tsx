'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useArticleStore } from "@/app/store/useArticleStore"
import Loader from "@/components/Loader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Reply = {
  id: number
  name: string
  message: string
}

type Comment = {
  id: number
  name: string
  message: string
  replies: Reply[]
}

export default function ArticleDetailPage() {

  const router = useRouter()
  const { id } = useParams() as { id: string }

  const { article, fetchArticleById, loading } = useArticleStore()

  const [comment, setComment] = useState("")
  const [replyText, setReplyText] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const [reactions, setReactions] = useState({
    heart: 10,
    like: 6,
    wow: 2,
    laugh: 3,
    sad: 0
  })

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "Raka", message: "Artikelnya keren banget!", replies: [] },
    { id: 2, name: "Siska", message: "Insightful sekali.", replies: [] }
  ])

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (id) fetchArticleById(id)
  }, [id])

  if (loading || !article) return <Loader size="sm" fullScreen />

  const handleReaction = (type: keyof typeof reactions) => {

    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }))

  }

  const handleComment = () => {

    if (!comment.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      name: "You",
      message: comment,
      replies: []
    }

    setComments(prev => [newComment, ...prev])

    setComment("")

  }

  const handleReply = (commentId: number) => {

    if (!replyText.trim()) return

    setComments(prev =>
      prev.map(c => {

        if (c.id === commentId) {

          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Date.now(),
                name: "You",
                message: replyText
              }
            ]
          }

        }

        return c

      })
    )

    setReplyText("")
    setReplyingTo(null)

  }

  const loadMoreComments = () => {

    const newComments: Comment[] = [
      {
        id: Date.now(),
        name: "User " + (page + 3),
        message: "Komentar tambahan ke-" + page,
        replies: []
      },
      {
        id: Date.now() + 1,
        name: "User " + (page + 4),
        message: "Komentar tambahan ke-" + (page + 1),
        replies: []
      }
    ]

    setComments(prev => [...prev, ...newComments])
    setPage(prev => prev + 1)

  }

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative w-full h-[60vh] overflow-hidden">

        <Image
          src={article.image_url || "/placeholder.jpg"}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        <Button
          onClick={() => router.back()}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md text-gray-800 font-semibold shadow-lg hover:bg-white"
        >
          <ArrowLeft size={18} />
          Kembali
        </Button>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-10 text-white">

          <h1 className="text-4xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
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

      {/* CONTENT */}
      <div className="relative pb-20 px-6">
        <div className="max-w-4xl mx-auto px-2 md:px-6 py-8">
          <p className="text-xl md:text-xl text-justify text-slate-600 font-light italic leading-relaxed mb-10 border-l-4 border-blue-500 pl-6">
            {article.description.split("\n")[0]}
          </p>

          <div className="prose prose-lg max-w-none text-slate-800 whitespace-pre-line">
            {article.description}
          </div>



        </div>

        <div className="space-y-6 mx-auto max-w-4xl px-2 md:px-6">
          {/* REACTIONS */}
          <div className="mt-10 pt-6 border-t">

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
              Reaksi
            </h3>

            <div className="flex gap-2 flex-wrap">

              <button onClick={() => handleReaction("heart")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-red-50">❤️ {reactions.heart}</button>
              <button onClick={() => handleReaction("laugh")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-yellow-50">😂 {reactions.laugh}</button>
              <button onClick={() => handleReaction("like")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-blue-50">👍 {reactions.like}</button>
              <button onClick={() => handleReaction("wow")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-orange-50">😮 {reactions.wow}</button>
              <button onClick={() => handleReaction("sad")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-indigo-50">😢 {reactions.sad}</button>


            </div>

          </div>

          {/* COMMENTS */}
          <div className="mt-10 pt-6 border-t space-y-6">

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Komentar
            </h3>

            <div className="flex gap-3 w-full">

              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis komentar..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl"
              />

              <button
                onClick={handleComment}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl"
              >
                Kirim
              </button>

            </div>

            {comments.map(c => (

              <div key={c.id} className="space-y-2">

                <div className="flex gap-3">

                  <Avatar>
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="bg-gray-100 p-3 rounded-xl grow">

                    <p className="text-xs font-bold text-blue-600">{c.name}</p>

                    <p className="text-sm">{c.message}</p>

                    <button
                      onClick={() => setReplyingTo(c.id)}
                      className="text-xs text-blue-500 mt-1"
                    >
                      Balas
                    </button>

                  </div>

                </div>

                {c.replies.map(r => (

                  <div key={r.id} className="flex gap-3 ml-12">

                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{r.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="bg-gray-100 p-2 rounded-lg">

                      <p className="text-xs font-bold text-blue-600">{r.name}</p>

                      <p className="text-sm">{r.message}</p>

                    </div>

                  </div>

                ))}

                {replyingTo === c.id && (

                  <div className="flex gap-2 ml-12">

                    <input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-100 rounded-lg"
                      placeholder="Tulis balasan..."
                    />

                    <button
                      onClick={() => handleReply(c.id)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Kirim
                    </button>

                  </div>

                )}

              </div>

            ))}

            <div className="text-center">

              <button
                onClick={loadMoreComments}
                className="text-blue-600 font-semibold text-sm"
              >
                Muat komentar lainnya
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}