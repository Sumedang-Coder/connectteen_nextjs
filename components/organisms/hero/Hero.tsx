'use client'
import { useRef } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image"
import { Button } from "../../ui/button"
import { Sparkles, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()
  const autoplay = useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false })
  )
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  )


  const slides = [
    {
      title: "Haii Teens! Selamat Datang",
      description: "Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di ConnectTeen Community!",
      image: "/img/slide1.jpg"
    },
    {
      title: "Berani Cerita, Berani Jadi Diri Sendiri",
      description: "Kirim pesan anonim & temukan cerita seru dari komunitas",
      image: "/img/slide2.1.jpg"
    },
    {
      title: "Temukan Tempatmu di ConnectTeen",
      description: "Jelajahi topik favoritmu dan temukan teman sehobi di komunitas kami",
      image: "/img/slide3.jpg"
    },
    {
      title: "Kalau Bukan Sekarang, Kapan Lagi?",
      description: "Bergabunglah dengan komunitas kami yang suportif dan temukan tempat di mana kamu bisa menjadi dirimu sendiri.",
      image: "/img/slide4.jpg"
    },
  ]

  return (
    <section className="relative min-h-[600px] overflow-hidden ">

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">

          {slides.map((slide, i) => (
            <div key={i} className="relative flex flex-col justify-start items-center min-w-full min-h-[600px] bg-white">

              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />

              <div className="relative bg-black/20 inset-0 z-10 flex items-center md:items-start md:pt-36 justify-center min-w-full min-h-[600px]">
                <div className="text-center text-white px-6 max-w-5xl">
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/img/connectteen_icon.jpg"
                      alt="ConnectTeen"
                      width={112}
                      height={112}
                      priority
                      className="rounded-full"
                    />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="mb-8 lg:text-xl md:w-136 text-[1rem] drop-shadow-md">
                    {slide.description}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      <div className="absolute z-20 left-1/2 bottom-32 -translate-x-1/2">
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white via-white/20 to-transparent" />
    </section>
  )
}
