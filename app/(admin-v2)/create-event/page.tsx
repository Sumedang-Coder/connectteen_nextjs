"use client";

import { useEffect, useState, useRef, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Plus,
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
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
    ChevronLeft,
    Image as ImageIcon,
    Upload,
    X,
    MapPin,
    Calendar,
    Clock,
    Check,
    HelpCircle,
    Layout,
    Type,
    ChevronRight,
    User,
    Globe,
    Lock
} from "lucide-react";
import { useEventStore } from "@/app/store/useEventStore";
import { useAuthStore } from "@/app/store/useAuthStore";
import AdminBreadcrumb from "@/components/AdminBreadcrumb";
import { toast } from "sonner";
import { format } from "date-fns";

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
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Bold"
            >
                <BoldIcon size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Italic"
            >
                <ItalicIcon size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('underline') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Underline"
            >
                <UnderlineIcon size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('strike') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Strike"
            >
                <Strikethrough size={16} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="H1"
            >
                <Heading1 size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="H2"
            >
                <Heading2 size={16} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Bullet List"
            >
                <List size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Ordered List"
            >
                <ListOrdered size={16} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={setLink}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('link') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Link"
            >
                <LinkIcon size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600 active:bg-slate-300"
                title="Unlink"
            >
                <Unlink size={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Align Left"
            >
                <AlignLeft size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Align Center"
            >
                <AlignCenter size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Align Right"
            >
                <AlignRight size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}
                title="Align Justify"
            >
                <AlignJustify size={16} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600 active:bg-slate-300"
                title="Undo"
            >
                <Undo size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600 active:bg-slate-300"
                title="Redo"
            >
                <Redo size={16} />
            </button>
        </div>
    );
};

function EventEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const { user } = useAuthStore();
    const { events, event, fetchEventById, createEvent, updateEvent, loading, error } = useEventStore();

    const [eventTitle, setEventTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [quota, setQuota] = useState<number>(0);
    const [status, setStatus] = useState<"open" | "closed">("open");
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    const [isOnline, setIsOnline] = useState(false);
    const [link, setLink] = useState("");
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
                    class: 'text-indigo-600 underline cursor-pointer',
                },
            }),
            Placeholder.configure({
                placeholder: 'Provide a detailed description of the event...',
            }),
        ],
        content: '',
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editId) {
            fetchEventById(editId);
        }
    }, [editId, fetchEventById]);

    useEffect(() => {
        if (editId && event) {
            setEventTitle(event.event_title);
            setLocation(event.location);
            setQuota(event.quota || 0);
            setStatus(event.status === "closed" ? "closed" : "open");
            setVisibility(event.visibility || "public");
            setIsOnline(event.is_online || false);
            setLink(event.link || "");
            if (event.date) {
                const d = new Date(event.date);
                const formattedDate = d.toISOString().slice(0, 10);
                setDate(formattedDate);
                setTime(event.time || "");
            }
            if (editor && event.description) {
                editor.commands.setContent(event.description);
            }
            setImagePreview(event.image_url || null);
        }
    }, [event, editId, editor]);

    // Role guard for Viewers is handled in layout.tsx

    // Unsaved changes warning
    useEffect(() => {
        const hasContent = eventTitle.trim() || (editor && !editor.isEmpty) || location.trim();

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasContent) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        const handlePopState = () => {
             if (hasContent) {
                 if (confirm("Perubahan yang Anda buat mungkin tidak disimpan. Apakah Anda yakin ingin keluar?")) {
                    router.push("/manage-events");
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
    }, [eventTitle, editor, location, router]);

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

    const handleSave = async () => {
        const descHtml = editor?.getHTML() || "";
        if (!eventTitle || !descHtml || descHtml === "<p></p>" || !location || !date || !time) {
            toast.error("Harap isi semua field wajib");
            return;
        }

        if (new Date(date) < new Date() && !editId) {
            toast.error("Tanggal event tidak boleh di masa lalu");
            return;
        }

        if (quota < 0) {
            toast.error("Kuota tidak boleh negatif");
            return;
        }

        if (!imageFile && !editId) {
            toast.error("Harap unggah poster event");
            return;
        }

        const formData = new FormData();
        formData.append("event_title", eventTitle);
        formData.append("description", descHtml);
        formData.append("location", location);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("quota", quota.toString());
        formData.append("status", status);
        formData.append("visibility", visibility);
        formData.append("is_online", isOnline.toString());
        if (link) formData.append("link", link);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        let success = false;
        if (editId) {
            success = await updateEvent(editId, formData);
        } else {
            success = await createEvent(formData);
        }

        if (success) {
            toast.success(editId ? "Event updated!" : "Event created!");
            router.push("/manage-events");
        } else {
            const errorMsg = useEventStore.getState().error;
            toast.error(errorMsg || "Operation failed. Check your data.");
        }
    };

    // Role guard for Viewers is handled in layout.tsx

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            {/* Top Bar */}
            <header className="min-h-[4rem] py-3 md:py-0 md:h-16 flex flex-col md:flex-row items-center justify-between px-4 md:px-6 bg-white border-b border-slate-200 shrink-0 gap-3">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <AdminBreadcrumb 
                        items={[
                            { label: "Admin", href: "/dashboard" },
                            { label: "Events Management", href: "/manage-events" },
                            { label: editId ? "Edit Event" : "Create New Event" }
                        ]}
                    />
                </div>

                <div className="flex items-center gap-2 md:gap-3 shrink-0 w-full md:w-auto justify-end">
                    <button
                        onClick={() => router.push("/manage-events")}
                        className="flex-1 md:flex-none px-4 md:px-6 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-xs md:text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-[2] md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-indigo-600 text-white font-semibold text-xs md:text-sm rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : editId ? "Save Changes" : "Create Event"}
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
                <div className="max-w-5xl mx-auto">
                    {/* Header Title */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Event Details</h2>
                        <p className="text-slate-500 mt-1">Provide all the information for your upcoming event.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form Fields */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            {/* Event Basic Info Card */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Event Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter event name..."
                                        maxLength={200}
                                        value={eventTitle}
                                        onChange={(e) => setEventTitle(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 font-medium"
                                    />
                                </div>

                                 <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Description</label>
                                    
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden min-h-[400px] flex flex-col">
                                        {editor && (
                                            <BubbleMenu editor={editor}>
                                                <div className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-xl border border-slate-200">
                                                    <button
                                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                                        className={`p-1.5 rounded transition-all ${editor.isActive('bold') ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                                    >
                                                        <BoldIcon size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                                        className={`p-1.5 rounded transition-all ${editor.isActive('italic') ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                                    >
                                                        <ItalicIcon size={14} />
                                                    </button>
                                                    <div className="w-px h-4 bg-slate-200 mx-0.5" />
                                                    <button
                                                        onClick={() => {
                                                            const url = window.prompt('URL', editor.getAttributes('link').href)
                                                            if (url) editor.chain().focus().setLink({ href: url }).run()
                                                        }}
                                                        className={`p-1.5 rounded transition-all ${editor.isActive('link') ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                                    >
                                                        <LinkIcon size={14} />
                                                    </button>
                                                </div>
                                            </BubbleMenu>
                                        )}
                                        
                                        <MenuBar editor={editor} />
                                        
                                        <div className="p-4 flex-1 prose prose-slate max-w-none focus:outline-none overflow-y-auto min-h-[300px]">
                                            <EditorContent editor={editor} className="outline-none min-h-[300px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Location / Venue</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                maxLength={200}
                                                placeholder="Location..."
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Time</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Form Fields */}
                        <div className="flex flex-col gap-8">
                            {/* Poster Upload Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <label className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 block">Event Poster</label>
                                <div
                                    className={`relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer border-2 border-dashed transition-all ${imagePreview ? "border-transparent" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Poster" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40"><Upload size={18} /></button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setImagePreview(null);
                                                        setImageFile(null);
                                                    }}
                                                    className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-rose-500/80"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-2 p-6 text-center">
                                            <div className="p-3 bg-white rounded-xl shadow-sm"><ImageIcon size={24} className="text-indigo-500" /></div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-900">Upload Poster</p>
                                                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">JPG, PNG up to 2MB</p>
                                            </div>
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
                            </div>

                            {/* Event Settings Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5">
                                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                                    <Layout size={18} className="text-indigo-600" />
                                    <span>Event Settings</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Registration Quota</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Unlimited = 0"
                                            value={quota}
                                            onChange={(e) => setQuota(Math.max(0, parseInt(e.target.value) || 0))}
                                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400">Set to 0 for unlimited participants.</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Manual Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as "open" | "closed")}
                                        className="w-full px-3 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium appearance-none"
                                    >
                                        <option value="open">Open for Registration</option>
                                        <option value="closed">Closed / Disabled</option>
                                    </select>
                                </div>

                                <div className="mt-2 pt-4 border-t border-slate-100">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Visibility</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                {visibility === "public" ? <Globe size={14} /> : <Lock size={14} />}
                                            </div>
                                            <select
                                                value={visibility}
                                                onChange={(e) => setVisibility(e.target.value as "public" | "private")}
                                                className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium appearance-none"
                                            >
                                                <option value="public">Public (Visible to everyone)</option>
                                                <option value="private">Private (Hidden from feed)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Online Event</label>
                                            <input
                                                type="checkbox"
                                                checked={isOnline}
                                                onChange={(e) => setIsOnline(e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500"
                                            />
                                        </div>
                                        
                                        {isOnline && (
                                            <div className="relative mt-2">
                                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                                <input
                                                    type="url"
                                                    placeholder="Meeting Link (GMeet, Zoom, etc.)"
                                                    value={link}
                                                    onChange={(e) => setLink(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CreateEventPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading Event Editor...</div>}>
            <EventEditorContent />
        </Suspense>
    );
}
