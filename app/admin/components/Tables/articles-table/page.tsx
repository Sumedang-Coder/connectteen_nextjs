"use client";

import { TrashIcon } from "@/app/admin/assets/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/admin/components/ui/table";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useArticleStore, Article } from "@/app/store/useArticleStore";
import Loader from "@/components/Loader";

export default function ArticleTable() {
  const { articles, fetchArticles, deleteArticle, updateArticle, loading } = useArticleStore();

  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_file: null as File | null,
    preview: "" as string | null,
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Apakah kamu yakin ingin menghapus artikel ini?");
    if (!confirmed) return;

    const success = await deleteArticle(id);
    if (success) toast.success("Artikel berhasil dihapus");
    else toast.error("Gagal menghapus artikel");
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setForm({
      title: article.title,
      description: article.description,
      image_file: null,
      preview: article.image_url || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingArticle) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image_file) formData.append("image", form.image_file);

    const success = await updateArticle(editingArticle.id, formData);
    if (success) {
      toast.success("Artikel berhasil diupdate");
      fetchArticles(); // refresh tabel
      setShowModal(false);
    } else {
      toast.error("Gagal update artikel");
    }
  };

  if (loading) return <Loader size="sm" />;

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      {/* Modal Edit */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 ${
          showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } duration-300`}
        onClick={() => setShowModal(false)}
      >
        <div
          className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-y-auto p-4 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Edit Artikel</h3>

            {/* Judul */}
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              placeholder="Judul"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            {/* Deskripsi */}
            <textarea
              className="border rounded-md p-2 w-full"
              placeholder="Deskripsi"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {/* Gambar */}
            <input
              type="file"
              accept="image/*"
              className="border rounded-md p-2 w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setForm({
                    ...form,
                    image_file: file,
                    preview: URL.createObjectURL(file),
                  });
                }
              }}
            />
            {form.preview && (
              <Image
                src={form.preview}
                alt="Preview"
                width={200}
                height={120}
                className="rounded-md object-cover"
              />
            )}

            {/* Tombol Simpan */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
                onClick={handleSave}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Judul</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Gambar</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles.map((item) => (
            <TableRow key={item.id} className="border-[#eee] dark:border-dark-3">
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.title}</h5>
              </TableCell>

              <TableCell className="max-w-xs truncate">{item.description}</TableCell>

              <TableCell>
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={100}
                    height={60}
                    className="rounded-md object-cover"
                  />
                )}
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary" onClick={() => handleDelete(item.id)}>
                    <span className="sr-only">Delete Article</span>
                    <TrashIcon />
                  </button>

                  <button className="hover:text-primary" onClick={() => handleEdit(item)}>
                    <span className="sr-only">Edit Article</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 14v3h3l9-9-3-3-9 9z" />
                    </svg>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
