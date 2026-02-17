'use client'

import type { KuaResult } from '@/lib/types'

interface KuaSectionProps {
    kua: KuaResult
}

export function KuaSection({ kua }: KuaSectionProps) {
    return (
        <section className="reveal mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                Kua Number — Spatial Harmony
            </h2>
            <div className="clay-card p-6">
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-clay-gold/30 to-clay-amber/30 font-display text-3xl font-black text-clay-gold-d">
                        {kua.number}
                    </div>
                    <div>
                        <h3 className="font-display text-lg font-bold text-ink">
                            {kua.group === 'east' ? 'East Group' : 'West Group'}
                        </h3>
                        <p className="font-body text-xs font-bold text-ink3">
                            Governs directional luck, Feng Shui orientation &amp; environmental harmony
                        </p>
                    </div>
                </div>

                <p className="mb-4 font-body text-sm font-semibold text-ink2">
                    The Kua Number is an external spatial vector — it is <strong className="text-ink">not</strong> placed
                    inside the Lo Shu Grid. It dictates how your innate psychological architecture interfaces
                    with the Earth&apos;s magnetic directions for success, health, and relationships.
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl bg-clay-mint/10 p-4">
                        <h4 className="mb-2 font-display text-sm font-bold text-clay-mint-d">
                            ✦ Lucky Directions
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
                                    {dir}
                                    {i === 0 && (
                                        <span className="ml-1 text-xs font-bold text-clay-mint-d">
                                            (best)
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-xl bg-clay-red/10 p-4">
                        <h4 className="mb-2 font-display text-sm font-bold text-clay-red-d">
                            ✦ Avoid Directions
                        </h4>
                        <ul className="space-y-1">
                            {kua.unluckyDirections.map((dir) => (
                                <li
                                    key={dir}
                                    className="font-body text-sm font-semibold text-ink2"
                                >
                                    <span className="mr-2 text-clay-red">•</span>
                                    {dir}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
