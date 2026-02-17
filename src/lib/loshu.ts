import type { DOBInput, LoShuReading, DigitAnalysis, IntensityLevel } from './types'
import { getPlaneContent, buildSummary } from './content'

// ── Constants ───────────────────────────────────────
export const GRID_LAYOUT: number[][] = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
]

export const NUMBER_POSITION: Record<number, { row: number; col: number }> = {
    4: { row: 0, col: 0 },
    9: { row: 0, col: 1 },
    2: { row: 0, col: 2 },
    3: { row: 1, col: 0 },
    5: { row: 1, col: 1 },
    7: { row: 1, col: 2 },
    8: { row: 2, col: 0 },
    1: { row: 2, col: 1 },
    6: { row: 2, col: 2 },
}

export const PLANES = [
    {
        id: 'mental',
        name: 'Mental Plane',
        numbers: [4, 9, 2],
        planeType: 'horizontal' as const,
        arrowName: 'Arrow of the Intellect',
    },
    {
        id: 'emotional',
        name: 'Emotional Plane',
        numbers: [3, 5, 7],
        planeType: 'horizontal' as const,
        arrowName: 'Arrow of the Spiritual',
    },
    {
        id: 'physical',
        name: 'Physical Plane',
        numbers: [8, 1, 6],
        planeType: 'horizontal' as const,
        arrowName: 'Arrow of the Planner',
    },
    {
        id: 'thought',
        name: 'Thought Plane',
        numbers: [4, 3, 8],
        planeType: 'vertical' as const,
        arrowName: 'Arrow of Practicality',
    },
    {
        id: 'will',
        name: 'Will Plane',
        numbers: [9, 5, 1],
        planeType: 'vertical' as const,
        arrowName: 'Arrow of Determination',
    },
    {
        id: 'sensitivity',
        name: 'Sensitivity Plane',
        numbers: [2, 7, 6],
        planeType: 'vertical' as const,
        arrowName: 'Arrow of Compassion',
    },
    {
        id: 'stability',
        name: 'Stability Plane',
        numbers: [4, 5, 6],
        planeType: 'diagonal' as const,
        arrowName: 'Arrow of Balance',
    },
    {
        id: 'success',
        name: 'Success Plane',
        numbers: [2, 5, 8],
        planeType: 'diagonal' as const,
        arrowName: 'Arrow of Prosperity',
    },
]

// ── Main Export ─────────────────────────────────────
export function computeLoShuReading(input: DOBInput): LoShuReading {
    // Step 1: Extract digits — day and month as raw ints, year as 4-digit string
    const digitString = `${input.day}${input.month}${input.year}`
    const rawDigits = digitString
        .split('')
        .filter((ch) => ch !== '0')
        .map(Number)

    // Step 2: Frequency map
    const freqMap: Record<number, number> = {}
    for (let n = 1; n <= 9; n++) freqMap[n] = 0
    for (const d of rawDigits) freqMap[d]++

    // Step 3: Classify each digit
    const digitMap: Record<number, DigitAnalysis> = {}
    for (let n = 1; n <= 9; n++) {
        const count = freqMap[n]
        digitMap[n] = {
            digit: n,
            count,
            intensity: getIntensity(count),
            isPresent: count > 0,
            isMissing: count === 0,
            position: NUMBER_POSITION[n],
        }
    }

    // Step 4: Plane analysis
    const planes = PLANES.map((plane) => {
        const presentNumbers = plane.numbers.filter((n) => digitMap[n].isPresent)
        const missingNumbers = plane.numbers.filter((n) => digitMap[n].isMissing)
        const isComplete = presentNumbers.length === 3
        return {
            ...plane,
            presentNumbers,
            missingNumbers,
            isComplete,
            completionRatio: presentNumbers.length / 3,
            arrowName: isComplete ? plane.arrowName : undefined,
            interpretation: getPlaneContent(plane.id, presentNumbers.length),
        }
    })

    // Step 5: Derived lists
    const missingNumbers = Object.values(digitMap)
        .filter((d) => d.isMissing)
        .map((d) => d.digit)
    const presentNumbers = Object.values(digitMap)
        .filter((d) => d.isPresent)
        .map((d) => d.digit)
    const dominantNumbers = Object.values(digitMap)
        .filter((d) => d.count >= 2)
        .map((d) => d.digit)
    const arrows = planes.filter((p) => p.isComplete).map((p) => p.arrowName!)

    // Step 6: Summary
    const { headline, paragraph } = buildSummary({
        digitMap,
        planes,
        dominantNumbers,
        missingNumbers,
        input,
    })

    return {
        input,
        rawDigits,
        digitMap,
        grid: GRID_LAYOUT,
        planes,
        missingNumbers,
        presentNumbers,
        dominantNumbers,
        arrows,
        summaryHeadline: headline,
        summaryParagraph: paragraph,
        slug: buildSlug(input),
    }
}

// ── Helpers ─────────────────────────────────────────
function getIntensity(count: number): IntensityLevel {
    if (count === 0) return 'missing'
    if (count === 1) return 'active'
    if (count === 2) return 'strong'
    if (count === 3) return 'dominant'
    return 'overwhelming'
}

function buildSlug(input: DOBInput): string {
    const name = input.name?.toLowerCase().replace(/\s+/g, '-') ?? 'reading'
    return `${name}-${input.day}-${input.month}-${input.year}`
}
