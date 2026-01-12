'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Users, Sparkles } from "lucide-react";

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-[600px] overflow-hidden">

      <Image
        src="/img/hero.jpg"
        alt="ConnectTeen Hero"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative animate-fade-in z-10 flex items-center justify-center min-h-[600px]">
        <div className="text-center text-white px-6 py-16 max-w-5xl mx-auto">

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

          <h1 className="mb-2 md:text-3xl text-2xl font-bold drop-shadow-lg">
            Haii Teens! Selamat Datang
          </h1>

          <p className="mb-8 lg:text-xl md:w-136 text-[1rem] drop-shadow-md">
            Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di ConnectTeen Community!
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => router.push("/send")}
              className="gap-2 bg-white text-sm text-blue-600 hover:bg-blue-100 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              Ayo buat pesanmu!
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/explore")}
              className="gap-2 bg-blue-400 text-sm border-2 border-white text-white hover:bg-blue-300 shadow-xl cursor-pointer"
            >
              <Users className="w-5 h-5" />
              Jelajahi komunitas
            </Button>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-[50px]" />
    </section>
  );
}
