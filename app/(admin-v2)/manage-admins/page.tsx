"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    ChevronRight,
    Bell,
    HelpCircle,
    Edit,
    Trash2,
    Filter,
    Shield,
    ShieldAlert,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Mail,
    KeyRound
} from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

// Local dummy data for visualization
const DUMMY_ADMINS: AdminUser[] = [
    { id: "1", name: "Super Admin", email: "admin@connectteen.com", role: "Super Admin" },
    { id: "2", name: "Content Moderator", email: "moderator@connectteen.com", role: "Editor" },
    { id: "3", name: "Events Manager", email: "events@connectteen.com", role: "Manager" },
];

export default function ManageAdminsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const admins = DUMMY_ADMINS;

    const handleDelete = async (name: string) => {
        if (confirm(`Are you sure you want to revoke access for "${name}"? This action cannot be undone.`)) {
            toast.success("Visualization: Admin revocation simulated.");
        }
    };

    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Header/Top Bar */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-slate-500">
                        <span>Security</span>
                        <ChevronRight size={14} className="mx-1" />
                        <span className="text-slate-900 font-medium">Manage Administrators</span>
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
                <div className="max-w-6xl mx-auto flex flex-col gap-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Accounts</h2>
                            <p className="text-slate-500 mt-1">Control who has access to the management portal.</p>
                        </div>
                        <button
                            onClick={() => toast.info("Visualization: Invite system simulated.")}
                            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                        >
                            <Plus size={20} />
                            <span>Invite Admin</span>
                        </button>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                                <Filter size={16} />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">

                        {/* Security Notice */}
                        <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-start gap-3">
                            <ShieldAlert className="text-amber-500 mt-0.5 shrink-0" size={20} />
                            <div>
                                <h4 className="text-sm font-bold text-amber-800">High-Security Area</h4>
                                <p className="text-xs text-amber-700 mt-1">Changes made here affect systemic access. Please be absolutely certain before revoking or modifying permissions.</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/50">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Administrator</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Access Level</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredAdmins.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-slate-400">No administrators found.</td>
                                        </tr>
                                    ) : filteredAdmins.map((admin) => (
                                        <tr key={admin.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                                        {admin.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-900">{admin.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Mail size={14} className="text-slate-400" />
                                                    <span className="text-sm font-medium">{admin.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${admin.role === 'Super Admin'
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    }`}>
                                                    <Shield size={12} />
                                                    {admin.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                                        title="Edit Permissions"
                                                        onClick={() => toast.info("Visualization: Edit permissions simulated.")}
                                                    >
                                                        <KeyRound size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(admin.name)}
                                                        className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                                        disabled={admin.role === 'Super Admin'}
                                                        title={admin.role === 'Super Admin' ? "Cannot revoke Super Admin" : "Revoke Access"}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
