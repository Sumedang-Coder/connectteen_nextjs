"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Shield, Lock, User, ArrowRight, Loader2 } from "lucide-react";

function JoinAdminContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(false);
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
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-slate-400" size={40} />
            </div>
        );
    }

    if (!isValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Invalid or Expired Link</h2>
                    <p className="text-slate-500 mt-2">This invitation link is no longer valid. Please contact your administrator for a new invite.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-8 w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-inter">
            <div className="max-w-md w-full">
                {/* Logo or Brand */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="bg-slate-900 p-2 rounded-lg">
                        <Shield className="text-white" size={24} />
                    </div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">ConnectTeen</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden shadow-slate-200/50 border border-slate-100">
                    <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Activate Admin Access</h2>
                        <p className="text-slate-500 text-sm mt-1">Invitation for <span className="font-bold text-slate-900">{adminData?.email}</span></p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-wider mt-3">
                            Role: {adminData?.role.replace("_", " ")}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <User size={14} /> Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your full name"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Lock size={14} /> Password
                            </label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Min. 8 characters"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Lock size={14} /> Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="Repeat password"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-900/10 disabled:opacity-50"
                        >
                            {submitting ? "Activating..." : (
                                <>
                                    <span>Activate My Account</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-400 text-xs mt-8">
                    Safe & Secure Administrative Activation &bull; ConnectTeen Portal
                </p>
            </div>
        </div>
    );
}

export default function JoinAdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-slate-400" size={40} /></div>}>
            <JoinAdminContent />
        </Suspense>
    );
}
