"use client";

import { Button } from "./ui/button";
import { MessageCircle, Menu, Sparkles } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-4 border-blue-200 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-400 rounded-full p-2 shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <span className="text-xl text-transparent bg-clip-text bg-blue-400">ConnectTeen</span>
          </div>
          
          <nav className="hidden text-lg md:flex items-center gap-6">
            <a href="#" className="hover:text-blue-600  transition-colors font-medium">Home</a>
            <a href="#" className="hover:text-purple-600 transition-colors font-medium">Send</a>
            <a href="#" className="hover:text-pink-600 transition-colors font-medium">Explore</a>
            <a href="#" className="hover:text-orange-600 transition-colors font-medium">History</a>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="hover:bg-blue-100 text-lg">Sign In</Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-col gap-3">
            <a href="#" className="text-sm hover:text-blue-600 transition-colors py-2 font-medium">Home 🏠</a>
            <a href="#" className="text-sm hover:text-purple-600 transition-colors py-2 font-medium">Send 💌</a>
            <a href="#" className="text-sm hover:text-pink-600 transition-colors py-2 font-medium">Explore 🔍</a>
            <a href="#" className="text-sm hover:text-orange-600 transition-colors py-2 font-medium">History 📜</a>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" className="hover:bg-blue-100">Sign In</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
