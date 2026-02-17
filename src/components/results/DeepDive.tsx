'use client'

import { useState } from 'react'
import type { LoShuReading } from '@/lib/types'
import { NUMBER_CONTENT } from '@/lib/content'
import { NUMBER_COLOURS, INTENSITY_LABELS } from '@/lib/utils'

interface DeepDiveProps {
    reading: LoShuReading
}

export function DeepDive({ reading }: DeepDiveProps) {
    const [expandedDigit, setExpandedDigit] = useState<number | null>(null)

    const toggleDigit = (digit: number) => {
        setExpandedDigit(expandedDigit === digit ? null : digit)
    }

    // Show all present numbers first, then missing
    const orderedDigits = [
        ...reading.presentNumbers.sort((a, b) => {
            const ca = reading.digitMap[a].count
            const cb = reading.digitMap[b].count
            return cb - ca // dominant first
        }),
        ...reading.missingNumbers.sort((a, b) => a - b),
    ]

    return (
        <section className="reveal">
            <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
                ✦ Personality Deep Dive
            </h2>

            <div className="space-y-3">
                {orderedDigits.map((digit) => {
                    const analysis = reading.digitMap[digit]
                    const content = NUMBER_CONTENT[digit]
                    const colours = NUMBER_COLOURS[digit]
                    const isExpanded = expandedDigit === digit

                    let text = content.missingText
                    if (analysis.intensity === 'active') text = content.presentText
                    else if (analysis.intensity === 'strong') text = content.strongText
                    else if (
                        analysis.intensity === 'dominant' ||
                        analysis.intensity === 'overwhelming'
                    )
                        text = content.dominantText

                    return (
                        <div key={digit} className="clay-card overflow-hidden">
                            <button
                                onClick={() => toggleDigit(digit)}
                                className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-bg/50"
                                aria-expanded={isExpanded}
                            >
                                {/* Number badge */}
                                <div
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-display text-xl font-black shadow-clay-xs"
                                    style={{
                                        background: analysis.isMissing
                                            ? 'rgba(156,142,126,0.15)'
                                            : `${colours.bg}30`,
                                        color: analysis.isMissing ? '#9C8E7E' : colours.bg,
                                    }}
                                >
                                    {digit}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h3 className="font-display text-base font-bold text-ink">
                                        {content.keyword}
                                    </h3>
                                    <p className="font-body text-xs font-semibold text-ink3">
                                        {content.shortDesc}
                                    </p>
                                </div>

                                {/* Intensity pill */}
                                <span
                                    className={`shrink-0 rounded-pill px-2.5 py-1 font-body text-xs font-bold ${analysis.isMissing
                                            ? 'bg-ink3/10 text-ink3'
                                            : 'text-white'
                                        }`}
                                    style={
                                        !analysis.isMissing
                                            ? { background: colours.shadow }
                                            : undefined
                                    }
                                >
                                    {INTENSITY_LABELS[analysis.intensity]}
                                </span>

                                {/* Expand icon */}
                                <span
                                    className={`shrink-0 text-ink3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                                        }`}
                                >
                                    ▾
                                </span>
                            </button>

                            {/* Expanded content */}
                            {isExpanded && (
                                <div className="border-t border-bg2 px-5 pb-5 pt-4">
                                    <p className="mb-4 font-body text-sm font-semibold leading-relaxed text-ink2">
                                        {text}
                                    </p>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-lg bg-bg/60 p-3">
                                            <p className="mb-1 font-body text-xs font-bold text-ink3">
                                                💼 Career
                                            </p>
                                            <p className="font-body text-xs font-semibold text-ink2">
                                                {content.career}
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-bg/60 p-3">
                                            <p className="mb-1 font-body text-xs font-bold text-ink3">
                                                💕 Relationships
                                            </p>
                                            <p className="font-body text-xs font-semibold text-ink2">
                                                {content.relationship}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
