"use client"

import { Inter } from "next/font/google"
import Header from "@/components/header"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " flex flex-col h-screen font-mono"} cz-shortcut-listen="false">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main className="flex-grow">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
