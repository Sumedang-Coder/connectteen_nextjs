"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
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
    AlignLeft,
    ChevronRight,
    User,
    Globe,
    Lock,
    Plus
} from "lucide-react";
import { useEventStore } from "@/app/store/useEventStore";
import { toast } from "sonner";
import { format } from "date-fns";

function EventEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const { createEvent, updateEvent, fetchEventById, event, loading } = useEventStore();

    const [eventTitle, setEventTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [quota, setQuota] = useState<number>(0);
    const [status, setStatus] = useState<"open" | "closed">("open");
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editId) {
            fetchEventById(editId);
        }
    }, [editId, fetchEventById]);

    useEffect(() => {
        if (editId && event) {
            setEventTitle(event.event_title);
            setDescription(event.description);
            setLocation(event.location);
            setQuota(event.quota || 0);
            setStatus(event.status === "closed" ? "closed" : "open");
            setVisibility(event.visibility || "public");
            // Format date for input[type="datetime-local"]
            if (event.date) {
                const d = new Date(event.date);
                const formattedDate = d.toISOString().slice(0, 16);
                setDate(formattedDate);
            }
            setImagePreview(event.image_url || null);
        }
    }, [event, editId]);

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

    const handleSave = async () => {
        if (!eventTitle || !description || !location || !date) {
            toast.error("Please fill in all required fields (Title, Description, Location, Date)");
            return;
        }

        const formData = new FormData();
        formData.append("event_title", eventTitle);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("date", date);
        formData.append("quota", quota.toString());
        formData.append("status", status);
        formData.append("visibility", visibility);
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
            toast.error("Operation failed. Check your data.");
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            {/* Top Bar */}
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="h-6 w-px bg-slate-200 mx-2" />
                    <span className="text-sm font-medium text-slate-500">
                        {editId ? "Edit Event" : "Create New Event"}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-white rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
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
                                        value={eventTitle}
                                        onChange={(e) => setEventTitle(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 font-medium"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Description</label>
                                    <textarea
                                        placeholder="Provide a detailed description of the event..."
                                        rows={8}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 leading-relaxed font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Location / Venue</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Location..."
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Date & Time</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="datetime-local"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
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
                                            onChange={(e) => setQuota(parseInt(e.target.value) || 0)}
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
