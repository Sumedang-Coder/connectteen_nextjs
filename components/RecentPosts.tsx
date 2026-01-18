'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useMessageStore } from "@/app/store/useMessageStore";
import { useRouter } from "next/navigation";

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
    return (
      <div className="py-12 text-center text-gray-500">
        Loading messages...
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Belum ada pesan terbaru.
      </p>
    );
  }

  return (
    <section className="relative px-6 pt-10 pb-16 bg-linear-to-b from-white/20 to-white animate-fade-in">
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
              <Card
                key={msg.id}
                onClick={() => router.push(`/explore/${msg.id}`)}
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg h-[300px] flex flex-col"
              >
                <CardHeader className="pb-3 bg-linear-to-br bg-cyan-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-3 border-white shadow-md">
                      <AvatarFallback className="bg-linear-to-br bg-blue-400 text-white">
                        {avatarLetter}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium truncate">To: {msg.recipient_name || "Unknown"}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 gap-3 pb-4">
                  <p className="text-gray-800 line-clamp-3 leading-relaxed">
                    {msg.message || "–"}
                  </p>
                  {msg.song_name && (
                    <div className="mt-auto p-3 bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                      <div className="flex items-center gap-3">
                        {msg.song_image && (
                          <img
                            src={msg.song_image}
                            alt={msg.song_name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                        )}

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {msg.song_name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {msg.song_artist}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}