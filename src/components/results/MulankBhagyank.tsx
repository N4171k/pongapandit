'use client'

import type { LoShuReading } from '@/lib/types'
import { NUMBER_CONTENT } from '@/lib/content'

interface MulankBhagyankProps {
    reading: LoShuReading
}

export function MulankBhagyank({ reading }: MulankBhagyankProps) {
    const mulankContent = NUMBER_CONTENT[reading.mulank]
    const bhagyankContent = NUMBER_CONTENT[reading.bhagyank]

    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                Driver &amp; Conductor Numbers
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                {/* Mulank Card */}
                <div className="clay-card p-6">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-sky/20 font-display text-2xl font-black text-clay-sky-d">
                            {reading.mulank}
                        </div>
                        <div>
                            <h3 className="font-display text-lg font-bold text-ink">
                                Mulank (Driver)
                            </h3>
                            <p className="font-body text-xs font-bold text-ink3">
                                {mulankContent.meta.planet} · {mulankContent.meta.element}
                            </p>
                        </div>
                    </div>
                    <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                        Your Psychic Number governs your daily personality, cognitive processing,
                        career instincts, and personal behaviour. Derived solely from day of birth ({reading.input.day}).
                    </p>
                    <div className="mt-3 rounded-lg bg-bg/80 px-3 py-2">
                        <p className="font-body text-xs font-bold text-ink2">
                            {mulankContent.meta.archetype}
                        </p>
                    </div>
                </div>

                {/* Bhagyank Card */}
                <div className="clay-card p-6">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-lilac/20 font-display text-2xl font-black text-clay-lilac-d">
                            {reading.bhagyank}
                        </div>
                        <div>
                            <h3 className="font-display text-lg font-bold text-ink">
                                Bhagyank (Conductor)
                            </h3>
                            <p className="font-body text-xs font-bold text-ink3">
                                {bhagyankContent.meta.planet} · {bhagyankContent.meta.element}
                            </p>
                        </div>
                    </div>
                    <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                        Your Destiny Number represents broader karmic trajectory, long-term
                        opportunities, and ultimate life purpose. Derived from full date of birth.
                    </p>
                    <div className="mt-3 rounded-lg bg-bg/80 px-3 py-2">
                        <p className="font-body text-xs font-bold text-ink2">
                            {bhagyankContent.meta.archetype}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
