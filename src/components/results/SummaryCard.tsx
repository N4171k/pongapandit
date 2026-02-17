'use client'

import type { LoShuReading } from '@/lib/types'

interface SummaryCardProps {
    reading: LoShuReading
}

export function SummaryCard({ reading }: SummaryCardProps) {
    const { summaryHeadline, summaryParagraph, arrows } = reading

    return (
        <div className="clay-card p-8">
            {/* Headline */}
            <h2 className="mb-1 font-display text-2xl font-black leading-tight text-ink md:text-3xl">
                {summaryHeadline}
            </h2>

            {/* Arrow badges */}
            {arrows.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {arrows.map((arrow) => (
                        <span
                            key={arrow}
                            className="rounded-pill bg-gradient-to-r from-clay-gold/20 to-clay-amber/20 px-3 py-1 font-display text-xs font-bold italic text-clay-gold-d shadow-clay-xs"
                        >
                            ✦ {arrow}
                        </span>
                    ))}
                </div>
            )}

            {/* Paragraph */}
            <p className="max-w-prose font-body text-sm font-semibold leading-relaxed text-ink2">
                {summaryParagraph}
            </p>
        </div>
    )
}
