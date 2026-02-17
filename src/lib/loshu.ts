import type {
    DOBInput,
    LoShuReading,
    DigitAnalysis,
    IntensityLevel,
    PlaneResult,
    MinorArrow,
    KuaResult,
} from './types'
import { getPlaneInterpretation, getWeaknessInterpretation, getMinorArrowContent, buildSummary } from './content'

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

// ── Plane Definitions (with correct names per framework) ──
export const PLANES = [
    // Horizontal Planes
    {
        id: 'mental',
        name: 'Mental Plane',
        numbers: [4, 9, 2],
        planeType: 'horizontal' as const,
        arrowName: 'Arrow of the Intellect',
        weaknessArrowName: undefined as string | undefined,
    },
    {
        id: 'emotional',
        name: 'Emotional Plane',
        numbers: [3, 5, 7],
        planeType: 'horizontal' as const,
        arrowName: 'Arrow of the Spiritual',
        weaknessArrowName: 'Arrow of Scepticism',
    },
    {
        id: 'practical',
        name: 'Practical Plane',
        numbers: [8, 1, 6],
        planeType: 'horizontal' as const,
        arrowName: 'Arrow of Planning',
        weaknessArrowName: undefined as string | undefined,
    },
    // Vertical Planes
    {
        id: 'thought',
        name: 'Thought Plane',
        numbers: [4, 3, 8],
        planeType: 'vertical' as const,
        arrowName: 'Arrow of the Thinker',
        weaknessArrowName: 'Arrow of Impracticality',
    },
    {
        id: 'will',
        name: 'Will Plane',
        numbers: [9, 5, 1],
        planeType: 'vertical' as const,
        arrowName: 'Arrow of Determination',
        weaknessArrowName: 'Arrow of Indecision',
    },
    {
        id: 'action',
        name: 'Action Plane',
        numbers: [2, 7, 6],
        planeType: 'vertical' as const,
        arrowName: 'Arrow of Action',
        weaknessArrowName: undefined as string | undefined,
    },
    // Diagonal Planes (Yogic Alignments)
    {
        id: 'golden_yog',
        name: 'Golden Yog (Raj Yog)',
        numbers: [4, 5, 6],
        planeType: 'diagonal' as const,
        arrowName: 'Arrow of Prosperity — Golden Yog',
        weaknessArrowName: 'Arrow of Frustrations',
    },
    {
        id: 'silver_yog',
        name: 'Silver Yog (Rajat Yog)',
        numbers: [2, 5, 8],
        planeType: 'diagonal' as const,
        arrowName: 'Arrow of Abundance — Silver Yog',
        weaknessArrowName: 'Arrow of Emotional Sensitivity',
    },
]

// ── Minor Arrow Definitions ─────────────────────────
const MINOR_ARROW_DEFS = [
    { id: 'detail_deceit', name: 'Arrow of Detail & Deceit', numbers: [1, 3] as [number, number] },
    { id: 'litigation', name: 'Arrow of Litigation', numbers: [3, 9] as [number, number] },
    { id: 'peace_of_mind', name: 'Arrow of Peace of Mind', numbers: [7, 9] as [number, number] },
    { id: 'science', name: 'Arrow of Science', numbers: [1, 7] as [number, number] },
]

// Additional weakness arrows that don't map to main planes
const EXTRA_WEAKNESS_ARROWS = [
    { numbers: [3, 6, 9], name: 'Arrow of Poor Memory' },
    { numbers: [7, 8, 9], name: 'Arrow of Hesitation' },
]

