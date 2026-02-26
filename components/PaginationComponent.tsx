"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    activeColor?: string; // e.g., "blue", "indigo", "slate"
}

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
    activeColor = "blue",
}: PaginationComponentProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const delta = 1; // Number of pages around current page

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i);
            } else if (
                i === currentPage - delta - 1 ||
                i === currentPage + delta + 1
            ) {
                pages.push("...");
            }
        }

        // Filter duplicates and consecutive ellipses
        return pages.filter((item, index) => pages.indexOf(item) === index);
    };

    const colorClasses: Record<string, string> = {
        blue: "bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700",
        indigo: "bg-indigo-600 text-white shadow-indigo-500/20 hover:bg-indigo-700",
        slate: "bg-slate-900 text-white shadow-slate-900/20 hover:bg-slate-800",
    };

    const textColors: Record<string, string> = {
        blue: "hover:text-blue-600",
        indigo: "hover:text-indigo-600",
        slate: "hover:text-slate-900",
    };

    return (
        <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl text-slate-400 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-transparent hover:border-slate-200"
                title="Previous Page"
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === "..." ? (
                            <span className="w-9 h-9 flex items-center justify-center text-slate-400">
                                <MoreHorizontal size={14} />
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-black transition-all shadow-sm ${currentPage === page
                                        ? `${colorClasses[activeColor] || colorClasses.blue} shadow-md`
                                        : `bg-white border border-slate-200 text-slate-600 ${textColors[activeColor] || textColors.blue} hover:border-slate-300 hover:bg-slate-50`
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl text-slate-400 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-transparent hover:border-slate-200"
                title="Next Page"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
