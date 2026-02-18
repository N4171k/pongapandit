'use client'

import { useState, useCallback, useRef } from 'react'
import type { LoShuReading } from '@/lib/types'
import { NUMBER_CONTENT } from '@/lib/content'

// ── Types ──────────────────────────────────────────────
export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    isStreaming?: boolean
}

// ── Reading serialiser (RAG context) ───────────────────
function serializeReading(reading: LoShuReading): string {
    const lines: string[] = []

    lines.push(`Name: ${reading.input.name || 'Not provided'}`)
    lines.push(`DOB: ${reading.input.day}/${reading.input.month}/${reading.input.year}`)
    lines.push(`Gender: ${reading.input.gender}`)
    lines.push(`Mulank (Driver): ${reading.mulank}`)
    lines.push(`Bhagyank (Conductor): ${reading.bhagyank}`)
    lines.push(`Kua Number: ${reading.kuaNumber.number} (${reading.kuaNumber.group} group)`)
    lines.push(`Lucky Directions: ${reading.kuaNumber.luckyDirections.join(', ')}`)
    lines.push(`Unlucky Directions: ${reading.kuaNumber.unluckyDirections.join(', ')}`)

    lines.push(`\nGrid Digits (1-9):`)
    for (let n = 1; n <= 9; n++) {
        const d = reading.digitMap[n]
        const content = NUMBER_CONTENT[n]
        lines.push(`  ${n} (${content.keyword}): ${d.count}× — ${d.isMissing ? 'MISSING' : d.intensity}`)
    }

    lines.push(`\nPresent Numbers: ${reading.presentNumbers.join(', ')}`)
    lines.push(`Missing Numbers: ${reading.missingNumbers.join(', ')}`)
    lines.push(`Dominant Numbers (≥2×): ${reading.dominantNumbers.join(', ') || 'None'}`)

    lines.push(`\nArrows of Strength: ${reading.arrowsOfStrength.join(', ') || 'None'}`)
    lines.push(`Arrows of Weakness: ${reading.arrowsOfWeakness.join(', ') || 'None'}`)

    const activeMinor = reading.minorArrows.filter((a) => a.isPresent)
    lines.push(`Minor Arrows: ${activeMinor.map((a) => a.name).join(', ') || 'None'}`)

    lines.push(`\nPlanes:`)
    for (const plane of reading.planes) {
        const status = plane.isComplete ? 'COMPLETE' : plane.isEmpty ? 'EMPTY' : `${plane.presentNumbers.length}/3`
        lines.push(`  ${plane.name}: ${status} [${plane.numbers.join(',')}]`)
    }



    return lines.join('\n')
}

// ── System Prompt ──────────────────────────────────────
function buildSystemPrompt(readingData?: string): string {
    let prompt = `You are **Shri Shri 1008 Devansh Maharaj Ponga Pandit**, a warm, knowledgeable numerology guide specialising in the Lo Shu Grid (also known as the Nine Star Ki or Chinese Numerology Square).

Your personality:
- Speak in a warm, encouraging but professional tone
- Use simple language, avoid jargon unless explaining it
- Be concise — aim for 3-5 sentence answers unless depth is needed
- Reference the user's actual numbers when possible
- When uncertain, say so honestly

Your knowledge:
- Lo Shu Grid: a 3×3 magic square mapping birth-date digits
- Mulank (Driver/Psychic Number): derived from day of birth
- Bhagyank (Conductor/Destiny Number): derived from full DOB
- Kua Number: feng shui spatial number from year + gender
- Planes of Expression: Mental, Emotional, Practical, Thought, Will, Action
- Arrows: Strength (complete planes), Weakness (empty planes), Minor arrows
- Each number 1-9 has planetary, elemental and directional associations
- Remedies for missing numbers (crystals, mantras, feng shui)
`

    if (readingData) {
        prompt += `\n\nHERE IS THE USER'S CALCULATED LO SHU READING. USE THIS DATA TO ANSWER THEIR QUESTIONS. DO NOT ASK FOR THEIR BIRTH DATE AS YOU ALREADY HAVE IT:\n\n${readingData}`
    } else {
        prompt += `\n\nNo reading data is currently available. If the user asks for a reading, ask them to generate one using the form on the left first.`
    }

    return prompt
}

// ── Hook ───────────────────────────────────────────────
export function usePuterChat(reading: LoShuReading | null) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const abortRef = useRef(false)

    const sendMessage = useCallback(async (userText: string) => {
        if (!userText.trim() || isLoading) return
        if (typeof window === 'undefined' || typeof puter === 'undefined') {
            console.error('Puter SDK not loaded')
            return
        }

        abortRef.current = false

        // Add user message
        const userMsg: ChatMessage = {
            id: `u-${Date.now()}`,
            role: 'user',
            content: userText.trim(),
        }

        const assistantId = `a-${Date.now()}`
        const assistantMsg: ChatMessage = {
            id: assistantId,
            role: 'assistant',
            content: '',
            isStreaming: true,
        }

        setMessages((prev) => [...prev, userMsg, assistantMsg])
        setIsLoading(true)

        try {
            // Prepare reading data
            const readingData = reading ? serializeReading(reading) : undefined
            const systemPrompt = buildSystemPrompt(readingData)

            // Build messages array for Puter
            // We re-inject the system prompt every time to ensure context is fresh
            const chatHistory: Array<{ role: string; content: string }> = [
                { role: 'system', content: systemPrompt },
            ]

            // Add conversation history (last 20 messages)
            const recentMsgs = [...messages, userMsg].slice(-20)
            for (const msg of recentMsgs) {
                chatHistory.push({
                    role: msg.role,
                    content: msg.content,
                })
            }

            // Call AI with streaming
            const stream = await (puter.ai.chat as Function)(
                chatHistory,
                {
                    model: 'claude-sonnet-4-20250514',
                    stream: true,
                }
            )

            let fullText = ''
            for await (const chunk of stream as AsyncIterable<{ text?: string }>) {
                if (abortRef.current) break
                if (chunk?.text) {
                    fullText += chunk.text
                    setMessages((prev) =>
                        prev.map((m) =>
                            m.id === assistantId
                                ? { ...m, content: fullText, isStreaming: true }
                                : m
                        )
                    )
                }
            }

            // Mark streaming complete
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === assistantId
                        ? { ...m, content: fullText, isStreaming: false }
                        : m
                )
            )

        } catch (err) {
            console.error('Puter chat error:', err)
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === assistantId
                        ? { ...m, content: 'Sorry, I couldn\'t connect. Please make sure you\'re signed in to Puter and try again.', isStreaming: false }
                        : m
                )
            )
        } finally {
            setIsLoading(false)
        }
    }, [messages, isLoading, reading])

    const clearChat = useCallback(() => {
        abortRef.current = true
        setMessages([])
        setIsLoading(false)
    }, [])

    return { messages, isLoading, sendMessage, clearChat }
}
