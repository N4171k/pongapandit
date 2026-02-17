'use client'

export function BackgroundBlobs() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            aria-hidden="true"
        >
            {/* Top-left warm blob */}
            <div
                className="animate-blob-drift absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30"
                style={{
                    background:
                        'radial-gradient(circle, rgba(255,209,102,0.5) 0%, rgba(255,107,107,0.2) 50%, transparent 70%)',
                }}
            />
            {/* Top-right cool blob */}
            <div
                className="animate-blob-drift absolute -right-24 top-20 h-[400px] w-[400px] rounded-full opacity-25"
                style={{
                    background:
                        'radial-gradient(circle, rgba(116,192,252,0.4) 0%, rgba(192,132,252,0.2) 50%, transparent 70%)',
                    animationDelay: '-7s',
                    animationDirection: 'alternate-reverse',
                }}
            />
            {/* Bottom-left mint blob */}
            <div
                className="animate-blob-drift absolute -left-20 bottom-40 h-[350px] w-[350px] rounded-full opacity-20"
                style={{
                    background:
                        'radial-gradient(circle, rgba(93,217,164,0.4) 0%, rgba(45,212,191,0.2) 50%, transparent 70%)',
                    animationDelay: '-14s',
                }}
            />
            {/* Bottom-right rose blob */}
            <div
                className="animate-blob-drift absolute -bottom-20 right-20 h-[450px] w-[450px] rounded-full opacity-20"
                style={{
                    background:
                        'radial-gradient(circle, rgba(249,168,212,0.4) 0%, rgba(255,179,71,0.2) 50%, transparent 70%)',
                    animationDelay: '-10s',
                    animationDirection: 'alternate-reverse',
                }}
            />
        </div>
    )
}
