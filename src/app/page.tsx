import Board from "@/components/board"
import React, { memo } from "react"

const MemoizedBoard = memo(Board) // Memoize the Board component

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-scroll p-7">
      <MemoizedBoard />
    </div>
  )
}
