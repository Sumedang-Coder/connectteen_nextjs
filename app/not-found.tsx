"use client";

import NotFound from "@/components/NotFound";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <NotFound 
        title="Halaman Tidak Ditemukan"
        message="Maaf, halaman yang kamu cari tidak dapat ditemukan. Mungkin link-nya salah atau halamannya sudah dipindah."
        backText="Beranda"
      />
    </div>
  );
}
