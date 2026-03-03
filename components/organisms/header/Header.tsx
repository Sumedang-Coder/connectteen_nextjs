"use client";

import { Button } from "../../ui/button";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

function Avatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const bgColors = [
    "bg-blue-400",
    "bg-green-400",
    "bg-red-400",
    "bg-yellow-400",
    "bg-purple-400",
  ];

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
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
    setIsMessageOpen(false);
  };

  const isMessageActive =
    pathname.startsWith("/send") ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/history");

  const isActive = (path: string) =>
    pathname === path
      ? "text-blue-500"
      : "text-gray-600 hover:text-blue-500";

  useEffect(() => {
    if (!isMenuOpen && !isMessageOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsMessageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isMessageOpen]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsMessageOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMessageOpen(false);
    }, 180);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick("/")}
          >
            <img
              src="/img/connectteen_icon.jpg"
              className="w-10 h-10 rounded-full shadow-md"
            />
            <span className="text-lg text-gray-800 font-semibold">
              ConnectTeen
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 md:flex hidden items-center gap-8">

            <span
              onClick={() => handleNavClick("/")}
              className={`cursor-pointer font-medium ${isActive("/")}`}
            >
              Home
            </span>

            {/* MESSAGE DROPDOWN (HOVER ONLY) */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`flex items-center gap-1 font-medium cursor-pointer ${isMessageActive
                  ? "text-blue-500"
                  : "text-gray-600 hover:text-blue-500"
                  }`}
              >
                Message
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isMessageOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              {isMessageOpen && (
                <div className="absolute top-10 left-0 w-44 bg-white shadow-xl rounded-xl py-2 border">
                  <div
                    onClick={() => handleNavClick("/send")}
                    className="px-4 py-2 text-sm hover:text-blue-500 cursor-pointer"
                  >
                    Send
                  </div>
                  <div
                    onClick={() => handleNavClick("/explore")}
                    className="px-4 py-2 text-sm hover:text-blue-500 cursor-pointer"
                  >
                    Explore
                  </div>
                  <div
                    onClick={() => handleNavClick("/history")}
                    className="px-4 py-2 text-sm hover:text-blue-500 cursor-pointer"
                  >
                    History
                  </div>
                </div>
              )}
            </div>
            <span
              onClick={() => handleNavClick("/articles")}
              className={`cursor-pointer font-medium ${isActive("/articles")}`}
            >
              Articles
            </span>

            <span
              onClick={() => handleNavClick("/events")}
              className={`cursor-pointer font-medium ${isActive("/events")}`}
            >
              Events
            </span>

            <span
              onClick={() => handleNavClick("/about-us")}
              className={`cursor-pointer font-medium ${isActive("/about-us")}`}
            >
              About Us
            </span>
          </nav>

          {/* DESKTOP ACTION */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar
                  name={user.name}
                  src={user.avatarUrl}
                  className="w-8 h-8 rounded-full"
                />
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
              <Button
                onClick={() => router.push("/signin")}
                variant="ghost"
                className="hover:bg-blue-100 font-semibold"
              >
                Sign In
              </Button>
            )}
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
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[600px] pt-4" : "max-h-0"
            }`}
        >
          <div className="flex flex-col gap-3 pb-4">

            <span
              onClick={() => handleNavClick("/")}
              className="text-sm text-gray-700 py-2 cursor-pointer"
            >
              Home
            </span>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-400">
                Message
              </span>
              <span
                onClick={() => handleNavClick("/send")}
                className="text-sm text-gray-700 py-2 cursor-pointer pl-3"
              >
                Send
              </span>
              <span
                onClick={() => handleNavClick("/explore")}
                className="text-sm text-gray-700 py-2 cursor-pointer pl-3"
              >
                Explore
              </span>
              <span
                onClick={() => handleNavClick("/history")}
                className="text-sm text-gray-700 py-2 cursor-pointer pl-3"
              >
                History
              </span>
            </div>

            <span
              onClick={() => handleNavClick("/articles")}
              className="text-sm text-gray-700 py-2 cursor-pointer"
            >
              Articles
            </span>

            <span
              onClick={() => handleNavClick("/events")}
              className="text-sm text-gray-700 py-2 cursor-pointer"
            >
              Events
            </span>

            <span
              onClick={() => handleNavClick("/about-us")}
              className="text-sm text-gray-700 py-2 cursor-pointer"
            >
              About Us
            </span>
          </div>
        {/* MOBILE AUTH SECTION */}
        <div className="border-t mt-4 pt-4">
          {user ? (
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Avatar
                  name={user.name}
                  src={user.avatarUrl}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-sm">{user.name}</span>
              </div>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-1 text-red-500 text-sm font-medium hover:opacity-80"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="px-4">
              <Button
                onClick={() => router.push("/signin")}
                className="w-full font-semibold"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
        </nav>


        {/* LOGOUT MODAL */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-[360px] bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-2">Logout</h2>
              <p className="text-sm text-gray-600 mb-6">
                Kamu akan keluar dari akun ini.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Batal
                </Button>
                <Button
                  className="w-1/2 bg-black text-white"
                  onClick={() => {
                    logout();
                    setShowLogoutModal(false);
                  }}
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