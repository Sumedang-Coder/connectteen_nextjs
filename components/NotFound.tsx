"use client";

import { Button } from "./ui/button";
import { SearchX, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NotFoundProps {
  title?: string;
  message?: string;
  backLink?: string;
  backText?: string;
  showHome?: boolean;
}

export default function NotFound({
  title = "Ups! Halaman Tidak Ditemukan",
  message = "Sepertinya halaman yang kamu cari tidak ada atau sudah dihapus.",
  backLink = "/",
  backText = "Kembali",
  showHome = true,
}: NotFoundProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center max-w-md"
      >
        <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
          <SearchX size={48} strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          {title}
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto min-w-[140px] rounded-xl border-gray-200"
          >
            <Link href={backLink} className="flex items-center gap-2">
              <ArrowLeft size={18} />
              {backText}
            </Link>
          </Button>

          {showHome && (
            <Button
              asChild
              className="w-full sm:w-auto min-w-[140px] rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
            >
              <Link href="/" className="flex items-center gap-2 text-white">
                <Home size={18} />
                Beranda
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
