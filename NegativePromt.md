# Negative Prompt — Lo Shu Grid Web App
## What NOT to Build, Style, Write, or Ship

**Version:** 1.0 | **Companion to:** PRD + Design Doc
**Purpose:** Feed this to your LLM alongside the PRD and Design Doc to eliminate unwanted outputs before they happen.

---

## HOW TO USE THIS FILE

Paste this file into your LLM context with the following prefix:

> "The following is a negative prompt — a hard list of things you must NOT do when building this app. Treat every item as a constraint with the same weight as the PRD requirements."

---

## SECTION 1 — VISUAL & STYLING

### 1.1 Colours — Never Use

```
❌ Pure white background (#FFFFFF or white) — use warm cream #F5EFE6 instead
❌ Pure grey backgrounds (#F0F0F0, #F9F9F9, #EEEEEE, etc.)
❌ Cold blue-grey palettes (Slate, Zinc, Coolors defaults)
❌ Purple gradient on white — the most overused "AI app" look
❌ Dark mode with navy/dark purple cards on black (#0F0F0F, #1A1A2E)
❌ Neon or fluorescent colours (hot pink, electric blue, lime green)
❌ Pastel washed-out colours with no saturation
❌ Flat, shadowless colour fills — every clay element must have depth
❌ The Tailwind default colour palette without customisation
❌ Material Design blue (#1976D2) or Google green (#34A853)
❌ Bootstrap primary blue (#0D6EFD)
❌ Any colour that looks like a SaaS dashboard or admin panel
```

### 1.2 Shadows — Never Do

```
❌ Single-layer box-shadow (e.g., box-shadow: 0 4px 12px rgba(0,0,0,0.1))
❌ No shadow at all on interactive elements
❌ drop-shadow() filter instead of box-shadow on cards
❌ Identical shadow on every element (no depth hierarchy)
❌ Dark shadows on dark backgrounds — they disappear
❌ Neumorphism-style inset-only shadows (too subtle, low contrast)
❌ Flat design — zero depth, zero shadow — this is a clay UI
❌ Black shadows on coloured buttons — use the colour's darker variant
❌ CSS text-shadow on body copy
```

### 1.3 Border Radius — Never Do

```
❌ border-radius: 0 — no sharp corners anywhere in the UI
❌ border-radius: 4px or 8px — too sharp for claymorphism
❌ Mixing sharp and round corners inconsistently
❌ Pill buttons paired with square cards in the same component
❌ Circular grid cells — use rounded squares (border-radius: 24px)
```

### 1.4 Layout — Never Do

```
❌ Centred single-column layout for the entire results screen
❌ Full-screen modal for the cell detail — use a drawer/panel
❌ A table to display number meanings (use cards instead)
❌ Sidebar navigation — use the sticky pill nav
❌ Fixed left navigation drawer (mobile app pattern, not web)
❌ Hero section with a stock photo or gradient blob as background image
❌ Cards that span full viewport width on desktop with no max-width
❌ Grid cells smaller than 80×80px on any screen
❌ Results crammed into a single scrollable list with no visual grouping
```

---

## SECTION 2 — TYPOGRAPHY

```
❌ Inter — the most overused "AI app" font — never use
❌ Roboto — too Android/Material, wrong era for this UI
❌ Arial — system fallback only, never the intended font
❌ Helvetica Neue — too corporate
❌ Space Grotesk — overused in 2024 SaaS products
❌ DM Sans — generic, no character
❌ Poppins — friendly but over-saturated in the market
❌ Any Google Font without personality or historical character
❌ Font weight 400 (regular) anywhere in the UI — use 600 minimum
❌ All-caps body text
❌ Letter spacing less than -0.04em on large headings (too tight)
❌ Fraunces italic for body copy — italic is accent-only
❌ More than 2 typefaces in the UI
❌ Font size below 12px / 0.75rem in any visible UI element
❌ Line height below 1.5 on body paragraphs
❌ Text wider than 65ch in a reading/paragraph context
❌ Centred body text longer than 2 lines
```

