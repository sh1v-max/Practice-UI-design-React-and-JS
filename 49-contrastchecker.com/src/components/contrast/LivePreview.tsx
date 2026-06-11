import { memo } from 'react';

interface Props {
  fgHex: string;
  bgHex: string;
}

const LivePreview = memo(function LivePreview({ fgHex, bgHex }: Props) {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-hairline)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-hairline)', background: 'var(--color-canvas-soft)' }}>
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
          Live Preview
        </p>
      </div>

      {/* Preview area */}
      <div
        style={{
          backgroundColor: bgHex,
          color: fgHex,
          padding: '24px',
          transition: 'background-color 0.2s, color 0.2s',
        }}
      >
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            marginBottom: '8px',
            color: 'inherit',
          }}
        >
          The quick brown fox
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            lineHeight: 1.6,
            marginBottom: '16px',
            color: 'inherit',
            opacity: 0.9,
          }}
        >
          Jumps over the lazy dog. This paragraph demonstrates how body text reads
          at normal size against your chosen background color.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            style={{
              padding: '7px 16px',
              borderRadius: '6px',
              border: `1.5px solid ${fgHex}`,
              background: fgHex,
              color: bgHex,
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'default',
            }}
          >
            Button
          </button>

          <button
            type="button"
            style={{
              padding: '7px 16px',
              borderRadius: '6px',
              border: `1.5px solid ${fgHex}`,
              background: 'transparent',
              color: fgHex,
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'default',
            }}
          >
            Outline
          </button>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: '0.8125rem',
              color: fgHex,
              textDecoration: 'underline',
              fontWeight: 500,
            }}
          >
            Anchor link
          </a>
        </div>

        {/* Small text sample */}
        <p
          style={{
            marginTop: '16px',
            fontSize: '0.75rem',
            color: 'inherit',
            opacity: 0.75,
          }}
        >
          Small text — 12px. WCAG requires 4.5:1 for this size.
        </p>
      </div>

      {/* Color chips footer */}
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid var(--color-hairline)',
          background: 'var(--color-canvas-soft)',
        }}
      >
        <ColorChip label="FG" hex={fgHex} />
        <ColorChip label="BG" hex={bgHex} borderLeft />
      </div>
    </div>
  );
});

function ColorChip({ label, hex, borderLeft }: { label: string; hex: string; borderLeft?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        borderLeft: borderLeft ? '1px solid var(--color-hairline)' : undefined,
      }}
    >
      <span
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '4px',
          background: hex,
          border: '1px solid var(--color-hairline)',
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: '0.6875rem', color: 'var(--color-mute)', fontWeight: 600 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-ink)',
        }}
      >
        {hex}
      </span>
    </div>
  );
}

export default LivePreview;
