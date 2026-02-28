"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Shield, Lock, User, ArrowRight, Loader2, ShieldCheck, ChevronLeft, EyeOff, Eye } from "lucide-react";
import Link from "next/link";

function JoinAdminContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [adminData, setAdminData] = useState<{ email: string; role: string } | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setIsValid(false);
            return;
        }

        const validateToken = async () => {
            try {
                const res = await api.get(`/admin/validate-invite?token=${token}`);
                if (res.data.success) {
                    setIsValid(true);
                    setAdminData(res.data.data);
                }
            } catch (err) {
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setSubmitting(true);
            const res = await api.post("/admin/join", {
                token,
                name: formData.name,
                password: formData.password
            });

            if (res.data.success) {
                toast.success("Account activated! Redirecting to login...");
                setTimeout(() => router.push("/signin-admin"), 2000);
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Activation failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Verifying invitation...</p>
            </div>
        );
    }

    if (!isValid) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-display relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-100/50 rounded-full blur-[120px] z-0" />

                <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white p-10 text-center z-10">
                    <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <Lock size={36} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Link Expired</h2>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
                        This invitation link is invalid or has expired. Please request a new invite from your administrator.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/10 flex items-center justify-center gap-2 group"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Platform</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10 font-display relative overflow-hidden">
            {/* Background Decorative Blurs */}
            <div className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] z-0" />
            <div className="absolute bottom-0 left-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] z-0" />

            <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white flex overflow-hidden min-h-[600px] z-10">
                {/* Left Side: Visual Area */}
                <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60"
                        style={{ backgroundImage: "url('/img/admin_auth_bg_v2.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="relative z-10 mt-auto p-12">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <ShieldCheck className="text-white" size={18} />
                            </div>
                            <span className="text-xs font-black text-white uppercase tracking-widest">ConnectTeen Admin</span>
                        </div>
                        <h2 className="text-4xl font-black text-white leading-tight tracking-tight mb-4 text-balance">
                            Join the <br />Administrative Team.
                        </h2>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                            Complete your registration to start managing the ConnectTeen community ecosystem.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16">
                    <div className="w-full max-w-sm">
                        {/* Compact Logo */}
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                                <ShieldCheck className="text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">ConnectTeen</h1>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h2>
                            <p className="text-slate-500 text-sm font-medium">Invitation for: <span className="text-blue-600 font-bold">{adminData?.email}</span></p>
                            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                Role: {adminData?.role?.replace("_", " ")}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Set Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength={8}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Min. 8 characters"
                                        className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="Repeat password"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/10 flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
                            >
                                {submitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Activate Account</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors group"
                            >
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span>Platform Home</span>
                            </Link>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">&copy; 2026 CTEEN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JoinAdminPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Loading portal...</p>
            </div>
        }>
            <JoinAdminContent />
        </Suspense>
    );
}
