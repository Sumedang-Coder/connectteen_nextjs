"use client";

import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const isActive = (path: string) =>
    pathname === path ? "text-blue-400" : "text-gray-600 hover:text-blue-400";

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-4 border-blue-200 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 md:py-2">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="rounded-full shadow-lg cursor-pointer" onClick={() => handleNavClick("/")}>
              <img
                src="/img/connectteen_icon.jpg"
                className="w-7 h-7 rounded-full"
              />
            </div>
            <span
              onClick={() => handleNavClick("/")}
              className="cursor-pointer text-lg text-gray-800"
            >
              ConnectTeen
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 text-md">
            <span onClick={() => handleNavClick("/")} className={`cursor-pointer font-medium ${isActive("/")}`}>
              Home
            </span>
            <span onClick={() => handleNavClick("/send")} className={`cursor-pointer font-medium ${isActive("/send")}`}>
              Send
            </span>
            <span onClick={() => handleNavClick("/explore")} className={`cursor-pointer font-medium ${isActive("/explore")}`}>
              Explore
            </span>
            <span onClick={() => handleNavClick("/history")} className={`cursor-pointer font-medium ${isActive("/history")}`}>
              History
            </span>
          </nav>

          {/* DESKTOP ACTION */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => handleNavClick("/signin")}
              variant="ghost"
              className="hover:bg-blue-100"
            >
              Sign In
            </Button>
          </div>

          {/* MOBILE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* MOBILE NAV */}
        <nav
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="pt-4 pb-2 flex flex-col gap-3">
            <span onClick={() => handleNavClick("/")} className="text-sm text-gray-600 py-2 cursor-pointer">
              Home
            </span>
            <span onClick={() => handleNavClick("/send")} className="text-sm text-gray-600 py-2 cursor-pointer">
              Send
            </span>
            <span onClick={() => handleNavClick("/explore")} className="text-sm text-gray-600 py-2 cursor-pointer">
              Explore
            </span>
            <span onClick={() => handleNavClick("/history")} className="text-sm text-gray-600 py-2 cursor-pointer">
              History
            </span>

            <div className="pt-2">
              <Button
                onClick={() => handleNavClick("/signin")}
                variant="ghost"
                className="w-full active:bg-blue-100"
              >
                Sign In
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
