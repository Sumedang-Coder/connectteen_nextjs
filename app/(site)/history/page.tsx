"use client"

import { useEffect, useState } from "react"
import { Music, LogOut, Search, Trash2 } from "lucide-react"
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
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const loadingAuth = useAuthStore((s) => s.loading)
  const logout = useAuthStore((s) => s.logout)
  const myMessages = useMessageStore((s) => s.myMessages)
  const fetchMyMessages = useMessageStore((s) => s.fetchMyMessages)
  const deleteMessage = useMessageStore((s) => s.deleteMessage)
  const [loadingData, setLoadingData] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) return

    fetchMyMessages().finally(() => setLoadingData(false))
  }, [isAuthenticated, fetchMyMessages])

  const handleLogin = () => {
    window.location.href =
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/google`
  }

  const filteredMessages = searchQuery
    ? myMessages.filter(
      (msg) =>
        msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.song_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.song_artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : myMessages

  if (loadingAuth) {
    return <Loader size="sm" fullScreen />
  }

  useEffect(() => {
    if (!isAuthenticated) return

    fetchMyMessages().finally(() => setLoadingData(false))
  }, [isAuthenticated, fetchMyMessages])

  useEffect(() => {
    if (!loadingAuth && !isAuthenticated) {
      router.replace('/signin')
    }
  }, [loadingAuth, isAuthenticated, router])




  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-linear-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl animate-fade-in mx-auto px-6 py-14 grid lg:grid-cols-2 gap-12 items-center">
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
          <div className="relative h-80 rounded-xl  hidden md:block overflow-hidden shadow-2xl">

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
        <div className="mb-6 animate-fade-in">
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
          <div className="text-center py-16 animate-fade-in text-gray-500">
            Tidak ada pesan yang cocok
          </div>
        ) : (
          <div className="grid grid-cols-1 animate-fade-in md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessages.map((msg) => (

              <Card
                key={msg.id}
                onClick={() => router.push(`/explore/${msg.id}`)}
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg h-[300px] flex flex-col"
              >
                <CardHeader className="pb-3 bg-linear-to-br flex justify-between bg-cyan-50">
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
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMessageId(msg.id)
                      setShowDeleteModal(true)
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
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
        )}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col gap-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800">
              Hapus Pesan?
            </h2>

            <p className="text-sm text-gray-600">
              Pesan ini akan dihapus permanen dan tidak bisa dikembalikan.
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedMessageId(null)
                }}
              >
                Batal
              </Button>

              <Button
                variant="destructive"
                onClick={async () => {
                  if (!selectedMessageId) return
                  await deleteMessage(selectedMessageId)
                  setShowDeleteModal(false)
                  setSelectedMessageId(null)
                }}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
