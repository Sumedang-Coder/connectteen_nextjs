"use client";

import { Shield, Lock, Eye, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-display">
            {/* Header / Navigation */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={18} />
                        <span className="text-sm font-bold">Kembali ke Beranda</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="text-white" size={16} />
                        </div>
                        <span className="text-sm font-black text-slate-900 tracking-tighter">ConnectTeen</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6 border border-blue-100 shadow-sm">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Kebijakan Privasi</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Terakhir diperbarui: 27 Maret 2026. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.
                    </p>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="p-8 md:p-12 space-y-12 text-slate-600 leading-relaxed font-medium">
                        
                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-sm">01</div>
                                Pendahuluan
                            </h2>
                            <p>
                                Selamat datang di <strong>ConnectTeen</strong>. Kami berkomitmen untuk melindungi dan menghormati privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan platform kami, termasuk website dan layanan terkait. 
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-sm">02</div>
                                Informasi yang Kami Kumpulkan
                            </h2>
                            <p>
                                Kami mengumpulkan beberapa jenis informasi untuk menyediakan dan meningkatkan layanan kami kepada Anda:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Informasi Identitas:</strong> Nama lengkap, alamat email, dan nomor telepon yang Anda berikan saat mendaftar atau saat administrator mengundang Anda.</li>
                                <li><strong>Informasi Akun:</strong> Kata sandi (yang dienkripsi), peran pengguna (role), dan pengaturan profil.</li>
                                <li><strong>Konten Pengguna:</strong> Artikel, berita, dan acara yang Anda publikasikan di platform.</li>
                                <li><strong>Informasi Otomatis:</strong> Alamat IP, jenis perangkat, dan data penggunaan melalui log server kami.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-sm">03</div>
                                Bagaimana Kami Menggunakan Data Anda
                            </h2>
                            <p>Data Anda digunakan untuk tujuan berikut:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Menyediakan dan memelihara fitur platform ConnectTeen.</li>
                                <li>Mengirimkan notifikasi penting seperti link reset password atau undangan admin.</li>
                                <li>Mengelola identitas anonim untuk melindungi privasi pengirim pesan rahasia.</li>
                                <li>Menganalisis penggunaan untuk pengembangan fitur di masa depan.</li>
                                <li>Mencegah penyalahgunaan atau aktivitas ilegal di platform.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-sm">04</div>
                                Keamanan Data
                            </h2>
                            <p>
                                Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang ketat untuk melindungi data Anda. Ini termasuk enkripsi data sensitif (seperti password menggunakan bcrypt), penggunaan HTTPS untuk semua transmisi data, dan pembatasan akses hanya kepada personil yang berwenang.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-sm">05</div>
                                Hak Anda
                            </h2>
                            <p>
                                Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda yang kami miliki. Anda dapat mengelola sebagian besar informasi ini melalui halaman Profil Admin Anda. Untuk permintaan penghapusan akun atau pertanyaan lainnya, silakan hubungi tim dukungan teknis kami.
                            </p>
                        </section>

                        <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h2 className="text-xl font-black text-slate-900">Hubungi Kami</h2>
                            <p className="text-sm">
                                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui email di: <br />
                                <strong className="text-blue-600">admin@connectteenedu.com</strong>
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="mt-12 text-center text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-6">
                    <Link href="/terms" className="hover:text-blue-600 transition-colors">Ketentuan Layanan</Link>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <span>ConnectTeen &copy; 2026</span>
                </div>
            </div>
        </div>
    );
}
