# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Lo Shu Grid Numerology Web Application
**Version:** 1.0  
**Date:** February 2026  
**Status:** Ready for LLM Implementation  
**Audience:** AI Coding Assistant / LLM Developer  

---

## INSTRUCTIONS FOR LLM

You are building a **Lo Shu Grid Numerology Web Application**. This PRD is your single source of truth. Read every section before writing any code. The document is structured as follows:

1. Product Overview & Goals
2. Core Domain Knowledge (numerology logic — memorize this)
3. Feature Requirements (what to build)
4. Data Models (how to structure data)
5. UI/UX Specifications (how it should look)
6. Algorithm Specification (exact computation logic)
7. Component Breakdown (React component tree)
8. Edge Cases & Validation Rules
9. Tone & Copy Guidelines
10. Non-Functional Requirements

Do NOT skip any section. The domain knowledge in Section 2 is essential to implement the algorithm correctly.

---

## SECTION 1 — PRODUCT OVERVIEW

### 1.1 What We Are Building

A **single-page web application** that:
- Accepts a user's date of birth (DD/MM/YYYY)
- Computes their personal Lo Shu Grid
- Renders a beautiful, interactive 3×3 grid with their digits placed inside
- Generates a full personality reading with: number meanings, plane analysis, missing number lessons, and a summary
- Allows the user to share or download their reading as an image

### 1.2 Tech Stack

```
Frontend:     React 18 + Vite
Styling:      Tailwind CSS (utility classes only — no arbitrary values unless necessary)
Language:     TypeScript
State:        React useState / useReducer (no external state library needed)
Export:       html2canvas for image download
Routing:      None — single page
Testing:      Not required for MVP
```

### 1.3 Deliverables

- `App.tsx` — root component
- `components/` — all UI components
- `lib/loshu.ts` — pure computation engine (no React, no side effects)
- `lib/content.ts` — all copy, interpretations, and labels
- `styles/` — Tailwind config if customizations needed
- The app must run with `npm run dev` immediately after install

---

## SECTION 2 — CORE DOMAIN KNOWLEDGE

> **Critical:** This section defines all the numerology rules. The algorithm in Section 6 depends entirely on this. Read carefully.

### 2.1 The Lo Shu Grid Layout

The Lo Shu Grid is a fixed 3×3 magic square. The NUMBER POSITIONS are always the same regardless of the user's date of birth. Only whether a position is *occupied* changes.

```
┌─────┬─────┬─────┐
│  4  │  9  │  2  │   ← Row 1: Mental Plane
├─────┼─────┼─────┤
│  3  │  5  │  7  │   ← Row 2: Emotional Plane
├─────┼─────┼─────┤
│  8  │  1  │  6  │   ← Row 3: Physical / Material Plane
└─────┴─────┴─────┘
  Col1  Col2  Col3
  Plan  Will  Sens
```

The grid cells correspond to fixed positions:
```
Position map (row, col) → number:
(0,0)=4   (0,1)=9   (0,2)=2
(1,0)=3   (1,1)=5   (1,2)=7
(2,0)=8   (2,1)=1   (2,2)=6
```

### 2.2 Number Meanings (1–9)

| Number | Core Trait | Positive Expression | Excessive Expression | Life Lesson When Missing |
|--------|-----------|---------------------|----------------------|--------------------------|
| 1 | Leadership, Independence | Confident, self-reliant, pioneering | Domineering, stubborn, egotistical | Develop self-confidence; learn to stand alone |
| 2 | Sensitivity, Cooperation | Empathetic, diplomatic, supportive | Over-sensitive, people-pleasing, indecisive | Build emotional boundaries; learn to say no |
| 3 | Creativity, Expression | Articulate, imaginative, joyful | Scattered, exaggerating, shallow | Develop communication and creative confidence |
| 4 | Practicality, Discipline | Organized, hardworking, reliable | Rigid, obsessive, inflexible | Learn structure and follow-through |
| 5 | Balance, Freedom, Change | Adaptable, versatile, adventurous | Restless, impulsive, irresponsible | Embrace change; find inner balance |
| 6 | Responsibility, Family, Care | Nurturing, responsible, loving | Controlling, self-sacrificing, anxious | Learn to give and receive love freely |
| 7 | Wisdom, Spirituality, Analysis | Thoughtful, spiritual, perceptive | Isolated, critical, overthinking | Develop faith and inner awareness |
| 8 | Power, Success, Money | Ambitious, resilient, capable | Materialistic, power-hungry, ruthless | Build financial discipline and perseverance |
| 9 | Compassion, Humanitarian | Generous, idealistic, wise | Martyrdom, emotional burnout | Develop empathy; serve without losing self |