// ── Main Export ─────────────────────────────────────
export function computeLoShuReading(input: DOBInput): LoShuReading {
    // Step 1: Calculate Mulank (Driver/Psychic) from day only
    const mulank = reduceToSingleDigit(input.day)

    // Step 2: Calculate Bhagyank (Conductor/Destiny) from full DOB
    const bhagyankSum = digitSum(input.day) + digitSum(input.month) + digitSum(input.year)
    const bhagyank = reduceToSingleDigit(bhagyankSum)

    // Step 3: Calculate Kua Number (needed before grid — Kua goes INTO the grid)
    const kuaNumber = calculateKua(input.year, input.month, input.day, input.gender)

    // Step 4: Extract raw digits — INCLUDE full year digits, EXCLUDE zeros
    const rawString = `${input.day}${input.month}${input.year}`
    const baseDigits = rawString
        .split('')
        .filter((ch) => ch !== '0')
        .map(Number)

    // Step 5: Build grid digits = DOB digits + Mulank + Bhagyank + Kua
    const gridDigits = [...baseDigits]

    // Mulank is ALWAYS added to grid
    gridDigits.push(mulank)

    // Bhagyank is ALWAYS added to grid
    gridDigits.push(bhagyank)

    // Kua number is ALWAYS added to grid
    gridDigits.push(kuaNumber.number)

    // Step 6: Frequency map from grid digits
    const freqMap: Record<number, number> = {}
    for (let n = 1; n <= 9; n++) freqMap[n] = 0
    for (const d of gridDigits) {
        if (d >= 1 && d <= 9) freqMap[d]++
    }

    // Step 7: Classify each digit
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

    // Step 8: Plane analysis (Arrows of Strength + Weakness)
    const planes: PlaneResult[] = PLANES.map((plane) => {
        const presentNumbers = plane.numbers.filter((n) => digitMap[n].isPresent)
        const missingNumbers = plane.numbers.filter((n) => digitMap[n].isMissing)
        const isComplete = presentNumbers.length === 3
        const isEmpty = presentNumbers.length === 0

        return {
            ...plane,
            presentNumbers,
            missingNumbers,
            isComplete,
            isEmpty,
            completionRatio: presentNumbers.length / 3,
            arrowName: isComplete ? plane.arrowName : undefined,
            weaknessArrowName: isEmpty ? plane.weaknessArrowName : undefined,
            interpretation: isComplete
                ? getPlaneInterpretation(plane.id, 'strength')
                : isEmpty && plane.weaknessArrowName
                    ? getWeaknessInterpretation(plane.id)
                    : getPlaneInterpretation(plane.id, 'developing', presentNumbers.length),
        }
    })

    // Step 9: Check extra weakness arrows (3,6,9 and 7,8,9)
    const extraWeaknesses: string[] = []
    for (const ew of EXTRA_WEAKNESS_ARROWS) {
        const allMissing = ew.numbers.every((n) => digitMap[n].isMissing)
        if (allMissing) extraWeaknesses.push(ew.name)
    }

    // Step 10: Minor arrows
    const minorArrows: MinorArrow[] = MINOR_ARROW_DEFS.map((def) => {
        const isPresent = def.numbers.every((n) => digitMap[n].isPresent)
        return {
            ...def,
            isPresent,
            interpretation: isPresent ? getMinorArrowContent(def.id) : '',
        }
    })

    // Step 11: Derived lists
    const missingNumbers = Object.values(digitMap)
        .filter((d) => d.isMissing)
        .map((d) => d.digit)
    const presentNumbers = Object.values(digitMap)
        .filter((d) => d.isPresent)
        .map((d) => d.digit)
    const dominantNumbers = Object.values(digitMap)
        .filter((d) => d.count >= 2)
        .map((d) => d.digit)
    const arrowsOfStrength = planes
        .filter((p) => p.isComplete)
        .map((p) => p.arrowName!)
    const arrowsOfWeakness = [
        ...planes
            .filter((p) => p.isEmpty && p.weaknessArrowName)
            .map((p) => p.weaknessArrowName!),
        ...extraWeaknesses,
    ]

    // Step 12: Summary
    const { headline, paragraph } = buildSummary({
        digitMap,
        planes,
        dominantNumbers,
        missingNumbers,
        mulank,
        bhagyank,
        input,
    })

    return {
        input,
        rawDigits: gridDigits,
        mulank,
        bhagyank,
        kuaNumber,
        digitMap,
        grid: GRID_LAYOUT,
        planes,
        minorArrows,
        missingNumbers,
        presentNumbers,
        dominantNumbers,
        arrowsOfStrength,
        arrowsOfWeakness,
        summaryHeadline: headline,
        summaryParagraph: paragraph,
        slug: buildSlug(input),
    }
}

