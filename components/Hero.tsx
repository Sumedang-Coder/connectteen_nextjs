'use client'
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Users, Sparkles } from "lucide-react";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[url('/img/hero.jpg')] bg-cover bg-center">
      <div className={`relative z-10 text-center text-white px-6 py-16 max-w-5xl mx-auto
      transition-all duration-500 ease-out
      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}>

        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-lg rounded-full border-4 border-white/40 shadow-2xl">
            <img
              src="/img/connectteen_icon.jpg"
              className="w-28 h-28 rounded-full"
              alt="ConnectTeen"
            />
          </div>
        </div>

        <h1 className="mb-2 text-4xl font-bold drop-shadow-lg">
          Haii Teens! Selamat Datang
        </h1>

        <p className="mb-8 lg:text-2xl text-[1rem] drop-shadow-md">
          Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di ConnectTeen Community!
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <Button
            size="lg"
            onClick={() => onNavigate("send")}
            className="gap-2 bg-white text-blue-600 hover:bg-blue-100 shadow-xl cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            Ayo buat pesanmu!
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="gap-2 bg-blue-400 border-2 border-white text-white hover:bg-blue-300 shadow-xl cursor-pointer"
          >
            <Users className="w-5 h-5" />
            Jelajahi komunitas
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-[50px]" />
    </section>
  );
}
