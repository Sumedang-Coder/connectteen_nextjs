"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import {
    ChevronLeft,
    Music,
    Trash2,
    Mail,
    MessageCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useMessageStore } from "@/app/store/useMessageStore";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function SecretMessageDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { selectedMessage: message, loading, fetchMessageById, deleteMessage } = useMessageStore();
    const { user } = useAuthStore();
    const isViewer = user?.role === "viewer";

    const spotifyTrackId = useMemo(() => {
        if (!message?.song_id) return null;
        if (message.song_id.includes(":track:")) {
            return message.song_id.split(":").pop();
        }
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
                <div className="w-10 h-10 border-4 border-slate-200 rounded-full animate-spin border-t-blue-600"></div>
                <p className="text-sm font-medium text-slate-500">Loading message...</p>
            </div>
        );
    }

    if (!message) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-6 text-center">
                <Mail size={40} className="text-slate-300 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">Message Not Found</h2>
                <button
                    onClick={() => router.push("/secret-messages")}
                    className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    Return to Inbox
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/secret-messages")}
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        <ChevronLeft size={18} />
                        <span>Inbox</span>
                    </button>
                </div>
                {!isViewer && (
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                    >
                        <Trash2 size={14} />
                        <span>Delete</span>
                    </button>
                )}
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {/* Meta Info */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-slate-900">To: {message.recipient_name}</h1>
                            <div className="text-right">
                                <p className="text-sm font-medium text-slate-900">
                                    {message.created_at ? format(new Date(message.created_at), "MMM d, yyyy") : "TBA"}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {message.created_at ? format(new Date(message.created_at), "h:mm a") : ""}
                                </p>
                            </div>
                        </div>
                        <div className="h-px bg-slate-200 mt-2"></div>
                    </div>

                    {/* Message Body */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-blue-600">
                            <MessageCircle size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message Content</span>
                        </div>
                        <p className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap">
                            {message.message}
                        </p>
                    </div>

                    {/* Track Area */}
                    {message.song_name && (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <Music size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Attached Track</span>
                            </div>

                            {spotifyTrackId ? (
                                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`}
                                        width="100%"
                                        height="152"
                                        frameBorder="0"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    {message.song_image ? (
                                        <img src={message.song_image} alt={message.song_name} className="w-16 h-16 rounded-lg object-cover" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                            <Music size={24} />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 truncate">{message.song_name}</h4>
                                        <p className="text-sm text-slate-500 truncate">{message.song_artist}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
