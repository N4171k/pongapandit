'use client'

import { useState, useRef, useEffect } from 'react'
import { useLoShuReading } from '@/hooks/useLoShuReading'
import { useDetailPanel } from '@/hooks/useDetailPanel'
import { InputSection } from '@/components/input/InputSection'
import { Loader } from '@/components/Loader'
import { LoShuGrid } from '@/components/grid/LoShuGrid'
import { SummaryCard } from '@/components/results/SummaryCard'
import { NumbersSection } from '@/components/results/NumbersSection'
import { PlaneAnalysis } from '@/components/results/PlaneAnalysis'
import { DeepDive } from '@/components/results/DeepDive'
import { ExportSection } from '@/components/export/ExportSection'
import { DetailPanel } from '@/components/panels/DetailPanel'

export function AppShell() {
    const { state, generate, reset } = useLoShuReading()
    const { selectedDigit, isOpen, open, close } = useDetailPanel()
    const [highlightedNumbers, setHighlightedNumbers] = useState<number[]>([])
    const resultsRef = useRef<HTMLDivElement>(null)

    // Scroll reveal effect for results
    useEffect(() => {
        if (state.phase !== 'results' || !resultsRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        )

        const revealElements = resultsRef.current.querySelectorAll('.reveal')
        revealElements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [state.phase])

    // Announce to screen readers when reading is generated
    useEffect(() => {
        if (state.phase === 'results') {
            const announcement = document.createElement('div')
            announcement.setAttribute('role', 'status')
            announcement.setAttribute('aria-live', 'polite')
            announcement.className = 'sr-only'
            announcement.textContent = 'Your Lo Shu Grid has been generated.'
            document.body.appendChild(announcement)
            setTimeout(() => announcement.remove(), 3000)
        }
    }, [state.phase])

    if (state.phase === 'input') {
        return <InputSection onGenerate={generate} />
    }

    if (state.phase === 'loading') {
        return <Loader />
    }

    // Results phase
    const { reading } = state

    return (
        <>
            <div ref={resultsRef} className="space-y-12 py-8">
                {/* Grid + Summary — side by side on desktop */}
                <div
                    id="export-target"
                    className="reveal grid gap-8 lg:grid-cols-[auto_1fr]"
                >
                    <LoShuGrid
                        reading={reading}
                        onCellClick={open}
                        highlightedNumbers={highlightedNumbers}
                    />
                    <SummaryCard reading={reading} />
                </div>

                {/* Numbers Section */}
                <NumbersSection reading={reading} onNumberClick={open} />

                {/* Plane Analysis */}
                <PlaneAnalysis
                    reading={reading}
                    onHighlight={setHighlightedNumbers}
                />

                {/* Deep Dive */}
                <DeepDive reading={reading} />

                {/* Export / Reset */}
                <ExportSection reading={reading} onReset={reset} />

                {/* Disclaimer */}
                <div className="reveal text-center">
                    <p className="mx-auto max-w-lg font-body text-xs font-semibold leading-relaxed text-ink3">
                        Lo Shu Grid is a traditional Chinese numerology framework used for
                        self-reflection and personal insight. Results are not scientifically
                        validated predictions. This tool is intended for personal growth and
                        entertainment purposes only.
                    </p>
                </div>
            </div>

            {/* Detail Panel */}
            <DetailPanel
                reading={reading}
                digit={selectedDigit}
                isOpen={isOpen}
                onClose={close}
            />
        </>
    )
}
