'use client'

import type { LoShuReading } from '@/lib/types'
import { NUMBER_COLOURS, INTENSITY_LABELS } from '@/lib/utils'
import { NUMBER_CONTENT } from '@/lib/content'
import { useEffect, useRef } from 'react'

interface DetailPanelProps {
    reading: LoShuReading
    digit: number | null
    isOpen: boolean
    onClose: () => void
}

export function DetailPanel({
    reading,
    digit,
    isOpen,
    onClose,
}: DetailPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)

    // Focus trap on open
    useEffect(() => {
        if (isOpen && panelRef.current) {
            const closeBtn = panelRef.current.querySelector('button')
            closeBtn?.focus()
        }
    }, [isOpen])

    // Escape key to close
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [isOpen, onClose])

    if (!digit) return null

    const analysis = reading.digitMap[digit]
    const content = NUMBER_CONTENT[digit]
    const colours = NUMBER_COLOURS[digit]

    // Pick interpretation based on intensity
    let interpretationText = content.missingText
    if (analysis.intensity === 'active') interpretationText = content.presentText
    else if (analysis.intensity === 'strong') interpretationText = content.strongText
    else if (
        analysis.intensity === 'dominant' ||
        analysis.intensity === 'overwhelming'
    )
        interpretationText = content.dominantText

    return (
        <>
            {/* Backdrop — only on mobile */}
            <div
                className={`fixed inset-0 z-40 bg-ink/30 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                ref={panelRef}
                className={`fixed z-50 overflow-y-auto bg-surface shadow-clay-xl transition-transform duration-300 ${isOpen ? 'translate-x-0 translate-y-0' : ''
                    } bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:max-h-none lg:w-[420px] lg:rounded-l-2xl lg:rounded-tr-none ${!isOpen
                        ? 'translate-y-full lg:translate-x-full lg:translate-y-0'
                        : ''
                    }`}
                role="dialog"
                aria-modal="true"
                aria-label={`Details for number ${digit}`}
            >
                <div className="p-6 lg:p-8">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-bg2 font-body text-lg font-bold text-ink2 shadow-clay-xs transition-all hover:bg-bg hover:shadow-clay-sm active:translate-y-0.5"
                        aria-label="Close details panel"
                    >
                        ✕
                    </button>

                    {/* Number Header */}
                    <div className="mb-6 flex items-center gap-4">
                        <div
                            className="flex h-16 w-16 items-center justify-center rounded-xl font-display text-3xl font-black text-white shadow-clay-sm"
                            style={{ background: colours.bg }}
                        >
                            {digit}
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-bold text-ink">
                                {content.keyword}
                            </h2>
                            <p className="font-body text-sm font-semibold text-ink3">
                                {content.shortDesc}
                            </p>
                        </div>
                    </div>

                    {/* Intensity Badge */}
                    <div className="mb-6 flex items-center gap-3">
                        <span
                            className="rounded-pill px-4 py-1.5 font-body text-sm font-bold text-white shadow-clay-xs"
                            style={{ background: colours.shadow }}
                        >
                            {INTENSITY_LABELS[analysis.intensity]}
                        </span>
                        <span className="font-body text-sm font-semibold text-ink3">
                            {analysis.count > 0
                                ? `Appears ${analysis.count} time${analysis.count > 1 ? 's' : ''} in your chart`
                                : 'Not present in your chart'}
                        </span>
                    </div>

                    {/* Interpretation */}
                    <div className="mb-6">
                        <h3 className="mb-2 font-display text-lg font-bold text-ink">
                            ✦ Interpretation
                        </h3>
                        <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                            {interpretationText}
                        </p>
                    </div>

                    {/* Career */}
                    <div className="mb-6">
                        <h3 className="mb-2 font-display text-lg font-bold text-ink">
                            💼 Career Tendencies
                        </h3>
                        <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                            {content.career}
                        </p>
                    </div>

                    {/* Relationship */}
                    <div className="mb-6">
                        <h3 className="mb-2 font-display text-lg font-bold text-ink">
                            💕 Relationship Style
                        </h3>
                        <p className="font-body text-sm font-semibold leading-relaxed text-ink2">
                            {content.relationship}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