### 2.3 Repetition Intensity Levels

When a digit from the DOB appears multiple times, its energy is **amplified**.

| Count | Level | Label | Interpretation prefix |
|-------|-------|-------|----------------------|
| 0 | Missing | "Absent" | "This number is absent from your chart, indicating a life lesson..." |
| 1 | Present | "Active" | "This energy is active in your chart..." |
| 2 | Strong | "Strong" | "This energy appears twice, making it a defining trait..." |
| 3 | Dominant | "Dominant" | "This energy appears three times, creating a very powerful influence..." |
| 4+ | Overwhelming | "Overwhelming" | "This energy is overwhelmingly present and may need conscious balancing..." |

### 2.4 Plane Definitions

Planes are the rows, columns, and diagonals of the grid. A plane is **"Complete"** only if ALL THREE of its numbers appear at least once in the user's DOB digits (after zero removal).

#### Horizontal Planes (Rows)
```
Mental Plane:    4 - 9 - 2   (thinking, intellect, strategy)
Emotional Plane: 3 - 5 - 7   (feeling, intuition, spirit)
Physical Plane:  8 - 1 - 6   (body, material world, action)
```

#### Vertical Planes (Columns)
```
Thought Plane:       4 - 3 - 8   (planning, practicality, execution)
Will Plane:          9 - 5 - 1   (determination, willpower, ambition)
Sensitivity Plane:   2 - 7 - 6   (sensitivity, relationships, care)
```

#### Diagonal Planes
```
Stability Plane: 4 - 5 - 6   (balance, responsibility, groundedness)
Success Plane:   2 - 5 - 8   (ambition, drive, material achievement)
```

#### Plane Complete Interpretations

| Plane | Name | Complete Interpretation |
|-------|------|------------------------|
| 4-9-2 | Mental | Exceptionally strong thinker; analytical, strategic, and intellectually driven |
| 3-5-7 | Emotional | Deep emotional intelligence; highly intuitive and spiritually aware |
| 8-1-6 | Physical | Strong material instinct; action-oriented with physical resilience |
| 4-3-8 | Thought | Excellent planner; turns ideas into practical outcomes |
| 9-5-1 | Will | Unstoppable determination; overcomes obstacles through sheer willpower |
| 2-7-6 | Sensitivity | Naturally empathetic; thrives in relationships and caregiving roles |
| 4-5-6 | Stability | Grounded and responsible; others rely on you for stability |
| 2-5-8 | Success | Driven toward achievement; natural ability to attract success |

#### Plane Incomplete Interpretations

When a plane has 1 or 2 of its 3 numbers present, describe it as "developing":
- 1 of 3 present: "This area is just beginning to develop in your life."
- 2 of 3 present: "This area is growing stronger; one more element is needed to complete it."
- 0 of 3: "This area represents a significant growth opportunity for you."

### 2.5 Arrow Formations (Special Patterns)

Certain complete planes carry special names called "Arrows of Pythagoras":

| Plane | Arrow Name | Special Meaning |
|-------|-----------|-----------------|
| 4-9-2 | Arrow of the Intellect | Exceptional mental power |
| 3-5-7 | Arrow of the Spiritual | Strong spiritual connection |
| 8-1-6 | Arrow of the Planner | Excellent practical planning |
| 4-3-8 | Arrow of Practicality | Highly organized achiever |
| 9-5-1 | Arrow of Determination | Never gives up |
| 2-7-6 | Arrow of Compassion | Natural healer or counsellor |
| 4-5-6 | Arrow of Balance | Emotionally stable anchor |
| 2-5-8 | Arrow of Prosperity | Naturally draws wealth |

---

## SECTION 3 — FEATURE REQUIREMENTS

### 3.1 Feature List (MVP)

| ID | Feature | Priority | Notes |
|----|---------|----------|-------|
| F-01 | Date of birth input form | P0 | DD/MM/YYYY with validation |
| F-02 | Lo Shu Grid renderer | P0 | 3×3 grid with user digits placed in cells |
| F-03 | Number detail panel | P0 | Tap/click any cell → show full interpretation |
| F-04 | Plane analysis section | P0 | Show all 8 planes, complete/incomplete status |
| F-05 | Missing numbers section | P0 | List missing numbers with life lesson copy |
| F-06 | Strong/dominant numbers section | P0 | Highlight repeated numbers and meaning |
| F-07 | Personality summary card | P0 | AI-style narrative summary paragraph |
| F-08 | Download as image | P1 | Export grid + summary as PNG |
| F-09 | Reset / new reading | P0 | Clear form and start over |
| F-10 | Disclaimer banner | P0 | "For self-reflection only, not scientific" |

