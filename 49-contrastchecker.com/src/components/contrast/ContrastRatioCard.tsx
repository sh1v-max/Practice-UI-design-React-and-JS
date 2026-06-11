import { memo } from 'react';

interface Props {
  ratio: number;
  quality: string;
  meterColor: string;
}

const CIRCUMFERENCE = 2 * Math.PI * 54; // r=54

function ratioToDash(ratio: number): number {
  const pct = Math.min(ratio / 21, 1);
  return CIRCUMFERENCE * (1 - pct);
}

const ContrastRatioCard = memo(function ContrastRatioCard({ ratio, quality, meterColor }: Props) {
  const dashOffset = ratioToDash(ratio);
  const displayRatio = ratio.toFixed(2);

  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid var(--color-hairline)',
        background: 'var(--color-canvas-soft)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* SVG ring meter */}
      <div style={{ flexShrink: 0, position: 'relative', width: '128px', height: '128px' }}>
        <svg width="128" height="128" viewBox="0 0 128 128" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx="64"
            cy="64"
            r="54"
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth="10"
          />
          {/* Arc */}
          <circle
            cx="64"
            cy="64"
            r="54"
            fill="none"
            stroke={meterColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.4s ease, stroke 0.4s ease' }}
          />
        </svg>
        {/* Ratio label centered inside ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
          }}
        >
          <span
            style={{
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--color-ink)',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {displayRatio}
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--color-mute)', lineHeight: 1 }}>
            :1
          </span>
        </div>
      </div>

      {/* Text info */}
      <div>
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-mute)',
            marginBottom: '4px',
          }}
        >
          Contrast Ratio
        </p>
        <p
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: meterColor,
            lineHeight: 1,
            marginBottom: '6px',
            transition: 'color 0.4s ease',
          }}
        >
          {quality}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)' }}>
          {ratio >= 7
            ? 'Passes all WCAG levels'
            : ratio >= 4.5
              ? 'Passes AA — fails AAA'
              : ratio >= 3
                ? 'Passes AA large text only'
                : 'Fails all WCAG levels'}
        </p>
      </div>
    </div>
  );
});

export default ContrastRatioCard;
