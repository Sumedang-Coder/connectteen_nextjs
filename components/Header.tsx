"use client";

import { Button } from "./ui/button";
import { Menu, Sparkles } from "lucide-react";
import { useState, useEffect, useRef, MouseEvent } from "react";

export function Header() {
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
              <a href="#">
                <img src="/img/connectteen_icon.jpg" className="w-8 h-8 rounded-full text-white" />
              </a>
            </div>
            <a href="#">
              <span className="text-xl text-transparent bg-clip-text bg-gray-800">ConnectTeen</span>
            </a>
          </div>

          <nav className="hidden text-lg md:flex items-center gap-6">
            <a href="#" className="hover:text-blue-600  transition-colors font-medium">Home</a>
            <a href="#" className="hover:text-blue-600 transition-colors font-medium">Send</a>
            <a href="#" className="hover:text-blue-600 transition-colors font-medium">Explore</a>
            <a href="#" className="hover:text-blue-600 transition-colors font-medium">History</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="hover:bg-blue-100 text-lg cursor-pointer">Sign In</Button>
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
            <a href="#" className="text-sm active:text-blue-600 transition-colors py-2 font-medium">Home</a>
            <a href="#" className="text-sm active:text-blue-600 transition-colors py-2 font-medium">Send</a>
            <a href="#" className="text-sm active:text-blue-600 transition-colors py-2 font-medium">Explore</a>
            <a href="#" className="text-sm active:text-blue-600 transition-colors py-2 font-medium">History</a>

            <div className="flex flex-col items-center gap-2 pt-2">
              <Button variant="ghost" className="active:bg-blue-100 w-14 sm:w-full">Sign In</Button>
            </div>
          </div>
        </nav>

      </div>
    </header>
  );
}
