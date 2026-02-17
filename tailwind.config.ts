import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-fraunces)', 'Georgia', 'serif'],
                body: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
            },
            colors: {
                bg: '#F5EFE6',
                bg2: '#EDE5D8',
                surface: '#FEFCF9',
                ink: '#1C1612',
                ink2: '#5C4E3E',
                ink3: '#9C8E7E',
                clay: {
                    red: '#FF6B6B',
                    'red-d': '#E85555',
                    gold: '#FFD166',
                    'gold-d': '#E8BB4E',
                    mint: '#5DD9A4',
                    'mint-d': '#47C48F',
                    sky: '#74C0FC',
                    'sky-d': '#5AAAE8',
                    lilac: '#C084FC',
                    'lilac-d': '#A96EE6',
                    amber: '#FFB347',
                    'amber-d': '#E89D30',
                    rose: '#F9A8D4',
                    'rose-d': '#E690BB',
                    teal: '#2DD4BF',
                    'teal-d': '#1ABFAA',
                },
            },
            borderRadius: {
                sm: '10px',
                md: '16px',
                lg: '24px',
                xl: '32px',
                '2xl': '44px',
                pill: '9999px',
            },
            boxShadow: {
                'clay-xs':
                    '0 2px 0 rgba(0,0,0,.15), 0 4px 10px rgba(0,0,0,.10), inset 0 1px 4px rgba(255,255,255,.45)',
                'clay-sm':
                    '0 4px 0 rgba(0,0,0,.16), 0 8px 20px rgba(0,0,0,.12), inset 0 2px 6px rgba(255,255,255,.50)',
                'clay-md':
                    '0 6px 0 rgba(0,0,0,.18), 0 14px 36px rgba(0,0,0,.14), inset 0 2px 8px rgba(255,255,255,.55)',
                'clay-lg':
                    '0 8px 0 rgba(0,0,0,.20), 0 20px 50px rgba(0,0,0,.16), inset 0 2px 8px rgba(255,255,255,.55)',
                'clay-xl':
                    '0 12px 0 rgba(0,0,0,.22), 0 28px 70px rgba(0,0,0,.18), inset 0 2px 10px rgba(255,255,255,.60)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            keyframes: {
                popIn: {
                    '0%': { opacity: '0', transform: 'scale(0.65)' },
                    '60%': { transform: 'scale(1.06)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(28px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInUp: {
                    '0%': { opacity: '0', transform: 'translateY(60px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                clayPulse: {
                    '0%, 100%': {
                        boxShadow: '0 6px 0 rgba(0,0,0,.18), 0 14px 36px rgba(0,0,0,.14)',
                    },
                    '50%': {
                        boxShadow: '0 6px 0 rgba(0,0,0,.18), 0 28px 60px rgba(0,0,0,.22)',
                    },
                },
                blobDrift: {
                    '0%': { transform: 'translate(0, 0) scale(1)' },
                    '100%': { transform: 'translate(35px, 45px) scale(1.08)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                gridFill: {
                    '0%': { opacity: '0', transform: 'scale(0.3) rotateZ(-10deg)' },
                    '50%': { opacity: '0.7', transform: 'scale(1.1) rotateZ(2deg)' },
                    '100%': { opacity: '1', transform: 'scale(1) rotateZ(0deg)' },
                },
                floatUp: {
                    '0%': { opacity: '0.6', transform: 'translateY(0) scale(1)' },
                    '100%': { opacity: '0', transform: 'translateY(-40px) scale(0.3)' },
                },
            },
            animation: {
                'pop-in': 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
                'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
                'slide-right': 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) both',
                'slide-up': 'slideInUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
                'clay-pulse': 'clayPulse 2.5s ease-in-out infinite',
                'blob-drift': 'blobDrift 20s ease-in-out infinite alternate',
                shimmer: 'shimmer 2s ease-in-out infinite',
                'grid-fill': 'gridFill 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
                'float-up': 'floatUp 1.2s ease-out both',
            },
        },
    },
    plugins: [],
}

export default config
