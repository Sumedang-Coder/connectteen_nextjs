"use client";

import { useEffect, useState, useRef, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ChevronRight,
    Upload,
    ArrowLeft,
    Save,
    Send,
    Trash2,
    ImagePlus,
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Unlink,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Loader2
} from "lucide-react";
import { useArticleStore } from "@/app/store/useArticleStore";
import { toast } from "sonner";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";
import AdminBreadcrumb from "@/components/AdminBreadcrumb";

// Tiptap imports
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { BubbleMenu as BubbleMenuExtension } from '@tiptap/extension-bubble-menu';
import { TextAlign } from '@tiptap/extension-text-align';

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Bold"
            >
                <BoldIcon size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Italic"
            >
                <ItalicIcon size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('underline') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Underline"
            >
                <UnderlineIcon size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('strike') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Strike"
            >
                <Strikethrough size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('code') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Code"
            >
                <Code size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="H1"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="H2"
            >
                <Heading2 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="H3"
            >
                <Heading3 size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Bullet List"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Ordered List"
            >
                <ListOrdered size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('blockquote') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Blockquote"
            >
                <Quote size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={setLink}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('link') ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Set Link"
            >
                <LinkIcon size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600 active:bg-slate-300"
                title="Unlink"
            >
                <Unlink size={18} />
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Align Left"
            >
                <AlignLeft size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Align Center"
            >
                <AlignCenter size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Align Right"
            >
                <AlignRight size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200 text-blue-600' : 'text-slate-600'}`}
                title="Align Justify"
            >
                <AlignJustify size={18} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600 active:bg-slate-300"
                title="Undo"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600 active:bg-slate-300"
                title="Redo"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

