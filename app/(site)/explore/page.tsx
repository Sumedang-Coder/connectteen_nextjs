"use client";

import { useState, useEffect } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMessageStore } from "@/app/store/useMessageStore";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mengambil state dari store (sesuaikan nama fungsi dengan store terbaru Anda)
  const {
    allMessages,
    fetchAllMessages,
    resetAllMessages,
    page,
    hasMore,
    isFetching,
  } = useMessageStore();
  const { isAuthenticated } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    resetAllMessages();
    // specify pagination options as object to match store API
    fetchAllMessages({ page: 1, limit: 6 });
  }, [fetchAllMessages, isAuthenticated]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      fetchAllMessages({ page: page + 1, limit: 6 });
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/explore/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (isFetching && allMessages.length === 0) {
    return <Loader fullScreen size="sm" />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HERO (Gabungan Style) ================= */}
      <section className="px-6 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto bg-linear-to-br from-cyan-600 to-blue-600 rounded-3xl p-8 lg:p-16 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-fade-in">
                <h1 className="text-white text-5xl lg:text-6xl font-extrabold leading-tight">
                  Jelajahi <br /> Pesan
                </h1>
                <p className="text-white/90 mt-4 text-lg max-w-md">
                  Temukan cerita dan lagu yang dibagikan oleh orang-orang.
                </p>
              </div>

              <div className="relative max-w-xl animate-fade-in">
                <div className="bg-white rounded-2xl gap-5 flex items-center p-2 shadow-xl">
                  <Search className="ml-4 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Cari pesan, lagu, atau nama..."
                    className="flex-1 border-none focus:ring-0 text-gray-900 px-4 py-3 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl">
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="/img/hero-explore.jpg"
                    alt="Explore"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="px-6 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-extrabold mb-10">
            ✨ Recent Explorations
          </h2>

          {allMessages.length === 0 && !isFetching ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="h-16 w-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada pesan</h3>
              <p className="text-gray-500 text-center max-w-sm">
                Jadilah yang pertama untuk membagikan ceritamu dengan menekan tombol Kirim Pesan!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-15 gap-8">
              {allMessages.map((msg: any) => (
                <Card
                  key={msg.id}
                  onClick={() => router.push(`/explore/${msg.id}`)}
                  className="group bg-white rounded-3xl p-1 shadow-lg border-[6px] border-white transition-all hover:-translate-y-2 cursor-pointer"
                >
                  <CardContent className="bg-cyan-50 flex flex-col flex-1 min-h-[260px] rounded-2xl p-6 space-y-6">
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
                    {msg.song_name && (
                      <div className="mt-auto bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 flex items-center gap-4">
                        {msg.song_image && (
                          <img
                            src={msg.song_image}
                            alt={msg.song_name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-white p-1"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold truncate">
                            {msg.song_name}
                          </p>
                          <p className="text-white/80 text-xs truncate">
                            {msg.song_artist}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="px-8 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50"
              >
                {isFetching ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {!hasMore && allMessages.length > 0 && (
            <p className="text-center text-gray-400 mt-12">No more messages</p>
          )}
        </div>
      </main>
    </div>
  );
}
