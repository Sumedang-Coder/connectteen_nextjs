'use client';

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMessageStore } from "@/app/store/useMessageStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ExplorePage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const allMessages = useMessageStore((s) => s.allMessages);
  const fetchAllMessages = useMessageStore((s) => s.fetchAllMessages);
  const router = useRouter();

  useEffect(() => {
    fetchAllMessages().finally(() => setLoading(false));
  }, [fetchAllMessages]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/explore/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading messages...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-linear-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl mb-4">Jelajahi Pesan</h2>
            <p className="text-cyan-50 mb-8">
              Temukan pesan dan lagu yang dibagikan teman-teman
            </p>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Cari pesan, lagu, atau nama..."
                className="h-14 pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
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

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl mb-6">Semua Pesan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMessages.map((msg: any) => (
            
            <Card
              key={msg.id}
              onClick={() => router.push(`/explore/${msg.id}`)}
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg h-[300px] flex flex-col"
            >
              <CardHeader className="pb-3 bg-linear-to-br bg-cyan-50">
                <div className="flex items-center gap-3">
                  <Avatar className="border-3 border-white shadow-md">
                    <AvatarFallback className="bg-linear-to-br bg-blue-400 text-white">
                      {msg.recipient_name?.[0] || "?"}
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
          ))}
        </div>
      </div>
    </div>
  );
}
