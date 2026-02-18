'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ChatMessage } from '@/hooks/usePuterChat'

interface ChatPanelProps {
    isOpen: boolean
    onClose: () => void
    messages: ChatMessage[]
    isLoading: boolean
    onSend: (text: string) => void
    onClear: () => void
}

const STARTERS = [
    '🔢 What do my numbers say about me?',
    '💫 What is my Mulank and Bhagyank?',
    '🧭 Which directions are lucky for me?',
    '💎 What remedies do I need?',
]

export function ChatPanel({
    isOpen,
    onClose,
    messages,
    isLoading,
    onSend,
    onClear,
}: ChatPanelProps) {
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Focus input when panel opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [isOpen])

    const handleSend = () => {
        if (!input.trim() || isLoading) return
        onSend(input.trim())
        setInput('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleStarter = (q: string) => {
        // Remove emoji prefix
        const text = q.replace(/^[^\w]+/, '').trim()
        onSend(text)
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[90] bg-ink/30 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                className={`fixed z-[100] flex flex-col bg-surface shadow-clay-xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0 translate-y-0' : ''
                    } bottom-0 right-0 left-0 h-[85vh] rounded-t-2xl lg:bottom-4 lg:left-auto lg:right-6 lg:top-auto lg:h-[600px] lg:w-[400px] lg:rounded-2xl ${!isOpen
                        ? 'translate-y-full lg:translate-y-[120%]'
                        : ''
                    }`}
                role="dialog"
                aria-modal="true"
                aria-label="Chat with Shri Shri 1008 Devansh Maharaj Ponga Pandit"
            >
                {/* Header */}
                <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-bg2 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-clay-gold to-clay-amber">
                            <span className="text-lg">🔮</span>
                        </div>
                        <div>
                            <h3 className="font-display text-base font-bold text-ink">
                                Shri Shri 1008 Devansh Maharaj Ponga Pandit
                            </h3>
                            <p className="font-body text-xs font-semibold text-ink3">
                                AI Numerology Guide
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {messages.length > 0 && (
                            <button
                                onClick={onClear}
                                className="rounded-lg px-2.5 py-1.5 font-body text-xs font-bold text-ink3 transition-colors hover:bg-bg2 hover:text-ink"
                                title="Clear chat"
                            >
                                Clear
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-bg2 font-body text-sm font-bold text-ink2 transition-all hover:bg-bg hover:shadow-clay-xs"
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center">
                            <div className="mb-4 text-4xl">✨</div>
                            <h4 className="mb-2 text-center font-display text-lg font-bold text-ink">
                                Ask me anything!
                            </h4>
                            <p className="mb-6 text-center font-body text-sm font-semibold text-ink3">
                                I can explain your Lo Shu Grid reading, suggest remedies, or answer numerology questions.
                            </p>
                            <div className="flex flex-col gap-2 w-full max-w-xs">
                                {STARTERS.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => handleStarter(q)}
                                        className="rounded-xl border border-bg2 px-4 py-2.5 text-left font-body text-sm font-semibold text-ink2 transition-all hover:border-clay-gold/30 hover:bg-clay-gold/5 hover:text-ink"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-clay-gold to-clay-amber text-white rounded-br-md font-semibold'
                                            : 'bg-bg2 text-ink2 rounded-bl-md'
                                            }`}
                                    >
                                        {msg.content ? (
                                            msg.role === 'user' ? (
                                                msg.content
                                            ) : (
                                                <div className="markdown-content">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            p: ({ children }) => <p className="mb-2 last:mb-0 font-semibold">{children}</p>,
                                                            ul: ({ children }) => <ul className="mb-2 list-disc pl-4 space-y-1 last:mb-0 marker:text-clay-gold-d">{children}</ul>,
                                                            ol: ({ children }) => <ol className="mb-2 list-decimal pl-4 space-y-1 last:mb-0 marker:text-clay-gold-d">{children}</ol>,
                                                            li: ({ children }) => <li className="pl-1 font-semibold">{children}</li>,
                                                            strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
                                                            a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-clay-gold-d hover:underline font-bold" />,
                                                            code: ({ children }) => <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs">{children}</code>
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            )
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-ink3">
                                                <span className="animate-bounce">●</span>
                                                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
                                                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
                                            </span>
                                        )}
                                        {msg.isStreaming && msg.content && (
                                            <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-ink3 align-middle" />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="shrink-0 border-t border-bg2 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about your reading..."
                            disabled={isLoading}
                            className="flex-1 rounded-xl border border-bg2 bg-bg px-4 py-2.5 font-body text-sm font-semibold text-ink placeholder:text-ink3 focus:border-clay-gold/50 focus:outline-none focus:ring-2 focus:ring-clay-gold/20 disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-clay-gold to-clay-amber text-white shadow-clay-xs transition-all hover:shadow-clay-sm active:scale-95 disabled:opacity-40 disabled:shadow-none"
                            aria-label="Send message"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                    <p className="mt-2 text-center font-body text-[10px] font-semibold text-ink3/60">
                        Powered by Puter AI · Responses are for entertainment only
                    </p>
                </div>
            </div>
        </>
    )
}
