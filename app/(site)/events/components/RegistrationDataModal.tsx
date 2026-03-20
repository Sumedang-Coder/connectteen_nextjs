"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/app/store/useAuthStore";
import { toast } from "sonner";
import { Loader2, User, Phone, CheckCircle2 } from "lucide-react";

interface RegistrationDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegistrationDataModal({
  isOpen,
  onClose,
  onSuccess,
}: RegistrationDataModalProps) {
  const { user, isAuthenticated, loginGuest, updateProfile } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name && !user.name.startsWith("Anonymous") ? user.name : "");
      setPhone(user.no_hp || "");
    }
  }, [user]);

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    // Name validation
    if (!name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    } else if (name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }

    // Phone validation (Indonesian format)
    const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,11}$/;
    if (!phone.trim()) {
      newErrors.phone = "Nomor WhatsApp wajib diisi";
    } else if (!phoneRegex.test(phone.trim().replace(/\s/g, ''))) {
      newErrors.phone = "Format nomor WhatsApp tidak valid (contoh: 0812xxxx)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // 1. If not authenticated, do guest login first
      if (!isAuthenticated) {
        const success = await loginGuest();
        if (!success) throw new Error("Gagal masuk sebagai tamu");
      }

      // 2. Update profile with name and phone
      const res = await updateProfile({ name: name.trim(), no_hp: phone.trim() });
      if (!res.success) throw new Error(res.message);

      toast.success("Data berhasil disimpan!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 size={24} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">Lengkapi Data Pendaftaran</DialogTitle>
          <DialogDescription className="text-slate-500">
            Harap lengkapi data berikut agar Admin dapat menghubungi Anda mengenai detail event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <User size={14} className="text-slate-400" />
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Masukkan nama lengkap Anda"
              className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`}
            />
            {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Phone size={14} className="text-slate-400" />
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="Contoh: 08123456789"
              className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`}
            />
            {errors.phone && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.phone}</p>}
          </div>

          <DialogFooter className="pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-transparent rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Simpan & Daftar"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