---

## SECTION 3 — COMPONENTS

### 3.1 Buttons

```
❌ Flat buttons with no shadow — every button needs depth
❌ Ghost/outlined buttons as the PRIMARY action (Generate button must be solid)
❌ Underline-only links styled as the main CTA
❌ Button border-radius below 24px (--r-lg) or 9999px (--r-pill)
❌ Icon-only buttons without aria-label
❌ Disabled state with no visual indicator
❌ Hover state that only changes opacity (cheap, not clay)
❌ Buttons that don't press down on :active state
❌ Multiple CTAs of equal visual weight competing on one screen
```

### 3.2 Inputs

```
❌ Default browser input styling (no custom border, no radius, no shadow)
❌ Underline-only inputs (Material Design style)
❌ Input labels inside the field (placeholder-as-label pattern) — use real labels
❌ Placeholder text as the only form instruction
❌ Error state that only turns the border red with no message
❌ Success state that vanishes immediately with no confirmation
❌ Number inputs with browser spin arrows visible (hide with CSS)
❌ Full-width single input for the date (use 3 separate fields: DD, MM, YYYY)
```

### 3.3 Lo Shu Grid

```
❌ Rendering the grid as an HTML table (<table>) — use CSS Grid
❌ Flat coloured squares with no shadow or highlight
❌ Numbers displayed in plain body text font — use Fraunces display font
❌ Missing cells left completely blank with no visual indicator
❌ Missing cells hidden or removed from the grid — always show all 9 positions
❌ All cells the same colour regardless of number
❌ No animation on grid population — cells must animate in
❌ All cells animating at the exact same time — must stagger
❌ Clicking a cell doing nothing — must open detail panel
❌ Dot indicators replaced with a number count like "(×2)" alone — show dots
❌ Number 5 (centre) treated identically to all other cells — it must be special
❌ Grid cells smaller than 80×80px
❌ Grid rendered as an image — it must be interactive DOM elements
```

### 3.4 Plane Analysis

```
❌ Planes displayed as a plain text list
❌ Planes displayed without a visual completion indicator (progress bar/fill)
❌ All planes shown with the same styling regardless of complete/incomplete status
❌ Complete planes not visually distinguished from empty ones
❌ Arrow names hidden or deprioritised — they are exciting moments
❌ Planes laid out in a single column on desktop
❌ Technical labels only (e.g., "Horizontal Row 1") — use descriptive names
```

### 3.5 Navigation

```
❌ A traditional top bar with left logo + right hamburger on desktop
❌ Hamburger menu on desktop
❌ Sidebar / left nav drawer
❌ Bottom tab bar (native mobile pattern)
❌ The nav bar taking up more than 60px of vertical height
❌ Nav items that aren't pill-shaped
❌ Nav without the glass/frosted blur effect (backdrop-filter: blur)
❌ Fixed nav that doesn't stick on scroll
```

### 3.6 Detail Panel

```
❌ A full-page route/URL change when opening cell detail
❌ A centered modal overlay (use drawer — right on desktop, bottom on mobile)
❌ Modal with a dark scrim that blocks the grid from view on desktop
❌ The detail panel not having a close button
❌ Detail panel that closes when clicking anywhere outside (no accidental dismissal)
❌ Showing only the number name and basic meaning — include career + relationship
❌ The panel appearing instantly with no transition animation
```

---

## SECTION 4 — ANIMATION & MOTION

```
❌ Linear easing on any interactive element (use spring easing)
❌ No animation at all — static UI feels dead for this product
❌ Every element animating simultaneously on page load
❌ Animations longer than 600ms for UI interactions
❌ Looping animations on static text
❌ Cursor blink animations on non-input elements
❌ Page transition that fades the entire screen to black
❌ Skeleton loaders — there is no async data fetch; computation is instant
❌ A loading spinner on the Generate button — results appear after 400ms delay
❌ Parallax scrolling on the grid or content cards
❌ Animations that do not respect prefers-reduced-motion
❌ CSS animation that causes layout shift (only use transform and opacity)
❌ Background blobs that move too fast (min 14s per cycle)
❌ Spring easing with overshoot greater than scale(1.15) — too exaggerated
```

