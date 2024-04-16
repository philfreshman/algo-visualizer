import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useTheme } from "next-themes"

export default function NavMenu() {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  const setThemeClick = (theme: "light" | "dark") => {
    setTheme(theme)
    setCurrentTheme(theme)
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Algorithm</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Algorithm A</MenubarCheckboxItem>
          <MenubarCheckboxItem>Algorithm B</MenubarCheckboxItem>
          <MenubarCheckboxItem>Algorithm C</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Maze</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Random</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Lines</MenubarCheckboxItem>
          <MenubarCheckboxItem>I don't know yet</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Placeholder</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>A</MenubarCheckboxItem>
          <MenubarCheckboxItem>B</MenubarCheckboxItem>
          <MenubarCheckboxItem>C</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem onClick={() => setThemeClick("light")} checked={currentTheme === "light"}>
            Light
          </MenubarCheckboxItem>
          <MenubarCheckboxItem onClick={() => setThemeClick("dark")} checked={currentTheme === "dark"}>
            Dark
          </MenubarCheckboxItem>
          <MenubarCheckboxItem disabled>System</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>

      <Button variant={"ghost"}>Stop</Button>
      <Button variant={"ghost"}>Run</Button>
    </Menubar>
  )
}
