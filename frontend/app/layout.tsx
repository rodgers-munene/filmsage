import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import Header from "@/components/global-sections/header"
import { GenreProvider } from "@/context/GenreMoviesContext";
import { TrailerProvider } from "@/context/TrailerDivContext";

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
    // bg-[#0d0a2b] - backup background color
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-50
      relative dark:bg-gray-950 dark:text-gray-50
      dark:text-opacity-90 antialiased overflow-x-hidden`}>
        <SidebarProvider>
          <GenreProvider>            
            <TrailerProvider>
              < Header 
              firstName={loggedIn?.firstName || "User"}/>
              {children}
            </TrailerProvider>            
          </GenreProvider>
        </SidebarProvider>        
      </body>
    </html>
  );
}
