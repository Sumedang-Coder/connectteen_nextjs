// 'use client'

// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"

// export default function ArticleDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const router = useRouter()

//   return (
//     <section className="max-w-4xl mx-auto px-6 py-16">
//       <Button
//         variant="ghost"
//         className="mb-6 gap-2"
//         onClick={() => router.back()}
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Kembali
//       </Button>

//       <h1 className="text-3xl font-bold mb-4">
//         Artikel #{params.id}
//       </h1>

//       <p className="text-muted-foreground leading-relaxed">
//         Ini halaman detail artikel.  
//         Nanti di sini kamu bisa fetch data artikel berdasarkan ID.
//       </p>
//     </section>
//   )
// }
