'use client'

import Image from "next/image"
import { Button } from "../../ui/button"
import { Sparkles, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const messagesLeft = [
  {
    text: "Hai! Lagi nyari teman baru?",
    image: "/img/asta-chibi.png"
  },
  {
    text: "Ceritain harimu yuk 😊",
    image: "/img/deku-chibi.png"
  }
]

const messagesRight = [
  {
    text: "Di sini banyak cerita seru!",
    image: "/img/naruto-chibi.png"
  },
  {
    text: "Yuk eksplor bareng komunitas!",
    image: "/img/tanjiro-chibi.png"
  }
]

export function Hero() {
  const router = useRouter()

  const [leftIndex, setLeftIndex] = useState(0)
  const [rightIndex, setRightIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false)

      setTimeout(() => {
        setLeftIndex((prev) => (prev + 1) % messagesLeft.length)
        setRightIndex((prev) => (prev + 1) % messagesRight.length)
        setAnimate(true)
      }, 200)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const left = messagesLeft[leftIndex]
  const right = messagesRight[rightIndex]

  return (
    <section className="relative min-h-[610px] overflow-hidden">

      {/* Background */}
      <Image
        src="/img/hero-landing3.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* ===== LEFT DESKTOP ===== */}
      <div className="hidden lg:flex absolute left-28 top-24 flex-col items-start z-20">

        {/* Bubble */}
        <div
          className={`mb-2 bg-white/90 px-4 py-2 rounded-2xl shadow-lg max-w-[200px] animate-float-soft transition-all duration-500 ${animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
        >
          <p className="text-sm text-gray-800 font-medium">
            {left.text}
          </p>
        </div>

        {/* Character */}
        <img
          src={left.image}
          className="h-[150px] object-contain drop-shadow-xl animate-float"
        />
      </div>

      {/* ===== RIGHT DESKTOP ===== */}
      <div className="hidden lg:flex absolute right-28 top-30 flex-col items-end z-20">

        {/* Bubble */}
        <div
          className={`mb-2 bg-blue-500/90 px-4 py-2 rounded-2xl shadow-lg max-w-[200px] animate-float-soft transition-all duration-500 ${animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
        >
          <p className="text-sm text-white font-medium">
            {right.text}
          </p>
        </div>

        {/* Character */}
        <img
          src={right.image}
          className="h-[150px] object-contain drop-shadow-xl animate-float delay-200"
        />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="lg:hidden absolute top-16 w-full px-4 z-20 flex flex-col">

        {/* LEFT */}
        <div className="flex items-start gap-2">
          <img
            src={left.image}
            className="h-20 object-contain"
          />
          <div
            className={`bg-white/90 px-3 py-2 rounded-xl max-w-[70%] animate-float-soft transition-all duration-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
          >
            <p className="text-xs text-gray-800">{left.text}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-start gap-2 justify-end">
          <div
            className={`bg-blue-500 px-3 py-2 rounded-xl max-w-[70%] text-white animate-float-soft transition-all duration-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
          >
            <p className="text-xs">{right.text}</p>
          </div>
          <img
            src={right.image}
            className="h-20 object-contain"
          />
        </div>

      </div>

      {/* ===== MAIN ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center text-white">

        <div className="mb-6">
          <Image
            src="/img/connectteen_icon.jpg"
            alt="ConnectTeen"
            width={90}
            height={90}
            className="rounded-full shadow-2xl border-4 border-white/30"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
          Haii Teens! Selamat Datang
        </h1>

        <p className="text-sm sm:text-lg text-white/90 max-w-xl mb-10">
          Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di ConnectTeen Community!
        </p>

        <div className="flex flex-wrap justify-center gap-3 w-full">
          <Button
            onClick={() => router.push("/send")}
            className="flex-1 min-w-[180px] max-w-60 justify-center gap-2 bg-white text-blue-600 hover:bg-blue-100 shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            Ayo buat pesanmu!
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/explore")}
            className="flex-1 min-w-[180px] max-w-60 justify-center gap-2 bg-blue-400 border-2 border-white text-white hover:bg-blue-300 shadow-xl"
          >
            <Users className="w-5 h-5" />
            Jelajahi komunitas
          </Button>
        </div>
      </div>
    </section>
  )
}