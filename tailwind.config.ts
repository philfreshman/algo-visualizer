import type { Config } from 'tailwindcss'

const config = {
    darkMode: 'class',
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        screens: {
            sm: '640px', // Default for small screens
            md: '768px', // Default for medium screens
            lg: '1024px', // Default for large screens
            xl: '1280px', // Default for extra-large screens

            // boxes
            box24: '960px', // lg
            box23: '920px',
            box22: '880px', // md
            box21: '840px',
            box20: '800px', // sm
            box19: '760px', // xs
            box18: '720px',
            box17: '680px', // xxs
        },
        container: {
            center: true,
            padding: '2rem',
        },
        extend: {
            colors: {
                glitchDark: 'var(--glitch-dark)',
                glitchBlue: 'var(--glitch-blue)',
                glitchGreen: 'var(--glitch-green)',
                glitchRose: 'var(--glitch-rose)',
                glitchViolet: 'var(--glitch-violet)',
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                robotoCondensed: ['RobotoCondensed', 'roboto'],
            },
            textShadow: {
                header: 'var(--glitch-rose) 1.5px 1.5px 0px, var(--glitch-violet) 3px 3px 0px, var(--glitch-blue) 4.5px 4.5px 1px',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
