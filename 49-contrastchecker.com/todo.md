# ContrastLab — Architecture Refactor TODO

## Goal
Refactor `ContrastChecker.astro` (one giant 700-line file) into a clean, maintainable React + Astro architecture. Introduce `@uiw/react-color` as the professional color picker. All existing features must be preserved.

---

## Step 1 — Install dependencies

```bash
npx astro add react --yes
npm install @uiw/react-color
```

**What changes:** Adds `@astrojs/react` integration and the color picker library.

---

## Step 2 — Update astro.config.mjs

Register the React integration alongside the existing Tailwind vite plugin.

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
```

---

## Step 3 — Create src/hooks/useContrastState.ts

Single source of truth for all state and computed values. Replaces all the `let fgColor`, `let bgColor`, and `updateAll()` logic that was spread across the Astro script.

**Exports:**
- `fgHex`, `bgHex` — current color hex strings
- `setFgHex`, `setBgHex` — setters
- `fgRgb`, `bgRgb` — computed RGB objects (via `useMemo`)
- `ratio`, `wcag`, `quality`, `meterColor` — computed contrast data
- `suggestions` — auto-fix suggestions (only computed when failing)
- `tailwindClasses` — computed Tailwind output
- `activeBlindType`, `setActiveBlindType`
- `savedPalettes`, `savePalette`, `deletePalette`, `loadPalette`
- `swapColors`
- `toast`, `showToast`

**Key behaviors:**
- Reads `?fg=` and `?bg=` from URL on init
- Syncs URL with `history.replaceState` on every color change
- Loads/saves palettes from `localStorage`
- Normalizes old palette format (RGB objects → hex strings)

---

## Step 4 — Create src/components/contrast/ColorSelector.tsx

Single reusable color selector component. Used twice (fg and bg).

**Props:**
```tsx
interface Props {
  label: string;
  color: string;        // hex string e.g. "#111827"
  onChange: (hex: string) => void;
  alignRight?: boolean; // flip picker popup to right-align
}
```

**Features:**
- Large color swatch (160px tall) — click to open picker popup
- `<Sketch>` from `@uiw/react-color` — full picker with saturation, hue, hex/rgb inputs
- `disableAlpha` and `presetColors={[]}` for clean UI
- Pencil icon on swatch, color adjusts based on luminance
- Text input below swatch — accepts hex/rgb/hsl, validates before propagating
- Click-outside closes picker
- Accessible (`aria-label`)

---

## Step 5 — Create src/components/contrast/ColorSelectorPanel.tsx

Wrapper that renders both `ColorSelector` components side by side with a swap button in the middle.

**Props:** `fgHex`, `bgHex`, `setFgHex`, `setBgHex`, `swapColors`

---

## Step 6 — Create src/components/contrast/ContrastRatioCard.tsx

Displays the contrast ratio and animated SVG ring meter.

**Props:** `ratio`, `quality`, `meterColor`

**SVG meter:** Arc fills from 0 to `ratio/21 × 360°`. Color transitions: red → orange → amber → green. Smooth CSS transition on dashoffset and stroke color.

---

## Step 7 — Create src/components/contrast/WCAGResultsCard.tsx

Four rows showing AA/AAA pass/fail results. Driven purely from a static `ROWS` array — no duplicated JSX.

**Props:** `wcag: WCAGResults`

Rows:
- AA Small Text (4.5:1)
- AA Large Text (3:1)
- AAA Small Text (7:1)
- AAA Large Text (4.5:1)

---

## Step 8 — Create src/components/contrast/AutoFixSuggestions.tsx

Only renders when `suggestions.length > 0` (i.e., colors are failing WCAG). Shows up to 3 suggested foreground alternatives.

**Props:** `suggestions: Suggestion[]`, `onApply: (hex: string) => void`

Each suggestion shows: color swatch, hex value, ratio, Apply button.

---

## Step 9 — Create src/components/contrast/LivePreview.tsx

Renders a preview area using the actual fg/bg colors. Shows heading, paragraph, button, link.

**Props:** `fgHex`, `bgHex`

No blind simulation here — blind simulation is handled by `ColorBlindnessSimulator`.

---

## Step 10 — Create src/components/contrast/ColorBlindnessSimulator.tsx

Tabs for 5 blind types. Two color swatches update to show simulated colors.

**Props:** `fgRgb`, `bgRgb`, `activeBlindType`, `onChangeBlindType`

Uses `simulate()` from `colorblind.ts` — no DOM manipulation.

---

## Step 11 — Create src/components/contrast/SavedPalettes.tsx

Save/load/delete palette pairs. Empty state message. Click row to load.

**Props:** `palettes`, `onSave`, `onLoad`, `onDelete`

Each row: two color swatches + hex labels + delete × button.

---

## Step 12 — Create src/components/contrast/ColorFormatConverter.tsx

HEX / RGB / HSL display with copy buttons. Derives all values from `fgRgb` prop via `toHex`, `toRgb`, `toHsl`.

**Props:** `fgRgb: RGB`, `onCopy: (text: string) => void`

---

## Step 13 — Create src/components/contrast/DeveloperOutput.tsx

CSS Variables tab + Tailwind Classes tab. Local `useState` for active tab.

**Props:** `fgRgb`, `bgRgb`, `tailwindClasses`, `onCopy`

CSS tab shows colored `--foreground` / `--background` output with swatches. Tailwind tab shows the class string.

---

## Step 14 — Create src/components/ContrastCheckerApp.tsx

Main React island. Calls `useContrastState()` and passes slices of state to each sub-component. Contains the 2-column grid layout, full-width sections, and the toast notification.

This is the ONLY component that calls `useContrastState`. All others receive plain props.

Layout:
```
┌─────────────────────────────────────────┐
│ Left col            │ Right col          │
│ ColorSelectorPanel  │ LivePreview        │
│ ContrastRatioCard   │ ColorBlindSim      │
│ WCAGResultsCard     │ SavedPalettes      │
│ AutoFixSuggestions  │                    │
├─────────────────────────────────────────┤
│ ColorFormatConverter (full width)        │
│ DeveloperOutput (full width)             │
└─────────────────────────────────────────┘
```

---

## Step 15 — Replace ContrastChecker.astro with thin wrapper

The new file is just 5 lines:

```astro
---
import ContrastCheckerApp from './ContrastCheckerApp';
---
<ContrastCheckerApp client:load />
```

All logic moves to React. The Astro file just mounts the island.

---

## Step 16 — Add dark mode CSS for @uiw/react-color

Add overrides to `src/styles/components.css` so the Sketch picker respects dark mode:

```css
/* @uiw/react-color dark mode */
.dark .w-color-sketch { background: var(--color-canvas-soft) !important; }
.dark .w-color-editable-input input {
  background: var(--color-canvas-soft-2) !important;
  color: var(--color-ink) !important;
  border-color: var(--color-hairline) !important;
}
```

---

## Step 17 — Build and verify

```bash
npm run build
```

Expected: zero errors, all features working, color picker opens on swatch click, URL updates on color change, palettes persist in localStorage.

---

## Bugs discovered in current code

| # | Bug | Location | Fix |
|---|-----|----------|-----|
| 1 | `activeFormat` is set but never read — HEX/RGB/HSL tabs are cosmetic only | `ContrastChecker.astro:320` | Removed tabs (non-functional) |
| 2 | `document.getElementById('cssOutput')` references element that doesn't exist | `ContrastChecker.astro:664` | Fixed to build CSS string from `cssColorFg` + `cssColorBg` |
| 3 | `deletePalette()` called from `innerHTML` onclick — doesn't work in module scripts | `ContrastChecker.astro:531` | Fixed with event delegation |
| 4 | Duplicate event listeners — both `input` and `change` listeners on color pickers | `ContrastChecker.astro:562–725` | Removed duplicates, keep only `input` |
| 5 | `autofix.ts` binary search always searches toward lower lightness regardless of bg luminance | `autofix.ts:60` | Document as known limitation |
| 6 | All `getElementById` calls typed as `HTMLElement` but access `.value` (TypeScript errors) | Throughout | Fixed by casting to `HTMLInputElement` at declaration |

---

## File map — before vs after

| Before | After |
|--------|-------|
| `ContrastChecker.astro` (700 lines) | `ContrastChecker.astro` (5 lines) |
| — | `ContrastCheckerApp.tsx` (~100 lines) |
| — | `hooks/useContrastState.ts` (~120 lines) |
| — | `contrast/ColorSelector.tsx` (~130 lines) |
| — | `contrast/ColorSelectorPanel.tsx` (~60 lines) |
| — | `contrast/ContrastRatioCard.tsx` (~50 lines) |
| — | `contrast/WCAGResultsCard.tsx` (~60 lines) |
| — | `contrast/AutoFixSuggestions.tsx` (~60 lines) |
| — | `contrast/LivePreview.tsx` (~50 lines) |
| — | `contrast/ColorBlindnessSimulator.tsx` (~70 lines) |
| — | `contrast/SavedPalettes.tsx` (~80 lines) |
| — | `contrast/ColorFormatConverter.tsx` (~70 lines) |
| — | `contrast/DeveloperOutput.tsx` (~90 lines) |

Total lines roughly the same, but split across 13 focused files — each under 150 lines and single-responsibility.
