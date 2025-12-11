import { Button } from "./ui/button";
import { MessageCircle, Users, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[url('/img/hero.jpg')] bg-cover bg-center">
      <div className="relative z-10 text-center text-white px-6 py-16 max-w-5xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-lg rounded-full  border-4 border-white/40 shadow-2xl">
            <img src="/img/connectteen_icon.jpg" className="w-28 h-28 rounded-full" />
          </div>
        </div>
        
        <h1 className="md-2 font-bold drop-shadow-lg">Haii Teens! Selamat Datang</h1>
        <p className="mb-8 lg:text-2xl text-[1rem] drop-shadow-md">
          Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di ConnectTeen Community!
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <Button size="lg" className="gap-2 bg-white text-blue-600 lg:hover:bg-blue-100 active:bg-blue-100 cursor-pointer shadow-xl">
            <Sparkles className="w-5 h-5" />
            Ayo buat pesanmu!
          </Button>
          <Button size="lg" variant="outline" className="gap-2 bg-blue-400 cursor-pointer backdrop-blur-sm border-2 border-white text-white active:bg-blue-300 lg:hover:bg-blue-300 shadow-xl">
            <Users className="w-5 h-5" />
            Jelajahi komunitas
          </Button>
        </div>
        
        {/* Cute decorative emojis */}
        {/* <div className="absolute top-20 left-10 text-6xl animate-bounce">💌</div>
        <div className="absolute bottom-32 right-20 text-5xl animate-pulse">🎵</div>
        <div className="absolute top-40 right-40 text-4xl">❤️</div>
        <div className="absolute bottom-20 left-32 text-5xl">🌟</div> */}
      </div>
      
      {/* Decorative curved shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-[50px]"></div>
    </section>
  );
}
