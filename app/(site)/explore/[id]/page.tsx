'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMessageStore } from "@/app/store/useMessageStore";
import Loader from "@/components/Loader";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  const router = useRouter();

  const { selectedMessage, fetchMessageById } = useMessageStore();

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [comment, setComment] = useState("");

  const [reactions, setReactions] = useState({
    heart: 12,
    laugh: 4,
    like: 8,
    wow: 2,
    sad: 0
  });

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "Raka", message: "Pesannya bagus banget!", replies: [] },
    { id: 2, name: "Siska", message: "Aku juga suka lagu ini.", replies: [] },
    { id: 3, name: "Andi", message: "Bikin nostalgia.", replies: [] }
  ]);

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

  const handleReaction = (type: keyof typeof reactions) => {

    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

  };

  const handleComment = () => {

    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: "You",
      message: comment,
      replies: []
    };

    setComments(prev => [newComment, ...prev]);
    setComment("");

  };

  const handleReply = (commentId: number) => {

    if (!replyText.trim()) return;

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
          };

        }

        return c;

      })
    );

    setReplyText("");
    setReplyingTo(null);

  };

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
    ];

    setComments(prev => [...prev, ...newComments]);
    setPage(prev => prev + 1);

  };

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
                <h2 className="text-xl font-semibold">
                  {selectedMessage.recipient_name}
                </h2>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pt-6 pb-8 space-y-8">

            {selectedMessage.song_id && (
              <iframe
                src={`https://open.spotify.com/embed/track/${selectedMessage.song_id}`}
                className="w-full h-40"
                allow="encrypted-media"
                loading="lazy"
              />
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

              <button onClick={() => handleReaction("heart")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-red-50">❤️ {reactions.heart}</button>
              <button onClick={() => handleReaction("laugh")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-yellow-50">😂 {reactions.laugh}</button>
              <button onClick={() => handleReaction("like")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-blue-50">👍 {reactions.like}</button>
              <button onClick={() => handleReaction("wow")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-orange-50">😮 {reactions.wow}</button>
              <button onClick={() => handleReaction("sad")} className="px-3 py-1.5 bg-white border rounded-full text-sm shadow hover:bg-indigo-50">😢 {reactions.sad}</button>

            </div>

          </div>

          {/* COMMENT SECTION */}
          <div className="space-y-4 pt-4 border-t">

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Komentar
            </h3>

            <div className="flex gap-3">

              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis komentar..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={handleComment}
                className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow"
              >
                Kirim
              </button>

            </div>

            <div className="space-y-3">

              {comments.map((c) => (
                <div key={c.id} className="space-y-2">

                  <div className="flex gap-3">

                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none grow">

                      <p className="text-xs font-bold text-blue-600 mb-1">{c.name}</p>

                      <p className="text-sm text-gray-700">{c.message}</p>

                      <button
                        onClick={() => setReplyingTo(c.id)}
                        className="text-xs text-blue-500 mt-1 hover:underline"
                      >
                        Balas
                      </button>

                    </div>

                  </div>

                  {c.replies.map((r) => (
                    <div key={r.id} className="flex gap-3 ml-12">

                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{r.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="bg-gray-100 p-2 rounded-xl grow">

                        <p className="text-xs font-bold text-blue-600">{r.name}</p>

                        <p className="text-sm text-gray-700">{r.message}</p>

                      </div>

                    </div>
                  ))}

                  {replyingTo === c.id && (

                    <div className="flex gap-2 ml-12 pt-2">

                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Tulis balasan..."
                        className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm"
                      />

                      <button
                        onClick={() => handleReply(c.id)}
                        className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg"
                      >
                        Kirim
                      </button>

                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-3 py-2 text-sm bg-gray-300 rounded-lg"
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center pt-2">

              <button
                onClick={loadMoreComments}
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Muat komentar lainnya
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}