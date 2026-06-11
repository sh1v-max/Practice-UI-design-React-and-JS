import { useState, useMemo, useCallback } from 'react';
import { parseHex } from '../lib/colors';
import { contrastRatio, wcagResults, qualityLabel, qualityColor } from '../lib/contrast';
import { suggestFixes, type Suggestion } from '../lib/autofix';
import { toTailwindClasses } from '../lib/export';
import { readUrlColors } from './useUrlSync';

export type BlindType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
export type { Suggestion };

const DEFAULTS = readUrlColors() ?? { fg: '#111827', bg: '#FFFFFF' };

export function useContrastState() {
  const [fgHex, setFgHexRaw] = useState<string>(DEFAULTS.fg);
  const [bgHex, setBgHexRaw] = useState<string>(DEFAULTS.bg);
  const [activeBlindType, setActiveBlindType] = useState<BlindType>('normal');

  const fgRgb = useMemo(() => parseHex(fgHex) ?? { r: 17, g: 24, b: 39 }, [fgHex]);
  const bgRgb = useMemo(() => parseHex(bgHex) ?? { r: 255, g: 255, b: 255 }, [bgHex]);

  const ratio = useMemo(() => contrastRatio(fgRgb, bgRgb), [fgRgb, bgRgb]);
  const wcag = useMemo(() => wcagResults(ratio), [ratio]);
  const quality = useMemo(() => qualityLabel(ratio), [ratio]);
  const meterColor = useMemo(() => qualityColor(ratio), [ratio]);

  const suggestions = useMemo<Suggestion[]>(() => {
    if (ratio >= 4.5) return [];
    return suggestFixes(fgRgb, bgRgb);
  }, [fgRgb, bgRgb, ratio]);

  const tailwindClasses = useMemo(() => toTailwindClasses(fgRgb, bgRgb), [fgRgb, bgRgb]);

  const setFgHex = useCallback((hex: string) => setFgHexRaw(hex.toUpperCase()), []);
  const setBgHex = useCallback((hex: string) => setBgHexRaw(hex.toUpperCase()), []);

  const swapColors = useCallback(() => {
    setFgHexRaw((fg) => {
      setBgHexRaw(fg);
      return bgHex;
    });
  }, [bgHex]);

  return {
    fgHex,
    bgHex,
    setFgHex,
    setBgHex,
    fgRgb,
    bgRgb,
    ratio,
    wcag,
    quality,
    meterColor,
    suggestions,
    tailwindClasses,
    activeBlindType,
    setActiveBlindType,
    swapColors,
  };
}
