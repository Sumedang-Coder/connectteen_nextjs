"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Lock,
  Calendar,
  FileText,
  LogOut,
  Menu,
  X,
  Plus,
  Bell,
  HelpCircle,
  Shield
} from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// Note: Using Lucide icons as a modern replacement for Material Symbols 
// to avoid external font dependencies where possible, 
// but sticking to the design's layout and colors.

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
}

const SidebarItem = ({ href, icon, label, badge, active }: SidebarItemProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${active
      ? "bg-blue-50 text-blue-600"
      : "text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900"
      }`}
  >
    <span className={`${active ? "text-blue-600" : "group-hover:text-blue-600"}`}>
      {icon}
    </span>
    <div className="flex flex-1 justify-between items-center text-sm font-medium">
      <span>{label}</span>
      {badge !== undefined && (
        <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  </Link>
);

export default function AdminV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuthStore();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Authentication & Authorization Guard (Decoupled from Secret)
  useEffect(() => {
    if (!loading) {
      const ADMIN_ROLES = ["super_admin", "content_editor", "viewer"];

      if (pathname === "/signin-admin") {
        // If on signin page but already logged in as admin, go to dashboard
        if (user && ADMIN_ROLES.includes(user.role)) {
          router.push("/dashboard");
        }
      } else {
        // If on protected page but no user or not admin
        if (!user) {
          router.push("/signin-admin");
        } else if (!ADMIN_ROLES.includes(user.role)) {
          router.push("/");
        }
      }
    }
  }, [user, loading, router, pathname]);

  // Close FAB and Sidebar when route changes
  useEffect(() => {
    setIsFabOpen(false);
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push("/signin-admin");
  };

  // Handle loading state to prevent flash of unauthenticated content
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Verifying access...</p>
      </div>
    );
  }

  // Prevent rendering if not authorized and not on auth page
  const isAuthPage = pathname === "/signin-admin";
  const isAdmin = user && ["super_admin", "content_editor", "viewer"].includes(user.role);

  if (!isAuthPage && !isAdmin) {
    return null;
  }

  // If this is the signin page, show it without layout
  if (isAuthPage) {
    if (isAdmin) return null; // Already redirecting in useEffect
    return <div className={inter.className}>{children}</div>;
  }

  return (
    <div className={`${inter.className} bg-white text-slate-900 min-h-screen flex overflow-hidden`}>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed inset-y-0 left-0 bg-slate-50 border-r border-slate-200 z-20">
        <div className="flex flex-col h-full justify-between p-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <div
                className="bg-blue-100 size-10 rounded-full flex items-center justify-center ring-2 ring-blue-500/20 overflow-hidden"
              >
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-blue-600 font-bold">A</span>
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 text-base font-semibold leading-tight">Admin Panel</h1>
                <p className="text-slate-500 text-xs font-normal capitalize">{user?.role?.replace('_', ' ') || 'Administrator'}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              <SidebarItem
                href="/dashboard"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                active={pathname === "/dashboard"}
              />
              <SidebarItem
                href="/manage-articles"
                icon={<FileText size={20} />}
                label="Articles"
                active={pathname === "/manage-articles" || pathname === "/write-article"}
              />
              <SidebarItem
                href="/manage-events"
                icon={<Calendar size={20} />}
                label="Events"
                active={pathname === "/manage-events" || pathname === "/create-event"}
              />
              <SidebarItem
                href="/secret-messages"
                icon={<Lock size={20} />}
                label="Secret Messages"
                active={pathname === "/secret-messages"}
              />
              {user?.role === "super_admin" && (
                <SidebarItem
                  href="/manage-admins"
                  icon={<Shield size={20} />}
                  label="Manage Admins"
                  active={pathname === "/manage-admins"}
                />
              )}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm"
          >
            <LogOut size={18} />
            <span className="truncate">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>
          <div className="size-8 rounded-full bg-blue-100" />
        </header>

        <div className="flex-1 overflow-y-auto bg-white">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-slate-50 p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-slate-900 text-lg font-bold">Admin Panel</h1>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                <SidebarItem
                  href="/dashboard"
                  icon={<LayoutDashboard size={20} />}
                  label="Dashboard"
                  active={pathname === "/dashboard"}
                />
                <SidebarItem
                  href="/manage-articles"
                  icon={<FileText size={20} />}
                  label="Articles"
                  active={pathname === "/manage-articles"}
                />
                <SidebarItem
                  href="/manage-events"
                  icon={<Calendar size={20} />}
                  label="Events"
                  active={pathname === "/manage-events"}
                />
                <SidebarItem
                  href="/secret-messages"
                  icon={<Lock size={20} />}
                  label="Secret Messages"
                  active={pathname === "/secret-messages"}
                />
                {user?.role === "super_admin" && (
                  <SidebarItem
                    href="/manage-admins"
                    icon={<Shield size={20} />}
                    label="Manage Admins"
                    active={pathname === "/manage-admins"}
                  />
                )}
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg h-10 bg-white border border-slate-200 text-slate-700 text-sm font-medium"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </aside>
        </div>
      )}

      {/* Floating Action Button (Matches Dashboard Design) */}
      {pathname === "/dashboard" && user?.role !== "viewer" && (
        <div className="fixed bottom-8 right-8 z-50">
          {/* Backdrop for FAB to close on click outside (mobile friendly) */}
          {isFabOpen && (
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setIsFabOpen(false)}
            />
          )}

          <button
            onClick={() => setIsFabOpen(!isFabOpen)}
            className={`flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg shadow-blue-500/40 hover:scale-105 transition-all duration-200 ${isFabOpen ? 'bg-slate-800 rotate-45' : 'bg-blue-600'
              }`}
          >
            <Plus size={28} />
          </button>

          <div
            className={`absolute bottom-16 right-0 flex flex-col items-end gap-2 transition-all duration-200 ${isFabOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
              }`}
          >
            <Link
              href="/create-event"
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-lg shadow-lg border border-slate-200 hover:bg-slate-50 whitespace-nowrap"
            >
              <span>New Event</span>
              <Calendar size={18} />
            </Link>
            <Link
              href="/write-article"
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-lg shadow-lg border border-slate-200 hover:bg-slate-50 whitespace-nowrap"
            >
              <span>Write Article</span>
              <FileText size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
