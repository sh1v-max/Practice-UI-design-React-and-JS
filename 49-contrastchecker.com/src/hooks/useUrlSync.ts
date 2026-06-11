import { useEffect } from 'react';

export function readUrlColors(): { fg: string; bg: string } | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const fg = params.get('fg');
  const bg = params.get('bg');
  if (fg && bg && /^[0-9a-fA-F]{6}$/.test(fg) && /^[0-9a-fA-F]{6}$/.test(bg)) {
    return { fg: `#${fg.toUpperCase()}`, bg: `#${bg.toUpperCase()}` };
  }
  return null;
}

export function useUrlSync(fgHex: string, bgHex: string): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    history.replaceState(null, '', `?fg=${fgHex.slice(1)}&bg=${bgHex.slice(1)}`);
  }, [fgHex, bgHex]);
}
