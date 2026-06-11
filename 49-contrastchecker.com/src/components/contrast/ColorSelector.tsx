import { useState, useRef, useEffect, useCallback } from 'react';
import { Sketch } from '@uiw/react-color';
import { parseColor, toHex } from '../../lib/colors';
import { relativeLuminance } from '../../lib/contrast';

interface Props {
  label: string;
  color: string;
  onChange: (hex: string) => void;
  alignRight?: boolean;
}

function getPencilColor(hex: string): string {
  const rgb = parseColor(hex);
  if (!rgb) return '#ffffff';
  return relativeLuminance(rgb) > 0.4 ? '#000000' : '#ffffff';
}

export default function ColorSelector({ label, color, onChange, alignRight = false }: Props) {
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState(color);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep text input in sync when color changes externally
  useEffect(() => {
    setInputVal(color);
  }, [color]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleSwatchClick = useCallback(() => setOpen((v) => !v), []);

  const handlePickerChange = useCallback(
    (c: { hex: string }) => {
      const hex = c.hex.toUpperCase();
      onChange(hex);
    },
    [onChange]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const handleInputCommit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
      if ('key' in e && e.key !== 'Enter') return;
      const parsed = parseColor(inputVal);
      if (parsed) {
        const hex = toHex(parsed);
        onChange(hex);
        setInputVal(hex);
      } else {
        setInputVal(color);
      }
    },
    [inputVal, color, onChange]
  );

  const pencilColor = getPencilColor(color);

  return (
    <div ref={containerRef} style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      {/* Label */}
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-mute)',
          marginBottom: '8px',
        }}
      >
        {label}
      </p>

      {/* Swatch — click to open picker */}
      <button
        type="button"
        aria-label={`Pick ${label} color, current: ${color}`}
        onClick={handleSwatchClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '160px',
          borderRadius: '12px',
          background: color,
          border: '1px solid var(--color-hairline)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.15s',
          boxShadow: open ? '0 0 0 3px var(--color-violet)' : 'none',
        }}
      >
        {/* Pencil icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={pencilColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.75, pointerEvents: 'none' }}
        >
          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </button>

      {/* Hex text input */}
      <input
        type="text"
        value={inputVal}
        onChange={handleInputChange}
        onBlur={handleInputCommit}
        onKeyDown={handleInputCommit}
        spellCheck={false}
        style={{
          marginTop: '10px',
          width: '100%',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid var(--color-hairline)',
          background: 'var(--color-canvas-soft)',
          color: 'var(--color-ink)',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-violet)')}
        onBlurCapture={(e) => (e.currentTarget.style.borderColor = 'var(--color-hairline)')}
      />

      {/* Picker popup */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(160px + 56px + 8px)',
            ...(alignRight ? { right: 0 } : { left: 0 }),
            zIndex: 100,
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
          }}
        >
          <Sketch
            color={color}
            onChange={handlePickerChange}
            disableAlpha
            presetColors={[]}
            style={{ borderRadius: '12px' }}
          />
        </div>
      )}
    </div>
  );
}
