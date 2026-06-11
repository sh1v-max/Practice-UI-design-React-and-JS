# ContrastLab — Project Overview

## What It Does

ContrastLab is a WCAG contrast checker web app. Users enter a foreground and background color, and the tool instantly calculates the contrast ratio, checks WCAG 2.2 AA/AAA compliance, suggests accessible alternatives, simulates color blindness, and exports results as CSS variables or Tailwind classes.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Astro | 6.4.4 | Static site generator — handles routing, layouts, component islands |
| Tailwind CSS v4 | 4.3.0 | Utility-first styling via `@tailwindcss/vite` plugin |
| TypeScript | Built-in | All client-side logic in `<script>` blocks |
| Lucide | 1.17.0 | SVG icon library (used inline) |
| Geist Font | CDN | Primary typeface (Vercel's design system font) |

**No React, Vue, or any JS framework.** All interactivity is vanilla TypeScript inside Astro `<script>` tags.

---

## Folder Structure

```
49-contrastchecker.com/
├── public/                         # Static assets (served as-is)
├── src/
│   ├── assets/                     # SVG assets (Astro logo, background)
│   │
│   ├── components/                 # All page sections as Astro components
│   │   ├── Nav.astro               # Sticky navbar with dark mode toggle
│   │   ├── Hero.astro              # Landing hero section
│   │   ├── ContrastChecker.astro   # Core interactive tool (main feature)
│   │   ├── FeatureHighlights.astro # 3-up card grid of features
│   │   ├── WhyAccessibility.astro  # Dark band — stats & legal requirements
│   │   ├── WcagExplainer.astro     # WCAG criteria table & explanations
│   │   ├── FAQ.astro               # Accordion FAQ (8 questions)
│   │   └── Footer.astro            # Footer (minimal mobile / full desktop)
│   │
│   ├── layouts/
│   │   └── Layout.astro            # HTML shell — imports fonts, CSS, meta tags
│   │
│   ├── lib/                        # Pure TypeScript utility modules
│   │   ├── colors.ts               # Color parsing & conversion
│   │   ├── contrast.ts             # WCAG contrast ratio calculation
│   │   ├── autofix.ts              # Smart color suggestion engine
│   │   ├── colorblind.ts           # Color blindness simulation
│   │   └── export.ts               # CSS/Tailwind output & URL sharing
│   │
│   ├── pages/
│   │   └── index.astro             # Single page — assembles all components
│   │
│   └── styles/
│       ├── app.css                 # Entry point — imports all other CSS files
│       ├── theme.css               # Design tokens (@theme block)
│       ├── base.css                # HTML/body resets, font-face declarations
│       ├── utilities.css           # Custom utility classes (typography etc.)
│       └── components.css          # Reusable component classes (card, btn, etc.)
│
├── astro.config.mjs                # Astro config — registers @tailwindcss/vite
├── package.json                    # Dependencies & scripts
└── project_overview.md             # This file
```

---

## Component Breakdown

### `src/layouts/Layout.astro`
The HTML shell that wraps every page. Responsibilities:
- Sets `<html lang="en">` with `<head>` meta tags (title, description, OG tags)
- Imports `src/styles/app.css` (the CSS entry point)
- Loads Geist + Geist Mono fonts from CDN
- Runs an inline `<script>` in `<head>` that reads `localStorage` and applies the `dark` class to `<html>` **before** paint — prevents flash of wrong theme

### `src/pages/index.astro`
The only page. Imports and assembles all components in order:
```
Nav → Hero → ContrastChecker (in #checker anchor) → FeatureHighlights
→ WhyAccessibility → WcagExplainer → FAQ → Footer
```

### `src/components/Nav.astro`
- Sticky top navbar (64px height, `z-40`)
- Left: "ContrastLab" logo (scroll-to-top button)
- Center: anchor nav links (`#checker`, `#accessibility`, `#wcag`, `#faq`)
- Right: dark mode toggle (sun/moon SVG swap), share button, hamburger menu
- Mobile: hamburger opens a slide-down menu with all links
- Dark mode logic: reads `localStorage.getItem('darkMode')`, toggles `.dark` class on `<html>`, persists preference

### `src/components/Hero.astro`
- Full-width hero with mesh gradient backdrop
- Headline, subheadline, WCAG badge eyebrow
- Two CTA buttons: "Try it now →" (scrolls to `#checker`) and "Learn more"

### `src/components/ContrastChecker.astro` ⭐ Main Feature
The entire interactive tool. Two-column layout (stacks on mobile).

**Left column:**
- **Color swatches** (180px tall) — clicking opens native `<input type="color">` (overlaid at `opacity:0` inside swatch, covering full area — no browser icon visible)
- **Text inputs** for manual hex/rgb/hsl entry
- **Swap button** — swaps fg/bg colors
- **HEX / RGB / HSL format tabs**
- **Contrast Ratio card** — large number + SVG ring meter (arc fills based on ratio/21, color changes: red/orange/amber/green)
- **WCAG Results card** — 4 rows (AA Small, AA Large, AAA Small, AAA Large) with ✓/✗ and color
- **Smart Auto-Fix** — hidden unless colors fail; shows 3 suggested fixes

**Right column:**
- **Live Preview** — heading, paragraph, button, link rendered in actual fg/bg colors
- **Color Blindness Simulator** — 5 tabs (Normal, Protanopia, Deuteranopia, Tritanopia, Achromatopsia); two swatches update to simulated colors
- **Saved Palettes** — save/load/delete color pairs via `localStorage`

**Below fold:**
- **Color Format Converter** — HEX / RGB / HSL display with copy buttons
- **Developer Output** — CSS Variables tab & Tailwind Classes tab with copy buttons

**State management** (all vanilla TS):
- `fgColor`, `bgColor` — current colors as `RGB` objects
- `activeBlindType` — current color blindness simulation type
- `savedPalettes` — array persisted in `localStorage`
- `updateAll()` — master function called on every change; calls all sub-update functions

**URL sharing**: `?fg=111827&bg=FFFFFF` — loaded on init, updated on every change via `history.replaceState`

### `src/components/FeatureHighlights.astro`
6-feature card grid (1-up mobile → 3-up desktop):
Smart Auto-Fix, Color Blindness Simulator, Save Palettes, Shareable URLs, Developer Export, WCAG Education

### `src/components/WhyAccessibility.astro`
Dark section (`background: #171717` hardcoded — does NOT invert in dark mode).
- Stats: 1.3B people, $6.9T spending power, 25% of users
- Legal requirements box: WCAG 2.2, ADA Title III, EN 301 549, AODA

### `src/components/WcagExplainer.astro`
- WCAG criteria table (AA Normal, AA Large, AAA Normal, AAA Large)
- Two info cards explaining "What is Contrast Ratio?" and "AA vs AAA"

### `src/components/FAQ.astro`
8 expandable `<details>/<summary>` elements. Chevron SVG rotates 180° on open via CSS:
```css
details[open] summary svg { transform: rotate(180deg); }
```

### `src/components/Footer.astro`
- **Mobile** (`md:hidden`): Logo + stacked links (About, Contact, Privacy, Terms) + copyright — compact, minimal
- **Desktop** (`hidden md:block`): Full 4-column grid (ContrastLab brand, Tools, Company, Connect/social)

---

## Library Modules (`src/lib/`)

### `colors.ts`
Pure color math. Exports:
- `RGB` / `HSL` interfaces
- `parseColor(input)` — auto-detects HEX / rgb() / hsl() format and returns `RGB | null`
- `parseHex / parseRgb / parseHsl` — format-specific parsers
- `toHex / toRgb / toHsl` — `RGB` → string formatters
- `rgbToHsl / hslToRgb` — color space conversion

### `contrast.ts`
WCAG math. Exports:
- `relativeLuminance(rgb)` — applies WCAG sRGB linearization formula: `c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`, then `0.2126R + 0.7152G + 0.0722B`
- `contrastRatio(fg, bg)` — `(L1 + 0.05) / (L2 + 0.05)` where L1 is lighter
- `wcagResults(ratio)` — returns `{ aaSmall: ratio>=4.5, aaLarge: ratio>=3, aaaSmall: ratio>=7, aaaLarge: ratio>=4.5 }`
- `qualityLabel(ratio)` — `'Poor' | 'Fair' | 'Good' | 'Excellent'`
- `qualityColor(ratio)` — returns hex color for the ring meter

### `autofix.ts`
Smart color suggestion engine. Exports:
- `suggestFixes(fg, bg)` — returns up to 3 `Suggestion` objects targeting ratios 4.5, 6.0, 7.0
- Uses **binary search on HSL lightness** (20 iterations): preserves original hue + saturation, only adjusts `L` channel until the target contrast ratio is achieved
- Each suggestion: `{ hex, rgb, hsl, ratio }`

### `colorblind.ts`
Color blindness simulation. Exports:
- `simulate(rgb, type)` — transforms colors using LMS color space matrices
- **Protanopia** — zero out L (long wavelength / red) channel
- **Deuteranopia** — zero out M (medium wavelength / green) channel
- **Tritanopia** — zero out S (short wavelength / blue) channel
- **Achromatopsia** — `gray = 0.299R + 0.587G + 0.114B` (luminance-weighted grayscale)

### `export.ts`
Output & sharing. Exports:
- `toCssVars(fg, bg)` — `--foreground: #HEX;\n--background: #HEX;`
- `toTailwindClasses(fg, bg)` — maps hex to nearest Tailwind color name via lookup table
- `toShareUrl(fg, bg)` — `/?fg=XXXXXX&bg=FFFFFF`

---

## CSS Architecture (`src/styles/`)

Tailwind v4 with `@tailwindcss/vite` — no `tailwind.config.js`. All tokens in CSS.

| File | Role |
|---|---|
| `app.css` | Entry: `@import 'tailwindcss'` + imports theme/base/utilities/components. Also defines `html.dark { ... }` overrides |
| `theme.css` | `@theme { }` block — all design tokens as CSS custom properties (colors, spacing, radius, shadows, fonts) |
| `base.css` | HTML/body/heading/link/code resets. All colors use CSS variables (supports dark mode) |
| `utilities.css` | Custom typography classes (`.text-display-lg`, `.text-body-sm`, etc.) |
| `components.css` | Reusable UI classes: `.card-marketing`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.tab-group`, `.tab-button`, `.toast`, etc. |

### Dark Mode
- Class-based: `html.dark { ... }` in `app.css` overrides color variables
- `Nav.astro` script toggles `.dark` class on `<html>` and persists to `localStorage`
- `Layout.astro` `<head>` script applies dark class before paint (no flash)
- `WhyAccessibility.astro` uses **hardcoded `#171717`** (not a CSS variable) so it stays dark in both light and dark mode

---

## Key Data Flow

```
User clicks swatch / types hex
        ↓
input event on fgColorPicker or fgColorInput
        ↓
parseColor(value) → RGB object
        ↓
fgColor = parsed; sync other input's value
        ↓
updateAll()
  ├─ updateSwatches()        → sets swatch div background colors
  ├─ updateRatio()           → contrastRatio() → display "17.74:1"
  ├─ updateWCAG()            → wcagResults()   → ✓/✗ per criterion
  ├─ updatePreview()         → simulate() if blind mode active → preview area colors
  ├─ updateMeter()           → SVG arc strokeDashoffset animation
  ├─ updateAutoFix()         → suggestFixes() if failing → show suggestions
  ├─ updateFormats()         → toHex/toRgb/toHsl → format converter fields
  ├─ updateDeveloperOutput() → CSS vars + Tailwind output
  └─ updateUrl()             → history.replaceState with ?fg=&bg=
```

---

## Running the Project

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static output to /dist
npm run preview  # Preview the built output
```
