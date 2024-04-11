import {Slider} from "@/components/ui/slider"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Hello
        <Slider defaultValue={[33]} max={100} step={1} />
      </div>
    </main>
  );
}
