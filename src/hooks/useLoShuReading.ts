'use client'

import { useState, useCallback } from 'react'
import { computeLoShuReading } from '@/lib/loshu'
import type { DOBInput, LoShuReading } from '@/lib/types'

export type AppPhase = 'input' | 'loading' | 'results'

export type AppState =
    | { phase: 'input' }
    | { phase: 'loading' }
    | { phase: 'results'; reading: LoShuReading }

export function useLoShuReading() {
    const [state, setState] = useState<AppState>({ phase: 'input' })
    const [selectedCell, setSelectedCell] = useState<number | null>(null)

    const generate = useCallback((input: DOBInput) => {
        setState({ phase: 'loading' })

        // 400ms delay makes results feel "thoughtful" not instant
        setTimeout(() => {
            const reading = computeLoShuReading(input)
            setState({ phase: 'results', reading })
        }, 1800) // slightly longer for beautiful loader experience
    }, [])

    const reset = useCallback(() => {
        setState({ phase: 'input' })
        setSelectedCell(null)
    }, [])

    return { state, generate, reset, selectedCell, setSelectedCell }
}
