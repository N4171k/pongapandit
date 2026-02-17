# TechStack.md — Lo Shu Grid Web App
## Next.js Full-Stack Technical Specification

**Version:** 1.0 | **Date:** February 2026
**Companion files:** PRD.md · DesignDoc.md · negativeprompt.md

---

## TABLE OF CONTENTS

1. [Stack Overview](#1-stack-overview)
2. [Project Scaffold](#2-project-scaffold)
3. [Directory Structure](#3-directory-structure)
4. [Core Dependencies](#4-core-dependencies)
5. [Next.js Configuration](#5-nextjs-configuration)
6. [Styling Setup — Tailwind CSS](#6-styling-setup--tailwind-css)
7. [Font Setup](#7-font-setup)
8. [State Management](#8-state-management)
9. [Data Layer](#9-data-layer)
10. [Component Architecture](#10-component-architecture)
11. [Page & Route Structure](#11-page--route-structure)
12. [Performance Strategy](#12-performance-strategy)
13. [Testing Strategy](#13-testing-strategy)
14. [Environment & Config](#14-environment--config)
15. [Deployment — Vercel](#15-deployment--vercel)
16. [Dev Tooling & DX](#16-dev-tooling--dx)
17. [Dependency Decision Log](#17-dependency-decision-log)
18. [LLM Implementation Instructions](#18-llm-implementation-instructions)

---

## 1. Stack Overview

```
Framework:        Next.js 14 (App Router)
Language:         TypeScript 5.x (strict mode)
Styling:          Tailwind CSS 3.x + CSS Variables
Fonts:            next/font (Google Fonts — Fraunces + Nunito)
State:            React useState / useReducer (no external library)
Computation:      Pure TypeScript — fully client-side, no server needed
Export:           html2canvas (lazy-loaded)
Animations:       CSS keyframes + Tailwind animate utilities
Testing:          Vitest + React Testing Library
Linting:          ESLint (Next.js config) + Prettier
Deployment:       Vercel (zero-config)
Package Manager:  pnpm
Node version:     20.x LTS
```

### Why Next.js?

| Reason | Detail |
|--------|--------|
| App Router | File-based routing with React Server Components where needed |
| `next/font` | Zero-CLS font loading for Fraunces + Nunito — critical for clay UI |
| `next/image` | Optimised images in export preview card |
| Metadata API | Full Open Graph + Twitter Card for the sharable result URL |
| Vercel Deploy | Zero-config CI/CD, edge caching, instant previews |
| SEO | The result page can be server-rendered for shareable deep links |
| Built-in optimisations | Automatic code splitting, tree shaking, prefetching |

---

## 2. Project Scaffold

### Create the project

```bash
pnpm create next-app@latest loshu-grid \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd loshu-grid
```

### Install all dependencies in one pass

```bash
# Core UI
pnpm add html2canvas

# Dev tools
pnpm add -D \
  prettier \
  prettier-plugin-tailwindcss \
  vitest \
  @vitest/ui \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jsdom \
  @types/node \
  @types/react \
  @types/react-dom
```

### Verify setup

```bash
pnpm dev          # → http://localhost:3000
pnpm build        # must succeed with 0 errors
pnpm type-check   # tsc --noEmit
pnpm lint         # eslint
pnpm test         # vitest run
```

---

## 3. Directory Structure

```
loshu-grid/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout — fonts, metadata, globals
│   │   ├── page.tsx                  # Home page (input screen)
│   │   ├── globals.css               # CSS variables + keyframes
│   │   ├── reading/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Shareable reading page (SSR)
│   │   └── og/
│   │       └── route.tsx             # Open Graph image generation (edge)
│   │
│   ├── components/                   # UI components
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── BackgroundBlobs.tsx
│   │   │
│   │   ├── input/
│   │   │   ├── InputSection.tsx      # Main form container
│   │   │   ├── DOBInput.tsx          # Three-field date input
│   │   │   ├── NameInput.tsx
│   │   │   └── GenerateButton.tsx
│   │   │
│   │   ├── grid/
│   │   │   ├── LoShuGrid.tsx         # 3×3 grid container
│   │   │   ├── GridCell.tsx          # Individual cell with all states
│   │   │   └── GridLegend.tsx
│   │   │
│   │   ├── results/
│   │   │   ├── ResultsSection.tsx    # Orchestrates all result blocks
│   │   │   ├── SummaryCard.tsx       # Headline + paragraph
│   │   │   ├── NumbersSection.tsx    # Present / missing / dominant
│   │   │   ├── NumberCard.tsx        # Single number summary card
│   │   │   ├── PlaneAnalysis.tsx     # 8-plane grid
│   │   │   ├── PlaneCard.tsx         # Single plane card
│   │   │   └── DeepDive.tsx          # Expandable number detail blocks
│   │   │
│   │   ├── panels/
│   │   │   └── DetailPanel.tsx       # Drawer (right desktop / bottom mobile)
│   │   │
│   │   ├── export/
│   │   │   ├── ExportSection.tsx
│   │   │   ├── ExportCard.tsx        # The div captured by html2canvas
│   │   │   └── DownloadButton.tsx
│   │   │
│   │   └── ui/                       # Primitive clay components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       └── Pill.tsx
│   │
│   ├── lib/
│   │   ├── loshu.ts                  # Pure computation engine
│   │   ├── content.ts                # All copy & interpretations
│   │   ├── types.ts                  # Shared TypeScript types
│   │   └── utils.ts                  # Helpers (cn, slug, etc.)
│   │
│   ├── hooks/
│   │   ├── useLoShuReading.ts        # Reading state + compute trigger
│   │   ├── useDetailPanel.ts         # Panel open/close state
│   │   └── useScrollReveal.ts        # IntersectionObserver hook
│   │
│   └── styles/
│       └── clay.css                  # Clay-specific classes not in Tailwind
│
├── public/
│   ├── favicon.ico
│   └── og-default.png                # Default OG image
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── vitest.config.ts
├── .env.local
├── .env.example
├── .prettierrc
├── .eslintrc.json
└── package.json
```

---

## 4. Core Dependencies

### 4.1 Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `14.x` | Framework — App Router, SSR, image optimisation |
| `react` | `18.x` | UI library |
| `react-dom` | `18.x` | DOM rendering |
| `typescript` | `5.x` | Type safety |
| `html2canvas` | `1.4.x` | PNG export of the reading card |

> **That's it.** No UI library, no state manager, no animation library, no icon pack, no form library. Keep the bundle lean.

### 4.2 Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | `3.x` | Utility CSS |
| `postcss` | `8.x` | CSS processing |
| `autoprefixer` | `10.x` | Vendor prefixes |
| `prettier` | `3.x` | Code formatting |
| `prettier-plugin-tailwindcss` | `0.5.x` | Auto-sort Tailwind classes |
| `vitest` | `1.x` | Unit test runner |
| `@vitest/ui` | `1.x` | Visual test UI |
| `@testing-library/react` | `14.x` | Component testing |
| `@testing-library/jest-dom` | `6.x` | DOM matchers |
| `@testing-library/user-event` | `14.x` | User interaction simulation |
| `jsdom` | `24.x` | DOM environment for tests |

### 4.3 What We Are NOT Installing (and why)

| Rejected Package | Why Not |
|-----------------|---------|
| `framer-motion` | Overkill — all animations are CSS keyframes; adds 40kb+ |
| `zustand` / `jotai` | Unnecessary — `useState` + `useReducer` is sufficient |
| `react-hook-form` | 3 inputs — native controlled components are fine |
| `zod` | DOB validation is simple custom logic in `lib/utils.ts` |
| `shadcn/ui` | Clay design system is custom — pre-built components fight the aesthetic |
| `@radix-ui/*` | Same as above; we need full control over clay visuals |
| `lucide-react` | Using emoji icons as specified in design doc |
| `recharts` | No charts in this app |
| `axios` | No external API calls — `fetch` is unused too |
| `date-fns` | Date parsing is trivial; no library needed for DD/MM/YYYY |
| `react-spring` | CSS spring easing handles all animation needs |
| `next-auth` | No authentication in MVP |
| `prisma` | No database in MVP |

---

## 5. Next.js Configuration

### `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for surfacing potential issues
  reactStrictMode: true,

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimisation (for export card preview)
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## 6. Styling Setup — Tailwind CSS

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body:    ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },

      // ── Colours ─────────────────────────────────────
      colors: {
        bg:      '#F5EFE6',
        bg2:     '#EDE5D8',
        surface: '#FEFCF9',
        ink:     '#1C1612',
        ink2:    '#5C4E3E',
        ink3:    '#9C8E7E',
        clay: {
          red:       '#FF6B6B',
          'red-d':   '#E85555',
          gold:      '#FFD166',
          'gold-d':  '#E8BB4E',
          mint:      '#5DD9A4',
          'mint-d':  '#47C48F',
          sky:       '#74C0FC',
          'sky-d':   '#5AAAE8',
          lilac:     '#C084FC',
          'lilac-d': '#A96EE6',
          amber:     '#FFB347',
          'amber-d': '#E89D30',
          rose:      '#F9A8D4',
          'rose-d':  '#E690BB',
          teal:      '#2DD4BF',
          'teal-d':  '#1ABFAA',
        },
      },

      // ── Border Radius ────────────────────────────────
      borderRadius: {
        sm:   '10px',
        md:   '16px',
        lg:   '24px',
        xl:   '32px',
        '2xl':'44px',
        pill: '9999px',
      },

      // ── Shadows ─────────────────────────────────────
      boxShadow: {
        'clay-xs': '0 2px 0 rgba(0,0,0,.15), 0 4px 10px rgba(0,0,0,.10), inset 0 1px 4px rgba(255,255,255,.45)',
        'clay-sm': '0 4px 0 rgba(0,0,0,.16), 0 8px 20px rgba(0,0,0,.12), inset 0 2px 6px rgba(255,255,255,.50)',
        'clay-md': '0 6px 0 rgba(0,0,0,.18), 0 14px 36px rgba(0,0,0,.14), inset 0 2px 8px rgba(255,255,255,.55)',
        'clay-lg': '0 8px 0 rgba(0,0,0,.20), 0 20px 50px rgba(0,0,0,.16), inset 0 2px 8px rgba(255,255,255,.55)',
        'clay-xl': '0 12px 0 rgba(0,0,0,.22), 0 28px 70px rgba(0,0,0,.18), inset 0 2px 10px rgba(255,255,255,.60)',
      },

      // ── Spacing extras ───────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // ── Animations ───────────────────────────────────
      keyframes: {
        popIn: {
          '0%':   { opacity: '0', transform: 'scale(0.65)' },
          '60%':  { transform: 'scale(1.06)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%':   { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        clayPulse: {
          '0%, 100%': { boxShadow: '0 6px 0 rgba(0,0,0,.18), 0 14px 36px rgba(0,0,0,.14)' },
          '50%':       { boxShadow: '0 6px 0 rgba(0,0,0,.18), 0 28px 60px rgba(0,0,0,.22)' },
        },
        blobDrift: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(35px, 45px) scale(1.08)' },
        },
      },
      animation: {
        'pop-in':      'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'fade-up':     'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'slide-right': 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'slide-up':    'slideInUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'clay-pulse':  'clayPulse 2.5s ease-in-out infinite',
        'blob-drift':  'blobDrift 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

export default config
```

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Variables (Design Tokens) ─────────────── */
:root {
  --bg:          #F5EFE6;
  --bg2:         #EDE5D8;
  --surface:     #FEFCF9;
  --ink:         #1C1612;
  --ink2:        #5C4E3E;
  --ink3:        #9C8E7E;

  --red:         #FF6B6B;
  --red-d:       #E85555;
  --gold:        #FFD166;
  --gold-d:      #E8BB4E;
  --mint:        #5DD9A4;
  --mint-d:      #47C48F;
  --sky:         #74C0FC;
  --sky-d:       #5AAAE8;
  --lilac:       #C084FC;
  --lilac-d:     #A96EE6;
  --amber:       #FFB347;
  --amber-d:     #E89D30;
  --rose:        #F9A8D4;
  --rose-d:      #E690BB;
  --teal:        #2DD4BF;
  --teal-d:      #1ABFAA;

  /* Number → Colour mapping */
  --n1: var(--sky);    --n1-d: var(--sky-d);
  --n2: var(--rose);   --n2-d: var(--rose-d);
  --n3: var(--amber);  --n3-d: var(--amber-d);
  --n4: var(--teal);   --n4-d: var(--teal-d);
  --n5: var(--gold);   --n5-d: var(--gold-d);
  --n6: var(--mint);   --n6-d: var(--mint-d);
  --n7: var(--lilac);  --n7-d: var(--lilac-d);
  --n8: var(--red);    --n8-d: var(--red-d);
  --n9: var(--rose);   --n9-d: var(--rose-d);

  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Base ──────────────────────────────────────── */
html { scroll-behavior: smooth; }

body {
  background-color: var(--bg);
  color: var(--ink);
  font-family: var(--font-nunito), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* ── Scroll Reveal ─────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Reduced Motion ────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}

/* ── Clay Card Base ────────────────────────────── */
.clay-card {
  background: var(--surface);
  border-radius: 32px;
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 6px 0 rgba(0,0,0,.18), 0 14px 36px rgba(0,0,0,.14),
              inset 0 2px 8px rgba(255,255,255,.55);
  position: relative;
  overflow: hidden;
}
.clay-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.45) 0%, transparent 55%);
  pointer-events: none;
  border-radius: inherit;
}

/* ── Number Spin Arrows — Hide ─────────────────── */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
input[type='number'] { -moz-appearance: textfield; }
```

---

## 7. Font Setup

### `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  style: ['normal'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Lo Shu Grid — Your numbers. Your nature.',
  description: 'Discover your personal Lo Shu Grid numerology reading from your date of birth. A traditional Chinese self-reflection tool.',
  keywords: ['lo shu grid', 'numerology', 'chinese numerology', 'date of birth reading', 'self reflection'],
  openGraph: {
    title: 'Lo Shu Grid — Your numbers. Your nature.',
    description: 'Discover your personal Lo Shu Grid reading.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lo Shu Grid — Your numbers. Your nature.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## 8. State Management

### Philosophy

No external state library. The app has two phases — **input** and **results** — controlled by a single top-level state object. Everything flows down as props.

### `src/hooks/useLoShuReading.ts`

```typescript
'use client'

import { useState, useCallback } from 'react'
import { computeLoShuReading } from '@/lib/loshu'
import type { DOBInput, LoShuReading } from '@/lib/types'

type AppState =
  | { phase: 'input' }
  | { phase: 'loading' }   // 400ms artificial delay for UX
  | { phase: 'results'; reading: LoShuReading }

export function useLoShuReading() {
  const [state, setState] = useState<AppState>({ phase: 'input' })
  const [selectedCell, setSelectedCell] = useState<number | null>(null)

  const generate = useCallback((input: DOBInput) => {
    setState({ phase: 'loading' })

    // 400ms delay makes results feel "thoughtful" not instant
    setTimeout(() => {
      const reading = computeLoShuReading(input)
      setState({ phase: 'results', reading })
    }, 400)
  }, [])

  const reset = useCallback(() => {
    setState({ phase: 'input' })
    setSelectedCell(null)
  }, [])

  return { state, generate, reset, selectedCell, setSelectedCell }
}
```

### State Shape at a Glance

```
App
└── useLoShuReading()
    ├── state: AppState          → drives phase transitions
    ├── generate(input)          → triggers computation
    ├── reset()                  → returns to input
    ├── selectedCell: number|null → drives detail panel
    └── setSelectedCell()         → called by GridCell clicks
```

---

## 9. Data Layer

### `src/lib/types.ts`

```typescript
// ── Input ─────────────────────────────────────────
export interface DOBInput {
  day:   number       // 1–31
  month: number       // 1–12
  year:  number       // 1900–current year
  name?: string       // optional personalisation
}

// ── Computation Output ─────────────────────────────
export type IntensityLevel =
  | 'missing'
  | 'active'
  | 'strong'
  | 'dominant'
  | 'overwhelming'

export interface GridPosition {
  row: number   // 0 | 1 | 2
  col: number   // 0 | 1 | 2
}

export interface DigitAnalysis {
  digit:     number
  count:     number
  intensity: IntensityLevel
  isPresent: boolean
  isMissing: boolean
  position:  GridPosition
}

export interface PlaneResult {
  id:               string
  name:             string
  numbers:          number[]
  presentNumbers:   number[]
  missingNumbers:   number[]
  isComplete:       boolean
  completionRatio:  number     // 0 | 0.33 | 0.67 | 1
  planeType:        'horizontal' | 'vertical' | 'diagonal'
  arrowName?:       string     // only if isComplete
  interpretation:   string
}

export interface LoShuReading {
  input:            DOBInput
  rawDigits:        number[]
  digitMap:         Record<number, DigitAnalysis>
  grid:             number[][]       // GRID_LAYOUT constant — always [4,9,2],[3,5,7],[8,1,6]
  planes:           PlaneResult[]
  missingNumbers:   number[]
  presentNumbers:   number[]
  dominantNumbers:  number[]         // count >= 2
  arrows:           string[]         // arrow names for complete planes
  summaryHeadline:  string
  summaryParagraph: string
  slug:             string           // URL-safe identifier for shareable link
}

// ── Validation ─────────────────────────────────────
export interface ValidationResult {
  isValid: boolean
  errors: {
    day?:   string
    month?: string
    year?:  string
  }
}
```

### `src/lib/loshu.ts` — skeleton

```typescript
import type { DOBInput, LoShuReading, DigitAnalysis, IntensityLevel } from './types'
import { getNumberContent, buildSummary } from './content'

// ── Constants ───────────────────────────────────────
export const GRID_LAYOUT: number[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
]

export const NUMBER_POSITION: Record<number, { row: number; col: number }> = {
  4: { row: 0, col: 0 }, 9: { row: 0, col: 1 }, 2: { row: 0, col: 2 },
  3: { row: 1, col: 0 }, 5: { row: 1, col: 1 }, 7: { row: 1, col: 2 },
  8: { row: 2, col: 0 }, 1: { row: 2, col: 1 }, 6: { row: 2, col: 2 },
}

export const PLANES = [
  { id: 'mental',      name: 'Mental Plane',      numbers: [4,9,2], planeType: 'horizontal', arrowName: 'Arrow of the Intellect' },
  { id: 'emotional',   name: 'Emotional Plane',   numbers: [3,5,7], planeType: 'horizontal', arrowName: 'Arrow of the Spiritual' },
  { id: 'physical',    name: 'Physical Plane',    numbers: [8,1,6], planeType: 'horizontal', arrowName: 'Arrow of the Planner' },
  { id: 'thought',     name: 'Thought Plane',     numbers: [4,3,8], planeType: 'vertical',   arrowName: 'Arrow of Practicality' },
  { id: 'will',        name: 'Will Plane',        numbers: [9,5,1], planeType: 'vertical',   arrowName: 'Arrow of Determination' },
  { id: 'sensitivity', name: 'Sensitivity Plane', numbers: [2,7,6], planeType: 'vertical',   arrowName: 'Arrow of Compassion' },
  { id: 'stability',   name: 'Stability Plane',   numbers: [4,5,6], planeType: 'diagonal',   arrowName: 'Arrow of Balance' },
  { id: 'success',     name: 'Success Plane',     numbers: [2,5,8], planeType: 'diagonal',   arrowName: 'Arrow of Prosperity' },
] as const

// ── Main Export ─────────────────────────────────────
export function computeLoShuReading(input: DOBInput): LoShuReading {
  // Step 1: Extract digits — day and month as raw ints, year as 4-digit string
  const digitString = `${input.day}${input.month}${input.year}`
  const rawDigits = digitString
    .split('')
    .filter(ch => ch !== '0')
    .map(Number)

  // Step 2: Frequency map
  const freqMap: Record<number, number> = {}
  for (let n = 1; n <= 9; n++) freqMap[n] = 0
  for (const d of rawDigits) freqMap[d]++

  // Step 3: Classify each digit
  const digitMap: Record<number, DigitAnalysis> = {}
  for (let n = 1; n <= 9; n++) {
    const count = freqMap[n]
    digitMap[n] = {
      digit:     n,
      count,
      intensity: getIntensity(count),
      isPresent: count > 0,
      isMissing: count === 0,
      position:  NUMBER_POSITION[n],
    }
  }

  // Step 4: Plane analysis
  const planes = PLANES.map(plane => {
    const presentNumbers = plane.numbers.filter(n => digitMap[n].isPresent)
    const missingNumbers = plane.numbers.filter(n => digitMap[n].isMissing)
    const isComplete     = presentNumbers.length === 3
    return {
      ...plane,
      presentNumbers,
      missingNumbers,
      isComplete,
      completionRatio: presentNumbers.length / 3,
      arrowName: isComplete ? plane.arrowName : undefined,
      interpretation: getPlaneInterpretation(plane.id, presentNumbers.length),
    }
  })

  // Step 5: Derived lists
  const missingNumbers  = Object.values(digitMap).filter(d => d.isMissing).map(d => d.digit)
  const presentNumbers  = Object.values(digitMap).filter(d => d.isPresent).map(d => d.digit)
  const dominantNumbers = Object.values(digitMap).filter(d => d.count >= 2).map(d => d.digit)
  const arrows          = planes.filter(p => p.isComplete).map(p => p.arrowName!)

  // Step 6: Summary
  const { headline, paragraph } = buildSummary({ digitMap, planes, dominantNumbers, missingNumbers, input })

  return {
    input,
    rawDigits,
    digitMap,
    grid: GRID_LAYOUT,
    planes,
    missingNumbers,
    presentNumbers,
    dominantNumbers,
    arrows,
    summaryHeadline:  headline,
    summaryParagraph: paragraph,
    slug: buildSlug(input),
  }
}

// ── Helpers ─────────────────────────────────────────
function getIntensity(count: number): IntensityLevel {
  if (count === 0) return 'missing'
  if (count === 1) return 'active'
  if (count === 2) return 'strong'
  if (count === 3) return 'dominant'
  return 'overwhelming'
}

function getPlaneInterpretation(planeId: string, presentCount: number): string {
  // Delegate to content.ts — full copy lives there
  return '' // implemented in content.ts
}

function buildSlug(input: DOBInput): string {
  const name = input.name?.toLowerCase().replace(/\s+/g, '-') ?? 'reading'
  return `${name}-${input.day}-${input.month}-${input.year}`
}
```

### `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ValidationResult, DOBInput } from './types'

// Tailwind class merging utility
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// DOB validation
export function validateDOB(day: number, month: number, year: number): ValidationResult {
  const errors: ValidationResult['errors'] = {}
  const currentYear = new Date().getFullYear()

  if (!day || day < 1 || day > 31)           errors.day   = 'Enter a valid day (1–31)'
  if (!month || month < 1 || month > 12)     errors.month = 'Enter a valid month (1–12)'
  if (!year || year < 1900 || year > currentYear) errors.year = `Enter a year between 1900 and ${currentYear}`

  if (!errors.day && !errors.month && !errors.year) {
    // Check days in month
    const maxDays = new Date(year, month, 0).getDate()
    if (day > maxDays) errors.day = `${getMonthName(month)} ${year} only has ${maxDays} days`

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
export const NUMBER_COLOURS: Record<number, { bg: string; shadow: string; label: string }> = {
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
```

> **Note:** `clsx` and `tailwind-merge` are the only two small utilities worth adding — they make conditional Tailwind class composition clean. Install with: `pnpm add clsx tailwind-merge`

---

## 10. Component Architecture

### Rendering Strategy

| Component | Rendering | Reason |
|-----------|-----------|--------|
| `layout.tsx` | Server Component | Static shell, font loading |
| `page.tsx` | Server Component (shell) | SEO metadata; inner logic is client |
| `InputSection` | Client Component | Form state |
| `LoShuGrid` | Client Component | Interactivity, animation |
| `GridCell` | Client Component | Click handlers |
| `ResultsSection` | Client Component | All results are client-driven |
| `DetailPanel` | Client Component | Stateful overlay |
| `PlaneAnalysis` | Client Component | Reads from reading state |
| `ExportSection` | Client Component | html2canvas must run client-side |
| `Nav` | Server Component | Static links |
| `BackgroundBlobs` | Client Component | CSS animations |

### `'use client'` Boundary

Only mark components as Client Components if they:
1. Use `useState`, `useEffect`, `useReducer`, or custom hooks
2. Use browser-only APIs (`document`, `window`, `html2canvas`)
3. Have event handlers (`onClick`, `onChange`, `onFocus`)

Everything else is a Server Component by default.

---

## 11. Page & Route Structure

### Routes

```
/                           → Home page (input form)
/reading/[slug]             → Shareable reading page (SSR)
/og                         → OG image generation (Edge Route Handler)
```

### `src/app/page.tsx`

```typescript
import { BackgroundBlobs } from '@/components/layout/BackgroundBlobs'
import { Nav } from '@/components/layout/Nav'
import { AppShell } from '@/components/AppShell'  // 'use client' boundary
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <BackgroundBlobs />
      <Nav />
      <main className="relative z-10 max-w-[1120px] mx-auto px-7 pb-36">
        <AppShell />
      </main>
      <Footer />
    </>
  )
}
```

### `src/app/reading/[slug]/page.tsx` — Shareable Deep Link

```typescript
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Decode name from slug for personalised OG title
  const namePart = params.slug.split('-').slice(0, -3).join(' ')
  const name = namePart ? `${namePart}'s` : 'Your'

  return {
    title: `${name} Lo Shu Grid Reading`,
    description: `Explore ${name} personal numerology reading based on the ancient Lo Shu Grid.`,
    openGraph: {
      title: `${name} Lo Shu Grid Reading`,
      images: [`/og?slug=${params.slug}`],
    },
  }
}

export default function ReadingPage({ params }: Props) {
  // The slug encodes DOB — decode and render the reading server-side
  // Reading is then hydrated client-side for interactivity
  return <div data-slug={params.slug} id="reading-hydration-target" />
}
```

---

## 12. Performance Strategy

### Bundle Budget

```
Target first load JS:  < 80kb gzipped
Current estimate:
  Next.js runtime:     ~45kb
  React:               ~10kb
  App code:            ~20kb
  html2canvas (lazy):  ~80kb — loaded only on export click
  Total initial load:  ~75kb ✅
```

### Optimisation Checklist

```
✅ html2canvas lazy-loaded with dynamic import:
   const html2canvas = (await import('html2canvas')).default

✅ Fraunces + Nunito loaded via next/font (no FOUT, no external request)

✅ Background blobs: pure CSS + divs — no canvas, no JS animation loop

✅ Grid computation: pure function, runs in < 2ms, no memoisation needed

✅ Images: none in MVP core — only in export card (CSS text-based)

✅ Code splitting: automatic via App Router — each route is its own chunk

✅ Tailwind CSS: purged in production — only used classes shipped

✅ No useEffect for data fetching — zero async operations in core flow

✅ Scroll reveal: IntersectionObserver (passive), no scroll event listener
```

---

## 13. Testing Strategy

### `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

### `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom'
```

### Test Plan

#### Unit Tests — `lib/loshu.ts` (highest priority)

```typescript
// src/lib/__tests__/loshu.test.ts

describe('computeLoShuReading', () => {
  it('extracts digits correctly — ignores zeros', () => {
    // DOB 10/10/2000 → digits [1,1,1,2] (zeros removed)
  })

  it('counts digit frequency correctly', () => {
    // DOB 17/08/1995 → {1:2, 5:2, 7:1, 8:1, 9:2}
  })

  it('classifies intensity correctly', () => {
    // count=0 → missing, 1 → active, 2 → strong, 3 → dominant, 4+ → overwhelming
  })

  it('identifies complete planes correctly', () => {
    // All 3 numbers present → isComplete: true
  })

  it('identifies missing planes correctly', () => {
    // 0 of 3 present → isComplete: false, completionRatio: 0
  })

  it('detects Arrow of Determination (9-5-1)', () => {
    // DOB where 9, 5, 1 all appear
  })

  it('handles DOB with all zeros in day/month (e.g., 01/01/2000)', () => {
    // day=1, month=1, year=2000 → digit string "112000" → [1,1,2]
  })

  it('handles extreme repetition (4+ same digit)', () => {
    // e.g., 11/11/2011 → digit string "11112011" → [1,1,1,1,2,1,1] → 1 count=6
  })
})
```

#### Unit Tests — `lib/utils.ts`

```typescript
describe('validateDOB', () => {
  it('rejects day 0 and day 32')
  it('rejects month 0 and month 13')
  it('rejects year before 1900')
  it('rejects future dates')
  it('rejects Feb 30 in any year')
  it('rejects Feb 29 in a non-leap year')
  it('accepts Feb 29 in a leap year')
  it('returns isValid: true for valid DOB')
})
```

#### Component Tests — GridCell

```typescript
describe('GridCell', () => {
  it('renders the number correctly')
  it('applies missing styles when intensity is missing')
  it('applies dominant styles when count >= 2')
  it('calls onClick with the digit when clicked')
  it('renders correct number of dots for count')
  it('caps dots at 4 and shows "4+" for count > 4')
})
```

### Run Tests

```bash
pnpm test           # run once
pnpm test:watch     # watch mode
pnpm test:ui        # visual UI at localhost:51204
pnpm test:coverage  # coverage report
```

---

## 14. Environment & Config

### `.env.example`

```bash
# No required environment variables for MVP core functionality.
# All computation is client-side.

# Optional: analytics (add only if needed post-MVP)
# NEXT_PUBLIC_POSTHOG_KEY=
# NEXT_PUBLIC_POSTHOG_HOST=

# Optional: if shareable links are implemented
# NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### `.env.local`

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Privacy note:** No date of birth data is ever sent to a server. All computation happens in the browser. Do not add any analytics that capture the DOB input field.

---

## 15. Deployment — Vercel

### Zero-Config Deploy

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy from project root
vercel

# Production deploy
vercel --prod
```

### `vercel.json` (optional — for custom headers)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

### Vercel Project Settings

```
Framework Preset:    Next.js (auto-detected)
Build Command:       pnpm build
Output Directory:    .next
Install Command:     pnpm install
Node.js Version:     20.x
Root Directory:      ./  (or monorepo subfolder)
```

### Domain Setup

```
Production:          loshu-grid.app (or your domain)
Preview:             auto-generated per PR (e.g., loshu-grid-git-feature-xyz.vercel.app)
```

---

## 16. Dev Tooling & DX

### `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### `tsconfig.json` — strict mode

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `package.json` — scripts

```json
{
  "scripts": {
    "dev":         "next dev",
    "build":       "next build",
    "start":       "next start",
    "lint":        "next lint",
    "type-check":  "tsc --noEmit",
    "format":      "prettier --write .",
    "test":        "vitest run",
    "test:watch":  "vitest",
    "test:ui":     "vitest --ui",
    "test:coverage":"vitest run --coverage"
  }
}
```

---

## 17. Dependency Decision Log

| Decision | Choice | Alternatives Considered | Reason |
|----------|--------|------------------------|--------|
| Framework | Next.js 14 App Router | Vite + React, Remix, Astro | SSR for shareable links, `next/font`, Vercel DX |
| Styling | Tailwind CSS | CSS Modules, styled-components, Emotion | Fastest clay utility composition; design doc maps directly to Tailwind classes |
| Fonts | `next/font` | Google Fonts CDN link, self-hosted | Zero CLS, automatic font optimisation, no external request at runtime |
| State | useState / useReducer | Zustand, Jotai, Redux | App has 2 phases and ~4 state values — no library justified |
| Animation | CSS keyframes + Tailwind | Framer Motion, React Spring | All animations are entrance/hover — no complex orchestration needed |
| Export | html2canvas | Puppeteer (server), dom-to-image | Client-side, no server cost, sufficient quality at scale:2 |
| Forms | Native controlled inputs | React Hook Form, Formik | 3 inputs — no library overhead justified |
| Validation | Custom (`lib/utils.ts`) | Zod, Yup, Valibot | DOB logic is ~30 lines — no schema library needed |
| Icons | Emoji | Lucide, Heroicons, Phosphor | Design doc specifies emoji; culturally appropriate; zero bundle cost |
| Testing | Vitest + RTL | Jest, Playwright | Faster than Jest, native ESM, same API; E2E not needed for MVP |
| Package manager | pnpm | npm, yarn, bun | Fastest installs, strict dependency resolution, disk efficient |
| Deployment | Vercel | Netlify, Railway, Fly.io | Native Next.js platform, preview URLs, zero config |

---

## 18. LLM Implementation Instructions

### Read This Before Writing Code

1. This is **Next.js 14 App Router** — not Pages Router. Never use `pages/` directory, `getServerSideProps`, `getStaticProps`, or `_app.tsx`.

2. The `src/` directory is the root. All imports use `@/` alias (e.g., `@/lib/loshu`).

3. Client Components need `'use client'` at the top. Server Components do not need `'use server'` — they are server by default.

4. **Do not add `'use client'` to layout.tsx or page.tsx** unless you directly use hooks in them. Use a client wrapper component instead.

5. The computation in `lib/loshu.ts` is a **pure function** — no React imports, no hooks, no side effects. It must be testable with plain Vitest.

6. All copy (interpretations, summaries, labels) lives in `lib/content.ts`. Components never contain hardcoded numerology text.

7. The `NUMBER_COLOURS` map in `lib/utils.ts` is the single source of truth for number→colour mapping. Never hardcode colours in components.

8. **html2canvas must be lazy-loaded**: `const html2canvas = (await import('html2canvas')).default` inside the click handler — never at the top of the file.

9. Background blobs are `position: fixed`, `z-index: 0`, `pointer-events: none`. All content is `position: relative`, `z-index: 1` or higher.

10. The sticky nav uses `backdrop-filter: blur(18px)` — this requires `-webkit-backdrop-filter` too for Safari support.

### Boot Sequence for LLM

```
Step 1:  pnpm create next-app (scaffold)
Step 2:  Install dependencies (pnpm add html2canvas clsx tailwind-merge)
Step 3:  Copy tailwind.config.ts from Section 6
Step 4:  Copy globals.css from Section 6
Step 5:  Set up layout.tsx with Fraunces + Nunito from Section 7
Step 6:  Write src/lib/types.ts (Section 9)
Step 7:  Write src/lib/loshu.ts (Section 9 + PRD Section 6)
Step 8:  Write src/lib/content.ts (PRD Section 7 — all copy)
Step 9:  Write src/lib/utils.ts (Section 9)
Step 10: Write src/hooks/useLoShuReading.ts (Section 8)
Step 11: Build ui/ primitives: Button, Input, Badge, Card (Section 8 components)
Step 12: Build GridCell.tsx (most complex visual component)
Step 13: Build LoShuGrid.tsx (Section 8.4)
Step 14: Build InputSection.tsx + DOBInput.tsx
Step 15: Build ResultsSection.tsx shell
Step 16: Build PlaneAnalysis.tsx + PlaneCard.tsx
Step 17: Build NumbersSection.tsx + NumberCard.tsx
Step 18: Build SummaryCard.tsx
Step 19: Build DetailPanel.tsx (drawer)
Step 20: Build ExportSection.tsx + DownloadButton.tsx
Step 21: Wire AppShell.tsx (client boundary)
Step 22: Wire page.tsx (server shell)
Step 23: Add BackgroundBlobs.tsx
Step 24: Add useScrollReveal.ts + apply to sections
Step 25: Test: pnpm build && pnpm test
```

---

*End of TechStack.md — Lo Shu Grid Web App · Next.js 14 · v1.0*