'use client';

import { useEffect, useState } from "react";
import { MessageCircle, Music } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useMessageStore } from "@/app/store/useMessageStore";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import Link from "next/link";

export function RecentPosts() {
  const [loading, setLoading] = useState(true);
  const messages = useMessageStore((s) => s.messages);
  const fetchMessages = useMessageStore((s) => s.fetchMessages);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchMessages();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchMessages]);

  if (loading) {
    return <Loader size="md" fullScreen />;
  }

  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <section className="relative px-6 pt-10 pb-16 bg-slate-50 animate-fade-in">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-transparent text-3xl bg-clip-text bg-blue-500 drop-shadow-md">
            Pesan Terbaru
          </h2>
          <p className="text-md text-slate-800 font-semibold drop-shadow-md">
            Ayo lihat apa yang temanmu bagikan!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 md:px-15 gap-6">
          {messages.map((msg: any) => {
            const avatarLetter = msg.recipient_name?.[0] || "?";

            return (
              <Link key={msg.id} href={`/explore/${msg.id}`} className="block h-full">
                <Card className="h-full flex flex-col bg-white rounded-3xl p-1 shadow-lg border-[6px] border-white hover:-translate-y-2 transition">
                  <CardContent className="flex flex-col flex-1 min-h-[260px] rounded-2xl p-6 space-y-6">

                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-cyan-500">
                        <AvatarFallback className="bg-linear-to-br from-cyan-500 to-blue-500 text-white">
                          {msg.recipient_name?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-bold text-gray-900">
                          To: {msg.recipient_name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Shared Message
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {msg.message || "–"}
                    </p>

                    {/* Song */}
                    {msg.song_id ? (
                      <div className="mt-auto bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 flex items-center gap-4 shadow-md">
                        {msg.song_image ? (
                          <img
                            src={msg.song_image}
                            alt={msg.song_name || "Song"}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-white p-1"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                            <Music className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold truncate">
                            {msg.song_name || "Unknown Song"}
                          </p>
                          <p className="text-white/80 text-xs truncate">
                            {msg.song_artist || "Unknown Artist"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto bg-slate-100/80 border border-slate-200 rounded-2xl p-4 flex items-center justify-center gap-2">
                        <Music className="w-4 h-4 text-slate-400" />
                        <p className="text-slate-500 text-[10px] font-medium italic">
                          Pengirim tidak menambahkan musik
                        </p>
                      </div>
                    )}

                  </CardContent>
                </Card></Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}