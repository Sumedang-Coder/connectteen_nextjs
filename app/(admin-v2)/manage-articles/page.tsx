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
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Filter,
    ArrowUpDown
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

// Local dummy data for visualization
const DUMMY_ARTICLES = [
    {
        id: "1",
        title: "Mental Health Awareness in Adolescents",
        description: "Discussing the importance of mental health support for teenagers in today's digital age. This article explores common challenges and how communities can provide better safety nets.",
        image_url: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2083&auto=format&fit=crop",
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        title: "The Future of Community Engagement",
        description: "Exploring new ways for communities to connect and thrive through technology and shared values. We look into digital town halls and collaborative platforms.",
        image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop",
        created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: "3",
        title: "Building Resilience Through Voluntarism",
        description: "How giving back to your local neighborhood can improve personal well-being and strengthen social bonds.",
        image_url: "https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?q=80&w=2070&auto=format&fit=crop",
        created_at: new Date(Date.now() - 172800000).toISOString()
    }
];

export default function ManageArticlesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const articles = DUMMY_ARTICLES;

    const handleDelete = async (title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            toast.success("Visualization: Article deletion simulated.");
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Header/Top Bar */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-slate-500">
                        <span>Admin</span>
                        <ChevronRight size={14} className="mx-1" />
                        <span className="text-slate-900 font-medium">Articles Management</span>
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
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Articles</h2>
                            <p className="text-slate-500 mt-1">Manage, edit, and publish your community content.</p>
                        </div>
                        <Link
                            href="/write-article"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-blue-500/30"
                        >
                            <Plus size={20} />
                            <span>Write Article</span>
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
                                placeholder="Search articles..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400"
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
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Article Title</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Date Published</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredArticles.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-slate-400">No articles found.</td>
                                        </tr>
                                    ) : filteredArticles.map((article) => (
                                        <tr key={article.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-900">{article.title}</span>
                                                    <span className="text-xs text-slate-500 line-clamp-1">{article.description}...</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {article.created_at ? format(new Date(article.created_at), "MMM dd, yyyy") : "N/A"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-200 bg-blue-50 text-blue-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    Published
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/write-article?edit=${article.id}`}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(article.title)}
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
                        {filteredArticles.length > 0 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
                                <span className="text-sm text-slate-500">
                                    Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{filteredArticles.length}</span> of <span className="font-medium text-slate-900">{articles.length}</span> results
                                </span>
                                <div className="flex items-center gap-2">
                                    <button disabled className="p-2 rounded-lg text-slate-400 cursor-not-allowed">
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
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