### 3.2 User Flow

```
[Landing Screen]
  → User sees headline + DOB input form
  → User enters DD/MM/YYYY
  → Clicks "Generate My Grid"

[Validation]
  → If invalid: show inline error, do not proceed
  → If valid: compute grid, animate to results

[Results Screen]
  → Animated grid appears (cells populate one by one, 80ms stagger)
  → Summary headline fades in
  → User scrolls down through:
      1. Grid (interactive — click cells)
      2. Your Numbers section (present + missing)
      3. Plane Analysis
      4. Personality Summary
      5. Download / Share buttons

[Cell Detail]
  → User clicks any cell on grid
  → Side panel or modal slides in with:
      - Number, core trait
      - Count in DOB ("appears X times")
      - Intensity level
      - Full interpretation paragraph

[Download]
  → Captures grid + summary card as PNG
  → Filename: loshu-[name-or-dob].png
```

---

## SECTION 4 — DATA MODELS

### 4.1 TypeScript Types

```typescript
// Input
interface DOBInput {
  day: number;      // 1–31
  month: number;    // 1–12
  year: number;     // 1900–2099
  name?: string;    // optional, for personalisation
}

// Computed digit data
interface DigitAnalysis {
  digit: number;          // 1–9
  count: number;          // how many times it appears in DOB digits
  intensity: IntensityLevel;
  isPresent: boolean;
  isMissing: boolean;
  position: GridPosition; // row/col in the 3x3 grid
}

type IntensityLevel = 'missing' | 'active' | 'strong' | 'dominant' | 'overwhelming';

interface GridPosition {
  row: number;  // 0, 1, or 2
  col: number;  // 0, 1, or 2
}

// Plane result
interface PlaneResult {
  id: string;           // e.g. "mental", "will"
  name: string;         // e.g. "Mental Plane"
  numbers: number[];    // e.g. [4, 9, 2]
  presentNumbers: number[];
  missingNumbers: number[];
  isComplete: boolean;
  completionRatio: number; // 0, 1/3, 2/3, or 1
  arrowName?: string;   // if complete, the Arrow name
  interpretation: string;
}

// Full reading result
interface LoShuReading {
  input: DOBInput;
  rawDigits: number[];         // all digits from DOB, zeros excluded
  digitMap: Record<number, DigitAnalysis>; // 1–9 keyed
  grid: number[][];            // 3x3 array of numbers (fixed layout)
  planes: PlaneResult[];
  missingNumbers: number[];
  presentNumbers: number[];
  dominantNumbers: number[];   // count >= 2
  arrows: string[];            // names of complete planes
  summaryHeadline: string;
  summaryParagraph: string;
}
```

---

## SECTION 5 — UI/UX SPECIFICATIONS

### 5.1 Visual Design Language

```
Theme:          Dark with rich accent colours (spiritual / mystical feel)
Primary BG:     #0F0F1A  (near-black indigo)
Card BG:        #1A1A2E  (dark navy)
Surface:        #16213E
Accent 1:       #E94560  (red-pink — energy)
Accent 2:       #F5A623  (gold — wisdom)
Accent 3:       #4FC3F7  (light blue — calm)
Text Primary:   #F0F0F0
Text Muted:     #8892A4
Border:         #2A2A4A
Complete Plane: #22C55E  (green)
Incomplete:     #F59E0B  (amber)
Missing Cell:   #374151  (muted grey — visually "empty")
Present Cell:   #1E3A5F  (dark blue)
Dominant Cell:  #7C3AED  (purple — powerful)
Font:           'Inter' for UI, 'Cinzel' or 'Playfair Display' for numerals/headings
```

### 5.2 Layout Structure

