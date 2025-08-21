import { useEffect, useState } from 'react'
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/atoms/menubar'
import { Slider } from '@/components/atoms/slider'
import { local } from '@/lib/helpers/storage'

export const SpeedMenu = () => {
    const speedScale = 140
    const [delay, setDelay] = useState<number>(0)

    const onSetDelay = (value: number) => {
        setDelay((prevState) => {
            if (prevState === value) return prevState
            local.setItem('delay', String(speedScale - value))
            return speedScale - value
        })
    }

    useEffect(() => {
        if (!local.getItem('delay')) {
            local.setItem('delay', String(speedScale / 2))
        }
        setDelay(Number(local.getItem('delay')))
    }, [])

    return (
        <MenubarMenu>
            <MenubarTrigger>Speed</MenubarTrigger>
            <MenubarContent align={'center'}>
                <MenubarItem className="focus:bg-white dark:focus:bg-(--glitch-dark)">
                    <Slider
                        defaultValue={[speedScale - delay]}
                        min={0}
                        max={speedScale}
                        name={'slow'}
                        onValueChange={(num) => onSetDelay(num[0])}
                        step={1}
                    />
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
