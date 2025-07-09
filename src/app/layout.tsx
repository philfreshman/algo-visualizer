'use client'
import Header from '@/components/header'
import { AlgorithmProvider } from '@/lib/coreContext'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type React from 'react'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>ALGO-VISUALIZER</title>
            </head>
            <body className={'h-screen font-mono'} cz-shortcut-listen="false">
                <ThemeProvider attribute="class" defaultTheme="light">
                    <AlgorithmProvider>
                        <div className="flex h-full w-full flex-col ">
                            <Header />
                            <main className="flex-grow">{children}</main>
                        </div>
                    </AlgorithmProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