function ArticleEditor() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const { user } = useAuthStore();

    const { createArticle, updateArticle, fetchArticleById, article, loading, deleteArticle } = useArticleStore();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [polls, setPolls] = useState<{ question: string; options: string[] }[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BubbleMenuExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TiptapLink.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
            }),
            Placeholder.configure({
                placeholder: 'Tulis cerita Anda di sini...',
            }),
        ],
        content: '',
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editId) {
            fetchArticleById(editId);
        }
    }, [editId, fetchArticleById]);

    // Role guard for Viewers is handled in layout.tsx

    useEffect(() => {
        if (editId && article) {
            setTitle(article.title);
            setSubtitle(article.subtitle || "");
            if (article.polls) {
                setPolls(article.polls.map(p => ({
                    question: p.question,
                    options: p.options.map(o => o.text)
                })));
            }
            setImagePreview(article.image_url);
            if (editor && article.description) {
                editor.commands.setContent(article.description);
            }
        }
    }, [article, editId, editor]);


    // Unsaved changes warning
    useEffect(() => {
        const hasContent = title.trim() || (editor && !editor.isEmpty);

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasContent) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        const handlePopState = () => {
             if (hasContent) {
                 if (confirm("Perubahan yang Anda buat mungkin tidak disimpan. Apakah Anda yakin ingin keluar?")) {
                    router.push("/manage-articles");
                 } else {
                     window.history.pushState(null, "", window.location.href);
                 }
             }
        };

        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;
            
            if (target.href && target.href !== window.location.href && target.target !== '_blank') {
                if (hasContent) {
                    if (!window.confirm("Perubahan yang Anda buat mungkin tidak disimpan. Apakah Anda yakin ingin keluar?")) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);
        document.addEventListener("click", handleAnchorClick, { capture: true });
        window.history.pushState(null, "", window.location.href);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
            document.removeEventListener("click", handleAnchorClick, { capture: true });
        };
    }, [title, editor, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Ukuran file maksimal 5MB");
                e.target.value = "";
                return;
            }
            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Format file tidak didukung. Gunakan JPG atau PNG.");
                e.target.value = "";
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = async () => {
        const description = editor?.getHTML() || "";
        if (!title || !description || description === "<p></p>") {
            toast.error("Please fill in the title and content");
            return;
        }
        if (!imageFile && !editId) {
            toast.error("Harap unggah cover gambar artikel");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("description", description);
        if (polls.length > 0) {
            const formattedPolls = polls.map(p => ({
                question: p.question,
                options: p.options.map(o => ({ text: o, votes: 0 }))
            }));
            formData.append("polls", JSON.stringify(formattedPolls));
        }
        if (imageFile) {
            formData.append("image", imageFile);
        }

        let success = false;
        if (editId) {
            success = await updateArticle(editId, formData);
        } else {
            success = await createArticle(formData);
        }

        if (success) {
            toast.success(editId ? "Article updated!" : "Article published!");
            if (!editId) {
                setTitle("");
                setImageFile(null);
                setImagePreview(null);
                editor?.commands.clearContent(true);
            }
            router.push("/manage-articles");
        } else {
            const errorMsg = useArticleStore.getState().error;
            toast.error(errorMsg || "Failed to publish article.");
        }
    };

    const handleDelete = async () => {
        if (editId && confirm("Are you sure you want to delete this article?")) {
            const success = await deleteArticle(editId);
            if (success) {
                toast.success("Article deleted");
                router.push("/manage-articles");
            }
        }
    };

    // Role guard for Viewers is handled in layout.tsx

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-display selection:bg-blue-600/10 selection:text-blue-600">
            {/* Standard Header / Breadcrumb */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <AdminBreadcrumb
                        items={[
                            { label: "Admin", href: "/dashboard" },
                            { label: "Articles", href: "/manage-articles" },
                            { label: editId ? "Edit Article" : "Create New" }
                        ]}
                    />
                </div>

                <div className="flex items-center gap-3">
                    {editId && (
                        <button
                            onClick={handleDelete}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Article"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                    <button
                        onClick={handlePublish}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <>
                                <Send size={18} />
                                <span>{editId ? "Update" : "Publish"}</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-10">
                <div className="max-w-4xl mx-auto flex flex-col gap-10">

                {/* Editor Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Hero Image */}
                    <div
                        className={`group relative w-full h-64 md:h-96 border-b border-slate-100 transition-colors cursor-pointer ${imagePreview ? "" : "bg-slate-50 hover:bg-slate-100"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} alt="Hero" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                                        <Upload size={24} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-3">
                                    <ImagePlus size={32} className="text-blue-500" />
                                </div>
                                <span className="text-sm font-bold text-slate-900">Add Cover Image</span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className="p-6 md:p-10 flex flex-col gap-6">
                        {/* Title */}
                        <div className="flex flex-col gap-2">
                             <textarea
                                placeholder="Judul Artikel..."
                                maxLength={200}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                rows={1}
                                className="w-full bg-transparent border-none text-4xl md:text-5xl font-black text-slate-900 placeholder:text-slate-200 focus:ring-0 px-0 resize-none leading-tight"
                            />
                            <input
                                type="text"
                                placeholder="Sub Judul (Opsional)..."
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className="w-full bg-transparent border-none text-xl md:text-2xl font-bold text-slate-500 placeholder:text-slate-200 focus:ring-0 px-0"
                            />
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                 <span>{title.length}/200 Characters</span>
                            </div>
                        </div>

                        {/* Editor Content Area */}
                        <div className="border border-slate-200 rounded-2xl overflow-hidden min-h-[600px] flex flex-col">
                            {editor && (
                                <BubbleMenu editor={editor}>
                                    <div className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-xl border border-slate-200">
                                        <button
                                            onClick={() => editor.chain().focus().toggleBold().run()}
                                            className={`p-1.5 rounded transition-all ${editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                        >
                                            <BoldIcon size={16} />
                                        </button>
                                        <button
                                            onClick={() => editor.chain().focus().toggleItalic().run()}
                                            className={`p-1.5 rounded transition-all ${editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                        >
                                            <ItalicIcon size={16} />
                                        </button>
                                        <div className="w-px h-4 bg-slate-200 mx-0.5" />
                                        <button
                                            onClick={() => {
                                                const url = window.prompt('URL', editor.getAttributes('link').href)
                                                if (url) editor.chain().focus().setLink({ href: url }).run()
                                            }}
                                            className={`p-1.5 rounded transition-all ${editor.isActive('link') ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                        >
                                            <LinkIcon size={16} />
                                        </button>
                                    </div>
                                </BubbleMenu>
                            )}
                            
                            <MenuBar editor={editor} />
                            
                            <div className="p-6 md:p-8 flex-1 prose prose-slate max-w-none focus:outline-none overflow-y-auto">
                                <EditorContent editor={editor} className="outline-none min-h-[400px]" />
                            </div>
                        </div>

                        {/* Polls Section */}
                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-slate-900">Polling Artikel</h3>
                                <button
                                    onClick={() => setPolls([...polls, { question: "", options: ["", ""] }])}
                                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                                >
                                    + Tambah Poll
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {polls.map((poll, pIdx) => (
                                    <div key={pIdx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-4">
                                        <div className="flex items-start gap-4">
                                            <input
                                                type="text"
                                                placeholder="Pertanyaan Poll..."
                                                value={poll.question}
                                                onChange={(e) => {
                                                    const newPolls = [...polls];
                                                    newPolls[pIdx].question = e.target.value;
                                                    setPolls(newPolls);
                                                }}
                                                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                            />
                                            <button
                                                onClick={() => setPolls(polls.filter((_, i) => i !== pIdx))}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {poll.options.map((opt, oIdx) => (
                                                <div key={oIdx} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder={`Opsi ${oIdx + 1}`}
                                                        value={opt}
                                                        onChange={(e) => {
                                                            const newPolls = [...polls];
                                                            newPolls[pIdx].options[oIdx] = e.target.value;
                                                            setPolls(newPolls);
                                                        }}
                                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                                    />
                                                    {poll.options.length > 2 && (
                                                        <button
                                                            onClick={() => {
                                                                const newPolls = [...polls];
                                                                newPolls[pIdx].options = newPolls[pIdx].options.filter((_, i) => i !== oIdx);
                                                                setPolls(newPolls);
                                                            }}
                                                            className="p-1 text-slate-300 hover:text-red-500"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    const newPolls = [...polls];
                                                    newPolls[pIdx].options.push("");
                                                    setPolls(newPolls);
                                                }}
                                                className="self-start text-xs font-bold text-blue-600 hover:underline mt-1"
                                            >
                                                + Tambah Opsi
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default function WriteArticlePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full bg-white">Loading Editor...</div>}>
            <ArticleEditor />
        </Suspense>
    );
}
