'use client'

import Image from "next/image"
import { Button } from "../../ui/button"
import { Sparkles, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative min-h-[650px] overflow-hidden">

      {/* background */}
      <Image
        src="/img/hero-landing-page.png"
        alt="Haii Teens! Selamat Datang"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
        quality={85}
      />

      {/* overlay gradient (lebih hidup) */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />

      {/* glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center text-white animate-fade-in">

        {/* logo */}
        <div className="mb-6">
          <Image
            src="/img/connectteen_icon.jpg"
            alt="ConnectTeen"
            width={96}
            height={96}
            className="rounded-full shadow-2xl border-2 border-white/30 hover:scale-105 transition duration-300"
            priority
          />
        </div>

        {/* title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-xl tracking-tight">
          Haii Teens! Selamat Datang 
        </h1>

        {/* description */}
        <p className="text-[1rem] sm:text-lg text-white/85 max-w-xl mb-10 leading-relaxed">
          Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di{" "}
          <span className="font-semibold text-white">ConnectTeen Community</span>.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">

          <Button
            onClick={() => router.push("/send")}
            className="gap-2 cursor-pointer bg-white text-blue-600 hover:bg-blue-100 shadow-2xl px-6 py-2 text-sm sm:text-base transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Ayo buat pesanmu!
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/explore")}
            className="gap-2 cursor-pointer bg-blue-500/80 backdrop-blur text-white border border-white/40 hover:bg-blue-400 shadow-2xl px-6 py-2 text-sm sm:text-base transition-all duration-300 hover:scale-105"
          >
            <Users className="w-5 h-5" />
            Jelajahi komunitas
          </Button>

        </div>

      </div>
    </section>
  )
}