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

## Step 5 — Create src/hooks/usePalettes.ts

Extract all palette-related logic from `useContrastState`.

Responsibilities:

* Load palettes from localStorage
* Save palette
* Delete palette
* Load palette
* Migrate old palette format

Palette model:

```ts
interface Palette {
  id: string;
  createdAt: number;
  fg: string;
  bg: string;
}
```

Generate IDs using:

```ts
crypto.randomUUID()
```

---

## Step 6 — Create src/hooks/useUrlSync.ts

Extract URL responsibilities from useContrastState.

Responsibilities:

* Read `?fg=` and `?bg=` on startup
* Validate values via `parseColor()`
* Sync URL on color changes
* Use `history.replaceState()`

Example:

```txt
/?fg=111827&bg=FFFFFF
```

This hook should contain ALL URL-related logic.

---

## Step 7 — Update useContrastState.ts

After extracting palettes and URL sync:

Responsibilities become:

* fgHex
* bgHex
* setFgHex
* setBgHex
* swapColors
* activeBlindType
* setActiveBlindType

Computed via useMemo:

* fgRgb
* bgRgb
* ratio
* wcag
* quality
* meterColor
* suggestions
* tailwindClasses

No localStorage logic.

No URL logic.

Keep the hook focused.

---

## Step 8 — Create ContrastRatioCard.tsx

Props:

```ts
{
  ratio: number;
  quality: string;
  meterColor: string;
}
```

Features:

* Large ratio number
* Quality label
* SVG ring meter
* Smooth transitions

Use React.memo.

---

## Step 9 — Create WCAGResultsCard.tsx

Render results from:

```ts
const ROWS = [...]
```

No duplicated JSX.

Props:

```ts
{
  wcag: WCAGResults;
}
```

Use React.memo.

---

## Step 10 — Create AutoFixSuggestions.tsx

Props:

```ts
{
  suggestions: Suggestion[];
  onApply(hex: string): void;
}
```

Behavior:

* Hidden if suggestions empty
* Show color preview
* Show ratio
* Apply button

Use React.memo.

---

## Step 11 — Create LivePreview.tsx

Props:

```ts
{
  fgHex: string;
  bgHex: string;
}
```

Displays:

* Heading
* Paragraph
* Button
* Link

Pure presentational component.

Use React.memo.

---

## Step 12 — Create ColorBlindnessSimulator.tsx

Props:

```ts
{
  fgRgb: RGB;
  bgRgb: RGB;
  activeBlindType: BlindType;
  onChangeBlindType(type: BlindType): void;
}
```

Features:

* Tabs
* Simulated swatches
* Uses simulate()

No DOM manipulation.

Use React.memo.

---

## Step 13 — Create SavedPalettes.tsx

Props:

```ts
{
  palettes: Palette[];
  onSave(): void;
  onLoad(id: string): void;
  onDelete(id: string): void;
}
```

Features:

* Save button
* Empty state
* Palette list
* Delete button

Use React.memo.

---

## Step 14 — Create ColorFormatConverter.tsx

Props:

```ts
{
  fgRgb: RGB;
  onCopy(text: string): void;
}
```

Show:

* HEX
* RGB
* HSL

with copy buttons.

IMPORTANT:

Do NOT recreate the old fake format tabs.

Show formats directly.

---

## Step 15 — Create DeveloperOutput.tsx

Props:

```ts
{
  fgRgb: RGB;
  bgRgb: RGB;
  tailwindClasses: string;
  onCopy(text: string): void;
}
```

Tabs:

* CSS Variables
* Tailwind Output

Local component state only.

Use React.memo.

---

## Step 16 — Create ContrastCheckerApp.tsx

This becomes the orchestration layer.

Hooks used:

```ts
useContrastState()
usePalettes()
useUrlSync()
```

Render:

```txt
LEFT
 ├── Foreground Wheel Picker
 ├── Swap Button
 ├── Background Wheel Picker
 ├── ContrastRatioCard
 ├── WCAGResultsCard
 └── AutoFixSuggestions

RIGHT
 ├── LivePreview
 ├── ColorBlindnessSimulator
 └── SavedPalettes

BOTTOM
 ├── ColorFormatConverter
 └── DeveloperOutput
```

Important:

Do NOT create ColorSelectorPanel.tsx.

Render both ColorSelector components directly.

---

## Step 17 — Replace ContrastChecker.astro

Replace:

```astro
<ContrastCheckerApp client:load />
```

with:

```astro
<ContrastCheckerApp client:visible />
```

Benefits:

* Better performance
* Better Lighthouse score
* Delayed hydration

---

## Step 18 — Dark Mode Support

Update CSS for Wheel picker.

Replace old Sketch-specific CSS.

Theme:

```css
.dark .w-color-wheel
.dark .w-color-editable-input input
```

Requirements:

* Respect existing design tokens
* Match Vercel-inspired theme
* No hardcoded colors

---

## Step 19 — Build Verification

Run:

```bash
npm run build
```

Verify:

* No TypeScript errors
* No hydration warnings
* No React warnings
* URL sync works
* Wheel picker works
* Palettes persist
* Dark mode works

---

## Step 20 — Add Tests

Install:

```bash
npm install -D vitest
```

Create:

```txt
tests/
├── contrast.test.ts
├── colors.test.ts
└── autofix.test.ts
```

Test:

* Black vs white = 21:1
* WCAG thresholds
* HEX parsing
* RGB parsing
* HSL parsing
* Suggestion generation

---

## Final File Structure

```txt
src/
├── components/
│   ├── ContrastCheckerApp.tsx
│   └── contrast/
│       ├── ColorSelector.tsx
│       ├── ContrastRatioCard.tsx
│       ├── WCAGResultsCard.tsx
│       ├── AutoFixSuggestions.tsx
│       ├── LivePreview.tsx
│       ├── ColorBlindnessSimulator.tsx
│       ├── SavedPalettes.tsx
│       ├── ColorFormatConverter.tsx
│       └── DeveloperOutput.tsx
│
├── hooks/
│   ├── useContrastState.ts
│   ├── usePalettes.ts
│   └── useUrlSync.ts
│
├── lib/
│   ├── colors.ts
│   ├── contrast.ts
│   ├── autofix.ts
│   ├── colorblind.ts
│   └── export.ts
```
