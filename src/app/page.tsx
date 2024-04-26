"use client"

import { Board } from "@/components/board"

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-scroll">
      <Board />
    </div>
  )
}
