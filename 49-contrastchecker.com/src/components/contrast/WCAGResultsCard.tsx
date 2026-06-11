import { memo } from 'react';
import type { WCAGResults } from '../../lib/contrast';

interface Props {
  wcag: WCAGResults;
}

interface Row {
  label: string;
  sublabel: string;
  threshold: string;
  key: keyof WCAGResults;
}

const ROWS: Row[] = [
  { label: 'AA', sublabel: 'Normal Text', threshold: '4.5:1', key: 'aaSmall' },
  { label: 'AA', sublabel: 'Large Text',  threshold: '3:1',   key: 'aaLarge' },
  { label: 'AAA', sublabel: 'Normal Text', threshold: '7:1',  key: 'aaaSmall' },
  { label: 'AAA', sublabel: 'Large Text',  threshold: '4.5:1', key: 'aaaLarge' },
];

const WCAGResultsCard = memo(function WCAGResultsCard({ wcag }: Props) {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-hairline)',
        background: 'var(--color-canvas-soft)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-hairline)',
        }}
      >
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
          WCAG 2.2 Results
        </p>
      </div>

      <div style={{ padding: '4px 0' }}>
        {ROWS.map((row) => (
          <ResultRow key={row.key} row={row} pass={wcag[row.key]} />
        ))}
      </div>
    </div>
  );
});

function ResultRow({ row, pass }: { row: Row; pass: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        gap: '12px',
      }}
    >
      {/* Badge */}
      <span
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          padding: '2px 6px',
          borderRadius: '4px',
          background: 'var(--color-canvas-soft-2)',
          color: 'var(--color-mute)',
          flexShrink: 0,
          width: '32px',
          textAlign: 'center',
        }}
      >
        {row.label}
      </span>

      {/* Label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--color-ink)', fontWeight: 500 }}>
          {row.sublabel}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-mute)',
            marginLeft: '6px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {row.threshold}
        </span>
      </div>

      {/* Pass / Fail pill */}
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '999px',
          flexShrink: 0,
          background: pass ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          color: pass ? '#10b981' : '#ef4444',
          transition: 'background 0.25s, color 0.25s',
        }}
      >
        {pass ? '✓ Pass' : '✗ Fail'}
      </span>
    </div>
  );
}

export default WCAGResultsCard;
