import { describe, it, expect } from 'vitest';
import { relativeLuminance, contrastRatio, wcagResults, qualityLabel, qualityColor } from '../src/lib/contrast';

const BLACK = { r: 0, g: 0, b: 0 };
const WHITE = { r: 255, g: 255, b: 255 };
const GRAY_AA = { r: 118, g: 118, b: 118 }; // ~4.5:1 on white

describe('relativeLuminance', () => {
  it('black = 0', () => {
    expect(relativeLuminance(BLACK)).toBe(0);
  });

  it('white = 1', () => {
    expect(relativeLuminance(WHITE)).toBeCloseTo(1, 5);
  });

  it('mid-gray is between 0 and 1', () => {
    const l = relativeLuminance({ r: 128, g: 128, b: 128 });
    expect(l).toBeGreaterThan(0);
    expect(l).toBeLessThan(1);
  });
});

describe('contrastRatio', () => {
  it('black on white = 21:1', () => {
    expect(contrastRatio(BLACK, WHITE)).toBeCloseTo(21, 0);
  });

  it('white on white = 1:1', () => {
    expect(contrastRatio(WHITE, WHITE)).toBeCloseTo(1, 5);
  });

  it('black on black = 1:1', () => {
    expect(contrastRatio(BLACK, BLACK)).toBeCloseTo(1, 5);
  });

  it('is symmetric — fg/bg order does not change ratio', () => {
    const r1 = contrastRatio(BLACK, GRAY_AA);
    const r2 = contrastRatio(GRAY_AA, BLACK);
    expect(r1).toBeCloseTo(r2, 10);
  });

  it('ratio is always >= 1', () => {
    const ratio = contrastRatio({ r: 100, g: 150, b: 200 }, { r: 200, g: 100, b: 50 });
    expect(ratio).toBeGreaterThanOrEqual(1);
  });
});

describe('wcagResults', () => {
  it('21:1 passes all levels', () => {
    const r = wcagResults(21);
    expect(r.aaSmall).toBe(true);
    expect(r.aaLarge).toBe(true);
    expect(r.aaaSmall).toBe(true);
    expect(r.aaaLarge).toBe(true);
  });

  it('4.5:1 passes AA small and all large, fails AAA small', () => {
    const r = wcagResults(4.5);
    expect(r.aaSmall).toBe(true);
    expect(r.aaLarge).toBe(true);
    expect(r.aaaSmall).toBe(false);
    expect(r.aaaLarge).toBe(true);
  });

  it('3:1 passes AA large only', () => {
    const r = wcagResults(3);
    expect(r.aaSmall).toBe(false);
    expect(r.aaLarge).toBe(true);
    expect(r.aaaSmall).toBe(false);
    expect(r.aaaLarge).toBe(false);
  });

  it('2:1 fails all levels', () => {
    const r = wcagResults(2);
    expect(r.aaSmall).toBe(false);
    expect(r.aaLarge).toBe(false);
    expect(r.aaaSmall).toBe(false);
    expect(r.aaaLarge).toBe(false);
  });
});

describe('qualityLabel', () => {
  it('< 3 = Poor', () => expect(qualityLabel(2.5)).toBe('Poor'));
  it('3–4.5 = Fair', () => expect(qualityLabel(4)).toBe('Fair'));
  it('4.5–7 = Good', () => expect(qualityLabel(5)).toBe('Good'));
  it('>= 7 = Excellent', () => expect(qualityLabel(7)).toBe('Excellent'));
  it('exactly 3 = Fair', () => expect(qualityLabel(3)).toBe('Fair'));
  it('exactly 4.5 = Good', () => expect(qualityLabel(4.5)).toBe('Good'));
});

describe('qualityColor', () => {
  it('returns a hex string', () => {
    expect(qualityColor(21)).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('green for excellent', () => expect(qualityColor(7)).toBe('#10b981'));
  it('amber for good', () => expect(qualityColor(5)).toBe('#f59e0b'));
  it('orange for fair', () => expect(qualityColor(3.5)).toBe('#f97316'));
  it('red for poor', () => expect(qualityColor(2)).toBe('#ef4444'));
});
