import { Mail, Facebook, Instagram, Heart } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Button } from "../../ui/button";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-linear-to-br from-sky-600 to-blue-600 text-white py-12 px-6 relative overflow-hidden animate-fade-in">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 animate-fade-in text-balance">
            <div className="flex items-center gap-2 mb-4"> 
              <div className="bg-white/20 backdrop-blur-lg rounded-full border-2 border-white/40 p-0.5 shadow-lg">
                <Image
                  src="/img/connectteen_icon.jpg"
                  alt="ConnectTeen Logo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
              <span className="text-xl font-black tracking-tighter">ConnectTeen</span>
            </div>

            <p className="text-white/80 text-sm max-w-sm leading-relaxed font-medium">
              Membangun komunitas yang aman dan suportif bagi para remaja untuk terhubung dan tumbuh bersama. Kita terhubung untuk menginspirasi. 💙
            </p>
          </div>

          <div className="animate-fade-in">
            <h3 className="mb-4 font-black uppercase text-xs tracking-widest text-white/60">Layanan & Legal</h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  Ketentuan Layanan
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in">
            <h3 className="mb-4 font-black uppercase text-xs tracking-widest text-white/60">Ikuti Kami 🌟</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-white/20 border-2 border-white/30 rounded-xl" asChild>
                <a href="https://www.instagram.com/connect.teen_">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 border-2 border-white/30 rounded-xl" asChild>
                <a href="https://www.tiktok.com/@connect.teen_">
                  <FaTiktok className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 border-2 border-white/30 rounded-xl" asChild>
                <a href="mailto:connect.teen@example.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-xs font-black uppercase tracking-widest text-white/50 animate-fade-in">
          <p className="flex items-center justify-center gap-2 mb-2">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" /> for our teen community
          </p>
          <p>
            &copy; {new Date().getFullYear()} ConnectTeen platform
          </p>
        </div>
      </div>
    </footer>
  );
}
