'use client'

import type { MinorArrow } from '@/lib/types'
import { useTranslations } from 'next-intl'

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
    const t = useTranslations('ArrowsSection')
    const tArrowNames = useTranslations('ArrowNames')
    const tMinorArrow = useTranslations('MinorArrow')

    const activeMinorArrows = minorArrows.filter((a) => a.isPresent)
    const hasContent =
        arrowsOfStrength.length > 0 ||
        arrowsOfWeakness.length > 0 ||
        activeMinorArrows.length > 0

    if (!hasContent) return null

    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                {t('title')}
            </h2>

            <div className="space-y-4">
                {/* Arrows of Strength */}
                {arrowsOfStrength.length > 0 && (
                    <div className="clay-card p-5">
                        <h3 className="mb-3 font-display text-base font-bold text-clay-mint-d">
                            {t('strengthTitle')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {arrowsOfStrength.map((arrowId) => (
                                <span
                                    key={arrowId}
                                    className="rounded-pill bg-clay-mint/15 px-3 py-1.5 font-body text-sm font-bold text-clay-mint-d"
                                >
                                    {tArrowNames(`Strength.${arrowId}`)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Arrows of Weakness */}
                {arrowsOfWeakness.length > 0 && (
                    <div className="clay-card p-5">
                        <h3 className="mb-3 font-display text-base font-bold text-clay-red-d">
                            {t('weaknessTitle')}
                        </h3>
                        <div className="space-y-2">
                            {arrowsOfWeakness.map((arrowId) => (
                                <div
                                    key={arrowId}
                                    className="rounded-lg bg-clay-red/10 px-3 py-2"
                                >
                                    <p className="font-body text-sm font-bold text-clay-red-d">
                                        {tArrowNames(`Weakness.${arrowId}`)}
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
                            {t('minorTitle')}
                        </h3>
                        <div className="space-y-3">
                            {activeMinorArrows.map((arrow) => (
                                <div key={arrow.id} className="rounded-lg bg-clay-lilac/10 px-4 py-3">
                                    <p className="mb-1 font-display text-sm font-bold text-clay-lilac-d">
                                        {tMinorArrow(`${arrow.id}.title`)}
                                        <span className="ml-2 font-body text-xs font-semibold text-ink3">
                                            ({arrow.numbers.join(' + ')})
                                        </span>
                                    </p>
                                    <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                                        {tMinorArrow(`${arrow.id}.description`)}
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
