import { memo, useState, useCallback } from 'react';
import { toHex, toRgb, toHsl, type RGB } from '../../lib/colors';

interface Props {
  fgRgb: RGB;
  onCopy: (text: string) => void;
}

const ColorFormatConverter = memo(function ColorFormatConverter({ fgRgb, onCopy }: Props) {
  const hex = toHex(fgRgb);
  const rgb = toRgb(fgRgb);
  const hsl = toHsl(fgRgb);

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-hairline)',
        background: 'var(--color-canvas-soft)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-hairline)' }}>
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-mute)',
            margin: 0,
          }}
        >
          Color Format Converter
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)', marginTop: '2px' }}>
          Foreground color in all formats
        </p>
      </div>

      <div style={{ padding: '8px 0' }}>
        <FormatRow label="HEX" value={hex} color={hex} onCopy={onCopy} />
        <FormatRow label="RGB" value={rgb} color={hex} onCopy={onCopy} />
        <FormatRow label="HSL" value={hsl} color={hex} onCopy={onCopy} />
      </div>
    </div>
  );
});

function FormatRow({
  label,
  value,
  color,
  onCopy,
}: {
  label: string;
  value: string;
  color: string;
  onCopy: (text: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      onCopy(value);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [value, onCopy]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
      }}
    >
      {/* Color dot */}
      <span
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          background: color,
          border: '1px solid var(--color-hairline)',
          flexShrink: 0,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'var(--color-mute)',
          width: '28px',
          flexShrink: 0,
        }}
      >
        {label}
      </span>

      {/* Value */}
      <span
        style={{
          flex: 1,
          fontSize: '0.8125rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-ink)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>

      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label} value`}
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          borderRadius: '6px',
          border: '1px solid var(--color-hairline)',
          background: copied ? 'rgba(16,185,129,0.1)' : 'var(--color-canvas)',
          color: copied ? '#10b981' : 'var(--color-mute)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s, border-color 0.2s',
          borderColor: copied ? 'rgba(16,185,129,0.3)' : 'var(--color-hairline)',
        }}
      >
        {copied ? (
          <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}

export default ColorFormatConverter;
