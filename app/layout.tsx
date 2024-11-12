import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import Header from "@/components/header"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
});
const loggedIn = { firstName: 'Rodgers'}

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
      <body className={`${inter.className} bg-[#0d0a2b] text-gray-50
      relative dark:bg-gray-950 dark:text-gray-50
      dark:text-opacity-90 antialiased overflow-x-hidden`}>
         
        <SidebarProvider>
          < Header 
          firstName={loggedIn?.firstName || "User"}/>
          {children}
        </SidebarProvider>
        
      </body>
    </html>
  );
}
