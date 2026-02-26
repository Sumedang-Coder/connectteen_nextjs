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
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-display">
            {/* Left Side: Visual Immersive Area */}
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-slate-900 relative overflow-hidden group">
                {/* Background Image with sophisticated zoom effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] group-hover:scale-110"
                    style={{ backgroundImage: "url('/img/admin_auth_bg.png')" }}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full p-16 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight">ConnectTeen Architecture</span>
                    </div>

                    <div className="max-w-xl">
                        <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter mb-6">
                            Secure <br />Management <br />System.
                        </h2>
                        <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10">
                            Empowering community administrators with advanced analytical tools and centralized control. Log in to manage your digital ecosystem.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-blue-400">
                                    <CheckCircle2 size={18} />
                                    <span className="text-sm font-bold uppercase tracking-widest leading-none mt-0.5">Real-time Analytics</span>
                                </div>
                                <p className="text-slate-400 text-xs">Monitor user engagement as it happens across the platform.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-blue-400">
                                    <CheckCircle2 size={18} />
                                    <span className="text-sm font-bold uppercase tracking-widest leading-none mt-0.5">Secure Protocol</span>
                                </div>
                                <p className="text-slate-400 text-xs">Multi-layered authentication and encrypted data transmission.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-8">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Authorized Access Only</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">&copy; 2026 CTEEN ADM-V2</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Form Area */}
            <div className="flex-1 flex flex-col bg-white">
                <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-24">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo (Visible only on small screens) */}
                        <div className="flex md:hidden items-center gap-3 mb-10">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="text-white" size={24} />
                            </div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">ConnectTeen</h1>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Sign in</h2>
                            <p className="text-slate-500 font-medium">Please enter your administrative credentials.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-blue-600 transition-colors">
                                    Administration Email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 flex items-center justify-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@connectteen.com"
                                        className="w-full pl-10 pr-4 py-4 bg-transparent border-b-2 border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-600 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-blue-600 transition-colors">
                                        Security Code
                                    </label>
                                    <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                                        Reset?
                                    </button>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 flex items-center justify-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-4 bg-transparent border-b-2 border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-600 transition-all text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/20 flex items-center justify-center gap-3 group disabled:opacity-50"
                                >
                                    {loading ? (
                                        "Verifying Protocol..."
                                    ) : (
                                        <>
                                            <span>Enter Portal</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-20">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors group"
                            >
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span>Return to platform</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer only for mobile/tablet */}
                <div className="md:hidden p-8 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        &copy; 2026 Architecture. Secured by CTEEN.
                    </p>
                </div>
            </div>
        </div>
    );
}
