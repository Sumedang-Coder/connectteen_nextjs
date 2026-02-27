"use client";

import { useState, useEffect } from "react";
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
    ChevronLeft,
    Mail,
    KeyRound,
    ShieldAlert
} from "lucide-react";
import { useAdminStore, AdminUser } from "@/app/store/useAdminStore";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";

const ROLE_DISPLAY = {
    super_admin: "Super Admin",
    content_editor: "Content Editor",
    viewer: "Viewer"
};

export default function ManageAdminsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("content_editor");
    const [invitedToken, setInvitedToken] = useState<string | null>(null);
    const router = useRouter();
    const { user, loading: authLoading } = useAuthStore();

    const {
        admins,
        fetchAdmins,
        inviteAdmin,
        updateAdmin,
        deleteAdmin,
        loading
    } = useAdminStore();

    useEffect(() => {
        if (!authLoading && user && user.role !== "super_admin") {
            toast.error("Access denied. Super Admin only.");
            router.replace("/dashboard");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user?.role === "super_admin") {
            fetchAdmins();
        }
    }, [fetchAdmins, user]);

    if (authLoading || (user && user.role !== "super_admin")) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await inviteAdmin(inviteEmail, inviteRole);
        if (result.success) {
            toast.success("Invitation created successfully.");
            if (result.token) setInvitedToken(result.token);
            setInviteEmail("");
            fetchAdmins();
        } else {
            toast.error("Failed to create invitation.");
        }
    };


    const handleDelete = async (admin: AdminUser) => {
        if (confirm(`Are you sure you want to delete "${admin.name || admin.email}"?`)) {
            const success = await deleteAdmin(admin.id);
            if (success) toast.success("Admin deleted.");
        }
    };

    const filteredAdmins = admins.filter(admin =>
        (admin.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
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
                            onClick={() => {
                                setInvitedToken(null);
                                setShowInviteModal(true);
                            }}
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
                                                        {(admin.name || admin.email).charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900">{admin.name || "Pending Invite..."}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Mail size={14} className="text-slate-400" />
                                                    <span className="text-sm font-medium">{admin.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${admin.role === 'super_admin'
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    }`}>
                                                    {ROLE_DISPLAY[admin.role as keyof typeof ROLE_DISPLAY] || admin.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleDelete(admin)}
                                                        className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                                        disabled={admin.role === 'super_admin'}
                                                        title={admin.role === 'super_admin' ? "Cannot revoke Super Admin" : "Delete Account"}
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

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900">Invite New Administrator</h3>
                            <p className="text-sm text-slate-500 mt-1">Send an invitation to join the management portal.</p>
                        </div>

                        {!invitedToken ? (
                            <form onSubmit={handleInvite} className="p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                                        placeholder="admin@example.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Access Level</label>
                                    <select
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                                    >
                                        <option value="content_editor">Content Editor</option>
                                        <option value="viewer">Viewer</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowInviteModal(false)}
                                        className="flex-1 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50"
                                    >
                                        {loading ? "Sending..." : "Create Invite"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-6 flex flex-col gap-4">
                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                                    <Shield className="mx-auto text-emerald-500 mb-2" size={32} />
                                    <h4 className="text-sm font-bold text-emerald-900">Invite Generated!</h4>
                                    <p className="text-xs text-emerald-700 mt-1">Copy the link below and share it with the user.</p>
                                </div>
                                <div className="flex flex-col gap-1.5 mt-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invitation Link</label>
                                    <div className="flex gap-2">
                                        <input
                                            readOnly
                                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/join-admin?token=${invitedToken}`}
                                            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs select-all truncate"
                                        />
                                        <button
                                            onClick={() => {
                                                const url = `${window.location.origin}/join-admin?token=${invitedToken}`;
                                                navigator.clipboard.writeText(url);
                                                toast.success("Invitation link copied!");
                                            }}
                                            className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                                            title="Copy Link"
                                        >
                                            <KeyRound size={16} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1">* This link will expire in 24 hours.</p>
                                </div>
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="w-full mt-4 px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-lg"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