```
┌──────────────────────────────────────────────────────┐
│  HEADER: App name + tagline                          │
├──────────────────────────────────────────────────────┤
│  [INPUT SECTION — full width centered]               │
│   Name (optional) + DOB input + Generate button      │
├──────────────────────────────────────────────────────┤
│  [RESULTS — visible after generation]                │
│  ┌─────────────────┐  ┌──────────────────────────┐   │
│  │  LO SHU GRID    │  │  SUMMARY CARD             │   │
│  │  (3×3 visual)   │  │  Headline + paragraph     │   │
│  └─────────────────┘  └──────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐     │
│  │  YOUR NUMBERS                                 │     │
│  │  Present | Missing | Dominant                 │     │
│  └──────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────┐     │
│  │  PLANE ANALYSIS (8 planes, grid of cards)     │     │
│  └──────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────┐     │
│  │  PERSONALITY DEEP DIVE (expandable sections)  │     │
│  └──────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────┐     │
│  │  DOWNLOAD / SHARE BUTTONS                     │     │
│  └──────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

### 5.3 Grid Cell Design

Each cell in the 3×3 grid:

```
State: Missing
┌─────────────┐
│      4      │  ← Number label (always shown, dimmed)
│   - - - -   │  ← Dashed border
│  [Absent]   │  ← Status badge
└─────────────┘
Background: dark grey, number colour: #4B5563

State: Active (count = 1)
┌─────────────┐
│      4      │  ← Number bright
│      •      │  ← 1 dot indicator
│   [Active]  │
└─────────────┘
Background: dark blue glow

State: Dominant (count ≥ 2)
┌─────────────┐
│      4      │
│    • • •    │  ← Dot per occurrence (max 4 shown, then "4×")
│  [Dominant] │
└─────────────┘
Background: purple glow, subtle pulse animation

Hover / Focus:
- Scale 1.05
- Brighter border
- Cursor: pointer
- Show tooltip: "Click for details"
```

### 5.4 Plane Analysis Card Design

```
┌────────────────────────────────────┐
│ ✦ Mental Plane  [4 · 9 · 2]        │
│ ─────────────────────────────────  │
│ ████████████████████ COMPLETE      │  ← Green pill
│                                    │
│ "Arrow of the Intellect"           │  ← Arrow name if complete
│ Exceptionally strong thinker;      │
│ analytical and strategic...        │
└────────────────────────────────────┘

Incomplete variant:
│ ▓▓▓▓▓▓▓░░░░░░░ 2 of 3  [growing]  │  ← Amber progress bar
```

### 5.5 Animations

```
Grid population:    Each cell animates in with fadeInScale, 80ms stagger
Plane cards:        Slide up on scroll enter (IntersectionObserver)
Number details:     Slide-in panel from right (mobile: bottom sheet)
Results reveal:     Fade in after 400ms computation delay (feels thoughtful)
Dominant cells:     Subtle pulsing glow (CSS animation, respect prefers-reduced-motion)
```

### 5.6 Responsive Breakpoints

```
Mobile  (<640px):  Single column, grid centred, bottom-sheet for detail
Tablet  (640–1024px): 2-col layout for grid + summary
Desktop (>1024px): Full 2-col layout, side panel for cell detail
```

---

## SECTION 6 — ALGORITHM SPECIFICATION

> Implement this exactly in `lib/loshu.ts` as a pure function.

### 6.1 `computeLoShuReading(input: DOBInput): LoShuReading`

```
STEP 1 — Digit Extraction
  a. Convert DOB to string: "${day}${month}${year}"
     → Use the raw numbers, NOT zero-padded (e.g., day=5 → "5", not "05")
     → Exception: year is always 4 digits (e.g., 1990 → "1990")
     → For day and month: use the actual number as string
        Day 5, Month 8, Year 1995 → "5" + "8" + "1995" → "581995"
  
  b. Split into individual characters → ["5","8","1","9","9","5"]
  
  c. Filter out "0" characters
  
  d. Convert to integers → rawDigits: number[]
     Example DOB 05/08/1995:
       String: "5" + "8" + "1995" = "581995"
       Digits: [5, 8, 1, 9, 9, 5]
       After zero removal: [5, 8, 1, 9, 9, 5]  (no zeros here)
     
     Example DOB 10/10/2000:
       String: "10" + "10" + "2000" = "1010200" → wait, use numbers:
       day=10 → "10", month=10 → "10", year=2000 → "2000"
       Combined: "101020" + "00" → "10102000"
       After zero removal: [1, 1, 1, 2]

STEP 2 — Digit Frequency Map
  Create a map of digit → count for digits 1–9.
  Any digit not in rawDigits has count = 0.
  
  Example rawDigits [5, 8, 1, 9, 9, 5]:
  { 1:1, 2:0, 3:0, 4:0, 5:2, 6:0, 7:0, 8:1, 9:2 }

