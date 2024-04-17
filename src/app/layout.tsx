"use client"

import { Inter } from "next/font/google"
import Header from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className + " flex h-screen flex-col font-mono"} cz-shortcut-listen="false">
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  )
}
