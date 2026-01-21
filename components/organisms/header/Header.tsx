"use client";

import { Button } from "../../ui/button";
import { Menu, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

function Avatar({ name, src, className }: { name: string; src?: string; className?: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  const bgColors = ["bg-blue-400", "bg-green-400", "bg-red-400", "bg-yellow-400", "bg-purple-400"];
  const colorIndex = name.charCodeAt(0) % bgColors.length;
  const bgColor = bgColors[colorIndex];

  return imgSrc ? (
    <img
      src={imgSrc}
      alt={name}
      className={className}
      onError={() => setImgSrc("")} 
    />
  ) : (
    <div
      className={`${bgColor} ${className} flex items-center justify-center text-white font-semibold`}
    >
      {initials}
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
      <div className="max-w-6xl mx-auto px-6 py-5 md:py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("/")}>
            <img
              src="/img/connectteen_icon.jpg"
              className="w-10 h-10 rounded-full shadow-lg"
            />
            <span className="text-lg text-gray-800 font-semibold">ConnectTeen</span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 md:flex hidden items-center gap-6">
            <span onClick={() => handleNavClick("/")} className={`cursor-pointer font-medium ${isActive("/")}`}>Home</span>
            <span onClick={() => handleNavClick("/send")} className={`cursor-pointer font-medium ${isActive("/send")}`}>Send</span>
            <span onClick={() => handleNavClick("/explore")} className={`cursor-pointer font-medium ${isActive("/explore")}`}>Explore</span>
            <span onClick={() => handleNavClick("/history")} className={`cursor-pointer font-medium ${isActive("/history")}`}>History</span>
          </nav>

          {/* DESKTOP ACTION */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar name={user.name} src={user.avatarUrl} className="w-8 h-8 rounded-full" />
                <span className="font-medium">{user.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLogoutModal(true)}
                  className="hover:bg-red-100"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => router.push("/signin")} variant="ghost" className="hover:bg-blue-100 font-bold">
                Sign In
              </Button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* MOBILE NAV */}
        <nav className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${isMenuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="pt-4 pb-2 flex flex-col gap-3">
            <span onClick={() => handleNavClick("/")} className="text-sm text-gray-600 py-2 cursor-pointer">Home</span>
            <span onClick={() => handleNavClick("/send")} className="text-sm text-gray-600 py-2 cursor-pointer">Send</span>
            <span onClick={() => handleNavClick("/explore")} className="text-sm text-gray-600 py-2 cursor-pointer">Explore</span>
            <span onClick={() => handleNavClick("/history")} className="text-sm text-gray-600 py-2 cursor-pointer">History</span>

            <div className="pt-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Avatar name={user.name} src={user.avatarUrl} className="w-8 h-8 rounded-full" />
                  <span className="font-medium">{user.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowLogoutModal(true)}
                    className="hover:bg-red-100"
                  >
                    <LogOut className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => router.push("/signin")} variant="ghost" className="w-full font-bold hover:bg-blue-100">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </nav>

        {/* LOGOUT MODAL */}
        {showLogoutModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 min-h-screen animate-fade-in duration-100">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Logout</h2>
              <p className="text-sm text-gray-600">Apakah kamu yakin ingin logout?</p>

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4"
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    logout();
                    setShowLogoutModal(false);
                  }}
                  className="px-4"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
