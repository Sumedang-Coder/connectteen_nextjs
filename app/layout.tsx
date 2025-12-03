import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConnectTeen Community",
  description: "A vibrant platform for teens to connect, share, and grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
