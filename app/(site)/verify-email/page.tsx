"use client";

import { useState, useEffect, Suspense } from "react";
import { LuMail, LuRefreshCw, LuShieldCheck, LuAlertCircle } from "react-icons/lu";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const router = useRouter();
    const { verifyEmail, resendVerification, loading } = useAuthStore();

    const [otp, setOtp] = useState("");
    const [cooldown, setCooldown] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!email) {
            router.push("/register");
        }
    }, [email, router]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            return toast.error("Masukkan 6 digit kode OTP");
        }

        const res = await verifyEmail(email!, otp);
        if (res.success) {
            toast.success("Email berhasil diverifikasi!");
            router.push("/");
        } else {
            toast.error(res.message);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;

        const res = await resendVerification(email!);
        if (res.success) {
            toast.success("Kode baru telah dikirim!");
            setCooldown(60);
        } else {
            toast.error(res.message);
        }
    };

    if (!email && mounted) return null;

    return (
        <div
            className={`min-h-screen flex items-center justify-center
            bg-slate-50 px-6 py-12 transition-all duration-500 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100 text-center">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center shadow-inner mb-2">
                        <LuMail className="text-4xl text-blue-600 animate-bounce" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Verifikasi Email</h1>
                        <p className="text-slate-500 font-medium mt-2">
                            Kami telah mengirimkan 6 digit kode ke <br />
                            <span className="text-slate-900 font-bold">{email}</span>
                        </p>
                    </div>
                </div>

                <form onSubmit={handleVerify} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            placeholder="000000"
                            className="w-full text-center text-5xl font-black tracking-[1rem] py-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-200"
                        />
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-2">
                            Masukkan 6 Digit Kode OTP
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <LuRefreshCw size={20} className="animate-spin" /> : <LuShieldCheck size={20} />}
                        <span>Verifikasi Sekarang</span>
                    </button>
                </form>

                <div className="mt-10 flex flex-col items-center gap-6">
                    <div className="h-px w-full bg-slate-100" />
                    
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-slate-500 font-medium">Tidak menerima kode?</p>
                        <button
                            onClick={handleResend}
                            disabled={cooldown > 0 || loading}
                            className={`flex items-center justify-center gap-2 font-bold transition-all ${cooldown > 0 ? "text-slate-300 cursor-not-allowed" : "text-blue-600 hover:text-blue-700 underline underline-offset-4"}`}
                        >
                            {cooldown > 0 ? (
                                <>
                                    <LuAlertCircle size={16} />
                                    <span>Kirim ulang dalam {cooldown}s</span>
                                </>
                            ) : (
                                "Kirim Ulang Kode"
                            )}
                        </button>
                    </div>

                    <Link href="/register" className="text-sm text-slate-400 font-medium hover:text-slate-600 transition-colors">
                        Bukan email Anda? Daftar ulang
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
