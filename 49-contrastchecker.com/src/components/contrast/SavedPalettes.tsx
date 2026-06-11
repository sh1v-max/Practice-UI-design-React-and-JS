import { memo } from 'react';
import type { SavedPalette } from '../../hooks/usePalettes';

interface Props {
  palettes: SavedPalette[];
  onSave: () => void;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

const SavedPalettes = memo(function SavedPalettes({ palettes, onSave, onLoad, onDelete }: Props) {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-hairline)',
        background: 'var(--color-canvas-soft)',
        overflow: 'hidden',
      }}
    >
      {/* Header + save button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          Saved Palettes
        </p>
        <button
          type="button"
          onClick={onSave}
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '4px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-hairline)',
            background: 'var(--color-canvas)',
            color: 'var(--color-ink)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Save current
        </button>
      </div>

      {/* Empty state */}
      {palettes.length === 0 ? (
        <div
          style={{
            padding: '28px 16px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-mute)', margin: 0 }}>
            No palettes saved yet.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)', margin: '4px 0 0', opacity: 0.7 }}>
            Click "Save current" to store a pair.
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: '4px 0' }}>
          {palettes.map((palette) => (
            <PaletteRow
              key={palette.id}
              palette={palette}
              onLoad={onLoad}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
});

function PaletteRow({
  palette,
  onLoad,
  onDelete,
}: {
  palette: SavedPalette;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 16px',
        cursor: 'pointer',
        transition: 'background 0.12s',
      }}
      onClick={() => onLoad(palette.id)}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-canvas-soft-2)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {/* FG + BG swatches */}
      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
        <span
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '4px',
            background: palette.fg,
            border: '1px solid var(--color-hairline)',
          }}
          title={palette.fg}
        />
        <span
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '4px',
            background: palette.bg,
            border: '1px solid var(--color-hairline)',
          }}
          title={palette.bg}
        />
      </div>

      {/* Hex labels */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: '8px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-ink)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {palette.fg}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-mute)' }}>/</span>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-ink)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {palette.bg}
        </span>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(palette.id);
        }}
        aria-label="Delete palette"
        style={{
          flexShrink: 0,
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          border: 'none',
          background: 'none',
          color: 'var(--color-mute)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.15s, background 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ef4444';
          e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--color-mute)';
          e.currentTarget.style.background = 'none';
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}

export default SavedPalettes;
