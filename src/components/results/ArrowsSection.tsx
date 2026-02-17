'use client'

import type { MinorArrow } from '@/lib/types'

interface ArrowsSectionProps {
    arrowsOfStrength: string[]
    arrowsOfWeakness: string[]
    minorArrows: MinorArrow[]
}

export function ArrowsSection({
    arrowsOfStrength,
    arrowsOfWeakness,
    minorArrows,
}: ArrowsSectionProps) {
    const activeMinorArrows = minorArrows.filter((a) => a.isPresent)
    const hasContent =
        arrowsOfStrength.length > 0 ||
        arrowsOfWeakness.length > 0 ||
        activeMinorArrows.length > 0

    if (!hasContent) return null

    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                Arrows — Geometric Vectors
            </h2>

            <div className="space-y-4">
                {/* Arrows of Strength */}
                {arrowsOfStrength.length > 0 && (
                    <div className="clay-card p-5">
                        <h3 className="mb-3 font-display text-base font-bold text-clay-mint-d">
                            ↑ Arrows of Strength
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {arrowsOfStrength.map((arrow) => (
                                <span
                                    key={arrow}
                                    className="rounded-pill bg-clay-mint/15 px-3 py-1.5 font-body text-sm font-bold text-clay-mint-d"
                                >
                                    {arrow}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Arrows of Weakness */}
                {arrowsOfWeakness.length > 0 && (
                    <div className="clay-card p-5">
                        <h3 className="mb-3 font-display text-base font-bold text-clay-red-d">
                            ↓ Arrows of Weakness
                        </h3>
                        <div className="space-y-2">
                            {arrowsOfWeakness.map((arrow) => (
                                <div
                                    key={arrow}
                                    className="rounded-lg bg-clay-red/10 px-3 py-2"
                                >
                                    <p className="font-body text-sm font-bold text-clay-red-d">
                                        {arrow}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Minor Arrows */}
                {activeMinorArrows.length > 0 && (
                    <div className="clay-card p-5">
                        <h3 className="mb-3 font-display text-base font-bold text-clay-lilac-d">
                            ◇ Minor Arrows
                        </h3>
                        <div className="space-y-3">
                            {activeMinorArrows.map((arrow) => (
                                <div key={arrow.id} className="rounded-lg bg-clay-lilac/10 px-4 py-3">
                                    <p className="mb-1 font-display text-sm font-bold text-clay-lilac-d">
                                        {arrow.name}
                                        <span className="ml-2 font-body text-xs font-semibold text-ink3">
                                            ({arrow.numbers.join(' + ')})
                                        </span>
                                    </p>
                                    <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                                        {arrow.interpretation}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
