"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/admin/auth/sign-in");
    } else if (!loading && isAuthenticated && user?.role !== "admin") {
      router.replace("/");
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-[#020d1a]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
}
