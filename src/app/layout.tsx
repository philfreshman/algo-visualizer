import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ALGO VISUALIZER",
  description: "",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col h-screen font-mono"}>
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  )
}