STEP 3 — Classify Each Digit
  For each digit 1–9:
    count=0 → intensity='missing', isMissing=true, isPresent=false
    count=1 → intensity='active'
    count=2 → intensity='strong'
    count=3 → intensity='dominant'
    count>=4 → intensity='overwhelming'
    
    position: use the fixed position map:
      1 → {row:2, col:1}
      2 → {row:0, col:2}
      3 → {row:1, col:0}
      4 → {row:0, col:0}
      5 → {row:1, col:1}
      6 → {row:2, col:2}
      7 → {row:1, col:2}
      8 → {row:2, col:0}
      9 → {row:0, col:1}

STEP 4 — Plane Analysis
  For each of the 8 planes, check if all 3 numbers have count > 0.
  
  presentNumbers = plane.numbers.filter(n => digitMap[n].isPresent)
  isComplete = presentNumbers.length === 3
  completionRatio = presentNumbers.length / 3
  
  Assign interpretation based on isComplete and completionRatio.

STEP 5 — Derived Lists
  missingNumbers   = digits 1–9 where count === 0
  presentNumbers   = digits 1–9 where count >= 1
  dominantNumbers  = digits 1–9 where count >= 2
  arrows           = planes where isComplete === true → planeArrowName

STEP 6 — Summary Generation
  summaryHeadline: generate based on dominant numbers and complete planes.
  Use template logic from content.ts (see Section 7).
  
  summaryParagraph: compose from:
    - Lead sentence referencing dominant trait (if any)
    - Strongest plane (if complete)
    - Key missing number lesson (if any)
    - Closing empowerment line
```

### 6.2 Grid Position Map (hardcoded constant)

```typescript
const GRID_LAYOUT: number[][] = [
  [4, 9, 2],  // row 0
  [3, 5, 7],  // row 1
  [8, 1, 6],  // row 2
];

const NUMBER_POSITION: Record<number, GridPosition> = {
  4: {row:0, col:0}, 9: {row:0, col:1}, 2: {row:0, col:2},
  3: {row:1, col:0}, 5: {row:1, col:1}, 7: {row:1, col:2},
  8: {row:2, col:0}, 1: {row:2, col:1}, 6: {row:2, col:2},
};
```

### 6.3 Plane Definitions (hardcoded constant)

```typescript
const PLANES = [
  { id: 'mental',      name: 'Mental Plane',       numbers: [4,9,2], type: 'horizontal', arrowName: 'Arrow of the Intellect' },
  { id: 'emotional',   name: 'Emotional Plane',     numbers: [3,5,7], type: 'horizontal', arrowName: 'Arrow of the Spiritual' },
  { id: 'physical',    name: 'Physical Plane',      numbers: [8,1,6], type: 'horizontal', arrowName: 'Arrow of the Planner' },
  { id: 'thought',     name: 'Thought Plane',       numbers: [4,3,8], type: 'vertical',   arrowName: 'Arrow of Practicality' },
  { id: 'will',        name: 'Will Plane',          numbers: [9,5,1], type: 'vertical',   arrowName: 'Arrow of Determination' },
  { id: 'sensitivity', name: 'Sensitivity Plane',   numbers: [2,7,6], type: 'vertical',   arrowName: 'Arrow of Compassion' },
  { id: 'stability',   name: 'Stability Plane',     numbers: [4,5,6], type: 'diagonal',   arrowName: 'Arrow of Balance' },
  { id: 'success',     name: 'Success Plane',       numbers: [2,5,8], type: 'diagonal',   arrowName: 'Arrow of Prosperity' },
];
```

---

## SECTION 7 — CONTENT SPECIFICATION (`lib/content.ts`)

### 7.1 Number Interpretation Templates

For each number, store an object with these keys:

```typescript
interface NumberContent {
  digit: number;
  keyword: string;           // e.g. "Leadership"
  shortDesc: string;         // 1 sentence, shown in grid tooltip
  presentText: string;       // paragraph for count=1
  strongText: string;        // paragraph for count=2
  dominantText: string;      // paragraph for count=3+
  missingText: string;       // paragraph for count=0 (life lesson)
  career: string;            // suitable career tendencies
  relationship: string;      // relationship style
}
```

Implement full content for all 9 numbers. Example for Number 1:

```typescript
{
  digit: 1,
  keyword: "Leadership & Independence",
  shortDesc: "The pioneer — independent, driven, and naturally authoritative.",
  presentText: "The number 1 appears in your chart, indicating a natural capacity for leadership and independent thinking. You are likely self-motivated and comfortable taking the initiative in situations where others hesitate. Your identity and individuality are important to you, and you do your best work when given autonomy.",
  strongText: "With 1 appearing twice in your chart, leadership and independence are defining traits of your personality. You may have a strong desire to forge your own path and can find it difficult to follow others' direction. Channel this powerful energy into entrepreneurship, mentorship, or pioneering projects.",
  dominantText: "The number 1 is overwhelmingly present in your chart, creating an extremely powerful individualistic energy. While your capacity for leadership is extraordinary, be mindful of tendencies toward stubbornness or isolation. This is a chart that can achieve great things — with conscious humility.",
  missingText: "The number 1 is absent from your chart. This is a life lesson around building self-confidence and learning to assert your own needs. Early in life, you may have deferred to others or doubted your own judgment. Your journey involves growing into your authority and trusting your own voice.",
  career: "Leadership roles, entrepreneurship, management, sports, politics, self-employment",
  relationship: "You value your independence in relationships and need a partner who respects your autonomy. You give loyalty, but not dependency.",
}
```

Write similar content for all 9 numbers following the same structure.

### 7.2 Summary Headline Templates

Generate the headline using this priority logic:

```
1. If 2+ complete planes → "[Name] the [archetype based on strongest plane]"
2. If dominant numbers (count ≥ 2) exist → "A [keyword of dominant number] Soul"
3. If many missing (5+) → "The Seeker: A Life of Growth and Discovery"
4. Default → "A Unique Numerological Blueprint"

