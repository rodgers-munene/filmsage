import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FilmSage",
  description: "FilmSage is a modern day AI powered movie recommendation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
