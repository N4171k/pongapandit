'use client'

import { NUMBER_CONTENT } from '@/lib/content'

interface RemediesSectionProps {
    missingNumbers: number[]
}

export function RemediesSection({ missingNumbers }: RemediesSectionProps) {
    if (missingNumbers.length === 0) return null

    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                Remedies — Balancing Your Grid
            </h2>
            <p className="mb-4 font-body text-sm font-semibold text-ink2">
                Environmental and behavioural remedies based on Feng Shui principles to
                harmonize the missing elemental energies in your chart.
            </p>
            <div className="space-y-3">
                {missingNumbers.map((num) => {
                    const content = NUMBER_CONTENT[num]
                    return (
                        <div key={num} className="clay-card p-5">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay-red/15 font-display text-sm font-black text-clay-red-d">
                                    {num}
                                </span>
                                <span className="font-display text-sm font-bold text-ink">
                                    Missing {content.keyword}
                                </span>
                                <span className="font-body text-xs font-semibold text-ink3">
                                    ({content.meta.planet} · {content.meta.element} · {content.meta.direction})
                                </span>
                            </div>
                            <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                                {content.remedy}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
