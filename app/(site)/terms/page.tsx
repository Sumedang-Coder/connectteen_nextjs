"use client";

import { FileText, Scale, Zap, ArrowLeft, ChevronRight, Gavel } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
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
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Gavel className="text-white" size={16} />
                        </div>
                        <span className="text-sm font-black text-slate-900 tracking-tighter">ConnectTeen</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6 border border-indigo-100 shadow-sm">
                        <Scale size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 text-balance">Ketentuan Layanan</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Terakhir diperbarui: 27 Maret 2026. Dengan menggunakan ConnectTeen, Anda setuju untuk mematuhi aturan dan kebijakan kami.
                    </p>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="p-8 md:p-12 space-y-12 text-slate-600 leading-relaxed font-medium">
                        
                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm">01</div>
                                Penerimaan Ketentuan
                            </h2>
                            <p>
                                Dengan mengakses atau menggunakan platform <strong>ConnectTeen</strong>, Anda secara sadar setuju untuk terikat oleh Ketentuan Layanan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, mohon untuk tidak menggunakan layanan kami. Ketentuan ini berlaku untuk seluruh pengguna, baik pengunjung umum maupun administrator terdaftar.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm">02</div>
                                Penggunaan Layanan yang Sah
                            </h2>
                            <p>
                                Anda setuju untuk menggunakan ConnectTeen hanya untuk tujuan yang sah dan sesuai dengan misi kami untuk memberdayakan remaja. Berikut hal-hal yang dilarang:
                            </p>
                            <ul className="list-disc pl-6 space-y-3">
                                <li><strong>Pelanggaran Hukum:</strong> Menggunakan platform untuk kegiatan yang melanggar hukum lokal atau internasional.</li>
                                <li><strong>Penyalahgunaan Data:</strong> Melakukan scraping data atau mencoba masuk ke area administrator tanpa otorisasi yang sah.</li>
                                <li><strong>Konten Berbahaya:</strong> Mengunggah konten yang mengandung malware, virus, atau kode berbahaya lainnya.</li>
                                <li><strong>Hate Speech:</strong> Mengirimkan pesan atau mempublikasikan artikel yang mengandung ujaran kebencian, diskriminasi, atau perundungan (bullying).</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm">03</div>
                                Konten Buatan Pengguna
                            </h2>
                            <p>
                                Administrator bertanggung jawab penuh atas artikel dan acara yang dipublikasikan. ConnectTeen berhak untuk menghapus konten yang dianggap melanggar kebijakan komunitas atau Ketentuan Layanan ini tanpa pemberitahuan sebelumnya. Dengan mempublikasikan konten, Anda memberikan ConnectTeen hak non-eksklusif untuk menampilkan konten tersebut di seluruh platform kami demi kepentingan misi komunitas.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm">04</div>
                                Batasan Tanggung Jawab
                            </h2>
                            <p>
                                Sejauh diizinkan oleh hukum, ConnectTeen tidak bertanggung jawab atas kerugian langsung atau tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami. Kami berusaha menjaga performa platform tetap optimal, namun kami tidak menjamin layanan akan bebas dari interupsi atau kesalahan (error).
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm">05</div>
                                Perubahan Ketentuan
                            </h2>
                            <p>
                                Kami berhak untuk mengubah Ketentuan Layanan ini kapan saja. Kami akan memberikan notifikasi melalui platform atau email jika terdapat perubahan signifikan. Penggunaan platform yang berkelanjutan setelah perubahan tersebut menandakan penerimaan Anda terhadap ketentuan baru tersebut.
                            </p>
                        </section>

                        <section className="space-y-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                            <h2 className="text-lg font-black text-indigo-950 flex items-center gap-2">
                                <Zap size={18} className="text-indigo-600" />
                                Kesepakatan Akhir
                            </h2>
                            <p className="text-sm">
                                Ketentuan ini merupakan keseluruhan kesepakatan antara Anda dan ConnectTeen terkait penggunaan platform kami. Jika Anda memiliki saran atau keberatan, silakan ajukan melalui kontak resmi kami.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="mt-12 text-center text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-6">
                    <Link href="/privacy" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</Link>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <span>ConnectTeen &copy; 2026</span>
                </div>
            </div>
        </div>
    );
}
