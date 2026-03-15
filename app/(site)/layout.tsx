import type { Metadata } from "next";
import "../globals.css";
import { SiteLayout } from "@/components/templates/site-layout";
import NProgressProvider from "@/components/nprogess-setup";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ConnectTeen",
  description: "Kita terhubung untuk menginspirasi. Sebuah komunitas bagi remaja untuk berbagi cerita, belajar, dan tumbuh bersama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <NProgressProvider />
      </Suspense>
      <SiteLayout>
        {children}
      </SiteLayout>
    </>
  );
}
