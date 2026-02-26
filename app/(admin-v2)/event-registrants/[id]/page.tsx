"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Search,
    Download,
    MoreVertical,
    ChevronRight,
    Filter,
    ArrowUpDown,
    CheckCircle2
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Local dummy data for visualization
const DUMMY_REGISTRANTS = [
    { id: "1", name: "Alice Thompson", email: "alice.t@gmail.com", registered_at: new Date(Date.now() - 3600000 * 2).toISOString() },
    { id: "2", name: "Bob Peterson", email: "bob.pete@outlook.com", registered_at: new Date(Date.now() - 3600000 * 5).toISOString() },
    { id: "3", name: "Charlie Davis", email: "charlie.d@yahoo.com", registered_at: new Date(Date.now() - 86400000).toISOString() },
    { id: "4", name: "Diana Prince", email: "diana.p@themyscira.com", registered_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: "5", name: "Ethan Hunt", email: "ethan.h@imf.org", registered_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    { id: "6", name: "Fiona Gallagher", email: "fiona.g@southside.com", registered_at: new Date(Date.now() - 86400000 * 4).toISOString() },
    { id: "7", name: "George Miller", email: "george@madmax.com", registered_at: new Date(Date.now() - 86400000 * 5).toISOString() },
    { id: "8", name: "Hannah Abbott", email: "hannah.a@hogwarts.edu", registered_at: new Date(Date.now() - 86400000 * 6).toISOString() },
];

export default function EventRegistrantsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const registrants = DUMMY_REGISTRANTS;

    // Simulate event title based on ID if needed, or use a generic one
    const eventTitle = id === "1" ? "Youth Empowerment Summit 2026" : "Community Gathering";

    const filteredRegistrants = registrants.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50">
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
                        onClick={() => toast.info("Visualization: Exporting data simulated.")}
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
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-100 transition-all hover:scale-105"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{eventTitle}</h2>
                            <p className="text-slate-500 font-medium">Viewing performance and participation list.</p>
                        </div>
                    </div>

                    {/* Stats Summary - Simplified to only Total Registrants */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-1 max-w-sm">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Registrants</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-3xl font-black text-slate-900 leading-none">{registrants.length}</span>
                                <span className="text-xs font-bold text-emerald-500 pb-1">+12% from last wk</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search participants..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-600 text-slate-900"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Filter size={18} /></button>
                                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><ArrowUpDown size={18} /></button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Participant</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Email Address</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Registered Date</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredRegistrants.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-medium">No registrants found for this event.</td></tr>
                                    ) : filteredRegistrants.map((r) => (
                                        <tr key={r.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm uppercase">
                                                        {r.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-900">{r.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">{r.email}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                                {r.registered_at ? format(new Date(r.registered_at), "MMM d, yyyy") : "N/A"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                    <CheckCircle2 size={10} /> Confirmed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => toast.info("Visualization: Action simulated.")}
                                                    className="p-2 text-slate-300 hover:text-slate-900 transition-colors"
                                                >
                                                    <MoreVertical size={18} />
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
                                <button className="px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold text-white uppercase tracking-wider shadow-md shadow-blue-500/20">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
