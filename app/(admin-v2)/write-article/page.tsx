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
    AlignJustify
} from "lucide-react";
import { useArticleStore } from "@/app/store/useArticleStore";
import { toast } from "sonner";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";

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

    // Role guard for Viewers
    useEffect(() => {
        if (user && user.role === "viewer") {
            toast.error("Account Viewer tidak memiliki izin untuk menulis artikel.");
            router.replace("/manage-articles");
        }
    }, [user, router]);

    useEffect(() => {
        if (editId && article) {
            setTitle(article.title);
            setImagePreview(article.image_url);
            if (editor && article.description) {
                editor.commands.setContent(article.description);
            }
        }
    }, [article, editId, editor]);


    // Unsaved changes warning
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            const hasContent = title.trim() || (editor && !editor.isEmpty);
            if (hasContent) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        const handlePopState = () => {
             const hasContent = title.trim() || (editor && !editor.isEmpty);
             if (hasContent) {
                 if (confirm("Perubahan yang Anda buat mungkin tidak disimpan. Apakah Anda yakin ingin keluar?")) {
                    router.push("/manage-articles");
                 } else {
                     window.history.pushState(null, "", window.location.href);
                 }
             }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);
        window.history.pushState(null, "", window.location.href);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
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

    if (user?.role === "viewer") return null;

    return (
        <div className="min-h-full bg-slate-50 font-display text-slate-900 pb-20">
            <main className="max-w-4xl mx-auto px-4 pt-10 flex flex-col gap-8">

                {/* Header Actions */}
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
                            {loading ? "Saving..." : (
                                <>
                                    <Send size={18} />
                                    <span>{editId ? "Update Article" : "Publish Article"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

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
