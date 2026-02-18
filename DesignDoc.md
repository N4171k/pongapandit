# Lo Shu Grid — Web App Design Document
## Claymorphism Brandkit + Full UI Specification

**Version:** 1.0 | **Date:** February 2026 | **Format:** LLM-Ready Markdown

---

## TABLE OF CONTENTS

1. [Design Philosophy — Claymorphism](#1-design-philosophy--claymorphism)
2. [Brand Identity](#2-brand-identity)
3. [Colour System](#3-colour-system)
4. [Typography System](#4-typography-system)
5. [Spacing & Sizing Scale](#5-spacing--sizing-scale)
6. [Clay Shadow System](#6-clay-shadow-system)
7. [Border Radius Scale](#7-border-radius-scale)
8. [Component Library](#8-component-library)
9. [Screen-by-Screen Specifications](#9-screen-by-screen-specifications)
10. [Layout & Grid System](#10-layout--grid-system)
11. [Animation & Motion System](#11-animation--motion-system)
12. [Iconography & Decorative Elements](#12-iconography--decorative-elements)
13. [State Design](#13-state-design)
14. [Responsive Breakpoints](#14-responsive-breakpoints)
15. [CSS Token Reference](#15-css-token-reference)
16. [Tailwind Config](#16-tailwind-config)
17. [Do / Don't Rules](#17-do--dont-rules)
18. [LLM Implementation Instructions](#18-llm-implementation-instructions)

---

## 1. Design Philosophy — Claymorphism

### What Is Claymorphism?

Claymorphism is a UI design style that makes interface elements look like they are sculpted from colourful, inflated clay. It is the spiritual successor to Neumorphism — warmer, more playful, and far more accessible.

The style is built on **five physical properties**:

```
1. Puffiness        → Large border radii make elements look inflated
2. Hard press shadow → A solid offset bottom shadow simulates weight and depth
3. Soft glow        → A secondary diffuse shadow creates ambient light
4. Top highlight    → A diagonal gradient from white suggests a light source
5. Saturated colour → Bold mid-saturation pastels, never neon, never flat grey
```

### Why Claymorphism for Lo Shu Grid?

The Lo Shu Grid is an ancient, tactile framework — a magic square literally carved into turtle shells. Claymorphism mirrors that physicality. The numbers feel *placed*, like clay tiles. The grid feels *solid*, like a carved object. The reading feels *crafted*, not computed.

It also hits the right demographic: the primary user base (self-development seekers, spiritual practitioners) responds warmly to approachable, playful, non-clinical UIs.

### The Brand Feeling

```
Warm         → Clay palette, cream canvas, no cold greys
Grounded     → Heavy shadows, tactile depth, pressed elements
Playful      → Springy animations, rounded everything, emoji accents
Ancient-Modern → Display serifs + bold rounded sans, not tech startup fonts
Trustworthy  → Consistent system, clear hierarchy, nothing gimmicky
```

---

## 2. Brand Identity

### App Name & Wordmark

```
Primary Name:    Lo Shu Grid
Chinese Subtitle: 洛書
Tagline:         "Your numbers. Your nature."
```

### Logo Treatment

```
Style:      Display serif numeral "5" (centre of grid) inside a clay circle
Font:       Fraunces, weight 900, italic
Shape:      Circle with --shadow-md and warm cream background
Size:       44px container, 28px numeral
Colour:     Vermillion Red (#FF6B6B) numeral on cream (#FEFCF9)
```

### Brand Voice

```
Tone:       Warm friend, not fortune teller
Never say:  "You will…" / "Your destiny is…" / "This predicts…"
Always say: "You tend to…" / "Your nature suggests…" / "This reflects…"
Feeling:    Like a knowledgeable friend reading your chart at a tea house
```

---

## 3. Colour System

### 3.1 Primary Clay Palette

Every colour has a **base** and a **press-shadow** variant. The press-shadow is always ~15% darker and is used as the bottom offset shadow.

| Token | Name | Hex | Shadow Hex | Usage |
|-------|------|-----|------------|-------|
| `--red` | Vermillion Red | `#FF6B6B` | `#E85555` | Primary CTA, active grid cells, accents |
| `--gold` | Temple Gold | `#FFD166` | `#E8BB4E` | Badges, wisdom highlights, warnings |
| `--mint` | Jade Mint | `#5DD9A4` | `#47C48F` | Complete planes, success states |
| `--sky` | Celestial Sky | `#74C0FC` | `#5AAAE8` | Secondary actions, info states |
| `--lilac` | Mystic Lilac | `#C084FC` | `#A96EE6` | Dominant numbers, spiritual elements |
| `--amber` | Amber Fire | `#FFB347` | `#E89D30` | Partial states, developing planes |
| `--rose` | Blossom Rose | `#F9A8D4` | `#E690BB` | Emotional plane, sensitivity |
| `--teal` | Tidal Teal | `#2DD4BF` | `#1ABFAA` | Physical plane, grounded energy |

### 3.2 Canvas & Ink

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--bg` | Warm Cream | `#F5EFE6` | Page background |
| `--bg2` | Deep Cream | `#EDE5D8` | Subtle section backgrounds |
| `--surface` | Paper White | `#FEFCF9` | Card backgrounds |
| `--ink` | Rich Black | `#1C1612` | Primary text |
| `--ink2` | Warm Brown | `#5C4E3E` | Secondary text |
| `--ink3` | Stone | `#9C8E7E` | Muted labels, captions |
| `--border` | Soft Border | `rgba(255,255,255,0.85)` | Card borders |

### 3.3 Semantic Colour Mapping

```
Number 1 → --sky        (leadership, clarity)
Number 2 → --rose       (sensitivity, softness)
Number 3 → --amber      (creativity, warmth)
Number 4 → --teal       (practicality, structure)
Number 5 → --gold       (balance, centre, special)
Number 6 → --mint       (family, growth)
Number 7 → --lilac      (wisdom, spiritual)
Number 8 → --red        (power, success)
Number 9 → --rose+red   (compassion, humanitarian)

Missing cell background  → rgba(156,142,126,0.15) + dashed border
Present cell background  → number's assigned colour
Dominant cell background → number's colour + purple tint overlay
```

### 3.4 Background Ambient Blobs

The page background has 4–5 blurred colour blobs for atmosphere:

```css
/* Blob positions and colours */
Blob 1: --sky,    520×520px, top:-120px, left:-80px,  blur:80px, opacity:0.15
Blob 2: --red,    420×420px, bottom:-80px, right:-60px, blur:80px, opacity:0.15
Blob 3: --mint,   320×320px, top:40%, left:55%,        blur:80px, opacity:0.13
Blob 4: --gold,   280×280px, top:14%, right:10%,       blur:80px, opacity:0.13
Blob 5: --lilac,  240×240px, bottom:20%, left:6%,      blur:80px, opacity:0.12

Animation: each blob drifts 30–40px with slow ease-in-out infinite alternate
Duration:  14s–24s (staggered so they never sync)
```

---

## 4. Typography System

### 4.1 Font Stack

```css
--ff-display: 'Fraunces', Georgia, serif;
--ff-body:    'Nunito', system-ui, sans-serif;
```

**Fraunces** (Display) — An optical-size serif with expressive italics. Used for all headings, numerals in the grid, and brand moments. The italic weight has personality that reads as "ancient wisdom."

**Nunito** (Body) — A rounded sans-serif. The soft terminals pair perfectly with clay shapes. Heavy weights (800, 900) look substantial and confident. Never use generic grotesks like Inter or Roboto.

### 4.2 Type Scale

| Token | Size | Weight | Font | Line Height | Usage |
|-------|------|--------|------|-------------|-------|
| `--text-hero` | `clamp(2.8rem, 8vw, 5.5rem)` | 900 | Fraunces | 1.02 | Hero headline |
| `--text-h1` | `clamp(2rem, 5vw, 3.2rem)` | 900 | Fraunces | 1.05 | Section titles |
| `--text-h2` | `clamp(1.4rem, 3vw, 2rem)` | 900 | Fraunces | 1.1 | Card headings |
| `--text-h3` | `1.1rem` | 800 | Nunito | 1.2 | Subsection labels |
| `--text-body` | `1rem` | 600 | Nunito | 1.65 | Body copy |
| `--text-sm` | `0.875rem` | 600 | Nunito | 1.6 | Secondary copy |
| `--text-xs` | `0.75rem` | 700 | Nunito | 1.5 | Labels, captions |
| `--text-code` | `0.85rem` | 700 | monospace | 1.7 | Code, hex values |
| `--text-numeral` | `clamp(1.8rem, 4vw, 3rem)` | 900 | Fraunces | 1 | Grid cell numbers |

### 4.3 Typography Rules

```
1. Headings are always Fraunces; body is always Nunito — no exceptions
2. Letter spacing on headings: -0.03em
3. Letter spacing on uppercase labels: +0.06em
4. Body minimum weight: 600 (regular 400 is never used in UI — too thin on clay bg)
5. Italic Fraunces is used for brand accent moments only (hero subtitle, pull quotes)
6. Never use font-size below 12px in the UI
7. Maximum line width: 65ch for body text
```

---

## 5. Spacing & Sizing Scale

### 5.1 Base Unit: 4px

All spacing is derived from a 4px base unit.

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32:  128px
```

### 5.2 Component Padding Reference

| Component | Padding |
|-----------|---------|
| Large card | `32px` |
| Medium card | `24px` |
| Small card | `16px` |
| Button (primary) | `14px 28px` |
| Button (small) | `8px 18px` |
| Input field | `14px 18px` |
| Badge/pill | `6px 14px` |
| Nav item | `10px 20px` |
| Grid cell | `auto (aspect-ratio: 1)` |
| Section padding | `96px 0` |
| Page horizontal padding | `28px` |

---

## 6. Clay Shadow System

### 6.1 The Three-Layer Formula

Clay shadows use THREE stacked layers on every element:

```css
/* Layer 1: Hard press offset — simulates weight pressing into surface */
0 {N}px 0 {color-darker}

/* Layer 2: Diffuse ambient glow — soft shadow for depth */
0 {N*2.5}px {N*6}px rgba(0,0,0,0.12-0.18)

/* Layer 3: Inset top highlight — light source reflection */
inset 0 2px 8px rgba(255,255,255,0.55)
```

### 6.2 Shadow Scale

```css
--shadow-xs:
  0 2px 0 rgba(0,0,0,0.15),
  0 4px 10px rgba(0,0,0,0.10),
  inset 0 1px 4px rgba(255,255,255,0.45);

--shadow-sm:
  0 4px 0 rgba(0,0,0,0.16),
  0 8px 20px rgba(0,0,0,0.12),
  inset 0 2px 6px rgba(255,255,255,0.50);

--shadow-md:
  0 6px 0 rgba(0,0,0,0.18),
  0 14px 36px rgba(0,0,0,0.14),
  inset 0 2px 8px rgba(255,255,255,0.55);

--shadow-lg:
  0 8px 0 rgba(0,0,0,0.20),
  0 20px 50px rgba(0,0,0,0.16),
  inset 0 2px 8px rgba(255,255,255,0.55);

--shadow-xl:
  0 12px 0 rgba(0,0,0,0.22),
  0 28px 70px rgba(0,0,0,0.18),
  inset 0 2px 10px rgba(255,255,255,0.60);
```

### 6.3 Coloured Shadows (for clay buttons)

When a coloured button uses a shadow, the shadow uses the colour, not black:

```css
/* Red button */
box-shadow:
  0 5px 0 #E85555,
  0 10px 24px rgba(255,107,107,0.35),
  inset 0 2px 6px rgba(255,255,255,0.40);

/* Hover state */
box-shadow:
  0 7px 0 #E85555,
  0 16px 36px rgba(255,107,107,0.50),
  inset 0 2px 6px rgba(255,255,255,0.40);

/* Active/pressed state */
box-shadow:
  0 2px 0 #E85555,
  0 4px 12px rgba(255,107,107,0.25),
  inset 0 2px 6px rgba(255,255,255,0.40);
transform: translateY(3px);
```

Apply the same formula for every colour in the palette — swap `#E85555` and `rgba(255,107,107,...)` for the respective shadow hex and colour RGBA.

---

## 7. Border Radius Scale

```css
--r-sm:   10px   /* Tags, small chips */
--r-md:   16px   /* Inputs, small cards */
--r-lg:   24px   /* Standard cards */
--r-xl:   32px   /* Large feature cards */
--r-2xl:  44px   /* Hero sections, full-bleed cards */
--r-pill: 9999px /* Buttons, badges, nav items */
```

**Rules:**
- Interactive elements (buttons, inputs, badges): always `--r-pill` or `--r-lg`
- Content cards: `--r-lg` or `--r-xl`
- Grid cells: `--r-lg`
- Never use `border-radius: 4px` or `8px` — too sharp for clay
- The Lo Shu Grid cells use `--r-lg` (24px)

---

## 8. Component Library

### 8.1 Buttons

#### Primary Button (Red)
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--r-pill);
  background: #FF6B6B;
  color: #fff;
  font-family: var(--ff-body);
  font-size: 0.95rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 0 #E85555, 0 10px 24px rgba(255,107,107,0.35),
              inset 0 2px 6px rgba(255,255,255,0.40);
  transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.15s ease;
  position: relative;
  overflow: hidden;
}

/* Top-left highlight overlay */
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, rgba(255,255,255,0.35) 0%, transparent 55%);
  border-radius: inherit;
  pointer-events: none;
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 8px 0 #E85555, 0 16px 36px rgba(255,107,107,0.50),
              inset 0 2px 6px rgba(255,255,255,0.40);
}

.btn-primary:active {
  transform: translateY(3px) scale(0.98);
  box-shadow: 0 2px 0 #E85555, 0 4px 12px rgba(255,107,107,0.25),
              inset 0 2px 6px rgba(255,255,255,0.40);
}
```

#### Button Variants

| Variant | Background | Text | Shadow Colour |
|---------|-----------|------|---------------|
| Primary | `#FF6B6B` | `#fff` | `#E85555` |
| Gold | `#FFD166` | `#1C1612` | `#E8BB4E` |
| Mint | `#5DD9A4` | `#fff` | `#47C48F` |
| Sky | `#74C0FC` | `#fff` | `#5AAAE8` |
| Ghost | `#FEFCF9` | `#1C1612` | `rgba(0,0,0,0.16)` |

#### Button Sizes

```
Large:   padding 16px 36px, font-size 1.05rem
Default: padding 14px 28px, font-size 0.95rem
Small:   padding 9px 20px,  font-size 0.82rem
Icon:    padding 12px,       min-width 44px, aspect-ratio 1
```

---

### 8.2 Input Fields

```css
.input {
  width: 100%;
  padding: 14px 18px;
  border-radius: var(--r-md);
  border: 2.5px solid rgba(255,255,255,0.90);
  background: #FEFCF9;
  font-family: var(--ff-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: #1C1612;
  box-shadow: var(--shadow-sm), inset 0 2px 8px rgba(0,0,0,0.06);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.input:focus {
  border-color: #FF6B6B;
  box-shadow: 0 4px 0 #E85555, 0 8px 20px rgba(255,107,107,0.20),
              inset 0 2px 8px rgba(0,0,0,0.06);
  transform: scale(1.01);
}

.input::placeholder { color: #9C8E7E; }
.input.error { border-color: #FF6B6B; background: #FFF5F5; }
.input.success { border-color: #5DD9A4; }
```

#### DOB Input (Three Fields)

```
Layout:     Three inputs side by side in ratio 1:1:1.5 (DD : MM : YYYY)
Gap:        12px between fields
Label:      Above each field, font-size 0.72rem, weight 800, uppercase
Hint text:  Below DOB row, font-size 0.78rem, colour --ink3
Validation: Inline error below respective field, red text, small fade-in animation
```

---

### 8.3 Cards

#### Standard Card
```css
.card {
  background: #FEFCF9;
  border-radius: var(--r-xl);
  padding: 32px;
  border: 2px solid rgba(255,255,255,0.85);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.25s ease;
}

/* Top-left light reflection */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 55%);
  pointer-events: none;
  border-radius: inherit;
}

.card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: var(--shadow-lg);
}
```

#### Coloured Card (for plane analysis, number sections)
```
Same as standard card but background is the number/plane colour at 100%
White text on coloured background
Shadow uses the darker version of that colour
```

#### Feature Card (with top accent border)
```css
.card-accent-top {
  border-top: 5px solid {accent-colour};
}
```

---

### 8.4 The Lo Shu Grid Component

```
Container:   280px × 280px (mobile), 340px × 340px (desktop)
Layout:      CSS Grid, 3×3, gap 12px
Cell size:   Flexible (fills grid), aspect-ratio: 1
Cell radius: var(--r-lg) — 24px
```

#### Cell States

**Missing Cell (digit not in DOB):**
```css
{
  background: rgba(156,142,126,0.15);
  border: 2.5px dashed rgba(156,142,126,0.40);
  color: #9C8E7E;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
  /* No hover lift — these are "empty" */
}
```

**Present Cell (digit appears once):**
```css
{
  background: {number-colour};
  border: 3px solid rgba(255,255,255,0.70);
  color: #fff;
  box-shadow: 0 5px 0 {colour-darker}, 0 10px 24px {colour-rgba-0.3},
              inset 0 2px 8px rgba(255,255,255,0.40);
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.cell:hover { transform: scale(1.10); }
```

**Dominant Cell (digit appears 2+ times):**
```css
{
  /* Same as present + purple shimmer overlay */
  background: {number-colour};
  box-shadow: 0 6px 0 {colour-darker}, 0 14px 36px {colour-rgba-0.45},
              inset 0 2px 8px rgba(255,255,255,0.45);
  animation: clayPulse 2.5s ease-in-out infinite;
}

@keyframes clayPulse {
  0%, 100% { box-shadow: 0 6px 0 {darker}, 0 14px 36px {colour-rgba-0.35}, inset 0 2px 8px rgba(255,255,255,0.45); }
  50%       { box-shadow: 0 6px 0 {darker}, 0 24px 50px {colour-rgba-0.60}, inset 0 2px 8px rgba(255,255,255,0.45); }
}
```

#### Cell Inner Layout

```
Number:        Fraunces, 900 weight, 1.8–2rem
Dot indicators: Row of filled circles below number
                1 dot per occurrence (max 4 shown; 5+ shows "5×")
                dot size: 7px, colour: rgba(255,255,255,0.75)
                gap: 3px
Status badge:  Tiny pill at bottom, font-size 0.55rem, weight 800
               Positioned absolute, bottom 8px, semi-transparent white bg
```

#### Centre Cell (Number 5) — Special Treatment

```
Size:          Slightly larger appearance via scale(1.05) on mount
Background:    --gold (#FFD166)
Shadow:        0 6px 0 #E8BB4E, enhanced ambient
Border:        3.5px solid rgba(255,255,255,0.80)
Label:         "Centre" badge, always visible
Significance:  Number 5 is the balance point — always highlighted
```

---

### 8.5 Plane Analysis Cards

```
Grid:     2-column on desktop, 1-column on mobile
Gap:      16px
```

**Plane Card Structure:**
```
┌─────────────────────────────────────────┐
│  ✦ Mental Plane           [4 · 9 · 2]  │  ← Title + number row
│  ────────────────────────────────────   │
│  [████████████████████] COMPLETE ✓      │  ← Progress bar + status pill
│                                         │
│  "Arrow of the Intellect"               │  ← Arrow name (if complete)
│  Exceptionally strong thinker...        │  ← Interpretation text
└─────────────────────────────────────────┘
```

```css
/* Complete plane */
.plane-card-complete {
  background: linear-gradient(135deg, #5DD9A4, #47C48F);
  color: #fff;
  border: 2.5px solid rgba(255,255,255,0.70);
  box-shadow: 0 6px 0 #36AD7E, 0 14px 36px rgba(93,217,164,0.35),
              inset 0 2px 8px rgba(255,255,255,0.40);
}

/* Partial plane (1 or 2 of 3 numbers present) */
.plane-card-partial {
  background: #FEFCF9;
  border: 2.5px solid rgba(255,179,71,0.40);
  box-shadow: var(--shadow-sm);
}

/* Empty plane */
.plane-card-empty {
  background: rgba(156,142,126,0.08);
  border: 2px dashed rgba(156,142,126,0.30);
  box-shadow: none;
}
```

**Progress bar:**
```css
.plane-progress-track {
  height: 8px;
  border-radius: 999px;
  background: rgba(0,0,0,0.10);
}
.plane-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: rgba(255,255,255,0.70);
  transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1);
  /* Width = (present count / 3) * 100% */
}
```

---

### 8.6 Number Summary Cards

Used in the "Your Numbers" section to display each present/missing number:

```
Card width:    Full width within column
Layout:        Left icon (coloured circle with digit) + right text block
Icon size:     56px, rounded var(--r-md), coloured bg with shadow
Digit:         Fraunces 900 inside icon
Text block:    Keyword (h4), short description (p), intensity badge
```

---

### 8.7 Badges & Pills

```css
/* Base badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: var(--shadow-xs);
  border: 1.5px solid rgba(255,255,255,0.80);
}
```

| Badge Type | Background | Text |
|------------|-----------|------|
| Active | `#74C0FC` | `#fff` |
| Strong | `#C084FC` | `#fff` |
| Dominant | `#FF6B6B` | `#fff` |
| Overwhelming | `#1C1612` | `#fff` |
| Missing | `rgba(156,142,126,0.25)` | `#9C8E7E` |
| Complete | `#5DD9A4` | `#fff` |
| Arrow | `#FFD166` | `#1C1612` |

---

### 8.8 Navigation Bar

```css
nav {
  position: sticky;
  top: 16px;
  z-index: 200;
  max-width: 720px;
  margin: 20px auto 0;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 9999px;
  border: 2px solid rgba(255,255,255,0.90);
  box-shadow: var(--shadow-sm);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

nav .logo {
  font-family: var(--ff-display);
  font-weight: 900;
  font-size: 1rem;
  color: #FF6B6B;
  margin-right: auto;
}

nav a {
  padding: 7px 16px;
  border-radius: 9999px;
  font-size: 0.80rem;
  font-weight: 800;
  color: #5C4E3E;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
}

nav a:hover, nav a.active {
  background: #FF6B6B;
  color: #fff;
  box-shadow: 0 3px 0 #E85555, 0 6px 12px rgba(255,107,107,0.35);
  transform: translateY(-1px);
}
```

---

### 8.9 Detail Panel / Drawer

Triggered when user taps a grid cell. Slides in from right on desktop, slides up from bottom on mobile.

```
Desktop:  fixed right panel, width 360px, full height
Mobile:   bottom sheet, height auto (max 85vh), border-radius top corners only
```

```css
.detail-panel {
  background: #FEFCF9;
  box-shadow: -8px 0 40px rgba(0,0,0,0.16);
  border-left: 3px solid rgba(255,255,255,0.85);
  padding: 32px;
  overflow-y: auto;
}

/* Mobile bottom sheet */
@media (max-width: 640px) {
  .detail-panel {
    border-radius: 28px 28px 0 0;
    border-left: none;
    border-top: 3px solid rgba(255,255,255,0.85);
    box-shadow: 0 -8px 40px rgba(0,0,0,0.16);
  }
}
```

**Panel content order:**
```
1. Drag handle (mobile only) — 40px × 4px pill, centered, --ink3
2. Number header — large Fraunces numeral in colour circle + keyword
3. Intensity badge
4. Occurrence text — "Appears X time(s) in your chart"
5. Divider
6. Full interpretation paragraph
7. Career tendencies label + text
8. Relationship style label + text
9. Close button (X) — ghost style, top right
```

---

## 9. Screen-by-Screen Specifications

### 9.1 Screen 1 — Landing / Input

**Purpose:** First impression + date of birth entry

**Layout:**
```
┌──────────────────────────────────────────┐
│  NAV (sticky pill)                       │
├──────────────────────────────────────────┤
│                                          │
│  洛書  (decorative Chinese chars)        │  ← top-right watermark
│                                          │
│  HERO HEADLINE (Fraunces 900 italic)     │
│  "Your numbers."                         │
│  "Your nature."                          │
│                                          │
│  Subheading (Nunito 600)                 │
│  "Discover what your date of birth..."   │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Name (optional)          [Input]  │  │  ← Clay input
│  │                                    │  │
│  │  Date of Birth                     │  │
│  │  [DD]   [MM]   [YYYY]              │  │  ← Three clay inputs
│  │                                    │  │
│  │  [★ Generate My Grid ★] ← Red btn  │  │  ← Primary CTA
│  └────────────────────────────────────┘  │  ← All inside a clay card
│                                          │
│  Trust badges: "5M+ readings" etc.       │
│  Disclaimer text                         │
└──────────────────────────────────────────┘
```

**Animations:**
```
Hero headline:   popIn on load (delay 0ms)
Subheading:      fadeUp on load (delay 150ms)
Input card:      fadeUp on load (delay 300ms)
Generate btn:    subtle pulse animation (draws attention)
Background blobs: slow drift, always running
```

---

### 9.2 Screen 2 — Results: Grid View

**Purpose:** Show the populated grid + immediate wow moment

```
┌──────────────────────────────────────────┐
│  NAV                                     │
├──────────────────────────────────────────┤
│  ← Back to new reading          [Reset]  │
│                                          │
│  "Priya's Lo Shu Grid"  (name + title)   │
│  17 · 08 · 1995                          │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │     THE GRID                      │    │
│  │   [4]   [9••]  [ 2 ]             │    │  ← 3×3 clay cells
│  │   [ 3 ]  [5•]  [7• ]             │    │
│  │   [8•]  [1••]  [ 6 ]             │    │
│  │                                   │    │
│  │  "Tap a number to explore"        │    │  ← Helper text
│  └──────────────────────────────────┘    │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  SUMMARY CARD                     │    │  ← Clay card, gold accent
│  │  "An Unstoppable Force"           │    │
│  │  Your chart reveals a personality │    │
│  │  shaped by powerful determination │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
[continues scrolling to sections below]
```

**Grid animation sequence:**
```
1. Input card fades out (200ms)
2. Result screen fades in (300ms)
3. Grid container popIn (400ms)
4. Cells populate one by one with staggered popIn
   - Empty cells: 80ms each, fade in dimly
   - Present/dominant cells: 100ms each, full popIn with bounce
   - Stagger delay: cell_index * 80ms
5. Summary card fadeUp after all cells are visible (total_cells * 80ms + 200ms)
```

---

### 9.3 Screen 3 — Your Numbers Section

**Purpose:** Explain which numbers are present, missing, dominant

```
┌──────────────────────────────────────────┐
│  YOUR NUMBERS                            │
│                                          │
│  ┌──────────┐  ┌──────────┐             │
│  │PRESENT   │  │MISSING   │             │  ← Two columns, clay cards
│  │          │  │          │             │
│  │ 1 ×2     │  │ 2        │             │
│  │ Leadership│ │Sensitivity│             │
│  │[Strong]  │  │[Lesson]  │             │
│  │          │  │          │             │
│  │ 5 ×1     │  │ 3        │             │
│  │ Balance  │  │Creativity │             │
│  └──────────┘  └──────────┘             │
│                                          │
│  DOMINANT NUMBERS                        │
│  (any with count ≥ 2 — featured larger)  │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  [1]  Leadership & Independence   │   │  ← Full-width, coloured
│  │  ★★ Strong (×2)                  │   │
│  │  "With 1 appearing twice..."     │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

---

### 9.4 Screen 4 — Plane Analysis

**Purpose:** Show all 8 planes with completion status

```
PLANE ANALYSIS
"The forces that shape your chart"

[Horizontal Planes]
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│Mental Plane  │  │Emotional     │  │Physical      │
│4 · 9 · 2    │  │3 · 5 · 7    │  │8 · 1 · 6    │
│1/3 ░░░████  │  │2/3 ████░██  │  │2/3 ████░██  │
│Developing   │  │Growing      │  │Growing      │
└──────────────┘  └──────────────┘  └──────────────┘

[Vertical Planes] — same 3-column layout

[Diagonal Planes — Arrow of Will complete]
┌─────────────────────────────────────────┐
│  ★ ARROW OF DETERMINATION    9 · 5 · 1  │  ← Featured complete plane
│  ████████████████████████ COMPLETE      │
│  Unstoppable willpower...               │
└─────────────────────────────────────────┘
```

---

### 9.5 Screen 5 — Personality Summary

**Purpose:** Full narrative reading

```
┌──────────────────────────────────────────┐
│  YOUR READING                            │
│  ─────────────────────────               │
│                                          │
│  ❝ "An Unstoppable Force" ❞             │  ← Pull quote, Fraunces italic
│                                          │
│  [Full summary paragraph — 3–4 sentences]│
│                                          │
│  STRENGTHS                               │
│  [✓ Pill] Determination                  │
│  [✓ Pill] Leadership                     │
│  [✓ Pill] Humanitarian vision            │
│                                          │
│  GROWTH AREAS                            │
│  [○ Pill] Emotional sensitivity (2)      │
│  [○ Pill] Creative expression (3)        │
│                                          │
│  CAREER TENDENCIES                       │
│  "Entrepreneurship, leadership roles..." │
│                                          │
│  RELATIONSHIP STYLE                      │
│  "You are loyal but independent..."      │
│                                          │
└──────────────────────────────────────────┘
```

---

### 9.6 Screen 6 — Export / Share

```
┌──────────────────────────────────────────┐
│  SAVE YOUR READING                       │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ EXPORT PREVIEW (id="export-target")│  │
│  │                                    │  │
│  │  洛書 · Lo Shu Grid               │  │
│  │  Priya · 17/08/1995               │  │
│  │                                    │  │
│  │  [MINI GRID — 3×3 condensed]       │  │
│  │                                    │  │
│  │  "An Unstoppable Force"            │  │
│  │  [1-line summary]                  │  │
│  │                                    │  │
│  │  loshu-grid.app                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [⬇ Download PNG]   [↩ New Reading]     │
│                                          │
│  Disclaimer text                         │
└──────────────────────────────────────────┘
```

---

## 10. Layout & Grid System

### 10.1 Page Structure

```
Max content width:  1120px
Page padding:       0 28px (mobile: 0 16px)
Section spacing:    96px top margin between sections
```

### 10.2 CSS Grid Columns

```css
/* Main two-column layout (desktop) */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}

/* Grid + summary side by side */
.results-top {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px;
  align-items: start;
}

/* Plane cards: 3-column */
.planes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Number cards: 2-column */
.numbers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
```

### 10.3 Visual Hierarchy Zones

```
Zone 1 (Hero):      Full width, centred, max-width 680px for text
Zone 2 (Grid area): 340px grid left + summary right (desktop)
Zone 3 (Analysis):  Full width cards, consistent gutter
Zone 4 (Summary):   Max-width 720px, centred, generous line-height
Zone 5 (Export):    Max-width 480px, centred
```

---

## 11. Animation & Motion System

### 11.1 Easing Tokens

```css
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* springy, clay-like */
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);       /* smooth decelerate */
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);        /* standard */
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);   /* same as spring */
```

### 11.2 Duration Tokens

```css
--dur-fast:     120ms
--dur-normal:   220ms
--dur-slow:     380ms
--dur-slower:   600ms
--dur-blob:     14s–24s  /* background ambient blobs */
```

### 11.3 Animation Definitions

```css
@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.65); }
  60%  { transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fadeUp {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideInRight {
  0%   { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInUp {
  0%   { opacity: 0; transform: translateY(60px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes clayPulse {
  0%, 100% { box-shadow: 0 6px 0 var(--darker), 0 14px 36px var(--glow-sm); }
  50%       { box-shadow: 0 6px 0 var(--darker), 0 24px 50px var(--glow-lg); }
}

@keyframes blobDrift {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(35px, 45px) scale(1.08); }
}
```

### 11.4 Interaction Transitions

```
All interactive elements:   transition all 0.2s var(--ease-spring)
Cards on hover:             transform translateY(-4px) scale(1.01)
Grid cells on hover:        transform scale(1.10)
Buttons on hover:           transform translateY(-3px) scale(1.03)
Buttons on active:          transform translateY(2px) scale(0.98)
Inputs on focus:            transform scale(1.01)
```

### 11.5 Scroll Reveal

Use `IntersectionObserver` to trigger `.visible` class:

```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Stagger child elements** using `transition-delay: calc(index * 80ms)`.

### 11.6 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .bg-blobs { display: none; }
}
```

---

## 12. Iconography & Decorative Elements

### 12.1 Icon Style

```
Style:     Emoji-first for UI icons (consistent on all platforms)
Size:      24px default, 20px small, 32px featured
Never use: SVG icon libraries that look clinical or corporate
```

### 12.2 Icon Mapping

| Element | Icon |
|---------|------|
| App logo | 🪬 or 洛 |
| Number 1 | 🌟 |
| Number 2 | 🌊 |
| Number 3 | 🎨 |
| Number 4 | 🏗️ |
| Number 5 | ⚖️ |
| Number 6 | 🏡 |
| Number 7 | 🔮 |
| Number 8 | 💎 |
| Number 9 | 🌍 |
| Complete plane | ✦ |
| Missing number | ○ |
| Arrow/special | ★ |
| Download | ⬇ |
| Share | ↗ |
| Reset | ↩ |
| Close | ✕ |
| Disclaimer | ⓘ |

### 12.3 Decorative Elements

```
Background watermarks:  Chinese characters at low opacity (0.04) behind content
                        "洛書", "4", "9", "2" scattered decoratively
Section dividers:       Gradient line, full width, 3px height
                        background: linear-gradient(90deg, --red, --amber, --mint, --sky, --lilac)
                        opacity: 0.30
Plane type indicators:  Horizontal = ─ / Vertical = │ / Diagonal = ╲ ╱
Dot separators:         "4 · 9 · 2" — use middot (·) not dash
```

---

## 13. State Design

### 13.1 Grid Cell States Summary

| State | Background | Border | Shadow | Text colour | Animation |
|-------|-----------|--------|--------|-------------|-----------|
| Missing | `rgba(156,142,126,0.15)` | dashed `rgba(156,142,126,0.40)` | inset only | `#9C8E7E` | none |
| Active (×1) | Number colour | solid white 70% | coloured shadow-sm | `#fff` | popIn on load |
| Strong (×2) | Number colour | solid white 75% | coloured shadow-md | `#fff` | popIn + subtle pulse |
| Dominant (×3) | Number colour | solid white 80% | coloured shadow-lg | `#fff` | clayPulse infinite |
| Overwhelming (×4+) | Number colour + dark overlay | solid white 70% | coloured shadow-xl | `#fff` | clayPulse + glow |
| Hover | — | brighter | elevated | — | scale(1.10) |
| Focused (keyboard) | — | `--red` ring | — | — | outline ring |
| Selected | brighter version | `--red` | enhanced | — | scale(1.05) |

### 13.2 Plane Card States

| State | Visual | Meaning |
|-------|--------|---------|
| Complete | Mint green bg, white text, full progress bar | All 3 numbers present |
| Partial (2/3) | White card, amber border, 66% progress bar | 2 of 3 numbers present |
| Partial (1/3) | White card, faded border, 33% progress bar | 1 of 3 present |
| Empty (0/3) | Muted bg, dashed border, no progress | None of the 3 present |

### 13.3 Input Validation States

```
Default:  White bg, white border — neutral
Focus:    Red border, slight scale(1.01), red shadow
Valid:    Mint border, checkmark icon visible
Error:    Red border, red bg tint, error message below
Disabled: 50% opacity, cursor not-allowed
```

---

## 14. Responsive Breakpoints

```css
/* Mobile first */
--bp-sm:  480px   /* Large mobile */
--bp-md:  640px   /* Tablet portrait */
--bp-lg:  960px   /* Tablet landscape / small desktop */
--bp-xl:  1120px  /* Desktop */
```

### Responsive Behaviour by Component

| Component | Mobile (<640px) | Tablet (640–960px) | Desktop (>960px) |
|-----------|----------------|-------------------|------------------|
| Grid size | 260×260px | 300×300px | 340×340px |
| Grid + Summary | Stacked | Stacked | Side by side |
| Plane cards | 1 column | 2 columns | 3 columns |
| Number cards | 1 column | 2 columns | 2 columns |
| Nav | Scrollable pill | Pill | Pill (max 720px) |
| Detail panel | Bottom sheet | Bottom sheet | Right drawer |
| Hero font | 2.6rem | 3.8rem | 5.2rem |
| Section padding | 64px | 80px | 96px |
| Card padding | 20px | 24px | 32px |
| Page padding | 16px | 24px | 28px |

---

## 15. CSS Token Reference

### Complete `:root` Declaration

```css
:root {
  /* Canvas */
  --bg:          #F5EFE6;
  --bg2:         #EDE5D8;
  --surface:     #FEFCF9;

  /* Ink */
  --ink:         #1C1612;
  --ink2:        #5C4E3E;
  --ink3:        #9C8E7E;
  --border:      rgba(255,255,255,0.85);

  /* Clay colours */
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

  /* Number colour mapping */
  --n1:  var(--sky);     --n1-d:  var(--sky-d);
  --n2:  var(--rose);    --n2-d:  var(--rose-d);
  --n3:  var(--amber);   --n3-d:  var(--amber-d);
  --n4:  var(--teal);    --n4-d:  var(--teal-d);
  --n5:  var(--gold);    --n5-d:  var(--gold-d);
  --n6:  var(--mint);    --n6-d:  var(--mint-d);
  --n7:  var(--lilac);   --n7-d:  var(--lilac-d);
  --n8:  var(--red);     --n8-d:  var(--red-d);
  --n9:  var(--rose);    --n9-d:  var(--rose-d);

  /* Shadows */
  --shadow-xs: 0 2px 0 rgba(0,0,0,.15), 0 4px 10px rgba(0,0,0,.10),
               inset 0 1px 4px rgba(255,255,255,.45);
  --shadow-sm: 0 4px 0 rgba(0,0,0,.16), 0 8px 20px rgba(0,0,0,.12),
               inset 0 2px 6px rgba(255,255,255,.50);
  --shadow-md: 0 6px 0 rgba(0,0,0,.18), 0 14px 36px rgba(0,0,0,.14),
               inset 0 2px 8px rgba(255,255,255,.55);
  --shadow-lg: 0 8px 0 rgba(0,0,0,.20), 0 20px 50px rgba(0,0,0,.16),
               inset 0 2px 8px rgba(255,255,255,.55);
  --shadow-xl: 0 12px 0 rgba(0,0,0,.22), 0 28px 70px rgba(0,0,0,.18),
               inset 0 2px 10px rgba(255,255,255,.60);

  /* Radii */
  --r-sm:   10px;
  --r-md:   16px;
  --r-lg:   24px;
  --r-xl:   32px;
  --r-2xl:  44px;
  --r-pill: 9999px;

  /* Spacing */
  --sp-1: 4px;  --sp-2: 8px;   --sp-3: 12px; --sp-4: 16px;
  --sp-5: 20px; --sp-6: 24px;  --sp-8: 32px; --sp-10: 40px;
  --sp-12: 48px; --sp-16: 64px; --sp-20: 80px; --sp-24: 96px;

  /* Typography */
  --ff-display: 'Fraunces', Georgia, serif;
  --ff-body:    'Nunito', system-ui, sans-serif;

  /* Easing */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);

  /* Durations */
  --dur-fast:   120ms;
  --dur-normal: 220ms;
  --dur-slow:   380ms;
}
```

---

## 16. Tailwind Config

If using Tailwind CSS, extend `tailwind.config.js` with these values:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:      '#F5EFE6',
        bg2:     '#EDE5D8',
        surface: '#FEFCF9',
        ink:     '#1C1612',
        ink2:    '#5C4E3E',
        ink3:    '#9C8E7E',
        clay: {
          red:    '#FF6B6B',
          'red-d':'#E85555',
          gold:   '#FFD166',
          'gold-d':'#E8BB4E',
          mint:   '#5DD9A4',
          'mint-d':'#47C48F',
          sky:    '#74C0FC',
          'sky-d':'#5AAAE8',
          lilac:  '#C084FC',
          'lilac-d':'#A96EE6',
          amber:  '#FFB347',
          'amber-d':'#E89D30',
          rose:   '#F9A8D4',
          teal:   '#2DD4BF',
        },
      },
      borderRadius: {
        'sm':   '10px',
        'md':   '16px',
        'lg':   '24px',
        'xl':   '32px',
        '2xl':  '44px',
        'pill': '9999px',
      },
      boxShadow: {
        'clay-xs': '0 2px 0 rgba(0,0,0,.15), 0 4px 10px rgba(0,0,0,.10), inset 0 1px 4px rgba(255,255,255,.45)',
        'clay-sm': '0 4px 0 rgba(0,0,0,.16), 0 8px 20px rgba(0,0,0,.12), inset 0 2px 6px rgba(255,255,255,.50)',
        'clay-md': '0 6px 0 rgba(0,0,0,.18), 0 14px 36px rgba(0,0,0,.14), inset 0 2px 8px rgba(255,255,255,.55)',
        'clay-lg': '0 8px 0 rgba(0,0,0,.20), 0 20px 50px rgba(0,0,0,.16), inset 0 2px 8px rgba(255,255,255,.55)',
        'clay-xl': '0 12px 0 rgba(0,0,0,.22), 0 28px 70px rgba(0,0,0,.18), inset 0 2px 10px rgba(255,255,255,.60)',
      },
      animation: {
        'pop-in':    'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'fade-up':   'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'clay-pulse':'clayPulse 2.5s ease-in-out infinite',
        'blob-drift':'blobDrift 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
```

---

## 17. Do / Don't Rules

### Colours

```
✅ DO:   Use warm cream (#F5EFE6) as the page background
✅ DO:   Pair every colour with its darker shadow variant
✅ DO:   Use coloured shadows on coloured buttons (not black)
✅ DO:   Use rgba whites for borders and overlays

❌ DON'T: Use pure white (#FFFFFF) as background
❌ DON'T: Use grey shadows on coloured elements
❌ DON'T: Use colour alone to convey meaning (pair with text/icon)
❌ DON'T: Use neon or fluorescent colours
❌ DON'T: Use flat colours with no shadow
```

### Typography

```
✅ DO:   Use Fraunces for all headings, numerals, brand moments
✅ DO:   Use Nunito at weight 600+ in the UI
✅ DO:   Use italic Fraunces for accent moments
✅ DO:   Use -0.03em letter spacing on large headings

❌ DON'T: Use Inter, Roboto, or any grotesque sans for headings
❌ DON'T: Use font weight 400 anywhere in the UI
❌ DON'T: Mix more than 2 typefaces
❌ DON'T: Use all-caps for body text
```

### Shadows & Depth

```
✅ DO:   Stack 3 shadow layers: hard offset + diffuse + inset highlight
✅ DO:   Increase shadow size on hover (the element "lifts")
✅ DO:   Press down on active (reduce shadow, add translateY)
✅ DO:   Use the ::before gradient trick for the top-left highlight

❌ DON'T: Use a single-layer box-shadow
❌ DON'T: Use drop-shadow filter instead of box-shadow on cards
❌ DON'T: Use identical shadows on all elements (no depth hierarchy)
❌ DON'T: Use dark backgrounds with dark shadows (they cancel out)
```

### Borders & Radius

```
✅ DO:   Use rgba(255,255,255,0.85) for card borders
✅ DO:   Use border-radius min 16px on all interactive elements
✅ DO:   Use dashed borders for "empty/missing" states

❌ DON'T: Use border-radius below 10px in clay UI
❌ DON'T: Use 1px solid grey borders (too flat, too corporate)
❌ DON'T: Use sharp corners on any clay element
```

### Animation

```
✅ DO:   Use spring easing (cubic-bezier(0.34,1.56,0.64,1)) for interactions
✅ DO:   Stagger grid cell animations for a satisfying reveal
✅ DO:   Use IntersectionObserver for scroll reveals
✅ DO:   Always add prefers-reduced-motion fallback

❌ DON'T: Use linear easing for UI interactions
❌ DON'T: Animate everything at once (overwhelms the user)
❌ DON'T: Use durations longer than 500ms for UI feedback
❌ DON'T: Forget to handle reduced motion preferences
```

### Copy & Tone

```
✅ DO:   Frame missing numbers as growth opportunities
✅ DO:   Use "you tend to", "your nature suggests", "you are drawn to"
✅ DO:   Always show the disclaimer on result screens
✅ DO:   Personalise copy with the user's name when provided

❌ DON'T: Say "you will", "your destiny is", "this predicts"
❌ DON'T: Use fatalistic language for missing numbers
❌ DON'T: Claim scientific validity anywhere
❌ DON'T: Use clinical or overly technical language
```

---

## 18. LLM Implementation Instructions

### Start Here

You are building the Lo Shu Grid web app. This design doc is your single source of truth for all visual decisions. The PRD (separate document) is your source of truth for functional logic and data models.

**Read this entire document before writing a single line of CSS.**

### Implementation Order

```
1. Set up Vite + React + TypeScript
2. Install Fraunces + Nunito from Google Fonts
3. Create CSS :root with all tokens from Section 15
4. Implement lib/loshu.ts (logic from PRD Section 6)
5. Implement lib/content.ts (copy from PRD Section 7)
6. Build GridCell component (most important visual element)
7. Build LoShuGrid component (3×3 layout)
8. Build InputSection (DOB form)
9. Build ResultsSection shell
10. Build PlaneAnalysis component
11. Build NumbersSection component
12. Build SummaryCard component
13. Build DetailPanel/drawer
14. Build ExportSection (html2canvas)
15. Wire App.tsx
16. Add animations (popIn, fadeUp, scroll reveal)
17. Add background blobs
18. Test responsive layout at 375px, 768px, 1280px
19. Add prefers-reduced-motion
20. Final polish: spacing, hover states, accessibility
```

### Critical Notes

```
1. Background colour is #F5EFE6 — NEVER pure white or grey
2. Every interactive element needs all 3 states: default, hover, active
3. The ::before gradient overlay is mandatory on all coloured cards
4. Clay shadow = 3 layers minimum. Single shadows are not clay.
5. Grid cell animations stagger by (index * 80ms) — write the delay calc
6. Number 5 centre cell is always gold and always slightly featured
7. Missing cells use dashed border — this is meaningful UX, not decoration
8. The detail panel is a drawer (right on desktop, bottom on mobile)
9. Export target div must exclude nav, footer, and background blobs
10. Fraunces italic is used only for brand/accent moments — not body text
```

### Font Import (put in index.html `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
```

### html2canvas Export Setup

```javascript
import html2canvas from 'html2canvas';

const handleDownload = async () => {
  const target = document.getElementById('export-target');
  const canvas = await html2canvas(target, {
    scale: 2,           // 2× for retina quality
    backgroundColor: '#F5EFE6',
    useCORS: true,
    logging: false,
  });
  const link = document.createElement('a');
  link.download = `loshu-${name || dob}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
```

---

*End of Design Document — Lo Shu Grid Web App · Claymorphism Brandkit · v1.0*