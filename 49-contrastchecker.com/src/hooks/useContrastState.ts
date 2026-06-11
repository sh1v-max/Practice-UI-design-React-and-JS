import { useState, useMemo, useEffect, useCallback } from 'react';
import { parseHex, toHex, type RGB } from '../lib/colors';
import { contrastRatio, wcagResults, qualityLabel, qualityColor } from '../lib/contrast';
import { suggestFixes, type Suggestion } from '../lib/autofix';
import { toTailwindClasses } from '../lib/export';

export type BlindType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface SavedPalette {
  fg: string;
  bg: string;
  label?: string;
}

function readUrlColors(): { fg: string; bg: string } | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const fg = params.get('fg');
  const bg = params.get('bg');
  if (fg && bg && /^[0-9a-fA-F]{6}$/.test(fg) && /^[0-9a-fA-F]{6}$/.test(bg)) {
    return { fg: `#${fg}`, bg: `#${bg}` };
  }
  return null;
}

function loadPalettesFromStorage(): SavedPalette[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('contrastlab-palettes');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p: { fg: unknown; bg: unknown; label?: string }) => ({
      fg: typeof p.fg === 'string' && p.fg.startsWith('#') ? p.fg : toHex(p.fg as RGB),
      bg: typeof p.bg === 'string' && p.bg.startsWith('#') ? p.bg : toHex(p.bg as RGB),
      label: p.label,
    }));
  } catch {
    return [];
  }
}

const DEFAULTS = readUrlColors() ?? { fg: '#111827', bg: '#FFFFFF' };

export function useContrastState() {
  const [fgHex, setFgHexRaw] = useState<string>(DEFAULTS.fg.toUpperCase());
  const [bgHex, setBgHexRaw] = useState<string>(DEFAULTS.bg.toUpperCase());
  const [activeBlindType, setActiveBlindType] = useState<BlindType>('normal');
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(loadPalettesFromStorage);
  const [toast, setToast] = useState<string>('');

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

  const setFgHex = useCallback((hex: string) => {
    setFgHexRaw(hex.toUpperCase());
  }, []);

  const setBgHex = useCallback((hex: string) => {
    setBgHexRaw(hex.toUpperCase());
  }, []);

  const swapColors = useCallback(() => {
    setFgHexRaw((fg) => {
      setBgHexRaw(fg);
      return bgHex;
    });
  }, [bgHex]);

  // Sync URL on color change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fg = fgHex.slice(1);
    const bg = bgHex.slice(1);
    history.replaceState(null, '', `?fg=${fg}&bg=${bg}`);
  }, [fgHex, bgHex]);

  // Persist palettes to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('contrastlab-palettes', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const savePalette = useCallback(() => {
    setSavedPalettes((prev) => {
      const already = prev.some((p) => p.fg === fgHex && p.bg === bgHex);
      if (already) return prev;
      return [...prev, { fg: fgHex, bg: bgHex }];
    });
  }, [fgHex, bgHex]);

  const deletePalette = useCallback((index: number) => {
    setSavedPalettes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const loadPalette = useCallback(
    (palette: SavedPalette) => {
      setFgHex(palette.fg);
      setBgHex(palette.bg);
    },
    [setFgHex, setBgHex]
  );

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2000);
  }, []);

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
    savedPalettes,
    savePalette,
    deletePalette,
    loadPalette,
    swapColors,
    toast,
    showToast,
  };
}
