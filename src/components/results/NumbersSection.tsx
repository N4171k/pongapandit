'use client'

import type { LoShuReading } from '@/lib/types'
import { NUMBER_COLOURS, INTENSITY_LABELS } from '@/lib/utils'
import { NUMBER_CONTENT } from '@/lib/content'

interface NumbersSectionProps {
    reading: LoShuReading
    onNumberClick: (digit: number) => void
}

export function NumbersSection({ reading, onNumberClick }: NumbersSectionProps) {
    const { presentNumbers, missingNumbers, dominantNumbers } = reading

    return (
        <section className="reveal">
            <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
                ✦ Your Numbers
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Present Numbers */}
                <div className="clay-card p-6">
                    <h3 className="mb-3 font-display text-lg font-bold text-ink">
                        🟢 Present
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {presentNumbers.map((num) => {
                            const colours = NUMBER_COLOURS[num]
                            const analysis = reading.digitMap[num]
                            return (
                                <button
                                    key={num}
                                    onClick={() => onNumberClick(num)}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-body text-sm font-bold transition-all hover:scale-105 hover:shadow-clay-sm active:translate-y-0.5"
                                    style={{
                                        background: `${colours.bg}25`,
                                        color: colours.shadow,
                                    }}
                                >
                                    <span className="font-display text-lg">{num}</span>
                                    <span className="text-xs">
                                        ×{analysis.count}
                                    </span>
                                </button>
                            )
                        })}
                        {presentNumbers.length === 0 && (
                            <p className="font-body text-sm font-semibold text-ink3">None</p>
                        )}
                    </div>
                </div>

                {/* Missing Numbers */}
                <div className="clay-card p-6">
                    <h3 className="mb-3 font-display text-lg font-bold text-ink">
                        🔮 Growth Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {missingNumbers.map((num) => (
                            <button
                                key={num}
                                onClick={() => onNumberClick(num)}
                                className="flex items-center gap-1.5 rounded-lg bg-ink3/10 px-3 py-2 font-body text-sm font-bold text-ink3 transition-all hover:scale-105 hover:bg-ink3/20 active:translate-y-0.5"
                            >
                                <span className="font-display text-lg">{num}</span>
                                <span className="text-xs">Absent</span>
                            </button>
                        ))}
                        {missingNumbers.length === 0 && (
                            <p className="font-body text-sm font-semibold text-clay-mint">
                                All numbers are present! ✨
                            </p>
                        )}
                    </div>
                </div>

                {/* Dominant Numbers */}
                <div className="clay-card p-6">
                    <h3 className="mb-3 font-display text-lg font-bold text-ink">
                        ⚡ Dominant
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {dominantNumbers.map((num) => {
                            const colours = NUMBER_COLOURS[num]
                            const analysis = reading.digitMap[num]
                            return (
                                <button
                                    key={num}
                                    onClick={() => onNumberClick(num)}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-body text-sm font-bold text-white shadow-clay-xs transition-all hover:scale-105 hover:shadow-clay-sm active:translate-y-0.5"
                                    style={{ background: colours.shadow }}
                                >
                                    <span className="font-display text-lg">{num}</span>
                                    <span className="text-xs">
                                        {INTENSITY_LABELS[analysis.intensity]}
                                    </span>
                                </button>
                            )
                        })}
                        {dominantNumbers.length === 0 && (
                            <p className="font-body text-sm font-semibold text-ink3">
                                No dominant numbers — an evenly balanced chart.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
