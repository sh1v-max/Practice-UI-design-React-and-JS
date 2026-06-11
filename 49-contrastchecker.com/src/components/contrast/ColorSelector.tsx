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

export default function ColorSelector({ label, color, onChange }: Props) {
  const [hsva, setHsva] = useState<HsvaColor>(() => hexToHsva(color));
  const [inputVal, setInputVal] = useState(color);
  const [inputError, setInputError] = useState(false);

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

  const rgb = parseColor(color);

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Label + color dot */}
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
          }}
        >
          {label}
        </span>
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
