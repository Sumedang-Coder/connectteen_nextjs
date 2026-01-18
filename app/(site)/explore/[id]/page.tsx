'use client';

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMessageStore } from "@/app/store/useMessageStore";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MessageDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { selectedMessage, fetchMessageById } = useMessageStore();

  useEffect(() => {
    if (id) fetchMessageById(id as string);
  }, [id, fetchMessageById]);

  if (!selectedMessage) {
    return <p className="text-center mt-10">Loading message...</p>;
  }

  const avatarLetter =
    selectedMessage.recipient_name?.charAt(0).toUpperCase() || "?";
    

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-100 via-blue-100 to-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-5 py-2.5 text-gray-800 font-medium shadow-lg  transition-all duration-300 hover:bg-white hover:shadow-xl active:scale-95"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-500 text-white transition-transform group-hover:-translate-x-1">
            <ArrowLeft size={16} />
          </span>
          <span>Kembali</span>
        </Button>
        {/* Card */}
        <Card className="overflow-hidden rounded-3xl border border-white/60 shadow-2xl backdrop-blur">

          {/* Header */}
          <CardHeader className="bg-linear-to-r from-cyan-500 to-blue-500 text-white">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                <AvatarFallback className="bg-white text-blue-600 font-bold">
                  {avatarLetter}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm opacity-90">Untuk</p>
                <h2 className="text-xl font-semibold leading-tight">
                  {selectedMessage.recipient_name}
                </h2>
              </div>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="px-6 pt-3 pb-6 space-y-8">

            {selectedMessage.song_id && (
              <div className="rounded-2xl flex flex-col h-full items-center justify-center p-4 overflow-hidden border border-cyan-200 shadow-md bg-white">
                <iframe
                  src={`https://open.spotify.com/embed/track/${selectedMessage.song_id}`}
                  className="w-full h-40"
                  allow="encrypted-media"
                  loading="lazy"
                />
              </div>
            )}

            {/* Message */}
            <div className="relative max-w-none md:max-w-2xl mx-auto">
              <span className="absolute -left-2 top-0 h-full w-1 rounded-full bg-linear-to-b from-cyan-400 to-blue-500" />
              <div className="pl-4 text-gray-800 text-[1.05rem] text-justify leading-relaxed whitespace-pre-line space-y-4">
                {selectedMessage.message}
              </div>
            </div>


            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 text-right">
              Dikirim pada{" "}
              {new Date(selectedMessage.created_at!).toLocaleString("id-ID")}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
