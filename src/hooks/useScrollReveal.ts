'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        )

        // Observe all elements with .reveal class inside the container
        const revealElements = el.querySelectorAll('.reveal')
        revealElements.forEach((child) => observer.observe(child))

        return () => observer.disconnect()
    }, [])

    return ref
}
