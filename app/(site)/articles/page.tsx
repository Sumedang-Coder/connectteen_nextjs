'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function ArticlesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const articles = [
    {
      id: 1,
      title: "Membangun teman secara online dengan aman",
      excerpt:
        "Belajar bagaimana membangun persahabatan yang bermakna di dunia digital dengan tips keamanan penting.",
      category: "Komunitas",
      readTime: "5 min",
      image:
        "https://plus.unsplash.com/premium_photo-1661778823764-3580a0c86cb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVtYW4lMjBvbmxpbmV8ZW58MHx8MHx8fDA%3D",
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: 2,
      title: "Mengelola Waktu Layar (Screen Time) secara efektif",
      excerpt:
        "Temukan tips dan strategi untuk menyeimbangkan kehadiran online Anda dengan aktivitas dunia nyata dan kesejahteraan diri.",
      category: "Kesehatan Mental",
      readTime: "7 min",
      image:
        "https://images.unsplash.com/photo-1758525747615-d409c9ad73d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuZ2Vsb2xhYW4lMjBzY3JlZW4lMjB0aW1lfGVufDB8fDB8fHww",
      color: "from-purple-400 to-pink-400",
    },
    {
      id: 3,
      title: "Memulai Perjalanan Menulis Kreatif",
      excerpt:
        "Jelajahi dunia menulis kreatif dengan panduan langkah demi langkah untuk mengasah keterampilan bercerita Anda.",
      category: "Kreatif",
      readTime: "6 min",
      image:
        "https://plus.unsplash.com/premium_photo-1684444605542-93725082d214?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVtdWxhaSUyMFBlcmphbGFuYW4lMjBNZW51bGlzJTIwS3JlYXRpZnxlbnwwfHwwfHx8MA%3D%3D",
      color: "from-orange-400 to-yellow-400",
    },
  ]
  const allArticles = articles

  const filteredArticles = searchQuery
    ? allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allArticles


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-cyan-50">
      <div className="bg-linear-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl animate-fade-in mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            onClick={() => router.back()}
            className="group inline-flex items-center mb-4 gap-2 rounded-full bg-white/70 backdrop-blur px-5 py-2.5 text-gray-800 font-medium shadow-lg  transition-all duration-300 hover:bg-white hover:shadow-xl active:scale-95"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-500 text-white transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={16} />
            </span>
            <span>Kembali</span>
          </Button>

          <div className="mb-8">
            <h1 className="md:text-5xl text-2xl mb-3">Semua Artikel 📝</h1>
            <p className="text-xl text-cyan-50">
              Jelajahi panduan, tips, dan cerita bermanfaat untuk remaja
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari artikel berdasarkan judul atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white text-gray-900 border-0 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Result Info */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl text-gray-900 mb-2">
            {searchQuery
              ? `Hasil Pencarian (${filteredArticles.length})`
              : "Semua Artikel"}
          </h2>
          <p className="text-lg text-gray-600">
            {searchQuery
              ? `Menampilkan artikel dengan kata kunci "${searchQuery}"`
              : `Menampilkan ${allArticles.length} artikel`}
          </p>
        </div>

        {/* EMPTY STATE */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white animate-fade-in rounded-xl p-12 text-center border border-gray-200">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">
              Artikel tidak ditemukan
            </h3>
            <p className="text-gray-600">
              Coba gunakan kata kunci lain
            </p>
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 md:px-12 gap-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="flex flex-col overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-white shadow-md bg-white">
                <div className="h-1 bg-linear-to-r from-blue-400 to-blue-600" />

                <AspectRatio ratio={16 / 9}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full rounded-3xl p-2 object-cover"
                  />
                </AspectRatio>

                <div className="flex-1 px-4 space-y-1">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>


                <div className="mt-auto flex justify-between items-center px-4 pb-4">
                  <Button
                    variant="link"
                    onClick={() => router.push(`/articles/${article.id}`)}
                    className="p-0 pointer-cursor gap-1 text-sm text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600"
                  >
                    Baca selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <span className="text-xs text-muted-foreground flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
