"use client";

import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

interface AuthProps {
  onClick?: () => void;
}

export default function Auth({ onClick }: AuthProps) {
  const [mounted, setMounted] = useState(false);
  const { loginGuest, loading, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    // Save callbackUrl to localStorage if present in URL
    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      localStorage.setItem("callbackUrl", callbackUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = searchParams.get("callbackUrl") || localStorage.getItem("callbackUrl") || "/";
      localStorage.removeItem("callbackUrl");
      router.push(callbackUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleGuestLogin = async () => {
    toast.loading("Masuk sebagai tamu...", { id: "guest-login" });
    const success = await loginGuest();
    if (success) {
      toast.success("Berhasil masuk sebagai tamu!", { id: "guest-login" });
    } else {
      toast.error("Gagal masuk sebagai tamu. Silakan coba lagi.", { id: "guest-login" });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-start pt-24 md:pt-0 md:items-center justify-center
      bg-linear-to-br from-cyan-100 via-blue-100 to-white px-10
      transition-all duration-500 ease-out
      ${mounted ? "opacity-100 translate-0" : "opacity-0 -translate-y-6"}`}
    >
      <div className="w-full max-w-lg animate-fade-in bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-30 h-30 rounded-full bg-gray-100 flex items-center justify-center shadow">
            <LuUser className="text-7xl text-gray-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Sign in
          </h1>

          <p className="text-sm text-gray-500 text-center">
            Pilih metode masuk ke akun
          </p>
        </div>

        {/* Google Login */}
        <a href={`${process.env.NEXT_PUBLIC_API_URL || "https://connectteen-server.vercel.app/api"}/auth/google`}>
          <button
            className="
              w-full flex items-center justify-center gap-3
              bg-white border border-gray-300
              rounded-xl px-4 py-3
              font-semibold text-gray-700
              hover:bg-gray-50 hover:shadow-md
              active:scale-95 transition cursor-pointer
            "
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </a>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Guest Login */}
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="
            w-full flex items-center justify-center gap-2
            bg-gray-800 text-white
            rounded-xl px-4 py-3
            font-semibold
            hover:bg-gray-700
            active:scale-95 transition
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer  
          "
        >
          Masuk sebagai Tamu
        </button>

        <p className="text-xs text-gray-400 text-center">
          Mode tamu memiliki akses terbatas
        </p>

      </div>
    </div>
  );
}
