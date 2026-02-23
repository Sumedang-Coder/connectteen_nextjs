import type { Metadata } from "next";
import "../globals.css";
import { Zen_Maru_Gothic } from "next/font/google";
import { SiteLayout } from "@/components/templates/site-layout";
import NextTopLoader from "nextjs-toploader";

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

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
      <NextTopLoader />
      <SiteLayout>
        {children}
      </SiteLayout>
    </>
  );
}
