import { memo, useState, useCallback } from 'react';
import { toHex, type RGB } from '../../lib/colors';
import { toCssVars } from '../../lib/export';

interface Props {
  fgRgb: RGB;
  bgRgb: RGB;
  tailwindClasses: string;
  onCopy: (text: string) => void;
}

type Tab = 'css' | 'tailwind';

const DeveloperOutput = memo(function DeveloperOutput({
  fgRgb,
  bgRgb,
  tailwindClasses,
  onCopy,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('css');
  const [copied, setCopied] = useState(false);

  const fgHex = toHex(fgRgb);
  const bgHex = toHex(bgRgb);
  const cssOutput = toCssVars(fgRgb, bgRgb);

  const activeContent = activeTab === 'css' ? cssOutput : tailwindClasses;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(activeContent).then(() => {
      setCopied(true);
      onCopy(activeContent);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [activeContent, onCopy]);

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
          Developer Output
        </p>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-hairline)',
        }}
      >
        {(['css', 'tailwind'] as Tab[]).map((tab) => {
          const active = tab === activeTab;
          const label = tab === 'css' ? 'CSS Variables' : 'Tailwind Classes';
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '9px 16px',
                fontSize: '0.75rem',
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--color-ink)' : 'var(--color-mute)',
                background: 'none',
                border: 'none',
                borderBottom: active ? '2px solid var(--color-violet)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Output area */}
      <div style={{ padding: '16px' }}>
        {activeTab === 'css' ? (
          <CssOutput fgHex={fgHex} bgHex={bgHex} cssOutput={cssOutput} />
        ) : (
          <TailwindOutput tailwindClasses={tailwindClasses} />
        )}

        {/* Copy all button */}
        <button
          type="button"
          onClick={handleCopy}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid var(--color-hairline)',
            background: copied ? 'rgba(16,185,129,0.1)' : 'var(--color-canvas)',
            color: copied ? '#10b981' : 'var(--color-ink)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'background 0.2s, color 0.2s',
            borderColor: copied ? 'rgba(16,185,129,0.3)' : 'var(--color-hairline)',
          }}
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy all
            </>
          )}
        </button>
      </div>
    </div>
  );
});

function CssOutput({ fgHex, bgHex, cssOutput }: { fgHex: string; bgHex: string; cssOutput: string }) {
  return (
    <div
      style={{
        borderRadius: '8px',
        border: '1px solid var(--color-hairline)',
        background: 'var(--color-canvas)',
        overflow: 'hidden',
      }}
    >
      <CssLine name="--foreground" hex={fgHex} />
      <div style={{ height: '1px', background: 'var(--color-hairline)' }} />
      <CssLine name="--background" hex={bgHex} />
    </div>
  );
}

function CssLine({ name, hex }: { name: string; hex: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
      }}
    >
      <span
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '3px',
          background: hex,
          border: '1px solid var(--color-hairline)',
          flexShrink: 0,
        }}
      />
      <code
        style={{
          fontSize: '0.8125rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-ink)',
        }}
      >
        <span style={{ color: 'var(--color-violet)' }}>{name}</span>
        {': '}
        <span>{hex};</span>
      </code>
    </div>
  );
}

function TailwindOutput({ tailwindClasses }: { tailwindClasses: string }) {
  const [textClass, bgClass] = tailwindClasses.split(' / ');
  return (
    <div
      style={{
        borderRadius: '8px',
        border: '1px solid var(--color-hairline)',
        background: 'var(--color-canvas)',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <code style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
        <span style={{ color: '#60a5fa' }}>{textClass}</span>
      </code>
      <code style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
        <span style={{ color: '#34d399' }}>{bgClass}</span>
      </code>
    </div>
  );
}

export default DeveloperOutput;
