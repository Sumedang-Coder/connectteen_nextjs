import { MessageCircle, Mail, Facebook, Twitter, Instagram, Heart } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-linear-to-br from-blue-600  to-sky-600 text-white py-12 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 backdrop-blur-lg rounded-full p-2 border-2 border-white/40">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xl">ConnectTeen</span>
            </div>
            <p className="text-white/80 text-sm">
              Membangun komunitas yang aman dan suportif bagi para remaja untuk terhubung dan tumbuh bersama. 💙
            </p>
          </div>

          <div>
            <div>
              <h3 className="mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Tentang Kami</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Pedoman Komunitas</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Pusat Keamanan</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Bantuan & Dukungan</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Sumber Daya</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Blog</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Acara</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Kebijakan Privasi</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Persyaratan Layanan</a></li>
              </ul>
            </div>
          </div>

          <div>
              <h3 className="mb-4">Tetap Terhubung 🌟</h3>
              <p className="text-white/80 text-sm mb-4">
                Ikuti kami di media sosial untuk mendapatkan pembaruan dan sorotan komunitas
              </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-white/20 border-2 border-white/30">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 border-2 border-white/30">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 border-2 border-white/30">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 border-2 border-white/30">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-300 fill-red-300" /> for our teen community © 2025 ConnectTeen
          </p>
        </div>
      </div>

      {/* Cute bottom decorations */}
      <div className="absolute bottom-5 left-10 text-3xl">⭐</div>
      <div className="absolute bottom-5 right-10 text-3xl">👾</div>
    </footer>
  );
}
