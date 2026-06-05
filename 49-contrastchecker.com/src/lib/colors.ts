export interface RGB {
	r: number;
	g: number;
	b: number;
}

export interface HSL {
	h: number;
	s: number;
	l: number;
}

export function parseHex(hex: string): RGB | null {
	const match = hex.match(/^#?([0-9a-fA-F]{6})$/);
	if (!match) return null;
	const value = parseInt(match[1], 16);
	return {
		r: (value >> 16) & 255,
		g: (value >> 8) & 255,
		b: value & 255,
	};
}

export function parseRgb(input: string): RGB | null {
	const match = input.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
	if (!match) return null;
	return {
		r: parseInt(match[1]),
		g: parseInt(match[2]),
		b: parseInt(match[3]),
	};
}

export function parseHsl(input: string): RGB | null {
	const match = input.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
	if (!match) return null;
	const h = parseInt(match[1]);
	const s = parseInt(match[2]);
	const l = parseInt(match[3]);
	return hslToRgb({ h, s, l });
}

export function parseColor(input: string): RGB | null {
	const trimmed = input.trim();
	if (trimmed.startsWith('#') || /^[0-9a-fA-F]{6}$/.test(trimmed)) {
		return parseHex(trimmed);
	}
	if (trimmed.startsWith('rgb')) {
		return parseRgb(trimmed);
	}
	if (trimmed.startsWith('hsl')) {
		return parseHsl(trimmed);
	}
	return null;
}

export function toHex(rgb: RGB): string {
	const toHexComponent = (n: number) => {
		const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHexComponent(rgb.r)}${toHexComponent(rgb.g)}${toHexComponent(rgb.b)}`.toUpperCase();
}

export function toRgb(rgb: RGB): string {
	const r = Math.round(Math.max(0, Math.min(255, rgb.r)));
	const g = Math.round(Math.max(0, Math.min(255, rgb.g)));
	const b = Math.round(Math.max(0, Math.min(255, rgb.b)));
	return `rgb(${r}, ${g}, ${b})`;
}

export function toHsl(rgb: RGB): string {
	const hsl = rgbToHsl(rgb);
	return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}

export function rgbToHsl(rgb: RGB): HSL {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
				break;
			case g:
				h = ((b - r) / d + 2) / 6;
				break;
			case b:
				h = ((r - g) / d + 4) / 6;
				break;
		}
	}

	return {
		h: h * 360,
		s: s * 100,
		l: l * 100,
	};
}

export function hslToRgb(hsl: HSL): RGB {
	const h = hsl.h / 360;
	const s = hsl.s / 100;
	const l = hsl.l / 100;

	let r, g, b;

	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return {
		r: r * 255,
		g: g * 255,
		b: b * 255,
	};
}
