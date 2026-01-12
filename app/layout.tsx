import type { Metadata } from "next";
import "./globals.css";
import { Zen_Maru_Gothic } from "next/font/google";

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConnectTeen Community",
  description: "Platform komunitas untuk remaja Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
