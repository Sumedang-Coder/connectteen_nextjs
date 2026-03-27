"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { toast } from "sonner";
import { Mail, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const { forgotPassword } = useAuthStore();
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return toast.error("Masukkan email admin Anda");

        setIsSubmitting(true);
        try {
            const res = await forgotPassword(email.trim().toLowerCase());
            if (res.success) {
                setIsSent(true);
                toast.success("Link reset telah dikirim!");
            } else {
                toast.error(res.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-display">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-600/20 mb-6 border-4 border-white">
                        <ShieldCheck size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Lupa Sandi?</h1>
                    <p className="mt-2 text-slate-500 font-medium">Link reset akan dikirim ke email admin Anda.</p>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    {!isSent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                    Alamat Email Admin
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                        placeholder="admin@connectteen.id"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-900/10 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Kirim Link Reset</span>
                                        <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 py-4">
                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                <Mail size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-black text-slate-900">Email Terkirim!</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Silakan periksa kotak masuk email <strong>{email}</strong> untuk melanjutkan pengaturan ulang kata sandi.
                                </p>
                                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mt-3 font-semibold">
                                    ⚠️ Jika tidak menemukan email, coba cek folder <strong>Spam</strong> atau <strong>Junk</strong> Anda.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSent(false)}
                                className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest"
                            >
                                Gunakan Email Lain
                            </button>
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <Link
                        href="/signin-admin"
                        className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
