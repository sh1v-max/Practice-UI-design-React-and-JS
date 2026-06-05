import type { RGB } from './colors';

export type BlindType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function simulate(rgb: RGB, type: BlindType): RGB {
	if (type === 'normal') return rgb;
	if (type === 'achromatopsia') return simulateAchromatopsia(rgb);

	return simulateLMS(rgb, type);
}

function simulateLMS(rgb: RGB, type: BlindType): RGB {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;

	const [l, m, s] = [
		0.3 * r + 0.622 * g + 0.078 * b,
		0.23 * r + 0.692 * g + 0.078 * b,
		0.24342268924547819 * r + 0.20476247405761771 * g + 0.55314485869690629 * b,
	];

	let lAdjusted = l;
	let mAdjusted = m;
	let sAdjusted = s;

	if (type === 'protanopia') {
		lAdjusted = 0;
	} else if (type === 'deuteranopia') {
		mAdjusted = 0;
	} else if (type === 'tritanopia') {
		sAdjusted = 0;
	}

	const rNew = -0.62 * lAdjusted + 1.62 * mAdjusted;
	const gNew = 1.45 * lAdjusted - 0.45 * mAdjusted;
	const bNew = -0.08 * lAdjusted - 0.8 * mAdjusted + 0.88 * sAdjusted;

	return {
		r: Math.round(Math.max(0, Math.min(255, rNew * 255))),
		g: Math.round(Math.max(0, Math.min(255, gNew * 255))),
		b: Math.round(Math.max(0, Math.min(255, bNew * 255))),
	};
}

function simulateAchromatopsia(rgb: RGB): RGB {
	const gray = Math.round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
	return { r: gray, g: gray, b: gray };
}
