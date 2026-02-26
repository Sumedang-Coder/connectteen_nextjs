"use client";

import {
    MessageSquare,
    Calendar,
    Users,
    FileText,
    Plus,
    BarChart3
} from "lucide-react";

// Local dummy data for visualization
const DUMMY_STATS = {
    messages: 124,
    events: 42,
    users: "8,450",
    articles: 15
};

export default function DashboardPage() {
    const stats = [
        {
            label: "Total Messages",
            value: DUMMY_STATS.messages.toLocaleString(),
            subtext: "Public & Secret combined",
            icon: <MessageSquare className="text-blue-600" size={24} />,
            bg: "bg-blue-50",
            accent: "text-blue-600",
            overlayIcon: <MessageSquare size={96} className="text-blue-600 opacity-5" />
        },
        {
            label: "Total Events",
            value: DUMMY_STATS.events.toLocaleString(),
            subtext: "Active & Past events",
            icon: <Calendar className="text-indigo-600" size={24} />,
            bg: "bg-indigo-50",
            accent: "text-indigo-600",
            overlayIcon: <Calendar size={96} className="text-indigo-600 opacity-5" />
        },
        {
            label: "Total Users",
            value: DUMMY_STATS.users,
            subtext: "Registered members",
            icon: <Users className="text-emerald-600" size={24} />,
            bg: "bg-emerald-50",
            accent: "text-emerald-600",
            overlayIcon: <Users size={96} className="text-emerald-600 opacity-5" />
        },
        {
            label: "Total Articles",
            value: DUMMY_STATS.articles.toLocaleString(),
            subtext: "Published content",
            icon: <FileText className="text-rose-600" size={24} />,
            bg: "bg-rose-50",
            accent: "text-rose-600",
            overlayIcon: <FileText size={96} className="text-rose-600 opacity-5" />
        }
    ];

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h2>
                    <p className="text-slate-500 mt-1">Snapshot of your community's performance.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 transition-opacity">
                            {stat.overlayIcon}
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div className="flex items-center gap-3 text-slate-500">
                                <div className={`p-2 ${stat.bg} ${stat.accent} rounded-lg`}>
                                    {stat.icon}
                                </div>
                                <p className="text-sm font-medium">{stat.label}</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                                <p className="text-slate-400 text-xs mt-1">{stat.subtext}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
