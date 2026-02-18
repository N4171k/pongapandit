'use client'

import type { LoShuReading } from '@/lib/types'
import { useTranslations } from 'next-intl'

interface MulankBhagyankProps {
    reading: LoShuReading
}

export function MulankBhagyank({ reading }: MulankBhagyankProps) {
    const t = useTranslations('MulankBhagyank')
    const tContent = useTranslations('NumberContent')

    const mulank = reading.mulank
    const bhagyank = reading.bhagyank

    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                {t('title')}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                {/* Mulank Card */}
                <div className="clay-card p-6">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-sky/20 font-display text-2xl font-black text-clay-sky-d">
                            {mulank}
                        </div>
                        <div>
                            <h3 className="font-display text-lg font-bold text-ink">
                                {t('mulankTitle')}
                            </h3>
                            <p className="font-body text-xs font-bold text-ink3">
                                {tContent(`${mulank}.planet`)} · {tContent(`${mulank}.element`)}
                            </p>
                        </div>
                    </div>
                    <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                        {t('mulankDesc', { day: reading.input.day })}
                    </p>
                    <div className="mt-3 rounded-lg bg-bg/80 px-3 py-2">
                        <p className="font-body text-xs font-bold text-ink2">
                            {tContent(`${mulank}.archetype`)}
                        </p>
                    </div>
                </div>

                {/* Bhagyank Card */}
                <div className="clay-card p-6">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-lilac/20 font-display text-2xl font-black text-clay-lilac-d">
                            {bhagyank}
                        </div>
                        <div>
                            <h3 className="font-display text-lg font-bold text-ink">
                                {t('bhagyankTitle')}
                            </h3>
                            <p className="font-body text-xs font-bold text-ink3">
                                {tContent(`${bhagyank}.planet`)} · {tContent(`${bhagyank}.element`)}
                            </p>
                        </div>
                    </div>
                    <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                        {t('bhagyankDesc')}
                    </p>
                    <div className="mt-3 rounded-lg bg-bg/80 px-3 py-2">
                        <p className="font-body text-xs font-bold text-ink2">
                            {tContent(`${bhagyank}.archetype`)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
