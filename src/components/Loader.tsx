'use client'

import { useEffect, useState } from 'react'
import { GRID_LAYOUT } from '@/lib/loshu'

const LOADER_MESSAGES = [
    'Aligning your numbers\u2026',
    'Reading the ancient grid\u2026',
    'Discovering your patterns\u2026',
    'Connecting the planes\u2026',
]

export function Loader() {
    const [activeIdx, setActiveIdx] = useState(-1)
    const [messageIdx, setMessageIdx] = useState(0)
    const [particles, setParticles] = useState<
        { id: number; x: number; y: number; delay: number; size: number }[]
    >([])

    // Animate grid cells filling one by one
    useEffect(() => {
        const order = [4, 0, 8, 2, 6, 1, 3, 5, 7] // spiral fill order (indices 0-8)
        let step = 0
        const interval = setInterval(() => {
            if (step < order.length) {
                setActiveIdx(order[step])
                step++
            } else {
                step = 0
                setActiveIdx(-1)
            }
        }, 180)
        return () => clearInterval(interval)
    }, [])

    // Cycle messages
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIdx((prev) => (prev + 1) % LOADER_MESSAGES.length)
        }, 600)
        return () => clearInterval(interval)
    }, [])

    // Generate floating particles
    useEffect(() => {
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
            delay: Math.random() * 2,
            size: 3 + Math.random() * 5,
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center py-24">
            {/* Animated Lo Shu mini grid */}
            <div className="relative mb-8">
                <div className="grid grid-cols-3 gap-2.5">
                    {GRID_LAYOUT.flat().map((num, idx) => {
                        const isActive = idx <= activeIdx
                        return (
                            <div
                                key={num}
                                className={`loader-grid-cell flex h-16 w-16 items-center justify-center font-display text-xl font-bold transition-all duration-400 ${isActive ? 'active' : ''
                                    }`}
                                style={{
                                    animationDelay: `${idx * 80}ms`,
                                    color: isActive
                                        ? 'rgba(255, 209, 102, 0.9)'
                                        : 'rgba(156, 142, 126, 0.3)',
                                    transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                                }}
                            >
                                {num}
                            </div>
                        )
                    })}
                </div>

                {/* Floating particles */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle animate-float-up"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            background: `radial-gradient(circle, rgba(255,209,102,0.8), rgba(255,179,71,0.4))`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${1.5 + Math.random()}s`,
                            animationIterationCount: 'infinite',
                        }}
                    />
                ))}
            </div>

            {/* Loading text with typewriter effect */}
            <div className="text-center">
                <p
                    className="mb-2 font-display text-xl font-bold text-ink2"
                    style={{
                        transition: 'opacity 0.3s ease',
                    }}
                >
                    {LOADER_MESSAGES[messageIdx]}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="h-2 w-2 rounded-full bg-clay-gold"
                            style={{
                                animation: 'clayPulse 1.2s ease-in-out infinite',
                                animationDelay: `${i * 0.2}s`,
                                opacity: 0.6,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