Archetypes by plane:
  mental complete    → "Strategic Mind"
  emotional complete → "Spiritual Heart"
  physical complete  → "Material Builder"
  will complete      → "Unstoppable Force"
  success complete   → "Natural Achiever"
  compassion arrow   → "Natural Healer"
```

### 7.3 Summary Paragraph Template

```
Compose a 3–4 sentence paragraph following this structure:
Sentence 1: Acknowledge the overall energy ("Your chart reveals a personality shaped by [X]...")
Sentence 2: Highlight strongest asset (dominant number or complete plane)
Sentence 3: Name the key growth area (most significant missing number, if any)
Sentence 4: Closing empowerment ("This grid points toward a life of [positive framing].")

Tone: Warm, insightful, non-deterministic. Never say "you will". Always say "you tend to", "you are drawn to", "your natural gift is".
```

---

## SECTION 8 — EDGE CASES & VALIDATION

### 8.1 Date Validation Rules

```
Rule 1: All three fields (day, month, year) must be filled
Rule 2: Day must be 1–31
Rule 3: Month must be 1–12
Rule 4: Year must be between 1900 and current year
Rule 5: Day must be valid for the given month/year
  - April, June, September, November → max 30 days
  - February → max 28 (non-leap) or 29 (leap year)
  - Leap year: divisible by 4, except centuries unless divisible by 400
Rule 6: Date must not be in the future

Error messages:
  "Please enter a valid day (1–31)"
  "Please enter a valid month (1–12)"  
  "Please enter a year between 1900 and [current year]"
  "This date doesn't exist — please check the day for this month"
  "Date cannot be in the future"
```

### 8.2 Special Digit Cases

```
Case: DOB produces all same digits (e.g., 11/11/1111)
→ Handle gracefully; dominance text should note the extreme repetition

Case: DOB produces only one unique non-zero digit
→ Valid; show extreme dominance of that number

Case: DOB is entirely zeros (impossible after year 1000, but guard anyway)
→ Show "No digits found after zero removal" error state

Case: Very early dates (e.g., 01/01/1900)
→ Digits: 1,1,1,9 → rawDigits [1,1,1,9] — valid, proceed normally

