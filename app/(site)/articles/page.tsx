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

  const allArticles = [
    {
      id: "1",
      title: "Membangun Pertemanan Online dengan Aman",
      description:
        "Pelajari cara membangun pertemanan bermakna di dunia digital dengan aman dan nyaman.",
      readTime: "6 menit",
      image:
        "https://plus.unsplash.com/premium_photo-1661778823764-3580a0c86cb3?w=800",
    },
    {
      id: "2",
      title: "Mengelola Waktu Layar Secara Sehat",
      description:
        "Tips menjaga keseimbangan antara aktivitas online dan kehidupan nyata.",
      readTime: "7 menit",
      image:
        "https://images.unsplash.com/photo-1758525747615-d409c9ad73d1?w=800",
    },
    {
      id: "3",
      title: "Menemukan Gaya Menulis Kreatifmu",
      description:
        "Panduan singkat untuk mengembangkan kreativitas melalui tulisan.",
      readTime: "8 menit",
      image:
        "https://plus.unsplash.com/premium_photo-1684444605542-93725082d214?w=800",
    },
  ]

  const filteredArticles = searchQuery
    ? allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allArticles


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-cyan-50">
      <div className="bg-linear-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl animate-fade-in mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-white cursor-pointer hover:bg-white/10 mb-8 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
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
                onClick={() => router.push(`/articles/${article.id}`)}
                className="overflow-hidden animate-fade-in hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg bg-white cursor-pointer"
              >
                <div className="h-6 bg-linear-to-r bg-blue-400" />

                <CardHeader>
                  <AspectRatio
                    ratio={4 / 3}
                    className="rounded-lg overflow-hidden"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>

                  <CardTitle className="mt-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col h-full justify-between">
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="link"
                      className="p-0 gap-2 text-transparent bg-clip-text bg-linear-to-r bg-blue-400"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <span className="text-sm text-muted-foreground flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
