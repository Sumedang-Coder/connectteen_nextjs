"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/app/admin/components/Layouts/showcase-section";
import { useEventStore } from "@/app/store/useEventStore";

export default function SendEventPage() {
  const { createEvent, loading } = useEventStore();

  const [form, setForm] = useState({
    event_title: "",
    description: "",
    location: "",
    date: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const MAX_SIZE = 4 * 1024 * 1024;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_SIZE) {
      toast.error("Ukuran gambar maksimal 4MB");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.event_title ||
      !form.description ||
      !form.location ||
      !form.date ||
      !file
    ) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("event_title", form.event_title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("date", form.date);
    formData.append("image", file);

    const success = await createEvent(formData);

    if (success) {
      toast.success("Event berhasil dipublish");
      setForm({
        event_title: "",
        description: "",
        location: "",
        date: "",
      });
      setFile(null);
      setPreview(null);
    } else {
      toast.error("Gagal publish event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <Breadcrumb pageName="Send Event" />

      <div className="mx-auto max-w-3xl">
        <ShowcaseSection
          title="Membuat Event"
          className="space-y-6 rounded-b-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul Event */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Judul Event
              </label>
              <input
                type="text"
                name="event_title"
                value={form.event_title}
                onChange={handleChange}
                placeholder="Masukkan judul event"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                  placeholder:text-gray-400 outline-none transition
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deskripsi Event
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tulis deskripsi event..."
                rows={6}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                  placeholder:text-gray-400 outline-none transition
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Lokasi */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Lokasi
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Contoh: Jakarta, Zoom, Aula Sekolah"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                  placeholder:text-gray-400 outline-none transition
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Tanggal */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tanggal Event
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                  outline-none transition
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Upload Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Upload Gambar
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full cursor-pointer rounded-xl border border-gray-300
                  bg-white px-4 py-3 text-gray-600
                  file:mr-4 file:rounded-lg file:border-0
                  file:bg-cyan-500 file:px-4 file:py-2
                  file:text-sm file:font-semibold file:text-white
                  hover:file:bg-cyan-600"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <Image
                  src={preview}
                  alt="Preview Event"
                  width={800}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-cyan-500 py-3
                font-semibold text-white transition hover:bg-cyan-600
                disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Event"}
            </button>
          </form>
        </ShowcaseSection>
      </div>
    </div>
  );
}
