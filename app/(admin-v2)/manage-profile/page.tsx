"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import api from "@/lib/axios";
import { toast } from "sonner";
import { 
    User, 
    Mail, 
    Lock, 
    Save, 
    ShieldCheck, 
    Loader2, 
    Camera, 
    ChevronRight,
    Key
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManageProfilePage() {
    const { user, setUser, forgotPassword, loading: authLoading } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || ""
            }));
            if (user.avatarUrl) {
                setImagePreview(user.avatarUrl);
            }
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                return toast.error("File terlalu besar (maksimal 5MB)");
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const [isResetSent, setIsResetSent] = useState(false);

    const handleRequestReset = async () => {
        if (!user?.email) return;
        
        setLoading(true);
        const res = await forgotPassword(user.email);
        setLoading(false);

        if (res.success) {
            toast.success("Link reset password telah dikirim!");
            setIsResetSent(true);
        } else {
            toast.error(res.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = new FormData();
            data.append("name", formData.name);
            
            if (imageFile) {
                data.append("image", imageFile);
            }

            const res = await api.put(`/admin/${user?.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                toast.success("Profil berhasil diperbarui");
                setUser(res.data.data);
                setImageFile(null);
            }
        } catch (error: any) {
            console.error("Update profile failed:", error);
            const message = error.response?.data?.message || "Gagal memperbarui profil";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header / Breadcrumb */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-slate-500">
                        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                            Admin
                        </Link>
                        <ChevronRight size={14} className="mx-1" />
                        <span className="text-slate-900 font-medium">Manage Profile</span>
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Welcome Section */}
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pengaturan Profil</h1>
                        <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Kelola informasi akun dan identitas visual administrator Anda.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Avatar Column */}
                        <div className="lg:col-span-1 flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-48 h-48 rounded-3xl bg-white p-1.5 shadow-xl border border-slate-100 overflow-hidden">
                                    <div className="w-full h-full rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={64} />
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-4 -right-4 p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/40 hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all z-10"
                                >
                                    <Camera size={20} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <div className="mt-8 text-center px-4 py-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-700">
                                    <ShieldCheck size={14} />
                                    {user.role.replace('_', ' ')}
                                </span>
                            </div>
                            <p className="mt-4 text-[11px] text-slate-400 text-center font-medium leading-relaxed max-w-[150px]">
                                Disarankan gambar 1:1, maksimal 5MB.
                            </p>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    Informasi Dasar
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-700 placeholder:text-slate-400"
                                                placeholder="Nama lengkap Anda"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                            Alamat Email (Locked)
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                readOnly
                                                disabled
                                                className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-slate-400 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Keamanan Akun</h3>
                                    <ShieldCheck className="text-blue-600" size={20} />
                                </div>
                                <p className="text-sm text-slate-500 font-medium">
                                    Untuk keamanan sistem, perubahan kata sandi dilakukan melalui link verifikasi yang dikirim ke email admin Anda.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleRequestReset}
                                    disabled={loading || authLoading}
                                    className="w-full py-4 bg-slate-50 border-2 border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-100 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                                >
                                    <Mail size={18} />
                                    {isResetSent ? "Kirim Ulang Link Reset" : "Kirim Link Reset Password"}
                                </button>
                                {isResetSent && (
                                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-xs text-amber-700 font-bold flex items-start gap-2">
                                            <span className="text-sm">⚠️</span>
                                            <span>Email terkirim! Jika tidak menemukannya, silakan cek folder <strong>Spam</strong> atau <strong>Junk</strong> admin@connectteenedu.com.</span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading || authLoading}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-900/20 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {loading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <Save size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                                    )}
                                    <span>Simpan Perubahan</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
