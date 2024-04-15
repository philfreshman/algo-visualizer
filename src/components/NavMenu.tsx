import {
  Menubar,
  MenubarButton,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"

export default function NavMenu() {
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

      <Button variant={"ghost"}>Stop</Button>
      <Button variant={"ghost"}>Run</Button>
    </Menubar>
  )
}