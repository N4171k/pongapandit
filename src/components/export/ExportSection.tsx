'use client'

import { useCallback, useRef } from 'react'
import type { LoShuReading } from '@/lib/types'

interface ExportSectionProps {
    reading: LoShuReading
    onReset: () => void
}

export function ExportSection({ reading, onReset }: ExportSectionProps) {
    const isExporting = useRef(false)

    const handleDownload = useCallback(async () => {
        if (isExporting.current) return
        isExporting.current = true

        try {
            const exportTarget = document.getElementById('export-target')
            if (!exportTarget) return

            const html2canvas = (await import('html2canvas')).default
            const canvas = await html2canvas(exportTarget, {
                scale: 2,
                backgroundColor: '#F5EFE6',
                useCORS: true,
            })

            const link = document.createElement('a')
            const namePart = reading.input.name
                ? reading.input.name.toLowerCase().replace(/\s+/g, '-')
                : 'reading'
            link.download = `loshu-${namePart}-${reading.input.day}-${reading.input.month}-${reading.input.year}.png`
            link.href = canvas.toDataURL('image/png')
            link.click()
        } catch (err) {
            console.error('Export failed:', err)
        } finally {
            isExporting.current = false
        }
    }, [reading])

    return (
        <section className="reveal flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
                onClick={handleDownload}
                className="rounded-pill bg-gradient-to-r from-clay-sky to-clay-lilac px-8 py-3.5 font-body text-base font-black text-white shadow-clay-md transition-all hover:shadow-clay-lg hover:brightness-105 active:translate-y-0.5 active:shadow-clay-sm"
            >
                📥 Download as Image
            </button>

            <button
                onClick={onReset}
                className="rounded-pill border-2 border-ink3/30 bg-surface px-8 py-3.5 font-body text-base font-black text-ink2 shadow-clay-sm transition-all hover:border-ink3/50 hover:shadow-clay-md active:translate-y-0.5 active:shadow-clay-xs"
            >
                🔄 New Reading
            </button>
        </section>
    )
}