Case: Recent date (e.g., 20/02/2020)
→ Digits: 2,2,2,2 → rawDigits [2,2,2,2] — count of 2 = 4, intensity='overwhelming'
```

### 8.3 Display Edge Cases

```
Dot indicators in grid cell: show max 4 dots; if count > 4, show "4+" text
Name field: if empty, use "Your" in personalised copy ("Your chart reveals...")
Name field: if provided, use name ("Maya's chart reveals...")
Name max length: 50 characters; trim and cap silently
```

---

## SECTION 9 — TONE & COPY GUIDELINES

### 9.1 Voice

- **Warm and encouraging** — like a knowledgeable friend, not a fortune teller
- **Non-deterministic** — this is a reflection tool, not a prediction engine
- **Empowering** — missing numbers are lessons, not deficits
- **Cultural respect** — acknowledge the ancient Chinese origin without stereotyping

### 9.2 Required Disclaimer

Display this disclaimer below the input form AND at the bottom of the results page:

> "Lo Shu Grid is a traditional Chinese numerology framework used for self-reflection and personal insight. Results are not scientifically validated predictions. This tool is intended for personal growth and entertainment purposes only."

### 9.3 Forbidden Phrases

Do NOT use any of these in any copy:
- "You will..." (use "you tend to" / "you are drawn to")
- "Your destiny is..." (use "your natural inclination")
- "You are cursed / doomed / fated to fail"
- "This predicts your future"
- Any language implying certainty about outcomes

### 9.4 Missing Number Framing

Always frame missing numbers as **growth opportunities**, never deficits:

```
❌ BAD: "You lack leadership ability"
✅ GOOD: "Leadership and self-assertion are a significant area of growth for you"

❌ BAD: "You will struggle financially because 8 is missing"
✅ GOOD: "With 8 absent, financial mastery is a key life lesson — one that brings great reward when embraced"
```

---

## SECTION 10 — NON-FUNCTIONAL REQUIREMENTS

### 10.1 Performance

```
- Grid computation must complete < 5ms (pure JS, no async needed)
- Initial page load < 2s on 3G connection
- Image export < 3s
- No loading spinners for grid generation (instant)
- Add a 400ms artificial delay before showing results to feel "thoughtful"
```

### 10.2 Accessibility

```
- All grid cells must be keyboard navigable (Tab + Enter to open detail)
- ARIA labels on all interactive elements
- Colour is never the sole indicator of state (always pair with text/icon)
- Minimum contrast ratio: 4.5:1 for normal text
- All animations respect `prefers-reduced-motion`
- Screen reader announces: "Your Lo Shu Grid has been generated" on completion
```

### 10.3 No Backend Required

```
- All computation is client-side
- No API calls
- No authentication
- No data persistence (each session is fresh)
- The app works fully offline after first load (add service worker if time permits)
```

### 10.4 Browser Support

```
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+
- No IE11 support required
```

---

## SECTION 11 — COMPONENT TREE

```
App
├── Header
│   └── AppTitle, Tagline
├── InputSection
│   ├── NameInput
│   ├── DOBInput
│   │   ├── DayField
│   │   ├── MonthField
│   │   └── YearField
│   ├── ValidationErrors
│   └── GenerateButton
├── ResultsSection  (conditional — shown after generation)
│   ├── GridSection
│   │   ├── LoShuGrid
│   │   │   └── GridCell × 9
│   │   └── GridLegend
│   ├── SummaryCard
│   │   ├── SummaryHeadline
│   │   └── SummaryParagraph
│   ├── NumbersSection
│   │   ├── PresentNumbers
│   │   ├── MissingNumbers
│   │   └── DominantNumbers
│   ├── PlaneAnalysis
│   │   └── PlaneCard × 8
│   ├── DeepDive
│   │   └── NumberDetailCard × (present numbers)
│   └── ExportSection
│       ├── DownloadButton
│       └── ResetButton
├── CellDetailPanel  (overlay/drawer)
│   ├── NumberHeader
│   ├── IntensityBadge
│   ├── InterpretationText
│   ├── CareerNote
│   └── RelationshipNote
└── Footer
    └── Disclaimer
```

---

## SECTION 12 — IMPLEMENTATION NOTES FOR LLM

### Start Order

Build in this sequence to avoid dependency issues:

```
1. lib/content.ts       — all static data and copy
2. lib/loshu.ts         — pure computation engine
3. components/LoShuGrid — the centrepiece visual
4. components/GridCell  — individual cell with states
5. InputSection         — form + validation
6. ResultsSection       — container that orchestrates results
7. PlaneAnalysis        — plane cards
8. NumbersSection       — present/missing/dominant lists
9. CellDetailPanel      — detail drawer
10. ExportSection       — download button
11. App.tsx             — wire everything together
12. Polish              — animations, responsive, accessibility
```

### Critical Implementation Details

```
1. The grid layout is FIXED. Numbers 1–9 always occupy the same positions.
   Only the visual state of each cell changes based on DOB.

2. Zero digits (0) from the DOB are ALWAYS ignored — never placed in the grid.

3. The number 5 (centre cell) has special visual treatment — slightly larger,
   distinct background, centre of the grid.

4. Plane highlighting: when a user hovers/selects a plane card, highlight the
   corresponding cells in the grid with a coloured border (use plane type colour).

