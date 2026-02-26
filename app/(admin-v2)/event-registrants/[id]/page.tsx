"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Search,
    Download,
    MoreVertical,
    ChevronRight,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    Loader2,
    UserCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useEventStore } from "@/app/store/useEventStore";

export default function EventRegistrantsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const {
        event,
        registrants,
        loading,
        fetchEventById,
        fetchRegistrants
    } = useEventStore();

    useEffect(() => {
        if (id) {
            fetchEventById(id as string);
            fetchRegistrants(id as string);
        }
    }, [id, fetchEventById, fetchRegistrants]);

    const filteredRegistrants = registrants.filter(r =>
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && !event) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 gap-4">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                <p className="text-sm font-bold text-slate-500 animate-pulse uppercase tracking-widest">Loading database...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50 font-display">
            {/* Top Bar */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-slate-500">
                        <button onClick={() => router.push("/manage-events")} className="hover:text-slate-900 transition-colors">Events</button>
                        <ChevronRight size={14} className="mx-1" />
                        <span className="text-slate-900 font-medium">Registrants</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => toast.info("Data export will be available in the next update.")}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <Download size={16} />
                        <span>Export CSV</span>
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-7xl mx-auto flex flex-col gap-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-100 transition-all hover:scale-105 shrink-0"
                        >
                            <ChevronLeft size={20} className="sm:size-6" />
                        </button>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">{event?.event_title || "Loading Event..."}</h2>
                            <p className="text-slate-500 text-xs sm:text-sm font-medium">Viewing performance and participation list.</p>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-1 max-w-sm">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Registrants</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-3xl font-black text-slate-900 leading-none">{registrants.length}</span>
                                {event?.quota && event.quota > 0 && (
                                    <span className="text-sm font-bold text-slate-400 pb-1">/ {event.quota} Capacity</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col relative">
                        {loading && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                            </div>
                        )}
                        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search participants by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-600 text-slate-900"
                                />
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">
                                    Total: <span className="text-slate-900">{filteredRegistrants.length}</span> Results
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Filter size={18} /></button>
                                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><ArrowUpDown size={18} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Card View (Visible on Mobile) */}
                        <div className="grid grid-cols-1 gap-4 lg:hidden p-4">
                            {filteredRegistrants.length === 0 ? (
                                <div className="bg-white p-10 text-center text-slate-400 font-medium">
                                    No registrants found.
                                </div>
                            ) : filteredRegistrants.map((r: any) => (
                                <div key={r.id || r._id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="size-11 rounded-lg bg-white flex items-center justify-center text-slate-400 font-black text-lg border border-slate-200 overflow-hidden">
                                            {r.avatarUrl ? <img src={r.avatarUrl} alt="" className="w-full h-full object-cover" /> : r.name?.charAt(0)}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-black text-slate-900 truncate">{r.name || "Anonymous"}</span>
                                            <span className="text-[10px] font-bold text-slate-400 truncate mt-0.5 uppercase tracking-wider">{r.email || "No Email"}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/60">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Phone Number</span>
                                            <span className="text-[10px] font-bold text-slate-700 mt-0.5">{r.no_hp || "-"}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Status</span>
                                            <span className="mt-1 flex items-center gap-1 text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 tracking-tighter">
                                                <CheckCircle2 size={8} />
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table Section (Hidden on Mobile) */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Participant</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Email Address</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Phone Number</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Verification</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredRegistrants.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-medium">No registrants found.</td></tr>
                                    ) : filteredRegistrants.map((r: any) => (
                                        <tr key={r.id || r._id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {r.avatarUrl ? (
                                                        <img src={r.avatarUrl} alt={r.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                                                    ) : (
                                                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm uppercase">
                                                            {r.name?.charAt(0) || <UserCircle size={20} />}
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-bold text-slate-900">{r.name || "Anonymous"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">{r.email || "N/A"}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">{r.no_hp || "-"}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                    <CheckCircle2 size={10} /> Confirmed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => toast.success(`Verified: ${r.name}`)}
                                                    className="p-2 text-slate-300 hover:text-emerald-500 transition-colors"
                                                    title="Verify Participant"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {filteredRegistrants.length} Total Results</p>
                            <div className="flex gap-2">
                                <button disabled className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-300 uppercase tracking-wider">Previous</button>
                                <button disabled className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-300 uppercase tracking-wider">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
