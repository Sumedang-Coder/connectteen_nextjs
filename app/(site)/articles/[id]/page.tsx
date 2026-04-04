'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Clock, Loader2, MessageCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useArticleStore } from "@/app/store/useArticleStore"
import { useAuthStore } from "@/app/store/useAuthStore"
import Loader from "@/components/Loader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock as LockIcon } from "lucide-react"
import NotFound from "@/components/NotFound"

export default function ArticleDetailPage() {

  const router = useRouter()
  const { id } = useParams() as { id: string }

  const { article, fetchArticleById, loading, error, reactToArticle, fetchComments, addComment, addReply, deleteComment, deleteReply, votePoll } = useArticleStore()
  const { user } = useAuthStore()
  const userId = user?.id || user?._id;
  const isAuthenticated = useAuthStore((s: any) => s.isAuthenticated)
  const isAdmin = user && ["super_admin", "content_editor"].includes(user.role)

  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [commentInput, setCommentInput] = useState("")

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyLoadingId, setReplyLoadingId] = useState<string | null>(null)

  type ReactionType = {
    heart: number;
    laugh: number;
    like: number;
    wow: number;
    sad: number;
  };

  const defaultReactions: ReactionType = {
    heart: 0,
    laugh: 0,
    like: 0,
    wow: 0,
    sad: 0
  };

  const [localReactions, setLocalReactions] = useState(defaultReactions);
  const [localUserReaction, setLocalUserReaction] = useState<string | null>(null);


  const comments = article?.comments || []


  useEffect(() => {
    if (id) {
      fetchArticleById(id).then(() => {
        fetchComments(id)
      })
    }
  }, [id, isAuthenticated])

  if (loading) return <Loader size="sm" fullScreen />

  if (!article) {
    return (
      <NotFound
        title="Artikel Tidak Ditemukan"
        message="Duh, sepertinya artikel yang kamu cari tidak ada atau sudah dihapus oleh penulisnya."
        backLink="/articles"
        backText="Lihat Artikel Lain"
      />
    )
  }

  const handleReaction = async (type: keyof ReactionType) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!article) return;

    const prevReaction = localUserReaction;
    const prevReactionsState = { ...localReactions };

    setLocalReactions((prev) => {
      const updated = { ...prev };

      if (prevReaction) {
        updated[prevReaction as keyof ReactionType] -= 1;
      }

      if (prevReaction === type) {
        setLocalUserReaction(null);
        return updated;
      }

      updated[type] += 1;
      setLocalUserReaction(type);

      return updated;
    });

    try {
      await reactToArticle(article.id, type);
    } catch (err) {
      setLocalReactions(prevReactionsState);
      setLocalUserReaction(prevReaction);
    }
  };

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
    <div className="min-h-screen bg-white overflow-x-hidden">

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

          {article.subtitle && (
            <p className="text-xl md:text-2xl font-medium text-gray-200 mt-2 line-clamp-2 drop-shadow-md">
              {article.subtitle}
            </p>
          )}

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
        <div className="pointer-events-none select-none">

          {/* Necta - Top Left */}
          <div className="absolute left-0 top-10 hidden lg:block">
            <Image
              src="/img/necta.png"
              alt=""
              width={260}
              height={260}
              className="translate-x-[-20%]"
            />
          </div>

          {/* Coco - Bottom Right */}
          <div className="absolute right-0 bottom-10 hidden lg:block">
            <Image
              src="/img/coco.png"
              alt=""
              width={260}
              height={260}
              className="translate-x-[20%]"
            />
          </div>

        </div>
        <div className="max-w-4xl mx-auto px-2 md:px-6 py-8">
          <div
            className="prose prose-lg max-w-none text-slate-800"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />

          {/* POLLS DISPLAY */}
          {article.polls && article.polls.length > 0 && (
            <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full" />
                Polling Artikel
              </h3>
              
              <div className="flex flex-col gap-8">
                {article.polls.map((poll) => {
                  const hasVoted = userId && poll.voters.includes(String(userId));
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

                  return (
                    <div key={poll._id} className="flex flex-col gap-4">
                      <h4 className="text-lg font-bold text-slate-800">{poll.question}</h4>
                      
                      <div className="flex flex-col gap-3">
                        {poll.options.map((option) => {
                          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                          
                          return (
                            <button
                              key={option._id}
                              disabled={!isAuthenticated || hasVoted}
                              onClick={() => votePoll(article.id, poll._id, option._id)}
                              className={`relative w-full text-left p-4 rounded-2xl border-2 transition-all overflow-hidden group
                                ${hasVoted 
                                  ? 'border-slate-200 cursor-default' 
                                  : 'border-slate-200 hover:border-blue-600 active:scale-[0.98]'
                                }
                              `}
                            >
                              {/* Progress bar background */}
                              {hasVoted && (
                                <div 
                                  className="absolute inset-0 bg-blue-50 transition-all duration-1000"
                                  style={{ width: `${percentage}%` }}
                                />
                              )}
                              
                              <div className="relative flex items-center justify-between z-10">
                                <span className={`font-bold transition-colors ${hasVoted ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-600'}`}>
                                  {option.text}
                                </span>
                                {hasVoted && (
                                  <span className="text-sm font-black text-blue-600">
                                    {percentage}% ({option.votes})
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      
                      {!isAuthenticated && (
                        <p className="text-xs text-slate-400 italic">Harap login untuk memberikan suara pada polling ini.</p>
                      )}
                      {hasVoted && (
                        <p className="text-xs text-blue-600 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          Terima kasih atas suara Anda!
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
              <button onClick={() => handleReaction("heart")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${localUserReaction === "heart" ? "bg-red-100 border-red-500 scale-105" : "bg-white hover:bg-red-50"}`}>❤️ {localReactions.heart}</button>
              <button onClick={() => handleReaction("laugh")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${localUserReaction === "laugh" ? "bg-yellow-100 border-yellow-500 scale-105" : "bg-white hover:bg-yellow-50"}`}>😂 {localReactions.laugh}</button>
              <button onClick={() => handleReaction("like")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${localUserReaction === "like" ? "bg-blue-100 border-blue-500 scale-105" : "bg-white hover:bg-blue-50"}`}>👍 {localReactions.like}</button>
              <button onClick={() => handleReaction("wow")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${localUserReaction === "wow" ? "bg-orange-100 border-orange-500 scale-105" : "bg-white hover:bg-orange-50"}`}>😮 {localReactions.wow}</button>
              <button onClick={() => handleReaction("sad")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${localUserReaction === "sad" ? "bg-indigo-100 border-indigo-500 scale-105" : "bg-white hover:bg-indigo-50"}`}>😢 {localReactions.sad}</button>
            </div>

          </div>

          {/* COMMENTS */}
          <div className="mt-10 pt-6 border-t space-y-6">

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Komentar
            </h3>

            {isAuthenticated ? (
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
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 text-center space-y-3 w-full">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <LockIcon size={20} />
                </div>
                <p className="text-sm text-gray-500">Silakan login untuk memberikan komentar</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`)}
                >
                  Sign In Sekarang
                </Button>
              </div>
            )}

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
                      {isAuthenticated && (
                        <button
                          onClick={() => setReplyingTo(c._id)}
                          className="text-xs font-medium text-gray-500 hover:text-blue-600 transition"
                        >
                          Balas
                        </button>
                      )}

                      {isAuthenticated && (isAdmin || (user?.id && String(user.id) === String(c.userId)) || (user?._id && String(user._id) === String(c.userId))) && (
                        <button
                          onClick={async () => {
                            if (article && confirm("Hapus komentar ini?")) {
                              await deleteComment(article.id, c._id);
                            }
                          }}
                          className="text-xs font-medium text-red-500 hover:text-red-600 transition flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" /> Hapus
                        </button>
                      )}

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
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-bold text-blue-600">{r.name}</p>
                        {isAuthenticated && (isAdmin || (user?.id && String(user.id) === String(r.userId)) || (user?._id && String(user._id) === String(r.userId))) && (
                          <button
                            onClick={async () => {
                              if (article && confirm("Hapus balasan ini?")) {
                                await deleteReply(article.id, c._id, r._id);
                              }
                            }}
                            className="text-gray-400 hover:text-red-500 transition"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
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
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100">
              <LockIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Kamu belum Login</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">Kalo mau kasih reaksi Login dulu yaa</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowLoginModal(false)}>Tutup</Button>
              <Button className="flex-1 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white" onClick={() => router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`)}>Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}