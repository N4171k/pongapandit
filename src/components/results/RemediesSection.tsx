'use client'

import { useTranslations } from 'next-intl'

interface RemediesSectionProps {
    missingNumbers: number[]
}

export function RemediesSection({ missingNumbers }: RemediesSectionProps) {
    const t = useTranslations('RemediesSection')
    const tNumber = useTranslations('NumberContent')

    if (missingNumbers.length === 0) return null

    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                {t('title')}
            </h2>
            <p className="mb-4 font-body text-sm font-semibold text-ink2">
                {t('description')}
            </p>
            <div className="space-y-3">
                {missingNumbers.map((num) => {
                    return (
                        <div key={num} className="clay-card p-5">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay-red/15 font-display text-sm font-black text-clay-red-d">
                                    {num}
                                </span>
                                <span className="font-display text-sm font-bold text-ink">
                                    {t('missingLabel', { keyword: tNumber(`${num}.keyword`) })}
                                </span>
                                <span className="font-body text-xs font-semibold text-ink3">
                                    ({tNumber(`${num}.planet`)} · {tNumber(`${num}.element`)} · {tNumber(`${num}.direction`)})
                                </span>
                            </div>
                            <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                                {tNumber(`${num}.remedy`)}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
