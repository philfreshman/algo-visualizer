"use client"

import Header from "@/components/header"
import { AlgorithmProvider } from "@/lib/context"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + "flex h-screen flex-col font-mono dark:bg-[var(--background)]"} cz-shortcut-listen="false">
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
