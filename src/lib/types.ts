// ── Input ─────────────────────────────────────────
export interface DOBInput {
    day: number // 1–31
    month: number // 1–12
    year: number // 1900–current year
    gender: 'male' | 'female'
    name?: string // optional personalisation
}

// ── Computation Output ─────────────────────────────
export type IntensityLevel =
    | 'missing'
    | 'single'   // 1×
    | 'double'   // 2×
    | 'triple'   // 3×
    | 'quadruple' // 4×+

export interface GridPosition {
    row: number // 0 | 1 | 2
    col: number // 0 | 1 | 2
}

export interface DigitAnalysis {
    digit: number
    count: number
    intensity: IntensityLevel
    isPresent: boolean
    isMissing: boolean
    position: GridPosition
}

export interface PlaneResult {
    id: string
    name: string
    numbers: number[]
    presentNumbers: number[]
    missingNumbers: number[]
    isComplete: boolean
    isEmpty: boolean // all 3 missing → Arrow of Weakness
    completionRatio: number
    planeType: 'horizontal' | 'vertical' | 'diagonal'
    arrowName?: string // Arrow of Strength (when complete)
    weaknessArrowName?: string // Arrow of Weakness (when empty)
    interpretation: string
}

export interface MinorArrow {
    id: string
    name: string
    numbers: [number, number]
    isPresent: boolean
    interpretation: string
}

export interface KuaResult {
    number: number
    group: 'east' | 'west'
    luckyDirections: string[]
    unluckyDirections: string[]
}

export interface NumberMeta {
    digit: number
    planet: string
    element: string
    direction: string
    archetype: string
}

export interface LoShuReading {
    input: DOBInput
    rawDigits: number[] // digits placed in grid (no zeros, no century)
    mulank: number // Driver/Psychic number
    bhagyank: number // Conductor/Destiny number
    kuaNumber: KuaResult
    digitMap: Record<number, DigitAnalysis>
    grid: number[][] // GRID_LAYOUT constant
    planes: PlaneResult[]
    minorArrows: MinorArrow[]
    missingNumbers: number[]
    presentNumbers: number[]
    dominantNumbers: number[] // count >= 2
    arrowsOfStrength: string[]
    arrowsOfWeakness: string[]
    summaryHeadline: string
    summaryParagraph: string
    slug: string
}

// ── Validation ─────────────────────────────────────
export interface ValidationResult {
    isValid: boolean
    errors: {
        day?: string
        month?: string
        year?: string
    }
}

// ── Content types ──────────────────────────────────
export interface NumberContent {
    digit: number
    keyword: string
    shortDesc: string
    meta: NumberMeta
    repetitions: {
        single: string  // 1×
        double: string  // 2×
        triple: string  // 3×
        quadruple: string // 4×+
    }
    missingText: string
    remedy: string
}
