import { MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/atoms/menubar"
import { useTheme } from "next-themes"
import { useState } from "react"

export const ThemeMenu = () => {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  const setThemeClick = (theme: "light" | "dark") => {
    setTheme(theme)
    setCurrentTheme(theme)
  }

  return (
    <MenubarMenu>
      <MenubarTrigger>Theme</MenubarTrigger>
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
  )
}
