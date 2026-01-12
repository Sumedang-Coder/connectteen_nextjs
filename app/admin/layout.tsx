import "@/app/admin/css/satoshi.css";
import "@/app/admin/css/style.css";

import "flatpickr/dist/flatpickr.min.css";

import { Sidebar } from "@/app/admin/components/Layouts/sidebar";
import { Header } from "@/app/admin/components/Layouts/header";

import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";

import { Providers } from "./page/providers";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <NextTopLoader color="#5750F1" showSpinner={false} />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex w-full flex-col bg-gray-2 dark:bg-[#020d1a]">
          <Header />

          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
