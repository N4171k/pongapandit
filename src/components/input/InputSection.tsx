'use client'

import { useState, useCallback } from 'react'
import type { DOBInput } from '@/lib/types'
import { validateDOB } from '@/lib/utils'

interface InputSectionProps {
    onGenerate: (input: DOBInput) => void
}

export function InputSection({ onGenerate }: InputSectionProps) {
    const [name, setName] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [errors, setErrors] = useState<{
        day?: string
        month?: string
        year?: string
    }>({})

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()

            const dayNum = parseInt(day, 10)
            const monthNum = parseInt(month, 10)
            const yearNum = parseInt(year, 10)

            const result = validateDOB(dayNum, monthNum, yearNum)

            if (!result.isValid) {
                setErrors(result.errors)
                return
            }

            setErrors({})
            onGenerate({
                day: dayNum,
                month: monthNum,
                year: yearNum,
                name: name.trim().slice(0, 50) || undefined,
            })
        },
        [day, month, year, name, onGenerate]
    )

    return (
        <section className="mx-auto max-w-lg py-12 text-center">
            {/* Hero Header */}
            <div className="mb-10">
                <h1 className="mb-3 font-display text-4xl font-black leading-tight tracking-tight text-ink md:text-5xl">
                    Your numbers.
                    <br />
                    <span className="bg-gradient-to-r from-clay-gold via-clay-red to-clay-lilac bg-clip-text text-transparent">
                        Your nature.
                    </span>
                </h1>
                <p className="mx-auto max-w-md font-body text-base font-semibold leading-relaxed text-ink2">
                    Discover the hidden patterns in your date of birth through the ancient
                    Lo Shu Grid — a 4,000-year-old Chinese numerology system.
                </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="clay-card mx-auto max-w-md p-8">
                {/* Name Input */}
                <div className="mb-6">
                    <label
                        htmlFor="name-input"
                        className="mb-2 block text-left font-body text-sm font-bold text-ink2"
                    >
                        Your Name{' '}
                        <span className="font-semibold text-ink3">(optional)</span>
                    </label>
                    <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        maxLength={50}
                        className="w-full rounded-lg border-2 border-bg2 bg-bg px-4 py-3 font-body text-base font-semibold text-ink outline-none transition-all duration-200 placeholder:text-ink3/50 focus:border-clay-gold focus:shadow-clay-xs"
                    />
                </div>

                {/* DOB Input — Three Fields */}
                <div className="mb-2">
                    <p className="mb-2 text-left font-body text-sm font-bold text-ink2">
                        Date of Birth
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        {/* Day */}
                        <div>
                            <label htmlFor="day-input" className="sr-only">
                                Day
                            </label>
                            <input
                                id="day-input"
                                type="number"
                                value={day}
                                onChange={(e) => {
                                    setDay(e.target.value)
                                    if (errors.day) setErrors((prev) => ({ ...prev, day: undefined }))
                                }}
                                placeholder="DD"
                                min={1}
                                max={31}
                                aria-describedby={errors.day ? 'day-error' : undefined}
                                className={`w-full rounded-lg border-2 bg-bg px-3 py-3 text-center font-display text-xl font-bold text-ink outline-none transition-all duration-200 placeholder:font-body placeholder:text-sm placeholder:font-semibold placeholder:text-ink3/50 focus:shadow-clay-xs ${errors.day
                                        ? 'border-clay-red'
                                        : 'border-bg2 focus:border-clay-gold'
                                    }`}
                            />
                            <p className="mt-1 text-center font-body text-xs font-semibold text-ink3">
                                Day
                            </p>
                        </div>
                        {/* Month */}
                        <div>
                            <label htmlFor="month-input" className="sr-only">
                                Month
                            </label>
                            <input
                                id="month-input"
                                type="number"
                                value={month}
                                onChange={(e) => {
                                    setMonth(e.target.value)
                                    if (errors.month)
                                        setErrors((prev) => ({ ...prev, month: undefined }))
                                }}
                                placeholder="MM"
                                min={1}
                                max={12}
                                aria-describedby={errors.month ? 'month-error' : undefined}
                                className={`w-full rounded-lg border-2 bg-bg px-3 py-3 text-center font-display text-xl font-bold text-ink outline-none transition-all duration-200 placeholder:font-body placeholder:text-sm placeholder:font-semibold placeholder:text-ink3/50 focus:shadow-clay-xs ${errors.month
                                        ? 'border-clay-red'
                                        : 'border-bg2 focus:border-clay-gold'
                                    }`}
                            />
                            <p className="mt-1 text-center font-body text-xs font-semibold text-ink3">
                                Month
                            </p>
                        </div>
                        {/* Year */}
                        <div>
                            <label htmlFor="year-input" className="sr-only">
                                Year
                            </label>
                            <input
                                id="year-input"
                                type="number"
                                value={year}
                                onChange={(e) => {
                                    setYear(e.target.value)
                                    if (errors.year)
                                        setErrors((prev) => ({ ...prev, year: undefined }))
                                }}
                                placeholder="YYYY"
                                min={1900}
                                max={new Date().getFullYear()}
                                aria-describedby={errors.year ? 'year-error' : undefined}
                                className={`w-full rounded-lg border-2 bg-bg px-3 py-3 text-center font-display text-xl font-bold text-ink outline-none transition-all duration-200 placeholder:font-body placeholder:text-sm placeholder:font-semibold placeholder:text-ink3/50 focus:shadow-clay-xs ${errors.year
                                        ? 'border-clay-red'
                                        : 'border-bg2 focus:border-clay-gold'
                                    }`}
                            />
                            <p className="mt-1 text-center font-body text-xs font-semibold text-ink3">
                                Year
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error Messages */}
                {(errors.day || errors.month || errors.year) && (
                    <div className="mb-4 rounded-lg bg-clay-red/10 px-4 py-2.5">
                        {errors.day && (
                            <p
                                id="day-error"
                                className="font-body text-xs font-bold text-clay-red-d"
                                role="alert"
                            >
                                {errors.day}
                            </p>
                        )}
                        {errors.month && (
                            <p
                                id="month-error"
                                className="font-body text-xs font-bold text-clay-red-d"
                                role="alert"
                            >
                                {errors.month}
                            </p>
                        )}
                        {errors.year && (
                            <p
                                id="year-error"
                                className="font-body text-xs font-bold text-clay-red-d"
                                role="alert"
                            >
                                {errors.year}
                            </p>
                        )}
                    </div>
                )}

                {/* Generate Button */}
                <button
                    type="submit"
                    className="mt-4 w-full rounded-pill bg-gradient-to-r from-clay-gold to-clay-amber px-8 py-4 font-body text-lg font-black text-ink shadow-clay-md transition-all duration-200 hover:shadow-clay-lg hover:brightness-105 active:translate-y-0.5 active:shadow-clay-sm"
                >
                    ✨ Generate My Grid
                </button>

                {/* Disclaimer */}
                <p className="mt-4 font-body text-xs font-semibold leading-relaxed text-ink3">
                    Lo Shu Grid is a traditional Chinese numerology framework used for
                    self-reflection. Not scientifically validated.
                </p>
            </form>
        </section>
    )
}
