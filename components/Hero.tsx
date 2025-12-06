import { Button } from "./ui/button";
import { MessageCircle, Users, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-blue-400">
      {/* Decorative blobs */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-lime-400 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-400 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-400 rounded-full opacity-20 blur-2xl"></div>
      </div> */}
      
      <div className="relative z-10 text-center text-white px-6 py-16 max-w-5xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-lg rounded-full p-4 border-4 border-white/40 shadow-2xl">
            <MessageCircle className="w-16 h-16" />
          </div>
        </div>
        
        <h1 className="md-2 drop-shadow-lg">Haii Teens! Selamat Datang</h1>
        <p className="mb-8 lg:text-2xl text-[1rem] opacity-95 drop-shadow-md">
          Temukan teman baru, bagikan cerita, dan jelajahi dunia bersama di ConnectTeen Community!
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
            <Sparkles className="w-5 h-5" />
            Ayo mulai membuat pesanmu!
          </Button>
          <Button size="lg" variant="outline" className="gap-2 bg-lime-400 backdrop-blur-sm border-2 border-white text-blue-900 hover:bg-lime-300 shadow-xl">
            <Users className="w-5 h-5" />
            Jelajahi komunitas sekarang
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
