"use client"

import Header from "@/components/header"
import { AlgorithmProvider } from "@/lib/coreContext"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ALGO-VISUALIZER</title>
      </head>
      <body className={inter.className + " h-screen font-mono "} cz-shortcut-listen="false">
        <AlgorithmProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex h-full w-full flex-col bg-gray-500 dark:bg-[var(--background)]">
              <Header />
              <main className="flex-grow ">{children}</main>
            </div>
          </ThemeProvider>
        </AlgorithmProvider>
      </body>
    </html>
  )
}
