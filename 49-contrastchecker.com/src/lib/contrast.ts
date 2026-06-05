import type { RGB } from './colors';

export interface WCAGResults {
	aaSmall: boolean;
	aaLarge: boolean;
	aaaSmall: boolean;
	aaaLarge: boolean;
}

export type QualityLabel = 'Poor' | 'Fair' | 'Good' | 'Excellent';

export function relativeLuminance(rgb: RGB): number {
	const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
		const sRGB = c / 255;
		return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(fg: RGB, bg: RGB): number {
	const l1 = relativeLuminance(fg);
	const l2 = relativeLuminance(bg);
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

export function wcagResults(ratio: number): WCAGResults {
	return {
		aaSmall: ratio >= 4.5,
		aaLarge: ratio >= 3,
		aaaSmall: ratio >= 7,
		aaaLarge: ratio >= 4.5,
	};
}

export function qualityLabel(ratio: number): QualityLabel {
	if (ratio >= 7) return 'Excellent';
	if (ratio >= 4.5) return 'Good';
	if (ratio >= 3) return 'Fair';
	return 'Poor';
}

export function qualityColor(ratio: number): string {
	if (ratio >= 7) return '#10b981'; // green
	if (ratio >= 4.5) return '#f59e0b'; // amber
	if (ratio >= 3) return '#f97316'; // orange
	return '#ef4444'; // red
}
