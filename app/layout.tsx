import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "./provider/AuthProvider";

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
    <html lang="id" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
