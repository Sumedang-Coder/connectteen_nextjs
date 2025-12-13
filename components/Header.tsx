"use client";

import { Button } from "./ui/button";
import { Menu, Sparkles } from "lucide-react";
import { useState, useEffect, useRef, MouseEvent } from "react";

export function Header({ onNavigate, currentPage }: { onNavigate?: (page: string) => void; currentPage?: string }) {

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      setIsMenuOpen(false);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {

    function handleClickOutside(event: globalThis.MouseEvent) {
      const targetNode = event.target as Node;
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(targetNode)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside as EventListener);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-4 border-blue-200 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className=" rounded-full shadow-lg">
              <a onClick={() => handleNavClick("home")} className="cursor-pointer">
                <img src="/img/connectteen_icon.jpg" className="w-8 h-8 rounded-full text-white" />
              </a>
            </div>
            <a onClick={() => handleNavClick("home")} className="cursor-pointer">
              <span className="text-xl text-transparent bg-clip-text bg-gray-800">ConnectTeen</span>
            </a>
          </div>

          <nav className="hidden text-lg md:flex items-center gap-6">
            <a
              onClick={() => handleNavClick("home")}
              className={`transition-colors cursor-pointer font-medium ${currentPage === "home" ? "text-blue-400" : "text-gray-600 hover:text-blue-400"}`}
            >
              Home
            </a>
            <a
              onClick={() => handleNavClick("send")}
              className={`transition-colors cursor-pointer font-medium ${currentPage === "send" ? "text-blue-400" : "text-gray-600 hover:text-blue-400"}`}
            >
              Send
            </a>
            <a
              onClick={() => handleNavClick("explore")}
              className={`transition-colors cursor-pointer font-medium ${currentPage === "explore" ? "text-blue-400" : "text-gray-600 hover:text-blue-400"}`}
            >
              Explore
            </a>
            <a
              onClick={() => handleNavClick("history")}
              className={`transition-colors cursor-pointer font-medium ${currentPage === "history" ? "text-blue-400" : "text-gray-600 hover:text-blue-400"}`}
            >
              History
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button  onClick={() => handleNavClick("signin")} variant="ghost" className="hover:bg-blue-100 text-lg cursor-pointer">Sign In</Button>
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

        <nav
          className={`
          md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out
          ${isMenuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="pt-4 pb-2 flex flex-col gap-3">
            <a onClick={() => handleNavClick("home")} className="text-sm text-gray-600 active:text-blue-400 transition-colors py-2 cursor-pointer">Home</a>
            <a onClick={() => handleNavClick("send")} className="text-sm text-gray-600 active:text-blue-400 transition-colors py-2 cursor-pointer">Send</a>
            <a onClick={() => handleNavClick("explore")} className="text-sm text-gray-600 active:text-blue-400 transition-colors py-2 cursor-pointer">Explore</a>
            <a onClick={() => handleNavClick("history")} className="text-sm text-gray-600 active:text-blue-400 transition-colors py-2 cursor-pointer">History</a>
            <div className="flex flex-col items-center gap-2 pt-2">
              <Button  onClick={() => handleNavClick("signin")} variant="ghost" className="active:bg-blue-100 w-14 sm:w-full">Sign In</Button>
            </div>
          </div>
        </nav>

      </div>
    </header>
  );
}
