'use client'

interface ChatBubbleProps {
    onClick: () => void
    isOpen: boolean
    hasReading: boolean
}

export function ChatBubble({ onClick, isOpen, hasReading }: ChatBubbleProps) {
    if (!hasReading || isOpen) return null

    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-clay-gold to-clay-amber shadow-clay-lg transition-all duration-300 hover:scale-110 hover:shadow-clay-xl active:scale-95"
            aria-label="Open AI Chat"
            title="Ask Shri Shri 1008 Devansh Maharaj Ponga Pandit"
        >
            {/* Chat icon */}
            <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>

            {/* Pulse ring */}
            <span className="absolute inset-0 animate-ping rounded-full bg-clay-gold/30" />
        </button>
    )
}
