// ── Input ─────────────────────────────────────────
export interface DOBInput {
    day: number // 1–31
    month: number // 1–12
    year: number // 1900–current year
    name?: string // optional personalisation
}

// ── Computation Output ─────────────────────────────
export type IntensityLevel =
    | 'missing'
    | 'active'
    | 'strong'
    | 'dominant'
    | 'overwhelming'

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
    completionRatio: number // 0 | 0.33 | 0.67 | 1
    planeType: 'horizontal' | 'vertical' | 'diagonal'
    arrowName?: string // only if isComplete
    interpretation: string
}

export interface LoShuReading {
    input: DOBInput
    rawDigits: number[]
    digitMap: Record<number, DigitAnalysis>
    grid: number[][] // GRID_LAYOUT constant — always [4,9,2],[3,5,7],[8,1,6]
    planes: PlaneResult[]
    missingNumbers: number[]
    presentNumbers: number[]
    dominantNumbers: number[] // count >= 2
    arrows: string[] // arrow names for complete planes
    summaryHeadline: string
    summaryParagraph: string
    slug: string // URL-safe identifier for shareable link
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
    presentText: string
    strongText: string
    dominantText: string
    missingText: string
    career: string
    relationship: string
}
