'use client'

import type { KuaResult } from '@/lib/types'
import { useTranslations } from 'next-intl'

interface KuaSectionProps {
    kua: KuaResult
}

export function KuaSection({ kua }: KuaSectionProps) {
    const t = useTranslations('KuaSection')
    const tDirs = useTranslations('Directions')

    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                {t('title')}
            </h2>
            <div className="clay-card p-6">
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-clay-gold/30 to-clay-amber/30 font-display text-3xl font-black text-clay-gold-d">
                        {kua.number}
                    </div>
                    <div>
                        <h3 className="font-display text-lg font-bold text-ink">
                            {kua.group === 'east' ? t('eastGroup') : t('westGroup')}
                        </h3>
                        <p className="font-body text-xs font-bold text-ink3">
                            {t('desc1')}
                        </p>
                    </div>
                </div>

                <p className="mb-4 font-body text-sm font-semibold text-ink2">
                    {/* We need to render formatting HTML safely, or just split the string. 
                        t.rich allows formatted text. Let's use t.rich for complex string or just simple text for now if possible.
                        The original had <strong class="text-ink">not</strong>. 
                        I'll use t.rich('desc2', { strong: (chunks) => <strong className="text-ink">{chunks}</strong> })
                    */}
                    {t.rich('desc2', {
                        strong: (chunks) => <strong className="text-ink">{chunks}</strong>
                    })}
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl bg-clay-mint/10 p-4">
                        <h4 className="mb-2 font-display text-sm font-bold text-clay-mint-d">
                            ✦ {t('luckyTitle')}
                        </h4>
                        <ul className="space-y-1">
                            {kua.luckyDirections.map((dir, i) => (
                                <li
                                    key={dir}
                                    className="font-body text-sm font-semibold text-ink2"
                                >
                                    <span className="mr-2 text-clay-mint">
                                        {i === 0 ? '★' : '•'}
                                    </span>
                                    {tDirs(dir as any)}
                                    {i === 0 && (
                                        <span className="ml-1 text-xs font-bold text-clay-mint-d">
                                            {t('best')}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-xl bg-clay-red/10 p-4">
                        <h4 className="mb-2 font-display text-sm font-bold text-clay-red-d">
                            ✦ {t('avoidTitle')}
                        </h4>
                        <ul className="space-y-1">
                            {kua.unluckyDirections.map((dir) => (
                                <li
                                    key={dir}
                                    className="font-body text-sm font-semibold text-ink2"
                                >
                                    <span className="mr-2 text-clay-red">•</span>
                                    {tDirs(dir as any)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
