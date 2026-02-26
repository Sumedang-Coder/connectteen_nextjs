"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    ChevronRight,
    Bell,
    HelpCircle,
    Edit,
    Trash2,
    Filter,
    ArrowUpDown,
    MapPin,
    Calendar as CalendarIcon,
    Users,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Eye,
    Globe as GlobeIcon,
    Lock as LockIcon
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useEventStore } from "@/app/store/useEventStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PaginationComponent from "@/components/PaginationComponent";


export default function ManageEventsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("-createdAt");
    const router = useRouter();
    const { events, fetchEvents, deleteEvent, loading, pagination } = useEventStore();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchEvents({
                search: searchTerm,
                sort: sortBy,
                page: 1,
                limit: 10
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, sortBy, fetchEvents]);

    const handlePageChange = (page: number) => {
        fetchEvents({
            search: searchTerm,
            sort: sortBy,
            page: page,
            limit: 10
        });
    };

    const handleSortChange = () => {
        const newSort = sortBy === "-createdAt" ? "createdAt" : "-createdAt";
        setSortBy(newSort);
    };

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            const success = await deleteEvent(id);
            if (success) {
                toast.success("Event deleted successfully.");
            } else {
                toast.error("Failed to delete event.");
            }
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Header/Top Bar */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-slate-500">
                        <span>Admin</span>
                        <ChevronRight size={14} className="mx-1" />
                        <span className="text-slate-900 font-medium">Events Management</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
                        <Bell size={20} />
                    </button>
                    <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
                        <HelpCircle size={20} />
                    </button>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 relative">
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-50/20 backdrop-blur-[1px]">
                        <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    </div>
                )}

                <div className={`max-w-7xl mx-auto flex flex-col gap-6 h-full transition-opacity duration-300 ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Events</h2>
                            <p className="text-slate-500 mt-1">Organize and track your community gatherings.</p>
                        </div>
                        <Link
                            href="/create-event"
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-indigo-500/30"
                        >
                            <Plus size={20} />
                            <span>Create Event</span>
                        </Link>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search events by title or location..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSortChange}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-slate-700"
                            >
                                <ArrowUpDown size={16} />
                                <span>{sortBy === "-createdAt" ? "Newest First" : "Oldest First"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Card View (Visible on Mobile) */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {events.length === 0 ? (
                            <div className="bg-white p-10 rounded-xl border border-slate-200 text-center text-slate-400">
                                No events found.
                            </div>
                        ) : events.map((event) => (
                            <div key={event.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                        {event.image_url ? (
                                            <img src={event.image_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full text-indigo-500 flex items-center justify-center">
                                                <CalendarIcon size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-bold text-slate-900 line-clamp-1">{event.event_title}</span>
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mt-1">
                                            <MapPin size={10} className="text-indigo-500" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                                            <CalendarIcon size={10} />
                                            <span>{event.date ? format(new Date(event.date), "MMM d, yyyy") : "TBA"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            {event.status === "open" ? (
                                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black border border-emerald-200 bg-emerald-50 text-emerald-700 uppercase tracking-tighter">Open</span>
                                            ) : event.status === "full" ? (
                                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black border border-amber-200 bg-amber-50 text-amber-700 uppercase tracking-tighter">Full</span>
                                            ) : (
                                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black border border-rose-200 bg-rose-50 text-rose-700 uppercase tracking-tighter">Closed</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-900 tracking-tighter uppercase whitespace-nowrap">
                                            {event.registrants_count || 0} / {event.quota > 0 ? event.quota : "∞"}
                                        </span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1 mt-0.5">
                                            {event.visibility === "public" ? <GlobeIcon size={8} /> : <LockIcon size={8} />}
                                            {event.visibility}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/event-registrants/${event.id}`}
                                            className="p-2 text-slate-500 bg-slate-50 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                        >
                                            <Users size={18} />
                                        </Link>
                                        <Link
                                            href={`/create-event?edit=${event.id}`}
                                            className="p-2 text-slate-500 bg-slate-50 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(event.id, event.event_title)}
                                            className="p-2 text-slate-500 bg-slate-50 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table Section (Hidden on Mobile) */}
                    <div className="hidden md:flex bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-col min-h-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/50">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Event Details</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Venue & Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Registrants</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Visibility</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {events.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-slate-400">No events found.</td>
                                        </tr>
                                    ) : events.map((event) => (
                                        <tr key={event.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    {event.image_url ? (
                                                        <img src={event.image_url} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                                            <CalendarIcon size={20} />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900">{event.event_title}</span>
                                                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">ID: {event.id.slice(-6)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                                        <MapPin size={12} className="text-indigo-500" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                        <CalendarIcon size={12} />
                                                        <span>{event.date ? format(new Date(event.date), "MMM dd, yyyy") : "TBA"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <span className="text-sm font-bold text-slate-900">
                                                        {event.registrants_count || 0} / {event.quota > 0 ? event.quota : "∞"}
                                                    </span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                        {event.quota > 0 ? "Quota Filled" : "Unlimited"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {event.status === "open" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-emerald-200 bg-emerald-50 text-emerald-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Open
                                                    </span>
                                                ) : event.status === "full" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-amber-200 bg-amber-50 text-amber-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                        Full
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-rose-200 bg-rose-50 text-rose-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        Closed
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {event.visibility === "public" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-indigo-200 bg-indigo-50 text-indigo-700">
                                                        <GlobeIcon size={12} />
                                                        Public
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-slate-200 bg-slate-50 text-slate-700">
                                                        <LockIcon size={12} />
                                                        Private
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/event-registrants/${event.id}`}
                                                        title="View Registrants"
                                                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                                                    >
                                                        <Users size={18} />
                                                    </Link>
                                                    <Link
                                                        href={`/create-event?edit=${event.id}`}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(event.id, event.event_title)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-rose-600 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Section (Integrated with Table for Desktop) */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-auto flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
                                <span className="text-sm text-slate-500">
                                    Showing <span className="font-medium text-slate-900">{((pagination.currentPage - 1) * pagination.limit) + 1}</span> to <span className="font-medium text-slate-900">{Math.min(pagination.currentPage * pagination.limit, pagination.totalEvents)}</span> of <span className="font-medium text-slate-900">{pagination.totalEvents}</span> results
                                </span>
                                <PaginationComponent
                                    currentPage={pagination.currentPage}
                                    totalPages={pagination.totalPages}
                                    onPageChange={handlePageChange}
                                    activeColor="indigo"
                                />
                            </div>
                        )}
                    </div>

                    {/* Mobile Pagination View (Visible on Mobile) */}
                    {pagination.totalPages > 1 && (
                        <div className="flex flex-col items-center gap-4 pt-2 pb-8 md:hidden">
                            <span className="text-xs text-slate-500 font-medium">
                                Page <span className="text-slate-900">{pagination.currentPage}</span> of <span className="text-slate-900">{pagination.totalPages}</span>
                            </span>
                            <PaginationComponent
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                                activeColor="indigo"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
