'use client'
import { Sidebar } from "@/app/admin/components/Layouts/sidebar";
import { Header } from "@/app/admin/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Providers } from "./page/providers";
import Loader from "@/components/Loader";

export default function AdminLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      router.replace("/admin/auth/sign-in");
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
     <Loader size="md" fullScreen={true}/>
    );
  }

  return (
    <Providers>
      <NextTopLoader color="#5750F1" showSpinner={false} />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex w-full flex-col bg-gray-2 dark:bg-[#020d1a]">
          <Header />

          <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}