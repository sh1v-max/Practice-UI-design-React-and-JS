import { describe, it, expect } from 'vitest';
import {
  parseHex, parseRgb, parseHsl, parseColor,
  toHex, toRgb, toHsl,
  rgbToHsl, hslToRgb,
} from '../src/lib/colors';

describe('parseHex', () => {
  it('parses 6-digit hex with #', () => {
    expect(parseHex('#111827')).toEqual({ r: 17, g: 24, b: 39 });
  });

  it('parses 6-digit hex without #', () => {
    expect(parseHex('ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('returns null for invalid input', () => {
    expect(parseHex('#fff')).toBeNull();
    expect(parseHex('xyz')).toBeNull();
    expect(parseHex('')).toBeNull();
  });

  it('is case-insensitive', () => {
    expect(parseHex('#FF0000')).toEqual(parseHex('#ff0000'));
  });
});

describe('parseRgb', () => {
  it('parses standard rgb() string', () => {
    expect(parseRgb('rgb(17, 24, 39)')).toEqual({ r: 17, g: 24, b: 39 });
  });

  it('parses rgb() with no spaces', () => {
    expect(parseRgb('rgb(0,0,0)')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('returns null for invalid input', () => {
    expect(parseRgb('hsl(0, 0%, 0%)')).toBeNull();
    expect(parseRgb('not-a-color')).toBeNull();
  });
});

describe('parseHsl', () => {
  it('parses hsl() string and returns RGB', () => {
    const result = parseHsl('hsl(0, 100%, 50%)');
    expect(result).not.toBeNull();
    expect(result!.r).toBeCloseTo(255, 0);
    expect(result!.g).toBeCloseTo(0, 0);
    expect(result!.b).toBeCloseTo(0, 0);
  });

  it('parses white hsl', () => {
    const result = parseHsl('hsl(0, 0%, 100%)');
    expect(result).not.toBeNull();
    expect(result!.r).toBeCloseTo(255, 0);
    expect(result!.g).toBeCloseTo(255, 0);
    expect(result!.b).toBeCloseTo(255, 0);
  });

  it('returns null for invalid input', () => {
    expect(parseHsl('rgb(0,0,0)')).toBeNull();
  });
});

describe('parseColor (auto-detect)', () => {
  it('detects hex with #', () => {
    expect(parseColor('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('detects hex without #', () => {
    expect(parseColor('000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('detects rgb()', () => {
    expect(parseColor('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('detects hsl()', () => {
    const result = parseColor('hsl(0, 0%, 0%)');
    expect(result).not.toBeNull();
    expect(result!.r).toBeCloseTo(0, 0);
  });

  it('returns null for unknown format', () => {
    expect(parseColor('not-a-color')).toBeNull();
    expect(parseColor('')).toBeNull();
  });
});

describe('toHex', () => {
  it('formats black correctly', () => {
    expect(toHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });

  it('formats white correctly', () => {
    expect(toHex({ r: 255, g: 255, b: 255 })).toBe('#FFFFFF');
  });

  it('rounds and clamps fractional values', () => {
    const result = toHex({ r: 255.9, g: 0.1, b: -1 });
    expect(result).toBe('#FF0000');
  });
});

describe('toRgb', () => {
  it('formats correctly', () => {
    expect(toRgb({ r: 17, g: 24, b: 39 })).toBe('rgb(17, 24, 39)');
  });
});

describe('toHsl', () => {
  it('returns an hsl() string', () => {
    expect(toHsl({ r: 255, g: 0, b: 0 })).toMatch(/^hsl\(/);
  });
});

describe('rgbToHsl / hslToRgb round-trip', () => {
  it('round-trips without significant drift', () => {
    const original = { r: 59, g: 130, b: 246 };
    const hsl = rgbToHsl(original);
    const back = hslToRgb(hsl);
    expect(Math.round(back.r)).toBe(original.r);
    expect(Math.round(back.g)).toBe(original.g);
    expect(Math.round(back.b)).toBe(original.b);
  });
});
