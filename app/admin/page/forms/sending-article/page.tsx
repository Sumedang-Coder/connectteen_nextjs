"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/app/admin/components/Layouts/showcase-section";
import { useArticleStore } from "@/app/store/useArticleStore";

export default function SendArticlePage() {
  const { createArticle, loading } = useArticleStore();

  const [form, setForm] = useState({ title: "", description: "" });
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
      toast.error("Ukuran gambar maksimal 1MB");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !file) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", file);

    const success = await createArticle(formData);

    if (success) {
      toast.success("Artikel berhasil dipublish");
      setForm({ title: "", description: "" });
      setFile(null);
      setPreview(null);
    } else {
      toast.error("Gagal publish artikel");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <Breadcrumb pageName="Send Article" />

      <div className="mx-auto max-w-3xl">
        <ShowcaseSection
          title="Membuat Artikel"
          className="space-y-6 rounded-b-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Judul Artikel
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Masukkan judul artikel"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                  text-gray-900 placeholder:text-gray-400 outline-none transition
                  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tulis isi artikel..."
                rows={6}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                  text-gray-900 placeholder:text-gray-400 outline-none transition
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
                  alt="Preview"
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
              {loading ? "Publishing..." : "Publish Article"}
            </button>
          </form>
        </ShowcaseSection>
      </div>
    </div>
  );
}
