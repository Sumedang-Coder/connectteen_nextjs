"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSignIn from "@/app/admin/components/Auth/AdminSignIn";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuthStore();

  useEffect(() => {
    // Jalankan redirect jika loading sudah selesai dan user sudah login
    if (!loading && isAuthenticated) {
      if (user?.role === "admin") {
        router.replace("/admin/page");
      } else {
        router.replace("/");
      }
    }
  }, [isAuthenticated, user, router, loading]);

  if (loading) return null;
  if (isAuthenticated) return null;

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-wrap items-center">
        <div className="w-full flex min-h-screen justify-center items-center">
          <div className="w-full p-4 lg:w-1/3 animate-fade-in">
            <h2 className="text-center text-3xl font-bold">Admin Sign In</h2>
            <hr className="my-3" />
            <AdminSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
