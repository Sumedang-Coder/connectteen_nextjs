"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Search,
    Trash2,
    Music,
    Mail,
    UserX,
    ChevronRight,
    Eye
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Local dummy data for visualization
const DUMMY_MESSAGES = [
    {
        id: "1",
        recipient_name: "Admin",
        message: "This is a secret message from a mysterious supporter. Keep up the great work and the community summit was amazing!",
        song_id: "spotify:track:4cOdK97xlZST91Zyd6P1iB",
        song_name: "Starboy",
        song_artist: "The Weeknd",
        song_image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258cf7ac552",
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        recipient_name: "Moderator",
        message: "I really appreciated the technical workshop last week. Can we do more sessions on React and Zustand?",
        song_id: "",
        song_name: "",
        song_artist: "",
        song_image: "",
        created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: "3",
        recipient_name: "Community",
        message: "Anonymous feedback: The new event registration flow is much smoother now. Kudos to the dev team!",
        song_id: "spotify:track:1799B7z6p3YFMTg38py76C",
        song_name: "Sunflower",
        song_artist: "Post Malone",
        song_image: "https://i.scdn.co/image/ab67616d0000b273e351368686e584f183707248",
        created_at: new Date(Date.now() - 86400000).toISOString()
    }
];

export default function SecretMessagesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const allMessages = DUMMY_MESSAGES;

    const handleDelete = async (title: string) => {
        if (confirm(`Are you sure you want to delete this secret message?`)) {
            toast.success("Visualization: Message deletion simulated.");
        }
    };

    const filteredMessages = allMessages.filter(msg =>
        msg.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full overflow-hidden bg-[#f6f7f8] font-display selection:bg-blue-500/20 selection:text-blue-500">
            <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-12 lg:py-10">
                <div className="mx-auto max-w-5xl">
                    {/* Header Section */}
                    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Secret Messages</h2>
                            <p className="mt-2 text-slate-500">View and manage confidential admin communications securely.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-500">Sort by:</span>
                            <select className="rounded-lg border-slate-200 bg-white py-2 pl-3 pr-10 text-sm font-medium text-slate-700 focus:border-blue-500 focus:ring-blue-500 transition-colors cursor-pointer">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                                <option>Unread</option>
                            </select>
                        </div>
                    </header>

                    {/* Search Bar */}
                    <div className="mb-8 rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200/60">
                        <div className="relative flex w-full items-center">
                            <Search className="absolute left-4 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by sender or content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-12 w-full rounded-lg border-none bg-transparent pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:ring-0"
                            />
                            <button className="mr-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">Search</button>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="flex flex-col gap-4">
                        {filteredMessages.length === 0 ? (
                            <div className="bg-white p-12 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                                <Mail className="text-slate-200 mb-4" size={48} />
                                <p className="text-slate-400 font-medium">No secret messages found.</p>
                            </div>
                        ) : filteredMessages.map((msg, index) => (
                            <div key={msg.id} className="relative">
                                <Link
                                    href={`/secret-messages/${msg.id}`}
                                    className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-500/30 hover:shadow-md md:flex-row md:items-center"
                                >
                                    {/* Simulated Unread Indicator for the first item */}
                                    {index === 0 && (
                                        <div className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
                                    )}

                                    {/* Avatar area */}
                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                        <div className="h-full w-full bg-slate-200 rounded-full flex items-center justify-center text-slate-400 font-bold text-lg">
                                            ?
                                        </div>
                                    </div>

                                    {/* Content area */}
                                    <div className="flex flex-1 flex-col gap-1 pr-8">
                                        <div className="flex flex-wrap items-baseline gap-2">
                                            <h3 className="text-base font-bold text-slate-900">
                                                Anonymous User <span className="font-normal text-sm text-slate-500">to</span> @{msg.recipient_name}
                                            </h3>
                                            {index === 0 && (
                                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">New</span>
                                            )}
                                            <span className="text-xs text-slate-400">
                                                • {msg.created_at ? format(new Date(msg.created_at), "MMM d, h:mm a") : "Just now"}
                                            </span>
                                        </div>

                                        {/* Song attachment specifically displayed if present */}
                                        {(msg.song_name || msg.song_id) && (
                                            <div className="flex items-center gap-2 mt-1 mb-1">
                                                <Music size={14} className="text-blue-500" />
                                                <span className="text-xs font-semibold text-slate-700">Attached Song:</span>
                                                <span className="text-xs text-slate-600 italic">"{msg.song_name || "Unknown Track"}"</span>
                                            </div>
                                        )}

                                        <p className="line-clamp-2 text-sm text-slate-600 leading-relaxed">{msg.message}</p>
                                    </div>

                                    {/* Action icons */}
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                            <Eye size={18} />
                                        </div>
                                    </div>
                                </Link>

                                {/* Delete button kept separate to avoid nested link issues */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(msg.recipient_name);
                                    }}
                                    className="absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    title="Delete Message"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {filteredMessages.length > 0 && (
                        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
                            <p className="text-sm text-slate-500 font-medium">
                                Showing <span className="font-bold text-slate-900">1-{filteredMessages.length}</span> of <span className="font-bold text-slate-900">{allMessages.length}</span> messages
                            </p>
                            <div className="flex gap-2">
                                <button className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                                    Previous
                                </button>
                                <button className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
