'use client'

import type { LoShuReading } from '@/lib/types'
import { useTranslations } from 'next-intl'

interface SummaryCardProps {
    reading: LoShuReading
}

export function SummaryCard({ reading }: SummaryCardProps) {
    const t = useTranslations('Summary')
    const tContent = useTranslations('NumberContent')
    const tArrows = useTranslations('ArrowNames')

    const {
        mulank,
        bhagyank,
        planes,
        dominantNumbers,
        missingNumbers,
        arrowsOfStrength,
        input
    } = reading

    const firstName = input.name?.split(' ')[0] ?? 'You'

    // ── Build Headline ──────────────────────────────────
    const completePlanes = planes.filter((p) => p.isComplete)
    const weaknessPlanes = planes.filter((p) => p.isEmpty && p.hasWeaknessArrow)

    let headline = ''
    if (completePlanes.length >= 2) {
        headline = t('Headline.twoPlanes', { firstName, count: completePlanes.length })
    } else if (dominantNumbers.length >= 3) {
        headline = t('Headline.concentrated', { firstName })
    } else if (missingNumbers.length >= 4) {
        headline = t('Headline.balance', { firstName })
    } else {
        const mulankKey = tContent(`${mulank}.keyword`)
        const bhagyankKey = tContent(`${bhagyank}.keyword`)
        headline = t('Headline.default', { firstName, mulankKeyword: mulankKey, bhagyankKeyword: bhagyankKey })
    }

    // ── Build Paragraph Parts ───────────────────────────
    const parts: string[] = []

    // Mulank
    parts.push(t('Paragraph.mulank', {
        mulank,
        planet: tContent(`${mulank}.planet`),
        keyword: tContent(`${mulank}.keyword`).toLowerCase()
    }))

    // Bhagyank
    parts.push(t('Paragraph.bhagyank', {
        bhagyank,
        planet: tContent(`${bhagyank}.planet`),
        keyword: tContent(`${bhagyank}.keyword`).toLowerCase()
    }))

    // Complete Planes (Strength)
    if (completePlanes.length > 0) {
        const names = completePlanes.map((p) => tArrows(`Strength.${p.id}`)).join(', ')
        parts.push(t('Paragraph.completePlanes', { names }))
    }

    // Weakness Planes
    if (weaknessPlanes.length > 0) {
        const names = weaknessPlanes.map((p) => tArrows(`Weakness.${p.id}`)).join(', ')
        parts.push(t('Paragraph.weaknessPlanes', { names }))
    }

    // Dominant Numbers
    if (dominantNumbers.length > 0) {
        const list = dominantNumbers.map((n) => `${n} (${tContent(`${n}.planet`)})`).join(', ')
        parts.push(t('Paragraph.dominantNumbers', { list }))
    }

    // Missing Numbers
    if (missingNumbers.length > 0) {
        parts.push(t('Paragraph.missingNumbers', { list: missingNumbers.join(', ') }))
    }

    const fullParagraph = parts.join(' ')

    return (
        <div className="clay-card p-8 bg-surface-100 dark:bg-surface-900 transition-colors duration-300">
            {/* Headline */}
            <h2 className="mb-2 font-display text-2xl font-black leading-tight text-ink md:text-3xl">
                {headline}
            </h2>

            {/* Arrow badges (Strengths only) */}
            {arrowsOfStrength.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {arrowsOfStrength.map((arrowId) => (
                        <span
                            key={arrowId}
                            className="rounded-full bg-gradient-to-r from-clay-gold/20 to-clay-amber/20 px-3 py-1 font-display text-xs font-bold italic text-clay-gold-d shadow-sm border border-clay-gold/30"
                        >
                            ✦ {tArrows(`Strength.${arrowId}`)}
                        </span>
                    ))}
                </div>
            )}

            {/* Paragraph */}
            <p className="max-w-prose font-body text-sm font-semibold leading-relaxed text-ink/80 opacity-90">
                {fullParagraph}
            </p>
        </div>
    )
}
