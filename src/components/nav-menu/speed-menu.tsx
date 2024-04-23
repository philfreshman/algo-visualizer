import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Slider } from "@/components/ui/slider"
import { local } from "@/lib/utils/storage"
import { useEffect, useState } from "react"

export const SpeedMenu = () => {
  const speedScale = 140
  const [delay, setDelay] = useState<number>(0)

  const onSetDelay = (value: number) => {
    setDelay((prevState) => {
      if (prevState === value) return prevState
      local.setItem("delay", String(speedScale - value))
      return speedScale - value
    })
  }

  useEffect(() => {
    if (!local.getItem("delay")) {
      local.setItem("delay", String(speedScale / 2))
    }
    setDelay(Number(local.getItem("delay")))
  }, [])

  return (
    <MenubarMenu>
      <MenubarTrigger>Speed</MenubarTrigger>
      <MenubarContent align={"center"}>
        <MenubarItem>
          <Slider
            defaultValue={[speedScale - delay]}
            min={0}
            max={speedScale}
            name={"slow"}
            onValueChange={(num) => onSetDelay(num[0])}
            step={1}
          />
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}