5. The summary paragraph must be dynamically generated from the reading data,
   NOT hardcoded. Use template composition from content.ts.

6. For the download feature, wrap the grid + summary in a dedicated div with
   id="export-target" and use html2canvas on that element only.

7. All copy that references the user's name must gracefully fall back to "Your"
   if no name was entered.

8. Date parsing: treat day and month as plain integers when building the digit
   string. Do NOT zero-pad them. Day=5 → "5", not "05".
   But YEAR is always 4 digits naturally (e.g., 1995 → "1995").
```

### What NOT to Do

```
- Do NOT use external numerology APIs
- Do NOT add social login or user accounts
- Do NOT store DOB data anywhere (no localStorage, no cookies)
- Do NOT add ads or tracking beyond basic analytics
- Do NOT make the app feel like a "fortune telling" product
- Do NOT hardcode interpretations into components — keep all copy in content.ts
- Do NOT use inline styles — use Tailwind classes exclusively
- Do NOT create more than one page/route
```

---

## APPENDIX A — WORKED EXAMPLE

**Input:** Name: Priya, DOB: 17/08/1995

**Digit Extraction:**
```
day=17   → "17"
month=8  → "8"
year=1995 → "1995"
Combined string: "1781995"  ← wait, let's be precise:
"17" + "8" + "1995" = "1781995"
Individual chars: ["1","7","8","1","9","9","5"]
Remove zeros: none to remove
rawDigits: [1, 7, 8, 1, 9, 9, 5]
```

**Frequency Map:**
```
1 → 2   (strong)
2 → 0   (missing)
3 → 0   (missing)
4 → 0   (missing)
5 → 1   (active)
6 → 0   (missing)
7 → 1   (active)
8 → 1   (active)
9 → 2   (strong)
```

**Grid Rendering:**
```
┌──────┬──────┬──────┐
│  4   │  9•• │  2   │   Row 0: Mental Plane
│      │strong│      │
├──────┼──────┼──────┤
│  3   │  5•  │  7•  │   Row 1: Emotional Plane
│      │active│active│
├──────┼──────┼──────┤
│  8•  │  1•• │  6   │   Row 2: Physical Plane
│active│strong│      │
└──────┴──────┴──────┘
```

**Missing Numbers:** 2, 3, 4, 6 → 4 missing numbers

**Dominant Numbers:** 1 (×2), 9 (×2)

**Plane Analysis:**
```
Mental (4-9-2):    4 missing, 9 present, 2 missing → 1/3 — developing
Emotional (3-5-7): 3 missing, 5 present, 7 present → 2/3 — growing
Physical (8-1-6):  8 present, 1 present, 6 missing → 2/3 — growing
Will (9-5-1):      9 present, 5 present, 1 present → COMPLETE ✓ — Arrow of Determination
All others:        incomplete
```

**Arrows Active:** Arrow of Determination (Will Plane 9-5-1)

**Summary Headline:** "An Unstoppable Force" (Will plane complete)

**Summary Paragraph:**
> "Priya's chart reveals a personality defined by powerful determination and natural leadership. With both the number 1 and 9 strongly present, she carries the energy of the ambitious leader and the compassionate humanitarian — a rare and impactful combination. The complete Will Plane marks her as someone who rarely gives up, even in the face of significant obstacles. The absence of 2, 3, 4, and 6 points to life lessons around collaboration, creative expression, structure, and nurturing relationships — areas that hold tremendous growth potential."

---

## APPENDIX B — QUICK REFERENCE CHEATSHEET

```
GRID LAYOUT          NUMBER MEANINGS
4 | 9 | 2            1: Leadership
---------            2: Sensitivity
3 | 5 | 7            3: Creativity
---------            4: Practicality
8 | 1 | 6            5: Balance/Freedom
                     6: Responsibility
PLANES               7: Wisdom/Spirituality
H: 4-9-2 Mental      8: Power/Success
H: 3-5-7 Emotional   9: Compassion
H: 8-1-6 Physical
V: 4-3-8 Thought     INTENSITY
V: 9-5-1 Will        0 = Missing (life lesson)
V: 2-7-6 Sensitivity 1 = Active
D: 4-5-6 Stability   2 = Strong
D: 2-5-8 Success     3 = Dominant
                     4+ = Overwhelming
RULE: ZERO IS ALWAYS IGNORED FROM DOB DIGITS
```

---

*End of PRD — Version 1.0 — Lo Shu Grid Numerology App*