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
    Eye,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Filter,
    ArrowUpDown
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useArticleStore } from "@/app/store/useArticleStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PaginationComponent from "@/components/PaginationComponent";


export default function ManageArticlesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("-createdAt");
    const router = useRouter();
    const { articles, fetchArticles, deleteArticle, loading, pagination } = useArticleStore();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchArticles({
                search: searchTerm,
                sort: sortBy,
                page: 1,
                limit: 10
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, sortBy, fetchArticles]);

    const handlePageChange = (page: number) => {
        fetchArticles({
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
            const success = await deleteArticle(id);
            if (success) {
                toast.success("Article deleted successfully.");
            } else {
                toast.error("Failed to delete article.");
            }
        }
    };

    const filteredArticles = articles;

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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 relative">
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-50/20 backdrop-blur-[1px]">
                        <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                )}

                <div className={`max-w-7xl mx-auto flex flex-col gap-6 h-full transition-opacity duration-300 ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
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
                        {articles.length === 0 ? (
                            <div className="bg-white p-10 rounded-xl border border-slate-200 text-center text-slate-400">
                                No articles found.
                            </div>
                        ) : articles.map((article) => (
                            <div key={article.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                        <img src={article.image_url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-bold text-slate-900 line-clamp-2">{article.title}</span>
                                        <span className="text-[10px] text-slate-400 font-medium uppercase mt-1">
                                            {article.created_at ? format(new Date(article.created_at), "MMM d, yyyy") : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {article.id.slice(-6)}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => router.push(`/write-article?edit=${article.id}`)}
                                            className="p-2 text-slate-500 bg-slate-50 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article.id, article.title)}
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
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Article Title</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Date Published</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {articles.length === 0 ? (
                                        <tr key="no-articles">
                                            <td colSpan={3} className="px-6 py-10 text-center text-slate-400">No articles found.</td>
                                        </tr>
                                    ) : articles.map((article) => (
                                        <tr key={article.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                                        <img
                                                            src={article.image_url}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 line-clamp-1">{article.title}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider text-nowrap">ID: {article.id.slice(-6)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                                {article.created_at ? format(new Date(article.created_at), "MMM d, yyyy") : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => router.push(`/write-article?edit=${article.id}`)}
                                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(article.id, article.title)}
                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
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
                                    Showing <span className="font-medium text-slate-900">{((pagination.currentPage - 1) * pagination.limit) + 1}</span> to <span className="font-medium text-slate-900">{Math.min(pagination.currentPage * pagination.limit, pagination.totalArticles)}</span> of <span className="font-medium text-slate-900">{pagination.totalArticles}</span> results
                                </span>
                                <PaginationComponent
                                    currentPage={pagination.currentPage}
                                    totalPages={pagination.totalPages}
                                    onPageChange={handlePageChange}
                                    activeColor="blue"
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
                                activeColor="blue"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
