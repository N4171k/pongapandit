'use client'

import type { LoShuReading } from '@/lib/types'
import { useState } from 'react'

interface PlaneAnalysisProps {
    reading: LoShuReading
    onHighlight: (numbers: number[]) => void
}

const PLANE_EMOJI: Record<string, string> = {
    mental: '🧠',
    emotional: '💜',
    practical: '💪',
    thought: '💭',
    will: '🔥',
    action: '⚡',
    golden_yog: '🏆',
    silver_yog: '🌸',
}

const PLANE_TYPE_LABEL: Record<string, string> = {
    horizontal: 'Row',
    vertical: 'Column',
    diagonal: 'Diagonal',
}

export function PlaneAnalysis({ reading, onHighlight }: PlaneAnalysisProps) {
    const [hoveredPlane, setHoveredPlane] = useState<string | null>(null)

    return (
        <section className="reveal">
            <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
                ✦ Plane Analysis
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
                {reading.planes.map((plane) => {
                    const ratio = plane.completionRatio
                    const isComplete = plane.isComplete
                    const emoji = PLANE_EMOJI[plane.id] || '✦'

                    return (
                        <div
                            key={plane.id}
                            className="clay-card cursor-default p-5 transition-all duration-200 hover:shadow-clay-lg"
                            onMouseEnter={() => {
                                setHoveredPlane(plane.id)
                                onHighlight(plane.numbers)
                            }}
                            onMouseLeave={() => {
                                setHoveredPlane(null)
                                onHighlight([])
                            }}
                        >
                            {/* Header */}
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg" aria-hidden="true">
                                        {emoji}
                                    </span>
                                    <h3 className="font-display text-base font-bold text-ink">
                                        {plane.name}
                                    </h3>
                                </div>
                                <span className="rounded-pill px-2 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-ink3">
                                    {PLANE_TYPE_LABEL[plane.planeType]}
                                </span>
                            </div>

                            {/* Numbers */}
                            <p className="mb-3 font-display text-sm font-bold text-ink3">
                                {plane.numbers.map((n, i) => (
                                    <span key={n}>
                                        <span
                                            className={
                                                plane.presentNumbers.includes(n)
                                                    ? 'text-ink'
                                                    : 'text-ink3/40'
                                            }
                                        >
                                            {n}
                                        </span>
                                        {i < 2 && ' · '}
                                    </span>
                                ))}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-3 h-2.5 overflow-hidden rounded-full bg-bg2">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${ratio * 100}%`,
                                        background: isComplete
                                            ? 'linear-gradient(90deg, #22C55E, #5DD9A4)'
                                            : 'linear-gradient(90deg, #F59E0B, #FFD166)',
                                    }}
                                />
                            </div>

                            {/* Status */}
                            <div className="mb-2 flex items-center gap-2">
                                <span
                                    className={`rounded-pill px-2.5 py-0.5 font-body text-xs font-bold ${isComplete
                                        ? 'bg-clay-mint/20 text-clay-mint-d'
                                        : 'bg-clay-amber/20 text-clay-amber-d'
                                        }`}
                                >
                                    {isComplete
                                        ? '✓ COMPLETE'
                                        : plane.isEmpty
                                            ? '✗ EMPTY'
                                            : `${plane.presentNumbers.length} of 3`}
                                </span>
                                {plane.arrowName && (
                                    <span className="font-display text-xs font-bold italic text-clay-gold-d">
                                        {plane.arrowName}
                                    </span>
                                )}
                                {plane.weaknessArrowName && (
                                    <span className="font-display text-xs font-bold italic text-clay-red-d">
                                        {plane.weaknessArrowName}
                                    </span>
                                )}
                            </div>

                            {/* Interpretation */}
                            <p className="font-body text-xs font-semibold leading-relaxed text-ink2">
                                {plane.interpretation}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
