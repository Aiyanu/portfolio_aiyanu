import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalContextProvider } from "@/context/GlobalContext";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AppLayout from "@/layout/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
