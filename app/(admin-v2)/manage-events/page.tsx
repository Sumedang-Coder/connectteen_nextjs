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
    Eye
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

// Local dummy data for visualization
const DUMMY_EVENTS = [
    {
        id: "1",
        event_title: "Youth Empowerment Summit 2026",
        description: "A full-day event dedicated to empowering the next generation of leaders with workshops, keynote speakers, and networking sessions.",
        location: "Jakarta Convention Center",
        date: "2026-05-15",
        image_url: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?q=80&w=2070&auto=format&fit=crop",
        registrants_count: 156
    },
    {
        id: "2",
        event_title: "Tech For Good Hackathon",
        description: "Join us for a 48-hour challenge to build digital solutions for local community problems. Prizes and mentorship included.",
        location: "Online / Virtual",
        date: "2026-06-20",
        image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
        registrants_count: 89
    },
    {
        id: "3",
        event_title: "Mental Health Webinar: Managing Stress",
        description: "A professional-led session on practical techniques for managing daily stress and improving emotional resilience.",
        location: "Zoom Video Network",
        date: "2026-07-05",
        image_url: "https://images.unsplash.com/photo-1576091160550-217359f4e9f8?q=80&w=2070&auto=format&fit=crop",
        registrants_count: 245
    }
];

export default function ManageEventsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const events = DUMMY_EVENTS;

    const handleDelete = async (title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            toast.success("Visualization: Event deletion simulated.");
        }
    };

    const filteredEvents = events.filter(event =>
        event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
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
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                                <Filter size={16} />
                                <span>Filters</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                                <ArrowUpDown size={16} />
                                <span>Sort</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/50">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Event Details</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Venue & Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Registrants</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredEvents.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-10 text-center text-slate-400">No events found.</td>
                                        </tr>
                                    ) : filteredEvents.map((event) => (
                                        <tr key={event.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    {event.image_url ? (
                                                        <img src={event.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                                            <CalendarIcon size={20} />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900">{event.event_title}</span>
                                                        <span className="text-xs text-slate-500 line-clamp-1">{event.description.substring(0, 50)}...</span>
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
                                                        <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <span className="text-sm font-bold text-slate-900">{event.registrants_count || 0}</span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">People</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-emerald-200 bg-emerald-50 text-emerald-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    Active
                                                </span>
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
                                                        onClick={() => handleDelete(event.event_title)}
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

                        {/* Pagination Placeholder */}
                        {filteredEvents.length > 0 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
                                <span className="text-sm text-slate-500">
                                    Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{filteredEvents.length}</span> of <span className="font-medium text-slate-900">{events.length}</span> results
                                </span>
                                <div className="flex items-center gap-2">
                                    <button disabled className="p-2 rounded-lg text-slate-400 cursor-not-allowed">
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-medium">1</button>
                                    <button className="p-2 rounded-lg text-slate-400 cursor-not-allowed">
                                        <ChevronRightIcon size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
