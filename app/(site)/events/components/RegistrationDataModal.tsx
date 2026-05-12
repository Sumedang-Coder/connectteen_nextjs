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
import {
  Loader2,
  User,
  Phone,
  CheckCircle2,
  MapPin,
  Briefcase,
  Award,
  Heart,
} from "lucide-react";
import type { RegistrationFields } from "@/app/store/useEventStore";

const DEFAULT_FIELDS: RegistrationFields = {
  reg_name: true,
  reg_phone: true,
  reg_address: true,
  reg_occupation: true,
  reg_org_experience: true,
  reg_reason: true,
};

interface RegistrationDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (registrationData: Record<string, string>) => void;
  registrationFields?: RegistrationFields;
}

export default function RegistrationDataModal({
  isOpen,
  onClose,
  onSuccess,
  registrationFields,
}: RegistrationDataModalProps) {
  const { user, isAuthenticated, loginGuest, updateProfile } = useAuthStore();
  const fields = registrationFields || DEFAULT_FIELDS;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [orgExperience, setOrgExperience] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name && !user.name.startsWith("Anonymous") ? user.name : "");
      setPhone(user.no_hp || "");
    }
  }, [user]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAddress("");
      setOccupation("");
      setOrgExperience("");
      setReason("");
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (fields.reg_name) {
      if (!name.trim()) {
        newErrors.name = "Nama lengkap wajib diisi";
      } else if (name.trim().length < 3) {
        newErrors.name = "Nama minimal 3 karakter";
      }
    }

    // Phone validation (Indonesian format)
    if (fields.reg_phone) {
      const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,11}$/;
      if (!phone.trim()) {
        newErrors.phone = "Nomor WhatsApp wajib diisi";
      } else if (!phoneRegex.test(phone.trim().replace(/\s/g, ""))) {
        newErrors.phone = "Format nomor WhatsApp tidak valid (contoh: 0812xxxx)";
      }
    }

    // Address validation
    if (fields.reg_address) {
      if (!address.trim()) {
        newErrors.address = "Alamat domisili wajib diisi";
      }
    }

    // Occupation validation
    if (fields.reg_occupation) {
      if (!occupation) {
        newErrors.occupation = "Kesibukan wajib dipilih";
      }
    }

    // Org experience validation (optional - no required check)

    // Reason validation
    if (fields.reg_reason) {
      if (!reason.trim()) {
        newErrors.reason = "Alasan minat/bakat wajib diisi";
      }
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

      // 2. Update user profile with name and phone (core data)
      if (name.trim() || phone.trim()) {
        const res = await updateProfile({
          name: name.trim(),
          no_hp: phone.trim(),
        });
        if (!res.success) throw new Error(res.message);
      }

      // 3. Build registration data to pass to the parent
      const registrationData: Record<string, string> = {};
      if (fields.reg_name) registrationData.reg_name = name.trim();
      if (fields.reg_phone) registrationData.reg_phone = phone.trim();
      if (fields.reg_address) registrationData.reg_address = address.trim();
      if (fields.reg_occupation) registrationData.reg_occupation = occupation;
      if (fields.reg_org_experience)
        registrationData.reg_org_experience = orgExperience.trim();
      if (fields.reg_reason) registrationData.reg_reason = reason.trim();

      toast.success("Data berhasil disimpan!");
      onSuccess(registrationData);
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Count active fields to decide layout
  const activeFieldCount = Object.values(fields).filter(Boolean).length;
  const hasNoFields = activeFieldCount === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 size={24} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Lengkapi Data Pendaftaran
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Harap lengkapi data berikut agar Admin dapat menghubungi Anda
            mengenai detail event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Nama Lengkap */}
          {fields.reg_name && (
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
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: undefined as any }));
                }}
                placeholder="Masukkan nama lengkap Anda"
                className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.name ? "border-red-500" : "border-slate-200"} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`}
              />
              {errors.name && (
                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">
                  {errors.name}
                </p>
              )}
            </div>
          )}

          {/* No. HP / WhatsApp */}
          {fields.reg_phone && (
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
                  if (errors.phone)
                    setErrors((prev) => ({ ...prev, phone: undefined as any }));
                }}
                placeholder="Contoh: 08123456789"
                className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.phone ? "border-red-500" : "border-slate-200"} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`}
              />
              {errors.phone && (
                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          {/* Alamat Domisili */}
          {fields.reg_address && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={14} className="text-slate-400" />
                Alamat Domisili
              </label>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address)
                    setErrors((prev) => ({
                      ...prev,
                      address: undefined as any,
                    }));
                }}
                placeholder="Masukkan alamat domisili Anda saat ini"
                rows={2}
                className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.address ? "border-red-500" : "border-slate-200"} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none`}
              />
              {errors.address && (
                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">
                  {errors.address}
                </p>
              )}
            </div>
          )}

          {/* Kesibukan */}
          {fields.reg_occupation && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase size={14} className="text-slate-400" />
                Kesibukan Saat Ini
              </label>
              <select
                value={occupation}
                onChange={(e) => {
                  setOccupation(e.target.value);
                  if (errors.occupation)
                    setErrors((prev) => ({
                      ...prev,
                      occupation: undefined as any,
                    }));
                }}
                className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.occupation ? "border-red-500" : "border-slate-200"} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none`}
              >
                <option value="">— Pilih kesibukan —</option>
                <option value="sekolah">Sekolah</option>
                <option value="kuliah">Kuliah</option>
                <option value="kerja">Kerja</option>
              </select>
              {errors.occupation && (
                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">
                  {errors.occupation}
                </p>
              )}
            </div>
          )}

          {/* Pengalaman Organisasi */}
          {fields.reg_org_experience && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Award size={14} className="text-slate-400" />
                Pengalaman Organisasi
                <span className="text-[10px] text-slate-400 font-normal ml-1">
                  (opsional)
                </span>
              </label>
              <textarea
                value={orgExperience}
                onChange={(e) => setOrgExperience(e.target.value)}
                placeholder="Ceritakan pengalaman organisasi Anda (nama organisasi, jabatan, periode)"
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          )}

          {/* Alasan / Minat / Bakat */}
          {fields.reg_reason && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Heart size={14} className="text-slate-400" />
                Alasan / Minat / Bakat
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (errors.reason)
                    setErrors((prev) => ({
                      ...prev,
                      reason: undefined as any,
                    }));
                }}
                placeholder="Apa alasan Anda tertarik mengikuti event ini? Ceritakan juga minat atau bakat yang relevan"
                rows={3}
                className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.reason ? "border-red-500" : "border-slate-200"} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none`}
              />
              {errors.reason && (
                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">
                  {errors.reason}
                </p>
              )}
            </div>
          )}

          {hasNoFields && (
            <div className="text-center py-6 text-slate-400 text-sm">
              Tidak ada data tambahan yang diperlukan untuk event ini.
            </div>
          )}

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
