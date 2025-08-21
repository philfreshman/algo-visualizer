import { useTheme } from 'next-themes'
import { useState } from 'react'
import { MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from '@/components/atoms/menubar'

export const ThemeMenu = () => {
    const { theme, setTheme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState(theme)

    const setThemeClick = (theme: 'light' | 'dark' | 'system') => {
        setTheme(theme)
        setCurrentTheme(theme)
    }

    return (
        <MenubarMenu>
            <MenubarTrigger>Theme</MenubarTrigger>
            <MenubarContent>
                <MenubarCheckboxItem
                    onClick={() => setThemeClick('light')}
                    checked={currentTheme === 'light'}
                >
                    Light
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                    onClick={() => setThemeClick('dark')}
                    checked={currentTheme === 'dark'}
                >
                    Dark
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                    onClick={() => setThemeClick('system')}
                    checked={currentTheme === 'system'}
                >
                    System
                </MenubarCheckboxItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
