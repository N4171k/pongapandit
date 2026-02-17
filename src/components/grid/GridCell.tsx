'use client'

import type { DigitAnalysis } from '@/lib/types'
import { NUMBER_COLOURS, INTENSITY_LABELS } from '@/lib/utils'

interface GridCellProps {
    digit: number
    analysis: DigitAnalysis
    index: number
    isHighlighted: boolean
    onClick: () => void
}

export function GridCell({
    digit,
    analysis,
    index,
    isHighlighted,
    onClick,
}: GridCellProps) {
    const colours = NUMBER_COLOURS[digit]
    const isCentre = digit === 5
    const { count, intensity, isMissing } = analysis

    // Dot indicators (max 4 shown)
    const dotCount = Math.min(count, 4)
    const showPlus = count > 4

    const bgStyle = isMissing
        ? { background: 'rgba(55, 65, 81, 0.15)' }
        : {
            background: `linear-gradient(135deg, ${colours.bg}35, ${colours.bg}20)`,
            boxShadow: `0 4px 0 ${colours.shadow}40, 0 8px 20px ${colours.shadow}20, inset 0 2px 6px rgba(255,255,255,.50)`,
        }

    return (
        <button
            onClick={onClick}
            className={`group relative flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-300 animate-pop-in ${isCentre ? 'h-24 w-24 md:h-28 md:w-28' : 'h-20 w-20 md:h-24 md:w-24'
                } ${isMissing
                    ? 'border-dashed border-ink3/30 hover:border-ink3/50'
                    : `border-white/60 hover:scale-105 hover:border-white/80`
                } ${isHighlighted ? 'ring-2 ring-clay-gold ring-offset-2 ring-offset-bg' : ''} ${intensity === 'dominant' || intensity === 'overwhelming'
                    ? 'animate-clay-pulse'
                    : ''
                }`}
            style={{
                ...bgStyle,
                animationDelay: `${index * 80}ms`,
            }}
            role="gridcell"
            tabIndex={0}
            aria-label={`Number ${digit}, ${INTENSITY_LABELS[intensity]}${count > 0 ? `, appears ${count} time${count > 1 ? 's' : ''}` : ''
                }. Click for details.`}
        >
            {/* Number */}
            <span
                className={`font-display text-2xl font-black md:text-3xl ${isMissing ? 'text-ink3/40' : ''
                    }`}
                style={{ color: isMissing ? undefined : colours.bg }}
            >
                {digit}
            </span>

            {/* Dot indicators */}
            {count > 0 && (
                <div className="mt-0.5 flex items-center gap-0.5">
                    {Array.from({ length: dotCount }).map((_, i) => (
                        <div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: colours.bg }}
                        />
                    ))}
                    {showPlus && (
                        <span
                            className="ml-0.5 font-body text-xs font-bold"
                            style={{ color: colours.bg }}
                        >
                            +
                        </span>
                    )}
                </div>
            )}

            {/* Intensity badge */}
            <span
                className={`mt-1 rounded-pill px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider ${isMissing
                        ? 'bg-ink3/10 text-ink3'
                        : intensity === 'dominant' || intensity === 'overwhelming'
                            ? 'text-white'
                            : 'text-ink2'
                    }`}
                style={
                    !isMissing &&
                        (intensity === 'dominant' || intensity === 'overwhelming')
                        ? { background: colours.shadow }
                        : !isMissing
                            ? { background: `${colours.bg}30` }
                            : undefined
                }
            >
                {INTENSITY_LABELS[intensity]}
            </span>

            {/* Hover tooltip */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-body text-xs font-bold text-surface opacity-0 shadow-clay-xs transition-opacity duration-200 group-hover:opacity-100">
                Click for details
            </span>
        </button>
    )
}
