"use client"
import { Header } from "@/components/header"
import { AlgorithmProvider } from "@/lib/coreContext"
import { MousePositionContext } from "@/lib/mouseContext"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import React, { useEffect, useState } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.pageX, y: e.pageY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ALGO-VISUALIZER</title>
      </head>
      <body className={inter.className + " h-screen font-mono "} cz-shortcut-listen="false">
        <MousePositionContext.Provider value={mousePosition}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AlgorithmProvider>
              <div className="flex h-full w-full flex-col ">
                <Header />
                <main className="flex-grow ">{children}</main>
              </div>
            </AlgorithmProvider>
          </ThemeProvider>
        </MousePositionContext.Provider>
      </body>
    </html>
  )
}
