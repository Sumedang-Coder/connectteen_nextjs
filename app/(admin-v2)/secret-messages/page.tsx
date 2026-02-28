"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Search,
    Trash2,
    Music,
    Mail,
    ChevronRight,
    Eye,
    ChevronLeft,
    ArrowUpDown,
    Loader2
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import PaginationComponent from "@/components/PaginationComponent";
import { useMessageStore } from "@/app/store/useMessageStore";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function SecretMessagesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortBy, setSortBy] = useState("-createdAt");
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useAuthStore();

    const { allMessages, loading, pagination, fetchAllMessages, deleteMessage } = useMessageStore();

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); // Reset to first page on search
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch messages on criteria change
    useEffect(() => {
        fetchAllMessages({
            search: debouncedSearch,
            sort: sortBy,
            page: currentPage,
            limit: 10
        });
    }, [debouncedSearch, sortBy, currentPage, fetchAllMessages]);

    const handleDelete = async (id: string) => {
        if (confirm(`Are you sure you want to delete this secret message?`)) {
            toast.promise(deleteMessage(id), {
                loading: 'Deleting message...',
                success: 'Message deleted successfully',
                error: 'Failed to delete message'
            });
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-[#f6f7f8] font-display selection:bg-blue-500/20 selection:text-blue-500 relative">
            {/* Minimalist Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all duration-300">
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white shadow-xl border border-slate-100">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="text-sm font-bold text-slate-600 tracking-tight">Updating Inbox...</span>
                    </div>
                </div>
            )}

            <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-12 lg:py-10">
                <div className="mx-auto max-w-5xl">
                    {/* Header Section */}
                    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600">Admin Private Inbox</h2>
                            <p className="mt-2 text-slate-500 font-medium">Access confidential communications sent directly to you.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200/60">
                            <span className="pl-2 text-xs font-bold uppercase tracking-wider text-slate-400">Sort by</span>
                            <div className="h-4 w-px bg-slate-200"></div>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border-none bg-transparent py-1.5 pl-2 pr-8 text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer appearance-none"
                            >
                                <option value="-createdAt">Newest First</option>
                                <option value="createdAt">Oldest First</option>
                            </select>
                            <ArrowUpDown size={14} className="mr-2 text-slate-400" />
                        </div>
                    </header>

                    {/* Search Bar */}
                    <div className="mb-8 group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all rounded-2xl bg-white p-2 shadow-sm border border-slate-200/60">
                        <div className="relative flex w-full items-center">
                            <Search className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-blue-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search by message content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-12 w-full rounded-xl border-none bg-transparent pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:ring-0 font-medium"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mr-2 px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        {allMessages.length === 0 ? (
                            !loading && (
                                <div className="p-20 flex flex-col items-center justify-center text-center bg-slate-50/30">
                                    <Mail className="text-slate-300 mb-4" size={32} />
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">No messages found</h3>
                                    <p className="text-slate-400 font-medium max-w-xs mx-auto">Try adjusting your search or filters.</p>
                                </div>
                            )
                        ) : allMessages.map((msg, index) => (
                            <div key={msg.id} className="relative group border-b border-slate-100 last:border-b-0">
                                <Link
                                    href={`/secret-messages/${msg.id}`}
                                    className="flex items-center gap-4 px-6 py-4 transition-all hover:bg-slate-50/80"
                                >
                                    <div className="flex-1 min-w-0 pr-12">
                                        <div className="flex items-center justify-between gap-4 mb-0.5">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-sm font-bold text-slate-900 truncate">
                                                    To: {msg.recipient_name}
                                                </span>
                                                {(msg.song_name || msg.song_artist) && (
                                                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 shrink-0">
                                                        <Music size={10} />
                                                        <span className="truncate max-w-[100px]">{msg.song_name}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[11px] font-medium text-slate-400 shrink-0 uppercase tracking-tight">
                                                {msg.created_at ? format(new Date(msg.created_at), "MMM d") : "Today"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-1 group-hover:text-slate-700 transition-colors">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                                        <ChevronRight size={16} />
                                    </div>
                                </Link>

                                {/* Delete button */}
                                {user?.role !== "viewer" && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete(msg.id);
                                        }}
                                        className="absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-rose-600 opacity-0 group-hover:opacity-100 transition-all z-20"
                                        title="Delete Message"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {allMessages.length > 0 && (
                        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200/60 pt-8 sm:flex-row">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-slate-500 font-bold">
                                    Total Messages: <span className="text-slate-900 border-b-2 border-blue-500/20">{pagination.totalMessages}</span>
                                </p>
                                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </p>
                            </div>
                            <PaginationComponent
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={setCurrentPage}
                                activeColor="slate"
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
