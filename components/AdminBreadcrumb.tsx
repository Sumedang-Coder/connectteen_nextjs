"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AdminBreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
    return (
        <nav className="flex items-center text-[10px] sm:text-sm text-slate-500 flex-wrap overflow-hidden py-1">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <ChevronRight size={12} className="mx-0.5 sm:mx-1 shrink-0 text-slate-300" />
                        )}
                        
                        {isLast ? (
                            <span className="text-slate-900 font-bold truncate max-w-[100px] sm:max-w-none">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href || "#"}
                                className={`transition-colors hover:text-blue-600 whitespace-nowrap truncate max-w-[80px] sm:max-w-none ${
                                    index === 0 ? "font-medium" : "hidden md:inline"
                                }`}
                            >
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
