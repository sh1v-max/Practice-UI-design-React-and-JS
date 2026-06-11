import { memo, useMemo } from 'react';
import { simulate, type BlindType } from '../../lib/colorblind';
import { toHex } from '../../lib/colors';
import type { RGB } from '../../lib/colors';

interface Props {
  fgRgb: RGB;
  bgRgb: RGB;
  activeBlindType: BlindType;
  onChangeBlindType: (type: BlindType) => void;
}

interface Tab {
  type: BlindType;
  label: string;
  short: string;
}

const TABS: Tab[] = [
  { type: 'normal',        label: 'Normal Vision',  short: 'Normal' },
  { type: 'protanopia',    label: 'Protanopia',      short: 'Protan' },
  { type: 'deuteranopia',  label: 'Deuteranopia',    short: 'Deutan' },
  { type: 'tritanopia',    label: 'Tritanopia',      short: 'Tritan' },
  { type: 'achromatopsia', label: 'Achromatopsia',   short: 'Achrom' },
];

const ColorBlindnessSimulator = memo(function ColorBlindnessSimulator({
  fgRgb,
  bgRgb,
  activeBlindType,
  onChangeBlindType,
}: Props) {
  const simFg = useMemo(() => simulate(fgRgb, activeBlindType), [fgRgb, activeBlindType]);
  const simBg = useMemo(() => simulate(bgRgb, activeBlindType), [bgRgb, activeBlindType]);

  const simFgHex = toHex(simFg);
  const simBgHex = toHex(simBg);

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-hairline)',
        background: 'var(--color-canvas-soft)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
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
          Color Blindness Simulator
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-hairline)',
          overflowX: 'auto',
        }}
      >
        {TABS.map((tab) => {
          const active = tab.type === activeBlindType;
          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => onChangeBlindType(tab.type)}
              title={tab.label}
              style={{
                flex: '1 0 auto',
                padding: '9px 10px',
                fontSize: '0.6875rem',
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--color-ink)' : 'var(--color-mute)',
                background: 'none',
                border: 'none',
                borderBottom: active ? '2px solid var(--color-violet)' : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {tab.short}
            </button>
          );
        })}
      </div>

      {/* Simulated swatches */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SwatchRow label="Foreground" original={toHex(fgRgb)} simulated={simFgHex} />
        <SwatchRow label="Background" original={toHex(bgRgb)} simulated={simBgHex} />

        {/* Mini preview */}
        <div
          style={{
            marginTop: '4px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--color-hairline)',
          }}
        >
          <div
            style={{
              backgroundColor: simBgHex,
              color: simFgHex,
              padding: '14px 16px',
              transition: 'background-color 0.2s, color 0.2s',
            }}
          >
            <p style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0, color: 'inherit' }}>
              Preview text
            </p>
            <p style={{ fontSize: '0.75rem', margin: '4px 0 0', color: 'inherit', opacity: 0.85 }}>
              As seen with {TABS.find((t) => t.type === activeBlindType)?.label ?? activeBlindType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

function SwatchRow({
  label,
  original,
  simulated,
}: {
  label: string;
  original: string;
  simulated: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--color-mute)', width: '72px', flexShrink: 0 }}>
        {label}
      </span>
      <span
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: original,
          border: '1px solid var(--color-hairline)',
          flexShrink: 0,
        }}
        title={`Original: ${original}`}
      />
      <span style={{ fontSize: '0.75rem', color: 'var(--color-mute)' }}>→</span>
      <span
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: simulated,
          border: '1px solid var(--color-hairline)',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
        title={`Simulated: ${simulated}`}
      />
      <span
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-ink)',
        }}
      >
        {simulated}
      </span>
    </div>
  );
}

export default ColorBlindnessSimulator;
