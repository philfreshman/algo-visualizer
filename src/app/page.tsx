import Board from "@/components/board"

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center p-7 min-w-[900px] ">
      <div className="w-full h-full overflow-scroll ">
        <Board />
      </div>
    </div>
  )
}
