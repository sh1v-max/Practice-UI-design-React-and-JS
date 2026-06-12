import { useState, useEffect, useCallback } from 'react';
import { Wheel, ShadeSlider, hexToHsva, hsvaToHex } from '@uiw/react-color';
import type { ColorResult } from '@uiw/color-convert';
import type { HsvaColor } from '@uiw/color-convert';
import { parseColor, toHex, toRgb, toHsl } from '../../lib/colors';

interface Props {
  label: string;
  color: string;
  onChange: (hex: string) => void;
}

const supportsEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

export default function ColorSelector({ label, color, onChange }: Props) {
  const [hsva, setHsva] = useState<HsvaColor>(() => hexToHsva(color));
  const [inputVal, setInputVal] = useState(color);
  const [inputError, setInputError] = useState(false);
  const [picking, setPicking] = useState(false);

  useEffect(() => {
    setHsva(hexToHsva(color));
    setInputVal(color);
  }, [color]);

  const handleWheelChange = useCallback(
    (result: ColorResult) => {
      setHsva(result.hsva);
      onChange(result.hex.toUpperCase());
    },
    [onChange]
  );

  const handleShadeChange = useCallback(
    (newShade: { v: number }) => {
      const updated = { ...hsva, v: newShade.v };
      setHsva(updated);
      onChange(hsvaToHex(updated).toUpperCase());
    },
    [hsva, onChange]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    setInputError(false);
  }, []);

  const handleInputCommit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
      if ('key' in e && e.key !== 'Enter') return;
      const parsed = parseColor(inputVal);
      if (parsed) {
        const hex = toHex(parsed).toUpperCase();
        onChange(hex);
        setInputVal(hex);
        setInputError(false);
      } else {
        setInputError(true);
        setTimeout(() => setInputError(false), 1500);
      }
    },
    [inputVal, onChange]
  );

  const handleEyeDropper = useCallback(async () => {
    if (!supportsEyeDropper) return;
    try {
      setPicking(true);
      // @ts-expect-error — EyeDropper not yet in lib.dom.d.ts for all TS versions
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex.toUpperCase());
    } catch {
      // user cancelled — no action needed
    } finally {
      setPicking(false);
    }
  }, [onChange]);

  const rgb = parseColor(color);

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Label + color dot + eyedropper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span
          aria-hidden="true"
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: color,
            border: '2px solid var(--color-hairline-strong)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: 'var(--color-mute)',
            flex: 1,
          }}
        >
          {label}
        </span>

        {/* Eyedropper — inline with label */}
        {supportsEyeDropper ? (
          <button
            type="button"
            onClick={handleEyeDropper}
            disabled={picking}
            aria-label={`Pick ${label} color from screen`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 9px',
              borderRadius: '6px',
              border: '1px solid var(--color-hairline)',
              background: picking ? 'var(--color-canvas-soft-2)' : 'var(--color-canvas-soft)',
              color: picking ? 'var(--color-violet)' : 'var(--color-mute)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              cursor: picking ? 'wait' : 'pointer',
              flexShrink: 0,
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              if (picking) return;
              e.currentTarget.style.background = 'var(--color-canvas-soft-2)';
              e.currentTarget.style.color = 'var(--color-ink)';
            }}
            onMouseLeave={(e) => {
              if (picking) return;
              e.currentTarget.style.background = 'var(--color-canvas-soft)';
              e.currentTarget.style.color = 'var(--color-mute)';
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 22 1-1h3l9-9" />
              <path d="M3 21v-3l9-9" />
              <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8Z" />
            </svg>
            {picking ? 'Picking…' : 'Pick From Screen'}
          </button>
        ) : (
          <span style={{ fontSize: '0.6875rem', color: 'var(--color-mute)', opacity: 0.5 }}>
            No eyedropper
          </span>
        )}
      </div>

      {/* Color wheel */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
        <Wheel
          color={hsva}
          onChange={handleWheelChange}
          width={200}
          height={200}
        />
      </div>

      {/* Brightness / shade slider */}
      <ShadeSlider
        hsva={hsva}
        onChange={handleShadeChange}
        style={{ height: '12px', borderRadius: '6px', marginBottom: '16px' }}
      />

      {/* HEX / RGB / HSL info */}
      <div
        style={{
          padding: '10px 12px',
          borderRadius: '8px',
          background: 'var(--color-canvas-soft)',
          border: '1px solid var(--color-hairline)',
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '4px',
        }}
      >
        <InfoRow label="HEX" value={color} />
        <InfoRow label="RGB" value={rgb ? toRgb(rgb) : ''} />
        <InfoRow label="HSL" value={rgb ? toHsl(rgb) : ''} />
      </div>

      {/* Manual text input */}
      <input
        type="text"
        value={inputVal}
        onChange={handleInputChange}
        onBlur={handleInputCommit}
        onKeyDown={handleInputCommit}
        spellCheck={false}
        placeholder="#000000 or rgb(...) or hsl(...)"
        aria-label={`${label} color value`}
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: '8px',
          border: `1px solid ${inputError ? 'var(--color-error)' : 'var(--color-hairline)'}`,
          background: 'var(--color-canvas-soft)',
          color: 'var(--color-ink)',
          fontSize: '0.8125rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          outline: 'none',
          boxSizing: 'border-box' as const,
          transition: 'border-color 0.15s',
        }}
      />

    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-mute)',
          width: '28px',
          flexShrink: 0,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-ink)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap' as const,
        }}
      >
        {value}
      </span>
    </div>
  );
}
