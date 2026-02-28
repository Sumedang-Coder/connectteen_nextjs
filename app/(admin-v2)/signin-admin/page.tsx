"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    ChevronLeft,
    CheckCircle2
} from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/app/store/useAuthStore";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminSigninPage() {
    const router = useRouter();
    const { setUser } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/auth/admin/login", { email, password });

            if (res.data.success) {
                toast.success("Welcome back, Admin!");
                setUser(res.data.user);
                router.push("/dashboard");
            } else {
                toast.error(res.data.message || "Login failed");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10 font-display relative overflow-hidden">
            {/* Background Decorative Blurs */}
            <div className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] z-0" />
            <div className="absolute bottom-0 left-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] z-0" />

            <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white flex overflow-hidden min-h-[600px] z-10">
                {/* Left Side: Visual Area (Hidden on mobile) */}
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
                            Empowering Youth <br />Communities Globally.
                        </h2>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                            Manage articles, events, and private communications from a single dashboard.
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
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Admin Sign In</h2>
                            <p className="text-slate-500 text-sm font-medium">Log in to access your administrative dashboard.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm"
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/10 flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Log In to Dashboard</span>
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
                                <span>Return Home</span>
                            </Link>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">&copy; 2026 CTEEN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
