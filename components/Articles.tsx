'use client'

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AspectRatio } from "./ui/aspect-ratio"
import { Button } from "./ui/button"
import { Clock, ArrowRight } from "lucide-react"

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

export function Articles() {
  const router = useRouter()

  return (
    <section className="py-16 px-6 bg-linear-to-b bg-white relative overflow-hidden animate-fade-in">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center  md:px-15 justify-between mb-12">
          <div>
            <h2 className="text-transparent bg-clip-text bg-blue-500 drop-shadow-md">
              Artikel Terbaru 📚
            </h2>
          </div>

          <Button
            variant="link"
            onClick={() => router.push("/articles")}
            className="gap-2 active:bg-purple-100 bg-transparent cursor-pointer text-blue-600"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-15 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-white shadow-md bg-white"
            >
              <div className="h-2 bg-linear-to-r bg-blue-400" />

              <CardHeader className="p-4">
                <AspectRatio ratio={16 / 9} className="rounded-md overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>

                <CardTitle className="mt-2 text-base line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex justify-between items-center">
                  <Button
                    variant="link"
                    onClick={() => router.push(`/articles/${article.id}`)}
                    className="p-0 gap-1 text-sm text-transparent bg-clip-text bg-linear-to-r bg-blue-400"
                  >
                    Baca
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <span className="text-xs text-muted-foreground flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* decorative */}
      {/* <div className="absolute top-20 right-20 text-5xl animate-bounce hidden lg:block">
        📖
      </div>
      <div className="absolute bottom-32 left-15 text-4xl">💡</div> */}
    </section>
  )
}
