'use client'

import { useState, useCallback } from 'react'

export function useDetailPanel() {
    const [selectedDigit, setSelectedDigit] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const open = useCallback((digit: number) => {
        setSelectedDigit(digit)
        setIsOpen(true)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
        // Delay clearing digit so slide-out still shows content
        setTimeout(() => setSelectedDigit(null), 300)
    }, [])

    return { selectedDigit, isOpen, open, close }
}
