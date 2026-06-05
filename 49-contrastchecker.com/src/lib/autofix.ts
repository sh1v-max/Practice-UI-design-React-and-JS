import type { RGB, HSL } from './colors';
import { hslToRgb, rgbToHsl, toHex } from './colors';
import { contrastRatio } from './contrast';

export interface Suggestion {
	hex: string;
	rgb: RGB;
	hsl: HSL;
	ratio: number;
}

export function suggestFixes(fg: RGB, bg: RGB): Suggestion[] {
	const fgHsl = rgbToHsl(fg);
	const suggestions: Suggestion[] = [];

	const targets = [
		{ ratio: 4.5, name: 'AA' },
		{ ratio: 6, name: 'Mid' },
		{ ratio: 7, name: 'AAA' },
	];

	for (const target of targets) {
		const suggestion = findClosestLuminance(fg, bg, fgHsl, target.ratio);
		if (suggestion && !suggestions.some((s) => s.hex === suggestion.hex)) {
			suggestions.push(suggestion);
		}
	}

	return suggestions.sort((a, b) => b.ratio - a.ratio).slice(0, 3);
}

function findClosestLuminance(
	originalFg: RGB,
	bg: RGB,
	fgHsl: HSL,
	targetRatio: number
): Suggestion | null {
	let low = 0;
	let high = 100;
	let best: Suggestion | null = null;
	let bestDiff = Infinity;

	for (let i = 0; i < 20; i++) {
		const mid = (low + high) / 2;
		const testHsl: HSL = { h: fgHsl.h, s: fgHsl.s, l: mid };
		const testRgb = hslToRgb(testHsl);
		const ratio = contrastRatio(testRgb, bg);

		const diff = Math.abs(ratio - targetRatio);
		if (diff < bestDiff) {
			bestDiff = diff;
			best = {
				hex: toHex(testRgb),
				rgb: testRgb,
				hsl: testHsl,
				ratio: Math.round(ratio * 100) / 100,
			};
		}

		if (ratio < targetRatio) {
			high = mid;
		} else {
			low = mid;
		}
	}

	return best;
}
