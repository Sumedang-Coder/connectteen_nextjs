"use client";

import { useEffect } from "react";
import {
    MessageSquare,
    Calendar,
    Users,
    FileText,
    BarChart3,
    Loader2
} from "lucide-react";
import { useAdminStore } from "@/app/store/useAdminStore";

export default function DashboardPage() {
    const { stats, fetchStats, loading, error } = useAdminStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const statConfig = [
        {
            label: "Total Messages",
            value: stats.messages.toLocaleString(),
            subtext: "Secret Messages in storage",
            icon: <MessageSquare className="text-blue-600" size={24} />,
            bg: "bg-blue-50",
            accent: "text-blue-600",
            overlayIcon: <MessageSquare size={96} className="text-blue-600 opacity-5" />
        },
        {
            label: "Total Events",
            value: stats.events.toLocaleString(),
            subtext: "Active & Published projects",
            icon: <Calendar className="text-indigo-600" size={24} />,
            bg: "bg-indigo-50",
            accent: "text-indigo-600",
            overlayIcon: <Calendar size={96} className="text-indigo-600 opacity-5" />
        },
        {
            label: "Total Users",
            value: stats.users.toLocaleString(),
            subtext: "Registered active members",
            icon: <Users className="text-emerald-600" size={24} />,
            bg: "bg-emerald-50",
            accent: "text-emerald-600",
            overlayIcon: <Users size={96} className="text-emerald-600 opacity-5" />
        },
        {
            label: "Total Articles",
            value: stats.articles.toLocaleString(),
            subtext: "Published community insights",
            icon: <FileText className="text-rose-600" size={24} />,
            bg: "bg-rose-50",
            accent: "text-rose-600",
            overlayIcon: <FileText size={96} className="text-rose-600 opacity-5" />
        }
    ];

    if (loading && stats.messages === 0) {
        return (
            <div className="flex-1 flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="text-blue-600 animate-spin" size={40} />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h2>
                    <p className="text-slate-500 mt-1">Real-time statistics from the ConnectTeen server.</p>
                </div>
                {error && (
                    <div className="px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold uppercase tracking-wide">
                        Warning: {error}
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statConfig.map((stat, index) => (
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
                                <h3 className="text-3xl font-bold text-slate-900 leading-none">
                                    {loading ? "---" : stat.value}
                                </h3>
                                <p className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-tight">{stat.subtext}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
