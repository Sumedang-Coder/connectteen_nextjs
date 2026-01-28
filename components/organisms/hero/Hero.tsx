'use client'

import Image from "next/image"
import { Button } from "../../ui/button"
import { Sparkles, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative min-h-[610px] overflow-hidden">
      <Image
        src="/img/hero-landing3.jpg"
        alt="Haii Teens! Selamat Datang"
        fill
        priority
        sizes="100vw"
        className=" object-top sm:object-center object-cover"
        quality={80}
      />

      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div className="relative animate-fade-in z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center text-white">
        
        {/* logo */}
        <div className="mb-6">
          <Image
            src="/img/connectteen_icon.jpg"
            alt="ConnectTeen"
            width={96}
            height={96}
            className="rounded-full shadow-xl"
            priority
          />
        </div>

        {/* title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-lg">
          Haii Teens! Selamat Datang
        </h1>

        {/* description */}
        <p className="text-[1rem] sm:text-xl text-white/90 max-w-xl mb-10 drop-shadow">
          Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di ConnectTeen Community!
        </p>

        {/* buttons — TIDAK DIUBAH */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => router.push("/send")}
            className="gap-2 cursor-pointer bg-white text-sm text-blue-600 hover:bg-blue-100 shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            Ayo buat pesanmu!
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/explore")}
            className="gap-2 cursor-pointer bg-blue-400 text-sm border-2 border-white text-white hover:bg-blue-300 shadow-xl"
          >
            <Users className="w-5 h-5" />
            Jelajahi komunitas
          </Button>
        </div>
      </div>
    </section>
  )
}