---

## SECTION 5 — COPY & CONTENT

### 5.1 Prediction Language — Never Use

```
❌ "You will..."
❌ "Your destiny is..."
❌ "This predicts..."
❌ "In [year], you will..."
❌ "You are fated to..."
❌ "The stars/numbers say you will..."
❌ "This guarantees..."
❌ "100% accurate reading"
❌ Any language implying the app predicts the future
```

### 5.2 Negative Framing — Never Use

```
❌ "You lack [trait]"
❌ "You are weak in [area]"
❌ "You will struggle because..."
❌ "This is a bad sign"
❌ "You are cursed with..."
❌ "Your chart shows failure in..."
❌ "People with this chart often fail at..."
❌ Framing missing numbers as deficits or flaws
❌ Tone that makes the user feel judged, deficient, or worried
```

### 5.3 Overclaiming Language — Never Use

```
❌ "Scientifically proven"
❌ "Backed by science"
❌ "Guaranteed accurate"
❌ "The universe has decided"
❌ "This is your true self"
❌ "This cannot be changed"
❌ Any claim of factual accuracy beyond self-reflection
```

### 5.4 Generic / Boring Copy — Never Use

```
❌ "Welcome to Lo Shu Grid!"
❌ "Please enter your information below"
❌ "Click the button to continue"
❌ "Your reading is ready!"
❌ "Result: [number]"
❌ Placeholder interpretation text like "Lorem ipsum..."
❌ The word "Unlock" in a CTA (overused SaaS pattern)
❌ "Get started" as the primary CTA label — use "Generate My Grid" or similar
❌ "Learn more" as a standalone CTA with no context
❌ Bullet lists for the personality summary — write in prose
```

### 5.5 Disclaimer — Never Omit

```
❌ Results page without the disclaimer
❌ Disclaimer hidden in a footnote at page bottom only
❌ Disclaimer in grey 10px text that no one reads
❌ No disclaimer at all — this is legally and ethically required
```

---

## SECTION 6 — TECHNICAL IMPLEMENTATION

### 6.1 Architecture — Never Do

```
❌ Calling an external API for grid computation — it's pure client-side math
❌ Storing the user's date of birth in localStorage, sessionStorage, or cookies
❌ Sending DOB data to any server or analytics platform
❌ Adding user authentication or accounts to the MVP
❌ Multiple routes/pages — this is a single-page application
❌ Using Redux, Zustand, or any state library — useState is sufficient
❌ Server-side rendering the grid result — it's generated client-side on input
❌ Adding a database for MVP — no persistence required
❌ Using a charting library (Recharts, Chart.js) for the grid — pure CSS Grid
❌ Using an icon library (Heroicons, Lucide) — use emoji as specified
```

### 6.2 CSS — Never Do

```
❌ Inline styles for visual properties — use CSS classes or Tailwind
❌ WidthType.PERCENTAGE in any layout that needs to work in export
❌ Using !important excessively — fix specificity properly
❌ CSS resets that remove box-sizing: border-box
❌ Negative margins to fix layout issues — rethink the layout
❌ Position: absolute for centering — use flexbox or grid
❌ Fixed pixel heights on cards that contain dynamic text
❌ overflow: hidden on the main scroll container
❌ z-index values above 1000 except for the modal/drawer (z-index: 200 max for nav)
❌ Hardcoded colours in component CSS — always use CSS variables
❌ Vendor-prefixed properties without the standard property also present
```

### 6.3 React — Never Do

