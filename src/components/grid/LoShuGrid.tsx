'use client'

import { GRID_LAYOUT } from '@/lib/loshu'
import { GridCell } from './GridCell'
import type { LoShuReading } from '@/lib/types'

interface LoShuGridProps {
    reading: LoShuReading
    onCellClick: (digit: number) => void
    highlightedNumbers?: number[]
}

export function LoShuGrid({
    reading,
    onCellClick,
    highlightedNumbers = [],
}: LoShuGridProps) {
    return (
        <div className="mx-auto w-fit">
            {/* Row Labels */}
            <div className="mb-2 grid grid-cols-3 gap-1 text-center">
                <span className="sr-only">Column 1: Thought</span>
                <span className="sr-only">Column 2: Will</span>
                <span className="sr-only">Column 3: Sensitivity</span>
            </div>

            {/* Grid */}
            <div
                className="grid grid-cols-3 gap-3"
                role="grid"
                aria-label="Lo Shu Grid — click any cell for details"
            >
                {GRID_LAYOUT.flat().map((num, idx) => {
                    const analysis = reading.digitMap[num]
                    const isHighlighted = highlightedNumbers.includes(num)
                    return (
                        <GridCell
                            key={num}
                            digit={num}
                            analysis={analysis}
                            index={idx}
                            isHighlighted={isHighlighted}
                            onClick={() => onCellClick(num)}
                        />
                    )
                })}
            </div>

            {/* Row Labels */}
            <div className="mt-3 flex justify-between px-1">
                <span className="font-body text-xs font-bold text-ink3">
                    Mental ↑
                </span>
                <span className="font-body text-xs font-bold text-ink3">
                    Emotional ↕
                </span>
                <span className="font-body text-xs font-bold text-ink3">
                    Physical ↓
                </span>
            </div>
        </div>
    )
}
