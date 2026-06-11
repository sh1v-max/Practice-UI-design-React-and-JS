import type { RGB } from './colors';
import { toHex } from './colors';

const tailwindColorMap: Record<string, string> = {
	'#000000': 'black',
	'#ffffff': 'white',
	'#f3f4f6': 'gray-100',
	'#e5e7eb': 'gray-200',
	'#d1d5db': 'gray-300',
	'#9ca3af': 'gray-400',
	'#6b7280': 'gray-500',
	'#4b5563': 'gray-600',
	'#374151': 'gray-700',
	'#1f2937': 'gray-800',
	'#111827': 'gray-900',
	'#171717': 'slate-950',
	'#fafafa': 'slate-50',
};

export function toCssVars(fg: RGB, bg: RGB): string {
	const fgHex = toHex(fg);
	const bgHex = toHex(bg);
	return `--foreground: ${fgHex};\n--background: ${bgHex};`;
}

export function toTailwindClasses(fg: RGB, bg: RGB): string {
	const fgHex = toHex(fg).toLowerCase();
	const bgHex = toHex(bg).toLowerCase();

	const fgClass = findClosestTailwindColor(fgHex, true);
	const bgClass = findClosestTailwindColor(bgHex, false);

	return `text-${fgClass} / bg-${bgClass}`;
}

function findClosestTailwindColor(hex: string, isForeground: boolean): string {
	if (tailwindColorMap[hex.toUpperCase()]) {
		return tailwindColorMap[hex.toUpperCase()];
	}

	const isBright = parseInt(hex.slice(1, 3), 16) > 128;
	return isForeground ? (isBright ? 'white' : 'black') : (isBright ? 'white' : 'gray-900');
}

export function toShareUrl(fg: RGB, bg: RGB): string {
	const fgHex = toHex(fg).slice(1);
	const bgHex = toHex(bg).slice(1);
	return `/?fg=${fgHex}&bg=${bgHex}`;
}
