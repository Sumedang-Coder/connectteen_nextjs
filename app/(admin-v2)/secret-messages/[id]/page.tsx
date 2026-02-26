"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import {
    ChevronLeft,
    Music,
    Trash2,
    Calendar,
    User,
    Mail,
    Shield,
    MessageCircle,
    Loader2
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useMessageStore } from "@/app/store/useMessageStore";

export default function SecretMessageDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { selectedMessage: message, loading, fetchMessageById, deleteMessage } = useMessageStore();

    const spotifyTrackId = useMemo(() => {
        if (!message?.song_id) return null;
        if (message.song_id.includes(":track:")) {
            return message.song_id.split(":").pop();
        }
        // If it's just the ID
        if (message.song_id.length > 15) return message.song_id;
        return null;
    }, [message?.song_id]);

    useEffect(() => {
        if (id) {
            fetchMessageById(id as string);
        }
    }, [id, fetchMessageById]);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this secret message?")) {
            try {
                await deleteMessage(id as string);
                toast.success("Message deleted successfully");
                router.push("/secret-messages");
            } catch (err) {
                toast.error("Failed to delete message");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 gap-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600"></div>
                    <Loader2 className="absolute inset-0 m-auto h-6 w-6 text-blue-600 animate-spin" />
                </div>
                <p className="text-sm font-bold text-slate-500 animate-pulse uppercase tracking-[0.2em]">Intercepting Data...</p>
            </div>
        );
    }

    if (!message) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-6 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Mail size={40} />
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-2">Message Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-xs">The message you are looking for may have been deleted or moved.</p>
                <button
                    onClick={() => router.push("/secret-messages")}
                    className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                    Return to Inbox
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50 font-display">
            {/* Top Navigation Bar */}
            <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/secret-messages")}
                        className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all px-3 py-2 rounded-xl hover:bg-slate-50"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Inbox</span>
                    </button>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest hidden sm:block">Detail View</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-rose-600 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-500 transition-all shadow-sm active:scale-95"
                    >
                        <Trash2 size={16} />
                        <span>Delete Permanent</span>
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-12 selection:bg-blue-500/10 selection:text-blue-600">
                <div className="max-w-4xl mx-auto flex flex-col gap-10">

                    {/* Message Header Card */}
                    <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/40 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50"></div>

                        <div className="relative flex items-center gap-6">
                            <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                <span className="text-3xl font-black">{message.recipient_name?.charAt(0).toUpperCase() || "?"}</span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Admin Private Message</h1>
                                <div className="flex items-center gap-2 text-slate-400 mt-2">
                                    <div className="px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-100">Secure Transmission</div>
                                    <span className="text-sm font-bold text-slate-600 italic">Personnel Only</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex flex-col items-start md:items-end gap-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[180px]">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Calendar size={14} className="text-blue-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Received</span>
                            </div>
                            <span className="text-sm font-black text-slate-900">
                                {message.created_at ? format(new Date(message.created_at), "MMM dd, yyyy") : "TBA"}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                                {message.created_at ? format(new Date(message.created_at), "h:mm a") : ""}
                            </span>
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-200/60 overflow-hidden">
                        <div className="p-10 lg:p-12 border-b border-slate-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <MessageCircle className="text-blue-600" size={18} />
                                </div>
                                <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em]">Direct Communication</h3>
                            </div>
                            <p className="text-xl text-slate-700 leading-relaxed font-semibold italic">
                                "{message.message}"
                            </p>
                        </div>

                        {/* Song Attachment (Conditional) */}
                        {message.song_name && (
                            <div className="p-10 lg:p-12 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
                                <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

                                <div className="relative flex items-center justify-between gap-3 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-xl bg-indigo-100 flex items-center justify-center shadow-sm">
                                            <Music className="text-indigo-600" size={18} />
                                        </div>
                                        <h3 className="text-xs font-black uppercase text-indigo-400 tracking-[0.3em]">Audio Environment</h3>
                                    </div>
                                    <div className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-indigo-100 text-[10px] font-black text-indigo-600 uppercase tracking-widest hidden sm:block">
                                        Interactive Player
                                    </div>
                                </div>

                                {spotifyTrackId ? (
                                    <div className="relative group p-1 bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 border border-indigo-100 transform hover:scale-[1.01] transition-all duration-500">
                                        <iframe
                                            src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`}
                                            width="100%"
                                            height="152"
                                            frameBorder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                            className="rounded-2xl"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="group flex items-center gap-6 bg-white p-6 rounded-3xl border border-indigo-100 shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                                        {message.song_image ? (
                                            <div className="relative shrink-0">
                                                <img src={message.song_image} alt={message.song_name} className="w-24 h-24 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center">
                                                    <Music size={12} className="text-slate-400" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 shrink-0">
                                                <Music size={40} />
                                            </div>
                                        )}
                                        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                                            <h4 className="text-xl font-black text-slate-900 leading-tight truncate">{message.song_name}</h4>
                                            <p className="text-slate-500 font-bold">{message.song_artist}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-wider border border-slate-200">
                                                    Manual Link Required
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}
