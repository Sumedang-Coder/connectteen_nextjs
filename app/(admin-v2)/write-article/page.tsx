"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
    Upload,
    X,
    Layout,
    Type,
    Link as LinkIcon,
    AlignLeft,
    User,
    Globe,
    Search,
    Settings,
    HelpCircle,
    MoreVertical,
    Calendar,
    Eye,
    Check,
    Trash2,
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Quote,
    List,
    ImagePlus,
    ArrowLeft,
    Save,
    Send
} from "lucide-react";
import { useArticleStore } from "@/app/store/useArticleStore";
import { toast } from "sonner";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";

// Tiptap imports
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UnderlineExtension from '@tiptap/extension-underline';

function ArticleEditor() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const { user } = useAuthStore();

    const { createArticle, updateArticle, fetchArticleById, article, loading, deleteArticle } = useArticleStore();

    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            UnderlineExtension,
        ],
        content: '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'outline-none min-h-[500px] text-lg text-slate-700 leading-relaxed',
            },
        },
    });

    useEffect(() => {
        if (editId) {
            fetchArticleById(editId);
        }
    }, [editId, fetchArticleById]);

    useEffect(() => {
        if (editId && article) {
            setTitle(article.title);
            setImagePreview(article.image_url);
            if (editor && article.description) {
                editor.commands.setContent(article.description);
            }
        }
    }, [article, editId, editor]);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
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

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
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
            router.push("/manage-articles");
        } else {
            toast.error("Process failed. Please try again.");
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

    return (
        <div className="min-h-full bg-slate-50 font-display text-slate-900 pb-20">
            {/* Content Area */}
            <main className="max-w-4xl mx-auto px-4 pt-10 flex flex-col gap-8">

                {/* Breadcrumbs & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/manage-articles" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                            <ArrowLeft size={16} />
                            <span>Articles</span>
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 font-semibold">{editId ? "Edit Article" : "Create New"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {editId && (
                            <button
                                onClick={handleDelete}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete Article"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                        <button
                            onClick={handlePublish}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                "Saving..."
                            ) : (
                                <>
                                    <Send size={18} />
                                    <span>{editId ? "Update Article" : "Publish Article"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Editor Main Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Hero Image Upload */}
                    <div
                        className={`group relative w-full h-64 md:h-96 border-b border-slate-100 transition-colors cursor-pointer ${imagePreview ? "" : "bg-slate-50 hover:bg-slate-100"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} alt="Hero" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
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
                                <span className="text-xs text-slate-500 mt-1">1200 x 600px recommended</span>
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

                        {/* Title Input */}
                        <textarea
                            placeholder="Enter article title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            rows={1}
                            className="w-full bg-transparent border-none text-4xl md:text-5xl font-black text-slate-900 placeholder:text-slate-200 focus:ring-0 px-0 resize-none leading-tight"
                        />

                        {/* Toolbar */}
                        <div className="flex items-center gap-1 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 overflow-x-auto scollbar-hide sticky top-4 z-10 shadow-sm">
                            <button
                                onClick={() => editor?.chain().focus().toggleBold().run()}
                                className={`p-2 rounded-xl transition-all ${editor?.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-900'}`}
                            >
                                <Bold size={20} />
                            </button>
                            <button
                                onClick={() => editor?.chain().focus().toggleItalic().run()}
                                className={`p-2 rounded-xl transition-all ${editor?.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-900'}`}
                            >
                                <Italic size={20} />
                            </button>
                            <button
                                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                className={`p-2 rounded-xl transition-all ${editor?.isActive('underline') ? 'bg-blue-100 text-blue-600' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-900'}`}
                            >
                                <Underline size={20} />
                            </button>
                            <div className="w-px h-6 bg-slate-200 mx-1" />
                            <button
                                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                                className={`p-2 rounded-xl transition-all ${editor?.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-600' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-900'}`}
                            >
                                <Heading1 size={20} />
                            </button>
                            <button
                                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                                className={`p-2 rounded-xl transition-all ${editor?.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-600' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-900'}`}
                            >
                                <Heading2 size={20} />
                            </button>
                            <div className="w-px h-6 bg-slate-200 mx-1" />
                            <button
                                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                                className={`p-2 rounded-xl transition-all ${editor?.isActive('blockquote') ? 'bg-blue-100 text-blue-600' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-900'}`}
                            >
                                <Quote size={20} />
                            </button>
                            <button
                                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                className={`p-2 rounded-xl transition-all ${editor?.isActive('bulletList') ? 'bg-blue-100 text-blue-600' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-900'}`}
                            >
                                <List size={20} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="prose prose-slate max-w-none">
                            <EditorContent editor={editor} />
                        </div>
                    </div>
                </div>
            </main>
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
