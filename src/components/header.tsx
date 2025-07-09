import { Roboto_Condensed } from 'next/font/google'
import Image from 'next/image'
import type { FC } from 'react'
import Index from '@/components/nav-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './atoms/dialog'

const robotoCondensed = Roboto_Condensed({ weight: '800', style: 'italic', subsets: ['latin'] })

const Header: FC = () => {
    return (
        <div className={'flex h-40 w-full items-center justify-center'}>
            <div
                className={
                    'flex h-[110px] w-[500px] flex-col  rounded-2xl border-[1px] border-b-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)]'
                }
            >
                <div className={'flex h-1/2 items-center justify-center '}>
                    <Dialog>
                        <DialogTrigger>
                            <h1
                                className={
                                    `select-none text-[50px] text-[var(--glitch-green)] outline-amber-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] ` +
                                    robotoCondensed.className
                                }
                                style={{
                                    textShadow: 'var(--glitch-rose) 1.5px 1.5px 0,var(--glitch-violet) 3px 3px 0,var(--glitch-blue) 4.5px 4.5px 1px',
                                }}
                            >
                                ALGO-VISUALIZER
                            </h1>
                        </DialogTrigger>
                        <DialogContent className="bg-[var(--glitch-green)]">
                            <DialogHeader>
                                <DialogTitle className="dark:text-black"> Get in touch</DialogTitle>
                                <DialogDescription>
                                    <Image src="./qr2.png" width="500" height="500" alt="qr-code" />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className={'flex h-1/2 items-center justify-center'}>
                    <Index />
                </div>
            </div>
        </div>
    )
}

export default Header
