"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { toast } from "sonner";
import { 
    Lock, 
    ShieldCheck, 
    Loader2, 
    Eye, 
    EyeOff, 
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const { resetPassword, loading } = useAuthStore();
    
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error("Token tidak ditemukan. Silakan minta link reset baru.");
            router.push("/forgot-password");
        }
    }, [token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Password tidak cocok");
        }

        if (formData.password.length < 6) {
            return toast.error("Password minimal 6 karakter");
        }

        setIsSubmitting(true);
        try {
            const res = await resetPassword(token || "", formData.password);
            if (res.success) {
                toast.success("Password berhasil diperbarui!");
                setIsSuccess(true);
                setTimeout(() => {
                    router.push("/signin-admin");
                }, 3000);
            } else {
                toast.error(res.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 text-center space-y-6 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Berhasil!</h2>
                    <p className="text-slate-500 font-medium font-display">Password Anda telah diperbarui. Mengalihkan ke halaman login...</p>
                </div>
                <Link 
                    href="/signin-admin"
                    className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]"
                >
                    Login Sekarang <ArrowRight size={14} />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">
                        Password Baru
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">
                        Konfirmasi Password
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black text-blue-700 uppercase tracking-widest">
                        <ShieldCheck size={14} />
                        Security Requirement
                    </div>
                    <p className="text-[11px] text-blue-600/80 font-medium">Gunakan minimal 6 karakter dengan kombinasi huruf dan angka.</p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !token}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-900/10 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <span>Simpan Password Baru</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-display">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-600/20 mb-6 border-4 border-white">
                        <Lock size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Reset Password</h1>
                    <p className="mt-2 text-slate-500 font-medium">Buat kata sandi baru yang kuat untuk akun admin Anda.</p>
                </div>

                <Suspense fallback={
                    <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center justify-center">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                    </div>
                }>
                    <ResetPasswordForm />
                </Suspense>

                <div className="text-center">
                    <Link 
                        href="/signin-admin" 
                        className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                    >
                        Batal & Kembali ke Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
