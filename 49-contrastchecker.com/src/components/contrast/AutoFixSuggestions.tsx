import { memo } from 'react';
import type { Suggestion } from '../../lib/autofix';

interface Props {
  suggestions: Suggestion[];
  onApply: (hex: string) => void;
}

const AutoFixSuggestions = memo(function AutoFixSuggestions({ suggestions, onApply }: Props) {
  if (suggestions.length === 0) return null;

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
          Smart Auto-Fix
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)', marginTop: '2px' }}>
          Adjusted foreground colors that pass WCAG
        </p>
      </div>

      <div style={{ padding: '4px 0' }}>
        {suggestions.map((s) => (
          <SuggestionRow key={s.hex} suggestion={s} onApply={onApply} />
        ))}
      </div>
    </div>
  );
});

function SuggestionRow({
  suggestion,
  onApply,
}: {
  suggestion: Suggestion;
  onApply: (hex: string) => void;
}) {
  const { hex, ratio } = suggestion;

  const levelLabel = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'AA+';
  const levelColor = ratio >= 7 ? '#10b981' : '#f59e0b';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
      }}
    >
      {/* Color swatch */}
      <span
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: hex,
          border: '1px solid var(--color-hairline)',
          flexShrink: 0,
        }}
      />

      {/* Hex + ratio */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: 'var(--color-ink)',
          }}
        >
          {hex}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-mute)',
            marginLeft: '8px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {ratio.toFixed(2)}:1
        </span>
      </div>

      {/* Level badge */}
      <span
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          padding: '2px 7px',
          borderRadius: '4px',
          color: levelColor,
          background: ratio >= 7 ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
          flexShrink: 0,
        }}
      >
        {levelLabel}
      </span>

      {/* Apply button */}
      <button
        type="button"
        onClick={() => onApply(hex)}
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '5px 12px',
          borderRadius: '6px',
          border: '1px solid var(--color-hairline)',
          background: 'var(--color-canvas)',
          color: 'var(--color-ink)',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.15s, border-color 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-canvas-soft-2)';
          e.currentTarget.style.borderColor = 'var(--color-hairline-strong)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-canvas)';
          e.currentTarget.style.borderColor = 'var(--color-hairline)';
        }}
      >
        Apply
      </button>
    </div>
  );
}

export default AutoFixSuggestions;
