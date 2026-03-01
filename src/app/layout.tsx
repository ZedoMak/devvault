import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ConditionalRender } from "@/components/layout/ConditionalRender";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevVault - Development Resource Manager",
  description: "A secure platform for managing development resources and user authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <ConditionalRender hideOnRoutes={['/dashboard']}>
              <Header />
            </ConditionalRender>
            <main className="flex-1">{children}</main>
            <ConditionalRender hideOnRoutes={['/dashboard']}>
              <Footer />
            </ConditionalRender>
          </div>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}