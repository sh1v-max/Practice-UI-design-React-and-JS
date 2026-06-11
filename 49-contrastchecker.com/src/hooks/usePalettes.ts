import { useState, useCallback, useEffect } from 'react';
import { toHex, type RGB } from '../lib/colors';

export interface SavedPalette {
  id: string;
  createdAt: number;
  fg: string;
  bg: string;
}

type RawPalette = {
  id?: string;
  createdAt?: number;
  fg: unknown;
  bg: unknown;
};

function normalizeHex(value: unknown): string {
  if (typeof value === 'string' && value.startsWith('#')) return value.toUpperCase();
  if (typeof value === 'object' && value !== null && 'r' in value) {
    return toHex(value as RGB).toUpperCase();
  }
  return '#000000';
}

function migrate(raw: RawPalette[]): SavedPalette[] {
  return raw.map((p) => ({
    id: p.id ?? crypto.randomUUID(),
    createdAt: p.createdAt ?? Date.now(),
    fg: normalizeHex(p.fg),
    bg: normalizeHex(p.bg),
  }));
}

function load(): SavedPalette[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('contrastlab-palettes');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return migrate(parsed as RawPalette[]);
  } catch {
    return [];
  }
}

export function usePalettes() {
  const [palettes, setPalettes] = useState<SavedPalette[]>(load);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('contrastlab-palettes', JSON.stringify(palettes));
  }, [palettes]);

  const savePalette = useCallback((fg: string, bg: string) => {
    setPalettes((prev) => {
      if (prev.some((p) => p.fg === fg && p.bg === bg)) return prev;
      return [...prev, { id: crypto.randomUUID(), createdAt: Date.now(), fg, bg }];
    });
  }, []);

  const deletePalette = useCallback((id: string) => {
    setPalettes((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { palettes, savePalette, deletePalette };
}
