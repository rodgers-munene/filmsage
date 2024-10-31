import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
});


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
      <body className={`${inter.className}bg-gray-50 text-gray-950
      relative dark:bg-gray-950 dark:text-gray-50
      dark:text-opacity-90 antialiased overflow-x-hidden`}>

      {/* bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-gray-300 via-gray-500 to-gray-700 */}

        {/* Gradient Background */}
        <div className="bg-[#25224e] absolute top-[-6rem] flex-1 -z-[10]
         right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]
         sm:w-[68.75rem] dark:bg-[#192546]"></div>
         
         <div className="bg-[#b4c0d6] absolute top-[-1rem] -z-[10]
         flex-1 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem]
         sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem]
         xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#0d0a2b]"></div>
         
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
