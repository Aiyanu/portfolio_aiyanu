import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalContextProvider } from "@/context/GlobalContext";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalContextProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-100px-1px)]">
              <div>
                {children}
                <Toaster />
              </div>
              <Footer />
            </main>
          </GlobalContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