// ── Helpers ─────────────────────────────────────────
function getIntensity(count: number): IntensityLevel {
    if (count === 0) return 'missing'
    if (count === 1) return 'single'
    if (count === 2) return 'double'
    if (count === 3) return 'triple'
    return 'quadruple'
}

/** Sum all digits of a number */
function digitSum(n: number): number {
    return Math.abs(n)
        .toString()
        .split('')
        .reduce((sum, ch) => sum + parseInt(ch, 10), 0)
}

/** Repeatedly reduce a number to a single digit 1-9 */
function reduceToSingleDigit(n: number): number {
    let val = Math.abs(n)
    while (val > 9) {
        val = digitSum(val)
    }
    // Edge case: if val is 0 (e.g. from 10 → 1+0=1, but just in case)
    return val === 0 ? 9 : val
}

/** Calculate Kua Number with Chinese Solar Calendar */
function calculateKua(
    year: number,
    month: number,
    day: number,
    gender: 'male' | 'female'
): KuaResult {
    // Chinese Solar Calendar: year starts ~Feb 4-5
    // If born before Feb 4, use previous year
    let adjustedYear = year
    if (month === 1 || (month === 2 && day < 4)) {
        adjustedYear = year - 1
    }

    const yearLast2 = adjustedYear % 100
    const yearDigitSum = reduceToSingleDigit(yearLast2)

    let kuaNum: number

    if (gender === 'male') {
        if (adjustedYear < 2000) {
            kuaNum = 10 - yearDigitSum
        } else {
            kuaNum = 9 - yearDigitSum
        }
    } else {
        if (adjustedYear < 2000) {
            kuaNum = yearDigitSum + 5
        } else {
            kuaNum = yearDigitSum + 6
        }
    }

    // Reduce to single digit
    kuaNum = reduceToSingleDigit(kuaNum)

    // Special: Kua 5 doesn't exist — males become 2, females become 8
    if (kuaNum === 5) {
        kuaNum = gender === 'male' ? 2 : 8
    }

    const eastGroup = [1, 3, 4, 9]
    const group = eastGroup.includes(kuaNum) ? 'east' : 'west'

    const KUA_DIRECTIONS: Record<number, { lucky: string[]; unlucky: string[] }> = {
        1: { lucky: ['South-East', 'East', 'South', 'North'], unlucky: ['West', 'North-East', 'North-West', 'South-West'] },
        2: { lucky: ['North-East', 'West', 'North-West', 'South-West'], unlucky: ['East', 'South-East', 'South', 'North'] },
        3: { lucky: ['South', 'North', 'South-East', 'East'], unlucky: ['South-West', 'North-West', 'North-East', 'West'] },
        4: { lucky: ['North', 'South', 'East', 'South-East'], unlucky: ['North-West', 'South-West', 'West', 'North-East'] },
        6: { lucky: ['West', 'North-East', 'South-West', 'North-West'], unlucky: ['South-East', 'East', 'North', 'South'] },
        7: { lucky: ['North-West', 'South-West', 'North-East', 'West'], unlucky: ['North', 'South', 'South-East', 'East'] },
        8: { lucky: ['South-West', 'North-West', 'West', 'North-East'], unlucky: ['South', 'North', 'East', 'South-East'] },
        9: { lucky: ['East', 'South-East', 'North', 'South'], unlucky: ['North-East', 'West', 'South-West', 'North-West'] },
    }

    const dirs = KUA_DIRECTIONS[kuaNum] || { lucky: [], unlucky: [] }

    return {
        number: kuaNum,
        group,
        luckyDirections: dirs.lucky,
        unluckyDirections: dirs.unlucky,
    }
}

function buildSlug(input: DOBInput): string {
    const name = input.name?.toLowerCase().replace(/\s+/g, '-') ?? 'reading'
    return `${name}-${input.day}-${input.month}-${input.year}`
}
