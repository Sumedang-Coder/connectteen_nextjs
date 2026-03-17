'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMessageStore } from "@/app/store/useMessageStore";
import Loader from "@/components/Loader";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import MusicPlayerCard from "@/components/MusicPlayerCard";
import { ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Lock } from "lucide-react";

type Reply = {
  id: number;
  name: string;
  message: string;
};

type Comment = {
  id: number;
  name: string;
  message: string;
  replies: Reply[];
};

export default function MessageDetailPage() {

  const { id } = useParams();
  const { selectedMessage, fetchMessageById, reactToMessage, addComment, addReply } = useMessageStore();

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyLoadingId, setReplyLoadingId] = useState<string | null>(null);
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const reactions = selectedMessage?.reactions || {
    heart: 0,
    laugh: 0,
    like: 0,
    wow: 0,
    sad: 0
  };

  const comments = selectedMessage?.comments || [];

  const [page, setPage] = useState(1);

  useEffect(() => {

    if (id) fetchMessageById(id as string);

    return () => {
      useMessageStore.setState({ selectedMessage: null })
    }

  }, [id, fetchMessageById]);

  if (!selectedMessage) {
    return <Loader size="sm" fullScreen />
  }

  const avatarLetter = selectedMessage.recipient_name?.charAt(0).toUpperCase() || "?";

  const handleReaction = (type: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (selectedMessage) {
      reactToMessage(selectedMessage.id, type);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentInput.trim() || !selectedMessage || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addComment(selectedMessage.id, "User " + Math.floor(Math.random() * 1000), commentInput);
      setCommentInput("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    if (!replyText.trim() || replyLoadingId) return;

    setReplyLoadingId(commentId);
    try {
      await addReply(commentId, "User " + Math.floor(Math.random() * 1000), replyText);
      setReplyText("");
      setReplyingTo(null);
      // Auto expand when replying
      setExpandedComments(prev => new Set(prev).add(commentId));
    } finally {
      setReplyLoadingId(null);
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  // Removed loadMoreComments as it's not implemented on backend yet for simplicity

  return (
    <div className="min-h-screen bg-linear-to-br px-6 py-12">

      <div className="max-w-3xl mx-auto space-y-10">

        <Button
          onClick={() => router.back()}
          className="group inline-flex text-black items-center gap-2 rounded-full bg-white/20 backdrop-blur px-5 py-2.5 font-medium shadow-lg hover:bg-white/30"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali
        </Button>

        {/* MESSAGE CARD */}
        <Card className="overflow-hidden rounded-3xl border border-white/40 shadow-2xl bg-white/90 backdrop-blur">

          <CardHeader className="bg-linear-to-r p-4 from-cyan-500 to-blue-500 text-white">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                <AvatarFallback className="bg-white text-blue-600 font-bold">
                  {avatarLetter}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm opacity-80">Untuk</p>
                <h2 className="text-xl font-semibold leading-tight">
                  {selectedMessage.recipient_name}
                </h2>
                <p className="text-xs mt-1 font-medium opacity-90 italic">
                  Dari: {selectedMessage.sender_name || "Unknown"}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pt-6 pb-8 space-y-8">

            {/* Music Player */}
            {selectedMessage.song_id && (
              <div className="space-y-4">
                {/* Spotify Iframe (Legacy or if song_id is non-numeric/Spotify format) */}
                {isNaN(Number(selectedMessage.song_id)) ? (
                  <iframe
                    src={`https://open.spotify.com/embed/track/${selectedMessage.song_id}`}
                    className="w-full h-40 rounded-2xl"
                    allow="encrypted-media"
                    loading="lazy"
                  />
                ) : (
                  /* iTunes Player */
                  <MusicPlayerCard song={selectedMessage} />
                )}
              </div>
            )}

            <div className="relative md:max-w-2xl mx-auto">
              <span className="absolute -left-2 top-0 h-full w-1 rounded-full bg-linear-to-b from-cyan-400 to-blue-500" />
              <div className="pl-4 text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                {selectedMessage.message}
              </div>

            </div>

            <div className="pt-4 border-t text-xs text-gray-500 text-right">
              Dikirim pada {new Date(selectedMessage.created_at!).toLocaleString("id-ID")}
            </div>

          </CardContent>

        </Card>
      </div>
      <div className="space-y-6 mx-auto mt-20 max-w-4xl px-2 md:px-6">
        <hr />
        {/* REACTION SECTION */}
        <div className="space-y-3">

          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Reaksi
          </h3>

          <div className="flex flex-wrap gap-2">

            <button onClick={() => handleReaction("heart")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${selectedMessage.userReaction === "heart" ? "bg-red-100 border-red-500 scale-105" : "bg-white hover:bg-red-50"}`}>❤️ {reactions.heart}</button>
            <button onClick={() => handleReaction("laugh")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${selectedMessage.userReaction === "laugh" ? "bg-yellow-100 border-yellow-500 scale-105" : "bg-white hover:bg-yellow-50"}`}>😂 {reactions.laugh}</button>
            <button onClick={() => handleReaction("like")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${selectedMessage.userReaction === "like" ? "bg-blue-100 border-blue-500 scale-105" : "bg-white hover:bg-blue-50"}`}>👍 {reactions.like}</button>
            <button onClick={() => handleReaction("wow")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${selectedMessage.userReaction === "wow" ? "bg-orange-100 border-orange-500 scale-105" : "bg-white hover:bg-orange-50"}`}>😮 {reactions.wow}</button>
            <button onClick={() => handleReaction("sad")} className={`px-3 py-1.5 border rounded-full text-sm shadow transition ${selectedMessage.userReaction === "sad" ? "bg-indigo-100 border-indigo-500 scale-105" : "bg-white hover:bg-indigo-50"}`}>😢 {reactions.sad}</button>

          </div>

        </div>

        {/* COMMENT SECTION */}
        <div className="space-y-4 pt-4 border-t">

          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Komentar
          </h3>

          <div className="flex gap-3">

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

          <div className="space-y-3">
            {comments.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-6">
                Belum ada komentar
              </p>
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

                    <div className="bg-gray-100 p-2 rounded-xl grow">

                      <p className="text-xs font-bold text-blue-600">{r.name}</p>

                      <p className="text-sm text-gray-700">{r.message}</p>

                    </div>

                  </div>
                ))}

                {replyingTo === c._id && (

                  <div className="flex gap-2 ml-12 pt-2 animate-in zoom-in-95 duration-200">

                    <input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Tulis balasan..."
                      className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                      autoFocus
                    />

                    <button
                      onClick={() => handleReplySubmit(c._id)}
                      disabled={replyLoadingId === c._id}
                      className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
                    >
                      {replyLoadingId === c._id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Kirim"}
                    </button>

                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {showLoginModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl p-8 text-center">

                {/* Icon */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Kamu belum Login
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Kalo mau kasih reaksi Login dulu yaa
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl"
                    onClick={() => setShowLoginModal(false)}
                  >
                    Tutup
                  </Button>

                  <Button
                    className="flex-1 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => router.push("/signin")}
                  >
                    Sign In
                  </Button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}