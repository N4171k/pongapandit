import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ValidationResult } from './types'

// Tailwind class merging utility
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

// DOB validation
export function validateDOB(
    day: number,
    month: number,
    year: number
): ValidationResult {
    const errors: ValidationResult['errors'] = {}
    const currentYear = new Date().getFullYear()

    if (!day || day < 1 || day > 31) errors.day = 'Enter a valid day (1\u201331)'
    if (!month || month < 1 || month > 12)
        errors.month = 'Enter a valid month (1\u201312)'
    if (!year || year < 1900 || year > currentYear)
        errors.year = `Enter a year between 1900 and ${currentYear}`

    if (!errors.day && !errors.month && !errors.year) {
        // Check days in month
        const maxDays = new Date(year, month, 0).getDate()
        if (day > maxDays)
            errors.day = `${getMonthName(month)} ${year} only has ${maxDays} days`

        // Check not future date
        const inputDate = new Date(year, month - 1, day)
        if (inputDate > new Date()) errors.day = 'Date cannot be in the future'
    }

    return { isValid: Object.keys(errors).length === 0, errors }
}

function getMonthName(month: number): string {
    return new Date(2000, month - 1).toLocaleString('en', { month: 'long' })
}

// Number to colour token mapping
export const NUMBER_COLOURS: Record<
    number,
    { bg: string; shadow: string; label: string }
> = {
    1: { bg: '#74C0FC', shadow: '#5AAAE8', label: 'sky' },
    2: { bg: '#F9A8D4', shadow: '#E690BB', label: 'rose' },
    3: { bg: '#FFB347', shadow: '#E89D30', label: 'amber' },
    4: { bg: '#2DD4BF', shadow: '#1ABFAA', label: 'teal' },
    5: { bg: '#FFD166', shadow: '#E8BB4E', label: 'gold' },
    6: { bg: '#5DD9A4', shadow: '#47C48F', label: 'mint' },
    7: { bg: '#C084FC', shadow: '#A96EE6', label: 'lilac' },
    8: { bg: '#FF6B6B', shadow: '#E85555', label: 'red' },
    9: { bg: '#F9A8D4', shadow: '#E690BB', label: 'rose' },
}

// Intensity labels for display
export const INTENSITY_LABELS: Record<string, string> = {
    missing: 'Absent',
    active: 'Active',
    strong: 'Strong',
    dominant: 'Dominant',
    overwhelming: 'Overwhelming',
}
