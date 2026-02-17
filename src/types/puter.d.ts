/* eslint-disable @typescript-eslint/no-explicit-any */

interface PuterAIChatMessage {
    role: 'system' | 'user' | 'assistant' | 'tool'
    content: string
    tool_calls?: PuterToolCall[]
    tool_call_id?: string
}

interface PuterToolCall {
    id: string
    type: 'function'
    function: {
        name: string
        arguments: string
    }
}

interface PuterChatResponse {
    message: PuterAIChatMessage & { tool_calls?: PuterToolCall[] }
    toString(): string
}

interface PuterChatStreamChunk {
    text: string
}

interface PuterAI {
    chat(
        promptOrMessages: string | PuterAIChatMessage[],
        options?: {
            model?: string
            stream?: boolean
            tools?: any[]
            max_tokens?: number
            temperature?: number
        }
    ): Promise<PuterChatResponse | AsyncIterable<PuterChatStreamChunk>>
}

interface Puter {
    ai: PuterAI
    print(text: string): void
}

declare const puter: Puter
