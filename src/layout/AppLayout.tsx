"use client"
import Footer from '@/components/Footer'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { GlobalContextProvider, useGlobalContext } from '@/context/GlobalContext'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { closeMenu } = useGlobalContext();


    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <MaxWidthWrapper
                className=" flex flex-col justify-center h-full space-y-8 max-sm:max-w-lg max-sm:w-4/5"
            >

                <Navbar />
                <main onClick={closeMenu} className="min-h-[calc(100vh-100px-1px)]">
                    <div className="pb-16">
                        {children}
                        <Toaster />
                    </div>
                    <Footer />
                </main>
            </MaxWidthWrapper>
        </ThemeProvider>
    )
}
