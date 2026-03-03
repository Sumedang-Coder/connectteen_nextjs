"use client"

import { useEffect, useState, useMemo } from "react"
import { Search, Trash2 } from "lucide-react"
import Loader from "@/components/Loader"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/app/store/useAuthStore"
import { useMessageStore } from "@/app/store/useMessageStore"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function HistoryPage() {
  const router = useRouter()

  const { user, isAuthenticated, loading: loadingAuth } = useAuthStore()
  const { myMessages, fetchMyMessages, deleteMessage } = useMessageStore()

  const [loadingData, setLoadingData] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!loadingAuth && !isAuthenticated) {
      router.replace("/signin")
    }
  }, [loadingAuth, isAuthenticated, router])

  useEffect(() => {
    if (!isAuthenticated) return

    fetchMyMessages().finally(() => setLoadingData(false))
  }, [isAuthenticated, fetchMyMessages])

  useEffect(() => {
    document.body.style.overflow = showDeleteModal ? "hidden" : "auto"
  }, [showDeleteModal])

  const filteredMessages = useMemo(() => {
    if (!searchQuery) return myMessages

    return myMessages.filter((msg) =>
      [msg.message, msg.recipient_name, msg.song_name, msg.song_artist]
        .some((field) =>
          field?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  }, [searchQuery, myMessages])

  if (loadingAuth || loadingData) {
    return <Loader size="sm" fullScreen />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-linear-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl mb-2">
              History Pesan {user?.name}
            </h1>
            <p className="text-cyan-100 mb-8">
              Semua pesan yang pernah kamu kirim
            </p>

            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                className="h-14 pl-12 text-gray-900"
                placeholder="Cari pesan atau lagu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="relative h-80 rounded-xl hidden md:block overflow-hidden shadow-2xl">
            <Image
              src="/img/hero2.jpg"
              alt="History"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl mb-1">
            {searchQuery
              ? `Hasil Pencarian (${filteredMessages.length})`
              : "Semua Pesan Terkirim"}
          </h2>
          <p className="text-gray-600">
            Total {myMessages.length} pesan
          </p>
        </div>

        {filteredMessages.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            Tidak ada pesan yang cocok
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 md:px-15 gap-8">
            {filteredMessages.map((msg) => (
              <Card
                key={msg.id}
                onClick={() => router.push(`/explore/${msg.id}`)}
                className="group bg-white rounded-3xl p-1 shadow-lg border-[6px] border-white transition-all hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="bg-cyan-50 flex flex-col flex-1 min-h-[260px] rounded-2xl p-6 space-y-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMessageId(msg.id)
                      setShowDeleteModal(true)
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
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
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-semibold mb-2">
              Hapus Pesan?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Pesan ini akan dihapus permanen dan tidak bisa dikembalikan.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="w-1/2"
                disabled={deleting}
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedMessageId(null)
                }}
              >
                Batal
              </Button>

              <Button
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white"
                disabled={deleting}
                onClick={async () => {
                  if (!selectedMessageId) return
                  setDeleting(true)
                  await deleteMessage(selectedMessageId)
                  setDeleting(false)
                  setShowDeleteModal(false)
                  setSelectedMessageId(null)
                }}
              >
                {deleting ? "Menghapus..." : "Hapus"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

