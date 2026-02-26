"use client";

import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Music,
    Trash2,
    Calendar,
    User,
    Mail,
    Shield,
    MessageCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Local dummy data for visualization
const DUMMY_MESSAGES = [
    {
        id: "1",
        recipient_name: "Admin",
        message: "This is a secret message from a mysterious supporter. Keep up the great work and the community summit was amazing! I really hope we can do this every year. The energy was incredible and the speakers were so inspiring.",
        song_id: "spotify:track:4cOdK97xlZST91Zyd6P1iB",
        song_name: "Starboy",
        song_artist: "The Weeknd",
        song_image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258cf7ac552",
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        recipient_name: "Moderator",
        message: "I really appreciated the technical workshop last week. Can we do more sessions on React and Zustand? It would be great to dive deeper into performance optimization and testing strategies.",
        song_id: "",
        song_name: "",
        song_artist: "",
        song_image: "",
        created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: "3",
        recipient_name: "Community",
        message: "Anonymous feedback: The new event registration flow is much smoother now. Kudos to the dev team! We've seen a significant drop in support tickets related to event signups since the update.",
        song_id: "spotify:track:1799B7z6p3YFMTg38py76C",
        song_name: "Sunflower",
        song_artist: "Post Malone",
        song_image: "https://i.scdn.co/image/ab67616d0000b273e351368686e584f183707248",
        created_at: new Date(Date.now() - 86400000).toISOString()
    }
];

export default function SecretMessageDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    // Find the message by ID from our dummy data
    const message = DUMMY_MESSAGES.find(m => m.id === id) || DUMMY_MESSAGES[0];

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this secret message?")) {
            toast.success("Visualization: Message deletion simulated.");
            router.push("/secret-messages");
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Top Navigation Bar */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/secret-messages")}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        <ChevronLeft size={18} />
                        <span>Back to Inbox</span>
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                        <Trash2 size={16} />
                        <span>Delete Message</span>
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                <div className="max-w-4xl mx-auto flex flex-col gap-8">

                    {/* Message Header Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                                <User size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Anonymous Message</h1>
                                <div className="flex items-center gap-2 text-slate-500 mt-1">
                                    <Mail size={16} />
                                    <span className="text-sm font-medium">To: @{message.recipient_name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Calendar size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Received At</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900">
                                {format(new Date(message.created_at), "PPPP 'at' p")}
                            </span>
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-6">
                                <MessageCircle className="text-blue-500" size={20} />
                                <h3 className="text-sm font-black uppercase text-slate-400 tracking-[0.2em]">Message Content</h3>
                            </div>
                            <p className="text-lg text-slate-700 leading-relaxed font-medium">
                                {message.message}
                            </p>
                        </div>

                        {/* Song Attachment (Conditional) */}
                        {message.song_name && (
                            <div className="p-8 bg-blue-50/50">
                                <div className="flex items-center gap-2 mb-6">
                                    <Music className="text-blue-600" size={20} />
                                    <h3 className="text-sm font-black uppercase text-blue-400 tracking-[0.2em]">Music Attachment</h3>
                                </div>
                                <div className="flex items-center gap-5 bg-white p-4 rounded-xl border border-blue-100 shadow-sm transition-transform hover:scale-[1.01]">
                                    {message.song_image ? (
                                        <img src={message.song_image} alt={message.song_name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                                    ) : (
                                        <div className="w-20 h-20 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                                            <Music size={32} />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-lg font-black text-slate-900 leading-tight">{message.song_name}</h4>
                                        <p className="text-slate-500 font-medium">{message.song_artist}</p>
                                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                            Spotify Track
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Stamp */}
                        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Shield size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Confidential Communication</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">#{message.id.toString().padStart(6, '0')}</span>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                        <div className="bg-slate-100/50 p-6 rounded-2xl border border-slate-200 border-dashed">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Technical metadata</h4>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <span className="text-xs font-medium text-slate-500">Platform ID</span>
                                    <span className="text-xs font-mono text-slate-900">EXT-MSG-{message.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs font-medium text-slate-500">Encryption</span>
                                    <span className="text-xs font-mono text-slate-900">AES-256-GCM (Simulated)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
