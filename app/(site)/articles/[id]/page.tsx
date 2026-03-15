'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Clock, Loader2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useArticleStore } from "@/app/store/useArticleStore"
import Loader from "@/components/Loader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

  const { article, fetchArticleById, loading, error, reactToArticle, fetchComments, addComment, addReply } = useArticleStore()

  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [commentInput, setCommentInput] = useState("")
  
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyLoadingId, setReplyLoadingId] = useState<string | null>(null)

  const reactions = article?.reactions || {
    heart: 0,
    laugh: 0,
    like: 0,
    wow: 0,
    sad: 0
  }

  const comments = article?.comments || []


  useEffect(() => {
    if (id) {
      fetchArticleById(id).then(() => {
        fetchComments(id)
      })
    }
  }, [id])

  if (loading || !article) return <Loader size="sm" fullScreen />

  const handleReaction = (type: string) => {
    if (article) {
      reactToArticle(article.id, type)
    }
  }

  const handleCommentSubmit = async () => {
    if (!commentInput.trim() || !article || isSubmitting) return

    setIsSubmitting(true)
    try {
      await addComment(article.id, "", commentInput)
      setCommentInput("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReplySubmit = async (commentId: string) => {
    if (!replyText.trim() || replyLoadingId) return

    setReplyLoadingId(commentId)
    try {
      await addReply(commentId, "", replyText)
      setReplyText("")
      setReplyingTo(null)
      setExpandedComments(prev => new Set(prev).add(commentId))
    } finally {
      setReplyLoadingId(null)
    }
  }

  const toggleReplies = (commentId: string) => {
    setExpandedComments(prev => {
      const next = new Set(prev)
      if (next.has(commentId)) next.delete(commentId)
      else next.add(commentId)
      return next
    })
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

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <span>⚠️</span> {error}
              </div>
            )}
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
              Reaksi
            </h3>

            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => handleReaction("heart")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition font-medium ${article.userReaction === 'heart' ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-white hover:bg-red-50'}`}
              >
                ❤️ <span className="text-sm">{reactions.heart}</span>
              </button>
              <button 
                onClick={() => handleReaction("laugh")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition font-medium ${article.userReaction === 'laugh' ? 'bg-yellow-50 border-yellow-200 text-yellow-600 shadow-sm' : 'bg-white hover:bg-yellow-50'}`}
              >
                😂 <span className="text-sm">{reactions.laugh}</span>
              </button>
              <button 
                onClick={() => handleReaction("like")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition font-medium ${article.userReaction === 'like' ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'bg-white hover:bg-blue-50'}`}
              >
                👍 <span className="text-sm">{reactions.like}</span>
              </button>
              <button 
                onClick={() => handleReaction("wow")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition font-medium ${article.userReaction === 'wow' ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' : 'bg-white hover:bg-orange-50'}`}
              >
                😮 <span className="text-sm">{reactions.wow}</span>
              </button>
              <button 
                onClick={() => handleReaction("sad")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition font-medium ${article.userReaction === 'sad' ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' : 'bg-white hover:bg-indigo-50'}`}
              >
                😢 <span className="text-sm">{reactions.sad}</span>
              </button>
            </div>

          </div>

          {/* COMMENTS */}
          <div className="mt-10 pt-6 border-t space-y-6">

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Komentar
            </h3>

            <div className="flex gap-3 w-full">

              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Tulis komentar..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Kirim"}
              </button>

            </div>

            {comments.map((c: any) => (

              <div key={c._id} className="space-y-2">

                <div className="flex gap-3">

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={c.avatarUrl} alt={c.name} />
                    <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none grow relative">

                    <p className="text-xs font-bold text-blue-600 mb-1">{c.name}</p>

                    <p className="text-sm text-gray-700">{c.message}</p>

                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => setReplyingTo(c._id)}
                        className="text-xs font-medium text-gray-500 hover:text-blue-600 transition"
                      >
                        Balas
                      </button>
                      
                      {c.replies && c.replies.length > 0 && (
                        <button
                          onClick={() => toggleReplies(c._id)}
                          className="text-xs font-medium text-blue-600 flex items-center gap-1 hover:underline"
                        >
                          <MessageCircle className="h-3 w-3" />
                          {expandedComments.has(c._id) ? "Sembunyikan balasan" : `Lihat ${c.replies.length} balasan`}
                        </button>
                      )}
                    </div>

                  </div>

                </div>

                {expandedComments.has(c._id) && c.replies && c.replies.map((r: any) => (

                  <div key={r._id} className="flex gap-3 ml-12 animate-in slide-in-from-top-2 duration-300">

                    <Avatar className="h-8 w-8">
                      <AvatarImage src={r.avatarUrl} alt={r.name} />
                      <AvatarFallback>{r.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="bg-gray-100 p-2 rounded-2xl rounded-tl-none grow border border-white">

                      <p className="text-xs font-bold text-blue-600 mb-0.5">{r.name}</p>

                      <p className="text-sm text-gray-700">{r.message}</p>

                    </div>

                  </div>

                ))}

                {replyingTo === c._id && (

                  <div className="flex gap-2 ml-12 items-center animate-in zoom-in-95 duration-200">

                    <input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                      placeholder="Tulis balasan..."
                      autoFocus
                    />

                    <button
                      onClick={() => handleReplySubmit(c._id)}
                      disabled={!!replyLoadingId}
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold shadow hover:bg-blue-600 disabled:opacity-50"
                    >
                      {replyLoadingId === c._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Kirim"}
                    </button>

                    <button
                      onClick={() => {
                        setReplyingTo(null)
                        setReplyText("")
                      }}
                      className="text-xs text-gray-500 hover:text-red-500"
                    >
                      Batal
                    </button>

                  </div>

                )}

              </div>

            ))}


          </div>
        </div>
      </div>
    </div>
  )
}