```
❌ Class components — use functional components with hooks only
❌ useEffect for pure computation (use useMemo or plain functions)
❌ Mutating state directly (e.g., state.array.push())
❌ Key prop set to array index when list items can reorder
❌ Passing the entire reading object as a prop to every component (prop drilling)
❌ Triggering re-renders on every keystroke in the DOB input (debounce or validate on blur)
❌ Rendering 9 grid cells with copy-paste JSX — use .map() over GRID_LAYOUT
❌ Hardcoded interpretation strings inside components — import from content.ts
❌ The detail panel as a route — it's a stateful overlay controlled by useState
❌ useRef for values that should trigger re-renders
```

### 6.4 Accessibility — Never Omit

```
❌ Interactive elements without keyboard focus support
❌ Grid cells with no aria-label (e.g., aria-label="Number 4, Practicality, Active")
❌ Images or decorative emojis without aria-hidden="true"
❌ Colour as the only way to convey cell state (pair with text badge)
❌ Form inputs without associated <label> elements
❌ Error messages not linked to their input via aria-describedby
❌ Dialog/drawer without aria-modal="true" and focus trapping
❌ Animation without prefers-reduced-motion media query
❌ Touch targets smaller than 44×44px on mobile
❌ Text contrast ratio below 4.5:1 for normal text
```

### 6.5 Performance — Never Do

```
❌ Importing the entire lodash library for one utility function
❌ Loading Google Fonts without font-display: swap
❌ Rendering the background blobs as canvas — use CSS + divs
❌ Re-computing the entire reading on every render — compute once on submit
❌ Importing html2canvas at the top level — lazy load it on demand
❌ Unoptimised images in the export card (use CSS/text only)
❌ setTimeout for animation delays instead of CSS animation-delay
❌ Inline SVGs copy-pasted hundreds of times — use components or emoji
```

---

## SECTION 7 — EXPORT / SHARE FEATURE

```
❌ Exporting the full page including nav, disclaimer, and all sections
❌ Export that captures browser scrollbar or overflow artifacts
❌ Export background that is transparent (use --bg warm cream fill)
❌ Export at 1× resolution (use scale: 2 for retina)
❌ Export filename as "download.png" — use "loshu-[name]-[dob].png"
❌ A share button that opens a new tab to a non-existent URL
❌ Export that captures the detail panel if it's currently open
❌ Export card that contains only the grid with no name or interpretation
❌ Export that breaks on Safari due to missing -webkit-backdrop-filter
```

---

## SECTION 8 — WHAT THIS APP IS NOT

Never let the LLM drift into building any of these instead:

```
❌ NOT a Western numerology app (life path numbers, master numbers)
❌ NOT an astrology app (no zodiac signs, no birth charts)
❌ NOT a tarot app
❌ NOT a personality quiz (no multiple choice questions)
❌ NOT a chatbot or conversational AI interface
❌ NOT a social network (no profiles, no sharing to feed)
❌ NOT a subscription SaaS product in the MVP
❌ NOT a native mobile app (it is a web app, PWA-ready but not React Native)
❌ NOT a dashboard with charts, graphs, or KPIs
❌ NOT a content platform with articles, blogs, or user-generated content
❌ NOT a comparison tool for the MVP (no "compare two people" yet)
❌ NOT a fortune-telling service — it is a self-reflection tool
```

---

## QUICK REFERENCE — ONE-LINE SUMMARY

```
NO: white bg, Inter font, flat shadows, sharp corners, purple gradients,
    prediction language, negative framing, external API calls, user accounts,
    stored data, linear easing, full-page modals, HTML tables for grids,
    missing cells hidden, plain text plane lists, single-shadow buttons,
    all cells same colour, no scroll reveal, no accessibility, no disclaimer.

YES: warm cream bg, Fraunces + Nunito, 3-layer clay shadows, 24px+ radius,
     clay palette with shadow pairs, growth language, spring animations,
     client-side computation, single page, staggered grid reveal, drawer panels,
     coloured cells per number, Fraunces numerals, progress bars on planes,
     aria labels on all cells, disclaimer always visible.
```

---

*End of Negative Prompt — Lo Shu Grid Web App · v1.0*