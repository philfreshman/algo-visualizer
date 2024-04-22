"use client"

import Header from "@/components/header"
import { AlgorithmProvider } from "@/lib/coreContext"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
        <title>ALGO-VISUALIZER</title>
      </head>
        <body className={inter.className + "flex h-screen flex-col font-mono dark:bg-[var(--background)]"}  cz-shortcut-listen="false">
          <AlgorithmProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <Header />
              <main className="flex-grow ">{children}</main>
            </ThemeProvider>
          </AlgorithmProvider>
        </body>
    </html>
  )
}
